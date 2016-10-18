define([
    "./base"
], function(baseConfig) {
    var config = Object.create(baseConfig),
        overrides = {
            environments: [{
                browserName: "phantomjs"
            }]
        };

    // PhantomJS 1.x cannot fully test features that depend on ECMAScript 5.
    // When headless testing in PhantomJS 2.0 becomes available, test that and hopefully remove this check.
    if (typeof navigator === "undefined") {
        console.warn("\nRunning limited headless test suites in PhantomJS.\nUse without --headless to run the full test suite in local browsers.\n");
    } else if (/PhantomJS/.test(navigator.userAgent)) {
        overrides.suites = [
            "test/unit/suites/headless"
        ];
    }

    for (var key in overrides) {
        config[key] = overrides[key];
    }

    return config;

});