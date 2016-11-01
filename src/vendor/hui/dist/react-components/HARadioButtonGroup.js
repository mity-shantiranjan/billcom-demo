var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/radio-button-group"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/radio-button-group"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.radioButtonGroup);
        global.HARadioButtonGroup = mod.exports;
    }
})(this, function (exports, _react) {
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

    var HARadioButtonGroup = function (_React$Component) {
        _inherits(HARadioButtonGroup, _React$Component);

        function HARadioButtonGroup(props) {
            _classCallCheck(this, HARadioButtonGroup);

            var _this = _possibleConstructorReturn(this, (HARadioButtonGroup.__proto__ || Object.getPrototypeOf(HARadioButtonGroup)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {};
            return _this;
        }

        _createClass(HARadioButtonGroup, [{
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
                    _this2.testValidity();
                };

                // update react components to the web component.
                this.removeWebRenderComp();
                this.updateRadios();
                this._huiComponent._setRadiosHandle();

                this._listeners.onChange = onChange.bind(this);
                this._huiComponent.addEventListener("change", this._listeners.onChange);

                // Event handler for click
                var onClick = function onClick(event) {
                    event.stopPropagation();
                    if (_this2.props.onClick) {
                        _this2.props.onClick(event);
                    }
                };
                this._listeners.onClick = onClick.bind(this);
                this._huiComponent.addEventListener("click", this._listeners.onClick);

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
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("change", this._listeners.onChange, false);
                this._huiComponent.removeEventListener("click", this._listeners.onClick, false);
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
            key: "removeWebRenderComp",
            value: function removeWebRenderComp() {
                var fieldChild = this._huiComponent.querySelectorAll('fieldset');
                if (fieldChild && fieldChild.length > 1) {
                    this._huiComponent.removeChild(fieldChild[0]);
                }
            }
        }, {
            key: "updateRadios",
            value: function updateRadios() {
                var radios = this._huiComponent.querySelectorAll('ha-radio-button');

                if (radios) {
                    this._huiComponent.radios = Array.prototype.slice.call(radios);
                }
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-radio-button-group",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    _react2.default.createElement(
                        "fieldset",
                        null,
                        this.props.label ? _react2.default.createElement(
                            "div",
                            { className: "label-container" },
                            _react2.default.createElement(
                                "legend",
                                null,
                                this.props.label
                            )
                        ) : null,
                        this.props.children
                    )
                );
                /* jshint ignore:end */
            }
        }]);

        return HARadioButtonGroup;
    }(_react2.default.Component);

    HARadioButtonGroup.propTypes = {
        expected: _react2.default.PropTypes.string,
        className: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        label: _react2.default.PropTypes.string,
        value: _react2.default.PropTypes.string,
        radios: _react2.default.PropTypes.array,
        selectedItem: _react2.default.PropTypes.number,
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
        onClick: _react2.default.PropTypes.func
    };
    exports.default = HARadioButtonGroup;
});
//# sourceMappingURL=HARadioButtonGroup.js.map
