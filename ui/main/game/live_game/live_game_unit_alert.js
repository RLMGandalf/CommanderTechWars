var model;
var handlers = {};

$(document).ready(function () {

    function parentQuery() {
        return api.Panel.query(api.Panel.parentId, 'panel.invoke', Array.prototype.slice.call(arguments, 0));
    }

    function UnitAlertModel() {
        var self = this;
        var timeout = 10000;

        self.state = ko.observable({});
        self.isSpectator = ko.computed(function() { return !!self.state().spectator; });
        self.autoPip = ko.computed(function() { return !!self.state().autoPip; });
        
        self.map = {}; /* unit alert map */
        self.signalRecalculate = ko.observable();
        self.dirty = false;
        self.focusId = ko.observable(-1);

        self.combatMap = {};
        self.acknowledgedCombatIds = {};

        self.clean = function () {
            var current_time = _.now();
            var dirty = false;
            var id;

            for (id in self.map) {
                if (current_time - self.map[id].time > timeout) {
                    dirty = true;
                    delete self.map[id];
                }
            }

            if (dirty)
                self.signalRecalculate.notifySubscribers();

            self.hidePreview();
        }

        self.isMisc = function (watch_type) {
            return watch_type === constants.watch_type.ping
                    || watch_type === constants.watch_type.sight
                    || watch_type === constants.watch_type.projectile
                    || watch_type === constants.watch_type.first_contact
                    || watch_type === constants.watch_type.target_destroyed
                    || watch_type === constants.watch_type.allied_death;
        }

        self.alerts = ko.computed(function () {
            self.signalRecalculate(); /* force dependency */
            return _.sortBy(_.values(self.map), function (v) { return -v.time });
        });

        self.showLabel = function (id, index) {
            if (id === self.focusId())
                return true;
            return self.focusId() === -1 && index === 0;
        }

        self.setFocus = function (id) {
            if (self.focusId() !== id)
                self.focusId(id);
        }

        self.clearFocus = function () {
            if (self.focusId() !== -1)
                self.focusId(-1);
        }

        self.close = function (id) {
            delete self.map[id];
            if (self.focusId() === id)
                self.focusId(-1);
            self.signalRecalculate.notifySubscribers();
            self.hidePreview();
        }

        self.acknowledge = function (id) {

            var alert = self.map[id];
            var target = {
                location: alert.location,
                planet_id: alert.planet_id
            };

            alert.cb && alert.cb.resolve(self);
            if (!alert.custom) {
                engine.call('camera.lookAt', JSON.stringify(target));
            }

            self.close(id);
        }

        self.recordPlayerContact = function(alert) {
            var contactInfo = { 
                army: alert.army_id, 
                location: alert.location, 
                planet_id: alert.planet_id 
            };
            api.Panel.message(api.Panel.parentId, 'unit_alert.player_contact', JSON.stringify(contactInfo));
        };

        self.processAlert = function (alert, ready) {
            if (!self.map[alert.id])
                self.dirty = true;

            self.map[alert.id] = alert;
            alert.time = _.now();
            alert.cb = alert.cb || $.Deferred();
            
            // The alert system doesn't support spec tags.
            var fullSpecId = alert.spec_id;
            var strip = /.*\.json/.exec(fullSpecId);
            if (strip)
                alert.spec_id = strip.pop();
            api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', alert.watch_type, alert]);

            var getDetails = $.Deferred();
            
            if (alert.watch_type === constants.watch_type.ping || alert.watch_type === constants.watch_type.first_contact) {
                alert.name = alert.name || '';
                alert.sicon = 'coui://ui/main/atlas/icon_atlas/img/strategic_icons/icon_si_ping.png';
                getDetails.resolve(alert);
            }         
            else {
                api.Panel.query(api.Panel.parentId, 'query.item_details', { id: fullSpecId, aka: alert.spec_id })
                    .then(function(itemDetails) {
                        if (itemDetails) {
                            alert.name = itemDetails.name;
                            alert.sicon = 'coui://ui/main/atlas/icon_atlas/img/strategic_icons/icon_si_' + itemDetails.sicon + '.png';
                        }
                        getDetails.resolve(alert);
                    });
            }

            $.when(getDetails).then(function(alert) {
                if (alert.watch_type === constants.watch_type.damage)
                    if (eventSystem.isType(constants.unit_type.Commander, alert.unit_types))
                        triggerModel.testEvent(constants.event_type.commander_under_attack, alert.magnitude);              

                if (alert.watch_type === constants.watch_type.death) {
                    if (eventSystem.isType(constants.unit_type.Commander, alert.unit_types))
                        api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', constants.event_type.commander_destroyed]);
                }

                if (alert.watch_type === constants.watch_type.sight) {
                    if (eventSystem.isType(constants.unit_type.Commander, alert.unit_types)){
                        api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', constants.event_type.enemy_commander_sighted]);
                        self.recordPlayerContact(alert);
                    }
                }

                if (alert.watch_type === constants.watch_type.first_contact) {
                    api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', constants.event_type.new_enemy_contact]);
                    self.recordPlayerContact(alert);
                }

                if (alert.watch_type === constants.watch_type.target_destroyed) {
                    if (eventSystem.isType(constants.unit_type.Commander, alert.unit_types))
                        api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', constants.event_type.enemy_commander_destroyed]);
                }

                if (alert.watch_type === constants.watch_type.allied_death) {
                    if (eventSystem.isType(constants.unit_type.Commander, alert.unit_types))
                        api.Panel.message(api.Panel.parentId, 'panel.invoke', ['processExternalUnitEvent', constants.event_type.allied_commander_destroyed]);
                }
                
                if (ready)
                    ready.resolve(alert);
            });
            
            if (self.autoPip())
                self.showPreview(alert.id, 'pips[0]');
            
            return alert.cb.promise();
        }

        self.processList = function (array) {
            self.dirty = false;
            var readyAlert = function(alert) { 
                var ready = $.Deferred(); 
                self.processAlert(alert, ready); 
                return ready.promise(); 
            };
            var ready = _.map(array, readyAlert);
            $.when.apply($, ready).then(function() {
                /* trigger update only if there was a new alert */
                if (self.dirty)
                    self.signalRecalculate.notifySubscribers();

                setTimeout(self.clean, timeout + 1);
            });
        };

        self.processCustomAlert = function (name) {
            self.dirty = false;

            var result = self.processAlert({
                watch_type: constants.watch_type.ping,
                name: name || '',
                custom: true
            });

            /* trigger update only if there was a new alert */
            if (self.dirty)
                self.signalRecalculate.notifySubscribers();

            setTimeout(self.clean, timeout + 1);
            return result;
        };

        self.acknowledgeCombat = function () {

            var list = _.flatten(_.values(model.combatMap));

            /* remove previously used alerts */
            list = _.filter(list, function (element) {
                return !self.acknowledgedCombatIds[element.combat_id];
            });

            /* if we filtered all combats, clear the ids and retry */
            if (!list.length && !_.isEmpty(self.acknowledgedCombatIds)) {
                self.acknowledgedCombatIds = {};
                self.acknowledgeCombat();
                return;
            }

           _.sortBy(list, 'last_event_time');

            var combat = _.last(list);

            if (!combat)
                return;

            self.acknowledgedCombatIds[combat.combat_id] = true;

            var target = {
                location: combat.last_location,
                planet_id: combat.planet_id
            };

            engine.call('camera.lookAt', JSON.stringify(target));   
        };

        self.acknowledgeAlert = function () {
            var alert = self.alerts()[0];
            if (alert)
                self.acknowledge(alert.id);
            else
                self.acknowledgeCombat();
        };

        self.showPreview = function (id, holodeck) {
            var alert = self.map[id];

            if (!alert)
                return;

            var target = {
                location: alert.location,
                planet_id: alert.planet_id,
                zoom: 'air',
                holodeck: holodeck
            };

            api.Panel.message(api.Panel.parentId, 'unit_alert.show_preview', target);
        };

        self.hidePreview = function () {
            api.Panel.message(api.Panel.parentId, 'unit_alert.hide_preview');
        };
        
        self.active = ko.observable(true);
        
        self.setup = function() {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
            
            parentQuery('unitAlertState').then(self.state);
        };
    }

    model = new UnitAlertModel();

    handlers.watch_list = function (payload) {
        if (model.active() && !model.isSpectator())
            model.processList(payload.list);
    };
    
    handlers.custom_alert = function(name) {
        return model.processCustomAlert(name);
    };

    handlers.combat_list = function (payload) {
        model.combatMap = payload;
    };

    handlers.acknowledge_alert = model.acknowledgeAlert;

    handlers.acknowledge_combat = model.acknowledgeCombat;

    handlers.state = function (payload) {
        model.state(payload);
    };

    // inject per scene mods
    if (scene_mod_list['live_game_unit_alert'])
        loadMods(scene_mod_list['live_game_unit_alert']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
