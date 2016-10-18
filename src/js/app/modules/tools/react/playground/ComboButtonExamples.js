var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/react-components/HAItem", "hui/react-components/HAComboButton", "hui/react-components/HAComboLink", "hui/react-components/HAMenuButton", "hui/react-components/HASelect"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/react-components/HAItem"), require("hui/react-components/HAComboButton"), require("hui/react-components/HAComboLink"), require("hui/react-components/HAMenuButton"), require("hui/react-components/HASelect"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HAItem, global.HAComboButton, global.HAComboLink, global.HAMenuButton, global.HASelect);
        global.ComboButtonExamples = mod.exports;
    }
})(this, function (exports, _react, _HAItem, _HAComboButton, _HAComboLink, _HAMenuButton, _HASelect) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAComboButton2 = _interopRequireDefault(_HAComboButton);

    var _HAComboLink2 = _interopRequireDefault(_HAComboLink);

    var _HAMenuButton2 = _interopRequireDefault(_HAMenuButton);

    var _HASelect2 = _interopRequireDefault(_HASelect);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var ComboButtonExamples = function (_React$Component) {
        _inherits(ComboButtonExamples, _React$Component);

        _createClass(ComboButtonExamples, null, [{
            key: "displayName",
            get: function get() {
                return "ComboButtonExamples";
            }
        }]);

        function ComboButtonExamples(props) {
            _classCallCheck(this, ComboButtonExamples);

            var _this = _possibleConstructorReturn(this, (ComboButtonExamples.__proto__ || Object.getPrototypeOf(ComboButtonExamples)).call(this, props));

            _this.state = {
                showFruits: true
            };

            _this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
            _this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
            return _this;
        }

        _createClass(ComboButtonExamples, [{
            key: "_onToggleCallback",
            value: function _onToggleCallback() {
                this.setState({
                    showFruits: !this.state.showFruits
                });
            }
        }, {
            key: "render",
            value: function render() {
                var eventLog = undefined,
                    onToggleCallback = undefined,
                    items = undefined,
                    rows = undefined;

                eventLog = function eventLog(e) {
                    console.log(e.target.tagName + " " + e.type + " fired");
                };

                onToggleCallback = this._onToggleCallback.bind(this);
                items = this.state.showFruits ? this._fruits : this._vegetables;

                rows = items.map(function (item, i) {
                    var itemValue = item + "Value";
                    return _react2.default.createElement(
                        _HAItem2.default,
                        { value: itemValue },
                        item
                    );
                });

                return _react2.default.createElement(
                    "div",
                    { className: "row bottom-separator" },
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-12" },
                        _react2.default.createElement(
                            "h2",
                            null,
                            "HAComboButton data updates don't work"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-8" },
                        _react2.default.createElement(
                            _HAComboButton2.default,
                            { placeholder: "Choose a method", label: "Create New", className: "ha-button-primary", onClick: eventLog, onSelect: eventLog, onItemsShow: eventLog, onItemsClose: eventLog },
                            rows
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-8" },
                        _react2.default.createElement(
                            _HAComboLink2.default,
                            { placeholder: "Choose a method", label: "Create New", onClick: eventLog, onSelect: eventLog, onItemsShow: eventLog, onItemsClose: eventLog },
                            rows
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-8" },
                        _react2.default.createElement(
                            _HAMenuButton2.default,
                            { placeholder: "Choose a method", label: "Create New", className: "ha-button-primary", onClick: eventLog, onSelect: eventLog, onItemsShow: eventLog, onItemsClose: eventLog },
                            rows
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-8" },
                        _react2.default.createElement(
                            _HASelect2.default,
                            { placeholder: "Choose a method", label: "Create New", className: "ha-button-primary", onClick: eventLog, onSelect: eventLog, onItemsShow: eventLog, onItemsClose: eventLog },
                            rows
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-4" },
                        _react2.default.createElement(
                            "div",
                            { className: "widget" },
                            _react2.default.createElement(
                                "button",
                                { className: "ha-button ha-button-primary", onClick: onToggleCallback },
                                "Toggle Fruit & Vegetables"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-12 expectation" },
                        "The content of the dropdown should change from fruits to vegetables.",
                        _react2.default.createElement("br", null)
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-12 issues" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            "Issues"
                        ),
                        "ha-item labels are being set on render and on updates they dont sync with the changes",
                        _react2.default.createElement("br", null),
                        "pop over menu that shows the items are not getting updates when the items get updated",
                        _react2.default.createElement("br", null),
                        "When using React Select, in HAItem always specify the label attribute"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "col-lg-12 issues" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            "Applies to"
                        ),
                        "Combo Button",
                        _react2.default.createElement("br", null),
                        "Combo Link",
                        _react2.default.createElement("br", null),
                        "Select ",
                        _react2.default.createElement("br", null),
                        "SelectTypeAhead ",
                        _react2.default.createElement("br", null),
                        _react2.default.createElement("br", null)
                    )
                );
            }
        }]);

        return ComboButtonExamples;
    }(_react2.default.Component);

    exports.default = ComboButtonExamples;
});
//# sourceMappingURL=ComboButtonExamples.js.map
