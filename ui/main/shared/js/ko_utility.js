// Common non-UI knockout extensions

(function(window, ko) {
    
    if (window) {
        function makeStorageExtender(storage) {
            return function (target, option) {
                var v;
                var loading = false;

                // write changes to storage
                target.subscribe(function (newValue) {
                    if (!loading)
                        storage.setItem(option, encode(newValue));
                });

                // init from storage
                if (storage[option]) {
                    v = decode(storage[option]);
                    loading = true;
                    try { 
                        target(v); 
                    } catch (e) { 
                        loading = false; 
                        throw e; 
                    }
                    loading = false;
                }

                return target;
            };
        }

        ko.extenders.local = makeStorageExtender(window.localStorage);
        ko.extenders.session = makeStorageExtender(window.sessionStorage);
    }
    else {
        ko.extenders.local = function(target, option) { return target; };
        ko.extenders.session = ko.extenders.local;
    }

    ko.extenders.withPrevious = function (target) {
        // Define new properties for previous value and whether it's changed
        target.previous = ko.observable();
        target.changed = ko.computed(function () { return target() !== target.previous(); });

        // Subscribe to observable to update previous, before change.
        target.subscribe(function (v) {
            target.previous(v);
        }, null, 'beforeChange');

        // Return modified observable
        return target;
    }

    ko.extenders.numeric = function (target, precision) {

        var isFrac = function (number) {
            return number % 1 !== 0;
        };

        var result = ko.computed({
            read: function () {
                var input = Number(target());
                return isFrac(input) ? input.toFixed(precision) : input;
            },
            write: target
        });

        result.raw = target;
        return result;
    };

    ko.extenders.maxLength = function(target, maxLength) {
        // Use an internal observable to truncate on write
        var result = ko.computed({
            read: target,
            write: function(newValue) {
                var curValue = target();
                var truncated = newValue;
                if (_.isString(truncated))
                    truncated = truncated.substring(0, Math.min(newValue.length, maxLength));

                if (truncated !== curValue) {
                    target(truncated);
                } else if (newValue !== curValue) {
                    // Notify on equal truncation if the un-truncated version changed
                    target.notifySubscribers(truncated);
                }
            }
        });

        // Initialize the computed with the original value
        result(target());

        return result;
    };

})(window, ko);

