var model;
var handlers;

loadScript("coui://ui/main/shared/js/ubernet.js");

require([
    'shared/gw_common',
    'shared/gw_game',
    'shared/gw_credits',
    'shared/gw_factions',
    'shared/gw_factions_credits',
    'pages/gw_start/gw_breeder',
    'pages/gw_start/gw_dealer',
    'pages/gw_start/gw_teams'
], function(
    GW,
    GWGame,
    GWCredits,
    GWFactions,
    GWFactionsCredits,
    GWBreeder,
    GWDealer,
    GWTeams
) {

// TODO: It would be nice if this was shared with the server's color table
var colorTable = [
    [ [210,50,44], [51,151,197] ],
    [ [206,51,122], [51,151,197] ],
    [ [113,52,165], [219,217,37] ],
    [ [59,54,182], [219,217,37] ],
    [ [51,151,197], [219,217,37] ],
    [ [83,119,48], [206,51,122] ],
    [ [219,217,37], [113,52,165] ],
    [ [142,107,68], [59,54,182] ],
    [ [255,144,47], [59,54,182] ],
    [ [200,200,200], [210,50,44] ]
];

// These are the start cards.
var startCards = [
    { id: 'gwc_start_vehicle' },
    { id: 'gwc_start_air' },
    { id: 'gwc_start_orbital' },
    { id: 'gwc_start_bot' },
    { id: 'gwc_start_artillery' },
    { id: 'gwc_start_subcdr' },
    { id: 'gwc_start_combatcdr' },
    { id: 'gwc_start_allfactory' },
];

$(document).ready(function () {
    locAddNamespace('galactic_war');

    // Needed to reset the music when returning to this screen from the play screen
    api.audio.setMusic('/Music/Main_Menu_Music');

    function UnknownCardViewModel(cardData) {
        var self = this;

        self.id = ko.computed(function() { });
        self.icon = ko.observable();
        self.description = ko.observable('');
        self.activate = function() {};
        self.active = ko.observable(false)
        self.btnClass = ko.observable('btn_std');

        var actualCard = new CardViewModel(cardData);
        actualCard.card.then(function(card) {
            if (!card.hint)
                return;
            var hint = card.hint(cardData);
            self.icon(hint.icon);
            self.description(hint.description || '');
        });
    }

    function GameViewModel() {
        var self = this;

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.offline = ko.observable().extend({ session: 'offline' });
        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.mode = ko.observable($.url().param('mode') || '');
        self.devMode = ko.observable().extend({ session: 'dev_mode' });
        self.creditsMode = ko.computed(function() {
            return self.mode() === 'credits';
        });
        
        self.title = ko.computed(function() {
            return self.mode() || 'Galactic War';
        });

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('');
        self.containerWidth = ko.observable('');
        self.contentWrapperHeight = ko.observable('');

        self.activeGames = ko.computed(function() {
            return _.filter(GW.manifest.games(), function(game) { return game.state === GWGame.gameStates.active; });
        });
        self.showActiveGames = ko.computed(function() {
            return !self.creditsMode();
        });
        self.archivedGames = ko.computed(function() {
            return _.filter(GW.manifest.games(), function(game) { return game.state !== GWGame.gameStates.active; });
        });
        self.showArchivedGames = ko.computed(function() {
            return !self.creditsMode();
        });
        
        self.showNewGame = ko.computed(function() {
            return !self.creditsMode();
        });
        
        self.showTabs = ko.computed(function() {
            return self.showActiveGames() || self.showArchivedGames() || self.showNewGame();
        });
        self.noTabs = ko.computed(function() {
            return !self.showTabs();
        });

       // Click handler for back button
        self.back = function() {
            window.location.href = 'coui://ui/main/game/start/start.html';
        };

        self.navFunction = ko.observable(self.activeGames().length > 0 ? 'active' : 'new');
        self.navGameList = ko.computed(function() {
            if (self.navFunction() === 'active')
                return self.activeGames();
            else if (self.navFunction() === 'archived')
                return self.archivedGames();
            else
                return [];
        });
        self.activeTabActive = ko.computed(function() { return self.navFunction() === 'active'; });
        self.archivedTabActive = ko.computed(function() { return self.navFunction() === 'archived'; });
        self.newTabActive = ko.computed(function() { return !self.activeTabActive() && !self.archivedTabActive(); });

        self.activeGame = ko.observable(self.navGameList()[0]);
        self.activeGameId = ko.observable().extend({ local: 'gw_active_game'});
        ko.computed(function(game) {
            var game = self.activeGame();
            self.activeGameId(game && game.id);
        });

        self.abandonGame = function () {
            GW.manifest.removeGame(self.activeGame());
        }

        self.navFunction.subscribe(function() {
            self.activeGame(self.navGameList()[0]);
        });

        self.navToGame = function() {
            switch (self.navFunction()) {
                case 'active':
                case 'archived':
                    self.navToGwGame();
                    break;
                case 'new':
                    self.navToNewGame();
                    break;
            }
        }

        self.navToGwGame = function() {
            if (!self.ready()) {
                return;
            }
            var game = self.activeGame();
            if (!game || game.state === 'active')
                window.location.href = 'coui://ui/main/game/galactic_war/gw_play/gw_play.html';
            else
                window.location.href = 'coui://ui/main/game/galactic_war/gw_war_over/gw_war_over.html';
        }

        self.navToNewGame = function() {
            if (!self.ready()) {
                return;
            }
            var save = GW.manifest.saveGame(self.newGame());
            self.activeGameId(self.newGame().id);
            save.then(self.navToGwGame);
        }

        self.commanders = ko.observableArray();
        self.backupCommander = ko.observable(getCatalogItem('RaptorCenturion'));
        self.preferredCommander = ko.observable().extend({ local: 'preferredCommander_v2' });
        self.selectedCommanderIndex = ko.observable();
        self.selectedCommander = ko.computed(function() {
            return self.commanders()[self.selectedCommanderIndex()] || self.preferredCommander() || self.backupCommander();
        })
        self.nextCommander = function() {
            self.selectedCommanderIndex(self.selectedCommanderIndex() == self.commanders().length-1 ? 0 : self.selectedCommanderIndex()+1);
        }
        self.prevCommander = function() {
            self.selectedCommanderIndex(self.selectedCommanderIndex() == 0 ? self.commanders().length-1 : self.selectedCommanderIndex()-1);
        }

        self.ownsItem = function (item) {
            var result = $.grep(extendedCatalog(), function (e) { return e.ObjectName == item; });
            if (result.length == 0) {
                return false;
            } else {
                return result[0].IsOwned;
            }
        };
        self.populateCommanders = function () {
            self.commanders(extendedCatalog().filter(function (x) {
                if (x.ClassName !== 'Commander') return false;
                if (!(x.IsOwned || x.IsFree)) return false;
                return true;
            }));
            if (self.preferredCommander()) {
                var i = _.findIndex(self.commanders(), { 'ObjectName' : self.preferredCommander().ObjectName });
                self.selectedCommanderIndex(Math.max(i, 0));
            }
            else
                self.selectedCommanderIndex(Math.floor(Math.random() * self.commanders().length));
        }
        self.populateCommanders();
        extendedCatalog.subscribe(self.populateCommanders);

        self.playerFactionIndex = ko.observable(0);
        self.playerFaction = ko.computed(function() {
            var index = self.playerFactionIndex() % GWFactions.length;
            return GWFactions[index];
        });
        self.playerFactionName = ko.computed(function() {
            return self.playerFaction().name;
        });
        self.playerColor = ko.computed(function() {
            return self.playerFaction().color;
        });
        self.playerColorCSS = ko.computed(function() {
            return 'rgb(' + self.playerColor()[0].join(',') + ')';
        });
        self.playerSecondaryColorCSS = ko.computed(function() {
            return 'rgb(' + self.playerColor()[1].join(',') + ')';
        });
        self.playerFactionTextOutlineCSS = ko.computed(function() {
            //var colorFragment = self.playerSecondaryColorCSS();
            var colorFragment = 'black';
            var result =
                '-1px -1px 3px ' + colorFragment + ', ' +
                ' 1px -1px 3px ' + colorFragment + ', ' +
                '-1px  1px 3px ' + colorFragment + ', ' +
                ' 1px  1px 3px ' + colorFragment;
            return result + ', ' + result; // Darken by doubling it up
        });
        self.nextFaction = function() {
            if (!self.creditsMode())
                self.playerFactionIndex((self.playerFactionIndex() + 1) % GWFactions.length);
        };

        // new game setup
        self.newGame = ko.observable();
        self.newGameSeed = ko.observable(Math.floor(Math.random() * 1000000).toString());

        var defaultNewGameName = function () {
            return 'War - ' + UberUtility.createDateString()
        };
        self.newGameName = ko.observable(defaultNewGameName());
        self.newGameSizeIndex = ko.observable(3);
        self.newGameDifficultyIndex = ko.observable(0);

        self.startCards = ko.observableArray();
        self.activeStartCardIndex = ko.observable(0);
        self.activeStartCard = ko.computed(function() {
            return self.startCards()[self.activeStartCardIndex()];
        });
        var getStartCards = function() {
            var makeUnknown = function(cardData) {
                return new UnknownCardViewModel(cardData);
            };
            var makeKnown = function(cardData) {
                var card = new CardViewModel(cardData);
                card.active = ko.computed(function() {
                    return self.activeStartCard() === card;
                });
                card.btnClass = ko.computed(function() {
                    return card.active() ? 'card_active' : 'card';
                });
                card.activate = function() {
                    self.activeStartCardIndex(self.startCards().indexOf(card));
                };
                return card;
            };
            var known = _.map(startCards, function(cardData, index) {
                // Note: First card is built-in
                if (index !== 0 && !GW.bank.hasStartCard(cardData))
                    return makeUnknown(cardData);
                else
                    return makeKnown(cardData);
            });

            var unknown = _.filter(_.map(GW.bank.startCards(), function(cardData) {
                return !_.some(startCards, _.bind(_.isEqual, null, cardData)) && makeKnown(cardData);
            }));

            return known.concat(unknown);
        };
        self.startCards(getStartCards());

        self.newTabActive.subscribe(function(active) {
            if (active && !self.newGame())
                self.makeGame();
        });

        self.ready = ko.computed(function() {
            switch (self.navFunction()) {
                case 'active' : return !!self.activeGames().length && !!self.activeGameId();
                case 'archived' : return !!self.archivedGames().length && !!self.activeGameId();
                case 'new' : return !!self.newGame() && !!self.activeStartCard();
                default: return false;
            }
        });

        self.showTutorial = function() {
            $("#tutorial").dialog('open');
        };

        self.makeGameBusy = ko.observable(false);
        self.makeGame = function() {
            self.newGame(undefined);
            if (!self.selectedCommander())
                return $.when();

            var busyToken = {};
            self.makeGameBusy(busyToken);
            
            // TODO: This should use a common "get my commander's spec" function.
            var commander = {
                ObjectName: self.selectedCommander().ObjectName,
                UnitSpec: self.selectedCommander().UnitSpec
            };

            var game = new GW.Game();

            game.name(self.newGameName());
            game.mode(self.mode());

            var sizes = GW.balance.numberOfSystems;
            var size = sizes[self.newGameSizeIndex()] || 40;
            
            if (self.creditsMode()) {
                size = _.reduce(GWFactions, function(factionSum, faction) {
                    return _.reduce(faction.teams, function(teamSum, team) {
                        return teamSum + (team.workers || []).length;
                    }, factionSum + 1);
                }, 0);
            }

            game.inventory().setTag('global', 'commander', commander);
            game.inventory().setTag('global', 'playerFaction', self.playerFactionIndex());
            game.inventory().setTag('global', 'playerColor', self.playerColor());
            
            var buildGalaxy = game.galaxy().build({
                seed: self.newGameSeed(),
                size: size,
                difficultyIndex: self.newGameDifficultyIndex() || 0,
                minStarDistance: 2,
                maxStarDistance: 10,
                maxConnections: 4
            });
            var dealStartCard = buildGalaxy.then(function(galaxy) {
                if (self.makeGameBusy() !== busyToken)
                    return;
                return GWDealer.dealCard({
                    id: self.activeStartCard().id(),
                    inventory: game.inventory(),
                    galaxy: galaxy,
                    star: galaxy.stars()[galaxy.origin()]
                }).then(function(startCardProduct) {
                    game.inventory().cards.push(startCardProduct || { id: self.activeStartCard().id() });
                });
            });
            var moveIn = dealStartCard.then(function() {
                if (self.makeGameBusy() !== busyToken)
                    return;
                game.move(game.galaxy().origin());
                game.gameState(GW.Game.gameStates.active);
            });
            var populate = moveIn.then(function() {
                if (self.makeGameBusy() !== busyToken)
                    return;

                // Scatter some AIs
                var aiFactions = _.range(GWFactions.length);
                aiFactions.splice(self.playerFactionIndex(), 1);
                if (!self.creditsMode())
                    aiFactions = _.shuffle(aiFactions);
                var teams = _.map(aiFactions, GWTeams.getTeam);
                if (self.creditsMode()) {
                    // Duplicate the workers so we can keep them unique
                    _.forEach(teams, function(team) { 
                        team.workers = (team.workers || []).slice(0);
                    });
                }
                    
                var teamInfo = _.map(teams, function (team, teamIndex) {
                    return {
                        team: team,
                        workers: [],
                        faction: aiFactions[teamIndex]
                    };
                });
                
                var neutralStars;
                // Over-spread to take up all the neutral stars
                if (self.creditsMode())
                    neutralStars = -(game.galaxy().stars().length + teams.length);
                
                return GWBreeder.populate({
                    galaxy: game.galaxy(),
                    teams: teams,
                    neutralStars: neutralStars,
                    orderedSpawn: self.creditsMode(),
                    spawn: function (star, ai) {
                    },
                    canSpread: function (star, ai) {
                        return !self.creditsMode() || !ai || !!teams[ai.team].workers.length;
                    },
                    spread: function (star, ai) {
                        var team = teams[ai.team];
                        return GWTeams.makeWorker(star, ai, team).then(function() {
                            if (self.creditsMode()) {
                                if (team.workers)
                                    _.remove(team.workers, function(worker) { return worker.name === ai.name; });
                            }
                            ai.faction = teamInfo[ai.team].faction;
                            teamInfo[ai.team].workers.push({
                                ai: ai,
                                star: star
                            });
                        });
                    },
                    boss: function (star, ai) {
                        return GWTeams.makeBoss(star, ai, teams[ai.team]).then(function() {
                            ai.faction = teamInfo[ai.team].faction;
                            teamInfo[ai.team].boss = ai;
                        });
                    }
                }).then(function() {
                    return teamInfo;
                });
            });
            
            var finishAis = populate.then(function(teamInfo) {
                if (self.makeGameBusy() !== busyToken)
                    return;

                // DIFFICULTY RAMPING CODE
                //console.log(" START DIFFICULTY RAMPING ");
                var maxDist = _.reduce(game.galaxy().stars(), function (value, star) {
                    return Math.max(star.distance(), value);
                }, 0);
                var diffInfo = GW.balance.difficultyInfo[game.galaxy().difficultyIndex];
                _.forEach(teamInfo, function (info) {
                    if (info.boss) {
                        info.boss.econ_rate *= diffInfo.econMod;
                        info.boss.micro_type = diffInfo.microType;
                        info.boss.go_for_the_kill = diffInfo.goForKill;
                        info.boss.neural_data_mod = diffInfo.neuralDataMod;
                        if (info.boss.personality)
                        {
                            info.boss.personality.priority_scout_metal_spots = diffInfo.priority_scout_metal_spots;
                            info.boss.personality.metal_demand_check *= diffInfo.bossDemandCheckMod;
                            info.boss.personality.energy_demand_check *= diffInfo.bossDemandCheckMod;
                        }
                    }
                    _.forEach(info.workers, function (worker) {
                        var starPct = 1.0;
                        var diffRamp = (worker.star.distance() / maxDist);
                        if (diffInfo.rampDifficulty)
                            starPct *= diffRamp;
                        worker.ai.econ_rate = worker.ai.econ_rate || 1;
                        worker.ai.econ_rate = ((starPct * (GW.balance.workerEconRate[1] - GW.balance.workerEconRate[0])) + GW.balance.workerEconRate[0]) * diffInfo.econMod;
                        //console.log("WORKERS: starPct: " + starPct + " econRateMin: " + GW.balance.workerEconRate[0] + " econRateMax: " + GW.balance.workerEconRate[1] + " econMod: " + diffInfo.econMod + " Final econ_rate: " + worker.ai.econ_rate);
                        worker.ai.personality = worker.ai.personality || {};
                        worker.ai.personality.metal_drain_check = (starPct * (GW.balance.workerMetalDrainCheck[1] - GW.balance.workerMetalDrainCheck[0])) + GW.balance.workerMetalDrainCheck[0];
                        worker.ai.personality.energy_drain_check = (starPct * (GW.balance.workerEnergyDrainCheck[1] - GW.balance.workerEnergyDrainCheck[0])) + GW.balance.workerEnergyDrainCheck[0];
                        worker.ai.personality.metal_demand_check = (starPct * (GW.balance.workerMetalDemandCheck[1] - GW.balance.workerMetalDemandCheck[0])) + GW.balance.workerMetalDemandCheck[0];
                        worker.ai.personality.energy_demand_check = (starPct * (GW.balance.workerEnergyDemandCheck[1] - GW.balance.workerEnergyDemandCheck[0])) + GW.balance.workerEnergyDemandCheck[0];
                        worker.ai.personality.micro_type = diffInfo.microType;
                        worker.ai.personality.go_for_the_kill = diffInfo.goForKill;
                        worker.ai.personality.neural_data_mod = diffInfo.neuralDataMod;
                        worker.ai.personality.priority_scout_metal_spots = diffInfo.priority_scout_metal_spots;

                        var numMinions = Math.floor((diffInfo.mandatoryMinions + (diffRamp * 2)) * diffInfo.minionMod);
                        //console.log("numMinions: " + numMinions + " minionMod: "+diffInfo.minionMod);
                        if (numMinions > 0) {
                            worker.ai.minions = [];
                            //console.log("Adding Minions to worker: " + numMinions + " mandatory: " + diffInfo.mandatoryMinions + " calculated: " + Math.floor(diffRamp * 2));
                            _.times(numMinions, function () {
                                var mnn = _.sample(GWFactions[info.faction].minions);
                                mnn.color = worker.ai.color;
                                worker.ai.minions.push(mnn);
                            });
                        }
                    });
                });
                
                if (self.creditsMode()) {
                    
                    var origin = game.galaxy().stars()[game.galaxy().origin()];
                    origin.name(GWCredits.startSystem.name);
                    origin.system().name = GWCredits.startSystem.name;
                    origin.system().description = GWCredits.startSystem.description;
                    _.forEach(game.galaxy().stars(), function(star) {
                        var ai = star.ai();
                        if (!ai)
                            return;
                        star.system().name = ai.name;
                        if (ai.html) {
                            var html = ai.html;
                            if (_.isArray(html))
                                html = html.join('\n');
                            star.system().html = html;
                            star.system().description = '';
                        }
                        else if (ai.description)
                            star.system().description = ai.description;
                    });
                }
            });

            var deal = finishAis.then(function() {
                if (self.makeGameBusy() !== busyToken)
                    return;
                
                return GWDealer.deal({
                    galaxy: game.galaxy(),
                    inventory: game.inventory()
                });
            });
            
            return deal.then(function () { 
                if (self.makeGameBusy() !== busyToken)
                    return;
                self.makeGameBusy(false);
                self.newGame(game); 
                return game; 
            });
        }

        self.runCredits = function() {
            GWFactions.splice(0, GWFactions.length);
            _.forEach(GWFactionsCredits, function(creditsFaction) { GWFactions.push(creditsFaction); });
            self.navFunction('new');
            self.newGameName('Credits');
            self.playerFaction.notifySubscribers();
            self.makeGame();
        };

        self.setup = function() {
            if (self.creditsMode())
                self.runCredits();
        };
        
        ko.computed(function () {
            return [ self.newGameSeed(), self.newGameName(), self.selectedCommander(), self.newGameSizeIndex(), self.playerFactionIndex(), self.activeStartCard(), self.newGameDifficultyIndex() ];
        }).subscribe(function() {
            if (self.newTabActive())
                self.makeGame();
        });

        if (self.newTabActive())
            self.makeGame();

        self.getCommanderIcon = function(name) {
            var c =getCatalogItem(name);
            if (!_.isEmpty(c)) {
                return getCatalogItem(name).ThumbImgSource;
            }
        }

        $("#tutorial").dialog({
            draggable: false,
            resizable: false,
            width: 800,
            height: 680,
            modal: true,
            autoOpen: false,
            buttons: {}
        });
    }

    ko.computed(function() {
        if (!GW.manifest.ready())
            return;
        _.delay(function() {
            model = new GameViewModel();

            handlers = {};

           // inject per scene mods
            if (scene_mod_list['gw_start']) {
                loadMods(scene_mod_list['gw_start']);
            }

            // setup send/recv messages and signals
            app.registerWithCoherent(model, handlers);

            // Activates knockout.js
            ko.applyBindings(model);

            // Tell the model we're really, really here
            model.lastSceneUrl('coui://ui/main/game/galactic_war/gw_start/gw_start.html');
            
            model.setup();
        });
    });
});

});
