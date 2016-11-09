var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/step-flow"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/step-flow"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.stepFlow);
        global.HAStepFlow = mod.exports;
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

    var HAStepFlow = function (_React$Component) {
        _inherits(HAStepFlow, _React$Component);

        function HAStepFlow(props) {
            _classCallCheck(this, HAStepFlow);

            var _this = _possibleConstructorReturn(this, (HAStepFlow.__proto__ || Object.getPrototypeOf(HAStepFlow)).call(this, props));

            _initialiseProps.call(_this);

            _this._huiComponent = null;
            _this._listeners = {};
            return _this;
        }

        _createClass(HAStepFlow, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // force the web component to pick up React rendering components.
                this._huiComponent.postRender();

                if (this._huiComponent.show) {
                    this._huiComponent.show();
                } else {
                    // on browsers that doesn't support custom elements natively,
                    // the component is not upgraded yet so show is not available, wait for event
                    var componentUpgraded = function componentUpgraded(event) {
                        event.stopPropagation();
                        _this2._huiComponent.show();
                    };
                    this._listeners.componentUpgraded = componentUpgraded.bind(this);
                    this._huiComponent.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                }

                // Event handler for next
                var onNext = function onNext(event) {
                    if (_this2.props.onNext) {
                        _this2.props.onNext(event);
                    }
                };
                this._listeners.onNext = onNext.bind(this);
                this._huiComponent.addEventListener("next", this._listeners.onNext);

                // Event handler for previous
                var onPrevious = function onPrevious(event) {
                    if (_this2.props.onPrevious) {
                        _this2.props.onPrevious(event);
                    }
                };
                this._listeners.onPrevious = onPrevious.bind(this);
                this._huiComponent.addEventListener("previous", this._listeners.onPrevious);

                // Event handler for done
                var onDone = function onDone(event) {
                    if (_this2.props.onDone) {
                        _this2.props.onDone(event);
                    }
                };
                this._listeners.onDone = onDone.bind(this);
                this._huiComponent.addEventListener("done", this._listeners.onDone);

                // Event handler for show
                var onShow = function onShow(event) {
                    if (_this2.props.onShow) {
                        _this2.props.onShow(event);
                    }
                };
                this._listeners.onShow = onShow.bind(this);
                this._huiComponent.addEventListener("show", this._listeners.onShow);

                // Event handler for close
                var onClose = function onClose(event) {
                    if (_this2.props.onClose) {
                        _this2.props.onClose(event);
                    }
                };
                this._listeners.onClose = onClose.bind(this);
                this._huiComponent.addEventListener("close", this._listeners.onClose);

                // Event handler for before-step
                var onBeforeStep = function onBeforeStep(event) {
                    if (_this2.props.onBeforeStep) {
                        _this2.props.onBeforeStep(event);
                    }
                };
                this._listeners.onBeforeStep = onBeforeStep.bind(this);
                this._huiComponent.addEventListener("before-step", this._listeners.onBeforeStep);

                // Event handler for after-step
                var onAfterStep = function onAfterStep(event) {
                    if (_this2.props.onAfterStep) {
                        _this2.props.onAfterStep(event);
                    }
                };
                this._listeners.onAfterStep = onAfterStep.bind(this);
                this._huiComponent.addEventListener("after-step", this._listeners.onAfterStep);

                // Event handler for start-spinner
                var onStartSpinner = function onStartSpinner(event) {
                    if (_this2.props.onStartSpinner) {
                        _this2.props.onStartSpinner(event);
                    }
                };
                this._listeners.onStartSpinner = onStartSpinner.bind(this);
                this._huiComponent.addEventListener("start-spinner", this._listeners.onStartSpinner);

                // Event handler for stop-spinner
                var onStopSpinner = function onStopSpinner(event) {
                    if (_this2.props.onStopSpinner) {
                        _this2.props.onStopSpinner(event);
                    }
                };
                this._listeners.onStopSpinner = onStopSpinner.bind(this);
                this._huiComponent.addEventListener("stop-spinner", this._listeners.onStopSpinner);
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                if (this.props.show !== prevProps.show) {
                    if (this.props.show) {
                        this._huiComponent.show();
                    } else {
                        this._huiComponent.close();
                    }
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("next", this._listeners.onNext, false);
                this._huiComponent.removeEventListener("previous", this._listeners.onPrevious, false);
                this._huiComponent.removeEventListener("done", this._listeners.onDone, false);
                this._huiComponent.removeEventListener("show", this._listeners.onShow, false);
                this._huiComponent.removeEventListener("close", this._listeners.onClose, false);
                this._huiComponent.removeEventListener("before-step", this._listeners.onBeforeStep, false);
                this._huiComponent.removeEventListener("after-step", this._listeners.onAfterStep, false);
                this._huiComponent.removeEventListener("start-spinner", this._listeners.onStartSpinner, false);
                this._huiComponent.removeEventListener("stop-spinner", this._listeners.onStopSpinner, false);
                this._huiComponent.removeEventListener("component-upgraded", this._listeners.componentUpgraded, false);
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-step-flow",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HAStepFlow;
    }(_react2.default.Component);

    HAStepFlow.propTypes = {
        children: function anonymous(props, propName, componentName) {
            var prop = props[propName];
            var types = ['HAFlowStep', 'HAFlowLanding', 'HAFlowConfirmation'];
            if (!props.allowAllChildren) {
                for (var child in prop) {
                    // Only accept a single child, of the appropriate type
                    if (types.indexOf(prop[child].type.name) === -1) {
                        return new Error(componentName + '\'s children can only be the following types: ' + types.join(', '));
                    }
                }
            }
        },
        className: _react2.default.PropTypes.string,
        id: _react2.default.PropTypes.string,
        show: _react2.default.PropTypes.bool,
        currentStep: _react2.default.PropTypes.number,
        flow: _react2.default.PropTypes.string,
        progressIndicator: _react2.default.PropTypes.bool,
        startIndex: _react2.default.PropTypes.number,
        nextButtonText: _react2.default.PropTypes.string,
        previousButtonText: _react2.default.PropTypes.string,
        doneButtonText: _react2.default.PropTypes.string,
        landing: _react2.default.PropTypes.object,
        steps: _react2.default.PropTypes.array,
        confirmation: _react2.default.PropTypes.object,
        disableAutoComplete: _react2.default.PropTypes.bool,
        enableAnimateIn: _react2.default.PropTypes.bool,
        closeParentTrowser: _react2.default.PropTypes.bool,
        onNext: _react2.default.PropTypes.func,
        onPrevious: _react2.default.PropTypes.func,
        onDone: _react2.default.PropTypes.func,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func,
        onBeforeStep: _react2.default.PropTypes.func,
        onAfterStep: _react2.default.PropTypes.func,
        onStartSpinner: _react2.default.PropTypes.func,
        onStopSpinner: _react2.default.PropTypes.func,
        allowAllChildren: _react2.default.PropTypes.bool
    };

    var _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.handleRef = function (c) {
            _this3._huiComponent = c;
        };
    };

    exports.default = HAStepFlow;
});
//# sourceMappingURL=HAStepFlow.js.map
