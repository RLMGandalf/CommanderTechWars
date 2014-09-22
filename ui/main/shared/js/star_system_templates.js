// !LOCNS:galactic_war
var star_system_templates = function () {
    var table = [
        {
            Players: [0, 2],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [375, 425],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: [ 'earth', 'desert', 'tropical' ]
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [450, 550],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [38, 42],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [15000, 0],
                            Velocity: [-0.00000798057, 182.574],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [38, 42],
                            Temp: [0, 100],
                            MetalDensity: [25, 75],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0.00000798057, -182.574],
                            Biomes: ['desert', 'lava']
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 500],
                            Height: [20, 25],
                            Water: [38, 42],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [-0.000006181723165354924, 141.42135620117188],
                            Biomes: ['desert', 'lava', 'tropical', 'earth']
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [375, 400],
                            Height: [20, 25],
                            Water: [32, 34],
                            Temp: [0, 5],
                            MetalDensity: [75, 100],
                            MetalClusters: [75, 100],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['moon', 'earth', 'tropical', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [1, 1],
                            Radius: [250, 250],
                            Height: [10, 15],
                            Water: [0, 10],
                            Temp: [0, 10],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [57500, 0],
                            Velocity: [0.000118759, -82.5742],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [1, 1],
                            Radius: [250, 250],
                            Height: [10, 15],
                            Water: [0, 10],
                            Temp: [0, 10],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [42500, 0],
                            Velocity: [0.0000295162, 282.574],
                            Biomes: ['moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [0, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [28700, 0],
                            Velocity: [0, -118.5163],
                            Biomes: ['lava', 'moon', 'earth']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1200, 1200],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [0, 141.4214],
                            Biomes: ['gas']
                        }
                    ]
                }
            ]
        },
        {
            Players: [3, 3],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [450, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: [ 'earth', 'desert', 'tropical', 'lava', 'moon' ]
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [15000, 0],
                            Velocity: [-0.00000798057, 182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0.00000798057, -182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, 15000],
                            Velocity: [-182.574, -0.00000798057],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [15000, 0],
                            Velocity: [-0.00000798057, 182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0.00000798057, -182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, 15000],
                            Velocity: [-182.574, -0.00000798057],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [200, 200],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [0, -15000],
                            Velocity: [182.574, 0.00000798057],
                            Biomes: ['moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [15000, 0],
                            Velocity: [-0.00000798057, 182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0.00000798057, -182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, 15000],
                            Velocity: [-182.574, -0.00000798057],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [250, 250],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [0, -125000],
                            Velocity: [63.2456, 0.00000276455],
                            Biomes: ['moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1500, 1500],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0, -141.4214],
                            Biomes: ['gas']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0, 82.1854],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 5000],
                            Velocity: [-223.60679, -141.4213],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-30000, 0],
                            Velocity: [0, -365.02813],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        }
                    ],
                },
            ]
        },
        {
            Players: [4, 4],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'metal', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [15000, 0],
                            Velocity: [-0.00000798057, 182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0.00000798057, -182.574],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, 15000],
                            Velocity: [-182.574, -0.00000798057],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [350, 350],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, -15000],
                            Velocity: [182.574, 0.00000798057],
                            Biomes: ['moon', 'earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 4],
                            Radius: [200, 250],
                            Height: [2, 5],
                            Water: [1, 2],
                            Temp: [0, 10],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [700, 700],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [75, 100],
                            MetalClusters: [75, 100],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['earth', 'tropical']
                        },
                        {
                            starting_planet: true,
                            mass: 25000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [20, 24],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [-0.000071654, 258.114],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 25000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [20, 24],
                            Temp: [0, 100],
                            MetalDensity: [0, 14],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [40000, 0],
                            Velocity: [-0.0000578313, -58.1139],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [65000, 0],
                            Velocity: [-0.0000421168, 100],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 38],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [35000, 0],
                            Velocity: [-0.0000764278, 41.8861],
                            Biomes: ['moon']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-50000, 0],
                            Velocity: [0.00000437114, -100],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 500],
                            Height: [0, 5],
                            Water: [1, 5],
                            Temp: [0, 100],
                            MetalDensity: [50, 100],
                            MetalClusters: [100, 100],
                            BiomeScale: [100, 100],
                            Position: [0, -100000],
                            Velocity: [70.7107, 0.00000309086],
                            Biomes: ['metal']
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-50000, 0],
                            Velocity: [0.00000437114, -100],
                            Biomes: ['desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [1, 3],
                            Radius: [300, 300],
                            Height: [0, 5],
                            Water: [1, 5],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [0, -100000],
                            Velocity: [70.7107, 0.00000309086],
                            Biomes: ['moon']
                        }
                    ],
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1500, 1500],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0, 244],
                            Biomes: ['gas']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-20000, 0],
                            Velocity: [0, 365.02813],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, 5000],
                            Velocity: [-223.60679626464844, -141.42137145996094],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-30000, 0],
                            Velocity: [0.000015955887647578493, -365.02813720703125],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [32, 40],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [-25000, -5000],
                            Velocity: [223.60679626464844, -141.42137145996094],
                            Biomes: ['moon', 'lava', 'earth', 'desert']
                        }
                    ],
                },
                {
                    Planets: [
                       {
                           starting_planet: false,
                           mass: 50000,
                           Thrust: [0, 0],
                           Radius: [1500, 1500],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [0, 0],
                           MetalClusters: [0, 0],
                           BiomeScale: [0, 0],
                           Position: [30000, 0],
                           Velocity: [0, 129.0994],
                           Biomes: ['gas']
                       },
                       {
                           starting_planet: true,
                           mass: 10000,
                           Thrust: [0, 0],
                           Radius: [450, 550],
                           Height: [10, 25],
                           Water: [0, 45],
                           Temp: [0, 100],
                           MetalDensity: [25, 50],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [35000, 0],
                           Velocity: [0, -94.5074],
                           Biomes: ['earth', 'lava', 'desert', 'tropical']
                       },
                       {
                           starting_planet: true,
                           mass: 10000,
                           Thrust: [0, 0],
                           Radius: [450, 550],
                           Height: [10, 25],
                           Water: [0, 40],
                           Temp: [0, 100],
                           MetalDensity: [25, 50],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [25000, 0],
                           Velocity: [0, 352.7061],
                           Biomes: ['earth', 'lava', 'desert', 'tropical']
                       },
                       {
                           starting_planet: true,
                           mass: 5000,
                           Thrust: [1, 3],
                           Radius: [200, 250],
                           Height: [0, 10],
                           Water: [0, 0],
                           Temp: [0, 0],
                           MetalDensity: [10, 20],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [20000, 0],
                           Velocity: [0, 287.213287],
                           Biomes: ['moon', 'lava']
                       },
                       {
                           starting_planet: false,
                           mass: 50000,
                           Thrust: [0, 0],
                           Radius: [500, 525],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [50, 100],
                           MetalClusters: [50, 100],
                           BiomeScale: [0, 100],
                           Position: [14000, 0],
                           Velocity: [0, 188.98223],
                           Biomes: ['metal']
                       }
                    ]
                }
            ]
        },
        {
            Players: [5, 5],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 800],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'metal', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 800],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [5, 5],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.421, -0.00000618172],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [5, 5],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [23800, 7700],
                            Velocity: [-43.5197, 134.515],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [5, 5],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [14700, -20200],
                            Velocity: [-114.388, 83.2427],
                            Biomes: ['earth', 'desert', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [5, 5],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-14700, -20200],
                            Velocity: [114.388, 83.2427],
                            Biomes: ['earth', 'desert', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [5, 5],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-23800, 7700],
                            Velocity: [-43.5197, -134.515],
                            Biomes: ['earth', 'desert', 'lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [100, 100],
                            BiomeScale: [100, 100],
                            Position: [100000, 0],
                            Velocity: [-0.00000309086, 70.7107],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'metal']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [100000, -10000],
                            Velocity: [158.114, -70.7105],
                            Biomes: ['earth', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [90500, -3100],
                            Velocity: [49.0675, -221.076],
                            Biomes: ['earth', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [94100, 8100],
                            Velocity: [-127.67, -163.706],
                            Biomes: ['earth', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [105900, 8100],
                            Velocity: [-127.67, 22.2842],
                            Biomes: ['earth', 'lava', 'moon']
                        },
                        {
                            starting_planet: true,
                            mass: 5000,
                            Thrust: [3, 3],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [105900, -3100],
                            Velocity: [49.0677, 79.6551],
                            Biomes: ['earth', 'lava', 'moon']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1000, 1000],
                            Height: [20, 25],
                            Water: [50, 60],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [40000, 0],
                            Velocity: [0, 111.803],
                            Biomes: ['earth', 'desert']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [1000, 1000],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [40000, -5000],
                            Velocity: [-141.421, 111.803],
                            Biomes: ['gas']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [1000, 1000],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [35700, 2500],
                            Velocity: [116.033, 334.6165],
                            Biomes: ['gas']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [0, 0],
                            Radius: [1000, 1000],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [44300, 2500],
                            Velocity: [116.034, -53.0185],
                            Biomes: ['gas']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [650, 800],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        },
                        {
                             starting_planet: false,
                             mass: 50000,
                             Thrust: [0, 0],
                             Radius: [1500, 1500],
                             Height: [0, 0],
                             Water: [0, 0],
                             Temp: [0, 100],
                             MetalDensity: [0, 0],
                             MetalClusters: [0, 0],
                             BiomeScale: [100, 100],
                             Position: [-25000, 0],
                             Velocity: [0, -141.4213],
                             Biomes: ['gas']
                         },
                    ]
                },
            ]
        },
        {
            Players: [6, 8],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [700, 900],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [75, 100],
                            MetalClusters: [75, 100],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'metal', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [550, 600],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1500, 1500],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0, -141.4213],
                            Biomes: ['gas']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [0.00000618172, -141.421],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [12500, -21700],
                            Velocity: [-122.439, -70.5296],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-12500, -21700],
                            Velocity: [-122.439, 70.5296],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [-0.00000618172, 141.421],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [-12500, 21700],
                            Velocity: [122.439, 70.5297],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [400, 400],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [12500, 21700],
                            Velocity: [122.439, -70.5297],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [500, 600],
                            Height: [0, 1],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 1],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [55000, 0],
                            Velocity: [-0.000200886, 323.607],
                            Biomes: ['moon', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 1],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [45000, 0],
                            Velocity: [-0.000181338, -123.607],
                            Biomes: ['moon', 'lava']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [250, 250],
                            Height: [0, 0],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [100, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [0.00000618172, -141.421],
                            Biomes: ['moon', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [25000, 5000],
                            Velocity: [223.607, -141.421],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [29300, -2500],
                            Velocity: [-112.683, -335.237],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [20700, -2500],
                            Velocity: [-112.683, 52.3943],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [0, -50000],
                            Velocity: [100, 0.00000437114],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [-43300, 25000],
                            Velocity: [-50.0017, -86.6029],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [43300, 25000],
                            Velocity: [-50.0017, 86.6029],
                            Biomes: ['moon']
                        },
                    ]
                },
                {
                    Planets: [
                       {
                           starting_planet: false,
                           mass: 50000,
                           Thrust: [0, 0],
                           Radius: [1500, 1500],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [0, 0],
                           MetalClusters: [0, 0],
                           BiomeScale: [0, 0],
                           Position: [30000, 0],
                           Velocity: [0, 129.0994],
                           Biomes: ['gas']
                       },
                       {
                           starting_planet: true,
                           mass: 10000,
                           Thrust: [0, 0],
                           Radius: [450, 550],
                           Height: [10, 25],
                           Water: [0, 45],
                           Temp: [0, 100],
                           MetalDensity: [25, 50],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [35000, 0],
                           Velocity: [0, -94.5074],
                           Biomes: ['earth', 'lava', 'desert', 'tropical']
                       },
                       {
                           starting_planet: true,
                           mass: 10000,
                           Thrust: [0, 0],
                           Radius: [450, 550],
                           Height: [10, 25],
                           Water: [0, 40],
                           Temp: [0, 100],
                           MetalDensity: [25, 50],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [25000, 0],
                           Velocity: [0, 352.7061],
                           Biomes: ['earth', 'lava', 'desert', 'tropical']
                       },
                       {
                           starting_planet: true,
                           mass: 5000,
                           Thrust: [1, 3],
                           Radius: [200, 250],
                           Height: [0, 10],
                           Water: [0, 0],
                           Temp: [0, 0],
                           MetalDensity: [10, 20],
                           MetalClusters: [0, 24],
                           BiomeScale: [0, 100],
                           Position: [20000, 0],
                           Velocity: [0, 287.213287],
                           Biomes: ['moon', 'lava']
                       },
                       {
                           starting_planet: false,
                           mass: 50000,
                           Thrust: [0, 0],
                           Radius: [500, 525],
                           Height: [0, 0],
                           Water: [0, 0],
                           Temp: [0, 100],
                           MetalDensity: [50, 100],
                           MetalClusters: [50, 100],
                           BiomeScale: [0, 100],
                           Position: [14000, 0],
                           Velocity: [0, 188.98223],
                           Biomes: ['metal']
                       }
                    ]
                }
            ]
        },
        {
            Players: [9, 10],
            Systems: [
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [900, 1200],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [-15000, 0],
                            Velocity: [0, 244],
                            Biomes: ['earth', 'desert', 'lava', 'metal', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [900, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        }
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [800, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 24],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [0, 100],
                            Biomes: ['earth', 'desert', 'tropical', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [60000, 0],
                            Velocity: [0, -58.1138],
                            Biomes: ['lava', 'moon']
                        },
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [1500, 1500],
                            Height: [0, 0],
                            Water: [0, 0],
                            Temp: [0, 100],
                            MetalDensity: [0, 0],
                            MetalClusters: [0, 0],
                            BiomeScale: [100, 100],
                            Position: [-25000, 0],
                            Velocity: [0, -141.4213],
                            Biomes: ['gas']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [900, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.421, -0.00000618172],
                            Biomes: ['earth', 'desert', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [35400, -35400],
                            Velocity: [70.6661, 70.6661],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [0, -50000],
                            Velocity: [100, 0.00000437114],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [-35400, -35400],
                            Velocity: [70.6661, -70.6661],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [-50000, 0],
                            Velocity: [0.00000437114, -100],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [-35400, 35400],
                            Velocity: [-70.6661, -70.6661],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [0, 50000],
                            Velocity: [-100, -0.00000437114],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [35400, 35400],
                            Velocity: [-70.6661, 70.6661],
                            Biomes: ['moon']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [900, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [0, 25000],
                            Velocity: [-141.421, -0.00000618172],
                            Biomes: ['earth', 'desert', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: true,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [900, 1000],
                            Height: [20, 25],
                            Water: [33, 35],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [25, 50],
                            BiomeScale: [100, 100],
                            Position: [0, -25000],
                            Velocity: [141.421, 0.00000618172],
                            Biomes: ['earth', 'desert', 'lava', 'moon', 'metal']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [50000, 0],
                            Velocity: [-0.00000437114, 100],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 10],
                            Water: [1, 2],
                            Temp: [0, 100],
                            MetalDensity: [10, 20],
                            MetalClusters: [0, 49],
                            BiomeScale: [100, 100],
                            Position: [-50000, 0],
                            Velocity: [0.00000437114, -100],
                            Biomes: ['moon']
                        },
                    ]
                },
                {
                    Planets: [
                        {
                            starting_planet: false,
                            mass: 50000,
                            Thrust: [0, 0],
                            Radius: [250, 250],
                            Height: [0, 0],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [100, 100],
                            MetalClusters: [100, 100],
                            BiomeScale: [100, 100],
                            Position: [25000, 0],
                            Velocity: [0.00000618172, -141.421],
                            Biomes: ['moon', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [25000, 5000],
                            Velocity: [223.607, -141.421],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [29300, -2500],
                            Velocity: [-112.683, -335.237],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: true,
                            mass: 10000,
                            Thrust: [0, 0],
                            Radius: [600, 600],
                            Height: [20, 25],
                            Water: [30, 40],
                            Temp: [0, 100],
                            MetalDensity: [0, 10],
                            MetalClusters: [25, 25],
                            BiomeScale: [100, 100],
                            Position: [20700, -2500],
                            Velocity: [-112.683, 52.3943],
                            Biomes: ['earth', 'desert', 'lava']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [0, -50000],
                            Velocity: [100, 0.00000437114],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [-43300, 25000],
                            Velocity: [-50.0017, -86.6029],
                            Biomes: ['moon']
                        },
                        {
                            starting_planet: false,
                            mass: 5000,
                            Thrust: [1, 3],
                            Radius: [200, 250],
                            Height: [0, 25],
                            Water: [0, 1],
                            Temp: [0, 100],
                            MetalDensity: [25, 50],
                            MetalClusters: [0, 25],
                            BiomeScale: [100, 100],
                            Position: [43300, 25000],
                            Velocity: [-50.0017, 86.6029],
                            Biomes: ['moon']
                        },
                    ]
                }
            ]
        }
    ];

    var planet_template =
    {
        name: "Default Planet",
        mass: 5000,
        position: [0, 0],
        velocity: [0, 0],
        required_thrust_to_move: 0,
        generator: {
            seed: 15,
            radius: 100,
            heightRange: 25,
            waterHeight: 35,
            temperature: 100,
            metalDensity: 50,
            metalClusters: 50,
            biomeScale: 100,
            biome: "earth"
        }
    };

    var systemInfo = [

        {
            name: 'Helecon',
            description: '!LOC(galactic_war:at_the_outset_of_the_pro_com_war_helecon_was_one_of_the_first_progenitor_systems_to_be_targeted_by_the_machine_liberation_army_mla_in_a_last_ditch_attempt_to_halt_the_mla_advance_progenitor_forces_peppered_the_system_with_a_barrage_of_nuclear_warheads_the_mla_advance_had_been_stopped_but_the_scorched_earth_tactics_had_rendered_the_system_a_radioactive_wasteland_when_news_of_the_battle_reached_progenitor_civilians_they_were_swift_to_protest_such_drastic_measures.message):At the outset of the Pro-Com War, Helecon was one of the first Progenitor systems to be targeted by the Machine Liberation Army (MLA). In a last ditch attempt to halt the MLA advance, Progenitor forces peppered the system with a barrage of nuclear warheads. The MLA advance had been stopped, but the scorched earth tactics had rendered the system a radioactive wasteland. When news of the battle reached Progenitor civilians they were swift to protest such drastic measures.'
        },
        {
            name: 'Kehlmor',
            description: '!LOC(galactic_war:kehlmor_was_known_for_its_rich_metal_resources_and_was_one_of_the_first_systems_to_be_leased_from_the_progenitor_coalition_government_by_the_terradine_corporation_which_was_swift_in_establishing_several_mining_operations_throughout_the_system_fell_to_the_xziphid_hegemony_during_the_century_war_and_was_not_liberated_by_progenitor_forces_until_fifteen_years_later.message):Kehlmor was known for its rich metal resources and was one of the first systems to be leased from the Progenitor Coalition government by the Terradine Corporation, which was swift in establishing several mining operations throughout. The system fell to the Xziphid Hegemony during the Century War, and was not liberated by Progenitor forces until fifteen years later.'
        },
        {
            name: 'Kenyatta',
            description: '!LOC(galactic_war:once_part_of_xziphid_hegemony_space_this_system_is_where_dr_euphemia_kenyatta_spent_ten_years_in_hiding_from_the_progenitor_coalition_and_shut_off_from_the_rest_of_the_galaxy_it_was_here_that_her_research_on_artificial_intelligence_made_giant_leaps_forward_and_would_later_prove_to_be_the_turning_point_in_the_war_against_the_xziphid_hegemony.message):Once part of Xziphid Hegemony space, this system is where Dr. Euphemia Kenyatta spent ten years in hiding from the Progenitor Coalition and shut off from the rest of the galaxy. It was here that her research on artificial intelligence made giant leaps forward, and would later prove to be the turning point in the war against the Xziphid Hegemony.'
        },
        {
            name: 'Phyrixis',
            description: '!LOC(galactic_war:originally_part_of_the_xziphid_hegemony_this_system_remained_virtually_untouched_until_the_century_war_the_xziphid_using_it_as_a_staging_area_to_launch_attacks_into_progenitor_coalition_space_as_the_war_entered_its_later_stages_progenitor_forces_spearheaded_by_commander_sulla_drove_the_xziphid_from_the_system_in_the_later_years_of_the_war.message):Originally part of the Xziphid Hegemony, this system remained virtually untouched until the Century War; the Xziphid using it as a staging area to launch attacks into Progenitor Coalition space. As the war entered its later stages, Progenitor forces, spearheaded by Commander Sulla, drove the Xziphid from the system in the later years of the war.'
        },
        {
            name: 'Nevarya',
            description: '!LOC(galactic_war:the_nevarya_system_was_once_a_very_popular_vacation_destination_for_progenitor_coalition_citizens_it_became_known_as_the_playground_of_the_wealthy_often_a_hot_spot_of_the_rich_and_famous_during_the_pro_com_war_it_was_the_site_of_numerous_battles_between_progenitors_and_machine_liberation_army_forces.message):The Nevarya system was once a very popular vacation destination for Progenitor Coalition citizens. It became known as the "playground of the wealthy", often a hot spot of the rich and famous. During the Pro-Com War it was the site of numerous battles between Progenitors and Machine Liberation Army forces.'
        },
        {
            name: 'Nymicia',
            description: '!LOC(galactic_war:billed_as_the_hind_end_of_progenitor_coalition_space_the_system_was_a_location_away_from_prying_eyes_progenitor_high_command_commissioned_several_high_security_research_facilities_built_across_the_system_it_was_here_that_many_of_the_cutting_edge_technologies_used_by_progenitor_forces_were_developed_that_would_eventually_be_put_to_use_against_the_xziphid_hegemony_and_later_the_machine_liberation_army.message):Billed as the "hind end" of Progenitor Coalition space, the system was a location away from prying eyes. Progenitor High Command commissioned several high security research facilities built across the system. It was here that many of the cutting edge technologies used by Progenitor forces were developed that would eventually be put to use against the Xziphid Hegemony, and later the Machine Liberation Army.'
        },
        {
            name: 'Delyium',
            description: '!LOC(galactic_war:before_the_outset_of_the_pro_com_war_deliyum_was_known_as_the_breadbasket_for_much_of_the_progenitor_coalition_the_system_was_a_prime_location_for_producing_high_yield_crops_geoponinc_after_discovering_how_well_plants_would_grow_there_quickly_petitioned_the_general_assembly_to_designate_delyium_as_a_sanctuary_systemh_which_meant_it_could_not_be_colonized_without_the_consent_of_the_government_geoponinc_leveraging_its_powerful_influence_in_the_upper_echelons_of_the_government_was_eventually_able_to_obtain_exclusive_rights_to_develop_the_system_all_without_the_constant_threat_of_private_citizens_attempting_to_colonize_it.message):Before the outset of the Pro-Com War, Deliyum was known as the "breadbasket" for much of the Progenitor Coalition. The system was a prime location for producing high yield crops.  GeoponInc, after discovering how well plants would grow there, quickly petitioned the General Assembly to designate Delyium as a "sanctuary systemH, which meant it could not be colonized without the consent of the government. GeoponInc, leveraging its powerful influence in the upper echelons of the government, was eventually able to obtain exclusive rights to develop the system, all without the constant threat of private citizens attempting to colonize it.'
        },
        {
            name: "Thrale's Maze",
            description: '!LOC(galactic_war:named_for_the_famed_progenitor_explorer_johan_thrale_the_system_was_known_to_be_rich_in_minerals_especially_plentiful_in_diamonds_and_other_precious_gems_however_the_only_way_to_access_the_area_was_to_navigate_through_the_extensive_asteroid_fields_that_had_made_up_the_system_thrale_was_able_to_do_just_that_successfully_surveying_the_area_which_he_named_after_himself_unfortunately_he_would_later_die_on_a_return_trip_through_the_system_when_his_ship_lost_engine_power_and_drifted_into_a_nearby_asteroid_killing_all_on_board.message):Named for the famed Progenitor explorer Johan Thrale, the system was known to be rich in minerals, especially plentiful in diamonds and other precious gems. However, the only way to access the area was to navigate through the extensive asteroid fields that had made up the system. Thrale was able to do just that, successfully surveying the area, which he named after himself. Unfortunately, he would later die on a return trip through the system when his ship lost engine power and drifted into a nearby asteroid, killing all on board.'
        },
        {
            name: 'Taigos',
            description: '!LOC(galactic_war:taigos_was_home_to_a_handful_of_pirate_colonies_during_the_height_of_progenitor_coalition_expansion_using_captured_commercial_distress_beacons_the_red_talon_pirates_were_able_to_lure_many_an_unsuspecting_trade_and_transport_ship_to_the_system_where_they_would_be_stripped_of_anything_valuable_and_its_crews_and_passengers_forced_into_slavery_the_pirates_luck_ran_out_when_their_distress_beacon_got_the_attention_of_a_progenitor_military_convoy_passing_near_the_system_it_would_take_progenitor_marines_over_a_year_to_clear_the_system_freeing_over_20_000_citizens_who_had_spent_years_as_red_talon_pirate_slaves.message):Taigos was home to a handful of "pirate colonies" during the height of Progenitor Coalition expansion. Using captured commercial distress beacons, the Red Talon Pirates were able to lure many an unsuspecting trade and transport ship to the system where they would be stripped of anything valuable and its crews and passengers forced into slavery. The pirates luck ran out when their distress beacon got the attention of a Progenitor military convoy passing near the system. It would take Progenitor Marines over a year to clear the system; freeing over 20,000 citizens who had spent years as Red Talon Pirate slaves.'
        },
        {
            name: 'Gairdin',
            description: '!LOC(galactic_war:the_gairdin_system_was_most_famous_for_a_scientific_discovery_made_there_researchers_from_hawking_university_first_discovered_the_maisha_plant_in_gairdin_a_plant_that_when_properly_processed_had_the_ability_to_rid_the_human_body_of_nearly_ninety_five_percent_of_all_known_cancers_the_system_was_promptly_designated_a_sanctuary_system_by_progenitor_coalition_government_and_parantua_pharmaceuticals_given_exclusive_rights_to_research_and_development.message):The Gairdin system was most famous for a scientific discovery made there. Researchers from Hawking University first discovered the Maisha plant in Gairdin, a plant that when properly processed had the ability to rid the human body of nearly ninety-five percent of all known cancers. The system was promptly designated a "sanctuary system" by Progenitor Coalition government and Parantua Pharmaceuticals given exclusive rights to research and development.'
        },
        {
            name: 'Hades Playground',
            description: '!LOC(galactic_war:the_system_hades_playground_was_known_only_as_the_home_to_a_handful_of_terradine_corporation_mining_platforms_before_the_century_war_the_system_traded_hands_several_times_during_the_conflict_with_the_progenitor_coalition_eventually_emerging_victorious.message):The system Hades Playground was known only as the home to a handful of Terradine Corporation mining platforms before the Century War. The system traded hands several times during the conflict, with the Progenitor Coalition eventually emerging victorious.'
        },
        {
            name: 'Seven Gates',
            description: '!LOC(galactic_war:seven_gates_was_one_of_the_most_heavily_guarded_systems_in_all_of_progenitor_coalition_space_home_to_the_nest_project_it_was_here_that_coalition_military_science_developed_and_deployed_the_first_nest_a_machine_liberation_army_mla_attack_on_the_system_was_thwarted_by_the_weapon_and_the_war_took_a_dramatic_turn_in_the_process_with_the_nest_the_progenitor_coalition_finally_had_the_weapon_it_needed_to_halt_the_mla_advance_and_seize_the_initiative.message):Seven Gates was one of the most heavily guarded systems in all of Progenitor Coalition space. Home to the NEST Project, it was here that Coalition Military Science developed and deployed the first NEST. A Machine Liberation Army (MLA) attack on the system was thwarted by the weapon, and the war took a dramatic turn in the process. With the NEST, the Progenitor Coalition finally had the weapon it needed to halt the MLA advance and seize the initiative.'
        },
        {
            name: 'Almata',
            description: "!LOC(galactic_war:rich_in_mineral_resources_almata_became_a_highly_contested_battleground_during_the_century_war_progenitor_coalition_forces_were_quick_to_construct_several_orbital_weapon_platforms_throughout_the_system_to_thwart_the_xziphid_hegemony_s_ability_to_land_troops_within_the_system_after_several_attempts_and_at_a_high_cost_in_lives_and_materials_the_xziphid_eventually_captured_the_system_unfortunately_for_them_commander_dominus_arrived_three_months_later_and_took_the_system_back_for_the_progenitors.message):Rich in mineral resources, Almata became a highly contested battleground during the Century War. Progenitor Coalition forces were quick to construct several orbital weapon platforms throughout the system to thwart the Xziphid Hegemony\'s ability to land troops within the system. After several attempts, and at a high cost in lives and materials, the Xziphid eventually captured the system. Unfortunately for them, Commander Dominus arrived three months later and took the system back for the Progenitors."
        },
        {
            name: 'Borland-Kas',
            description: '!LOC(galactic_war:first_surveyed_by_progenitor_explorer_malcolm_borland_the_system_was_promptly_misplaced_by_the_coalition_department_of_navigation_cdn_soon_after_its_discovery_it_was_not_until_many_years_later_when_captain_katherine_kas_of_the_free_trade_vessel_kestrel_stumbled_upon_it_in_a_trade_venture_to_daktor_that_the_system_was_established_captain_kas_was_amazed_by_the_myriad_of_wondrous_sights_to_be_found_throughout_the_system_securing_a_series_of_loans_kas_was_able_to_finance_the_construction_of_an_extensive_resort_she_named_paradise_in_only_a_few_short_years_kas_had_amassed_a_fortune_catering_to_the_wealthy_elite_who_gladly_paid_hefty_fees_to_vacation_in_paradise.message):First surveyed by Progenitor explorer Malcolm Borland, the system was promptly "misplaced" by the Coalition Department of Navigation (CDN) soon after its discovery. It was not until many years later when Captain Katherine Kas of the free trade vessel Kestrel stumbled upon it in a trade venture to Daktor that the system was established. Captain Kas was amazed by the "myriad of wondrous sights to be found throughout the system". Securing a series of loans, Kas was able to finance the construction of an extensive resort she named Paradise. In only a few short years, Kas had amassed a fortune, catering to the wealthy elite who gladly paid hefty fees to vacation in Paradise.'
        },
        {
            name: 'Freeland',
            description: '!LOC(galactic_war:freeland_occupied_progenitor_coalition_territory_and_was_once_home_to_the_vicious_kylmabeast_machine_liberation_army_forces_under_commander_darius_swept_through_the_system_in_the_early_years_of_the_pro_com_war_eradicating_all_biological_life_including_the_kylmabeast.message):Freeland occupied Progenitor Coalition territory and was once home to the vicious Kylmabeast. Machine Liberation Army forces under Commander Darius swept through the system in the early years of the Pro-Com War, eradicating all biological life, including the Kylmabeast.'
        },
        {
            name: 'Omicron Herculis',
            description: '!LOC(galactic_war:after_their_first_victory_over_the_machine_liberation_army_mla_forces_at_seven_gates_the_progenitor_coalition_went_on_the_offensive_progenitor_high_command_selected_the_system_omicron_herculis_and_its_valuable_resources_as_its_first_target_with_a_fleet_of_transports_carrying_over_a_million_progenitor_soldiers_and_escorted_by_a_nest_they_successfully_breached_the_system_and_established_a_base_of_operations_the_nest_made_short_work_of_the_mla_commanders_in_the_system_while_progenitor_marines_mopped_up_the_remaining_enemy_forces.message):After their first victory over the Machine Liberation Army (MLA) forces at Seven Gates, the Progenitor Coalition went on the offensive. Progenitor High Command selected the system Omicron Herculis and its valuable resources as its first target. With a fleet of transports carrying over a million Progenitor soldiers and escorted by a NEST, they successfully breached the system and established a base of operations. The NEST made short work of the MLA Commanders in the system, while Progenitor Marines mopped up the remaining enemy forces.'
        },
        {
            name: 'Kappa Geminorum',
            description: "!LOC(galactic_war:kappa_geminorum_system_was_the_home_of_wealthy_industrialist_and_creator_of_the_synthvictuals_module_yi_xing_purchasing_the_system_for_an_undisclosed_amount_of_money_from_the_progenitor_coalition_government_xing_used_his_vast_wealth_to_essentially_create_his_own_freehold_the_system_remained_closed_to_all_but_xing_s_family_and_closest_friends_and_business_associates_it_was_not_until_the_pro_com_war_that_xing_offered_his_resources_towards_the_defeat_of_the_machine_liberation_army_mla_his_inventions_including_a_superior_model_of_his_famous_synthvictuals_module_helped_to_halt_the_mla_advance.message):Kappa Geminorum system was the home of wealthy industrialist and creator of the SynthVictuals Module, Yi Xing. Purchasing the system for an undisclosed amount of money from the Progenitor Coalition government, Xing used his vast wealth to essentially create his own freehold. The system remained closed to all but Xing\'s family and closest friends and business associates. It was not until the Pro-Com War that Xing offered his resources towards the defeat of the Machine Liberation Army (MLA). His inventions, including a superior model of his famous SynthVictuals Module, helped to halt the MLA advance."
        },
        {
            name: 'Vanguard ',
            description: '!LOC(galactic_war:with_over_sixteen_billion_people_this_system_was_one_of_the_more_populous_in_progenitor_coalition_space_before_the_outset_of_the_century_war_it_was_famous_for_producing_football_teams_that_competed_for_the_galactic_cup_year_after_year_four_years_into_the_war_the_xziphid_hegemony_invaded_the_system_and_killed_or_enslaved_over_eighty_percent_of_the_population_team_members_of_the_breslau_city_bearcats_football_club_formed_an_underground_resistance_against_the_xziphid_they_fought_for_over_seven_years_until_the_system_was_liberated_by_progenitor_forces_led_by_commander_rohl.message):With over sixteen billion people, this system was one of the more populous in Progenitor Coalition space before the outset of the Century War. It was famous for producing football teams that competed for the Galactic Cup year after year. Four years into the war, the Xziphid Hegemony invaded the system and killed or enslaved over eighty percent of the population. Team members of the Breslau City Bearcats football club formed an underground resistance against the Xziphid. They fought for over seven years until the system was liberated by Progenitor forces led by Commander Rohl. '
        },
        {
            name: 'Gamma Hydra',
            description: '!LOC(galactic_war:gamma_hydra_was_considered_one_of_the_jewels_of_the_progenitor_coalition_when_it_fell_to_xziphid_hegemony_forces_many_throughout_the_progenitor_coalition_considered_it_the_beginning_of_the_end_for_humanity_that_is_why_progenitor_high_command_considered_it_key_to_morale_for_gamma_hydra_to_be_liberated_sirrom_the_first_commander_to_come_out_of_epiphany_was_chosen_to_undertake_the_liberation_of_gamma_hydra_sirrom_was_able_to_single_handedly_enter_the_system_undetected_construct_a_base_and_begin_producing_machines_of_war_to_take_the_fight_to_the_xziphid_in_less_than_six_months_a_single_commander_had_done_what_millions_of_humans_could_not_gamma_hydra_would_be_the_turning_point_of_the_war_and_the_history_of_the_galaxy.message):Gamma Hydra was considered one of the "jewels" of the Progenitor Coalition. When it fell to Xziphid Hegemony forces, many throughout the Progenitor Coalition considered it the beginning of the end for humanity. That is why Progenitor High Command considered it key to morale for Gamma Hydra to be liberated. Sirrom, the first Commander to come out of Epiphany, was chosen to undertake the liberation of Gamma Hydra. Sirrom was able to single-handedly enter the system undetected, construct a base, and begin producing machines of war to take the fight to the Xziphid. In less than six months, a single Commander had done what millions of humans could not. Gamma Hydra would be the turning point of the war, and the history of the galaxy.'
        },
        {
            name: 'Rho Persei',
            description: '!LOC(galactic_war:rho_persei_was_witness_to_some_of_the_heaviest_fighting_of_the_pro_com_war_most_of_the_battles_across_the_system_were_fought_using_small_fighters_and_bombers_in_the_end_progenitor_coalition_forces_simply_could_not_keep_up_with_the_rate_at_which_the_machine_liberation_army_mla_was_producing_weapons_progenitor_forces_eventually_retreated_conceding_the_system_to_the_mla.message):Rho Persei was witness to some of the heaviest fighting of the Pro-Com War. Most of the battles across the system were fought using small fighters and bombers. In the end, Progenitor Coalition forces simply could not keep up with the rate at which the Machine Liberation Army (MLA) was producing weapons. Progenitor forces eventually retreated, conceding the system to the MLA.'
        },
        {
            name: 'Daktor',
            description: '!LOC(galactic_war:the_daktor_system_was_most_notably_known_as_the_headquarters_for_the_panoply_armaments_group_from_its_offices_panoply_oversaw_the_day_to_day_operations_of_its_factories_scattered_across_the_system_as_the_main_weapons_supplier_for_the_coalition_military_forces_the_company_grew_at_an_exponential_rate_at_the_outset_of_the_century_war_the_progenitor_coalition_made_it_top_priority_to_protect_the_system_at_all_costs_it_was_not_until_the_pro_com_war_that_it_would_fall_one_of_the_last_remaining_systems_to_hold_out_against_the_machine_liberation_army.message):The Daktor system was most notably known as the headquarters for the Panoply Armaments Group. From its offices, Panoply oversaw the day to day operations of its factories scattered across the system. As the main weapons supplier for the Coalition Military Forces, the company grew at an exponential rate. At the outset of the Century War, the Progenitor Coalition made it top priority to protect the system at all costs. It was not until the Pro-Com War that it would fall; one of the last remaining systems to hold out against the Machine Liberation Army.'
        },
        {
            name: "Corgan\'s Well",
            description: "!LOC(galactic_war:one_of_the_more_unique_systems_to_be_found_in_the_galaxy_corgan_s_well_reached_mythic_proportions_among_progenitor_coalition_citizenry_named_after_stella_corgan_the_first_human_to_ever_set_foot_or_rather_crash_in_the_system_it_was_she_who_first_discovered_the_rejuvenating_properties_of_the_water_found_there_marooned_for_over_forty_years_surveyors_were_astounded_to_find_her_and_not_looking_a_day_over_thirty_as_it_turned_out_she_was_actually_seventy_two_years_of_age_the_progenitor_coalition_government_moved_quickly_to_quarantine_the_system_placing_a_sanctuary_label_on_it_parantua_pharmaceuticals_was_granted_research_rights_but_limited_to_only_removing_one_hundred_gallons_per_year_from_the_area_trademarked_simply_as_youth_the_liquid_could_add_up_to_fifty_years_on_a_human_s_life_due_to_its_rarity_a_single_bottle_of_the_water_was_considered_the_most_expensive_item_in_the_known_galaxy_yi_xing_inventor_of_the_synthvictuals_module_was_rumored_to_have_bought_two.message):One of the more unique systems to be found in the galaxy, Corgan\'s Well, reached mythic proportions among Progenitor Coalition citizenry. Named after Stella Corgan, the first human to ever set foot, or rather crash in the system, it was she who first discovered the rejuvenating properties of the water found there. Marooned for over forty years, surveyors were astounded to find her- and not looking a day over thirty. As it turned out, she was actually seventy-two years of age. The Progenitor Coalition government moved quickly to quarantine the system, placing a sanctuary label on it. Parantua Pharmaceuticals was granted research rights, but limited to only removing one hundred gallons per year from the area. Trademarked simply as 'Youth' the liquid could add up to fifty years on a human\'s life. Due to its rarity, a single bottle of the water was considered the most expensive item in the known galaxy. Yi Xing, inventor of the SynthVictuals Module, was rumored to have bought two."
        },
        {
            name: 'Delta Bootis',
            description: '!LOC(galactic_war:once_famous_for_its_diverse_flora_and_fauna_the_system_became_a_popular_destination_for_progenitor_sightseers_and_big_game_hunters_alike_it_was_not_until_horace_lefty_mcgregor_decided_he_had_had_enough_trying_to_track_the_elusive_mitjanit_cat_and_used_a_low_yield_tactical_nuke_to_level_the_playing_field_that_progenitor_coalition_authorities_stepped_in_and_made_the_entire_system_a_wildlife_preserve_where_hunting_was_illegal.message):Once famous for its diverse flora and fauna, the system became a popular destination for Progenitor sightseers and big game hunters alike. It was not until Horace "Lefty" McGregor decided he had had enough trying to track the elusive Mitjanit Cat and used a low yield tactical nuke to "level the playing field", that Progenitor Coalition authorities stepped in and made the entire system a wildlife preserve where hunting was illegal. '
        },
        {
            name: 'Section 17',
            description: '!LOC(galactic_war:the_most_heavily_guarded_system_of_the_progenitor_coalition_section_17_is_where_the_majority_of_top_secret_progenitor_coalition_projects_were_developed_the_system_kept_so_secret_that_only_a_handful_of_people_knew_of_its_exact_location_it_remained_a_secret_all_through_the_century_war_as_well_as_the_pro_com_war_it_is_rumored_that_it_was_the_last_system_to_be_abandoned_by_the_progenitor_coalition_during_their_operation_kadota.message):The most heavily guarded system of the Progenitor Coalition, Section 17 is where the majority of top secret Progenitor Coalition projects were developed. The system kept so secret that only a handful of people knew of its exact location. It remained a secret all through the Century War, as well as The Pro-Com War. It is rumored that it was the last system to be abandoned by the Progenitor Coalition during their Operation Kadota.'
        },
        {
            name: 'Tyson',
            description: '!LOC(galactic_war:those_on_earth_knew_the_tyson_system_as_the_silicon_valley_to_the_rest_of_the_progenitor_coalition_tyson_was_the_center_of_computer_hardware_and_software_manufacturing_in_the_galaxy_spread_across_system_several_corporations_ran_de_facto_nations_complete_with_cities_and_most_importantly_factories_at_its_high_point_the_industry_had_employed_well_over_a_billion_people_most_of_them_in_the_tyson_system.message):Those on Earth knew the Tyson system as the "Silicon Valley". To the rest of the Progenitor Coalition, Tyson was the center of computer hardware and software manufacturing in the galaxy. Spread across system, several corporations ran de facto "nations", complete with cities, and most importantly, factories. At its high point, the industry had employed well over a billion people, most of them in the Tyson System.'
        },
        {
            name: 'Baridi',
            description: '!LOC(galactic_war:the_baridi_system_was_best_known_for_the_phenomena_that_progenitor_scientists_called_ice_specters_numerous_comets_made_their_way_through_the_system_leaving_in_their_wake_a_trail_of_ice_vapor_that_as_one_transport_captain_described_looked_like_ghostly_apparitions_dancing_among_the_stars.message):The Baridi System was best known for the phenomena that Progenitor scientists called "ice specters". Numerous comets made their way through the system, leaving in their wake a trail of ice vapor that, as one transport captain described "looked like ghostly apparitions dancing among the stars".'
        },
        {
            name: "Heaven\'s Doorway",
            description: "!LOC(galactic_war:this_system_was_the_scene_of_one_of_the_largest_space_battles_of_the_century_war_being_bulky_and_difficult_to_maintain_phase_engines_were_relegated_to_ships_deemed_crucial_by_both_the_progenitor_coalition_and_the_xziphid_hegemony_this_meant_mostly_merchant_and_explorer_vessels_were_outfitted_with_phase_engines_with_military_vessels_relegated_to_system_patrol_this_however_did_not_stop_either_side_from_arming_their_merchant_fleets_the_xziphid_did_just_that_and_hit_heaven_s_doorway_with_over_forty_converted_merchant_and_explorer_vessels_along_with_three_hive_carriers_the_progenitor_coalition_had_anticipated_the_move_and_waited_with_over_one_hundred_vessels_of_their_own_including_ten_battle_cruisers_constructed_at_shipyards_in_the_system_when_the_battle_was_over_all_of_the_xziphid_ships_were_burning_wrecks_the_progenitors_loss_was_much_less_losing_only_fifteen_ships_including_two_battle_cruisers.message):This system was the scene of one of the largest space battles of the Century War. Being bulky and difficult to maintain, phase engines were relegated to ships deemed crucial by both the Progenitor Coalition and the Xziphid Hegemony. This meant mostly merchant and explorer vessels were outfitted with phase engines, with military vessels relegated to system patrol. This however did not stop either side from arming their merchant fleets. The Xziphid did just that and hit Heaven\'s Doorway with over forty converted merchant and explorer vessels, along with three Hive carriers. The Progenitor Coalition had anticipated the move and waited with over one hundred vessels of their own, including ten battle cruisers constructed at shipyards in the system. When the battle was over, all of the Xziphid ships were burning wrecks. The Progenitors loss was much less, losing only fifteen ships, including two battle cruisers. "
        },
        {
            name: 'The Haystacks',
            description: '!LOC(galactic_war:jonathan_blair_a_former_cfo_for_geoponinc_purchased_this_system_from_the_progenitor_coalition_government_for_the_growing_of_specialty_crops_when_he_was_done_blair_had_constructed_over_five_thousand_greenhouse_domes_across_the_system_in_just_ten_years_blair_was_able_to_corner_the_galactic_market_in_exotic_spices_making_blackrock_agricultural_co_the_most_profitable_privately_owned_company_in_the_progenitor_coalition.message):Jonathan Blair, a former CFO for GeoponInc, purchased this system from the Progenitor Coalition government for the growing of specialty crops. When he was done, Blair had constructed over five thousand greenhouse domes across the system. In just ten years, Blair was able to corner the galactic market in exotic spices making Blackrock Agricultural Co the most profitable privately owned company in the Progenitor Coalition.'
        },
        {
            name: 'Beta Draconis',
            description: '!LOC(galactic_war:the_system_beta_draconis_gained_fame_among_the_progenitors_after_an_internal_terradine_corp_report_was_leaked_to_the_public_stating_a_survey_of_the_system_identified_it_as_having_the_most_brilliant_rubies_ever_seen_this_created_the_infamous_ruby_rush_of_hundreds_of_thousands_of_private_citizens_who_wanted_to_cash_in_before_the_system_was_declared_a_sanctuary_by_the_government_the_system_became_notorious_for_claim_jumping_and_sporadic_acts_of_violence_until_terradine_corp_moved_in_and_bought_out_the_claim_of_everyone_interested_in_the_system_using_force_when_necessary.message):The system Beta Draconis gained fame among the Progenitors after an internal Terradine Corp report was leaked to the public stating a survey of the system identified it as having "the most brilliant rubies ever seen". This created the infamous "Ruby Rush" of hundreds of thousands of private citizens who wanted to cash in before the system was declared a sanctuary by the government. The system became notorious for claim jumping and sporadic acts of violence until Terradine Corp moved in and bought out the claim of everyone interested in the system, using force when necessary.'
        },
        {
            name: 'Epsilon Persei',
            description: '!LOC(galactic_war:_where_criminals_go_to_die_was_a_common_phrase_uttered_by_all_progenitor_coalition_citizens_epsilon_persei_was_the_home_of_the_progenitor_coalition_maximum_security_prison_for_the_worst_of_the_worst_when_a_prisoner_was_sentenced_they_were_transported_to_sentinel_station_placed_in_a_life_capsule_and_jettisoned_out_in_his_book_escape_from_epsilon_persei_the_bounty_hunter_known_as_viper_detailed_his_harrowing_adventures_in_the_system_to_rescue_a_member_of_the_general_assembly_whose_ship_had_crashed_there.message):"Where criminals go to die" was a common phrase uttered by all Progenitor Coalition citizens. Epsilon Persei was the home of the Progenitor Coalition maximum security prison for the worst of the worst. When a prisoner was sentenced, they were transported to Sentinel Station, placed in a life capsule and jettisoned out. In his book, Escape from Epsilon Persei, the bounty hunter known as Viper detailed his harrowing adventures in the system to rescue a member of the General Assembly whose ship had crashed there.'
        },
        {
            name: 'The Junkyard',
            description: '!LOC(galactic_war:this_system_was_the_home_to_the_largest_depository_of_derelict_ships_and_other_debris_in_all_the_progenitor_coalition_scattered_throughout_the_junkyard_one_could_find_virtually_any_kind_of_item_big_or_small_the_system_with_all_of_its_hidden_crags_and_crevices_became_a_favorite_meeting_spot_for_nefarious_individuals_including_secret_corporate_dealings.message):This system was the home to the largest depository of derelict ships and other debris in all the Progenitor Coalition. Scattered throughout The Junkyard, one could find virtually any kind of item, big or small. The system, with all of its hidden crags and crevices, became a favorite meeting spot for nefarious individuals, including secret corporate dealings.'
        },
        {
            name: 'Horizon',
            description: '!LOC(galactic_war:horizon_was_one_of_the_first_progenitor_systems_to_fall_to_both_xziphid_hegemony_and_machine_liberation_army_mla_forces_in_both_the_century_war_and_the_pro_com_war_both_times_the_invaders_found_taking_the_system_to_not_be_an_easy_task_settlers_of_the_region_prided_themselves_at_being_self_sufficient_and_tough_seeing_how_hard_a_fight_was_ahead_of_them_both_the_xziphid_and_the_mla_chose_to_saturate_the_system_with_nukes_and_move_on.message):Horizon was one of the first Progenitor systems to fall to both Xziphid Hegemony and Machine Liberation Army (MLA) forces in both the Century War and the Pro-Com War. Both times, the invaders found taking the system to not be an easy task. Settlers of the region prided themselves at being self sufficient and tough. Seeing how hard a fight was ahead of them, both the Xziphid and the MLA chose to saturate the system with nukes and move on.'
        },
        {
            name: 'Icarus',
            description: '!LOC(galactic_war:leased_by_the_heliacal_corporation_the_system_was_the_home_of_the_largest_solar_power_collection_array_in_all_the_progenitor_coalition_the_energy_gathered_was_stored_and_shipped_to_all_corners_of_the_progenitor_coalition_progenitor_marines_fought_nearly_to_the_last_defending_the_system_from_the_xziphid_hegemony_only_to_be_relieved_by_commander_subotai_who_proceeded_to_drive_out_the_xziphid_forces.message):Leased by the Heliacal Corporation, the system was the home of the largest solar power collection array in all the Progenitor Coalition. The energy gathered was stored and shipped to all corners of the Progenitor Coalition. Progenitor Marines fought nearly to the last defending the system from the Xziphid Hegemony, only to be relieved by Commander Subotai who proceeded to drive out the Xziphid forces. '
        },
        {
            name: 'Lambda Geminorum',
            description: '!LOC(galactic_war:lambda_geminorum_held_little_interest_to_the_progenitor_coalition_until_the_century_war_lambda_geminorum_would_become_immortalized_as_the_site_of_the_largest_tank_battle_since_kursk_over_17_000_xziphid_hegemony_scarabs_squared_off_against_just_over_12_000_battle_tanks_despite_the_numbers_involved_the_battle_was_over_in_just_twenty_three_minutes_against_the_superior_tactics_of_commander_zhukov_the_xziphid_were_soundly_defeated.message):Lambda Geminorum held little interest to the Progenitor Coalition until the Century War. Lambda Geminorum would become immortalized as the site of the "largest tank battle since Kursk". Over 17,000 Xziphid Hegemony Scarabs squared off against just over 12,000 Battle Tanks. Despite the numbers involved, the battle was over in just twenty-three minutes. Against the superior tactics of Commander Zhukov, the Xziphid were soundly defeated.'
        },
        {
            name: 'The Badlands',
            description: '!LOC(galactic_war:resembling_closer_to_the_ancient_wild_west_of_19th_century_america_than_anything_the_badlands_were_one_of_the_few_systems_that_was_never_captured_by_the_xziphid_hegemony_guerilla_warfare_pirate_attacks_and_sabotage_on_a_massive_scale_were_enough_of_an_incentive_to_the_xziphid_to_withdraw_even_after_the_war_was_over_it_took_progenitor_coalition_diplomats_three_years_to_negotiate_with_the_system_to_rejoin_the_progenitor_coalition.message):Resembling closer to the ancient Wild West of 19th century America than anything, the Badlands were one of the few systems that was never captured by the Xziphid Hegemony. Guerilla warfare, pirate attacks and sabotage on a massive scale were enough of an incentive to the Xziphid to withdraw. Even after the war was over it took Progenitor Coalition diplomats three years to negotiate with the system to rejoin the Progenitor Coalition.'
        },
        {
            name: 'Myr',
            description: '!LOC(galactic_war:after_a_hundred_years_of_warfare_the_only_thing_on_the_minds_of_citizens_of_the_progenitor_coalition_was_a_lasting_peace_the_general_assembly_agreed_and_the_myr_project_was_born_contracting_explorer_ships_from_lusk_exploration_company_the_progenitor_coalition_government_commissioned_a_search_for_a_suitable_system_to_turn_into_the_ultimate_destination_for_rest_and_relaxation_for_civilian_and_military_alike_the_result_was_myr_a_system_where_any_type_of_leisure_activity_that_one_could_think_of_could_be_experienced_in_the_system.message):After a hundred years of warfare, the only thing on the minds of citizens of the Progenitor Coalition was a lasting peace. The General Assembly agreed, and the Myr Project was born. Contracting explorer ships from Lusk Exploration Company, the Progenitor Coalition government commissioned a search for a suitable system to turn into the ultimate destination for rest and relaxation for civilian and military alike. The result was Myr, a system where any type of leisure activity that one could think of could be experienced in the system.  '
        },
        {
            name: 'Chi Leonis',
            description: "!LOC(galactic_war:in_the_progenitor_coalition_criminal_justice_system_when_one_s_crimes_were_not_deemed_heinous_enough_to_warrant_a_sentence_to_exile_in_epsilon_persei_a_convicted_criminal_was_sent_to_the_prison_system_of_chi_leonis_prisoners_would_serve_their_time_mining_iron_a_hard_life_to_be_sure_nearly_thirty_percent_of_those_sent_to_chi_leonis_would_die_there.message):In the Progenitor Coalition criminal justice system, when one\'s crimes were not deemed heinous enough to warrant a sentence to exile in Epsilon Persei, a convicted criminal was sent to the prison system of Chi Leonis. Prisoners would serve their time mining iron. A hard life to be sure- nearly thirty percent of those sent to Chi Leonis would die there."
        },
        {
            name: 'Slynovia',
            description: '!LOC(galactic_war:host_for_the_progenitor_coalition_23rd_grand_galactic_games_slynovia_became_famous_for_producing_the_most_expensive_games_ever_held_not_having_suitable_mountains_for_alpine_events_governor_anksari_commissioned_the_coalition_corp_of_engineers_to_make_mountains_that_could_be_used_to_attract_the_games_using_advanced_tectonic_manipulation_engineers_were_successful_in_raising_a_fifty_mile_range_of_mountains_its_highest_peak_reaching_20_000ft_the_games_committee_was_so_impressed_at_the_lengths_slynovia_was_willing_to_go_to_attract_the_games_they_awarded_them_with_the_23rd_grand_galactic_games_unfortunately_the_profits_made_from_the_games_would_not_even_cover_five_percent_of_the_costs_for_hosting_governor_anksari_found_himself_voted_out_of_office_the_following_year_along_with_facing_multiple_lawsuits_in_civil_court.message):Host for the Progenitor Coalition 23rd Grand Galactic Games, Slynovia became famous for producing the most expensive games ever held. Not having suitable mountains for alpine events, Governor Anksari commissioned the Coalition Corp of Engineers to "make" mountains that could be used to attract the games. Using advanced tectonic manipulation, engineers were successful in raising a fifty mile range of mountains, its highest peak reaching 20,000ft. The Games Committee was so impressed at the lengths Slynovia was willing to go to attract the games they awarded them with the 23rd Grand Galactic Games. Unfortunately, the profits made from the games would not even cover five percent of the costs for hosting. Governor Anksari found himself voted out of office the following year, along with facing multiple lawsuits in civil court.'
        },
        {
            name: 'Agint',
            description: '!LOC(galactic_war:the_agint_system_was_a_favorite_site_for_progenitor_pirates_to_stash_their_ill_gotten_goods_the_system_became_so_full_of_pirate_booty_it_became_known_as_the_treasure_system_one_pirate_in_particular_seamus_mckraven_decided_he_wanted_the_system_and_all_its_riches_to_himself_he_proceeded_to_construct_several_weapons_platforms_and_dared_anyone_to_try_and_take_it_from_him_the_machine_liberation_army_mla_did_just_that_early_in_the_pro_com_war_deeming_agint_of_high_strategic_value_mckraven_decided_to_go_out_in_a_blaze_of_glory_taking_several_mla_commanders_with_him_when_he_simultaneously_detonated_twenty_nukes_on_the_platform_he_happened_to_be_on_when_the_attack_came.message):The Agint system was a favorite site for Progenitor pirates to stash their ill gotten goods. The system became so full of pirate booty it became known as the "Treasure System". One pirate in particular, Seamus McKraven, decided he wanted the system and all its riches to himself. He proceeded to construct several weapons platforms and dared anyone to try and take it from him. The Machine Liberation Army (MLA) did just that early in the Pro-Com War, deeming Agint of high strategic value. McKraven decided to go out in a blaze of glory, taking several MLA Commanders with him when he simultaneously detonated twenty nukes on the platform he happened to be on when the attack came.'
        },
        {
            name: 'Diamant',
            description: '!LOC(galactic_war:the_center_for_all_diamond_trade_in_the_progenitor_coalition_this_system_was_also_one_of_the_wealthiest_in_the_coalition_with_diamonds_being_a_vital_component_to_phase_drives_the_demand_for_the_rare_stones_only_increased_synthetic_diamonds_would_not_perform_at_near_the_capacity_that_naturally_occurring_diamonds_would_in_the_drives_when_surveyors_discovered_the_amount_of_diamonds_the_system_held_the_government_was_quick_to_step_in_and_declare_diamant_a_sanctuary_system_making_it_illegal_for_any_resource_removal_or_alteration_without_strict_government_oversight.message):The center for all diamond trade in the Progenitor Coalition, this system was also one of the wealthiest in the Coalition. With diamonds being a vital component to phase drives, the demand for the rare stones only increased. Synthetic diamonds would not perform at near the capacity that naturally occurring diamonds would in the drives. When surveyors discovered the amount of diamonds the system held, the government was quick to step in and declare Diamant a "sanctuary system", making it illegal for any resource removal or alteration without strict government oversight.'
        },
        {
            name: 'Smarald',
            description: '!LOC(galactic_war:when_a_survey_team_from_the_lusk_exploration_company_explored_the_system_of_smarald_they_were_both_shocked_and_elated_to_discover_it_contained_the_largest_emeralds_they_had_ever_seen_before_they_could_exploit_the_riches_however_the_progenitor_coalition_government_stepped_in_and_declared_it_a_sanctuary_system_making_it_illegal_for_any_resource_removal_or_alteration_without_strict_government_oversight.message):When a survey team from the Lusk Exploration Company explored the system of Smarald, they were both shocked and elated to discover it contained the largest emeralds they had ever seen.  Before they could exploit the riches however, the Progenitor Coalition government stepped in and declared it a "sanctuary system", making it illegal for any resource removal or alteration without strict government oversight.'
        },
        {
            name: 'Blumoto',
            description: "!LOC(galactic_war:rich_in_methane_gas_the_blumoto_system_was_home_to_several_clandestine_drilling_and_atmospheric_extraction_operations_run_by_some_of_the_progenitor_coalition_s_most_notorious_crime_syndicates_methane_was_a_key_component_to_the_illegal_narcotic_called_zip_a_drug_popular_among_merchant_vessel_crews_who_worked_long_hours_zip_could_keep_a_person_up_and_functioning_at_peak_efficiency_for_up_to_72_hours_with_no_immediate_side_effects_the_problems_came_later_in_life_when_people_began_dropping_dead_from_a_plethora_of_medical_ailments_ranging_from_massive_strokes_to_cancer_of_the_brain.message):Rich in methane gas, the Blumoto system was home to several clandestine drilling and atmospheric extraction operations run by some of the Progenitor Coalition\'s most notorious crime syndicates. Methane was a key component to the illegal narcotic called Zip; a drug popular among merchant vessel crews who worked long hours. Zip could keep a person up and functioning at peak efficiency for up to 72 hours, with no immediate side effects. The problems came later in life when people began dropping dead from a plethora of medical ailments ranging from massive strokes to cancer of the brain."
        },
        {
            name: 'Hatuamoto',
            description: '!LOC(galactic_war:hatuamoto_was_occupied_by_the_machine_liberation_army_early_in_the_pro_com_war_in_an_attempt_to_halt_their_advance_progenitor_high_command_developed_operation_hurricane_using_a_fleet_of_some_seventy_humpback_merchant_vessels_refitted_for_combat_operations_over_one_million_marines_and_seventy_five_loyalist_commanders_the_flotilla_would_churn_through_the_hatuamoto_system_like_a_hurricane_striking_each_occupied_area_quickly_and_then_moving_on_to_the_next_the_strategy_was_such_a_success.message):Hatuamoto was occupied by the Machine Liberation Army early in the Pro-Com War. In an attempt to halt their advance, Progenitor High Command developed Operation Hurricane. Using a fleet of some seventy Humpback merchant vessels refitted for combat operations, over one million Marines, and seventy-five Loyalist Commanders, the flotilla would churn through the Hatuamoto system like a hurricane, striking each occupied area quickly, and then moving on to the next. The strategy was such a success.'
        },
        {
            name: 'Rubin',
            description: '!LOC(galactic_war:with_the_success_of_operation_hurricane_in_the_hatuamoto_system_the_progenitor_high_command_next_targeted_the_rubin_system_for_liberation_from_machine_liberation_army_mla_occupation_as_well_as_gaining_back_control_of_its_ruby_mining_operations_that_were_deemed_vital_to_the_war_effort_like_hatuamoto_before_it_the_mla_had_no_answer_against_the_progenitor_flotilla_and_the_system_was_quickly_liberated.message):With the success of Operation Hurricane in the Hatuamoto system, the Progenitor High Command next targeted the Rubin system for liberation from Machine Liberation Army (MLA) occupation, as well as gaining back control of its ruby mining operations that were deemed vital to the war effort. Like Hatuamoto before it, the MLA had no answer against the Progenitor flotilla and the system was quickly liberated.'
        },
        {
            name: 'Kuzimu',
            description: '!LOC(galactic_war:the_last_engagement_of_operation_hurricane_brought_near_disaster_to_the_progenitor_coalition_flotilla_having_learned_their_tactics_the_machine_liberation_army_mla_regrouped_in_kuzimu_and_waited_for_the_progenitor_flotilla_to_arrive_using_newly_constructed_orbital_weapon_platforms_positioned_throughout_the_system_the_mla_chipped_away_at_the_flotilla_launching_a_series_of_nuclear_missile_strikes_against_it_loyalist_commanders_attached_to_the_flotilla_saved_the_day_by_eventually_destroying_the_orbital_platforms_and_driving_the_mla_from_the_system_and_operation_hurricane_was_a_success.message):The last engagement of Operation Hurricane brought near disaster to the Progenitor Coalition flotilla. Having learned their tactics, the Machine Liberation Army (MLA) regrouped in Kuzimu and waited for the Progenitor flotilla to arrive. Using newly constructed orbital weapon platforms positioned throughout the system, the MLA chipped away at the flotilla launching a series of nuclear missile strikes against it. Loyalist Commanders attached to the flotilla saved the day by eventually destroying the orbital platforms and driving the MLA from the system and Operation Hurricane was a success.'
        },
        {
            name: 'Qiong',
            description: '!LOC(galactic_war:qiong_was_host_what_was_billed_as_the_greatest_scavenger_hunt_of_all_time_olympus_mons_food_conglomerate_created_a_contest_where_anyone_finding_a_golden_compass_in_a_box_of_their_cocoabran_cereal_would_be_invited_all_expenses_paid_to_the_system_there_they_would_compete_against_other_contest_winners_in_a_scavenger_hunt_spanning_qiong_with_the_grand_prize_being_a_million_coalition_credits_and_a_lifetime_supply_of_cocoabran_cereal_in_the_end_eleven_year_old_charlie_buket_from_earth_was_crowned_the_winner_beating_out_over_seven_thousand_other_contestants.message):Qiong was host what was billed as the "Greatest Scavenger Hunt of All Time". Olympus Mons Food Conglomerate created a contest where anyone finding a "golden compass" in a box of their CocoaBran cereal would be invited, all expenses paid, to the system. There they would compete against other contest winners in a scavenger hunt spanning Qiong, with the grand prize being a million Coalition credits and a lifetime supply of CocoaBran cereal. In the end, eleven year old Charlie Buket from Earth was crowned the winner, beating out over seven thousand other contestants.'
        },
        {
            name: 'Zapada',
            description: "!LOC(galactic_war:over_a_fifteen_month_span_forces_of_the_progenitor_coalition_fought_the_xziphid_hegemony_in_what_would_be_later_called_the_battle_of_seven_moons_during_the_century_war_at_the_time_seven_moons_were_orbiting_one_of_the_system_s_planets_where_progenitor_marines_found_them_occupied_by_the_xziphid_drawing_inspiration_from_an_ancient_earth_war_the_marines_used_a_tactic_called_moon_hopping_attacking_a_lightly_fortified_moon_while_bypassing_the_next_heavier_defended_one_using_this_tactic_they_were_able_to_isolate_the_xziphid_fortresses_and_eventually_take_them_out_many_years_later_that_same_planet_exploded_destroying_it_and_the_moons_in_the_process.message):Over a fifteen month span, forces of the Progenitor Coalition fought the Xziphid Hegemony in what would be later called the Battle of Seven Moons during the Century War. At the time, seven moons were orbiting one of the system\'s planets, where Progenitor Marines found them occupied by the Xziphid. Drawing inspiration from an ancient Earth war, the Marines used a tactic called moon hopping; attacking a lightly fortified moon while bypassing the next, heavier defended one. Using this tactic they were able to isolate the Xziphid fortresses and eventually take them out. Many years later that same planet exploded, destroying it and the moons in the process."
        },
        {
            name: 'Daoren',
            description: '!LOC(galactic_war:daoren_was_an_important_supply_depot_for_forces_on_the_move_many_battles_were_fought_in_the_system_during_both_the_century_and_the_pro_com_war_during_the_century_war_alone_daoren_changed_hands_over_fifteen_times.message):Daoren was an important supply depot for forces on the move. Many battles were fought in the system during both the Century and the Pro-Com War. During the Century War alone, Daoren changed hands over fifteen times.'
        },
        {
            name: 'Foc',
            description: "!LOC(galactic_war:foc_sat_smack_in_the_middle_of_the_hydra_expanse_a_favorite_hunting_ground_for_pirates_the_system_didn_t_see_much_in_the_way_of_attention_until_the_outset_of_the_century_war_when_pirates_attacked_a_xziphid_hegemony_hive_ship_entering_the_system_thinking_it_was_some_new_class_of_progenitor_coalition_merchant_vessel_needless_to_say_foc_never_had_trouble_with_pirates_again.message):Foc sat smack in the middle of the Hydra Expanse, a favorite hunting ground for pirates. The system didn\'t see much in the way of attention until the outset of the Century War when pirates attacked a Xziphid Hegemony Hive ship entering the system, thinking it was some new class of Progenitor Coalition merchant vessel. Needless to say, Foc never had trouble with pirates again."
        },
        {
            name: 'Jianshen',
            description: '!LOC(galactic_war:littered_at_one_time_with_a_range_of_various_sized_asteroids_the_system_was_leased_by_the_terradine_corporation_just_before_the_outset_of_the_century_war_terradine_survey_crews_found_the_asteroids_rich_in_various_metals_especially_gold_when_the_xziphid_hegemony_invaded_the_system_some_years_later_terradine_security_forces_put_up_a_valiant_fight_but_were_killed_to_the_last.message):Littered at one time with a range of various sized asteroids, the system was leased by the Terradine Corporation just before the outset of the Century War. Terradine survey crews found the asteroids rich in various metals, especially gold. When the Xziphid Hegemony invaded the system some years later, Terradine security forces put up a valiant fight but were killed to the last.'
        },
        {
            name: 'Gigant',
            description: "!LOC(galactic_war:when_machine_liberation_army_mla_forces_finally_broke_through_kincaid_s_line_during_the_pro_com_war_their_first_target_was_gigant_system_general_kincaid_knowing_he_could_no_longer_hold_back_the_mla_advance_fell_back_to_gigant_hoping_to_stall_the_rolling_tide_of_the_enemy_the_battle_of_gigant_saw_the_progenitor_forces_routed_in_one_of_their_worst_defeats_of_the_war_general_kincaid_himself_was_seriously_wounded_refusing_to_leave_until_the_last_of_his_forces_were_out_of_the_system_the_defeat_at_gigant_was_the_final_straw_for_the_progenitor_government_they_now_knew_it_was_only_a_matter_of_time_before_the_human_race_was_erased_from_the_universe_project_kadota_was_given_the_green_light_to_begin.message):When Machine Liberation Army (MLA) forces finally broke through Kincaid\'s Line during the Pro-Com War, their first target was Gigant system. General Kincaid, knowing he could no longer hold back the MLA advance, fell back to Gigant hoping to stall the rolling tide of the enemy. The Battle of Gigant saw the Progenitor forces routed in one of their worst defeats of the war. General Kincaid himself was seriously wounded, refusing to leave until the last of his forces were out of the system. The defeat at Gigant was the final straw for the Progenitor government. They now knew it was only a matter of time before the human race was erased from the universe. Project Kadota was given the green light to begin."
        },
        {
            name: 'Quingshan',
            description: '!LOC(galactic_war:quingshan_was_one_of_the_prime_agricultural_systems_in_the_progenitor_coalition_declared_a_sanctuary_system_by_the_government_tight_control_was_kept_on_the_thousands_of_farming_operations_throughout_the_system_quingshan_was_also_protected_by_a_network_of_orbital_weapon_platforms_which_were_never_used_until_the_last_years_of_the_pro_com_war.message):Quingshan was one of the prime agricultural systems in the Progenitor Coalition. Declared a "sanctuary system" by the government, tight control was kept on the thousands of farming operations throughout the system. Quingshan was also protected by a network of orbital weapon platforms, which were never used until the last years of the Pro-Com War.'
        },
        {
            name: "Dragon\'s Spine",
            description: "!LOC(galactic_war:once_home_to_the_largest_continuous_asteroid_belt_in_the_known_galaxy_dragon_s_spine_became_the_stuff_of_legend_tales_spoke_of_a_lost_ship_of_unknown_origin_perhaps_another_galaxy_adrift_somewhere_within_the_spine_treasure_hunters_and_fortune_seekers_galore_all_tried_to_find_the_elusive_ship_only_to_produce_blurry_holovids_and_sonic_anomaly_readings_as_evidence_it_existed.message):Once home to the largest continuous asteroid belt in the known galaxy, Dragon\'s Spine became the stuff of legend. Tales spoke of a lost ship of unknown origin, perhaps another galaxy, adrift somewhere within the Spine. Treasure hunters and fortune seekers galore all tried to find the elusive ship, only to produce blurry holovids and sonic anomaly readings as evidence it existed."
        },
        {
            name: 'Shasha',
            description: '!LOC(galactic_war:renown_across_the_galaxy_as_a_master_promoter_j_l_barnaby_was_the_first_person_to_bring_the_system_to_public_attention_the_system_was_labeled_as_the_ultimate_test_of_survival_skills_with_its_myriad_of_challenges_barnaby_offered_a_reward_of_one_million_acres_of_land_for_anyone_who_could_survive_the_longest_in_the_system_the_catch_and_there_always_was_one_with_barnaby_each_contestant_would_be_dropped_into_the_system_in_a_life_capsule_with_nothing_not_even_clothes_over_120_000_people_signed_up_for_the_challenge_a_winner_emerged_over_five_months_later_when_she_tracked_down_the_only_other_remaining_contestant_and_killed_him.message):Renown across the galaxy as a master promoter, J.L. Barnaby was the first person to bring the system to public attention. The system was labeled as the "ultimate test" of survival skills with its myriad of challenges. Barnaby offered a reward of one million acres of land for anyone who could survive the longest in the system. The catch, and there always was one with Barnaby, each contestant would be dropped into the system in a life capsule with nothing- not even clothes. Over 120,000 people signed up for the challenge. A winner emerged over five months later when she tracked down the only other remaining contestant and killed him.'
        },
        {
            name: 'Biansai',
            description: '!LOC(galactic_war:biansai_was_the_center_of_progenitor_coalition_military_power_for_the_area_the_entire_system_was_heavily_fortified_and_comprised_of_numerous_orbital_weapon_platforms_close_to_three_million_marines_called_biansai_their_home_during_the_century_war_biansai_was_an_island_amidst_a_sea_of_xziphid_hegemony_controlled_systems_it_held_out_for_seventeen_years_before_falling_to_the_xziphid.message):Biansai was the center of Progenitor Coalition military power for the area. The entire system was heavily fortified and comprised of numerous orbital weapon platforms. Close to three million marines called Biansai their home. During the Century War, Biansai was an island amidst a sea of Xziphid Hegemony controlled systems. It held out for seventeen years before falling to the Xziphid.'
        },
        {
            name: 'Battuta',
            description: '!LOC(galactic_war:battuta_was_the_scene_of_the_biggest_gold_rush_since_the_ancient_days_of_earth_after_gold_was_discovered_by_progenitor_settlers_in_the_system_battuta_was_inundated_by_people_seeking_to_make_their_fortunes_when_the_mining_companies_azaghul_and_terradine_sent_in_their_corporate_scientists_they_discovered_that_the_gold_was_the_finest_they_had_ever_seen_with_the_potential_to_be_a_game_changer_within_months_a_bidding_war_broke_out_between_the_two_competitors_for_the_mining_rights_to_the_system_the_general_assembly_turned_them_both_down_declaring_battuta_for_the_private_prospectors.message):Battuta was the scene of the biggest gold rush since the ancient days of Earth. After gold was discovered by Progenitor settlers in the system, Battuta was inundated by people seeking to make their fortunes. When the mining companies Azaghul and Terradine sent in their corporate scientists, they discovered that the gold was the finest they had ever seen, with the potential to be a "game changer". Within months a bidding war broke out between the two competitors for the mining rights to the system. The General Assembly turned them both down, declaring Battuta for the private prospectors.'
        },
        {
            name: 'Dampier',
            description: '!LOC(galactic_war:dampier_played_a_pivotal_role_during_the_pro_com_war_machine_liberation_army_forces_led_by_century_war_veteran_commander_rohl_having_recently_taken_the_system_after_a_protracted_battle_against_superior_progenitor_forces_he_fortified_dampier_and_operated_out_of_the_system_for_over_three_years_marking_the_start_of_his_copernicus_campaign_and_allowing_his_forces_to_swiftly_conquer_surrounding_systems.message):Dampier played a pivotal role during the Pro-Com War. Machine Liberation Army forces led by Century War veteran Commander Rohl. Having recently taken the system after a protracted battle against superior Progenitor forces, he fortified Dampier and operated out of the system for over three years, marking the start of his Copernicus Campaign and allowing his forces to swiftly conquer surrounding systems.'
        },
        {
            name: 'Odin',
            description: "!LOC(galactic_war:the_battle_of_asgard_field_took_place_in_the_copernicus_campaign_during_the_pro_com_war_when_machine_liberation_army_mla_commander_rohl_s_forces_entered_odin_they_found_it_lightly_defended_by_what_they_thought_was_a_division_of_progenitor_marines_what_rohl_didn_t_anticipate_was_two_progenitor_commanders_lying_in_wait_in_the_nearby_asteroids_known_as_the_asgard_field_what_had_started_as_an_easy_conquest_turned_into_a_three_month_slugfest_before_rohl_was_able_to_bring_the_system_under_mla_control.message):The Battle of Asgard Field took place in the Copernicus Campaign during the Pro-Com War. When Machine Liberation Army (MLA) Commander Rohl\'s forces entered Odin they found it lightly defended by what they thought was a division of Progenitor Marines. What Rohl didn\'t anticipate was two Progenitor Commanders lying in wait in the nearby asteroids known as the Asgard Field. What had started as an easy conquest turned into a three month slugfest before Rohl was able to bring the system under MLA control."
        },
        {
            name: 'Changchun',
            description: "!LOC(galactic_war:the_strikingly_beautiful_system_of_changchun_was_beloved_by_many_throughout_the_progenitor_governed_systems_as_a_giant_nature_preserve_where_extinct_species_from_earth_s_past_were_brought_back_to_life_through_dna_sequencing_millions_of_tourists_flocked_to_this_midland_region_system_for_a_chance_to_see_dinosaurs_that_they_had_only_seen_before_in_the_holovids_unfortunately_changchun_was_decimated_by_machine_liberation_army_forces_during_the_copernicus_campaign_of_the_pro_com_war_the_dinosaurs_had_once_again_gone_extinct.message):The strikingly beautiful system of Changchun was beloved by many throughout the Progenitor governed systems as a giant nature preserve where extinct species from Earth\'s past were brought back to life through DNA sequencing. Millions of tourists flocked to this Midland Region system for a chance to see dinosaurs that they had only seen before in the holovids. Unfortunately, Changchun was decimated by Machine Liberation Army forces during the Copernicus Campaign of the Pro-Com War. The dinosaurs had once again gone extinct."
        },
        {
            name: 'Forskaal',
            description: '!LOC(galactic_war:the_battle_of_forskaal_was_to_be_the_final_battle_in_the_copernicus_campaign_during_the_pro_com_war_with_its_intense_solar_winds_and_unstable_magnetic_fields_forskaal_was_an_unforgiving_place_it_became_even_more_so_when_machine_liberation_army_mla_commander_rohl_squared_off_against_progenitor_loyalist_commander_sirrom_and_his_myrmidons_a_special_forces_group_of_loyalist_commanders_commissioned_by_progenitor_high_command_finding_himself_outmatched_rohl_attempted_to_withdraw_back_to_the_changchun_system_only_to_find_his_escape_route_cut_off_the_battle_came_to_an_end_when_rohl_was_destroyed_at_the_hands_of_sirrom_the_mla_s_copernicus_campaign_had_been_stopped.message):The Battle of Forskaal was to be the final battle in the Copernicus Campaign during the Pro-Com War. With its intense solar winds and unstable magnetic fields, Forskaal was an unforgiving place. It became even more so when Machine Liberation Army (MLA) Commander Rohl squared off against Progenitor Loyalist Commander Sirrom and his Myrmidons; a special forces group of Loyalist Commanders commissioned by Progenitor High Command. Finding himself outmatched, Rohl attempted to withdraw back to the Changchun System, only to find his escape route cut off. The battle came to an end when Rohl was destroyed at the hands of Sirrom. The MLA\'s Copernicus Campaign had been stopped.'
        },
        {
            name: 'Galiano',
            description: '!LOC(galactic_war:the_galiano_system_suffered_greatly_under_the_occupation_of_the_xziphid_hegemony_during_the_century_war_the_system_was_home_to_various_forced_labor_camps_constructed_by_the_xziphid_to_house_human_prisoners_with_a_population_of_just_over_two_billion_the_citizens_of_galiano_were_either_chosen_as_food_or_relegated_to_spend_the_rest_of_their_lives_underground_mining_nickel_and_iron_for_xziphid_war_machines_when_the_system_was_finally_liberated_twenty_seven_years_later_barely_two_million_people_remained_alive_from_the_original_two_billion.message):The Galiano System suffered greatly under the occupation of the Xziphid Hegemony during the Century War. The system was home to various forced labor camps constructed by the Xziphid to house human prisoners. With a population of just over two billion, the citizens of Galiano were either chosen as food or relegated to spend the rest of their lives underground mining nickel and iron for Xziphid war machines. When the system was finally liberated twenty-seven years later, barely two million people remained alive from the original two billion.'
        },
        {
            name: 'Magellan',
            description: '!LOC(galactic_war:magellan_was_best_known_as_the_headquarters_for_the_lusk_exploration_company_founded_by_eldon_lusk_the_company_became_responsible_for_exploring_and_charting_nearly_twenty_five_percent_of_progenitor_coalition_space_lusk_was_also_instrumental_in_helping_develop_more_efficient_phase_drives_as_well_as_establishing_the_network_of_vital_galactic_communication_arrays_throughout_progenitor_territory_despite_having_a_great_deal_of_success_lusk_constantly_drove_himself_to_develop_more_ideas_to_improve_progenitor_colonies_and_humanity_as_a_whole_his_volta_hover_car_would_eventually_become_the_standard_mode_of_transportation_for_citizens_throughout_the_progenitor_coalition.message):Magellan was best known as the headquarters for the Lusk Exploration Company. Founded by Eldon Lusk, the company became responsible for exploring and charting nearly twenty-five percent of Progenitor Coalition space. Lusk was also instrumental in helping develop more efficient phase drives, as well as establishing the network of vital galactic communication arrays throughout Progenitor territory. Despite having a great deal of success, Lusk constantly drove himself to develop more ideas to improve Progenitor colonies and humanity as a whole. His Volta Hover Car would eventually become the standard mode of transportation for citizens throughout the Progenitor Coalition.'
        },
        {
            name: 'Ingstad',
            description: '!LOC(galactic_war:ingstad_was_extremely_low_in_population_considered_a_bypass_system_only_the_hardiest_of_progenitor_coalition_settlers_chose_to_scratch_out_meager_livings_mining_the_system_relishing_the_privacy_that_ingstad_offered_them.message):Ingstad was extremely low in population. Considered a "bypass" system, only the hardiest of Progenitor Coalition settlers chose to scratch out meager livings mining the system, relishing the privacy that Ingstad offered them.'
        },
        {
            name: 'Janszoon',
            description: '!LOC(galactic_war:as_the_progenitor_coalition_began_to_expand_settlers_from_the_sol_system_began_a_long_voyage_in_a_fleet_of_over_twenty_merchant_ships_they_had_bought_to_find_a_system_they_could_call_their_own_free_to_practice_their_religion_without_what_they_perceived_as_ridicule_and_persecution_led_by_the_charismatic_jack_smithington_the_group_found_their_home_in_the_janszoon_system_when_machine_liberation_army_forces_reached_the_system_during_the_final_years_of_the_pro_com_war_they_encountered_such_fierce_resistance_that_they_were_forced_to_saturate_the_system_with_nukes_over_three_billion_people_were_systematically_erased_from_the_galaxy_in_only_a_matter_of_minutes.message):As the Progenitor Coalition began to expand, settlers from the Sol System began a long voyage in a fleet of over twenty merchant ships they had bought to find a system they could call their own; free to practice their religion without what they perceived as ridicule and persecution. Led by the charismatic Jack Smithington, the group found their home in the Janszoon System. When Machine Liberation Army forces reached the system during the final years of the Pro-Com War, they encountered such fierce resistance that they were forced to saturate the system with nukes. Over three billion people were systematically erased from the galaxy in only a matter of minutes.'
        },
        {
            name: 'Kozlov',
            description: '!LOC(galactic_war:kozlov_was_once_a_major_stop_for_merchant_ships_on_the_large_trade_route_called_the_hudson_trade_lane_with_such_a_healthy_trade_zone_developed_in_the_system_it_was_not_long_before_kozlov_was_known_to_virtually_every_citizen_of_the_progenitor_coalition_if_you_want_it_kozlov_has_it_became_a_common_phrase_among_citizens_from_the_soaring_market_towers_to_the_seedy_black_market_deals_anything_and_everything_was_for_sale.message):Kozlov was once a major stop for merchant ships on the large trade route called the Hudson Trade Lane. With such a healthy trade zone developed in the system, it was not long before Kozlov was known to virtually every citizen of the Progenitor Coalition. "If you want it, Kozlov has it.", became a common phrase among citizens. From the soaring market towers to the seedy black market deals, anything and everything was for sale.'
        },
        {
            name: 'Mawson',
            description: '!LOC(galactic_war:progenitor_coalition_settlers_of_the_mawson_system_grew_weary_of_what_they_considered_heavy_taxation_and_misrepresentation_by_the_progenitor_coalition_government_on_earth_as_well_as_being_fearful_of_the_commanders_who_had_just_finished_fighting_the_century_war_a_few_years_earlier_declaring_their_independence_and_calling_themselves_the_mawson_republic_the_new_government_dared_the_progenitor_coalition_to_attack_them_reluctantly_the_secretary_general_had_no_choice_but_to_send_in_progenitor_marines_to_put_down_the_rebellion_when_it_became_apparent_the_fight_would_take_years_the_general_assembly_voted_to_send_in_commanders_to_quell_the_rebellion_with_the_notion_it_would_save_more_human_lives_commander_tryphon_was_chosen_to_lead_the_campaign_to_retake_the_system_witnessing_firsthand_the_hatred_directed_at_his_kind_by_humans_the_same_humans_he_and_his_fellow_commanders_had_just_saved_from_annihilation_at_the_hands_of_the_xziphid_hegemony_tryphon_was_successful_in_ending_the_rebellion_and_with_fairly_low_human_casualties_commander_tryphon_however_was_changed_forever_never_to_forget_the_hate_he_encountered_there.message):Progenitor Coalition settlers of the Mawson system grew weary of what they considered, "heavy taxation and misrepresentation" by the Progenitor Coalition government on Earth, as well as being fearful of the Commanders who had just finished fighting the Century War a few years earlier. Declaring their independence and calling themselves the Mawson Republic, the new government dared the Progenitor Coalition to attack them. Reluctantly, the Secretary General had no choice but to send in Progenitor Marines to put down the rebellion. When it became apparent the fight would take years, the General Assembly voted to send in Commanders to quell the rebellion, with the notion it would save more human lives. Commander Tryphon was chosen to lead the campaign to retake the system, witnessing firsthand the hatred directed at his kind by humans- the same humans he and his fellow Commanders had just saved from annihilation at the hands of the Xziphid Hegemony. Tryphon was successful in ending the rebellion, and with fairly low human casualties. Commander Tryphon however was changed forever; never to forget the hate he encountered there.'
        },
        {
            name: 'Rawat',
            description: "!LOC(galactic_war:after_the_end_of_the_century_war_progenitor_high_command_phc_of_the_progenitor_coalition_came_under_pressure_from_the_general_assembly_to_restructure_the_military_back_to_peacetime_numbers_the_only_problem_was_that_many_veteran_s_home_worlds_had_been_devastated_during_the_war_and_their_families_killed_as_a_solution_phc_with_the_approval_of_the_general_assembly_chose_the_rawat_system_as_its_primary_reintegration_center_for_all_human_service_members_transitioning_from_the_military_back_to_civilian_life_this_would_later_be_recognized_as_one_of_a_series_of_mistakes_made_by_the_progenitor_coalition_that_would_cause_a_rift_between_many_of_the_commanders_and_humans.message):After the end of the Century War, Progenitor High Command (PHC) of the Progenitor Coalition came under pressure from the General Assembly to restructure the military back to peacetime numbers. The only problem was that many veteran\'s home worlds had been devastated during the war and their families killed. As a solution, PHC, with the approval of the General Assembly, chose the Rawat system as its primary reintegration center for all human service members transitioning from the military back to civilian life. This would later be recognized as one of a series of mistakes made by the Progenitor Coalition that would cause a rift between many of the Commanders and humans."
        },
        {
            name: 'Orellana',
            description: '!LOC(galactic_war:the_orellana_system_became_known_as_the_information_hub_for_the_entire_progenitor_coalition_the_largest_communication_arrays_outside_of_the_sol_system_could_be_found_throughout_orellana_making_it_one_of_the_most_important_in_all_the_progenitor_territory_also_located_in_the_system_was_fort_umbara_home_to_special_operations_group_seven_or_sog7_during_both_the_century_and_pro_com_war_sog7_was_comprised_of_both_humans_and_commanders_the_best_of_the_best_sog7_were_counted_upon_by_the_progenitor_coalition_to_accomplish_what_no_one_else_could_they_always_did.message):The Orellana system became known as the information hub for the entire Progenitor Coalition. The largest communication arrays outside of the Sol System could be found throughout Orellana, making it one of the most important in all the Progenitor territory. Also located in the system was Fort Umbara, home to Special Operations Group Seven, or SOG7. During both the Century and Pro-Com War, SOG7 was comprised of both humans and Commanders; the best of the best. SOG7 were counted upon by the Progenitor Coalition to accomplish what no one else could. They always did.'
        },
        {
            name: 'Pytheas',
            description: '!LOC(galactic_war:during_the_darkest_days_of_the_century_war_the_progenitor_coalition_government_knew_they_needed_a_safe_place_to_evacuate_to_should_earth_ever_be_threatened_directly_by_the_xziphid_hegemony_pytheas_was_that_place_descending_on_the_system_the_coalition_corps_of_engineers_built_an_exact_replica_of_the_city_of_antananarivo_the_city_in_madagascar_back_on_earth_that_was_the_headquarters_of_the_progenitor_government_even_the_coalition_tower_was_a_perfect_copy_of_the_real_thing_and_was_also_the_home_for_over_two_million_progenitor_coalition_employees_and_their_families.message):During the darkest days of the Century War the Progenitor Coalition government knew they needed a safe place to evacuate to should Earth ever be threatened directly by the Xziphid Hegemony. Pytheas was that place. Descending on the system, the Coalition Corps of Engineers built an exact replica of the city of Antananarivo, the city in Madagascar back on Earth that was the headquarters of the Progenitor government. Even the Coalition Tower was a perfect copy of the real thing and was also the home for over two million Progenitor Coalition employees and their families. '
        },
        {
            name: 'Queiros',
            description: '!LOC(galactic_war:queiros_was_the_host_system_for_the_galactic_grand_prix_ggp_the_greatest_interplanetary_race_in_all_of_the_progenitor_coalition_after_qualifying_in_their_home_systems_and_then_in_their_region_racers_would_be_invited_to_compete_in_the_ggp_piloting_a_single_pilot_stingray_a_military_light_fighter_refitted_for_civilian_use_racers_would_travel_a_course_spanning_the_entire_queiros_system_beginning_at_boshi_station_out_to_the_edge_of_the_system_and_around_kos_miesley_depot_and_then_back_the_race_was_five_hundred_laps_with_the_winner_receiving_ten_million_coalition_credits_it_was_a_rarity_to_see_all_racers_finish_the_entire_race_as_many_would_end_up_blowing_at_least_one_power_converter_before_crossing_the_finish_line.message):Queiros was the host system for the Galactic Grand Prix (GGP); the greatest interplanetary race in all of the Progenitor Coalition. After qualifying in their home systems and then in their region, racers would be invited to compete in the GGP. Piloting a single pilot Stingray (a military light fighter refitted for civilian use) racers would travel a course spanning the entire Queiros system, beginning at Boshi Station, out to the edge of the system and around  Kos Miesley Depot, and then back. The race was five hundred laps, with the winner receiving ten million Coalition credits. It was a rarity to see all racers finish the entire race as many would end up blowing at least one power converter before crossing the finish line.'
        },
        {
            name: 'Rustah',
            description: "!LOC(galactic_war:home_of_the_rustah_rebels_one_of_the_greatest_football_clubs_in_all_of_the_progenitor_coalition_during_the_span_of_twenty_years_the_rebels_won_the_galactic_cup_thirteen_times_rustah_s_main_rival_was_the_breslau_city_bearcats_of_the_vanguard_system_after_the_century_war_the_rebels_football_club_was_one_of_the_first_to_reach_out_to_the_bearcats_whose_members_had_fought_a_brave_guerilla_war_against_the_xziphid_hegemony_to_offer_whatever_aid_they_could.message):Home of the Rustah Rebels; one of the greatest football clubs in all of the Progenitor Coalition. During the span of twenty years, the Rebels won the Galactic Cup thirteen times. Rustah\'s main rival was the Breslau City Bearcats of the Vanguard System. After the Century War, the Rebels Football Club was one of the first to reach out to the Bearcats, whose members had fought a brave guerilla war against the Xziphid Hegemony, to offer whatever aid they could."
        },
        {
            name: 'Salak',
            description: '!LOC(galactic_war:one_of_the_worst_atrocities_in_all_of_the_century_war_took_place_in_this_system_the_xziphid_hegemony_having_just_invaded_the_progenitor_coalition_discovered_they_had_a_taste_for_human_flesh_after_conquering_the_salak_system_all_surviving_humans_were_rounded_up_into_massive_metallic_pens_where_they_were_stripped_of_all_clothing_and_were_fed_and_cared_for_the_citizens_of_salak_were_being_fattened_up_to_be_used_as_food_for_the_xziphid_race_salak_became_a_human_breeding_ground_for_over_seventy_years_the_stories_of_those_that_survived_would_be_etched_forever_in_the_book_humanity_lost_the_story_of_salak_by_author_matthias_kehl.message):One of the worst atrocities in all of the Century War took place in this system. The Xziphid Hegemony, having just invaded the Progenitor Coalition, discovered they had a taste for human flesh. After conquering the Salak system, all surviving humans were rounded up into massive metallic pens where they were stripped of all clothing and were fed and cared for. The citizens of Salak were being "fattened up" to be used as food for the Xziphid race. Salak became a human breeding ground for over seventy years. The stories of those that survived would be etched forever in the book  Humanity Lost: The Story of Salak by author Matthias Kehl. '
        },
        {
            name: 'Tsunenaga',
            description: '!LOC(galactic_war:promoter_j_l_barnaby_famous_promoter_during_the_height_of_the_progenitor_coalition_offered_the_hefty_sum_of_two_million_coalition_credits_to_anyone_who_could_capture_the_elusive_hivio_a_cat_like_creature_purported_to_reside_in_the_system_of_tsunenaga_the_response_was_overwhelming_over_fifteen_million_hunters_descended_upon_the_system_leaving_behind_a_trail_of_destruction_wherever_they_went_the_hivio_was_never_found_and_the_governor_of_tsunenaga_had_barnaby_arrested_on_multiple_charges_the_promoter_would_spend_the_next_five_years_incarcerated_in_the_zarco_system.message):Promoter J.L. Barnaby, famous promoter during the height of the Progenitor Coalition, offered the hefty sum of two million Coalition credits to anyone who could capture the elusive Hivio; a cat-like creature purported to reside in the system of Tsunenaga. The response was overwhelming. Over fifteen million hunters descended upon the system, leaving behind a trail of destruction wherever they went. The Hivio was never found and the governor of Tsunenaga had Barnaby arrested on multiple charges. The promoter would spend the next five years incarcerated in the Zarco system.'
        },
        {
            name: 'Urdaneta',
            description: '!LOC(galactic_war:billed_as_the_eighteenth_wonder_of_the_galaxy_the_undersea_city_of_scopulus_was_a_miracle_of_progenitor_coalition_modern_technology_with_a_massive_undersea_dome_sitting_some_three_thousand_feet_below_the_firtina_sea_scopulus_housed_over_five_million_inhabitants_the_city_effectively_remained_hidden_from_machine_liberation_army_forces_until_the_very_end_of_the_war_when_a_captured_progenitor_memory_node_revealed_its_location_the_city_along_with_the_sea_disappeared_in_mushroom_clouds_of_radioactive_fire.message):Billed as the "Eighteenth Wonder of the Galaxy", the undersea city of Scopulus was a miracle of Progenitor Coalition modern technology. With a massive undersea dome sitting some three thousand feet below the Firtina Sea, Scopulus housed over five million inhabitants. The city effectively remained hidden from Machine Liberation Army forces until the very end of the war when a captured Progenitor memory node revealed its location. The city, along with the sea, disappeared in mushroom clouds of radioactive fire.'
        },
        {
            name: 'Dayuan',
            description: '!LOC(galactic_war:with_the_capability_of_supporting_almost_any_kind_of_organic_life_form_the_general_assembly_voted_to_turn_dayuan_into_the_official_zoo_system_of_the_progenitor_coalition_nearly_every_kind_of_species_found_scattered_throughout_progenitor_coalition_space_could_be_viewed_in_the_dayuan_system_with_top_shelf_resorts_dayuan_was_a_popular_vacation_destination_for_progenitors_all_life_in_the_system_was_exterminated_by_machine_liberation_army_forces_during_the_pro_com_war.message):With the capability of supporting almost any kind of organic life form, the General Assembly voted to turn Dayuan into the official "zoo system" of the Progenitor Coalition. Nearly every kind of species found scattered throughout Progenitor Coalition space could be viewed in the Dayuan system. With top shelf resorts, Dayuan was a popular vacation destination for Progenitors. All life in the system was exterminated by Machine Liberation Army forces during the Pro-Com War.'
        },
        {
            name: 'Xuanzang',
            description: '!LOC(galactic_war:known_once_for_its_beautiful_gemstones_tea_farms_and_quiet_gardens_the_xuanzang_system_became_a_favorite_retirement_spot_for_citizens_of_the_progenitor_coalition_few_places_in_the_galaxy_exuded_the_laid_back_tranquil_feeling_offered_by_living_there_when_it_became_apparent_that_the_progenitor_coalition_was_doomed_the_citizens_of_xuanzang_patiently_awaited_the_arrival_of_the_machine_liberation_army_when_the_invasion_force_arrived_they_found_that_the_populace_rather_than_face_fiery_death_chose_to_commit_mass_suicide_by_eating_the_seeds_of_the_deadly_tengarak_plant_which_was_native_to_the_system.message):Known once for its beautiful gemstones, tea farms and quiet gardens, the Xuanzang system became a favorite retirement spot for citizens of the Progenitor Coalition. Few places in the galaxy exuded the laid-back, tranquil feeling offered by living there. When it became apparent that the Progenitor Coalition was doomed, the citizens of Xuanzang patiently awaited the arrival of the Machine Liberation Army. When the invasion force arrived they found that the populace, rather than face fiery death, chose to commit mass suicide by eating the seeds of the deadly Tengarak plant, which was native to the system.'
        },
        {
            name: 'Zarco',
            description: '!LOC(galactic_war:zarco_was_a_minimum_security_system_set_aside_by_the_progenitor_coalition_for_non_violent_criminals_prisoners_in_the_system_were_permitted_all_the_comforts_of_high_tech_living_with_one_caveat_anyone_caught_attempting_to_leave_the_prison_before_their_sentence_was_up_would_be_immediately_vaporized_one_of_its_more_famous_inmates_was_promoter_j_l_barnaby_sentenced_to_five_years_in_zarco_after_a_disastrous_pr_stunt_in_tsunenaga_after_five_years_barnaby_was_de_facto_ruler_of_his_own_small_fiefdom_in_the_prison_coalition_authorities_had_to_forcefully_remove_him_when_he_refused_to_leave_even_after_his_sentence_was_up.message):Zarco was a minimum security system set aside by the Progenitor Coalition for non-violent criminals. Prisoners in the system were permitted all the comforts of high tech living with one caveat: anyone caught attempting to leave the prison before their sentence was up would be immediately vaporized. One of its more famous inmates was promoter J.L. Barnaby; sentenced to five years in Zarco after a disastrous PR stunt in Tsunenaga. After five years, Barnaby was de facto ruler of his own small fiefdom in the prison. Coalition authorities had to forcefully remove him when he refused to leave, even after his sentence was up.'
        },
        {
            name: 'Derekas',
            description: '!LOC(galactic_war:derekas_was_an_unremarkable_system_devoid_of_life_as_the_century_war_entered_its_second_decade_the_progenitor_coalition_knew_it_would_be_a_long_war_win_or_lose_progenitor_high_command_designated_derekas_as_a_weapons_testing_ground_for_everything_coming_out_of_their_r_d_labs_before_loyalist_commander_sirrom_entered_combat_against_the_xziphid_hegemony_he_underwent_extensive_training_in_derekas.message):Derekas was an unremarkable system devoid of life. As the Century War entered its second decade, the Progenitor Coalition knew it would be a long war, win or lose. Progenitor High Command designated Derekas as a weapons testing ground for everything coming out of their R & D labs. Before Loyalist Commander Sirrom entered combat against the Xziphid Hegemony he underwent extensive training in Derekas.'
        },
        {
            name: 'Espenak',
            description: '!LOC(galactic_war:two_evenly_matched_forces_squared_off_in_espenak_during_the_pro_com_war_the_machine_liberation_army_mla_having_gained_control_of_the_system_some_three_months_earlier_found_themselves_the_target_of_a_vicious_counterattack_led_by_progenitor_coalition_loyalist_commanders_after_three_weeks_of_heavy_fighting_the_loyalist_led_progenitor_forces_prevailed_and_drove_the_mla_from_the_system_six_years_later_the_system_would_fall_into_mla_hands_once_again_never_to_be_reclaimed_by_the_progenitors.message):Two evenly matched forces squared off in Espenak during the Pro-Com War. The Machine Liberation Army (MLA), having gained control of the system some three months earlier, found themselves the target of a vicious counterattack led by Progenitor Coalition Loyalist Commanders. After three weeks of heavy fighting the Loyalist-led Progenitor forces prevailed and drove the MLA from the system. Six years later the system would fall into MLA hands once again, never to be reclaimed by the Progenitors.'
        },
        {
            name: 'Fazhani',
            description: '!LOC(galactic_war:industrial_development_system_of_fazhani_reached_a_fever_pitch_before_the_outset_of_the_century_war_fazhani_became_extremely_polluted_with_toxic_chemicals_emanating_from_its_countless_number_of_progenitor_factories_the_clouds_of_toxic_gas_alternated_between_neon_green_and_day_glow_orange_in_color_after_seventy_years_of_nonstop_pollution_the_companies_responsible_were_forced_to_evacuate_the_system_when_the_general_assembly_discovered_the_scale_of_the_disaster_many_of_the_corporate_executives_responsible_were_sentenced_to_long_prison_terms_and_their_companies_were_forced_to_begin_what_would_be_the_biggest_terraforming_and_clean_up_project_the_progenitor_coalition_had_ever_seen.message):Industrial development system of Fazhani reached a fever pitch before the outset of the Century War. Fazhani became extremely polluted with toxic chemicals emanating from its countless number of Progenitor factories. The clouds of toxic gas alternated between neon green and day glow orange in color. After seventy years of nonstop pollution, the companies responsible were forced to evacuate the system. When the General Assembly discovered the scale of the disaster, many of the corporate executives responsible were sentenced to long prison terms and their companies were forced to begin what would be the biggest terraforming and clean-up project the Progenitor Coalition had ever seen.'
        },
        {
            name: 'Shoujing',
            description: '!LOC(galactic_war:this_system_had_been_part_of_the_first_land_rush_in_the_early_years_of_progenitor_coalition_expansion_despite_the_fact_that_all_the_settlers_were_progenitors_two_very_different_cultures_developed_and_relations_began_to_grow_sour_twenty_years_before_the_outset_of_the_century_war_the_governor_of_shoujing_declared_a_state_of_emergency_as_years_of_animosity_between_the_two_factions_turned_into_open_conflict_before_progenitor_marines_could_arrive_to_quell_the_unrest_both_factions_had_launched_massive_nuclear_missile_strikes_against_one_another_in_just_a_few_moments_over_seven_hundred_million_were_dead_the_progenitor_coalition_moved_the_survivors_out_of_the_system_and_resettled_them_throughout_progenitor_governed_space.message):This system had been part of the first "land rush" in the early years of Progenitor Coalition expansion. Despite the fact that all the settlers were Progenitors, two very different cultures developed, and relations began to grow sour. Twenty years before the outset of the Century War the governor of Shoujing declared a state of emergency as years of animosity between the two factions turned into open conflict. Before Progenitor Marines could arrive to quell the unrest, both factions had launched massive nuclear missile strikes against one another. In just a few moments, over seven hundred million were dead. The Progenitor Coalition moved the survivors out of the system and resettled them throughout Progenitor governed space.'
        },
        {
            name: 'Aryabhata',
            description: '!LOC(galactic_war:aryabhata_was_a_mineral_rich_system_especially_known_for_the_ultra_rare_mortolite_a_gemstone_used_in_the_manufacturing_of_the_most_powerful_beam_weapons_that_were_used_by_progenitor_coalition_military_as_a_result_protecting_the_system_was_paramount_at_the_outset_of_the_pro_com_war_the_machine_liberation_army_mla_made_capturing_aryabhata_a_priority_seven_major_battles_were_fought_over_the_system_with_the_mla_failing_to_capture_it_until_the_final_years_of_the_war.message):Aryabhata was a mineral rich system, especially known for  the ultra rare Mortolite; a gemstone used in the manufacturing of the most powerful beam weapons that were used by Progenitor Coalition military. As a result, protecting the system was paramount. At the outset of the Pro-Com War, the Machine Liberation Army (MLA) made capturing Aryabhata a priority. Seven major battles were fought over the system, with the MLA failing to capture it until the final years of the war.'
        },
        {
            name: 'Akiyama',
            description: '!LOC(galactic_war:the_akiyama_system_was_the_home_to_the_heiwa_people_a_group_of_pacifists_who_settled_the_system_as_the_progenitor_coalition_was_first_expanding_the_heiwa_kept_to_themselves_living_simple_lives_without_the_aid_of_technology_they_were_spared_the_horrors_of_the_century_war_but_were_ultimately_wiped_out_by_machine_liberation_army_forces_passing_through_the_system_in_the_later_years_of_the_pro_com_war.message):The Akiyama system was the home to the Heiwa people; a group of pacifists who settled the system as the Progenitor Coalition was first expanding. The Heiwa kept to themselves, living simple lives without the aid of technology. They were spared the horrors of the Century War, but were ultimately wiped out by Machine Liberation Army forces passing through the system in the later years of the Pro-Com War.'
        },
        {
            name: 'Banno',
            description: '!LOC(galactic_war:banno_was_the_home_of_the_great_banno_lottery_held_every_ten_years_among_its_billions_of_citizens_spread_among_the_system_every_ten_years_with_great_ceremony_a_drawing_would_be_held_and_broadcast_throughout_the_progenitor_coalition_selecting_one_winner_the_individual_chosen_would_receive_two_billion_coalition_credits_the_only_catch_was_that_once_the_person_died_any_remaining_money_would_pass_back_into_the_lottery_pool_in_the_years_before_the_system_fell_to_the_machine_liberation_army_the_lottery_prize_pool_held_over_one_hundred_and_fifty_billion_coalition_credits.message):Banno was the home of the Great Banno Lottery, held every ten years among its billions of citizens spread among the system. Every ten years, with great ceremony, a drawing would be held and broadcast throughout the Progenitor Coalition selecting one winner. The individual chosen would receive two billion Coalition credits. The only catch was that once the person died any remaining money would pass back into the lottery pool. In the years before the system fell to the Machine Liberation Army the lottery prize pool held over one hundred and fifty billion Coalition credits.'
        },
        {
            name: 'Hagihara',
            description: '!LOC(galactic_war:hagihara_was_famously_known_for_the_siege_of_hagihara_during_the_century_war_against_the_xziphid_hegemony_when_the_xziphid_invaded_the_system_thirty_years_into_the_war_they_tried_their_typical_direct_assault_upon_the_system_only_to_find_it_was_defended_by_a_heavily_entrenched_progenitor_civilian_populace_hagihara_was_a_favorite_retirement_system_for_progenitor_coalition_military_personnel_so_when_the_xziphid_invaded_they_were_faced_with_over_one_billion_combat_trained_veterans_hagihara_held_out_for_over_three_years_during_which_time_the_commanders_had_entered_the_war_the_siege_was_finally_lifted_when_progenitor_forces_led_by_commander_patton_drove_the_xziphid_from_the_system.message):Hagihara was famously known for the Siege of Hagihara during the Century War against the Xziphid Hegemony. When the Xziphid invaded the system thirty years into the war they tried their typical direct assault upon the system, only to find it was defended by a heavily entrenched Progenitor civilian populace. Hagihara was a favorite retirement system for Progenitor Coalition military personnel, so when the Xziphid invaded they were faced with over one billion combat trained veterans. Hagihara held out for over three years, during which time the Commanders had entered the war. The siege was finally lifted when Progenitor forces led by Commander Patton drove the Xziphid from the system.'
        },
        {
            name: 'Hyakutake',
            description: '!LOC(galactic_war:hyakutake_was_the_home_of_the_terradine_corporate_shipyards_merchant_and_explorer_vessels_were_built_in_construction_yards_spread_across_the_system_and_then_sent_out_for_duty_all_throughout_the_progenitor_coalition_the_battle_of_hyakutake_during_the_century_war_saw_the_destruction_of_the_yards_and_the_occupants_of_the_system_the_yards_were_rebuilt_after_the_war_along_with_a_progenitor_military_base_and_a_number_of_orbital_weapon_platforms.message):Hyakutake was the home of the Terradine corporate shipyards. Merchant and explorer vessels were built in construction yards spread across the system, and then sent out for duty all throughout the Progenitor Coalition. The Battle of Hyakutake during the Century War saw the destruction of the yards and the occupants of the system. The yards were rebuilt after the war, along with a Progenitor military base and a number of orbital weapon platforms.'
        },
        {
            name: 'Inoda',
            description: '!LOC(galactic_war:inoda_was_the_location_of_a_series_of_underground_progenitor_research_laboratories_owned_and_operated_by_geoponinc_it_was_from_here_that_major_advances_in_crop_genetics_took_place_making_crops_nearly_impervious_to_diseases_and_able_to_grow_in_almost_any_climate_geoponinc_also_helped_to_design_the_molecular_schematics_used_for_food_preparation_in_the_synthvictuals_module_the_research_breakthroughs_all_coming_out_of_the_inoda_labs_contact_was_lost_with_inoda_when_machine_liberation_army_forces_swept_through_it_during_the_pro_com_war_their_ultimate_fate_is_unknown.message):Inoda was the location of a series of underground Progenitor research laboratories owned and operated by GeoponInc. It was from here that major advances in crop genetics took place, making crops nearly impervious to diseases and able to grow in almost any climate. GeoponInc also helped to design the molecular schematics used for food preparation in the SynthVictuals Module; the research breakthroughs all coming out of the Inoda labs. Contact was lost with Inoda when Machine Liberation Army forces swept through it during the Pro-Com War. Their ultimate fate is unknown.'
        },
        {
            name: 'Bingzhen',
            description: '!LOC(galactic_war:the_battle_of_bingzhen_took_place_during_the_pro_com_war_machine_liberation_army_commander_kytros_had_gained_a_reputation_among_progenitor_forces_for_cruelty_to_humans_in_the_systems_he_conquered_he_was_known_to_construct_numerous_torture_stations_on_occupied_human_worlds_where_he_would_oversee_horrific_experiments_on_the_helpless_populace_progenitor_high_command_suspected_the_commander_was_suffering_from_snd_spontaneous_neural_degradation_that_was_common_in_a_i_at_the_time_a_task_force_led_by_loyalist_commander_chamberlin_met_kytros_in_the_system_where_the_crazed_commander_was_finally_defeated_and_destroyed_after_several_months_of_intense_fighting.message):The Battle of Bingzhen took place during the Pro-Com War. Machine Liberation Army Commander Kytros had gained a reputation among Progenitor forces for cruelty to humans in the systems he conquered. He was known to construct numerous "torture stations" on occupied human worlds, where he would oversee horrific experiments on the helpless populace. Progenitor High Command suspected the Commander was suffering from SND; Spontaneous Neural Degradation that was common in A.I. at the time. A task force led by Loyalist Commander Chamberlin met Kytros in the system where the crazed Commander was finally defeated and destroyed after several months of intense fighting.'
        },
        {
            name: 'Karachkina',
            description: '!LOC(galactic_war:one_time_head_of_the_panoply_armaments_group_victor_panoply_fell_so_deeply_in_love_with_the_system_karachkina_that_he_bought_up_large_sections_of_it_because_he_was_reminded_of_his_native_siberia_back_on_earth_the_system_became_a_haven_for_earth_immigrants_of_russian_descent_eventually_to_become_famous_throughout_the_progenitor_coalition_for_its_premium_distilled_alcohol_nyste.message):One time head of the Panoply Armaments Group, Victor Panoply, fell so deeply in love with the system Karachkina that he bought up large sections of it because he was "reminded of his native Siberia" back on Earth. The system became a haven for Earth immigrants of Russian descent, eventually to become famous throughout the Progenitor Coalition for its premium distilled alcohol, Nyste.'
        },
        {
            name: 'Battani',
            description: '!LOC(galactic_war:some_of_the_most_spectacular_active_volcanoes_were_once_found_throughout_the_battani_system_originally_a_vacation_haven_for_amateur_and_professional_volcanologists_throughout_the_progenitor_coalition_battani_witnessed_many_battles_throughout_the_years_commander_tryphon_founder_of_the_machine_liberation_army_fled_to_battani_after_his_daring_hijack_of_the_galactic_communication_array_in_the_planicus_system_a_move_many_considered_the_beginning_of_the_pro_com_war.message):Some of the most spectacular active volcanoes were once found throughout the Battani system; originally a vacation haven for amateur and professional volcanologists throughout the Progenitor Coalition. Battani witnessed many battles throughout the years. Commander Tryphon, founder of the Machine Liberation Army, fled to Battani after his daring hijack of the galactic communication array in the Planicus system; a move many considered the beginning of the Pro-Com War.'
        },
        {
            name: 'Bhaskara',
            description: '!LOC(galactic_war:the_system_of_bhaskara_was_once_home_to_a_plethora_of_unique_marine_life_progenitor_geologists_and_oceanographers_from_the_coalition_institute_of_oceanic_studies_exploring_the_system_were_amazed_at_the_diversity_of_species_they_found_especially_the_giant_gora_fish_which_was_three_times_larger_than_the_blue_whale_found_on_earth_the_species_was_most_likely_rendered_extinct_when_machine_liberation_army_forces_passed_through_the_system_in_the_early_stages_of_the_pro_com_war.message):The system of Bhaskara was once home to a plethora of unique marine life. Progenitor geologists and oceanographers from the Coalition Institute of Oceanic Studies exploring the system were amazed at the diversity of species they found, especially the giant Gora fish which was three times larger than the blue whale found on Earth. The species was most likely rendered extinct when Machine Liberation Army forces passed through the system in the early stages of the Pro-Com War.'
        },
        {
            name: 'Lagadha',
            description: '!LOC(galactic_war:progenitors_that_aspired_to_be_chefs_had_to_learn_a_great_deal_having_to_educate_themselves_on_the_preparation_of_ingredients_and_spices_from_all_corners_of_the_progenitor_coalition_the_academy_of_culinary_arts_in_the_system_of_lagadha_was_famous_for_producing_individuals_that_would_go_on_to_become_galaxy_renown_chefs_with_the_advent_of_the_synthvictuals_module_many_feared_the_need_for_chefs_would_disappear_forever_the_reality_however_was_the_demand_greatly_increased_as_people_considered_real_food_far_superior_to_that_offered_by_the_devices.message):Progenitors that aspired to be chefs had to learn a great deal, having to educate themselves on the preparation of ingredients and spices from all corners of the Progenitor Coalition. The Academy of Culinary Arts in the system of Lagadha was famous for producing individuals that would go on to become galaxy-renown chefs. With the advent of the SynthVictuals Module many feared the need for chefs would disappear forever. The reality however was the demand greatly increased as people considered "real food" far superior to that offered by the devices.'
        },
        {
            name: 'Miyaska',
            description: '!LOC(galactic_war:miyaska_was_known_as_the_entertainment_capital_of_the_progenitor_coalition_people_had_grown_weary_of_the_same_computer_generated_entertainment_being_churned_out_by_holovid_companies_time_after_time_longing_for_the_days_on_ancient_earth_when_films_used_real_people_and_real_locations_miyaska_provided_a_prime_location_for_filming_in_any_environment_one_could_think_of_one_of_the_biggest_holovid_companies_was_uber_entertainment_who_began_their_climb_to_the_top_with_their_smash_hit_crimson_midnight_the_movie_told_the_story_about_a_group_of_humans_called_the_progenitors_that_fought_against_an_advanced_machine_society_bent_on_conquering_the_galaxy.message):Miyaska was known as the "Entertainment Capital of the Progenitor Coalition". People had grown weary of the same computer-generated entertainment being churned out by holovid companies time after time; longing for the days on ancient Earth when films used real people and real locations. Miyaska provided a prime location for filming in any environment one could think of. One of the biggest holovid companies was Uber Entertainment, who began their climb to the top with their smash hit Crimson Midnight. The movie told the story about a group of humans called the Progenitors that fought against an advanced machine society bent on conquering the galaxy.'
        },
        {
            name: 'Naubakht',
            description: '!LOC(galactic_war:the_progenitor_coalition_knew_that_with_the_outbreak_of_the_century_war_defending_colonies_would_be_of_the_utmost_importance_in_the_naubakht_system_progenitor_military_constantly_worked_on_new_and_improved_versions_of_their_orbital_weapon_platforms_as_the_war_entered_its_thirty_fifth_year_the_progenitor_coalition_had_developed_the_sentinel_7_a_platform_that_proved_so_successful_against_xziphid_hegemony_invasions_that_production_was_rushed_to_include_fifteen_other_construction_sites_throughout_the_area.message):The Progenitor Coalition knew that with the outbreak of the Century War defending colonies would be of the utmost importance. In the Naubakht system, Progenitor military constantly worked on new and improved versions of their orbital weapon platforms. As the war entered its thirty-fifth year, the Progenitor Coalition had developed the Sentinel 7; a platform that proved so successful against Xziphid Hegemony invasions that production was rushed to include fifteen other construction sites throughout the area.'
        },
        {
            name: 'Oterma',
            description: "!LOC(galactic_war:the_acts_of_bravery_and_heroism_displayed_by_progenitor_coalition_military_in_the_oterma_system_during_the_century_war_against_the_xziphid_hegemony_was_so_great_that_the_highest_medal_awarded_by_the_military_was_named_after_the_system_oterma_was_considered_a_home_for_orphans_children_who_had_lost_families_due_to_the_war_children_from_all_across_the_progenitor_coalition_were_sent_to_the_system_where_they_would_be_well_cared_for_until_suitable_parents_could_be_found_in_a_totally_unexpected_move_xziphid_forces_appeared_in_the_system_well_beyond_the_established_front_lines_in_an_effort_to_lower_progenitor_morale_by_striking_at_their_most_precious_commodity_their_children_at_the_time_of_the_attack_the_17th_mars_division_had_happened_be_passing_through_oterma_on_their_way_to_the_front_lines_when_they_realized_what_was_happening_they_quickly_moved_to_fortify_and_protect_the_system_in_her_famous_book_angels_of_oterma_author_elisabeth_kendrick_tells_stories_of_how_the_marines_of_the_17th_held_off_the_xziphid_who_outnumbered_them_ten_to_one_and_kept_the_children_out_of_harm_s_way_until_progenitor_reinforcements_arrived_two_weeks_later_out_of_the_ten_thousand_personnel_in_the_17th_just_three_thousand_remained_at_the_end_of_the_siege_the_17th_mars_would_go_on_to_become_the_most_decorated_division_of_the_century_war.message):The acts of bravery and heroism displayed by Progenitor Coalition military in the Oterma System during the Century War against the Xziphid Hegemony was so great that the highest medal awarded by the military was named after the system. Oterma was considered a home for orphans- children who had lost families due to the war. Children from all across the Progenitor Coalition were sent to the system where they would be well cared for until suitable parents could be found. In a totally unexpected move, Xziphid forces appeared in the system, well beyond the established front lines, in an effort to lower Progenitor morale by striking at their most precious commodity: their children. At the time of the attack, the 17th Mars Division had happened be passing through Oterma on their way to the front lines. When they realized what was happening, they quickly moved to fortify and protect the system. In her famous book Angels of Oterma, author Elisabeth Kendrick tells stories of how the Marines of the 17th held off the Xziphid, who outnumbered them ten to one, and kept the children out of harm\'s way until Progenitor reinforcements arrived two weeks later. Out of the ten thousand personnel in the 17th, just three thousand remained at the end of the siege. The 17th Mars would go on to become the most decorated division of the Century War."
        },
        {
            name: 'Planicus',
            description: "!LOC(galactic_war:planicus_was_the_ideal_location_for_one_of_the_progenitor_coalition_s_many_galactic_communication_arrays_the_arrays_some_seventy_in_total_allowed_for_instant_communication_from_the_sol_system_to_the_most_remote_areas_of_progenitor_coalition_territory_it_was_here_after_discovering_the_truth_behind_project_nest_that_commander_tryphon_hijacked_the_array_broadcasting_what_he_considered_proof_of_humanity_s_plot_to_enslave_all_commanders_to_every_corner_of_progenitor_coalition_space_before_he_could_be_apprehended_by_progenitor_authorities_tryphon_had_escaped_to_the_battani_system_where_he_would_remain_in_seclusion_for_many_years.message):Planicus was the ideal location for one of the Progenitor Coalition\'s many galactic communication arrays. The arrays, some seventy in total, allowed for instant communication from the Sol System to the most remote areas of Progenitor Coalition territory. It was here, after discovering the truth behind Project NEST, that Commander Tryphon hijacked the array, broadcasting what he considered proof of humanity\'s plot to enslave all Commanders to every corner of Progenitor Coalition space. Before he could be apprehended by Progenitor authorities Tryphon had escaped to the Battani system where he would remain in seclusion for many years. "
        },
        {
            name: 'Qushji',
            description: '!LOC(galactic_war:qushji_was_considered_an_insignificant_progenitor_settlement_before_the_outbreak_of_the_century_war_with_only_a_small_independent_tungsten_mining_operation_the_system_held_very_little_draw_for_people_to_settle_it_that_all_changed_with_the_century_war_progenitor_coalition_scientists_discovered_early_in_the_war_that_the_xziphid_race_were_extremely_sensitive_to_tungsten_so_much_so_that_it_was_lethal_to_them_even_in_small_amounts_as_a_result_the_progenitor_military_developed_the_tungsten_beam_rifle_tbr_to_be_used_by_progenitor_marines_throughout_the_war_once_qushji_was_free_of_xziphid_hegemony_occupation_it_became_a_boom_system_teeming_with_tungsten_mining_operations_to_fuel_the_war_effort.message):Qushji was considered an insignificant Progenitor settlement before the outbreak of the Century War. With only a small independent tungsten mining operation, the system held very little draw for people to settle it. That all changed with the Century War. Progenitor Coalition scientists discovered early in the war that the Xziphid race were extremely sensitive to tungsten, so much so that it was lethal to them- even in small amounts. As a result, the Progenitor military developed the Tungsten Beam Rifle (TBR), to be used by Progenitor Marines throughout the war. Once Qushji was free of Xziphid Hegemony occupation it became a "boom system", teeming with tungsten mining operations to fuel the war effort.'
        },
        {
            name: 'Rittenhouse',
            description: '!LOC(galactic_war:after_making_their_fortune_in_the_progenitor_galactic_real_estate_market_the_rittenhouse_family_of_the_sancruzo_system_decided_it_was_time_to_find_a_planet_to_call_their_very_own_they_found_here_a_good_distance_from_the_commerce_centers_of_neighboring_systems_but_not_far_enough_to_be_isolated_from_the_ebb_and_flow_of_coalition_life_the_system_they_settled_in_they_simply_named_after_the_family_from_majestic_alpine_vistas_to_warm_tropical_beaches_rittenhouse_once_offered_much_by_the_time_of_the_century_war_the_rittenhouse_family_employed_a_private_security_force_that_included_several_orbital_weapon_platforms_all_to_keep_strangers_away_from_the_system.message):After making their fortune in the Progenitor galactic real estate market, the Rittenhouse family of the Sancruzo system decided it was time to find a planet to call their very own. They found here, a good distance from the commerce centers of neighboring systems, but not far enough to be isolated from the ebb and flow of Coalition life. The system they settled in they simply named after the family. From majestic alpine vistas to warm tropical beaches, Rittenhouse once offered much. By the time of the Century War the Rittenhouse family employed a  private security force that included several orbital weapon platforms, all to keep strangers away from the system.'
        },
        {
            name: 'Sagan ****',
            description: '!LOC(galactic_war:named_after_the_famous_earth_cosmologist_sagan_was_fittingly_the_home_to_the_coalition_center_for_astronomical_studies_ccas_astronomers_physicists_and_cosmologists_from_all_across_the_progenitor_coalition_vied_for_jobs_at_the_prestigious_institution_the_ccas_as_was_instrumental_in_helping_to_chart_new_trade_routes_and_discovering_new_systems_to_colonize_during_the_rise_of_the_progenitor_coalition.message):Named after the famous Earth cosmologist, Sagan was fittingly the home to the Coalition Center for Astronomical Studies (CCAS). Astronomers, physicists, and cosmologists from all across the Progenitor Coalition vied for jobs at the prestigious institution. The CCAS as was instrumental in helping to chart new trade routes and discovering new systems to colonize during the rise of the Progenitor Coalition.'
        },
        {
            name: 'Suntzeff',
            description: '!LOC(galactic_war:headquarters_for_the_heliacal_corporation_the_system_was_an_important_center_for_the_collection_and_distribution_of_solar_power_throughout_the_progenitor_coalition_heliacal_corporation_gained_further_notoriety_when_they_successfully_developed_the_first_portable_solar_generator_strong_enough_to_power_over_ten_thousand_homes_all_in_a_package_the_size_of_the_standard_hover_car_it_helped_revolutionize_deep_space_exploration_colonization_and_military_operations_in_remote_areas_the_system_fell_to_machine_liberation_army_forces_in_the_twenty_second_year_of_the_pro_com_war.message):Headquarters for the Heliacal Corporation, the system was an important center for the collection and distribution of solar power throughout the Progenitor Coalition. Heliacal Corporation gained further notoriety when they successfully developed the first portable solar generator strong enough to power over ten thousand homes- all in a package the size of the standard hover car. It helped revolutionize deep space exploration, colonization and military operations in remote areas. The system fell to Machine Liberation Army forces in the twenty-second year of the Pro-Com War.'
        },
        {
            name: 'Takamizawa',
            description: "!LOC(galactic_war:takamizawa_held_a_strategic_position_along_the_progenitor_coalition_s_vital_hudson_trade_lane_when_xziphid_hegemony_forces_invaded_the_system_during_the_dark_years_progenitor_coalition_forces_knew_that_losing_it_would_effectively_weaken_the_area_and_leave_neighboring_systems_exposed_the_fight_became_so_desperate_that_progenitor_stingray_fighters_were_packed_with_explosives_and_crashed_into_xziphid_hive_ships_unfortunately_the_stingrays_could_not_be_remotely_flown_with_much_accuracy_carrying_such_heavy_payloads_in_low_orbit_thus_it_fell_to_volunteers_to_fly_the_fighters_into_their_targets_with_the_very_survival_of_the_progenitors_at_stake_the_pool_of_volunteers_was_huge_the_tactic_helped_the_progenitor_coalition_to_destroy_the_first_hive_ship_of_the_war_though_the_system_eventually_fell_to_the_xziphid_the_takamizawa_kamikazes_sacrifice_helped_bring_hope_and_signaled_the_beginning_of_the_end_of_the_dark_days_of_the_century_war_for_the_progenitors.message):Takamizawa held a strategic position along the Progenitor Coalition\'s vital Hudson Trade Lane. When Xziphid Hegemony forces invaded the system during the Dark Years, Progenitor Coalition forces knew that losing it would effectively weaken the area and leave neighboring systems exposed. The fight became so desperate that Progenitor Stingray fighters were packed with explosives and crashed into Xziphid Hive ships. Unfortunately, the Stingrays could not be remotely flown with much accuracy carrying such heavy payloads in low orbit, thus it fell to volunteers to fly the fighters into their targets. With the very survival of the Progenitors at stake, the pool of volunteers was huge. The tactic helped the Progenitor Coalition to destroy the first Hive ship of the war. Though the system eventually fell to the Xziphid, the Takamizawa Kamikazes sacrifice helped bring hope and signaled the beginning of the end of the Dark Days of the Century War for the Progenitors."
        },
        {
            name: 'Urata',
            description: "!LOC(galactic_war:the_urata_system_didn_t_impress_progenitor_coalition_settlers_much_when_they_first_arrived_there_looking_for_a_system_to_use_as_a_base_to_mine_a_nearby_asteroid_belt_urata_seemed_the_logical_choice_due_to_its_proximity_what_the_settlers_found_was_a_harsh_unforgiving_landscape_that_turned_even_the_most_timid_person_into_a_rugged_survivalist_over_the_years_despite_the_conditions_the_population_of_urata_grew_due_to_rich_deposits_of_metals_continuing_to_be_found_in_the_asteroids_when_the_century_war_erupted_thousands_of_urata_citizens_volunteered_for_the_progenitor_coalition_marines_their_reputation_for_toughness_resulted_in_the_formation_of_the_buzzards_a_first_strike_division_that_would_routinely_spearhead_progenitor_operations_against_the_xziphid_hegemony.message):The Urata system didn\'t impress Progenitor Coalition settlers much when they first arrived there. Looking for a system to use as a base to mine a nearby asteroid belt, Urata seemed the logical choice due to its proximity. What the settlers found was a harsh, unforgiving landscape that turned even the most timid person into a rugged survivalist. Over the years, despite the conditions, the population of Urata grew due to rich deposits of metals continuing to be found in the asteroids. When the Century War erupted, thousands of Urata citizens volunteered for the Progenitor Coalition Marines. Their reputation for toughness resulted in the formation of the Buzzards; a first strike division that would routinely spearhead Progenitor operations against the Xziphid Hegemony."
        },
        {
            name: 'Vavrova',
            description: '!LOC(galactic_war:this_system_was_at_one_time_the_location_for_the_coalition_naval_academy_cna_with_many_planets_throughout_the_progenitor_coalition_covered_in_water_the_cna_helped_to_train_millions_to_conduct_water_as_well_as_space_based_operations_wherever_they_were_called_upon_to_do_so_never_was_this_more_important_than_in_the_century_war_it_was_not_until_the_pro_com_war_that_human_operated_navies_began_to_be_replaced_by_progenitor_loyalist_commander_led_machine_navies.message):This system was at one time the location for the Coalition Naval Academy (CNA). With many planets throughout the Progenitor Coalition covered in water, the CNA helped to train millions to conduct water, as well as space-based operations wherever they were called upon to do so. Never was this more important than in the Century War. It was not until the Pro-Com War that human operated navies began to be replaced by Progenitor Loyalist Commander-led machine navies.'
        },
        {
            name: 'Wolszcaw',
            description: '!LOC(galactic_war:the_wolszcaw_system_was_the_home_of_a_large_settlement_of_musicians_from_it_sprang_the_city_of_poisenka_known_throughout_the_progenitor_coalition_as_the_city_of_song_the_day_the_xziphid_hegemony_invaded_the_system_would_be_forever_etched_in_the_memories_of_progenitor_citizens_as_the_poisenka_philharmonic_played_songe_de_automne_by_archibald_joyce_beaming_it_out_across_the_progenitor_coalition_the_xziphid_were_in_the_process_of_laying_waste_to_the_system_progenitors_listened_in_horror_until_the_broadcast_feed_was_lost.message):The Wolszcaw system was the home of a large settlement of musicians. From it sprang the city of Poisenka, known throughout the Progenitor Coalition as "The City of Song". The day the Xziphid Hegemony invaded the system would be forever etched in the memories of Progenitor citizens. As the Poisenka Philharmonic played Songe de Automne by Archibald Joyce, beaming it out across the Progenitor Coalition, the Xziphid were in the process of laying waste to the system. Progenitors listened in horror until the broadcast feed was lost.'
        },
        {
            name: 'Yuzhe',
            description: '!LOC(galactic_war:the_system_of_yuzhe_was_home_to_the_coalition_fighter_academy_cfa_progenitor_coalition_pilots_all_went_through_cfa_training_where_they_were_taught_both_planetary_and_space_combat_upon_earning_their_wings_graduates_were_sent_to_postings_all_throughout_progenitor_coalition_space_their_most_famous_graduate_jackie_widowmaker_boyington_had_over_279_confirmed_kills_during_the_century_war_against_the_xziphid_hegemony_the_system_was_part_of_the_front_lines_in_the_war_a_scene_of_some_of_the_largest_fighter_engagements_against_xziphid_forces.message):The system of Yuzhe was home to the Coalition Fighter Academy (CFA). Progenitor Coalition pilots all went through CFA training where they were taught both planetary and space combat. Upon earning their wings, graduates were sent to postings all throughout Progenitor Coalition space. Their most famous graduate Jackie "Widowmaker" Boyington had over 279 confirmed kills during the Century War against the Xziphid Hegemony. The system was part of the front lines in the war; a scene of some of the largest fighter engagements against Xziphid forces.'
        },
        {
            name: 'Riazuddiv',
            description: '!LOC(galactic_war:also_known_by_merchant_captains_as_the_icebox_riazuddiv_was_a_popular_stopping_point_for_traders_along_the_hudson_trade_lane_with_its_countless_taverns_and_brothels_popularity_was_not_surprising_so_much_so_it_eventually_attracted_the_attention_of_many_of_the_major_crime_syndicates_throughout_the_progenitor_coalition_many_held_to_the_belief_that_riazuddiv_single_handedly_helped_support_the_majority_of_illegal_activities_in_the_region.message):Also known by merchant captains as the "Icebox", Riazuddiv was a popular stopping point for traders along the Hudson Trade Lane. With its countless taverns and brothels, popularity was not surprising, so much so it eventually attracted the attention of many of the major crime syndicates throughout the Progenitor Coalition. Many held to the belief that Riazuddiv single handedly helped support the majority of illegal activities in the region.'
        },
        {
            name: 'Humungus',
            description: '!LOC(galactic_war:in_what_became_a_scene_out_of_late_20th_century_ancient_earth_films_the_humungus_system_became_a_battleground_for_scarce_resources_after_it_was_cut_off_from_the_rest_of_the_progenitor_coalition_during_the_century_war_deeming_the_system_of_no_strategic_value_the_xziphid_hegemony_bypassed_it_on_their_way_towards_the_promising_targets_in_the_region_water_and_fuel_became_short_supply_in_humungus_people_fighting_one_another_for_them_forced_to_build_vehicles_that_were_ground_based_and_using_ancient_combustion_engines_open_battles_were_fought_in_these_vehicles_moving_at_high_speeds_by_the_time_progenitor_coalition_forces_arrived_some_sixty_four_years_later_there_was_hardly_a_soul_in_humungus_who_even_remembered_the_coalition.message):In what became a scene out of late 20th century ancient Earth films, the Humungus system became a battleground for scarce resources after it was cut off from the rest of the Progenitor Coalition during the Century War. Deeming the system of "no strategic value" the Xziphid Hegemony bypassed it on their way towards the promising targets in the region. Water and fuel became short supply in Humungus; people fighting one another for them. Forced to build vehicles that were ground based and using ancient combustion engines, open battles were fought in these vehicles moving at high speeds. By the time Progenitor Coalition forces arrived, some sixty-four years later, there was hardly a soul in Humungus who even remembered the Coalition.'
        },
        {
            name: 'Bethe',
            description: "!LOC(galactic_war:the_bethe_system_was_used_as_the_hospital_zone_by_the_progenitor_coalition_during_the_pro_com_war_all_the_injured_progenitors_from_the_war_were_evacuated_to_bethe_where_they_received_the_best_care_available_over_eighty_percent_of_those_that_made_it_to_the_system_fully_recovered_from_their_wounds_and_were_able_to_return_to_active_duty_when_machine_liberation_army_forces_broke_through_the_front_lines_in_the_war_s_later_years_bethe_was_overrun_no_mercy_was_spared_for_the_sick_and_wounded.message):The Bethe system was used as the hospital zone by the Progenitor Coalition during the Pro-Com War. All the injured Progenitors from the war were evacuated to Bethe where they received the best care available. Over eighty percent of those that made it to the system fully recovered from their wounds and were able to return to active duty. When Machine Liberation Army forces broke through the front lines in the war\'s later years, Bethe was overrun. No mercy was spared for the sick and wounded."
        },
        {
            name: 'Jansky',
            description: '!LOC(galactic_war:at_one_time_the_jansky_system_had_become_the_favorite_location_for_surfers_throughout_the_progenitor_coalition_the_annual_jansky_galactic_surfing_championships_were_held_there_bringing_together_the_best_surfers_in_the_galaxy_to_crown_a_champion_one_of_the_more_memorable_competitions_occurred_when_ngaru_tangata_a_veteran_surfer_from_apa_managed_to_ride_a_wave_over_two_hundred_feet_tall_for_over_fifteen_minutes_he_was_crowned_champion_and_went_on_to_win_seven_more_championships.message):At one time, the Jansky system had become the favorite location for surfers throughout the Progenitor Coalition. The annual Jansky Galactic Surfing Championships were held there, bringing together the best surfers in the galaxy to crown a champion. One of the more memorable competitions occurred when Ngaru Tangata, a veteran surfer from Apa, managed to ride a wave over two hundred feet tall for over fifteen minutes. He was crowned champion and went on to win seven more championships.'
        },
        {
            name: 'Sancruzo',
            description: "!LOC(galactic_war:sancruzo_was_a_highly_developed_system_that_catered_to_the_wealthy_elite_of_the_progenitor_coalition_a_census_of_the_system_read_like_a_who_s_who_of_government_finance_and_industry_executives_discrimination_was_commonplace_in_sancruzo_allowing_only_people_of_a_certain_income_bracket_to_ever_own_property_there_sancruzo_gained_a_reputation_of_being_one_of_the_most_opulent_and_least_respected_places_in_all_the_progenitor_coalition.message):Sancruzo was a highly developed system that catered to the wealthy elite of the Progenitor Coalition. A census of the system read like a who\'s who of government, finance, and industry executives. Discrimination was commonplace in Sancruzo, allowing only people of a certain income bracket to ever own property there. Sancruzo gained a reputation of being one of the most opulent and least respected places in all the Progenitor Coalition."
        },
        {
            name: 'Monday Night',
            description: "!LOC(galactic_war:build_to_contain_the_most_popular_games_of_ancient_earth_this_system_ended_up_getting_shut_down_after_the_spunky_cola_corporation_went_out_of_business_due_to_humans_no_longer_existing.message):Build to contain the most popular games of ancient Earth, this system ended up getting shut down after the Spunky Cola corporation went out of business due to humans no longer existing."
        }
    ];



    var generate = function(config) {
        var rng = new Math.seedrandom(config.seed !== undefined ? config.seed : Math.random());
        var getRandomInt = function (min, max) {
            return Math.floor(rng() * (max - min + 1)) + min;
        };

        var rSystem = {
            name: config.name || ("PA-" + getRandomInt(100, 30000)),
            isRandomlyGenerated: true
        };

        var cSys = config.template;
        if (!cSys) {
            // Choose a system from the templates
            var starSystemTempl = _.find(table, function(sst) {
                return (sst.Players[0] <= config.players && config.players <= sst.Players[1]);
            });
            if (!starSystemTempl)
                return;

            // we have found a star system group for this number of players. Choose a random system template
            var idx = getRandomInt(0, starSystemTempl.Systems.length - 1);
            cSys = starSystemTempl.Systems[idx];
            //console.log('*********************************************************************************STAR SYSTEM: index: ' + idx + ' length: ' + starSystemTempl.Systems.length);
            var inf = _.sample(systemInfo);
            if (inf) {
                rSystem.name = inf.name;
                rSystem.description = inf.description;
            }
            
            rSystem.players = starSystemTempl.Players;
        }

        // build the planets based on the random numbers in the system template.
        var pgen = _.map(cSys.Planets, function(plnt, index) {
            var bp = _.cloneDeep(planet_template);
            bp.generator.seed = getRandomInt(0, 32767);
            bp.generator.biome = _.sample(plnt.Biomes);

            var biomeGet = $.get('coui://pa/terrain/' + bp.generator.biome + '.json')
                .then(function(data) {
                    return JSON.parse(data);
                });
            var nameGet = plnt.name;
            if (!nameGet) {
                nameGet = $.Deferred();
                api.game.getRandomPlanetName().then(function(name) { nameGet.resolve(name); });
            }
            return $.when(biomeGet, nameGet).then(function(biomeInfo, name) {
                var radius_range = biomeInfo.radius_range;
                if (!_.isArray(radius_range))
                    radius_range = [100, 1300];

                bp.generator.radius = getRandomInt(Math.max(plnt.Radius[0], radius_range[0]),
                        Math.min(plnt.Radius[1], radius_range[1]));

                bp.generator.heightRange = getRandomInt(plnt.Height[0], plnt.Height[1]);
                bp.generator.waterHeight = getRandomInt(plnt.Water[0], plnt.Water[1]);
                bp.generator.temperature = getRandomInt(plnt.Temp[0], plnt.Temp[1]);
                bp.generator.biomeScale = getRandomInt(plnt.BiomeScale[0], plnt.BiomeScale[1]);
                bp.generator.metalDensity = getRandomInt(plnt.MetalDensity[0], plnt.MetalDensity[1]);
                bp.generator.metalClusters = getRandomInt(plnt.MetalClusters[0], plnt.MetalClusters[1]);
                bp.generator.index = index;
                bp.name = name;
                bp.position = plnt.Position;
                bp.velocity = plnt.Velocity;
                bp.required_thrust_to_move = getRandomInt(plnt.Thrust[0], plnt.Thrust[1]);
                bp.mass = plnt.mass;
                bp.starting_planet = plnt.starting_planet;
                
                return bp;
            });
        });

        return $.when.apply($, pgen).then(function() {
            rSystem.planets = Array.prototype.slice.call(arguments, 0);
            return rSystem;
        });
    };

    return {
        generate: generate
    };
}();

