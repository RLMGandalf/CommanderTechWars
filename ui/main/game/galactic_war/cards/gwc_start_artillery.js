// !LOCNS:galactic_war
define([
    'module',
    'shared/gw_common',
    'cards/gwc_start'
], function (
    module,
    GW,
    GWCStart
) {
    var CARD = { id: /[^\/]+$/.exec(module.id).pop() };

    return {
        visible: function (params) { return false; },
        summarize: function (params) {
            return '!LOC(galactic_war:artillery_commander.message):Artillery Commander';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return '!LOC(galactic_war:the_artillery_commander_loadout_contains_all_artillery_units_and_reduces_costs_of_those_structures_by_75_it_also_enables_the_commander_to_build_radar_double_barrelled_turrets_and_basic_artillery_turrets.message):The Artillery Commander loadout contains all artillery units and reduces costs of those structures by 75%. It also enables the Commander to build radar, double barrelled turrets and basic artillery turrets.'; },
        hint: function() { 
            return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: '!LOC(galactic_war:commander_invictus_is_rumored_to_have_this_long_ranged_loadout_on_the_kohr_system.message):Commander Invictus is rumored to have this long ranged loadout on the Kohr System.'
            };
        },
        deal: function (system) {
            return {
                params: {
                    allowOverflow: true
                },
                chance: 0
            };
        },
        buff: function (inventory) {
            if (inventory.lookupCard(CARD) === 0) {
                // Make sure we only do the start buff/dull once
                var buffCount = inventory.getTag('', 'buffCount', 0);
                if (!buffCount) {
                    GWCStart.buff(inventory);
                    inventory.addUnits([
                        '/pa/units/land/artillery_long/artillery_long.json',
                        '/pa/units/land/artillery_short/artillery_short.json',
                    ]);
                    var units = [
                        '/pa/units/land/laser_defense/laser_defense.json',
                        '/pa/units/land/artillery_short/artillery_short.json',
                        '/pa/units/land/artillery_long/artillery_long.json',
                        '/pa/units/land/radar/radar.json',
                        '/pa/units/orbital/orbital_launcher/orbital_launcher.json'
                    ];
                    var mods = [];
                    var modUnit = function (unit) {
                        mods.push({
                            file: unit,
                            path: 'unit_types',
                            op: 'push',
                            value: 'UNITTYPE_CmdBuild',
                        });
                    };
                    _.forEach(units, modUnit);
                    var costUnits = [
                        '/pa/units/land/artillery_short/artillery_short.json',
                        '/pa/units/land/artillery_long/artillery_long.json',
                    ];
                    var modCostUnit = function (unit) {
                        mods.push({
                            file: unit,
                            path: 'build_metal_cost',
                            op: 'multiply',
                            value: 0.25
                        });
                    };
                    _.forEach(costUnits, modCostUnit);
                    inventory.addMods(mods);
                }
                else {
                    // Don't clog up a slot.
                    inventory.maxCards(inventory.maxCards() + 1);
                }
                ++buffCount;
                inventory.setTag('', 'buffCount', buffCount);
            }
            else {
                // Don't clog up a slot.
                inventory.maxCards(inventory.maxCards() + 1);
                GW.bank.addStartCard(CARD);
            }
        },
        dull: function (inventory) {
            if (inventory.lookupCard(CARD) === 0) {
                var buffCount = inventory.getTag('', 'buffCount', 0);
                if (buffCount) {
                    // Perform dulls here
                    
                    inventory.setTag('', 'buffCount', undefined);
                }
            }
        }
    };
});
