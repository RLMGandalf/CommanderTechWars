define([], function() {
    return {
        name: 'Art',
        color: [[255,242,93], [192,192,192]],
        teams: [
            {
                boss: {
                    name: 'Steve Thompson',
                    description: '<div class="div_credits_title">Art Director</div>',
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_faction_art.png',
                    iconColor: [255, 242, 93],
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                },
                workers: [
                    {
                        name: 'Ben Golus',
                        description: '<div class="div_credits_title">Tech Artist</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Andrew Christopherson',
                        description: '<div class="div_credits_title">Artist</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Russell Songco',
                        description: '<div class="div_credits_title">UI Designer</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Tim Cox',
                        description: '<div class="div_credits_title">World Art</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Brandon Orden',
                        description: '<div class="div_credits_title">Artist</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                    {
                        name: 'Matt Reynolds',
                        description: '<div class="div_credits_title">Artist</div>',
                        commander: {
                            ObjectName: 'QuadSpiderOfMean',
                            UnitSpec: '/pa/units/commanders/quad_spiderofmean/quad_spiderofmean.json',
                        }
                    },
                ]
            }
        ], // teams
        minions: [
        ] // minions
    };
});