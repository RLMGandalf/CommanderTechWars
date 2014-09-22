define([], function() {
    return {
        name: 'Management',
        color: [[255,75,151], [192,192,192]],
        teams: [
            {
                boss: {
                    name: 'Bob Berry',
                    description: '<div class="div_credits_title">CEO</div>',
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_faction_manage.png',
                    iconColor: [255,75,151],
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                    minions: [
                        {
                            name: 'Seri Dvorak',
                            commander: {
                                ObjectName: 'QuadSpiderOfMean',
                                UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                            }
                        }
                    ]
                },
                workers: [
                    {
                        name: 'Greg Stackhouse',
                        description: '<div class="div_credits_title">Human Resources</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Seri Dvorak',
                        description: '<div class="div_credits_title">Executive Assistant</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    }
                ]
            }
        ], // teams
        minions: [
        ] // minions
    };
});