function init_audio(api) {

    var current_music = '';

    api.audio = {
        toggleMusic: function () { engine.call('audio.toggleMusic'); },
        pauseMusic: function(paused) { engine.call('audio.pauseMusic', paused); },
        isMusicPaused: function() { return engine.call('audio.isMusicPaused'); },
        playSound: function (cue) {
            if (cue)
                engine.call('audio.playSound', String(cue));
        },
        playSoundAtLocation: function (cue, x, y, z) {
            if (cue)
                engine.call('audio.playSoundAtLocation', String(cue), Number(x), Number(y), Number(z));
        },
        setMusic: function (cue) {
            if (cue && cue !== current_music) {
                current_music = cue;
                engine.call('audio.setMusic', cue);
            }
        },
        toggleLogging: function () { engine.call('audio.toggleLogging'); }
    };
};
init_audio(window.api);


