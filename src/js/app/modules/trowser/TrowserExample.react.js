var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HATrowser', 'hui/react-components/HATrowserFooter', 'hui/react-components/HAFooterCenter', 'hui/react-components/HAFooterRight', 'hui/react-components/HASection', '../LargeExample.react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HATrowser'), require('hui/react-components/HATrowserFooter'), require('hui/react-components/HAFooterCenter'), require('hui/react-components/HAFooterRight'), require('hui/react-components/HASection'), require('../LargeExample.react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HATrowser, global.HATrowserFooter, global.HAFooterCenter, global.HAFooterRight, global.HASection, global.LargeExample);
        global.TrowserExample = mod.exports;
    }
})(this, function (exports, _react, _HATrowser, _HATrowserFooter, _HAFooterCenter, _HAFooterRight, _HASection, _LargeExample) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HATrowser2 = _interopRequireDefault(_HATrowser);

    var _HATrowserFooter2 = _interopRequireDefault(_HATrowserFooter);

    var _HAFooterCenter2 = _interopRequireDefault(_HAFooterCenter);

    var _HAFooterRight2 = _interopRequireDefault(_HAFooterRight);

    var _HASection2 = _interopRequireDefault(_HASection);

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

    var TrowserExample = function (_React$Component) {
        _inherits(TrowserExample, _React$Component);

        function TrowserExample(props) {
            _classCallCheck(this, TrowserExample);

            var _this = _possibleConstructorReturn(this, (TrowserExample.__proto__ || Object.getPrototypeOf(TrowserExample)).call(this, props));

            _this.state = {
                showTrowser: false,
                showTrowserLargeExample: false,
                sectionContent: Math.random(),
                asideContent: Math.random()
            };
            return _this;
        }

        _createClass(TrowserExample, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _HATrowser2.default,
                        {
                            show: this.state.showTrowser,
                            infoText: 'endflow',
                            titleText: 'I AM A TROWSER TITLE!!!!!',
                            settings: true,
                            help: true,
                            history: true,
                            dismissible: true,
                            autofocus: true,
                            onShow: function onShow() {
                                return console.log('show was fired');
                            },
                            onClose: function onClose() {
                                return console.log('close was fired');
                            },
                            onDismiss: function onDismiss() {
                                console.log('dismiss was fired');
                                _this2._closeTrowser();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                this.state.sectionContent
                            )
                        ),
                        _react2.default.createElement(
                            _HATrowserFooter2.default,
                            null,
                            _react2.default.createElement(
                                _HAFooterCenter2.default,
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                            return _this2._changeContent();
                                        } },
                                    'set all content'
                                )
                            ),
                            _react2.default.createElement(
                                _HAFooterRight2.default,
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                            return _this2._closeTrowser();
                                        } },
                                    'Close'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _HATrowser2.default,
                        {
                            show: this.state.showTrowserLargeExample,
                            infoText: 'endflow',
                            titleText: 'I AM A TROWSER TITLE!!!!!',
                            settings: true,
                            help: true,
                            history: false,
                            dismissible: true,
                            autofocus: true,
                            onShow: function onShow() {
                                return console.log('show was fired');
                            },
                            onClose: function onClose() {
                                return console.log('close was fired');
                            },
                            onDismiss: function onDismiss() {
                                console.log('dismiss was fired');
                                _this2._toggleTrowserLargeExample();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            _react2.default.createElement(_LargeExample2.default, null)
                        ),
                        _react2.default.createElement(
                            _HATrowserFooter2.default,
                            null,
                            _react2.default.createElement(
                                _HAFooterRight2.default,
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                            return _this2._toggleTrowserLargeExample();
                                        } },
                                    'Close'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                return _this2._toggleTrowserLargeExample();
                            } },
                        'Show Trowser Large Example'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                return _this2._showTrowser();
                            } },
                        'Show Trowser'
                    )
                );
            }
        }, {
            key: '_changeContent',
            value: function _changeContent() {
                this.setState({
                    sectionContent: Math.random(),
                    asideContent: Math.random()
                });
            }
        }, {
            key: '_changeAsideContent',
            value: function _changeAsideContent() {
                this.setState({
                    asideContent: Math.random()
                });
            }
        }, {
            key: '_showTrowser',
            value: function _showTrowser() {
                this.setState({
                    showTrowser: true
                });
            }
        }, {
            key: '_closeTrowser',
            value: function _closeTrowser() {
                this.setState({
                    showTrowser: false
                });
            }
        }, {
            key: '_toggleTrowserLargeExample',
            value: function _toggleTrowserLargeExample() {
                this.setState({
                    showTrowserLargeExample: !this.state.showTrowserLargeExample
                });
            }
        }]);

        return TrowserExample;
    }(_react2.default.Component);

    exports.default = TrowserExample;
});
//# sourceMappingURL=TrowserExample.react.js.map
