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
        global.BattingAverage = mod.exports;
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

    var BattingAverage = function (_React$Component) {
        _inherits(BattingAverage, _React$Component);

        function BattingAverage() {
            _classCallCheck(this, BattingAverage);

            return _possibleConstructorReturn(this, (BattingAverage.__proto__ || Object.getPrototypeOf(BattingAverage)).apply(this, arguments));
        }

        _createClass(BattingAverage, [{
            key: "render",
            value: function render() {
                var avg = Math.floor(1000 * this.props.rowData.totalH / this.props.rowData.totalAB);

                return _react2.default.createElement(
                    "div",
                    { className: "avg" },
                    ".",
                    avg,
                    " ",
                    _react2.default.createElement(
                        "a",
                        { href: "https://en.wikipedia.org/wiki/Batting_average", target: "_blank" },
                        _react2.default.createElement("i", { className: "hi page small hi-help" })
                    )
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "BattingAverage";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    rowData: _react2.default.PropTypes.object.isRequired,
                    options: _react2.default.PropTypes.any.isRequired,
                    column: _react2.default.PropTypes.string.isRequired,
                    value: _react2.default.PropTypes.any
                };
            }
        }]);

        return BattingAverage;
    }(_react2.default.Component);

    exports.default = BattingAverage;
});
//# sourceMappingURL=BattingAverage.react.js.map
