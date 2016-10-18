define(["./classes", "./keyPaths", "./properties"], function(classes, keyPaths, properties) {
    "use strict";

    /** @const */
    var TRANSFORM_META_KEY = "__morph_tranform",
        transform;

    /**
     * Sets up a bound conversion between two keyPaths. To unbind the conversion later,
     * call the "detach" method on the returned Transformer object.
     *
     * In the simplest form, simply provide an object, sourcePath, and destPath.
     * A two-way binding will be set up between the two properties.
     *
     * Conversion functions are provided through the options object:
     *    from: a function converting value of sourcePath to destPath.
     *    to: a function converting value of destPath back to sourcePath.
     *
     * If only from is specified, a one-way binding is established. If both are specified,
     * the binding will be two-way.
     *
     * For performance reasons, when setting one of the bound key paths the other will be updated
     * asynchronously after a 4ms delay. To force a synchronous update, use the 'runObservers'
     * function in the properties module.
     *
     * Example:
     *
     *     transform(this, "model.transactionDate", "viewmodel.transactionDate", {
     *         from: function(jsDate) {
     *             return jsDate ? jsDate.toISOString() : "";
     *         },
     *         to: function(isoDate) {
     *             return isoDate ? new Date(isoDate) : null;
     *         }
     *     })
     *
     * This also works with JavaScript primitives, provided you ensure 'undefined' won't be passed:
     *
     *     transform(this, "amountString", "amountNumber", {
     *         from: Number,
     *         to: String
     *     });
     *
     * @param {object} object The host object containing both key paths.
     * @param {string|array|paths.Path} destPath The key path to value properties being transformed to
     * @param {string|array|paths.Path} sourcePath The key path to value properties to transform from
     * @param {object?} options (optional) an options object, containing 'from' and optional 'to'
     *                           conversion functions. If multiple sourcePaths or destPaths
     *                           are specified, this options object and a 'from' transformer
     *                           is mandatory.
     * @returns {Transformer}
     */
    transform = function(object, destPath, sourcePath, options) {
        if (!options) {
            options = {};
        }
        return new Transformer(object, [destPath], [sourcePath], options);
    };

    /**
     * MIMO version of translate(), allows multiple input and output values.
     * sourcePaths and destPaths must be specified as arrays of key keyPaths.
     * Conversion functions will receive multiple arguments, one for each input path.
     * Conversion functions must return an array of values in the order of the target key keyPaths.
     * A 'from' converter function is required; there is no default behavior.
     *
     * Example:
     *
     *     transform.multiple(this, ["model.address.line1"], ["street", "unitType", "unit"], {
     *         from: function(line1) {
     *            var parts = _splitLine1(line1);
     *            return [parts.street, parts.unitType, parts.unit];
     *         },
     *         to: function(street, unitType, unit) {
     *            return [
     *                [street, unitType, unit].filter(Boolean).join(" ")
     *            ];
     *         }
     *     });
     *
     * @param {object} object The target object for conversion. All keyPaths are relative to this object.
     * @param {Array} destPaths The key path to value properties being transformed to
     * @param {Array} sourcePaths The key path to value properties to transform from
     * @param {object?} options (optional) an options object, containing 'from' and optional 'to'
     *                           conversion functions. If multiple sourcePaths or destPaths
     *                           are specified, this options object and a 'from' transformer
     *                           is mandatory.
     * @returns {Transformer}
     */

    transform.multiple = function(object, destPaths, sourcePaths, options) {
        if (!options) {
            options = {};
        }
        options._mimo = true;

        if (!Array.isArray(destPaths) || !Array.isArray(sourcePaths)) {
            throw new Error("sourcePaths and destPaths must be specified as arrays");
        }

        return new Transformer(object, destPaths, sourcePaths, options);
    };

    /**
     * Detaches a previously-registered transformation. For transform.multiple(), you only need to specify one of
     * the provided destPaths and the transformation will be removed from all of them.
     *
     * @param {object} object
     * @param {string|array|paths.destPath} destPath
     */
    transform.detach = function(object, destPath) {
        destPath = keyPaths.toPath(destPath);

        var resolved = destPath.resolve(object),
            existingTransform = resolved && properties.getPropertyMeta(resolved[0], resolved[1], TRANSFORM_META_KEY);

        if (existingTransform) {
            existingTransform.detach();
        } else {
            console.warn("No transformation to detach: " + destPath);
        }
    };

    function _justCopyIt(value) {
        return [value];
    }

    var Transformer = classes.extend(Object, {
        constructor: function Transformer(object, destPaths, sourcePaths, options) {
            var mimo;

            this.object = object;
            this.sourcePaths = sourcePaths.map(keyPaths.toPath);
            this.destPaths = destPaths.map(keyPaths.toPath);
            this.options = options;
            this._updating = false;
            this._mimo = mimo = !!options._mimo;
            this._destObjects = [];

            if (!mimo && !options.from && !options.to) {
                options.from = _justCopyIt;
                options.to = _justCopyIt;
            }
            if (!options.from) {
                throw new Error("'from' transform function is required if you have multiple from/to keyPaths or specify a 'to' transform");
            }

            this.reattach();
        },

        /**
         * Throws an error if another transformation has already been applied to a given destination object
         *
         * @param {object} destObject
         * @param {string} propertyName
         */
        validateDest: function(destObject, propertyName) {
            if (destObject && properties.getPropertyMeta(destObject, propertyName, TRANSFORM_META_KEY)) {
                throw new Error("Transform already applied to destination property");
            }
        },

        reattach: function() {
            var object = this.object,
                sourcePaths = this.sourcePaths,
                destPaths = this.destPaths;

            // Check if a transformation is already applied to any of the destPaths
            for (var i = 0, l = destPaths.length; i < l; i++) {
                var resolved = destPaths[i].resolve(this.object);
                if (resolved) {
                    this.validateDest(resolved[0], resolved[1]);
                }
            }

            this._sourcePathChanged(object);

            properties.observe(object, sourcePaths, this, this._sourcePathChanged);
            properties.observe(object, destPaths, this, this._destPathChanged);

            this.updateDestObjects();
        },

        detach: function() {
            var object          = this.object,
                sourcePaths     = this.sourcePaths,
                destPaths       = this.destPaths,
                destObjects     = this._destObjects,
                i, l;

            for (i = 0, l = sourcePaths.length; i < l; i++) {
                properties.unobserve(object, sourcePaths[i], this, this._sourcePathChanged);
            }
            for (i = 0, l = destPaths.length; i < l; i++) {
                var destPath = destPaths[i],
                    oldObject = destObjects[i],
                    propertyName = destPath[destPath.length - 1];

                properties.unobserve(object, destPaths[i], this, this._destPathChanged);

                if (oldObject) {
                    properties.deletePropertyMeta(oldObject, propertyName, TRANSFORM_META_KEY);
                }
            }

            this.destObjects = [];
        },

        updateDestObjects: function() {
            var destPaths = this.destPaths,
                destObjects = this._destObjects,
                i, l;

            for (i = 0, l = destPaths.length; i < l; i++) {
                var destPath        = destPaths[i],
                    oldObject       = destObjects[i],
                    resolved        = destPath.resolve(this.object),
                    newObject       = resolved && resolved[0],
                    propertyName    = destPath[destPath.length - 1];

                if (oldObject) {
                    properties.deletePropertyMeta(oldObject, propertyName, TRANSFORM_META_KEY);
                }
                if (newObject) {
                    this.validateDest(newObject, propertyName);
                    properties.setPropertyMeta(newObject, propertyName, TRANSFORM_META_KEY, this);
                }

                destObjects[i] = newObject;
            }
        },

        _translateValues: function(object, inputPaths, translationFunc, outputPaths) {
            if (!this._updating) {
                try {
                    this._updating = true;

                    var values = [],
                        i, l;

                    for (i = 0, l = inputPaths.length; i < l; i++) {
                        values.push(keyPaths.getValue(object, inputPaths[i]));
                    }

                    values = translationFunc.apply(null, values);

                    if (!this._mimo) {
                        values = [values];
                    } else if (!Array.isArray(values)) {
                        throw new Error("Translation function must return an array of values");
                    }

                    if (values.length !== outputPaths.length) {
                        throw new Error("Expected " + outputPaths.length + " value(s) from translation function, got " + values.length);
                    }

                    for (i = 0, l = outputPaths.length; i < l; i++) {
                        var outputPath = outputPaths[i];
                        //console.log("Setting value: ",i, outputPath, values[i]);
                        keyPaths.setValue(object, outputPath, values[i]);

                        // Force synchronous observer callback to prevent infinite async loop
                        properties.runObservers(object, outputPath);
                    }
                } finally {
                    this._updating = false;
                }
            }
        },

        _sourcePathChanged: function(object) {
            this._translateValues(object, this.sourcePaths, this.options.from, this.destPaths);
        },

        _destPathChanged: function(object, path /*, newValue */) {
            if (this.options.to) {
                this._translateValues(object, this.destPaths, this.options.to, this.sourcePaths);
            } else if (!this._updating) {
                console.warn("Changed value on the destination of a one-way translation: " + path);
            }

            this.updateDestObjects();
        },
    });

    transform.Transformer = Transformer;

    return transform;
});