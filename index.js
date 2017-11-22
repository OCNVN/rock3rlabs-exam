requirejs.config({
    paths: {
        Rokk3rlabsPrueba: '/build/main.bundle'
    }
});

// Start the main app logic.
requirejs(
    ['Rokk3rlabsPrueba'],
    function (Rokk3rlabsPrueba) {
        Rokk3rlabsPrueba.renderApp(document.getElementById("page"));
    }
);