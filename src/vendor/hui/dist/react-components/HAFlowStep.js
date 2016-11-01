var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/step-flow/flow-step"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/step-flow/flow-step"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.flowStep);
        global.HAFlowStep = mod.exports;
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

    var HAFlowStep = function (_React$Component) {
        _inherits(HAFlowStep, _React$Component);

        function HAFlowStep(props) {
            _classCallCheck(this, HAFlowStep);

            var _this = _possibleConstructorReturn(this, (HAFlowStep.__proto__ || Object.getPrototypeOf(HAFlowStep)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            return _this;
        }

        _createClass(HAFlowStep, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.setHuiProperties();
                this.updateSection();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.setHuiProperties();
            }
        }, {
            key: "updateSection",
            value: function updateSection() {
                var flowSection = undefined;
                if (this._huiComponent) {
                    flowSection = this._huiComponent.querySelectorAll('section');
                }
                if (flowSection && flowSection.length > 1) {
                    var children = Array.prototype.slice.call(flowSection[1].childNodes);
                    children.forEach(function (child) {
                        flowSection[0].appendChild(child);
                    });
                    this._huiComponent.removeChild(flowSection[1]);
                }
            }
        }, {
            key: "setHuiProperties",
            value: function setHuiProperties() {
                if (this.props.validator) {
                    this._huiComponent.validator = this.props.validator;
                }
                if (this.props.beforeShowPromise) {
                    this._huiComponent.beforeShowPromise = this.props.beforeShowPromise;
                }
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-flow-step",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HAFlowStep;
    }(_react2.default.Component);

    HAFlowStep.propTypes = {
        className: _react2.default.PropTypes.string,
        id: _react2.default.PropTypes.string,
        stepId: _react2.default.PropTypes.string,
        showSaveForLaterButton: _react2.default.PropTypes.bool,
        saveForLaterButtonText: _react2.default.PropTypes.string,
        nextButtonText: _react2.default.PropTypes.string,
        previousButtonText: _react2.default.PropTypes.string,
        titleText: _react2.default.PropTypes.string,
        subtitleText: _react2.default.PropTypes.string,
        progressIndicatorText: _react2.default.PropTypes.string,
        stepComplete: _react2.default.PropTypes.bool,
        stepAvailable: _react2.default.PropTypes.bool,
        hideProgressIndicator: _react2.default.PropTypes.bool,
        hideProgressIndicatorItem: _react2.default.PropTypes.bool,
        hideStepButtons: _react2.default.PropTypes.bool,
        useCustomButtons: _react2.default.PropTypes.bool,
        content: _react2.default.PropTypes.object,
        validator: _react2.default.PropTypes.func,
        beforeShowPromise: _react2.default.PropTypes.func
    };
    exports.default = HAFlowStep;
});
//# sourceMappingURL=HAFlowStep.js.map
