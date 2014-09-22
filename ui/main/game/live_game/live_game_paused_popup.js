var model;
var handlers = {};

$(document).ready(function () {
    function GamePausedViewModel() {
        var self = this;

        self.navToResume = function () {
            api.Panel.message(api.Panel.parentId, 'game_paused.resume');
        };
    }
    
    model = new GamePausedViewModel();
    
    // inject per scene mods
    if (scene_mod_list['live_game_paused_popup'])
        loadMods(scene_mod_list['live_game_paused_popup']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);
});