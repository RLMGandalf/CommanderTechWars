var model;
var handlers = {};

$(document).ready(function () {

    function ParsedSelectionViewModel(map) {
        var self = this;

        self.types = ko.observableArray(_.keys(map));
        self.counts = ko.observableArray(_.pluck(map, 'length'));

        self.iconForSpec = function (id) {
            var baseName = /\/([^\/]*)\.json/.exec(id).pop();
            return 'img/build_bar/units/' + baseName + '.png';
        };

        self.list = ko.computed(function () {
            var counts = self.counts();
            return _.map(self.types(), function(type, index) {
                return {
                    type: type,
                    count: counts[index],
                    icon: self.iconForSpec(type)
                };
            });
        });
    }

    function SelectionViewModel() {
        var self = this;
        
        self.selectionModel = ko.observable(new ParsedSelectionViewModel({}));
        self.selectionList = ko.computed(function () { return self.selectionModel().list() });
        
        self.parseSelection = function(payload) {
            self.selectionModel(new ParsedSelectionViewModel(payload.spec_ids));
            api.Panel.onBodyResize();
            _.delay(api.Panel.onBodyResize);
        };
        
        self.onSelectionDisplayClick = function(index, event, force_remove) {
            api.Panel.message(api.Panel.parentId, 'panel.invoke', [
                'onSelectionDisplayClick',
                index,
                {
                    shiftKey: event.shiftKey,
                    ctrlKey: event.ctrlKey,
                    button: event.button
                },
                force_remove
            ]);
        };
        
        self.active = ko.observable(true);
        
        self.setup = function () {
            $(window).focus(function() { self.active(true); });
            $(window).blur(function() { self.active(false); });
        };
    }
    model = new SelectionViewModel();
    
    handlers.selection = model.parseSelection;

    // inject per scene mods
    if (scene_mod_list['live_game_selection'])
        loadMods(scene_mod_list['live_game_selection']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // run start up logic
    model.setup();
});
