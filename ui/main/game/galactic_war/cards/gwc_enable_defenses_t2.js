// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:advanced_defense_technology_enables_more_powerful_defenses_advanced_defenses_are_built_via_advanced_fabricators_advanced_defenses_include_tactical_missile_launchers_triple_barrel_laser_turrets_and_anti_air_flak_towers.message):Advanced Defense Technology enables more powerful defenses. Advanced defenses are built via advanced fabricators. Advanced defenses include tactical missile launchers, triple barrel laser turrets, and anti-air flak towers.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:advanced_defense_technology.message):Advanced Defense Technology';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_defense.png';
        },
        audio: function (parms) {
            return {
                found: '/VO/Computer/gw/board_tech_available_defence'
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
                    chance = 500;
                    if (dist > 5)
                        chance = 62;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 500;
                    if (dist > 6)
                        chance = 62;
                }
                else {
                    chance = 500;
                    if (dist > 7)
                        chance = 62;
                }
            }
            return { chance: chance };
        },
        buff: function(inventory, params) {
            inventory.addUnits([
                '/pa/units/land/laser_defense_adv/laser_defense_adv.json',
                '/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json',
                '/pa/units/land/air_defense_adv/air_defense_adv.json'
            ]);
        },
        dull: function(inventory) {
        }
    };
});
