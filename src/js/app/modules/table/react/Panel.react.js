var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./Code"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./Code"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Code);
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _Code) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Code2 = _interopRequireDefault(_Code);

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

    var Panel = function (_React$Component) {
        _inherits(Panel, _React$Component);

        function Panel() {
            _classCallCheck(this, Panel);

            return _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
        }

        _createClass(Panel, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    "div",
                    { className: "panel" },
                    _react2.default.createElement(
                        "section",
                        { className: "usage" },
                        _react2.default.createElement(
                            "header",
                            { className: "title" },
                            _react2.default.createElement(
                                "a",
                                null,
                                "Usage"
                            ),
                            _react2.default.createElement(
                                "a",
                                { href: this.props.gitUrl, target: "_blank", className: "gitUrl" },
                                _react2.default.createElement("i", { className: "hi page large hi-new-window", title: "Open on GitHub" })
                            )
                        ),
                        _react2.default.createElement(
                            _Code2.default,
                            null,
                            this.props.code
                        )
                    ),
                    _react2.default.createElement(
                        "section",
                        { className: "examples" },
                        _react2.default.createElement(
                            "header",
                            { className: "title" },
                            _react2.default.createElement(
                                "a",
                                null,
                                "Examples"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            this.props.component
                        )
                    )
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "Panel";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    code: _react2.default.PropTypes.string.isRequired,
                    gitUrl: _react2.default.PropTypes.string.isRequired,
                    component: _react2.default.PropTypes.element.isRequired
                };
            }
        }]);

        return Panel;
    }(_react2.default.Component);

    exports.default = Panel;
});
//# sourceMappingURL=Panel.react.js.map
