define([
    "object-utils/classes"
], function(classes) {
    "use strict";

    var UIComponent,
        componentIdCounter = 0,
        listenToCounter = 0,

        _defineProperty = Object.defineProperty;

    function matchesSelectorListener(selector, listener, contextNode) {
        return function(e) {
            var matchesTarget = matches(e.target, selector, contextNode);
            if (matchesTarget) {
                listener(e, matchesTarget);
            }
        };
    }

    function _isTypeObject(what) {
        return what.stringify && what.parse;
    }

    function _parseTypeCast(what, propertyName) {
        if (what) {
            if (typeof what === "function") {
                what = {
                    stringify: what,
                    parse: what
                };
            }
            if (!_isTypeObject(what)) {
                throw new TypeError(propertyName + ": invalid type");
            }
        }
        return what || null;
    }

    // like _assertFunction but can take a string method name, allowing child overrides
    function _assertMethodIfExists(what, optionName, propertyName) {
        var type = typeof what;
        if (what && !(type === "function" || type === "string")) {
            throw new TypeError(propertyName + ": " + optionName + " not a function or method name");
        }
        return what || null;
    }

    /**
     * Makes a (non-enumerable) own object if necessary
     *
     * @param {Object} object Some object
     * @param {string} propertyName
     * @returns {object}
     * @private
     */
    function _objectMap(object, propertyName) {
        if (!object.hasOwnProperty(propertyName)) {
            _defineProperty(object, propertyName, {
                value: Object.create(null)
            });
        }
        return object[propertyName];
    }

    /**
     * Check if a node match the current selector within the constraint of a context node
     * @param  {HTMLElement} node        The node that originate the event
     * @param  {String} selector         The selector to check against
     * @param  {HTMLElement} contextNode The context to search in
     * @return {HTMLElement|Boolean}     The matching node if any. Else you get false.
     */
    function matches(node, selector, contextNode) {
        var matchesSelector = node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector;

        while (node && node.nodeType === 1 && node !== contextNode) {
            if (matchesSelector.call(node, selector)) {
                return node;
            } else {
                node = node.parentNode;
            }
        }
        return false;
    }

    function _makeGetConverter(propertyName, typeCast, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = null;
        }

        var parse = typeCast && typeCast.parse;

        return parse === Boolean ? function(value) {
            return value !== null && value !== "false";
        } : parse ? function(value) {
            return value === null ? defaultValue : parse(value, propertyName);
        } : function(value) {
            return value === null ? defaultValue : value;
        };
    }

    function _makeAttributeGetterSetter(object, propertyName, attributeName, typeCast, getConverter) {
        var stringify = typeCast && typeCast.stringify;

        _defineProperty(object, propertyName, {
            get: function() {
                return getConverter(this.getAttribute(attributeName));
            },
            set: stringify === Boolean ? function(value) {
                if (value) {
                    this.setAttribute(attributeName, attributeName);
                } else {
                    this.removeAttribute(attributeName);
                }
            } : stringify ? function(value) {
                value = (value === null ? value : stringify(value, propertyName));

                if (value === null || value === "") {
                    this.removeAttribute(attributeName);
                } else {
                    this.setAttribute(attributeName, value);
                }
            } : function(value) {
                if (value === null || value === "") {
                    this.removeAttribute(attributeName);
                } else {
                    this.setAttribute(attributeName, value);
                }
            }
        });
    }

    function _findChildren(parent) {
        var children = [];

        function loop(el) {
            var nodes = el.children,
                node;

            for (var i = 0; i < nodes.length; ++i) {
                node = nodes[i];
                if (node.tagName.indexOf("-") >= 0) {
                    // custom elements must contain a "-"
                    children.push(node);
                } else if (node.children.length){
                    loop(node);
                }
            }
        }

        loop(parent);

        return children;
    }

    UIComponent = classes.createObject(HTMLElement.prototype, {

        /**
         * Initialization method (like a constructor)
         *
         * @protected
         */
        init: function() {
            /**
             * Root CSS class of the component
             * @member {String}
             * @protected
             */
            this.baseClass = "";

            /**
             * Unique id for this component, separate from id attribute (which may or may not be set).
             * @member {Number}
             * @constant
             * @readonly
             * @protected
             */
            this.componentId = 0;

            /**
             * Value returned by a handlebars AMD plugin or compatible template engine.
             * Specifies how to build the widget DOM initially and also how to update the DOM when
             * widget properties change.
             * @member {Function}
             * @protected
             */
            this.template = null;

            /**
             * Kick off the life-cycle of a component.
             *
             * Calls a number of component methods (`render()` which calls `preRender()` and `postRender()`),
             * some of which of you'll want to override.
             *
             * Don't override createdCallback.
             * @protected
             */
            this.componentId = ++componentIdCounter;
        },

        /**
         * Don't override createdCallback, which is used to both construct and render a component.
         * Instead override the above 'init' callback, which will be called after defaults are set but before
         * the component has been rendered.
         */
        createdCallback: function() {
            _defineProperty(this, "_attrChangeCalls", {
                value: {}
            });

            this.init();

            // handle initial class names
            if (this.baseClass) {
                var classNames = this.baseClass.split(" ").filter(Boolean);
                classNames.forEach(function(item) {
                    this.classList.add(item);
                }, this);
            }

            this._setupEventAttrbutes();

            this.render();

            this._listenforReady();

            this._rendered = true;

            this._initBoundProperties();
        },

        _listenforReady: function() {
            var eventName = "component-upgraded",
                children = _findChildren(this),
                numUpgraded = children.reduce(function(prev, child) {
                    return child._upgraded ? prev + 1 : prev;
                }, 0),
                numChildren = children.length,
                func = function(event) {
                    event.stopPropagation();
                    if (++numUpgraded === numChildren) {
                        this.removeEventListener(eventName, func);
                        this.ready();
                    }
                }.bind(this);

            if (numChildren) {
                this.addEventListener(eventName, func);
            } else {
                this.ready();
            }
        },

        ready: function() {
            this._upgraded = true;
            this.emit("component-upgraded", { bubbles: true });
        },

        /**
         * Placeholder that _.super call works
         */
        attachedCallback: function() { },

        attributeChangedCallback: function(attrName, oldValue, newValue) {
            var attrRecord  = this._attributes && this._attributes[attrName.toLowerCase()];

            attrName = attrName.toLowerCase();

            if (attrRecord) {
                var pendingChangeCalls = this._attrChangeCalls;
                if (pendingChangeCalls[attrName] > 0) {
                    pendingChangeCalls[attrName]--;
                } else {
                    this._attributeChanged(attrName, oldValue, newValue);
                }
            }
        },

        /**
         * Processing before `render()`.
         *
         * @protected
         */
        preRender: function() { },

        /**
         * Processing after the DOM fragment is created from `render()`.
         *
         * Called after the DOM fragment has been created, but not necessarily
         * added to the document.  Do not include any operations which rely on
         * node dimensions or placement.
         *
         * @protected
         */
        postRender: function() { },

        /**
         * Construct the UI for this widget, filling in subnodes and/or text inside of this.
         * Most widgets will leverage handlebars AMD plugin to set `template`, rather than define this method.
         * @protected
         */
        render: function() {
            var str;

            if (this._rendered) {
                return;
            }

            this.preRender();

            if (this.template) {
                str = this.template(this);
                // remove the <template> tag
                this.innerHTML = str.replace(/<[\/]{0,1}(template|TEMPLATE)[^><]*>/g, "");
            }

            this.postRender();
        },

        /**
         * Calls the initial change handlers on any bound properties
         * @private
         */
        _initBoundProperties: function() {
            var attrChangeCalls = this._attrChangeCalls;

            if (this._attributes) {
                Object.keys(this._attributes).forEach(function(attrName) {
                    attrChangeCalls[attrName.toLowerCase()] = 0;
                    this._attributeChanged(attrName, null, this.getAttribute(attrName));
                }, this);
            }
        },

        /**
         * Registers attribute-property bindings and synchronous change handlers
         * Call this.setupProperties() from inside init() or Prototype.setupProperties() when creating the prototype
         *
         * Specify a mapping of property name to type conversion functions (such as Boolean, Number, String, etc)
         * or configuration objects, with the following properties (all optional)
         *
         * Boolean types are handled like native HTML boolean attributes (like option.selected): if an
         * attribute is present it's true, and if missing it's false. As a concession to template systems
         * that don't recognize nonstandard boolean attributes, it's also false if set to the string "false".
         *
         * The type option can take a simple type cast function or object with 'stringify' and 'parse' methods.
         * stringify() converts from an arbitrary property value to the DOM attribute's string representation,
         * and parse() converts it back. See the custom types in attributeTypes.js for examples.
         *
         *   - *type*: a type conversion function, which takes a string or user-provided value and outputs the desired
         *     type. The builtins Number, String, and Boolean will work as is, while other types will require a custom
         *     converter. Defaults (implicitly) to String, since actual values are stored in the DOM as strings.
         *   - *attribute*: the attribute name to map to. Defaults to the property name in lowercase.
         *     In HTML documents, attributes are case-insensitive but the provided case will reflect newly-created
         *     attributes.
         *   - *default*: the value when the attribute doesn't exist. Ignored for Booleans since their default
         *     is always false.
         *
         * @param {object} attributeMap
         */
        setupProperties: function(attributeMap) {

            var boundAttributes = _objectMap(this, "_attributes"),
                boundProperties = _objectMap(this, "_properties");

            for (var propertyName in attributeMap) {
                var attrOptions = attributeMap[propertyName],
                    typeCast, defaultValue, attrName, attrChangeCallback;

                if (typeof attrOptions === "function" || _isTypeObject(attrOptions)) {
                    typeCast = attrOptions;
                    attrOptions = {};
                } else {
                    typeCast = attrOptions.type || null;
                }
                typeCast = _parseTypeCast(typeCast, propertyName);

                attrChangeCallback = attrOptions.change;

                attrName = attrOptions.attribute || propertyName.toLowerCase();
                defaultValue = attrOptions["default"];

                var getConverter = _makeGetConverter(propertyName, typeCast, defaultValue);

                if (propertyName in boundProperties) {
                    throw new Error("Property " + propertyName + " already bound");
                }
                if (attrName.toLowerCase() in boundAttributes) {
                    throw new Error("Attribute " + attrName + " already bound");
                }

                _makeAttributeGetterSetter(this, propertyName, attrName, typeCast, getConverter);

                boundAttributes[attrName.toLowerCase()] = boundProperties[propertyName] = {
                    p: propertyName,
                    c: _assertMethodIfExists(attrOptions.change, "change callback", propertyName),
                    g: getConverter
                };
            }

            return this;
        },

        /**
         * Call the change handler for attrName, if one exists
         *
         * @param {string} attrName
         * @param {string} oldAttrValue
         * @param {string} newAttrValue
         * @private
         */
        _attributeChanged: function(attrName, oldAttrValue, newAttrValue) {
            var attrRecord  = this._attributes && this._attributes[attrName.toLowerCase()],
                changeCallback;

            if (attrRecord && (changeCallback = attrRecord.c)) {
                var typeCast = attrRecord.g,
                    newValue = typeCast(newAttrValue),
                    oldValue = typeCast(oldAttrValue);

                if (typeof changeCallback === "function") {
                    changeCallback.call(this, newValue, oldValue);
                } else {
                    this[changeCallback](newValue, oldValue);
                }
            }
        },

        /**
         * @private
         */
        _setupEventAttrbutes: function() {
            /** @const */
            var EVENT_ATTRIBUTE_RE = /^data-on-(.+)$/,
                attributes = this.attributes;

            for (var i = 0, l = attributes.length; i < l; i++) {
                var attribute = attributes[i],
                    attrNameMatch;
                if ((attrNameMatch = EVENT_ATTRIBUTE_RE.exec(attribute.name))) {
                    var eventName = attrNameMatch[1],
                        handlerName = attribute.value,
                        handlerFunc = this[handlerName];

                    if (typeof handlerFunc === "function") {
                        this.on(eventName, handlerFunc);
                    } else {
                        console.warn(this.nodeName + ": event handler \"" + handlerName + "\" is not " +  handlerName ? "a function" : "defined");
                    }
                }

            }
        },

        /**
         * On is a chainable method that allows us to bind a dom event to a `callback` function in the view's rootNode
         * @param  {String} type Then name of the dom event
         * @param  {Function} callback The callback function that gets called when a 'emit' happens
         * @return {Object} Returns the this object to allow for chaining.
         */
        on: function(type, callback) {
            return this.listenTo(this, type, callback);
        },

        /**
         * Off is a chainable method that removes one or many callbacks in the view's rootNode
         * @param  {String} type Name of the event. If `name` is null, removes all bound callbacks for all events
         * @param  {Function} callback If `callback` is null, removes all callbacks for the event
         * @return {Object} Returns the this object in order to allow chaining.
         */
        off: function(type, callback) {
            return this.stopListening(this, type, callback);
        },

        /**
         * Emits a syntethic event of specified type, firing all bound callbacks.
         * @param {String} type The name of the event.
         * @param {Object} eventObj An object that provides the properties for the event.
         * Can also contain `bubbles` and `cancelable` properties. See https://developer.mozilla.org/en/DOM/event.initEvent.
         * These properties are copied to the event object.
         * @return {Boolean} True if the event was not canceled, false if it was canceled.
         */
        emit: function(type, eventObj) {
            eventObj = eventObj || {};

            var nativeEvent,
                bubbles = "bubbles" in eventObj ? eventObj.bubbles : true,
                cancelable = "cancelable" in eventObj ? eventObj.cancelable : true;

            nativeEvent = this.ownerDocument.createEvent("HTMLEvents");
            nativeEvent.initEvent(type, bubbles, cancelable);

            for (var i in eventObj) {
                if (!(i in nativeEvent)) {
                    nativeEvent[i] = eventObj[i];
                }
            }
            return this.dispatchEvent(nativeEvent);
        },

        /**
         * @property _listeningTo
         * @type {Object}
         * @private
         */
        // _listeningTo: null

        /**
         * Tell an object to listen to a particular event on another object.
         * Allows the object to keep track of the events, and they can be removed all at once later on.
         *
         * @param {HTMLElement} obj        An Element you want to listen to
         * @param {String}      name       The event to listen to
         * @param {Function}    callback   The callback function that will be executed
         * @param {Boolean}     useCapture If true, useCapture indicates that the user wishes to initiate capture
         *
         * @return {HTMLElement} The element instance
         */
        listenTo: function(obj, name, callback, useCapture) {
            var listeningTo, id;

            if (!callback && typeof name === "object") {
                callback = this;
            }

            listeningTo = this._listeningTo || (this._listeningTo = {});
            id = "l" + (++listenToCounter);
            listeningTo[id] = {object: obj, name: name, callback: callback};

            // if dom node
            if (obj.addEventListener) {

                // supports name in the form of
                // "selector:click" e.g "a:click"
                var selector = name.match(/(.*):(.*)/);
                // if we have a selector:event, the last one is interpreted as an event, and we use event delegation
                if (selector) {
                    name = selector[2];
                    selector = selector[1];
                    callback = matchesSelectorListener(selector, callback, obj);
                    listeningTo[id].callback = callback;
                    listeningTo[id].name = name;
                }

                obj.addEventListener(name, callback, !!useCapture);
            } else if (obj.on) {
                obj.on(name, callback, this);
            }

            return this;
        },

        /**
         * Tell an object to stop listening to events. Either call stopListening with no arguments to have the object
         * remove all of its registered callbacks ...
         * or be more precise by telling it to remove just the events it's listening to on a specific object,
         * or a specific event, or just a specific callback.
         *
         * @param  {HTMLElement} [obj]        Optional If you want to stop listening to events for that particular Element only
         * @param  {String}      [name]       Optional event name
         * @param  {Function}    [callback]   Optional The listener function you want to stop listening
         * @param  {Boolean}     [useCapture] Optional Specifies whether the listener being removed was registered as a capturing listener or not. If not specified, useCapture defaults to false.
         *
         * @return {HTMLElement} The element instance
         */
        stopListening: function(obj, name, callback, useCapture) {
            var listeningTo = this._listeningTo,
                map = {},
                item,
                id;

            if (!listeningTo) {
                return this;
            }

            if (obj && !name && !callback) {
                // stopListening(obj)
                for (id in listeningTo) {
                    if (listeningTo[id].object === obj) {
                        map[id] = listeningTo[id];
                    }
                }
            } else if (obj && name && !callback) {
                // stopListening(obj, "click")
                for (id in listeningTo) {
                    if (listeningTo[id].object === obj && listeningTo[id].name === name) {
                        map[id] = listeningTo[id];
                    }
                }
            } else if (obj && name && callback) {
                // stopListening(obj, "click", callback)
                for (id in listeningTo) {
                    if (listeningTo[id].object === obj && listeningTo[id].name === name && listeningTo[id].callback === callback) {
                        map[id] = listeningTo[id];
                    }
                }
            } else if (!obj && !name && !callback) {
                // stopListening() stop listening to all
                map = listeningTo;
            }

            for (id in map) {
                item = map[id];

                // if dom node
                if (item.object.removeEventListener) {
                    item.object.removeEventListener(item.name, item.callback, !!useCapture);
                } else if (item.object.off) {
                    item.object.off(item.name, item.callback, this);
                }

                delete this._listeningTo[id];
            }

            return this;
        },

        /**
         * Overrides HTMLElement's setAttribute to call custom attribute change observers (declared with
         * setupProperties()) synchronously. This is needed because when WebComponent polyfills are used
         * attributeChangedCallback becomes asynchronous.
         *
         * @param {string} attrName
         * @param {*} attrValue
         */
        setAttribute: function setAttribute(attrName, attrValue) {
            this._attrChangeCalls[ ("" + attrName).toLowerCase() ]++;

            var oldValue = this.getAttribute(attrName);
            setAttribute.superFunc.call(this, attrName, attrValue);
            var newValue = this.getAttribute(attrName);

            if (oldValue !== newValue) {
                this._attributeChanged(attrName, oldValue, newValue);
            }
        },

        /**
         * Overrides HTMLElement's removeAttribute to call custom attribute change observers (declared with
         * setupProperties()) synchronously. This is needed because when WebComponent polyfills are used
         * attributeChangedCallback becomes asynchronous.
         *
         * @param {string} attrName
         */
        removeAttribute: function removeAttribute(attrName) {
            // just return if attribute doesn't exist anymore
            if (!this.hasAttribute(attrName)) {
                return;
            }

            this._attrChangeCalls[ ("" + attrName).toLowerCase() ]++;

            var oldValue = this.getAttribute(attrName);

            removeAttribute.superFunc.call(this, attrName);

            if (oldValue !== null) {
                this._attributeChanged(attrName, oldValue, null);
            }
        }
    });

    return UIComponent;
});
