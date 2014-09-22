var model;
var handlers = {};

$(document).ready(function () {

    function OptionsBarViewModel() {
        var self = this;
        
        self.active = ko.observable(true);

        // Define pass-throughs to live_game
        _.forEach(
            [
                'toggleStreaming',
                'toggleMicrophone',
                'toggleSounds',
                'toggleCustomFormations',
                'togglePips',
                'toggleTimeControls',
                'toggleUberBar'
            ], 
            function(fn) {
                self[fn] = function() {
                    api.Panel.message(api.Panel.parentId, 'panel.invoke', [fn]);
                };
            }
        );

        self.state = ko.observable({
            twitch: {} // Avoids failure when waiting for the state from parent
        });
        self.state.subscribe(function() {
            api.Panel.onBodyResize();
            _.delay(api.Panel.onBodyResize);
        });

        self.squelchGlobalChat = ko.observable(false).extend({ session: 'squelch_global_chat' });
        self.squelchGlobalChat.subscribe(function (value) {
            api.Panel.message('chat', 'set_squelch_global_chat', value);
        });
        self.squelchGlobalChatImage = ko.computed(function () {
            return self.squelchGlobalChat() ?
                'img/ingame_options_bar/global_chat_off.png' :
                'img/ingame_options_bar/global_chat_on.png';
        });

        self.twitchAuthenticated = ko.computed(function() { return self.state().twitch.authenticated; });
        self.twitchStreaming = ko.computed(function() { return self.state().twitch.streaming; });
        
        self.twitchStreamingImage = ko.computed(function() {
            return self.twitchStreaming() ?
                'img/ingame_options_bar/streaming_on.png' :
                'img/ingame_options_bar/streaming_off.png';
        });
        
        self.twitchMicrophoneEnabled = ko.computed(function() { return self.state().twitch.mic; });
        self.twitchMicrophoneImage = ko.computed(function() {
            return self.twitchMicrophoneEnabled() ?
                'img/ingame_options_bar/microphone_on.png' :
                'img/ingame_options_bar/microphone_off.png';
        });
        
        self.twitchSoundsEnabled = ko.computed(function() { return self.state().twitch.sounds; });
        self.twitchSoundsImage = ko.computed(function() {
            return self.twitchSoundsEnabled() ?
                'img/ingame_options_bar/playsounds_on.png' :
                'img/ingame_options_bar/playsounds_off.png';
        });
        
        
        self.customFormations = ko.computed(function() { return self.state().custom_formations; });
        self.customFormationsImage = ko.computed(function() {
            return self.customFormations() ? 
                'img/ingame_options_bar/custom_formations_on.png' :
                'img/ingame_options_bar/custom_formations_off.png';
        });
       
        self.pip = ko.computed(function () { return self.state().pip; });
        self.pipImage = ko.computed(function () {
            return self.pip() ?
                'img/ingame_options_bar/pip_off.png' :
                'img/ingame_options_bar/pip_on.png';
        });

        self.uberBar = ko.computed(function() { return self.state().uber_bar; });
        self.uberBarImage = ko.computed(function() {
            return self.uberBar() ?
                'img/ingame_options_bar/uberbar_hide.png' :
                'img/ingame_options_bar/uberbar_show.png';
        });
        
        self.endOfTimeInSeconds = ko.observable(0.0);
        self.endOfTimeString = ko.computed(function () {
            return UberUtility.createTimeString(self.endOfTimeInSeconds());
        });

        self.startCommandModePing = function () {
            api.Panel.message(api.Panel.parentId, 'action_bar.set_command_index', 13);
        };
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });

            api.Panel.query(api.Panel.parentId, 'query.options_state').then(self.state);
        };
    }
    model = new OptionsBarViewModel();
    
    handlers.time = function (payload) {
        model.endOfTimeInSeconds(payload.end_time);
    };

    handlers.state = function (payload) {
        model.state(payload);
    };
    
    // inject per scene mods
    if (scene_mod_list['live_game_options_bar'])
        loadMods(scene_mod_list['live_game_options_bar']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
