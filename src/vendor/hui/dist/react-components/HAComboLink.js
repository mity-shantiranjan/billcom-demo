var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/combo-link"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/combo-link"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.comboLink);
        global.HAComboLink = mod.exports;
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

    var HAComboLink = function (_React$Component) {
        _inherits(HAComboLink, _React$Component);

        function HAComboLink(props) {
            _classCallCheck(this, HAComboLink);

            var _this = _possibleConstructorReturn(this, (HAComboLink.__proto__ || Object.getPrototypeOf(HAComboLink)).call(this, props));

            _initialiseProps.call(_this);

            _this._huiComponent = null;
            _this._listeners = {};
            return _this;
        }

        _createClass(HAComboLink, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                // With es6 syntax we have to bind the events to the react component instance
                // https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
                // Event handler for click
                var onClick = function onClick(event) {
                    event.stopPropagation();
                    if (_this2.props.onClick) {
                        _this2.props.onClick(event);
                    }
                };
                this._listeners.onClick = onClick.bind(this);
                this._huiComponent.addEventListener("click", this._listeners.onClick);

                // Event handler for items-close
                var onItemsClose = function onItemsClose(event) {
                    event.stopPropagation();
                    if (_this2.props.onItemsClose) {
                        _this2.props.onItemsClose(event);
                    }
                };
                this._listeners.onItemsClose = onItemsClose.bind(this);
                this._huiComponent.addEventListener("items-close", this._listeners.onItemsClose);

                // Event handler for items-show
                var onItemsShow = function onItemsShow(event) {
                    event.stopPropagation();
                    if (_this2.props.onItemsShow) {
                        _this2.props.onItemsShow(event);
                    }
                };
                this._listeners.onItemsShow = onItemsShow.bind(this);
                this._huiComponent.addEventListener("items-show", this._listeners.onItemsShow);

                // Event handler for select
                var onSelect = function onSelect(event) {
                    event.stopPropagation();
                    if (_this2.props.onSelect) {
                        _this2.props.onSelect(event);
                    }
                };
                this._listeners.onSelect = onSelect.bind(this);
                this._huiComponent.addEventListener("select", this._listeners.onSelect);
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener("click", this._listeners.onClick, false);
                this._huiComponent.removeEventListener("items-close", this._listeners.onItemsClose, false);
                this._huiComponent.removeEventListener("items-show", this._listeners.onItemsShow, false);
                this._huiComponent.removeEventListener("select", this._listeners.onSelect, false);
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-combo-link",
                    _extends({
                        ref: this.handleRef,
                        "class": this.props.className
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HAComboLink;
    }(_react2.default.Component);

    HAComboLink.propTypes = {
        children: function anonymous(props, propName, componentName) {

            var prop = props[propName];
            var types = ['HAItem'];
            for (var child in prop) {
                // Only accept a single child, of the appropriate type
                if (types.indexOf(prop[child].type.name) === -1) {
                    return new Error(componentName + '\'s children can only be the following types: ' + types.join(', '));
                }
            }
        },
        className: _react2.default.PropTypes.string,
        label: _react2.default.PropTypes.string,
        disabled: _react2.default.PropTypes.bool,
        selectedIndex: _react2.default.PropTypes.number,
        selectedItem: _react2.default.PropTypes.object,
        items: _react2.default.PropTypes.array,
        onClick: _react2.default.PropTypes.func,
        onItemsClose: _react2.default.PropTypes.func,
        onItemsShow: _react2.default.PropTypes.func,
        onSelect: _react2.default.PropTypes.func
    };

    var _initialiseProps = function _initialiseProps() {
        var _this3 = this;

        this.handleRef = function (c) {
            _this3._huiComponent = c;
        };
    };

    exports.default = HAComboLink;
});
//# sourceMappingURL=HAComboLink.js.map
