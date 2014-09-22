(function() {
  "use strict";
  window.Omega = {
    Models: {
      Cards: {}
    },
    Collections: {
      Collection: Backbone.Collection
    },
    Geom: {},
    Views: {},
    Utils: {},
    Templates: window.JST || []
  }
  var module = new Jaff.Module();
  Omega.define = function($) { return module.define($); };
  Omega.require = function($) { return module.require($); };
})();

Omega.define(function() {
  "use strict";

  var config = Omega.require('Omega.config'),
      GameModel = Omega.require('Omega.Models.GameModel'),
      GameCollection = Omega.require('Omega.Collections.GameCollection'),
      GalaxyModel = Omega.require('Omega.Models.GalaxyModel'),
      DeckModel = Omega.require('Omega.Models.DeckModel'),
      NewGameView = Omega.require('Omega.Views.NewGameView'),
      SavedGamesView = Omega.require('Omega.Views.SavedGamesView'),
      GameView = Omega.require('Omega.Views.GameView'),
      StarmapView = Omega.require('Omega.Views.StarmapView'),
      CurrentTargetView = Omega.require('Omega.Views.CurrentTargetView'),
      PlayingModal = Omega.require('Omega.Views.PlayingModal'),
      SystemModel = Omega.require('Omega.Models.SystemModel');

  Omega.Application = function() { this.initialize(); }

  Omega.Application.prototype = {
    initialize: function() {
      this.jsonRequests = [];
      this.jsonRequests.push($.getJSON(config.pathToJson + '/names.json', function(data) {
        config.systemNames = _.unique(data);
      }));
      config.planetTemplates = [];
      config.planetFiles.forEach(function(file){
        this.jsonRequests.push($.getJSON(config.pathToJson + '/' + file, function(data) {
          config.planetTemplates.push(data);
        }))
      },this);
    },

    run: function () {
      var whichView = window.location.hash.substr(2) || localStorage.galactic_war_view;
      localStorage.galactic_war_view = (whichView == 'exit') ? '' : whichView;
      this.history = ['exit'];
      $.when.apply($, this.jsonRequests).done($.proxy(this.loadView, this));
    },

    loadView: function() {
      switch(localStorage.galactic_war_view) {
        case 'test':
          this.playPA();
          break;
        case 'clear':
          this.clearLocalStorage();
          alert('All clear!');
          break;
        case 'newGame':
          this.startNewGame();
          break;
        case 'loadGame':
          this.loadSavedGame();
          break;
        case 'exit':
          window.location.href = config.pathToExit;
          break;
        case 'lastGame':
          this.lastGame();
          break;
        case 'results':
          this.battleResults();
          break;
        default:
          this.loadSavedGame();
          break;
      }
    },

    clearLocalStorage: function() {
      localStorage.removeItem('galactic_war_view');
      _.each(['gwdb_game', 'gwdb_galaxy', 'gwdb_deck'], function(name){
        var store = new Backbone.LocalStorage(name);
        store._clear();
      });
    },

    battleResults: function () {
        var results = JSON.parse('[{"faction":0,"commander":{"lastPosition":"system-0","newPosition":"system-3"},"systemsOwned":["System 0","System 1","System 10","System 11","System 12","System 3","System 4","System 7","System 8","System 9"],"systemsLost":[],"systemsWon":["System 1","System 10","System 11","System 3","System 7"]},{"faction":1,"commander":{"lastPosition":"system-10"},"systemsOwned":[],"systemsLost":["System 10","System 11","System 3","System 5"],"systemsWon":[]},{"faction":2,"commander":{"lastPosition":"system-16","newPosition":"system-16"},"systemsOwned":["System 14","System 16","System 19","System 5","System 6"],"systemsLost":["System 17"],"systemsWon":["System 14","System 19","System 5","System 6"]},{"faction":3,"commander":{"lastPosition":"system-18","newPosition":"system-15"},"systemsOwned":["System 13","System 15","System 17","System 18"],"systemsLost":[],"systemsWon":["System 13","System 15","System 17"]}]'),
            //results = JSON.parse('[{ "faction" : 0,"color" : "red","commander" : { "lastPosition" : 6,"newPosition" : 4}, "systemsWon" : [4, 10, 11], "systemsLost" : [2, 15], "systemsOwned" : [1, 4, 6, 10, 11, 18]}, { "faction" : 1,"color" : "green","commander" : { "lastPosition" : 9,"newPosition" : 13}, "systemsWon" : [13, 15], "systemsLost" : [10, 19], "systemsOwned" : [3, 7, 9, 13, 15]}, { "faction" : 2,"color" : "yellow","commander" : { "lastPosition" : 17,"newPosition" : 2}, "systemsWon" : [2, 5], "systemsLost" : [8, 13, 14], "systemsOwned" : [2, 5, 15, 17]}]'),
            cards = JSON.parse('[{ "title" : "Defensive Campaign","type" : "galaxy"}, { "title" : "Attack Campaign","type" : "galaxy"}, { "title" : "Installation Base","type" : "system"}, { "title" : "Covert Operation","type" : "system"}, { "title" : "Type I","type" : "planet"}, { "title" : "Type II","type" : "planet"}]');
        if (!this.game) {
          var id = this.getLastGameId();
          this.game = GameModel.findOrCreate(id);
          this.game.fetch();
        }
        this.game.set('isPlayCards', false);
        this.game.set('factionResults', results);
        this.game.set('awardedCards', cards);
        var galaxy = this.game.fetchRelated('galaxy'),
            deck = this.game.fetchRelated('deck');
        $.when(galaxy, deck).then($.proxy(function(){
          this.playGame();
        }, this));
    },

    startNewGame: function() {
      this.clearScreen();
      this.game = new GameModel();
      this.view = new NewGameView({
        el: '.container',
        model: this.game
      });
      this.view.on('cancel', this.navBack, this);
      this.view.on('create', this.buildNewGame, this);
      this.view.render();
    },

    //TODO: Move this into the GameModel
    buildNewGame: function() {
      this.buildNewGalaxy();
      this.dealNewDeck();
      this.game.save();
      this.playGame();
    },

    buildNewGalaxy: function() {
      var galaxy = new GalaxyModel({
        seed: this.game.get('seed'),
        galaxySize: this.game.get('galaxySize'),
        playerFaction: this.game.get('factionColor')
      });
      galaxy.build();
      galaxy.save();
      this.game.set('galaxy', galaxy);
    },

    dealNewDeck: function() {
      var deck = new DeckModel({
        seed: this.game.get('seed')
      });
      deck.build();
      deck.save();
      this.game.set('deck', deck);
    },
    //END

    loadSavedGame: function() {
      this.savedGames = new GameCollection();
      this.savedGames.fetch();
      this.clearScreen();
      this.view = new SavedGamesView({
          el: '.container',
          collection: this.savedGames
      });
      this.view.render();
      this.view.on('back', this.navBack, this);
      this.view.on('delete', this.deleteGame, this);
      this.view.on('load', this.loadGame, this);
      this.view.on('new', function() { this.history.push('loadGame'); this.startNewGame(); }, this);
    },

    deleteGame: function(id) {
      var game = this.savedGames.get(id),
          galaxy, deck;
      this.savedGames.remove(game);
      galaxy = game.fetchRelated('galaxy');
      deck = game.fetchRelated('deck');
      $.when(galaxy, deck).then(function(){
        game.get('galaxy').destroy();
        game.get('deck').destroy();
        game.destroy();
      });
    },

    lastGame: function(id) {
      var id = this.getLastGameId();
      this.loadGame(id);
    },

    getLastGameId: function() {
      this.savedGames = new GameCollection();
      this.savedGames.fetch();
      return this.savedGames.pluck('id').pop();
    },

    loadGame: function(id) {
      this.game = this.savedGames.get(id);
      var galaxy = this.game.fetchRelated('galaxy'),
          deck = this.game.fetchRelated('deck');
      $.when(galaxy, deck).then($.proxy(function(){
        this.playGame();
      }, this));
    },

    playGame: function() {
      this.clearScreen();
      this.view = new GameView({
        el: '.container',
        model: this.game
      });
      this.view.render();
      this.view.on('quit', this.navBack, this);
      this.game.on('playPA', this.playPA, this);
    },

    playPA: function() {
      this.clearScreen();
      if (this.game) {
        this.results = { gameId: this.game.id };
        this.game.save();
        this.game.get('galaxy').save();
        this.game.get('deck').save();
      } else {
        var id = this.getLastGameId();
        this.results = { gameId: id };
      }
      this.game = null;
      this.view = new PlayingModal({
        el: '.container'
      });
      this.view.render();
      this.view.on('done', this.returnFromPA, this);
    },

    returnFromPA: function(playerWon) {
      this.results.playerWon = playerWon;
      Backbone.Relational.store.reset();
      //this.game = GameModel.findOrCreate(this.results.gameId);
      this.game = new GameModel({ id: this.results.gameId });
      this.game.fetch();
      var galaxy = this.game.fetchRelated('galaxy'),
          deck = this.game.fetchRelated('deck');
      $.when(galaxy, deck).then($.proxy(function(){
        this.game.resolveRound(playerWon);
        this.playGame();
      }, this));
    },

    navBack: function() {
      localStorage.galactic_war_view = this.history.pop();
      this.loadView();
    },

    clearScreen: function() {
      if (this.view) this.view.remove();
      this.view = null;
      $('#all').html('<div class="container"></div>');
    }
  };
});

Omega.define(function() {
  "use strict";
  var Collection = Omega.require('Omega.Collections.Collection'),
      CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Collections.CardCollection = Collection.extend({
      model: CardModel
  });
});

Omega.define(function() {
  "use strict";
  var Collection = Omega.require('Omega.Collections.Collection'),
      CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Collections.DeckCollection = Collection.extend({
    model: CardModel
  });
});

Omega.define(function() {
  "use strict";
  var Collection = Omega.require('Omega.Collections.Collection'),
      GameModel = Omega.require('Omega.Models.GameModel');

  Omega.Collections.GameCollection = Collection.extend({
    localStorage: new Backbone.LocalStorage('gwdb_game'),
    model: GameModel,
    //TODO: reverse order?
    comparator: 'lastBattle'
  });
});

Omega.define(function() {
  "use strict";
  var Collection = Omega.require('Omega.Collections.Collection'),
      PlanetModel = Omega.require('Omega.Models.PlanetModel');

  Omega.Collections.PlanetCollection = Collection.extend({
    model: PlanetModel
  });
});

Omega.define(function() {
  "use strict";
  var Collection = Omega.require('Omega.Collections.Collection'),
      SystemModel = Omega.require('Omega.Models.SystemModel');

  Omega.Collections.SystemCollection = Collection.extend({
    model: SystemModel
  });
});

Omega.define(function() {
  'use strict';
  Omega.config = Omega.config || {};
  Omega.config.cards = [{
// ========== PLANET ========== //
    model: 'PlanetCardModel',
    type: 'planet',
    title: 'Type I',
    description: 'Type I planet card.  No effect.',
    duration: 1,
    weight: 5
  },{
    model: 'PlanetCardModel',
    type: 'planet',
    title: 'Type II',
    description: 'Type II planet card.  No effect.',
    duration: 1,
    weight: 5
  },{
    model: 'PlanetCardModel',
    type: 'planet',
    title: 'Type III',
    description: 'Type III planet card.  No effect.',
    duration: 1,
    weight: 2
  },
// ========== SYSTEM ========== //
// ===== DieRollCardModel ===== //
    {
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Installation: Ops Relay',
    description: 'All auto-resolved battles fought in any adjacent system receives a +10% bonus.',
    attackBonus: 10,
    range: 'adjacent',
    duration: 1,
    weight: 2,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Installation: Command Station',
    description: 'All auto-resolved battles fought in any adjacent system receives a +25% bonus.',
    attackBonus: 25,
    range: 'adjacent',
    duration: 1,
    weight: 1,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Simulation: Attack Plan',
    description: '+10% bonus to conquer an auto-resolved attack in system this turn',
    attackBonus: 10,
    range: 'this-sytem',
    duration: 1,
    weight: 5,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Simulation: Entrench',
    description: '+10% bonus to defend against an auto-resolved attack in system for 1 turn',
    defenseBonus: 10,
    range: 'this-sytem',
    duration: 1,
    weight: 5,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Simulation: Attack Plan (advanced)',
    description: '+25% bonus to conquer an auto-resolved attack in system this turn',
    attackBonus: 25,
    range: 'this-sytem',
    duration: 1,
    weight: 2,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Simulation: Entrench (advanced)',
    description: '+25% bonus to defend against an auto-resolved attack in system for 1 turn',
    defenseBonus: 25,
    range: 'this-sytem',
    duration: 1,
    weight: 2,
  },{
    model: 'DieRollCardModel',
    type: 'system',
    title: 'Sabotage: Covert Operation',
    description: 'Automatically win auto-resolved battle in system this turn.',
    attackBonus: Infinity,
    range: 'this-sytem',
    duration: 1,
    weight: 1
  },
// ===== GainControlCardModel ===== //
/*
    {
    model: 'GainControlCardModel',
    type: 'system',
    title: 'Virus: Allegiance Override',
    description: 'Gain control of enemy system.  Can only be played on a system adjacent to one you control.',
    range: 'next-to-occupied',
    duration: 1,
    weight: 2,
  },{
    model: 'GainControlCardModel',
    type: 'system',
    title: 'Super Nova',
    description: 'Gain control of all surrounding systems.',
    attackBonus: Infinity,
    range: 'adjacent',
    duration: 1,
    weight: 0.01,
  },
*/
// ===== CardDealCardModel ===== //
    {
    model: 'CardDealCardModel',
    type: 'system',
    title: 'Installation: R&D Station',
    description: 'Increase chance of drawing rare cards.',
    //TODO: Installation is destroyed if system is conquered.  Only 1 installation card per system.',
    effectType: 'rare',
    duration: 1,
    weight: 2
  },{
    model: 'CardDealCardModel',
    type: 'system',
    title: 'Installation: Simulation Farm',
    description: 'Greatly increase chance of drawing rare cards.',
    //TODO: Installation is destroyed if system is conquered.  Only 1 installation card per system.',
    effectType: 'rare-plus',
    duration: 1,
    weight: 1
  },
// ========== GALAXY ========== //
// ===== DieRollCardModel ===== //
    {
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Attack Campaign',
    description: 'All auto-resolved attacks gain a +10% bonus',
    attackBonus: 10,
    range: 'commander-adjacent',
    weight: 5
  },{
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Defensive Campaign',
    description: 'All auto-resolved defensive rolls gain a +10% bonus',
    defenseBonus: 10,
    range: 'commander-adjacent',
    weight: 5
  },{
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Attack Campaign (advanced)',
    description: 'All auto-resolved attacks gain a +25% bonus',
    attackBonus: 25,
    range: 'commander-adjacent',
    weight: 5
  },{
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Defensive Campaign (advanced)',
    description: 'All auto-resolved defensive rolls gain a +25% bonus',
    defenseBonus: 25,
    range: 'commander-adjacent',
    weight: 5
  },{
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Galactic Domination',
    description: 'All auto-resolved combats gain a +20% bonus this turn',
    attackBonus: 20,
    defenseBonus: 20,
    range: 'commander-adjacent',
    weight: 2
  },{
    model: 'DieRollCardModel',
    type: 'galaxy',
    title: 'Simulation: Galactic Supremacy',
    description: 'All auto-resolved combats are successful this turn',
    attackBonus: Infinity,
    defenseBonus: Infinity,
    range: 'commander-adjacent',
    weight: 1
  },
// ===== CardDealCardModel ===== //
    {
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Technology',
    description: 'Increase the chance of drawing rare cards for 2 turns',
    effectType: 'rare',
    duration: 2,
    weight: 2
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Technology (advanced)',
    description: 'greatly Increase the chance of drawing rare cards for 2 turns',
    effectType: 'rare-plus',
    duration: 2,
    weight: 1
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Galactic Database',
    description: 'Increase chance of drawing galaxy cards for 3 turns',
    effectType: 'galaxy',
    duration: 3,
    weight: 4
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: System Scan',
    description: 'Increase chance of drawing system cards for 3 turns',
    effectType: 'system',
    duration: 1,
    weight: 4
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Terrestrial Upgrade',
    description: 'Increase chance of drawing planetary cards for 3 turns',
    effectType: 'planet',
    duration: 3,
    weight: 4
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Galactic Database (advanced)',
    description: 'Drastically Increase chance of drawing galaxy cards for 1 turn',
    effectType: 'galaxy-plus',
    duration: 1,
    weight: 1
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: System Scan (advanced)',
    description: 'Drastically Increase chance of drawing system cards for 1 turn',
    effectType: 'system-plus',
    duration: 1,
    weight: 1
  },{
    model: 'CardDealCardModel',
    type: 'galaxy',
    title: 'Research: Terrestrial Upgrade (advanced)',
    description: 'Drastically Increase chance of drawing planetary cards for 1 turn',
    effectType: 'planet-plus',
    duration: 1,
    weight: 1
  }];
});

Omega.define(function() {
  'use strict';
  Omega.config = _.extend(Omega.config || {}, {
    pathToExit: '../start/start.html',
    pathToJson: 'media/json',
    planetFiles: [
      'system-epic-1.json',
      'system-epic-1.json',
      'system-medium-1.json',
      'system-medium-2.json',
      'system-small-1.json',
      'system-small-2.json',
      'system-small-3.json',
      'system-small-4.json',
      'system-standard-1.json',
      'system-standard-2.json'
    ]
  });
});

Omega.define(function() {
  "use strict";
  var localization = Omega.require('Omega.localization'),
      isDevelopment = (window.location.host === 'localhost:3000'),
      language = window.navigator.language || window.navigator.browserLanguage || '',
      parts = language.split('-');
  language = (parts.length > 0) ? parts[0].toLowerCase() : '';
  Omega.environment = {
    isDevelopment: isDevelopment,
    imagePath: isDevelopment ? 'media/images/' : 'media/images/',
    language: language,
    localizedStrings: localization[language] || localization.en
  };
});

Omega.define(function() {
  "use strict";
  Omega.localization = {
    en: {
      galactic_war: 'Galactic War',
      planetary_annihilation: 'Planetary Annihilation',
      defaultGameName: 'My Conquest',
      cancel: 'Cancel',
      create: 'Create'
    }
  };
});

Omega.define(function() {
  "use strict";
  var Model = Omega.require('Omega.Models.Model'),
      subModelNames = ['PlanetCardModel', 'DieRollCardModel', 'CardDealCardModel'],
      subModelTypes = subModelNames.reduce(function(data, name){
        data[name] = 'Omega.Models.Cards.' + name;
        return data;
      }, {});

  Omega.Models.CardModel = Model.extend({
    subModelTypes: subModelTypes,
    //TODO: This really needs a better name!!!
    //Actually, I think sub-classing the card should be changed to a strategy pattern
    //where a card can have an array of CardEffects.  If canApplyEffect for any of them
    //then applyEffect can pass the 'target' on to the CardEffect.
    //Might not need applyPhase after therefactor??
    subModelTypeAttribute: 'cardEffectType',

    defaults: {
        title: null,
        type: null,
        applyPhase: null,
        effectTarget: null,
        description: "",
        lastLocation: null,
        location: null,
        position: null,
        systemId: null,
        duration: 1,
        turnsRemaining: 1
    },

    isInPlay: function() {
      return this.get('systemId');
    },

    canApply: function(phase, target) {
      return this.get('applyPhase') == phase && this.get('effectTarget') == target;
    },

    applyEffect: function() {},
    undoEffect: function() {}
  });

  Omega.Models.CardModel.subModelNames = subModelNames;
  Omega.Models.CardModel.subModelTypes = subModelTypes;
});

Omega.define(function() {
  "use strict";
  var Model = Omega.require('Omega.Models.Model'),
      CardModel = Omega.require('Omega.Models.CardModel'),
      CardCollection = Omega.require('Omega.Collections.CardCollection'),
      CardDealer = Omega.require('Omega.Utils.CardDealer');

  Omega.Models.DeckModel = Model.extend({
    localStorage: new Backbone.LocalStorage('gwdb_deck'),

    relations: [{
      type: Backbone.HasMany,
      key: 'deck',
      relatedModel: 'Omega.Models.CardModel',
      collectionType: 'Omega.Collections.CardCollection',
      reverseRelation: {
        key: 'deckId',
        includeInJSON: true
      }
    }],

    defaults: {
        seed: 0,
        playArea: '',
        systemId: null,
        deck: null,
        uniqueCardId: 0,
        voidCards: null
    },

    setPlayArea: function(type) {
        this.set('playArea', type);
        this.trigger('changePlayArea');
    },

    selectSystem: function (id) {
        this.set('systemId', id);
        if (id == "galaxy" || id == "planet") {
            this.set('playArea', id);
        } else {
            this.set('playArea', 'system');
        }
    },

    build: function() {
        var cards = new CardCollection(),
            dealer = new CardDealer({ seed: this.get('seed') });
        this.buildDeck("galaxy", cards, dealer);
        this.buildDeck("system", cards, dealer);
        this.buildDeck("planet", cards, dealer);
        this.set('deck', cards);
    },

    buildDeck: function (type, cards, dealer) {
      _.range(5).forEach(function(index) {
        var card = dealer.getRandomCard(type);
        card.set('id', this.getUniqueCardId());
        card.set('lastLocation', type + "Container" + (index + 1));
        cards.add(card);
      }, this);
    },

    getNewDealer: function() {
      this.dealer = new CardDealer();
      return this.dealer;
    },

    awardCards: function() {
      var deck = this.get('deck'),
            data = [];
      if (this.dealer) {
        _.range(5).forEach(function (index) {
            var card = this.dealer.getRandomCard();
            card.set('id', this.getUniqueCardId());
            deck.add(card);
            data.push(card.toJSON());
        }, this);
      }
        return data;
    },

    getUniqueCardId: function() {
        var uniqueId = this.get('uniqueCardId'),
            cardId = 'card-' + uniqueId;
        uniqueId++;
        this.set('uniqueCardId', uniqueId);
        return cardId;
    },

    isCardsInSystem: function (next) {
        var deck = this.get('deck'),
            systemIds = deck.pluck('systemId'),
            nextSystemHasCards = systemIds.indexOf(next);
        if (nextSystemHasCards >= 0) {
            return true;
        } else return false;
    },

    updateVoid: function (cards) {
        var voidCards = [];
        for (var i = 0; i < cards.length; i++) {
            voidCards[i] = cards[i].id;
        }
        this.set('voidCards', voidCards);
        //TODO: add some order saving function to void
    }
  });
});

Omega.define(function() {
  "use strict";

  var config = Omega.require('Omega.config'),
      Model = Omega.require('Omega.Models.Model'),
      SystemModel = Omega.require('Omega.Models.SystemModel'),
      SystemCollection = Omega.require('Omega.Collections.SystemCollection'),
      GalaxyBuilder = Omega.require('Omega.Utils.GalaxyBuilder');

  Omega.Models.GalaxyModel = Model.extend({
    localStorage: new Backbone.LocalStorage('gwdb_galaxy'),

    relations: [{
      type: Backbone.HasMany,
      key: 'systems',
      relatedModel: 'Omega.Models.SystemModel',
      collectionType: 'Omega.Collections.SystemCollection',
      reverseRelation: {
        key: 'galaxyId',
        includeInJSON: true
      }
    }],

    defaults: function(){ return {
      seed: 0,
      galaxySize: 1,
      playerFaction: 0,
      systems: new SystemCollection(),
      edges: [],
      selectedSystemId: null,
      moveMode: null,
      moveUndo: null,
      moveDistances: [1, 1, 1, 1]
    }},

    initialize: function(attributes, options) {
      attributes = attributes || {};
      this.random = new Jaff.Random();
    },

    build: function() {
      var builder = new GalaxyBuilder({
        seed: this.get('seed'),
        size: this.get('galaxySize')
      });
      builder.build();
      this.set('edges', builder.getEdges());
      this.buildSystems(builder);
      this.setupFactions();
    },

    buildSystems: function(builder) {
      var systems = [],
          stars = builder.getPoints(),
          connections = builder.getConnections(),
          commanders = builder.getDistantPoints(4),
          systemNames = this.buildSystemNames(stars.length),
          isCommander = false,
          faction = 0,
          collection = new SystemCollection();
      this.random.seed(this.get('seed'));
      for (var i = 0; i < stars.length; i++) {
        isCommander = commanders.indexOf(i) !== -1;
        systems[i] = {
          name: systemNames[i],
          id: 'system-' + i,
          isCommander: isCommander,
          faction: isCommander ? faction : -1,
          position: stars[i],
          edges: _.map(connections[i], function(c){ return JSON.stringify([stars[i], stars[c]]) }),
          connections: _.map(connections[i], function(c){ return 'system-' + c }),
          planets: this.buildPlanets(systemNames[i])
        }
        if (isCommander) faction++;
      }
      collection.reset(systems);
      this.set('systems', collection);
    },

    buildSystemNames: function(count) {
      var rand;
      var index = 0;
      var names = [];
      _.each(config.systemNames, function(value) {
        rand = _.random(index++);
        names[index - 1] = names[rand];
        names[rand] = value;
      });
      return names.splice(0, count);
    },

    buildPlanets: function(systemName) {
      var numerals = [' I', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX', ' X'];
      var index = Math.floor(this.random.next() * config.planetTemplates.length);
      var template = config.planetTemplates[index];
      var planets = template && template.planets.map(function(planet, index){
            return _.extend({}, planet, { name: systemName + numerals[index] });
          }, this);
      return planets || [];
    },

    setupFactions: function() {
      var systems = this.get('systems'),
          overlap = [];
      _.range(4).forEach(function(faction){
        var system = systems.get(this.getCommanderPosition(faction));
        system.get('connections').forEach(function(id){
          var neighbor = systems.get(id),
              faction = neighbor.get('faction'),
              isCommander = neighbor.get('isCommander');
          if (faction == -1 && !isCommander) {
            neighbor.set('faction', system.get('faction'));
          } else if (faction >= 0 && !isCommander) {
            overlap.push(neighbor);
          }
        });
      }, this);
      overlap.forEach(function(system){
        system.set('faction', -1);
      });
    },

    getValidMoveEdges: function(faction) {
      var moveMode = this.get('moveMode'),
          faction = (faction >= 0) ? faction : this.get('playerFaction'),
          systemId = this.getCommanderPosition(faction),
          systems = this.get('systems'),
          system = systems.get(systemId),
          distance = this.get('moveDistances')[faction],
          edges = [];
      if (moveMode && system) {
        edges = (distance > 0) ? system.get('edges').slice(0) : [];
        if (distance == 2) {
          edges = system.get('connections').reduce(function(edges, id){
            return edges.concat(systems.get(id).get('edges'));
          }, edges);
          edges = _.unique(edges);
        }
        edges = edges.map(function(e){ return JSON.parse(e) });
      }
      return edges;
    },

    getCommanderPosition: function(faction) {
      var systems = this.get('systems');
      var commanders = systems.map(function(system){
            return ((system.get('faction') == faction) && system.get('isCommander')) ? system.id : false
          });
      commanders = _.compact(commanders);
      return commanders[0];
    },

    isValidMove: function(fromId, toId) {
      var systems = this.get('systems'),
          fromSystem = systems.get(fromId),
          isUserCommander = fromSystem &&
            (fromSystem.get('faction') == this.get('playerFaction')) && fromSystem.get('isCommander'),
          isConnected = fromSystem && _.contains(fromSystem.get('connections'), toId);
      return isUserCommander && isConnected;
    },

    selectSystem: function(newId) {
      var oldId = this.get('selectedSystemId'),
          commanderId = this.getCommanderPosition(this.get('playerFaction')),
          valid = this.isValidMove(commanderId, newId);
      this.set('isValidMove', valid);
      this.set('selectedSystemId', newId);
      this.trigger('selectSystem', newId);
      if (false && testMoveLogic) {
        this.moveCommander(oldId, newId);
        this.AIMove();
        this.trigger('moveCommander', oldId, newId);
      }
    },

    moveCommander: function() {
      var systems = this.get('systems'),
          faction = this.get('playerFaction'),
          fromId = this.getCommanderPosition(faction),
          toId = this.get('selectedSystemId');
      if (fromId && toId) {
        this.doMoveCommander(fromId, toId);
        this.trigger('moveCommander');
      }
    },

    undoMoveCommander: function() {
      this.doUndoMoveCommander();
      this.trigger('moveCommander');
    },

    resolveRound: function(playerWon) {
      this.battleResults = _.range(4).map(this.getInitialState, this);
      this.resolvePlayerMove(playerWon);
      this.playAIMoves();
      this.moveUndo = null;
      try { this.fixBoard(); } catch(e) { /* OUCH */ };
      this.battleResults = this.battleResults.map(this.computeBattleChanges, this);
      return this.battleResults;
    },

    fixBoard: function() {
      //TODO: This is a total hack!!!
      //If a commander is lost, but still has systems, put him back on the board.
      var systems = this.get('systems'),
          data = systems.invoke('pick', ['id', 'faction', 'isCommander']);
      _.range(4).forEach(function(faction){
        var factionSystems = data.filter(function(system){ return system.faction == faction }),
            factionCommanders = factionSystems.filter(function(system){ return system.isCommander });
        if (factionCommanders.length == 0 && factionSystems.length > 0) {
          //Oops dropped a commander
          systems.get(factionSystems[0].id).set('isCommander', true);
        } else if (factionCommanders.length > 1) {
          systems.get(factionSystems[1].id).set('isCommander', false);
        }
      }, this);
    },

    getInitialState: function(faction) {
      var lastId = this.getCommanderPosition(faction),
          system = this.get('systems').get(lastId),
          name = system ? system.get('name') : null;
      return {
        faction: faction,
        commander: {
          lastPosition: name,
          newPosition: null
        },
        systemsOwned: this.getFactionSystems(faction)
      }
    },

    computeBattleChanges: function(results) {
      var newId = this.getCommanderPosition(results.faction),
          newSystemsOwned = this.getFactionSystems(results.faction),
          toName = function(id){ return this.get('systems').get(id).get('name') };
      results.commander.newPosition = newId ? toName.call(this, newId) : null;
      results.systemsLost = _.difference(results.systemsOwned, newSystemsOwned).map(toName, this);
      results.systemsWon = _.difference(newSystemsOwned, results.systemsOwned).map(toName, this);
      results.systemsOwned = newSystemsOwned.map(toName, this);
      return results;
    },

    resolvePlayerMove: function(playerWon) {
      var moveUndo = this.get('moveUndo'),
          wasCommanderAgainstCommander = moveUndo.wasCommander,
          paSystemId = this.get('selectedSystemId'),
          paSystem = this.get('systems').get(paSystemId);

      if (wasCommanderAgainstCommander) {
        if (playerWon) {
          this.moveBackOrDie(moveUndo.wasSystem, moveUndo.wasFaction);
        } else {
          this.doUndoMoveCommander();
        }
      } else {
        if (playerWon) {
          paSystem.set('attackBonus', Infinity);
        } else {
          paSystem.set('defenseBonus', Infinity);
        }
        this.resolveDieRollsAround(moveUndo.wasSystem, 'player');
      }
    },

    playAIMoves: function() {
      var systems = this.get('systems'),
          playerFaction = this.get('playerFaction'),
          commanderSystems = systems.
            invoke('pick', ['id', 'faction', 'isCommander', 'connections']).
            filter(function(system){ return system.isCommander && system.faction != playerFaction; });
      commanderSystems.forEach(function(fromId){
        var toIndex = Math.floor(fromId.connections.length * this.random.next()),
            toId = fromId.connections[toIndex];
        this.doMoveCommander(fromId, toId);
        this.resolveAIMove();
      }, this);
    },

    resolveAIMove: function() {
      var moveUndo = this.get('moveUndo'),
          wasCommanderAgainstCommander = moveUndo.wasCommander,
          aiWon = this.rollDieIn(moveUndo.wasSystem);

      if (wasCommanderAgainstCommander) {
        if (aiWon) {
          this.moveBackOrDie(moveUndo.wasSystem, moveUndo.wasFaction);
        } else {
          this.doUndoMoveCommander();
        }
      } else {
        this.resolveDieRollsAround(moveUndo.wasSystem, 'ai');
      }
    },

    doMoveCommander: function(fromId, toId) {
      var systems = this.get('systems'),
          fromSystem = systems.get(fromId),
          toSystem = systems.get(toId);
      this.set('moveUndo', {
        originalSystem: fromId,
        wasSystem: toId,
        wasCommander: toSystem.get('isCommander'),
        wasFaction: toSystem.get('faction')
      });
      fromSystem.set('isCommander', false);
      toSystem.set('isCommander', true);
      toSystem.set('faction', fromSystem.get('faction'));
    },

    doUndoMoveCommander: function() {
      var systems = this.get('systems'),
          moveUndo = this.get('moveUndo'),
          system;
      if (moveUndo) {
        system = systems.get(moveUndo.originalSystem);
        system.set('isCommander', true);
        system = systems.get(moveUndo.wasSystem);
        system.set('isCommander', moveUndo.wasCommander);
        system.set('faction', moveUndo.wasFaction);
        this.set('moveUndo', null);
      }
    },

    resolveDieRollsAround: function(centerId, roller) {
      var systems = this.get('systems'),
          centerSystem = systems.get(centerId),
          centerFaction = centerSystem.get('faction'),
          connections = centerSystem.get('connections');
      connections.forEach(function(id) {
        var system = systems.get(id),
            faction = system.get('faction'),
            wonSystem = this.rollDieIn(id, roller);
        if (faction == -1) {
          system.set('faction', centerFaction);
        } else if (faction != centerFaction && wonSystem) {
          if (system.get('isCommander')) {
            this.moveBackOrDie(id);
          }
          system.set('faction', centerFaction);
        }
      }, this);
    },

    rollDieIn: function(systemId, roller) {
      var system = this.get('systems').get(systemId),
          attack = this.random.next() + (roller == 'player' ? system.get('attackBonus') : 0),
          defense = this.random.next() + (roller == 'ai' ? system.get('defenseBonus') : 0);
      return attack > defense;
    },

    moveBackOrDie: function(systemId, overrideFaction) {
      var systems = this.get('systems'),
          system = systems.get(systemId),
          faction = overrideFaction >= 0 ? overrideFaction : system.get('faction'),
          friendlySystems = system.get('connections').
            map(function(id) { return systems.get(id); }).
            filter(function(sys) {
              var systemFaction = sys.get('faction');
              return systemFaction == faction || systemFaction == -1;
            });
      if (friendlySystems.length) {
        var retreat = Math.floor(friendlySystems.length * this.random.next());
        system.set('isCommander', false);
        friendlySystems[retreat].set('isCommander', true);
        friendlySystems[retreat].set('faction', faction);
      } else {
        var lost = [];
        systems.each(function(sys){
          if (sys.get('faction') == faction) {
            sys.set('faction', -1);
            sys.set('isCommander', false);
            lost.push(sys.id);
          }
        });
      }
    },

    getFactionSystems: function(faction) {
      var factionSystems = this.get('systems').invoke('pick', ['id', 'faction']).
            filter(function(system){ return system.faction == faction; }).
            map(function(system){ return system.id; });
      return factionSystems.sort();
    },

    getSelectedSystem: function() {
      var systemId = this.get('selectedSystemId'),
      system = systemId && systemId !== "galaxy" && systemId !== "planet" ? this.get('systems').get(systemId) : null;
      return system;
    }
  });
});

Omega.define(function() {
  "use strict";
  var Model = Omega.require('Omega.Models.Model'),
      GalaxyModel = Omega.require('Omega.Models.GalaxyModel'),
      DeckModel = Omega.require('Omega.Models.DeckModel');

  Omega.Models.GameModel = Model.extend({
    localStorage: new Backbone.LocalStorage('gwdb_game'),

    relations: [{
      type: Backbone.HasOne,
      key: 'galaxy',
      relatedModel: 'Omega.Models.GalaxyModel',
      includeInJSON: 'id',
      reverseRelation: {
        key: 'gameId',
        includeInJSON: 'id'
      }
    },{
      type: Backbone.HasOne,
      key: 'deck',
      relatedModel: 'Omega.Models.DeckModel',
      includeInJSON: 'id',
      reverseRelation: {
        key: 'gameId',
        includeInJSON: 'id'
      }
    }],

    defaults: {
      name: 'Galactic War',
      faction: 0,
      factionColor: 0,
      galaxySize: 1,
      gameDifficulty: 1,
      seed: 0,
      phase: 1,
      turn: 0,
      result: null,
      created: 0,
      lastBattle: 0,
      countSystems: 0,
      countCards: 0,
      isPlayCards: true,
      galaxy: null,
      deck: null,
      isNextPhaseEnabled: true,
      isPrevPhaseEnabled: false,
      isForceDiscard: false
    },

    initialize: function(options) {
      var seed = Math.floor(Math.random() * Math.pow(2, 16));
      this.set('seed', seed);
      this.set('created', Date.now());
      this.set('lastBattle', Date.now());
    },

    nextPhase: function() {
      var phase = this.get('phase'),
          deck = this.get('deck');
      this.trigger('checkForceDiscard');
      if (this.get('isNextPhaseEnabled') && !this.get('isForceDiscard')) {
          this.setPhase(phase + 1, +1);
          this.trigger('phaseNext');
      }
    },

    prevPhase: function() {
      var phase = this.get('phase');
      if (this.get('isPrevPhaseEnabled')) {
          this.setPhase(phase -1, -1);
          this.trigger('phaseUndo');
      }
    },

    setPhase: function(phase, direction) {
      var currentPhase = this.get('phase'),
          newPhase = Math.max(1, Math.min(phase % 8, 7)),
          galaxy = this.get('galaxy'),
          deck = this.get('deck');
      if (newPhase == 6) {
        this.trigger('saveCards');
        this.trigger('playPA');
        return;
      }
      if (newPhase == 1) {
          this.set('phase', 1);
          if (direction > 0) {
              this.set('lastBattle', Date.now());
              this.selectSystem();
              this.set('isPlayCards', true);
              this.set('turn', this.get('turn') + 1);
          }
          this.set('isPrevPhaseEnabled', false);
      }
      if (newPhase != currentPhase) {
        this.set('phase', newPhase);
        if (galaxy) {
          if (newPhase == 1) {
              galaxy.selectSystem('galaxy');
              deck.selectSystem('galaxy');
              deck.setPlayArea('galaxy');
          }
          if (newPhase == 2) {
              var systems = galaxy.get('systems'),
                  playerFaction = galaxy.get('playerFaction'),
                  commanderSystem = systems.findWhere({ 'isCommander': true, 'faction': playerFaction });
              this.selectSystem(commanderSystem.get('id'));
          }
          if (newPhase == 3) {
              galaxy.selectSystem('planet');
              deck.selectSystem('planet');
              deck.setPlayArea('planet');
          }
          if (newPhase == 5 && currentPhase == 4) galaxy.moveCommander();
          if (newPhase == 4 && currentPhase == 5) galaxy.undoMoveCommander();
          galaxy.set('moveMode', newPhase == 4 ? 'move' : newPhase == 5 ? 'attack' : null);
        }
      }
      if (newPhase > 1) this.set('isPrevPhaseEnabled', true);
      this.setIsNextEnabled();
      if (newPhase == 4 && newPhase > currentPhase) {
        this.applyCards('move', 'galaxy');
      }
    },

    applyCards: function(phase, target) {
      var deck = this.get('deck'),
          galaxy = this.get('galaxy'),
          targetModel = target == 'galaxy' ? galaxy : target == 'dealer' ? deck.getNewDealer() : null;
      if (deck && targetModel) {
        deck.get('deck').
          filter(function(card){ return card.isInPlay() && card.canApply(phase, target); }).
          forEach(function(card){ card.applyEffect(targetModel); });
      }
    },

    setIsNextEnabled: function() {
      var galaxy = this.get('galaxy'),
          isNextEnabled = !galaxy.get('moveMode') || galaxy.get('isValidMove') || (this.get('phase') == 7);
      this.set('isNextPhaseEnabled', isNextEnabled);
    },

    selectSystem: function(id) {
      var galaxy = this.get('galaxy'),
          deck = this.get('deck');
      if (galaxy) {
        galaxy.selectSystem(id);
        this.setIsNextEnabled();
      }
      if (deck) {
          deck.selectSystem(id);
          if (galaxy.get('selectedSystemId') !== null  && galaxy.get('selectedSystemId') !== undefined)
              deck.setPlayArea('system');
          else
              deck.setPlayArea('galaxy');
      }
    },

    nextSystem: function () {
        var next = false,
            galaxy = this.get('galaxy'),
            deck = this.get('deck'),
            selected = galaxy.get('selectedSystemId'),
            systemIds = galaxy.get('systems').pluck('id'),
            nextIndex = systemIds.indexOf(selected) + 1;

        if (nextIndex < systemIds.length) {
            for (var i = nextIndex; i < systemIds.length; i++) {
                if (deck.isCardsInSystem(systemIds[i])) {
                    this.selectSystem(systemIds[i]);
                    next = true;
                    break;
                }
            }
        }

        if (!next) {
            if (galaxy) galaxy.selectSystem('planet');
            deck.selectSystem('planet');
            deck.setPlayArea('planet');
        }
    },

    prevSystem: function () {
        var prev = false,
            galaxy = this.get('galaxy'),
            deck = this.get('deck'),
            selected = galaxy.get('selectedSystemId'),
            systemIds = galaxy.get('systems').pluck('id'),
            prevIndex = selected == "planet" ? systemIds.length - 1 : systemIds.indexOf(selected) - 1;

        if (prevIndex > 0) {
            for (var i = prevIndex; i >= 0; i--) {
                if (deck.isCardsInSystem(systemIds[i])) {
                    this.selectSystem(systemIds[i]);
                    prev = true;
                    break;
                }
            }
        }

        if (!prev) {
            if (galaxy) galaxy.selectSystem('galaxy');
            deck.selectSystem('galaxy');
            deck.setPlayArea('galaxy');
        }
    },

    //TODO: move build into game??

    resolveRound: function(playerWon) {
      var results = this.resolveDieRolls(),
          cards = this.resolveCards();
      this.set('playerWonPA', playerWon);
      this.set('isPlayCards', false);
      this.set('factionResults', results);
      this.set('awardedCards', cards);
      this.setPhase(7);
    },

    resolveDieRolls: function (playerWon) {
      this.applyCards('dieRoll', 'galaxy');
      return this.get('galaxy').resolveRound(playerWon);
    },

    resolveCards: function() {
      this.applyCards('dealCards', 'dealer');
      return this.get('deck').awardCards();
    }
  });
});

Omega.define(function() {
  "use strict";
  Omega.Models.Model = Backbone.RelationalModel;
});

Omega.define(function() {
  "use strict";
  var Model = Omega.require('Omega.Models.Model');

  Omega.Models.PlanetModel = Model.extend({
    defaults: {
      name: 'Planet',
      mass: 0,
      density: 0,
      position_x: 0,
      position_y: 0,
      velocity_x: 0,
      velocity_y: 0,
      planet: {
        biome: 'earth',
        biomeScale: 0,
        heightRange: 0,
        metalClusters: 0,
        metalDensity: 0,
        radius: 0,
        seed: 0,
        temperature: 0,
        waterHeight: 0
      }
    }
  });
});

Omega.define(function() {
  "use strict";
  var Model = Omega.require('Omega.Models.Model'),
      PlanetModel = Omega.require('Omega.Models.PlanetModel'),
      PlanetCollection = Omega.require('Omega.Collections.PlanetCollection');

  Omega.Models.SystemModel = Model.extend({
    localStorage: new Backbone.LocalStorage('gwdb_galaxy'),

    relations: [{
      type: Backbone.HasMany,
      key: 'planets',
      relatedModel: 'Omega.Models.PlanetModel',
      collectionType: 'Omega.Collections.PlanetCollection',
      reverseRelation: {
        key: 'systemId',
        includeInJSON: true
      }
    }],

    defaults: function(){ return {
      name: 'Unnamed',
      faction: 0,
      isCommander: false,
      position: [0, 0],
      edges: [],
      connections: [],
      planets: new PlanetCollection(),
      attackBonus: 0,
      defenseBonus: 0
    }},

    increaseBonus: function(attack, defense) {
      this.attributes.attackBonus += (attack || 0);
      this.attributes.defenseBonus += (defense || 0);
    },

    resetBonus: function() {
      this.attributes.attackBonus = 0;
      this.attributes.defenseBonus = 0;
    }
  });
});

Omega.define(function() {
  'use strict';
  var CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Models.Cards.CardDealCardModel = CardModel.extend({
    defaults: {
        applyPhase: 'dealCards',
        effectTarget: 'dealer'
    },

    applyEffect: function(dealer) {
      var cards = dealer.getCards(),
          effectType = this.get('effectType'),
          parts, cardType, plus, applyTo;

      parts = effectType.split('-');
      cardType = parts[0];
      plus = (parts[1] == 'plus');
      //'rare', 'rare-plus', 'galaxy', 'system', 'planet', 'galaxy-plus', 'system-plus', 'planet-plus',
      applyTo = cards.map(function(card){
        return (cardType == 'rare' && card.weight <= 2) || (card.type == cardType);
      });
      if (applyTo) {
        applyTo.forEach(function(isApply, index){
          if (!isApply) return;
          if (cardType == 'rare') {
            cards[index].weight = cards[index].rawWeight + (plus ? 2 : 1);
          } else {
            cards[index].weight = cards[index].rawWeight * (plus ? 4 : 2);
          }
        });
        dealer.setCards(cards);
      }
    }
  });
});



Omega.define(function() {
  "use strict";
  var CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Models.Cards.DieRollCardModel = CardModel.extend({
    defaults: {
        applyPhase: 'dieRoll',
        effectTarget: 'galaxy'
    },

    applyEffect: function(galaxy) {
      var systems = galaxy.get('systems'),
          systemId = this.get('systemId'),
          attack = this.get('attackBonus'),
          defense = this.get('defenseBonus'),
          range = this.get('range'),
          applyTo;
      if (systems.get(systemId)) {
        if (range == 'this-system') {
          applyTo = [systems.get(systemId)];
        } else if (range == 'adjacent') {
          applyTo = systems.
            get(systemId).
            get('connections').
            map(function(id){ return systems.get(id); });
        }
      } else if (systemId == 'galaxy') {
        if (range == 'commander-adjacent') {
          systemId = galaxy.getCommanderPosition(galaxy.get('playerFaction'));
          applyTo = systems.
            get(systemId).
            get('connections').
            map(function(id){ return systems.get(id); });
        }
      }
      if (applyTo) applyTo.forEach(function(sys){ sys.increaseBonus(attack, defense); });
    }
  });
});

Omega.define(function() {
  "use strict";
  var CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Models.Cards.GainControlCardModel = CardModel.extend({
    defaults: {
        applyPhase: 'dieRoll',
        effectTarget: 'galaxy'
    },

    applyEffect: function(galaxy) {
      var systems = galaxy.get('systems'),
          systemId = this.get('systemId'),
          attack = this.get('attackBonus'),
          defense = this.get('defenseBonus'),
          range = this.get('range'),
          applyTo;
      if (systemId != 'galaxy') {
        if (range == 'this-system') {
          applyTo = [systems.get(systemId)];
        } else if (range == 'adjacent') {
          applyTo = systems.
            get(systemId).
            get('connections').
            map(function(id){ return systems.get(id); });
        }
      }
      if (applyTo) applyTo.forEach(function(sys){ sys.increaseBonus(attack, defense); });
    }
  });
});

Omega.define(function() {
  "use strict";
  var CardModel = Omega.require('Omega.Models.CardModel');

  Omega.Models.Cards.PlanetCardModel = CardModel.extend({
    defaults: {
        type: 'planet'
    }
  });
});

Omega.define(function() {
  'use strict';

  var cards = Omega.require('Omega.config.cards'),
      CardModel = Omega.require('Omega.Models.CardModel'),
      modelNames = ['CardModel'].concat(CardModel.subModelNames),
      modelRefs = _.values(CardModel.subModelTypes).map(function(name){ return Omega.require(name); }),
      models = [CardModel].concat(modelRefs);

  Omega.Utils.CardDealer = function() {
    this.initialize.apply(this, arguments);
  };

  Omega.Utils.CardDealer.prototype = {
    initialize: function(options) {
      options = options || {};
      this.rawCards = options.cards || cards;
      this.reset();
      this.random = new Jaff.Random(options.seed);
      this.random.seed();
    },

    reset: function() {
      this.cards = this.rawCards.map(function(card){
        return _.extend({}, card, { rawWeight: card.weight });
      });
    },

    getCards: function() {
      return this.cards;
    },

    setCards: function(cards) {
      this.cards = cards;
    },

    getRandomCard: function(type) {
      var types = ['galaxy','system','planet'],
          index = types.indexOf(type),
          sum = this.cards.reduce(function(prev, card) {
            var includeCard = (index == -1) || card.type == types[index],
                weight = includeCard ? card.weight : 0;
            return prev + weight;
          }, 0),
          location = this.getRandomLocation(sum),
          cardData = this.cards.filter(function(card) {
            var includeCard = (index == -1) || card.type == types[index],
                weight = includeCard ? card.weight : 0,
                found = location >= 0 && (location - weight) < 0;
            location -= weight;
            return found;
          });
      cardData = (cardData.length == 0) ? {} : cardData[0];
      return this.makeCard(cardData);
    },

    getRandomLocation: function(sum) {
      return Math.floor(this.random.next() * sum);
    },

    makeCard: function(data) {
      //TODO: See note in CardModel, but I think we should refactor this to make CardModel and
      //then get one or more CardEffects from some CardEffectFactory.
      var index = modelNames.indexOf(data.model),
          Model = (index == -1) ? models[0] : models[index];
      return new Model(data);
    }
  };
});

Omega.define(function() {
  "use strict";

  Omega.Utils.Delaunay = function() {
    this.initialize.apply(this, arguments);
  };

  Omega.Utils.Delaunay.prototype = {
    initialize: function(points) {
      this.points = points || [];
      this.triangles = triangulate(this.points);
    },

    getTriangles: function() {
      return this.triangles;
    },

    getOuterPoints: function() {
      var i, j, edge,
          edges = this.getOuterEdges(),
          points = edges[0].slice(0),
          k = 1;

      for (i = 0; i < edges.length - 1; i++) {
        for (j = i+1; j < edges.length; j++) {
          if (edges[i][k] == edges[j][0] || edges[i][k] == edges[j][1]) {
            edge = edges[i+1];
            edges[i+1] = edges[j];
            edges[j] = edge;
            if (edges[i][k] == edges[i+1][0]) {
              points.push(edges[i+1][1]);
              k = 1;
            }
            if (edges[i][k] == edges[i+1][1]) {
              points.push(edges[i+1][0]);
              k = 0;
            }
          }
        }
      }
      points.pop();
      return points;
    },

    getEdges: function() {
      var edges = this.getAllEdges();
      edges = _.uniq(edges, function(a){ return a.join('.'); })
        .sort(function(a,b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0 });
      return edges;
    },

    getOuterEdges: function() {
      var key,
          edges = this.getAllEdges(),
          counts = {};

      _.each(edges, function(a){
        key = a.join('.');
        counts[key] = (counts[key] || 0) + 1;
      });
      edges = _.filter(edges, function(a){
        key = a.join('.');
        return counts[key] == 1;
      }).sort(function(a,b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0 });
      return edges;
    },

    getAllEdges: function() {
      var i, triangle,
          edges = [];

      for (i = 0; i < this.triangles.length; i++) {
        triangle = this.triangles[i].slice(0).sort();
        edges.push(this.fixEdge([triangle[0], triangle[1]]));
        edges.push(this.fixEdge([triangle[0], triangle[2]]));
        edges.push(this.fixEdge([triangle[1], triangle[2]]));
      }
      return edges;
    },

    fixEdge: function(edgeIn) {
      var edge = (edgeIn[0] > edgeIn[1]) ? [edgeIn[1], edgeIn[0]] : [edgeIn[0], edgeIn[1]];
      return edge;
    },

    getConnections: function() {
      var connections = [];

      connections = this.points.map(function(){ return  [] });
      this.triangles.forEach(function(triangle){
        connections[triangle[0]].push(triangle[1], triangle[2]);
        connections[triangle[1]].push(triangle[2], triangle[0]);
        connections[triangle[2]].push(triangle[0], triangle[1]);
      });
      connections = connections.map(function(points){
        return _.uniq(points.sort());
      });
      return connections;
    }
  };

  function triangulate(vertices) {
    var n = vertices.length,
        i, j, indices, open, closed, edges, dx, dy, a, b, c;
    if(n < 3)
      return [];
    vertices = vertices.slice(0);
    indices = new Array(n);
    for(i = n; i--; )
      indices[i] = i;
    indices.sort(function(i, j) { return vertices[j][0] - vertices[i][0]; });
    appendSupertriangleVertices(vertices);
    open   = [triangle(vertices, n + 0, n + 1, n + 2)];
    closed = [];
    edges  = [];
    for(i = indices.length; i--; ) {
      c = indices[i];
      edges.length = 0;
      for(j = open.length; j--; ) {
        dx = vertices[c][0] - open[j].x;
        if(dx > 0.0 && dx * dx > open[j].r) {
          closed.push(open[j]);
          open.splice(j, 1);
          continue;
        }
        dy = vertices[c][1] - open[j].y;
        if(dx * dx + dy * dy > open[j].r)
          continue;
        edges.push(
          open[j].i, open[j].j,
          open[j].j, open[j].k,
          open[j].k, open[j].i
        );
        open.splice(j, 1);
      }
      dedup(edges);
      for(j = edges.length; j; ) {
        b = edges[--j];
        a = edges[--j];
        open.push(triangle(vertices, a, b, c));
      }
    }
    for(i = open.length; i--; )
      closed.push(open[i]);
    open.length = 0;
    for(i = closed.length; i--; )
      if(closed[i].i < n && closed[i].j < n && closed[i].k < n)
        open.push([closed[i].i, closed[i].j, closed[i].k]);
    return open;
  }

  function appendSupertriangleVertices(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;
    for(i = vertices.length; i--; ) {
      if(vertices[i][0] < xmin) xmin = vertices[i][0];
      if(vertices[i][0] > xmax) xmax = vertices[i][0];
      if(vertices[i][1] < ymin) ymin = vertices[i][1];
      if(vertices[i][1] > ymax) ymax = vertices[i][1];
    }
    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;
    vertices.push(
      [xmid - 20 * dmax, ymid -      dmax],
      [xmid            , ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid -      dmax]
    );
  }

  function triangle(vertices, i, j, k) {
    var a = vertices[i],
        b = vertices[j],
        c = vertices[k],
        A = b[0] - a[0],
        B = b[1] - a[1],
        C = c[0] - a[0],
        D = c[1] - a[1],
        E = A * (a[0] + b[0]) + B * (a[1] + b[1]),
        F = C * (a[0] + c[0]) + D * (a[1] + c[1]),
        G = 2 * (A * (c[1] - b[1]) - B * (c[0] - b[0])),
        minx, miny, dx, dy, x, y;
    if(Math.abs(G) < 0.000001) {
      minx = Math.min(a[0], b[0], c[0])
      miny = Math.min(a[1], b[1], c[1])
      dx   = (Math.max(a[0], b[0], c[0]) - minx) * 0.5;
      dy   = (Math.max(a[1], b[1], c[1]) - miny) * 0.5;
      x    = minx + dx;
      y    = miny + dy;
    }
    else {
      x  = (D*E - B*F) / G;
      y  = (A*F - C*E) / G;
      dx = x - a[0]
      dy = y - a[1]
    }
    return {i: i, j: j, k: k, x: x, y: y, r: dx * dx + dy * dy};
  }

  function dedup(edges) {
    var j = edges.length,
        a, b, i, m, n;
    outer: while(j) {
      b = edges[--j]
      a = edges[--j]
      i = j
      while(i) {
        n = edges[--i]
        m = edges[--i]
        if((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2)
          edges.splice(i, 2)
          j -= 2
          continue outer
        }
      }
    }
  }
});

Omega.define(function() {
  "use strict";

  var PointField = Omega.require('Omega.Utils.PointField'),
      Graph = Omega.require('Omega.Utils.Graph'),
      Delaunay = Omega.require('Omega.Utils.Delaunay');

  Omega.Utils.GalaxyBuilder = function() {
    this.initialize.apply(this, arguments);
  };

  Omega.Utils.GalaxyBuilder.prototype = {
    initialize: function(options) {
      options = options || {};
      this.seed = options.seed || 0;
      this.size = options.size || 0;
      this.starCount = [20, 40, 80, 160][this.size];
    },

    build: function() {
      this.buildStars();
      this.buildGraph();
    },

    buildStars: function() {
      var field = new PointField({
            seed: this.seed,
            size: this.starCount,
            density: 160
          });
      field.build();
      this.stars = field.getPoints();
    },

    buildGraph: function() {
      this.graph = new Delaunay(this.stars);
      this.reducedGraph = new Graph(this.graph.getEdges());
      this.reducedGraph.reduceConnections(4);
      this.edges = this.reducedGraph.
        getEdges().
        map(function(e) {
          return [this.stars[e[0]].slice(0), this.stars[e[1]].slice(0)]
        }, this);
    },

    getPoints: function() {
      return this.stars.slice(0);
    },

    getEdges: function() {
      return this.edges.slice(0);
    },

    getConnections: function() {
      return this.reducedGraph.getConnections();
    },

    getOuterPoints: function() {
      return this.graph.getOuterPoints();
    },

    getDistantPoints: function(count) {
      var outerPoints = this.getOuterPoints(),
          subset = _.range(4).map(function(index){
            index = Math.floor(index * outerPoints.length / 4);
            return outerPoints[index];
          });
      return subset.sort();
    }
  }
});

Omega.define(function() {
  'use strict';

  Omega.Utils.Graph = function() {
    this.initialize.apply(this, arguments);
  };

  Omega.Utils.Graph.prototype = {
    initialize: function(edges) {
      this.edges = [];
      this.connections = [];
      if (edges) edges.forEach(this.addEdge, this);
    },

    addEdge: function(edge){
      var edge = this.fixEdge(edge);
      this.edges.push(edge);
      this.connections[edge[0]] = this.connections[edge[0]] || [];
      this.connections[edge[1]] = this.connections[edge[1]] || [];
      this.connections[edge[0]].push(edge[1]);
      this.connections[edge[1]].push(edge[0]);
    },

    removeEdge: function(edgeIn) {
      var edge = this.fixEdge(edgeIn);
      this.edges = this.edges.filter(function(e){ return e[0] != edge[0] || e[1] != edge[1] });
      this.connections[edge[0]] = _.without(this.connections[edge[0]], edge[1]);
      this.connections[edge[1]] = _.without(this.connections[edge[1]], edge[0]);
    },

    fixEdge: function(edgeIn) {
      var edge = (edgeIn[0] > edgeIn[1]) ? [edgeIn[1], edgeIn[0]] : [edgeIn[0], edgeIn[1]];
      return edge;
    },

    getEdges: function() {
      return this.edges.sort(function(a,b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0 });
    },

    getConnections: function() {
      return this.connections.slice(0);
    },

    isConnected: function() {
      var visited = _.range(this.connections.length),
          path = [0],
          indexes = [0],
          depth,
          node,
          index,
          child;
      while (path.length < this.connections.length) {
        depth = path.length - 1;
        node = path[depth];
        index = indexes[depth];
        if (index >= this.connections[node].length) {
          path.pop();
          indexes.pop();
          indexes[indexes.length - 1]++;
        } else {
          child = this.connections[node][index];
          if (visited[child] == null) {
            indexes[depth]++;
          } else {
            path.push(child);
            indexes.push(0);
          }
          visited[child] = null;
        }
        if (indexes.length == 0) return false;
        if (_.compact(visited).length == 0) return true;
      }
    },

    reduceConnections: function(max, seed) {
      var random = new Jaff.Random(seed),
          nodesToReduce = _.compact(this.connections.map(function(c, i){
            return c.length > max ? i : null })),
          edgesRemoved = [],
          stop = 1000;
      while (nodesToReduce.length > 0 && stop > 0) {
        var i = nodesToReduce[Math.floor(random.next() * nodesToReduce.length)],
            j = Math.floor(random.next() * this.connections[i].length),
            edge = [i, this.connections[i][j]];
        this.removeEdge(edge);
        if (this.isConnected()) {
          edgesRemoved.push(edge);
          nodesToReduce = _.compact(this.connections.map(function(c, i){ return c.length > max ? i : null }));
        } else {
          this.addEdge(edge);
        }
        stop--;
      }
    }
  }
});

Omega.define(function() {
  "use strict";

  Omega.Utils.PointField = function() {
    this.initialize.apply(this, arguments);
  };

  Omega.Utils.PointField.prototype = {
    initialize: function(options) {
      options = options || {};
      this.size = options.size || 1;
      this.density = options.density || 1;
      this.minimumDistance = options.minimumDistance || 1;
      this.minimumDistanceSq = this.minimumDistance*this.minimumDistance;
      this.maximumDistance = options.maximumDistance || 2;
      this.deltaDistance = this.maximumDistance - this.minimumDistance;
      this.random = new Jaff.Random(options.seed);
    },

    build: function() {
      var index, newPoint;
      this.points = [[0,0]];
      while (this.points.length < this.size) {
        index = Math.floor(this.random.next() * this.points.length);
        newPoint = this.generateNewPoint(this.points[index]);
        if (this.isValidPoint(newPoint)) this.points.push(newPoint);
      }
      this.fixDensity();
      return this;
    },

    generateNewPoint: function(point) {
      var a = this.random.next() * 2 * Math.PI,
          r = this.minimumDistance + (this.deltaDistance * this.random.next());
      return [point[0] + r*Math.cos(a), point[1] + r*Math.sin(a)];
    },

    isValidPoint: function(p0) {
      return this.points.every(function(p1){
        return ((p0[0] - p1[0])*(p0[0] - p1[0]) + (p0[1] - p1[1])*(p0[1] - p1[1])) >= this.minimumDistanceSq;
      }, this);
    },

    fixDensity: function() {
      var min = [0,0],
          max = [0,0];
      this.points.forEach(function(p){
        min[0] = Math.min(min[0], p[0]);
        min[1] = Math.min(min[1], p[1]);
        max[0] = Math.max(max[0], p[0]);
        max[1] = Math.max(max[1], p[1]);
      });
      var scale0 = Math.sqrt(this.size/this.density),
          scale1 = scale0/Math.max(max[0] - min[0], max[1] - min[1]),
          offset = (1-scale0)/2;
      this.points = this.points.map(function(p){
        p[0] = offset + (p[0] - min[0])*scale1;
        p[1] = offset + (p[1] - min[1])*scale1;
        return p;
      });
    },

    getPoints: function() {
      return this.points.slice(0);
    }
  }
});

Omega.define(function() {
  "use strict";

  _.templateSettings = {
    evaluate: /<<=(.+?)>>/g,
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
  };

  Omega.Utils.Template = function(id) {
    this.initialize(id);
  };

  Omega.Utils.Template.prototype = {
    initialize: function(id) {
      this.id = id;
      this.template = _.template($(id).html());
    },

    build: function(data) {
      data = data || {};
      data.t = function(text) { return Omega.environment.localizedStrings[text] || '' }
      var html = '';
      try {
        html = this.template(data);
      } catch(e) {
        html = '<!-- '+e.name+': '+e.message+' -->';
      }
      return html;
    }
  };
});

﻿Omega.define(function () {
    'use strict';
    var env = Omega.require('Omega.environment'),
        View = Omega.require('Omega.Views.View'),
        Template = Omega.require('Omega.Utils.Template'),
        _super = View.prototype;

    Omega.Views.CardsView = View.extend({
        template: new Template('#cardsTemplate'),
        factionResultsTemplate: new Template('#factionResultsTemplate'),
        awardedCardTemplate: new Template('#awardedCardTemplate'),
        events: {
            'click .minimize_button': 'onToggleExpand',
            'click .closed_panel': 'onTrayClick',
            'click .arrow_left': 'onPrevClick',
            'click .arrow_right': 'onNextClick',
        },

        initialize: function (options) {
            _super.initialize.apply(this, options);
            this.model = options.model;
            this.deck = this.model.get('deck');
            this.listenTo(this.deck, 'changePlayArea', this.onPlayAreaChange);
            this.listenTo(this.model, 'checkForceDiscard', this.checkForceDiscard);
            this.listenTo(this.model, 'phaseUndo', this.onPhaseUndo);
            this.listenTo(this.model, 'phaseNext', this.onPhaseNext);
            this.listenTo(this.model, 'saveCards', this.saveCardLocations);
        },

        render: function () {
            var data = this.model.toJSON(),
                html, resultsHTML;

            if (!this.model.get('isPlayCards')) {
                data.paResult = data.playerWonPA ? 'won' : 'lost';
                data.factionResults = data.factionResults.map(function(r){
                    r.color = (r.faction - data.faction + data.factionColor + 4) % 4;
                    return r;
                });
                resultsHTML = _.map(data.factionResults, this.factionResultsTemplate.build, this.factionResultsTemplate);
                data.playerResultsHTML = resultsHTML.splice(data.faction, 1).join(' ');
                data.enemyResultsHTML = resultsHTML.join(' ');
                data.awardedCardsHTML = _.map(data.awardedCards, this.awardedCardTemplate.build, this.awardedCardTemplate).join(' ');
            }

            html = this.template.build(data);
            this.$el.html(html);
            this.buildCards();
            this.enableDragAndDrop();
            if (this.model.get('phase') == 7)
                this.disableCards();
            else
                this.disableCards("galaxy");
        },

        buildCards: function () {
            var deck = this.deck.get('deck'),
            cardTemplate = new Template('#cardTemplate'),
            voidCards = _.compact(deck.map(function (c) { return c.get('lastLocation') == 'voidContainer' ? c.id : null })),
            voidLength = voidCards.length < 11 ? voidCards.length : 10;

            $('#tray .cardPanel').each(function () {
                var panelId = $(this).attr('id'),
                    type = panelId.replace("Tray", ""),
                    cardIds = _.compact(deck.map(function (c) { return c.get('type') == type ? c.id : null })),
                    cardTemplate = new Template('#cardTemplate');

                $(this).children('.card_container').each(function (index) {
                    var elId = $(this).attr('id');
                    var card = deck.findWhere({'lastLocation': elId});
                    var data = card && card.toJSON(),
                        html = data ? cardTemplate.build(data) : '';

                    $(this).html(html);
                });
            });

            for (var i = 0; i < voidLength; i++) {
                var card = deck.get(voidCards[i]),
                    data = card && card.toJSON(),
                    html = data ? cardTemplate.build(data) : '';
                $('#voidContainer').append(html);
            }

            $('#voidContainer').children().addClass('voided');

            $('#tray .card, #discard .card:not(.voided)').draggable({
                cursor: 'move',
                revert: "invalid",
                helper: "original",
                zIndex: 10,
                opacity: .7,
                stop: function (event, ui) {
                    $(this).css({ 'top': '', 'left': '', 'z-index': '', 'opacity': '' });
                }
            });

            $('#tray .disabled .card, #discard .card:not(.voided)').draggable('disable');

            if (this.model.get('phase') == 7) {
                this.dealAwardedCards();
            }
            else
                this.adjustTrayCapacity();
        },

        dealAwardedCards: function() {
            var deck = this.deck.get('deck'),
                cardTemplate = new Template('#cardTemplate'),
                newCards = _.last(deck.models, 5);

            for (var i = 0; i < newCards.length; i++) {
                var card = newCards[i],
                    cardId = card.get('id'),
                    type = card.get('type'),
                    data = card && card.toJSON(),
                    html = data ? cardTemplate.build(data) : '';

                $('#' + type + 'Tray').children().each(function () {
                    if ($(this).children().length === 0) {
                        var deckCard = deck.get(cardId);
                        deckCard.set('lastLocation', $(this).attr('id'));
                        $(this).html(html);
                        return false;
                    }
                });
            }

            this.adjustTrayCapacity();

            $('#tray .card').draggable({
                cursor: 'move',
                revert: "invalid",
                helper: "original",
                zIndex: 10,
                opacity: .7,
                stop: function (event, ui) {
                    $(this).css({ 'top': '', 'left': '', 'z-index': '', 'opacity': '' });
                }
            });

            $('#tray .disabled .card').draggable('disable');
        },

        adjustTrayCapacity: function() {
            $('#tray .cardPanel').each(function () {
                var type = $(this).attr('id'),
                    extra = 0;

                $(this).children('.card_container').slice(7, 12).each(function () {
                    if ($(this).children().length > 0)
                        extra++;
                });

                switch (extra) {
                    case 1:
                        $(this).removeClass('layout_7 layout_8 layout_9 layout_10 layout_11 layout_12').addClass('layout_8');
                        break;
                    case 2:
                        $(this).removeClass('layout_7 layout_8 layout_9 layout_10 layout_11 layout_12').addClass('layout_9');
                        break;
                    case 3:
                        $(this).removeClass('layout_7 layout_8 layout_9 layout_10 layout_11 layout_12').addClass('layout_10');
                        break;
                    case 4:
                        $(this).removeClass('layout_7 layout_8 layout_9 layout_10 layout_11 layout_12').addClass('layout_11');
                        break;
                    case 5:
                        $(this).removeClass('layout_7 layout_8 layout_9 layout_10 layout_11 layout_12').addClass('layout_12');
                        break;
                    default:
                        break;
                }
            });
        },

        enableDragAndDrop: function () {
            $('#tray .card').draggable({
                cursor: 'move',
                revert: "invalid",
                helper: "original",
                zIndex: 10,
                opacity: .7,
                stop: function (event, ui) {
                    $(this).css({'top': '', 'left': '', 'z-index': '','opacity': ''});
                }
            });

            $('#tray .disabled .card:not(.voided)').draggable('disable');

            $('.starmap').droppable({
                drop: $.proxy(function (event, ui) {
                    var cardType = ui.draggable.context.getAttribute('data-type'),
                        that = this;
                    if (document.getElementById('play_cards').classList.contains(cardType)) {
                        $('#play_cards .card_container').each(function () {
                            if ($(this).children().length === 0) {
                                that.updateCardSystemId(ui.draggable.context.id, this.parentNode.getAttribute('data-system-id'), cardType);
                                that.updateCardLocation(ui.draggable.context.id, $(this).attr('id'));
                                $(this).append(ui.draggable.context);
                                return false;
                            }
                        });
                    } else return false;
                }, this),
                tolerance: "pointer",
                accept: $.proxy(this, function (dropElem) {
                    var acceptDrop = false,
                        cardType = dropElem.context.getAttribute('data-type');
                    if (document.getElementById('play_cards').classList.contains(cardType)) {
                        $('#play_cards .card_container').each(function () {
                            if ($(this).children().length === 0) {
                                acceptDrop = true;
                                return false;
                            }
                        });
                    }
                    return acceptDrop;
                }),
            });

            $('#discard .card_container').droppable({
                drop: $.proxy(function (event, ui) {
                    this.updateCardLocation(ui.draggable.context.id, event.target.id);
                    event.target.appendChild(ui.draggable.context);
                    this.updateCardSystemId(ui.draggable.context.id, '', "void");
                    this.deck.updateVoid(event.target.children);
                }, this),
                tolerance: "pointer",
                out: function () { $('.starmap').droppable('disable'); }
            });

            $('#play_cards, #card_ui_backstop').droppable({
                drop: function (event, ui) {
                    return false;
                },
                tolerance: "pointer",
                over: function () { $('.starmap').droppable('disable');},
                out: function () { $('.starmap').droppable('enable'); }
            });

            $('#tray .card_container, #play_cards .card_container').droppable({
                drop: $.proxy(this.onDrop, this),
                tolerance: "pointer",
                over: function () { $('.starmap').droppable('disable'); }
            });

            $('#tray .disabled .card_container').droppable('disable');
        },

        onPhaseUndo: function () {
            this.onPhaseChange(-1);
        },

        onPhaseNext: function () {
            this.onPhaseChange(1);
        },

        onPhaseChange: function (direction) {
            var phase = this.model.get('phase'),
                type,
                prevType;

            switch (phase) {
                case 1:
                    type = "galaxy";
                    prevType = "system";
                    break;
                case 2:
                    type = "system";
                    prevType = "planet";
                    break;
                case 3:
                    type = "planet";
                    break;
                default:
                    break;
            }

            if (phase < 3 && direction < 0) this.loadPreviousCardLocations(prevType);

            this.switchTray(type);
            this.disableCards(type);
        },

        switchTray: function (type) {
            var $currentPhaseTray = $('#' + type + 'Tray');

            $('#tray').removeClass('noTransition');

            if ($currentPhaseTray.length && !$currentPhaseTray.hasClass('open_panel')) {
                $('.open_panel').removeClass('open_panel').addClass('closed_panel').find('.card_container').droppable('disable').find('.card').draggable('disable');
                $currentPhaseTray.removeClass('closed_panel').addClass('open_panel').css({ 'left': 0 }).find('.card_container').droppable('enable');
                $('.closed_panel').removeClass('last_closed');
                $('.closed_panel:last').css({ 'left': '50%' }).addClass('last_closed');
                $('.closed_panel:first').css({ 'left': 0 });
            }
        },

        disableCards: function (type) {
            switch (type) {
                case 1:
                case "galaxy":
                    $('#galaxyTray').removeClass('disabled').addClass('enabled').children().droppable('enable');
                    $('#systemTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#planetTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('.system_card:not(.voided), .planet_card:not(.voided)').addClass('disabled').removeClass('enabled').draggable('disable');
                    $('.galaxy_card:not(.voided)').not('.voided').removeClass('disabled').addClass('enabled').draggable('enable');
                    break;
                case 2:
                case "system":
                    $('#systemTray').removeClass('disabled').addClass('enabled').children().droppable('enable');
                    $('#galaxyTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#planetTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('.galaxy_card:not(.voided), .planet_card:not(.voided)').addClass('disabled').removeClass('enabled').draggable('disable');
                    $('.system_card:not(.voided)').removeClass('disabled').addClass('enabled').draggable('enable');
                    break;
                case 3:
                case "planet":
                    $('#planetTray').removeClass('disabled').addClass('enabled').children().droppable('enable');
                    $('#galaxyTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#systemTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('.galaxy_card:not(.voided), .system_card:not(.voided)').addClass('disabled').removeClass('enabled').draggable('disable');
                    $('.planet_card:not(.voided)').removeClass('disabled').addClass('enabled').draggable('enable');
                    break;
                default:
                    $('#planetTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#galaxyTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#systemTray').addClass('disabled').removeClass('enabled').children().droppable('disable');
                    $('#tray .card, #discard .card:not(.voided), #play_cards .card').addClass('disabled').removeClass('enabled').draggable('disable');
                    break;
            }
        },

        onToggleExpand: function (evt) {
            $(evt.target).toggleClass('activated');
            $('#tray, #discard, #play_cards, #card_ui_backstop').toggleClass('minimized');
            if ($('#tray').hasClass('minimized')) {
                $('#tray .open_panel .card').draggable('disable');
            } else {
                $('#tray .open_panel .card').draggable('enable');
            }
        },

        onTrayClick: function (evt) {
            var $el = $(evt.target).parents('.closed_panel').length ? $(evt.target).parents('.closed_panel') : $(evt.target);

            $('#tray').removeClass('noTransition');

            $('.open_panel').removeClass('open_panel').addClass('closed_panel').children().droppable('disable').find('.card').draggable('disable');
            $el.bind("mouseleave", function () {
                $el.removeClass('noHover');
                $el.unbind("mouseleave");
            });
            $el.removeClass('closed_panel').addClass('open_panel noHover').css({ 'left': 0 });
            if ($el.hasClass('enabled')) {
                $el.children().droppable('enable').find('.card').draggable('enable');
            }
            $('.closed_panel').removeClass('last_closed');
            $('.closed_panel:last').css({ 'left': '50%' }).addClass('last_closed');
            $('.closed_panel:first').css({ 'left': 0 });
        },

        onPrevClick: function () {
            this.trigger('prevSystem');
        },

        onNextClick: function () {
            this.trigger('nextSystem');
        },

        onPlayAreaChange: function () {
            if (!this.model.get('isPlayCards')) return;
            var playArea = this.deck.get('playArea'),
                currentArea = this.deck.get('systemId') !== null && this.deck.get('systemId') !== undefined ? this.deck.get('systemId') : playArea,
                deck = this.deck.get('deck'),
                cardsOnSelectedSystem = deck.where({ 'systemId': currentArea }),
                phase = this.model.get('phase'),
                galaxy = this.model.get('galaxy');

            $('#play_cards').removeClass('galaxy system planet').addClass(playArea).attr('data-system-id', currentArea).find('.card_container').empty().each(function () {
                for (var i = 0; i < cardsOnSelectedSystem.length; i++) {
                    if ($(this).attr('id') == cardsOnSelectedSystem[i].attributes.location) {
                        var cardId = cardsOnSelectedSystem[i].id,
                        card = deck.get(cardId),
                        cardTemplate = new Template('#cardTemplate'),
                        data = card.toJSON(),
                        html = cardTemplate.build(data);

                        $(this).html(html);
                    }
                }
            });

            $('#play_cards .card').draggable({
                cursor: 'move',
                revert: "invalid",
                helper: "original",
                zIndex: 10,
                opacity: .7,
                stop: function (event, ui) {
                    $(this).css({ 'top': '', 'left': '', 'z-index': '', 'opacity': '' });
                }
            });

            switch (playArea) {
                case 'galaxy':
                    currentArea = "galaxy";
                    $('#play_cards .panel_heading').html("<span class='selected_system'>" + currentArea + "</span><span class='arrow_right'></span>");
                    break;
                case 'system':
                    var selectedSystemId = galaxy.get('selectedSystemId'),
                        selectedSystem = galaxy.get('systems').get(selectedSystemId),
                        selectedName = selectedSystem ? selectedSystem.get('name') : null;
                    $('#play_cards .panel_heading').html("<span class='arrow_left'></span><span class='selected_system'>" + selectedName + "</span><span class='arrow_right'></span>");
                    break;
                case 'planet':
                    currentArea = "planet";
                    $('#play_cards .panel_heading').html("<span class='arrow_left'></span><span class='selected_system'>" + currentArea + "</span>");
                    break;
            }

            this.disableCards(phase);
        },

        onDrop: function (event, ui) {
            var dragEl = ui.draggable.context,
                target = event.target,
                cardType = dragEl.getAttribute('data-type'),
                dragParentId = dragEl.parentNode.id;

            if (target.firstElementChild) {
                if (!target.firstElementChild.classList.contains('disabled')) {
                    this.updateCardSystemId(target.firstElementChild.id, dragEl.parentNode.getAttribute('data-system-id'), cardType);
                    this.updateCardLocation(target.firstElementChild.id, dragEl.parentNode.id);
                    dragEl.parentNode.appendChild(target.firstElementChild);
                    this.updateCardSystemId(dragEl.id, target.parentNode.getAttribute('data-system-id'), cardType);
                    this.updateCardLocation(dragEl.id, target.id);
                    target.appendChild(dragEl);
                } else {
                    return false;
                }
            } else {
                if (target.parentNode.id == "play_cards") {
                    var containerClass = target.parentNode.classList;
                    if (target.parentNode.classList.contains(cardType)) {
                        this.updateCardSystemId(dragEl.id, target.parentNode.getAttribute('data-system-id'), cardType);
                        this.updateCardLocation(dragEl.id, target.id);
                        target.appendChild(dragEl);
                    } else return false;
                } else {
                    this.updateCardSystemId(dragEl.id, target.parentNode.getAttribute('data-system-id'), cardType);
                    this.updateCardLocation(dragEl.id, target.id);
                    target.appendChild(dragEl);
                }
            }

            if (target.id == "voidContainer" || dragParentId == "voidContainer") {
                this.deck.updateVoid(document.getElementById('voidContainer').children);
                this.updateCardSystemId(dragEl.id, '', null);
            }
        },

        updateCardLocation: function (id, loc) {
            var deck = this.deck.get('deck'),
                card = deck.get(id),
                lastLoc = card.get('lastLocation');
            card.set('location', loc);
        },

        updateCardSystemId: function (id, system, type) {
            var deck = this.deck.get('deck'),
                card = deck.get(id);

            if (type == "system") {
                card.set('systemId', system);
            } else {
                card.set('systemId', type);
            }
        },

        saveCardLocations: function() {
            var deck = this.deck.get('deck'),
                cardsPlayed = deck.filter(function (card) { return (card.attributes.systemId && card.attributes.systemId !== 'void') }),
                deckLength = deck.models.length - cardsPlayed.length > 36 ? 36 : deck.models.length - cardsPlayed.length;
            for (var i = 0; i < cardsPlayed.length; i++) {
                var id = cardsPlayed[i].get('id');
                deck.remove(id);
            }
            for (var i = 0; i < deckLength; i++) {
                var id = deck.models[i].get('id'),
                    location = deck.models[i].get('location');

                if (location) {
                    deck.models[i].set('lastLocation', location);
                    deck.models[i].set('location', null);
                }
            }
        },

        loadPreviousCardLocations: function (type) {
            var deck = this.deck.get('deck');
            var typeCards = deck.where({ 'type': type }),
                typeCardsLength = typeCards.length < 13 ? typeCards.length : 12,
                cardTemplate = new Template('#cardTemplate');

            $('#' + type + 'Tray .card_container').html('');
            for (var i = 0; i < typeCardsLength; i++) {
                var card = typeCards[i],
                    location = card.get('location'),
                    lastLocation = card.get('lastLocation'),
                    systemId = card.get('systemId'),
                    data = card && card.toJSON(),
                    html = data ? cardTemplate.build(data) : '';

                if (location) {
                    if (systemId == document.getElementById('play_cards').getAttribute('data-system-id') || systemId == "void") {
                        document.getElementById(location).lastElementChild.remove();
                    }
                    card.set('location', lastLocation).set('systemId', null);
                }

                if (lastLocation !== 'voidContainer')
                    $('#' + lastLocation).html(html);
            }

            $('#tray .card').draggable({
                cursor: 'move',
                revert: "invalid",
                helper: "original",
                zIndex: 10,
                opacity: .7,
                stop: function (event, ui) {
                    $(this).css({ 'top': '', 'left': '', 'z-index': '', 'opacity': '' });
                }
            });
        },

        checkForceDiscard: function () {
            var phase = this.model.get('phase'),
                isForceDiscard = false,
                phases = [null, "galaxy", "system", "planet"],
                count = 0;

            this.model.set('isForceDiscard', isForceDiscard);

            if (phase > 0 && phase < 4) {
                $('#' + phases[phase] + 'Tray .card_container').each(function () {
                    if ($(this).children().length > 0)
                        count++;
                    if (count > 7) {
                        isForceDiscard = true;
                        return false;
                    }
                });
                this.model.set('isForceDiscard', isForceDiscard);
            }
        }
    });
});

Omega.define(function () {
    "use strict";
    var View = Omega.require('Omega.Views.View'),
        Template = Omega.require('Omega.Utils.Template'),
        _super = View.prototype;

    Omega.Views.CurrentTargetView = View.extend({
        template: new Template('#currentTargetTemplate'),
        planetTemplate: new Template('#currentTargetPlanetTemplate'),

        events: {
        },

        initialize: function (options) {
            _super.initialize.apply(this, options);
            this.model = options.model;
            this.addWindowEvent('resize', _.debounce(this.resize, 200));
        },

        render: function (options) {
            var data,
                html,
                planets;

            if (this.model) {
                data = this.model.toJSON();
                data.isGalaxy = false;
                if (data.planets.length) {
                    data.planetsHtml = _.map(data.planets, this.planetTemplate.build, this.planetTemplate).join(' ');
                }
            } else {
                data = {
                    isGalaxy: true
                }
            }
            html = this.template.build(data);
            this.$el.html(html);
            this.resize();
        },

        resize: function() {
            var screenHeight = window.innerHeight,
                cardHeight = $('#play_cards').height() || 0,
                height = screenHeight - cardHeight - this.$('.targetBoxHeader').height() - this.$('.targetBoxHeader').height() - 44;
            this.$('.planetList').css({ maxHeight: height});
        }
    });
});

Omega.define(function () {
  "use strict";
  var View = Omega.require('Omega.Views.View'),
    Template = Omega.require('Omega.Utils.Template'),
    _super = View.prototype;

  Omega.Views.DiscardModal = View.extend({
    template: new Template('#discardModalTemplate'),

    events: {
      'click .button': 'onClick'
    },

    render: function() {
      var html = this.template.build();
      this.$el.html(html);
    },

    onClick: function() {
      this.trigger('close');
    }
  });
});

Omega.define(function() {
  'use strict';
  var PhasesBarView = Omega.require('Omega.Views.PhasesBarView'),
      CurrentTargetView = Omega.require('Omega.Views.CurrentTargetView'),
      SaveMenuView = Omega.require('Omega.Views.SaveMenuView'),
      CardsView = Omega.require('Omega.Views.CardsView'),
      StarmapView = Omega.require('Omega.Views.StarmapView'),
      DiscardModal = Omega.require('Omega.Views.DiscardModal'),
      View = Omega.require('Omega.Views.View'),
      Template = Omega.require('Omega.Utils.Template'),
      SystemModel = Omega.require('Omega.Models.SystemModel'),
      _super = View.prototype;

  Omega.Views.GameView = View.extend({
    template: new Template('#gameTemplate'),

    initialize: function(options) {
      _super.initialize.apply(this, options);
      this.model = options.model;
      var galaxy = this.model.get('galaxy')
      this.listenTo(this.model, 'change:phase', this.handleChange);
      this.listenTo(this.model, 'change:turn', this.handleChange);
      this.listenTo(this.model, 'change:isForceDiscard', this.forceDiscard);
      this.listenTo(galaxy, 'change', this.handleGalaxyChange);

      this.starMap = new StarmapView({
        model: galaxy
      });
      this.starMap.on('selectSystem', this.model.selectSystem, this.model);

      this.cardView = new CardsView({
          model: this.model
      });
      this.cardView.on('prevSystem', this.model.prevSystem, this.model);
      this.cardView.on('nextSystem', this.model.nextSystem, this.model);

      this.phaseBarView = new PhasesBarView({
          model: this.model
      });
      this.phaseBarView.on('undoPhase', this.model.prevPhase, this.model);
      this.phaseBarView.on('nextPhase', this.model.nextPhase, this.model);

      this.buildCurrentTarget();
      this.saveMenuView = new SaveMenuView();
      this.saveMenuView.on('quit', this.quit, this);
    },

    buildCurrentTarget: function() {
      var galaxy = this.model.get('galaxy'),
          system = galaxy.getSelectedSystem();
      this.currentTargetView = new CurrentTargetView({
          model: system
      });
    },

    render: function() {
      this.$el.html(this.template.build());
      this.renderSubview(this.starMap, '.starmap');
      this.renderSubview(this.cardView, '.card-ui');
      this.renderSubview(this.phaseBarView, '.phases-bar');
      this.renderSubview(this.currentTargetView, '.current-target');
      this.renderSubview(this.saveMenuView, '.save-menu');
    },

    remove: function() {
      this.starMap.remove();
      this.cardView.remove();
      this.phaseBarView.remove();
      this.currentTargetView.remove();
      this.saveMenuView.remove();
      _super.remove.apply(this);
    },

    handleChange: function () {
      var attrs = this.model.changedAttributes();
      if (attrs.hasOwnProperty('turn')) {
        this.render();
      }
    },

    handleGalaxyChange: function() {
      var galaxy = this.model.get('galaxy'),
          attrs = galaxy.changedAttributes();
      if (attrs.selectedSystemId) {
        this.currentTargetView.remove();
        this.buildCurrentTarget();
        this.$el.append('<div class="current-target">');
        this.renderSubview(this.currentTargetView, '.current-target');
      }
    },

    forceDiscard: function () {
        this.discardModal = new DiscardModal();
        this.discardModal.on('close', function () { this.remove(); });
        if (this.model.get('isForceDiscard')) {
            this.$el.append('<div class="discard-modal">');
            this.renderSubview(this.discardModal, '.discard-modal');
        }
    },

    quit: function() {
      this.trigger('quit');
    }
  });
});

Omega.define(function() {
  "use strict";
  var View = Omega.require('Omega.Views.View'),
      Template = Omega.require('Omega.Utils.Template'),
      _super = View.prototype;

  Omega.Views.NewGameView = View.extend({
      template: new Template('#newGameTemplate'),

      events: {
          'click .cancel': 'onCancel',
          'click .create': 'onCreate'
      },

      initialize: function(options) {
          _super.initialize.apply(this, options);
          this.model = options.model;
      },


      render: function(options) {
          var data = this.model.toJSON(),
              html = this.template.build(data);
          this.$el.html(html);
          this.$(".galaxySize").slider({
              orientation: 'horizontal',
              range: 'min',
              value: data.galaxySize,
              min: 0,
              max: 3,
              slide: $.proxy(this.updateText, this)
          });
          this.$(".gameDifficulty").slider({
              orientation: 'horizontal',
              range: 'min',
              value: data.gameDifficulty,
              min: 0,
              max: 3,
              slide: $.proxy(this.updateText, this)
          });
          this.$(".inputBoxStyleColor").change(function(){
              var dropdownColors = ['blue', 'yellow', 'red', 'green'];
              $(".inputBoxStyleColor").removeClass(dropdownColors.join(" "));
              var i = $(this).val();
              var selectedColor = dropdownColors[i];
              $(".inputBoxStyleColor").addClass(selectedColor);
          });
      },

    updateText: function (evt, ui) {
      var $el = $(evt.target).parent().find('.indicatorContainer');
      $el.removeClass('show-0 show-1 show-2 show-3').addClass('show-' + ui.value);
    },

    updateModel: function() {
      var data = {};
      this.$('.inputData').each(function(){
        var $el = $(this);
        data[this.name] = $el.attr('name') == 'name' ? $el.val() : parseInt($el.val(), 10);
      });
      data.galaxySize = this.$(".galaxySize").slider('value');
      data.gameDifficulty = this.$(".gameDifficulty").slider('value');
      this.model.set(data, { silent: true });
    },

    onCancel: function() {
      this.trigger('cancel');
    },

    onCreate: function() {
      this.updateModel();
      this.trigger('create');
    }
  });
});

Omega.define(function () {
  "use strict";
  var View = Omega.require('Omega.Views.View'),
    Template = Omega.require('Omega.Utils.Template'),
    _super = View.prototype;

  Omega.Views.PhasesBarView = View.extend({
    template: new Template('#phasesBarTemplate'),

    events: {
      'click .phasesUndoButton':'onUndoClick',
      'click .phasesNextButton': 'onNextClick',
    },

    initialize: function (options) {
      _super.initialize.apply(this, options);
      this.model = options.model;
      this.listenTo(this.model, 'change', this.handleChange);
    },

    render: function (options) {
      var phase = this.model.get('phase'),
          style = ['galaxy','galaxy','system','planet','move','attack',null,'results'],
          data = {
            phase: style[phase],
            undo: this.model.get('isPrevPhaseEnabled') ? 'phaseActive' : '',
            next: this.model.get('isNextPhaseEnabled') ? 'phaseActive' : ''
          },
          html = this.template.build(data);
      this.$el.html(html);
    },

    handleChange: function() {
      var attrs = this.model.changedAttributes();
      if (_.union(_.keys(attrs), ['phase', 'isPrevPhaseEnabled', 'isNextPhaseEnabled'])) {
        this.render();
      }
    },

    onNextClick: function () {
        this.trigger("nextPhase");
    },

    onUndoClick: function () {
        this.trigger("undoPhase");
    }
  });
});

Omega.define(function () {
    return
    "use strict";
    var View = Omega.require('Omega.Views.View'),
        Template = Omega.require('Omega.Utils.Template'),
        _super = View.prototype;

    Omega.Views.PlanetView = View.extend({
        template: new Template('#planetListTemplate'),

        events: {
        },

        initialize: function (options) {
            _super.initialize.apply(this, options);
            this.model = options.model;
        },

        render: function (options) {
            var data,
                html;

            data = this.model.toJSON()

            html = this.template.build(data);
            this.$el.html(html);

        }

    });
});

Omega.define(function () {
  "use strict";
  var View = Omega.require('Omega.Views.View'),
    Template = Omega.require('Omega.Utils.Template'),
    _super = View.prototype;

  Omega.Views.PlayingModal = View.extend({
    template: new Template('#playingModalTemplate'),

    events: {
      'click .button': 'onClick'
    },

    render: function() {
      var html = this.template.build();
      this.$el.html(html);
    },

    onClick: function(evt) {
      var result = $(evt.target).attr('data-result'),
          playerWon = (result != 'lose');
      this.trigger('done', playerWon);
    }
  });
});

Omega.define(function () {
    "use strict";
    var View = Omega.require('Omega.Views.View'),
        Template = Omega.require('Omega.Utils.Template'),
        _super = View.prototype;

    Omega.Views.SaveMenuView = View.extend({
        template: new Template('#saveMenuTemplate'),

        events: {
            'click .save_menu_expand': 'onExpandClick',
            'click .menu_save_button': 'onSaveClick',
            'click .menu_load_button': 'onLoadClick',
            'click .menu_quit_button': 'onQuitClick'
        },

        initialize: function (options) {
            _super.initialize.apply(this, options);
        },

        render: function (options) {
            var html = this.template.build();
            this.$el.html(html);
        },

        onExpandClick: function () {
            $('.save_menu_expand').toggleClass('menu_expanded');
            $('.save_quit_menu').toggle();
        },

        onSaveClick: function () {
            this.trigger('saveAs');
        },

        onLoadClick: function () {
            this.trigger('load');
        },

        onQuitClick: function () {
            this.trigger('quit');
        }
    });
});

Omega.define(function() {
  "use strict";

  var View = Omega.require('Omega.Views.View'),
      Template = Omega.require('Omega.Utils.Template'),
      _super = View.prototype;

  Omega.Views.SavedGamesView = View.extend({
    template: new Template('#savedGamesTemplate'),

    events: {
      'click .savedGameBox': 'onGameClick',
      'click .backButton': 'onBack',
      'click .deleteButton': 'onDelete',
      'click .newGameButton': 'onNew',
      'click .loadButton': 'onLoad'
    },

    initialize: function(options) {
        _super.initialize.apply(this, options);
        this.collection = options.collection;
        this.gameTemplate = new Template('#savedGameBoxTemplate');
        this.detailTemplate = new Template('#savedGameDetailsTemplate');
        this.selected = this.collection.pluck('id').pop();
        this.listenTo(this.collection, 'remove', this.render);
    },

    render: function(options) {
      var data = {}, gameData,
          gameHtml;
          gameData = this.collection.toJSON();
          gameHtml = _.map(gameData, this.gameTemplate.build, this.gameTemplate);
      var max = this.collection.length - 1,
          index = this.selectedIndex ? Math.max(0, Math.max(this.selectedIndex, max)) : 0;
      this.selected = (index >=0) ? this.collection.at(index) : null;

      data.noSavedGames = gameData.length ? '' : 'noSavedGames';
      data.lastSavedGameHtml = gameHtml.pop();
      data.allSavedGamesHtml = gameHtml.join('');

      var html = this.template.build(data);
      this.$el.html(html);
      this.$('.savedGameHeader .savedGameBox').addClass('active');
      if (this.selected) this.renderDetails();
    },

    onGameClick: function(evt) {
      var $el = $(evt.currentTarget),
          id = $el.attr('data-id');
      if (this.selected != id) {
        this.selected = id;
        this.renderDetails();
      }
      this.$(".savedGameBox").removeClass("active");
      $el.addClass("active");
    },

    renderDetails: function() {
      var model = this.collection.get(this.selected),
          data = model.toJSON(),
          html;
      data.created = new Date(data.created).toLocaleDateString().split('/').join('.');
      data.lastBattle = new Date(data.lastBattle).toLocaleDateString().split('/').join('.');
      html = this.detailTemplate.build(data);
      this.$('.gameStatistics').html(html);
    },

    onBack: function() {
      this.trigger('back');
    },

    onDelete: function() {
      this.selectedIndex = this.collection.indexOf(this.selected);
      this.trigger('delete', this.selected);
    },

    onNew: function() {
      this.trigger('new');
    },

    onLoad: function() {
      this.trigger('load', this.selected);
    }
  });
});

Omega.define(function() {
  'use strict';

  var env = Omega.require('Omega.environment'),
      View = Omega.require('Omega.Views.View'),
      StarmapZoomView = Omega.require('Omega.Views.StarmapZoomView'),
      Template = Omega.require('Omega.Utils.Template'),
      _super = View.prototype;

  Omega.Views.StarmapView = View.extend({
    initialize: function(options) {
      _super.initialize.apply(this, options);
      this.model = options.model;
      this.listenTo(this.model, 'change:moveMode', this.updateGraph);
      this.listenTo(this.model, 'selectSystem', this.highlightSystem);
      this.listenTo(this.model, 'moveCommander', this.update);
      this.zoom = options.zoom || 2;
      this.zoomView = new StarmapZoomView({
        zoom: this.zoom,
        wheelEl: '.starmapCanvas'
      });
      this.zoomView.on('changeZoom', this.changeZoom, this);
      this.imageLoaded = false;
      this.imageSprite = new Image();
      this.imageSprite.src = env.imagePath + 'systemIcons.png';
      this.imageSprite.onload = $.proxy(this.handleImageLoad, this);
      this.addWindowEvent('resize', _.debounce(this.render, 200));
    },

    highlightSystem: function(systemId) {
      var system = this.model.get('systems').get(systemId);
      this.highlightId = systemId;
      this.highlight[this.highlightIndex].visible = false;
      if (system) {
        var faction = system.get('faction'),
            highlight = this.highlight[faction + 1],
            xy = this.getCanvasPosition(system.get('position'));
        this.highlightIndex = faction + 1;
        highlight.visible = true;
        highlight.x = xy[0];
        highlight.y = xy[1];
      }
      this.updateFlag = true;
    },

    changeZoom: function(zoom, x, y) {
      var mx = x || (this.width/2),
          my = y || (this.height/2),
          sx = (mx - this.container.x - this.dx)/this.size(),
          sy = (my - this.container.y - this.dy)/this.size();
      this.zoom = zoom;
      this.container.x = mx - this.dx - sx * this.size();
      this.container.y = my - this.dy - sy * this.size();
      this.update();
    },

    update: function() {
      this.drawGraph();
      this.positionSystems();
      this.highlightSystem(this.highlightId);
      this.updateFlag = true;
    },

    handleImageLoad: function() {
      this.imageLoaded = true;
      if (this.renderOnLoad) this.render();
    },

    render: function() {
      if (this.imageLoaded) {
        this.cleanup();
        this.renderHtml();
        this.computeDimensions();
        this.setupCanvas();
        this.renderBackground();
        this.createBitmaps();
        this.drawGraph();
        this.positionSystems();
        this.updateFlag = true;
      } else {
        this.renderOnLoad = true;
      }
    },

    cleanup: function() {
      if (this.stage) {
        this.stage.removeAllEventListeners();
        this.stage.removeAllChildren();
        this.stage = null;
      }
    },

    renderHtml: function() {
      this.$el.html('<canvas class="starmapCanvas"></canvas><div class="starmapZoom"></div>');
      this.renderSubview(this.zoomView, this.$('.starmapZoom'));
    },

    setupCanvas: function() {
      this.canvas = this.$('canvas').get(0);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.stage = new createjs.Stage(this.canvas);
      this.stage.enableMouseOver(10);
      this.stage.mouseMoveOutside = true;
      this.background = new createjs.Shape();
      this.stage.addChild(this.background);
      this.container = new createjs.Container();
      this.graph = new createjs.Shape();
      this.container.addChild(this.graph);
      this.stage.addChild(this.container);
      createjs.Ticker.on('tick', this.updateStage, this);
    },

    updateStage: function(event) {
      if (this.updateFlag && this.stage) {
        this.updateFlag = false;
        this.stage.update(event);
      }
    },

    computeDimensions: function() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dx = (this.width - this.size()) / 2;
      this.dy = (this.height - this.size()) / 2;
    },

    renderBackground: function() {
      var hit = new createjs.Shape();
      hit.graphics.beginFill("#000").drawRect(0, 0, this.width, this.height);
      this.background.hitArea = hit;
      this.background.on('mousedown', this.startDrag, this);
      this.background.on('pressmove', this.doDrag, this);
      this.background.on('click', this.clickSystem, this);
    },

    startDrag: function(event) {
      this.offset = new createjs.Point();
      this.offset.x = event.stageX - this.container.x;
      this.offset.y = event.stageY - this.container.y;
    },

    doDrag: function(event) {
      this.dragging = true;
      this.container.x = event.stageX - this.offset.x;
      this.container.y = event.stageY - this.offset.y;
      this.updateFlag = true;
    },

    updateGraph: function() {
      if (this.graph) {
        this.drawGraph();
        this.updateFlag = true;
      }
    },

    drawGraph: function() {
      var i, xy0, xy1,
          graphics = this.graph.graphics,
          edges = this.model.get('edges'),
          moves = this.model.getValidMoveEdges();
      graphics.clear();
      if (moves.length) {
        [2, 1.7, 1.4].forEach(function(thick){
          graphics.beginStroke('rgba(255,255,255,0.2)').setStrokeStyle(thick);
          for (i = 0; i < moves.length; i++) {
            xy0 = this.getCanvasPosition(moves[i][0]);
            xy1 = this.getCanvasPosition(moves[i][1]);
            graphics.moveTo(xy0[0], xy0[1]);
            graphics.lineTo(xy1[0], xy1[1]);
          }
        }, this);
      }
      graphics.beginStroke('rgba(79,186,166,0.35)').setStrokeStyle(1);
      for (i = 0; i < edges.length; i++) {
        xy0 = this.getCanvasPosition(edges[i][0]);
        xy1 = this.getCanvasPosition(edges[i][1]);
        graphics.moveTo(xy0[0], xy0[1]);
        graphics.lineTo(xy1[0], xy1[1]);
      }
    },

    createBitmaps: function() {
      this.highlightIndex = 0;
      this.highlight = _.range(5).map(this.createHighlight, this);
      this.model.get('systems').each(this.createSystem, this);
    },

    createHighlight: function(index) {
      var bitmap = new createjs.Bitmap(this.imageSprite);
      bitmap.visible = false;
      this.container.addChild(bitmap);
      bitmap.alpha = 0.4;
      bitmap.regX = bitmap.regY = 20;
      bitmap.sourceRect = new createjs.Rectangle(0, index*40, 40, 40);
      bitmap.cursor = 'pointer';
      return bitmap;
    },

    createSystem: function(system) {
      var bitmap, icon;
      bitmap = new createjs.Bitmap(this.imageSprite);
      this.container.addChild(bitmap);
      bitmap.regX = bitmap.regY = 16;
      bitmap.name = system.id;
      bitmap.cursor = 'pointer';
      bitmap.on('mousedown', this.clickSystem, this);
      bitmap.on('rollover', this.animateSystem, this);
      bitmap.on('rollout', this.stopAnimateSystem, this);
    },

    positionSystems: function() {
      this.model.get('systems').each(function(system){
        var bitmap = this.container.getChildByName(system.id),
            xy = this.getCanvasPosition(system.get('position')),
            icon = system.get('faction') + (system.get('isCommander') ? 6 : 1),
            isPlayerCommander = system.get('isCommander') && system.get('faction') == this.model.get('playerFaction');
        bitmap.x = xy[0];
        bitmap.y = xy[1];
        bitmap.isPlayerCommander = isPlayerCommander;
        bitmap.scaleX = isPlayerCommander ? 1.2 : 1.0,
        bitmap.scaleY = isPlayerCommander ? 1.2 : 1.0,
        bitmap.sourceRect = new createjs.Rectangle((icon < 5 ? 72 : 40), (icon % 5)*32, 32, 32);
      }, this);
    },

    clickSystem: function(evt) {
      var bitmap = evt.currentTarget;
      if (this.dragging) {
        this.dragging = false;
      } else {
        this.trigger('selectSystem', bitmap.name);
      }
    },

    animateSystem: function(evt) {
      evt.currentTarget.scaleX = evt.currentTarget.scaleY = evt.currentTarget.isPlayerCommander ? 1.4 : 1.2;
      this.updateFlag = true;
    },

    stopAnimateSystem: function(evt) {
      evt.currentTarget.scaleX = evt.currentTarget.scaleY = evt.currentTarget.isPlayerCommander ? 1.2 : 1.0;
      this.updateFlag = true;
    },

    getCanvasPosition: function(position) {
      return [this.dx + position[0] * this.size(), this.dy + position[1] * this.size()];
    },

    size: function() {
      return 512 * Math.pow(1.5, this.zoom);
    }
  });
});

Omega.define(function() {
  'use strict';
  var env = Omega.require('Omega.environment'),
      View = Omega.require('Omega.Views.View'),
      Template = Omega.require('Omega.Utils.Template'),
      _super = View.prototype;

  Omega.Views.StarmapZoomView = View.extend({
    template: new Template('#starmapZoomTemplate'),

    events: {
      'click .button': 'buttonZoom'
    },

    initialize: function(options) {
      _super.initialize.apply(this, options);
      this.zoom = options.zoom || 0;
      this.min = options.min || 0;
      this.max = options.max || 8;
      this.wheelEl = options.wheelEl;
    },

    render: function() {
      this.$el.html(this.template.build());
      this.$('.slider').slider({
        orientation: 'vertical',
        range: 'min',
        value: this.zoom,
        min: this.min,
        max: this.max,
        slide: $.proxy(this.sliderZoom, this)
      });
      if (this.wheelEl) $(this.wheelEl).on('mousewheel', $.proxy(this.wheelZoom, this));
    },

    sliderZoom: function(evt, ui) {
      var delta = ui.value - this.zoom;
      this.changeZoom(delta);
    },

    buttonZoom: function(evt) {
      this.changeZoom($(evt.target).attr('data-delta'));
    },

    wheelZoom: function(event) {
      var delta = (event.deltaY < 0) ? -1 : 1;
      this.changeZoom(delta, event.clientX, event.clientY);
    },

    changeZoom: function(delta, x, y) {
      delta = parseInt(delta, 10);
      this.zoom = Math.min(this.max, Math.max(this.min, this.zoom + delta));
      if (delta < 0 || delta > 0) {
        this.$('.slider').slider('value', this.zoom);
        this.trigger('changeZoom', this.zoom, x, y);
      }
    }
  });
});

Omega.define(function() {
  "use strict";
  var View = Backbone.View,
      _super = View.prototype;

  Omega.Views.View = View.extend({
    initialize: function(options) {
      this.eventNamespace = _.uniqueId('.View');
    },

    renderSubview: function (view, selector) {
      view.setElement(this.$(selector)).render();
    },

    addWindowEvent: function(event, func) {
      $(window).on(event + this.eventNamespace, $.proxy(func, this));
    },

    remove: function() {
      $(window).off(this.eventNamespace);
      this.stopListening();
      _super.remove.call(this);
    }
  });
});

