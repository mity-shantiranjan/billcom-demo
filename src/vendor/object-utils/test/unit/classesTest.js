define([
    "test/unit/baseTest",
    "intern/chai!assert",
    "src/classes"
], function(registerSuite, assert, classes) {
    "use strict";

    registerSuite({
        "name": "Classes",

        "Vanilla constructor/prototype syntax": function() {
            function NamedThing(name) {
                this.name = name;
            }
            NamedThing.prototype.getName = function() {
                return this.name;
            };

            function Person(name, age) {
                Person._callSuper(this, "constructor", name);
                this.age = age;
            }
            classes.inherits(Person, NamedThing);

            Person.prototype.getName = function() {
                return "someone named " + Person._callSuper(this, "getName");
            };
            Person.prototype.getAge = function() {
                return this.age;
            };

            var person = new Person("Bob", 35);
            assert.instanceOf(person, Person, "person should be an instance of Person");
            assert.instanceOf(person, NamedThing, "person should be an instance of NamedThing too");
            assert.instanceOf(person, Object, "person should be an instance of Object too");
            assert.equal(person.getName(), "someone named Bob", "person.getName() should return 'someone named Bob'");
            assert.equal(person.getAge(), 35, "Person constructor should have been run");
            assert.equal(person.constructor, Person, "person.constructor should be Person");
            for (var key in person) {
                assert.notEqual(key, "constructor", "constructor should be a non-enumerable property");
                assert.notEqual(key, "super", "super should be a non-enumerable property");
            }
        },

        "Inheritance of static properties": function() {
            function SuperClass() {}
            SuperClass.overridden = "original";
            SuperClass.notOverridden = "original";

            function SubClass() {}
            SubClass.overridden = "overridden";
            classes.inheritStatics(SubClass, SuperClass);

            assert.equal(SubClass.notOverridden, "original", "Non-overridden property should have had its value inherited");
            assert.equal(SubClass.overridden, "overridden", "Overridden property should not be replaced with super version");
        },

        "ES6-style class syntax": function() {
            var NamedThing = classes.extend(Object, {
                    constructor: function NamedThing(name) {
                        this.name = name;
                    },
                    getName: function() {
                        return this.name;
                    },
                    static: {
                        staticParentMethod: function() {
                            return "NamedThing static";
                        },
                        staticChildMethod: function() {
                            throw new Error("This should be overridden");
                        }
                    }
                }),

                Person = classes.extend(NamedThing, {
                    constructor: function Person(name, age) {
                        Person._callSuper(this, "constructor", name);
                        this.age = age;
                    },
                    getName: function() {
                        return "someone named " + Person._callSuper(this, "getName");
                    },
                    agePlusOne: function() {
                        return this.age + 1;
                    },
                    get age() {
                        return this._age;
                    },
                    set age(age) {
                        this._age = Number(age);
                    },

                    static: {
                        staticChildMethod: function() {
                            return "Person static";
                        }
                    }
                }),

                person = new Person("Bob", 35);

            assert.instanceOf(person, Person, "person should be an instance of Person");
            assert.instanceOf(person, NamedThing, "person should be an instance of NamedThing too");
            assert.instanceOf(person, Object, "person should be an instance of Object too");
            assert.equal(person.getName(), "someone named Bob", "person.getName() should return 'someone named Bob'");
            assert.equal(person.agePlusOne(), 36, "Person constructor should have been run");
            assert.equal(person.constructor, Person, "person.constructor should be Person");
            for (var key in person) {
                assert.notEqual(key, "constructor", "constructor should be a non-enumerable property");
            }

            // Testing getter/setter properties
            person.age = "20";
            assert.strictEqual(person.age, 20, "Age should have been cast to 35");
            assert.ok(typeof person.age === "number", "Age should be a number");

            // Testing statics
            assert.equal(NamedThing.staticParentMethod(), "NamedThing static", "Parent's static methods should be defined");
            assert.equal(Person.staticChildMethod(), "Person static", "Static methods should be applied");
            assert.equal(Person.staticParentMethod(), "NamedThing static", "Parent's static methods should be inherited");
        },

        "ES6-style super implementation": function() {
            var NamedThing = classes.extend(Object, {
                    constructor: function NamedThing(name) {
                        this.name = name;
                    },
                    toString: function() {
                        return this.name;
                    },
                    static: {
                        hello: function(who) {
                            return "Hello, " + who;
                        }
                    }
                }),

                Person = classes.extend(NamedThing, {
                    constructor: function Person(name) {
                        Person.super(this, name);
                    },

                    toString: function toString() {
                        return "Person named " + toString.super(this);
                    },

                    static: {
                        hello: function hello(who) {
                            return hello.super(this, who) + " from Person";
                        }
                    }
                }),

                person = new Person("Dude");

            assert.equal(person.name, "Dude", "Constructor's .super() should have passed through name value");
            assert.equal("" + person, "Person named Dude", "toString's super() should have returned the correct value");

            assert.equal(NamedThing.hello("world"), "Hello, world", "Basic static method should work");
            assert.equal(Person.hello("world"), "Hello, world from Person", "Static method's super() should work");
        },

        "function.super() and function.applySuper() (deprecated syntax)": function() {
            var calledWithArgs, calledWithThis;

            function _reset() {
                calledWithArgs = null;
                calledWithThis = null;
            }

            var SuperClass = classes.extend(null, {
                    superTest: function() {
                        calledWithArgs = arguments;
                        calledWithThis = this;
                    },
                    applySuperTest: function() {
                        calledWithArgs = arguments;
                        calledWithThis = this;
                    }
                }),

                SubClass = classes.extend(SuperClass, {
                    superTest: function superTest(arg1, arg2) {
                        superTest.super(this, arg1, arg2);
                    },
                    applySuperTest: function applySuperTest() {
                        applySuperTest.applySuper(this, arguments);
                    },
                    noSuper: function noSuper(arg1, arg2) {
                        // This should throw an error since there is no super-method:
                        noSuper.super(this, arg1, arg2);
                    },
                    noApplySuper: function noApplySuper() {
                        // This should throw an error since there is no super-method:
                        noApplySuper.applySuper(this, arguments);
                    },
                }),

                instance = new SubClass();

            _reset();
            assert.equal(calledWithThis, null);
            assert.equal(calledWithArgs, null);

            instance.superTest("super one", "super two");
            assert.equal(calledWithThis, instance);
            assert.equal(calledWithArgs.length, 2);
            assert.equal(calledWithArgs[0], "super one");
            assert.equal(calledWithArgs[1], "super two");

            _reset();
            assert.equal(calledWithThis, null);
            assert.equal(calledWithArgs, null);

            instance.applySuperTest("applySuper one", "applySuper two", "applySuper three");
            assert.equal(calledWithThis, instance);
            assert.equal(calledWithArgs.length, 3);
            assert.equal(calledWithArgs[0], "applySuper one");
            assert.equal(calledWithArgs[1], "applySuper two");
            assert.equal(calledWithArgs[2], "applySuper three");

            assert.throw(function() {
                instance.noSuper();
            }, Error, "No super method");

            assert.throw(function() {
                instance.noApplySuper();
            }, Error, "No super method");
        },

        "function.super() and function.superFunc.apply()": function() {
            var calledWithArgs, calledWithThis;

            function _reset() {
                calledWithArgs = null;
                calledWithThis = null;
            }

            var SuperClass = classes.extend(null, {
                    superTest: function() {
                        calledWithArgs = arguments;
                        calledWithThis = this;
                    },
                    applySuperTest: function() {
                        calledWithArgs = arguments;
                        calledWithThis = this;
                    }
                }),

                SubClass = classes.extend(SuperClass, {
                    superTest: function superTest(arg1, arg2) {
                        superTest.super(this, arg1, arg2);
                    },
                    applySuperTest: function applySuperTest() {
                        applySuperTest.superFunc.apply(this, arguments);
                    },
                    noSuper: function noSuper(arg1, arg2) {
                        // This should throw an error since there is no super-method:
                        noSuper.super(this, arg1, arg2);
                    },
                    noApplySuper: function noApplySuper() {
                        // This should throw an error since there is no super-method:
                        noApplySuper.superFunc.apply(this, arguments);
                    },
                }),

                instance = new SubClass();

            _reset();
            assert.equal(calledWithThis, null);
            assert.equal(calledWithArgs, null);

            instance.superTest("super one", "super two");
            assert.equal(calledWithThis, instance);
            assert.equal(calledWithArgs.length, 2);
            assert.equal(calledWithArgs[0], "super one");
            assert.equal(calledWithArgs[1], "super two");

            _reset();
            assert.equal(calledWithThis, null);
            assert.equal(calledWithArgs, null);

            instance.applySuperTest("applySuper one", "applySuper two", "applySuper three");
            assert.equal(calledWithThis, instance);
            assert.equal(calledWithArgs.length, 3);
            assert.equal(calledWithArgs[0], "applySuper one");
            assert.equal(calledWithArgs[1], "applySuper two");
            assert.equal(calledWithArgs[2], "applySuper three");

            assert.throw(function() {
                instance.noSuper();
            }, Error, "No super method");

            assert.throw(function() {
                instance.noApplySuper();
            }, Error, "No super method");
        },

        "Null super class": function() {
            var SomeClass = classes.extend(null, {
                    constructor: function() {
                        this.type = "some class";
                    }
                }),
                someInstance = new SomeClass();

            assert.notInstanceOf(someInstance, Object, "With null super, Object shouldn't be inherited from");
            assert.equal(someInstance.type, "some class", "constructor should have been run");
        },

        "Deep inheritence": function() {
            var BaseClass = classes.extend(Object, {
                    constructor: function(name) {
                        this.name = name;
                    },
                    getName: function() {
                        return "Base " + this.name;
                    }
                }),

                SubClass = classes.extend(BaseClass, {
                    getName: function getName() {
                        return "Sub " + getName.super(this);
                    }
                }),

                SubSubClass = classes.extend(SubClass, {
                    getName: function getName() {
                        return "SubSub " + getName.super(this);
                    }
                }),

                SubSubSubClass = classes.extend(SubSubClass, {
                    getName: function getName() {
                        return "SubSubSub " + getName.super(this);
                    }
                }),

                thing = new SubSubSubClass("Patricia");

            assert.equal(thing.constructor, SubSubSubClass, "thing.constructor is SubSubSubClass");
            assert.instanceOf(thing, SubSubSubClass, "thing instanceof SubSubSubClass");
            assert.instanceOf(thing, SubSubClass, "thing instanceof SubSubClass");
            assert.instanceOf(thing, SubClass, "thing instanceof SubClass");
            assert.instanceOf(thing, BaseClass, "thing instanceof BaseClass");

            assert.equal(thing.name, "Patricia", "thing.name should be Patricia");

            assert.equal(thing.getName(), "SubSubSub SubSub Sub Base Patricia", "Entire getName() prototype chain should be followed");
        },

        "No constructor": function() {
            var NullSubclass = classes.extend(null),
                nullSub = new NullSubclass();

            assert.notInstanceOf(nullSub, Object, "nullSuper shouldn't inherit from Object");

            var ObjectSubClass = classes.extend(Object),
                objectSub = new ObjectSubClass();

            assert.instanceOf(objectSub, Object, "objectSuper should inherit from Object");

            function NamedThing(name) {
                this.name = name;
            }
            var NamedSubclass = classes.extend(NamedThing),
                namedSub = new NamedSubclass("Jane");

            assert.equal(namedSub.constructor, NamedSubclass);
            assert.instanceOf(namedSub, NamedSubclass);
            assert.instanceOf(namedSub, NamedThing);
            assert.equal(namedSub.name, "Jane", "Super should have passed args through");
        },

        "classes.createObject() syntax": function() {
            var child,
                proto = {
                    someProperty: "someValue"
                };

            child = classes.createObject(Object.prototype);
            assert.equal(typeof child, "object", "child of Object.prototype should be an object (1)");
            assert.equal(Object.getPrototypeOf(child), Object.prototype, "child of Object.prototype's prototype should be Object.prototype");
            assert.instanceOf(child, Object, "child of Object.prototype  should be instanceof Object");

            child = classes.createObject(null);
            assert.equal(typeof child, "object", "child of null should be an object");
            assert.equal(Object.getPrototypeOf(child), null, "child of null's prototype should be null");
            assert.notInstanceOf(child, Object, "child of null should not be instanceof Object.prototype");

            child = classes.createObject(proto);

            child = classes.createObject(proto, {
                hello: function() {
                    return "world";
                },
                get name() {
                    return "Earth";
                }
            });
            assert.ok(child.hello, "child.hello() function should exist");
            assert.ok(child.hasOwnProperty("hello"), "hello function should be on object directly");
            assert.equal(typeof child, "object", "child of proto should be an object");
            assert.equal(child.name, "Earth", "getter should be set");

            assert.equal(Object.getOwnPropertyDescriptor(child, "hello").enumerable, false, "hello() method should be non-enumerable");
            assert.equal(Object.getOwnPropertyDescriptor(child, "name").enumerable, true, "name getter should be enumerable");

            assert.throws(function() {
                child = classes.createObject(proto, {
                    valueProperty: "not a function"
                }, Error, "Not a method", "Setting a non-method should throw an error");
            });

            proto = classes.createObject(Object.prototype, {
                hello: function(greeting) {
                    return greeting + " world";
                },
                applyHello: function(greeting) {
                    return greeting + " mundo";
                },
            });

            child = classes.createObject(proto, {
                hello: function hello(greeting) {
                    return hello.super(this, greeting) + ", too";
                },
                applyHello: function applyHello() {
                    return applyHello.superFunc.apply(this, arguments) + ", tambien";
                }
            });

            assert.equal(child.hello("Hello"), "Hello world, too", "Inheritence chaining should work");
            assert.equal(child.applyHello("Hola"), "Hola mundo, tambien", "Inheritence chaining should work");
        },
    });
});
