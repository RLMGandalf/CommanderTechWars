loadScript("coui://ui/main/shared/js/ubernet.js");

$(document).ready(function () {

    // Load videos
    $("#ubervideo .ytv-wrapper").ytv({
        user: 'UberEntChannel',
        playlist: 'PLi9lQ-P6lhoNVScIK8m-6BtBQzc7x7HMQ',
        controls: false,
        annotations: false
    });

    // YTV never seems to fire it's videoReady event, so this detects the creation of the video list and performs a resize
    $('#ubervideo').on('DOMNodeInserted', function (e) {
        if ($(e.target).is('.ytv-relative')) {
            $("#ubervideo .ytv-list").height($(window).height() - 68);
            $("#ubervideo a").attr('data-bind', "click_sound: 'default', rollover_sound: 'default'");
        }
    });

    // the check 'data_storage_model'
    if (!localStorage['data_storage_model'] || localStorage['data_storage_model'] != '2.0') {

        if (localStorage['data_storage_model'] != '1.0')
            localStorage.clear();
        else
            cleanupLegacyStorage();

        localStorage['data_storage_model'] = '2.0';
    }
    if (!localStorage['planet_storage_model'] || localStorage['planet_storage_model'] != '1.0') {
        //clear old format
        localStorage.setItem('planets', encode([]));
        localStorage.setItem('systems', encode([]));
        localStorage.setItem('planet_storage_model', '1.0');
    }

    function LoginViewModel() {
        var self = this;

        self.hasCmdLineTicket = ko.observable(false);
        self.pageMessage = ko.observable();

        self.hasSteamClient = ko.observable().extend({ session: 'has_steam_client' });
        self.isSteamClientOnline = ko.observable().extend({ session: 'is_steam_client_online' });
        self.useSteam = ko.computed(function () {
            return self.hasSteamClient() && self.isSteamClientOnline();
        });
        self.notUsingSteam = ko.computed(function () {
            return !self.useSteam();
        });

        self.firstTimeMusic = ko.observable(true).extend({ session: 'first_time_music' });

        self.displayMode = ko.observable().extend({ session: 'display_mode' });

        self.readyToLogin = ko.observable(false);
        self.modeArray = ['startup', 'sign-in', 'ready']
        self.mode = ko.observable(0).extend({ session: 'start_mode' });

        self.hasSetupInfo = ko.observable().extend({ session: 'has_setup_info' });

        self.modeString = ko.computed(function () { return self.modeArray[self.mode()]; });
        self.showingSignIn = ko.computed(function () { return self.mode() === 1 && !self.useSteam() && !self.hasCmdLineTicket(); });
        self.showingReady = ko.computed(function () { return self.mode() === 2; });

        self.ajaxCallsInFlight = ko.observable(0);
        self.waitingForAjax = ko.computed(function () { return self.ajaxCallsInFlight() > 0; });

        self.usernameError = ko.observable('');
        self.emailError = ko.observable('');
        self.passwordError = ko.observable('');

        self.startupSequencePosition = ko.observable(5);
   
        self.introVideoEndPromise = $.Deferred();

        self.waitForIntroVideoEnd = ko.observable(true).extend({ session: 'wait_for_intro_video_end' });
        ko.computed(function() {
            if (!self.waitForIntroVideoEnd())
                self.introVideoEndPromise.resolve();
            else
                self.introVideoEndPromise = $.Deferred();
        });
        
        self.gotoLinkUberNetWithSteam = function () {
            self.introVideoEndPromise.then(function () {
                self.startupSequencePosition(0);
                $("#accountLink").dialog('open');
            });
        };

        self.gotoCreateUberNetAccount = function () {
            self.introVideoEndPromise.then(function () {
                self.startupSequencePosition(1);
                $("#accountLink").dialog('open');
            });
        }

        self.startupSequenceLinkUberNetWithSteam = ko.computed(function () { return self.startupSequencePosition() === 0; });
        self.startupSequenceCreateUberNetAccount = ko.computed(function () { return self.startupSequencePosition() === 1; });
        self.startupSequenceRetreiveUsernameAndPassword = ko.computed(function () { return self.startupSequencePosition() === 2; });
        self.startupSequenceConfirmSuccess = ko.computed(function () { return self.startupSequencePosition() === 3; });
        self.startupSequenceConfirmEmailSent = ko.computed(function () { return self.startupSequencePosition() === 4; });

        self.steamLoginComplete = ko.observable(0).extend({ local: 'steam_login_complete' });

        self.inStartupSequence = ko.computed(function () { return self.startupSequencePosition() < 5; });
        self.inRegionSetup = ko.observable(false);
        self.inMainMenu = ko.computed(function () { return !self.inStartupSequence() && !self.inRegionSetup(); });

        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });
        self.nextSceneUrl = ko.observable().extend({ session: 'next_scene_url' });

        self.email = ko.observable('');
        self.passwordConfirm = ko.observable('');
 
        self.isLocalGame = ko.observable(false).extend({ session: 'isLocalGame' });

        self.preferredCommander = ko.observable().extend({ local: 'preferredCommander_v2' });
        self.hasEverSelectedCommander = ko.observable().extend({ local: 'hasEverSelectedCommander_v2' });
        self.commanderImgList = ['coui://ui/main/shared/img/commanders/img_imperial_theta.png'
                                    , 'coui://ui/main/shared/img/commanders/img_raptor_nemicus.png'
                                    , 'coui://ui/main/shared/img/commanders/img_quad_osiris.png'
                                    , 'coui://ui/main/shared/img/commanders/img_tank_aeson.png'
                                    , 'coui://ui/main/shared/img/commanders/img_raptor_rallus.png'
                                    , 'coui://ui/main/shared/img/commanders/img_raptor_centurion.png'];
        self.commanderImgList = _.shuffle(self.commanderImgList);
        self.commanderImg = ko.computed(function () { return typeof self.preferredCommander() === 'object' && self.hasEverSelectedCommander() ? self.preferredCommander().ImgSource : self.commanderImgList[0] });

        self.lobbyId = ko.observable();
        self.gameTicket = ko.observable('').extend({ session: 'gameTicket' });
        self.gameHostname = ko.observable().extend({ session: 'gameHostname' });
        self.gamePort = ko.observable().extend({ session: 'gamePort' });

        self.password = ko.observable('');
        self.uberName = ko.observable('').extend({ local: 'uberName' });
        self.uberUserInfo = ko.observable({}).extend({ session: 'uberUserInfo' });
        self.uberId = api.net.uberId;

        self.displayName = ko.observable('').extend({ session: 'displayName' });
        self.displayNameRule = ko.computed(function() {
            var userInfo = self.uberUserInfo();
            var bestName = self.uberName();

            if (!_.isEmpty(userInfo)) {
                if (userInfo.TitleDisplayName)
                    bestName = userInfo.TitleDisplayName;
                else if (userInfo.DisplayName)
                    bestName = userInfo.DisplayName;
                else if (userInfo.UberName)
                    bestName = userInfo.UberName;
            }

            self.displayName(bestName);
        });
        
        self.uberbarIdentifiers = ko.computed(function () {
            return {
                'uber_id': self.uberId(),
                'uber_name': self.uberName(),
                'display_name': self.displayName()
            }
        });
        self.uberbarIdentifiers.subscribe(function () {
            api.Panel.message('uberbar', 'uberbar_identifiers', self.uberbarIdentifiers());
        });

        self.jabberToken = ko.observable().extend({ session: 'jabberToken' });

        self.buildVersion = ko.observable().extend({ session: 'build_version' });
        self.ubernetBuildVersion = ko.observable().extend({ session: 'ubernet_build_version' });
        self.buildOk = ko.computed(function () { return self.ubernetBuildVersion() ? self.buildVersion() >= self.ubernetBuildVersion() : false });

        self.videoToPlayFullScreen = ko.observable('');
        
        self.videoToPlayAutoplay = ko.observable(false);
        self.videoAutoplayString = ko.computed(function () {
            return self.videoToPlayAutoplay() ? '1' : '0';
        });

        self.videoToPlayFullScreenIframeSource = ko.computed(function () { return 'http://www.youtube.com/embed/' + self.videoToPlayFullScreen() + '?modestbranding=1&amp;rel=0&amp;autoplay=' 
                + self.videoAutoplayString() + '&amp;showinfo=0&amp;controls=0&amp;HD=1;vq=hd1080'; })
        self.videoTitleFullScreen = ko.observable('Planetary Annihilation');
        self.videoLaunchExternal = function () {
            api.youtube.launchPage(self.videoToPlayFullScreen());
            stopVideo();
        }

        self.os = ko.observable('').extend({ session: 'os' });
        self.uberNetRegion = ko.observable().extend({ local: 'uber_net_region' });
        self.selectedUberNetRegion = ko.observable();
        self.uberNetRegions = ko.observableArray().extend({ session: 'uber_net_regions' });
        self.hasUberNetRegion = ko.computed(function () { return self.uberNetRegions().length ? true : false; });
        self.redirectToServer = ko.observable(false);
        self.redirectToReplay = ko.observable(false);
        self.redirectToCustomGame = ko.observable(false);
        self.redirectToGalacticWar = ko.observable(false);
        self.redirectToAISkirmish = ko.observable(false);

        self.lastNewsSeen = ko.observable(0).extend({ local: 'lastNewsSeen' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });
        self.useUbernetdev = ko.observable(false).extend({ session: 'use_ubernetdev' });
        self.normalMode = ko.computed(function () { return !self.devMode() });

        self.useLocalServer = ko.observable(false).extend({ session: 'use_local_server' });
        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });
        self.joinLocalServer = ko.observable().extend({ session: 'join_local_server' });

        self.jabberAuthentication = ko.computed(function () {
            return {
                'uber_id': self.uberId(),
                'jabber_token': self.jabberToken(),
                'use_ubernetdev': self.useUbernetdev()
            };
        });
        self.resetJabber = (function () {
            var previous = {};

            return function (value) {
                if (!self.uberId() || !self.jabberToken() || JSON.stringify(value) === JSON.stringify(previous))
                    return;

                previous = value;
                api.Panel.message('uberbar', 'jabber_authentication', self.jabberAuthentication());
            }
        })();

        self.jabberAuthentication.subscribe(self.resetJabber);

        self.showConnecting = ko.observable(false);
        self.showReconnect = ko.observable(false);
        self.showError = ko.observable(false);

        self.showNewBuild = ko.observable(false);

        self.signalRecompute = ko.observable();
        self.welcomeVideoId = ko.observable('PgVIMcFlWvQ'); // old: vGGCeWLlFFI, wrHcJpGxcK4
        self.helpVideoId = ko.observable('1zedpeYS0_s'); //old: DGW5Nmwyeqc //new: E7Zp32Nlu7Q //newest: http://youtu.be/
        self.showVideo = ko.observable(false);
        self.showHelpVideo = ko.observable(false);
        self.currentVideoId = ko.computed(function () { return (self.showHelpVideo()) ? self.helpVideoId() : self.welcomeVideoId() });

        self.videoDialogHeight = ko.computed(function () {
            self.signalRecompute(); /* create dependency */
            return window.innerHeight - 10;
        });
        self.videoDialogWidth = ko.computed(function () {
            self.signalRecompute(); /* create dependency */
            return window.innerWidth - 10;
        });
        self.videoHeight = ko.computed(function () {
            self.signalRecompute(); /* create dependency */
            return window.innerHeight - 230;
        });
        self.videoWidth = ko.computed(function () {
            self.signalRecompute(); /* create dependency */
            return window.innerWidth - 200;
        });

        self.isUberNetRegionAvailable = ko.computed(function () {
            var i;

            for (i = 0; i < self.uberNetRegions().length ; i++)
                if (self.uberNetRegions()[i].Name === self.uberNetRegion())
                    return true;

            return false;
        });

        self.showUberNetGames = ko.computed(function () {
            return self.hasUberNetRegion();
        });

        self.allowUbernetActions = ko.computed(function () {
            return self.uberId().length > 0;
        });

        self.allowNewOrJoinGame = ko.computed(function () {
            return self.allowUbernetActions() || self.devMode();
        });

        self.videoLoaded = ko.observable(false);

        self.linkUberNetAndSteam = function () {

            self.usernameError('');
            self.passwordError('');

            engine.asyncCall("ubernet.linkSteamRequest", self.uberName(), self.password())
                .done(function (data) {
                    data = JSON.parse(data);

                    console.log(data);

                    self.uberUserInfo(data);
                    self.uberName(data.UberName);
                    self.uberId(data.UberIdString);
                    self.jabberToken(data.SessionTicket);

                    self.signedInToUbernet(true);
                    self.mode(2);
                    self.requestRegions();
                    self.getGameWithPlayer();
                    updateCatalog(
                        function () {
                            if (self.showConnecting()) {
                                self.showConnecting(false);
                                $("#connecting").dialog("close");
                            }
                        });

                    self.startupSequencePosition(3);
                })
                .fail(function (data) {
                    var r = JSON.parse(data);

                    switch (r.ErrorCode) {
                        case 1:
                            var message = loc('!LOC(start:invalid_user_name_or_password.message):Invalid user name or password');
                            self.usernameError(message);
                            self.passwordError(message);
                            break;

                        case 2:
                            self.usernameError(loc('!LOC(start:user_account_has_not_been_linked_to_steam.message):User account has not been linked to steam.'));
                            break;

                        case 3:
                            self.usernameError(loc('!LOC(start:playfab_account_already_linked_to_a_different_steam_account.message):PlayFab account already linked to a different Steam account'));
                            break;

                        case 5:
                            self.usernameError(loc('!LOC(start:problem_with_steam_account.message):Problem with Steam Account.'));
                            self.passwordError(loc('!LOC(start:please_try_to_link_your_account_at.message):Please try to link your account at') + ' https://uberent.com/user/linksteam');
                            break;

                        case 7:
                            self.usernameError(loc('!LOC(start:your_account_has_been_banned.message):Your account has been banned.'));
                            self.passwordError('');
                            break;

                        case 8:
                            self.usernameError(loc('!LOC(start:this_title_has_not_been_activated.message):This title has not been activated.'));
                            self.passwordError('');
                            break;

                        case 9:
                            self.usernameError(loc('!LOC(start:your_steam_account_does_not_own_this_application.message):Your steam account does not own this application.'));
                            self.passwordError('');
                            break;

                        default:
                            if (!r.Message)
                                r.Message = loc('!LOC(start:an_unknown_error_has_occurred.message):An unknown error has occurred.');
                            self.usernameError(r.Message);
                            self.passwordError('');
                            break;
                    }
                });
        }

        self.createUberNetAccount = function () {
            engine.asyncCall("ubernet.createUberNetAccount",
                             self.uberName(),
                             self.email(),
                             self.password(),
                             self.passwordConfirm())
                .done(function (data) {
                    var data = JSON.parse(data);

                    console.log('createUberNetAccount done');
                    console.log(data);

                    self.uberUserInfo(data);
                    self.uberName(data.UberName);
                    self.uberId(data.UberIdString);
                    self.jabberToken(data.SessionTicket);

                    self.signedInToUbernet(true);
                    self.mode(2);
                    self.requestRegions();
                    self.getGameWithPlayer();
                    updateCatalog(
                        function () {
                            if (self.showConnecting()) {
                                self.showConnecting(false);
                                $("#connecting").dialog("close");
                            }
                        });

                    self.startupSequencePosition(3);
                })
                .fail(function (data) {
                    var r = JSON.parse(data);
                    var described = false;

                    if (r.ErrorCode === 6 && r.Errors && r.Errors.UserName) {
                        self.usernameError(loc('!LOC(start:username_already_exists.message):Username already exists'));
                        described = true;
                    }

                    if (r.ErrorCode === 7 && r.Errors && r.Errors.Email) {
                        self.emailError(loc('!LOC(start:email_address_already_exists.message):Email address already exists'));
                        described = true;
                    }

                    if (r.ErrorCode === 400 && r.Errors && r.Errors.ConfirmPassword) {
                        self.passwordError(loc('!LOC(start:passwords_are_different.message):Passwords are different'));
                        described = true;
                    }

                    if (r.ErrorCode === 400 && r.Errors && r.Errors.UserName) {
                        self.usernameError(r.Errors.UserName[0]); // ###chargrove $TODO needs loc?
                        described = true;
                    }

                    if (r.ErrorCode === 400 && r.Errors && r.Errors.Email) {
                        self.emailError(loc('!LOC(start:email_address_is_invalid.message):Email address is invalid'));
                        described = true;
                    }

                    if (!described) {
                        self.usernameError(loc('!LOC(start:an_unknown_error_has_occurred.message):An unknown error has occurred.'));
                    }
                });
        };

        function authenticateHelper(/* varargs */) {
            engine.asyncCall.apply(engine, arguments)
                .done(function (data_str) {
                    var data = JSON.parse(data_str);

                    self.uberUserInfo(data);
                    self.uberName(data.UberName);
                    self.uberId(data.UberIdString);

                    if (data.SessionTicket)
                        self.jabberToken(data.SessionTicket);

                    self.signedInToUbernet(true);
                    self.mode(2);
                    self.requestRegions();
                    self.getGameWithPlayer();
                    updateCatalog(
                        function () {
                            if (self.showConnecting()) {
                                self.showConnecting(false);
                                $("#connecting").dialog("close");
                            }
                        });

                    api.settings.load(true /* force */, false /* local */).then(function () {
                        api.settings.apply(['graphics', 'audio', 'camera', 'ui', 'twitch']);
		            });
                 
                    model.startupSequencePosition(5);
                    $("#accountLink").dialog("close");
                })
                .fail(function (error_str) {
                    var error = JSON.parse(error_str);

                    self.signedInToUbernet(false);
                    self.hasCmdLineTicket(false);

                    $("#connecting").dialog("close");

                    function showErrorDialog(exit_on_close, extra_info) {
                        /* we could also show the error message from playfab (error.Message), however the client side messages for the error code are localized.  
                           the client side messages were generated to match the playfab messages. */
                        $("#errorText").html(extra_info);
                        $("#error").dialog('open');
                        self.showError(true);
                    }
                    switch (error.ErrorCode) {
                        case -1: showErrorDialog(false, "Client Error -1."); break; /* Custom client error */
                        case -2: showErrorDialog(false, "Client Error -2."); break; /* Custom client error */
                        case -3: showErrorDialog(false, "Client Error -3."); break; /* Custom client error */
                        case -4: showErrorDialog(false, "Client Error -4."); break; /* Custom client error */
                        case -5: showErrorDialog(false, "Client Error -5: Invalid session ticket, please log in again."); break; /* Custom client error */
                        case 1: showErrorDialog(false, loc("!LOC(start:incorrect_username_or_password_please_check_your_entry_and_try_again.message):Incorrect username or password. Please check your entry and try again.")); break; /* InvalidUsernameOrPassword */
                        case 2: self.gotoLinkUberNetWithSteam(); break; /* UserNotLinkedToSteam */
                        case 3: showErrorDialog(true, loc("!LOC(start:this_shouldn_t_happen_please_contact_us_at.message):This shouldn't happen. Please contact us at") + " support@uberent.com"); break; /* Not Possible */
                        case 4: showErrorDialog(true, loc("!LOC(start:this_shouldn_t_happen_please_contact_us_at.message):This shouldn't happen. Please contact us at") + " support@uberent.com"); break; /* Not Possible */
                        case 5: showErrorDialog(false, loc("!LOC(start:there_is_a_problem_with_steam_please_restart_steam_and_try_again_or_login_using_your_playfab_credentials.message):There is a problem with Steam. Please restart Steam and try again or login using your PlayFab credentials.")); break; /* InvalidSteamTicket */
                        case 6: self.gotoCreateUberNetAccount(); break; /* RegistrationIncomplete */
                        case 7: showErrorDialog(true, loc("!LOC(start:your_account_has_been_banned_if_you_believe_this_is_in_error_contact_us_at.message):Your account has been banned. If you believe this is in error, contact us at") + " support@uberent.com"); break; /* AccountBanned */
                        case 8: showErrorDialog(true, "Opps! We can't find the game in your account.  If you are a Steam user, please restart Steam and try again.  If the problem persists, contact us at" + " support@uberent.com"); break; /* TitleNotActivated */

                        default: showErrorDialog(false, loc("!LOC(start:unknown_error_please_contact_us_at.message):Unknown Error.  Please contact us at") + " support@uberent.com"); break;
                    }
                });
        }

        self.authenticateWithCmdLineTicket = function () {
            authenticateHelper("ubernet.authenticateWithCmdLineTicket");
        }

        self.authenticateWithUberNetLogin = function () {
            authenticateHelper("ubernet.authenticateWithUberNetLogin",
                               self.uberName(),
                               self.password());
        }

        self.authenticateWithSteamTicket = function () {
            authenticateHelper("ubernet.authenticateWithSteamTicket");
        }

        self.ubernetLoginIn = function () {

            self.showConnecting(true);
            $("#msg_progress").text(loc("!LOC(start:connecting_to_playfab.message):Connecting to PlayFab"));
            $("#connecting").dialog('open');

            if (self.hasCmdLineTicket())
                self.authenticateWithCmdLineTicket();
            else if (self.useSteam())
                self.authenticateWithSteamTicket();
            else
                self.authenticateWithUberNetLogin();
        };

        self.ubernetLogout = function () {
            self.mode(1);
            self.uberId('');
            self.jabberToken('');
            self.signedInToUbernet(false);
        };

        self.requestRegions = function () {
            engine.asyncCall("ubernet.getGameServerRegions").then(
                function (data, status) {
                    var i;

                    data = JSON.parse(data);

                    if (data.Regions) {
                        self.uberNetRegions([]);

                        for (i = 0; i < data.Regions.length; i++) {
                            self.uberNetRegions.push(data.Regions[i]);
                        }
                    }
                },
                function (error) {
                    console.log('regions:fail: ' + error);
                }
            );
        }

        self.joinGame = function (lobbyId) {

            self.showConnecting(true);
            $("#msg_progress").text(loc("!LOC(start:reconnecting_to_game.message):Reconnecting to Game"));
            $("#connecting").dialog('open');

            engine.asyncCall("ubernet.joinGame", lobbyId).done(function (data) {

                data = JSON.parse(data);

                self.isLocalGame(false);
                self.gameTicket(data.Ticket);
                self.gameHostname(data.ServerHostname);
                self.gamePort(data.ServerPort);

                window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html';
                return; /* window.location.href will not stop execution. */
            }).fail(function (data) {
                console.log('join game:fail');
            }).always(function () {
                if (model.showConnecting()) {
                    model.showConnecting(false);
                    $("#connecting").dialog("close");
                }
            });
        };

        self.abandon = function () {
            engine.asyncCall("ubernet.removePlayerFromGame");
        }

        self.getGameWithPlayer = function () {
            engine.asyncCall("ubernet.getGameWithPlayer").done(function (data) {
                data = JSON.parse(data);
                if (data.PlayerInGame) {
                    // show reconnect / abandon
                    self.showReconnect(true);
                    self.lobbyId(data.LobbyID);
                    $("#reconnectDlg").dialog('open');
                }
            });
        }

        self.getUbernetBuildNumber = function () {
            if (!model.devMode()) {
                engine.asyncCall("ubernet.getCurrentClientVersion").then(function (data) {
                    var old_version = model.ubernetBuildVersion();
                    model.ubernetBuildVersion(data);

                    if (!self.buildOk() && old_version !== model.ubernetBuildVersion()) {
                        self.showNewBuild(true);
                        $(".div_build_number_dialog").dialog('open');
                    }
                });
            }
        }

        self.startQuickMatch = function () {
            if (model.uberNetRegion() && model.isUberNetRegionAvailable()) {
                model.inRegionSetup(false);
                window.location.href = 'coui://ui/main/game/matchmaking/matchmaking.html';
                return; /* window.location.href will not stop execution. */
            }
            else {
                model.inRegionSetup(true);
                $("#regionDlg").dialog('open');
            }
        }

        this.navToLocalJoin = function () {
            self.joinLocalServer(true);
            self.gameHostname('localhost');
            self.gamePort(6543);
            window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html';
            return; /* window.location.href will not stop execution. */    
        }

        this.navToServerBrowser = function () {
            if (!self.allowNewOrJoinGame())
                return;

            self.redirectToServer(true);
            if (model.devMode() || (model.uberNetRegion() && model.isUberNetRegionAvailable())) {

                model.inRegionSetup(false);
                window.location.href = 'coui://ui/main/game/server_browser/server_browser.html';
                return; /* window.location.href will not stop execution. */
            }
            else {
                model.inRegionSetup(true);
                $("#regionDlg").dialog('open');
            }
        }

        this.navToArmory = function () {
            if (!self.allowUbernetActions())
                return;

            window.location.href = 'coui://ui/main/game/armory/armory.html';
            return; /* window.location.href will not stop execution. */
        }

        this.navToSocial = function () {
            if (!self.allowUbernetActions())
                return;

            window.location.href = 'coui://ui/main/game/social/social.html';
            return; /* window.location.href will not stop execution. */
        }

        this.navToReplayBrowser = function () {
            if (!self.allowUbernetActions())
                return;

            self.redirectToReplay(true);
            if (model.devMode() || (model.uberNetRegion() && model.isUberNetRegionAvailable())) {
                model.inRegionSetup(false);
                window.location.href = 'coui://ui/main/game/replay_browser/replay_browser.html';
                return; /* window.location.href will not stop execution. */
            }
            else {
                model.inRegionSetup(true);
                $("#regionDlg").dialog('open');
            }
        }

        this.navToSettings = function () {
            window.location.href = 'coui://ui/main/game/settings/settings.html';
            return; /* window.location.href will not stop execution. */
        }

        self.showSinglePlayerMenu = ko.observable(false);
        self.toggleSinglePlayerMenu = function() {
            if (!self.allowNewOrJoinGame())
                return;
            self.showSinglePlayerMenu(!self.showSinglePlayerMenu());
        };
        self.galacticWarMode = ko.observable('');
        this.navToGalacticWar = function () {
            self.redirectToGalacticWar(true);
            if (model.devMode() || (model.uberNetRegion() && model.isUberNetRegionAvailable())) {
                model.inRegionSetup(false);
                window.location.href = 'coui://ui/main/game/galactic_war/gw_start/gw_start.html?mode=' + self.galacticWarMode();
                return; /* window.location.href will not stop execution. */
            }
            else {
                model.inRegionSetup(true);
                $("#regionDlg").dialog('open');
            }
        }
        self.navToAISkirmish = function() {
            self.redirectToAISkirmish(true);
            if (self.devMode() || (self.uberNetRegion() && self.isUberNetRegionAvailable())) {
                self.inRegionSetup(false);
                self.lastSceneUrl(window.location.href);
                window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html?action=start';
                return; 
            }
            else {
                model.inRegionSetup(true);
                $("#regionDlg").dialog('open');
            }
        };

        this.navToNewPlanet = function () {
            window.location.href = 'coui://ui/main/game/system_editor/system_editor.html';
            return; /* window.location.href will not stop execution. */
        }

        this.navToEditPlanet = function () {
            self.nextSceneUrl('coui://ui/main/game/system_editor/system_editor.html');
            window.location.href = 'coui://ui/main/game/load_planet/load_planet.html';
            return; /* window.location.href will not stop execution. */
        }

        self.finishRegionSetup = function () {
            model.uberNetRegion(model.selectedUberNetRegion());

            if (!self.uberNetRegion())
                return; /* do nothing */

            if (self.redirectToServer())
                return self.navToServerBrowser();

            if (self.redirectToCustomGame())
                return self.navToCustomGame();

            if (self.redirectToReplay())
                return self.navToReplayBrowser();
            
            if (self.redirectToGalacticWar())
                return self.navToGalacticWar();

            if (self.redirectToAISkirmish())
                return self.navToAISkirmish();

            return self.startQuickMatch();
        }

        self.showCredits = function () {
            $(".div_credits_dialog").dialog('open');
        };
        self.launchCredits = function() {
            self.galacticWarMode('credits');
            self.navToGalacticWar();
        };
        
        self.showKickstarters = function () {
            $(".div_kickstarter_dialog").dialog('open');
        }

        self.newsItems = ko.observableArray([]);
        self.hidePatchNotes = ko.observable(true);
        self.showPatchNotes = ko.computed(function () { return self.inMainMenu() && self.newsItems().length && !self.hidePatchNotes(); });
        self.patchNotesDate = ko.observable();

        self.currentPatchNotesVersion = ko.observable();
        self.lastPatchNotesSeen = ko.observable().extend({ local: 'patch_notes_version' });
        self.showPatchNoteAreNew = ko.computed(function () { return self.currentPatchNotesVersion() !== self.lastPatchNotesSeen() });

        self.fetchTwitchChannels = function () {
            api.twitch.requestLiveStreamList();
        };

        self.fetchPatchNews = function () {
            var html;
            var i;

            var replaceHtmlEntites = (function () {
                var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
                var translate = {
                    "nbsp": " ",
                    "amp": "&",
                    "quot": "\"",
                    "lt": "<",
                    "gt": ">"
                };
                return function (s) {
                    return (s.replace(translate_re, function (match, entity) {
                        return translate[entity];
                    }));
                }
            })();

            function formatDateFromTimestamp(timestamp) {
                var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

                // input format example: '2013-07-24.00:48:37'

                var year = timestamp.slice(0, 4);
                var month = months[Number(timestamp.slice(5, 7)) - 1];
                var day = timestamp.slice(8, 10);

                return '' + month + ' ' + day + ' ' + year;
            }

            $.ajax({
                type: "GET",
                url: "http://uberent.com/GameClient/GetNews?titleid=4&count=1",
                contentType: "application/json",
                success: function (data, textStatus) {
                    self.newsItems([data.News[0].HtmlBody]);
                    self.currentPatchNotesVersion(data.News[0].Title);
                    self.patchNotesDate(formatDateFromTimestamp(data.News[0].Timestamp));

                }
            });
        }

        self.showYoutubeVideo = ko.observable(false);

        self.onResize = function () {
            self.signalRecompute.notifySubscribers();
            $(".ytv-list").height($(window).height() - 68);
            $("#updates").height($(window).height() - 68);
            $("#twitch-wrapper").height($(window).height() - 68);
        }

        self.twitchLiveStream = ko.observableArray([]);

        self.modalBack = function () {
            api.Panel.message(api.Panel.parentId, "finish_video");
        }

        self.startMusic = function () {
            if (self.firstTimeMusic()) {
                self.firstTimeMusic(false);
                engine.call('audio.setMusic', '/Music/Main_Menu_Music');
            }
            else {
                engine.call('audio.setMusic', '/Music/Main_Menu_Music_return_from_game');
            }
        }

        self.setup = function() {
            self.isLocalGame(false);

            api.file.unmountAllMemoryFiles();
            api.game.setUnitSpecTag('');
            engine.call('reset_game_state');

            var needsLogin = !self.signedInToUbernet() && (self.hasCmdLineTicket() || self.useSteam());
            if (!self.hasSetupInfo() || needsLogin) {
                api.game.getSetupInfo().then(function(payload) { 
                    self.hasSetupInfo(true);
                    self.buildVersion(payload.version);
                    self.os(payload.os);
                    self.devMode(payload.dev_mode);
                    self.useUbernetdev(payload.use_ubernetdev);
                    self.useLocalServer(payload.dev_mode);

                    self.hasCmdLineTicket(payload.has_cmdline_ticket);
                    self.hasSteamClient(!!payload.has_steam);
                    self.isSteamClientOnline(!!payload.steam_online);

                    self.signedInToUbernet(false);

                    if (self.hasCmdLineTicket() || self.useSteam())
                        self.ubernetLoginIn();
                    self.mode(1);
                    
                    api.settings.load(true /* force */, false /* local */).then(function () {
                        api.settings.apply(['graphics', 'audio', 'camera', 'ui', 'twitch']);
					});

                    if (payload.username) 
                        self.uberName(payload.username);
                    
                    self.readyToLogin(true);

                    self.getUbernetBuildNumber();
                });
                engine.call('request_display_mode');
            }

            $("#signin, #reconnect, #abandon").button();

            self.lastSceneUrl('coui://ui/main/game/start/start.html');

            self.fetchPatchNews();
            self.fetchTwitchChannels();

            $(window).resize(self.onResize);
            self.onResize();

            api.Panel.message('uberbar', 'lobby_info' /*, undefined */);
            api.Panel.message('uberbar', 'visible', { value: true });
            api.Panel.message(gPanelParentId, 'live_game_uberbar', { 'value': false });

            setInterval(self.update, 500);
            setInterval(self.getUbernetBuildNumber, 60000);
            setInterval(self.requestRegions, 60000);
            setInterval(self.fetchTwitchChannels, 20000);
        };
    }
    model = new LoginViewModel();

    handlers = {};

    handlers.display_mode = function (payload) {

        switch (payload.mode) {
            case 'FULLSCREEN': model.displayMode('FULLSCREEN');
            case 'WINDOWED': model.displayMode('WINDOWED');
            default: model.displayMode('WINDOWED');
        }
    }

    handlers.twitch_live_game_list = function (payload) {
        model.twitchLiveStream(payload);
    }

    handlers.display_name = function (payload) {
        if (payload.display_name)
            model.displayName(payload.display_name);
    }

    handlers.video_complete = function () {
        model.startMusic();
        model.waitForIntroVideoEnd(false);
    }

    //initalize dialogs
    $(".div_credits_dialog").dialog({
        width: 800,
        height: 630,
        modal: true,
        autoOpen: false,
        dialogClass: 'credits_wrapper'
    });

    $(".div_kickstarter_dialog").dialog({
        width: 800,
        height: 590,
        modal: true,
        autoOpen: false,
        dialogClass: 'credits_wrapper'
    });

    $("#accountLink").dialog({
        dialogClass: 'credits_wrapper',
        dialogClass: "no-close",
        draggable: false,
        resizable: false,
        modal: true,
        height: 400,
        width: 1024,
		autoOpen: false,
        closeOnEscape: false
    });

    $("#error").dialog({
        dialogClass: "signin_notification",
        draggable: false,
        resizable: false,
        height: 400,
        width: 800,
        modal: true,
        autoOpen: false,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
                model.showError(false);
                model.mode(1);
            }
        }
    });

    $("#connecting").dialog({
        dialogClass: "signin_notification",
        draggable: false,
        resizable: false,
        height: 100,
        width: 500,
        modal: true,
        autoOpen: false,
        buttons: {}
    });

    $("#reconnectDlg").dialog({
        dialogClass: "no-close",
        draggable: false,
        resizable: false,
        height: 400,
        width: 600,
        modal: true,
        autoOpen: false,
        complete: function (data, textStatus) {
            model.showReconnect(false);
        },
        buttons: {
            "RECONNECT": function () {
                $(this).dialog("close");
                console.log("reconnect");
                model.joinGame(model.lobbyId());
                model.showReconnect(false);
            },
            "ABANDON": function () {
                console.log("abandon");
                model.abandon();
                model.showReconnect(false);
                $(this).dialog("close");
            }
        }
    });

    $(".div_build_number_dialog").dialog({
        dialogClass: "no-close",
        draggable: false,
        resizable: false,
        height: 400,
        width: 600,
        modal: true,
        autoOpen: false,
        closeOnEscape: false,
        buttons: {
            "EXIT": function () {
                model.exit();
            },
            "LATER": function () {
                $(this).dialog("close");
                model.showNewBuild(false);
            }
        }
    });

    $("#regionDlg").dialog({
        dialogClass: "no-close",
        draggable: false,
        resizable: false,
        height: 600,
        width: 800,
        modal: true,
        autoOpen: false,
        closeOnEscape: false,
        buttons: {
            "CONFIRM": function () {
                $(this).dialog("close");
                model.finishRegionSetup();
            }
        }
    });

    // inject per scene mods
    if (scene_mod_list['start'])
        loadMods(scene_mod_list['start']);

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    model.setup();
});

function endYoutubeVideoSequence() {
    model.lastNewsSeen(3);
    stopVideo();
}

function startYoutubeVideoSequence(videoId, videoTitle, autoplay) {

    model.videoToPlayAutoplay(autoplay || false);
    model.videoTitleFullScreen(videoTitle);
    model.videoToPlayFullScreen(videoId);
    setTimeout(fade_out_music(-1), 10);

    $(".div_news_video").dialog({
        width: '' + model.videoDialogWidth(),
        height: '' + model.videoDialogHeight(),
        close: endYoutubeVideoSequence,
        show: "scale",
        hide: "scale",
        modal: true,
        title: videoTitle
    });
}

function stopVideo() {
    setTimeout(fade_in_music(0), 10);
    $(".div_news_video").dialog("destroy");
    model.videoTitleFullScreen('No Video Loaded');
    model.videoToPlayFullScreen('');
}

function fade_out_music(lastFade) {

    if (lastFade === -1) /* capture audio level */
        lastFade = api.settings.value('audio', 'music');  

    var fade_value = lastFade - 1;

    if (fade_value >= 0) {
        engine.call("set_volume", 'music', fade_value);
        setTimeout(fade_out_music(fade_value), 100);
        return;
    }
    clearTimeout();
}

function fade_in_music(lastFade) {
    var fade_value_target = api.settings.value('audio', 'music');
    var fade_value = 0;

    fade_value = lastFade + 1;

    if (fade_value < fade_value_target) {
        engine.call("set_volume", 'music', fade_value);
        setTimeout(fade_in_music(fade_value), 100);
    }
    clearTimeout();
}

