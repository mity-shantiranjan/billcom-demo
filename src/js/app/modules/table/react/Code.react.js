var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "highlightjs"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("highlightjs"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.highlightjs);
        global.Code = mod.exports;
    }
})(this, function (exports, _react, _highlightjs) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _highlightjs2 = _interopRequireDefault(_highlightjs);

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

    var Code = function (_React$Component) {
        _inherits(Code, _React$Component);

        function Code() {
            _classCallCheck(this, Code);

            return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
        }

        _createClass(Code, [{
            key: "rawHighlighting",
            value: function rawHighlighting() {
                var content = this.props.children.toString(),
                    highlight = _highlightjs2.default.highlight("javascript", content, true);

                return { __html: highlight.value };
            }
        }, {
            key: "render",
            value: function render() {
                var style = {
                    background: "none",
                    border: "none"
                };

                /*eslint-disable react/no-danger */

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "pre",
                        null,
                        _react2.default.createElement(
                            "code",
                            null,
                            _react2.default.createElement("pre", { className: "javascript", style: style, dangerouslySetInnerHTML: this.rawHighlighting() })
                        )
                    )
                );

                /*eslint-enable react/no-danger */
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "Code";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    children: _react2.default.PropTypes.string.isRequired
                };
            }
        }]);

        return Code;
    }(_react2.default.Component);

    exports.default = Code;
});
//# sourceMappingURL=Code.react.js.map
