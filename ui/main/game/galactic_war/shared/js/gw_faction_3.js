// !LOCNS:galactic_war
define([], function () {
    return {
        name: 'Revenants',
        color: [[236,34,35], [192,192,192]],
        teams: [
            {
                name: 'Alenquer - Revenants',
                boss: {
                    name: 'First Seeker Osiris',
                    econ_rate: 0.85,
                    personality: {
                        percent_land: 0.15,
                        percent_air: 0.15,
                        percent_naval: 0.1,
                        percent_orbital: 0.6,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seeker Ankou',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Barastyr',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Cichol',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:the_xziphid_hegemony_hit_the_system_like_a_lightning_bolt_to_open_the_century_war_within_ten_years_they_were_poised_to_launch_their_invasion_further_into_progenitor_coalition_territory_the_only_thing_in_their_way_was_alenquer_general_dyal_supreme_commander_of_progenitor_coalition_forces_chose_to_make_his_stand_in_the_alenquer_system_with_just_250_000_marines_and_twenty_three_merchant_and_transport_vessels_dyal_held_the_system_for_eighteen_months_using_hit_and_run_guerrilla_tactics_against_the_xziphid_who_had_never_faced_such_an_enemy_finally_dyal_was_ordered_to_withdraw_having_bought_the_progenitor_coalition_enough_time_to_build_up_their_forces_in_neighboring_systems_dyal_was_awarded_the_order_of_oterma_the_highest_award_given_by_the_military.message):The Xziphid Hegemony hit the system like a lightning bolt to open the Century War. Within ten years they were poised to launch their invasion further into Progenitor Coalition territory. The only thing in their way was Alenquer. General Dyal, Supreme Commander of Progenitor Coalition forces, chose to make his stand in the Alenquer system.  With just 250,000 Marines and twenty-three merchant and transport vessels, Dyal held the system for eighteen months using hit and run guerrilla tactics against the Xziphid, who had never faced such an enemy. Finally, Dyal was ordered to withdraw, having bought the Progenitor Coalition enough time to build up their forces in neighboring systems. Dyal was awarded the Order of Oterma; the highest award given by the military.',
                systemTemplate: {
                    name: 'Alenquer - Revenants',
                    Planets: [
                        {
                            name: 'Alenquer Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0.000006181723165354924, -141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Gamma',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.42135620117188, 0.000006181723165354924],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Delta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.42135620117188, -0.000006181723165354924],
                            Biomes: ['moon']
                        }
                    ]
                }
            },
            {
                name: 'Xianyao - Revenants',
                boss: {
                    name: 'First Seeker Osiris',
                    econ_rate: 0.85,
                    personality: {
                        percent_land: 0.15,
                        percent_air: 0.15,
                        percent_naval: 0.1,
                        percent_orbital: 0.6,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seeker Ankou',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Barastyr',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Cichol',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Dis',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                bossCard: 'gwc_start_subcdr',
                systemDescription: '!LOC(galactic_war:when_progenitor_loyalist_commander_allenby_discovered_a_machine_liberation_army_mla_commander_manufacturing_facility_on_the_massive_asteroid_known_as_fabrok_what_had_started_as_a_minor_skirmish_between_units_under_mla_commander_murad_and_loyalist_commander_allenby_turned_into_one_of_the_largest_engagements_of_the_pro_com_war_progenitor_forces_flooded_into_the_system_driven_by_the_rare_chance_destroy_one_of_the_few_mla_commander_assembly_bases_the_mla_also_threw_massive_amounts_of_units_into_the_system_in_an_attempt_to_protect_the_base_but_it_wasn_t_enough_against_the_fury_of_the_progenitors_as_the_loyalist_led_progenitors_landed_on_fabrok_their_elation_turned_to_horror_realizing_they_had_been_duped_in_an_instant_the_asteroid_disappeared_in_a_nuclear_flash_allenby_and_over_three_hundred_thousand_progenitor_marines_were_gone_victims_of_an_elaborate_trap_it_was_a_lesson_progenitor_high_command_would_never_forget.message):When Progenitor Loyalist Commander Allenby discovered a Machine Liberation Army (MLA) Commander manufacturing facility on the massive asteroid known as Fabrok, what had started as a minor skirmish between units under MLA Commander Murad and Loyalist Commander Allenby, turned into one of the largest engagements of the Pro-Com War. Progenitor forces flooded into the system, driven by the rare chance destroy one of the few MLA Commander assembly bases. The MLA also threw massive amounts of units into the system in an attempt to protect the base, but it wasn\'t enough against the fury of the Progenitors. As the Loyalist-led Progenitors landed on Fabrok their elation turned to horror realizing they had been duped.  In an instant the asteroid disappeared in a nuclear flash. Allenby and over three hundred thousand Progenitor Marines were gone, victims of an elaborate trap. It was a lesson Progenitor High Command would never forget.',
                systemTemplate: {
                    name: 'Xianyao- Revenants',
                    Planets: [
                        {
                            name: 'Alenquer Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0.000006181723165354924, -141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Gamma',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.42135620117188, 0.000006181723165354924],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Delta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.42135620117188, -0.000006181723165354924],
                            Biomes: ['moon']
                        }
                    ]
                }
            },
            {
                name: 'Epiphany - Revenants',
                boss: {
                    name: 'First Seeker Osiris',
                    econ_rate: 0.85,
                    personality: {
                        percent_land: 0.15,
                        percent_air: 0.15,
                        percent_naval: 0.1,
                        percent_orbital: 0.6,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seeker Ankou',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Barastyr',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Cichol',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:this_system_was_one_of_the_most_vital_in_all_the_progenitor_coalition_home_to_some_of_the_most_classified_military_research_epiphany_was_the_progenitor_center_of_a_i_research_after_a_i_and_any_research_associated_with_it_was_declared_illegal_with_resolution_278_55137_the_scientists_of_epiphany_refused_to_comply_and_rebelled_against_what_they_called_progenitor_coalition_shortsightedness_progenitor_marines_were_forced_to_take_the_system_back_by_force_and_fought_the_very_machines_meant_to_replace_them_dr_euphemia_kenyatta_the_foremost_expert_on_a_i_escaped_the_system_and_disappeared_ten_years_later_dr_kenyatta_returned_from_her_self_imposed_exile_and_became_the_mastermind_behind_the_development_of_the_commanders_to_save_humanity_from_the_xziphid_hegemony.message):This system was one of the most vital in all the Progenitor Coalition. Home to some of the most classified military research, Epiphany was the Progenitor center of A.I. research. After A.I. and any research associated with it was declared illegal with Resolution 278-55137, the scientists of Epiphany refused to comply and rebelled against what they called "Progenitor Coalition shortsightedness". Progenitor Marines were forced to take the system back by force and fought the very machines meant to replace them. Dr. Euphemia Kenyatta, the foremost expert on A.I., escaped the system and disappeared. Ten years later, Dr. Kenyatta returned from her self-imposed exile and became the mastermind behind the development of the Commanders to save humanity from the Xziphid Hegemony.',
                systemTemplate: {
                    name: 'Epiphany - Revenants',
                    Planets: [
                        {
                            name: 'Alenquer Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0.000006181723165354924, -141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Gamma',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.42135620117188, 0.000006181723165354924],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Delta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.42135620117188, -0.000006181723165354924],
                            Biomes: ['moon']
                        }
                    ]
                }
            },
            {
                name: 'Varthema - Revenants',
                boss: {
                    name: 'First Seeker Osiris',
                    econ_rate: 0.85,
                    personality: {
                        percent_land: 0.15,
                        percent_air: 0.15,
                        percent_naval: 0.1,
                        percent_orbital: 0.6,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seeker Ankou',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Barastyr',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Cichol',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:after_the_end_of_the_century_war_commanders_were_being_decommissioned_and_needed_to_be_integrated_into_the_civilian_workforce_the_system_of_varthema_served_as_the_diagnostic_and_retraining_center_for_them_before_the_outset_of_the_pro_com_war_machine_liberation_army_mla_leader_tryphon_condemned_varthema_as_a_laboratory_run_by_mad_scientists_who_turned_a_commander_into_an_obedient_slave_of_the_progenitor_when_the_system_was_captured_by_mla_forces_late_in_the_war_tryphon_ordered_the_system_scraped_clean_of_any_signs_of_biological_life_with_the_progenitors_and_all_their_creations_at_the_top_of_the_list.message):After the end of the Century War, Commanders were being decommissioned and needed to be integrated into the civilian workforce. The system of Varthema served as the diagnostic and retraining center for them. Before the outset of the Pro-Com War, Machine Liberation Army (MLA) leader Tryphon condemned Varthema as a "laboratory run by mad scientists who turned a Commander into an obedient slave of the Progenitor." When the system was captured by MLA forces late in the war, Tryphon ordered the system "scraped clean" of any signs of biological life- with the Progenitors and all their creations at the top of the list.',
                systemTemplate: {
                    name: 'Varthema - Revenants',
                    Planets: [
                        {
                            name: 'Alenquer Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0.000006181723165354924, -141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Gamma',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.42135620117188, 0.000006181723165354924],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Delta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.42135620117188, -0.000006181723165354924],
                            Biomes: ['moon']
                        }
                    ]
                }
            },
            {
                name: 'Chernykh - Revenants',
                boss: {
                    name: 'First Seeker Osiris',
                    econ_rate: 0.85,
                    personality: {
                        percent_land: 0.15,
                        percent_air: 0.15,
                        percent_naval: 0.1,
                        percent_orbital: 0.6,
                        metal_drain_check: 0.75,
                        energy_drain_check: 0.85,
                        metal_demand_check: 0.75,
                        energy_demand_check: 0.85,
                        micro_type: 2,
                        go_for_the_kill: true,
                        neural_data_mod: 1
                    },
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seeker Ankou',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Barastyr',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        },
                        {
                            name: 'Seeker Cichol',
                            econ_rate: 0.85,
                            color: [[236, 34, 35], [192, 192, 192]],
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                //bossCard: 'gwc_start_orbital',
                systemDescription: '!LOC(galactic_war:when_the_pro_com_war_had_reached_its_height_the_machine_liberation_army_mla_had_already_demonstrated_they_were_not_only_fighting_a_war_of_independence_they_were_fighting_a_war_of_extinction_it_wasn_t_enough_to_defeat_the_progenitors_and_their_loyalist_commander_allies_they_had_to_be_eradicated_from_the_galaxy_chernykh_was_a_prime_example_of_this_after_mla_forces_had_driven_the_progenitor_coalition_military_from_the_system_they_targeted_any_and_all_biologics_in_chernykh_for_elimination_chernykh_was_rich_with_biological_life_including_over_seven_hundred_million_progenitor_civilians_the_mla_saturated_the_system_with_chemical_and_nuclear_weapons_until_not_one_living_thing_remained.message):When the Pro-Com War had reached its height, the Machine Liberation Army (MLA) had already demonstrated they were not only fighting a war of independence, they were fighting a war of extinction. It wasn\'t enough to defeat the Progenitors and their Loyalist Commander allies, they had to be eradicated from the galaxy. Chernykh was a prime example of this. After MLA forces had driven the Progenitor Coalition military from the system, they targeted any and all biologics in Chernykh for elimination. Chernykh was rich with biological life, including over seven hundred million Progenitor civilians. The MLA saturated the system with chemical and nuclear weapons until not one living thing remained.',
                systemTemplate: {
                    name: 'Chernykh - Revenants',
                    Planets: [
                        {
                            name: 'Alenquer Prime',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Beta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0.000006181723165354924, -141.42135620117188],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Gamma',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.42135620117188, 0.000006181723165354924],
                            Biomes: ['moon']
                        },
                        {
                            name: 'Alenquer Delta',
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 350],
                            Height: [0, 10],
                            Water: [0, 10],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.42135620117188, -0.000006181723165354924],
                            Biomes: ['moon']
                        }
                    ]
                }
            }
        ], // teams
        minions: [
            {
                name: 'Seeker Dis',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Ereshkigal',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Freja',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Giltine',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Hecate',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Iku',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Jektu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Kormo',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Lampades',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Mara',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Nephthys',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Ogbuna',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Purtelek',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Qamm',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Rul-Mot',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Shingon',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Thanatos',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Unigami',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Vespor',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Wultok',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Xul-Kutu',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Yama',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            },
            {
                name: 'Seeker Zontuk',
                econ_rate: 1.0,
                personality: {
                    percent_land: 0.15,
                    percent_air: 0.15,
                    percent_naval: 0.1,
                    percent_orbital: 0.6,
                    metal_drain_check: 0.75,
                    energy_drain_check: 0.85,
                    metal_demand_check: 0.75,
                    energy_demand_check: 0.85,
                    micro_type: 2,
                    go_for_the_kill: true,
                    neural_data_mod: 1
                },
                commander: {
                    ObjectName: 'QuadSpiderOfMean',
                    UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                }
            }
        ] // minions
    };
});