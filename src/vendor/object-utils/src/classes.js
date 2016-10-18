define(function() {
    "use strict";

    // Credit where credit is due: the concept of efficiently supporting strict mode by placing a super method
    // on the constructor itself comes from Closure Library (https://github.com/google/closure-library)

    var _defineProperty             = Object.defineProperty,
        _defineProperties           = Object.defineProperties,
        _getOwnPropertyDescriptor   = Object.getOwnPropertyDescriptor;

    function _noSuper() {
        throw new Error("No super method");
    }

    function _bindMethod(methodName, methodFunc, superPrototype) {
        var superMethod = superPrototype && superPrototype[methodName];

        // Makes them non-enumerable and non-writable
        _defineProperties(methodFunc, {
            super: {
                value: superMethod ? superMethod.call.bind(superMethod) : _noSuper
            },
            
            // applySuper is DEPRECATED for serious performance reasons.
            // Instead use func.superFunc.apply(...).
            applySuper: {
                // The above bind() method for super has the reverse effect on applySuper
                // in most browsers, as of 2016-04-05 perf testing. This method is faster.
                value: superMethod ? function(thisObj, args) {
                    return superMethod.apply(thisObj, args);
                } : _noSuper
            },
            superFunc: {
                value: superMethod || _noSuper
            }
        });
    }

    function _defineMethods(target, methods, superPrototype) {
        for (var propertyName in methods) {
            if (methods.hasOwnProperty(propertyName)) {
                var propertyDescriptor = _getOwnPropertyDescriptor(methods, propertyName),
                    propertyValue = propertyDescriptor.value;

                if (typeof propertyValue === "function") {
                    _bindMethod(propertyName, methods[propertyName], superPrototype);
                    _defineProperty(target, propertyName, {
                        value: methods[propertyName],
                        writable: true,
                        configurable: true
                    });
                } else if (propertyDescriptor.get || propertyDescriptor.set) {
                    _defineProperty(target, propertyName, propertyDescriptor);
                } else {
                    throw new Error("Not a method: " + propertyName);
                }
            }
        }
    }

    /**
     * Defines a class, mimicking the behavior of ECMAScript's class syntax as much as possible within ES5 code.
     * Supports dynamic getters and setters, and prototype methods. Both are handled similarly to ES6 classes,
     * including marking methods as non-enumerable.
     *
     * Any JavaScript constructor can be used for superConstructor, including Object; to create a new base class,
     * you would normally use Object for the superConstructor. If you wish to inherit from null so even
     * Object.prototype's methods aren't inherited, use null for the superConstructor.
     *
     * Adds the method '_callSuper(thisObj, methodName, ...args)' to constructor, for calling super-methods.
     *
     * constructor will also inherit any static properties defined on superConstructor, and can define its
     * own static methods in the static object. Static methods cannot use _callSuper(); instead, they should
     * call an overridden method directly using SuperConstructor.methodName.call(this, ...).
     *
     *    static: {
     *        aStaticMethod: function() { ... }
     *    }
     *
     * This cannot be used to subclass host/DOM constructors or exotic built-ins like Array, Function, or RegExp.
     *
     * @param {function=} superConstructor  A super class, constructor, or null. Any constructor function can be used.
     *                                      Use Object to inherit from Object (the default), and null to inherit from
     *                                      nothing at all.
     * @param {object} methods
     * @returns {*}
     */
    function extend(superConstructor, methods) {
        if (!methods) {
            methods = {};
        }

        var constructor = methods.hasOwnProperty("constructor") && methods.constructor;

        if (!constructor) {
            // Generate default constructor
            constructor = (superConstructor && superConstructor !== Object) ? function AnonymousClass() {
                return superConstructor.apply(this, arguments) || this;
            } : function AnonymousClass() { };
        }
        _bindMethod("constructor", constructor, superConstructor && superConstructor.prototype);
        delete methods.constructor;

        // Basic inheritance setup
        inherits(constructor, superConstructor);

        // Copy static methods to constructor
        var statics = methods.static;
        delete methods.static;
        if (statics) {
            _defineMethods(constructor, statics, superConstructor);
        }
        if (superConstructor && superConstructor !== Object) {
            inheritStatics(constructor, superConstructor);
        }

        // Setup prototype methods
        _defineMethods(constructor.prototype, methods, superConstructor && superConstructor.prototype);

        return constructor;
    }

    /**
     * Similar to Object.create, classes.createObject() generates a child of the given prototype.
     * However, it uses the classes.extend() syntax for the provided methods and function.super() is supported.
     *
     * @param {object?} prototype
     * @param {object?} methods
     * @returns {object}
     */
    function createObject(prototype, methods) {
        var child = Object.create(prototype);

        if (methods) {
            _defineMethods(child, methods, prototype);
        }

        return child;
    }

    /**
     * Causes constructor.prototype to inherit from superConstructor.prototype.
     * Adds the method '_callSuper(thisObj, methodName, ...args)' to constructor, for calling super-methods
     *
     * Should be called before constructor's prototype is modified.
     *
     * This function is a low-level implementation designed to work with vanilla JavaScript constructors
     * and prototypes. For a more full-featured ES6-style syntax, use classes.extend().
     *
     * @param {function} constructor        A constructor function
     * @param {function?} superConstructor  The super-constructor function it's inheriting from, or null
     */
    function inherits(constructor, superConstructor) {
        var superPrototype = superConstructor ? superConstructor.prototype : null,
            arraySlice = Array.prototype.slice;

        constructor.prototype = Object.create(superPrototype, {
            constructor: {
                value: constructor
            }
        });

        _defineProperty(constructor, "_callSuper", {
            value: function _callSuper(thisObj, methodName /*,  ...args */) {
                return superPrototype[methodName].apply(thisObj, arraySlice.call(arguments, 2));
            }
        });
    }

    /**
     * Copies all static properties from superConstructor to constructor, except any overridden by constructor.
     *
     * This function is a low-level implementation designed to work with vanilla JavaScript constructors.
     * For a more full-featured ES6-style syntax, use classes.extend().
     *
     * There is no low level '_callSuper()' equivalent for static methods, but you can call the super implemtation
     * directly with MySuperClass.methodName.call(this, ...args).
     *
     * Should be called before constructor's prototype is modified.
     *
     * @param {function} constructor        A constructor function
     * @param {function?} superConstructor  The super-constructor function it's inheriting from, or null
     */
    function inheritStatics(constructor, superConstructor) {
        var propertyName, propertyNames, i, l;

        propertyNames = Object.getOwnPropertyNames(superConstructor);
        for (i = 0, l = propertyNames.length; i < l; i++) {
            propertyName = propertyNames[i];
            if ( !(propertyName in constructor) ) {
                _defineProperty(constructor, propertyName, _getOwnPropertyDescriptor(superConstructor, propertyName));
            }
        }
    }

    return {
        createObject: createObject,
        extend: extend,
        inherits: inherits,
        inheritStatics: inheritStatics,
    };
});