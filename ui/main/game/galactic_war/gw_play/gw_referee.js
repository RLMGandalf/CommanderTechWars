define([
    'shared/gw_common'
], function(
    GW
) {

    var GWReferee = function(game) {
        var self = this;
                
        self.game = ko.observable(game);
        
        self.files = ko.observable();
        self.localFiles = ko.observable();
        self.config = ko.observable();
    };
    
    var generateGameFiles = function() {
        var self = this;
        
        // Game file generation cannot use previously mounted files.  That would be bad.
        api.file.unmountAllMemoryFiles();
        
        var done = $.Deferred();
        var aiFileGen = $.Deferred();
        var playerFileGen = $.Deferred();
        var unitsLoad = $.get('coui://pa/units/unit_list.json');
        var aiMapLoad = $.get('coui://pa/ai/ai_unit_map.json');
        $.when(unitsLoad, aiMapLoad).then(function(
            unitsGet,
            aiMapGet
        ) {
            var units = JSON.parse(unitsGet[0]).units;
            var aiUnitMap = JSON.parse(aiMapGet[0]);
            var enemyAIUnitMap = GW.specs.genAIUnitMap(aiUnitMap, '.ai');
            var playerAIUnitMap = GW.specs.genAIUnitMap(aiUnitMap, '.player');
            GW.specs.genUnitSpecs(units, '.ai').then(function(aiSpecFiles) {
                var aiFiles = _.assign({'/pa/ai/ai_unit_map.json.ai': enemyAIUnitMap}, aiSpecFiles);
                aiFileGen.resolve(aiFiles);
            });
            var inventory = self.game().inventory();
            GW.specs.genUnitSpecs(inventory.units(), '.player').then(function(playerSpecFiles) {
                var playerFiles = _.assign({'/pa/ai/ai_unit_map.json.player': playerAIUnitMap}, playerSpecFiles);
                GW.specs.modSpecs(playerFiles, inventory.mods(), '.player');
                playerFileGen.resolve(playerFiles);
            });
        });
        $.when(aiFileGen, playerFileGen).then(function(
            aiFiles,
            playerFiles
        ) {
            var files = _.assign({}, aiFiles, playerFiles);
            self.files(files);
            done.resolve();
        });
        return done.promise();
    };
    
    var generateConfig = function() {
        var self = this;

        var game = self.game();
        var galaxy = game.galaxy();
        var battleGround = galaxy.stars()[game.currentStar()];
        var system = battleGround.system();
        var ai = battleGround.ai();
        var inventory = game.inventory();
        var playerColor = inventory.getTag('global', 'playerColor');
        var playerCommander = inventory.getTag('global', 'commander');
        var armies = [];
        armies.push({
            slots: [{ name: 'Player' }],
            color: playerColor,
            econ_rate: 1,
            spec_tag: '.player',
            alliance_group: 1
        });
        _.forEach(inventory.minions(), function(minion) {
            armies.push({
                slots: [{
                    ai: true,
                    name: minion.name || 'Helper',
                    commander: _.cloneDeep(minion.commander || playerCommander)
                }],
                color: minion.color || [playerColor[1], playerColor[0]],
                econ_rate: minion.econ_rate || 1,
                personality: minion.personality,
                spec_tag: '.player',
                alliance_group: 1
            });
        });
        armies.push({
            slots: [{ 
                ai: true,
                name: ai.name,
                commander: _.cloneDeep(ai.commander)
            }],
            color: ai.color,
            econ_rate: ai.econ_rate,
            personality: ai.personality,
            spec_tag: '.ai',
            alliance_group: 2
        });
        _.forEach(ai.minions, function(minion) {
            armies.push({
                slots: [{
                    ai: true,
                    name: minion.name || 'Helper',
                    commander: _.cloneDeep(minion.commander || ai.commander)
                }],
                color: minion.color || [ai.color[1], ai.color[0]],
                econ_rate: minion.econ_rate || ai.econ_rate,
                personality: minion.personality,
                spec_tag: '.ai',
                alliance_group: 2
            });
        });
        var config = {
            files: self.files(),
            armies: armies,
            player: {
                commander: _.cloneDeep(playerCommander)
            },
            system: system
        };
        _.forEach(config.armies, function(army) {
            _.forEach(army.slots, function(slot) {
                if (slot.ai)
                    slot.commander.UnitSpec += (army.alliance_group === 1) ? '.player' : '.ai';
            });
        });
        config.player.commander.UnitSpec += '.player';
        // Store the game in the config for diagnostic purposes.
        config.gw = game.save();
        self.config(config);
    };

    GWReferee.prototype.mountFiles = function() {
        var self = this;

        var allFiles = _.cloneDeep(self.files());
        // The player unit list needs to be the superset of units for proper UI behavior
        var playerUnits = allFiles['/pa/units/unit_list.json.player']
        var aiUnits = allFiles['/pa/units/unit_list.json.ai'];
        if (playerUnits) {
            var allUnits = _.cloneDeep(playerUnits);
            if (aiUnits && allUnits.units) {
                allUnits.units = allUnits.units.concat(aiUnits.units);
            }
            allFiles['/pa/units/unit_list.json'] = allUnits;
        }
        
        if (self.localFiles()) {
            _.extend(allFiles, self.localFiles());
        }
        
        var cookedFiles = _.mapValues(allFiles, function(value) {
            if (typeof value !== 'string')
                return JSON.stringify(value);
            else
                return value;
        });
        api.file.unmountAllMemoryFiles();
        api.file.mountMemoryFiles(cookedFiles);
    };
    
    GWReferee.prototype.tagGame = function() {
        api.game.setUnitSpecTag('.player');
    };
    
    return {
        hire: function(game) { 
            var result = new $.Deferred();
            var ref = new GWReferee(game);
            return (_.bind(generateGameFiles, ref)())
                .then(_.bind(generateConfig, ref))
                .then(function() { return ref; });
            
            return result.promise();
        }
    };
});