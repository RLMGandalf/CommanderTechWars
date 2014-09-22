﻿define([], function () {
    return {
        name: 'Art',
        color: [[255, 242, 93], [192, 192, 192]],
        teams: [
            {
                boss: {
                    name: 'Chandana Ekanayake',
                    description: '<div class="div_credits_title">Art Director (Uber)</div>',
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_faction_art.png',
                    iconColor: [255, 242, 93],
                    commander: {
                        ObjectName: 'QuadOsiris',
                        UnitSpec: '/pa/units/commanders/quad_osiris/quad_osiris.json',
                    },
                },
                workers: []
            }
        ], // teams
        minions: [
        ] // minions
    };
});