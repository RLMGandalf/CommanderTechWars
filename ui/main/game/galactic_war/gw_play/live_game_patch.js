
(function() { 
    var patch = function(model, handlers) {
        var activeGameId = ko.observable().extend({ local: 'gw_active_game'});
        var abandonGame = function() {};
        var exitToPlay = 'coui://ui/main/game/galactic_war/gw_play/gw_play.html';
        var exitToStart = 'coui://ui/main/game/galactic_war/gw_start/gw_start.html';
        var exitDestination = ko.observable(exitToPlay);
        
        $.getScript('coui://ui/main/game/galactic_war/shared/js/gw_common.js').then(function() {
            require(['shared/gw_common'], function(GW) {
                var gameLoader = GW.manifest.loadGame(activeGameId());
                gameLoader.then(function(game) {
                    abandonGame = function(doExit) {
                        exitDestination(exitToStart);
                        GW.manifest.removeGame(game)
                            .then(doExit);
                    };
                });
            });
        });

        var oldNavToMainMenu = model.navToMainMenu;
        model.navToMainMenu = function() {
            if (model.gameOver()) {
                model.mainMenuUrl(exitDestination());
                oldNavToMainMenu();
            }
            else {
                abandonGame(oldNavToMainMenu);
            }
        };

        var menuExitToWar = function(settings) {
            var popup = model.gameOver() ? $.when(0) : model.popUp(settings);
            popup.then(function(result) {
                if (result === 0)
                    model.navToMainMenu();
            });
        }
        model.menuAbandonWar = function() {
            menuExitToWar({ 
                message: 'Are you sure you want to abandon this Galactic War?<br>(All progress and Tech will be lost.)' 
            });
        };
        model.menuReturnToWar = function() {
            menuExitToWar({ 
                message: 'Return to Galactic War?'
            });
        };
        
        ko.computed(function() {
            model.menuConfig([
                {
                    label: 'Pause Game',
                    action: 'menuPauseGame'
                },
                {
                    label: 'Chrono Cam',
                    action: 'menuToggleChronoCam'
                },
                {
                    label: 'Game Settings',
                    action: 'menuSettings'
                },
                {
                    label: model.gameOver() ? 'Return To War' : 'Abandon War',
                    action: model.gameOver() ? 'menuReturnToWar' : 'menuAbandonWar',
                    game_over: 'RETURN TO WAR'
                },
                {
                    label: 'Quit',
                    action: 'menuExit'
                }
            ]);
        });
        
        var hookTransit = function () {
            model.transitSecondaryMessage('Returning to Galactic War');
            model.transitDestination(exitDestination());
        };
        handlers.sim_terminated = _.compose(hookTransit, handlers.sim_terminated);
        handlers.connection_disconnected = _.compose(hookTransit, handlers.connection_disconnected);
    }
    
    var oldRegister = app.registerWithCoherent;
    app.registerWithCoherent = function(model, handlers) {
        patch(model, handlers);
        oldRegister.apply(this, arguments);
    }
})()
