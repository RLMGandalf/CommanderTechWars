define([], function() {
    var GWInventory = function() {
        var self = this;
        self.units = ko.observableArray();
        self.mods = ko.observableArray();
        self.maxCards = ko.observable(0);
        self.cards = ko.observableArray();
        self.cards.subscribe(function() {
            self.applyCards();
        });
        self.minions = ko.observableArray([]);
        self.tags = ko.observable({});
    };
    GWInventory.prototype = {
        load: function(config) {
            var self = this;
            config = config || {};
            self.units(config.units || []);
            self.mods(config.mods || []);
            self.maxCards(config.maxCards !== undefined ? config.maxCards : 0);

            self.applyCards = function() {};
            self.cards(config.cards || []);
            delete self.applyCards;
            
            self.minions(config.minions || []);
            self.tags(config.tags || {});
        },
        save: function() {
            return ko.toJS(this);
        },
        addUnits: function(add) {
            var self = this;
            self.units(self.units().concat(add));
        },
        removeUnits: function(remove) {
            // Note: Explicitly does not perform set removes.  Multiple adds
            // of a given unit and a single remove should resolve to the unit
            // being available.
            var self = this;
            var units = self.units().slice(0);
            var removeCount = 0;
            _.forEach(remove, function(unit) {
                var index = units.indexOf(unit);
                if (index >= 0) {
                    units.splice(index, 1);
                    ++removeCount;
                }
            });
            if (removeCount)
                self.units(units);
        },
        addMods: function(mods) {
            var self = this;
            self.mods(self.mods().concat(mods));
        },
        isApplyingCards: function() { return false; },
        applyCards: function(done) {
            var self = this;
            var cards = self.cards().slice();

            // Apply an override to this object to indicate that we are busy.
            self.isApplyingCards = function() { return true; }
            // Tags are going to come from the current card
            var curCard = '';
            var _proto_getTag = _.bind(self.getTag, self);
            self.getTag = function(context, name, def) { 
                return _proto_getTag(context || curCard, name, def);
            };
            var _proto_setTag = _.bind(self.setTag, self);
            self.setTag = function(context, name, value) { 
                return _proto_setTag(context || curCard, name, value);
            };
            var dirty = false;
            // Clean-up function that gets called when everything is done.
            var finishApplyCards = function() {
                delete self.getTag;
                delete self.applyCards;
                delete self.isApplyingCards;
                if (dirty)
                    _.delay(_.bind(self.applyCards, self, done));
                else if (done)
                    _.delay(done);
            };
            // Install a hook that calls the new callback when the current
            // process has completed.
            self.applyCards = function(queueDone) {
                dirty = true;
                if (!queueDone)
                    return;
                if (done) {
                    var wrap = done;
                    done = function() {
                        wrap();
                        _.delay(queueDone);
                    };
                }
                else
                    done = queueDone;
            };
            
            var cardCount;
            var finishPhase;
            var finishCard = function(card) {
                --cardCount;
                if (!cardCount)
                    finishPhase();
            };
            var applyCardOp = function(op, cardParams) {
                var cardId;
                if (typeof cardParams === 'string') {
                    cardId = cardParams;
                    cardParams = undefined;
                }
                else
                    cardId = cardParams.id;
                require(['cards/' + cardId], function(card) {
                    curCard = cardId;
                    card[op](self, cardParams);
                    finishCard();
                }, function(error) {
                    console.error('Failed loading card', cardId,':', error);
                    finishCard();
                });
            };
            var resetCardCount = function() {
                cardCount = cards.length;
            };
            var applyBuffs = function() {
                resetCardCount();
                finishPhase = applyDulls;
                _.forEach(cards, _.bind(applyCardOp, self, 'buff'));
            };
            var applyDulls = function() {
                resetCardCount();
                finishPhase = finishApplyCards;
                _.forEach(cards, _.bind(applyCardOp, self, 'dull'));
            }

            self.units([]);
            self.mods([]);
            self.maxCards(0);
            self.minions([]);
            
            applyBuffs();
        },
        hasCard: function(test) {
            var self = this;
            return _.some(self.cards(), function(card) { 
                return _.isEqual(card, test);
            });
        },
        hasCardLike: function(test) {
            var self = this;
            return _.some(self.cards(), { id: test.id });
        },
        lookupCard: function(test) {
            var self = this;
            var cardSearch = _.isString(test) ? {id: test} : test;
            return _.findIndex(self.cards(), cardSearch);
        },
        canFitCard: function(test) {
            var self = this;
            // This is an unfortunate bit of back-channel information.  The
            // card parameters are supposed to be opaque, but this is the best
            // channel for communicating between the card & the inventory.
            // Without this, the card would have to be loaded, which would
            // significantly complicate the system.
            if (typeof test === 'object' && test.allowOverflow)
                return true;
            if (self.cards().length >= self.maxCards())
                return false;
            return true;
        },

        // Get a tag value.  When called during card processing, an empty
        // context will be replaced with the current card.
        getTag: function(context, name, def) {
            var self = this;
            var tags = self.tags();
            if (!tags.hasOwnProperty(context)) {
                if (typeof def === 'undefined')
                    return;
                tags[context] = {};
            }
            var tagContext = tags[context];
            if (!tagContext.hasOwnProperty(name)) {
                if (typeof def === 'undefined')
                    return;
                tagContext[name] = def;
            }
            return tagContext[name];
        },
        setTag: function(context, name, value) {
            var self = this;
            var tags = self.tags();
            if (typeof value === 'undefined') {
                if (tags[context]) {
                    delete tags[context][name];
                    if (_.isEmpty(tags[context]))
                        delete tags[context];
                }
            }
            else {
                if (!tags.hasOwnProperty(context))
                    tags[context] = {};
                tags[context][name] = value;
            }
        }
    };
    return GWInventory;
});
