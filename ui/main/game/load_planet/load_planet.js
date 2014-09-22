var model;
var handlers;

function respondToResize() {
    model.containerHeight($("body").height() +'px');
    model.containerWidth(($("body").width() - 10)+'px');
    model.contentWrapperHeight(($("#main .content").height()) +'px');
}

$(document).ready(function () {

    ko.extenders.slider = function (target, option) {
        var v;

        // write changes to storage
        target.subscribe(function (newValue) {
            if (newValue !== $('#slider_' + option).slider("option", "value"))
                $('#slider_' + option).slider("option", "value", newValue);
        });

        return target;
    };


   // Click handler for create button
    $('#command').click(function() {
        $('#getData').modal('show');
        return;
    });

    var premade_systems = [
       {
           name: "Duelist System",
           description: "2 Players",
           players: [2, 2],
           planets: [
              {
                  name: "Duelist Prime",
                  starting_planet:      true,
                  mass:                 50000,
                  position_x:           25000,
                  position_y:           0,
                  velocity_x:           -0.00000618172,
                  velocity_y:           141.421,
                  required_thrust_to_move: 0,
                  planet: {
                      seed:             15,
                      radius:           400,
                      heightRange:      25,
                      waterHeight:      35,
                      temperature:      100,
                      metalDensity:     50,
                      metalClusters:    50,
                      biomeScale:       100,
                      biome:            "desert"
                  }
              },
              {
                  name: "Highlander",
                  starting_planet: false,
                  mass:                 5000,
                  position_x:           30000,
                  position_y:           0,
                  velocity_x:           0.000113698,
                  velocity_y:           -82.1854,
                  required_thrust_to_move: 3,
                  planet: {
                      seed:             15,
                      radius:           250,
                      heightRange:      0,
                      waterHeight:      0,
                      temperature:      0,
                      metalDensity:     0,
                      metalClusters:    0,
                      biomeScale:       100,
                      biome:            "moon"
                  }
              }
           ]
       },
       {
           name: "Annihilator System",
           description: "2-4 Players",
           players: [2, 4],
           planets: [
              {
                  name: "Rock",
                  starting_planet: true,
                  mass:                 35000,
                  position_x:           -60000,
                  position_y:           0,
                  velocity_x:           1.52114,
                  velocity_y:           -91.2681,
                  required_thrust_to_move: 0,
                  planet: {
                      seed:             9,
                      radius:           500,
                      heightRange:      0,
                      waterHeight:      0,
                      temperature:      100,
                      metalDensity:     25,
                      metalClusters:    100,
                      biomeScale:       100,
                      biome:            "metal"
                  }
              },
              {
                  name: "Hard Place",
                  starting_planet: true,
                  mass:                 35000,
                  position_x:           -60000,
                  position_y:           1000,
                  velocity_x:           1.52113,
                  velocity_y:           91.2681,
                  required_thrust_to_move: 0,
                  planet: {
                      seed:             9,
                      radius:           500,
                      heightRange:      0,
                      waterHeight:      0,
                      temperature:      100,
                      metalDensity:     25,
                      metalClusters:    100,
                      biomeScale:       100,
                      biome:            "metal"
                  }
              }
           ]
       },
       {
           name: "Demon's Den System",
           description: "3-6 Players",
           players: [3, 6],
           planets: [
                {
                    name: "Little Fiend",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 0,
                    position_y: 13000,
                    velocity_x: -196.116,
                    velocity_y: -0.00000857251,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 666,
                        radius: 400,
                        heightRange: 15,
                        waterHeight: 25,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Little Imp",
                    starting_planet: true,
                    mass: 50000,
                    position_x: -11300,
                    position_y: -6500,
                    velocity_x: 97.651,
                    velocity_y: -169.762,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 666,
                        radius: 400,
                        heightRange: 15,
                        waterHeight: 25,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Little Goblin",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 11300,
                    position_y: -6500,
                    velocity_x: 97.651,
                    velocity_y: 169.762,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 666,
                        radius: 400,
                        heightRange: 15,
                        waterHeight: 25,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Hell Raiser",
                    starting_planet: false,
                    mass: 5000,
                    position_x: 11300,
                    position_y: -6500,
                    velocity_x: -0.00000758622,
                    velocity_y: 173.553,
                    required_thrust_to_move: 3,
                    planet: {
                        seed: 666,
                        radius: 250,
                        heightRange: 35,
                        waterHeight: 60,
                        temperature: 100,
                        metalDensity: 0,
                        metalClusters: 0,
                        biomeScale: 100,
                        biome: "lava"
                    }
                }
            ]
        },
        {
            name: "Gaf System",
            description: "2-4 Players",
            players: [2, 4],
            planets: [
                {
                    name: "Magma Prime",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 75000,
                    position_y: 0,
                    velocity_x: 0.00000356902,
                    velocity_y: -81.6497,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 999,
                        radius: 500,
                        heightRange: 25,
                        waterHeight: 5,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 50,
                        biome: "lava"
                    }
                },
                {
                    name: "Magma Alpha",
                    starting_planet: true,
                    mass: 50000,
                    position_x: -75000,
                    position_y: 0,
                    velocity_x: -0.00000356902,
                    velocity_y: 81.6497,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 999,
                        radius: 500,
                        heightRange: 25,
                        waterHeight: 5,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 50,
                        biome: "lava"
                    }
                },
                {
                    name: "Ice Prime",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 0,
                    position_y: 75000,
                    velocity_x: 81.6497,
                    velocity_y: -0.00000356902,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 999,
                        radius: 500,
                        heightRange: 25,
                        waterHeight: 15,
                        temperature: 0,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 50,
                        biome: "earth"
                    }
                },
                {
                    name: "Ice Alpha",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 0,
                    position_y: -75000,
                    velocity_x: -81.6497,
                    velocity_y: 0.00000356902,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 999,
                        radius: 500,
                        heightRange: 25,
                        waterHeight: 15,
                        temperature: 0,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 50,
                        biome: "earth"
                    }
                },
            ]
        },
        {
            name: "Monday Night System",
            description: "2-4 Players",
            players: [2, 4],
            planets: [
                {
                    name: "Money Ball",
                    starting_planet: false,
                    mass: 50000,
                    position_x: -30000,
                    position_y: 0,
                    velocity_x: -0.00000564312,
                    velocity_y: 129.099,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 23743,
                        radius: 500,
                        heightRange: 0,
                        waterHeight: 0,
                        temperature: 0,
                        metalDensity: 100,
                        metalClusters: 75,
                        biomeScale: 100,
                        biome: "metal"
                    }
                },
                {
                    name: "Bacon",
                    starting_planet: false,
                    mass: 5000,
                    position_x: -33000,
                    position_y: 0,
                    velocity_x: 0.00719808,
                    velocity_y: -159.576,
                    required_thrust_to_move: 3,
                    planet: {
                        seed: 7846,
                        radius: 250,
                        heightRange: 15,
                        waterHeight: 40,
                        temperature: 100,
                        metalDensity: 0,
                        metalClusters: 0,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Iceman",
                    starting_planet: true,
                    mass: 5000,
                    position_x: 25000,
                    position_y: 0,
                    velocity_x: 0.000118925,
                    velocity_y: -404.303,
                    required_thrust_to_move: 5,
                    planet: {
                        seed: 127,
                        radius: 250,
                        heightRange: 25,
                        waterHeight: 31,
                        temperature: 0,
                        metalDensity: 50,
                        metalClusters: 0,
                        biomeScale: 100,
                        biome: "earth"
                    }
                },
                {
                    name: "Hotshot",
                    starting_planet: true,
                    mass: 5000,
                    position_x: 17000,
                    position_y: 0,
                    velocity_x: 0.0000970697,
                    velocity_y: -95.6967,
                    required_thrust_to_move: 5,
                    planet: {
                        seed: 9,
                        radius: 250,
                        heightRange: 10,
                        waterHeight: 40,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 0,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Bullseye",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 21000,
                    position_y: 0,
                    velocity_x: 0.00000674481,
                    velocity_y: -154.303,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 22003,
                        radius: 500,
                        heightRange: 30,
                        waterHeight: 34,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 0,
                        biomeScale: 100,
                        biome: "tropical"
                    }
                }
            ]
        },
        {
            name: "Zaphod System",
            description: "2-4 Players",
            players: [2, 4],
            planets: [
                {
                    name: "Zaphod Prime",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 25000,
                    position_y: 0,
                    velocity_x: -0.00000618172,
                    velocity_y: 141.421,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 10116,
                        radius: 450,
                        heightRange: 15,
                        waterHeight: 30,
                        temperature: 100,
                        metalDensity: 25,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "lava"
                    }
                },
                {
                    name: "Zaphod Alpha",
                    starting_planet: true,
                    mass: 5000,
                    position_x: 30000,
                    position_y: 0,
                    velocity_x: 0.00710033,
                    velocity_y: -82.1858,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 10116,
                        radius: 400,
                        heightRange: 15,
                        waterHeight: 30,
                        temperature: 0,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 100,
                        biome: "earth"
                    }
                },
                {
                    name: "Zaphod Beta",
                    starting_planet: false,
                    mass: 30000,
                    position_x: 15000,
                    position_y: 0,
                    velocity_x: -0.00142973,
                    velocity_y: -16.6929,
                    required_thrust_to_move: 2,
                    planet: {
                        seed: 9,
                        radius: 250,
                        heightRange: 10,
                        waterHeight: 1,
                        temperature: 0,
                        metalDensity: 50,
                        metalClusters: 50,
                        biomeScale: 100,
                        biome: "moon"
                    }
                }
            ]
        },
        {
            name: "Inner Sol System",
            description: "4+ Players",
            players: [4, 10],
            planets: [
                {
                    name: "Mercury",
                    starting_planet: false,
                    mass: 50000,
                    position_x: 13000,
                    position_y: 0,
                    velocity_x: -0.00000857251,
                    velocity_y: 196.116,
                    required_thrust_to_move: 5,
                    planet: {
                        seed: 15031,
                        radius: 300,
                        heightRange: 10,
                        waterHeight: 27,
                        temperature: 100,
                        metalDensity: 25,
                        metalClusters: 100,
                        biomeScale: 100,
                        biome: "desert"
                    }
                },
                {
                    name: "Venus",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 20000,
                    position_y: 0,
                    velocity_x: -0.00000691138,
                    velocity_y: 158.114,
                    required_thrust_to_move: 5,
                    planet: {
                        seed: 9536,
                        radius: 650,
                        heightRange: 0,
                        waterHeight: 20,
                        temperature: 100,
                        metalDensity: 50,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "desert"
                    }
                },
                {
                    name: "Earth",
                    starting_planet: true,
                    mass: 50000,
                    position_x: 30000,
                    position_y: 0,
                    velocity_x: -0.00000564312,
                    velocity_y: 129.099,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 2628,
                        radius: 700,
                        heightRange: 50,
                        waterHeight: 50,
                        temperature: 50,
                        metalDensity: 50,
                        metalClusters: 25,
                        biomeScale: 100,
                        biome: "earth"
                    }
                },
                {
                    name: "Luna",
                    starting_planet: false,
                    mass: 5000,
                    position_x: 33000,
                    position_y: 0,
                    velocity_x: 0.00693425,
                    velocity_y: -159.576,
                    required_thrust_to_move: 3,
                    planet: {
                        seed: 12236,
                        radius: 250,
                        heightRange: 0,
                        waterHeight: 0,
                        temperature: 0,
                        metalDensity: 25,
                        metalClusters: 0,
                        biomeScale: 0,
                        biome: "moon"
                    }
                },
                {
                    name: "Mars",
                    starting_planet: false,
                    mass: 50000,
                    position_x: 40000,
                    position_y: 0,
                    velocity_x: -0.00000488708,
                    velocity_y: 111.803,
                    required_thrust_to_move: 0,
                    planet: {
                        seed: 9574,
                        radius: 400,
                        heightRange: 0,
                        waterHeight: 10,
                        temperature: 100,
                        metalDensity: 100,
                        metalClusters: 0,
                        biomeScale: 0,
                        biome: "lava"
                    }
                },
                {
                    name: "Phobos",
                    starting_planet: false,
                    mass: 5000,
                    position_x: 43000,
                    position_y: 0,
                    velocity_x: -0.0225859,
                    velocity_y: -400.478,
                    required_thrust_to_move: 3,
                    planet: {
                        seed: 17425,
                        radius: 200,
                        heightRange: 50,
                        waterHeight: 0,
                        temperature: 0,
                        metalDensity: 25,
                        metalClusters: 0,
                        biomeScale: 0,
                        biome: "moon"
                    }
                },
                {
                    name: "Deimos",
                    starting_planet: false,
                    mass: 5000,
                    position_x: 37000,
                    position_y: 0,
                    velocity_x: -0.022611,
                    velocity_y: 176.872,
                    required_thrust_to_move: 3,
                    planet: {
                        seed: 17425,
                        radius: 200,
                        heightRange: 50,
                        waterHeight: 0,
                        temperature: 0,
                        metalDensity: 25,
                        metalClusters: 0,
                        biomeScale: 0,
                        biome: "moon"
                    }
                }
            ]
        },
       {
           name: "Iron Sky System",
           description: "5-6 Players",
           players: [5, 6],
           planets: [
              {
                  name: "Noble's Keep",
                  starting_planet: true,
                  mass:                 45875,
                  position_x:           -3600,
                  position_y:           -26700,
                  velocity_x:           135.008499,
                  velocity_y:           -18.203386,
                  required_thrust_to_move: 0,
                  planet: {
                      seed:             4096,
                      radius:           600,
                      heightRange:      26,
                      waterHeight:      45,
                      temperature:      58,
                      metalDensity:     45,
                      metalClusters:    45,
                      biomeScale:       100,
                      biome:            "desert"
                  }
              },
              {
                  name: "TJ's Lair",
                  starting_planet: false,
                  mass:                 26750,
                  position_x:           -1963.16357,
                  position_y:           -35273.265625,
                  velocity_x:           -24.226333,
                  velocity_y:           -48.605037,
                  required_thrust_to_move: 0,
                  planet: {
                      seed:             7846,
                      radius:           380,
                      heightRange:      45,
                      waterHeight:      15,
                      temperature:      100,
                      metalDensity:     85,
                      metalClusters:    85,
                      biomeScale:       100,
                      biome:            "lava"
                  }
              },
              {
                  name: "Climo",
                  starting_planet: false,
                  mass:                 5000,
                  position_x:           -5295.650390625,
                  position_y:           -34570.0234375,
                  velocity_x:           16.6910400,
                  velocity_y:           145.292083,
                  required_thrust_to_move: 3,
                  planet: {
                      seed:             18022,
                      radius:           200,
                      heightRange:      40,
                      waterHeight:      0,
                      temperature:      0,
                      metalDensity:     0,
                      metalClusters:    0,
                      biomeScale:       100,
                      biome: "moon"
                  }
              }
           ]
       },
       {
           name: "PAX Prime 2014",
           description: "4-6 Players",
           players: [4, 6],
           planets: [
              {
                  name: "PAX Gas",
                  starting_planet: false,
                  mass: 50000,
                  position_x: 30000,
                  position_y: 0,
                  velocity_x: 0,
                  velocity_y: 129.0994,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 8239,
                      radius: 1500,
                      heightRange: 0,
                      waterHeight: 0,
                      temperature: 10,
                      metalDensity: 0,
                      metalClusters: 0,
                      biomeScale: 0,
                      biome: "gas"
                  }
              },
              {
                  name: "PAX Prime",
                  starting_planet: true,
                  mass: 10000,
                  position_x: 35000,
                  position_y: 0,
                  velocity_x: 0,
                  velocity_y: -94.5074,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 13350,
                      radius: 500,
                      heightRange: 20,
                      waterHeight: 45,
                      temperature: 76,
                      metalDensity: 50,
                      metalClusters: 24,
                      biomeScale: 100,
                      biome: "earth"
                  }
              },
              {
                  name: "PAX Lava",
                  starting_planet: true,
                  mass: 10000,
                  position_x: 25000,
                  position_y: 0,
                  velocity_x: 0,
                  velocity_y: 352.7061,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 14216,
                      radius: 500,
                      heightRange: 15,
                      waterHeight: 30,
                      temperature: 100,
                      metalDensity: 50,
                      metalClusters: 24,
                      biomeScale: 100,
                      biome: "lava"
                  }
              },
              {
                  name: "PAX Pox",
                  starting_planet: true,
                  mass: 5000,
                  position_x: 20000,
                  position_y: 0,
                  velocity_x: 0,
                  velocity_y: 287.213287,
                  required_thrust_to_move: 2,
                  planet: {
                      seed: 9,
                      radius: 250,
                      heightRange: 20,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 10,
                      metalClusters: 0,
                      biomeScale: 0,
                      biome: "moon"
                  }
              },
              {
                  name: "PAXilaser",
                  starting_planet: false,
                  mass: 50000,
                  position_x: 14000,
                  position_y: 0,
                  velocity_x: 0,
                  velocity_y: 188.98223,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 729,
                      radius: 500,
                      heightRange: 0,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 75,
                      metalClusters: 75,
                      biomeScale: 0,
                      biome: "metal"
                  }
              }
           ]
       },
       {
           name: "Blakmoor System",
           description: "5-6 Players",
           players: [5, 6],
           planets: [
              {
                  name: "Bron",
                  starting_planet: false,
                  mass: 33000,
                  position_x: 0,
                  position_y: -31500,
                  velocity_x: -125.98799,
                  velocity_y: -0.0000055,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 12561,
                      radius: 620,
                      heightRange: 27,
                      waterHeight: 38,
                      temperature: 94,
                      metalDensity: 75,
                      metalClusters: 75,
                      biomeScale: 100,
                      biome: "tropical"
                  }
              },
              {
                  name: "William's Fist",
                  starting_planet: true,
                  mass: 36500,
                  position_x: -5099.990234375,
                  position_y: -44000,
                  velocity_x: -105.53900146484375,
                  velocity_y: 12.23289966583252,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11742,
                      radius: 450,
                      heightRange: 18,
                      waterHeight: 38,
                      temperature: 100,
                      metalDensity: 25,
                      metalClusters: 35,
                      biomeScale: 100,
                      biome: "desert"
                  }
              },
              {
                  name: "Earl's Playground",
                  starting_planet: true,
                  mass: 36500,
                  position_x: 5000.009765625,
                  position_y: -44000,
                  velocity_x: 105.5790023803711,
                  velocity_y: 11.997699737548828,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 25941,
                      radius: 400,
                      heightRange: 35,
                      waterHeight: 33,
                      temperature: 0,
                      metalDensity: 25,
                      metalClusters: 35,
                      biomeScale: 100,
                      biome: "earth"
                  }
              }
           ]
       },
       {
           name: "Piratical System",
           description: "6 Players",
           players: [6, 6],
           planets: [
              {
                  name: "Tortuga",
                  starting_planet: true,
                  mass: 50000,
                  position_x: -36000,
                  position_y: -0.06866460293531418,
                  velocity_x: 0.00022993399761617184,
                  velocity_y: -117.85099792480469,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 20087,
                      radius: 500,
                      heightRange: 15,
                      waterHeight: 60,
                      temperature: 73,
                      metalDensity: 45,
                      metalClusters: 55,
                      biomeScale: 100,
                      biome: "desert"
                  }
              },
              {
                  name: "Barataria",
                  starting_planet: true,
                  mass: 50000,
                  position_x: 36000,
                  position_y: -0.022583000361919403,
                  velocity_x: 0.00006877719715703279,
                  velocity_y: 117.85099792480469,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 20206,
                      radius: 500,
                      heightRange: 35,
                      waterHeight: 57,
                      temperature: 78,
                      metalDensity: 45,
                      metalClusters: 55,
                      biomeScale: 100,
                      biome: "earth"
                  }
              },
              {
                  name: "Port Royal",
                  starting_planet: false,
                  mass: 50000,
                  position_x: -0.005307499784976244,
                  position_y: -70300,
                  velocity_x: 84.33489990234375,
                  velocity_y: -0.000002680709940250381,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 30856,
                      radius: 400,
                      heightRange: 30,
                      waterHeight: 58,
                      temperature: 100,
                      metalDensity: 90,
                      metalClusters: 70,
                      biomeScale: 100,
                      biome: "desert"
                  }
              },
              {
                  name: "Clew",
                  starting_planet: false,
                  mass: 5000,
                  position_x: -9600,
                  position_y: -72600,
                  velocity_x: 121.41300201416016,
                  velocity_y: -154.75900268554688,
                  required_thrust_to_move: 3,
                  planet: {
                      seed: 26214,
                      radius: 250,
                      heightRange: 20,
                      waterHeight: 59,
                      temperature: 96,
                      metalDensity: 0,
                      metalClusters: 0,
                      biomeScale: 100,
                      biome: "desert"
                  }
              }
           ]
       },
       {
           name: "Collision System",
           description: "8 Players",
           players: [8, 8],
           planets: [
              {
                  name: "Earhart's Haven",
                  starting_planet: false,
                  mass: 50000,
                  position_x: -48200,
                  position_y: -100.39199829101562,
                  velocity_x: 0.2121410071849823,
                  velocity_y: -101.8499984741211,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 25667,
                      radius: 700,
                      heightRange: 25,
                      waterHeight: 45,
                      temperature: 100,
                      metalDensity: 80,
                      metalClusters: 80,
                      biomeScale: 100,
                      biome: "tropical"
                  }
              },
              {
                  name: "Roma",
                  starting_planet: true,
                  mass: 15000,
                  position_x: 54800,
                  position_y: 24900,
                  velocity_x: -37.70320129394531,
                  velocity_y: 82.97740173339844,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11468,
                      radius: 400,
                      heightRange: 11,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 15,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "moon"
                  }
              },
              {
                  name: "Hindenburg",
                  starting_planet: false,
                  mass: 15000,
                  position_x: 59800,
                  position_y: 7200,
                  velocity_x: -10.891300201416016,
                  velocity_y: 90.45790100097656,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 10376,
                      radius: 400,
                      heightRange: 14,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 15,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "earth"
                  }
              },
              {
                  name: "Dixmude",
                  starting_planet: false,
                  mass: 15000,
                  position_x: 60000,
                  position_y: -5100.009765625,
                  velocity_x: -7.717619895935059,
                  velocity_y: -90.79550170898438,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 10376,
                      radius: 400,
                      heightRange: 14,
                      waterHeight: 0,
                      temperature: 35,
                      metalDensity: 15,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "earth"
                  }
              },
              {
                  name: "Akron",
                  starting_planet: true,
                  mass: 15000,
                  position_x: 54700,
                  position_y: -25100,
                  velocity_x: -38.01350021362305,
                  velocity_y: -82.84230041503906,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 10376,
                      radius: 400,
                      heightRange: 14,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 15,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "moon"
                  }
              }
           ]
       },
       {
           name: "Battlefield System",
           description: "8-10 Players",
           players: [8, 10],
           planets: [
              {
                  name: "Syracuse",
                  starting_planet: false,
                  mass: 50000,
                  position_x: 21145.921875,
                  position_y: 35367.453125,
                  velocity_x: -94.54401397705078,
                  velocity_y: 56.526885986328125,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 24029,
                      radius: 710,
                      heightRange: 10,
                      waterHeight: 37,
                      temperature: 95,
                      metalDensity: 82,
                      metalClusters: 60,
                      biomeScale: 100,
                      biome: "metal"
                  }
              },
              {
                  name: "Napalm",
                  starting_planet: false,
                  mass: 5000,
                  position_x: 33248.1015625,
                  position_y: 40114.4453125,
                  velocity_x: -145.18154907226562,
                  velocity_y: 185.6262664794922,
                  required_thrust_to_move: 2,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 10,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "moon"
                  }
              },
              {
                  name: "V2",
                  starting_planet: false,
                  mass: 5000,
                  position_x: 25795.56640625,
                  position_y: 23227.18359375,
                  velocity_x: 34.95726776123047,
                  velocity_y: 106.12570190429688,
                  required_thrust_to_move: 2,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 10,
                      metalClusters: 10,
                      biomeScale: 100,
                      biome: "moon"
                  }
              },
              {
                  name: "Culverin",
                  starting_planet: false,
                  mass: 5000,
                  position_x: 9042.2744140625,
                  position_y: 30623.541015625,
                  velocity_x: -43.9383544921875,
                  velocity_y: -72.58448791503906,
                  required_thrust_to_move: 2,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 10,
                      metalClusters: 10,
                      biomeScale: 100,
                      biome: "moon"
                  }
              },
              {
                  name: "Morning Star",
                  starting_planet: false,
                  mass: 5000,
                  position_x: 16310.9365234375,
                  position_y: 47435.48828125,
                  velocity_x: -223.26882934570312,
                  velocity_y: 4.9534759521484375,
                  required_thrust_to_move: 2,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 0,
                      temperature: 0,
                      metalDensity: 10,
                      metalClusters: 10,
                      biomeScale: 100,
                      biome: "moon"
                  }
              },
              {
                  name: "Tizona",
                  starting_planet: true,
                  mass: 5000,
                  position_x: 32692.984375,
                  position_y: 48754.07421875,
                  velocity_x: -184.58935546875,
                  velocity_y: 134.19984436035156,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 46,
                      temperature: 100,
                      metalDensity: 30,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "tropical"
                  }
              },
              {
                  name: "Joyeuse",
                  starting_planet: true,
                  mass: 5000,
                  position_x: 33928.65625,
                  position_y: 23136.615234375,
                  velocity_x: -12.362159729003906,
                  velocity_y: 142.41769409179688,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 50,
                      temperature: 0,
                      metalDensity: 30,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "earth"
                  }
              },
              {
                  name: "Arbalest",
                  starting_planet: true,
                  mass: 5000,
                  position_x: 9795.900390625,
                  position_y: 21808.18359375,
                  velocity_x: -3.3668212890625,
                  velocity_y: -19.79387664794922,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 20,
                      temperature: 100,
                      metalDensity: 30,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "desert"
                  }
              },
              {
                  name: "Gatling",
                  starting_planet: true,
                  mass: 5000,
                  position_x: 7785.6845703125,
                  position_y: 46828.9296875,
                  velocity_x: -172.23602294921875,
                  velocity_y: -34.005950927734375,
                  required_thrust_to_move: 0,
                  planet: {
                      seed: 11468,
                      radius: 450,
                      heightRange: 11,
                      waterHeight: 45,
                      temperature: 63,
                      metalDensity: 30,
                      metalClusters: 30,
                      biomeScale: 100,
                      biome: "lava"
                    }
                },
            ]
        }
    ];

    function PlanetSelectorViewModel() {
        var self = this;
        
        var urlTabs = $.url().param('tabs');
        self.enableTabs = ko.observable(_.isString(urlTabs) ? !!JSON.parse(urlTabs) : true);
        var urlSystems = $.url().param('systems');
        self.enableSystems = ko.observable(_.isString(urlSystems) ? !!JSON.parse(urlSystems) : true);
        var urlPlanets = $.url().param('planets');
        self.enablePlanets = ko.observable(_.isString(urlPlanets) ? !!JSON.parse(urlPlanets) : true);
        var urlTitle = $.url().param('title');
        self.title = ko.observable(_.isString(urlTitle) ? urlTitle : 'System Designer');

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });
        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });
        self.nextSceneUrl = ko.observable().extend({ session: 'next_scene_url' });

        // Set up messaging for the social bar
        self.pageMessage = ko.observable();

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('');
        self.containerWidth = ko.observable('');
        self.contentWrapperHeight = ko.observable('');

       // Click handler for back button
        self.back = function() {
            window.location.href = self.lastSceneUrl();
            return; /* window.location.href will not stop execution. */
        };

        self.imageSourceForPlanet = function (planetSpec) {
            if (typeof planetSpec != "undefined" && typeof planetSpec.planet != "undefined") {
                var ice = planetSpec.planet.biome === 'earth' && planetSpec.planet.temperature <= 33;
                var s = (ice) ? 'ice' : planetSpec.planet.biome;

                return 'coui://ui/main/shared/img/' + s + '.png';
            }
        }

        self.imageSourceForSystem = function (system) {
            planetSpec = system.planets[0];
            return self.imageSourceForPlanet(planetSpec);
        }

        self.imageSizeForPlanet = function (size) {
            return '' + 100 + 'px';
        }

        self.planetSizeClass = function (radius) {
            if (radius <= 250)
                return '1';
            if (radius <= 450)
                return '2';
            if (radius <= 650)
                return '3';
            if (radius <= 850)
                return '4';
            return '5';
        }

        self.loadedPlanet = ko.observable({}).extend({ session: 'loaded_planet' });
        self.planetName = ko.observable();

        self.showValue = ko.observable('systems');
        self.showSystems = ko.computed(function() { return self.enableSystems() && self.showValue() == 'systems'});
        self.showPlanets = ko.computed(function() { return self.enablePlanets() && self.showValue() == 'planets'});
        self.toggleShowSystemText = ko.computed(function () { if (self.showSystems()) return loc("!LOC(load_planet:show_planets.message):SHOW PLANETS"); return loc("!LOC(load_planet:show_systems.message):SHOW SYSTEMS"); });
        self.toggleShowSystem = function () { self.showSystems(!self.showSystems()) };

        self.userSystems = ko.observableArray([]).extend({ local: 'systems' });
        self.premadeSystems = ko.observableArray(premade_systems);
        self.systems = ko.computed(function () {
            return self.premadeSystems().concat(self.userSystems());
        });
        self.loadedSystem = ko.observable({}).extend({ session: 'loaded_system' });

        self.selectedSystemIndex = ko.observable(-1);
        self.selectedSystem = ko.computed(function () { return self.systems()[self.selectedSystemIndex()] ? self.systems()[self.selectedSystemIndex()] : {}; });
        self.selectedSystemName = ko.computed(function () { return (self.systems()[self.selectedSystemIndex()]) ? self.systems()[self.selectedSystemIndex()].name : '' });
        self.selectedSystemEmpty = ko.computed(function () { return (jQuery.isEmptyObject(self.selectedSystem())) });
        self.selectedSystemIsUserSystem = ko.computed(function () {
            return self.selectedSystemIndex() >= self.premadeSystems().length;
        });

        self.selectedSystemImageSource = ko.computed(function () { if (!self.selectedSystemEmpty()) return self.imageSourceForPlanet(self.selectedSystem().planets[0].planet); });
        self.selectedSystemRadiusWidthString = ko.computed(function () { if (!self.selectedSystemEmpty()) return String(self.selectedSystem().planets[0].planet.radius / 10) + 'px'; });
        self.selectedSystemHeightWidthString = ko.computed(function () { if (!self.selectedSystemEmpty()) return String(self.selectedSystem().planets[0].planet.heightRange * 2) + 'px'; });
        self.selectedSystemWaterWidthString = ko.computed(function () { if (!self.selectedSystemEmpty()) return String(self.selectedSystem().planets[0].planet.waterHeight * 2) + 'px'; });
        self.selectedSystemTemperatureWidthString = ko.computed(function () { if (!self.selectedSystemEmpty()) return String(self.selectedSystem().planets[0].planet.temperature * 2) + 'px'; });

        self.planets = ko.observableArray([]).extend({ local: 'planets' });

        self.selectedPlanetIndex = ko.observable(-1);
        self.selectedPlanet = ko.computed(function () { return self.planets()[self.selectedPlanetIndex()] ? self.planets()[self.selectedPlanetIndex()] : {}; });
        self.selectedPlanetName = ko.computed(function () { return (self.planets()[self.selectedPlanetIndex()]) ? self.planets()[self.selectedPlanetIndex()].name : '' });
        self.selectedPlanetEmpty = ko.computed(function () { return (jQuery.isEmptyObject(self.selectedPlanet())) });

        self.selectedPlanetImageSource = ko.computed(function () { if (!self.selectedPlanetEmpty()) return self.imageSourceForPlanet(self.selectedPlanet().planet); });
        self.selectedPlanetRadiusWidthString = ko.computed(function () { if (!self.selectedPlanetEmpty()) return String(self.selectedPlanet().planet.radius / 10) + 'px'; });
        self.selectedPlanetHeightWidthString = ko.computed(function () { if (!self.selectedPlanetEmpty()) return String(self.selectedPlanet().planet.heightRange * 2) + 'px'; });
        self.selectedPlanetWaterWidthString = ko.computed(function () { if (!self.selectedPlanetEmpty()) return String(self.selectedPlanet().planet.waterHeight * 2) + 'px'; });
        self.selectedPlanetTemperatureWidthString = ko.computed(function () { if (!self.selectedPlanetEmpty()) return String(self.selectedPlanet().planet.temperature * 2) + 'px'; });

        self.allowCreateNewSystem = ko.computed(function () {
            return self.lastSceneUrl() === 'coui://ui/main/game/start/start.html';
        });

        self.navForward = function () {
           window.location.href = self.nextSceneUrl();
           return; /* window.location.href will not stop execution. */
        }

        self.loadPlanet = function () {
            if (self.selectedPlanetIndex() < 0)
                return;
            self.loadedPlanet(self.selectedPlanet());
            self.loadedSystem({});

            self.navForward();
        }

        self.navToNewSystem = function () {
            window.location.href = 'coui://ui/main/game/system_editor/system_editor.html';
            return; /* window.location.href will not stop execution. */
        }


        self.loadSystem = function () {
            if (self.selectedSystemIndex() < 0)
                return;
            self.loadedSystem(self.selectedSystem());
            self.loadedPlanet({});

            self.navForward();
        }

        self.deletePlanet = function () {
            var a = self.planets();

            if (self.selectedPlanetIndex() < 0)
                return;

            a.splice(self.selectedPlanetIndex(), 1);
            self.planets(a);
            self.selectedPlanetIndex(-1);
        }

        self.deleteSystem = function () {
            var a = self.userSystems();

            if (self.selectedSystemIndex() < 0)
                return;

            a.splice(self.selectedSystemIndex() - self.premadeSystems().length, 1);
            self.userSystems(a);
            self.selectedSystemIndex(-1);
        }

        self.delete = function () {
            if (self.showSystems())
                self.deleteSystem();
            else
                self.deletePlanet();
            $('#confirm').modal('hide');
        }

        self.validatePlanetConfig = function (config) {
            var planet = config ? config.planet : null;
            if (!planet || planet.radius > 1300)
                return false;

            return true;   
        }

        self.displayExperimentalPlanet = function (config) {
            return !self.validatePlanetConfig(config);
        }

        self.displayExperimentalSystem = function (planets) {
            return !_.every(planets, self.validatePlanetConfig);
        }

        self.selectedPlanetValid = ko.computed(function () {
            if (self.nextSceneUrl() === 'coui::/ui/main/game/new_game/new_game.html') 
                return self.validatePlanetConfig(self.planets()[self.selectedPlanetIndex()]);
            else
                return !!self.selectedPlanetName()
        })

        self.selectedSystemValid = ko.computed(function () {
            var i;
            var a;
            var p;

            if (!self.selectedSystem() && self.selectedSystem().planets)
                return false;

            a = self.selectedSystem().planets;

            if (!a || !a.length)
                return false;

            if (self.nextSceneUrl() === 'coui://ui/main/game/new_game/new_game.html') {
   
                for (i = 0; i < a.length; i++) {

                    p = a[i];
                    if (!p || !self.validatePlanetConfig(p)) 
                        return false;                 
                }

                return true;
            }
            else
                return !!self.selectedSystemName();
        })
    }

    model = new PlanetSelectorViewModel();

    handlers = {};

   // inject per scene mods
    if (scene_mod_list['load_planet']) {
        loadMods(scene_mod_list['load_planet']);
    }

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // Set up selectpickers to work as multi-select dropdowns
    $('#view-select').selectpicker({ noneSelectedText: 'Any selection' });

    // Set up resize event for window so we can smart-size the game list
    $(window).resize(respondToResize);

    // Do some initial resizing, since resize isn't called on page load (but this may not be accurate)
    model.containerHeight($("body").height() +'px');
    model.containerWidth(($("body").width() - 10)+'px');
    // Have to delay a few milliseconds, as immediate call was sometimes not calculating correctly
    window.setTimeout(respondToResize,100);
});
