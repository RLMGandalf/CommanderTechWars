var model;
var handlers = {};

$(document).ready(function () {

    function ChatMessageModel(object) {
        var self = this;
        self.message = object.message ? object.message : "";
        self.player_name = object.player_name ? object.player_name : "";
        self.type = object.type ? object.type : "global";
        self.time_stamp = new Date().getTime();

        self.isGlobal = ko.computed(function () {
            return self.type === "global";
        });
        self.isTeam = ko.computed(function () {
            return self.type === "team";
        });
        self.isTwitch = ko.computed(function () {
            return self.type === "twitch";
        });
        self.isServer = ko.computed(function () {
            return self.type === "server";
        });
    }

    function ChatViewModel() {
        var self = this;
        
        self.state = ko.observable({});
        self.chatSelected = ko.computed(function() { return !!self.state().selected; });
        self.twitchChat = ko.computed(function() { return !!self.state().twitch; });
        self.teamChat = ko.computed(function() { return !!self.state().team; });
        
        self.visibleChat = ko.observableArray();
        self.chatLog = ko.observableArray();
        
        self.chatType = ko.computed(function () {
            return (self.teamChat()) ? "TEAM:" : (self.twitchChat() ? "TWITCH:" : "ALL:");
        });
        
        self.hideChat = function() {
            api.Panel.focus(api.Panel.parentId);
            api.Panel.message(api.Panel.parentId, 'chat.selected', false);
        };

        self.squelchGlobalChat = ko.observable(false);

        self.$form = function() { return $(".chat_input_form"); };
        self.$input = function() { return $(".input_chat_text"); };
        self.$input().blur(self.hideChat);
        self.$input().keydown(function(event) {
            if (event.keyCode === keyboard.esc)
                self.hideChat();
        });

        self.maybeSendChat = function () {
            var msg = {};
            msg.message = self.$input().val();

            if (!msg.message || !msg.message.length) {
                self.hideChat();
                return;
            }

            if (msg.message && self.teamChat())
                model.send_message("team_chat_message", msg);
            else if (msg.message && self.twitchChat())
                api.twitch.sendChatMessage(msg.message);
            else if (msg.message)
                model.send_message("chat_message", msg);

            self.$input().val("");
            self.hideChat();
        };
        
        self.removeOldChatMessages = function () {
            var date = new Date();
            var cutoff = date.getTime() - 15 * 1000;

            while (self.visibleChat().length > 0 && self.visibleChat()[0].time_stamp < cutoff)
                self.visibleChat.shift();
        };
        
        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
            
            api.Panel.query(api.Panel.parentId, 'panel.invoke', ['chatState']).then(model.state);
            setInterval(model.removeOldChatMessages, 500);
        };
    }
    model = new ChatViewModel();

    handlers.submit = function() {
        model.$form().submit();
        model.hideChat();
    };
    
    handlers.scrollToTop = function() {
        $(".div_chat_log_feed").scrollTop($(".div_chat_log_feed")[0].scrollHeight);
    };
    
    handlers.chat_message = function (payload) {
        var chat_message = new ChatMessageModel(payload);
        model.chatLog.push(chat_message);
        model.visibleChat.push(chat_message);
        $(".div_chat_feed").scrollTop($(".div_chat_feed")[0].scrollHeight);
        $(".div_chat_log_feed").scrollTop($(".div_chat_log_feed")[0].scrollHeight);
    };

    handlers.set_squelch_global_chat = function (payload) {
        model.squelchGlobalChat(!!payload);
    }

    handlers.state = function (payload) {
        model.state(payload);
    };

    // inject per scene mods
    if (scene_mod_list['live_game_chat'])
        loadMods(scene_mod_list['live_game_chat']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
