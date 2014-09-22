define([
    'shared/GalaxyBuilder',
    'shared/gw_star',
    'main/shared/js/star_system_templates'
], function(
    GalaxyBuilder,
    GWStar,
    sst_dummy
) {
    var StarSystemTemplates = star_system_templates;

    var GWGalaxy = function() {
        var self = this;
        self.stars = ko.observableArray();
        self.gates = ko.observableArray();
        self.origin = ko.observable(0);
        self.radius = ko.observable([1,1]);

        var neighbors;
        self.areNeighbors = function(a, b) {
            var self = this;

            neighbors = neighbors || new Array(self.gates().length);
            var neighborSet = neighbors[a];
            if (!neighborSet) {
                neighborSet = {}
                neighbors[a] = neighborSet;
            }
            if (neighborSet[b] === undefined) {
                neighborSet[b] = _.some(self.gates(), function(g) {
                    return g[0] === a && g[1] === b || g[0] === b && g[1] === a;
                });
            }
            return neighborSet[b];
        };
        self.gates.subscribe(function() { neighbors = undefined; });
    };
    GWGalaxy.prototype = {
        load: function(config) {
            var self = this;
            config = config || {};
            self.stars(_.map(config.stars || [], function(star) {
                var result = new GWStar();
                result.load(star);
                return result;
            }));
            self.gates(config.gates || []);
            self.origin(config.origin || 0);
            self.radius(config.radius || [1,1]);
        },
        save: function() {
            return ko.toJS(this);
        },
        build: function(config) {
            var self = this;
            var config = config || {};

            var rng = new Math.seedrandom(config.seed || 0);

            var builder = new GalaxyBuilder(config);
            builder.build();

            // Re-normalize the stars
            var min = builder.stars[0].slice(0);
            var max = builder.stars[0].slice(0);
            _.forEach(builder.stars, function(star) {
                min[0] = Math.min(min[0], star[0]);
                min[1] = Math.min(min[1], star[1]);
                max[0] = Math.max(max[0], star[0]);
                max[1] = Math.max(max[1], star[1]);
            });
            var radius = [(max[0] - min[0]) / 2, (max[1] - min[1]) / 2];

            _.forEach(builder.stars, function(star, index) {
                builder.stars[index][0] = (star[0] - min[0]) / radius[0] - 1.0;
                builder.stars[index][1] = (star[1] - min[1]) / radius[1] - 1.0;
            });
            self.radius(radius);

            self.stars(_.map(builder.stars || [], function(star) {
                var result = new GWStar();
                result.coordinates(star.concat([rng()]));
                return result;
            }));
            self.gates(builder.reducedGraph.getEdges());

            var bestStar = 0;
            var bestDistance = Infinity;
            _.forEach(self.stars(), function(star, index) {
                var distance = star.coordinates()[0] + -star.coordinates()[1];
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestStar = index;
                }
            });
            self.origin(bestStar);

            var maxDist = 0;
            builder.reducedGraph.calcDistance(self.origin(), function(s, distance) {
                self.stars()[s].distance(distance);
                if (maxDist < distance)
                    maxDist = distance;
            });

            // Generate the planets, increasing the size based on the distance from the start.
            var starGenerators = _.map(self.stars(), function (star) {
                var starPct = star.distance() / maxDist;
                var plyrs = Math.floor(starPct * 2.25 + 2);
                return StarSystemTemplates.generate({
                        players: plyrs,
                        seed: rng() * rng()
                    })
                    .then( function(system) {
                        star.system(system);
                        star.name(system.name);
                        star.biome(system.planets[0].generator.biome);
                    });
            });

            self.difficultyIndex = config.difficultyIndex;
            
            return $.when.apply($, starGenerators).then(function() { return self; });
        }
    }
    return GWGalaxy;
});
