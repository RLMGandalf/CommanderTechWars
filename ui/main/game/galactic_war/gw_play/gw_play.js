var model;
var handlers;

require([
    'shared/gw_common',
    'shared/gw_factions',
    'shared/popup',
    'shared/vecmath',
    'pages/gw_play/gw_referee',
    'pages/gw_play/gw_play_nebulae'
], function(
    GW,
    GWFactions,
    PopUp,
    VMath,
    GWReferee,
    nebulae
) {
    var exitGame = function() {
        window.location.href = 'coui://ui/main/game/galactic_war/gw_start/gw_start.html';
    };

    // Convenience function for setting up easeljs bitmaps
    // Parameters:
    //   url: image url (or image element).
    //   size: Array specifying image size. (length-2 array)
    //   scale: (optional) Uniform scale.
    //   color: (optional) Apply a color filter. (length-3 array, normalized color space)
    //   noCache: (optional) Don't apply caching.  (Incompatible with color.)
    function createBitmap(params) {
        if (!params.url)
            throw "No URL specified";
        if (!params.size)
            throw "No size specified";
        
        var result = new createjs.Bitmap(params.url);
        result.x = 0;
        result.y = 0;
        result.regX = params.size[0] / 2;
        result.regY = params.size[1] / 2;
        
        var scale = params.scale;
        if (scale !== undefined) {
            result.scaleX = scale;
            result.scaleY = scale;
        }
        
        var color = params.color;
        result.color = ko.observable();
        if (color) {
            if (params.noCache)
                throw "noCache incompatible with color";
            result.color(color);
            var updateFilters = function() {
                var color = result.color();
                result.filters = [];
                if (color)
                    result.filters.push(new createjs.ColorFilter(color[0],color[1],color[2],color.length >= 4 ? color[3] : 1));
            };
            updateFilters();
            result.color.subscribe(function() { 
                updateFilters();
                result.updateCache();
            });
        }

        if (params.alpha !== undefined)
            result.alpha = params.alpha;
        
        if (!params.noCache) {
            // Note: Extra pixel compensates for bad filtering on the edges
            result.cache(-1,-1, params.size[0] + 2, params.size[1] + 2);
            $(result.image).load(function() { result.updateCache(); });
        }
        return result;
    }
    
    function sortContainer(container) {
        container.sortChildren(function(a, b, options) {
            if (a.z === undefined) {
                if (b.z === undefined)
                    return 0;
                return -1;
            }
            else if (b.z === undefined) {
                return 1;
            }
            return a.z - b.z;
        });
    }
    
    var cheats = {
        noFog: ko.observable(false),
        jump: function(model, star) {
            var game = model.game();
            model.game().turnState('begin');
            model.player.moveTo(star, function(){
                game.currentStar(star);
            });
        },
        testCards: function(game) {
            loadScript("coui://ui/main/shared/js/ubernet.js");
            var loadedCatalog = $.Deferred();
            if (!extendedCatalog().length) {
                extendedCatalog.subscribe(function(newValue) {
                    if (newValue && newValue.length)
                        loadedCatalog.resolve();
                });
            }
            else
                loadedCatalog.resolve();
            
            var star = game.galaxy().stars()[game.currentStar()];
            require(['pages/gw_start/gw_dealer'], function(GWDealer) {
                GWDealer.allCards().then(function(cards) {
                    _.forEach(cards, function(card) {
                        if (card.id.startsWith('gwc_start')) {
                            console.log('Skipping start card', card.id);
                        }
                        else {
                            console.log('Dealing card', card.id);
                            GWDealer.dealCard({
                                id: card.id,
                                galaxy: game.galaxy(),
                                inventory: game.inventory(),
                                star: star
                            }).then(function(product, deal) {
                                if (product.id === 'gwc_minion') {
                                    // Minions tend to break things.
                                    require(['shared/gw_factions'], function(GWFactions) {
                                        _.forEach(GWFactions, function(faction) {
                                            _.forEach(faction.minions, function(minion) {
                                                var minionStock = _.cloneDeep(product);
                                                minionStock.minion = minion;
                                                console.log(' ', product.id, '%', deal && deal.chance, minionStock);
                                                game.inventory().cards.push(minionStock);
                                                game.inventory().cards.pop();
                                                if (!minionStock.minion.commander) {
                                                    // This will use the player's commander
                                                    return;
                                                }
                                                var catalogItem = _.find(extendedCatalog(), { ObjectName: minionStock.minion.commander.ObjectName });
                                                if (!catalogItem) {
                                                    console.error('Minion commander', minionStock.minion.commander.ObjectName, 'not found');
                                                }
                                                else if (catalogItem.UnitSpec !== minionStock.minion.commander.UnitSpec) {
                                                    console.error('Minion commander unitspec', minionStock.minion.commander.UnitSpec, 'invalid');
                                                }
                                            });
                                        });
                                    });
                                }
                                else {
                                    console.log(' ', product.id, '%', deal && deal.chance, product);
                                    game.inventory().cards.push(product)
                                    game.inventory().cards.pop();
                                }
                            });
                        }
                    });
                });
            });
        },
        giveCardId: ko.observable(''),
        giveCard: function(game) {
            var self = this;
            var star = game.galaxy().stars()[game.currentStar()];
            require(['pages/gw_start/gw_dealer'], function(GWDealer) {
                GWDealer.allCards().then(function(cards) {
                    var card = _.find(cards, {id: self.giveCardId()});
                    GWDealer.dealCard({
                        id: card.id,
                        galaxy: game.galaxy(),
                        inventory: game.inventory(),
                        star: star
                    }).then(function(product) {
                        game.inventory().cards.push(product);
                    });
                });
            });
        },
        loadGameText: ko.observable(''),
        loadGame: function(game) {
            var self = this;
            var newGameData;
            try {
                newGameData = JSON.parse(self.loadGameText());
            }
            catch (e) {
                // Load from server log
                var matched = /\] INFO Message from client .*\"gw\":(.*)},\"message_type\":\"set_config/.exec(self.loadGameText()).pop();
                newGameData = JSON.parse(matched);
            }
            newGameData.id = game.id;
            var newGame = new GW.Game();
            newGame.load(newGameData);
            GW.manifest.saveGame(newGame).then(function() {
                location.reload();
            });
        }
    };

    function SystemViewModel(init) {
        var self = this;
        
        var star = init.star;
        var stage = init.stage;
        var parent = init.galaxy;
        var index = init.index;

        // Initialize
        self.star = star;
        self.name = star.name;
        self.coordinates = star.coordinates;
        self.index = index;

        self.neighbors = ko.observableArray([]);
        self.biome = star.biome;
        self.stage = stage;

        self.visited = ko.computed(function() {
            return star.history().length > 0;
        });
        self.selected = ko.observable(false);

        var pos_v = VMath.v3_zero();
        var coordinates = VMath.copy(self.coordinates());
        self.pos = ko.computed(function() {
            parent.applyTransform(coordinates, pos_v);
            return pos_v;
        });

        self.name = ko.computed(function() { return star.system().name; });
        self.planets = ko.computed(function() { return star.system().planets; });
        self.description = ko.computed(function() { return star.system().description; });
        self.html = ko.computed(function() { return star.system().html; });

        // Set up display
        self.systemDisplay = new createjs.Container();
        ko.computed(function() {
            var p = self.pos();
            var scale = p[2];
            self.systemDisplay.scaleX = scale;
            self.systemDisplay.scaleY = scale;
        });

        self.origin = new createjs.Container();
        ko.computed(function() { 
            var newPos = self.pos();
            self.origin.x = newPos[0]; 
            self.origin.y = newPos[1]; 
            self.origin.z = newPos[2]; 
        });
        stage.addChild(self.origin);

        self.origin.addChild(self.systemDisplay);

        self.connected = ko.computed(function() {
            return self.visited() || _.some(self.neighbors(), function(neighbor) { return neighbor.visited(); });
        });
        self.connectTo = function(neighbor) {
            if (neighbor.index === self.index) 
                return;

            if (_.some(self.neighbors(), function(n) { return n.index === neighbor.index; })) 
                return;

            self.neighbors.push(neighbor);

            var shape = new createjs.Shape();
            ko.computed(function() {
                var p = self.pos();
                var n = neighbor.pos();
                var graphics = shape.graphics;
                graphics.clear();
                var selected = self.selected() || neighbor.selected();
                var isolated = !self.visited() && !neighbor.visited();
                if (isolated && !selected)
                    return;
                var green = self.visited() && neighbor.visited();
                var lineColor = green ? 'rgba(64, 210, 64,0.8)' : 'rgba(255,215,120,0.8)';
                if (selected && isolated)
                    lineColor = 'rgba(144,220,255,0.7)';
                graphics.ss(5).s(lineColor).moveTo(0, 0).lineTo((n[0] - p[0]) * 0.5, (n[1] - p[1]) * 0.5);
            });
            self.origin.addChildAt(shape,0);
        }

        var ownerIcon = createBitmap({
            url: "coui://ui/main/game/galactic_war/shared/img/owner.png",
            size: [240, 240],
            color: [1,1,1],
            scale: 0.7,
            alpha: 0.8
        });
        ownerIcon.visible = false;
        self.ownerColor = ko.observable();
        ko.computed(function() {
            ownerIcon.visible = (self.connected() && !!self.ownerColor()) || cheats.noFog();
            ownerIcon.color(self.ownerColor());
        });
        var scaleOwner = new createjs.Container();
        scaleOwner.addChild(ownerIcon);
        scaleOwner.z = 0;
        self.systemDisplay.addChild(scaleOwner);

        var icon = createBitmap({
            url: "coui://ui/main/game/galactic_war/gw_play/systems/star.png",
            size: [180,180]
        });
        icon.z = 1;
        self.systemDisplay.addChild(icon);

        self.click = ko.observable(0);
        self.systemDisplay.addEventListener("click", function() { self.click(self.click() + 1); });
        
        self.mouseOver = ko.observable(0);
        self.mouseOut = ko.observable(0);
        self.systemDisplay.addEventListener('rollover', function() { self.mouseOver(self.mouseOver() + 1); });
        self.systemDisplay.addEventListener('rollout', function() { self.mouseOut(self.mouseOver()); });
    }

    function CommanderViewModel(params) {
        var self = this;
        var game = params.game;
        var galaxy = params.galaxy;
        var star = params.star;
        var color = params.color;
        var player = params.player;
        var factionIndex = params.faction;
        var icon = params.icon;
        var iconColor = params.iconColor;

        self.dead = ko.observable(false);
        var isDead = function() { return self.dead(); };
        var scopeComputed = function(fn) {
            return ko.computed(fn, self, { disposeWhen : isDead });
        };

        self.color = ko.observable(color);

        var faction = GWFactions[factionIndex];
        
        var factionIcon = icon || faction.icon || ('coui://ui/main/game/galactic_war/shared/img/icon_faction_' + factionIndex.toString() + '.png');
        var iconColor = icon ? (iconColor || [1,1,1]) : color;
        
        self.iconScale = ko.observable(2);
        self.icon = createBitmap({
            url: factionIcon,
            size: [128,128],
            color: icon ? iconColor : color,
            scale: 0.5
        });
        self.icon.z = 0;
        self.container = new createjs.Container();
        self.container.z = Infinity;
        self.container.scaleX = self.iconScale();
        self.container.scaleY = self.iconScale();

        self.offset = new createjs.Container();
        self.offset.x = player ? -16 : 12;
        self.offset.y = player ? 9 : -19;
        
        self.container.addChild(self.offset);
        self.offset.addChild(self.icon);

        self.currentStar = ko.observable(star);
        self.currentSystem = scopeComputed(function() { 
            return galaxy.systems()[self.currentStar()]; 
        });
        scopeComputed(function() {
            var container = self.currentSystem().systemDisplay;
            container.addChild(self.container);
            sortContainer(container);
        });

        self.moveSpeed = ko.observable(0.1/(galaxy.radius() * 1000)); // Galactic Units/ms

        self.destination = ko.observable(game.currentStar());
        self.moving = scopeComputed(function() { 
            return self.destination() !== self.currentStar(); 
        });
        self.arrivalTime = ko.observable(0);
        self.departureTime = ko.observable(0);
        self.moveTo = function(newStar, done) {
            if (self.dead())
                return;

            var fromStar = game.galaxy().stars()[self.currentStar()];
            var toStar = game.galaxy().stars()[newStar];

            self.destination(newStar);

            var distance = VMath.distance_v2(fromStar.coordinates(), toStar.coordinates());
            self.departureTime(_.now());
            var time = distance / self.moveSpeed();
            self.arrivalTime(self.departureTime() + time);

            var trail = [];
            var TRAIL_LENGTH = 40;
            _.times(TRAIL_LENGTH, function(index) {
                var icon = createBitmap({
                    url: 'coui://ui/main/game/galactic_war/shared/img/selection.png',
                    size: [28,28],
                    scale: (1 - (index / TRAIL_LENGTH)) * 0.8 + 0.8,
                    color: color
                });
                icon.z = -index;
                icon.alpha = (1 - index / TRAIL_LENGTH) * 0.05 + 0.1;
                self.offset.addChild(icon);
                trail.push(icon);
            });
            sortContainer(self.offset);
            
            var TRAIL_DURATION = 100; // Measured in ms

            var curCoords_v = VMath.v3_zero();
            var curPos_v = VMath.v3_zero();
            var updateTransitPos = function() {
                if (self.dead())
                    return;
                var fromCoords = fromStar.coordinates();
                var toCoords = toStar.coordinates();
                var timeOffset = _.now() - self.departureTime();
                var progress = timeOffset / time;
                progress = Math.min(progress, 1.0);
                VMath.lerp_v3_s(fromCoords, toCoords, progress, curCoords_v);
                galaxy.applyTransform(curCoords_v, curPos_v);
                self.container.x = curPos_v[0];
                self.container.y = curPos_v[1];
                self.container.scaleX = curPos_v[2] * self.iconScale();
                self.container.scaleY = curPos_v[2] * self.iconScale();
                
                _.forEach(trail, function(t, index) { 
                    var progress = (timeOffset - (index / TRAIL_LENGTH) * TRAIL_DURATION) / time;
                    if ((progress < 0) || (progress > 1)) {
                        t.visible = false;
                        return;
                    }
                    t.visible = true;
                    VMath.lerp_v3_s(fromCoords, toCoords, progress, curCoords_v);
                    galaxy.applyTransform(curCoords_v, curPos_v);
                    t.x = (curPos_v[0] - self.container.x) / self.container.scaleX;
                    t.y = (curPos_v[1] - self.container.y) / self.container.scaleY;
                });
            };

            galaxy.stage.addChild(self.container);
            updateTransitPos();
            self.container.addEventListener('tick', updateTransitPos);
            // Arrive
            _.delay(function() {
                if (self.dead())
                    return;
                self.currentStar(newStar);
                self.container.x = 0;
                self.container.y = 0;
                self.container.scaleX = self.iconScale();
                self.container.scaleY = self.iconScale();
                self.container.removeAllEventListeners('tick');
                galaxy.sortStage();
                
                _.forEach(trail, function(t) {
                    self.offset.removeChild(t);
                });
                done();
            }, time + TRAIL_DURATION);
            _.delay(galaxy.sortStage);
        };

        self.shutdown = function() {
            if (self.container && self.container.parent)
                self.container.parent.removeChild(self.container);
            delete self.container;
            self.dead(true);
        };
    }

    function SelectionViewModel(config) {
        var self = this;
        
        var galaxy = config.galaxy;
        var hover = !!config.hover;
        var iconUrl = config.iconUrl;
        var color = config.color;
        
        if (!iconUrl) {
            if (hover)
                iconUrl = 'coui://ui/main/game/galactic_war/shared/img/hover.png';
            else
                iconUrl = 'coui://ui/main/game/galactic_war/shared/img/selection.png';
        }
        
        if (!color) {
            if (hover)
                color = [0.5, 0.9, 1];

            else
                color = [0, 0.8, 1];
        }
        
        self.visible = ko.observable(true);
        self.star = ko.observable(-1);
        self.system = ko.computed(function() { return self.star() >= 0 ? galaxy.systems()[self.star()] : undefined; });

        self.scale = new createjs.Container();
        self.scale.scaleY = 0.5;
        self.scale.z = -1;
        self.icon = createBitmap({
            url: iconUrl,
            size: [240,240],
            color: color
        });
        self.scale.addChild(self.icon);

        ko.computed(function() {
            var system = self.system();
            var visible = !!system && self.visible();
            if (hover && visible)
                visible = system.mouseOver() !== system.mouseOut();
            self.icon.visible = visible;
            if (self.icon.visible) {
                var container = system.systemDisplay;
                container.addChild(self.scale);
                sortContainer(container);
            }
            else {
                if (self.scale.parent)
                    self.scale.parent.removeChild(self.scale);
            }
        });

        if (!hover) {
            self.icon.addEventListener('tick', function() { 
                self.icon.rotation = (_.now() * 0.02) % 360;
            });

            self.system.subscribe(function(oldSystem) {
                if (oldSystem)
                    oldSystem.selected(false);
            }, null, 'beforeChange');
            self.system.subscribe(function() {
                var newSystem = self.system();
                if (newSystem)
                    newSystem.selected(true);
            });
        }
    }

    function GalaxyViewModel(data) {
        var self = this;

        self.systems = ko.observableArray();
        self.addSystem = function(star, index) {
            var result = new SystemViewModel({
                star: star, 
                stage: self.stage, 
                galaxy: self,
                index: index
            });
            self.systems.push(result);
            return result;
        }

        self.joinSystems = function(first, second) {
            if (first === second) return;
            self.systems()[first].connectTo(self.systems()[second], first < second);
            self.systems()[second].connectTo(self.systems()[first], second < first);
        }

        self.radius = ko.observable(_.max(data.radius()));

        self.canvasSize = ko.observable([0,0]);
        self.canvasWidth = ko.computed(function() { return self.canvasSize()[0]; });
        self.canvasHeight = ko.computed(function() { return self.canvasSize()[1]; });
        self.parallax = ko.observable([0,0]);
        self.galaxyTransform = ko.computed(function() {
            var galaxyScale = self.radius() * 6;
            var size = _.map(self.canvasSize(), function(s) { return s * galaxyScale; });

            var parallaxAmount = 0.1;
            var parallax = _.map(self.parallax(), function(p) { return p * parallaxAmount; });

            var aspectRatio = size[0] / size[1];
            aspectRatio /= 16 / 9; // Standard galaxy aspect ratio
            if (size[0] > size[1])
                size = [size[0] / aspectRatio, size[1]];
            else
                size = [size[0], size[1] * aspectRatio];

            var worldView = VMath.m4(
                1, 0, 0, 0,
                0, 0, 0, 0, // Flatten out Z
                0, 1, 0, 0,
                0, 0, 0, 1
            );

            var tilt = 1;
            var tiltMatrix = VMath.m4(
                1, 0, 0, 0,
                0, 1, tilt, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );

            var shrink = 0.5;
            var pinch = 0.25;
            var zScale = VMath.m4(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, shrink, shrink + 1,
                0, 0, -pinch, 1
            );
            var proj = VMath.m4_zero();

            VMath.concat_m4(zScale, tiltMatrix, proj);

            var worldViewProj = VMath.m4_zero();
            VMath.concat_m4(proj, worldView, worldViewProj);

            var scale = VMath.m4_scale4(size[0], size[1], 1, 1);
            var offset = VMath.m4_offset4(0.5, 0.5, 0, 1);
            var canvas = VMath.m4_zero();
            VMath.concat_m4(scale, offset, canvas);

            var parallaxMatrix = VMath.m4(
                1, 0, -parallax[0], 0,
                0, 1, -parallax[1], 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            var parallaxCanvas = VMath.m4_zero();
            VMath.concat_m4(parallaxMatrix, canvas, parallaxCanvas);

            var result = VMath.m4_identity();
            VMath.concat_m4(parallaxCanvas, worldViewProj, result);

            return result;
        });
        var applyTransform_temp_v = VMath.v4_zero();
        self.applyTransform = function(coordinates, result) {
            var canvasTransform = self.galaxyTransform();
            VMath.transform_m4_v3(canvasTransform, coordinates, applyTransform_temp_v);
            VMath.project_v4(applyTransform_temp_v, result);
        };

        self.stage = new createjs.Stage("galaxy-map");
        self.stage.enableMouseOver();

        var canvas = document.getElementById("galaxy-map");
        self.zoom = ko.observable(0.5);

        _.forEach(nebulae, function(nebulaSettings) {
            var nebula = createBitmap(_.extend({ nocache: true }, nebulaSettings));
            nebula.regX += nebulaSettings.offset[0];
            nebula.regY += nebulaSettings.offset[1];
            nebula.scaleX *= self.radius() * 6;
            nebula.scaleY *= self.radius() * 6;
            var nebulaCoords_v = VMath.v3(0, nebulaSettings.offset[2], 0);
            var nebulaPos_v = VMath.v3_zero();
 
            ko.computed(function() {
                self.applyTransform(nebulaCoords_v, nebulaPos_v);
                nebula.x = nebulaPos_v[0];
                nebula.y = nebulaPos_v[1] - self.radius() * 2000;
                nebula.z = nebulaPos_v[2] - 2; // bias to make them render behind everything else
            });
            self.stage.addChild(nebula);
        });

        canvas.addEventListener("mousewheel", MouseWheelHandler, false);
        canvas.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

        function MouseWheelHandler(e) {
            var zoomDelta;
            if(Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))>0)
                zoomDelta = 1.1;
            else
                zoomDelta = 1 / 1.1;
            var stage = self.stage;
            var oldZoom = self.zoom();
            var newZoom = Math.max(0.25, Math.min(oldZoom * zoomDelta, 1.5));
            zoomDelta = newZoom / oldZoom;

            stage.x = stage.mouseX + (stage.x - stage.mouseX) * zoomDelta;
            stage.y = stage.mouseY + (stage.y - stage.mouseY) * zoomDelta;
            self.stageOffset([stage.x, stage.y]);
            self.zoom(newZoom);
        }
        ko.computed(function() {
            var zoom = self.zoom();
            var stage = self.stage;

            stage.scaleX = zoom;
            stage.scaleY = zoom;
        });

        self.stageOffset = ko.observable([0,0]);
        $(canvas).mousedown(function(e) {
            e.preventDefault();
            var offset = {
                x : self.stage.x - e.pageX,
                y : self.stage.y - e.pageY
            };
            var moveStage = function(ev) {
                ev.preventDefault();
                self.stage.x = ev.pageX+offset.x;
                self.stage.y = ev.pageY+offset.y;
                self.stageOffset([self.stage.x, self.stage.y]);
            };
            $('body').mousemove(moveStage);
            var stopMoving = function() {
                $('body').off('mousemove', moveStage);
                $('body').off('mouseup', stopMoving);
            };
            $('body').mouseup(stopMoving);
        }); 

        _.forEach(data.stars(), self.addSystem);

        _.forEach(data.gates(), function(gate) {
            self.joinSystems(gate[0], gate[1]);
        });

        self.sortStage = function() {
            sortContainer(self.stage);
        };
        // Note: Systems don't current change their screen z values.
//        ko.computed(function() { 
//            // Mark the dependency on z values
//            _.forEach(self.systems(), function(system) { return system.pos()[2]; });
//            self.sortStage();
//        });
        self.sortStage();

        self.scrollTo = function(coords) {
            var canvasPos = VMath.v3_zero();
            self.applyTransform(coords, canvasPos);
            self.stage.x = self.canvasSize()[0] / 2 - (canvasPos[0] * self.stage.scaleX);
            self.stage.y = self.canvasSize()[1] / 2 - (canvasPos[1] * self.stage.scaleY);
            self.stageOffset([self.stage.x, self.stage.y]);
        };

        var updateStage = function () {
            if (model.showIntro())
                return;
            var w = self.stage.canvas.width;
            var h = self.stage.canvas.height;
            if (w !== self.canvasWidth() ||
                h !== self.canvasHeight()) {
                self.canvasSize([w, h]);
            }
            self.stage.update();
            window.requestAnimationFrame(updateStage);
        };
        window.requestAnimationFrame(function() {
            self.sortStage();
            updateStage();
        });

        self.restartUpdateLoop = function () {
            updateStage();
        };

    }

    function GameViewModel(game) {
        var self = this;

        // Local join configuration info
        self.isLocalGame = ko.observable().extend({ session: 'isLocalGame' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.offline = ko.observable().extend({ session: 'use_local_server' });
        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });
        self.mode = ko.observable(game.mode());
        self.creditsMode = ko.computed(function() {
            return self.mode() === 'credits';
        });

        self.cheats = cheats;
        
        cheats.noFog(self.creditsMode());

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });
        self.exitGate = ko.observable($.Deferred());
        self.exitGate().resolve();

        self.connectFailDestination = ko.observable().extend({ session: 'connect_fail_destination' });
        self.connectFailDestination('');

        self.resize = function() { 
            self.galaxy.canvasSize([$("#galaxy-map").width(),$("#galaxy-map").height()]);
        }

        PopUp.mixin(self, $('.popup-container'));

        self.exitGame = exitGame;

        self.abandonGame = function() {
            self.confirm('Are you sure you want to abandon this Galactic War?<br/><br/>All progress and Tech will be lost.', function() {
                GW.manifest.removeGame(game)
                    .then(exitGame);
            });
        };

        // TODO: Turn on/off with esc
        self.showSideBar = ko.observable(false);

        self.showSettings = ko.observable(false);
        self.showSettings.subscribe(function() {
            var show = self.showSettings();
            if (show) {
                api.panels.settings && api.panels.settings.focus();
            }
            else {
                api.Holodeck.refreshSettings();
            }
            _.delay(api.panels.settings.update);
        });

        self.menuSettings = function() {
            self.showSettings(true);
            self.showSidebar(false);
        };
        
        self.game = ko.observable(game);

        self.galaxy = new GalaxyViewModel(game.galaxy());

        var defaultPlayerColor = [ [210,50,44], [51,151,197] ];
        var rawPlayerColor = (game.inventory().getTag('global', 'playerColor') || defaultPlayerColor)[0];
        var playerColor = _.map(rawPlayerColor, function(c) { return c / 255; });
        var playerStar = game.currentStar();
        var playerFaction = game.inventory().getTag('global', 'playerFaction') || 0;

        self.player = new CommanderViewModel({
            game: game, 
            galaxy: self.galaxy, 
            star: playerStar, 
            color: playerColor, 
            player: true,
            faction: playerFaction
        });

        _.forEach(self.galaxy.systems(), function(system, star) {
            var bossModel;
            ko.computed(function() {
                var ai = system.star.ai();
                var boss;
                if (ai && ai.color) {
                    var normalizedColor = _.map(ai.color[0], function(c) { return c / 255; });
                    if (system.connected() || cheats.noFog()) {
                        boss = ai.boss;
                    }
                    system.ownerColor(normalizedColor.concat(3));
                }
                else {
                    if (!system.star.card()) {
                        system.ownerColor(self.player.color().concat(3));
                    }
                    else {
                        system.ownerColor(undefined);
                    }
                }
                if (boss && !bossModel) {
                    bossModel = new CommanderViewModel({
                        game: game,
                        galaxy: self.galaxy,
                        star: star,
                        color: normalizedColor,
                        player: false,
                        faction: ai.faction || 0,
                        icon: ai.icon,
                        iconColor: _.map(ai.iconColor, function(c) { return c / 255.0; })
                    });
                }
                else if (!boss && bossModel) {
                    bossModel.shutdown();
                    bossModel = undefined;
                }
            });
        });

        self.selection = new SelectionViewModel({
            galaxy: self.galaxy,
            hover: false
        });
        self.selection.star(game.currentStar());
        
        self.showSelectionPlanets = ko.computed(function () {
            return !self.creditsMode();
        });

        self.hoverSystem = new SelectionViewModel({
            galaxy: self.galaxy,
            hover: true
        });
        
        ko.computed(function() {
            self.hoverSystem.visible(self.selection.star() !== self.hoverSystem.star());
        });
        _.forEach(self.galaxy.systems(), function(system, star) {
            system.mouseOver.subscribe(function() {
                self.hoverSystem.star(star);
            });
        });
        
        self.battleConfig = ko.observable('').extend({ session: 'gw_battle_config' });

        self.currentStar = ko.computed(function() {
            return game.galaxy().stars()[game.currentStar()];
        });
        self.currentSystem = ko.computed(function() {
            return self.galaxy.systems()[game.currentStar()];
        });

        ko.computed(function() {
            var star = self.selection.star();
            if (star === undefined)
                return;

            var $anchor = $("#selected-system-anchor");

            var where = self.galaxy.systems()[star].pos();
            var offset = self.galaxy.stageOffset();
            var scale = self.galaxy.zoom();
            $anchor.css({
                left: (where[0] * scale + offset[0]) + 'px',
                top: (where[1] * scale + offset[1]) + 'px',
                width: (where[2] * scale) + 'px',
                height: (where[2] * scale) + 'px'
            });
        });

        var testGameState = function(options, def) {
            var curState = game.turnState();
            var result = options[curState];
            if (result === undefined)
                result = def;
            if (typeof(result) === 'function')
                result = result();
            return result;
        }

        self.launchingFight = ko.observable(false);
        self.fighting = ko.computed(function() {
            return testGameState({fight: true}, false);
        });
        self.canFight = ko.computed(function() {
            if (self.player.moving())
                return false;
            var isBegin = game.turnState() === GW.Game.turnStates.begin;
            return (isBegin || self.fighting() && !self.launchingFight()) && !!self.currentStar().ai();
        });
        self.displayFight = ko.computed(function() {
            return self.canFight() && self.selection.star() === game.currentStar();
        });
        self.canFight.subscribe(function(newValue) {
            if (!newValue)
                return;
            self.selection.star(game.currentStar());
        });

        self.scanning = ko.observable(false);
        self.exploring = ko.computed(function() {
            return testGameState({explore: true}, false);
        });
        self.canExplore = ko.computed(function() {
            if (self.player.moving() || self.scanning())
                return false;
            return testGameState({begin: function() { return !!self.currentStar().card() && !self.currentStar().ai(); }}, false);
        });
        self.displayExplore = ko.computed(function() {
            return self.canExplore() && self.selection.star() === game.currentStar();
        });
        self.canExplore.subscribe(function(newValue) {
            if (!newValue)
                return;
            self.selection.star(game.currentStar());
        });

        var canSelectOrMovePrefix = function() {
            return testGameState({
                begin: function() {
                    return !self.canExplore() && !self.canFight(); 
                },
                end: true
            }, false);
        };
        self.canSelect = function(star) {
            if (game.currentStar() === star)
                return true;
            if (!canSelectOrMovePrefix() && !cheats.noFog()) {
                return false;
            }
            return self.galaxy.systems()[star].connected() || cheats.noFog();
        };

        self.canMove = ko.computed(function() {
            if (self.player.moving())
                return false;

            var galaxy = game.galaxy();
            var from = game.currentStar();
            var to = self.selection.star();

            if ((to < 0) || (to > galaxy.stars().length))
                return false;

            if (!canSelectOrMovePrefix()) {
                return false;
            }
            if (from === to)
                return false;
            if (!galaxy.areNeighbors(from, to))
                return false;
            return true;
        });
        self.displayMove = ko.computed(function() {
            return self.canMove();
        });

        self.move = function() {
            var star = self.selection.star();
            var system = self.selection.system();
            self.player.moveTo(star, function() {
                var autoExplore = false;
                if (!system.visited()) {
                    self.revealSystem(system);
                    var newStar = system.star;
                    autoExplore = !newStar.ai() && !newStar.history().length && newStar.card();
                }
                game.move(star); 
                GW.manifest.saveGame(game);
                if (autoExplore)
                    self.explore();
            });
        };
        _.forEach(self.galaxy.systems(), function(system, star) {
            system.click.subscribe(function() { 
                if (self.canSelect(star))
                    self.selection.star(star); 
            });
        });

        self.rejectReason = ko.observable('');
        self.rejectReasonDesc = ko.observable('');
        self.rejectIsBad = ko.observable(true);
        self.canTakeCard = ko.computed(function() {
            var card = self.currentStar().card();
            var inventory = game.inventory();
            // Don't allow duplicates
            if (inventory.hasCard(card)) {
                self.rejectReason('!LOC(gw_play:duplicate_tech.message):Duplicate Tech');
                self.rejectReasonDesc('');
                self.rejectIsBad(false);
                return false;
            }
            // Limit allowed cards
            if (!inventory.canFitCard(card)) {
                self.rejectReason('!LOC(gw_play:data_banks_full.message):Data Banks Full');
                self.rejectReasonDesc('!LOC(gw_play:to_download_open_a_data_bank_by_deleting_an_undesired_tech.message):To download, open a data bank by deleting an undesired tech.');
                self.rejectIsBad(true);
                return false;
            }
            return true;
        });

        self.explore = function() {
            if (!game || !game.explore()) 
                return;
            GW.manifest.saveGame(game);
            var card = self.currentStar().card();
            var newCard = card && !game.inventory().hasCard(card);
            api.audio.playSound('/VO/Computer/gw/board_exploring');
            self.scanning(true);
            _.delay(function() {
                self.scanning(false);
                if (newCard) {
                    if (model.currentSystemCard().audio() && model.currentSystemCard().audio().found)
                        api.audio.playSound(model.currentSystemCard().audio().found);
                    else
                        api.audio.playSound('/VO/Computer/gw/board_tech_acquired');
                }
            }, 2000);
        };

        self.win = function() {
            self.exitGate($.Deferred());
            var oldSlots = game.inventory().maxCards() - game.inventory().cards().length;
            game.winTurn().then(function(didWin) {
                if (!didWin) {
                    console.error('Failed winning turn', game);
                    return;
                }
                
                self.maybePlayCaptureSound();
                var saving = GW.manifest.saveGame(game);
                if (saving) {
                    saving.then(function() {
                        if (self.gameOver()) {
                            api.tally.incStatInt('gw_war_victory').always(function() {
                                self.exitGate().resolve();
                            });
                        }
                        else {
                            self.exitGate().resolve();
                            _.delay(function() {
                                var newSlots = game.inventory().maxCards() - game.inventory().cards().length;
                                if (newSlots > oldSlots)
                                    api.audio.playSound('/VO/Computer/gw/board_slot_increased');
                            }, 500);
                        }
                    });
                }
            });
        };

        self.lose = function() {
            self.exitGate($.Deferred());
            if (game.loseTurn()) {
                $.when([
                    GW.manifest.saveGame(game),
                    api.tally.incStatInt('gw_war_loss')
                ]).then(function() {
                    self.exitGate().resolve();
                });
            }
            else
                self.exitGate().resolve();
        };

        self.fight = function(model, event, cheat) {
            if (self.launchingFight() || (!self.fighting() && !game.fight())) {
                return;
            }
            var save = GW.manifest.saveGame(game);

            if (cheat)
                return;

            self.launchingFight(true);
            api.audio.playSound('/VO/Computer/gw/board_initiating_battle');
            
            var hireReferee = GWReferee.hire(game);
            var liveGameScriptLoad = $.get('coui://ui/main/game/live_game/live_game.js');
            var liveGameScriptPatchLoad = $.get('coui://ui/main/game/galactic_war/gw_play/live_game_patch.js');
            
            $.when(
                save, 
                hireReferee,
                liveGameScriptLoad,
                liveGameScriptPatchLoad
            ).then(function(
                saveResult, 
                referee,
                liveGameScriptGet,
                liveGameScriptPatchGet
            ) {
                referee.localFiles({
                    '/ui/main/game/live_game/live_game.js': liveGameScriptGet[0] + liveGameScriptPatchGet[0]
                });
        
                referee.mountFiles();
                referee.tagGame();

                self.battleConfig(referee.config());

                // Come back if we fail.
                self.connectFailDestination(window.location.href);

                var local = self.offline() ? '&local=true' : '';
                window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html?action=start&mode=gw' + local;
            });
        };

        self.cards = ko.observableArray();
        self.hoverCard = ko.observable();
        self.hoverOffset = ko.observable(0);
        var hoverCount = 0;
        self.setHoverCard = function(card, hoverEvent) {
            if (card === self.hoverCard())
                card = undefined;
            
            ++hoverCount;
            if (!card) {
                // Delay clears for a bit to avoid flashing
                var oldCount = hoverCount;  
                _.delay(function() {
                    if (oldCount !== hoverCount)
                        return;
                    self.hoverCard(undefined);
                }, 300);
                return;
            }

            var $block = $(hoverEvent.target);
            if (!$block.is('.one-card'))
                $block = $block.parent('.one-card');
            var left = $block.offset().left + $block.width() / 2;
            self.hoverOffset(left.toString() + 'px');
            self.hoverCard(card);
        };
        self.discardHoverCard = function(card) {
            var discard = self.hoverCard();
            if (!discard)
                return;
            self.hoverCard(undefined);

            var discardIndex = self.cards().indexOf(discard);
            if (discardIndex >= 0) {
                game.inventory().cards.splice(discardIndex, 1);
                game.inventory().applyCards(function() {
                    GW.manifest.saveGame(game);
                });
            }
        };
        var updateCards = function() {
            var inventory = game.inventory();
            var cards = inventory.cards();
            var cardModels = self.cards();
            var numCards = inventory.maxCards();
            if (numCards < cardModels.length)
                self.cards.splice(numCards, cardModels.length);
            else {
                while (numCards > cardModels.length) {
                    self.cards.push(new CardViewModel(cards[cardModels.length]));
                }
            }

            _.forEach(cardModels, function(model, index) {
                var card = cards[index];
                if (!_.isEqual(card, model.params()))
                    model.params(card);
            });
        };
        // Note: The cards array in the inventory mutates multiple times when
        // some cards are received.  To avoid flashing of the inventory panel,
        // wait a little while before applying changes.
        var cardsDirty = false;
        var cardsChanged = function() {
            if (cardsDirty)
                return;
            cardsDirty = true;
            game.busy.then(function() {
                cardsDirty = false;
                updateCards();
            });
        };
        game.inventory().cards.subscribe(cardsChanged);
        game.inventory().maxCards.subscribe(cardsChanged);
        updateCards();

        self.currentSystemCard = ko.computed(function() {
            var card = self.currentStar().card();
            return card && new CardViewModel(card);
        });
        self.showSystemCard = ko.computed(function() {
            return self.exploring() && self.currentSystemCard() && !self.scanning();
        });

        self.inventoryOverflowLeft = ko.observable(false);
        self.inventoryOverflowRight = ko.observable(false);
        self.updateInventoryOverflow = function() {
            var $wrapper = $("#inventory .scroll-wrapper");
            var inventoryWidth = $wrapper.innerWidth();
            var containerWidth = $("#inventory .scroll-container").width();
            self.inventoryOverflowLeft($wrapper.scrollLeft() > 0);
            var scrollRight = containerWidth - ($wrapper.scrollLeft() + inventoryWidth);
            self.inventoryOverflowRight(scrollRight > 0);
        };
        self.cards.subscribe(self.updateInventoryOverflow);
        $(window).resize(self.updateInventoryOverflow);
        // Note: This ties the overflow state to the visibility of the cards.
        var computeInventoryOverflowBusy = false;
        ko.computed(function() {
            var cards = self.cards();
            var visible = _.reduce(cards, function(n, card) { return card.visible(); });
            if (!computeInventoryOverflowBusy) {
                computeInventoryOverflowBusy = true;
                _.delay(function() { 
                    self.updateInventoryOverflow(visible);
                    computeInventoryOverflowBusy = false;
                });
            }
        });

        self.gameOver = ko.computed(function() {
            if (game.gameState() === GW.Game.gameStates.lost)
                return true;
            if (game.gameState() !== GW.Game.gameStates.won)
                return false;
            if (game.turnState() !== GW.Game.turnStates.end)
                return false;
            return true;
        });

        // Default to being centered on the current star's connections
        self.centerOnPlayer = function() {
            var galaxy = game.galaxy();
            var home = game.currentStar();
            var coords = self.currentStar().coordinates();
            var bounds = [coords.slice(0), coords.slice(0)];
            _.forEach(galaxy.stars(), function(star, s) {
                if (s === home || !galaxy.areNeighbors(s, home))
                    return;
                var coords = star.coordinates();
                bounds[0][0] = Math.min(bounds[0][0], coords[0]);
                bounds[0][1] = Math.min(bounds[0][1], coords[1]);
                bounds[1][0] = Math.max(bounds[1][0], coords[0]);
                bounds[1][1] = Math.max(bounds[1][1], coords[1]);
            });

            var center = [
                (bounds[0][0] + bounds[1][0]) / 2,
                (bounds[0][1] + bounds[1][1]) / 2,
                0
            ];
            self.galaxy.scrollTo(center);
        };

        self.revealSystem = function(system) {
            var newNeighbors = _.filter(system.neighbors(), function(neighbor) { return !neighbor.connected(); });
            var newBoss = _.some(newNeighbors, function(neighbor) {
                return neighbor.star.ai() && neighbor.star.ai().boss;
            });
            if (newBoss)
                api.audio.playSound('/VO/Computer/gw/board_commander_factionleader_discovered');
            else if (system.star.ai() && !system.star.ai().boss)
                api.audio.playSound('/VO/Computer/gw/board_commander_discovered');
        };
       
        self.introVideoId = ko.observable('Tfg18BseBUY');
        self.showIntro = ko.observable();

        self.maybePlayCaptureSound = function() {
            if (self.currentStar().ai())
                return false;
            var history = self.currentStar().history();
            var last = history[history.length - 1];
            if (!last || !last.details || !last.details.win || !last.details.win.ai)
                return false;
            api.audio.playSound('/VO/Computer/gw/board_system_capture');
            return true;
        };
        self.playEntrySound = function() {
            if (self.showIntro()) {
                return; // Handled by video
            } else if (self.maybePlayCaptureSound())
                return;
            else {
                api.audio.playSound('/VO/Computer/gw/board_start_online');
            }
        }
        
        self.handleIntro = function() {
            var wasMusicPaused = $.Deferred();
            self.showIntro.subscribe(function (showIntro) {
                self.galaxy.restartUpdateLoop();
                if (showIntro === true) {
                    wasMusicPaused = api.audio.isMusicPaused();
                    api.audio.pauseMusic(true);
                    api.Panel.message(api.Panel.parentId, 'play_gw_intro');
                    return;
                }
                // Note: showIntro starts as undefined
                if (showIntro !== false)
                    return;
                $("#fade").fadeOut(1000);
                self.playEntrySound();
                wasMusicPaused.then(function(paused) {
                    api.audio.pauseMusic(paused);
                    wasMusicPaused = $.Deferred();
                });
                api.audio.setMusic('/Music/Music_GW_board');
            });
        };
        
        self.modalBack = function () {
            if (self.showIntro()) {
                self.showIntro(false);
                api.Panel.message(api.Panel.parentId, "finish_video");
            }
            else
                model.showSideBar(!model.showSideBar());
        }
        
        self.start = function() {
            // Set up resize event for window so we can update the canvas resolution
            $(window).resize(self.resize);
            self.resize();

            self.centerOnPlayer();

            ko.computed(function() {
                if (self.gameOver()) {
                    self.exitGate().then(function() {
                        window.location.href = 'coui://ui/main/game/galactic_war/gw_war_over/gw_war_over.html'; 
                    });
                }
            });
            if (!self.gameOver()) {
                self.handleIntro();
            }

            self.showIntro(self.game().stats().turns() === 1);
        };

        // Note: This is a fix for games that got into a situation where the
        // game explored a system it wasn't supposed to due to a bug that
        // has been fixed.  (Auto-scanning a system that didn't have a card.)
        if (self.exploring() && !self.currentStar().card()) {
            game.turnState('begin');
        }
    }

    // Start loading the game & document
    var activeGameId = ko.observable().extend({ local: 'gw_active_game'});
    var gameLoader = GW.manifest.loadGame(activeGameId());
    var documentLoader = $(document).ready();

    // We can start when both are ready
    $.when(
        gameLoader, 
        documentLoader
    ).then(function(
        game,
        $document
    ) {
        // If the game fails to load, going back is better than getting stuck.
        if (!game) {
            // TODO: Maybe tell the player what's up?
            console.error('Failed loading game');
            exitGame();
            return;
        }

        locAddNamespace('galactic_war');
        
        model = new GameViewModel(game);

        var firstMouse;
        $("body").mousemove(function(event) {
            var halfWidth = window.innerWidth / 2;
            var halfHeight = window.innerHeight / 2;        
            var pos = [event.pageX - halfWidth, event.pageY - halfHeight];
            if (!firstMouse) {
                // Use the first mouse movement as an origin to avoid popping.
                firstMouse = pos;
                return;
            }
            VMath._sub_v2(pos, firstMouse);
            model.galaxy.parallax(pos);
            // Smoothly reset the center of parallax to the origin.
            VMath._mul_v2_s(firstMouse, 0.9);
        });

        handlers = {};

        handlers['settings.exit'] = function() {
            model.showSettings(false);
        };        

        handlers['panel.invoke'] = function(params) {
            var fn = params[0];
            var args = params.slice(1);
            return model[fn] && model[fn].apply(model, args);
        };

        handlers.finish_video = function (payload) {
            model.showIntro(false);
        };

        api.Panel.message('uberbar', 'visible', { 'value': false });

       // inject per scene mods
        if (scene_mod_list['gw_play']) {
            loadMods(scene_mod_list['gw_play']);
        }

        // setup send/recv messages and signals
        app.registerWithCoherent(model, handlers);

        // Activates knockout.js
        ko.applyBindings(model);

        // Tell the model we're really, really here
        model.lastSceneUrl('coui://ui/main/game/galactic_war/gw_play/gw_play.html');
        
        model.start();
    });

});
