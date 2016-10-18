define([
    "test/unit/baseTest",
    "intern/chai!assert",
    "sinon",
    "src/transform",
    "src/properties"
], function(registerSuite, assert, sinon, transform, properties) {
    "use strict";

    registerSuite({
        name: "Transform",

        "afterEach": function() {
            if (console.warn.restore) {
                console.warn.restore();
            }
        },

        "Test API": function() {
            assert.isFunction(transform, "transform module should be a function");
            assert.isFunction(transform.multiple, "transform.multiple should be a function");
            assert.isFunction(transform.detach, "transform.detach should be a function");
            assert.isFunction(transform.Transformer, "transform.Transformer should be a function");
        },

        "Test default one-way binding": function() {
            var hostObject = {
                    source: {
                        name: "Joe"
                    },
                    dest: {
                        destName: ""
                    }
                },

                transformer = transform(hostObject, "dest.destName", "source.name");

            assert.ok(typeof transformer === "object", "transform() should return an object");
            assert.ok(typeof transformer.reattach === "function", "translator.reattach should exist");
            assert.ok(typeof transformer.detach === "function", "translator.detach should exist");

            assert.instanceOf(transformer, transform.Transformer, "returned transformer must be an instance of transform.Transformer");

            assert.equal(hostObject.dest.destName, "Joe", "Source name should have been copied to destination");

            hostObject.source.name = "Jane";
            properties.runObservers(hostObject.source);
            assert.equal(hostObject.dest.destName, "Jane", "Change in source should have been copied to destination");

            hostObject.dest.destName = "Fluffy";
            properties.runObservers(hostObject.dest);
            assert.equal(hostObject.source.name, "Fluffy", "Change in dest should have been copied back to source");

            transform.detach(hostObject, "dest.destName");

            hostObject.source.name = "Mary";
            properties.runObservers(hostObject.source);
            assert.equal(hostObject.dest.destName, "Fluffy", "Change in source should not have been copied after detaching transformer");

            transformer.reattach();
            assert.equal(hostObject.dest.destName, "Mary", "Change in source should be copied to dest after re-attaching transformer");

            hostObject.source.name = "Another Mary";
            properties.runObservers(hostObject.source);
            assert.equal(hostObject.dest.destName, "Another Mary", "transformer.reattach() should have fully set up bindings again");
        },

        "Test throwing conditions": function() {
            var hostObject = {};

            assert.throws(function() {
                transform(hostObject, "dest", "source", {
                    to: function(value) {
                        return value;
                    }
                });
            }, Error, "function is required", "Providing to but no from throws");

            assert.throws(function() {
                transform.multiple(hostObject, "dest", "source", {
                    from: function(value) {
                        return [value];
                    }
                });
            }, Error, "must be specified as arrays", "transform.multiple() calls must specify arrays of paths");

            assert.throws(function() {
                transform.multiple(hostObject, ["dest"], ["source.1", "source.2"]);
            }, Error, "function is required", "MIMO translations with no from throws (many to one)");

            assert.throws(function() {
                transform.multiple(hostObject, ["dest.1", "dest.2"], ["source"]);
            }, Error, "function is required", "MIMO translations with no from throws (one to many)");

            assert.throws(function() {
                transform.multiple(hostObject, ["dest"], ["source"], {
                    from: function(value) {
                        return value;
                    }
                });
            }, Error, "must return an array", "Non-arrays returned by translation functions throws");

            assert.throws(function() {
                transform.multiple(hostObject, ["dest1", "dest2"], ["source"], {
                    from: function() {
                        return [1];
                    }
                });
            }, Error, "Expected 2 value", "Wrong number of values in translation function array throws");

            assert.doesNotThrow(function() {
                transform.multiple(hostObject, ["dest1", "dest2"], ["source"], {
                    from: function() {
                        return [1, 2];
                    }
                });
            }, "Right number of values in translation function doesn't throw");

            assert.throws(function() {
                transform(hostObject, "dest1", "source");
            }, Error, "Transform already applied", "Multiple transformations applied to the same dest property throws");
        },

        "Test one-way translation functions": function() {
            var hostObject = {};

            transform(hostObject, "dest", "source", {
                from: function(sourceValue) {
                    return sourceValue ? String(sourceValue) : "";
                }
            });

            // Testing from
            assert.strictEqual(hostObject.dest, "", "Undefined source should be translated into empty string");
            hostObject.source = 23;
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.dest, "23", "Source should have been translated to string on dest");

            // Testing to; should fail silently with a warning
            var consoleWarnSpy = sinon.spy(window.console, "warn");
            hostObject.dest = "33";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.source, 23, "Source should be unchanged by change on dest");
            assert.isTrue(consoleWarnSpy.calledOnce, "Change in destination of a one-way binding should print a warning");
            consoleWarnSpy.reset();
        },

        "Test two-way translation functions": function() {
            var hostObject = {};

            transform(hostObject, "dest", "source", {
                from: function(sourceValue) {
                    return sourceValue ? String(sourceValue) : "";
                },
                to: Number
            });

            hostObject.source = 55;
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.dest, "55", "Source should have been translated to string on dest");

            hostObject.dest = "44";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.source, 44, "Dest should have been translated back to a number on source");
        },

        "Test one-to-many translation": function() {
            var hostObject = {},
                transformer;

            transformer = transform.multiple(hostObject, ["street", "unitType", "unit"], ["address"], {
                from: function(address) {
                    if (!address) {
                        address = "";
                    }

                    // Simple address line 1 parser
                    var match = /^(.*?)(\s+(Apt|Suite|Unit)([.#\s]+(.+?))?)?$\s*/.exec(address);
                    if (!match) {
                        throw new Error("Match failed, which it shouldn't have due to the catch-all first group and optional second");
                    }
                    return [
                        /* street */    match[1],
                        /* unitType */  match[3] || "",
                        /* unit */      match[5] || ""
                    ];
                },
                to: function(street, unitType, unit) {
                    return [[street, unitType, unit].filter(Boolean).join(" ")];
                }
            });

            assert.strictEqual(hostObject.street, "", "Street should be empty");
            assert.strictEqual(hostObject.unitType, "", "Unit type should be empty");
            assert.strictEqual(hostObject.unit, "", "Unit should be empty");

            hostObject.address = "123 Somewhere St Apt 5";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.street, "123 Somewhere St", "Street should have been parsed out");
            assert.strictEqual(hostObject.unitType, "Apt", "Unit type should have been parsed out");
            assert.strictEqual(hostObject.unit, "5", "Unit should have been parsed out");

            hostObject.unit = "6";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.address, "123 Somewhere St Apt 6", "Change in unit should have merged back");

            // Detach by providing any of the destPaths as the destPath, and they all get detached:
            transform.detach(hostObject, "street");
            hostObject.address = "456 Somewhere Else Suite 1";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.street, "123 Somewhere St", "Street should not have been changed after detaching");
            assert.strictEqual(hostObject.unitType, "Apt", "Unit type should not have been changed after detaching");
            assert.strictEqual(hostObject.unit, "6", "Unit should not have been changed after detaching");

            transformer.reattach();
            assert.strictEqual(hostObject.street, "456 Somewhere Else", "Reattaching should have worked on street");
            assert.strictEqual(hostObject.unitType, "Suite", "Reattaching should have worked on unitType");
            assert.strictEqual(hostObject.unit, "1", "Reattaching should have worked on unit");

            // Detaching using a different dest path:
            transform.detach(hostObject, "unit");
            hostObject.address = "789 Another Road Apt 3";
            properties.runObservers(hostObject);
            assert.strictEqual(hostObject.street, "456 Somewhere Else", "Detaching on a different path should also work: street");
            assert.strictEqual(hostObject.unitType, "Suite", "Detaching on a different path should also work: unitType");
            assert.strictEqual(hostObject.unit, "1", "Detaching on a different path should also work: unit");
        }
    });
});