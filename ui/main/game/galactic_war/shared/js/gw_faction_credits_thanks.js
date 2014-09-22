define([], function() {
    return {
        name: 'Thanks',
        color: [[236,34,35], [192,192,192]],
        teams: [
            {
                boss: {
                    name: 'Special Thanks',
                    html: [
                        '<div class="credits-category">Special Thanks</div>',
                        '<div class="credits_list">',
                        'Scott Ludwig<br />',
                        'Sam Lantinga<br />',
                        'John Vert<br />',
                        'Ryan Gordon aka icculus<br />',
                        'Filter Talent<br />',
                        '</div>'
                    ],
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_thanks.png',
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    }
                },
                workers: [
                    {
                        name: 'Production Babies',
                        html: [
                            '<div class="credits-category">Production Baby</div>',
                            '<div class="credits_list">',
                            'Ellis Marjorie Gaffney<br />',
                            '</div>'
                        ]
                    },
                    {
                        name: 'In Memoriam',
                        html: [
                            '<div class="credits-category">In Memoriam</div>',
                            '<div class="credits_list">',
                            'In loving memory of<br/>Katherine Scattergood.<br />',
                            'You&apos;ll be missed, Mom.<br />',
                            '1946 - 2014<br />',
                            '</div>'
                        ]
                    }
                ]
            }
        ], // teams
        minions: [
        ] // minions
    };
});