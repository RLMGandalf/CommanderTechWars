$(document).ready(function () {

    function MainViewModel() {
        var self = this;
        self.useLiveGameUberBar = ko.observable(false);
        self.showGame = ko.observable(false);
        self.showGame.subscribe(function () {
            api.Panel.message("game", "video_complete");
        });
        self.showPlayer = ko.observable(false);

        self.useVimeo = ko.observable(false);
        self.baseUrl = ko.computed(function () {
            return self.useVimeo() 
                ? 'http://uberlauncher.s3.amazonaws.com/vimeoplayer.html' 
                : 'http://uberlauncher.s3.amazonaws.com/youtubeplayer.html';
        });
        
        self.playerUrl = ko.observable('');

        self.playVideo = function (video_id, portfolio_id, callback) {
            self.playerUrl(self.baseUrl() + '?' + 'id=' + video_id + '&' + 'portfolio=' + portfolio_id + '&' + 'cb=' + callback);
            self.showPlayer(true);
        };

        self.playIntroVideo = function () {
            var youtube_id = 'GiqIBCe26-4';
            var vimeo_id = '105192802';
            var id = self.useVimeo() ? vimeo_id : youtube_id;
            self.playVideo(id, '299041', 'coui://ui/main/signal_finish_video.html');
        };

        self.playGalaticWarVideo = function () {
            var youtube_id = 'Tfg18BseBUY';
            var vimeo_id = '105192562';
            var id = self.useVimeo() ? vimeo_id : youtube_id;
            self.playVideo(id, '299041', 'coui://ui/main/signal_finish_video.html');
        };

        self.hasPlayedIntroOnce = ko.observable(false).extend({ local: 'has_played_release_intro' });

        self.hasSetupInfo = ko.observable().extend({ session: 'has_setup_info' });

        if (!self.hasSetupInfo()) {
            api.game.getSetupInfo().then(function (payload) {
                self.hasSetupInfo(true);
                //self.useVimeo(payload.os === 'windows') /* vimeo doesn't work on windows 8 */

                if (!self.hasPlayedIntroOnce()) {
                    self.hasPlayedIntroOnce(true);
                    self.playIntroVideo();
                }
                else
                    self.showGame(true);
            });
        }
    }
    model = new MainViewModel();

    handlers = {};
    handlers.live_game_uberbar = function (payload) {
        model.useLiveGameUberBar(payload.value);
    };
    
    handlers['game.layout'] = function(layout) {
        var $game = $("#game");
        if (layout)
            $game.attr('layout', 'layout');
        else
            $game.removeAttr('layout');
        api.panels.game.updateAttr();
    };

    handlers.play_intro = function (payload) {
        model.playIntroVideo();
    };

    handlers.play_gw_intro = function (payload) {
        model.playGalaticWarVideo();
    };

    handlers.finish_video = function (payload) {
        model.showGame(true);
        model.showPlayer(false);
        model.playerUrl('');
    };

    // inject per scene mods
    if (scene_mod_list['main'])
        loadMods(scene_mod_list['main']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);
});

