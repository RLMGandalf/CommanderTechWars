var model;
var handlers = {};

$(document).ready(function () {
    
    function PlayerListViewModel() {
        var self = this;

        self.state = ko.observable({});
        self.spectatorArmyData = ko.observable([]);
        self.armyId = ko.computed(function() { return self.state().army; });
        self.isSpectator = ko.computed(function() { return !!self.state().spectator; });
        self.showLanding = ko.computed(function() { return !!self.state().landing; });
        self.playerVisionFlags = ko.computed(function() { return self.state().vision || []; });
        self.defeated = ko.computed(function() { return !!self.state().defeated; });
        self.playerContactMap = ko.computed(function() { return self.state().contact || {}; });
        self.allianceRequestsReceived = ko.computed(function() { return self.state().allianceReqs || []; });
        self.gameOptions = ko.computed(function() { return self.state().gameOptions || {}; });

        self.players = ko.computed(function() { 
            var playersTemp = _.cloneDeep(self.state().players);
            
            // Fix up ally references
            _.forEach(playersTemp, function(player) {
                player.allies = player.allies && _.map(player.allies, function(id) {
                    return _.find(playersTemp, {id: id});
                });
            });

            for (i = 0; i < self.spectatorArmyData().length; i++) {
                var spectatorData = self.spectatorArmyData()[i];

                var playerData = _.find(playersTemp, function (data) {
                    return data.name === spectatorData.name;
                });

                if (playerData) {
                    // copy production
                    var metalInc = spectatorData.metal.production;
                    var energyInc = spectatorData.energy.production;

                    var metalWaste = 0;
                    if (metalInc > spectatorData.metal.demand && spectatorData.metal.current === spectatorData.metal.storage) {
                        metalWaste = metalInc - spectatorData.metal.demand;
                    } else if (metalInc < spectatorData.metal.demand && spectatorData.metal.current === 0) {
                        metalWaste = metalInc - spectatorData.metal.demand;
                    }

                    var energyWaste = 0;
                    if (energyInc > spectatorData.energy.demand && spectatorData.energy.current === spectatorData.energy.storage) {
                        energyWaste = energyInc - spectatorData.energy.demand;
                    } else if (energyInc < spectatorData.energy.demand && spectatorData.energy.current === 0) {
                        energyWaste = energyInc - spectatorData.energy.demand;
                    }

                    playerData.metalProductionStr = '' + metalInc + ' / ' + metalWaste;
                    playerData.energyProductionStr = '' + Number(energyInc / 1000).toFixed(2) + 'K / ' + Number(energyWaste / 1000).toFixed(2) + 'K';

                    // copy army size
                    playerData.armySize = spectatorData.army_size;

                    // copy army metal value
                    playerData.armyMetal = Number(spectatorData.total_army_metal / 1000).toFixed(2);
                    playerData.mobileCount = spectatorData.mobile_army_count;
                    playerData.fabberCount = spectatorData.fabber_army_count;
                    playerData.factoryCount = spectatorData.factory_army_count;

                    // calculate efficiency
                    var metalEfficiency;
                    if (spectatorData.metal.demand > 0 && spectatorData.metal.current === 0) {
                        metalEfficiency = Math.min(1, Math.max(metalInc / spectatorData.metal.demand, 0));
                    } else {
                        metalEfficiency = 1;
                    }

                    var energyEfficiency;
                    if (spectatorData.energy.demand > 0 && spectatorData.energy.current === 0) {
                        energyEfficiency = Math.min(1, Math.max(energyInc / spectatorData.energy.demand, 0));
                    } else {
                        energyEfficiency = 1;
                    }

                    playerData.buildEfficiencyStr = '' + Number(100 * metalEfficiency * energyEfficiency).toFixed(0) + '%';
                }
            }
            return playersTemp;
        });
        self.player = ko.computed(function () {
            var player = '';
            if (self.players() && self.players().length && self.armyId()) {
                player = _.find(self.players(), function (player) {
                    return player.id === self.armyId();
                })
            }
            return player;
        });
        self.sortedPlayersArray = ko.computed(function () {
            var p = [];
            var r = [];
            var i = -1;
            var t;
            if (self.players) {
                //sort each army by its alliance group
                _.forEach(self.players(), function (player) {
                    if (!_.isArray(p[player.alliance_group]))
                        p[player.alliance_group] = [];
                    p[player.alliance_group].push(player);
                });
                //break alliance group 0 into individuals (shared armies)
                _.forEach(p[0], function (player) { r.push([player]) });
                p.shift()
                r = r.concat(p);
            }
            //find player group and move to front of array
            if (self.player()) {
                _.forEach(r, function (group, index) {
                    if (group.indexOf(self.player()) > -1)
                        i = index;
                });
                t = r.splice(i, 1);
                r.unshift(t[0]);
            }
            return r;
        });
        self.sortedPlayerList = ko.computed(function () {
            return _.flatten(self.sortedPlayersArray());
        })
        self.showPlayerViewModels = ko.computed(function () {
            return self.players() && self.players().length;
        });

        self.playerToolTip = function (army) {
            return "<div class='div_player_name_status_tooltip'>" +
                       "<span class='div_player_name_tooltip truncate'> " + army.name + " </span>" +
                       "<span class='div_player_landing'>" + (self.showLanding() ? army.landing ? 'SELECTING' : 'READY' : '') + "</span>" +
                       "<span class='div_player_defeated'>" + (army.defeated ? 'ANNIHILATED' : '') + "</span>" +
                   "</div>";
        };

        var toggleImage = function(open) { 
            return open ? 'coui://ui/main/shared/img/controls/pin_open.png' : 'coui://ui/main/shared/img/controls/pin_closed.png';
        };
        var bodyResize = function() {
            api.Panel.onBodyResize();
            // Wait a frame and try again, just in case.
            _.delay(api.Panel.onBodyResize);
        };
        
        // Pinning
        self.pinPlayerListPanel = ko.observable(false);
        self.togglePinPlayerListPanel = function () { self.pinPlayerListPanel(!self.pinPlayerListPanel()); };
        self.showPlayerListPanel = ko.computed(function () { return self.pinPlayerListPanel() && self.showPlayerViewModels() });
        self.showPlayerListPanel.subscribe(bodyResize);
        self.playerPanelToggleImage = ko.computed(function() { return toggleImage(self.showPlayerListPanel()); });

        self.pinSpectatorPanel = ko.observable(false);
        self.togglePinSpectatorPanel = function () { self.pinSpectatorPanel(!self.pinSpectatorPanel()); };
        self.showSpectatorPanel = ko.computed(function () { return self.pinSpectatorPanel() && self.showPlayerViewModels() && self.isSpectator() });
        self.showSpectatorPanel.subscribe(bodyResize);
        self.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(self.showSpectatorPanel()); });
        
        self.spectatorPanelMode = ko.observable(0);
        
        self.setDiplomaticState = function (targetArmyid, state) {
            self.send_message('change_diplomatic_state', { targetArmyId: targetArmyid, state: state });
        };
        
        self.acceptAllianceRequest = function (army) {
            self.setDiplomaticState(army.id, 'allied');
        };

        self.ignoreRequests = ko.observable({});
        self.allianceRequestsReceived.subscribe(function(newReqs) {
            if (!newReqs.length)
                self.ignoreRequests({});
        });
        self.ignoreAllianceRequest = function(army) {
            army.diplomaticState[self.armyId()].allianceRequest = false;
            self.ignoreRequests()[army.id] = true;
            self.ignoreRequests.notifySubscribers();
            self.players.notifySubscribers();
        };

        self.sendAllianceRequest = function (army) {
            self.setDiplomaticState(army.id, 'allied');
        };

        self.isHostile = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return army ? self.player().diplomaticState[army.id].state === 'hostile' : false;
        };
        self.isNeutral = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return army ? self.player().diplomaticState[army.id].state === 'neutral' : false;
        };
        self.isAlly = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return army ? self.player().diplomaticState[army.id].state === 'allied'
                || self.player().diplomaticState[army.id].state === 'allied_eco' : false;
        };
        self.isAllyLocked = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return
            var diplomatic_state = self.player().diplomaticState[army.id];
            return (diplomatic_state.state === 'allied' || diplomatic_state.state === 'allied_eco')
                    && !diplomatic_state.mutable;
        };
        self.isSharingEco = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return army ? self.player().diplomaticState[army.id].state === 'allied_eco' : false;
        };
        self.hasAllianceRequest = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return !!self.player().diplomaticState[army.id].allianceRequest;
        };

        self.showRequestAlliance = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return !self.player().diplomaticState[army.id].allianceRequest && !self.isAlly(army)
        };
        self.showSentAllianceRequest = function (army) {
            if (!army || !self.player() || !self.player().diplomaticState || !self.player().diplomaticState[army.id])
                return;
            return self.player().diplomaticState[army.id].allianceRequest && !self.isAlly(army)
        };
        self.showAllied = function (army) {
            return self.isAlly(army) && !self.isAllyLocked(army)
        };
        self.showAlliedLocked = function (army) {
            return self.isAllyLocked(army)
        };
        self.numAllianceRequests = ko.computed(function() {
            return self.allianceRequestsReceived().length - _.keys(self.ignoreRequests()).length;
        });
        self.showAllianceRequestReceived = function (army) {
            if (!army || !army.diplomaticState || !army.diplomaticState[self.armyId()])
                return;
            return army.diplomaticState[self.armyId()].allianceRequest && !self.isAlly(army) && !self.ignoreRequests()[army.id];
        };

        self.visionSelectAll = function() { 
            api.Panel.message(api.Panel.parentId, 'panel.invoke', ['visionSelectAll']); 
        };
        self.visionSelect = function(index, event) { 
            api.Panel.message(api.Panel.parentId, 'panel.invoke', 
                ['visionSelect', index, {shiftKey: event.shiftKey}]); 
        };
        
        self.energyTextColorCSS = function (index) {
            if (index >= self.spectatorArmyData().length)
                return 'color_positive';

            var spectatorData = self.spectatorArmyData()[index];
            var energyEfficiency;
            if (spectatorData.energy.demand > 0 && spectatorData.energy.current === 0) {
                energyEfficiency = Math.min(1, Math.max(spectatorData.energy.production / spectatorData.energy.demand, 0));
            } else {
                energyEfficiency = 1;
            }

            var energyFraction = spectatorData.energy.current / spectatorData.energy.storage;

            if (energyEfficiency === 1 && energyFraction === 1) {
                return 'color_waste';
            } else if (energyEfficiency < 1 && energyFraction === 0) {
                return 'color_negative';
            } else {
                return 'color_positive';
            }
        };

        self.metalTextColorCSS = function (index) {
            if (index >= self.spectatorArmyData().length)
                return 'color_positive';

            var spectatorData = self.spectatorArmyData()[index];
            var metalEfficiency;
            if (spectatorData.metal.demand > 0 && spectatorData.metal.current === 0) {
                metalEfficiency = Math.min(1, Math.max(spectatorData.metal.production / spectatorData.metal.demand, 0));
            } else {
                metalEfficiency = 1;
            }

            var metalFraction = spectatorData.metal.current / spectatorData.metal.storage;

            if (metalEfficiency === 1 && metalFraction === 1) {
                return 'color_waste';
            } else if (metalEfficiency < 1 && metalFraction === 0) {
                return 'color_negative';
            } else {
                return 'color_positive';
            }
        };

        self.efficiencyTextColorCSS = function (index) {
            if (index >= self.spectatorArmyData().length)
                return 'color_positive';

            var spectatorData = self.spectatorArmyData()[index];

            var metalEfficiency;
            if (spectatorData.metal.demand > 0 && spectatorData.metal.current === 0) {
                metalEfficiency = Math.min(1, Math.max(spectatorData.metal.production / spectatorData.metal.demand, 0));
            } else {
                metalEfficiency = 1;
            }

            var energyEfficiency;
            if (spectatorData.energy.demand > 0 && spectatorData.energy.current === 0) {
                energyEfficiency = Math.min(1, Math.max(spectatorData.energy.production / spectatorData.energy.demand, 0));
            } else {
                energyEfficiency = 1;
            }

            var efficiency = metalEfficiency * energyEfficiency;

            if (efficiency === 1) {
                return 'color_positive';
            } else if (efficiency >= 0.8) {
                return 'color_warning';
            } else {
                return 'color_negative';
            }
        };

        self.isPlayerKnown = function(armyId) {
            return self.playerContactMap()[armyId];
        };

        self.lookAtPlayerIfKnown = function(armyId) {
            if (!self.isPlayerKnown(armyId))
                return;

            api.camera.lookAt(self.playerContactMap()[armyId]);
        };

        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
            
            api.Panel.query(api.Panel.parentId, 'panel.invoke', ['playerListState']).then(self.state);
        };
    }
    model = new PlayerListViewModel();

    handlers.state = model.state;
    handlers.spectator_data = function (payload) {
        model.spectatorArmyData(payload.armies);
    };
    handlers.set_pin_state = function (payload) {
        if (model.isSpectator())
            model.pinSpectatorPanel(!!payload);
        else
            self.pinPlayerListPanel = ko.observable(false);
    };

    // inject per scene mods
    if (scene_mod_list['live_game_players'])
        loadMods(scene_mod_list['live_game_players']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
