var model;
var handlers = {};

$(document).ready(function () {
    
    function ActionBarViewModel() {
        var self = this;
        
        self.keybinds = ko.observable({});
        self.keybindsForCommandModes = ko.computed(function () {
            return self.keybinds().commands || [];
        });
        self.keybindsForOrders = ko.computed(function () {
            return self.keybinds().orders || [];
        });
        
        self.unitSpecs = ko.observable({});
        self.selection = ko.observable({});
        
        self.parsedUnitSpecs = ko.computed(function() {
            var unitSpecs = self.unitSpecs();
            _.forIn(unitSpecs, function(unit) {
                if (unit.build || unit.projectiles) {
                    _.forEach(['build', 'projectiles'], function (element) {
                        unit.canBuild |= _.some(unit[element] || [], function(target) { return target.buildGroup !== 'misc'; });
                    });
                }
            });
            return unitSpecs;
        });
        
        self.parsedSelection = ko.computed(function() {
            var i = 0;
            var selectionCanBuild = false;
            var selectionConsumesEnergy = false;

            var allowedCommands = {};
            
            var payload = self.selection();
            var unitSpecs = self.parsedUnitSpecs();

            for (var id in payload.spec_ids) {
                var unit = unitSpecs[id];
                if (!unit)
                    continue;

                for (i = 0; i < unit.commands.length; i++)
                    allowedCommands[unit.commands[i]] = true;

                if (unit.consumption.energy > 0)
                    selectionConsumesEnergy = true;
                
                selectionCanBuild |= unit.canBuild;
            }

            _.delay(api.Panel.onBodyResize);
            
            return {
                allowedCommands: allowedCommands,
                mobile : payload.selected_mobile,
                canBuild: selectionCanBuild,
                consumesEnergy: selectionConsumesEnergy,
                weapon0: (payload.weapon || [])[0],
                movement0 : (payload.movement || [])[0],
                energy0: (payload.energy || [])[0],
                build0: (payload.build || [])[0]
            };
        });
        
        self.allowedCommands = ko.computed(function() { return self.parsedSelection().allowedCommands; });
        self.selectionMobile = ko.computed(function() { return self.parsedSelection().mobile; });
        self.selectionCanBuild = ko.computed(function() { return self.parsedSelection().canBuild; })
        self.selectionConsumesEnergy = ko.computed(function() { return self.parsedSelection().consumesEnergy; })
        
        self.state = ko.observable({});
        self.state.subscribe(function() {
            api.Panel.onBodyResize();
            _.delay(api.Panel.onBodyResize);
        });
        self.showCommands = ko.computed(function() { return self.state().show_commands && !_.isEmpty(self.allowedCommands()); });
       
        self.allowMove = ko.computed(function() { return self.allowedCommands()['Move']; });
        self.allowAttack = ko.computed(function() { return self.allowedCommands()['Attack']; });
        self.allowAssist = ko.computed(function() { return self.allowedCommands()['Assist']; });
        self.allowRepair = ko.computed(function() { return self.allowedCommands()['Repair']; });
        self.allowReclaim = ko.computed(function() { return self.allowedCommands()['Reclaim']; });
        self.allowPatrol = ko.computed(function() { return self.allowedCommands()['Patrol']; });
        self.allowUse = ko.computed(function() { return self.allowedCommands()['Use']; });
        self.allowSpecialMove = ko.computed(function() { return self.allowedCommands()['SpecialMove']; });
        self.allowUnload = ko.computed(function() { return self.allowedCommands()['Unload']; });
        self.allowLoad = ko.computed(function() { return self.allowedCommands()['Load']; });
        self.allowFireSecondaryWeapon = ko.computed(function() { return self.allowedCommands()['FireSecondaryWeapon']; });

        self.allowStop = ko.computed(function() { return !_.isEmpty(self.allowedCommands()); });

        self.allowFireOrders = ko.computed(function() { return self.allowAttack() && (self.selectionMobile() || !self.selectionCanBuild()); });
        self.allowMoveOrders = ko.computed(function() { return self.allowMove() && self.selectionMobile() && self.allowFireOrders(); });
        self.allowEnergyOrders = ko.computed(function() { return self.selectionCanBuild() || self.selectionConsumesEnergy() || self.allowRepair() || self.allowReclaim(); });
        self.allowBuildStanceOrders = ko.computed(function () { return self.selectionCanBuild() && !self.selectionMobile(); });

        self.hasOrderGroup = ko.computed(function () {
            return self.allowFireOrders()
                    || self.allowMoveOrders()
                    || self.allowEnergyOrders()
                    || self.allowBuildStanceOrders();
        });
        self.showOrders = ko.computed(function () { return self.state().show_orders && self.hasOrderGroup() });
        
        self.cmdIndex = ko.observable(-1);
        self.parsedSelection.subscribe(function() {
            self.cmdIndex(-1);
        });
        self.state.subscribe(function(newState) {
            self.cmdIndex(newState.cmd_index);
        });
        
        self.isMove = ko.computed(function () { return self.cmdIndex() === 0; });
        self.isAttack = ko.computed(function () { return self.cmdIndex() === 1; });
        self.isAssist = ko.computed(function () { return self.cmdIndex() === 2; });
        self.isRepair = ko.computed(function () { return self.cmdIndex() === 3; });
        self.isReclaim = ko.computed(function () { return self.cmdIndex() === 4; });
        self.isPatrol = ko.computed(function () { return self.cmdIndex() === 5; });
        self.isUse = ko.computed(function () { return self.cmdIndex() === 6; });

        self.isSpecialMove = ko.computed(function () { return self.cmdIndex() === 7; });
        self.isSpecialAttack = ko.computed(function () { return self.cmdIndex() === 8; });
        self.isUnload = ko.computed(function () { return self.cmdIndex() === 9; });
        self.isLoad = ko.computed(function () { return self.cmdIndex() === 10; });
        self.isFireSecondaryWeapon = ko.computed(function () { return self.cmdIndex() === 12; });

        self.hoverIndex = ko.observable(-1);
        self.hoverIndexMutationCount = ko.observable(0);
        self.setHoverIndex = function(index) {
            self.hoverIndexMutationCount(self.hoverIndexMutationCount() + 1); 
            self.hoverIndex(index);
        };
        
        self.setCommandIndex = function(index) {
            self.cmdIndex(index);
            api.Panel.message(api.Panel.parentId, 'action_bar.set_command_index', index);
        };
        
        self.clearHoverIndex = function() {
            var mutationCount = self.hoverIndexMutationCount();
            _.delay(function() { 
                if (self.hoverIndexMutationCount() === mutationCount)
                    self.setHoverIndex(-1);
            }, 500);
        };
        
        var invertOrderList = function(list) { 
            var result = _.invert(list);
            _.forIn(result, function(value, key) { 
                result[key] = parseInt(value); 
            });
            return result;
        };
        
        self.fireOrders = ko.observableArray(['fire at will', 'return fire', 'hold fire']);
        self.fireOrdersMap = invertOrderList(self.fireOrders());
        self.selectedFireOrderIndex = ko.observable(0);
        ko.computed(function() { 
            var selection = self.parsedSelection();
            var order = self.fireOrdersMap[selection.weapon0];
            if (order !== undefined)
                self.selectedFireOrderIndex(order);
        });
        self.selectedFireOrderImage = ko.computed(function() {
            var images = [
                'img/orders_bar/icons_orders_fire_at_will.png',
                'img/orders_bar/icons_orders_fire_return.png',
                'img/orders_bar/icons_orders_fire_hold.png'
            ];
            return images[self.selectedFireOrderIndex()];
        });

        self.toggleFireOrderIndex = function () {
            var index = (self.selectedFireOrderIndex() + 1) % self.fireOrders().length;
            var order = self.fireOrders()[index];
            if (order)
                engine.call('set_order_state', 'weapon', order);
            self.selectedFireOrderIndex(index);
            return index;
        };
        self.selectionFireAtWill = function () {
            self.selectedFireOrderIndex(0);
            engine.call('set_order_state', 'weapon', 'fire at will');
        };

        self.selectionReturnFire = function () {
            self.selectedFireOrderIndex(1);
            engine.call('set_order_state', 'weapon', 'return fire');
        };

        self.selectionHoldFire = function () {
            self.selectedFireOrderIndex(2);
            engine.call('set_order_state', 'weapon', 'hold fire');
        };

        self.moveOrders = ko.observableArray(['maneuver', 'roam', 'hold position']);
        self.moveOrdersMap = invertOrderList(self.moveOrders());
        self.selectedMoveOrderIndex = ko.observable(0);
        ko.computed(function() { 
            var selection = self.parsedSelection();
            var order = self.moveOrdersMap[selection.movement0];
            if (order !== undefined)
                self.selectedMoveOrderIndex(order);
        });
        self.selectedMoveOrderImage = ko.computed(function() {
            var images = [
                'img/orders_bar/icons_orders_move_maneuver.png',
                'img/orders_bar/icons_orders_move_roam.png',
                'img/orders_bar/icons_orders_move_hold.png'
            ];
            return images[self.selectedMoveOrderIndex()];
        });

        self.toggleMoveOrderIndex = function () {
            var index = (self.selectedMoveOrderIndex() + 1) % self.moveOrders().length;
            var order = self.moveOrders()[index];
            if (order)
                engine.call('set_order_state', 'movement', order);
            self.selectedMoveOrderIndex(index);
            return index;
        };

        self.selectionManeuver = function () {
            self.selectedMoveOrderIndex(0);
            engine.call('set_order_state', 'movement', 'manuever');
        };

        self.selectionRoam = function () {
            self.selectedMoveOrderIndex(1);
            engine.call('set_order_state', 'movement', 'roam');
        };

        self.selectionHoldPosition = function () {
            self.selectedMoveOrderIndex(2);
            engine.call('set_order_state', 'movement', 'hold position');
        };

        self.energyOrders = ko.observableArray(['consume', 'conserve']);
        self.energyOrdersMap = invertOrderList(self.energyOrders());
        self.selectedEnergyOrderIndex = ko.observable(0);
        ko.computed(function() { 
            var selection = self.parsedSelection();
            var order = self.energyOrdersMap[selection.energy0];
            if (order !== undefined)
                self.selectedEnergyOrderIndex(order);
        });
        self.selectedEnergyOrderImage = ko.computed(function() {
            var images = [
                'img/orders_bar/icons_orders_energy_consume.png',
                'img/orders_bar/icons_orders_energy_hold.png'
            ];
            return images[self.selectedEnergyOrderIndex()];
        });

        self.toggleEnergyOrderIndex = function () {
            var index = (self.selectedEnergyOrderIndex() + 1) % self.energyOrders().length;
            var order = self.energyOrders()[index];
            if (order)
                engine.call('set_order_state', 'energy', order);
            self.selectedEnergyOrderIndex(index);
            return index;
        };

        self.selectionConsume = function () {
            self.selectedEnergyOrderIndex(0);
            engine.call('set_order_state', 'energy', 'consume');
        };

        self.selectionConserve = function () {
            self.selectedEnergyOrderIndex(1);
            engine.call('set_order_state', 'energy', 'conserve');
        };

        self.buildStanceOrders = ko.observableArray(['normal', 'continuous']);
        self.buildStanceOrdersMap = invertOrderList(self.buildStanceOrders());
        self.selectedBuildStanceOrderIndex = ko.observable(0);
        ko.computed(function() { 
            if (self.allowBuildStanceOrders()) {
                var selection = self.parsedSelection();
                var order = self.buildStanceOrdersMap[selection.build0];
                if (order !== undefined)
                    self.selectedBuildStanceOrderIndex(order);
            }
        });
        self.selectedBuildStanceOrderImage = ko.computed(function() {
            var images = [
                'img/orders_bar/icons_orders_build_stance_normal.png',
                'img/orders_bar/icons_orders_build_stance_continuous.png'
            ];
            return images[self.selectedBuildStanceOrderIndex()];
        });

        self.toggleBuildStanceOrderIndex = function () {
            var index = (self.selectedBuildStanceOrderIndex() + 1) % self.buildStanceOrders().length;
            var order = self.buildStanceOrders()[index];
            if (order)
                engine.call('set_order_state', 'build', order);
            self.selectedBuildStanceOrderIndex(index);
            return index;
        };

        self.selectionBuildStanceNormal = function () {
            self.selectedBuildStanceOrderIndex(0);
            engine.call('set_order_state', 'build', 'normal');
        };

        self.selectionBuildStanceContinuous = function () {
            self.selectedBuildStanceOrderIndex(1);
            engine.call('set_order_state', 'build', 'continuous');
        };

        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
            
            api.Panel.query(api.Panel.parentId, 'query.action_keybinds').then(self.keybinds);
            api.Panel.query(api.Panel.parentId, 'query.action_state').then(self.state);
        };
    }
    model = new ActionBarViewModel();
    
    handlers.unit_specs = model.unitSpecs;
    handlers.selection = model.selection;
    
    // From parent panel
    handlers.keybinds = function (payload) {
        model.keybinds(payload)
    }
    
    handlers.state = function (payload) {
        model.state(payload);
    };

    handlers.toggle_order = function(name) {
        var fullName = 'toggle' + name + 'OrderIndex';
        return model[fullName] && model[fullName]();
    };
    handlers.selection_order = function(name) {
        var fullName = 'selection' + name;
        return model[fullName] && model[fullName]();
    };
        
    // inject per scene mods
    if (scene_mod_list['live_game_action_bar'])
        loadMods(scene_mod_list['live_game_action_bar']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
