extendedCatalog = ko.observableArray().extend({ session: 'extendedCatalog' });
if (extendedCatalog().length == 0) {
    console.log('initializing catalog');
    extendedCatalog(baseCatalog);
}

updateInventory = function (callback) {
    var call = engine.asyncCall("ubernet.getUserInventory");
        
    call.done(function (data) {
        data = JSON.parse(data);

        if (data.Inventory) {
            var ownedItems = extendedCatalog().filter(function (x) { return x.Quantity != null });
            jQuery.each(ownedItems, function (i, v) { delete v.Quantity; });

            for (i = 0; i < data.Inventory.length; i++) {
                var index = extendedCatalog().map(function (e) { return e.ObjectName; }).indexOf(data.Inventory[i].ObjectName);
                if (index != -1) {
                    jQuery.extend(extendedCatalog()[index], {
                        IsOwned: true,
                        Quantity: extendedCatalog()[index].Quantity ? extendedCatalog()[index].Quantity + 1 : 1
                    });
                }
            }
        }
        extendedCatalog(extendedCatalog());
        if (callback) { callback(); }
    });

    call.fail(function (data) {
        if (callback) { callback(); }
    });
}

updateCatalog = function (callback) {
    var call = engine.asyncCall("ubernet.getCatalog");
    
    call.done(function (data) {
        data = JSON.parse(data);

        if (data.Catalog) {
            for (i = 0; i < data.Catalog.length; i++) {
                var index = extendedCatalog().map(function (e) { return e.ObjectName; }).indexOf(data.Catalog[i].ObjectName);
                if (index != -1) {
                    jQuery.extend(extendedCatalog()[index], data.Catalog[i]);
                }
            }
        }
        extendedCatalog(extendedCatalog());
        updateInventory(callback);
    });

    call.fail(function (data) {
        if (callback) { callback(); }
    });
}