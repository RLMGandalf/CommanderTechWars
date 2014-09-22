var model;

$(document).ready(function () {

    function MatchmakingViewModel() {
        var self = this;

        self.isLocalGame = ko.observable(false).extend({ session: 'isLocalGame' });

        self.lobbyId = ko.observable();
        self.gameTicket = ko.observable('').extend({ session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });

        self.uberId = ko.observable('').extend({ session: 'uberId' });
        self.uberNetRegion = ko.observable().extend({ local: 'uber_net_region' });
        self.uberNetRegions = ko.observableArray().extend({ session: 'uber_net_regions' });

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.navBack = function () {
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        self.startQuickMatch = function () {
            console.log('startQuickMatch:start');
            console.log(self.uberNetRegion());
            engine.asyncCall("ubernet.matchmake", self.uberNetRegion(), 'QuickMatch2', true).done(function (data) {
                console.log('startQuickMatch:success');
                console.log(data);
                data = JSON.parse(data);

                if (data.PollWaitTimeMS) {
                    // no game yet, try again soon
                    setTimeout(self.startQuickMatch, data.PollWaitTimeMS);
                }
                else {
                    console.log('startQuickMatch:matchFound');

                    self.isLocalGame(false);
                    self.gameTicket(data.Ticket);
                    self.gameHostname(data.ServerHostname);
                    self.gamePort(data.ServerPort);

                    window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html';
                    return; /* window.location.href will not stop execution. */
                }
            }).fail(function (data) {
            
                model.transitPrimaryMessage(loc('!LOC(matchmaking:failed_to_matchmake.message):FAILED TO MATCHMAKE'));
                model.transitSecondaryMessage(loc('!LOC(matchmaking:returning_to_main_menu.message):Returning to Main Menu'));
                model.transitDestination('coui://ui/main/game/start/start.html');
                model.transitDelay(5000);
                window.location.href = 'coui://ui/main/game/transit/transit.html';
                return; /* window.location.href will not stop execution. */
            });
        }

        self.setup = function () {
            self.startQuickMatch();
        }

    }
    model = new MatchmakingViewModel();

    handlers = {};

    // inject per scene mods
    if (scene_mod_list['matchmaking'])
        loadMods(scene_mod_list['matchmaking']);

    // Activates knockout.js
    ko.applyBindings(model);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    model.setup();
});
