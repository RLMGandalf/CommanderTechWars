// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Foundation',
        color: [[145, 87, 199], [192, 192, 192]],
        teams: [
            {
                name: 'Atlas - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'RaptorNemicus',
                        UnitSpec: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    },
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: {
                                ObjectName: 'RaptorRallus',
                                UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                            }
                        }
                    ]
                },
                bossCard: 'gwc_start_air',
                systemDescription: '!LOC(galactic_war:at_one_time_atlas_was_the_most_progenitor_populated_system_outside_of_sol_supporting_a_population_of_nearly_twelve_billion_many_corporations_had_their_headquarters_located_there_including_the_technology_giant_modicumtech_incorporated_atlas_was_one_of_the_last_systems_to_fall_to_the_machine_liberation_army_towards_the_end_of_the_pro_com_war.message):At one time, Atlas was the most Progenitor populated system outside of Sol, supporting a population of nearly twelve billion. Many corporations had their headquarters located there, including the technology giant ModicumTech Incorporated. Atlas was one of the last systems to fall to the Machine Liberation Army towards the end of the Pro-Com War.',
                systemTemplate: {
                    name: 'Atlas - Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [110000, 0],
                            Velocity: [0.00014823, -87.4032],
                            Biomes: ['tropical']
                        }
                    ]
                }
            },
            {
                name: 'Patagonia - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'RaptorNemicus',
                        UnitSpec: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    },
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: {
                                ObjectName: 'RaptorRallus',
                                UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                            }
                        }
                    ]
                },
                bossCard: 'gwc_start_allfactory',
                systemDescription: '!LOC(galactic_war:during_the_first_wave_of_progenitor_coalition_expansion_this_system_was_home_to_the_largest_ranching_operation_in_the_known_galaxy_the_system_was_developed_as_breeding_grounds_for_all_sorts_of_livestock_including_but_not_limited_to_cattle_pigs_sheep_and_chickens_with_the_advent_of_the_synthvictuals_module_the_demands_for_many_types_of_foods_lessened_with_less_of_a_market_for_their_animal_products_ranchers_turned_to_other_sources_of_income_such_as_using_the_animal_waste_and_turning_it_into_a_cheap_source_of_energy_favored_by_settlers.message):During the first wave of Progenitor Coalition expansion, this system was home to the largest ranching operation in the known galaxy. The system was developed as breeding grounds for all sorts of livestock, including but not limited to: cattle, pigs, sheep and chickens. With the advent of the SynthVictuals Module, the demands for many types of foods lessened. With less of a market for their animal products, ranchers turned to other sources of income, such as using the animal waste and turning it into  a cheap source of energy favored by settlers.',
                systemTemplate: {
                    name: 'Patagonia - Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [110000, 0],
                            Velocity: [0.00014823, -87.4032],
                            Biomes: ['tropical']
                        }
                    ]
                }
            },
            {
                name: 'Xylcor - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'RaptorNemicus',
                        UnitSpec: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    },
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: {
                                ObjectName: 'RaptorRallus',
                                UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                            }
                        }
                    ]
                },
                systemDescription: '!LOC(galactic_war:wealthy_entrepreneur_simon_wesselman_took_one_look_at_the_stunning_beauty_of_this_system_and_knew_he_wanted_to_turn_it_into_the_resort_destination_of_choice_for_citizens_of_the_progenitor_coalition_the_only_problem_was_he_did_not_know_about_the_tannwhy_plant_a_plant_that_grew_to_over_seven_feet_tall_and_had_beautiful_pink_flowers_it_also_had_a_taste_for_meat_including_human_wesselman_didn_t_discover_this_until_it_was_too_late_while_inspecting_the_property_around_his_vast_resort_he_stumbled_into_a_thicket_of_the_carnivorous_plants_and_was_promptly_consumed_search_parties_found_nothing_but_his_bones_a_few_days_later_the_resort_was_soon_abandoned_never_to_open_for_business.message):Wealthy entrepreneur Simon Wesselman took one look at the stunning beauty of this system and knew he wanted to turn it into the resort destination of choice for citizens of the Progenitor Coalition. The only problem was he did not know about the Tannwhy plant; a plant that grew to over seven feet tall and had beautiful pink flowers. It also had a taste for meat- including human. Wesselman didn\'t discover this until it was too late. While inspecting the property around his vast resort, he stumbled into a thicket of the carnivorous plants and was promptly consumed. Search parties found nothing but his bones a few days later. The resort was soon abandoned, never to open for business.',
                systemTemplate: {
                    name: 'Xylcor- Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [110000, 0],
                            Velocity: [0.00014823, -87.4032],
                            Biomes: ['tropical']
                        }
                    ]
                }
            },
            {
                name: 'Blogar\'s Fist - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'RaptorNemicus',
                        UnitSpec: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    },
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: {
                                ObjectName: 'RaptorRallus',
                                UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                            }
                        }
                    ]
                },
                systemDescription: '!LOC(galactic_war:known_by_one_name_blogar_was_a_giant_of_a_man_from_unknown_origins_blogar_rose_through_the_ranks_of_the_criminal_world_to_become_the_progenitor_coalition_s_first_criminal_overlord_gaining_a_reputation_for_killing_people_with_one_punch_blogar_used_fear_of_violence_to_get_what_he_wanted_before_he_knew_it_he_had_built_a_criminal_empire_that_spanned_the_galaxy_using_his_now_infamous_strong_arm_tactics_blogar_was_able_to_seize_control_of_a_sparsely_populated_system_and_make_it_his_own_during_the_century_war_blogar_was_reported_to_have_punched_through_a_xziphid_hegemony_warrior_s_exosuit_as_a_result_blogar_became_the_first_human_to_discover_what_the_aliens_really_looked_like_under_the_insect_appearance_of_their_armor.message):Known by one name, Blogar was a giant of a man. From unknown origins, Blogar rose through the ranks of the criminal world to become the Progenitor Coalition\'s first criminal overlord. Gaining a reputation for killing people with one punch, Blogar used fear of violence to get what he wanted. Before he knew it, he had built a criminal empire that spanned the galaxy. Using his now infamous strong arm tactics, Blogar was able to seize control of a sparsely populated system and make it his own. During the Century War, Blogar was reported to have punched through a Xziphid Hegemony warrior\'s exosuit. As a result, Blogar became the first human to discover what the aliens really looked like under the insect appearance of their armor.',
                systemTemplate: {
                    name: 'Blogar\'s Fist - Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [110000, 0],
                            Velocity: [0.00014823, -87.4032],
                            Biomes: ['tropical']
                        }
                    ]
                }
            },
            {
                name: 'Zeta Draconis - Foundation',
                boss: {
                    name: 'Inquisitor Nemicus',
                    econ_rate: 1.0,
                    personality: {
                        percent_land: 0.05,
                        percent_orbital: 0.05,
                        percent_air: 0.55,
                        percent_naval: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'RaptorNemicus',
                        UnitSpec: '/pa/units/commanders/raptor_nemicus/raptor_nemicus.json',
                    },
                    minions: [
                        {
                            name: 'Acolyte Agatho',
                            econ_rate: 1.0,
                            color: [[161, 97, 219], [192, 192, 192]],
                            personality: {
                                percent_land: 0.05,
                                percent_orbital: 0.05,
                                percent_air: 0.55,
                                percent_naval: 0.35,
                                metal_drain_check: 0.75,
                                energy_drain_check: 0.85,
                                metal_demand_check: 0.75,
                                energy_demand_check: 0.85,
                                micro_type: 2,
                                go_for_the_kill: true,
                                neural_data_mod: 1
                            },
                            commander: {
                                ObjectName: 'RaptorRallus',
                                UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                            }
                        }
                    ]
                },
                systemDescription: '!LOC(galactic_war:many_years_into_the_pro_com_war_it_became_clear_that_loyalist_commanders_would_be_imperative_to_a_progenitor_coalition_victory_seizing_upon_this_progenitor_high_command_decided_to_use_one_of_their_best_loyalist_commander_grant_as_bait_to_lure_machine_liberation_army_commander_barca_into_a_trap_knowing_that_barca_was_operating_near_the_system_grant_entered_zeta_draconis_and_prepared_his_trap_eventually_barca_entered_the_system_and_immediately_detected_grant_locating_the_loyalist_barca_could_see_that_grant_had_been_damaged_laying_helpless_next_to_an_active_volcano_barca_moved_in_for_the_kill_at_the_last_instant_grant_rocketed_into_the_air_detonating_the_hidden_explosives_buried_in_the_side_of_the_fiery_mountain_before_he_could_react_barca_found_a_wave_of_lava_washing_over_him_grant_would_use_the_tactic_successfully_two_more_times_before_he_was_lost_during_the_battle_of_cupru.message):Many years into the Pro-Com War it became clear that Loyalist Commanders would be imperative to a Progenitor Coalition victory. Seizing upon this, Progenitor High Command decided to use one of their best, Loyalist Commander Grant, as bait to lure Machine Liberation Army Commander Barca into a trap. Knowing that Barca was operating near the system, Grant entered Zeta Draconis and prepared his trap. Eventually, Barca entered the system and immediately detected Grant. Locating the Loyalist, Barca could see that Grant had been damaged, laying helpless next to an active volcano. Barca moved in for the kill. At the last instant, Grant rocketed into the air, detonating the hidden explosives buried in the side of the fiery mountain. Before he could react, Barca found a wave of lava washing over him. Grant would use the tactic successfully two more times before he was lost during the Battle of Cupru.',
                systemTemplate: {
                    name: 'Zeta Draconis - Foundation',
                    Planets: [
                        {
                            name: 'Atlas Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 650],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['ice_boss']
                        },
                        {
                            name: 'Atlas Beta',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [20, 25],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [0, 25],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [110000, 0],
                            Velocity: [0.00014823, -87.4032],
                            Biomes: ['tropical']
                        }
                    ]
                }
            },
        ], // teams
        minions: [
            {
                name: 'Acolyte Blaz',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Chitrik',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Devi',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Entor',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Frohl',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Glohm',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Hzok',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Intoka',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Juhst',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Khandzta',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Lok',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Nuzto',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Okta',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Pidbok',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Qadir',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorRallus',
                    UnitSpec: '/pa/units/commanders/raptor_rallus/raptor_rallus.json',
                }
            },
            {
                name: 'Acolyte Rinkol',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Sasaki',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Tenkai',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Ull',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Vulko',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Wulk',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Xlti',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorCenturion',
                    UnitSpec: '/pa/units/commanders/raptor_centurion/raptor_centurion.json',
                }
            },
            {
                name: 'Acolyte Yvera',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorBeast',
                    UnitSpec: '/pa/units/commanders/raptor_beast/raptor_beast.json',
                }
            },
            {
                name: 'Acolyte Zhor',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.05,
                    percent_orbital: 0.05,
                    percent_air: 0.55,
                    percent_naval: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'RaptorBeast',
                    UnitSpec: '/pa/units/commanders/raptor_beast/raptor_beast.json',
                }
            }
        ] // minions
    };
});