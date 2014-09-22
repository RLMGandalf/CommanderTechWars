window.api = {
    arch: {
        toggleMetalSpots: function () { console.log('toggleMetalSpots not bound'); },
        toggleHealthBars: function () { console.log('toggleHealthBars not bound'); },
        toggleSIcons: function () { console.log('toggleSIcons not bound'); },
        toggleShowFriendOrFoeColorsOnly: function () { console.log('toggleShowFriendOrFoeColorsOnly not bound'); },
        toggleAR: function () { console.log('toggleAR not bound'); },       
        setIconScale: function (scale) { console.log('setIconScale not bound'); },
        setNavDebug: function (enable) { console.log('setNavDebug not bound'); },
        beginFabMode: function(spec) { console.log('beginFabMode not bound'); var result = new $.Deferred(); result.resolve(false); return result; },
        endFabMode: function() { console.log('endFabMode not bound'); },
        debug: {
            setArmyFromHover: function () { console.log('setArmyFromHover not bound'); },
            toggleIgnoreVisibility: function () { console.log('toggleIgnoreVisibility not bound'); },
        }
    },
    audio: {
        toggleMusic: function () { console.log('toggleMusic not bound'); },
        playSound: function (cue) { console.log('playSound not bound'); },
        playSoundAtLocation: function (cue, x, y, z) { console.log('playSoundAtLocation not bound'); },
        toggleLogging: function () { console.log('toggleLogging not bound'); }
    },
    camera: {
        track: function () { console.log('track not bound'); },
        captureAnchor: function (anchor) { console.log('captureAnchor not bound'); },
        recallAnchor: function (anchor) { console.log('recallAnchor not bound'); },
        setMode: function(mode) { console.log('setMode not bound'); },
        alignToPole: function() { console.log('alignToPole not bound');  },
        focusPlanet: function (index) { console.log('focusPlanet not bound'); },
        changeKeyPanSpeed: function (factor) { console.log('changeKeyPanSpeed not bound'); }
    },
    debug: {
        abort: function () { console.log('abort not bound'); },
        crash: function () { console.log('crash not bound'); },
        reloadScene: function () { console.log('reloadScene not bound'); }
    },
    file: {
        mountMemoryFiles: function (files) { console.log('mountMemoryFiles not bound'); },
        unmountAllMemoryFiles: function () { console.log('unmountAllMemoryFiles not bound'); }
    },
    game: {
        toggleUI: function () { console.log('toggleUI not bound'); },
        toggleStatsPanel: function () { console.log('toggleStatsPanel not bound'); },
        toggleFullscreen: function() { console.log('toggleFullscreen not bound'); },
        captureKeyboard: function () { console.log('captureKeyboard not bound'); },
        releaseKeyboard: function (force) { console.log('releaseKeyboard not bound'); },
        cleanupViews: function() { console.log('cleanupViews not bound'); },
        debug: {
            reloadScene: function () { console.log('reloadScene not bound'); }
        }
    },
    mods: {
        getMountedMods: function (context, callback) { console.log('getMountedMods not bound'); },
        publishServerMods: function () { console.log('publishServerMods not bound'); },
        sendModFileDataToServer: function (auth_token) { console.log('sendModFileDataToServer not bound'); },
        mountModFileData: function () { console.log('mountModFileData not bound'); }
    },
    select: {
        commander: function () { console.log('commander not bound'); },
        idleFabber: function () { console.log('idleFabber not bound'); },
        captureGroup: function (group) { console.log('captureGroup not bound'); },
        recallGroup: function (group) { console.log('recallGroup not bound'); },
        empty: function() { console.log('empty not bound'); }
    },
    stats: {
        setStatWindow: function (begin, end) { console.log('setStatWindow not bound'); },
        getEntityMetadata: function () { console.log('getEntityMetadata not bound'); },
        start: function () { console.log('start not bound'); },
        stop: function () { console.log('stop not bound'); },
        setEntity: function (id, propertyMask) { console.log('setEntity not bound'); },
    },
    time: {
        control: function () { console.log('control not bound'); },
        resume: function () { console.log('resume not bound'); },
        set: function (target) { console.log('set not bound'); },
        skip: function (amount) { console.log('skip not bound'); },
        pause: function () { console.log('pause not bound'); },
        play: function (speed) { console.log('play not bound'); },
        pushSpeed: function () { console.log('pushSpeed not bound'); },
        popSpeed: function () { console.log('popSpeed not bound'); },
        frameBack: function () { console.log('frameBack not bound'); },
        frameForward: function () { console.log('frameForward not bound'); },
    },
    twitch: {
        logIn: function (twitchName, twitchPassword) { console.log('logIn not bound'); },
        requestIngestList: function () { console.log('requestIngestList not bound'); },
        logOut: function () { console.log('logOut not bound'); },
        requestState: function () { console.log('requestState not bound'); },
        sendChatMessage: function (message) { console.log('sendChatMessage not bound'); },
        enableStreaming: function () { console.log('enableStreaming not bound'); },
        disableStreaming: function () { console.log('disableStreaming not bound'); },
        enableMicCapture: function () { console.log('enableMicCapture not bound'); },
        disableMicCapture: function () { console.log('disableMicCapture not bound'); },
        enablePlaybackCapture: function () { console.log('enablePlaybackCapture not bound'); },
        disablePlaybackCapture: function () { console.log('disablePlaybackCapture not bound'); },
        runCommercial: function () { console.log('runCommercial not bound'); },
        requestLiveStreamList: function () { console.log('requestLiveStreamList not bound'); },
        launchTwitchPage: function (channel_name) { console.log('launchTwitchPage not bound'); },
        setBitrate: function (bitrate) { console.log('setBitrate not bound'); },
        setResolution: function (resolution) { console.log('setResolution not bound'); },
        setFPS: function (fps) { console.log('setFPS not bound'); },
        setServer: function (server) { console.log('setServer not bound'); }
    },
    unit: {
        selfDestruct: function () { console.log('selfDestruct not bound'); },
        build: function(spec, count, queue) { console.log('build not bound'); var result = new $.Deferred(); result.resolve(false); return result; },
        cancelBuild: function(spec, count) { console.log('cancelBuild not bound'); var result = new $.Deferred(); result.resolve(false); return result; },
        targetCommand: function(command, target, queue) { console.log('targetCommand not bound'); var result = new $.Deferred(); result.resolve(false); return result; },
        debug: {
            copy: function () { console.log('copy not bound'); },
            paste: function () { console.log('paste not bound'); }
        }
    },
    youtube: {
        launchPage: function(videoId) { console.log('launchPage not bound'); }
    },
    getWorldView: function(id) {
        var prototype = {
            whenPlanetsReady : function() { console.log('whenPlanetsReady not bound'); var result = new $.Deferred(); result.resolve(); return result.promise(); },
            arePlanetsReady : function() { console.log('arePlanetsReady not bound'); var result = new $.Deferred(); result.resolve(false); return result.promise(); },
            selectByTypes : function(option, types) { console.log('selectByTypes not bound'); }
        };
        return function() {
            return prototype;
        };
    }(),
    
    Holodeck: function(div, config, onReady) {},
    Panel: function(div, config, onReady) {},
    panels: {}
};