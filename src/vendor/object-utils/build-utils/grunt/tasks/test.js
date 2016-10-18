/* jshint node: true */
/**
 * This modules provides the grunt task for running unit tests for morpheus.
 * @module tasks/test
 */

/**
 * Register the test task to grunt.
 *
 * This task can be executed using 'grunt test'. Some options can also be provided on the command line.
 * - suites: A comma separted list of suite files to run. e.g. 'grunt test --suites=test/unit/baseObjectIncludeTest'
 * - no-headless: To run the tests in the browser during development for debugging. e.g. 'grunt test --no-headless'.
 *
 * @type GruntTask
 * @param {Object} grunt - the grunt context
 */
module.exports = function(grunt) {

    grunt.registerTask("test", "Run unit tests", function() {
        var debugMode = !grunt.option("headless"),
            suites = [],
            path = require("path"),
            fs = require("fs"),
            mkdirp = require("mkdirp"),
            jsExtensionRegex = /\.js$/,
            jar = require("selenium-server-standalone-jar"),
            done,
            testUrl,
            proxy;

        if (grunt.option("suites")) {
            suites = grunt.option("suites").split(",");
            suites = suites.map(function(suite) {

                // strip out the js extension if provided in the suite name. Suite names should be module ids
                // and not js files. The loader interprets the two differently.
                return suite.replace(jsExtensionRegex, "");
            });
        }

        if (!debugMode) {
            done = this.async();
            if (suites.length > 0) {
                grunt.config(["intern", "runner", "options", "suites"], suites);
            }

            proxy = grunt.util.spawn({
                cmd: "java",
                args: ["-jar", jar.path, "-port", 4445, "-debug"]
                //args: ["-jar", jar.path, "-debug"]
            }, function(err) {
                if (err) {
                    grunt.log.error(err.message);
                }
            });
            mkdirp.sync("build/logs");
            var writer = fs.createWriteStream("build/logs/selenium.log");
            proxy.stdout.pipe(writer);
            proxy.stderr.pipe(writer);

            setTimeout(function() {

                var request = require("request"); // include request module
                request("http://localhost:4445/selenium-server/driver?cmd=getLogMessages", function(err, resp) {
                    if (err || resp.statusCode !== 200) {
                        console.log(err || resp);
                        grunt.fail.fatal("Could not start selenium server.");
                        return;
                    }
                    grunt.log.writeln("Selenium server started");
                    grunt.log.writeln("Proxy Started:" + proxy.pid);
                    grunt.task.run(["intern:runner", "copy:testreports", "clean:interndefaultreports"]);
                    done();
                });

            }, 1000);

            process.on("exit", function() {
                proxy.kill();
                writer.end();
            });

        } else {
            testUrl = "http://localhost:" + grunt.config("devServerPort") + "/node_modules/intern/client.html?config=test/config/intern&reporters=html";
            console.log(testUrl);
            suites.forEach(function(suite) {
                testUrl += "&suites=" + suite;
            });

            grunt.config("test.testUrl", testUrl);
            grunt.task.run(["connect:test"]);
        }

    });

};