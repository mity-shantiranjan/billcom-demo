var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/core/utils"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/core/utils"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.utils);
        global.HAZeroState = mod.exports;
    }
})(this, function (exports, _react, _utils) {
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

    var HAZeroState = function (_React$Component) {
        _inherits(HAZeroState, _React$Component);

        function HAZeroState() {
            _classCallCheck(this, HAZeroState);

            return _possibleConstructorReturn(this, (HAZeroState.__proto__ || Object.getPrototypeOf(HAZeroState)).apply(this, arguments));
        }

        _createClass(HAZeroState, [{
            key: "componentWillMount",
            value: function componentWillMount() {
                if (this.props.simulateViewport) {
                    var viewports = document.getElementsByName("viewport");

                    if (viewports && viewports.length > 0) {
                        viewports[0].content = "width=device-width, initial-scale=1";
                    }
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                if (this.props.simulateViewport) {
                    var viewports = document.getElementsByName("viewport");

                    if (viewports && viewports.length > 0) {
                        viewports[0].content = "";
                    }
                }
            }
        }, {
            key: "renderFooter",
            value: function renderFooter(HAFooter) {
                return _react2.default.createElement(
                    "div",
                    { className: "footer zero-state-footer" },
                    HAFooter
                );
            }
        }, {
            key: "render",
            value: function render() {

                var button = undefined,
                    HAHeader = undefined,
                    HASection = undefined,
                    HAFooter = undefined,
                    h3 = undefined,
                    typeName = undefined;

                if (this.props.buttonText) {
                    button = _react2.default.createElement(
                        "button",
                        { className: "ha-button-primary ha-button", onClick: this.props.onButtonClick },
                        this.props.buttonText
                    );
                }

                if (this.props.subTitleText) {
                    h3 = _react2.default.createElement(
                        "h3",
                        { className: "sub-title" },
                        this.props.subTitleText
                    );
                }

                if (this.props.children) {
                    _react2.default.Children.forEach(this.props.children, function (child) {
                        if (!_react2.default.isValidElement(child)) {
                            return;
                        }
                        typeName = (0, _utils.getReactTypeName)(child);
                        if (typeName === "HAHeader") {
                            HAHeader = child;
                        }
                        if (typeName === "HASection") {
                            HASection = child;
                        }
                        if (typeName === "HAFooter") {
                            HAFooter = child;
                        }
                    });
                }

                return _react2.default.createElement(
                    "div",
                    { className: "ha-zero-state-container" },
                    _react2.default.createElement(
                        "div",
                        { className: "image-container zero-state-header" },
                        HAHeader
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "zero-state-content" },
                        _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "h1",
                                { className: "main-title" },
                                this.props.titleText
                            ),
                            h3
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            HASection
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            button
                        )
                    ),
                    HAFooter && this.renderFooter(HAFooter)
                );
            }
        }]);

        return HAZeroState;
    }(_react2.default.Component);

    HAZeroState.propTypes = {
        titleText: _react2.default.PropTypes.string,
        subTitleText: _react2.default.PropTypes.string,
        buttonText: _react2.default.PropTypes.string,
        onButtonClick: _react2.default.PropTypes.func,
        simulateViewport: _react2.default.PropTypes.bool,
        children: function children(props, propName, componentName) {
            var prop = props[propName] || [],
                types = ["HASection", "HAHeader", "HAFooter"],
                typeName = undefined;

            prop = Array.isArray(prop) ? prop : [prop];
            for (var child in prop) {
                if (prop[child] && prop[child].type) {
                    typeName = (0, _utils.getReactTypeName)(prop[child]);
                    // Only accept a single child, of the appropriate type
                    if (types.indexOf(typeName) === -1) {
                        return new Error(componentName + "'s children can only have one instance of the following types: " + types.join(", "));
                    } else {
                        types[types.indexOf(typeName)] = "";
                    }
                }
            }
        }
    };
    exports.default = HAZeroState;
});
//# sourceMappingURL=HAZeroState.js.map
