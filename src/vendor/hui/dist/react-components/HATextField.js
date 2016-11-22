var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/core/utils", "hui/text-field"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/core/utils"), require("hui/text-field"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.utils, global.textField);
        global.HATextField = mod.exports;
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

    var HATextField = function (_React$Component) {
        _inherits(HATextField, _React$Component);

        function HATextField(props) {
            _classCallCheck(this, HATextField);

            var _this = _possibleConstructorReturn(this, (HATextField.__proto__ || Object.getPrototypeOf(HATextField)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {};
            _this.state = {
                classAttributes: null
            };
            return _this;
        }

        _createClass(HATextField, [{
            key: "testValidity",
            value: function testValidity() {
                if (this.props.onValidityChange) {
                    var valid = undefined;
                    if (this._huiComponent.checkValidity) {
                        valid = this._huiComponent.checkValidity();
                    }
                    if (this._lastValidity !== valid) {
                        this._lastValidity = valid;
                        this.props.onValidityChange(valid);
                    }
                }
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // With es6 syntax we have to bind the events to the react component instance
                // https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
                // Event handler for change
                var onChange = function onChange(event) {
                    event.stopPropagation();
                    if (_this2.props.onChange) {
                        _this2.props.onChange(event);
                    }
                };
                this._listeners.onChange = onChange.bind(this);
                this._huiComponent.addEventListener("change", this._listeners.onChange);

                // Event handler for input
                var onInput = function onInput(event) {
                    event.stopPropagation();
                    if (_this2.props.onInput) {
                        _this2.props.onInput(event);
                    }
                    _this2.testValidity();
                };
                this._listeners.onInput = onInput.bind(this);
                this._huiComponent.addEventListener("input", this._listeners.onInput);

                // Stop validation tooltip show event propagation
                var onShow = function onShow(event) {
                    event.stopPropagation();
                };
                this._listeners.onShow = onShow.bind(this);
                this._huiComponent.addEventListener("show", this._listeners.onShow);

                // Stop validation tooltip close event propagation
                var onClose = function onClose(event) {
                    event.stopPropagation();
                };
                this._listeners.onClose = onClose.bind(this);
                this._huiComponent.addEventListener("close", this._listeners.onClose);

                // Stop validation tooltip dismiss event propagation
                var onDismiss = function onDismiss(event) {
                    event.stopPropagation();
                };
                this._listeners.onDismiss = onDismiss.bind(this);
                this._huiComponent.addEventListener("dismiss", this._listeners.onDismiss);

                window.setTimeout(function () {
                    // We need the timeout so h-ui component checkValidity function is initialized
                    if (_this2.props.validator) {
                        _this2._huiComponent.validator = _this2.props.validator;
                    }
                    if (_this2.props.alwaysRenderValidity) {
                        _this2._huiComponent.reportValidity();
                    }
                    _this2.testValidity(); // We need to do initial notification of validity state.
                }, 0);

                // merge pre-existing custom element classes with props
                if (this.props.className) {
                    this.updateElementClasses();
                }
            }
        }, {
            key: "updateElementClasses",
            value: function updateElementClasses(newProps) {
                var mergedClassString = undefined;
                if (newProps) {
                    mergedClassString = (0, _utils.updateClassWithProps)(this._huiComponent, newProps.className);
                } else {
                    mergedClassString = (0, _utils.updateClassWithProps)(this._huiComponent, this.props.className);
                }

                // re-render the element with addition / removal of props
                if (mergedClassString) {
                    this.setState({
                        classAttributes: mergedClassString
                    });
                }
            }
        }, {
            key: "componentWillReceiveProps",
            value: function componentWillReceiveProps(nextProps) {
                // ensure that H-UI supported classes on the element aren't erased on props change
                var existingClasses = this.state.classAttributes;
                if (existingClasses !== nextProps.className) {
                    this.updateElementClasses(nextProps);
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("change", this._listeners.onChange, false);
                this._huiComponent.removeEventListener("input", this._listeners.onInput, false);
                this._huiComponent.removeEventListener("show", this._listeners.onShow, false);
                this._huiComponent.removeEventListener("close", this._listeners.onClose, false);
                this._huiComponent.removeEventListener("dismiss", this._listeners.onDismiss, false);
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                if (this.props.validator) {
                    this._huiComponent.validator = this.props.validator;
                }
                if (this.props.alwaysRenderValidity) {
                    this._huiComponent.reportValidity();
                }
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-text-field",
                    _extends({
                        ref: this.handleRef,
                        "class": this.state.classAttributes
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HATextField;
    }(_react2.default.Component);

    HATextField.propTypes = {
        className: _react2.default.PropTypes.string,
        disabled: _react2.default.PropTypes.bool,
        label: _react2.default.PropTypes.string,
        labelOptional: _react2.default.PropTypes.string,
        minLength: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
        maxLength: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
        name: _react2.default.PropTypes.string,
        optional: _react2.default.PropTypes.bool,
        placeholder: _react2.default.PropTypes.string,
        pattern: _react2.default.PropTypes.string,
        size: _react2.default.PropTypes.number,
        value: _react2.default.PropTypes.string,
        autoComplete: _react2.default.PropTypes.string,
        required: _react2.default.PropTypes.bool,
        noRequiredIndicator: _react2.default.PropTypes.bool,
        min: _react2.default.PropTypes.number,
        max: _react2.default.PropTypes.number,
        requiredMessage: _react2.default.PropTypes.string,
        invalidMessage: _react2.default.PropTypes.string,
        validator: _react2.default.PropTypes.func,
        onValidityChange: _react2.default.PropTypes.func,
        alwaysRenderValidity: _react2.default.PropTypes.bool,
        onChange: _react2.default.PropTypes.func,
        onInput: _react2.default.PropTypes.func
    };
    exports.default = HATextField;
});
//# sourceMappingURL=HATextField.js.map
