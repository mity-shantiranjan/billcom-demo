var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/stacked-page-messages"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/stacked-page-messages"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.stackedPageMessages);
        global.HAStackedPageMessages = mod.exports;
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

    var HAStackedPageMessages = function (_React$Component) {
        _inherits(HAStackedPageMessages, _React$Component);

        function HAStackedPageMessages(props) {
            _classCallCheck(this, HAStackedPageMessages);

            var _this = _possibleConstructorReturn(this, (HAStackedPageMessages.__proto__ || Object.getPrototypeOf(HAStackedPageMessages)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            _this._listeners = {};
            return _this;
        }

        _createClass(HAStackedPageMessages, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // With es6 syntax we have to bind the events to the react component instance
                // https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
                // Event handler for close
                var onClose = function onClose(event) {
                    event.stopPropagation();
                    if (_this2.props.onClose) {
                        _this2.props.onClose(event);
                    }
                };
                this._listeners.onClose = onClose.bind(this);
                this._huiComponent.addEventListener("close", this._listeners.onClose);

                // Event handler for show
                var onShow = function onShow(event) {
                    event.stopPropagation();
                    if (_this2.props.onShow) {
                        _this2.props.onShow(event);
                    }
                };
                this._listeners.onShow = onShow.bind(this);
                this._huiComponent.addEventListener("show", this._listeners.onShow);

                var haMessages = Array.prototype.slice.call(this._huiComponent.querySelectorAll("ha-page-message"));
                this._huiComponent.messages = haMessages;
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("close", this._listeners.onClose, false);
                this._huiComponent.removeEventListener("show", this._listeners.onShow, false);
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-stacked-page-messages",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HAStackedPageMessages;
    }(_react2.default.Component);

    HAStackedPageMessages.propTypes = {
        className: _react2.default.PropTypes.string,
        onClose: _react2.default.PropTypes.func,
        onShow: _react2.default.PropTypes.func
    };
    exports.default = HAStackedPageMessages;
});
//# sourceMappingURL=HAStackedPageMessages.js.map
