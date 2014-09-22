define([], function() {
    var patches = [
        // 0 = Fix bad start card tags
        function(game) {
            var tags = game.inventory().tags();
            var deleteMe = [];
            _.forIn(tags, function(value, context) {
                if (context.startsWith('gwc_start')) {
                    deleteMe.push(context);
                }
            });
            _.forEach(deleteMe, function(badContext) {
                delete tags[badContext];
            });
            game.inventory().applyCards();
        }
    ];
    
    return {
        patch: function(game, targetVersion) {
            while (game.version() !== targetVersion) {
                var version = game.version() || 0;
                var patch = patches[version];
                if (patch) {
                    patch(game);
                    game.version(version + 1);
                }
                else {
                    console.error("Patch not found for version", game.version());
                    break;
                }
            }
        }
    };
});
