/**
 * Plugin that loads a template from a specified module id and returns a function to
 * generate DOM corresponding to that template. Uses Mustache.
 *
 * When that function is run, it returns another function.
 *
 * Template has a format like:
 *
 * ```html
 * <button>
 *   <span class="ha-reset {{iconClass}}"></span>
 *   {{label}}
 * </button>
 * ```
 *
 * Usage is typically like:
 *
 * ```js
 * define([..., "register-component/template!./templates/MyTemplate.html"], function(..., template) {
 *     ...
 *     template: template,
 *     ...
 * });
 * ```
 *
 * @module register-component/template
 */
define(["mustache"], function(Mustache) {

    var buildMap = {},

        // Text plugin to load the templates and do the build.
        textPlugin = "text";

    return { /** @lends module:register-component/template */
        /**
         * Returns a function to generate the DOM specified by the template.
         * This is the function run when you use this module as a plugin.
         * @param {string} mid - Absolute path to the resource.
         * @param {Function} require - AMD's require() method.
         * @param {Function} onload - Callback function which will be called with the compiled template.
         * @param {Object} config - Configuration object from the loader with `isBuild === true`
         * when doing a build.
         * @private
         */
        load: function(mid, require, onload, config) {
            if (buildMap[mid]) {
                onload(buildMap[mid]);
            } else {
                var textOnload;

                textOnload = function(source) {
                    if (config && config.isBuild) {
                        // Don't bother doing anything else during build.
                        onload();
                    } else {
                        Mustache.parse(source);
                        buildMap[mid] = function(data) {
                            return Mustache.render(source, data);
                        };

                        onload(buildMap[mid]);
                    }
                };

                require([textPlugin + "!" + mid], textOnload);
            }
        }
    };
});