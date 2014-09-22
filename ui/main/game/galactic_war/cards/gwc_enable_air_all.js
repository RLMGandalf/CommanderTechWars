// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:complete_air_tech_enables_building_of_all_mobile_air_units_and_factories_basic_air_factories_are_built_via_your_commander_or_any_basic_fabricator_advanced_factories_are_built_via_a_basic_or_advanced_vehicle_fabricator.message):Complete air tech enables building of all mobile air units and factories. Basic air factories are built via your commander or any basic fabricator. Advanced factories are built via a basic or advanced vehicle fabricator.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:complete_air_tech.message):Complete Air Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_combat_air.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_air'
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
                    chance = 500;
                    if (dist > 2)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 500;
                    if (dist > 3)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 14;
                    if (dist > 5)
                        chance = 71;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 14;
                    if (dist > 6)
                        chance = 71;
                }
                else {
                    chance = 14;
                    if (dist > 7)
                        chance = 71;
                }
            }
            return { chance: chance };

        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/air/air_factory/air_factory.json',
                '/pa/units/air/air_factory_adv/air_factory_adv.json',
                '/pa/units/air/air_scout/air_scout.json',
                '/pa/units/air/bomber/bomber.json',
                '/pa/units/air/fighter/fighter.json',
            ]);
        },
        dull: function(inventory) {
        }
    };
});
