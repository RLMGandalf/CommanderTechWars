// !LOCNS:galactic_war
define(['shared/gw_common'], function (GW) {
    return {
        visible: function(params) { return true; },
        describe: function(params) { 
            return '!LOC(galactic_war:naval_ammunition_tech_increases_the_damage_of_all_naval_vessels_by_25.message):Naval Ammunition Tech increases the damage of all naval vessels by 25%';
        },
        summarize: function(params) {
            return '!LOC(galactic_war:naval_ammunition_tech.message):Naval Ammunition Tech';
        },
        icon: function(params) {
            return 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_naval.png';
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
                    if (dist > 7)
                        chance = 120;
                }
            }

            return { chance: chance };
        },
        buff: function(inventory, params) {
            var units = [
                '/pa/units/sea/frigate/frigate_ammo_shell.json',
                '/pa/units/sea/frigate/frigate_ammo_aa.json',
                '/pa/units/sea/destroyer/destroyer_ammo.json',
                '/pa/units/sea/destroyer/destroyer_torpedo_ammo.json',
                '/pa/units/sea/sea_scout/sea_scout_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_aa_ammo.json',
                '/pa/units/sea/missile_ship/missile_ship_ammo.json',
                '/pa/units/sea/battleship/battleship_ammo.json',
            ];
            var mods = [];
            var modUnit = function(unit) {
                mods.push({
                    file: unit,
                    path: 'damage',
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
