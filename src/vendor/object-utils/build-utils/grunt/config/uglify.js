/* jshint node: true */

module.exports = {
    options: {
        banner: "<%= banner %>"
    },
    dist: {
        options: {
            sourceMap: true
        },
        src: "<%= buildDistDir %>/morpheusjs.js",
        dest: "<%= buildDistDir %>/morpheusjs.min.js",
        sourceMap: true
    }
};