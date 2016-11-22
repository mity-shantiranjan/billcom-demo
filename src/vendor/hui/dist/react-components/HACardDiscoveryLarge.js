var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/core/utils", "hui/card-discovery-large"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/core/utils"), require("hui/card-discovery-large"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.utils, global.cardDiscoveryLarge);
        global.HACardDiscoveryLarge = mod.exports;
    }
})(this, function (exports, _react, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var HACardDiscoveryLarge = function (_React$Component) {
        _inherits(HACardDiscoveryLarge, _React$Component);

        function HACardDiscoveryLarge(props) {
            _classCallCheck(this, HACardDiscoveryLarge);

            var _this = _possibleConstructorReturn(this, (HACardDiscoveryLarge.__proto__ || Object.getPrototypeOf(HACardDiscoveryLarge)).call(this, props));

            _initialiseProps.call(_this);

            _this._cardDiscoveryLarge = null; // cardDiscoveryLarge DOM reference, set after render()
            // keep track if we have set any event listeners on cardDiscoveryLarge
            _this._listeners = {};
            return _this;
        }

        // check that the only children passed to this component are a HASection or HAFooter

        _createClass(HACardDiscoveryLarge, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // handle React 15 partial rewrite
                this.fixRenderedChildren();
                this.mountCardDiscoveryLarge();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                this.mountCardDiscoveryLarge(prevProps);
            }
        }, {
            key: "fixRenderedChildren",
            value: function fixRenderedChildren() {
                var _this2 = this;

                var cardContainer = this._cardDiscoveryLarge.querySelector('.card-discovery-large-container'),
                    siblingSection = cardContainer.nextElementSibling;

                // short circuit if already been amended
                if (!siblingSection) {
                    return;
                }

                this._cardDiscoveryLarge.section = siblingSection;

                // if no children, only update textContent
                // otherwise, move children back under original section
                var underlyingSection = cardContainer.querySelector('section > section'),
                    underlyingSectionChildren = Array.prototype.slice.call(underlyingSection.children);

                if (underlyingSectionChildren.length < 1) {
                    this._cardDiscoveryLarge.section = siblingSection.textContent;
                } else {
                    (function () {
                        var outerSection = _this2._cardDiscoveryLarge.querySelector('section');
                        underlyingSectionChildren.forEach(function (sectionElement) {
                            outerSection.appendChild(sectionElement);
                        });
                    })();
                }

                // move rendered footer into empty footer container
                var renderedFooter = cardContainer.nextElementSibling;
                cardContainer.removeChild(cardContainer.querySelector('footer'));

                // update footer if not empty
                if (renderedFooter) {
                    cardContainer.appendChild(renderedFooter);
                    this._cardDiscoveryLarge.footer = Array.prototype.slice.call(renderedFooter.children);
                }
            }
        }, {
            key: "mountCardDiscoveryLarge",
            value: function mountCardDiscoveryLarge() {
                var _this3 = this;

                var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if (this._cardDiscoveryLarge && this.props.open !== prevProps.open) {
                    if (this.props.open) {
                        this.setupListeners();
                        if (this._cardDiscoveryLarge.show) {
                            this._cardDiscoveryLarge.show(); // show card discvoery large in DOM using hui/card-discovery-large
                        } else {
                                // on browsers that doesn't support custom elements natively,
                                // the component is not upgraded yet so show is not available, wait for event
                                var componentUpgraded = function componentUpgraded(event) {
                                    event.stopPropagation();
                                    _this3._cardDiscoveryLarge.show(); // show card discvoery large in DOM using hui/card-discovery-large
                                };
                                this._listeners.componentUpgraded = componentUpgraded.bind(this);
                                this._cardDiscoveryLarge.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                            }
                    } else if (prevProps.show) {
                        // remove Card from DOM using hui/card-discovery-large
                        this._cardDiscoveryLarge.close();
                    }
                }
            }
        }, {
            key: "setupListeners",
            value: function setupListeners() {
                var _this4 = this;

                if (Object.keys(this._listeners).length === 0) {
                    var onShow = function onShow(event) {
                        event.stopPropagation();
                        if (_this4.props.onShow) {
                            _this4.props.onShow(event);
                        }
                    };
                    this._listeners.onShow = onShow.bind(this);
                    this._cardDiscoveryLarge.addEventListener("show", this._listeners.onShow);

                    var onClose = function onClose(event) {
                        event.stopPropagation();
                        if (_this4.props.onClose) {
                            _this4.props.onClose(event);
                        }
                    };
                    this._listeners.onClose = onClose.bind(this);
                    this._cardDiscoveryLarge.addEventListener("close", this._listeners.onClose);

                    var onDismiss = function onDismiss(event) {
                        event.stopPropagation();
                        if (_this4.props.onDismiss) {
                            _this4.props.onDismiss(event);
                        }
                    };
                    this._listeners.onDismiss = onDismiss.bind(this);
                    this._cardDiscoveryLarge.addEventListener("dismiss", this._listeners.onDismiss);
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._cardDiscoveryLarge.removeEventListener("show", this._listeners.onShow, false); // clean up show listener
                this._cardDiscoveryLarge.removeEventListener("close", this._listeners.onClose, false); // clean up close listener
                this._cardDiscoveryLarge.removeEventListener("dismiss", this._listeners.onDismiss, false); // clean up dismiss listener
                this._cardDiscoveryLarge.removeEventListener("component-upgraded", this._listeners.componentUpgraded, false); // clean up component-upgraded listener
                this._listeners = {};
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-card-discovery-large",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HACardDiscoveryLarge;
    }(_react2.default.Component);

    HACardDiscoveryLarge.propTypes = {
        children: function children(props, propName, componentName) {
            var prop = props[propName] || [],
                types = ["HASection", "HAFooter"],
                typeName;
            // handle single child prop http://facebook.github.io/react/tips/children-props-type.html
            prop = Array.isArray(prop) ? prop : [prop];

            for (var child in prop) {
                typeName = (0, _utils.getReactTypeName)(prop[child]);
                // Only accept a single child, of the appropriate type
                if (types.indexOf(typeName) === -1) {
                    return new Error(componentName + "'s children can only have one instance of the following types: " + types.join(', '));
                } else {
                    types[types.indexOf(typeName)] = '';
                }
            }
        },
        className: _react2.default.PropTypes.string,
        titleText: _react2.default.PropTypes.string,
        dismissible: _react2.default.PropTypes.bool,
        open: _react2.default.PropTypes.bool,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func,
        onDismiss: _react2.default.PropTypes.func
    };

    var _initialiseProps = function _initialiseProps() {
        var _this5 = this;

        this.handleRef = function (c) {
            _this5._cardDiscoveryLarge = c;
        };
    };

    exports.default = HACardDiscoveryLarge;
});
//# sourceMappingURL=HACardDiscoveryLarge.js.map
