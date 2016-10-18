/* jshint node: true */

module.exports = {
    dist: {

        src: ["src/**/*.js", "test/*.js"],
        options: {
            destination: "build/documentation/jsdoc",
            configure: "conf.json"
        }
    }
};