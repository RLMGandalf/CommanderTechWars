var model;

$(document).ready(function () {

    function PlayerViewModel(name, commander, badges, is_player) {
        var self = this;

        self.name = ko.observable(name);
        self.commander = ko.observable(commander);
        self.badges = badges ? badges.map(function (e) { return getCatalogItem(e); }) : null;
        self.commanderImageSource = commander.ImgSource;
        self.isPlayer = ko.observable(is_player);
    }

    function SlotViewModel(options /* ai economy_factor */) {
        var self = this;
        var states = ['empty', 'player'];

        self.player = ko.observable(null);
        self.stateIndex = ko.observable(options.ai ? 2 : 0);
        self.isEmpty = ko.computed(function () { return self.stateIndex() === 0 });
        self.isPlayer = ko.computed(function () { return self.stateIndex() === 1 });
        self.ai = ko.observable(false);

        self.hover = ko.observable(false);

        self.playerName = ko.observable();
        self.playerId = ko.observable();
        self.isCreator = ko.observable(false);
        self.creatorName = ko.observable();
        self.isReady = ko.observable(false);
        self.isLoading = ko.observable(false);
        self.primaryColor = ko.observable('');
        self.rawColor = ko.observable([]);

        self.secondaryColor = ko.observable('');
        self.commander = ko.observable(''); /* { ObjectName UnitSpec } */
        self.commanderName = ko.computed(function () { return self.commander() ? self.commander().ObjectName : ''; });
        self.commanderImage = ko.computed(function () { return self.commander() ? self.commander().ProfileImgSource : ''; });

        self.serverEconFactor = ko.observable(parseFloat(options.economy_factor));
        self.clientEconFactor = ko.observable(null);
        self.economyFactor = ko.computed({
            read: function() {
                var server = self.serverEconFactor();
                var client = self.clientEconFactor();
                if (_.isFinite(client))
                    return client.toFixed(1);
                if (_.isFinite(server))
                    return server.toFixed(1);
                return '1.0';
            },
            write: function(value) {
                if (!model.isGameCreator())
                    return;

                var newValue = parseFloat(value);
                if (!_.isFinite(newValue))
                    newValue = 1.0;

                newValue = Math.min(Math.max(0.0, newValue), 5.0);

                if (newValue !== self.clientEconFactor()) {
                    model.send_message('set_econ_factor', {
                        id: self.playerId(),
                        economy_factor: newValue.toFixed(1)
                    });
                }
                self.clientEconFactor(newValue);
                self.economyFactor.notifySubscribers();
            }
        });

        self.adjustEconFactor = function (value) {
            var newValue = (parseFloat(self.economyFactor()) + value).toFixed(1)
            self.economyFactor(newValue);
        };

        self.lockColorIndex = ko.observable(false);
        self.colorIndex = ko.observable();
        self.colorIndex.subscribe(function (value) {
            if (self.lockColorIndex())
                return;

            if (self.ai())
                model.send_message('set_primary_color_index_for_ai', {
                    id: self.playerId(),
                    color: Number(self.colorIndex())
                });
            else
                model.send_message('set_primary_color_index', Number(self.colorIndex()));

            model.showColorPicker(false);
            model.colorPickerSlot(null);
        });

        self.lockAIPersonality = ko.observable(false);
        self.aiPersonality = ko.observable(model.aiPersonalityNames()[0]);
        self.aiPersonality.subscribe(function (value) {
            if (self.lockAIPersonality() || !model.isGameCreator())
                return;

            if (!self.ai() || !value || !model.aiPersonalities()[value])
                return;

            var personality = model.aiPersonalities()[value];
            personality.name = value;

            model.send_message('set_ai_personality', {
                id: self.playerId(),
                ai_personality: personality
            });
        });

        self.updateFromJson = function (json) {

            if (_.isEmpty(json)) {
                self.stateIndex(0);
                self.playerName('');
            }
            else if (_.has(json, 'name')) {
                self.stateIndex(1);
                self.playerName(json.name);
            }

            if (_.has(json, 'id'))
                self.playerId(json.id);

            self.isCreator(!!json.creator);

            self.ai(!!json.ai);

            if (json.personality) {
                self.lockAIPersonality(true);
                self.aiPersonality(json.personality.name);
                self.lockAIPersonality(false);
            }

            self.serverEconFactor(parseFloat(json.economy_factor));

            if (json.color) {
                self.rawColor(json.color);
                self.primaryColor('rgb(' + json.color[0].join() + ')');
                self.secondaryColor('rgb(' + json.color[1].join() + ')');
            }

            if (json.color_index) {
                self.lockColorIndex(true);
                self.colorIndex(json.color_index);
                self.lockColorIndex(false);
            }

            if (json.commander)
                self.commander(getCatalogItem(json.commander.ObjectName));

            self.isReady(json.ready);
            self.isLoading(json.loading);
        };

        self.clearPlayers = function () {
            if (self.isPlayer())
                self.stateIndex(0);

            self.playerName('');
            self.rawColor([]);
            self.primaryColor('');
            self.secondaryColor('');
        };

        self.containsThisPlayer = ko.computed(function () {
            return self.playerName() === model.displayName();
        });

        self.allowColorModification = ko.computed(function () {
            return self.containsThisPlayer() || (self.ai() && model.isGameCreator())
        });

        self.cinematicInfo = ko.computed(function() {
            return {
                ai: self.ai(),
                commander: self.commander(),
                name: self.playerName(),
                color: self.rawColor()
            };
        });
    }

    function ArmyViewModel(army_index, options /* slots alliance ai economy_factor */) {
        var self = this;

        self.index = ko.observable(army_index);

        self.aiArmy = ko.observable(!!options.ai);
        self.aiArmy.subscribe(function (value) {
            _.invoke(self.slots(), 'setIsAI', !!value);
        });
        self.toggleAiControl = function () {
            //model.send_message('modify_army', {
            //    army_index: self.index(),
            //    options: { ai: !self.aiArmy() }
            //});
        };

        self.slots = ko.observableArray([]);

        var slot_count = options ? options.slots : 1;
        for (var i = 0; i < slot_count; i++)
            self.slots().push(new SlotViewModel({ ai: self.aiArmy() }));

        self.allianceGroup = ko.observable(0);
        self.maxAllianceGroup = ko.observable(6);
        self.allianceGroupImageSource = ko.computed(function () {
            return 'coui://ui/main/shared/img/alliance_group/alliance_group_' + self.allianceGroup() + '.png';
        });

        self.numberOfSlots = ko.computed(function () { return self.slots().length; });
        self.numberOfEmptySlots = ko.computed(function () {
            return _.filter(self.slots(), function (element) { return element.isEmpty() }).length;
        });
        self.isEmpty = ko.computed(function () {
            return self.numberOfEmptySlots() === self.slots().length;
        });

        self.alliance = ko.observable(!!options.alliance);
        self.sharedArmy = ko.computed(function () { return !self.alliance(); });

        self.showToggleSharedArmy = ko.computed(function () {
            return model.isTeamGame() && self.numberOfSlots() > 1;
        });
        self.toggleSharedArmy = function () {
            if (!model.isGameCreator())
                return;

            model.send_message('modify_army', {
                army_index: self.index(),
                options: { alliance: !self.alliance() }
            });
        };

        self.metal = ko.observable(1000);
        self.energy = ko.observable(1000);
        self.rate = ko.observable(1.0);

        self.changeAllianceGroup = function () {
            self.allianceGroup((self.allianceGroup() + 1) % self.maxAllianceGroup());
        }

        self.showAddSlot = ko.computed(function () {
            return self.numberOfSlots() < 5 && model.isGameCreator();
        });
        self.addSlot = function () {
            model.send_message('modify_army', {
                army_index: self.index(),
                options: { slots: self.numberOfSlots() + 1 }
            });
        }

        self.showRemoveSlot = function () {
            return self.numberOfSlots() > 1;
        }
        self.removeSlot = function () {
            model.send_message('modify_army', {
                army_index: self.index(),
                options: { slots: self.numberOfSlots() - 1 }
            });
            model.regenSystem();
        }

        self.join = function () {
            if (self.aiArmy() || model.thisPlayerIsReady())
                return;

            model.send_message('join_army', {
                army: self.index(),
                commander: model.selectedCommander()
            });
        };

        self.nextPrimaryColor = function () {
            if (model.thisPlayerIsReady())
                return;

            model.send_message('next_primary_color');
        };

        self.nextSecondaryColor = function () {
            if (model.thisPlayerIsReady())
                return;

            model.send_message('next_secondary_color');
        };

        self.dirtySlots = function() {
            _.forEach(self.slots(), function(slot) {
                slot.dirty = true;
            });
        };
        self.cleanupSlots = function() {
            _.forEach(self.slots(), function(slot) {
                if (slot.dirty) {
                    slot.clearPlayers();
                    delete slot.dirty;
                }
            });
        };

        self.clearPlayers = function () {
            _.forEach(self.slots(), function (element) {
                element.clearPlayers();
            });
        }

        self.addPlayer = function (slot_index, options /* name, id, [color] */) {
            var slot = self.slots()[slot_index];

            if (slot) {
                slot.updateFromJson(options);
                delete slot.dirty;
            }
        }

        self.updateFromJson = function (json) {
            self.aiArmy(!!json.ai);
            self.alliance(!!json.alliance);

            while (self.slots().length < json.slots) {
                self.slots.push(new SlotViewModel({ ai: self.aiArmy() }));
            }
            while (self.slots().length > json.slots)
                self.slots.pop();
        };

        self.asJson = function() {
            return {
                slots: _.invoke(self.slots(), 'asJson'),
                alliance : self.alliance(),
                ai: self.aiArmy(),
                economy_factor: self.econFactor
            }
        };

        self.armyContainsThisPlayer = function () {
            return !!(_.find(self.slots(), function (s) { return (s.playerName() == model.displayName()); }));
        };

        self.slotTag = ko.computed(function () { return (self.aiArmy()) ? loc("!LOC(new_game:ai_commander.message):AI Commander") : loc("!LOC(new_game:player_slot.message):Player Slot") })
        self.addSlotTag = ko.computed(function () { return (self.aiArmy()) ? loc("!LOC(new_game:add_ai_commander.message):Add AI Commander") : loc("!LOC(new_game:add_slot.message):Add Slot") })

        self.cinematicInfo = ko.computed(function() {
            return {
                players: _.invoke(self.slots(), 'cinematicInfo'),
                shared: self.sharedArmy()
            };
        });
    }

    function ChatMessageViewModel(name, type  /* 'invalid' | 'lobby' | 'server' */, payload) {
        var self = this;

        self.username = ko.observable(name);
        self.type = type; /* 'invalid' | 'lobby' | 'server' */
        self.payload = ko.observable(payload);
    }

    function NewGameViewModel() {
        var self = this;

        self.returnFromLoad = ko.observable(!!$.url().param('returnFromLoad'));
        
        self.userTriggeredDisconnect = ko.observable(false);
        
       // Click handler for leave button
        self.leave = function() {
            model.send_message('leave');
            _.delay(function() {
                self.userTriggeredDisconnect(true);
                window.location.href = 'coui://ui/main/game/start/start.html';
                return; /* window.location.href will not stop execution. */
            }, 30);
        };

        // Set up messaging for the social bar
        self.pageMessage = ko.observable();

        // signal from server_browser.  indicates that the player wants to join a spectator spot
        self.tryToSpectate = ko.observable().extend({ session: 'try_to_spectate' });
        self.playersWithoutArmies = ko.observableArray([]);

        self.allPlayersAreReady = ko.observable(false);


        self.thisPlayerIsReady = ko.observable(false);
        self.startingGameCountdown = ko.observable(-1);
        self.showStartingGameCountdown = ko.computed(function () {
            return self.startingGameCountdown() !== -1;
        });

        self.spectatorLimit = ko.observable(1);
        self.spectatorLimitLock = ko.observable(true);
        self.spectatorLimit.subscribe(function (value) {
            if (self.spectatorLimitLock())
                return;
            self.changeSettings();
        });

        self.showSpectators = ko.computed(function () {
            return self.spectatorLimit() > 0 || self.playersWithoutArmies().length;
        });

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('600px');
        self.containerWidth = ko.observable('600px');
        self.armyListHeight = ko.observable('600');
        self.armyListHeightMinusSpectators = ko.computed(function () {
            return self.armyListHeight() - (self.showSpectators() ? 108 : 0);
        });

        self.armyListHeightString = ko.computed(function () {
            return '' + self.armyListHeightMinusSpectators() + 'px';
        });

        self.chatHeight = ko.observable('400px');

        self.chatSelected = ko.observable(false);
        self.chatMessages = ko.observableArray([]);
        self.sendChat = function (message) {
            var msg = {};
            msg.message = $(".input_chat_text").val();

            if (msg.message) {
                model.send_message("chat_message", msg);
            }
            msg.message = $(".input_chat_text").val("");
        };

        self.devMode = ko.observable().extend({ session: 'dev_mode' });
        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });

        self.uberName = ko.observable().extend({ local: 'uberName' });
        self.displayName = ko.observable('').extend({ session: 'displayName' });
        self.uberId = ko.observable().extend({ local: 'uberId' });
        self.preferredCommander = ko.observable().extend({ local: 'preferredCommander_v2' });
        self.preferredCommanderValid = ko.computed(function() {
            var commander = self.preferredCommander();
            return !!commander && !_.isUndefined(commander.ObjectName);
        });

        self.extendedCatalog = ko.observableArray(baseCatalog).extend({ session: 'extendedCatalog' });
        self.commanders = ko.computed(function () {
            if (!self.signedInToUbernet())
                return _.filter(self.extendedCatalog(), function (element) { return element.UnitSpec });
            else
                return _.filter(self.extendedCatalog(), function (element) {
                    return element.UnitSpec && (element.IsOwned || element.IsFree)
                });
        });
        self.badges = ko.computed(function () {
            return _.filter(self.extendedCatalog(), function (element) { return !element.UnitSpec });
        });

        self.selectedCommanderIndex = ko.observable(-1).extend({ session: 'selectedCommander' });
        self.selectedCommander = ko.computed(function () {
            var index = self.selectedCommanderIndex();

            if (index === -1) { /* if nothing is selected, either use the preferred cmdr or the first cmdr in the list */
                if (self.preferredCommanderValid())
                    return self.preferredCommander();
                index = 0;
            }

			// We should always have a valid list of commanders, but protect against a mod (or us) messing up.
			if (!self.commanders() || !self.commanders().length)
				return { ObjectName: ''} ;

			var result = self.commanders()[index];

            if (!result || _.isUndefined(result.ObjectName))
                return { ObjectName: '' };

            return result;
        });

        self.usePreferredCommander = function () {
            if (!self.preferredCommanderValid())
                return;

            self.selectedCommanderIndex(-1);
            self.send_message('update_commander', {
                commander: { ObjectName: self.selectedCommander().ObjectName }
            });
        };

        self.setCommander = function (index) {
            if (model.thisPlayerIsReady())
                return;

            self.selectedCommanderIndex(index % self.commanders().length);

            model.send_message('update_commander', {
                commander: { ObjectName: self.selectedCommander().ObjectName }
            });
        }

        self.changeCommander = function () {
            self.setCommander(self.selectedCommanderIndex() + 1)
        };

        self.allowSpectate = ko.computed(function () {

            if (self.thisPlayerIsReady())
                return false;

            return (self.spectatorLimit() - self.playersWithoutArmies().length) > 0
                    && !_.contains(_.pluck(self.playersWithoutArmies(), 'name'), self.displayName())
        });

        self.leaveArmy = function (options /* force */) {

            if (self.thisPlayerIsReady() && !options.force)
                return;

            if (!self.allowSpectate() && !options.force)
                return;

            model.send_message('leave_army');
        };

        self.changeSettings = function () {
            if (!self.isGameCreator())
                return;

            var payload = {
                'type': self.selectedTeamTypeIndex(),
                'spectators': Number(self.spectatorLimit()),
                'password': self.privateGamePassword(),
                'friends': self.whitelist(),
                'public': self.isPublicGame(),
                'blocked': self.blocked(),
                'tag': self.tag(),
                'game_name': self.gameName(),
                'game_options': {
                    'listen_to_spectators': self.listenToSpectators(),
                    'land_anywhere': self.landAnywhere(),
                    'dynamic_alliances': self.dynamicAlliances(),
                    'dynamic_alliance_victory': self.dynamicAllianceVictory()
                }
            }

            model.send_message('modify_settings', payload);
        };

        self.changeBouncer = function () {
            if (!self.isGameCreator())
                return;

            model.send_message('modify_bouncer', {
                'password': self.privateGamePassword(),
                'friends': self.whitelist(),
                'blocked': self.blocked()
            });
        }

        self.kickUser = function (user_id) {
            console.log('kick', user_id);
            self.send_message('kick', { 'id': user_id });
        };

        self.lobbyId = ko.observable().extend({ session: 'lobbyId' });
        self.gameTicket = ko.observable().extend({ session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });
        self.isFriendsOnlyGame = ko.observable(false);
        self.setFriendsOnlyGame = function () {
            self.isFriendsOnlyGame(true);
            self.isPublicGame(false);
            self.changeSettings();
        }
        self.useLocalServer = ko.observable().extend({ session: 'use_local_server' });

        self.tagOptions = ko.observableArray(['Casual', 'Competitive', 'AI Battle', 'Testing']);
        self.tagLock = ko.observable(false);
        self.tag = ko.observable(self.tagOptions()[0]).extend({ session: 'lobby_tag' });
        self.tag.subscribe(function (value) {
            if (self.tagLock())
                return;
            self.changeSettings();
        });

        self.isPublicGame = ko.observable(false);
        self.setPublicGame = function () {
            self.isFriendsOnlyGame(false);
            self.isPublicGame(true);
            self.changeSettings();
        }
        self.isHiddenGame = ko.computed(function() { return !self.isFriendsOnlyGame() && !self.isPublicGame(); });
        self.setHiddenGame = function() {
            self.isFriendsOnlyGame(false);
            self.isPublicGame(false);
            self.changeSettings();
        };
        self.privateGamePassword = ko.observable();
        self.privateGamePassword.subscribe(self.changeBouncer);

        self.friends = ko.observableArray([]).extend({ session: 'friends' });
        self.hasFriends = ko.computed(function () { return self.friends().length });

        self.invites = ko.observableArray([]).extend({ session: 'invites' });
        self.hasInvites = ko.computed(function () { return self.invites().length });

        self.lobbyContacts = ko.observableArray([]);
        self.lobbyContacts.subscribe(function (value) {
            //console.log('lobby contacts');
            api.Panel.message('uberbar', 'lobby_contacts', value);
        });
        self.lobbyContactsMap = ko.computed(function () {
            result = {};
            _.forEach(self.lobbyContacts(), function (element) {
                result[element] = true;
            });
            return result;
        });

        self.whitelist = ko.computed(function () {
            if (self.isFriendsOnlyGame())
                return self.friends();
            return [];
        });
        self.whitelist.subscribe(self.changeBouncer);

        self.blocked = ko.observableArray([]).extend({ session: 'blocked' });
        self.blocked.subscribe(self.changeBouncer);

        self.createdGameId = ko.observable();
        self.lobbyId = ko.observable();

        self.uberNetRegion = ko.observable().extend({ local: 'uber_net_region' });

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.waitingString = ko.observable('');

        self.teamTypes = ['FreeForAll', 'TeamArmies', 'Alliance', 'VersusAI'];
        self.selectedTeamTypeIndex = ko.observable(0);

        self.listenToSpectators = ko.observable(false);
        self.landAnywhere = ko.observable(false);
        self.toggleLandAnywhere = function () {
            self.landAnywhere(!self.landAnywhere());
            self.changeSettings();
        };
        self.dynamicAlliances = ko.observable(false);
        self.dynamicAllianceVictory = ko.observable(false);

        self.updateSettings = function () {
            self.changeSettings();
            return true; //required to allow the ko checked binding to update when also bound with ko clicked binding
        }

        self.allowResetArmiesOnChange = ko.observable(false);

        self.selectedTeamTypeIndex.subscribe(function (value) {
            if (self.allowResetArmiesOnChange())
                self.resetArmies();
        });

        self.teamType = ko.computed(function () {
            return self.teamTypes[self.selectedTeamTypeIndex()];
        });

        self.isTeamGame = ko.computed(function () {
            return self.selectedTeamTypeIndex() == 1; /* expecting coercion */
        });

        self.armies = ko.observableArray([]);

        self.spectators = ko.observableArray([]);


        self.enableLan = ko.computed(function () {
            return self.useLocalServer() && (self.teamType() !== 'VersusAI');
        });

        self.nextSceneUrl = ko.observable().extend({ session: 'next_scene_url' });

        self.systems = ko.observableArray([]).extend({ local: 'systems' });

        self.isGameCreator = ko.observable(false);
        self.isNotGameCreator = ko.computed(function() { return !self.isGameCreator(); });

        self.slots = ko.computed(function () {
            var slots = 0;
            var i;

            for (i = 0; i < self.armies().length; i++)
                slots += self.armies()[i].numberOfSlots();
            return slots;
        });

        self.playerSlots = ko.computed(function () {
            var slots = 0;
            var i;

            for (i = 0; i < self.armies().length; i++)
                if (!self.armies()[i].aiArmy())
                    slots += self.armies()[i].numberOfSlots();

            return slots;
        });
        self.numberOfEmptySlots = ko.computed(function () {
            var slots = 0;
            var i;

            for (i = 0; i < self.armies().length; i++)
                slots += self.armies()[i].numberOfEmptySlots();

            return slots;
        });
        self.numberOfEmptySlots.subscribe(function (value) {
            api.Panel.message('uberbar', 'lobby_empty_slots', { slots: value });
        });

        self.playerCount = ko.computed(function () {
            return self.playerSlots();
        });

        self.maxSpectorLimit = ko.computed(function () {
            return 3;
        });

        self.spectatorLimitOptions = ko.computed(function () {
            return _.range(self.maxSpectorLimit()+1);
        });

        self.gameName = ko.observable().extend({ maxLength: 128 });
        self.gameNameLock = ko.observable(false);
        self.gameName.subscribe(function (value) {
            if (self.gameNameLock())
                return;
            self.changeSettings();
        });

        self.gameModeString = ko.computed(function () {
            return self.teamType() + self.playerCount();
        });

        self.teamDescription = ko.computed(function () {
            switch (self.selectedTeamTypeIndex()) {
                case '0': return 'Slot';
                case '1': return 'Team';
            }
        });

        self.serverLoading = ko.observable(false);
        self.clientHasLoadedOnce = ko.observable(false);
        self.clientLoading = ko.observable(true);
        self.clientLoading.subscribe(function(loading) {
            self.send_message('set_loading', { loading: loading });
            if (!loading)
                self.clientHasLoadedOnce(true);
        });

        self.armyIsMalformedInfo = ko.observable("");

        self.armyIsMalformed = ko.computed(function () {

            self.armyIsMalformedInfo("");
            if (self.selectedTeamTypeIndex() === 3) {
                if (self.playerSlots() < 1) {
                    self.armyIsMalformedInfo(loc("!LOC(new_game:you_must_have_a_player_slot_before_publishing.message):You must have a player slot before publishing."));
                    return true;
                }
                return false;
            }

            if (self.selectedTeamTypeIndex() === 0)
                return false;

            if (self.selectedTeamTypeIndex() === 1) {
                if (self.slots() === self.armies().length) {
                    self.armyIsMalformedInfo(loc("!LOC(new_game:you_must_add_an_extra_slot_before_publishing.message):You must add an extra slot before publishing."));
                    return true;
                }
            }

            return false;
        });

        self.slotsAreEmptyInfo = ko.observable('');
        self.slotsAreEmpty = ko.computed(function() {
            var result = _.some(self.armies(), function(army) {
                if (army.aiArmy())
                    return false;
                return _.some(army.slots(), function(slot) {
                    return slot.isEmpty();
                });
            })
            if (result)
                self.slotsAreEmptyInfo("Slots are empty.");
            else
                self.slotsAreEmptyInfo('');
            return result;
        });

        self.friendsAreMissingInfo = ko.observable('');
        self.friendsAreMissing = ko.computed(function () {
            var result = self.isFriendsOnlyGame() && !self.friends().length;
            if (result)
                self.friendsAreMissingInfo(loc("!LOC(new_game:you_need_friends.message):You must have friends to play a friends-only game."));
            else
                self.friendsAreMissingInfo('');
            return result;
        });

        self.gameSystemReadyInfo = ko.observable('');
        self.gameSystemReady = ko.computed(function() {
            var result = self.serverLoading() || self.clientLoading();
            if (result)
                self.gameSystemReadyInfo('Building planets...');
            else
                self.gameSystemReadyInfo('');
            return !result;
        });

        self.gameIsNotOkInfo = ko.computed(function() {
            return self.armyIsMalformedInfo() || self.friendsAreMissingInfo() || self.slotsAreEmptyInfo() || self.gameSystemReadyInfo();
        });
        self.gameIsNotOk = ko.computed(function () { return self.armyIsMalformed() || self.friendsAreMissing() || self.slotsAreEmpty() || !self.gameSystemReady(); });

        self.startEnabled = ko.computed(function() {
            return self.allPlayersAreReady() && !self.serverLoading() && !self.clientLoading() && !self.gameIsNotOk();
        });
        var hasPlayedReadyVO = false;
        self.startEnabled.subscribe(function (value) {
            if (value && self.clientHasLoadedOnce() && !hasPlayedReadyVO) {
                hasPlayedReadyVO = true;
                api.audio.playSound('/SE/UI/UI_lobby_game_loaded');
            }
        });

        self.showAddSlot = ko.computed(function () {
            if (self.selectedTeamTypeIndex() === '0')
                return false

            if (self.slots() >= 10)
                return false;

            return true;
        });

        self.showAddArmy = ko.computed(function () {
            if (self.playerCount() >= 10)
                return false;

            return self.armies().length < 10;
        });

        self.hideAddArmy = ko.computed(function () {
            return !self.showAddArmy();
        });

        self.addArmy = function () {
            if (!self.showAddArmy())
                return;

            self.send_message('add_army', {
                options: {
                    slots: 1,
                    ai: false,
                    alliance: self.isTeamGame()
                }
            });
            model.regenSystem();
        };

        self.showRemoveArmy = ko.computed(function () {
            return self.armies().length > 2 && self.isGameCreator();
        });
        self.removeArmy = function (army_index) {
            self.send_message('remove_army', { 'army_index': army_index } );
        };

        self.regenSystem = function () {
            if (self.isGameCreator() && self.system().isRandomlyGenerated && false) {
                self.loadRandomSystem().then(function() {
                    self.updateSystem();
                    self.requestUpdateCheatConfig();
                });
            }
        }

        self.showAllianceGroup = ko.computed(function () { return self.teamType() === 'Alliance' });

        self.resetArmies = function () {

            if (!self.isGameCreator())
                return;

            while (self.armies().length)
                self.armies().pop();

            if (self.selectedTeamTypeIndex() == 0) { /* FFA */
                self.send_message('reset_armies', [
                    { slots: 1, ai: false, alliance: false },
                    { slots: 1, ai: false, alliance: false }
                ]);
            }
            else { /* TEAM */
                self.send_message('reset_armies', [
                   { slots: 2, ai: false, alliance: true },
                   { slots: 2, ai: false, alliance: true }
                ]);
            }

            var done = $.when();
            if (self.loadedSystemIsEmpty()) {
                if (self.loadedPlanetIsEmpty())
                    done = self.loadRandomSystem();
                else
                    self.createSystemFromLoadedPlanet();
            }

            done.then(function() {
                self.changeSettings();
                self.updateSystem();
                self.requestUpdateCheatConfig();
            });
        };

        self.loadFromGameDesc = function () {

        }

        this.resetPlayerPattern = function () { self.selectedPlayerPatternIndex = 0; }

        this.navToServerBrowser = function () {
            window.location.href = 'coui://ui/main/game/server_browser/server_browser.html';
            return; /* window.location.href will not stop execution. */
        }

        self.newGameWhenLoaded = ko.observable(false).extend({ session: 'new_game_when_loaded' });

        self.navToEditPlanet = function () {
            self.lastSceneUrl('coui://ui/main/game/new_game/new_game.html?returnFromLoad=true');
            self.nextSceneUrl(self.lastSceneUrl());

            window.location.href = 'coui://ui/main/game/load_planet/load_planet.html?tabs=false&systems=true&planets=false&title=' + encodeURI('Select System');
            return; /* window.location.href will not stop execution. */
        }

        // TODO: Remove when planets are generated using the new schema
        self.fixupPlanetConfig = function (system) {

            var planets = system.planets || [];
            for (var p = 0; p < planets.length; ++p)
            {
                var planet = planets[p];
                if (planet.hasOwnProperty('position_x'))
                {
                    planet.position = [planet.position_x, planet.position_y];
                    delete planet.position_x;
                    delete planet.position_y;
                }
                if (planet.hasOwnProperty('velocity_x'))
                {
                    planet.velocity = [planet.velocity_x, planet.velocity_y];
                    delete planet.velocity_x;
                    delete planet.velocity_y;
                }
                if (planet.hasOwnProperty('planet'))
                {
                    planet.generator = planet.planet;
                    delete planet.planet;
                }
            }
            return system;
        }

        // TODO: Remove when planets are generated using the new schema
        self.unfixupPlanetConfig = function (system) {
            if (!system.planets)
                system.planets = [];

            var planets = system.planets || [];
            for (var p = 0; p < planets.length; ++p)
            {
                var planet = planets[p];
                if (planet.hasOwnProperty('position'))
                {
                    planet.position_x = planet.position[0];
                    planet.position_y = planet.position[1];
                    delete planet.position;
                }
                if (planet.hasOwnProperty('velocity'))
                {
                    planet.velocity_x = planet.velocity[0];
                    planet.velocity_y = planet.velocity[1];
                    delete planet.velocity;
                }
                if (planet.hasOwnProperty('generator'))
                {
                    planet.planet = planet.generator;
                    delete planet.generator;
                }
            }
            return system;
        }

        self.updateSystem = function () {

            if (self.loadedSystemIsEmpty())
                return;

            self.send_message('modify_system', self.fixupPlanetConfig(self.loadedSystem()), function(success, reason) {
                if (!success)
                {
                    self.chatMessages.push(new ChatMessageViewModel('server', 'server', reason));
                    self.chatMessages.push(new ChatMessageViewModel('server', 'server', "Generating random system."));
                }
            });

            self.loadedSystem({});
        }

        /* signal server to start building planets and start the game */
        self.startGame = function () {
            if (!self.startEnabled())
                return;

            if (self.gameIsNotOk())
                return;

            if (!self.allPlayersAreReady())
                return;

            api.audio.playSound('/SE/UI/UI_lobby_start_button');
            self.send_message('start_game', {
                countdown: 5
            });
        };

        self.toggleReady = function () {
            self.send_message('toggle_ready');
        };

        self.aiPersonalities = ko.observable(ai_types()); /* from js/ai.js */
        self.aiPersonalityNames = ko.observableArray(_.keys(self.aiPersonalities()));

        self.targetAIArmyIndex = ko.observable();
        self.targetAISlotIndex = ko.observable();

        self.addAI = function (index) {
            model.send_message('add_ai', {
                army_index: self.targetAIArmyIndex(),
                slot_index: self.targetAISlotIndex(),
                options: { 'ai': true, 'personality': self.aiPersonalities()[self.aiPersonalityNames()[0]] }
            });
        }

        self.system = ko.observable({});
        self.systemIsEmpty = ko.computed(function () { return $.isEmptyObject(self.system()); });
        self.systemPlayerText = ko.computed(function() {
            var players = self.system().players;
            if (!players)
                return '';
            var minPlayers = Math.max(players[0], 2);
            var maxPlayers = Math.max(players[1], 2);
            return (minPlayers !== maxPlayers) ? minPlayers + '-' + maxPlayers : minPlayers;
        });
        self.systemPlayersCSS = ko.computed(function() {
            var systemPlayers = (self.system().players || []);
            var slotCount = self.slots();
            var ok =
                (!_.isFinite(systemPlayers[0]) || slotCount >= systemPlayers[0]) &&
                (!_.isFinite(systemPlayers[1]) || slotCount <= systemPlayers[1]);
            return ok ? 'valid' : 'invalid';
        });

        self.loadedSystem = ko.observable({}).extend({ session: 'loaded_system' });
        self.loadedSystemIsEmpty = ko.computed(function () { return $.isEmptyObject(self.loadedSystem()); });

        self.planetBiomes = ko.computed(function () {
            if (!self.system() || !self.system().planets)
                return [];
            return _.map(self.system().planets, function (element) { return element.planet.biome; });
        });

        self.loadedPlanet = ko.observable({}).extend({ session: 'loaded_planet' });
        self.planets = ko.observableArray([]).extend({ local: 'planets' });
        self.loadedPlanetIsEmpty = ko.computed(function () { return jQuery.isEmptyObject(self.loadedPlanet()); });

        self.biomes = ko.observableArray(['earth', 'moon', 'tropical', 'lava', 'metal', 'desert', 'gas']);
        self.moonBiomes = ko.observableArray(['earth', 'moon', 'tropical', 'lava', 'desert']);
        self.asteroidBiomes = ko.observableArray(['moon', 'lava']);

        self.loadRandomSystem = function () {
            var generatorConfig = {
                seed: Math.random(),
                players: self.slots()
            };
            return star_system_templates.generate(generatorConfig)
                .then( function(system) {
                    self.unfixupPlanetConfig(system);

                    /*
                    console.log("************* loadRandomSystem: Name: " + rSystem.name);
                    _.forEach(rSystem.planets, function(bp) {
                        console.log('Chosen System: Planet: name: ' + bp.planet.name);
                        console.log('Chosen System: Planet: seed: ' + bp.planet.seed);
                        console.log('Chosen System: Planet: radius: ' + bp.planet.radius);
                        console.log('Chosen System: Planet: heightRange: ' + bp.planet.heightRange);
                        console.log('Chosen System: Planet: temperature: ' + bp.planet.temperature);
                        console.log('Chosen System: Planet: biome: ' + bp.planet.biome);
                        console.log('Chosen System: Planet: biomeScale: ' + bp.planet.biomeScale);
                        console.log('Chosen System: Planet: metal_density: ' + bp.planet.metal_density);
                        console.log('Chosen System: Planet: metal_clusters: ' + bp.planet.metal_clusters);

                        console.log('Chosen System: Planet: position_x: ' + bp.position_x);
                        console.log('Chosen System: Planet: position_y: ' + bp.position_y);
                        console.log('Chosen System: Planet: velocity_x: ' + bp.velocity_x);
                        console.log('Chosen System: Planet: velocity_y: ' + bp.velocity_y);
                        console.log('Chosen System: Planet: required_thrust_to_move: ' + bp.required_thrust_to_move);
                    });
                    */

                    self.loadedSystem(system);
                    self.updateSystem();
                    self.requestUpdateCheatConfig();
                });
        };

        self.setPrimaryPlanet = function (index) {
            var system = self.loadedSystem();
            var planets = self.loadedSystem().planets;
            planets.unshift(planets.splice(index, 1)[0]);

            system.planets = planets;
            self.loadedSystem(system);
        }

        self.createSystemFromLoadedPlanet = function () {
            var rSystem = {};
            rSystem.name = "Gamma Test System";
            rSystem.planets = [
                {
                    name: self.loadedPlanet().name,
                    mass: 10000,
                    position_x: 20000,
                    position_y: 0,
                    velocity_x: 0,
                    velocity_y: 158,
                    required_thrust_to_move: 0,
                    planet: self.loadedPlanet().planet
                }
            ];
            self.loadedSystem(rSystem);
        }

        self.imageSourceForPlanet = function (planet) {

            var ice = planet.biome === 'earth' && planet.temperature <= -0.5;
            var s = (ice) ? 'ice' : planet.biome;
            s = (s) ? s : 'unknown';

            return 'coui://ui/main/shared/img/' + s + '.png';
        }

        self.imageSizeForPlanet = function (size) {
            return '' + 100 + 'px';
        }

        self.planetSizeClass = function (radius) {
            if (radius <= 250)
                return '1';
            if (radius <= 450)
                return '2';
            if (radius <= 650)
                return '3';
            if (radius <= 850)
                return '4';
            return '5';
        }

        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        self.navBack = function () {
            self.loadedPlanet({});
            self.loadedSystem({});
            if (self.lastSceneUrl()) {
                window.location.href = self.lastSceneUrl();
                return; /* window.location.href will not stop execution. */
            }
        };

        self.navToStart = function () {
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        self.cancel = function () {
            self.navToStart();
        };

        self.colors = ko.observable([]);
        self.showColorPicker = ko.observable(false);
        self.colorPickerSlot = ko.observable(null);
        self.showColorPickerForSlot = function (slot) {
            return slot === self.colorPickerSlot();
        };
        self.toggleColorPickerSlot = function (slot) {
            if (self.colorPickerSlot() === null)
                self.colorPickerSlot(slot);
            else
                self.colorPickerSlot(null);

            self.showColorPicker(self.colorPickerSlot() !== null);
            self.showCommanderPicker(false);
        };

        self.showCommanderPicker = ko.observable(false);
        self.toggleCommanderPicker = function () {
            self.showCommanderPicker(!self.showCommanderPicker());
            model.showColorPicker(false);
            model.colorPickerSlot(null);
        };

        self.closeDropDowns = function () {
            self.showColorPicker(false);
            self.showCommanderPicker(false);
        }

        self.activeModTextArray = ko.observableArray([]);
        self.activeCheatTextArray = ko.observableArray([]);

        self.modDataSent = ko.observable(false);
        self.cheatAllowChangeVision = ko.observable(false).extend({ session: 'cheat_allow_change_vision' });
        self.cheatAllowChangeControl = ko.observable(false).extend({ session: 'cheat_allow_change_control' });
        self.cheatAllowCreateUnit = ko.observable(false).extend({ session: 'cheat_allow_create_unit' });
        self.cheatAllowModDataUpdates = ko.observable(false).extend({ session: 'cheat_allow_mod_data_updates' });

        self.setCheatsFromCheatConfig = function(config) {
            self.cheatAllowChangeVision(config.cheat_flags.allow_change_vision);
            self.cheatAllowChangeControl(config.cheat_flags.allow_change_control);
            self.cheatAllowCreateUnit(config.cheat_flags.allow_create_unit);
            self.cheatAllowModDataUpdates(config.cheat_flags.allow_mod_data_updates);
            self.updateActiveModAndCheatText();
        }

        self.requestUpdateCheatConfig = function () {
            self.send_message('request_cheat_config', {}, function (success, response) {
                if (success)
                    model.setCheatsFromCheatConfig(response.cheat_config);
            });
        }

        self.updateActiveModAndCheatText = function () {
            api.mods.getMountedMods("server", function (mod_array) {
                model.activeModTextArray([]);
                for (var mod in mod_array)
                    model.activeModTextArray.push(mod_array[mod].display_name);
            });
            self.activeCheatTextArray([]);
            if (self.cheatAllowChangeControl()) self.activeCheatTextArray.push("Allow Change Control");
            if (self.cheatAllowChangeVision()) self.activeCheatTextArray.push("Allow Change Vision");
            if (self.cheatAllowCreateUnit()) self.activeCheatTextArray.push("Allow Create Unit");
            if (self.cheatAllowModDataUpdates()) self.activeCheatTextArray.push("Allow Mod Data Updates");
        }
        self.updateActiveModAndCheatText();

        self.showCommanderCinematic = ko.observable(false);

        self.cinematicState = ko.computed(function() {
            if (!self.showCommanderCinematic())
                return {};

            return {
                animate: true,
                teams: _.invoke(self.armies(), 'cinematicInfo')
            };
        });
        self.cinematicState.subscribe(function() {
            api.panels.cinematic && api.panels.cinematic.message('state', self.cinematicState());
            _.delay(api.Panel.update);
        });
    }
    model = new NewGameViewModel();

    handlers = {};

    handlers.game_config = function (payload) { /* deprecated. */
        /* ignore if we created the game, since it is just an echo */
        if (model.isGameCreator() || _.isEmpty(payload))
            return;

        model.createdGameDesc(payload);
        model.loadFromGameDesc();
    }

    handlers.chat_message = function (msg) {
        model.chatMessages.push(new ChatMessageViewModel(msg.player_name, 'lobby', msg.message));
        //$("#chat-bar .container_embed").scrollTop($("#chat-bar .container_embed")[0].scrollHeight);
    };

    handlers.event_message = function (payload) {
        switch (payload.type) {
            case 'countdown':
                model.showCommanderCinematic(true);

                if (Number(payload.message) === 1)
                    api.audio.playSound('/SE/UI/UI_lobby_count_down_last');
                else if (Number(payload.message) > 1)
                    api.audio.playSound('/SE/UI/UI_lobby_count_down');

                model.startingGameCountdown(Number(payload.message))
                break;
            default:
                model.chatMessages.push(new ChatMessageViewModel('server', 'server', payload.target + payload.message));
                break;
        }
    };

    handlers.colors = function (payload) {
        var result = _.map(payload, function (element) {
            return {
                taken: element.taken,
                color: 'rgb(' + element.primary.join() + ')'
            };
        });

        model.colors(result);
    }
    var prev_players = {};
    handlers.players = function (payload, force) {
        prev_players = payload;

        var orphans = [];

        _.invoke(model.armies(), 'dirtySlots');

        var ready = true;

        _.forEach(payload, function (element) {
            if (element.creator && element.name === model.displayName()) {
                model.isGameCreator(true);

                if (!model.modDataSent()) {
                    model.send_message('mod_data_available', {}, function (success, response) {
                        if (success)
                            api.mods.sendModFileDataToServer(response.auth_token);
                    });
                    model.modDataSent(true);
                }
            }

            if (element.name === model.displayName())
                model.thisPlayerIsReady(element.ready);

            if (element.army_index !== -1 && model.armies().length > element.army_index) {
                model.armies()[element.army_index].addPlayer(element.slot_index, element);

                if (!element.creator && !element.ai && (!element.ready || element.loading))
                    ready = false;
            }
            else
                orphans.push(element);

            if (!model.lobbyContactsMap()[element.id])
                model.lobbyContacts.push(element.id);
        });

        _.invoke(model.armies(), 'cleanupSlots');
        model.playersWithoutArmies(orphans);

        model.allPlayersAreReady(ready);
    }

    /* from server_state.data.armies */
    handlers.armies = function (payload, force) {
        while (model.armies().length > payload.length)
            model.armies.pop();

        _.forEach(model.armies(), function (army, index) {
            army.updateFromJson(payload[index]);
        });

        while (model.armies().length < payload.length)
            model.armies.push(new ArmyViewModel(model.armies().length, payload[model.armies().length]));

        handlers.players(prev_players);
    }

    handlers.control = function (payload) {
        if (!payload.has_first_config && model.isGameCreator())
            model.resetArmies();

        model.serverLoading(payload.has_first_config && !payload.sim_ready);
    };

    handlers.settings = function (payload) {
        model.isFriendsOnlyGame(!!payload.friends);
        model.isPublicGame(!!payload.public);

        model.spectatorLimitLock(true);
        model.spectatorLimit(payload.spectators);
        model.spectatorLimitLock(false);

        model.tagLock(true);
        model.tag(payload.tag);
        model.tagLock(false);

        model.gameNameLock(true);
        model.gameName(payload.game_name);
        model.gameNameLock(false);

        model.dynamicAlliances(payload.game_options ? !!payload.game_options.dynamic_alliances : false);
        model.dynamicAllianceVictory(payload.game_options ? !!payload.game_options.dynamic_alliance_victory : false);
        model.selectedTeamTypeIndex(payload.game_options ? payload.game_options.game_type : '0');

        model.listenToSpectators(payload.game_options ? payload.game_options.listen_to_spectators : false);
        model.landAnywhere(payload.game_options ? payload.game_options.land_anywhere : false);

        model.requestUpdateCheatConfig();
    };

    handlers.system = function (payload) {
        var unfixedSystem = model.unfixupPlanetConfig(payload);
        model.system(unfixedSystem);
    };

    handlers.server_state = function (payload) {
        if (payload.url && !window.location.href.startsWith(payload.url))
        {
            // Transitioning can take a little while.  Don't show a dirty page while we do that.
            $('body').hide();
            window.location.href = payload.url;
            return; /* window.location.href will not stop execution. */
        }

        if (payload.data) {
            handlers.armies(payload.data.armies, true);
            handlers.players(payload.data.players, model.armies().length !== 0);
            handlers.colors(payload.data.colors);
            handlers.control(payload.data.control);
            handlers.settings(payload.data.settings);
            handlers.system(payload.data.system);
        }
    };

    handlers.connection_disconnected = function (payload) {
        if (model.userTriggeredDisconnect())
            return;
        
        model.transitPrimaryMessage(loc('!LOC(new_game:connection_to_server_lost.message):CONNECTION TO SERVER LOST'));
        model.transitSecondaryMessage(loc('!LOC(new_game:returning_to_main_menu.message):Returning to Main Menu'));
        model.transitDestination('coui://ui/main/game/start/start.html');
        model.transitDelay(5000);
        window.location.href = 'coui://ui/main/game/transit/transit.html';
        return; /* window.location.href will not stop execution. */
    }

    handlers.friends = function (payload) {
        model.friends(payload);
    }

    handlers.blocked = function (payload) {
        model.blocked(payload);
    }

    handlers.mount_mod_file_data = function (payload) {
        console.log("Mounting mod file data: " + JSON.stringify(payload));
        api.mods.mountModFileData();
    }

    handlers.server_mod_info_updated = function (payload) {
        model.updateActiveModAndCheatText();
    }

    handlers.set_cheat_config = function (payload) {
        model.setCheatsFromCheatConfig(payload);
    }
    handlers['panel.invoke'] = function(params) {
        var fn = params[0];
        var args = params.slice(1);
        return model[fn] && model[fn].apply(model, args);
    };

    // inject per scene mods
    if (scene_mod_list['new_game'])
        loadMods(scene_mod_list['new_game']);

    app.registerWithCoherent(model, handlers);

    api.Panel.message('uberbar', 'request_friends');
    api.Panel.message('uberbar', 'request_blocked');

    model.lastSceneUrl('coui://ui/main/game/start/start.html');

    // Activates knockout.js
    ko.applyBindings(model);

    $("#radio").buttonset();

    $('body').keydown(
        function (event) {
            if (event.keyCode === keyboard.esc)
            {
                if (model.chatSelected())
                    model.chatSelected(false);
            }
            else if (event.keyCode === keyboard.enter)
            {
                if (model.chatSelected())
                    $(".chat_input_form").submit();

                model.chatSelected(true);
            }
        }
    );

    app.hello(handlers.server_state, handlers.connection_disconnected);

    if (!model.returnFromLoad())
        model.usePreferredCommander();

    if (model.tryToSpectate()) {
        model.leaveArmy({ force: true });
        model.tryToSpectate(false);
    }

    /* maybe use loaded system */
    model.updateSystem();

    model.requestUpdateCheatConfig();

    // Note: Loading is tested every 500ms.  Instead of using setInterval, 
    // however, this uses repeating delays in order to avoid having multiple
    // calls to arePlanetsReady() in flight at a time.
    var testLoading = function () {
        var worldView = api.getWorldView(0);
        if (worldView) {
            worldView.arePlanetsReady().then(function (ready) {
                model.clientLoading(!ready);
                _.delay(testLoading, 500);
            });
        }
        else
            _.delay(testLoading, 500);
    };
    testLoading();
});
