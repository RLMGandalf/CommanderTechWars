var model;
var handlers = {};

$(document).ready(function () {
    
    function BuildHoverViewModel() {
        var self = this;

        self.state = ko.observable({});
        self.name = ko.computed(function() { return self.state().name || ''; });
        self.desc = ko.computed(function() { return self.state().desc || ''; });
        self.damage = ko.computed(function () { return self.state().damage || ''; }).extend({ numeric: 2 });
        self.cost = ko.computed(function () { return self.state().cost || ''; }).extend({ numeric: 2 });
        self.fireRate = ko.computed(function () { return self.state().fireRate || ''; }).extend({ numeric: 2 });
        self.buildPower = ko.computed(function () { return self.state().buildPower || ''; }).extend({ numeric: 2 });
        self.buildEfficency = ko.computed(function () { return self.state().buildEfficency || ''; }).extend({ numeric: 2 });
        self.siconUrl = ko.computed(function() { return self.state().siconUrl || ''; });
        
        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
            
            api.Panel.query(api.Panel.parentId, 'panel.invoke', ['buildHover']).then(function(state) { self.state(state || {}); });
        };
    }
    model = new BuildHoverViewModel();

    handlers.state = function (payload) {
        model.state(payload);
    };
    
    // inject per scene mods
    if (scene_mod_list['live_game_build_hover'])
        loadMods(scene_mod_list['live_game_build_hover']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
