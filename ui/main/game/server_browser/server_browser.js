var model;
var handlers;

$(document).ready(function () {

    function ServerBrowserViewModel() {
        var self = this;

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });
        self.buildVersion = ko.observable().extend({ session: 'build_version' });
        self.gameTicket = ko.observable().extend({ session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });
        self.joinLocalServer = ko.observable().extend({ session: 'join_local_server' });
        self.privateGamePassword = ko.observable().extend({ session: 'private_game_password' });
        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        // Stuff for dealing with locked games
        self.privateGamePassword = ko.observable().extend({ session: 'private_game_password' });
        self.hasEnteredPassword = ko.observable(false);

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('');
        self.containerWidth = ko.observable('');
        self.listWrapperHeight = ko.observable('');
        self.listHeight = ko.observable('');

        // Filters
        self.uberNetRegions = ko.observableArray().extend({ session: 'uber_net_regions' });
        self.regionNameList = ko.computed(function () {
            var result = _.pluck(self.uberNetRegions(), 'Name');
            result.unshift('Any');
            return result;
        });
        self.hasUberNetRegions = ko.computed(function () { return (self.uberNetRegions().length > 0); });

        self.searchFilter = ko.observable('');
        self.gameStateFilter = ko.observable('inlobby');
        self.gameStatusFilter = ko.observable('canplay');
        self.gameModeFilter = ko.observable('any');

        self.planetCountMinFilter = ko.observable('any');
        self.planetCountMaxFilter = ko.observable('any');
        self.playerCountMinFilter = ko.observable('any');
        self.playerCountMaxFilter = ko.observable('any');
        self.regionFilter = ko.observable('any');

        self.gameTagFilter = ko.observable('any');        
        self.showCheatServers = ko.observable(true);

        self.createGame = function() {
            engine.call('disable_lan_lookout');

            model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
            window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html?action=start';
            return; /* window.location.href will not stop execution. */
        };

        // Game lists: available and filtered
        self.gameList = ko.observableArray();
        self.lanGameList = ko.observableArray();
        self.allGames = ko.computed(function () {
            return self.gameList().concat(self.lanGameList());
        });

        self.moddedGameFilterOptions = ko.observableArray(['Any', 'Not Modded', 'Modded']);
        self.moddedGameFilter = ko.observable('Not Modded');

        self.allGames.subscribe((function () {
            var mod_list_hash = JSON.stringify(self.moddedGameFilterOptions());

            return function (value) {
                var result = ['Any', 'Not Modded', 'Modded'];
                var set = {};

                _.forEach(value, function (element) {
                    _.forEach(element.mod_names, function (name) {
                        set[name] = true;
                    });
                });

                result = result.concat(_.keys(set).sort());
                var hash = JSON.stringify(result);
                if (hash === mod_list_hash)
                    return;

                mod_list_hash = hash;
                self.moddedGameFilterOptions(result);
            };
        })());

        self.filteredGameList = ko.computed({read: function () {
            var allGames = self.allGames();
            var filteredGames = [];
            var selectedGameStillVisible = false;
            var cheats_ok = self.showCheatServers();

            _.forEach(allGames, function(game) {

                // Check for valid game
                if (!game || !game.max_players)
                    return;

                // Check for valid game state
                var started = game.started;
                if (self.gameStateFilter() !== 'any') {
                    if (self.gameStateFilter() === 'inlobby' && started)
                        return;

                    if (self.gameStateFilter() === 'inprogress' && !started)
                        return;
                }

                var can_play = game.players < game.max_players;
                var can_spectate = game.spectators < game.max_spectators;
                if (self.gameStatusFilter() !== 'any') {
                    if (!can_play && self.gameStatusFilter() === 'canplay')
                        return;
                    if (!can_spectate && self.gameStatusFilter() === 'canspectate')
                        return;
                    if (!can_play && !can_spectate && self.gameStatusFilter() === 'canjoin')
                        return;
                }

                var ffa = game.mode === 'FreeForAll';
                if (self.gameModeFilter() !== 'any') {
                    if (ffa && self.gameModeFilter() === 'teamarmies')
                        return;
                    if (!ffa && self.gameModeFilter() === 'freeforall')
                        return;
                }

                // Check for valid number of planets
                var planets = game.planet_count;
                if (self.planetCountMinFilter() !== 'any')
                    if (planets < Number(self.planetCountMinFilter()))
                        return;

                if (self.planetCountMaxFilter() !== 'any')
                    if (planets > Number(self.planetCountMaxFilter()))
                        return;

                // Check for valid number of players           
                var players = game.max_players;
                if (self.playerCountMinFilter() !== 'any')
                    if (players < Number(self.playerCountMinFilter()))
                        return;

                if (self.playerCountMaxFilter() !== 'any')
                    if (players > Number(self.playerCountMaxFilter()))
                        return;

                // Check for lobby tag
                var tag = game.tag;
                if (self.gameTagFilter() !== 'any' && tag !== self.gameTagFilter())
                    return;

                // Check for modded servers
                var modded = game.mod_names.length > 0;
                var mod_match;
                var reject_modded_games = self.moddedGameFilter() === 'Not Modded';
                var reject_normal_games = self.moddedGameFilter() === 'Modded';

                if (self.moddedGameFilter() !== 'Any') {

                    if (reject_modded_games || reject_normal_games) {
                        if (reject_modded_games && modded) 
                            return;
                        
                        if (reject_normal_games && !modded) 
                            return;                     
                    }
                    else {
                        mod_match = _.any(game.mod_names, function (element) {
                            return element === self.moddedGameFilter();
                        });

                        if (!mod_match)
                            return;
                    }
                }

                // Check for cheat servers
                if (game.cheats_enabled && !cheats_ok) 
                    return;

                // Check for matching regions
                if (self.regionFilter() !== 'Any')
                    if (self.regionFilter() !== game.region)
                        return;

                // Look for games matching the search string
                if (self.searchFilter().length > 0) 
                    if (game.searchable.indexOf(self.searchFilter().toUpperCase()) === -1)
                        return;
                
                // Is this the currently selected game? If so, we need to retain the selection
                if (self.currentSelectedGame() && game.name === self.currentSelectedGame().name)
                    selectedGameStillVisible = true;
                
                // If our filters haven't whacked the game from the list, include in our results
                filteredGames.push(game);            
            });

            // Sort the list
            filteredGames.sort(function(a, b) {

                var aSort = a.name.toUpperCase();
                var bSort = b.name.toUpperCase();

                return (aSort < bSort)
                        ? -1
                        : (aSort === bSort) ? 0 : 1;
            });

            if (!selectedGameStillVisible) self.setSelected(null);
            return filteredGames;

        }, deferEvaluation: true});

        // Support selection, retained even on list refresh
        self.currentSelectedGame = ko.observable(null);
        self.currentSelectedGameHost = ko.observable(-1);
        self.setSelected = function(data) {
            self.currentSelectedGame(data);
            if (self.currentSelectedGame()) 
                self.currentSelectedGameHost(data.lobby_id || data.host);
            else 
                self.currentSelectedGameHost(-1);
        }

        self.canJoinGame = ko.computed(function () {
            var game = self.currentSelectedGame();
            return !!game && (game.players < game.max_players) && !game.started;
        });
        self.canSpectateGame = ko.computed(function () {
            var game = self.currentSelectedGame();
            return !!game && (game.spectators < game.max_spectators);
        });
        self.canEnterGame = ko.computed(function () {
            return self.canJoinGame() || self.canSpectateGame();
        });

        self.tryToSpectate = ko.observable().extend({session: 'try_to_spectate'});
        self.tryToSpectateGame = function () {
            // the selected game will reject the client. do not attempt to join.
            if (!self.canSpectateGame())
                return;

            self.tryToSpectate(true);
            self.tryToEnterGame();
        }

        self.tryToJoinGame = function () {
            // the selected game will reject the client. do not attempt to join.
            if (!self.canJoinGame())
                return;

            self.tryToSpectate(false);
            self.tryToEnterGame();
        }

        self.tryToEnterGame = function () {
            // If we're looking at a locked game, we need to make sure we presented the password modal
            if (self.currentSelectedGame().locked && !self.hasEnteredPassword()) {
                self.privateGamePassword();
                $('#getPassword').modal('show');
                return;
            }
            self.hasEnteredPassword(false);

            var curGame = self.currentSelectedGame();
            var local = curGame.region === 'Local';

            api.net.joinGame({ 
                    lobbyId: curGame.lobby_id, 
                    host: curGame.host, 
                    port: curGame.port
                })
                .always(function() {
                    engine.call('disable_lan_lookout');
                })
                .done(function (data) {
                    self.joinLocalServer(local);

                    // Get the data from Ubernet about the game
                    self.gameTicket(data.Ticket);
                    self.gameHostname(data.ServerHostname);
                    self.gamePort(data.ServerPort);

                    // Connect
                    model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
                    window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html';
                })
                .fail(function (data) {
                    engine.call('disable_lan_lookout');
                    model.transitPrimaryMessage('FAILED TO JOIN GAME');
                    model.transitSecondaryMessage('Returning to Main Menu');
                    model.transitDestination('coui://ui/main/game/start/start.html');
                    model.transitDelay(5000);
                    model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
                    window.location.href = 'coui://ui/main/game/transit/transit.html';
                });
        }

        // When the player clicks the Join Game on the modal box, we know he just entered a password, try a join
        self.joinWithPassword = function () {
            self.hasEnteredPassword(true);
            self.tryToEnterGame();
        }

        self.back = function() {
            engine.call('disable_lan_lookout');
            model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        self.planetSizeClass = function (radius) {
            if (radius <= 250)
                return '1';
            if (radius <= 450)
                return '2';
            if (radius <= 650)
                return '3';
            if (radius <= 850)
                return '4';
            return '5';
        }

        // Takes a game beacon (sent by the game server) and turns it into our game data object
        self.processGameBeacon = function(beacon, region, lobby_id, host, port) {
            try {
                var game = {};
                var gameData = beacon.game;
                gameData.system = gameData.system || { planets: [] };

                var extraPlanets = gameData.system.planets.length ? '+ '+ (gameData.system.planets.length - 1) +' more' : '';
                var playerDetail = beacon.player_names;
                for (var i=beacon.player_names.length; i<beacon.max_players; i++)
                    playerDetail.push("Open slot");
                
                var spectatorDetail = ['Not Available'];
                if (beacon.spectator_names) {
                    var spectatorDetail = beacon.spectator_names;
                    for (var i=beacon.spectator_names.length; i<beacon.max_spectators; i++)
                        spectatorDetail.push("Open slot");
                }

                if (_.contains(beacon.blacklist, self.uberId()))
                    return false;

                if (beacon.whitelist.length)
                    if (!_.contains(beacon.whitelist, self.uberId()))
                        return false;

                var p = new Array();
                _.forEach(beacon.game.system.planets,function(planet) {
                    p.push({
                        'name' : (planet.name.length < 16 ? planet.name : planet.name.substring(0,15)+'...'), 
                        'biome' : planet.generator.biome,
                        'move_thrust' : planet.required_thrust_to_move,
                        'scale' : self.planetSizeClass(planet.generator.radius),
                        'radius' : planet.generator.radius
                    });
                });

                // These don't appear to always to be defined, so let's check for that with early out logic.
                var cheats_enabled = beacon.cheat_config &&
                                     beacon.cheat_config.cheat_flags &&
                                     beacon.cheat_config.cheat_flags.cheat_mod_enabled;

                var mods_summary = "";
                _.forEach(beacon.mod_names, function (element) {
                    if (mods_summary.length > 0)
                        mods_summary += ", ";
                    mods_summary += '"' + element + '"';
                });

                game = {
                    'region' : region,
                    'lobby_id' : lobby_id,
                    'host' : host,
                    'port' : port,

                    'name': beacon.game_name ? beacon.game_name : beacon.creator + " : " + beacon.tag,
                    'locked': beacon.require_password,
                    'started': beacon.started,
                    'mode': beacon.mode,
                    'modded': (beacon.mod_names && beacon.mod_names.length > 0) ? (cheats_enabled ? "Y+Cheat" : "Yes") : "No",
                    'mods_summary': mods_summary,
                    'mod_names': beacon.mod_names,
                    'cheats_enabled': cheats_enabled,
                    'planet_count' : beacon.game.system.planets.length,
                    'planets' : extraPlanets,
                    'planet_detail' : p,
                    'biomes' : _.map(gameData.system.planets, function (element) { return element.generator.biome }),
                    'players' : beacon.players,
                    'max_players' : beacon.max_players,
                    'player_display' : beacon.players+'/'+beacon.max_players,
                    'player_detail' : playerDetail,
                    'spectators' : beacon.spectators,
                    'max_spectators' : beacon.max_spectators,
                    'spectator_display' : beacon.spectators+'/'+beacon.max_spectators,
                    'spectator_detail': spectatorDetail,
                    'tag': beacon.tag || '',
                    'searchable' : (gameData.name + ' ' + beacon.player_names.join(' ')).toUpperCase(),
                };

                return game;

            } catch (e) {
                console.log('error parsing beacon');
                return false;
            }
        };

        // This is set up to periodically poll UberNet and see what games are being reported
        self.updateServerData = function () {

            // This is what we do if we can't get a game list from UberNet
            function failedToRetrieveGameList() {
                model.transitPrimaryMessage('FAILED TO RETRIEVE GAME LIST');
                model.transitSecondaryMessage('Returning to Main Menu');
                model.transitDestination('coui://ui/main/game/start/start.html');
                model.transitDelay(5000);

                model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
                window.location.href = 'coui://ui/main/game/transit/transit.html';
                return; /* window.location.href will not stop execution. */
            }

            // Make a call to the UberNet engine to get a list of current games
            engine.asyncCall("ubernet.getCurrentGames")
                .done(function (data) {

                    // If we started with nothing in the game list, we'll need to trigger a resize
                    var startingGameListSize = self.gameList().length;

                    try {
                        data = JSON.parse(data);
                        var games = data.Games;
                    } catch (e) {
                        failedToRetrieveGameList();
                        return;
                    }

                    var newGameList = [];

                    for (var i = 0; i < games.length; i++) {
                        try {
                            if (games[i].BuildVersion === self.buildVersion()) {
                                if (games[i].TitleData) {
                                    var gameData = JSON.parse(games[i].TitleData);
                                    var game = self.processGameBeacon(gameData, games[i].Region, games[i].LobbyID);
                                    if (game) 
                                        newGameList.push(game);
                                }
                            }
                        } catch (e) {
                            console.log('failed to parse TitleData');
                            console.log(games[i].TitleData);
                        }
                    }

                    // Update the master game list
                    self.gameList(newGameList);
                })
                .fail(function (data) {
                    failedToRetrieveGameList();
                });
        }

    }

    model = new ServerBrowserViewModel();

    handlers = {};

    // LAN games do direct broadcast of a beacon, which comes in through this function
    // Process the incoming beacon to make sure the LAN game is on the list
    handlers.update_beacon = function (payload) {
      
        var game = null;

        try {
            if (payload.BuildVersion === model.buildVersion()) {
                game = model.processGameBeacon(payload.TitleData, 'Local', payload.LobbyId, payload.host, payload.Port);
            }
        }
        catch (e) {
            console.log('failed to parse LAN beacon');
            console.log(payload);
        }

        // Get the current list so we can edit it
        var currentLanGames = model.lanGameList();

        var foundIt = false;

        // Scan the games and see if we already have it
        for (var i=0; i<currentLanGames.length; i++) {
            if (currentLanGames[i].host == payload.host) {
                // Hey, found it! Let's update.
                if (game) {
                    currentLanGames[i] = game;
                } else {
                    currentLanGames.splice(i);
                }
                foundIt = true;
                break;
            }
        }

        // Didn't find the game, add it to the list
        if (!foundIt && game) {
            currentLanGames.push(game);
        }

        // Put the updated list back into the observable array
        model.lanGameList(currentLanGames);
    }

    handlers.new_beacon = function (payload) {
        handlers.update_beacon(payload);
    }
   
    handlers.lost_beacon = function (payload) {
        // Get the current list so we can edit it
        var currentLanGames = model.lanGameList();

        // Scan the games and see if we already have it
        for (var i=0; i<currentLanGames.length; i++) {
            if (currentLanGames[i].host == payload.host) {
                // Hey, found it! Let's remove it.
                currentLanGames.splice(i);
                break;
            }
        }

        // Put the updated list back into the observable array
        model.lanGameList(currentLanGames);
    }

    // inject per scene mods
    if (scene_mod_list['server_browser']) {
        loadMods(scene_mod_list['server_browser']);
    }

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // Start listening for UberNet games (updated every X milliseconds)
    if (model.signedInToUbernet()) {
        setInterval(model.updateServerData, 1000);
        model.updateServerData();
    }

    // Set up the password box
    $('#getPassword').modal();

    api.Panel.message('uberbar', 'lobby_info' /*, undefined */);
    api.Panel.message('uberbar', 'visible', { value: true });

    // Start watching for LAN games
    engine.call('enable_lan_lookout');
});
