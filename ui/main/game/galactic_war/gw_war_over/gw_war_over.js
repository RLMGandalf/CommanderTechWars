var model;
var handlers;

require([
    'shared/gw_common',
    'shared/popup'
], function(
    GW,
    PopUp
) {

    function GameViewModel(game) {
        var self = this;

       // Click handler for back button
        self.back = function() {
            window.location.href = 'coui://ui/main/game/galactic_war/gw_start/gw_start.html';
        };

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        self.game = ko.observable(game);

        self.gameWon = ko.computed(function() {
            return self.game().gameState() == GW.Game.gameStates.won;
        });
        self.backdrop = ko.computed(function() {
            switch (self.game().gameState()) {
                case GW.Game.gameStates.won:
                    return 'victory_planet.png';
                    break;

                case GW.Game.gameStates.lost:
                    return 'loss_planet.png';
                    break;

            }
        });
        self.commander = ko.observable(self.game().inventory().tags().global.commander.ObjectName);
        self.commanderImage = ko.observable(getCatalogItem(self.commander()).ImgSource);
        
        self.techCards = ko.computed(function() {
            var inventory = self.game().inventory();
            return _.map(inventory.cards(), function(card) { return new CardViewModel(card); });;
        });
        
        self.trashCards = ko.computed(function() {
            var kept = _.map(self.techCards(), function(card) { return card.params(); });
            var stars = self.game().galaxy().stars();
            var all = _.filter(_.map(stars, function(star) { 
                if (star.card())
                    return;
                var cardTurn = _.find(star.history(), function(turn) {
                    return turn && turn.details && turn.details.win && turn.details.win.card;
                });
                return cardTurn && cardTurn.details.win.card;
            }));
            // Remove all the cards that were won & kept.
            // Also remove from the kept list so we keep the right number of them.
            var filtered = _.filter(all, function(card) {
                if (card.duplicate)
                    return card;
                var keptIndex = _.findIndex(kept, _.bind(_.isEqual, this, card));
                if (keptIndex < 0)
                    return card;
                kept.splice(keptIndex, 1);
            });
            return _.map(filtered, function(card) { return new CardViewModel(card); });
        });
                
        PopUp.mixin(self, $('.popup-container'));

        self.abandonGame = function() {
            self.confirm('Are you sure you want to abandon this Galactic War?', function() {
                GW.manifest.removeGame(game)
                    .then(function() {
                        self.back();
                    });
            });
        };

        self.start = function() {
            $(".primary_msg").show();

            if (model.gameWon()) {
                api.audio.setMusic('/Music/Music_GW_Win');
                api.audio.playSound('/VO/Computer/gw/endgame_win_all_gallactic_war');
            }
            else {
                api.audio.setMusic('/Music/Music_GW_Lose');
                api.audio.playSound('/VO/Computer/gw/endgame_lose');
            }
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

        model = new GameViewModel(game);

        handlers = {};

       // inject per scene mods
        if (scene_mod_list['gw_war_over']) {
            loadMods(scene_mod_list['gw_war_over']);
        }

        // setup send/recv messages and signals
        app.registerWithCoherent(model, handlers);

        // Activates knockout.js
        ko.applyBindings(model);

        // Tell the model we're really, really here
        model.lastSceneUrl('coui://ui/main/game/galactic_war/gw_war_over/gw_war_over.html');

        model.start();
    });
    
});
