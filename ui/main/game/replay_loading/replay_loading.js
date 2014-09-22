var model;
var handlers = {};

$(document).ready(function () {

    function ReplayLoadingViewModel() {
        var self = this;

        self.displayName = ko.observable().extend({ session: 'displayName' });

        self.replay_loading_msg = ko.observable().extend({ session: 'replay_loading_msg' });

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.heartbeatFailed = function () {
            self.transitPrimaryMessage(loc("!LOC(replay_loading:connection_to_server_lost.message):CONNECTION TO SERVER LOST"));
            self.transitSecondaryMessage(loc("!LOC(replay_loading:returning_to_main_menu.message):Returning to Main Menu"));
            self.transitDestination('coui://ui/main/game/start/start.html');
            self.transitDelay(5000);
            self.clearHeartbeat();
            window.location.href = 'coui://ui/main/game/transit/transit.html';
            return; /* window.location.href will not stop execution. */
        }

        self.heartbeat = function () {
            var heartbeatTimer = setTimeout(self.heartbeatFailed, 5000);
            model.send_message('heartbeat', {}, function (success, response) {
                if (success) {
                    clearTimeout(heartbeatTimer);
                } else {
                    self.heartbeatFailed();
                }
            });
        };

        self.heartbeatInterval = setInterval(self.heartbeat, 10000);

        self.clearHeartbeat = function () {
            if (self.heartbeatInterval !== undefined) {
                clearInterval(self.heartbeatInterval);
                self.heartbeatInterval = undefined;
            }
        }

        self.navToMainMenu = function () {
            self.disconnect();
            self.replay_loading_msg({});
            self.clearHeartbeat();
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        self.connected = ko.observable(false);
    }
    model = new ReplayLoadingViewModel();
    
    handlers.connection_disconnected = function() {
        model.connected(false);
    };
    
    handlers.server_state = function (msg) {
        if (msg.url && msg.url !== window.location.href) {
            window.location.href = msg.url;
            model.clearHeartbeat();
            return; /* window.location.href will not stop execution. */
        } else if (msg.data) {
            model.connected(true);    
            model.replay_loading_msg("Starting replay server, please be patient...");
        }
    };

    handlers.mod_msg_sv_ccl_set_replay_config = function (msg) {
        if (msg.files) {
            var cookedFiles = _.mapValues(msg.files, function (value) {
                if (typeof value !== 'string')
                    return JSON.stringify(value);
                else
                    return value;
            });
            api.game.getUnitSpecTag().then(function (tag) {
                if (tag === '') {
                    api.file.unmountAllMemoryFiles();
                    api.file.mountMemoryFiles(cookedFiles);
                    api.game.setUnitSpecTag('.player');
                }
                model.send_message('mod_msg_ccl_sv_replay_config_received', {}, function (success, response) {});
            });
        } else {
            model.send_message('mod_msg_ccl_sv_replay_config_received', {}, function (success, response) {});
        }
    }

    // inject per scene mods
    if (scene_mod_list['replay_loading'])
        loadMods(scene_mod_list['replay_loading']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    app.hello(handlers.server_state, handlers.connection_disconnected);
});