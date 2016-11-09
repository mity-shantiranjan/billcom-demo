var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/date-picker"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/date-picker"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.datePicker);
        global.HADatePicker = mod.exports;
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

    var HADatePicker = function (_React$Component) {
        _inherits(HADatePicker, _React$Component);

        function HADatePicker(props) {
            _classCallCheck(this, HADatePicker);

            var _this = _possibleConstructorReturn(this, (HADatePicker.__proto__ || Object.getPrototypeOf(HADatePicker)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {}; // keep track if we have set any event listeners on date picker
            _this._huiMethodsCalled = []; // keep track of hui methods called so we do not call them again
            return _this;
        }

        _createClass(HADatePicker, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.mountDatePicker();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate() {
                this.mountDatePicker();
            }
        }, {
            key: "mountDatePicker",
            value: function mountDatePicker() {
                var _this2 = this;

                if (this._huiComponent) {

                    this.setupListeners();

                    if (this.props.validator) {
                        this._huiComponent.validator = this.props.validator;
                    }

                    this._testValidity();

                    if (this._huiComponent.showCalendar) {
                        //Check to see if browser supports custom elements. Currently only chrome
                        this.addHUIMethods();
                    } else {
                        // For browsers that don't support custom elements i.e IE, FF
                        var componentUpgraded = function componentUpgraded(event) {
                            event.stopPropagation();
                            _this2.addHUIMethods();
                        };
                        this._listeners.componentUpgraded = componentUpgraded.bind(this);
                        this._huiComponent.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                    }
                }
            }
        }, {
            key: "setupListeners",
            value: function setupListeners() {
                var _this3 = this;

                var onInput = function onInput(event) {
                    event.stopPropagation();
                    if (_this3.props.onInput) {
                        _this3.props.onInput(event);
                    }
                    _this3._testValidity();
                };
                this._listeners.onInput = onInput.bind(this);

                if (this._huiComponent) {
                    this._huiComponent.addEventListener("input", this._listeners.onInput);
                }

                var onChange = function onChange(event) {
                    event.stopPropagation();
                    if (_this3.props.onChange) {
                        _this3.props.onChange(event);
                    }
                };
                this._listeners.onChange = onChange.bind(this);
                if (this._huiComponent) {
                    this._huiComponent.addEventListener("change", this._listeners.onChange);
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("change", this._listeners.onChange, false);
                this._huiComponent.removeEventListener("input", this._listeners.onInput, false);
                this._huiComponent.removeEventListener("component-upgraded", this._listeners.componentUpgraded, false); // clean up component-upgraded listener
                this._listeners = {};
                this._huiMethodsCalled = [];
            }
        }, {
            key: "addHUIMethods",
            value: function addHUIMethods() {
                if (this.props.showCalendar) {
                    this._huiComponent.showCalendar();
                }

                if (this.props.closeCalendar) {
                    this._huiComponent.closeCalendar();
                }

                if (this.props.format) {
                    this._huiComponent.format(new Date(this.props.value), this.props.format);
                }

                if (this.props.showNextMonth) {
                    if (!this._huiMethodsCalled.showNextMonth) {
                        //showNextMonth should be called only once
                        this._huiComponent.showNextMonth();
                        this._huiMethodsCalled.showNextMonth = true;
                    }
                }

                if (this.props.showPreviousMonth) {
                    //showPreviousMonth should be called only once
                    if (!this._huiMethodsCalled.showPreviousMonth) {
                        this._huiComponent.showPreviousMonth();
                        this._huiMethodsCalled.showPreviousMonth = true;
                    }
                }

                if (this.props.preselect) {
                    this._huiComponent.preselect(this.props.preselect);
                }

                if (this.props.postselect) {
                    this._huiComponent.postselect(this.props.postselect);
                }

                if (this.props.alwaysRenderValidity) {
                    this._huiComponent.reportValidity();
                }
            }
        }, {
            key: "_testValidity",
            value: function _testValidity() {
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
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement("ha-date-picker", _extends({
                    ref: this.handleRef,
                    "class": this.props.className
                }, this.props));
                /* jshint ignore:end */
            }
        }]);

        return HADatePicker;
    }(_react2.default.Component);

    HADatePicker.propTypes = {
        className: _react2.default.PropTypes.string,
        id: _react2.default.PropTypes.string,
        disabled: _react2.default.PropTypes.bool,
        label: _react2.default.PropTypes.string,
        labelOptional: _react2.default.PropTypes.string,
        monthLabels: _react2.default.PropTypes.array,
        monthAbbreviations: _react2.default.PropTypes.array,
        dayOfWeekLabels: _react2.default.PropTypes.array,
        showYearNavigation: _react2.default.PropTypes.bool,
        tooltips: _react2.default.PropTypes.object,
        blackoutDates: _react2.default.PropTypes.array,
        notableDates: _react2.default.PropTypes.array,
        useDoubleCalendar: _react2.default.PropTypes.bool,
        navigationAriaDescription: _react2.default.PropTypes.string,
        dateFormatter: _react2.default.PropTypes.func,
        datePattern: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        icon: _react2.default.PropTypes.string,
        maxLength: _react2.default.PropTypes.number,
        minLength: _react2.default.PropTypes.number,
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
        onInput: _react2.default.PropTypes.func,
        onChange: _react2.default.PropTypes.func
    };
    exports.default = HADatePicker;
});
//# sourceMappingURL=HADatePicker.js.map
