define([
], function(
) {
    var GWStar = function() {
        var self = this;
        self.name = ko.observable('');
        self.coordinates = ko.observable([0,0]);
        self.biome = ko.observable('');
        self.distance = ko.observable(0);
        self.card = ko.observable();
        self.history = ko.observableArray();
        self.system = ko.observable();
        self.ai = ko.observable();
    };
    GWStar.prototype = {
        load: function(config) {
            var self = this;
            config = config || {};
            self.name(config.name || '');
            self.coordinates(config.coordinates || [0,0]);
            self.biome(config.biome || '');
            self.distance(config.distance || 0);
            self.card(config.card);
            self.history(config.history || []);
            self.system(config.system || {});
            self.ai(config.ai);
        },
        save: function() {
            return ko.toJS(this);
        },
        log: function(date, details) {
            var self = this;
            self.history.push({date: date, details: details});
        }
    }
    return GWStar;
});
