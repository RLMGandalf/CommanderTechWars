function init_camera(api) {

    var camera_pan_speed_factor = 1.0;
    var camera_zoom_speed_factor = 1.0;

    api.camera = {
        alignToPole: function() { engine.call('camera.alignToPole'); },
        
        changeKeyPanSpeed: function (factor) {
            console.log(factor);
            camera_pan_speed_factor += factor;
            camera_pan_speed_factor = (camera_pan_speed_factor < 0.01) ? 0.01 : camera_pan_speed_factor;
            engine.call('set_camera_key_pan_speed', camera_pan_speed_factor);
        },

        focusPlanet: function (index) { engine.call('camera.focusPlanet', typeof (index) === 'number' ? index : 0); },
        maybeSetFocusPlanet: function () { engine.call('camera.maybeSetFocusPlanet'); },

        freeze: function (enable) { engine.call('camera.freeze', enable) },
        lookAt: function (target) { 
            if (typeof (target) === 'object')
                target = JSON.stringify(target);
            if (typeof (target) === 'string') 
                engine.call('camera.lookAt', target);
        },

        captureAnchor: function (anchor) { engine.call('camera.captureAnchor', typeof (anchor) === 'number' ? anchor : 0); },
        recallAnchor: function (anchor) { engine.call('camera.recallAnchor', typeof (anchor) === 'number' ? anchor : 0); },

        setAllowZoom: function (enable) { engine.call('camera.setAllowZoom', enable); },
        setZoom: function (zoom, smooth) { return engine.call('camera.setZoom', typeof (zoom) === 'string' ? zoom : '', !!smooth); },
        zoom: function (zoomDelta) { engine.call("camera.zoom", zoomDelta); },

        setAllowRoll: function (enable) { engine.call('camera.setAllowRoll', enable); },
        roll: function (rollDelta) { engine.call("camera.roll", rollDelta); },

        setAllowPan: function (enable) { engine.call('camera.setAllowPan', enable); },
        pan: function (deltaX, deltaY) { engine.call("camera.pan", deltaX, deltaY); },
        
        
        track: function (enable) { engine.call('camera.track', typeof (enable) === 'boolean' ? enable : false); },
        setMode: function (mode) { return engine.call('camera.setMode', typeof (mode) === 'string' ? mode : ''); }
    };
};
init_camera(window.api);
