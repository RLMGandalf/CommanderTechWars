var model;

$(document).ready(function () {

    function TransitViewModel() {
        var self = this;

        self.startingGame = ko.observable(false);

        self.uberName = ko.observable().extend({ local: 'uberName' });
        self.displayName = ko.observable().extend({ session: 'displayName' });
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.joinLocalServer = ko.observable().extend({ session: 'join_local_server' });

        self.lobbyId = ko.observable().extend({ session: 'lobbyId' });
        self.gameTicket = ko.observable().extend({session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });
        self.uberNetRegion = ko.observable().extend({ local: 'uber_net_region' });

        self.isPrivateGame = ko.observable().extend({ session: 'is_private_game' });
        self.privateGamePassword = ko.observable().extend({ session: 'private_game_password' });
        self.uuid = ko.observable('').extend({ session: 'invite_uuid' });

        self.clientData = ko.computed(function () {
            var result = {
                password: self.privateGamePassword(),
                uberid: self.uberId(),
            }

            if (self.startingGame())
                result['uuid'] = self.uuid();

            return result;
        });

        self.lobbyInfo = ko.computed(function () {
            return {
                'game_hostname': String(self.gameHostname()),
                'game_port': Number(self.gamePort()),
                'local_game': Boolean(self.joinLocalServer()),
                'game_password': self.privateGamePassword(),
                'lobby_id': self.lobbyId(),
                'uuid': self.uuid()
            }
        });
        self.updateLobbyInfo = function () {
            api.Panel.message('uberbar', 'lobby_info', self.lobbyInfo());
        }
        self.lobbyInfo.subscribe(self.updateLobbyInfo);
        self.updateLobbyInfo();

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.connectFailDestination = ko.observable().extend({ session: 'connect_fail_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.showLanding = ko.observable().extend({ session: 'showLanding' });

        self.serverIsReady = ko.observable(false);

        self.navToDestination = function () {
            window.location.href = self.transitDestination();
            return; /* window.location.href will not stop execution. */
        };

        self.hasLoginResponse = ko.observable(false);
        self.hasPlayerState = ko.observable(false);

        self.fail = function(desc) {
            self.transitPrimaryMessage(desc);
            self.transitSecondaryMessage(loc("!LOC(connect_to_game:returning_to_main_menu.message):Returning to Main Menu"));
            self.transitDestination(self.connectFailDestination() || 'coui://ui/main/game/start/start.html');
            self.transitDelay(5000);
            window.location.href = 'coui://ui/main/game/transit/transit.html';
            return; /* window.location.href will not stop execution. */
        };

        self.setup = function () {
            function connectToGame() {
                return api.net.connect({
                    host: self.gameHostname(),
                    port: self.gamePort(),
                    displayName: self.displayName() || 'Player',
                    ticket: self.gameTicket(),
                    clientData: self.clientData()
                });
            }
            var action = $.url().param('action');
            var mode = $.url().param('mode') || 'Config';
            var replayid = $.url().param('replayid');
            var local = $.url().param('local');
            var start = action === 'start';

            self.joinLocalServer(local);
            
            // Local servers are not currently started by this screen
            if (local) {
                start = false;
                self.gameHostname('localhost');
                self.gamePort(6543);
            }
            
            if (start) {

                self.startingGame(true);
                self.uuid(uuid());
                
                var region = local ? 'Local' : (self.uberNetRegion() || "USCentral");

                var startCall;
                
                if (replayid !== undefined) {
                    startCall = api.net.startReplay(region, mode, replayid);
                } else {
                    startCall = api.net.startGame(region, mode);
                }

                startCall.done(function(data) {
                    self.gameTicket(data.Ticket);
                    self.gameHostname(data.ServerHostname);
                    self.gamePort(data.ServerPort);
                    self.lobbyId(data.LobbyID);
                    connectToGame();
                });
                startCall.fail(function(data) {
                    console.log('start game failed');
                    console.log(data);
                    // either we can't contact ubernet or our request was malformed
                    if (replayid !== undefined) {
                        self.fail(loc("!LOC(connect_to_game:failed_to_start_replay.message):FAILED TO START REPLAY"));
                    } else {
                        self.fail(loc("!LOC(connect_to_game:failed_to_start_game.message):FAILED TO START GAME"));
                    }
                });
            }
            else if (self.gameHostname() && self.gamePort()) {
                connectToGame();
            }
            else {
                console.log('failed to join game:');
                console.log(self.gameHostname());
                console.log(self.gamePort());
                self.fail(loc("!LOC(connect_to_game:failed_to_join_game.message):FAILED TO JOIN GAME"));
            }
        }
    }
    model = new TransitViewModel();

    handlers = {};
    handlers.connection_failed = function (payload) {
        model.fail(loc("!LOC(connect_to_game:connection_to_server_failed.message):CONNECTION TO SERVER FAILED"));
    };

    handlers.login_accepted = function (payload) {
        model.transitPrimaryMessage(loc('!LOC(connect_to_game:login_accepted.message):LOGIN ACCEPTED'));
        model.hasLoginResponse(false);
        app.hello(handlers.server_state, handlers.connection_disconnected);
    };

    handlers.login_rejected = function (payload) {
        model.fail(loc("!LOC(connect_to_game:login_to_server_rejected.message):LOGIN TO SERVER REJECTED"));
    };

    handlers.server_state = function (payload) {
        if (payload.url && payload.url !== window.location.href) {
            window.location.href = payload.url;
            return; /* window.location.href will not stop execution. */
        }
    };

    handlers.connection_disconnected = function (payload) {
        model.fail(loc("!LOC(connect_to_game:connection_to_server_lost.message):CONNECTION TO SERVER LOST"));
    };
 
    // inject per scene mods
    if (scene_mod_list['connect_to_game'])
        loadMods(scene_mod_list['connect_to_game']);

    // Activates knockout.js
    ko.applyBindings(model);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    model.setup();
});
