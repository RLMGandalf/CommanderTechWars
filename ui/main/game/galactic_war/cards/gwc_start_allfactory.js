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
            return '!LOC(galactic_war:assault_commander.message):Assault Commander';
        },
        icon: function (params) {
            return 'coui://ui/main/game/galactic_war/shared/img/red-commander.png';
        },
        describe: function (params) { return '!LOC(galactic_war:the_assault_commander_loadout_contains_all_basic_factories_and_units_but_no_basic_defenses.message):The Assault Commander loadout contains all basic factories and units but no basic defenses.'; },
        hint: function () {
            return {
                icon: 'coui://ui/main/game/galactic_war/gw_play/img/tech/gwc_commander_locked.png',
                description: '!LOC(galactic_war:only_inquisitor_nemicus_knows_the_data_for_this_assault_focused_loadout_find_it_on_patagonia.message):Only Inquisitor Nemicus knows the data for this assault focused loadout. Find it on Patagonia.'
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
                        '/pa/units/land/vehicle_factory/vehicle_factory.json',
                        '/pa/units/land/tank_light_laser/tank_light_laser.json',
                        '/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
                        '/pa/units/land/tank_armor/tank_armor.json',
                        '/pa/units/land/bot_factory/bot_factory.json',
                        '/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json',
                        '/pa/units/land/assault_bot/assault_bot.json',
                        '/pa/units/land/bot_grenadier/bot_grenadier.json',
                        '/pa/units/land/bot_bomb/bot_bomb.json',
                        '/pa/units/air/air_factory/air_factory.json',
                        '/pa/units/air/air_scout/air_scout.json',
                        '/pa/units/air/bomber/bomber.json',
                        '/pa/units/air/fighter/fighter.json',
                    ]);
                    inventory.removeUnits([
                        '/pa/units/land/land_barrier/land_barrier.json',
                        '/pa/units/land/air_defense/air_defense.json',
                        '/pa/units/land/laser_defense_single/laser_defense_single.json',
                        '/pa/units/land/laser_defense/laser_defense.json',
                        '/pa/units/sea/torpedo_launcher/torpedo_launcher.json',
                        '/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json',
                    ]);
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
