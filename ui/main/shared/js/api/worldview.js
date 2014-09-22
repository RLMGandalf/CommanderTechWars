api.getWorldView = function() {
    
    var worldViews = [];
    
    function WorldView(index) {
        this.id = index;
    }
    WorldView.prototype.whenPlanetsReady = function() { return engine.asyncCall('worldview.whenPlanetsReady', this.id); };
    WorldView.prototype.arePlanetsReady = function() { return engine.call('worldview.arePlanetsReady', this.id); };
    
    WorldView.prototype.selectByTypes = function(option, types) { 
        return engine.call('worldview.selectByTypes', this.id, option, types); 
    };
    
    return function(id) {
        // Note: If this ever gets particularly sparse (eg. thousands of views
        // with only a few active), this might have to use a different 
        // aggregation mechanism.
        if ((id < worldViews.length) && worldViews[id])
            return worldViews[id];
        if (worldViews.length <= id)
            worldViews.length = id + 1;
        worldViews[id] = new WorldView(id);
        return worldViews[id];
    }
}();
