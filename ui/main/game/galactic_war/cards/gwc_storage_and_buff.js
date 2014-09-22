// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:efficiency_tech_increases_metal_and_energy_production_by_25_tech_also_grants_metal_and_energy_storage.message):Efficiency Tech increases metal and energy production by 25%. Tech also grants metal and energy storage.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:efficiency_tech.message):Efficiency Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_storage_compression.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_economy'
            }
        },
        getContext: function (galaxy) {
            return {
                totalSize: galaxy.stars().length
            };
        },
        deal: function (system, context) {
            var chance = 0;
            var dist = system.distance();
            if (dist > 0) {
                if (context.totalSize <= GW.balance.numberOfSystems[0]) {
                    chance = 250;
                    if (dist > 4)
                        chance = 125;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 250;
                    if (dist > 6)
                        chance = 125;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 250;
                    if (dist > 9)
                        chance = 125;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 250;
                    if (dist > 10)
                        chance = 125;
                }
                else {
                    chance = 250;
                    if (dist > 12)
                        chance = 125;
                }
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/metal_storage/metal_storage.json',
                '/pa/units/land/energy_storage/energy_storage.json'
            ]);
            var units = [
                '/pa/units/land/energy_plant/energy_plant.json',
                '/pa/units/land/energy_plant_adv/energy_plant_adv.json',
                '/pa/units/land/metal_extractor/metal_extractor.json',
                '/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
                '/pa/units/orbital/mining_platform/mining_platform.json',
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'production.energy',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: unit,
                    path: 'production.metal',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(units, modUnit);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
