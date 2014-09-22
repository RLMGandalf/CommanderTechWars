define([], function() {
    return {
        name: 'Design',
        color: [[207,93,255], [192,192,192]],
        teams: [
            {
                boss: {
                    name: 'John Comes',
                    description: '<div class="div_credits_title">Design Director</div>',
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_faction_design.png',
                    iconColor: [207,93,255],
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                },
                workers: [
                    {
                        name: 'Tom Vinita',
                        description: '<div class="div_credits_title">Designer</div>',
                    }
                ]
            }
        ], // teams
        minions: [
        ] // minions
    };
});