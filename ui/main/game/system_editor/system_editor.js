/* includes mod rRandomPlanetName by raevn */

var model;
var handlers;

var PLANET_X_OFFSET = -190;
var PLANET_Y_OFFSET = 0;

require(['api'], function(api) {

    function PlanetModel(planet) {
        var self = this;
        self.seed = planet.seed;
        self.radius = planet.radius;
        self.heightRange = planet.heightRange;
        self.waterHeight = planet.waterHeight;
        self.temperature = planet.temperature;
        self.metalDensity = planet.metalDensity;
        self.metalClusters = planet.metalClusters;
        self.biomeScale = planet.biomeScale;
        self.biome = planet.biome;
    }

    function PlanetSpec(spec) {
        var self = this;
        self.name = spec.name;
        self.mass = spec.mass;
        self.position_x = spec.position_x;
        self.position_y = spec.position_y;
        self.velocity_x = spec.velocity_x;
        self.velocity_y = spec.velocity_y;
        self.required_thrust_to_move = spec.required_thrust_to_move;
        self.starting_planet = spec.starting_planet;
        self.planet = new PlanetModel(spec.planet);
    }

    function SystemModel(system) {
        var self = this;
        self.name = system.name;
        self.planets = [];
        for (index in system.planet_specs)
            self.planets.push(new PlanetSpec(system.planet_specs[index]));
    }

    var defaultSystem = {
        name: 'systemTemplate',
        planets: [
            {
                mass : 2500,
                position_x : 0,
                position_y : 0,
                velocity_x : 0,
                velocity_y: 0,
                name: 'planet 0',
                required_thrust_to_move: 0,
                starting_planet: true,
                planet: {
                    seed: 0,
                    radius: 700,
                    heightRange: 25,
                    waterHeight: 50,
                    temperature: 50,
                    metalDensity: 50,
                    metalClusters: 50,
                    biome: 'earth',
                    biomeScale: 50
                }
            }
        ]
    }

    var templates = [
         {
             name: "earth template",
             mass: 20000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 31541,
                 radius: 500,
                 heightRange: 35,
                 waterHeight: 34,
                 temperature: 50,
                 metalDensity: 50,
                 metalClusters: 50,
                 biome: 'earth',
                 biomeScale: 50
             }
         },
         {
             name: "desert template",
             mass: 10000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 9756,
                 radius: 500,
                 heightRange: 35,
                 waterHeight: 33,
                 temperature: 100,
                 metalDensity: 50,
                 metalClusters: 50,
                 biome: 'desert',
                 biomeScale: 75
             }
         },
         {
             name: "ice template",
             mass: 10000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 14451,
                 radius: 500,
                 heightRange: 35,
                 waterHeight: 34,
                 temperature: 0,
                 metalDensity: 50,
                 metalClusters: 50,
                 biome: 'earth',
                 biomeScale: 50
             }
         },
         {
             name: "tropical template",
             mass: 10000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 21542,
                 radius: 400,
                 heightRange: 35,
                 waterHeight: 34,
                 temperature: 80,
                 metalDensity: 50,
                 metalClusters: 50,
                 biome: 'tropical',
                 biomeScale: 50
             }
         },
         {
             name: "metal template",
             mass: 35000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 6846,
                 radius: 760,
                 heightRange: 0,
                 waterHeight: 0,
                 temperature: 50,
                 metalDensity: 75,
                 metalClusters: 100,
                 biome: 'metal',
                 biomeScale: 50
             }
         },
         {
             name: "lava template",
             mass: 10000,
             required_thrust_to_move: 0,
             planet: {
                 seed: 7846,
                 radius: 400,
                 heightRange: 35,
                 waterHeight: 33,
                 temperature: 100,
                 metalDensity: 75,
                 metalClusters: 75,
                 biome: 'lava',
                 biomeScale: 50
             }
         },
         {
             name: "moon template",
             mass: 5000,
             required_thrust_to_move: 3,
             planet: {
                 seed: 78462,
                 radius: 250,
                 heightRange: 50,
                 waterHeight: 0,
                 temperature: 0,
                 metalDensity: 25,
                 metalClusters: 25,
                 biome: 'moon',
                 biomeScale: 50
             }
         },
         {
            name: "gas template",
            mass: 50000,
            required_thrust_to_move: 0,
            planet: {
                 seed: 8239,
                 radius: 1500,
                 heightRange: 0,
                 waterHeight: 0,
                 temperature: 50,
                 metalDensity: 0,
                 metalClusters: 0,
                 biome: 'gas',
                 biomeScale: 100
             }
         }
    ];

    function SystemEditorViewModel() {
        var self = this;

        self.system = ko.observable(new SystemModel(defaultSystem));
        self.planetsInSystem = ko.computed(function () {
            return self.system() ? self.system().planets.length : 0;
        });
        self.selectedPlanetIndex = ko.observable(-1);

        self.showPopUP = ko.observable(false);
        self.popUpPrimaryMsg = ko.observable("test primary msg");
        self.popUpSecondaryMsg = ko.observable("secondary msg");
        self.popUpPrimaryButtonAction = function () { };
        self.popUpSecondaryButtonAction = function () { };
        self.popUpTertiaryButtonAction = function () { };
        self.popUpPrimaryButtonTag = ko.observable(loc('!LOC(system_editor:accept.message):Accept'));
        self.popUpSecondaryButtonTag = ko.observable(loc('!LOC(system_editor:cancel.message):Cancel'));
        self.popUpTertiaryButtonTag = ko.observable(false);

        self.planets = ko.observableArray([]).extend({ local: 'planets' });
        self.systems = ko.observableArray([]).extend({ local: 'systems' });

        self.buildBarHoverPlanet = ko.observable({});
        self.showBuildBarHover = ko.observable(false);
        self.buildBarHoverRadiusWidthString = ko.computed(function () { if ( !jQuery.isEmptyObject(self.buildBarHoverPlanet())) return String(self.buildBarHoverPlanet().planet.radius / 20) + 'px'; });
        self.buildBarHoverHeightWidthString = ko.computed(function () { if (!jQuery.isEmptyObject(self.buildBarHoverPlanet())) return String(self.buildBarHoverPlanet().planet.heightRange) + 'px'; });
        self.buildBarHoverWaterWidthString = ko.computed(function () { if (!jQuery.isEmptyObject(self.buildBarHoverPlanet())) return String(self.buildBarHoverPlanet().planet.waterHeight) + 'px'; });
        self.buildBarHoverTemperatureWidthString = ko.computed(function () { if (!jQuery.isEmptyObject(self.buildBarHoverPlanet())) return String(self.buildBarHoverPlanet().planet.temperature) + 'px'; });
        self.defaultTemplates = ko.observableArray(templates);
        self.recentTemplates = ko.observableArray([]).extend({ local: 'recentPlanets' });
        self.buildbarPageSize = ko.computed(function () { return Math.floor(($('#page').width() - 140) / 65); })
        self.buildBarPage = ko.observable(0);
        self.buildBarPageOffset = ko.observable(0);
        self.buildBarDisplayList = ko.observableArray(self.defaultTemplates());
        self.buildBarDisplayItems = ko.computed(function () {
            var start = self.buildBarPage() * self.buildbarPageSize() + self.buildBarPageOffset();
            var end = start + self.buildbarPageSize();
            return self.buildBarDisplayList.slice(start, end);
        });
        self.shiftBuildListLeft = function () {
            if(self.buildBarPage() === 0) {
                self.buildBarPageOffset(0)
                return;
            }
            self.buildBarPage(self.buildBarPage() - 1)
        };
        self.shiftBuildListRight = function () {
            var end = (self.buildBarPage() + 1) * self.buildbarPageSize() + self.buildbarPageSize()
            if ( end > self.buildBarDisplayList()().length) {
                self.buildBarPageOffset(self.buildBarDisplayList()().length - (self.buildBarPage() * self.buildbarPageSize() + self.buildbarPageSize()));
                return
            }
            self.buildBarPage(self.buildBarPage() + 1 )
        };
        self.buildBarModes = ko.observableArray(['templates', 'recent', 'my_planets']);
        self.buildBarSelectedMode = ko.observable(self.buildBarModes()[0]);
        self.setBuildBarMode = function (mode) {
            if (mode != self.buildBarSelectedMode()) {
                if (mode === self.buildBarModes()[0]) {
                    self.buildBarSelectedMode(self.buildBarModes()[0]);
                    self.buildBarDisplayList(self.defaultTemplates);
                }
                if (mode === self.buildBarModes()[1] && self.recentTemplates().length > 0) {
                    self.buildBarSelectedMode(self.buildBarModes()[1]);
                    self.buildBarDisplayList(self.recentTemplates);
                }
                if (mode === self.buildBarModes()[2] && self.planets().length > 0) {
                    self.buildBarSelectedMode(self.buildBarModes()[2]);
                    self.buildBarDisplayList(self.planets);
                }
            }
            self.buildBarPageOffset(0);
            self.buildBarPage(0);
        };
        self.useRandomPlanetName = ko.computed(function () {
            return self.buildBarSelectedMode() === 'templates';
        });
        self.imageSourceForPlanet = function (planetSpec) {
            if (typeof planetSpec != "undefined" && typeof planetSpec.planet != "undefined") {
                var s =  planetSpec.planet.biome;
                var ice = planetSpec.planet.biome === 'earth' && planetSpec.planet.temperature <= 33;
                var desert = planetSpec.planet.biome === 'earth' && planetSpec.planet.temperature >= 75;
                if (ice)
                    s = 'ice' ;
                else if (desert)
                    s = 'desert';

                return 'coui://ui/main/shared/img/' + s + '.png';
            }
        }
        self.UpdateRecentTemplates = function (planet) {
            var p = new PlanetSpec(planet)
            delete p.position_x;
            delete p.position_y;
            delete p.velocity_x;
            delete p.velocity_y;
            delete p.required_thrust_to_move;
            delete p.starting_planet;
            for (var i in self.recentTemplates()) {
                if (self.recentTemplates()[i].name === p.name) {
                    if (i != 0) {
                        self.recentTemplates.splice(i, 1, self.recentTemplates()[i - 1]);
                        self.recentTemplates.splice(i-1, 1, p)
                    }
                    return;
                }
            }
            if (self.recentTemplates().length < 10) {
                self.recentTemplates.push(p);
                return;
            }
            self.recentTemplates.pop();
            self.recentTemplates.push(p);
        }

        self.validSelectedPlanet = ko.computed(function () { return self.selectedPlanetIndex() >= 0;})

        self.paused = ko.observable(true);
        self.simulating = ko.computed(function() { return !self.paused(); });
        self.togglePaused = function() {
            self.paused(!self.paused());
        };
        self.pauseButtonMessage = ko.computed(function() {
            return self.paused() ? loc("!LOC(system_editor:simulate.message):SIMULATE") : "STOP";
         });
        self.paused.subscribe(function () {
            api.systemEditor.pause(self.paused());
            if (self.paused()) {
                api.systemEditor.setTime(0);
                api.systemEditor.movePlanets(self.system());
            }
        });

        self.time = ko.observable(0);
        self.formattedTime = ko.computed(function() {
            return UberUtility.createTimeString(self.time());
        });

        self.showControls = ko.observable(true);
        self.hideControls = ko.computed(function () { return !self.showControls(); });
        self.enableControls = ko.computed(function() {
            return self.paused() && self.validSelectedPlanet();
        });

        self.modes = ko.observableArray(['planet', 'system']);
        self.selectedMode = ko.observable(self.modes()[0]);
        self.showPlanetEditor = ko.computed(function () { return self.selectedMode() === self.modes()[0] && self.showControls(); });
        self.showSystemEditor = ko.computed(function () { return self.selectedMode() === self.modes()[1] && self.showControls(); });
        self.showBuildBar = ko.computed(function () { return self.selectedMode() === self.modes()[1] && self.paused(); });

        // Current system definition, in string form.  Used for updating the save state.
        self.currentSystemString = ko.observable('');

        self.loadedPlanet = ko.observable().extend({ session: 'loaded_planet' });
        self.loadedSystem = ko.observable().extend({ session: 'loaded_system' });
        //self.showNewPlanet = ko.computed(function () { return jQuery.isEmptyObject(self.loadedPlanet())});
        //self.showEditPlanet = ko.computed(function () { return !self.showNewPlanet() });

        self.systemName = ko.observable('Gamma System');
        self.systemLoaded = ko.observable(false);

        self.lastSavedSystemName = ko.observable("");
        self.saveDirty = ko.observable(false);

        self.planetName = ko.observable('');
        self.seed = ko.observable(0).extend({ slider: 'seed'});
        self.radius = ko.observable(700).extend({ slider: 'radius' });
        self.heightRange = ko.observable(50).extend({ slider: 'height_range' });
        self.biomeScale = ko.observable(50).extend({ slider: 'biome_scale' });
        self.waterHeight = ko.observable(50).extend({ slider: 'water_height' });
        self.temperature = ko.observable(50).extend({ slider: 'temperature' });
        self.metalDensity = ko.observable(50).extend({ slider: 'metal_density' });
        self.metalClusters = ko.observable(50).extend({ slider: 'metal_clusters' });

        self.biomes = ko.observableArray(['earth', 'desert', 'lava', 'metal', 'moon', 'tropical', 'gas']);
        self.selectedBiome = ko.observable(self.biomes()[0]);

        self.mass = ko.observable(2500).extend({ slider: 'mass' });
        self.position_x = ko.observable(15000);
        self.position_y = ko.observable(0);
        self.velocity_x = ko.observable(0);
        self.velocity_y = ko.observable(0);
        self.required_thrust_to_move = ko.observable(0);
        self.enableStartingPlanet = ko.computed(function() {
            return self.selectedBiome() !== 'gas';
        });
        self.starting_planet = ko.observable(false);
        self.displayOrbit = ko.observable();
        self.sandboxPhysics = ko.observable();

        self.biomeError = ko.computed(function () { return '' });
        self.waterHeightError = ko.computed(function () { return self.waterHeight() > 60 ? '!' : '' });
        self.planetUnderConstruction = ko.observable(false);
        self.planetUnderConstruction.subscribe(function (mode) {
            if (mode) {
                $("#slider_seed").slider('disable');
                $("#slider_radius").slider('disable');
                $("#slider_height_range").slider('disable');
                $("#slider_biome_scale").slider('disable');
                $("#slider_water_height").slider('disable');
                $("#slider_temperature").slider('disable');
                $("#slider_metal_density").slider('disable');
                $("#slider_metal_clusters").slider('disable');
            }
            else {
                $("#slider_seed").slider('enable');
                $("#slider_radius").slider('enable');
                $("#slider_height_range").slider('enable');
                $("#slider_biome_scale").slider('enable');
                $("#slider_water_height").slider('enable');
                $("#slider_temperature").slider('enable');
                $("#slider_metal_density").slider('enable');
                $("#slider_metal_clusters").slider('enable');
            }
        });

        self.initSlidersFromLoadedPlanet = function () {
            self.planetName(self.loadedPlanet().name);
            self.seed(self.loadedPlanet().seed);
            self.radius(self.loadedPlanet().radius);
            self.required_thrust_to_move(self.loadedPlanet().required_thrust_to_move);
            self.heightRange(self.loadedPlanet().heightRange);
            self.biomeScale(self.loadedPlanet().biomeScale);
            self.waterHeight(self.loadedPlanet().waterHeight);
            self.temperature(self.loadedPlanet().temperature);
            self.metalDensity(self.loadedPlanet().metalDensity);
            self.metalClusters(self.loadedPlanet().metalClusters);
            self.selectedBiome(self.loadedPlanet().biome);
        }

        self.addPlanet = function (planetSpec, attachToMouse, randomName) {
            
            var input = _.clone(planetSpec, true);
            if (self.systemHasNoStartingPlanet() && planetSpec.planet.biome !== 'gas')
                input.starting_planet = true;

            if (planetSpec) {
                if (attachToMouse)
                    planetSpec.attachToMouse = true;
                
                api.systemEditor.addPlanet(input);
                self.UpdateRecentTemplates(planetSpec);
                if (randomName)
                    self.new_planet_name();
            }
        };
        self.removePlanet = function () {
            engine.call('execute', 'remove_planet', JSON.stringify({}));
        };
        self.removeAllPlanets = function () {
            engine.call('execute', 'remove_all_planets', JSON.stringify({}));
        };
        self.toggleOrbitDisplay = function () {
            engine.call('execute', 'toggle_orbit_display', JSON.stringify({}));
        };
        //self.togglePhysicsMode = function () {
        //    engine.call('execute', 'toggle_physics_mode', JSON.stringify({}));
        //};
        self.buildAllPlanets = function () {
            self.planetUnderConstruction(true);

            function fn() {
                engine.call('execute', 'build_all_planets', JSON.stringify({}));
            }
            setTimeout(fn, 250);
        };

        /// Camera API
        self.cameraMode = ko.observable('planet');
        self.cameraMode.subscribe(function(mode) {
            api.camera.track(false);
            api.camera.setMode(mode);
            if (mode === 'space')
                api.camera.track(true);
        });
        self.focusPlanet = ko.observable(0);
        self.focusPlanet.subscribe(function(index) {
            if (self.cameraMode !== 'space')
                api.camera.track(false);
            api.camera.focusPlanet(index);
        });
        self.alignCameraToPole = function() {
            api.camera.alignToPole();
        };
        /// End Camera API

        self.transitionInToPlanetEditor = function () {
            api.camera.focusPlanet(self.selectedPlanetIndex());
            api.camera.setMode('planet');
        };

        self.transitionOutOfPlanetEditor = function () {
            //api.camera.setZoom('celestial');
            function fn() {
                api.camera.setMode('space');
            }
            setTimeout(fn, 350);
        };

        self.lastSceneUrl = ko.observable('coui://ui/main/game/live_game/live_game.html').extend({ session: 'last_scene_url' });

        self.navBack = function () {
            //if (self.planetUnderConstruction())
            //    return;

            if (self.saveDirty() && self.systemValid() && self.lastSavedSystemName() === self.systemName()) {
                self.showPopUP(true);
                self.popUpPrimaryMsg(loc("!LOC(system_editor:do_you_want_to_save_this_system.message):Do you want to save this system?"));
                self.popUpSecondaryMsg(loc("!LOC(system_editor:the_system_has_been_changed_since_it_was_last_saved.message):The system has been changed since it was last saved."));
                self.popUpPrimaryButtonAction = function () { self.showPopUP(false); self.saveSystem(); self.navBack(); };
                self.popUpSecondaryButtonAction = function () { self.showPopUP(false); self.saveDirty(false); self.navBack(); };
                self.popUpTertiaryButtonAction = function () { self.showPopUP(false); };
                self.popUpPrimaryButtonTag(loc('!LOC(system_editor:save_mixed_case.message):Save'));
                self.popUpSecondaryButtonTag(loc('!LOC(system_editor:discard.message):Discard'));
                self.popUpTertiaryButtonTag(loc('!LOC(system_editor:cancel.message):Cancel'));
            }
            else if (self.saveDirty() && self.systemValid()) {
                self.showPopUP(true);
                self.popUpPrimaryMsg(loc("!LOC(system_editor:do_you_want_to_save_this_system.message):Do you want to save this system?"));
                self.popUpSecondaryMsg(loc("!LOC(system_editor:the_system_has_not_been_saved.message):The system has not been saved."));
                self.popUpPrimaryButtonAction = function () { self.showPopUP(false); self.saveSystem(); self.navBack(); };
                self.popUpSecondaryButtonAction = function () { self.showPopUP(false); self.saveDirty(false); self.navBack(); };
                self.popUpTertiaryButtonAction = function () { self.showPopUP(false); };
                self.popUpPrimaryButtonTag(loc('!LOC(system_editor:save_mixed_case.message):Save'));
                self.popUpSecondaryButtonTag(loc('!LOC(system_editor:discard.message):Discard'));
                self.popUpTertiaryButtonTag(loc('!LOC(system_editor:cancel.message):Cancel'));
            }
            else {
                engine.call("reset_game_state");

                self.loadedPlanet({});
                self.loadedSystem({});

                if (self.lastSceneUrl()) {
                    engine.call('pop_mouse_constraint_flag');
                    window.location.href = self.lastSceneUrl();
                    return; /* window.location.href will not stop execution. */
                }
                else {
                    console.log('lastSceneUrl invalid');
                }
            }
        };

        var minimum_planet_size = 200;

        self.blueprint = function () {
            var bp = {};
            bp.seed = Number(self.seed());
            bp.radius = (self.radius()) ? Number(self.radius()) : Math.max(Number(self.radius()), minimum_planet_size);
            bp.heightRange = Number(self.heightRange());
            bp.biomeScale = Number(self.biomeScale());
            bp.waterHeight = Number(self.waterHeight());
            bp.temperature = Number(self.temperature());
            bp.metalDensity = Number(self.metalDensity());
            bp.metalClusters = Number(self.metalClusters());
            bp.biome = self.selectedBiome();
            return bp;
        }

        self.planetSpec = function () {
            var spec = {};
            spec.name = self.planetName();
            spec.mass = Number(self.mass());
            spec.radius = Number(self.radius());
            spec.velocity_x = Number(self.velocity_x());
            spec.velocity_y = Number(self.velocity_y());
            spec.position_x = Number(self.position_x());
            spec.position_y = Number(self.position_y());
            spec.required_thrust_to_move = Number(self.required_thrust_to_move());
            spec.starting_planet = Boolean(self.starting_planet() && self.selectedBiome() !== 'gas');
            spec.planet = self.blueprint();
            return spec;
        }

        self.update_planet = function () {
            self.planetUnderConstruction(true);

            function fn() {
                engine.call('execute', 'set_planet_offset', JSON.stringify({ x_offset: PLANET_X_OFFSET, y_offset: PLANET_Y_OFFSET }));
                engine.call('execute', 'update_planet', JSON.stringify(self.planetSpec()));
            }

            setTimeout(fn, 250);
        }

        self.update_planet_spec = function () {
            self.enforceInputRanges();

            engine.call('execute', 'update_planet_spec', JSON.stringify(self.planetSpec()));

            if (self.planetSpec().planet.biome === 'gas')
                self.update_planet();
        }

        self.update_planet_bp = function () {
            engine.call('execute', 'update_planet_bp', JSON.stringify(self.planetBP()));
        }

        self.savePlanet = function () {
            var a = self.planets();
            var b = self.planetSpec();

            var saved = false;
            for (var index in a) {
                if (a[index].name === b.name) {
                    a[index] = b;
                    saved = true;
                    break;
                }
            }
            if (!saved)
                a.push(b)

            self.loadedPlanet(b);
            self.planets(a);
        }

        self.saveSystem = function () {
            var a = self.systems();
            var b = self.system();

            b.name = self.systemName();

            var saved = false;
            for (var index in a) {
                if (a[index].name === b.name) {
                    a[index] = b;
                    saved = true;
                    break;
                }
            }
            if (!saved)
                a.push(b)

            self.systems(a);

            self.saveDirty(false);
            self.lastSavedSystemName(b.name);
        }

        self.valueRanges = {
            seed: { min: 0, max: 32767 },
            radius: { min: 100, max: 1300 },
            heightRange: { min: 0, max: 100 },
            biomeScale: { min: 0, max: 100 },
            waterHeight: { min: 0, max: 70 },
            temperature: { min: 0, max: 100 },
            metalDensity: { min: 0, max: 100 },
            metalClusters: { min: 0, max: 100 },
            mass: { min: 5000, max: 50000 }
        };

        self.bindSliders = function() {
            var bindSlider = function(name, id) {
                var slideFn = function(observable) {
                    return function(event, ui) {
                        observable(parseFloat(ui.value.toFixed()));
                        self.update_planet_spec();
                    };
                };
                return $('#slider_' + (id || name)).slider({
                    range: 'max',
                    min: self.valueRanges[name].min,
                    max: self.valueRanges[name].max,
                    value: self[name](),
                    slide: slideFn(self[name])
                });
            };
            self.sliders = {
                seed: bindSlider('seed'),
                radius: bindSlider('radius'),
                heightRange: bindSlider('heightRange', 'height_range'),
                biomeScale: bindSlider('biomeScale', 'biome_scale'),
                waterHeight: bindSlider('waterHeight', 'water_height'),
                temperature: bindSlider('temperature'),
                metalDensity: bindSlider('metalDensity', 'metal_density'),
                metalClusters: bindSlider('metalClusters', 'metal_clusters'),
                mass: bindSlider('mass')
            };
        };

        self.systemIsEmpty = ko.computed(function () {
            return !self.system() || !self.planetsInSystem();
        });

        self.systemRadiusIsTooSmall = ko.computed(function () {
            return self.radius() < self.valueRanges.min;
        });

        self.systemRadiusIsTooLarge = ko.computed(function () {
            return self.radius() > self.valueRanges.max;
        });

        self.systemHasNoStartingPlanet = ko.computed(function () {
            if (self.systemIsEmpty())
                return true;

            var has_start = _.any(self.system().planets, function (planet) {
                return planet.starting_planet && planet.biome !== 'gas';
            });
            return !has_start;
        });

        self.systemValid = ko.computed(function () {
            var invalid = self.systemIsEmpty() || self.systemRadiusIsTooSmall() || self.systemRadiusIsTooLarge() || self.systemHasNoStartingPlanet();
            return !invalid;
        });

        self.enforceInputRanges = function() {
            _.forIn(self.valueRanges, function(range, name) {
                var observable = self[name];
                var clamped = Math.max(range.min, Math.min(observable(), range.max));
                if (clamped !== observable())
                    observable(clamped);
            });
        };

        self.updateSliders = function() {
            if (!self.sliders)
                return;

            _.forIn(self.sliders, function(slider, name) {
                slider.slider('value', self[name]());
            });
        };

        self.setSliders = function () {
            var p = self.system().planets[self.selectedPlanetIndex()];

            if (!p)
                return;

            // Round to the nearest integer.  Slider values can come back as 0.99999.
            var fixNumber = function(n) { return parseFloat(n.toFixed()); };

            self.planetName(p.name);
            self.seed(fixNumber(p.planet.seed));
            self.radius(fixNumber(p.planet.radius));
            self.heightRange(fixNumber(p.planet.heightRange));
            self.biomeScale(fixNumber(p.planet.biomeScale));
            self.waterHeight(fixNumber(p.planet.waterHeight));
            self.temperature(fixNumber(p.planet.temperature));
            self.metalDensity(fixNumber(p.planet.metalDensity));
            self.metalClusters(fixNumber(p.planet.metalClusters));
            self.selectedBiome(p.planet.biome);

            self.mass(fixNumber(p.mass));
            self.position_x(p.position_x);
            self.position_y(p.position_y);
            self.velocity_x(p.velocity_x);
            self.velocity_y(p.velocity_y);
            self.required_thrust_to_move(p.required_thrust_to_move);
            self.starting_planet(p.starting_planet);

            var biomeJsonsObs = ko.observable().extend({ session: 'biome_jsons' });
            var biomeJsons = biomeJsonsObs();

            var checkBiomeJson = function() {
                var spec = biomeJsons[p.planet.biome];

                var radius_range = spec.radius_range;
                if (_.isEmpty(radius_range))
                    radius_range = [100, 1300];
                self.valueRanges.radius.min = radius_range[0];
                self.valueRanges.radius.max = radius_range[1];
                self.sliders.radius.slider('option', 'min', radius_range[0]);
                self.sliders.radius.slider('option', 'max', radius_range[1]);

                if (_.isBoolean(spec.enable_terrain) && spec.enable_terrain === false)
                {
                    self.sliders.heightRange.slider('disable');

                    // for now we are assuming an terrainless planet is featureless
                    self.sliders.metalDensity.slider('disable');
                    self.sliders.metalClusters.slider('disable');
                }
                else
                {
                    self.sliders.heightRange.slider('enable');
                    self.sliders.metalDensity.slider('enable');
                    self.sliders.metalClusters.slider('enable');
                }

                if (_.isEmpty(spec.water))
                {
                    self.sliders.waterHeight.slider('disable');
                }
                else
                {
                    self.sliders.waterHeight.slider('enable');
                }

                self.updateSliders();
                biomeJsonsObs(biomeJsons);
            };

            if (_.isEmpty(biomeJsons) || _.isEmpty(biomeJsons[p.planet.biome]))
            {
                if (_.isEmpty(biomeJsons))
                    biomeJsons = {};

                $.get('coui://pa/terrain/' + p.planet.biome + '.json').then( function(data) {
                    biomeJsons[p.planet.biome] = JSON.parse(data);
                    checkBiomeJson();
                });
            }
            else
                checkBiomeJson();
        }
        self.changeSelectedPlanet = function (index) {
            self.selectedPlanetIndex(index);
            if (typeof self.system().planets != "undefined" && self.system().planets.length > -1)
                self.setSliders();
        }
        /* the offsets for this are wrong. don't use it until they are fixed. */
        self.handleHideControls = function () {
            model.showControls(false);
            engine.call('execute', 'set_planet_offset', JSON.stringify({ x_offset: 0, y_offset: 0 }));
        }
        /* the offsets for this are wrong. don't use it until they are fixed. */
        self.handleShowControls = function () {
            model.showControls(true);
            engine.call('execute', 'set_planet_offset', JSON.stringify({ x_offset: PLANET_X_OFFSET, y_offset: PLANET_Y_OFFSET }));
        }
        self.toggleStellarGrid = function () {
            if (self.selectedMode() === self.modes()[1])
                engine.call('execute', 'toggle_stellar_grid', JSON.stringify({}));
        }

        self.new_planet_name = function () {
            api.game.getRandomPlanetName().then(function(name) {
                self.planetName(name);
                self.update_planet_spec();
            });
        }

        self.setStartingPlanet = function (index) {
            engine.call('execute', 'set_start_planet', JSON.stringify({index: index}));
        }

        self.issueCancel = function () {
            engine.call('execute', 'cancel', JSON.stringify({}));
        }

        self.loadPlanetCount = ko.observable(0);
        self.handleLoad = function () {
            if (!jQuery.isEmptyObject(self.loadedSystem())) {
                self.loadPlanetCount(self.loadedSystem().planets.length);

                self.systemName(self.loadedSystem().name)
                for (var i in self.loadedSystem().planets) {
                    self.addPlanet(self.loadedSystem().planets[i]);
                }

                self.saveDirty(false);
                self.lastSavedSystemName(self.systemName());
            }
            else if (!jQuery.isEmptyObject(self.loadedPlanet())) {
                self.loadPlanetCount(1);

                var planetSpec = self.loadedPlanet();
                planetSpec.position_x = 20000;
                planetSpec.position_y = 0;
                planetSpec.velocity_x = 0;
                planetSpec.velocity_y = 0;
                planetSpec.required_thrust_to_move = 0;
                self.addPlanet(planetSpec);
            }
        }

        self.loading = ko.observable(true);

        self.setup = function() {
            api.systemEditor.start();
            engine.call('execute', 'set_planet_offset', JSON.stringify({ x_offset: PLANET_X_OFFSET, y_offset: PLANET_Y_OFFSET }));

            //if (model.showNewPlanet())
            //    engine.call('request_random_planet_name');

            model.handleLoad();

            model.bindSliders();

            Mousetrap.bind('g', model.toggleStellarGrid);
            Mousetrap.bind('esc', model.issueCancel);

            modify_keybinds({ add: ['camera controls', 'camera'] });

            $('input').focus(function() { api.game.captureKeyboard(true); });
            $('input').blur(function() { api.game.releaseKeyboard(true); });
            api.game.releaseKeyboard(true);

            api.audio.setMusic('/Music/Music_Planet_Editor');

            api.Panel.query('uberbar', 'visible').then(function(showUberBar) {
                api.Panel.message('main', 'live_game_uberbar', { 'value': showUberBar });
            });

            // Pre-load planets
            var planets = self.buildBarDisplayList().slice(0);
            var preloadPlanet = function() {
                var planet = planets.pop();
                api.systemEditor.preloadPlanet(planet).then(function() {
                    if (planets.length)
                        _.delay(preloadPlanet, 100);
                    else
                        self.loading(false);
                });
            };
            _.delay(preloadPlanet, 100);
        };

        // Temporary handler for camera mouse button control binding
        // TODO: Update for holodeck use
        $('body').mousedown(function(mdevent) {
            if (mdevent.button === 1)
            {
                api.systemEditor.beginControlCamera();
                input.capture(this, function (event) {
                    var mouseDone = ((event.type === 'mouseup') && (mdevent.button === 1));
                    var escKey = ((event.type === 'keypress') && (event.keyCode === keyboard.esc));
                    if (mouseDone || escKey)
                    {
                        input.release();
                        api.systemEditor.endControlCamera();
                    }
                });
                mdevent.preventDefault();
                mdevent.stopPropagation();
                return;
            }
        });
    }

$(document).ready(function () {

    model = new SystemEditorViewModel();

    handlers = {};
    handlers.planets_are_ready =  function (payload) {
        model.planetUnderConstruction(false);
    };
    handlers.camera_type = function (payload) {
        if (payload.camera_type === "planet")
            model.selectedMode(model.modes()[0]);
        else if (payload.camera_type === "space")
            model.selectedMode(model.modes()[1]);
    };
    handlers.system_blueprint = function (payload) {
        // We receive one blueprint update per planet that we add while loading
        if (model.loadPlanetCount()) {
            model.loadPlanetCount(model.loadPlanetCount() - 1);
            if (model.loadPlanetCount())
                return;
        }
        var systemJson = JSON.stringify(payload.system);
        var oldString = model.currentSystemString();
        if (systemJson === oldString)
            return;
        var dirty = !!oldString || _.isEmpty(model.loadedSystem());
        model.currentSystemString(systemJson);
        model.system(new SystemModel(payload.system));
        model.setSliders();
        model.saveDirty(dirty);
    };
    handlers.selected_planet_index = function (payload) {
        model.changeSelectedPlanet(payload.index);
    };
    handlers.time = function (payload) {
        model.time(payload.current_time);
    };

    // inject per scene mods
    if (scene_mod_list['system_editor'])
        loadMods(scene_mod_list['system_editor']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    model.setup();
});

});
