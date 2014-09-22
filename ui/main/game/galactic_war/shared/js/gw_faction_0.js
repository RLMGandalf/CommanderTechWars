// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Legonis Machina',
        color: [[0, 176, 255], [192, 192, 192]],
        teams: [
            {
                name: 'Kohr - Legonis Machina',
                boss: {
                    name: 'Commander Invictus',
                    econ_rate: 1.5,
                    personality: {
                        percent_land: 0.55,
                        percent_air: 0.35,
                        percent_naval: 0.05,
                        percent_orbital: 0.05,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'InvictusCommander',
                        UnitSpec: '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                    },
                    
                },
                bossCard: 'gwc_start_artillery',
                systemDescription: '!LOC(galactic_war:kohr_had_a_sinister_reputation_among_the_citizens_of_the_progenitor_coalition_a_favorite_base_of_operations_for_smugglers_and_pirates_alike_kohr_was_notorious_for_swallowing_up_ships_never_to_be_seen_again_it_quickly_gained_the_reputation_as_the_bermuda_triangle_of_space_avoided_by_only_the_most_foolhardy_or_desperate_during_the_pro_com_war_machine_liberation_army_commander_scipio_chose_it_as_his_stronghold_launching_numerous_attacks_against_progenitor_forces_from_it.message):Kohr had a sinister reputation among the citizens of the Progenitor Coalition. A favorite base of operations for smugglers and pirates alike, Kohr was notorious for swallowing up ships, never to be seen again. It quickly gained the reputation as the "Bermuda Triangle" of space, avoided by only the most foolhardy or desperate. During the Pro-Com War, Machine Liberation Army Commander Scipio chose it as his stronghold, launching numerous attacks against Progenitor forces from it.',
                systemTemplate: {
                    name: 'Kohr',
                    Planets: [
                        {
                            name: 'Kohr Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [60, 65],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: [ 'earth']
                        }
                    ]
                }
            },
            {
                name: 'Entara - Legonis Machina',
                boss: {
                    name: 'Commander Invictus',
                    econ_rate: 1.5,
                    personality: {
                        percent_land: 0.55,
                        percent_air: 0.35,
                        percent_naval: 0.05,
                        percent_orbital: 0.05,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'InvictusCommander',
                        UnitSpec: '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                    }
                },
                bossCard: 'gwc_start_combatcdr',
                systemDescription: '!LOC(galactic_war:entara_was_witness_to_some_of_the_bloodiest_battles_of_the_century_war_eventually_becoming_part_of_progenitor_coalition_citizens_held_an_honored_status_if_they_were_a_descendant_of_those_that_fought_in_the_entara_campaign_while_most_historical_texts_will_cite_gamma_hydra_as_where_the_xziphid_hegemony_advance_was_halted_with_the_introduction_of_the_commanders_into_the_war_there_is_many_a_progenitor_that_swore_to_their_dying_breath_that_humanity_stopped_the_xziphid_in_their_tracks_in_entara_the_system_changed_hands_over_seven_times_until_progenitor_marines_under_the_command_of_einar_the_hammer_erickson_liberated_the_city_of_new_halifax_the_last_bastion_of_xziphid_control_in_entara_gone_was_the_advanced_fire_and_forget_weaponry_einar_s_marines_were_forced_to_fight_the_xziphid_house_by_house_block_by_block_in_gruesome_hand_to_hand_combat_in_the_end_only_ten_percent_of_einar_s_marines_remained_the_entara_system_had_been_liberated_but_at_a_very_heavy_price.message):Entara was witness to some of the bloodiest battles of the Century War, eventually becoming part of Progenitor Coalition. Citizens held an honored status if they were a descendant of those that fought in the Entara Campaign. While most historical texts will cite Gamma Hydra as where the Xziphid Hegemony advance was halted with the introduction of the Commanders into the war, there is many a Progenitor that swore to their dying breath that humanity stopped the Xziphid in their tracks in Entara. The system changed hands over seven times until Progenitor Marines, under the command of Einar "The Hammer" Erickson liberated the city of New Halifax, the last bastion of Xziphid control in Entara. Gone was the advanced "fire and forget" weaponry, Einar\'s Marines were forced to fight the Xziphid house by house, block by block, in gruesome hand to hand combat. In the end, only ten percent of Einar\'s Marines remained. The Entara System had been liberated, but at a very heavy price.',
                systemTemplate: {
                    name: 'Entara - Legonis Machina',
                    Planets: [
                        {
                            name: 'Entara Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [60, 65],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth']
                        }
                    ]
                }
            },
            {
                name: 'Agoge - Legonis Machina',
                boss: {
                    name: 'Commander Invictus',
                    econ_rate: 1.5,
                    personality: {
                        percent_land: 0.55,
                        percent_air: 0.35,
                        percent_naval: 0.05,
                        percent_orbital: 0.05,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'InvictusCommander',
                        UnitSpec: '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                    }
                },
                systemDescription: '!LOC(galactic_war:agoge_was_the_center_for_all_military_training_for_the_progenitor_coalition_progenitor_soldiers_before_the_century_war_were_used_to_training_for_quelling_planetary_riots_and_pirate_activities_to_name_a_few_very_few_major_conflicts_had_erupted_in_the_progenitor_coalition_for_over_three_hundred_years_that_all_changed_with_the_xziphid_hegemony_progenitor_high_command_soon_discovered_its_troops_were_ill_prepared_to_fight_the_type_of_war_they_were_facing_with_the_xziphid_training_for_new_recruits_became_harsh_and_brutal_with_many_washing_out_marines_had_it_especially_hard_being_they_would_be_the_ones_to_go_toe_to_toe_with_the_enemy_in_all_kinds_of_environments_in_the_end_the_progenitor_coalition_had_created_the_finest_soldiers_humanity_had_ever_seen_but_they_still_weren_t_enough_to_stop_the_xziphid_it_would_take_the_advent_of_the_commanders_to_save_humanity_from_extinction.message):Agoge was the center for all military training for the Progenitor Coalition. Progenitor soldiers before the Century War were used to training for quelling planetary riots and pirate activities, to name a few. Very few major conflicts had erupted in the Progenitor Coalition for over three hundred years. That all changed with the Xziphid Hegemony. Progenitor High Command soon discovered its troops were ill prepared to fight the type of war they were facing with the Xziphid. Training for new recruits became harsh and brutal, with many "washing out". Marines had it especially hard, being they would be the ones to go toe to toe with the enemy in all kinds of environments. In the end, the Progenitor Coalition had created the finest soldiers humanity had ever seen, but they still weren\'t enough to stop the Xziphid. It would take the advent of the Commanders to save humanity from extinction.',
                systemTemplate: {
                    name: 'Agoge - Legonis Machina',
                    Planets: [
                        {
                            name: 'Agoge Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [60, 65],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth']
                        }
                    ]
                }
            },
            {
                name: 'Tau Leporis - Legonis Machina',
                boss: {
                    name: 'Commander Invictus',
                    econ_rate: 1.5,
                    personality: {
                        percent_land: 0.55,
                        percent_air: 0.35,
                        percent_naval: 0.05,
                        percent_orbital: 0.05,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'InvictusCommander',
                        UnitSpec: '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                    }
                },
                systemDescription: '!LOC(galactic_war:once_home_to_a_thriving_colony_of_over_two_billion_people_this_system_became_part_of_progenitor_folklore_just_as_the_colony_was_poised_for_greatness_with_the_discovery_of_unusually_large_platinum_deposits_a_sickness_swept_through_the_system_later_it_was_discovered_to_be_an_ancient_parasite_released_due_to_the_platinum_mining_omega_9_1_as_it_was_dubbed_proceeded_to_kill_most_of_the_system_s_populace_before_it_was_quarantined_by_the_progenitor_coalition_and_a_vaccine_was_developed_one_survivor_described_her_experience_as_reading_a_horror_movie_script_deserted_streets_boarded_up_homes_crazed_infected_victims_seeking_to_kill_those_who_weren_t_the_progenitor_coalition_government_quickly_covered_up_the_incident_and_declared_tau_leporis_a_sealed_system.message):Once home to a thriving colony of over two billion people, this system became part of Progenitor folklore. Just as the colony was poised for greatness with the discovery of unusually large platinum deposits, a sickness swept through the system. Later it was discovered to be an ancient parasite released due to the platinum mining, Omega 9-1, as it was dubbed, proceeded to kill most of the system\'s populace before it was quarantined by the Progenitor Coalition and a vaccine was developed. One survivor described her experience as reading a horror movie script: deserted streets, boarded up homes, crazed infected victims seeking to kill those who weren\'t. The Progenitor Coalition government quickly covered up the "incident" and declared Tau Leporis a "sealed system".',
                systemTemplate: {
                    name: 'Tau Leporis - Legonis Machina',
                    Planets: [
                        {
                            name: 'Tau Leporis Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [60, 65],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth']
                        }
                    ]
                }
            },
            {
                name: 'Poseidon\'s Wrath - Legonis Machina',
                boss: {
                    name: 'Commander Invictus',
                    econ_rate: 1.5,
                    personality: {
                        percent_land: 0.55,
                        percent_air: 0.35,
                        percent_naval: 0.05,
                        percent_orbital: 0.05,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'InvictusCommander',
                        UnitSpec: '/pa/units/commanders/imperial_invictus/imperial_invictus.json',
                    }
                },
                systemDescription: '!LOC(galactic_war:the_poseidon_s_wrath_system_was_the_scene_of_the_largest_naval_engagement_of_the_pro_com_war_machine_liberation_army_commander_shin_spearheaded_the_invasion_of_the_system_situated_in_a_key_sector_of_the_region_progenitor_high_command_could_not_allow_the_system_to_be_occupied_by_the_enemy_loyalist_commander_nelson_was_tasked_with_retaking_it_after_establishing_a_base_on_the_far_side_of_the_system_opposite_shin_nelson_was_able_to_fight_his_way_across_it_after_several_weeks_nelson_would_emerge_the_victor_with_commander_shin_meeting_a_fiery_death.message):The Poseidon\'s Wrath system was the scene of the largest naval engagement of the Pro-Com War. Machine Liberation Army Commander Shin spearheaded the invasion of the system. Situated in a key sector of the region, Progenitor High Command could not allow the system to be occupied by the enemy. Loyalist Commander Nelson was tasked with retaking it. After establishing a base on the far side of the system opposite Shin, Nelson was able to fight his way across it. After several weeks, Nelson would emerge the victor; with Commander Shin meeting a fiery death.',
                systemTemplate: {
                    name: 'Poseidon\'s Wrath - Legonis Machina',
                    Planets: [
                        {
                            name: 'Poseidon\'s Wrath Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [60, 65],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth']
                        }
                    ]
                }
            }
        ], // teams
        minions: [
            {
                name: 'Sub Commander Ancilius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Attius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Brutus',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Bassus',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Cassius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Domitius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Flavius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Galba',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'DeltaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                }
            },
            {
                name: 'Sub Commander Hosidius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Junius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Livius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Mallius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Maximus',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Nero',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Octavius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Pompey',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Quintus',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Rutilius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Servilius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Silva',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Terentius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Titus',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Urcinius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Valerius',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            },
            {
                name: 'Sub Commander Valens',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.55,
                    percent_air: 0.35,
                    percent_naval: 0.05,
                    percent_orbital: 0.05,
                    metal_drain_check: 0.6,
                    energy_drain_check: 0.7,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'ThetaCommander',
                    UnitSpec: '/pa/units/commanders/imperial_theta/imperial_theta.json',
                }
            }
        ], // minions
    };
});