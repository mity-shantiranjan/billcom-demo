/* jshint node: true */

module.exports = {
    options: {
        lcovfile: "build/test-results/code-coverage-reports/lcov.info",
        lines: 50,
        functions: 50,
        branches: 50,
        src: "src",
        includes: ["src/**/*.js"],
        excludes: [
            "src/config.js",
            "src/views/Component.js",
            "src/views/register.js",
            "src/views/handlebars.js",
            "src/util/properties.js"
        ]
    }
};
