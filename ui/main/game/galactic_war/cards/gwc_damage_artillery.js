// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:artillery_ammunition_tech_increases_the_damage_of_all_artillery_structures_by_25_and_reduces_their_energy_usage_by_90_requires_technology_to_build_artillery_structures_and_units.message):Artillery Ammunition Tech increases the damage of all artillery structures by 25% and reduces their energy usage by 90%. Requires technology to build artillery structures and units.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:artillery_ammunition_tech.message):Artillery Ammunition Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_artillery.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_weapon_upgrade'
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
                    chance = 12;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 12;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 24;
                    if (dist > 6)
                        chance = 120;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 24;
                    if (dist > 9)
                        chance = 120;
                }
                else {
                    chance = 24;
                    if (dist > 12)
                        chance = 120;
                }
            }

            return { chance: chance };

        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/land/artillery_short/artillery_short_ammo.json',
                '/pa/units/land/artillery_long/artillery_long_ammo.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: unit,
                    path: 'splash_damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(units, modUnit);
            var weaps = [
                '/pa/units/land/artillery_short/artillery_short_tool_weapon.json',
                '/pa/units/land/artillery_long/artillery_long_tool_weapon.json',
            ];
            var modWeap = function (weap) {
                mods.push({
                    file: weap,
                    path: 'ammo_capacity',
                    op: 'multiply',
                    value: 0.1
                });
                mods.push({
                    file: weap,
                    path: 'ammo_demand',
                    op: 'multiply',
                    value: 0.1
                });
                mods.push({
                    file: weap,
                    path: 'ammo_per_shot',
                    op: 'multiply',
                    value: 0.1
                });
            };
            _.forEach(weaps, modWeap);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
