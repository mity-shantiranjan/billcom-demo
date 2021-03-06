var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/radio-button"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/radio-button"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.radioButton);
        global.HARadioButton = mod.exports;
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

    function _objectWithoutProperties(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    }

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

    var HARadioButton = function (_React$Component) {
        _inherits(HARadioButton, _React$Component);

        function HARadioButton(props) {
            _classCallCheck(this, HARadioButton);

            var _this = _possibleConstructorReturn(this, (HARadioButton.__proto__ || Object.getPrototypeOf(HARadioButton)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {};
            return _this;
        }

        _createClass(HARadioButton, [{
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

                // Event handler for click
                var onClick = function onClick(event) {
                    event.stopPropagation();
                    if (_this2.props.onClick) {
                        _this2.props.onClick(event);
                    }
                };
                this._listeners.onClick = onClick.bind(this);
                this._huiComponent.addEventListener("click", this._listeners.onClick);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("change", this._listeners.onChange, false);
                this._huiComponent.removeEventListener("click", this._listeners.onClick, false);
            }
        }, {
            key: "render",
            value: function render() {
                var _props = this.props,

                /* jshint ignore:start */
                disabled = _props.disabled,
                    props = _objectWithoutProperties(_props, ["disabled"]);

                // polyfill for IE 11, ref: https://github.com/facebook/react/issues/961
                return disabled === true || disabled === "true" ? _react2.default.createElement("ha-radio-button", _extends({ ref: this.handleRef, "class": this.props.className, disabled: true }, props)) : _react2.default.createElement("ha-radio-button", _extends({ ref: this.handleRef, "class": this.props.className }, props));
                /* jshint ignore:end */
            }
        }]);

        return HARadioButton;
    }(_react2.default.Component);

    HARadioButton.propTypes = {
        className: _react2.default.PropTypes.string,
        label: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        value: _react2.default.PropTypes.string,
        checked: _react2.default.PropTypes.bool,
        disabled: _react2.default.PropTypes.bool,
        onChange: _react2.default.PropTypes.func,
        onClick: _react2.default.PropTypes.func
    };
    exports.default = HARadioButton;
});
//# sourceMappingURL=HARadioButton.js.map
