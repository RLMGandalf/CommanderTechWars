function init_time(api) {
    var current_speed = 1.0;
    var speed_stack = [];

    api.time = {
        control: function () { engine.call("time.control"); },
        resume: function () { engine.call("time.resume"); },
        set: function (target) { engine.call("time.set", target); },
        skip: function (amount) { engine.call("time.skip", amount); },
        pause: function () {
            engine.call("time.pause");
            current_speed = 0;
        },
        play: function (speed) {
            engine.call("time.play", speed);
            current_speed = speed;
        },
        pushSpeed: function () {
            speed_stack.push(current_speed);
        },
        popSpeed: function () {
            var speed = speed_stack.pop();
            if (speed)
                engine.call("time.play", speed);
            else
                engine.call("time.pause");
        },
        frameBack: function () { engine.call("time.frameBack"); },
        frameForward: function () { engine.call("time.frameForward"); },
    };
};

init_time(window.api);

