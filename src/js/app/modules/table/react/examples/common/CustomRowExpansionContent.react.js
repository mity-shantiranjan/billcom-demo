var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/react-components/HATextField", "hui/react-components/HALabel"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/react-components/HATextField"), require("hui/react-components/HALabel"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HATextField, global.HALabel);
        global.CustomRowExpansionContent = mod.exports;
    }
})(this, function (exports, _react, _HATextField, _HALabel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _HALabel2 = _interopRequireDefault(_HALabel);

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

    var CustomRowExpansionContent = function (_React$Component) {
        _inherits(CustomRowExpansionContent, _React$Component);

        function CustomRowExpansionContent() {
            _classCallCheck(this, CustomRowExpansionContent);

            return _possibleConstructorReturn(this, (CustomRowExpansionContent.__proto__ || Object.getPrototypeOf(CustomRowExpansionContent)).apply(this, arguments));
        }

        _createClass(CustomRowExpansionContent, [{
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_HATextField2.default, { label: "First Name", value: this.props.object.first })
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            _HALabel2.default,
                            null,
                            "Last Name:",
                            this.props.object.last
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            _HALabel2.default,
                            null,
                            "Height:",
                            this.props.object.height
                        )
                    )
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "CustomRowExpansionContent";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    object: _react2.default.PropTypes.object.isRequired, //data object of the row
                    hideExpansion: _react2.default.PropTypes.func //callback for hiding the expansion
                };
            }
        }]);

        return CustomRowExpansionContent;
    }(_react2.default.Component);

    exports.default = CustomRowExpansionContent;
});
//# sourceMappingURL=CustomRowExpansionContent.react.js.map
