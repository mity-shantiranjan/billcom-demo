var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HADrawerLarge', 'hui/react-components/HAFooter', 'hui/react-components/HASection', 'hui/react-components/HAAside', 'hui/react-components/HATextField', 'hui/react-components/HATextarea', '../LargeExample.react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HADrawerLarge'), require('hui/react-components/HAFooter'), require('hui/react-components/HASection'), require('hui/react-components/HAAside'), require('hui/react-components/HATextField'), require('hui/react-components/HATextarea'), require('../LargeExample.react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HADrawerLarge, global.HAFooter, global.HASection, global.HAAside, global.HATextField, global.HATextarea, global.LargeExample);
        global.DrawerExample = mod.exports;
    }
})(this, function (exports, _react, _HADrawerLarge, _HAFooter, _HASection, _HAAside, _HATextField, _HATextarea, _LargeExample) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HADrawerLarge2 = _interopRequireDefault(_HADrawerLarge);

    var _HAFooter2 = _interopRequireDefault(_HAFooter);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HAAside2 = _interopRequireDefault(_HAAside);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _HATextarea2 = _interopRequireDefault(_HATextarea);

    var _LargeExample2 = _interopRequireDefault(_LargeExample);

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

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var DrawerExample = function (_React$Component) {
        _inherits(DrawerExample, _React$Component);

        function DrawerExample(props) {
            _classCallCheck(this, DrawerExample);

            var _this = _possibleConstructorReturn(this, (DrawerExample.__proto__ || Object.getPrototypeOf(DrawerExample)).call(this, props));

            _this._toggleDrawerLarge = function () {
                _this.setState({ showDrawerBackdrop: !_this.state.showDrawerBackdrop });
            };

            _this._toggleDrawerLargeWithoutBackdrop = function () {
                _this.setState({ showDrawerWithoutBackdrop: !_this.state.showDrawerWithoutBackdrop });
            };

            _this._toggleDrawerLargeExample = function () {
                _this.setState({ showDrawerBackdropLarge: !_this.state.showDrawerBackdropLarge });
            };

            _this.onToggleDrawerRenderSecond = function () {
                _this.setState({ changeFieldSecond: !_this.state.changeFieldSecond });
            };

            _this.onToggleDrawerRenderFirst = function () {
                _this.setState({ changeFieldFirst: !_this.state.changeFieldFirst });
            };

            _this.state = {
                showDrawerBackdrop: false,
                showDrawerWithoutBackdrop: false,
                showDrawerBackdropLarge: false,
                changeFieldSecond: true,
                changeFieldFirst: true
            };
            return _this;
        }

        _createClass(DrawerExample, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _HADrawerLarge2.default,
                        {
                            show: this.state.showDrawerBackdrop,
                            backdrop: true,
                            titleText: 'I AM A DRAWER TITLE!!!!!',
                            onShow: function onShow() {
                                return console.log("showing drawer");
                            },
                            onClose: function onClose() {
                                return console.log("closing drawer");
                            },
                            onDismiss: function onDismiss() {
                                console.log("dismissing drawer");
                                _this2._toggleDrawerLarge();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            this.state.changeFieldFirst == true ? _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name' }) : _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name toggled' }),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.onToggleDrawerRenderFirst },
                                'ToggleRender2'
                            ),
                            this.state.changeFieldSecond == true ? _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name' }) : _react2.default.createElement(_HATextarea2.default, { label: 'Name', placeholder: 'Your Name' }),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.onToggleDrawerRenderSecond },
                                'ToggleRender2'
                            )
                        ),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button ha-button-primary', onClick: this._toggleDrawerLarge },
                                'Close'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _HADrawerLarge2.default,
                        {
                            show: this.state.showDrawerWithoutBackdrop,
                            backdrop: false,
                            titleText: 'I AM A DRAWER TITLE!!!!!',
                            onShow: function onShow() {
                                return console.log("showing drawer");
                            },
                            onClose: function onClose() {
                                return console.log("closing drawer");
                            },
                            onDismiss: function onDismiss() {
                                console.log("dismissing drawer");
                                _this2._toggleDrawerLargeWithoutBackdrop();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            this.state.changeFieldFirst == true ? _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name' }) : _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name toggled' }),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.onToggleDrawerRenderFirst },
                                'ToggleRender2'
                            ),
                            this.state.changeFieldSecond == true ? _react2.default.createElement(_HATextField2.default, {
                                label: 'If Condition',
                                placeholder: 'Your name' }) : _react2.default.createElement(_HATextarea2.default, { label: 'Name', placeholder: 'Your Name' }),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.onToggleDrawerRenderSecond },
                                'ToggleRender2'
                            )
                        ),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button ha-button-primary', onClick: this._toggleDrawerLargeWithoutBackdrop },
                                'Close'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _HADrawerLarge2.default,
                        {
                            show: this.state.showDrawerBackdropLarge,
                            backdrop: true,
                            titleText: 'I AM A DRAWER TITLE!!!!!',
                            onShow: function onShow() {
                                return console.log("showing drawer");
                            },
                            onClose: function onClose() {
                                return console.log("closing drawer");
                            },
                            onDismiss: function onDismiss() {
                                console.log("dismissing drawer");
                                _this2._toggleDrawerLargeExample();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            _react2.default.createElement(_LargeExample2.default, { drawerExample: true })
                        ),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button ha-button-primary', onClick: this._toggleDrawerLargeExample },
                                'Close'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button', onClick: this._toggleDrawerLargeExample },
                        'Show Drawer Large Examples'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button', onClick: this._toggleDrawerLarge },
                        'Show Drawer Large'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button', onClick: this._toggleDrawerLargeWithoutBackdrop },
                        'Show Drawer Large Without Overlay'
                    )
                );
            }
        }]);

        return DrawerExample;
    }(_react2.default.Component);

    exports.default = DrawerExample;
});
//# sourceMappingURL=DrawerExample.react.js.map
