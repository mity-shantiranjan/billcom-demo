define(["./classes", "./keyPaths"], function(classes, keyPaths) {
    "use strict";

    var properties = {},

        /** @const {string} */
        VALUE_PROPERTY_PREFIX = "__morph__",

        /** @const {string} */
        PROPERTY_MANAGER_NAME = "__morph_properties__",

        /** @const {string} */
        DESCRIPTOR_PROPERTY = "__morph_descriptor__",

        _arrayOverrideDescriptors, _setPrototypeOf, _ArraySubPrototype,
        USE_NATIVE_OBSERVER;

    /**
     * Note: This code assumes that any dynamic properties on object's prototype (superclass)
     * will already have been defined before object's dynamic properties are defined.
     *
     * Property descriptors are a superset of ECMAScript 5's property descriptors,
     * and support the following optional attributes:
     *   - value: A static default value, only allowed if no get and set are provided.
     *   - get: a function that returns a computed property value.
     *   - set: a function that takes one argument and sets the provided property value
     *   - configurable: true if the property descriptor can be changed. Defaults to false.
     *   - enumerable: true if the property shows up in for..in loops. Defaults to false.
     *   - dependsOn: an array of key keyPaths that this property depends on. If any of those keyPaths
     *     are modified, observers attached to this property will also fire.
     *
     * @param {function|object} target A constructor function or object.
     * @param {object} propertyMap An object mapping property names to property descriptors
     */

    properties.defineProperties = function(target, propertyMap) {
        target = _constructorOrObject(target);
        assert(isObject(propertyMap), "Invalid property map", TypeError);

        // jshint forin:false
        for (var propertyName in propertyMap) {
            makePropertyObservable(target, propertyName, propertyMap[propertyName]);
        }
    };

    /**
     * properties.observe() observes an path for changes.
     * If the result of the path changes due to a change in any of the
     * properties/indexes in the path, the observer will fire.
     *
     * This function is available by the shorthand mvc.observePath().
     *
     * @param {object} object The object being observed
     *
     * @param {string|Array|keyPaths.Path} observedPaths The path(s) being observed on that object.
     *                                                If using a single path in array notation, it must be
     *                                                double-arrayed: [["keys", "one.two.three"]]
     *
     * @param {?object} observer An observer object, or null. Handler will be called
     * with observer as the value of 'this'.
     *
     * @param {function} handler The observer function
     */
    properties.observe = function(object, observedPaths, observer, handler) {
        if (typeof handler !== "function") {
            throw new Error("Handler function is required");
        }
        if (!Array.isArray(observedPaths)) {
            observedPaths = [observedPaths];
        }

        var propertyManager = makePropertyManager(object);

        for (var i = 0, l = observedPaths.length; i < l; i++) {
            var aPath = keyPaths.toPath(observedPaths[i]);
            propertyManager.addPathObserver(aPath, aPath, observer, handler);
        }
    };

    /**
     * mvc.observer.unobservePath() removes a previously registered path observer
     *
     * This function is available by the shorthand mvc.unobservePath().
     *
     * @param {object} object The object being observed
     * @param {string|Array|keyPaths.Path} observedPaths The keyPaths used with properties.observe()
     * @param {?object} observer The previously-registered observer object
     * @param {function} handler The previously-registered handler function
     */
    properties.unobserve = function(object, observedPaths, observer, handler) {
        if (typeof handler !== "function") {
            throw new Error("Handler function is required");
        }
        if (!Array.isArray(observedPaths)) {
            observedPaths = [observedPaths];
        }

        var propertyManager = makePropertyManager(object);

        for (var i = 0, l = observedPaths.length; i < l; i++) {
            var aPath = keyPaths.toPath(observedPaths[i]);
            propertyManager.removePathObserver(aPath, aPath, observer, handler);
        }
    };

    /**
     * @param {object} object
     * @param {string|number|Array=} checkPath  (optional) A search path for possible changes.
     *                                          If missing, only object's own properties are checked.
     *                                          This is equivilent to calling properties.runObservers
     *                                          on every object along checkPath.
     */
    properties.runObservers = function(object, checkPath) {
        var propertyManager = getPropertyManager(object);
        if (propertyManager) {
            propertyManager.runObservers(true);
            if (checkPath) {
                checkPath = keyPaths.toPath(checkPath);
                if (checkPath[0]) {
                    var childObject = object[checkPath[0]];
                    if (childObject && typeof childObject === "object") {
                        properties.runObservers(childObject, checkPath.getSubpath());
                    }
                }
            }
        }
    };

    /**
     * Programatically indicates that a property value has changed. Useful to make setter functions observable.
     * Example:
     *     get amount() {
     *         return this._amount;
     *     },
     *     set amount(value) {
     *         this._amount = Number(value);
     *         properties.propertyChanged(this, "amount");
     *     }
     *
     * @param {object} object
     * @param {string|number} propertyName
     */
    function propertyChanged(object, propertyName) {
        var propertyManager = getPropertyManager(object);
        if (propertyManager) {
            propertyManager.propertyChanged(propertyName);
        }
    }

    properties.propertyChanged = propertyChanged;

    var _FROZEN_CONFIG_NAMES = {
        enumerable: 1,
        configurable: 1,
        writable: 1,
        get: 1,
        set: 1,
        value: 1
    };
    function _validateMetaName(metaName) {
        if (metaName in _FROZEN_CONFIG_NAMES) {
            throw new Error("Reserved property configuration name " + metaName);
        }
    }

    /**
     * Gets the configuration variable for an observable property, if it exists
     *
     * @param {object} object
     * @param {string} propertyName
     * @param {string} metaName
     * @returns {*}
     */
    properties.getPropertyMeta = function(object, propertyName, metaName) {
        _validateMetaName(metaName);
        var config = getManagedDescriptor(object, propertyName);
        return config && config[metaName];
    };

    /**
     * Sets the configuration variable for an observable property, converting it if necessary
     *
     * @param {object} object
     * @param {string} propertyName
     * @param {string} metaName
     * @param {*} value
     */
    properties.setPropertyMeta = function(object, propertyName, metaName, value) {
        _validateMetaName(metaName);
        var config = getManagedDescriptor(object, propertyName);
        if (!config) {
            config = convertProperty(object, propertyName);
        }
        config[metaName] = value;
    };

    /**
     * Deletes a configuration variable for an observable property, if it exists
     *
     * @param {object} object
     * @param {string} propertyName
     * @param {string} metaName
     */
    properties.deletePropertyMeta = function(object, propertyName, metaName) {
        _validateMetaName(metaName);
        var config = getManagedDescriptor(object, propertyName);
        if (config) {
            delete config[metaName];
        }
    };

    //
    // Private module functions
    //

    function assert(condition, message, ErrorClass) {
        if (!condition) {
            if (!ErrorClass) {
                ErrorClass = Error;
            }
            throw new ErrorClass(message);
        }
    }

    function isObject(thingy) {
        return thingy && typeof thingy === "object";
    }

    function _constructorOrObject(target) {
        if (typeof target === "function") {
            target = target.prototype;
        } else {
            assert(isObject(target), "Not a function or object", TypeError);
        }
        return target;
    }

    function nullFunction() {}

    function defineProperty(object, propertyName, descriptor) {
        var getter, setter,
            noSetterOrGetter,
            realValueProperty = VALUE_PROPERTY_PREFIX + propertyName,
            _get, _set;

        if (!("writable" in descriptor)) {
            descriptor.writable = true;
        }

        getter = descriptor.get;
        setter = descriptor.set;
        noSetterOrGetter = (!getter && !setter);

        _get = getter ? getter : noSetterOrGetter ? makeValueGetter(realValueProperty) : nullFunction;
        _get[DESCRIPTOR_PROPERTY] = descriptor;

        _set = noSetterOrGetter || setter ?  makeValueSetter(propertyName, realValueProperty, setter) : undefined;

        // Only used for converting previously-set properties:
        if (descriptor.value) {
            // In Firefox checking descriptor.value seems to perform a dynamic lookup
            // and so this check has to be done before defining the getter and setter.

            assert(noSetterOrGetter, "Can't set value on dynamic property");
            Object.defineProperty(object, realValueProperty, {
                value: descriptor.value,
                configurable: true
            });
        }

        Object.defineProperty(object, propertyName, {
            get: _get,
            set: _set,
            enumerable: !!descriptor.enumerable,
            configurable: !!descriptor.configurable
        });
    }

    function makeValueGetter(realValueProperty) {
        return function _get() {
            /* jshint validthis:true */
            return this[realValueProperty];
        };
    }

    function makeValueSetter(propertyName, realValueProperty, setter) {
        return function _set(value) {
            /* jshint validthis:true */
            if (setter) {
                setter.call(this, value);
            } else {
                Object.defineProperty(this, realValueProperty, {
                    value: value,
                    configurable: true
                });
            }
            propertyChanged(this, propertyName);
        };
    }

    function convertProperty(object, propertyName) {
        var propertyOwner = findPropertyOwner(object, propertyName),
            descriptor;
        if (propertyOwner) {
            try {
                descriptor = Object.getOwnPropertyDescriptor(propertyOwner, propertyName);
            } catch (e) {
                descriptor = {configurable: false};
            }
            assert(descriptor.configurable || descriptor.get, "Can't observe non-configurable value property " + propertyName);
        } else {
            descriptor = {};
            propertyOwner = object;
        }

        defineProperty(propertyOwner, propertyName, descriptor);
        if ("value" in descriptor) {
            Object.defineProperty(propertyOwner, VALUE_PROPERTY_PREFIX + propertyName, {
                value: descriptor.value,
                configurable: true
            });
        }
        return descriptor;
    }

    function convertArrayToObserveLength(array) {
        if (_setPrototypeOf) {
            // Change its prototype to our custom Array sub-prototype
            _setPrototypeOf(array, _ArraySubPrototype);
        } else {
            // Add the override methods
            Object.defineProperties(array, _arrayOverrideDescriptors);
        }
    }

    function getManagedDescriptor(object, propertyName) {
        var propertyDescriptor = getPropertyDescriptor(object, propertyName);
        return propertyDescriptor && propertyDescriptor.get && propertyDescriptor.get[DESCRIPTOR_PROPERTY];
    }

    function makePropertyObservable(object, propertyName, descriptorMixin) {
        var managedDescriptor = getManagedDescriptor(object, propertyName);

        if (!managedDescriptor) {
            if (object instanceof Array && propertyName === "length") {
                convertArrayToObserveLength(object);
                managedDescriptor = {};
            } else if (propertyName in object) {
                managedDescriptor = convertProperty(object, propertyName);
            } else {
                defineProperty(object, propertyName, descriptorMixin || {});
            }
        }

        if (managedDescriptor && descriptorMixin) {
            for (var key in descriptorMixin) {
                assert( !(key in managedDescriptor), key + " is already defined on " + propertyName, Error);
                managedDescriptor[key] = descriptorMixin[key];
            }
        } else if (!managedDescriptor) {
            managedDescriptor = descriptorMixin || {};
        }

        return managedDescriptor;
    }

    ////
    //// Converting Arrays for length observing.
    ////
    //// Array.length can't be observed directly, so this overrides those Array methods
    //// that cause array.length to change. It doesn't modify Array.prototype.
    ////

    /**
     * Wraps the provided Array functions in versions that call length observers
     *
     * Returns a list of property descriptors for Object.create or Object.defineProperties,
     * which match the behavior of the native functions. For example, they won't show up
     * in for..in loops.
     *
     * @private
     */
    function _makeArrayOverrideDescriptors(methodNames) {
        var descriptors = {},
            i, l,
            methodName;

        /** @this {Array} */
        function _wrapArrayFunc(arrayFunction) {
            return function() {
                var result = arrayFunction.apply(this, arguments);
                makePropertyManager(this).propertyChanged("length");
                return result;
            };
        }

        for (i = 0,l = methodNames.length; i < l; i++) {
            methodName = methodNames[i];
            descriptors[methodName] = {
                "configurable": true,

                "value": _wrapArrayFunc(Array.prototype[methodName])
            };
        }
        return descriptors;
    }

    _arrayOverrideDescriptors = _makeArrayOverrideDescriptors(["push", "pop", "shift", "unshift", "splice"]);
    _setPrototypeOf = Object.setPrototypeOf;

    /* jshint proto:true */
    if (!_setPrototypeOf && {}.__proto__) {
        // Create shim for setPrototypeOf using __proto__ assignment
        _setPrototypeOf = function(child, parent) {
            child.__proto__ = parent;
        };
    }
    /* jshint proto:false */

    if (_setPrototypeOf) {
        _ArraySubPrototype = Object.create(Array.prototype, _arrayOverrideDescriptors);
    }

    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Finds the object that "owns" a property, tracking the prototype chain.
     * Returns null if it's not defined anywhere in the prototype chain.
     *
     * @param {object} instance
     * @param {string} propertyName
     * @returns {object=}
     */
    function findPropertyOwner(instance, propertyName) {
        if (propertyName in instance) {
            do {
                if (_hasOwnProperty.call(instance, propertyName)) {
                    return instance;
                }
            } while ( (instance = Object.getPrototypeOf(instance)) );
        }
        return null;
    }

    function getPropertyDescriptor(object, propertyName) {
        var owner = findPropertyOwner(object, propertyName);
        if (owner) {
            return Object.getOwnPropertyDescriptor(owner, propertyName);
        }
    }

    function getPropertyManager(object) {
        if (object.hasOwnProperty(PROPERTY_MANAGER_NAME)) {
            return object[PROPERTY_MANAGER_NAME];
        }
    }

    function makePropertyManager(object) {
        var propertyManager = getPropertyManager(object);

        if (!propertyManager && object !== Array.prototype && object !== Object.prototype) {
            // Create _properties object through the prototype chain.
            // Support prototypical inheritence of property values!
            var prototype = null,
                prototypeManager;

            if (object === window || "nodeType" in object || object.constructor && typeof object.constructor !== "function") {
                // DOM nodes are "host" objects and do not behave in reliable cross-browser ways.
                // They can't be observed and are essentially non-configurable, even though not every browser
                // marks their properties as such. So detect them and throw an error here.
                throw new TypeError("Can't observe host objects");
            }

            if ( (prototype = Object.getPrototypeOf(object)) ) {
                prototypeManager = makePropertyManager(prototype);
            }

            propertyManager = new PropertyManager(object, prototypeManager);

            Object.defineProperty(object, PROPERTY_MANAGER_NAME, {
                value: propertyManager
            });
        }

        return propertyManager;
    }

    ////
    //// Native observer workaround for Chrome
    ////
    //// Chrome does not preserve getters and setters on array indexes when the array is modified
    //// by one of the native Array methods, like sort().
    ////
    //// Fortunately, Chrome includes a native observable API based on a feature proposed for
    //// ECMAScript 7.
    ////
    //// Safari, Internet Explorer, and Firefox all work as expected.
    ////

    USE_NATIVE_OBSERVER = Object.observe && Object.deliverChangeRecords && /Chrome/.test(navigator.userAgent);

    function isArrayIndex(key) {
        return typeof key === "number" && key % 1 === 0 && key >= 0 ||
            /^\d+$/.test(key);
    }

    function _nativeObserver(changes) {
        /* jshint validthis:true */

        var i, l,
            change, propertyName;

        for (i = 0, l = changes.length; i < l; i++) {
            change = changes[i];
            propertyName = change.name;

            // Currently, only using the native observer on array indexes.
            if (isArrayIndex(propertyName) && propertyName in this.observedProperties) {
                // Only trigger on the same sort of updates we'd get with property setters
                // Until every browser supports native observers
                if (change.type === "update") {
                    this.updates[propertyName] = 1;
                }
            }
        }
    }

    /**
     * @class
     *
     * The PropertyManager class manages an object's dynamic/observable properties, including
     * tracking their current values and calling observers when they change.
     */
    var PropertyManager = classes.extend(Object, {
        /**
         * @param {object} object
         * @param {PropertyManager=} prototypeStore
         * @constructor
         */
        constructor: function PropertyManager(object, prototypeStore) {
            if (!prototypeStore) {
                prototypeStore = null;
            }

            this.object = object;

            this.pathObservers = [];

            this.updates = {}; // Map of property/keys to new values
            this.updateTimer = 0;
            this.observedProperties = {};

            // Values currently being observed as paths, useful to detach the path observer later.
            this.observingValues = {};

            if (object instanceof Array && USE_NATIVE_OBSERVER) {
                // Chrome can't handle directly observing array indexes, but every other browser can
                this.nativeObserver = _nativeObserver.bind(this);
                Object.observe(object, this.nativeObserver);
            }
        },

        observingNatively: function(propertyName) {
            return this.nativeObserver && isArrayIndex(propertyName);
        },

        getValue: function(propertyName) {
            return this.values[propertyName];
        },

        setValue: function(propertyName, value) {
            this.values[propertyName] = value;
            return value;
        },

        hasProperty: function(propertyName) {
            return propertyName in this.values;
        },

        propertyChanged: function(propertyName) {
            this.updates[propertyName] = 1;

            if (this.pathObservers.length && !this.updateTimer) {
                this.updateTimer = setTimeout(this.runObservers.bind(this));
            }
        },

        /**
         * [addPathObserver description]
         * @param {keyPaths.Path} observedPath  The path whose change triggers an update
         * @param {keyPaths.Path} requestedPath The path actually requested. (Could be different when
         *                                   observing a computed property with dependsOn keyPaths)
         * @param {object?} observer
         * @param {function} handler
         */
        addPathObserver: function(observedPath, requestedPath, observer, handler) {
            var localKey            = observedPath[0],
                object              = this.object,
                subpath             = observedPath.getSubpath(),
                managedDescriptor   = makePropertyObservable(object, localKey),
                dependsOn           = managedDescriptor.dependsOn,
                dependsOnPaths      = [],
                i, l, dependentPath, currentLocalValue;

            if (dependsOn) {
                for (i = 0,l = dependsOn.length; i < l; i++) {
                    dependentPath = keyPaths.toPath(dependsOn[i]);
                    dependsOnPaths.push(dependentPath);
                    this.addPathObserver(dependentPath, requestedPath, observer, handler);
                    dependsOnPaths.push(dependentPath);
                }
            }

            this.pathObservers.push({
                path: observedPath,
                subpath: subpath,
                observer: observer,
                handler: handler,
                requestedPath: requestedPath,
                dependsOn: dependsOnPaths
            });

            this.addObservedProperty(localKey);

            currentLocalValue = this.object[localKey];
            if (subpath.length && isObject(currentLocalValue)) {
                properties.observe(currentLocalValue, subpath, this, this.pathChanged);
            }
        },

        removePathObserver: function(observedPath, requestedPath, observer, handler) {
            var pathObservers = this.pathObservers,
                localKey = observedPath[0],
                currentLocalValue = this.object[localKey],
                subpath = observedPath.getSubpath(),

                otherPathsObservingKey = 0,
                pathObserver, observedProperties, dependsOnPaths,

                pi, di, dl;

            // Don't cache pathObservers.length. This array is being mutated by both
            // this loop and the recursively-called dependsOn removals.
            for (pi = 0; pi < pathObservers.length; pi++) {
                pathObserver = pathObservers[pi];
                if (pathObserver.path.equals(observedPath) &&
                    pathObserver.requestedPath.equals(requestedPath) &&
                    pathObserver.observer === observer &&
                    pathObserver.handler === handler) {

                    observedProperties = {};
                    observedProperties[localKey] = 1;

                    if (subpath.length && isObject(currentLocalValue)) {
                        properties.unobserve(currentLocalValue, subpath, this, this.pathChanged);
                    }

                    dependsOnPaths = pathObserver.dependsOn;
                    for (di = 0, dl = dependsOnPaths.length; di < dl; di++) {
                        this.removePathObserver(dependsOnPaths[di], requestedPath, observer, handler);
                    }

                    // Remove it from the array
                    pathObservers.splice(pi, 1);
                    pi--;
                } else if (pathObserver.path[0] === localKey) {
                    otherPathsObservingKey++;
                }
            }
            if (!otherPathsObservingKey) {
                this.removeObservedProperty(localKey);
            }
        },

        addObservedProperty: function(propertyName) {
            this.observedProperties[propertyName] = 1;
        },

        removeObservedProperty: function(propertyName) {
            delete this.observedProperties[propertyName];
        },

        runObservers: function(immediate) {
            function _pathFilter(record) {
                return record.path[0] === propertyName;
            }

            var object          = this.object,
                updates         = this.updates,
                observingValues = this.observingValues,

                propertyName, newValue, oldValue, pathObservers,
                i, l,
                subpath, newPathValue,
                pathObserver;

            if (immediate && this.nativeObserver) {
                Object.deliverChangeRecords(this.nativeObserver);
            }

            // Reset observer timeout
            clearInterval(this.updateTimer);
            this.updateTimer = 0;

            // jshint forin:false
            for (propertyName in updates) {
                newValue = object[propertyName];
                oldValue = observingValues[propertyName];

                pathObservers = this.pathObservers.filter(_pathFilter);

                for (i = 0, l = pathObservers.length; i < l; i++) {
                    pathObserver = pathObservers[i];

                    if (isObject(oldValue)) {
                        properties.unobserve(oldValue, pathObserver.subpath, this, this.pathChanged);
                    }

                    if (isObject(newValue)) {
                        properties.observe(newValue, pathObserver.subpath, this, this.pathChanged);
                    }

                    subpath         = pathObserver.subpath;
                    newPathValue    = keyPaths.getValue(newValue, subpath);

                    this.pathChanged(null, pathObserver.path, newPathValue, pathObserver);
                }

                observingValues[propertyName] = newValue;
            }

            this.updates = {};
        },

        // A change happened in somewhere below this object in a path
        /*jshint unused:true */
        pathChanged: function(object, path, newValue, _pathObserver) {
            /*jshint unused:false */

            var pathObservers,
                i, l,
                pathObserver, requestedPath;

            pathObservers = _pathObserver ? [_pathObserver]
                : this.pathObservers.filter(function(pathObserver) {
                return path.equals(pathObserver.subpath);
            });

            for (i = 0, l = pathObservers.length; i < l; i++) {
                pathObserver = pathObservers[i];
                requestedPath = pathObserver.requestedPath;

                if (pathObserver.requestedPath !== pathObserver.path) {
                    // It's a dependsOn observer, get the value of the requested path
                    newValue = keyPaths.getValue(this.object, requestedPath);
                }
                try {
                    pathObserver.handler.call(pathObserver.observer, this.object, requestedPath, newValue);
                } catch (e) {
                    console.error("Error found while calling path observer: " + e);
                    if (e.stack) {
                        console.error(e.stack);
                    }
                }
            }
        },
    });

    return properties;
});