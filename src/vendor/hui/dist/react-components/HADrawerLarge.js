var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "./HAPortal", "hui/core/utils", "hui/drawer-large"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("./HAPortal"), require("hui/core/utils"), require("hui/drawer-large"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HAPortal, global.utils, global.drawerLarge);
        global.HADrawerLarge = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HAPortal, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAPortal2 = _interopRequireDefault(_HAPortal);

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

    var HADrawerLarge = function (_React$Component) {
        _inherits(HADrawerLarge, _React$Component);

        function HADrawerLarge(props) {
            _classCallCheck(this, HADrawerLarge);

            var _this = _possibleConstructorReturn(this, (HADrawerLarge.__proto__ || Object.getPrototypeOf(HADrawerLarge)).call(this, props));

            _initialiseProps.call(_this);

            _this._drawerLarge = null; // drawerLarge DOM reference, set after render()
            _this._listeners = {};
            _this.compId = "";
            return _this;
        }

        // check that the only children passed to this component are a HASection, or HAFooter

        _createClass(HADrawerLarge, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                if (this._drawerLarge) {
                    this.removeWebRenderComp();
                    this.setState(function () {
                        _this2.compId = _this2._drawerLarge.componentId;
                    });
                }
                this.mountDrawerLarge();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                this.mountDrawerLarge(prevProps);
            }
        }, {
            key: "mountDrawerLarge",
            value: function mountDrawerLarge() {
                var _this3 = this;

                var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                // if we have added the drawer to the dom and we are changing show state
                if (this._drawerLarge && this.props.show !== prevProps.show) {
                    if (this.props.show) {
                        this.setupListeners();
                        if (this._drawerLarge.show) {
                            this._drawerLarge.show();
                        } else {
                            // on browsers that doesn't support custom elements natively,
                            // the component is not upgraded yet so show is not available, wait for event
                            var componentUpgraded = function componentUpgraded(event) {
                                event.stopPropagation();
                                _this3._drawerLarge.show();
                            };
                            this._listeners.componentUpgraded = componentUpgraded.bind(this);
                            this._drawerLarge.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                        }
                    } else if (prevProps.show) {
                        this._drawerLarge.close(); // remove drawer-large from DOM using hui/drawer-large
                    }
                }
            }
        }, {
            key: "removeWebRenderComp",
            value: function removeWebRenderComp() {
                var asideChild = this._drawerLarge.querySelectorAll('aside');
                if (asideChild && asideChild.length > 1) {
                    this._drawerLarge.removeChild(asideChild[0]);
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
                    this._drawerLarge.addEventListener("show", this._listeners.onShow);

                    var onClose = function onClose(event) {
                        event.stopPropagation();
                        if (_this4.props.onClose) {
                            _this4.props.onClose(event);
                        }
                        _this4.cleanUpListeners();
                    };
                    this._listeners.onClose = onClose.bind(this);
                    this._drawerLarge.addEventListener("close", this._listeners.onClose);

                    var onDismiss = function onDismiss(event) {
                        event.stopPropagation();
                        if (_this4.props.onDismiss) {
                            _this4.props.onDismiss(event);
                        }
                        // onDismiss emits a onClose so listener cleanup is handled there
                    };
                    this._listeners.onDismiss = onDismiss.bind(this);
                    this._drawerLarge.addEventListener("dismiss", this._listeners.onDismiss);
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                // we might need a unmountPortal here depending on how applications handle dom rendering & routing
                this.cleanUpListeners();
            }
        }, {
            key: "cleanUpListeners",
            value: function cleanUpListeners() {
                // if we do not have a _drawerLarge then HAUnderlay destroys the event listeners
                if (this._drawerLarge) {
                    this._drawerLarge.removeEventListener("show", this._listeners.onShow, false); // clean up show listener
                    this._drawerLarge.removeEventListener("close", this._listeners.onClose, false); // clean up close listener
                    this._drawerLarge.removeEventListener("dismiss", this._listeners.onDismiss, false); // clean up dismiss listener
                }
                this._listeners = {};
            }
        }, {
            key: "render",
            value: function render() {
                var _this5 = this;

                return _react2.default.createElement(
                    _HAPortal2.default,
                    { show: this.props.show, noUnderlay: !this.props.backdrop },
                    _react2.default.createElement(
                        "ha-drawer-large",
                        _extends({
                            ref: this.handleRef,
                            "class": this.props.className,
                            reactLayering: true
                        }, this.props),
                        _react2.default.createElement(
                            "aside",
                            { className: "drawer-panel", "aria-labelledby": "drawer-large-title-" + this.compId, tabIndex: "-1" },
                            _react2.default.createElement(
                                "header",
                                { className: "header" },
                                _react2.default.createElement(
                                    "button",
                                    { className: "drawer-close first-focus", "aria-label": "close" },
                                    _react2.default.createElement("span", { className: "hi hi-close" })
                                )
                            ),
                            _react2.default.Children.map(this.props.children, function (child) {
                                if ((0, _utils.getReactTypeName)(child) === "HASection") {
                                    return _react2.default.createElement(
                                        "section",
                                        { key: "1", className: "content", tabIndex: "-1" },
                                        _react2.default.createElement(
                                            "h3",
                                            { id: "drawer-large-title-" + _this5.compId },
                                            _this5.props.titleText
                                        ),
                                        _react2.default.createElement(
                                            "div",
                                            { className: "inner-content" },
                                            child
                                        )
                                    );
                                } else if ((0, _utils.getReactTypeName)(child) === "HAFooter") {
                                    return _react2.default.createElement(
                                        "footer",
                                        { key: "2", className: "footer", tabIndex: "-1" },
                                        child
                                    );
                                }
                            })
                        )
                    )
                );
            }
        }]);

        return HADrawerLarge;
    }(_react2.default.Component);

    HADrawerLarge.propTypes = {
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
        show: _react2.default.PropTypes.bool.isRequired,
        titleText: _react2.default.PropTypes.string,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func,
        noCloseOnDismiss: _react2.default.PropTypes.bool,
        onDismiss: _react2.default.PropTypes.func
    };

    var _initialiseProps = function _initialiseProps() {
        var _this6 = this;

        this.handleRef = function (c) {
            _this6._drawerLarge = c;
        };
    };

    exports.default = HADrawerLarge;
});
//# sourceMappingURL=HADrawerLarge.js.map
