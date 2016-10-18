var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/react-components/HASelect", "hui/react-components/HAItem"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/react-components/HASelect"), require("hui/react-components/HAItem"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HASelect, global.HAItem);
        global.ExampleChooser = mod.exports;
    }
})(this, function (exports, _react, _HASelect, _HAItem) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HASelect2 = _interopRequireDefault(_HASelect);

    var _HAItem2 = _interopRequireDefault(_HAItem);

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

    var ExampleChooser = function (_React$Component) {
        _inherits(ExampleChooser, _React$Component);

        function ExampleChooser() {
            _classCallCheck(this, ExampleChooser);

            return _possibleConstructorReturn(this, (ExampleChooser.__proto__ || Object.getPrototypeOf(ExampleChooser)).apply(this, arguments));
        }

        _createClass(ExampleChooser, [{
            key: "switchExample",
            value: function switchExample(evt) {
                var value = evt.target.selectedItem.value;

                this.props.switchExample(value);
            }
        }, {
            key: "getItems",
            value: function getItems() {
                var _this2 = this;

                var example = undefined;
                var items = [];

                Object.keys(this.props.examples).forEach(function (key) {
                    example = _this2.props.examples[key];

                    items.push(_react2.default.createElement(
                        _HAItem2.default,
                        { key: key, value: key },
                        example.name
                    ));
                });

                return items;
            }
        }, {
            key: "render",
            value: function render() {
                var onChange = this.switchExample.bind(this),
                    items = this.getItems();

                return _react2.default.createElement(
                    _HASelect2.default,
                    { label: "Example", onChange: onChange, value: this.props.value },
                    items
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "ExampleChooser";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    value: _react2.default.PropTypes.string.isRequired,
                    examples: _react2.default.PropTypes.object.isRequired,
                    switchExample: _react2.default.PropTypes.func.isRequired
                };
            }
        }]);

        return ExampleChooser;
    }(_react2.default.Component);

    exports.default = ExampleChooser;
});
//# sourceMappingURL=ExampleChooser.react.js.map
