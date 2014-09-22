// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:commander_combat_tech_increases_the_speed_of_your_commanders_by_200_doubles_commander_health_and_increases_damage_by_25.message):Commander Combat Tech increases the speed of your commanders by 200%, doubles commander health, and increases damage by 25%.';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:commander_combat_tech.message):Commander Combat Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_bot_combat.png';
        },
        audio: function (parms) {
            return {
                found: 'PA/VO/Computer/gw/board_tech_available_combat'
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
                    chance = 28;
                    if (dist > 4)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[1]) {
                    chance = 28;
                    if (dist > 6)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[2]) {
                    chance = 28;
                    if (dist > 9)
                        chance = 142;
                }
                else if (context.totalSize <= GW.balance.numberOfSystems[3]) {
                    chance = 28;
                    if (dist > 11)
                        chance = 142;
                }
                else {
                    chance = 28;
                    if (dist > 13)
                        chance = 142;
                }

            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/commanders/base_commander/base_commander.json',
            ];
            var mods = [];
            var modUnit = function (unit) {
                mods.push({
                    file: unit,
                    path: 'navigation.move_speed',
                    op: 'multiply',
                    value: 3
                });
                mods.push({
                    file: unit,
                    path: 'navigation.brake',
                    op: 'multiply',
                    value: 3
                });
                mods.push({
                    file: unit,
                    path: 'navigation.acceleration',
                    op: 'multiply',
                    value: 3
                });
                mods.push({
                    file: unit,
                    path: 'navigation.turn_speed',
                    op: 'multiply',
                    value: 3
                });
                mods.push({
                    file: unit,
                    path: 'max_health',
                    op: 'multiply',
                    value: 2.0
                });
            };
            _.forEach(units, modUnit);
            var ammos = [
                '/pa/units/commanders/base_commander/base_commander_ammo.json',
                '/pa/ammo/cannon_uber/cannon_uber.json'
            ];
            var ammoMod = function (ammo) {
                mods.push({
                    file: ammo,
                    path: 'damage',
                    op: 'multiply',
                    value: 1.25
                });
                mods.push({
                    file: ammo,
                    path: 'splash_damage',
                    op: 'multiply',
                    value: 1.25
                });
            };
            _.forEach(ammos, ammoMod);
            inventory.addMods(mods);
        },
        dull: function(inventory) {
        }
    };
});
