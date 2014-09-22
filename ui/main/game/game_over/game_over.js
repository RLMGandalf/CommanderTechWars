var model;
var handlers = {};

$(document).ready(function () {
    
    // This page can only be a pop-up of live_game
    if (api.Panel.pageName === 'game') {
        window.location.href = 'coui://ui/main/game/live_game/live_game.html';
        return;
    }
    
    function parentInvoke() {
        api.Panel.message(api.Panel.parentId, 'panel.invoke', Array.prototype.slice.call(arguments, 0));
    }

    function parentQuery() {
        return api.Panel.query(api.Panel.parentId, 'panel.invoke', Array.prototype.slice.call(arguments, 0));
    }
    
    function MenuButtonModel(params) {
        var self = this;
        
        self.label = ko.observable(params.game_over);
        self.action = ko.observable(params.action);
        self.click = function() {
            parentInvoke(self.action());
        };
    }
    
    function GameOverViewModel() {
        var self = this;

        self.state = ko.observable({});
        self.show = ko.computed(function() { return !!self.state().show; });
        self.gameOver = ko.computed(function() { return !!self.state().game_over; });
        self.autoShow = ko.computed(function() { return !!self.state().auto_show; });
        self.open = ko.computed(function() { return !!self.state().open; });
        self.record = ko.computed(function() { return !!self.state().record; });

        self.draw = ko.observable(false);
        self.endOfTimeInSeconds = ko.observable(0);
        
        self.recordToken = ko.observable(0);
        self.recorded = ko.observable(false);
        
        self.hideDefeated = ko.observable(false);
        self.defeated = ko.computed(function () {
            if (self.hideDefeated())
                return false;

            return self.open() || (self.state().defeated && !self.gameOver()); 
        });
        
        self.menuButtons = ko.observableArray();

        self.stats = ko.observable(/* {} */);

        self.displayName = ko.observable();
        self.armyIndex = ko.observable();

        self.game_over_msg = ko.observable('');

        self.defeatTime = ko.observable(0);
        self.defeated.subscribe(function (value) {
            if (value)
                self.defeatTime(_.now());
        });

        var hasPlayedWinLoseVO = false;

        self.victors = ko.observableArray([]);
        self.playerIsWinner = ko.observable(false);

        self.showPlayerDefeated = ko.computed(function () {
            var result = self.defeated() && !self.playerIsWinner();
            return result;
        });

        var endGameVORule = ko.computed(function () {

            var defeated = self.showPlayerDefeated(),
                winner = self.playerIsWinner(),
                show = self.show();

            if (show && !hasPlayedWinLoseVO) {
                if (winner) {
                    _.delay(function () { api.audio.playSoundAtLocation('/VO/Computer/endgame_win') }, 1000);
                    hasPlayedWinLoseVO = true;
                }
                else if (defeated) {
                    _.delay(function () { api.audio.playSoundAtLocation('/VO/Computer/endgame_lose') }, 1000)
                    hasPlayedWinLoseVO = true;
                }
            }
        });

        self.spectating = ko.computed(function () { return !self.defeated() && !self.playerIsWinner() });
     
        self.connected = ko.observable(false);

        self.formatedRateString = function (number, showSign) {
            var formats = [{ postfix: '', divisor: 1 },
                           { postfix: 'K', divisor: 1000 },
                           { postfix: 'M', divisor: 1000000 },
                           { postfix: 'G', divisor: 1000000000 },
                           { postfix: 'T', divisor: 1000000000000 }];

            number = Math.floor(number);
            if (number === 0)
                return '0';
            var numDigits = String(Math.abs(number)).length;
            var format = formats[Math.floor((numDigits - 1) / 3)];
            
            number = format.postfix ? (number / format.divisor).toFixed(1) : number / format.divisor;
            number = (number > 0) ? '+' + number + format.postfix : '' + number + format.postfix;
            return showSign ? number : number.slice(1);
        };

        self.navToMainMenu = function () {
            api.Panel.message(api.Panel.parentId, 'game_over.nav', {
                url: 'coui://ui/main/game/start/start.html',
                disconnect: true
            });
        };

        var hasPlayedNavVO = false;

        self.navToReview = function () {
            api.Panel.message('players', 'set_pin_state', true);
            if (self.gameOver()) {
                api.Panel.message(api.Panel.parentId, 'panel.invoke', ['controlTime']);
                if (!hasPlayedNavVO) {
                    api.audio.playSoundAtLocation('/VO/Computer/cronocam_on');
                    hasPlayedNavVO = true;
                }
            }
            else {
                if (!hasPlayedNavVO) {
                    api.audio.playSoundAtLocation('/VO/Computer/spectator_mode_enter');
                    hasPlayedNavVO = true;
                }
            }
            api.Panel.message(api.Panel.parentId, 'game_over.review');
            api.Panel.message(api.Panel.parentId, 'panel.invoke', ['showGameOverOnStatsClose', false]);
        };

        self.navToReviewStats = function () {
            api.Panel.message(api.Panel.parentId, 'panel.invoke', ['setStatsPanelState', true]);
            api.Panel.message(api.Panel.parentId, 'panel.invoke', ['showGameOverOnStatsClose', true]);
            api.Panel.message(api.Panel.parentId, 'game_over.review');
        };

        var hasShownWinnerStats = false;

        self.requestVictorsSummary = function () {
            api.Panel.query('gamestats', 'query.victors_summary', self.victors())
                .then(function (payload) {
                    hasShownWinnerStats = true;
                    self.promptShowWinnerInfo(false);
                    self.hideDefeated(true);
                    self.stats(payload);
                });
        };

        self.promptShowWinnerInfo = ko.observable(false);
        self.showPromtWinnerInfoAsButton = ko.observable(false);
        
        self.recordResults = function() {
            self.recorded(true);
            if (!self.spectating()) {
                api.tally.incStatInt('game_played');
                if (self.playerIsWinner())
                    api.tally.incStatInt('game_victory');
                else if (self.defeated())
                    api.tally.incStatInt('game_loss');
            }
            
            var gameTime = self.endOfTimeInSeconds();
            if (!self.spectating()) {
                api.tally.incStatFloat('game_play_time', gameTime);
                api.tally.updateStatAvg('game_play_avg_time', gameTime, 1);
                if (self.playerIsWinner())
                    api.tally.updateStatAvg('game_victory_avg_time', gameTime, 1);
                else if (self.defeated())
                    api.tally.updateStatAvg('game_loss_avg_time', gameTime, 1);
            }
        };

        var showWinnerStatsRule = ko.computed(function () {
            var game_over = self.gameOver(),
                winner = self.playerIsWinner(),
                show = self.show(),
                just_ended = _.now() - self.defeatTime() < 2000,
                not_playing = game_over && !winner && !self.defeated();

            if (self.promptShowWinnerInfo() || not_playing)
                return;

            if (game_over && !winner && !hasShownWinnerStats) {
                self.promptShowWinnerInfo(true);
                self.showPromtWinnerInfoAsButton(just_ended || !!self.show());
            }
        });
        
        ko.computed(function() {
            var stats = self.stats();
            var show = self.show();
            var gameOver = self.gameOver();
            var open = self.open();
            var defeated = self.defeated();
            var record = self.record();
            var recorded = self.recorded();

            if (!stats) {
                if (gameOver && !open && defeated)
                    return;
            }
            
            var spectating = self.spectating();
            var autoShow = self.autoShow();
            
            if (autoShow && show) {
                parentInvoke('showGameOver', show);
            }
            
            if (record && !recorded) {
                var recordToken = self.recordToken() + 1;
                self.recordToken(recordToken);
                // Wait a bit before recording to give delayed results an opportunity to settle before recording
                _.delay(function() {
                    if (self.recordToken() !== recordToken)
                        return;
                    parentInvoke('recordGameOver', false);
                    self.recordResults();
                }, 1000);
            }
        });

        var hasPlayerStats = false;
        var hasVictorStats = false;
        var requestStatsPending = false;

        var requestStatsRuleFunction = function () {
            var game_over = self.gameOver(),
                winner = self.playerIsWinner(),
                defeated = self.defeated(),
                spectating = self.spectating(),
                not_playing = game_over && !winner && !defeated;

            if (requestStatsPending)
                return;

            console.log('requestStatsRule');
            if (!hasPlayerStats)
                if (defeated || winner) {
                    requestStatsPending = true;
                    api.Panel.query('gamestats', 'query.player_summary', [self.armyIndex()])
                        .then(function (stats) {
                            requestStatsPending = false;

                            if (stats) {
                                console.log('players stats for: ' + self.armyIndex());
                                console.log(stats);
                                self.stats(stats);
                                hasPlayerStats = true;

                                if (winner)
                                    hasVictorStats = true;
                            }
                            else {
                                console.log('bad stats for: ' + self.armyIndex());
                                _.defer(requestStatsRuleFunction); /* request the stats again */
                            }
                        });
                }

            if (!hasVictorStats)
                if (not_playing || (game_over && spectating && !open)) {
                    requestStatsPending = true;
                    api.Panel.query('gamestats', 'query.victors_summary', self.victors())
                        .then(function (stats) {
                            requestStatsPending = false;

                            if (stats) {
                                console.log('victor stats for: ' + JSON.stringify(self.victors()));
                                console.log(stats);
                                self.stats(stats);

                                hasPlayerStats = true;
                                hasVictorStats = true;
                            }
                            else {
                                console.log('bad stats for: ' + JSON.stringify(self.victors()));
                                _.defer(requestStatsRuleFunction); /* request the stats again */
                            }
                        });
                }

        }
        self.requestStatsRule = ko.computed(requestStatsRuleFunction);
        
        self.setup = function() {
            parentQuery('gameOverState').then(function(state) { self.state(state); });
            parentQuery('playerName').then(function(name) { self.displayName(name); });
            parentQuery('originalArmyIndex').then(function (value) { self.armyIndex(value); });
            
            parentQuery('menuConfig').then(function(menu) {
                var menuButtons = _.map(_.filter(menu, 'game_over'), function(button) {
                    return new MenuButtonModel(button);
                });
                self.menuButtons(menuButtons);
            });
        };
    }
    
    model = new GameOverViewModel();
    
    handlers.connection_disconnected = function() {
        model.connected(false);
    };
    
    handlers.server_state = function (msg) {
        if (!msg.state.endsWith('game_over'))
            return;

        var gameOverMsg;
        var gameOverText;
        var numWinners;

        if (msg.data)
        {
            model.connected(true);
            console.log(msg.data);
            model.playerIsWinner(!!msg.data.client.winner);
            model.draw(false);
   
            gameOverMsg = msg.data.game_over;
            gameOverText = "";
            if (gameOverMsg && gameOverMsg.victor_name) {
                numWinners = gameOverMsg.victor_players.length;
                gameOverText = (numWinners > 1 ? loc("!LOC(game_over:winners.message):Winners:") : loc("!LOC(game_over:winner.message):Winner:")) + " ";
                if (numWinners) {
                    gameOverText += gameOverMsg.victor_players.join(", ");
                    model.victors(gameOverMsg.victor_players);
                }
                else {
                    gameOverText += gameOverMsg.victor_name;
                    model.victors([gameOverMsg.victor_name]);
                }
            }
            else {
                model.draw(true);
                gameOverText = loc("!LOC(game_over:draw.message):DRAW");
            }
            model.game_over_msg(gameOverText);
        }
    };

    handlers.state = function (payload) {
        model.state(payload);
        console.log(payload);
    };

    handlers.time = function (payload) {
        model.endOfTimeInSeconds(payload.end_time);
    };
    
    // inject per scene mods
    if (scene_mod_list['game_over'])
        loadMods(scene_mod_list['game_over']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    model.setup();

    app.hello(handlers.server_state, handlers.connection_disconnected);
});
