function init_file(api) {

    api.file = {
        mountMemoryFiles: function (files) { engine.call("file.mountMemoryFiles", JSON.stringify(files)); },
        unmountAllMemoryFiles: function () { engine.call("file.unmountAllMemoryFiles"); }
    };
};

init_file(window.api);

