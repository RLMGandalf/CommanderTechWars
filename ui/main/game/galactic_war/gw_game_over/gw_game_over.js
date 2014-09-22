var model;
var handlers = {};

require(['shared/gw_common'], function(GW) {

    function GameOverViewModel(game) {
        var self = this;

        self.game = ko.observable(game);
        
        self.win = function() {
            var game = self.game();
            return game && game.winTurn().then(function() {
                return GW.manifest.saveGame(game);
            });
        };
        
        self.lose = function() {
            var game = self.game();
            if (game && game.loseTurn()) {
                return GW.manifest.saveGame(game);
            }
            return;
        };
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
        locAddNamespace('galactic_war');

        model = new GameOverViewModel(game);

        handlers.server_state = function (msg) {
            if (msg.url && msg.url !== window.location.href)
                return;
            else if (msg.data)
            {
                var complete;
                if (msg.data.client) {
                    if (msg.data.client.winner)
                        complete = model.win();
                    else if (msg.data.client.loser)
                        complete = model.lose();
                }
                $.when(complete).then(function() {
                    window.location.href = "coui://ui/main/game/game_over/game_over.html";
                });
            }
        };

        // inject per scene mods
        if (scene_mod_list['gw_game_over'])
            loadMods(scene_mod_list['gw_game_over']);

        // setup send/recv messages and signals
        app.registerWithCoherent(model, handlers);

        // Activates knockout.js
        ko.applyBindings(model);

        app.hello(handlers.server_state, handlers.connection_disconnected);
    });

});