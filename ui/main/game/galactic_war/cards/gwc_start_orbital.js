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
            return '!LOC(galactic_war:orbital_commander.message):Orbital Commander';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return '!LOC(galactic_war:the_orbital_commander_loadout_contains_all_orbital_units_and_factories.message):The Orbital Commander loadout contains all orbital units and factories.'; },
        hint: function () {
            return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: '!LOC(galactic_war:defeat_first_seeker_osiris_on_alenquer_then_and_only_then_you_will_find_this_high_flying_loadout.message):Defeat First Seeker Osiris on Alenquer, then, and only then, you will find this high flying loadout.'
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
                        '/pa/units/orbital/orbital_fighter/orbital_fighter.json',
                        '/pa/units/orbital/radar_satellite/radar_satellite.json',
                        '/pa/units/orbital/solar_array/solar_array.json',
                        '/pa/units/orbital/orbital_factory/orbital_factory.json',
                        '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json',
                        '/pa/units/orbital/defense_satellite/defense_satellite.json',
                        '/pa/units/orbital/orbital_laser/orbital_laser.json',
                        '/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json',
                        '/pa/units/orbital/mining_platform/mining_platform.json'
                    ]);
                    var units = [
                        '/pa/units/orbital/orbital_launcher/orbital_launcher.json',
                        '/pa/units/orbital/deep_space_radar/deep_space_radar.json',
                        '/pa/units/orbital/ion_defense/ion_defense.json'
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
                    inventory.addMods(mods);
                    var buildUnits = [
                        '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json'
                    ];
                    var modBuildUnits = function (unit) {
                        mods.push({
                            file: unit,
                            path: 'buildable_types',
                            op: 'replace',
                            value: "FabBuild | FabOrbBuild"
                        });
                    };
                    _.forEach(buildUnits, modBuildUnits);
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
