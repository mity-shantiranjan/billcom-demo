define(["./classes"], function(classes) {
    "use strict";

    /** @namespace keyPaths */

    /**
     * @class
     *
     * The keyPaths.Path class
     *
     * Key paths are used to reference values on objects contained by other objects.
     * Unlike direct access, it does not throw an error when accessing a
     * subproperty of undefined; instead, the result is also undefined.
     *
     * It's an array-like object, meaning it uses numerical indexes and has a
     * length property.
     *
     * In the string format, you define keyPaths by separating indexes by dots, such as:
     *     new keyPaths.Path("customers.1.firstName")
     *
     * The string format doesn't allow for property/ key names with dots in them.
     * For those, use the array format:
     *     new keyPaths.Path(["strings", "welcome-page.header"])
     *
     * Examples:
     *     var keyPath = new keyPaths.Path("a.1")
     *     var keyPath = new keyPaths.Path(["a",1]);
     *     var keyPath = new keyPaths.Path(["dict",
     *                            "Keys with dots can be used... in array syntax"])
     *
     */
    var Path = classes.extend(Object, {
        /**
         * @constructor
         * @param {string|number|Array} pathParts   A keyPath, as a dot-separated string or array.
         */
        constructor: function Path(pathParts) {
            if (typeof pathParts === "number" && pathParts >= 0 && pathParts % 1 === 0) {
                pathParts = [pathParts];
            }
            if (typeof pathParts === "string") {
                pathParts = pathParts.split(".");
            }
            if (!Array.isArray(pathParts)) {
                throw new TypeError("Path must be defined using a string, array index, or array");
            }

            var tostr = [],
                i, l,
                partStr;

            for (i = 0, l = pathParts.length; i < l; i++) {
                partStr = "" + pathParts[i];
                this[i] = partStr;
                tostr[i] = (/\W/.test(partStr) ?
                "\"" + partStr.replace(/([\\"])/g, "\\$1") + "\"" : partStr);
            }

            /** @type {number} */
            this.length = pathParts.length;

            /** @type {string} */
            this._string = tostr.join(".");

            /** @type {keyPaths.Path} */
            this._subpath = null;

            // In future, test performance implications of making this immutable
            // with ES5's Object.freeze())
        },

        /**
         * @param {keyPaths.Path} anotherPath
         * @return {boolean} true if the keyPaths are equal
         */
        equals: function(anotherPath) {
            anotherPath = toPath(anotherPath);
            return this._string === anotherPath._string;
        },

        /**
         * The portion of this keyPath below the top item.
         * The subpath of "customers.1.firstName" would be "1.firstName".
         *
         * @return {keyPaths.Path}
         */
        getSubpath: function() {
            var subpath = this._subpath;
            if (!subpath) {
                this._subpath = subpath = new Path(Array.prototype.slice.call(this, 1));
            }

            return subpath;
        },

        /**
         * Returns a keyPath with the bottom removed, or null.
         *
         * @return {keyPaths.Path}
         */
        getParentPath:  function() {
            var parentPath = this._parentPath;
            if (!parentPath) {
                this._parentPath = parentPath = new Path(Array.prototype.slice.call(this, 0, this.length - 1));
            }
            return parentPath;
        },

        /**
         * A normalized string representation of a keyPath, useful for logging and comparing keyPaths.
         * Since it encodes dot-containing property names, it cannot be re-parsed as a keyPath string.
         *
         * @return {string}
         */
        toString: function() {
            return this._string;
        },

        /**
         * Resolves a path to the specific object and property containing a value.
         * Returns [object, propertyName] or undefined if propertyName cannot be accessed.
         * @param {*} value A base value to resolve against
         */
        resolve: function(value) {
            if (!value) {
                return undefined;
            }

            for (var i = 0, l = this.length - 1; i < l; i++) {
                value = value[this[i]];
                if (!value) {
                    return undefined;
                }
            }

            return [value, this[i]];
        },

        /**
         * Alternate method of calling keyPaths.getValue(object, keyPath)
         * @param  {*} object
         * @return {*}
         */
        getValue: function(object) {
            if (this.length) {
                var resolved = this.resolve(object);
                return resolved && resolved[0][resolved[1]];
            } else {
                return object;
            }
        },

        /**
         * Alternate method of calling keyPaths.setValue(object, keyPath, value)
         * @param  {*} object
         * @param  {*} newValue
         * @return {*}
         */
        setValue: function(object, newValue) {
            var resolved = this.resolve(object);
            if (resolved) {
                resolved[0][resolved[1]] = newValue;
                return newValue;
            } else {
                console.warn("Couldn't set keyPath " + this + " on " +
                (object === null ? object : typeof object));
            }
        },
    });

    /**
     * Coerces a value into a Path object if necessary.
     *
     * @param  {keyPaths.Path|string|Array} aPath   A keyPath, whether in string format,
     *                                              array format, or a Path object
     * @return {keyPaths.Path}                      A Path object
     */
    function toPath(aPath) {
        return aPath instanceof Path ? aPath : new Path(aPath);
    }

    /**
     * Gets a value by keyPath, or undefined if the value the keyPath points to doesn't exist
     *
     * @param  {*} object                               An object to evaluate the keyPath on
     * @param  {string|Array|keyPaths.Path} keyPath     A keyPath in string notation, Array notation,
     *                                                  or Path object
     * @return {*}
     */
    function getValue(object, keyPath) {
        return toPath(keyPath).getValue(object);
    }

    /**
     * Sets a property or array index value by keyPath, if the referenced container object exists
     *
     * @param  {object} object                          An object to evaluate the keyPath on
     * @param  {string|Array|keyPaths.Path} keyPath     A keyPath in string notation, Array notation,
     *                                                  or Path object
     * @param  {*} newValue                             Value to set
     * @return {*}
     */
    function setValue(object, keyPath, newValue) {
        return toPath(keyPath).setValue(object, newValue);
    }

    return {
        Path:       Path,
        toPath:     toPath,
        getValue:   getValue,
        setValue:   setValue,
    };
});