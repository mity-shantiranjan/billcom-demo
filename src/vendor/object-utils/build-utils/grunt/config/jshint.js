/* jshint node: true */

module.exports = {
    options: {
        jshintrc: ".jshintrc",
        reporter: require("jshint-stylish")
    },
    gruntfile: {
        options: {
            jshintrc: ".jshintrcgruntfile"
        },
        src: "Gruntfile.js"
    },
    source: {
        src: ["src/**/*.js"]
    },
    test: {
        src: ["test/**/*.js"]
    }
};