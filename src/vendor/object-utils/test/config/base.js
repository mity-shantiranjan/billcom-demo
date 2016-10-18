(function() {
    return this;
})().dojoConfig = {
    // Since we can use the Dojo 1 AMD loader to emulate the normal environment of our modules more closely,
    // we need to disable actions within the loader that will cause requests to occur before the loader is reconfigured;
    // if `async` is not set, the loader will immediately try to synchronously load all of `dojo/main`
    async: true
};

// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: "http://localhost:9000/",

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
        "selenium-version": "2.43.1",
        "phantomjs.binary.path": "node_modules/.bin/phantomjs"
    },

    // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
    // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
    // capabilities options specified for an environment will be copied as-is
    environments: [
        { browserName: "internet explorer", version: "11", platform: "Windows 8.1" },
        { browserName: "internet explorer", version: "10", platform: "Windows 8" },
        { browserName: "internet explorer", version: "9", platform: "Windows 7" },
        { browserName: "firefox", version: "25", platform: ["OS X 10.6", "Windows 7"] },
        { browserName: "firefox", version: "24", platform: "Linux" },
        { browserName: "chrome", version: "", platform: ["Linux", "OS X 10.6", "Windows 7"] },
        { browserName: "safari", version: "6", platform: "OS X 10.8" }
    ],

    // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
    maxConcurrency: 3,

    // Name of the tunnel class to use for WebDriver tests
    tunnel: "NullTunnel",

    tunnelOptions: {
        port: 4445
    },

    // The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
    // loader
    useLoader: {
        "host-node": "dojo/dojo",

        // dojo 1.10+ loader
        //"host-browser": "../../bower_components/dojo/dojo.js"

        // requirejs loader.
        "host-browser": "../../bower_components/requirejs/require.js"

        // dojo 2 loeader that comes with intern
        //"host-browser": "node_modules/dojo/dojo.js"
    },

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loader: {
        // Packages that should be registered with the loader in each testing environment
        packages: [
            { name: "dcl", location: "bower_components/dcl" },
            { name: "dojo", location: "bower_components/dojo" },
            { name: "rsvp", location: "bower_components/rsvp" },
            { name: "sinon", location: "node_modules/sinon/pkg/sinon", main: "../sinon" },
            { name: "Handlebars", location: "bower_components/handlebars", main: "handlebars" },
            { name: "text", location: "bower_components/requirejs-text", main: "text" },
            { name: "test", location: "test" },
            { name: "src", location: "src" }
        ]
    },

    // Non-functional test suite(s) to run in each browser
    suites: [
        "test/unit/suites/all"
    ],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: [ ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:test|node_modules|bower_components)\//
});