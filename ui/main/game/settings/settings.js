var model;
var handlers;

$(document).ready(function () {

    function SettingsViewModel() {
        var self = this;
        
        self.inPanel = ko.observable(api.Panel.pageName !== 'game');

        self.disabledSettingsKeys = ko.observable({});

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.offline = ko.observable().extend({ session: 'offline' });

        self.uberNetRegion = ko.observable().extend({ local: 'uber_net_region' });
        self.selectedUberNetRegion = ko.observable(self.uberNetRegion());
        self.uberNetRegions = ko.observableArray().extend({ session: 'uber_net_regions' });
        self.hasUberNetRegion = ko.computed(function () { return self.uberNetRegions().length; });

        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });
        self.os = ko.observable('').extend({ session: 'os' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });
     
        self.back = function () {
            if (!self.inPanel()) {
                engine.call('disable_lan_lookout');
                window.location.href = self.lastSceneUrl();
            }
            else 
                api.Panel.message(api.Panel.parentId, 'settings.exit');
        };

        self.clean = ko.computed(function () {
            return !api.settings.isDirty() && self.uberNetRegion() === self.selectedUberNetRegion();
        });

        self.isDefault = ko.computed(function () {
            return api.settings.isDefault();
        });

        self.settingDefinitions = ko.observable(api.settings.definitions);
        self.settingGroups = ko.computed(function () {
            return _.keys(self.settingDefinitions());
        });
        self.keybindGroups = ko.computed(function () {
            var keybinds = self.settingDefinitions()['keyboard'].settings;
            var result = {};

            _.forEach(keybinds, function (element, key) {
                if (!(result[element.display_group]))
                    result[element.display_group] = {};

                if (!(result[element.display_group][element.display_sub_group]))
                    result[element.display_group][element.display_sub_group] = [];

                result[element.display_group][element.display_sub_group].push('keyboard.' + key);
            });

            return result;
        });
        self.keybindGroupTitles = ko.computed(function () {
            return _.keys(self.keybindGroups());
        });
        self.keybindSubGroupTitles = function (group) {
            return _.keys(self.keybindGroups()[group]);
        };
        self.keybindGroupData = ko.computed(function () {
            return _.values(self.keybindGroups());
        });
        self.keybindSubGroupData = function (group, subgroup) {
            return self.keybindGroups()[group][subgroup];
        };

        self.activeSettingsGroupIndex = ko.observable(0).extend({ session: 'active_settings_group' });
        self.activeSettingsGroup = ko.computed(function() {
            return self.settingGroups()[self.activeSettingsGroupIndex()];
        });
        self.activeKeyboardGroupIndex = ko.observable(0).extend({ session: 'active_keyboard_group' });

        var settingsObservableMap = {};
        var activeSettingKey = ko.observable();
        var activeSettingsItem = null;
        var currentKeyCombo = ko.observable({});

        var cancelCaptureKeyCombo = function() {
            activeSettingsItem = null;
            currentKeyCombo({});
            activeSettingKey('');
            modify_keybinds({ add: ['general', 'debugging'] });
        };

        function SettingItemModel(group, key, options) {
            var self = this;

            self.key = ko.observable(key);
            self.title = ko.observable(options.title);
            self.value = ko.observable().extend({ setting: { 'group': group, 'key': key } });
            self.options = options;
            if (options.callback)
                self.value.subscribe(options.callback);

            self.type = ko.observable(options.type);
            self.active = ko.computed(function () {
                return self.key() === activeSettingKey();
            });
            self.active.subscribe(function (value) {
                if (value)
                    activeSettingsItem = self; 
            });
            self.setAsActiveKey = function () {
                activeSettingKey(self.key());
                modify_keybinds({ remove: ['general', 'debugging'] });
            }
            
            self.conflicts = ko.observableArray();
            self.hasConflict = ko.computed(function() { return !!self.conflicts().length; });
            
            self.showClear = ko.observable(false);
            self.active.subscribe(function (active) {
                if (active)
                    self.showClear(!!self.value());
                else
                    self.showClear(false);
            });
            self.clear = function () { 
                self.value(''); 
                cancelCaptureKeyCombo();
            };

            switch (self.type()) {
                case 'select':
                    (function () {
                        var text = options.optionsText || options.options;
                        self.options = ko.observableArray(_.map(options.options, function (element, index) {
                            return { value: element, text: text[index] };
                        }));

                        self.optionsText = ko.observableArray(options.optionsText || options.options);
                    })();
                    break;

                case 'slider':
                    self.options = ko.observable(options.options || {});
                    break;
            }

            if (!settingsObservableMap[group])
                settingsObservableMap[group] = {};
            
            settingsObservableMap[group][key] = self.value;
        };

        var comboStringFn = function () {
            var combo_string = '';
            _.forIn(currentKeyCombo(), function (value, key) {

                var modifier = Mousetrap.isModifier(key);

                if (combo_string) {
                    if (modifier)
                        combo_string = key + '+' + combo_string;
                    else
                        combo_string = combo_string + '+' + key;
                }
                else
                    combo_string = key;
            });
            return combo_string;
        };
        self.captureKey = function (model, event) {
            if (!activeSettingsItem)
                return true;

            var combo = currentKeyCombo();
            var key = Mousetrap.characterFromEvent(event);

            combo[key] = true;
            currentKeyCombo(combo);

            activeSettingsItem.value(comboStringFn());
            return true;
        };
        self.cancelCaptureKeyCombo = cancelCaptureKeyCombo;
        self.captureCurrentCombo = function (model, event) {
            if (!activeSettingsItem)
                return true;

            activeSettingsItem.value(comboStringFn());
            self.cancelCaptureKeyCombo();

            return true;
        };
    
        self.settingsItemMap = ko.computed(function () {
            var result = {};

            _.forEach(self.settingGroups(), function (group) {
                var definitions = self.settingDefinitions()[group];

                _.forEach(definitions.settings, function (element, key) {
                    var entry = group + '.' + key;
                    result[entry] = new SettingItemModel(group, key, element);
                });
            });
            
            api.settings.observableMap = settingsObservableMap;

            return result;
        });
        
        self.keyboardSettingsItems = ko.computed(function () {
            return _.filter(self.settingsItemMap(), function (element, key) {
                return key.startsWith('keyboard');
            });
        });
        self.conflictKeyboardSettingsItems = ko.computed(function() {
            return _.filter(self.keyboardSettingsItems(), function (item) {
                var options = item.options;
                return options.allow_conflicts !== true;
            });
        });
        
        self.updateKeyConflicts = function () {
            var items = self.conflictKeyboardSettingsItems();
            // Note: "modify" is used to track the changes until the end.  This
            // prevents a lot of churn in the DOM related to clearing & re-setting
            // conflict keys.
            var modify = {};
            
            // Calculate possible resets
            _.forEach(items, function (item) {
                if (item.hasConflict()) {
                    modify[item.key()] = [item, []];
                }
            });
            
            var allowConflict = function(a, b) {
                if (a === b)
                    return true;
                var allow = a.options.allow_conflicts;
                if (allow === true)
                    return true;
                if (!_.isObject(allow))
                    return false;
                
                var testOption = function(option, bValue) {
                    if (_.isString(option))
                        option = [option];
                    return option && _.contains(option, bValue);
                };
                
                return  testOption(allow.key, b.key()) ||
                        testOption(allow.set, b.options.set) ||
                        testOption(allow.display_group, b.options.display_group) ||
                        testOption(allow.display_sub_group, b.options.display_sub_group);
            };
            
            // Generate the conflict map.  More than one item per value = conflict
            var byValue = _.groupBy(items, function (item) { return item.value(); });
            _.forIn(byValue, function (conflicts, key) {
                if (!key || conflicts.length < 2)
                    return;
                _.forEach(conflicts, function (target) {
                    var others = _.reject(conflicts, function (other) { return allowConflict(other, target) || allowConflict(target, other); });
                    modify[target.key()] = [target, others];
                });
            });
            _.forIn(modify, function(update) {
                var item = update[0];
                var value = update[1];
                if (!_.isEqual(value, item.conflicts()))
                    item.conflicts(value);
            });
        };
        self.updateKeyConflicts();
        
        ko.computed(function () {
            var items = self.keyboardSettingsItems();
            _.forEach(items, function (item) {
                if (!item.value.updateConflicts)
                    item.value.updateConflicts = item.value.subscribe(self.updateKeyConflicts);
            });
        });
        
        // Twitch
        self.twitchReady = ko.observable(false);
        self.twitchMessage = ko.observable();
        self.twitchStreamingDesired = ko.observable('OFF');
        self.twitchName = ko.observable();
        self.twitchPassword = ko.observable(''); // Not saved
        self.twitchStreaming = ko.observable(false); // Not saved
        self.twitchPaused = ko.observable(false); // Not saved
        self.twitchIngestServer = ko.observable(); // Not saved
        self.twitchIngestServer_options = ko.observableArray(); // Not saved

        self.twitchEnableMicrophone = ko.observable('ON');
        self.twitchEnablePlayback = ko.observable('ON');

        self.twitchLogIn = function () {
            if (!self.twitchName() || !self.twitchPassword()) {
                self.twitchMessage('A Twitch ID and a password are required');
                return;
            }
            self.twitchMessage('Authenticating...');
            api.twitch.logIn(String(self.twitchName()), String(self.twitchPassword()));
        }
        self.twitchLogOut = function () {
            self.twitchMessage('Signed out of Twitch');
            api.twitch.logOut();
        }

        // streaming is applied immediately
        self.twitchStreamingDesired.subscribe(function (newVal) {
            if (newVal === 'ON') {
                self.applyTwitchSettings();
                api.twitch.enableStreaming();
            }
            else
                api.twitch.disableStreaming();
        });

        self.applyTwitchSettings = function () {
            if (self.twitchEnableMicrophone() === 'ON')
                api.twitch.enableMicCapture();
            else
                api.twitch.disableMicCapture();
            
            if (self.twitchEnablePlayback() === 'ON')
                api.twitch.enablePlaybackCapture();
            else
                api.twitch.disablePlaybackCapture();
            
            api.twitch.setServer(self.twitchIngestServer());
        }

        self.restoreDefaults = function () {
            api.settings.restoreDefaults();
            self.settingGroups.notifySubscribers();
            self.applyTwitchSettings();
            self.cancelCaptureKeyCombo();
        };
        
        self.restoreGroupDefaults = function () {
            var activeGroup = self.activeSettingsGroup();
            api.settings.restoreGroupDefaults(activeGroup);
            self.settingGroups.notifySubscribers();
            switch (activeGroup) {
                case 'twitch' : {
                    self.applyTwitchSettings();
                    break;
                }
                case 'keyboard' : {
                    self.cancelCaptureKeyCombo();
                    break;
                }
            }
        };

        self.save = function () {
            return api.settings.save().then(function () {
                api.settings.apply(['graphics', 'audio', 'camera', 'ui', 'twitch', 'keyboard']);
                self.applyTwitchSettings();
                self.uberNetRegion(self.selectedUberNetRegion());
            });
        }

        self.saveAndExit = function () {
            return self.save().then(function() {
                self.back();
            });
        }

        self.active = ko.observable(!self.inPanel());
        
        self.setup = function () {

            $(window).focus(function() { self.active(true); });
            $(window).blur(function () { self.active(false); });

            engine.call('request_display_mode');
            //engine.call('data.request_unit_data');

            api.twitch.requestState();
            api.twitch.requestIngestList();

            api.Panel.message(0, 'live_game_uberbar', { 'value': false });

            if (_.isEmpty(self.uberNetRegions()) && self.inPanel()) {
                api.Panel.query(api.Panel.parentId, 'panel.invoke', ['uberNetRegions'])
                    .then(function (value) {
                        self.uberNetRegions(value);
                    });
            }
        }
    }

    handlers = {};

    handlers.display_mode = function (payload) {

        var disabled = model.disabledSettingsKeys();
        if (payload.locked) 
            disabled['display_mode'] = true;
        else
            delete disabled['display_mode'];
        model.disabledSettingsKeys(disabled);      

        switch (payload.mode) {
            case 'FULLSCREEN': /* fallthrough */
            case 'WINDOWED':
                api.settings.set('graphics', 'display_mode', payload.mode);
                break;
        }
    }

    handlers.twitchtv_authFailed = function (payload) {
        model.twitchReady(false);
        model.twitchMessage('Unable to authenticate with Twitch');
    }

    handlers.twitchtv_statechange = function (payload) {
        if (payload.twitchName)
            model.twitchName(payload.user);

        model.twitchStreamingDesired(payload.streamingDesired ? 'ON' : 'OFF');
        model.twitchReady(!!payload.authenticated);

        api.settings.set('twitch', 'resolution', payload.streamingResolution, true);
        api.settings.set('twitch', 'fps', payload.fps, true);
        api.settings.set('twitch', 'bitrate', payload.bitrate, true);
    }

    handlers.twitch_ingest_list = function (payload) {
        model.twitchIngestServer_options(payload.servers);
        model.twitchIngestServer(payload.default);
    }

    model = new SettingsViewModel();

    // inject per scene mods
    if (scene_mod_list['settings']) 
        loadMods(scene_mod_list['settings']);
    
    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    ko.applyBindings(model);

    model.setup();
});
