function init_select(api) {

    api.select = {
        commander: function () { engine.call("select.commander"); },
        idleFabber: function () { engine.call("select.idleFabber"); },

        allCombatUnits: function () { engine.call("select.allCombatUnits"); },
        allFabbers: function () { engine.call("select.allFabbers"); },
        allFactories: function () { engine.call("select.allFactories"); },
        allIdleFactories: function () { engine.call("select.allIdleFactories"); },

        allLandCombatUnits: function () { engine.call("select.allLandCombatUnits"); },
        allAirCombatUnits: function () { engine.call("select.allAirCombatUnits"); },
        allNavalCombatUnits: function () { engine.call("select.allNavalCombatUnits"); },
        allCombatUnitsOnScreen: function () { engine.call("select.allCombatUnitsOnScreen"); },

        allFabbersOnScreen: function () { engine.call("select.allFabbersOnScreen"); },
        allFactoriesOnScreen: function () { engine.call("select.allFactoriesOnScreen"); },
        allIdleFactoriesOnScreen: function () { engine.call("select.allIdleFactoriesOnScreen"); },

        allLandCombatUnitsOnScreen: function () { engine.call("select.allLandCombatUnitsOnScreen") },
        allAirCombatUnitsOnScreen: function () { engine.call("select.allAirCombatUnitsOnScreen") },
        allNavalCombatUnitsOnScreen: function () { engine.call("select.allNavalCombatUnitsOnScreen") },

        captureGroup: function (group) { engine.call("select.captureGroup", typeof (group) == 'number' ? group : 0); },
        recallGroup: function (group) {
            if (model['endCommandMode'])
                model['endCommandMode']();
            engine.call("select.recallGroup", typeof (group) == 'number' ? group : 0);
        },
        empty: function() { engine.call('select.empty'); }
    };
};

init_select(api);