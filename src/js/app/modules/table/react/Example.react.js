var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./Panel"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./Panel"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Panel);
        global.Example = mod.exports;
    }
})(this, function (exports, _react, _Panel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Panel2 = _interopRequireDefault(_Panel);

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

    var Example = function (_React$Component) {
        _inherits(Example, _React$Component);

        function Example() {
            _classCallCheck(this, Example);

            return _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).apply(this, arguments));
        }

        _createClass(Example, [{
            key: "getCode",
            value: function getCode() {
                return "";
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                return null;
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(_Panel2.default, { code: this.getCode(), component: this.getComponent(), gitUrl: this.props.gitUrl });
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "Example";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    gitUrl: _react2.default.PropTypes.string.isRequired
                };
            }
        }]);

        return Example;
    }(_react2.default.Component);

    exports.default = Example;
});
//# sourceMappingURL=Example.react.js.map
