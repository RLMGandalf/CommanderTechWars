function init_twitch(api) {
    api.twitch = {
        // Log in to twitch for chat and streaming if it is enabled
        logIn: function (twitchName, twitchPassword) { engine.call('twitch.logIn', twitchName, twitchPassword); },

        //
        // Logging in will trigger a message "twitch_ingest_list"
        // This message provides the list of servers to which you can connect to stream
        //   "default" name of the default server defined by twitch
        //   "servers" array of server names
        //

        // Request the ingest list if you are already logged in
        // Does nothing if you are not logged in
        requestIngestList: function () { engine.call('twitch.requestIngestList'); },

        // Log out of twitch
        logOut: function () { engine.call('twitch.logOut'); },

        //
        // requestState to request a json object with the following:
        //
        // Will get a message "twitch_statechange"
        //  "user"  - Twitch username: string
        //  "streaming" - Currently streaming: bool
        //  "paused" - Currently paused: bool
        //  "authenticated" - Passed authentication with twitch: bool
        //  "streamingDesired" - Whether we have requested streaming, connected or not: bool
        //  "enableMicCapture" - Whether we want to capture the mic: bool
        //  "enablePlaybackCapture" - Whether we want to capture computer audio such as game sounds and other apps like voice chat: bool
        //  "bitrate" - Max kbps selected for the stream
        //  "streamingResolution" - One of '720p' (others removed for various reasons)
        //  "fps" - desired broadcast frames per second
        //
        // You will also get this automatically when the state changes
        //
        // This function is intended to be called on page load to get the initial state
        // It will force a push of this update
        //
        requestState: function () { engine.call('twitch.requestState'); },

        // Send a chat message to the twitch chat for the logged on user
        sendChatMessage: function (message) { engine.call('twitch.sendChatMessage', message); },

        // Set whether streaming is enabled (as opposed to just chat)
        enableStreaming: function () { engine.call('twitch.enableStreaming'); },
        disableStreaming: function () { engine.call('twitch.disableStreaming'); },

        // Set whether we are capturing the mic input
        enableMicCapture: function () { engine.call('twitch.enableMicCapture'); },
        disableMicCapture: function () { engine.call('twitch.disableMicCapture'); },

        // Set whether we are capturing computer audio such as game sounds and other apps like voice chat
        enablePlaybackCapture: function () { engine.call('twitch.enablePlaybackCapture'); },
        disablePlaybackCapture: function () { engine.call('twitch.disablePlaybackCapture'); },

        // Run a commercial for viewers
        runCommercial: function () { engine.call('twitch.runCommercial'); },

        //
        // requestLiveStreamList to get a list of live Planetary Annihilation streams on Twith.tv
        //
        // Will get a message "twitch_live_game_list"
        //  Contains an array of:
        //      "channel_url" - The URL of the twitch channel
        //      "preview_url_template" - The URL of the preview image
        //      "stream_title" - The title of the stream
        //      "channel_display_name" - The name of the channel
        //      "viewer_count" - The number of viewers
        //
        // This is not updated automatically and should be called whenever you wish to refresh the list 
        //
        requestLiveStreamList: function () { engine.call('twitch.requestLiveStreamList'); },

        // Open the twitch page in an external browser. This is probably temporary until we get in situ working
        launchTwitchPage: function (channel_name) { engine.call('twitch.launchTwitchPage', channel_name); },
        
        setBitrate: function (bitrate) { engine.call('twitch.setBitrate', bitrate); },
        setResolution: function (resolution) { engine.call('twitch.setResolution', resolution); },
        setFPS: function (fps) { engine.call('twitch.setFPS', Number(fps)); },
        setServer: function (server) { engine.call('twitch.setServer', server); } 
    };
};
init_twitch(window.api);
