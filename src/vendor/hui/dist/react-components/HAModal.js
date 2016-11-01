var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "./HAPortal", "hui/modal"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("./HAPortal"), require("hui/modal"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HAPortal, global.modal);
        global.HAModal = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HAPortal) {
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

    var HAModal = function (_React$Component) {
        _inherits(HAModal, _React$Component);

        function HAModal(props) {
            _classCallCheck(this, HAModal);

            var _this = _possibleConstructorReturn(this, (HAModal.__proto__ || Object.getPrototypeOf(HAModal)).call(this, props));

            _initialiseProps.call(_this);

            _this._modal = null; // modal DOM reference, set after render()
            _this._listeners = {}; // keep track if we have set any event listeners on modal
            _this.compID = "";
            return _this;
        }

        // check that the only children passed to this component are a HASection, HAAside, or HAFooter

        _createClass(HAModal, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                if (this._modal) {
                    this.removeWebRenderComp();
                    this.setState(function () {
                        _this2.compID = _this2._modal.componentId;
                    });
                }
                this.mountModal();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                this.mountModal(prevProps);
            }
        }, {
            key: "mountModal",
            value: function mountModal() {
                var _this3 = this;

                var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if (this._modal && this.props.show !== prevProps.show) {
                    if (this.props.show) {
                        this.setupListeners();
                        if (this._modal.show) {
                            this._modal.show();
                        } else {
                            // on browsers that doesn't support custom elements natively,
                            // the component is not upgraded yet so show is not available, wait for event
                            var componentUpgraded = function componentUpgraded(event) {
                                event.stopPropagation();
                                _this3._modal.show();
                            };
                            this._listeners.componentUpgraded = componentUpgraded.bind(this);
                            this._modal.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                        }
                    } else if (prevProps.show) {
                        this._modal.close(); // remove modal from DOM using hui/modal
                    }
                }
            }
        }, {
            key: "removeWebRenderComp",
            value: function removeWebRenderComp() {
                var modalChild = this._modal.querySelectorAll('.modal');
                if (modalChild && modalChild.length > 1) {
                    this._modal.removeChild(modalChild[0]);
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
                    this._modal.addEventListener("show", this._listeners.onShow);

                    var onClose = function onClose(event) {
                        event.stopPropagation();
                        if (_this4.props.onClose) {
                            _this4.props.onClose(event);
                        }
                        _this4.cleanUpListeners();
                    };
                    this._listeners.onClose = onClose.bind(this);
                    this._modal.addEventListener("close", this._listeners.onClose);

                    var onDismiss = function onDismiss(event) {
                        event.stopPropagation();
                        if (_this4.props.onDismiss) {
                            _this4.props.onDismiss(event);
                        }
                        // onDismiss emits a onClose so listener cleanup is handled there
                    };
                    this._listeners.onDismiss = onDismiss.bind(this);
                    this._modal.addEventListener("dismiss", this._listeners.onDismiss);
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
                // if we do not have a _modal then HAUnderlay destroys the event listeners
                if (this._modal) {
                    this._modal.removeEventListener("show", this._listeners.onShow, false); // clean up show listener
                    this._modal.removeEventListener("close", this._listeners.onClose, false); // clean up close listener
                    this._modal.removeEventListener("dismiss", this._listeners.onDismiss, false); // clean up dismiss listener
                    this._modal.removeEventListener("component-upgraded", this._listeners.componentUpgraded, false); // clean up component-upgraded listener
                }
                this._listeners = {};
            }
        }, {
            key: "getModalTitleIcon",
            value: function getModalTitleIcon(type) {
                switch (type) {
                    case "confirm":
                    case "endflow":
                        return _react2.default.createElement("i", { className: "hi hi-circle-check" });
                        break;
                    case "info":
                        return _react2.default.createElement("i", { className: "hi hi-circle-info" });
                        break;
                    case "error":
                    case "warn":
                    case "alert":
                        return _react2.default.createElement("i", { className: "hi hi-circle-alert" });
                        break;
                    default:
                        break;
                }
            }
        }, {
            key: "getModalClass",
            value: function getModalClass(type, size) {
                var dialogClass = "modal-dialog " + size + " ",
                    titleClass = "modal-title ";
                if (type === "error" || type === "alert" || type === "endflow") {
                    dialogClass += type + " ";

                    if (type === "error" || type === "alert") {
                        if (type === 'alert') {
                            console.warn('DEPRECATION WARNING: Type "alert" is deprecated, take care using this type for futures releases');
                        }
                        dialogClass = dialogClass.replace("message-icon", "");
                        titleClass += "hi-" + type;
                    } else if (type === "endflow") {
                        dialogClass += "message-icon";
                        titleClass += "hi-confirm";
                    }
                } else {
                    dialogClass += "message-icon";
                    titleClass += "hi-" + type;
                }

                return {
                    "dialog": dialogClass,
                    "title": titleClass
                };
            }
        }, {
            key: "render",
            value: function render() {
                var _this5 = this;

                /* jshint ignore:start */
                var countClassMap = {
                    1: "one-btn",
                    2: "two-btn",
                    3: "three-btn"
                },
                    classes = this.getModalClass(this.props.type, this.props.size);

                return(
                    // renders .ha-underlay and modal outside of parent react DOM tree
                    _react2.default.createElement(
                        _HAPortal2.default,
                        { show: this.props.show },
                        _react2.default.createElement(
                            "ha-modal",
                            _extends({
                                ref: this.handleRef,
                                "class": this.props.className,
                                reactLayering: true
                            }, this.props),
                            _react2.default.createElement(
                                "div",
                                { className: "modal", tabIndex: "-1", "aria-labelledby": "modal-title-" + this.compID, "aria-describedby": "modal-text-" + this.compID },
                                _react2.default.createElement(
                                    "div",
                                    { className: classes["dialog"] },
                                    _react2.default.createElement(
                                        "div",
                                        { className: "modal-content" },
                                        _react2.default.createElement(
                                            "header",
                                            null,
                                            _react2.default.createElement("button", { type: "button", className: "btn btn-link hi hi-close medium pull-right", "aria-label": "Close" }),
                                            _react2.default.createElement(
                                                "div",
                                                { className: classes["title"] },
                                                this.getModalTitleIcon(this.props.type),
                                                this.props.size === 'small' && this.props.type === 'error' || this.props.size === 'small' && this.props.type === 'alert' ? _react2.default.createElement(
                                                    "h4",
                                                    { id: "modal-title-" + this.compID },
                                                    this.props.titleText
                                                ) : _react2.default.createElement(
                                                    "h2",
                                                    { id: "modal-title-" + this.compID },
                                                    this.props.titleText
                                                )
                                            )
                                        ),
                                        _react2.default.Children.map(this.props.children, function (child) {
                                            if (child.type.name === "HASection") {
                                                return _react2.default.cloneElement(child, { id: "modal-text-" + _this5.compID, key: "1" });
                                            } else if (child.type.name === "HAFooter") {
                                                return _react2.default.cloneElement(child, { className: countClassMap[child.props.children.length], key: "2" });
                                            } else if (child.type.name === "HAAside") {
                                                return _react2.default.cloneElement(child, { key: "3" });
                                            }
                                        })
                                    )
                                )
                            )
                        )
                    )
                );
                /* jshint ignore:end */
            }
        }]);

        return HAModal;
    }(_react2.default.Component);

    HAModal.propTypes = {
        children: function children(props, propName, componentName) {
            var prop = props[propName] || [];
            var types = ['HASection', 'HAAside', 'HAFooter'];
            // handle single child prop http://facebook.github.io/react/tips/children-props-type.html
            prop = Array.isArray(prop) ? prop : [prop];

            for (var child in prop) {
                // Only accept a single child, of the appropriate type
                if (types.indexOf(prop[child].type.name) === -1) {
                    return new Error(componentName + "'s children can only have one instance of the following types: " + types.join(', '));
                } else {
                    types[types.indexOf(prop[child].type.name)] = '';
                }
            }
        },
        className: _react2.default.PropTypes.string,
        show: _react2.default.PropTypes.bool.isRequired,
        titleText: _react2.default.PropTypes.string,
        type: _react2.default.PropTypes.string,
        size: _react2.default.PropTypes.string,
        dismissible: _react2.default.PropTypes.bool,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func,
        onDismiss: _react2.default.PropTypes.func
    };

    var _initialiseProps = function _initialiseProps() {
        var _this6 = this;

        this.handleRef = function (c) {
            _this6._modal = c;
        };
    };

    exports.default = HAModal;
});
//# sourceMappingURL=HAModal.js.map
