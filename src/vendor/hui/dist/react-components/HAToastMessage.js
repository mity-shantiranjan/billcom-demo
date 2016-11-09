var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "hui/toast-message"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("hui/toast-message"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.toastMessage);
        global.HAToastMessage = mod.exports;
    }
})(this, function (exports, _react, _reactDom) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

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

    var HAToastMessage = function (_React$Component) {
        _inherits(HAToastMessage, _React$Component);

        function HAToastMessage(props) {
            _classCallCheck(this, HAToastMessage);

            var _this = _possibleConstructorReturn(this, (HAToastMessage.__proto__ || Object.getPrototypeOf(HAToastMessage)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            // keep track if we have set any event listeners on modal
            _this._listeners = {};
            return _this;
        }

        _createClass(HAToastMessage, [{
            key: "removeWebRenderComp",
            value: function removeWebRenderComp() {
                var wrapper = this._huiComponent.querySelectorAll('.toast-wrapper');
                if (wrapper && wrapper.length > 1) {
                    this._huiComponent.removeChild(wrapper[0]);
                }
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.setupListeners();
                if (this.props.show) {
                    this._huiComponent.show();
                }
                this.removeWebRenderComp();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                if (this.props.show !== prevProps.show) {
                    if (this.props.show) {
                        this._huiComponent.show();
                    } else if (this.props.duration <= 0) {
                        // only allow closing toasts that don't have a timout set
                        this._huiComponent.close();
                    }
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("show", this._listeners.onShow, false); // clean up show listener
                this._huiComponent.removeEventListener("close", this._listeners.onClose, false); // clean up close listener
                this._huiComponent.removeEventListener("dismiss", this._listeners.onDismiss, false); // clean up dismiss listener
            }
        }, {
            key: "setupListeners",
            value: function setupListeners() {
                var _this2 = this;

                var onShow = function onShow(event) {
                    event.stopPropagation();
                    if (_this2.props.onShow) {
                        _this2.props.onShow(event);
                    }
                };
                this._listeners.onShow = onShow.bind(this);
                this._huiComponent.addEventListener("show", this._listeners.onShow);

                var onClose = function onClose(event) {
                    event.stopPropagation();
                    _this2.props.onClose(event);
                };
                this._listeners.onClose = onClose.bind(this);
                this._huiComponent.addEventListener("close", this._listeners.onClose);

                var onDismiss = function onDismiss(event) {
                    event.stopPropagation();
                    if (_this2.props.onDismiss) {
                        _this2.props.onDismiss(event);
                    }
                };
                this._listeners.onDismiss = onDismiss.bind(this);
                this._huiComponent.addEventListener("dismiss", this._listeners.onDismiss);
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-toast-message",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    _react2.default.createElement(
                        "div",
                        { className: "toast-wrapper" },
                        _react2.default.createElement("button", { "aria-label": "Close", className: "hi hi-close" }),
                        _react2.default.createElement("i", { className: "hi hi-confirm hi-circle-check" }),
                        _react2.default.createElement(
                            "p",
                            null,
                            this.props.children
                        )
                    )
                );
                /* jshint ignore:end */
            }
        }]);

        return HAToastMessage;
    }(_react2.default.Component);

    HAToastMessage.propTypes = {
        duration: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
        dismissible: _react2.default.PropTypes.bool,
        show: _react2.default.PropTypes.bool,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func.isRequired, // used to set parent's state of show back to false
        onDismiss: _react2.default.PropTypes.func
    };
    exports.default = HAToastMessage;
});
//# sourceMappingURL=HAToastMessage.js.map
