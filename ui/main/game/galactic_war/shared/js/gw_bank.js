define([
], function(
) {
    var LS_KEY = 'gw_bank';

    var self;
    
    var loading = false;
    
    var GWBank = function() {
        self = this;
        
        self.startCards = ko.observableArray();
        self.startCards.subscribe(function() { 
            self.save();
        });
        
        self.load();
    };
    
    GWBank.prototype = {

        load : function() {
            
            loading = true;
            var bankJson = localStorage[LS_KEY];
            if (typeof bankJson !== 'string') {
                self.startCards([]);
                loading = false;
                return;
            }

            var config = JSON.parse(bankJson);
            self.startCards(config.startCards);
            loading = false;
        },

        save : function() {
            if (loading)
                return;
            localStorage.setItem(LS_KEY, ko.toJSON(self));
        },
        
        addStartCard: function(card) {
            if (self.hasStartCard(card))
                return false;
            self.startCards.push(card);
            return true;
        },
        hasStartCard: function(card) {
            return _.some(self.startCards(), _.bind(_.isEqual, this, card));
        }
    };
    
    return new GWBank();
});
