var UberUtility = (function() {
    // Overflow/underflow/resize listener support from here: http://www.backalleycoder.com/
    // http://www.backalleycoder.com/2013/03/14/oft-overlooked-overflow-and-underflow-events/
    // http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/

    function addFlowListener(element, type, fn) {
        var flow = type == 'over';
        element.addEventListener('OverflowEvent' in window ? 'overflowchanged' : type + 'flow', function (e) {
            if (e.type == (type + 'flow') ||
            ((e.orient == 0 && e.horizontalOverflow == flow) ||
            (e.orient == 1 && e.verticalOverflow == flow) ||
            (e.orient == 2 && e.horizontalOverflow == flow && e.verticalOverflow == flow))) {
                e.flow = type;
                return fn.call(this, e);
            }
        }, false);
    };

    function fireEvent(element, type, data, options) {
        var options = options || {},
            event = document.createEvent('Event');
        event.initEvent(type, 'bubbles' in options ? options.bubbles : true, 'cancelable' in options ? options.cancelable : true);
        for (var z in data) event[z] = data[z];
        element.dispatchEvent(event);
    };

    function addResizeListener(element, fn) {
        var resize = ('onresize' in element) && !!element.onresize;
        if (!resize && !element._resizeSensor) {
            var sensor = element._resizeSensor = document.createElement('div');
            sensor.className = 'resize-sensor';
            sensor.innerHTML = '<div class="resize-overflow"><div></div></div><div class="resize-underflow"><div></div></div>';

            var x = 0, y = 0,
                first = sensor.firstElementChild.firstChild,
                last = sensor.lastElementChild.firstChild,
                matchFlow = function (event) {
                    var change = false,
                    width = element.offsetWidth;
                    if (x != width) {
                        first.style.width = width - 1 + 'px';
                        last.style.width = width + 1 + 'px';
                        change = true;
                        x = width;
                    }
                    var height = element.offsetHeight;
                    if (y != height) {
                        first.style.height = height - 1 + 'px';
                        last.style.height = height + 1 + 'px';
                        change = true;
                        y = height;
                    }
                    if (change && event.currentTarget != element) fireEvent(element, 'resize');
                };

            if (getComputedStyle(element).position == 'static') {
                element.style.position = 'relative';
                element._resizeSensor._resetPosition = true;
            }
            addFlowListener(sensor, 'over', matchFlow);
            addFlowListener(sensor, 'under', matchFlow);
            addFlowListener(sensor.firstElementChild, 'over', matchFlow);
            addFlowListener(sensor.lastElementChild, 'under', matchFlow);
            element.appendChild(sensor);
            matchFlow({});
        }
        var events = element._flowEvents || (element._flowEvents = []);
        if (events.indexOf(fn) == -1) events.push(fn);
        if (!resize) element.addEventListener('resize', fn, false);
        element.onresize = function (e) {
            events.forEach(function (fn) {
                fn.call(element, e);
            });
        };
    };

    function removeResizeListener(element, fn) {
        var index = element._flowEvents.indexOf(fn);
        if (index > -1) element._flowEvents.splice(index, 1);
        if (!element._flowEvents.length) {
            var sensor = element._resizeSensor;
            if (sensor) {
                element.removeChild(sensor);
                if (sensor._resetPosition) element.style.position = 'static';
                delete element._resizeSensor;
            }
            if ('onresize' in element) element.onresize = null;
            delete element._flowEvents;
        }
        element.removeEventListener('resize', fn);
    };

    function createTimeString(timeInSeconds) {
        var s = Math.floor(timeInSeconds);
        var ms = Math.floor(60 * (timeInSeconds - s));
        var m = Math.floor(s / 60);
        s = s - m * 60;

        return '' + m + (s < 10 ? ':0' : ':') + s;
    }

    function createDateString() {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        if (dd < 10)
            dd = '0' + dd;
        if (mm < 10)
            mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }


    return {
        addFlowListener : addFlowListener,
        addResizeListener : addResizeListener,
        removeResizeListener: removeResizeListener,
        
        createTimeString: createTimeString,
        createDateString: createDateString
    };

})();

