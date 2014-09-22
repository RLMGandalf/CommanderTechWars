function init_debug(api) {

    api.debug = {
        abort: function () { engine.call('console_exec', 'debug_abort'); },
        crash: function () { engine.call('console_exec', 'debug_crash'); }
    };
}
init_debug(window.api);