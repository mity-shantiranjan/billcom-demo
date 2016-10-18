/* jshint node: true */

module.exports = {
    test: {
        options: {
            keepalive: true,
            port: "<%= devServerPort %>",
            open: {
                target: "<%= test.testUrl %>"
            }
        }
    },
    development: {
        options: {
            keepalive: true,
            port: "<%= devServerPort %>"
        }
    },
    production: {
        options: {
            keepalive: true,
            port: 8000,
            middleware: function(connect, options) {
                return [
                    // rewrite requirejs to the compiled version
                    function(req, res, next) {
                        /*jshint unused:true*/
                        if (req.url === "/bower_components/requirejs/require.js") {
                            req.url = "/dist/require.min.js";
                        }
                        next();
                    },
                    connect.static(options.base)
                ];
            }
        }
    }
};