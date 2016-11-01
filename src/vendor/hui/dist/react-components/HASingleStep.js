var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/single-step"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/single-step"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.singleStep);
        global.HASingleStep = mod.exports;
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

    var HASingleStep = function (_React$Component) {
        _inherits(HASingleStep, _React$Component);

        function HASingleStep(props) {
            _classCallCheck(this, HASingleStep);

            var _this = _possibleConstructorReturn(this, (HASingleStep.__proto__ || Object.getPrototypeOf(HASingleStep)).call(this, props));

            _this.onClick = function (event) {
                if (_this.props.onClick) {
                    _this.props.onClick(event);
                }
            };

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {
                onChange: null
            };
            return _this;
        }

        //Event handler for Click

        _createClass(HASingleStep, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // Event handler for change
                this._listeners.onChange = function (event) {
                    event.stopPropagation();
                    if (_this2.props.onChange) {
                        _this2.props.onChange(event);
                    }
                };
                this._huiComponent.addEventListener("change", this._listeners.onChange);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("change", this._listeners.onChange, false);
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-single-step",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className,
                        onClick: this.onClick
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HASingleStep;
    }(_react2.default.Component);

    HASingleStep.propTypes = {
        id: _react2.default.PropTypes.string,
        className: _react2.default.PropTypes.string,
        showOnRender: _react2.default.PropTypes.bool,
        targetSelector: _react2.default.PropTypes.string,
        position: _react2.default.PropTypes.string,
        titleText: _react2.default.PropTypes.string,
        message: _react2.default.PropTypes.string,
        dismissible: _react2.default.PropTypes.bool,
        trigger: _react2.default.PropTypes.string,
        duration: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
        onChange: _react2.default.PropTypes.func,
        onClick: _react2.default.PropTypes.func
    };
    exports.default = HASingleStep;
});
//# sourceMappingURL=HASingleStep.js.map
