define([
    "test/unit/baseTest",
    "intern/chai!assert",
    "src/properties",
    "src/keyPaths",
    "src/classes"
], function(registerSuite, assert, properties, keyPaths, classes) {
    "use strict";

    // IE9 doesn't support strict mode, so doing this instead.
    // This will be null in strict-supporting browsers and window elsewhere.
    var noThis = this,

        observedPath, observedValue, observedObject, observedThis,
        observerFired = 0;

    function _handler(obj, keyPath, newValue) {
        /* jshint validthis:true */

        if (newValue === undefined) {
            console.trace();
        }

        observerFired++;
        observedPath = keyPath;
        observedValue = newValue;
        observedObject = obj;
        observedThis = this;
    }

    function _resetHandler() {
        observerFired = 0;
        observedPath = observedValue = observedObject = observedThis = undefined;
    }

    registerSuite({

        name: "Properties",

        beforeEach: function() {
            _resetHandler();
        },

        "Test properties interface": function() {
            assert.isObject(properties, "properties module should exist");

            assert.isFunction(properties.defineProperties, "properties.define");
            assert.isFunction(properties.observe, "properties.observe");
            assert.isFunction(properties.unobserve, "properties.unobserve");
            assert.isFunction(properties.propertyChanged, "properties.propertyChanged");
            assert.isFunction(properties.runObservers, "properties.runObservers");
            assert.isFunction(properties.getPropertyMeta, "properties.getPropertyMeta");
        },

        "Observing declared properties": function() {

            // Observe computed property with context
            var context = {
                handler: _handler
            };

            // Observer watch function
            function _resetAndUnbind() {
                _resetHandler();

                properties.unobserve(personInstance, "firstName", null, _handler);
                properties.unobserve(personInstance, "lastName", null, _handler);
                properties.unobserve(personInstance, "fullName", null, _handler);

                properties.unobserve(personInstance, "firstName", context, context.handler);
                properties.unobserve(personInstance, "lastName", context, context.handler);
                properties.unobserve(personInstance, "fullName", context, context.handler);

            }

            // Verify bad arguments throw TypeErrors

            assert.throws(function() {
                properties.defineProperties(null, {});
            }, TypeError);
            assert.throws(function() {
                properties.defineProperties({}, null);
            }, TypeError);
            assert.doesNotThrow(function() {
                properties.defineProperties({}, {});
            });

            // Test constructor

            function Person(firstName, lastName, age) {
                this.firstName = firstName || "";
                this.lastName = lastName || "";

                // This isn't pre-marked as observable:
                this.age = age || 0;
            }

            properties.defineProperties(Person.prototype, {
                firstName: {},
                lastName: {someMetaVariable: "some value"},
                fullName: {
                    get: function() {
                        return this.firstName + " " + this.lastName;
                    },
                    dependsOn: ["firstName", "lastName"]
                }
            });

            // Test basic property definitions and calcualted properties

            assert.ok("firstName" in Person.prototype, "firstName should be defined on Person.prototype");
            assert.ok("lastName" in Person.prototype, "lastName should be defined on Person.prototype");
            assert.ok("fullName" in Person.prototype, "fullName should be defined on Person.prototype");

            var personInstance = new Person("Joe", "Schmoe", 30);
            assert.equal(personInstance.firstName, "Joe", "First name should be set");
            assert.equal(personInstance.lastName, "Schmoe", "Last name should be set");
            assert.equal(personInstance.fullName, "Joe Schmoe", "Full name should be calculated");

            var lastNameMeta = properties.getPropertyMeta(personInstance, "lastName", "someMetaVariable");
            assert.equal(lastNameMeta, "some value", "someProperty config variable should have been set");

            personInstance.lastName = "Bob";
            assert.equal(personInstance.fullName, "Joe Bob", "Full name should be re-calculated");

            // Observe value property

            properties.observe(personInstance, "firstName", null, _handler);
            properties.runObservers(personInstance); // Run observers from initial instantiation

            //assert.equal(observerFired, 0, "Observer should not have recorded changes at instantiation");

            _resetHandler();
            properties.runObservers(personInstance);
            assert.notOk(observerFired, "Observer shouldn't have fired again on no updates");

            _resetAndUnbind();

            properties.observe(personInstance, "firstName", null, _handler);
            personInstance.firstName = "J";
            personInstance.firstName = "Ji";
            personInstance.firstName = "Jim";
            assert.equal(observerFired, 0, "Observers fire asynchronously");
            properties.runObservers(personInstance);
            assert.equal(observerFired, 1, "Observer should have only fired once for all three changes");
            assert.instanceOf(observedPath, keyPaths.Path, "observedPath should be a keyPaths.Paths object");
            assert.ok(observedPath.equals("firstName"), "observedPath should be firstName");
            assert.equal(observedValue, "Jim", "New value is 'Jim'");

            // Unobserve value property

            _resetAndUnbind();
            properties.observe(personInstance, "firstName", null, _handler);

            personInstance.firstName = "John";
            properties.runObservers(personInstance);
            assert.equal(observerFired, 1, "Observer should have fired");

            _resetHandler();
            properties.unobserve(personInstance, "firstName", null, _handler);
            personInstance.firstName = "James";
            assert.equal(observerFired, 0, "Observer shouldn't fire after detached");

            _resetAndUnbind();

            properties.observe(personInstance, "fullName", context, context.handler);

            personInstance.firstName = "Jim";
            properties.runObservers(personInstance);
            assert.equal(observerFired, 1, "Observer should have fired on change to computed property's dependancy");
            assert.equal("" + observedPath, "fullName", "computed fullName property should have changed");
            assert.equal(observedValue, "Jim Bob", "New computed value should be Jim Bob");

            assert.equal(observedThis, context, "Observed 'this' value should be the provided context object");

            // Adding and removing multiple observers when dependsOn is set

            _resetAndUnbind();
            properties.observe(personInstance, "firstName", context, context.handler);
            properties.observe(personInstance, "fullName", context, context.handler);
            personInstance.firstName = "Jenny";
            properties.runObservers(personInstance);
            assert.equal(observerFired, 2, "Two observers should have fired (firstName and fullName)");

            assert.doesNotThrow(function() {
                properties.unobserve(personInstance, "fullName", context, context.handler);
            }, "Unobserving fullName shouldn't throw an error");

            _resetHandler();
            personInstance.firstName = "Jill";
            properties.runObservers(personInstance);
            assert.equal(observerFired, 1, "One observer should have fired (firstName)");
        },

        "Storing arbitrary metadata on properties": function() {
            var vanillaObject = {};
            assert.strictEqual(properties.getPropertyMeta(vanillaObject, "yo", "config"), undefined,
                         "Non-existent property's config variables should be undefined");

            properties.setPropertyMeta(vanillaObject, "yo", "config", "some value");
            assert.strictEqual(properties.getPropertyMeta(vanillaObject, "yo", "config"), "some value",
                "Setting a config variable on non-existent property should create it");

            properties.setPropertyMeta(vanillaObject, "yo", "config", "another value");
            assert.strictEqual(properties.getPropertyMeta(vanillaObject, "yo", "config"), "another value",
                "Changing a config variable on an existent property should work too");

            properties.deletePropertyMeta(vanillaObject, "yo", "config");
            assert.strictEqual(properties.getPropertyMeta(vanillaObject, "yo", "config"), undefined,
                "Deleting a config variable should work");

            // Defining with defineProperties:
            vanillaObject = {};
            properties.defineProperties(vanillaObject, {
                someProperty: {
                    meta: "meta value"
                }
            });
            assert.strictEqual(properties.getPropertyMeta(vanillaObject, "someProperty", "meta"), "meta value");
        },

        "Observing vanilla JavaScript objects": function() {
            var vanillaObject = {
                name: "Jane"
            };

            properties.observe(vanillaObject, "name", null, _handler);
            properties.runObservers(vanillaObject);
            assert.equal(observerFired, 0, "Observer shouldn't have fired already initial value");

            _resetHandler();

            assert.equal(observerFired, 0, "Observer shouldn't have fired yet");
            vanillaObject.name = "Jill";
            assert.equal(observerFired, 0, "Observers fire asynchronously");

            properties.runObservers(vanillaObject);
            assert.equal(observerFired, 1, "Observer should have fired after setting name to Jill");
            assert.instanceOf(observedPath, keyPaths.Path, "observedPath should be a keyPaths.Paths object");
            assert.equal("" + observedPath, "name", "observedPath should be name");
            assert.equal(observedValue, "Jill", "New value is 'Jill'");
            assert.equal(observedObject, vanillaObject, "observed object should be vanillaObject");
            assert.equal(observedThis, noThis, "observed 'this' should be null (or window in non-strict mode");

            properties.unobserve(vanillaObject, "name", null, _handler);
            _resetHandler();

            vanillaObject.name = "Julia";
            properties.runObservers(vanillaObject);
            assert.equal(observerFired, 0, "Observer shouldn't have fired again after unbinding");

            // Deleting properties cannot be detected with the current method, but the Chrome workaround
            // would make deleting detectable there. This test verifies that it remains undetectable
            // for consistent cross-browser behavior.

            _resetHandler();
            delete vanillaObject.name;
            properties.runObservers(vanillaObject);
            assert.equal(observerFired, 0, "Deleting a property does not trigger an observer");
        },

        "properties.defineProperties: observing generic computed/getter properties": function() {
            //
            // Vanilla JS object
            //

            var vanillaObject = {
                firstName: "Mary",
                lastName: "Jane",
                get fullName() {
                    return this.firstName + " " + this.lastName;
                }
            };
            properties.defineProperties(vanillaObject, {
                fullName: {
                    dependsOn: ["firstName", "lastName"]
                }
            });

            properties.observe(vanillaObject, "fullName", null, _handler);

            assert.equal(vanillaObject.fullName, "Mary Jane", "Generic object: Computed property should be defined");

            vanillaObject.firstName = "Beth";
            properties.runObservers(vanillaObject);

            assert.equal(observerFired, 1, "Generic object: Observer should have fired on change to dependancy");
            assert.equal(observedObject, vanillaObject, "Generic object: Observer fired on vanillaObject");
            assert.equal("" + observedPath, "fullName", "Generic object: computed fullName property should have changed");
            assert.equal(observedValue, "Beth Jane", "Generic object: computed fullName value should be Beth Jane");

            _resetHandler();

            //
            // Vanilla JS Constructor and Object.defineProperty
            //

            function VanillaConstructor(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }
            Object.defineProperties(VanillaConstructor.prototype, {
                fullName: {
                    get: function() {
                        return this.firstName + " " + this.lastName;
                    }
                }
            });
            properties.defineProperties(VanillaConstructor, {
                fullName: {
                    dependsOn: ["firstName", "lastName"]
                }
            });

            var vanillaInstance = new VanillaConstructor("John", "King");
            assert.equal(vanillaInstance.fullName, "John King", "Generic object: Computed property should be defined");

            properties.observe(vanillaInstance, "fullName", null, _handler);
            vanillaInstance.firstName = "Stephen";
            properties.runObservers(vanillaInstance);

            assert.equal(observerFired, 1, "Generic instance: Observer should have fired on change to dependancy");
            assert.equal(observedObject, vanillaInstance, "Generic instance: Observer fired on vanillaInstance");
            assert.equal("" + observedPath, "fullName", "Generic instance: computed fullName property should have changed");
            assert.equal(observedValue, "Stephen King", "Generic instance: computed fullName value should be Stephen King");

            _resetHandler();

            //
            // classes.extend() syntax
            //

            var ClassSyntax = classes.extend(Object, {
                constructor: function(firstName, lastName) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                },
                get fullName() {
                    return this.firstName + " " + this.lastName;
                }
            });
            properties.defineProperties(ClassSyntax, {
                fullName: {
                    dependsOn: ["firstName", "lastName"]
                }
            });

            var classInstance = new ClassSyntax("George", "Washington");
            assert.equal(classInstance.fullName, "George Washington", "Class syntax: Computed property should be defined");

            properties.observe(classInstance, "fullName", null, _handler);
            classInstance.firstName = "Booker T.";
            properties.runObservers(classInstance);

            assert.equal(observerFired, 1, "Class syntax: Observer should have fired on change to dependancy");
            assert.equal(observedObject, classInstance, "Class syntax: Observer fired on classInstance");
            assert.equal("" + observedPath, "fullName", "Class syntax: computed fullName property should have changed");
            assert.equal(observedValue, "Booker T. Washington", "Class syntax: computed fullName value should be Booker T. Washington");
        },

        "Observing indexes on vanilla JavaScript arrays": function() {
            var vanillaArray = ["zero", "one", "two", "three", "four"];
            window.vanillaArray = vanillaArray;

            properties.observe(vanillaArray, 1, null, _handler);

            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 0, "Observer shouldn't have fired already initial value");

            _resetHandler();
            vanillaArray[1] = "yi";
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Observer should have fired from setting index 1");
            assert.equal(observedValue, "yi", "New value should be 'yi'");

            _resetHandler();
            vanillaArray[2] = "er";
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 0, "Observer shouldn't have fired from setting index 2");

            _resetHandler();
            vanillaArray.reverse();
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Observer should fire when calling array.reverse()");
            assert.equal(observedValue, "three", "Reversed item 1 should be 'three'");

            _resetHandler();
            vanillaArray.sort();
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Observer should fire when calling array.sort()");
            assert.equal(observedValue, "four", "Sorted item 1 should be 'four'");

            _resetHandler();
            properties.unobserve(vanillaArray, 1, null, _handler);
            vanillaArray[1] = "ichi";
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 0, "Index 1 observer shouldn't fire after being unbound");
        },

        "Observing array.length": function() {
            var vanillaArray = ["zero", "one", "two", "three", "four"],
                result;

            assert.doesNotThrow(function() {
                properties.observe(vanillaArray, "length", null, _handler);
            }, "Array.length should be observable");

            result = vanillaArray.push("five");
            assert.equal(result, 6, "array.push should return the new length (6)");
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Array length should respond to push()");
            assert.equal("" + observedPath, "length", "Observed path should be 'length'");
            assert.equal(observedValue, 6, "Length is 6 after push");

            _resetHandler();
            result = vanillaArray.pop();
            assert.equal(result, "five", "array.pop should return the last element (five)");
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Array length should respond to push()");
            assert.equal("" + observedPath, "length", "Observed path should be 'length'");
            assert.equal(observedValue, 5, "Length is 5 after pop");

            _resetHandler();
            result = vanillaArray.shift();
            assert.equal(result, "zero", "array.shift should return the first element (zero)");
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Array length should respond to shift()");
            assert.equal("" + observedPath, "length", "Observed path should be 'length'");
            assert.equal(observedValue, 4, "Length is 4 after shift");

            _resetHandler();
            result = vanillaArray.unshift("zero");
            assert.equal(result, 5, "array.unshift should return the new length (5)");
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Array length should respond to unshift()");
            assert.equal("" + observedPath, "length", "Observed path should be 'length'");
            assert.equal(observedValue, 5, "Length is 5 after unshift");

            _resetHandler();
            result = vanillaArray.splice(1, 3);
            assert.deepEqual(result, ["one", "two", "three"], "array.splice should return the removed elements");
            properties.runObservers(vanillaArray);
            assert.equal(observerFired, 1, "Array length should respond to splice()");
            assert.equal("" + observedPath, "length", "Observed path should be 'length'");
            assert.equal(observedValue, 2, "Length is 2 after splice");
        },

        "Observing keyPaths": function() {
            var testObject = {},
                itemOnePath = keyPaths.toPath("collection.1.value");

            properties.observe(testObject, itemOnePath, null, _handler);

            function assertHandlerFired(_times, _path, _value, _object, message) {
                assert.equal(observerFired, _times, message + ": observerFired");
                assert.equal(observedPath + "", _path + "", message + ": observedPath");
                assert.equal(observedValue, _value, message + ": observedValue");
                assert.equal(observedObject, _object, message + ": observedObject");
            }

            testObject.collection = [
                {id:0, value: 0},
                {id:1, value: 10},
                {id:2, value: 20},
                {id:3, value: 30}
            ];
            var itemOne = testObject.collection[1],
                itemTwo = testObject.collection[2];

            assert.equal(observerFired, 0, "Observers fire asychronously");
            properties.runObservers(testObject);
            assertHandlerFired(1, itemOnePath, 10, testObject, "Adding collection");

            _resetHandler();
            itemOne.value = 15;
            properties.runObservers(testObject, itemOnePath);
            assertHandlerFired(1, itemOnePath, 15, testObject, "Setting value");

            _resetHandler();
            itemTwo.value = "Item 2 set value";
            properties.runObservers(testObject, itemOnePath);
            assert.equal(observerFired, 0, testObject, "Not observing item 2");

            _resetHandler();
            var newItemOne = {id:10, value:100};
            testObject.collection[1] = newItemOne;
            properties.runObservers(testObject, itemOnePath);
            assertHandlerFired(1, itemOnePath, 100, testObject, "Replacing item 1 in collection");

            _resetHandler();
            newItemOne.value = 150;
            properties.runObservers(testObject, itemOnePath);
            assertHandlerFired(1, itemOnePath, 150, testObject, "Setting new item's value");

            _resetHandler();
            itemOne.value = 13;
            properties.runObservers(testObject, itemOnePath);
            assert.equal(observerFired, 0, "Old item's change observer should have been unbound");
        },

        "Trying to observe unobservable properties": function() {
            assert.throws(function() {
                var obj = {};
                Object.defineProperty(obj, "someProperty", {
                    configurable: false
                });
                properties.observe(obj, "someProperty", null, _handler);
            }, Error, "non-configurable", "Can't observe non-configurable properties");

            assert.throws(function() {
                properties.observe(location, "href", null, _handler);
            }, Error, /host object|non-configurable/, "Trying to observe location.href throws an error");

            assert.throws(function() {
                properties.observe(document.body, "firstChild", null, _handler);
            }, Error, "host object", "Trying to observe a DOM node throws an error");

            assert.throws(function() {
                properties.observe(window, "someGlobalProperty", null, _handler);
            }, Error, "host object", "Trying to observe a window property throws an error");
        },

        "Observing with manual change notifications": function() {
            var testObject = {
                get amount() {
                    return this._amount;
                },
                set amount(newAmount) {
                    this._amount = Number(newAmount);
                    properties.propertyChanged(this, "amount");
                }
            };

            testObject.amount = "27";
            assert.strictEqual(testObject.amount, 27, "obj.amount strictly equals 27");

            properties.observe(testObject, "amount", null, _handler);
            properties.runObservers(testObject);
            assert.equal(observerFired, 0, "No observer should have fired yet");

            testObject.amount = "28";
            assert.strictEqual(testObject.amount, 28, "obj.amount strictly equals 28");
            properties.runObservers(testObject);
            assert.equal(observerFired, 1, "Observer should have fired");

            assert.equal(observedValue, 28, "Observer should have fired with newValue === 28");
        },
    });
});