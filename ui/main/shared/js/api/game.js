function init_game(api) {

    var keyboardActivation = 0;

    api.game = {
        getSetupInfo: function() { return engine.call('game.getSetupInfo').then(function(result) { return JSON.parse(result); }); },
        toggleUI: function () { engine.call('game.toggleUI'); },
        toggleStatsPanel: function () { engine.call('game.toggleStatsPanel'); },
        toggleFullscreen: function() { engine.call('game.toggleFullscreen'); },
        captureKeyboard: function (force) {
            if (force || keyboardActivation === 0)
                engine.call('game.allowKeyboard', false);
            if (!force)
                ++keyboardActivation;
        },
        releaseKeyboard: function (force) {
            if (!force) {
                if (keyboardActivation > 0)
                    --keyboardActivation;
                if (keyboardActivation !== 0)
                    return;
            }
            engine.call('game.allowKeyboard', true);
        },
        setUnitSpecTag: function(tag) { engine.call('game.setUnitSpecTag', tag); },
        getUnitSpecTag: function() { return engine.call('game.getUnitSpecTag'); },
        cleanupViews: function() { engine.call('game.cleanupViews'); },
        getRandomPlanetName: function() { return engine.call('game.getRandomPlanetName'); },
        debug: {
            reloadScene: function (panel) { engine.call('game.debug.reloadScene', panel); },
            quickProbe: function() { engine.call('game.debug.quickProbe'); }
        }
    };
    
    $(window).unload(function() { engine.call('game.unloadPage'); });
};

init_game(window.api);