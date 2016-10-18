define([
    "intern!object"
], function(registerSuite) {

    var DEFAULT_MAX_TEST_TIME_MS = 100;

    function perfTest(maxTime, test) {
        return function() {
            var totalTime, startTime, returnValue;

            function resolve() {
                totalTime = +new Date() - startTime;
                if (totalTime > maxTime) {
                    throw new Error("Test should have completed in under " + maxTime + "ms but took " + totalTime + "ms");
                }
            }

            startTime = +new Date();
            returnValue = test.apply(this, arguments);

            if (this.isAsync) {
                returnValue = (returnValue && returnValue.then ? returnValue : this.async()).then(resolve);
            } else {
                resolve();
            }

            return returnValue;
        };
    }

    var wrapPerfTest = function(args) {

        // We don't want to do a perf test on test lifecycle methods like beforeEach/afterEach
        // just add to the entry if need be
        var filterMethods = ["beforeEach", "afterEach"],
            maxTestTime = (args && args.maxTestTime !== null && args.maxTestTime !== undefined) ? args.maxTestTime : DEFAULT_MAX_TEST_TIME_MS;

        // loop through args, if it is a function then wrap whatever you need
        Object.keys(args).forEach(function(key) {
            var item = args[key];

            // if key is not part of filterMethods then we continue
            if (filterMethods.indexOf(key) === -1) {
                if (typeof item === "function") {
                    // finally augment the perf test
                    args[key] = perfTest(maxTestTime, item);
                } else if (typeof item === "object" && Object.keys(item).length) {

                    // use the previous level timeout if one is not provided in this sub object.
                    if (item.maxTestTime === null || item.maxTestTime === undefined) {
                        item.maxTestTime = maxTestTime;
                    }
                    // if object, recurse
                    wrapPerfTest(item);
                }
            }
        });

        return args;
    };

    return function(args) {
        registerSuite(wrapPerfTest(args));
    };
});