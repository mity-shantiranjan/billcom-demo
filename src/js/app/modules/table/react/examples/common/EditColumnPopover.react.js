var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.EditColumnPopover = mod.exports;
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

    var EditColumnPopover = function (_React$Component) {
        _inherits(EditColumnPopover, _React$Component);

        function EditColumnPopover() {
            _classCallCheck(this, EditColumnPopover);

            return _possibleConstructorReturn(this, (EditColumnPopover.__proto__ || Object.getPrototypeOf(EditColumnPopover)).apply(this, arguments));
        }

        _createClass(EditColumnPopover, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // Namespace for API methods to expose on this instance.
                //   @see https://facebook.github.io/react/tips/expose-component-functions.html
                this.api = this.exposeApi();
            }
        }, {
            key: "exposeApi",
            value: function exposeApi() {
                var apiToExpose = ["show", "close"],
                    that = this,
                    api = {};

                apiToExpose.forEach(function (key) {
                    api[key] = function () {
                        // Proxy the call on this component to the API method on the underlying instance
                        return that.popover[key].apply(that.popover, arguments); //eslint-disable-line prefer-spread
                    };
                });

                return api;
            }
        }, {
            key: "handleWrapperRef",
            value: function handleWrapperRef(popover) {
                this.popover = popover;
            }
        }, {
            key: "handleClick",
            value: function handleClick(event) {
                var name = event.target.value;
                this.props.onSelect(name);
            }
        }, {
            key: "render",
            value: function render() {
                var handleRef = this.handleWrapperRef.bind(this),
                    handleClk = this.handleClick.bind(this);

                return _react2.default.createElement(
                    "ha-popover",
                    { ref: handleRef, targetSelector: this.props.targetSelector },
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "ha-menu-item",
                            { value: "first", onClick: handleClk },
                            "First Name"
                        ),
                        _react2.default.createElement(
                            "ha-menu-item",
                            { value: "last", onClick: handleClk },
                            "Last Name"
                        )
                    )
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "EditColumnPopover";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    onSelect: _react2.default.PropTypes.func.isRequired,
                    targetSelector: _react2.default.PropTypes.string.isRequired
                };
            }
        }]);

        return EditColumnPopover;
    }(_react2.default.Component);

    exports.default = EditColumnPopover;
});
//# sourceMappingURL=EditColumnPopover.react.js.map
