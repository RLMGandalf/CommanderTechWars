var globalHandlers = {};
var model = {};
var global_mod_list = [];
var scene_mod_list = [];
var messageLog = {};
var app = {};

function parse(string) {
    var result = '';

    try { result = JSON.parse(string) }
    catch (e) { console.log('failed to parse json: ' + string) }

    return result;
}

function stringfy(object) {
    var result = '';

    try { result = JSON.stringify(object) }
    catch (e) {
        console.log('failed to stringify object:');
        console.log(object);
    }

    return result;
}

function loadHtml(src) {
    var xmlhttp = new XMLHttpRequest();
    try {
        xmlhttp.open("GET", src, false);
        xmlhttp.send();
    }
    catch (err) {
        console.log("error loading " + src);
        return;
    }

    return xmlhttp.responseText;
}


function loadScript(src) {
    var o = new XMLHttpRequest();
    try {
        o.open('GET', src, false);
        o.send('');
    }
    catch (err) {
        console.log("error loading " + src);
        return;
    }
    var se = document.createElement('script');
    se.type = "text/javascript";
    se.text = o.responseText;
    document.getElementsByTagName('head')[0].appendChild(se);
}

function loadCSS(src) {
    var link = document.createElement('link');
    link.href = src;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadMods(list) {
    var i;
    var mod;
    var type;

    var js = /[.]js$/;
    var css = /[.]css$/;

    if (api.Panel.pageName === 'game')
        init_browser();

    for (i = 0; i < list.length; i++) {
        mod = list[i];

        if (mod.match(js))
            loadScript(mod);

        if (mod.match(css))
            loadCSS(mod);
    }
}

// Adds String.endsWith()
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Adds String.startsWith()
if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(prefix) {
        return this.substring(0, prefix.length) === prefix;
    };
};

// usage: embedHtmlWithScript( "foo.html", "#container", "$('#dest') );
//
// Load the 'container' helement from foo.html and appends it to $('#dest').
// Also will ensure that top level script tags in foo.html are executed
//
function embedHtmlWithScript(srcHtml, srcSelector, target, cb) {
    target.load(srcHtml + " " + srcSelector, function () {
        $.get(srcHtml, function (data) {
            $(data).filter("script").each(function (i, script) {
                //console.log(script.src, "loading");
                loadScript(script.src);
            });
            cb();
        });
    });
}

function uuid() {
    var result = '';
    _.times(32, function () {
        result += Math.floor(Math.random() * 16).toString(16).toUpperCase();
    });       
    return result
}

// loc() - primary localization function
//   loc("!LOC(id):original text") -> i18n(id)              // !LOCSKIP this comment is so the loc update script knows to skip this line
//       id found -> translated text (yay!)
//       id not found -> id (uh oh! make the sure id is in the translation json files)
//       original text is ignored at this point (but will be used when you run the loc update script, so keep it intact)
//   loc("!LOC:original text") -> "RUNLOCSCRIPT! " + original text                 // !LOCSKIP this comment is so the loc update script knows to skip this line
//       should only show up if you've marked string for loc (good!) but haven't run the loc update script to generate ids (do it!)
//   loc(any_other_string) -> any_other_string
//       any string without a loc tag is a passthrough, so loc(loc(loc(text))) should equal loc(text)
//   loc(any_non_string) -> any_non_string
//       any non string is a passthrough. this is usefully for many cases where a ko observable needs loc but may be undefined at some point.
function loc(inText, inOptionalArgs) {
    var locTag = "!LOC"; // !LOCSKIP
    if (!_.isString(inText))
        return inText;
    if (inText.substring(0, locTag.length) === locTag) {
        if (inText.charAt(locTag.length) === '(') {
            var remainingText = inText.substring(locTag.length + 1);
            var endParen = remainingText.indexOf(')');
            if (endParen >= 0) {
                var locId = remainingText.substring(0, endParen);
                try {
                    return i18n.t(locId, inOptionalArgs);
                } catch (error) { return "LOCEXCEPTION!"; }
            } else {
                return remainingText;
            }
        } else if (inText.charAt(locTag.length) === ':') {
            return "RUNLOCSCRIPT! " + inText.substring(locTag.length + 1);
        }
    }
    return inText;
}

function locAddNamespace(ns) {
    i18n.loadNamespace(ns, function () { });
}

function locUpdateDocument() {
    $('loc').i18n();
    $('*[locattr]').each(function (i) {
        var locAttrText = $(this).attr("locattr");
        var attrs = locAttrText.split(";");
        for (iAttr in attrs) {
            $(this).attr(attrs[iAttr], loc($(this).attr(attrs[iAttr])));
        }
    });
}

function locInitInternal(localeString) {

    localStorage.setItem('locale', encode(localeString));

    locNamespace = location.pathname.substr(0, location.pathname.lastIndexOf("."));
    locNamespace = locNamespace.substr(locNamespace.lastIndexOf('/') + 1);
    $.i18n.init({
        lng: localeString,
        lowerCaseLng: true,
        resGetPath: '/main/_i18n/locales/__lng__/__ns__.json',
        ns: { namespaces: [locNamespace
            , 'shared'
            //, 'put_any_other_common_namespaces_here'
            ],
            defaultNs: locNamespace
        },
        useLocalStorage: false,
        debug: false,
        getAsync: false // ###chargrove $TODO $PERF had to do this to ensure i18n.t() availability in later initialization; making all translation async-friendly is beyond the scope of my JS skills in the time I have available (a JS ninja may have refactoring ideas though).
    }, function () {
        // release the hold established during locInit()
        $.holdReady(false);
    });
}

function locInit() {
    // delay the ready event until this is done (we need loc available during initialization)
    $.holdReady(true);

    var locale = decode(localStorage['locale']);

    if (!locale && gEngineParams && !_.isUndefined(gEngineParams.locale))
        locale = gEngineParams.locale;

    if (_.isUndefined(locale))
        engine.call('loc.getCurrentLocale').then(function (data) {
            locInitInternal(data);
        });
    else
        locInitInternal(locale);
}

loadCSS("coui://ui/main/shared/css/boot.css");
loadScript("coui://ui/main/shared/js/boot.js");

loadScript("coui://ui/main/shared/js/catalog.js");
function getCatalogItem(item) {
    var result = $.grep(baseCatalog, function (e) { return e.ObjectName == item; });
    if (result.length == 0) {
        return null;
    }
    else if (result.length > 1) {
        console.log("Catalog error -duplicate item " + JSON.stringify(result[0]));
        return null;
    }
    else {
        return result[0];
    }
}

function setLocale(locale) {
    engine.call('loc.setCurrentLocale', locale);
    api.game.debug.reloadScene(api.Panel.pageId);
}

function maybeSetLocale(locale) {
    engine.call('loc.getCurrentLocale').then(function (data) {
        if (locale !== data)
            setLocale(locale);
    });
}

function saveAndApplyLocale(locale) {
    localStorage.setItem('locale', encode(locale));
    maybeSetLocale(locale);
}

function maybeSetLocaleFromStorage() {
    $.holdReady(true);

    var loaded = sessionStorage['has_loaded_locale'],
        locale = decode(localStorage['locale']);

    if (!loaded && locale) {
        sessionStorage.setItem('has_loaded_locale', "true");

        engine.call('loc.getCurrentLocale').then(function (data) {
            if (locale !== data)
                setLocale(locale);
            else
                $.holdReady(false);
        });
    }
    else
        $.holdReady(false);
}

if (api.Panel.pageName === 'game')
    maybeSetLocaleFromStorage();

locInit();

loadScript("coui://ui/mods/ui_mod_list.js");

if (global_mod_list)
    loadMods(global_mod_list);

function encode(object) {
    return JSON.stringify(object);
}

function legacyDecode(string) {
    if (!string)
        return null;

    var index = string.indexOf(':');
    var type = string.slice(0, index);
    var value = string.slice(index + 1);

    try {
        switch (type) {
            case 'null': return null;
            case 'string': return String(value);
            case 'number': return Number(value);
            case 'boolean': return value === "true";
            case 'object': return JSON.parse(value);
            case 'undefined': return undefined;
            case 'function': return undefined;
        }
    }
    catch (error) { return null; }
}

function decode(string) {
    try {
        return JSON.parse(string);
    } catch (error) {
        return legacyDecode(string);
    }
}

function cleanupLegacyStorage() {
    for (var key in localStorage)
        localStorage.setItem(key, encode(decode(localStorage[key])));
}


(function () { /* extend the coherent engine object with an async wrapper */
    var async_requests = {};

    engine.asyncCall = function (/* ... */) {
        var request = new $.Deferred();
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(arguments[0], api.Panel.pageId);
        engine.call.apply(engine, args).then(
            function (tag) {
                async_requests[tag] = request;
            }
        );
        return request.promise();
    };

    function async_result(data) {
        var params = JSON.parse(data);
        var tag = params.tag;
        var success = !!params.success;
        var code = params.code;
        var result = params.result;
        var request = async_requests[tag];
        delete async_requests[tag];
        if (request) {
            if (success)
                request.resolve(result, code);
            else
                request.reject(result, code);
        }
    }
    engine.on("async_result", async_result);
})();



/* from: http://webdesignfan.com/htmlspecialchars-in-javascript/ */
// Create the function.
// First parameter: the string
// Second parameter: whether or not to "undo" the translation
var htmlSpecialChars = function (string, reverse) {

    // specialChars is a list of characters and that to which to translate them.
    // specialChars["<"] = "&lt;";
    // x is merely a variable used in for loops.
    var specialChars = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    }, x;

    // If we are reversing the translation...
    if (typeof (reverse) != "undefined") {

        // We need to create a temporary array.
        reverse = [];

        // Put each special character in the array.
        for (x in specialChars)
            reverse.push(x);

        // Reverse the array.
        // ["<", ">"] becomes [">", "<"]
        reverse.reverse();

        // For each of the special characters,
        for (x = 0; x < reverse.length; x++)

            // Replace all instances (g) of the entity with the original.
            // e.g. if x = 1, then
            // reverse[x] = reverse[1] = ">";
            // specialChars[reverse[x]] = specialChars[">"] = "&gt;";
            string = string.replace(
                new RegExp(specialChars[reverse[x]], "g"),
                reverse[x]
            );

        // Return the reverse-translated string.
        // Returning a value ends the function,
        // therefore no code after this line will execute,
        // therefore no need to use the else conditional.
        return string;
    }

    // If we are not reversing a translation,
    // For each of the special characters,
    for (x in specialChars)

        // Replace all instances of the special character with its entity.
        // Remember, unlike in the reverse algorithm where x is an integer,
        // x here is the key value (e.g. &, <, >, and ")
        string = string.replace(new RegExp(x, "g"), specialChars[x]);

    // Return the translated string.
    return string;
};

var onUbernetLogin;

(function () {
    var refresh_on_login = [];
    var logged_in = false;

    onUbernetLogin = function () {
        _.invoke(refresh_on_login, 'refresh');
        refresh_on_login.length = 0;
        logged_in = true;
    };

    ko.extenders.ubernet = function (target, option) {
        var base_key = option,
            ubernet_key = 'uberData.' + base_key,
            previous = '';

        var updateUbernetData = function (data) {

            if (_.isUndefined(data) || _.isNull(data))
                return;

            var payload = {};
            payload[ubernet_key] = data;

            var payload_string = JSON.stringify(payload);

            if (payload_string !== previous)
                engine.asyncCall("ubernet.updateUserCustomData", JSON.stringify(payload))
                    .done(function (data) {
                        previous = payload_string;
                    })
                    .fail(function (error) {
                        console.log(error);
                        console.log('failed to save ubernet data: ' + base_key);
                    });

            localStorage.setItem(base_key, encode(data)); /* fallback to localstorage */
        };

        target.subscribe(function (value) {
            updateUbernetData(value);
        });

        target.refresh = function () {
            engine.asyncCall("ubernet.getUserCustomData", JSON.stringify([ubernet_key]))
              .done(function (data) {
                  var result;
                  try {
                      if (data)
                          result = JSON.parse(data).Data[ubernet_key];

                      if (_.isUndefined(result) || _.isNull(result))  /* fallback to localstorage */
                          result = decode(localStorage[base_key]);                        
                      
                      if (!_.isUndefined(result) && !_.isNull(result)) {
                          updateUbernetData(result); /* replicate local data to PlayFab */
                          target(result);
                      }

                  } catch (error) {
                      console.log(error);
                      console.log('malformed ubernet data: ' + base_key);
                  }
              })
              .fail(function (error) {
                  console.log(error);
                  console.log('failed to load ubernet data: ' + base_key);
                  var result = decode(localStorage[base_key]);
                  if (!_.isUndefined(result) && !_.isNull(result)) {
                      updateUbernetData(result);  /* replicate local data to PlayFab */
                      target(result);
                  }
              });
        };

        if (!logged_in)
            refresh_on_login.push(target);
        else
            target.refresh();    

        return target;
    };
})();

(function () {
    // add useful binding handlers to knockout

    ko.bindingHandlers.resize = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            valueAccessor()(); // invoke the bound fn once on init 
            UberUtility.addResizeListener(element, valueAccessor()); // invoke the bound fn on each resize
        }
    };

    ko.bindingHandlers.overflow = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            valueAccessor()(); // invoke the bound fn once on init 
            UberUtility.addFlowListener(element, 'over', valueAccessor()); // invoke the bound fn overflow, 
        }
    };

    ko.bindingHandlers.underflow = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            valueAccessor()(); // invoke the bound fn once on init 
            UberUtility.addFlowListener(element, 'under', valueAccessor()); // invoke the bound fn underflow, 
        }
    };

    ko.bindingHandlers.autoscroll = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            /* autoscroll when the valueAccessor changes */
            valueAccessor().subscribe(function (value) {
                var threshold_scroll;
                var current_scroll;

                if (!element || !element.parentNode)
                    return;

                /* only auto scroll if the bar is near the bottom. 
                here 'near' means with 2 times the average item height. 
                a possible improvement would be to scroll as long as the last
                non-zero height element is still visible. */

                threshold_scroll = 2 * element.parentNode.scrollHeight / element.parentNode.children.length;
                current_scroll = element.parentNode.scrollHeight - element.parentNode.clientHeight - element.parentNode.scrollTop;

                if (current_scroll < threshold_scroll)
                    element.scrollIntoView(true);
            });
        }
    };

    ko.bindingHandlers.observeAttributes = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            valueAccessor()(); // invoke the bound fn once on init 

            var observer = new WebKitMutationObserver(function (mutations) {
                valueAccessor()(); // invoke the bound fn wheneve a property of the element *is written to* 
                // if you overwrite an existing value with the same value this will still trigger
            });

            observer.observe(element, { attributes: true, subtree: false });
        }
    };

    ko.bindingHandlers.observeLocalAttributes = {

        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            valueAccessor()(); // invoke the bound fn once on init 

            var observer = new WebKitMutationObserver(function (mutations) {
                valueAccessor()(); // invoke the bound fn whenever a property of the element *is written to* 
                // if you overwrite an existing value with the same value this will still trigger
            });

            var i;
            for (i = 0; i < element.parentElement.children.length; i++)
                observer.observe(element.parentElement.children[i], { attributes: true, subtree: false });

            //observer.observe(element, { attributes: true, subtree: false });
            observer.observe(element.parentElement, { attributes: true, subtree: false });
        }
    };

    ko.bindingHandlers.click_sound = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value === 'default')
                value = '/SE/UI/UI_Click';

            $(element).click(function () {
                api.audio.playSound(value);
            });
        }
    }

    ko.bindingHandlers.rollover_sound = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value === 'default')
                value = '/SE/UI/UI_Rollover';

            $(element).mouseenter(function () { api.audio.playSound(value) });
        }
    }

    ko.bindingHandlers.right_click = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            $(element).mousedown(function (event) {
                if (event.which === 3) {
                    value();
                }
            });
        }
    }

    var last_rollover_group = null;

    /* rollover sounds don't work correctly when the element is recreated in response to a mouse event.
       the rollover sound plays once each time the element is created (assuming the mouse is over the element).
       this binding prevents that behavior by squelching rollover sounds if they come from the same group. */
    ko.bindingHandlers.rollover_sound_exclusive = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

            $(element).mouseenter(function () {

                if (valueAccessor().group !== last_rollover_group) {
                    api.audio.playSound((valueAccessor().sound === 'default') ? '/SE/UI/UI_Rollover' : valueAccessor().sound);
                    last_rollover_group = valueAccessor().group;
                }
            });

            $(element).mouseout(function () { last_rollover_group = null });
        }
    }

    ko.bindingHandlers.selectPicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            if ($(element).is('select')) {

                if (ko.isObservable(valueAccessor())) 
                    ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);

                //replace text with localized text.
                $.each(element, function () {
                    if ($(this).attr('locdata')) {
                        $(this).text(loc($(this).attr('locdata')));
                    }
                });

                $(element)
                    .addClass('selectpicker')
                    .selectpicker();

                var updateValue = function (value) {
                    $(element).selectpicker('val', value);
                    if (ko.isObservable(valueAccessor()))
                        ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor);
                    $(element).selectpicker('refresh');
                };

                var updateOptions = function (options) {
                    $(element).selectpicker('refresh');
                }

                if (ko.isObservable(valueAccessor())) {
                    updateValue(valueAccessor()());
                    valueAccessor().subscribe(updateValue);
                }

                // KO 3 requires subscriptions instead of relying on this binding's update
                // function firing when any other binding on the element is updated.
                var subscriptions = [];

                // Add them to a subscription array so we can remove them when KO
                // tears down the element.  Otherwise you will have a resource leak.
                var addSubscription = function (bindingKey) {
                    var targetObs = allBindingsAccessor.get(bindingKey);

                    var fn = null;
                    if (bindingKey === 'value')
                        fn = function () { updateValue(targetObs()) };
                    if (bindingKey === 'options')
                        fn = function () { updateOptions(targetObs()); };

                    if (targetObs && ko.isObservable(targetObs) && fn) {
                        subscriptions.push(targetObs.subscribe(fn));
                    };
                };

                _.map(['options', 'value'], addSubscription);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    while (subscriptions.length) 
                        subscriptions.pop().dispose();
                });
            }
        }
    };

    ko.bindingHandlers.slider = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            if ($(element).is('input')) {

                var accessor = valueAccessor().value;
                ko.bindingHandlers.value.init(element, accessor, allBindingsAccessor);

                var options = { min: 0, max: 100, step: 1 };
                _.assign(options, valueAccessor().options());
                options.value = accessor();
                
                $(element).slider(options).on('slide', function (ev) {
                    $(this).trigger("change");
                    accessor(ev.value);
                });
            }
        }
    };

    //when using this binding adding a data-placement attribute to the element enables specifying
    //the postionion of the tool tip. (e.g. data-placement="left")
    ko.bindingHandlers.tooltip = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
  
            var update = function (value) {
                $(element).tooltip({
                    title: value,
                    html: true,
                    delay: { show: 0, hide: 100 },
                    animation: 'fadeIn',
                });

                var target = $(element).data("bs.tooltip");
                target.options.title = value;

                //force update if tooltip is visible
                if (target.hoverState === 'in') {
                    $(element).tooltip("hide");
                    $(element).tooltip("show");
                }
            };

            update(ko.utils.unwrapObservable(valueAccessor()));

            if (ko.isObservable(valueAccessor()))
                valueAccessor().subscribe(update);
        }
    }
})();


app.registerWithCoherent = function (model, handlers) {
    var response_key = Math.floor(Math.random() * 65536);
    var responses = {};
    globalHandlers.response = function (msg) {
        if (!msg.hasOwnProperty('key'))
            return;
        var key = msg.key;
        delete msg.key;
        if (!responses[key])
            return;

        var respond = responses[key];
        delete responses[key];
        respond(msg.status === 'success', msg.result);
    };

    globalHandlers.navigate_to = function (url) {
        console.log('navigate_to:' + url);
        window.location.href = url;
        return; /* window.location.href will not stop execution. */
    }

    globalHandlers.create_lobby = function () {
        var lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });
        lastSceneUrl('coui://ui/main/game/start/start.html');
        var local = useLocalServer() ? '&local=true' : '';
        window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html?action=start' + local;
    };

    globalHandlers.join_lobby = function (payload) {
        
        /* Since this is a global handler we can't make any assumptions about the model.
           This sets up the persistance channels that would normally belong in the model. */
        var gameTicket = ko.observable().extend({ session: 'gameTicket' });
        var gameHostname = ko.observable().extend({ session: 'gameHostname' });
        var gamePort = ko.observable().extend({ session: 'gamePort' });
        var joinLocalServer = ko.observable().extend({ session: 'join_local_server' });
        var transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        var transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        var transitDestination = ko.observable().extend({ session: 'transit_destination' });
        var transitDelay = ko.observable().extend({ session: 'transit_delay' });
        var lobbyId = ko.observable().extend({ session: 'lobbyId' });
        var inivite_uuid = ko.observable().extend({ session: 'invite_uuid' });

        inivite_uuid(payload.uuid);

        // Connect to game
        lobbyId(payload.lobby_id);

        api.net.joinGame({ 
            lobbyId: payload.lobby_id,
            host: payload.game_hostname,
            port: payload.game_port || 6543
        })
            .always(function() {
                engine.call('disable_lan_lookout');
            })
            .done(function (data) {
                joinLocalServer(payload.local_game);
                gameTicket(data.Ticket);
                gameHostname(data.ServerHostname);
                gamePort(data.ServerPort);

                // Connect
                window.location.href = 'coui://ui/main/game/connect_to_game/connect_to_game.html';
            })
            .fail(function (data) {
                transitPrimaryMessage('FAILED TO FIND GAME');
                transitSecondaryMessage('Returning to Main Menu');
                transitDestination('coui://ui/main/game/start/start.html');
                transitDelay(5000);
                window.location.href = 'coui://ui/main/game/transit/transit.html';
            });
    }

    function read_message(message, payload) {
        if (handlers[message]) 
            handlers[message](payload);
        else if (globalHandlers[message])
            globalHandlers[message](payload);
    }

    function process_message(string) {
        var message;
        try {
            message = JSON.parse(string);
        } catch (e) {
            console.log('process_message: JSON parsing error');
            console.log(string);
            return;
        }

        var payload;
        if (!message.hasOwnProperty('payload')) {
            payload = _.clone(message);
            delete payload.message_type;
        }
        else
            payload = message.payload;
        read_message(message.message_type, payload);
    }
    engine.on("process_message", process_message);

    function process_signal(string) {
        read_message(string, {});
    }
    engine.on("process_signal", process_signal);

    model.send_message = function (message, payload, respond) {

        var m = {};
        if (payload)
            m.payload = payload;

        m.message_type = message;
        if (respond) {
            m.response_key = ++response_key;
            responses[m.response_key] = respond;
        }

        engine.call("conn_send_message", JSON.stringify(m));
    }

    model.disconnect = function () {
        engine.call("reset_game_state");
    }

    model.exit = function () {
        engine.call("exit");
    }

    app.hello = function (succeed, fail) {
        model.send_message('hello', {}, function (success, response) {
            if (success)
                succeed(response);
            else
                fail(response);
        });
    };

    api.Panel.ready(_.keys(handlers).concat(_.keys(globalHandlers)));
};

// Must be called inside of a script node.  Will load .js, .html, and .css
// For example:
// <script id="mytemplate">
//      app.loadTemplate('coui://ui/main/game/shared/templates/mytemplate');
// </script>
app.loadTemplate = function(baseFileName) {
    var $scriptNode = $('script').last();
    var scriptNode = $scriptNode.get(0);
    
    var $css = $('<link href="' + baseFileName + '.css" rel="stylesheet" type="text/css" />');
    $css.insertBefore($scriptNode);
    scriptNode.type = 'text/html';
    $scriptNode.load(baseFileName + '.html');
    $.getScript(baseFileName + '.js');
};

$(document).ready(function () {
    // disable middle mouse scrolling
    $('body').mousedown(function (e) { if (e.button === 1) return false; });

    if (api.Panel.pageName === 'game') 
        modify_keybinds({ add: ['general', 'debugging'] });

    locUpdateDocument();

    // now that loc has been updated, it's okay to show the page
    $('html').fadeIn(0).show();
});
