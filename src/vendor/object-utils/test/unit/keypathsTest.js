define([
    "test/unit/baseTest",
    "intern/chai!assert",
    "sinon",
    "src/keyPaths"
], function(registerSuite, assert, sinon, keyPaths) {
    "use strict";

    registerSuite({

        name: "Key Paths",

        "afterEach": function() {
            if (console.warn.restore) {
                console.warn.restore();
            }
        },

        "Test keyPaths interface": function() {
            assert.isObject(keyPaths, "keyPaths module should exist");
            assert.isFunction(keyPaths.Path, "Paths should be a function");

            var path = new keyPaths.Path("");
            assert.isFunction(path.equals, "Path#equals");
            assert.isFunction(path.toString, "Path#toString");
            assert.isFunction(path.getValue, "Path#getValue");
            assert.isFunction(path.setValue, "Path#setValue");
            assert.isFunction(keyPaths.getValue, "keyPaths.getValue");
            assert.isFunction(keyPaths.setValue, "keyPaths.setValue");
        },

        "Test creating Paths": function() {
            // By Path
            assert.throws(keyPaths.Path, TypeError, null, "undefined path should be a TypeError");
            assert.throws(function() {
                new keyPaths.Path(null);
            }, TypeError, null, "Null path should be a TypeError");
            assert.throws(function() {
                new keyPaths.Path(3.5);
            }, TypeError, null, "Non-integer numerical path should be a TypeError");
            assert.throws(function() {
                new keyPaths.Path(-3);
            }, TypeError, null, "Negative numerical path should be a TypeError");
            assert.doesNotThrow(function() {
                new keyPaths.Path("a.b.c");
                new keyPaths.Path(0);
                new keyPaths.Path(5);
                new keyPaths.Path(["a","b","c"]);
            }, null, "strings and arrays are accepted");

            assert.ok(new keyPaths.Path("") instanceof keyPaths.Path, "New keyword is optional on keyPaths.Path");

            var pathByString = new keyPaths.Path("a.1"),
                pathByStringArray = new keyPaths.Path(["a","1"]);

            assert.ok(pathByString instanceof keyPaths.Path, "String path should parse to a Path object");
            assert.ok(pathByStringArray instanceof keyPaths.Path, "Array path should parse a Path object");

            assert.ok(pathByString.equals(pathByString), "A path should be equal to itself");

            // by keyPaths.toPath
            var pathByString2 = keyPaths.toPath("a.1");
            assert.ok(pathByString2 instanceof keyPaths.Path);
            assert.ok(pathByString.equals(pathByString2));

            // Test toString
            assert.ok(typeof pathByString.toString() === "string", "toString should return a string");
            assert.strictEqual("" + pathByString, "a.1");
            assert.strictEqual("" + keyPaths.toPath(["dict", "key.one"]), 'dict."key.one"',
                               "toString wraps non-property keys with quotes to preserve uniqueness");
        },

        "Test Path.equals": function() {
            var path = new keyPaths.Path("a.1");

            assert.ok(path.equals("a.1"));
            assert.ok(path.equals(["a",1]));
            assert.ok(path.equals(["a","1"]));
            assert.notOk(path.equals("a.b"));

            assert.notOk(path.equals("b.1"));
            assert.notOk(path.equals("a.2"));
            assert.notOk(path.equals("a"));
            assert.notOk(path.equals("a.1.b"));
        },

        "Test accessing values by path": function() {
            var dataStore = {
                customers: [
                    {firstName: "Joe One", lastName: "Bob"},
                    {firstName: "Joe Two", lastName: "Bob"},
                    {firstName: "Joe Three", lastName: "Bob"}
                ],
                dict: {
                    "key.one": "Value One"
                }
            };

            // Using keyPaths.getValue
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.0.firstName"),      "Joe One");
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.1.firstName"),      "Joe Two");
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.2.firstName"),      "Joe Three");
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.3.firstName"),      undefined);
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.blah"),             undefined);
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.0.firstName.blah"), undefined);

            assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 0, "firstName"]), "Joe One");
            assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 1, "firstName"]), "Joe Two");
            assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 2, "firstName"]), "Joe Three");
            assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 3, "firstName"]), undefined);

            assert.strictEqual(keyPaths.getValue(dataStore, ["blah", 3, "blahblah"]), undefined);
            assert.strictEqual(keyPaths.getValue(dataStore, ["blah.blah.blah", 3, "blahblah"]), undefined);

            assert.strictEqual(keyPaths.getValue(dataStore, []), dataStore, "empty path references the owning object");

            // ...with dots in key names
            assert.strictEqual(keyPaths.getValue(dataStore, "dict.key.one"),       undefined,
                              "Cannot use dots in key names with string notation");
            assert.strictEqual(keyPaths.getValue(dataStore, ["dict", "key.one"]),  "Value One",
                              "Can use dots in key names with array notation");

            // Using Path objects
            var customer0FirstNamePath = new keyPaths.Path("customers.0.firstName"),
                customer3FirstNamePath = new keyPaths.Path("customers.3.firstName");

            // ...with keyPaths.getValue
            assert.strictEqual(keyPaths.getValue(dataStore, customer0FirstNamePath), "Joe One");
            assert.strictEqual(keyPaths.getValue(dataStore, customer3FirstNamePath), undefined);

            // ...with Path#getValue
            assert.strictEqual(customer0FirstNamePath.getValue(dataStore), "Joe One");
            assert.strictEqual(customer3FirstNamePath.getValue(dataStore), undefined);
        },

        "Test setting value by path": function() {
            var dataStore = {
                    customers: [
                        {firstName: "", lastName: ""}
                    ]
                },
                consoleWarnSpy = sinon.spy(window.console, "warn");

            // Setting shallow path
            keyPaths.setValue(dataStore, "foo", "bar");
            assert.strictEqual(dataStore.foo, "bar", "dataStore.foo should be set to bar");

            // Setting on null fails silently (with a warning)
            consoleWarnSpy.reset();
            keyPaths.setValue(null, "foo", "bar");
            assert.isTrue(consoleWarnSpy.calledOnce, "Setting on null should log a warning");

            // Deep path
            keyPaths.setValue(dataStore, "customers.0.firstName", "Betty One");
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.0.firstName"), "Betty One");
            assert.strictEqual(dataStore.customers[0].firstName, "Betty One");

            // Deep path with undefined parent member in it
            consoleWarnSpy.reset();
            keyPaths.setValue(dataStore, "customers.1.firstName", "Betty Two");
            assert.strictEqual(keyPaths.getValue(dataStore, "customers.1.firstName"), undefined);
            assert.strictEqual(dataStore.customers[1], undefined);
            assert.isTrue(consoleWarnSpy.calledOnce, "Setting path with undefined parent member should log a warning");

            // Path prototype method
            var pathOne = new keyPaths.Path("customers.0.lastName");
            pathOne.setValue(dataStore, "Sue");
            assert.strictEqual(pathOne.getValue(dataStore), "Sue");
            assert.strictEqual(dataStore.customers[0].lastName, "Sue");

            var pathTwo = new keyPaths.Path("customers.2.lastName");
            pathTwo.setValue(dataStore, "Sue");
            assert.strictEqual(pathTwo.getValue(dataStore), undefined);
            assert.strictEqual(dataStore.customers[1], undefined);
        },

        "Test Subpaths": function() {
            var path = keyPaths.toPath("customers.1.firstName"),
                subpath = path.getSubpath(),
                subSubpath = subpath.getSubpath(),
                subSubSubpath = subSubpath.getSubpath();

            assert.equal(path.length, 3, "Test path should have length 3");

            assert.instanceOf(subpath, keyPaths.Path, "subpath should be a Path object");
            assert.equal("" + subpath, "1.firstName", "subpath should be equal to '1.firstName'");
            assert.equal(subpath.length, 2, "subpath should have length 2");
            assert.equal("" + subSubpath, "firstName", "Sub-subpath should be 'firstName'");
            assert.equal(subSubSubpath.length, 0, "SubPath with no subpath left should have length 0");

            assert.equal(path.getSubpath(), subpath, "Subsequent calls to getSubpath should return cached value");

            var parentPath = path.getParentPath(),
                grandparentPath = parentPath.getParentPath(),
                greatGrandparentPath = grandparentPath.getParentPath();

            assert.instanceOf(parentPath, keyPaths.Path, "parentPath should be a Path object");
            assert.equal("" + parentPath, "customers.1");
            assert.equal(parentPath.length, 2, "parentPath should have length 3");
            assert.equal("" + grandparentPath, "customers");
            assert.equal(greatGrandparentPath.length, 0, "Parent of path with no parent should have length 0");

            assert.equal(subpath, path.getSubpath(), "Subsequent calls to getSubpath should return cached value");
            assert.equal(path.getParentPath(), parentPath, "Subsequent calls to getParentPath should return cached value");
        },

        "Test on undefined datastore": function() {

            // Using keyPaths.getValue
            var testPaths = function(dataStore) {
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.0.firstName"), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.1.firstName"), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.2.firstName"), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.3.firstName"), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.blah"), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, "customers.0.firstName.blah"), undefined);

                assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 0, "firstName"]), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 1, "firstName"]), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 2, "firstName"]), undefined);
                assert.strictEqual(keyPaths.getValue(dataStore, ["customers", 3, "firstName"]), undefined);
            };

            testPaths(undefined);
            testPaths(null);
        }
    });
});