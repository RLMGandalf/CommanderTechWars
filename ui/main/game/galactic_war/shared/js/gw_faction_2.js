// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Synchronous',
        color: [[244,125,31], [192,192,192]],
        teams: [
            {
                name: 'Cupru - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 0.9,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        },
                        {
                            name: 'Servant Bhalam',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        }
                    ]
                },
                bossCard: 'gwc_start_bot',
                systemDescription: '!LOC(galactic_war:known_for_its_rich_deposits_of_copper_cupru_also_had_the_distinction_of_being_the_only_system_in_the_known_galaxy_where_the_giant_cupru_cosvierme_a_worm_the_size_of_the_empire_state_building_on_ancient_earth_could_be_found_the_crew_of_the_terradine_corp_mining_vessel_flying_solo_found_this_out_when_they_attempted_to_prospect_in_a_massive_cave_they_had_discovered_in_cupru_after_setting_off_their_first_seismic_charge_the_crew_was_faced_with_an_imminent_cave_collapse_barely_escaping_it_dawned_on_them_what_had_really_happened_xenobiologists_flocked_to_the_system_to_study_the_worm_and_discovered_a_large_population_terradine_quickly_withdrew_any_claims_on_cupru_years_later_the_progenitor_coalition_were_defeated_by_the_machine_liberation_army_at_the_battle_of_cupru_during_the_pro_com_war.message):Known for its rich deposits of copper, Cupru also had the distinction of being the only system in the known galaxy where the giant Cupru Cosvierme, a worm the size of the Empire State Building on ancient Earth, could be found. The crew of the Terradine Corp mining vessel Flying Solo found this out when they attempted to prospect in a massive cave they had discovered in Cupru. After setting off their first seismic charge, the crew was faced with an imminent cave collapse. Barely escaping, it dawned on them what had really happened. Xenobiologists flocked to the system to study the worm, and discovered a large population. Terradine quickly withdrew any claims on Cupru. Years later the Progenitor Coalition were defeated by the Machine Liberation Army at the Battle of Cupru during the Pro-Com War.',
                systemTemplate: {
                    name: 'Cupru - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, -0.00000618172],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Gamma',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [4, 6],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0.00000691138, -158.114],
                            Biomes: ['metal_boss']
                        },
                    ]
                },
            },
            {
                name: 'Platina - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 0.9,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        },
                        {
                            name: 'Servant Bhalam',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:platina_was_the_site_of_the_largest_commander_vs_commander_battle_of_the_pro_com_war_nearly_fifty_machine_liberation_army_mla_commanders_invaded_the_system_knowing_it_was_being_held_by_over_thirty_loyalist_commanders_mla_intelligence_had_deduced_that_the_progenitor_coalition_and_their_loyalist_allies_were_protecting_a_high_value_target_that_needed_to_be_captured_or_destroyed_it_was_a_trap_hidden_loyalist_forces_pounced_on_the_mla_now_outnumbering_them_2_to_1_the_battle_of_platina_was_single_biggest_loss_of_mla_commanders_in_the_entire_war_it_would_take_them_over_ten_years_to_recover.message):Platina was the site of the largest Commander vs. Commander battle of the Pro-Com War. Nearly fifty Machine Liberation Army (MLA) Commanders invaded the system knowing it was being held by over thirty Loyalist Commanders. MLA Intelligence had deduced that the Progenitor Coalition and their Loyalist allies were protecting a high value target that needed to be captured or destroyed. It was a trap. Hidden Loyalist forces pounced on the MLA, now outnumbering them 2 to 1. The Battle of Platina was single biggest loss of MLA Commanders in the entire war. It would take them over ten years to recover.',
                systemTemplate: {
                    name: 'Platina - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, -0.00000618172],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Gamma',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [4, 6],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0.00000691138, -158.114],
                            Biomes: ['metal_boss']
                        },
                    ]
                }
            },
            {
                name: 'Fier - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 0.9,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        },
                        {
                            name: 'Servant Bhalam',
                            econ_rate: 0.9,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:azaghul_one_of_the_largest_mining_companies_in_the_progenitor_coalition_was_the_first_to_lobby_the_general_assembly_for_the_mining_rights_to_this_system_azaghul_gambled_on_the_system_for_producing_large_amounts_of_metals_and_they_were_not_disappointed_as_it_turned_out_fier_produced_a_new_type_of_iron_which_azaghul_scientist_labeled_dragon_the_new_dragon_iron_had_a_much_higher_melting_point_than_normal_iron_and_was_naturally_stronger_than_steel_and_lighter_than_aluminum_the_discovery_of_dragon_iron_launched_azaghul_to_the_top_putting_them_on_even_terms_with_terradine_corp_in_the_mining_and_refining_of_metals.message):Azaghul, one of the largest mining companies in the Progenitor Coalition, was the first to lobby the General Assembly for the mining rights to this system. Azaghul gambled on the system for producing large amounts of metals, and they were not disappointed. As it turned out, Fier produced a new type of iron, which Azaghul scientist labeled "Dragon".  The new "Dragon Iron" had a much higher melting point than normal iron and was naturally stronger than steel, and lighter than aluminum. The discovery of Dragon Iron launched Azaghul to the top, putting them on even terms with Terradine Corp in the mining and refining of metals.',
                systemTemplate: {
                    name: 'Fier - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, -0.00000618172],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Gamma',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [4, 6],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0.00000691138, -158.114],
                            Biomes: ['metal_boss']
                        },
                    ]
                }
            },
            {
                name: 'Safir - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 0.9,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 1.1,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        },
                        {
                            name: 'Servant Bhalam',
                            econ_rate: 0.7,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:this_system_was_home_to_some_of_the_most_vibrant_and_colorful_star_patterns_in_the_known_galaxy_due_to_its_mysterious_molecular_makeup_an_individual_traveling_through_the_system_would_see_the_stars_appear_in_every_shade_of_blue_imaginable_the_view_of_the_tapestry_of_the_galaxy_from_the_confines_of_safir_often_drew_progenitor_artists_from_all_around_who_wanted_to_capture_the_stunning_vistas_in_their_artwork_explorer_saresh_bishwas_iii_was_quoted_as_saying_of_the_view_never_before_in_all_my_travels_throughout_this_amazing_expanse_of_stars_have_i_ever_seen_images_that_personify_my_dreams_of_heaven.message):This system was home to some of the most vibrant and colorful star patterns in the known galaxy. Due to its mysterious molecular makeup, an individual traveling through the system would see the stars appear in every shade of blue imaginable. The view of the tapestry of the galaxy from the confines of Safir often drew Progenitor artists from all around who wanted to capture the stunning vistas in their artwork. Explorer Saresh Bishwas III was quoted as saying of the view "Never before in all my travels throughout this amazing expanse of stars have I ever seen images that personify my dreams of Heaven".',
                systemTemplate: {
                    name: 'Safir - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, -0.00000618172],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Gamma',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [4, 6],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0.00000691138, -158.114],
                            Biomes: ['metal_boss']
                        },
                    ]
                }
            },
            {
                name: 'Apa - Synchronous',
                boss: {
                    name: 'Metrarch the Machinist',
                    econ_rate: 0.9,
                    personality: {
                        percent_land: 0.3,
                        percent_air: 0.3,
                        percent_naval: 0.05,
                        percent_orbital: 0.35,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                    minions: [
                        {
                            name: 'Servant Aust',
                            econ_rate: 0.7,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        },
                        {
                            name: 'Servant Bhalam',
                            econ_rate: 1.1,
                            color: [[244,125,31], [192,192,192]],
                            commander: {
                                ObjectName: 'TankAeson',
                                UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:apa_was_a_favorite_destination_for_progenitor_recreational_divers_and_oceanographers_especially_beautiful_was_the_extensive_tarakona_reef_which_was_over_twice_the_size_of_the_great_barrier_reef_on_earth_the_reef_was_destroyed_in_the_pro_com_war_by_the_machine_liberation_army_who_dropped_millions_of_chemical_bombs_in_an_effort_to_kill_off_all_the_biological_life_and_vaporize_the_oceans_they_were_successful.message):Apa was a favorite destination for Progenitor recreational divers and oceanographers. Especially beautiful was the extensive Tarakona Reef, which was over twice the size of the Great Barrier Reef on Earth. The reef was destroyed in the Pro-Com War by the Machine Liberation Army who dropped millions of chemical bombs in an effort to kill off all the biological life and vaporize the oceans. They were successful.',
                systemTemplate: {
                    name: 'Apa - Synchronous',
                    Planets: [
                        {
                            name: 'Cupru Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [90, 100],
                            MetalClusters: [51, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, -0.00000618172],
                            Biomes: ['metal_boss']
                        },
                        {
                            name: 'Cupru Gamma',
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [4, 6],
                            Radius: [500, 700],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0.00000691138, -158.114],
                            Biomes: ['metal_boss']
                        },
                    ]
                }
            }
        ], // teams
        minions: [
            {
                name: 'Servant Bhalam',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Campal',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Dkar',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Erom',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Flornek',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Ghel',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Hinn',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Inar-Tol',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Jakaal',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Kancetu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Lertolux',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Mal-Locar',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Negult',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Oncab',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Prulor',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Questromo',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Rulak',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Shelwhu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Tarcolish',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Urlox',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Vela',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Worr',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Xiercy',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Yelam',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            },
            {
                name: 'Servant Zekktalt',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.3,
                    percent_air: 0.3,
                    percent_naval: 0.05,
                    percent_orbital: 0.35,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
            }
        ] // minions
    };
});