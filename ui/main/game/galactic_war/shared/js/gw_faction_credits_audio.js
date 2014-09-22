define([], function() {
    return {
        name: 'Audio',
        color: [[255,175,81], [192,192,192]],
        teams: [
            {
                boss: {
                    name: 'Howard Mostrom',
                    description: '<div class="div_credits_title">Audio Director</div>',
                    icon: 'coui://ui/main/game/galactic_war/shared/img/icon_faction_audio.png',
                    iconColor: [255,175,81],
                    commander: {
                        ObjectName: 'TankAeson',
                        UnitSpec: '/pa/units/commanders/tank_aeson/tank_aeson.json',
                    },
                },
                workers: [
                    {
                        name: 'Soundtrack Credits',
                        html: [
                            '<div class="credits-category">Soundtrack Credits</div>',
                            '<div class="credits_list">',
                            'Recorded by Seattle music Inc. at the Bastyr Chapel Scoring Stage</br>',
                            'Northwest Sinfonia and Chorale</br>',
                            'Contractor: David Sabee</br>',
                            'Conductor: David Sabee</br>',
                            'Additional conducting by Howard Mostrom</br>',
                            '</br>',
                            'Concertmaster:  Simon James</br>',
                            'Principal viola: Joseph Gottesman</br>',
                            'Principal cello: Walter Gray</br>',
                            'Principal bass: Jennifer Godfrey</br>',
                            'English horn: Brent Hages</br>',
                            'Principal horn: Mark Robbins</br>',
                            'Co-principal trumpets: Allen Vizzutti and Tony DiLorenzo</br>',
                            'Principal trombone: Ko-ichiro Yamamoto</br>',
                            'Tuba: Chris Olka</br>',
                            'Percussion: Rob Tucker</br>',
                            'Choir Master: Nathaniel Papadakis</br>',
                            'Lyrics by Howard Mostrom</br>',
                            'Additional percussion by Howard Mostrom</br>',
                            '</br>',
                            'Music Composed by Howard Mostrom (ASCAP)</br>',
                            'Orchestration: Tim Huling</br>',
                            'Additional Orchestration: Brad Hawkins</br>',
                            'Music Preparation:</br>',
                            'Brad Hawkins</br>',
                            'David Close</br>',
                            'Eric Nielsen</br>',
                            'Eric Goetz</br>',
                            'Willow Goodine</br>',
                            '</br>',
                            'Engineers: Kory Kruckenberg, David Sabee</br>',
                            'Producer: Howard Mostrom</br>',
                            'Pro Tools engineer: John Winters</br>',
                            'Stage manager: Jon Schluckebier</br>',
                            'Assistant engineer: Paul Herlihy</br>',
                            'Mixing by Howard Mostrom, Tom Hall</br>',
                            'Additional Engineering by Mark Trutanich</br>',
                            'Mastering by Patricia Sullivan at Bernie Grundman Mastering LA</br>',
                            'Album Artwork and  layout by Steve Thompson,  Leila Blue Aram-Panahi</br>',
                            'Audio Editor: Kristof Litke</br>',
                            'Special Thanks: Jeff Bell Hanson</br>',
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