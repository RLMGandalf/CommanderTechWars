// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:complete_orbital_tech_enables_building_of_all_orbital_units_and_all_orbital_factories_orbital_launchers_are_built_by_any_basic_fabricator_orbital_factories_are_built_via_an_orbital_fabricator.message):Complete Orbital Tech enables building of all orbital units and all orbital Factories. Orbital launchers are built by any basic fabricator. Orbital factories are built via an orbital fabricator.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:complete_orbital_tech.message):Complete Orbital Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_orbital.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_orbital'
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
                    chance = 750;
                    if (dist > 2)
                        chance = 92;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 750;
                    if (dist > 3)
                        chance = 92;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 75;
                    if (dist > 5)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 75;
                    if (dist > 6)
                        chance = 62;
                }
                else {
                    chance = 75;
                    if (dist > 7)
                        chance = 62;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/orbital/orbital_fighter/orbital_fighter.json',
                '/pa/units/orbital/radar_satellite/radar_satellite.json',
                '/pa/units/orbital/solar_array/solar_array.json',
                '/pa/units/orbital/orbital_factory/orbital_factory.json',
                '/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json',
                '/pa/units/orbital/orbital_laser/orbital_laser.json',
                '/pa/units/orbital/mining_platform/mining_platform.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});
