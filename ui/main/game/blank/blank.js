var model;
var handlers;

function respondToResize() {
    model.containerHeight($("body").height() +'px');
    model.containerWidth(($("body").width() - 10)+'px');
    model.contentWrapperHeight(($("#main .content").height()) +'px');
}

$(document).ready(function () {

   // Click handler for social chat button
    $('#social-chat').click(function() {
        model.pageMessage('Why destroy a planet when you can chat with your friends?');
    });

   // Click handler for friends button
    $('#social-friends').click(function() {
        model.pageMessage('As soon as you can have friends, you can talk to them!');
    });

   // Click handler for create button
    $('#command').click(function() {
        $('#getData').modal('show');
        return;
    });

    function BlankViewModel() {
        var self = this;

        // Get session information about the user, his game, environment, and so on
        self.uberId = ko.observable().extend({ session: 'uberId' });
        self.signedInToUbernet = ko.observable().extend({ session: 'signed_in_to_ubernet' });
        self.transitPrimaryMessage = ko.observable().extend({ session: 'transit_primary_message' });
        self.transitSecondaryMessage = ko.observable().extend({ session: 'transit_secondary_message' });
        self.transitDestination = ko.observable().extend({ session: 'transit_destination' });
        self.transitDelay = ko.observable().extend({ session: 'transit_delay' });

        self.devMode = ko.observable().extend({ session: 'dev_mode' });

        // Tracked for knowing where we've been for pages that can be accessed in more than one way
        self.lastSceneUrl = ko.observable().extend({ session: 'last_scene_url' });

        // Set up messaging displays
        self.pageMessage = ko.observable();
        self.navHeaderFormMessage = ko.observable();

        // Set up dynamic sizing elements
        self.containerHeight = ko.observable('');
        self.containerWidth = ko.observable('');
        self.contentWrapperHeight = ko.observable('');

        self.sampleFilter = ko.observable('');
        self.searchFilter = ko.observable('');

       // Click handler for back button
        self.back = function() {
            engine.call('disable_lan_lookout');
            window.location.href = 'coui://ui/main/game/start/start.html';
            return; /* window.location.href will not stop execution. */
        };

        self.search = function() {
            self.navHeaderFormMessage('Performed a search');
        }

    }

    model = new BlankViewModel();

    handlers = {};

   // inject per scene mods
    if (scene_mod_list['blank']) {
        loadMods(scene_mod_list['blank']);
    }

    // setup send/recv messages and signals
    app.registerWithCoherent(model, handlers);

    // Activates knockout.js
    ko.applyBindings(model);

    // Set up the modal box
    $('#getData').modal();

    // Set up selectpickers to work as multi-select dropdowns
    $('#sample-filter').selectpicker({ noneSelectedText: 'Any selection' });

    // Set up resize event for window so we can smart-size the game list
    $(window).resize(respondToResize);

    // Do some initial resizing, since resize isn't called on page load (but this may not be accurate)
    model.containerHeight($("body").height() +'px');
    model.containerWidth(($("body").width() - 10)+'px');
    // Have to delay a few milliseconds, as immediate call was sometimes not calculating correctly
    window.setTimeout(respondToResize,100);

    // Tell the model we're really, really here
    model.lastSceneUrl('coui://ui/main/game/blank/blank.html');

});
