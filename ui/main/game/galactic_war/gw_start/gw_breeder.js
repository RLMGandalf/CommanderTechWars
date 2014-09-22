define([
    'shared/Graph',
], function(
    Graph
) {
    var GWBreeder = {
        populate: function(params) {
            var galaxy = params.galaxy;
            var spawn = params.spawn || function(star, ai) {};
            var spread = params.spread || function(star, ai) {};
            var canSpread = params.canSpread || function(star, ai) { return true; };
            var boost = params.boss || function(star, ai) {};
            var teams = (params.teams || []).slice();
            var aiCount = teams.length;
            var neutralStars = params.neutralStars || Math.floor(galaxy.stars().length / (aiCount + 1));
            var orderedSpawn = !!params.orderedSpawn;
            
            var graph = new Graph(galaxy.gates());
            var spawns = [];
            var origin = galaxy.origin();
            spawns.unshift(origin);
            _.times(aiCount, function() {
                var leaves = [];
                var maxDistance = 1;
                graph.calcDistance(spawns, function(star, distance) {
                    if (distance < maxDistance)
                        return; // If the distance calculator works breadth first (which it currently does), this shouldn't happen.
                    
                    if (distance > maxDistance) {
                        leaves.length = 0;
                        maxDistance = distance;
                    }
                    leaves.push(star);
                });
                if (!leaves.length) {
                    console.warn('Not enough stars to spawn AI');
                    return; 
                }
                
                // This chooses a leaf based on maximum manhattan distance from the
                // other spawns.  Right now, that appears to be overkill, and makes
                // the location of the bosses too predictable.
                
//                var maxDistance = 0;
//                var distantLeaf = leaves[0];
//                _.forEach(leaves, function(leaf) {
//                    var leafStar = game.galaxy().stars()[leaf];
//                    var distance = 0;
//                    _.forEach(spawns, function(spawn) {
//                        var spawnStar = game.galaxy().stars()[spawn];
//                        distance = distance + 
//                            Math.abs(spawnStar.coordinates()[0] - leafStar.coordinates()[0]) +
//                            Math.abs(spawnStar.coordinates()[1] - leafStar.coordinates()[1]);
//                    });
//                    if (distance > maxDistance) {
//                        distantLeaf = leaf;
//                        maxDistance = distance;
//                    }
//                })
//                var spawn = distantLeaf;

                var spawn = _.sample(leaves);
                spawns.push(spawn);
            });
            spawns.shift();
            // If we didn't get enough spawns, we need to update the ai count.
            aiCount = spawns.length;
            
            if (!orderedSpawn)
                spawns = _.shuffle(spawns);
            
            var doSpawn = $.when.apply($, _.map(spawns, function(starIndex, spawnIndex) { 
                var star = galaxy.stars()[starIndex];
                // TODO: More AI attributes
                var ai = {
                    commander: {
                        ObjectName: 'DeltaCommander',
                        UnitSpec: '/pa/units/commanders/imperial_delta/imperial_delta.json'
                    },
                    econ_rate: 1,
                    color: teams[spawnIndex].color,
                    team: spawnIndex
                };
                return $.when(spawn(star, ai)).then(function(spawnResult) {
                    star.ai(spawnResult || ai);
                    return star.ai();
                });
            }));
            var spread = doSpawn.then(function() {
                // Spread out.
                var spreadStars = galaxy.stars().length - (neutralStars + aiCount);
                var spreadQueues = _.map(spawns, function(spawn) { 
                    var queue = [];
                    // Sort the stars by distance from the spawns
                    graph.calcDistance(spawn, function(neighbor, distance) {
                        queue.push([neighbor, distance]);
                    });
                    return queue;
                });
                // Reverse them so we can use it as a stack (unshift sucks)
                _.invoke(spreadQueues, 'reverse');
                var origin = galaxy.origin();
                var emptyQueues = 0;
                var spreadOnce = function() {
                    // Spread out per queue
                    if ((spreadStars <= 0) || (emptyQueues >= spreadQueues.length))
                    {
                        return $.when(false);
                    }
                    return $.when.apply($, _.map(spreadQueues, function(queue, spawnIndex) {
                        if (!spreadStars)
                            return;
                        if (!queue.length)
                            return;

                        var starInfo = queue.pop();
                        var starIndex = starInfo[0];
                        if (!queue.length)
                            ++emptyQueues;

                        if (starIndex === origin)
                            return;

                        var star = galaxy.stars()[starIndex];
                        if (star.ai())
                            return;

                        var parent = galaxy.stars()[spawns[spawnIndex]].ai();
                        if (!canSpread(star, parent))
                            return;

                        var ai = _.cloneDeep(parent);
                        // console.log('team', spawnIndex, 'distance', starInfo[1], 'ai', ai);
                        return $.when(spread(star, ai)).then(function(spreadResult) {
                            star.ai(spreadResult || ai);
                            --spreadStars;
                            return star.ai();
                        });
                    })).then(function() {
                        return true;
                    });
                };
                var loop = function() {
                    return spreadOnce().then(function(result) {
                        return result ? loop() : $.when();
                    });
                };
                return loop();
            });
                
            var boost = spread.then(function() {
                // Turn up the special boss
                return $.when.apply($, _.map(spawns, function(starIndex) {
                    var star = galaxy.stars()[starIndex];
                    var ai = star.ai();
                    if (!ai)
                        return;
                    ai.boss = true;
                    return boost(star, ai);
                }));
            });
            
            return boost.then(function() {
                return params;
            });
        }
    };

    return GWBreeder;
});