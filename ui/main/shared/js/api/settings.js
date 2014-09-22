/* Does read/write to settings, stores in PlayFab and caches in local storage */


function init_settings(api) {

    api.settings = {

        // Get a settings value
        get: function (group, key) {
            var self = this;
            var result = $.Deferred();

            // Make sure the group and key are defined
            if (!self.isValid(group, key))
                result.reject('Group/key combination is not a valid setting');
            else
                result.resolve(self.value(group, key));

            return result.promise();
        },
        // Set a settings value

        set: function (group, key, value, check_default) {
            var self = this;
            var result = $.Deferred();

            // Make sure the group and key are defined
            if (!self.isValid(group, key)) {
                result.reject('Group/key combination is not a valid setting');
                return result.promise();
            }

            if (check_default) {
                if (self.isDefaultValue(group, key, value)) {
                    result.resolve();
                    return result.promise();
                }                  
            }

            if (_.isUndefined(self.data[group]))
                self.data[group] = {};

            if (self.data[group][key] !== value) {
                self.isDirty(true);
                self.isDefault(false);
            }

            self.data[group][key] = value;

            if (self.observableMap[group] && self.observableMap[group][key])
                self.observableMap[group][key](value);

            result.resolve();

            return result.promise();
        },

        restoreDefaults: function () {
            var self = this;

            self.isDirty(!_.isEmpty(self.data));
            self.isDefault(true);

            self.data = {};
        },
        
        restoreGroupDefaults: function (group) {
            var self = this;
            
            self.isDirty(!_.isUndefined(self.data[group]));
            delete self.data[group];
            self.isDefault(_.isEmpty(self.data));
        },

        localStorageKey: function () {
            var uberName = localStorage.getItem('uberName');
            return uberName + '.paSettings';
        },

        loadLocalData: function () {
            var self = this;

            if (localStorage.getItem(self.localStorageKey()) === 'undefined')
                localStorage.setItem(self.localStorageKey(), JSON.stringify({}));

            // First load the local settings, which includes the locally cached remote settings
            var stored = localStorage.getItem(self.localStorageKey());

            try {
                self.isDefault(_.isEmpty(stored));
                self.data = _.isEmpty(stored) ? {} : JSON.parse(stored);
            } catch (error) {
                console.error('local settings data is malformed');
                console.error(stored);
            }
        },

        // Get our data from storage
        // Pass force=true to force a refresh from storage even if previously loaded
        load: function (force, local) {

            var self = this;
            var result = $.Deferred();

            if (force || !self.loaded) {

                // First load the local settings, which includes the locally cached remote settings
                self.loadLocalData();

                if (!local) // Get remote data from PlayFab, on success use that over local storage
                    engine.asyncCall("ubernet.getUserCustomData", JSON.stringify(['paSettings']))
					    .done(function (data) {
					        try {
					            if (data) {
					                var payload = JSON.parse(data).Data.paSettings
					                self.data = _.assign(payload, self.dataForLocal());
					                self.isDefault(_.isEmpty(payload));
					            }

					            localStorage.setItem(self.localStorageKey(), JSON.stringify(self.data));
    				            result.resolve({ loadedFromPlayFab: true });
					        } catch (error) {
					            result.resolve({ loadedFromPlayFab: false, badJsonData: true });
					        }
					    })
					    .fail(function (data) {
					        result.resolve({ loadedFromPlayFab: false });
					    });
            }
            else
                result.resolve({ loadedFromPlayFab: false });

            return result.promise();
        },

        // Push data to storage
        // Remotely stored data (like PlayFab) will be pushed there, but also stored locally
        save: function () {
            var self = this;
            var result = $.Deferred();

            // push a subset of the stored data to PlayFab
            engine.asyncCall("ubernet.updateUserCustomData", JSON.stringify({ paSettings: self.dataForPlayFab() }))
				.done(function (data) {
				    result.resolve({ savedToPlayFab: true });
				})
				.fail(function (data) {
				    result.resolve({ savedToPlayFab: false });
				});

            // and store all the data locally
            localStorage.setItem(self.localStorageKey(), JSON.stringify(self.data));

            self.isDirty(false);

            return result.promise();
        },

        // Determines if a given setting is defined
        isValid: function (group, key) {
            var self = this;

            if (!self.definitions[group] || _.isUndefined(self.definitions[group].settings[key]))
                return false;

            return true;
        },

        // Determines if we have an explicitly set value stored (versus using a default)
        // We're already in there, so we return the actual value if it is set and the "get" arg is true
        isSet: function (group, key, get) {
            var self = this;
            var result;

            if (!self.data[group])
                return;

            result = self.data[group][key];

            return get ? result : true;
        },

        value: function (group, key) {
            var self = this;

            var result = self.isSet(group, key, true);
            if (_.isUndefined(result)) {
                var def = self.definitions[group];
                if (def) {
                    var entry = def.settings[key];
                    if (entry)
                        result = entry.default;
                }
            }

            return result;
        },

        isDefaultValue: function (group, key, value) {
            var self = this;
            var result = false;            
            var def = self.definitions[group];
            if (def) {
                var entry = def.settings[key];
                if (entry)
                    result = (entry.default === value);
            }
            
            return result;
        },

        apply: function (groups) {
            var self = this;

            if (!groups)
                groups = _.keys(self.definitions);

            if (_.contains(groups, 'graphics')) {
                engine.call('set_option', 'graphics', self.value('graphics', 'quality').toLowerCase());
                engine.call('set_option', 'graphics.vte', self.value('graphics', 'texture').toLowerCase());
                engine.call('set_option', 'graphics.headlights', self.value('graphics', 'headlights').toLowerCase());
                engine.call('set_option', 'graphics.shadows', self.value('graphics', 'shadows').toLowerCase());
                engine.call('set_option', 'graphics.ao', self.value('graphics', 'ambient_occlusion').toLowerCase());
                engine.call('set_option', 'graphics.hdr', self.value('graphics', 'hdr').toLowerCase());
                engine.call('set_option', 'graphics.aa', self.value('graphics', 'anti_aliasing').toLowerCase());
                engine.call("set_resolution_scaling", Number(self.value('graphics', 'resolution_scaling')));
                engine.call("set_option", "graphics.display_mode", self.value('graphics', 'display_mode').toLowerCase());
            }

            if (_.contains(groups, 'audio')) {

                function mapToLog(value, orders) {
                    var power = (1.0 - (value / 100)) * orders;
                    var factor = Math.pow(0.5, power);
                    return (value) ? ((value === 100) ? 100 : factor * 100) : 0;
                }
                var orders = 7;

                engine.call("set_volume", 'master', mapToLog(self.value('audio', 'master'), orders) / 100);
                engine.call("set_volume", 'music', mapToLog(self.value('audio', 'music'), orders) / 100);
                engine.call("set_volume", 'SFX', mapToLog(self.value('audio', 'sfx'), orders) / 100);
                engine.call("set_volume", 'Voice', mapToLog(self.value('audio', 'voice'), orders) / 100);
            }

            if (_.contains(groups, 'camera')) {
                engine.call("set_camera_mouse_pan_speed", self.value('camera', 'mouse_pan_speed') / 10);
                engine.call("set_camera_key_pan_speed", self.value('camera', 'key_pan_speed') / 10);
                engine.call("set_camera_zoom_speed", self.value('camera', 'zoom_speed') / 10);
                engine.call("set_camera_friction", self.value('camera', 'camera_friction') / 10);
                engine.call("set_camera_edge_scroll", self.value('camera', 'edge_scroll_options').toLowerCase());
                engine.call("set_camera_pole_lock", self.value('camera', 'pole_lock').toLowerCase());
            }

            if (_.contains(groups, 'twitch')) {
                api.twitch.setResolution(self.value('twitch', 'resolution'));
                api.twitch.setFPS(self.value('twitch', 'fps'));
                api.twitch.setBitrate(self.value('twitch', 'bitrate'));
            }

            if (_.contains(groups, 'ui')) {
                engine.call('game.updateDisplaySettings', JSON.stringify({
                    'always_show_sicons': self.value('ui', 'show_unit_icons') === 'ALWAYS',
                    'never_show_sicons': self.value('ui', 'show_unit_icons') === 'NEVER',
                    'show_metal_icons': self.value('ui', 'show_metal_spot_icons') === 'ON',
                    'sicon_display_distance_scale': self.value('ui', 'icon_display_distance'),
                    'always_show_stat_bars': self.value('ui', 'show_stat_bars') === 'ALWAYS',
                    'never_show_stat_bars': self.value('ui', 'show_stat_bars') === 'NEVER',
                    'always_show_orders': self.value('ui', 'show_orders') === 'ALWAYS',
                    'never_show_orders': self.value('ui', 'show_orders') === 'NEVER',
                    'show_orders_if_selected': self.value('ui', 'order_behavior') === 'SELECTED',
                    'always_show_build_previews': self.value('ui', 'show_build_previews') === 'ALWAYS',
                    'never_show_build_previews': self.value('ui', 'show_build_previews') === 'NEVER',
                    'show_build_previews_if_selected': self.value('ui', 'build_preview_behavior') === 'SELECTED',
                    'always_show_orbital_shell': self.value('ui', 'orbital_shell') === 'RANGE DEPENDENT',
                    'never_show_orbital_shell': self.value('ui', 'orbital_shell') === 'NEVER'
                }));

                if (_.contains(groups, 'keyboard'))
                    api.Panel.message('', 'inputmap.reload');

                saveAndApplyLocale(self.value('ui', 'language')); /* this must be last, since it could trigger a ui refresh */
            }
        },

        isDirty: ko.observable(false),
        isDefault: ko.observable(false),

        // Cached storage for data in PlayFab
        data: { /* group.key */ },

        dataForPlayFab: function () {
            var self = this;
            var result = {};

            _.forIn(self.data, function (element, key) {
                var definition = self.definitions[key]
                if (definition && !definition.local_only)
                    result[key] = element;
            });

            return result;
        },

        dataForLocal: function() {
            var self = this;
            var result = _.clone(self.data);
            
            _.forIn(result, function (element, key) {
                var definition = self.definitions[key]
                if (definition && !definition.local_only)
                    delete self.data[key];
            });
            
            return result;
        },
        
        loaded: false,

        observableMap: {},

        definitions: {
            graphics: {
                title: '!LOC(settings:graphics.message):Graphics',
                local_only: true,
                settings: {
                    quality: {
                        title: '!LOC(settings:quality_preset.message):Quality Preset',
                        type: 'select',
                        options: ['LOW', 'MEDIUM', 'HIGH', 'UBER', 'CUSTOM'],
                        optionsText: ['!LOC(settings:low.message):LOW', '!LOC(settings:medium.message):MEDIUM', '!LOC(settings:high.message):HIGH', '!LOC(settings:uber.message):UBER', '!LOC(settings:custom.message):CUSTOM'],
                        callback: function (value) {

                            switch (value) {
                                case 'LOW':
                                    api.settings.set('graphics', 'texture', 'LOW');
                                    api.settings.set('graphics', 'headlights', 'OFF');
                                    api.settings.set('graphics', 'shadows', 'OFF');
                                    api.settings.set('graphics', 'hdr', 'OFF');
                                    api.settings.set('graphics', 'anti_aliasing', 'OFF');
                                    api.settings.set('graphics', 'ambient_occlusion', 'OFF');
                                    break;

                                case 'MEDIUM':
                                    api.settings.set('graphics', 'texture', 'MEDIUM');
                                    api.settings.set('graphics', 'headlights', 'MEDIUM');
                                    api.settings.set('graphics', 'shadows', 'MEDIUM');
                                    api.settings.set('graphics', 'hdr', 'ON');
                                    api.settings.set('graphics', 'anti_aliasing', 'OFF');
                                    api.settings.set('graphics', 'ambient_occlusion', 'OFF');
                                    break;

                                case 'HIGH':
                                    api.settings.set('graphics', 'texture', 'HIGH');
                                    api.settings.set('graphics', 'headlights', 'MEDIUM');
                                    api.settings.set('graphics', 'shadows', 'HIGH');
                                    api.settings.set('graphics', 'hdr', 'ON');
                                    api.settings.set('graphics', 'anti_aliasing', 'FXAA');
                                    api.settings.set('graphics', 'ambient_occlusion', 'ON');
                                    break;

                                case 'UBER':
                                    api.settings.set('graphics', 'texture', 'HIGH');
                                    api.settings.set('graphics', 'headlights', 'UBER');
                                    api.settings.set('graphics', 'shadows', 'UBER');
                                    api.settings.set('graphics', 'hdr', 'ON');
                                    api.settings.set('graphics', 'anti_aliasing', 'FXAA');
                                    api.settings.set('graphics', 'ambient_occlusion', 'ON');
                                    break;
                            }

                        },
                        default: 'MEDIUM',
                    },
                    texture: {
                        title: '!LOC(settings:virtual_texture.message):Virtual Texture',
                        type: 'select',
                        options: ['LOW', 'MEDIUM', 'HIGH'],
                        optionsText: ['!LOC(settings:low.message):LOW', '!LOC(settings:medium.message):MEDIUM', '!LOC(settings:high.message):HIGH'],
                        default: 'MEDIUM',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW':
                                    custom = (value !== 'LOW');
                                    break;

                                case 'MEDIUM':
                                    custom = (value !== 'MEDIUM');
                                    break;

                                case 'HIGH': /* fallthrough */
                                case 'UBER':
                                    custom = (value !== 'HIGH');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    headlights: {
                        title: '!LOC(settings:headlights.message):Headlights',
                        type: 'select',
                        options: ['OFF', 'MEDIUM', 'UBER'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:medium.message):MEDIUM', '!LOC(settings:uber.message):UBER'],
                        default: 'MEDIUM',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW':
                                    custom = (value !== 'OFF');
                                    break;

                                case 'MEDIUM': /* fallthrough */
                                case 'HIGH':
                                    custom = (value !== 'MEDIUM');
                                    break;

                                case 'UBER':
                                    custom = (value !== 'UBER');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    shadows: {
                        title: '!LOC(settings:shadows.message):Shadows',
                        type: 'select',
                        options: ['OFF', 'LOW', 'MEDIUM', 'HIGH', 'UBER'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:low.message):LOW', '!LOC(settings:medium.message):MEDIUM', '!LOC(settings:high.message):HIGH', '!LOC(settings:uber.message):UBER'],
                        default: 'MEDIUM',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW':
                                    custom = (value !== 'OFF');
                                    break;

                                case 'MEDIUM':
                                    custom = (value !== 'MEDIUM');
                                    break;

                                case 'HIGH':
                                    custom = (value !== 'HIGH');
                                    break;

                                case 'UBER':
                                    custom = (value !== 'UBER');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    ambient_occlusion: {
                        title: '!LOC(settings:ambient_occlusion.message):Ambient Occlusion',
                        type: 'select',
                        options: ['OFF', 'ON'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:on.message):ON'],
                        default: 'ON',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW': /* fallthrough */
                                case 'MEDIUM':
                                    custom = (value !== 'OFF');
                                    break;
                                case 'HIGH': /* fallthrough */
                                case 'UBER':
                                    custom = (value !== 'ON');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    hdr: {
                        title: '!LOC(settings:hdr.message):HDR',
                        type: 'select',
                        options: ['OFF', 'ON'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:on.message):ON'],
                        default: 'ON',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW':
                                    custom = (value !== 'OFF');
                                    break;

                                case 'MEDIUM':  /* fallthrough */
                                case 'HIGH': /* fallthrough */
                                case 'UBER':
                                    custom = (value !== 'ON');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    anti_aliasing: {
                        title: '!LOC(settings:anti_aliasing.message):Anti-Aliasing',
                        type: 'select',
                        options: ['OFF', 'FXAA'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:fxaa.message):FXAA'],
                        default: 'OFF',
                        callback: function (value) {
                            var custom;

                            switch (api.settings.value('graphics', 'quality')) {
                                case 'LOW': /* fallthrough */
                                case 'MEDIUM':
                                    custom = (value !== 'OFF');
                                    break;

                                case 'HIGH': /* fallthrough */
                                case 'UBER':
                                    custom = (value !== 'FXAA');
                                    break;
                            }

                            if (custom)
                                api.settings.set('graphics', 'quality', 'CUSTOM');
                        }
                    },
                    resolution_scaling: {
                        title: '!LOC(settings:resolution_scaling.message):Resolution Scaling',
                        type: 'select',
                        options: [-2, -1, 0, 1, 2, 3],
                        optionsText: ['!LOC(settings:subsample_50.message):SUBSAMPLE (50%)',
                                      '!LOC(settings:subsample_75.message):SUBSAMPLE (75%)',
                                      '!LOC(settings:native_100.message):NATIVE (100%)',
                                      '!LOC(settings:supersample_110.message):SUPERSAMPLE (110%)',
                                      '!LOC(settings:supersample_150.message):SUPERSAMPLE (150%)',
                                      '!LOC(settings:supersample_175.message):SUPERSAMPLE (175%)'],
                        default: 0,
                    },
                    display_mode: {
                        title: '!LOC(settings:display_mode.message):Display Mode',
                        type: 'select',
                        options: ['WINDOWED', 'FULLSCREEN'],
                        optionsText: ['!LOC(settings:windowed.message):WINDOWED', '!LOC(settings:fullscreen.message):FULLSCREEN'],
                        default: 'FULLSCREEN',
                    }
                }
            },
            audio: {
                title: '!LOC(settings:audio.message):Audio',
                settings: {
                    master: {
                        title: '!LOC(settings:master_volume.message):Master Volume',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 100,
                    },
                    music: {
                        title: '!LOC(settings:music_volume.message):Music Volume',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 100,
                    },
                    voice: {
                        title: '!LOC(settings:voice_volume.message):Voice Volume',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 100,
                    },
                    sfx: {
                        title: '!LOC(settings:sound_effects_volume.message):Sound Effects Volume',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 100,
                    }
                },
            },
            camera: {
                title: '!LOC(settings:camera.message):Camera',
                settings: {
                    mouse_pan_speed: {
                        title: '!LOC(settings:mouse_pan_speed.message):Mouse Pan Speed',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 10,
                    },
                    key_pan_speed: {
                        title: '!LOC(settings:key_pan_speed.message):Key Pan Speed',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 10,
                    },
                    zoom_speed: {
                        title: '!LOC(settings:zoom_speed.message):Zoom Speed',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 40,
                    },
                    camera_friction: {
                        title: '!LOC(settings:camera_friction.message):Camera Friction',
                        type: 'slider',
                        options: {
                            min: 0,
                            max: 100,
                            step: 1
                        },
                        default: 25,
                    },
                    edge_scroll_options: {
                        title: '!LOC(settings:edge_scroll_options.message):Edge Scroll Options',
                        type: 'select',
                        options: ['OFF (NO MOUSELOCK)', 'OFF (MOUSELOCK)', 'ON'],
                        optionsText: ['!LOC(settings:off_no_mouselock.message):OFF (NO MOUSELOCK)', '!LOC(settings:off_mouselock.message):OFF (MOUSELOCK)', '!LOC(settings:on.message):ON'],
                        default: 'OFF (NO MOUSELOCK)',
                    },
                    pole_lock: {
                        title: '!LOC(settings:pole_lock.message):Pole Lock',
                        type: 'select',
                        options: ['OFF', 'ON'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:on.message):ON'],
                        default: 'OFF',
                    }
                }
            },
            ui: {
                title: '!LOC(settings:ui.message):UI',
                settings: { // start settings
                    language: {
                        title: '!LOC(settings:language.message):Language',
                        type: 'select',
                        options: [
                            'ar',
                            'cs-CZ',
                            'da',
                            'de',
                            'de-AT',
                            'en',
                            'en-us',
                            'es',
                            'fi',
                            'fr',
                            'hu-HU',
                            'it',
                            'ko',
                            'nl',
                            'nl-BE',
                            'pl-PL',
                            'pt-BR',
                            'no',
                            'ro',
                            'ru',
                            'sv',
                            'tr-TR',
                            'uk',
                            'zh-CN',
                            'zh-HK',
                        ],
                        optionsText: [
                            'Arabic',
                            'Czech',
                            'Danish',
                            'German',
                            'German, Austrian',
                            'English',
                            'English-US',
                            'Spanish',
                            'Finnish',
                            'French',
                            'Hungarian',
                            'Italian',
                            'Korean',
                            'Dutch',
                            'Dutch, Belgium',
                            'Polish',
                            'Portugeuse, Brazil',
                            'Norweigan',
                            'Romanian',
                            'Russian',
                            'Swedish',
                            'Turkish',
                            'Ukrainian',
                            'Chinese',
                            'Chinese, Hong Kong',
                        ],
                        default: decode(localStorage.getItem('locale'))
                    },
                    show_unit_icons: {
                        title: '!LOC(settings:show_unit_icons.message):Show Unit Icons',
                        type: 'select',
                        options: ['ALWAYS', 'RANGE DEPENDENT', 'NEVER'],
                        optionsText: ['!LOC(settings:always.message):ALWAYS', '!LOC(settings:range_dependent.message):RANGE DEPENDENT', '!LOC(settings:never.message):NEVER'],
                        default: 'RANGE DEPENDENT',
                    },
                    icon_display_distance: {
                        title: '!LOC(settings:icon_display_distance.message):ICON DISPLAY DISTANCE',
                        type: 'slider',
                        options: {
                            min: 0.5,
                            max: 4.0,
                            step: 0.1
                        },
                        default: 1,
                    },
                    show_metal_spot_icons: {
                        title: '!LOC(settings:show_metal_spot_icons.message):Show Metal Spot Icons',
                        type: 'select',
                        options: ['OFF', 'ON'],
                        optionsText: ['!LOC(settings:off.message):OFF', '!LOC(settings:on.message):ON'],
                        default: 'ON',
                    },
                    show_stat_bars: {
                        title: '!LOC(settings:show_stat_bars.message):Show Stat Bars',
                        type: 'select',
                        options: ['VALUE DEPENDENT', 'NEVER'],
                        optionsText: ['!LOC(settings:value_dependent.message):VALUE DEPENDENT', '!LOC(settings:never.message):NEVER'],
                        default: 'VALUE DEPENDENT',
                    },
                    show_orders: {
                        title: '!LOC(settings:show_order_previews.message):Show Order Previews',
                        type: 'select',
                        options: ['ALWAYS', 'SHIFT', 'NEVER'],
                        optionsText: ['!LOC(settings:always.message):ALWAYS', '!LOC(settings:shift.message):SHIFT', '!LOC(settings:never.message):NEVER'],
                        default: 'SHIFT',
                    },
                    order_behavior: {
                        title: '!LOC(settings:order_preview_behavior.message):Order Preview Behavior',
                        type: 'select',
                        options: ['ALL', 'SELECTED'],
                        optionsText: ['!LOC(settings:all.message):ALL', '!LOC(settings:selected.message):SELECTED'],
                        default: 'SELECTED',
                    },
                    show_build_previews: {
                        title: '!LOC(settings:show_build_previews.message):Show Build Previews',
                        type: 'select',
                        options: ['ALWAYS', 'SHIFT', 'NEVER'],
                        optionsText: ['!LOC(settings:always.message):ALWAYS', '!LOC(settings:shift.message):SHIFT', '!LOC(settings:never.message):NEVER'],
                        default: 'SHIFT',
                    },
                    build_preview_behavior: {
                        title: '!LOC(settings:build_preview_behavior.message):Build Preview Behavior',
                        type: 'select',
                        options: ['ALL', 'SELECTED'],
                        optionsText: ['!LOC(settings:all.message):ALL', '!LOC(settings:selected.message):SELECTED'],
                        default: 'SELECTED'
                    },
                    orbital_shell: {
                        title: '!LOC(settings:orbital_shell.message):Orbital Shell',
                        type: 'select',
                        options: ['RANGE DEPENDENT', 'SELECTED', 'NEVER'],
                        optionsText: ['!LOC(settings:range_dependent.message):RANGE DEPENDENT', '!LOC(settings:selected.message):SELECTED', '!LOC(settings:never.message):NEVER'],
                        default: 'SELECTED',
                    }
                } // end settings
            },
            twitch: {
                title: 'Twitch',
                settings: {
                    resolution: {
                        title: '!LOC(settings:resolution.message):Resolution',
                        type: 'select',
                        options: ['720p'],
                        default: '720p'
                    },
                    fps: {
                        title: '!LOC(settings:fps.message):FPS',
                        type: 'select',
                        options: ['10', '20', '30'],
                        default: '30'
                    },
                    bitrate: {
                        title: '!LOC(settings:bitrate.message):Bitrate',
                        type: 'select',
                        options: ['3200', '2000', '1100', '700', '500'],
                        optionsText: ['!LOC(settings:3200_recommended_for_1080p.message):3200 (recommended for 1080p)',
                                      '!LOC(settings:2000_recommended_for_720p.message):2000 (recommended for 720p)',
                                      '!LOC(settings:1100_recommended_for_480p.message):1100 (recommended for 480p)',
                                      '!LOC(settings:700_recommended_for_360p.message):700 (recommended for 360p)',
                                      '!LOC(settings:500_recommended_for_240p.message):500 (recommended for 240p)'],
                        default: '2000'
                    }
                }
            },
            server: {
                title: '!LOC(settings:server.message):Server',
                settings: {}
            },
            keyboard: {
                title: '!LOC(settings:keyboard.message):Keyboard',
                settings: {
                /* GENERAL ----------------*/

                    /* GENERAL ----------------*/
                    pause_game: {
                        title: '!LOC(settings:pause_game.message):pause game',
                        type: 'keybind',
                        set: 'gameplay',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'break'
                    },
                    show_hide_ar: {
                        title: '!LOC(settings:show_hide_visual_aid_overlays.message):show/hide visual aid overlays',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'ctrl+y'
                    },
                    toggle_music: {
                        title: '!LOC(settings:toggle_music.message):toggle music',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'ctrl+s'
                    },
                    toggle_fullscreen: {
                        title: '!LOC(settings:toggle_fullscreen.message):toggle fullscreen',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'alt+enter'
                    },
                    toggle_gamestats: {
                        title: '!LOC(settings:show_hide_game_stats.message):Show/Hide game stats',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'tab'
                    },

                    show_hide_ui: {
                        title: '!LOC(settings:show_hide_ui.message):show/hide UI',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'ctrl+u'
                    },
                    modal_back: {
                        title: '!LOC(settings:navigate_back_exit.message):navigate back/exit',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'esc'
                    },
                    show_hide_performance_panel: {
                        title: '!LOC(settings:show_hide_performance_panel.message):show/hide performance panel',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:general.message):general',
                        default: 'ctrl+p'
                    },
                    /* CHAT */
                    normal_chat: {
                        title: '!LOC(settings:normal_chat.message):normal chat',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:communication.message):communication',
                        default: 'enter'
                    },
                    team_chat: {
                        title: '!LOC(settings:team_chat.message):team chat',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:communication.message):communication',
                        default: 'shift+enter'
                    },
                    twitch_chat: {
                        title: '!LOC(settings:twitch_chat.message):Twitch chat',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:communication.message):communication',
                        default: 'ctrl+enter'
                    },

                    /* ALERTS ----------------*/
                    command_mode_ping: {
                        title: '!LOC(settings:ping.message):ping',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:alerts.message):alerts',
                        default: 'g'
                    },
                    acknowledge_alert: {
                        title: '!LOC(settings:dismiss_alert_notification.message):dismiss alert notification',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:alerts.message):alerts',
                        default: 'space'
                    },

                    acknowledge_combat: {
                        title: 'zoom to combat',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:alerts.message):alerts',
                        default: 'ctrl+space'
                    },

                    /* PICTURE IN PICTURE ----------------*/
                    toggle_pips: {
                        title: '!LOC(settings:show_hide_pip.message):Show/Hide pip',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:picture_in_picture.message):picture-in-picture',
                        default: 'q'
                    },
                    swap_pips: {
                        title: '!LOC(settings:swap_pip.message):swap pip',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:picture_in_picture.message):picture-in-picture',
                        default: 'shift+q'
                    },
                    copy_to_pip: {
                        title: '!LOC(settings:copy_to_pip.message):copy to pip',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:picture_in_picture.message):picture-in-picture',
                        default: 'alt+q'
                    },
                    toggle_pip_mirror: {
                        title: '!LOC(settings:toggle_pip_mirror.message):toggle pip mirror',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:picture_in_picture.message):picture-in-picture',
                        default: 'alt+m'
                    },

                    /* CHRONOCAM ----------------*/
                    resume_at_latest_time: {
                        title: '!LOC(settings:resume_at_latest_time.message):resume at latest time',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    play_forward_at_50: {
                        title: '!LOC(settings:play_forward_at_50.message):play forward at 50%',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    play_forward_at_100: {
                        title: '!LOC(settings:play_forward_at_100.message):play forward at 100%',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    play_backwards_at_50: {
                        title: '!LOC(settings:play_backwards_at_50.message):play backwards at 50%',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    play_backwards_at_100: {
                        title: '!LOC(settings:play_backwards_at_100.message):play backwards at 100%',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    pause_time: {
                        title: '!LOC(settings:pause_time.message):pause time',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    last_pseudo_frame: {
                        title: '!LOC(settings:last_pseudo_frame.message):last pseudo frame',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },
                    next_pseudo_frame: {
                        title: '!LOC(settings:next_pseudo_frame.message):next pseudo frame',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:chronocam.message):chronocam',
                        default: ''
                    },


                    /* STREAMING ----------------*/
                    toggle_twitch_streaming: {
                        title: '!LOC(settings:toggle_twitch_streaming.message):toggle twitch streaming',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:streaming.message):streaming',
                        default: 'f6'
                    },
                    toggle_twitch_microphone: {
                        title: '!LOC(settings:toggle_twitch_microphone.message):toggle twitch microphone',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:streaming.message):streaming',
                        default: 'f7'
                    },
                    toggle_twitch_system_audio_recording: {
                        title: '!LOC(settings:toggle_twitch_system_audio_recording.message):toggle twitch system audio recording',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:streaming.message):streaming',
                        default: 'f8'
                    },
                    run_twitch_commercial: {
                        title: '!LOC(settings:run_twitch_commercial.message):run twitch commercial',
                        type: 'keybind',
                        set: 'general',
                        display_group: '!LOC(settings:general.message):general',
                        display_sub_group: '!LOC(settings:streaming.message):streaming',
                        default: 'f9'
                    },


                /* UNITS ----------------*/

                    /* SELECTION ----------------*/
                    select_commander: {
                        title: '!LOC(settings:select_commander.message):select commander',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'alt+c'
                    },
                    select_idle_fabbers: {
                        title: '!LOC(settings:select_idle_fabbers.message):select idle fabbers',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'f'
                    },
                    select_all_factories: {
                        title: '!LOC(settings:select_all_factories.message):select all factories',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'shift+f1'
                    },
                    select_all_idle_factories: {
                        title: '!LOC(settings:select_all_idle_factories.message):select all idle factories',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'shift+f2'
                    },
                    select_all_factories_on_screen: {
                        title: '!LOC(settings:select_all_factories_on_screen.message):select all factories on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'shift+f3'
                    },
                    select_all_idle_factories_on_screen: {
                        title: '!LOC(settings:select_all_idle_factories_on_screen.message):select all idle factories on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'shift+f4'
                    },
                    select_all_combat_units_on_screen: {
                        title: '!LOC(settings:select_all_combat_units_on_screen.message):select all combat units on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'shift+f5'
                    },
                    select_all_combat_units: {
                        title: '!LOC(settings:select_all_combat_units.message):select all combat units',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f6'
                    },
                    select_all_land_combat_units_on_screen: {
                        title: '!LOC(settings:select_all_land_combat_units_on_screen.message):select all land combat units on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f6'
                    },
                    select_all_land_combat_units: {
                        title: '!LOC(settings:select_all_land_combat_units.message):select all land combat units',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f7'
                    },
                    select_all_air_combat_units_on_screen: {
                        title: '!LOC(settings:select_all_air_combat_units_on_screen.message):select all air combat units on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f8'
                    },
                    select_all_air_combat_units: {
                        title: '!LOC(settings:select_all_air_combat_units.message):select all air combat units',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f9'
                    },
                    select_all_naval_combat_units_on_screen: {
                        title: '!LOC(settings:select_all_naval_combat_units_on_screen.message):select all naval combat units on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f10'
                    },
                    select_all_naval_combat_units: {
                        title: '!LOC(settings:select_all_naval_combat_units.message):select all naval combat units',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+shift+f4'
                    },
                    select_all_matching_units_on_screen: {
                        title: '!LOC(settings:select_all_matching_units_on_screen.message):select all matching units on screen',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_selection.message):unit selection',
                        default: 'ctrl+z'
                    },


                    /* COMMANDS ----------------*/
                    command_mode_move: {
                        title: '!LOC(settings:move.message):move',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'm'
                    },
                    command_mode_attack: {
                        title: '!LOC(settings:attack.message):attack',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'a'
                    },
                    command_mode_assist: {
                        title: '!LOC(settings:assist.message):assist',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'i'
                    },
                    command_mode_repair: {
                        title: '!LOC(settings:repair.message):repair',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'r'
                    },
                    command_mode_reclaim: {
                        title: '!LOC(settings:reclaim.message):reclaim',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'e'
                    },
                    command_mode_patrol: {
                        title: '!LOC(settings:patrol.message):patrol',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'p'
                    },
                    command_mode_special_move: {
                        title: '!LOC(settings:special_move.message):special move',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: ''
                    },
                    command_mode_unload: {
                        title: '!LOC(settings:unload.message):unload',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: ''
                    },
                    command_mode_load: {
                        title: '!LOC(settings:load.message):load',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: ''
                    },
                    command_mode_alt_fire: {
                        title: '!LOC(settings:alt_fire.message):alt fire',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'd'
                    },
                    stop_command: {
                        title: '!LOC(settings:stop.message):stop',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 's'
                    },
                    self_destruct_selected_unit: {
                        title: '!LOC(settings:self_destruct_selected_unit.message):self destruct selected unit',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_commands.message):unit commands',
                        default: 'del'
                    },


                    /* ORDERS ----------------*/
                    fire_at_will: {
                        title: '!LOC(settings:fire_at_will.message):fire at will',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    return_fire: {
                        title: '!LOC(settings:return_fire.message):return fire',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    hold_fire: {
                        title: '!LOC(settings:hold_fire.message):hold fire',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    toggle_fire_orders: {
                        title: '!LOC(settings:toggle_fire_orders.message):toggle fire orders',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: 'h'
                    },
                    maneuver: {
                        title: '!LOC(settings:maneuver.message):maneuver',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    roam: {
                        title: '!LOC(settings:roam.message):roam',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    hold_position: {
                        title: '!LOC(settings:hold_position.message):hold position',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    toggle_move_orders: {
                        title: '!LOC(settings:toggle_move_orders.message):toggle move orders',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: 'j'
                    },

                    energy_on: {
                        title: '!LOC(settings:energy_on.message):energy on',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    energy_off: {
                        title: '!LOC(settings:energy_off.message):energy off',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: ''
                    },
                    toggle_energy_orders: {
                        title: '!LOC(settings:toggle_energy_orders.message):toggle energy orders',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_orders.message):unit orders',
                        default: 'k'
                    },


                    /* CAPTURE ----------------*/
                    capture_group_1: {
                        title: '!LOC(settings:capture_group_1.message):capture group 1',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+1'
                    },
                    capture_group_2: {
                        title: '!LOC(settings:capture_group_2.message):capture group 2',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+2'
                    },
                    capture_group_3: {
                        title: '!LOC(settings:capture_group_3.message):capture group 3',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+3'
                    },
                    capture_group_4: {
                        title: '!LOC(settings:capture_group_4.message):capture group 4',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+4'
                    },
                    capture_group_5: {
                        title: '!LOC(settings:capture_group_5.message):capture group 5',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+5'
                    },
                    capture_group_6: {
                        title: '!LOC(settings:capture_group_6.message):capture group 6',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+6'
                    },
                    capture_group_7: {
                        title: '!LOC(settings:capture_group_7.message):capture group 7',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+7'
                    },
                    capture_group_8: {
                        title: '!LOC(settings:capture_group_8.message):capture group 8',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+8'
                    },
                    capture_group_9: {
                        title: '!LOC(settings:capture_group_9.message):capture group 9',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+9'
                    },
                    capture_group_0: {
                        title: '!LOC(settings:capture_group_0.message):capture group 0',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_capture_groups.message):unit capture groups',
                        default: 'ctrl+0'
                    },

                    /* RECALL GROUP ----------------*/
                    recall_group_1: {
                        title: '!LOC(settings:recall_group_1.message):recall group 1',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '1'
                    },
                    recall_group_2: {
                        title: '!LOC(settings:recall_group_2.message):recall group 2',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '2'
                    },
                    recall_group_3: {
                        title: '!LOC(settings:recall_group_3.message):recall group 3',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '3'
                    },
                    recall_group_4: {
                        title: '!LOC(settings:recall_group_4.message):recall group 4',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '4'
                    },
                    recall_group_5: {
                        title: '!LOC(settings:recall_group_5.message):recall group 5',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '5'
                    },
                    recall_group_6: {
                        title: '!LOC(settings:recall_group_6.message):recall group 6',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '6'
                    },
                    recall_group_7: {
                        title: '!LOC(settings:recall_group_7.message):recall group 7',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '7'
                    },
                    recall_group_8: {
                        title: '!LOC(settings:recall_group_8.message):recall group 8',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '8'
                    },
                    recall_group_9: {
                        title: '!LOC(settings:recall_group_9.message):recall group 9',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '9'
                    },
                    recall_group_0: {
                        title: '!LOC(settings:recall_group_0.message):recall group 0',
                        type: 'keybind',
                        set: 'units',
                        display_group: '!LOC(settings:units.message):units',
                        display_sub_group: '!LOC(settings:unit_recall_groups.message):unit recall groups',
                        default: '0'
                    },

                /* BUILD ----------------*/

                    /* BUILD COMMANDS ----------------*/
                    start_build_vehicle: {
                        title: '!LOC(settings:select_vehicle_group.message):select vehicle group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'z'
                    },
                    start_build_bot: {
                        title: '!LOC(settings:select_bot_group.message):select bot group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'x',
                        allow_conflicts: {
                            key: ['start_build_factory']
                        }
                    },
                    start_build_air: {
                        title: '!LOC(settings:select_air_group.message):select air group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'c',
                        allow_conflicts: {
                            key: ['start_build_combat']
                        }
                    },
                    start_build_sea: {
                        title: '!LOC(settings:select_sea_group.message):select sea group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'v',
                        allow_conflicts: {
                            key: ['start_build_utility']
                        }
                    },
                    start_build_orbital_unit: {
                        title: '!LOC(settings:select_orbital_group_units.message):select orbital group (units)',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'b',
                        allow_conflicts: {
                            key: ['start_build_orbital_structure']
                        }
                    },
                    start_build_factory: {
                        title: '!LOC(settings:select_factory_group.message):select factory group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'x',
                        allow_conflicts: {
                            key: ['start_build_bot']
                        }
                    },
                    start_build_combat: {
                        title: '!LOC(settings:select_combat_group.message):select combat group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'c',
                        allow_conflicts: {
                            key: ['start_build_air']
                        }
                    },
                    start_build_utility: {
                        title: '!LOC(settings:select_utility_group.message):select utility group',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'v',
                        allow_conflicts: {
                            key: ['start_build_sea']
                        }
                    },
                    start_build_orbital_structure: {
                        title: '!LOC(settings:select_orbital_group_buildings.message):select orbital group (buildings)',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_bar_groups.message):build bar groups',
                        default: 'b',
                        allow_conflicts: {
                            key: ['start_build_orbital_unit']
                        }
                    },

                    build_once: {
                        title: '!LOC(settings:build_once.message):build once',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_orders.message):build orders',
                        default: ''
                    },
                    build_loop: {
                        title: '!LOC(settings:build_loop.message):build loop',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_orders.message):build orders',
                        default: ''
                    },
                    toggle_build_orders: {
                        title: '!LOC(settings:toggle_build_orders.message):toggle build orders',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_orders.message):build orders',
                        default: 'l'
                    },


                    /* BUILD ITEMS ----------------*/
                    build_item_1: {
                        title: '!LOC(settings:build_item_1.message):build item 1',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: '1',
                        allow_conflicts: true
                    },
                    build_item_2: {
                        title: '!LOC(settings:build_item_2.message):build item 2',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: '2',
                        allow_conflicts: true
                    },
                    build_item_3: {
                        title: '!LOC(settings:build_item_3.message):build item 3',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: '3',
                        allow_conflicts: true
                    },
                    build_item_4: {
                        title: '!LOC(settings:build_item_4.message):build item 4',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: '4',
                        allow_conflicts: true
                    },
                    build_item_5: {
                        title: '!LOC(settings:build_item_5.message):build item 5',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: '5',
                        allow_conflicts: true
                    },
                    build_item_6: {
                        title: '!LOC(settings:build_item_6.message):build item 6',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'q',
                        allow_conflicts: true
                    },
                    build_item_7: {
                        title: '!LOC(settings:build_item_7.message):build item 7',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'w',
                        allow_conflicts: true
                    },
                    build_item_8: {
                        title: '!LOC(settings:build_item_8.message):build item 8',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'e',
                        allow_conflicts: true
                    },
                    build_item_9: {
                        title: '!LOC(settings:build_item_9.message):build item 9',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'r',
                        allow_conflicts: true
                    },
                    build_item_10: {
                        title: '!LOC(settings:build_item_10.message):build item 10',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 't',
                        allow_conflicts: true
                    },
                    build_item_11: {
                        title: '!LOC(settings:build_item_11.message):build item 11',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'a',
                        allow_conflicts: true
                    },
                    build_item_12: {
                        title: '!LOC(settings:build_item_12.message):build item 12',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 's',
                        allow_conflicts: true
                    },
                    build_item_13: {
                        title: '!LOC(settings:build_item_13.message):build item 13',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'd',
                        allow_conflicts: true
                    },
                    build_item_14: {
                        title: '!LOC(settings:build_item_14.message):build item 14',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'f',
                        allow_conflicts: true
                    },
                    build_item_15: {
                        title: '!LOC(settings:build_item_15.message):build item 15',
                        type: 'keybind',
                        set: 'build',
                        display_group: '!LOC(settings:build.message):build',
                        display_sub_group: '!LOC(settings:build_items.message):build items',
                        default: 'g',
                        allow_conflicts: true
                    },


                /* CAMERA ----------------*/
                    /* CAMERA MODES ----------------*/
                    set_default_camera: {
                        title: '!LOC(settings:set_default_camera.message):set default camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: ''
                    },
                    set_free_camera: {
                        title: '!LOC(settings:set_free_camera.message):set free camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: 'ctrl+alt+m'
                    },
                    set_debug_camera: {
                        title: '!LOC(settings:set_debug_camera.message):set debug camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: ''
                    },
                    set_planet_camera: {
                        title: '!LOC(settings:set_planet_camera.message):set planet camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: ''
                    },
                    toggle_free_camera: {
                        title: '!LOC(settings:toggle_free_camera.message):toggle free camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: ''
                    },
                    toggle_debug_camera: {
                        title: '!LOC(settings:toggle_debug_camera.message):toggle debug camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:modes.message):modes',
                        default: 'ctrl+m'
                    },

                    /* CAMERA DIRECTION ----------------*/
                    camera_move_left: {
                        title: '!LOC(settings:move_left.message):move left',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:direction.message):direction',
                        default: 'left'
                    },
                    camera_move_right: {
                        title: '!LOC(settings:move_right.message):move right',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:direction.message):direction',
                        default: 'right'
                    },
                    camera_move_up: {
                        title: '!LOC(settings:move_up.message):move up',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:direction.message):direction',
                        default: 'up'
                    },
                    camera_move_down: {
                        title: '!LOC(settings:move_down.message):move down',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:direction.message):direction',
                        default: 'down'
                    },
                    camera_zoom_in: {
                        title: '!LOC(settings:zoom_in.message):zoom in',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:fov.message):FOV',
                        default: ''
                    },
                    camera_zoom_out: {
                        title: '!LOC(settings:zoom_out.message):zoom out',
                        type: 'keybind',
                        set: 'camera controls',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:fov.message):FOV',
                        default: ''
                    },

                    /* CAMERA ZOOM ----------------*/
                    zoom_to_surface: {
                        title: '!LOC(settings:zoom_to_surface.message):zoom to surface',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:zoom.message):zoom',
                        default: ''
                    },
                    zoom_to_air: {
                        title: '!LOC(settings:zoom_to_air.message):zoom to air',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:zoom.message):zoom',
                        default: ''
                    },
                    zoom_to_orbital: {
                        title: '!LOC(settings:zoom_to_orbital.message):zoom to orbital',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:zoom.message):zoom',
                        default: ''
                    },
                    zoom_to_celestial: {
                        title: '!LOC(settings:zoom_to_celestial.message):zoom to celestial',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:zoom.message):zoom',
                        default: ''
                    },

                    /* PLANET JUMP ----------------*/
                    previous_planet: {
                        title: '!LOC(settings:jump_to_previous_planet.message):jump to previous planet',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:planet_jump.message):planet jump',
                        default: ''
                    },
                    next_planet: {
                        title: '!LOC(settings:jump_to_next_planet.message):jump to next planet',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:planet_jump.message):planet jump',
                        default: ','
                    },

                    /* TRACKING AND ALIGNMENT ----------------*/
                    track_selection_with_camera: {
                        title: '!LOC(settings:track_selection_with_camera.message):track selection with camera',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tracking_alignment.message):tracking & alignment',
                        default: 't'
                    },
                    align_to_pole: {
                        title: '!LOC(settings:align_to_pole.message):align to pole',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tracking_alignment.message):tracking & alignment',
                        default: 'n'
                    },

                    /* FREE MOVEMENT ----------------*/
                    free_move_left: {
                        title: '!LOC(settings:free_move_left.message):free move left',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'a',
                        allow_conflicts: true
                    },
                    free_move_right: {
                        title: '!LOC(settings:free_move_right.message):free move right',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'd',
                        allow_conflicts: true
                    },
                    free_move_up: {
                        title: '!LOC(settings:free_move_up.message):free move up',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'r',
                        allow_conflicts: true
                    },
                    free_move_down: {
                        title: '!LOC(settings:free_move_down.message):free move down',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'f',
                        allow_conflicts: true
                    },
                    free_move_forward: {
                        title: '!LOC(settings:free_move_forward.message):free move forward',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'w',
                        allow_conflicts: true
                    },
                    free_move_backward: {
                        title: '!LOC(settings:free_move_backward.message):free move backward',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 's',
                        allow_conflicts: true
                    },
                    free_roll_left: {
                        title: '!LOC(settings:free_roll_left.message):free roll left',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'u',
                        allow_conflicts: true
                    },
                    free_roll_right: {
                        title: '!LOC(settings:free_roll_right.message):free roll right',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'o',
                        allow_conflicts: true
                    },
                    free_pitch_forward: {
                        title: '!LOC(settings:free_pitch_forward.message):free pitch forward',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'i',
                        allow_conflicts: true
                    },
                    free_pitch_backward: {
                        title: '!LOC(settings:free_pitch_backward.message):free pitch backward',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'k',
                        allow_conflicts: true
                    },
                    free_yaw_left: {
                        title: '!LOC(settings:free_yaw_left.message):free yaw left',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'j',
                        allow_conflicts: true
                    },
                    free_yaw_right: {
                        title: '!LOC(settings:free_yaw_right.message):free yaw right',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'l',
                        allow_conflicts: true
                    },
                    free_zoom_in: {
                        title: '!LOC(settings:free_zoom_in.message):free zoom in',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'q',
                        allow_conflicts: true
                    },
                    free_zoom_out: {
                        title: '!LOC(settings:free_zoom_out.message):free zoom out',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:free_movement.message):free movement',
                        default: 'e',
                        allow_conflicts: true
                    },

                    /* CAPTURE ----------------*/
                    capture_anchor_1: {
                        title: '!LOC(settings:capture_anchor_1.message):capture anchor 1',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+1'
                    },
                    capture_anchor_2: {
                        title: '!LOC(settings:capture_anchor_2.message):capture anchor 2',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+2'
                    },
                    capture_anchor_3: {
                        title: '!LOC(settings:capture_anchor_3.message):capture anchor 3',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+3'
                    },
                    capture_anchor_4: {
                        title: '!LOC(settings:capture_anchor_4.message):capture anchor 4',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+4'
                    },
                    capture_anchor_5: {
                        title: '!LOC(settings:capture_anchor_5.message):capture anchor 5',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+5'
                    },
                    capture_anchor_6: {
                        title: '!LOC(settings:capture_anchor_6.message):capture anchor 6',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+6'
                    },
                    capture_anchor_7: {
                        title: '!LOC(settings:capture_anchor_7.message):capture anchor 7',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+7'
                    },
                    capture_anchor_8: {
                        title: '!LOC(settings:capture_anchor_8.message):capture anchor 8',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+8'
                    },
                    capture_anchor_9: {
                        title: '!LOC(settings:capture_anchor_9.message):capture anchor 9',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+9'
                    },
                    capture_anchor_0: {
                        title: '!LOC(settings:capture_anchor_10.message):capture anchor 10',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:capture_anchor.message):capture anchor',
                        default: 'shift+0'
                    },

                    /* RECALL ----------------*/
                    recall_anchor_1: {
                        title: '!LOC(settings:recall_anchor_1.message):recall anchor 1',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+1'
                    },
                    recall_anchor_2: {
                        title: '!LOC(settings:recall_anchor_2.message):recall anchor 2',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+2'
                    },
                    recall_anchor_3: {
                        title: '!LOC(settings:recall_anchor_3.message):recall anchor 3',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+3'
                    },
                    recall_anchor_4: {
                        title: '!LOC(settings:recall_anchor_4.message):recall anchor 4',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+4'
                    },
                    recall_anchor_5: {
                        title: '!LOC(settings:recall_anchor_5.message):recall anchor 5',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+5'
                    },
                    recall_anchor_6: {
                        title: '!LOC(settings:recall_anchor_6.message):recall anchor 6',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+6'
                    },
                    recall_anchor_7: {
                        title: '!LOC(settings:recall_anchor_7.message):recall anchor 7',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+7'
                    },
                    recall_anchor_8: {
                        title: '!LOC(settings:recall_anchor_8.message):recall anchor 8',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+8'
                    },
                    recall_anchor_9: {
                        title: '!LOC(settings:recall_anchor_9.message):recall anchor 9',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+9'
                    },
                    recall_anchor_0: {
                        title: '!LOC(settings:recall_anchor_0.message):recall anchor 0',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:recall_anchor.message):recall anchor',
                        default: 'alt+0'
                    },

                    /* TUNING ----------------*/
                    increase_camera_pan_speed: {
                        title: '!LOC(settings:increase_camera_pan_speed.message):increase camera pan speed',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tuning.message):tuning',
                        default: ''
                    },
                    decrease_camera_pan_speed: {
                        title: '!LOC(settings:decrease_camera_pan_speed.message):decrease camera pan speed',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tuning.message):tuning',
                        default: ''
                    },
                    smooth_zoom_out: {
                        title: '!LOC(settings:smooth_zoom_out.message):smooth zoom out',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tuning.message):tuning',
                        default: ''
                    },
                    smooth_zoom_in: {
                        title: '!LOC(settings:smooth_zoom_in.message):smooth zoom in',
                        type: 'keybind',
                        set: 'camera',
                        display_group: '!LOC(settings:camera.message):camera',
                        display_sub_group: '!LOC(settings:tuning.message):tuning',
                        default: ''
                    },
                    //relax_constraints: {
                    //    title: 'relax constraints',
                    //    type: 'keybind',
                    //    set: 'camera',
                    //    display_group: 'camera',
                    //    display_sub_group: 'tuning',
                    //    default: ''
                    //},
                    //restore_constraints: {
                    //    title: 'restore constraints',
                    //    type: 'keybind',
                    //    set: 'camera',
                    //    display_group: 'camera',
                    //    display_sub_group: 'tuning',
                    //    default: ''
                    //},

                /* DEV MODE ----------------*/

                    abort: {
                        title: '!LOC(settings:abort.message):abort',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    crash: {
                        title: '!LOC(settings:crash.message):crash',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    reload_view: {
                        title: '!LOC(settings:reload_view.message):reload view',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'f5'
                    },
                    toggle_audio_logging: {
                        title: '!LOC(settings:toggle_audio_logging.message):toggle audio logging',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    quick_profile: {
                        title: '!LOC(settings:quick_profile.message):quick profile',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+f11'
                    },
                    bug_report: {
                        title: '!LOC(settings:bug_report.message):bug report',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+f10'
                    },
                    toggle_nav_debug: {
                        title: '!LOC(settings:toggle_nav_debug.message):toggle nav debug',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+alt+f11'
                    },
                    toggle_console: {
                        title: '!LOC(settings:toggle_console.message):toggle console',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    set_army_from_hover: {
                        title: '!LOC(settings:set_army_from_hover.message):set army from hover',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+b'
                    },
                    copy_unit: {
                        title: '!LOC(settings:copy_unit.message):copy unit',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+c'
                    },
                    paste_unit: {
                        title: '!LOC(settings:paste_unit.message):paste unit',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+v'
                    },
                    toggle_fow: {
                        title: '!LOC(settings:toggle_fow.message):toggle FOW',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+j'
                    },
                    build_avatar: {
                        title: '!LOC(settings:build_avatar.message):build avatar',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'alt+f1'
                    },
                    build_avatar_factory: {
                        title: '!LOC(settings:build_avatar_factory.message):build avatar factory',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'alt+f2'
                    },
                    enable_navigation_debug_info: {
                        title: '!LOC(settings:enable_navigation_debug_info.message):enable navigation debug info',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    disable_navigation_debug_info: {
                        title: '!LOC(settings:disable_navigation_debug_info.message):disable navigation debug info',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: ''
                    },
                    publish_server_mods: {
                        title: '!LOC(settings:publish_server_mods.message):publish server mods',
                        type: 'keybind',
                        set: 'dev mode',
                        display_group: '!LOC(settings:dev_mode.message):dev mode',
                        display_sub_group: '',
                        default: 'ctrl+alt+p'
                    },
                }
            }
        }
    }

    // Patch up the default language if it happens to not be in our list
    var language = api.settings.definitions.ui.settings.language;
    if (!language.default || !_.contains(language.options, language.default))
        language.default = 'en-us';
}
init_settings(window.api);
api.settings.load(true, true);

ko.extenders.setting = function (target, option) {
    var group = option.group,
        key = option.key;

    target.subscribe(function (value) { /* changes are not saved when 'set'.  you have to call api.settings.save */
        api.settings.get(group, key).then(function (data) {
            if (data !== value)
                api.settings.set(group, key, value);
        });
    });

    api.settings.get(group, key).then(function (data) {
        target(data);
    });

    return target;
};
