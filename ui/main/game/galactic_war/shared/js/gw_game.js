define([
    'shared/gw_galaxy', 
    'shared/gw_inventory',
    'shared/gw_stats',
    'shared/gw_bank',
    'shared/gw_game_patches'
], function(
    GWGalaxy, 
    GWInventory,
    GWStats,
    GWBank,
    GWGamePatches
) {
    var CURRENT_VERSION = 1;

    var genId = function() {
        return ((Math.random() * 1024 * 1024) | 0).toString();
    };

    var GWGame = function(id) {
        var self = this;
        self.id = (id === undefined) ? genId() : id;
        self.galaxy = ko.observable(new GWGalaxy());
        self.inventory = ko.observable(new GWInventory());
        self.stats = ko.observable(new GWStats());
        self.name = ko.observable("");
        self.mode = ko.observable('');
        self.currentStar = ko.observable();
        self.turnState = ko.observable();
        self.gameState = ko.observable('active');
        self.version = ko.observable(CURRENT_VERSION);

        var busy = $.Deferred();
        self.busy = busy.promise();
        busy.resolve(this);
    };

    GWGame.turnStates = {
        begin: 'begin',
        fight: 'fight',
        explore: 'explore',
        end: 'end'
    };

    GWGame.gameStates = {
        active: 'active',
        won: 'won',
        lost: 'lost'
    };

    GWGame.prototype = {
        load : function(config) {
            var self = this;
            config = config || {};
            self.id = config.id || genId();
            self.galaxy().load(config.galaxy || {});
            self.inventory().load(config.inventory || {});
            self.stats().load(config.stats || {});
            self.name(config.name || "");
            self.mode(config.mode || '');
            self.currentStar(config.currentStar);
            self.turnState(config.turnState || 'begin');
            self.gameState(config.gameState || 'active');
            
            self.version(config.version);
            
            GWGamePatches.patch(self, CURRENT_VERSION);
            
            var busy = $.Deferred();
            self.busy = busy.promise();
            self.inventory().applyCards(function() {
                busy.resolve(self);
            });
            
            return self.busy;
        },

        save : function() {
            var self = this;
            return {
                id: self.id,
                galaxy: self.galaxy().save(),
                inventory: self.inventory().save(),
                stats: self.stats().save(),
                name: self.name(),
                mode: self.mode(),
                currentStar: self.currentStar(),
                turnState: self.turnState(),
                gameState: self.gameState(),
                version: self.version()
            };
        },
        
        fight: function() {
            var self = this;
            if (self.turnState() !== GWGame.turnStates.begin)
                return false;
            self.turnState(GWGame.turnStates.fight);
            return true;
            
        },
        
        defeatTeam: function(team) {
            var self = this;
            var aiCount = 0;
            _.forEach(self.galaxy().stars(), function(star) {
                if (star.ai()) {
                    if (star.ai().team === team)
                        star.ai(undefined);
                    else
                        ++aiCount;
                }
            });
            if (!aiCount) {
                self.gameState(GWGame.gameStates.won);
            }
        },

        winTurn: function(done) {
            var self = this;
            var result = $.Deferred();
            if (self.turnState() !== GWGame.turnStates.fight &&
                self.turnState() !== GWGame.turnStates.explore) {
                result.resolve(false);
                return result;
            }
            
            var stats = self.stats();
            var stars = self.galaxy().stars();
            var inventory = self.inventory();
            var star = stars[self.currentStar()];
            var card = star.card();
            
            if (card && GWBank.hasStartCard(card)) {
                // Duplicate start cards need to be removed instead of activated.
                // This interaction with persistent state is not exposed elsewhere.
                card = undefined;
                star.card(undefined);
            }
            
            var addCard;
            
            if (self.turnState() === GWGame.turnStates.fight) {
                star.log(stats.turns(), { win: { ai: star.ai() } });
                var ai = star.ai();
                if (ai) {
                    stats.wins(stats.wins() + 1);
                    if (ai.boss)
                        self.defeatTeam(ai.team);
                    else
                        star.ai(undefined);
                }
                self.turnState(GWGame.turnStates.begin);
            }
            else {
                var duplicate = card && inventory.hasCard(card);
                var full = card && !inventory.canFitCard(card);
                star.log(stats.turns(), { win: { card: card, duplicate: duplicate || undefined, full: full || undefined } });
                if (card) {
                    if (!duplicate && !full)
                        addCard = card;
                    star.card(undefined);
                }
                self.turnState(GWGame.turnStates.end);
            }
            if (addCard) {
                var busy = $.Deferred();
                self.busy = busy.promise();
                inventory.cards.push(addCard);
                inventory.applyCards(function() {
                    busy.resolve(self);
                    result.resolve(true);
                });
            }
            else {
                result.resolve(true);
            }
            return result.promise();
        },

        loseTurn: function() {
            var self = this;
            if (self.turnState() !== GWGame.turnStates.fight)
                return false;
            var stars = self.galaxy().stars();
            var star = stars[self.currentStar()];
            if (star.ai()) {
                var stats = self.stats();
                stats.losses(stats.losses() + 1);
                star.log(stats.turns(), { lose: star.ai() });
            }
            self.turnState(GWGame.turnStates.end);
            self.gameState(GWGame.gameStates.lost);
            return true;
        },

        explore: function() {
            var self = this;
            if (self.turnState() !== GWGame.turnStates.begin)
                return false;
            self.turnState(GWGame.turnStates.explore);
            return true;
        },

        move: function(destination) {
            var self = this;

            self.turnState(GWGame.turnStates.begin);
            self.currentStar(destination);

            var stats = self.stats();
            stats.turns(stats.turns() + 1);
            
            var stars = self.galaxy().stars();
            var star = stars[self.currentStar()];
            star.log(stats.turns(), { move: 1 });
                
            return true;
        }
    };
    
    return GWGame;
});
