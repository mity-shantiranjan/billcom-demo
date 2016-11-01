var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/tab"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/tab"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.tab);
        global.HATab = mod.exports;
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

    var HATab = function (_React$Component) {
        _inherits(HATab, _React$Component);

        function HATab(props) {
            _classCallCheck(this, HATab);

            var _this = _possibleConstructorReturn(this, (HATab.__proto__ || Object.getPrototypeOf(HATab)).call(this, props));

            _this.handleRef = function (c) {
                _this._huiComponent = c;
            };

            _this._huiComponent = null;
            return _this;
        }

        _createClass(HATab, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // force web component pick up childNode one more time.
                this._huiComponent.postRender();
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-tab",
                    _extends({ ref: this.handleRef }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HATab;
    }(_react2.default.Component);

    HATab.propTypes = {
        className: _react2.default.PropTypes.string,
        titleText: _react2.default.PropTypes.string,
        icon: _react2.default.PropTypes.string,
        section: _react2.default.PropTypes.array,
        badgeClass: _react2.default.PropTypes.string,
        badgeText: _react2.default.PropTypes.string
    };
    exports.default = HATab;
});
//# sourceMappingURL=HATab.js.map
