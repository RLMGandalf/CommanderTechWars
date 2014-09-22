var model;
var handlers = {};

$(document).ready(function () {
    
    function TimeBarViewModel() {
        var self = this;

        self.timeSpeed = ko.observable(1.0);
        self.paused = ko.observable(false);

        self.skipBack30 = function () {
            api.time.skip(-30.0);
        };
        self.skipBack15 = function () {
            api.time.skip(-15.0);
        };
        self.skipFwd30 = function () {
            api.time.skip(30.0);
        };
        self.skipFwd120 = function () {
            api.time.skip(120.0);
        };
        self.seekBack = function () {
            self.paused(false);
            var ts = self.timeSpeed();
            ts = ((ts < 0.0) ? ts * 2.0 : -2.0);
            self.timeSpeed(ts);
            api.time.play(ts);
        };
        self.playBack = function () {
            self.paused(false);
            self.timeSpeed(-1.0);
            api.time.play(-1.0);
        };
        self.pause = function () {
            self.paused(true);
            api.time.pause();
        };
        self.resume = function () {
            self.paused(false);
            api.time.resume();
        };
        self.playForward = function () {
            self.paused(false);
            self.timeSpeed(1.0);
            api.time.play(1.0);
        };
        self.seekForward = function () {
            self.paused(false);
            var ts = self.timeSpeed();
            ts = ((ts > 0.0) ? ts * 2.0 : 2.0);
            self.timeSpeed(ts);
            api.time.play(ts);
        };

        self.inTimeScrub = ko.observable(false);

        self.timeScrubStartX = ko.observable(0.0);
        self.timeScrubCurrentX = ko.observable(0.0);
        self.timeScrubBaseTime = ko.observable(0.0);

        self.currentTimeInSeconds = ko.observable(0.0);
        self.endOfTimeInSeconds = ko.observable(0.0);
        self.timeFraction = ko.computed(function () {
            return (self.endOfTimeInSeconds()) ? self.currentTimeInSeconds() / self.endOfTimeInSeconds() : 0.0;
        });
        self.timePercentString = ko.computed(function () {
            return '' + (100 * self.timeFraction()) + '%';
        });

        var $time_progress_frame = $('.div_time_progress_frame');

        self.timeProgressFrameWidth = ko.observable($time_progress_frame.width());

        window.onresize = function () {
            self.timeProgressFrameWidth($time_progress_frame.width());
        }

        self.timeScrubValue = ko.computed(function () {
            return (self.timeProgressFrameWidth() * self.timeFraction());
        });

        self.timeScrubTargetTime = ko.computed(function () {
            return (self.timeScrubValue() / self.timeProgressFrameWidth()) * self.endOfTimeInSeconds();
        });

        self.timeScrubPixel = ko.computed(function () {
            return '' + Math.round(self.timeScrubValue() - 11) + 'px';
        });

        self.startTimeScrub = function () {
            var event = window.event;
            self.inTimeScrub(true);
            self.timeScrubStartX(event.screenX);
            self.timeScrubBaseTime(self.currentTimeInSeconds());
            api.time.pushSpeed();
            api.time.pause();
        };
        self.stopTimeScrub = function () {
            self.inTimeScrub(false);
            api.time.play(1.0);
            api.time.popSpeed();
        };
        self.updateTimeScrub = function() {
            var dx = self.timeScrubCurrentX() - self.timeScrubStartX();
            var dt = (dx / self.timeProgressFrameWidth()) * self.endOfTimeInSeconds();
            var target = self.timeScrubBaseTime() + dt;

            if (target > self.endOfTimeInSeconds())
                target = self.endOfTimeInSeconds();
            if (target < 0)
                target = 0;
            api.time.set(Number(target));
        };
        
        self.close = function() {
            api.Panel.message(api.Panel.parentId, 'time_bar.close');
        };

        self.currentTimeString = ko.computed(function () {
            return UberUtility.createTimeString(self.currentTimeInSeconds());
        });

        self.endOfTimeString = ko.computed(function () {
            return UberUtility.createTimeString(self.endOfTimeInSeconds());
        });

        self.setup = function () {
            $(document).mousemove(function (event) {
                if (model.inTimeScrub()) {
                    self.timeScrubCurrentX(event.screenX);
                    model.updateTimeScrub();
                }
            });
            $(document).mouseup(function (event) {
                if (model.inTimeScrub())
                    model.stopTimeScrub();
            });
        };
    }
    model = new TimeBarViewModel();

    var pauseProbe = 0;
    handlers.time = function (payload) {
        model.currentTimeInSeconds(payload.current_time);
        // On start-up, we don't know if time is already paused.  This detects that situation.
        if (!pauseProbe) {
            _.delay(function() {
                if (model.currentTimeInSeconds() === payload.current_time)
                    model.paused(true);
            }, 1000);
        }
        ++pauseProbe;
       
        if (!model.inTimeScrub())
            model.endOfTimeInSeconds(payload.end_time);
    };

    // inject per scene mods
    if (scene_mod_list['live_game_time_bar'])
        loadMods(scene_mod_list['live_game_time_bar']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
