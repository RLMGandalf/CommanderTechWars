define([
    'shared/gw_game'
], function(
    GWGame
) {
    var MANIFEST_DB = 'gw_manifest';
    var MANIFEST_STORE = 'manifest';
    var MANIFEST_KEY = 'manifest';
    
    var GAME_STORE = 'games';
    
    var dbOpen = function() {
        var openRequest = indexedDB.open(MANIFEST_DB, 1);
        var result = $.Deferred();
        openRequest.onupgradeneeded = function(event) {
            var db = event.target.result;
            db.createObjectStore(MANIFEST_STORE);
            db.createObjectStore(GAME_STORE, {
                keyPath: 'id'
            });
        };
        openRequest.onsuccess = function(event) {
            var db = event.target.result;
            db.onerror = function(event) {
                console.error("GWManifest db error: " + event.target.errorCode);
            };
            result.resolve(db);
        };
        openRequest.onerror = function(event) {
            console.error("Unable to open GWManifest db: " + event.target.errorCode);
        };
        
        return result.promise();
    }();

    var self;
    
    var loading = false;
    var saving = false;
    var subscriptions = {};
    
    var removeFunctions = function(o) {
        if (typeof o === 'function') {
            return;
        }
        if (_.isArray(o)) {
            var needsFilter = false;
            for (var i = 0; i < o.length; ++i) {
                o[i] = removeFunctions(o[i]);
                if (o[i] === undefined)
                    needsFilter = true;
            }
            if (needsFilter)
                o = _.filter(o, function(element) { return element === undefined; });
        } 
        else if (typeof o === 'object') {
            for (var key in o) {
                var value = removeFunctions(o[key]);
                if (value === undefined)
                    delete o[key];
                else
                    o[key] = value;
            }
        }
        return o;
    };
    
    var GWManifest = function() {
        self = this;
        
        self.games = ko.observableArray([]);
        self.games.subscribe(function() { 
            if (!loading)
                self.save();
        });
        self.ready = ko.observable(false);
        
        self.load();
    };
    
    GWManifest.prototype = {

        load : function() {
            if (loading)
                return loading;
            
            var finishLoading = function() {
                self.ready(true);
                var wasLoading = loading;
                loading = false;
                wasLoading.resolve(self);
            };
            loading = $.Deferred();
            dbOpen.then(function(db) {
                var loadOp = db
                        .transaction([MANIFEST_STORE], 'readwrite')
                        .objectStore(MANIFEST_STORE)
                        .get(MANIFEST_KEY);
                loadOp.onsuccess = function(event) {
                    self.games(loadOp.result || []);
                    finishLoading();
                };
                loadOp.onerror = function(event) {
                    self.games([]); // Be empty.
                    finishLoading();
                };
            });
            return loading.promise();
        },

        save : function() {
            if (loading)
                return;

            // Capture games before we exit scope
            var games = self.games().slice(0);
            
            var result = $.Deferred();
            dbOpen.then(function(db) {
                var saveOp = db
                        .transaction([MANIFEST_STORE], 'readwrite')
                        .objectStore(MANIFEST_STORE)
                        .put(games, MANIFEST_KEY);
                saveOp.onsuccess = function(event) {
                    result.resolve();
                };
                saveOp.onerror = function(event) {
                    result.fail(event);
                };
            });
            return result.promise();
        },

        hasGame : function(game) { 
            return _.some(self.games(), function(have) { return game.id === have.id; });
        },
        
        addGame : function(game) {
            if (!self.hasGame(game))
                self.games.push({id: game.id});
            
            if (!subscriptions[game.id]) {
                subscriptions[game.id] = game;
                var index = _.findIndex(self.games(), {id: game.id});
                ko.computed(function() {
                    var entry = self.games()[index];
                    
                    // When adding data to the manifest, add reading here
                    entry.name = game.name();
                    entry.commander = game.inventory().tags().global.commander.ObjectName;
                    entry.stars = game.galaxy().stars().length;
                    entry.cards = game.inventory().cards().length;
                    entry.wins = game.stats().wins();
                    entry.turns = game.stats().turns();
                    entry.state = game.gameState();
                    entry.currentStar = game.galaxy().stars()[game.currentStar()].name();

                    if (!saving) {
                        saving = _.defer(function() {
                            self.save();
                            saving = false;
                        });
                    }
                }, self, {
                    disposeWhen: function() {
                        return !subscriptions[game.id];
                    }
                });
            }
        },
        
        removeGame: function(game) {
            var id = game.id;
            
            delete subscriptions[id];
            var index = _.findIndex(self.games(), function(g) { return g.id === id});
            if (index >= 0)
                self.games.splice(index, 1);

            var result = $.Deferred();
            dbOpen.then(function(db) {
                var removeOp = db
                        .transaction([GAME_STORE], 'readwrite')
                        .objectStore(GAME_STORE)
                        .delete(id);
                removeOp.onsuccess = function(event) {
                    result.resolve();
                };
                removeOp.onerror = function(event) {
                    result.fail(event);
                };
            });
            return result.promise();
        },
        
        loadGame : function(id) {
            var result = $.Deferred();
            dbOpen.then(function(db) {
                var loadOp = db
                        .transaction([GAME_STORE], 'readwrite')
                        .objectStore(GAME_STORE)
                        .get(id);
                loadOp.onsuccess = function(event) {
                    var config = loadOp.result;
                    if (!config) {
                        result.resolve();
                        return;
                    }
                    var game = new GWGame(config.id);
                    game.load(config).then(function() {
                        self.addGame(game);
                        result.resolve(game);
                    });
                };
                loadOp.onerror = function(event) {
                    result.fail(event);
                };
            });
            return result.promise();
        },

        saveGame : function(game) {
            var result = $.Deferred();
            $.when(
                game.busy,
                dbOpen
            ).then(function(
                game,
                db
            ) {
                var config = game.save();
                removeFunctions(config);
                var saveOp = db
                        .transaction([GAME_STORE], 'readwrite')
                        .objectStore(GAME_STORE)
                        .put(config);
                saveOp.onsuccess = function(event) {
                    self.addGame(game);
                    result.resolve(game);
                };
                saveOp.onerror = function(event) {
                    result.fail(event);
                };
            });
            return result.promise();
        },
        
        cleanup: function() {
            var waiting = 0;
            var result = $.Deferred();
            dbOpen.then(function(db) {
                var gameStore = db
                        .transaction([GAME_STORE], 'readwrite')
                        .objectStore(GAME_STORE);
                var cleanupCursor = gameStore.openCursor();
                cleanupCursor.onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        if (!self.hasGame({id: cursor.key})) {
                            var deleteOp = cursor.delete();
                            ++waiting;
                            deleteOp.onsuccess = function() {
                                --waiting;
                                if (!waiting)
                                    result.resolve();
                            };
                            deleteOp.onerror = deleteOp.onsuccess;
                        }
                        cursor.continue();
                    }
                    else {
                        if (!waiting)
                            result.resolve();
                    }
                };
            });
            return result.promise();
        }
    };
    
    return new GWManifest();
});
