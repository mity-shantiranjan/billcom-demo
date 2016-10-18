JavaScript Object Utilities [![Build Status](http://fmsscm.corp.intuit.net/qbo-build/view/All/job/CI-js-object-utils-master/badge/icon)](http://fmsscm.corp.intuit.net/qbo-build/view/All/job/CI-js-object-utils-master)
===========================

ECMAScript 5-based property and class utilities for projects using AMD: inheritance, key paths, observers, dynamic
properties, and property bindings with type conversion.

 * [Classes (Inheritance)](#inheritance)
 * [Key Paths](#keypaths)
 * [Property / Path Observers](#observe)
 * [Property Bindings / Transformations](#transform)

<a name="inheritance"></a>
## Classes (Inheritance)

The classes module mimics ECMAScript 6's upcoming `class` syntax in an efficient, flexible, ECMAScript 5-compatible
way. It's intentionally low-level, does not require a base class, and allows you to inherit from any vanilla JavaScript 
super-constructor even if created in other inheritance frameworks. (The reverse is not necessarily true; you cannot use
another framework to inherit from a class defined using this module unless that framework also supports inheriting from
ordinary JavaScript constructors.)

The function `classes.extend(superConstructor, {methods})` mimics the behavior of ECMAScript 6 classes: it supports
getter/setter methods, prevents defining non-method prototype properties, and marks all methods and the `constructor`
property as non-enumerable.

```js
require('object-utils/src/classes', function(classes) {
    "use strict";
    
    var MySuperClass = classes.extend(Object, {
        constructor: function(aVar) {
            this.aVar = aVar;
        },

        someMethod: function() {
            return "hi";
        }
    });

    var MyChildClass = classes.extend(MySuperClass, {
        constructor: function MyChildClass(aVar) {
            // Calling the super-constructor:
            MyChildClass.superFunc.call(this, aVar);

            // Private properties that shouldn't show up in JSON serializations or for..in loops:
            Object.defineProperties(this, {
                _amount: {writable: true, enumerable: false}
            });
        },
        
        // Prototype methods:
        someMethod: function someMethod() {
            // Calling the superclass implementation, using this function's name
            // (the second someMethod above)
            var returnVal = someMethod.superFunc.call(this);
            
            doSomething();
            return returnVal;
        },

        // And static (constructor) methods:
        static: {
            aStaticMethod: function() { ... }
        },

        // Getters and setters are supported too, both here and in static:
        get amount() {
            return this._amount;
        },
        set amount(value) {
            this._amount = Number(value);
        },
    });
});
```

Note the use of named functions, as the above `function someMethod()` expression, which allows code inside a function to reference its function object. Super functions are called with `<function>.superFunc.call(this, [arg1], [arg2], ...])` or the slower `<function>.superFunc.apply(this, arguments])`. The convenience method `<function>.super(thisObj, ...args)` is identical to `superFunc.call` with an shorter and slower syntax.

For brevity, you could use an underscore for the internal function name:

```js
    someMethod: function _() {
        var returnVal = _.superFunc.call(this);
```

 > _Unlike with **function statements**, a **function expression**’s name is only available inside the function itself. This method of calling the super efficiently works with ECMAScript 5’s strict mode, and is inspired by how ECMAScript 6 internally handles its `super` keyword._

Static methods live on the constructor function, and child constructors inherit their parents’ static methods. They also include support for `.super()`, `.superFunc.call()`, and `.superFunc.apply()`.

_**DEPRECATION NOTE: .applySuper().** The older syntax `.applySuper(this, arguments)` is now deprecated for performance reasons. After futher testing, it was found to block Chrome’s JavaScript optimizer and is 10-30 times slower than the `.superFunc.apply()` method. Though `.super()` is also slower than `.superFunc.call()` by a lesser amount, it does not block browser optimizations so it’s still supported in non-performance-critical code._

#### Constructor/Prototype Syntax

Alternately, the lower-level `classes.inherits(constructor, superConstructor)` works with classes defined the vanilla JavaScript function/prototype syntax:

```js
function MyChildClass(aVar) {
    MyChildClass._callSuper(this, "constructor", aVar);
    // ...
}
classes.inherits(MyChildClass, MySuperClass);

MyChildClass.prototype.someMethod = function someMethod() {
    var returnVal = MyChildClass._callSuper(this, "someMethod");
    // ...
    return returnVal;
}
```

Both versions add the lower-level method `constructor._callSuper(thisObj, methodName, ...args)` to call arbitrary super-methods.

#### A Note On Array, Number, String, Boolean, RegExp, DOM elements, and other builtins

Subclassing JavaScript builtins is not supported, and the results likely won’t behave as you’d expect. A custom subclass of Array, for example, would give you an ordinary JavaScript object that happens to inherit from Array.prototype. It would receive Array’s methods like push and pop, but not the special internal handling of a native array. In particular, it would not receive Array’s magic `.length` property that's always equal to its highest index plus one, and it would lose out on a host of browser optimizations received by real arrays.

Wrapped JavaScript primitives like Number and String and host objects like DOM elements also will not function properly when subclassed.

Full support for subclassing these types will arrive in the future when browsers implement ECMAScript 6.

### Classes API:

<table>
    <tbody valign="top">
        <tr>
            <td><code>classes.extend(superConstructor, methods object)</code></td>
            <td>
                <p>Creates a class and returns its constructor.</p>

                <p>The constructor function is defined within the methods object as <code>constructor</code>. To inherit from the generic
                Object base class, use <code>Object</code>. If you inherit from <code>null</code>, you will receive a new root class that doesn’t include any methods from Object.prototype. Getter and setter functions are also supported in methods using the ECMAScript 5
                <code>get property() {...}</code> and <code>set property(value) {...}</code> syntax.</p>

                <p>The methods object can only contain functions and getter/setter methods. Non-method properties aren’t supported in ECMAScript 6's class syntax, so they aren’t here either.</p>
            </td>
        </tr>
        <tr>
            <td><code>classes.createObject(prototype, methods object)</code></td>
            <td>
                <p>Creates an object directly inheriting from prototype with the provided methods. Like extend(), the methods object can only include functions and getter/setter properties.</p>
            </td>
        </tr>
        <tr>
            <td><code>&lt;method&gt;.super(thisObj, ...args)</code></td>
            <td>
                <p>Calls the prototype implementation of method define with either <code>classes.extend</code> or <code>classes.createObject</code>. To call this, you need to use a named function. It works like JavaScript’s <code>function.call()</code>:</p>

<pre><code>someMethod: function someMethod(arg1, arg2) {
    someMethod.super(this, arg1, arg2);
}</code></pre>
            </td>
        </tr>
        <tr>
            <td><code>&lt;method&gt;.superFunc.apply(thisObj, arguments)`</code></td>
            <td>
                <p>Like .super(), but working like JavaScript’s <code>function.apply()</code>:</p>

<pre><code>someMethod: function someMethod() {
    someMethod.superFunc.apply(this, arguments);
}</code></pre>
            </td>
        </tr>
    </tbody>
</table>

#### Low-Level API:


<table valign="top">
    <tbody>
        <tr>
            <td><code>classes.inherits(constructor, superConstructor)</code></td>
            <td>
                Makes constructor inherit from superConstructor and sets up <code>constructor._callSuper()</code>. This version is useful if you plan to use vanilla JavaScript constructor/prototype syntax instead of <code>classes.extend()</code>.
            </td>
        </tr>
        <tr>
            <td><code>classes.inheritStatics(constructor, superConstructor)</code></td>
            <td>
                A lower-level implementation of static method inheritance. This version is useful if you use <code>classes.inherits()</code> or some other inheritance mechanism, and wish to add support for statics.
            </td>
        </tr>
        <tr>
            <td><code>`&lt;constructor&gt;._callSuper(thisObj, methodName, ...args)</code></td>
            <td>
                Calls the prototype's implementation of <code>methodName</code>. The <code>_callSuper</code> method must be called on the constructor/class owning the current method.
            </td>
        </tr>
    </tbody>
</table>

<a name="keypaths"></a>
## Key Paths

Path-based getters and setters allow referencing a value's location across multiple properties
without risking tracebacks. They also allow specifying your data's location in memory for observers
and transformations.

```js
require('object-utils/src/keyPaths', function(keyPaths) {
    var store = { numbers: ["zero", "one", "two", "three"] };

    keyPaths.getValue(store, "numbers.0"); // "zero"
    keyPaths.setValue(store, "numbers.1", "uno");

    // This throws an error:
    store.numbers[10].does.not.exist

    // But this doesn't:
    keyPaths.getValue(store, "numbers.10.does.not.exist"); // undefined

    // This doesn't either, but prints a warning to the console:
    keyPaths.setValue(store, "does.not.exist", 10);
})
```

### Key Paths API:

#### Path format

A key path can be specified as a string, array, or compiled keyPaths.Path object.

The default string format merely contains dot-separated keys, which can be array indexes or property names.

 * `"numbers.0"` references `.numbers[0]`
 * `"people.1.firstName"` references `.people[1].firstName`.

When using key names that would normally be quoted in JavaScript (especially if they contain the `.` character),
you can use the alternate array format:

 * `["people", 1, "firstName"]` is identical to `"people.1.firstName"`
 * `["strings", "This. has. dots."]` references `strings["This. has. dots"]`.

#### Static Functions

`keyPaths.getValue(object, path)`: Access a value by path.

`keyPaths.setValue(object, path, value)`: Set a value by path. Prints a warning to the console if the object
referenced by path doesn't exist.

`keyPaths.toPath(path)`: parse path and return a compiled keyPaths.Path class. Will help performance if you're using a path multiple times.

#### keyPaths.Path class

`aPath.getValue(object)`: the classy way of calling `keyPaths.getValue(object, aPath)`

`aPath.setValue(object, value)`: the classy way of calling `keyPaths.setValue(object, aPath, value)`

`aPath.equals(anotherPath)`: True if the two keyPaths are equivilent. Can take a compiled path or a new key path in string or array format. Example: `aPath.equals("numbers.0")`

`aPath.toString()`: a normalized String serialization of the path, useful for logging and fast comparisons.


<a name="observe"></a>
## Property & Path Observers

The properties module defines dynamic properties and allows ordinary JavaScript properties, array indexes, and key paths to be observed:

```js
function PersonView(model) {
    this.model = model;
    properties.observe(this, "model.fullName", this, this.fullNameChanged);
}
PersonView.prototype.fullNameChanged = function(targetObject, keyPath, newValue) {
    console.log("full name changed: ",newValue);
}
```

Any key path containing ordinary data properties and array indexes can be observed, even if they weren’t defined in advance using `properties.defineProperties()`. However, properties defined in advance are more efficient because they don’t need to be converted in realtime. Computed properties can only be observed if defined with `properties.defineProperties()` and a `dependsOn` array is provided.

Observers run asynchronously after the current execution thread has completed, or (for unit tests) when manually triggered with `properties.runObservers()`.


### Observer API:

`properties.observe(anObject, keyPaths, handlerObject, handlerFunction)`: call `handlerFunction` whenever `keyPaths` on `anObject` changes, with `handlerObject` as the value of `this`. `handlerObject` can be null for static functions, and for class methods would be the `this` object owning that method.

`properties.unobserve(anObject, keyPaths, handlerObject, handlerFunction)`: remove an observer created with `properties.observe()`

`properties.runObservers(anObject, keyPath (optional))`: run observers immediately, if you don't want to wait for the asynchronous callback to fire. if keyPath is specified, all changed values within that key path will have their observers fire. This is useful for unit testing.


### Configuring Observable Properties

Though normal properties can be converted on the fly to become observable, `properties.defineProperties` also allows you to declare observable properties in advance and configure them. This avoids later on-the-fly conversion and will make your code more efficient.

`properties.defineProperties` takes all of the possible descriptor options in ECMAScript 5's `Object.defineProperties()` method, namely `value`, `enumerable`, `writable`, `get`, and `set`. You can also provide the empty configuration object `{}` to merely declare a data property as observable in advance with the initial value `undefined`.

The option `dependsOn` allows you to declare other properties/paths whose changes affect this property's output, and is useful for making a computed property observable. For more information, see the next section.

Example:

```js
function Transaction(memo, amount) {
    this.memo = memo;
    this.amount = amount;
}
properties.defineProperties(Person, {
    memo: {},  // No configuration, but set property up as observable in advance
    amount: {
        get: function() {
            return [this.firstName, this.lastName].filter(Boolean).join(" ");
        },
        dependsOn: ["firstName", "lastName"]
    }
}
```

### Observing computed properties & getters/setters

#### Computed properties with dependent paths

You can declare a computed property’s dependent paths so changes to those paths will fire its observers as well.
 
For computed properties, provide an array of its dependent paths via `dependsOn`; changes to any of those paths will cause its own observers to fire as well.

```js
var Person = classes.extend(Object, {
    constructor: function(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    },
    get fullName() {
        return [this.firstName, this.lastName].filter(Boolean).join(" ");
    }
});
properties.defineProperties(Person, {
    firstName: {},
    lastName: {},
    fullName: {dependsOn: ["firstName", "lastName"]}
}
```

Though the above example uses `classes.extend()`, `properties.defineProperties` supports any ordinary JavaScript object or constructor and should work with most inheritance libraries.

```js
function FancyPerson(gender, name) {
    this.gender = gender;
    this.name = name;
}
Object.defineProperty(FancyPerson, "fancyName", {
    get: function() {
        var stuffyTitles = {"male": "Sir", "female": "Dame"};
        return stuffyTitles[this.gender] + " " + this.name;
    }
});
properties.defineProperties(FancyPerson, {
    fancyName: { dependsOn: ["gender", "lastName"] }
});
```

If your class definition library doesn't support computed properties itself, you can create them with `properties.defineProperties()` by providing a `get` and/or `set` method:

```js
properties.defineProperties(MyModel, {
    fullName: {
        get: function() {
            return [this.firstName, this.lastName].filter(Boolean).join(" ");
        },
        dependsOn: ["firstName", "lastName"]
    }
});
```

#### Manually triggering change notifications

The above method can be overkill for very simple use cases. If a property has a custom setter, you can manually announce that the value has changed by calling `properties.propertyChanged(object, propertyName)`.

```js
var Transaction = classes.extend(Object, {
    constructor: function() {
        // _amount shouldn't be enumerable, so it won't show up in
        // JSON serializations and for..in loops.
        Object.defineProperty(this, "_amount", {writable: true, enumerable: false});
    ),
    get amount() {
        return this._amount;
    },
    set amount(value) {
        this._amount = Number(value);
        properties.propertyChanged(this, "amount");
    }
});
```

<a name="transform"></a>
## Property Transformations

The `transform` module establishes a one-way or two-way binding between two paths, with optional conversion functions. A `from` function converts from the source path to the destination path, and `to` optionally converts back. Think of `from` as the right-to-left conversion, and `to` as the left-to-right conversion function.

Since this is powered by the above asynchronous observer feature, the second side of a binding won’t update until 4ms after the execution thread finishes. You can force an immediate update with `properties.runObservers(theObject)`.

### One-to-one transformations

```js
transform(this, "isoDate", "model.transactionDate", {
    from: function(jsDate) {
        return jsDate ? jsDate.toISOString().substr(0,10) : "";
    },
    to: function(isoDate) {
        return isoDate ? new Date(isoDate) : null;
    }
})

this.model.transactionDate = new Date(2015, 0, 5);

// 4ms later, or after running properties.runObservers(this.model):
console.log(this.viewModel.isoDate);
// "2015-01-05"
```

JavaScript primitives can be used for conversion functions, though watch out for `undefined` values (which `Number()` and `String()` cast as `NaN` and `"undefined"`):

```js
transform(this, "amountNumber", "amountString", {
    from: Number,
    to: String
});
```

To set up a one-way binding, specify only a `from` converter. To do a two-way binding, specify both `from` and `to`. Or for the simplest usage specify neither and a default two-way binding will be set up:

```js
transform(this, "viewModel.firstCustomersName", "model.customers.0.fullName");
```

If you attempt to attach more than one transformation to the same destination property, an error will be thrown.

### Multiple-to-multiple transformations

The alternate `transform.multiple()` syntax can be used to transform between multiple separate properties:

```js
transform.multiple(this, ["street", "unitType", "unit"], ["model.address.line1"], {
    from: function(line1) {
       var parts = _splitLine1(line1);
       return [parts.street, parts.unitType, parts.unit];
    },
    to: function(street, unitType, unit) {
        return [
            [street, unitType, unit].filter(Boolean).join(" ")
        ];
    }
});
```

When using this syntax, both `fromPaths` and `toPaths` are arrays of key paths, and conversion functions must return an array of values that map to the provided paths.

### Detaching transformations

When you're done with a piece of code, it’s important to remove any binding to longer-lived objects so it can be garbage-collected. The function `transform.detach()` takes the first two arguments from `transform()`. When detaching a to-multiple transformation registered with `transform.multiple()`, provide any of the destination paths for the second argument and they will all be detached.

```js
define(['object-utils/src/transform'], function(transform) {
    function MyView(model) {
        this.model = model;

        transform(this, "amountString", "model.amount", {
            from: function(value) {
                return value.toFixed(2);
            }, to: Number
        });
    }

    MyView.prototype.destroy = function() {
        transform.detach(this, "amountString");
    }

    return MyView;
 });
```
