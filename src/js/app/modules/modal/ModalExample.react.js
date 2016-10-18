var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HAModal', 'hui/react-components/HAFooter', 'hui/react-components/HASection', 'hui/react-components/HAAside', '../LargeExample.react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HAModal'), require('hui/react-components/HAFooter'), require('hui/react-components/HASection'), require('hui/react-components/HAAside'), require('../LargeExample.react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HAModal, global.HAFooter, global.HASection, global.HAAside, global.LargeExample);
        global.ModalExample = mod.exports;
    }
})(this, function (exports, _react, _HAModal, _HAFooter, _HASection, _HAAside, _LargeExample) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HAModal2 = _interopRequireDefault(_HAModal);

    var _HAFooter2 = _interopRequireDefault(_HAFooter);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HAAside2 = _interopRequireDefault(_HAAside);

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

    var ModalExample = function (_React$Component) {
        _inherits(ModalExample, _React$Component);

        function ModalExample(props) {
            _classCallCheck(this, ModalExample);

            var _this = _possibleConstructorReturn(this, (ModalExample.__proto__ || Object.getPrototypeOf(ModalExample)).call(this, props));

            _this.state = {
                showModal: false,
                sectionContent: Math.random(),
                asideContent: Math.random()
            };
            return _this;
        }

        _createClass(ModalExample, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _HAModal2.default,
                        {
                            show: this.state.showModal,
                            type: 'endflow',
                            titleText: 'I AM A MODAL TITLE!!!!!',
                            dismissible: true,
                            size: 'large',
                            onShow: function onShow() {
                                return console.log('show was fired');
                            },
                            onClose: function onClose() {
                                return console.log('close was fired');
                            },
                            onDismiss: function onDismiss() {
                                console.log('dismiss was fired');
                                _this2._closeModal();
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
                            _HAAside2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                this.state.asideContent
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this2._closeModal();
                                    } },
                                'Close Modal'
                            )
                        ),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this2._changeAsideContent();
                                    } },
                                'set side content'
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this2._changeContent();
                                    } },
                                'set all content'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                return _this2._showModal();
                            } },
                        'Show Modal'
                    )
                );
            }
        }, {
            key: '_changeContent',
            value: function _changeContent() {
                this.setState({ sectionContent: Math.random(), asideContent: Math.random() });
            }
        }, {
            key: '_changeAsideContent',
            value: function _changeAsideContent() {
                this.setState({ asideContent: Math.random() });
            }
        }, {
            key: '_showModal',
            value: function _showModal() {
                this.setState({ showModal: true });
            }
        }, {
            key: '_closeModal',
            value: function _closeModal() {
                this.setState({ showModal: false });
            }
        }]);

        return ModalExample;
    }(_react2.default.Component);

    exports.default = ModalExample;
});
//# sourceMappingURL=ModalExample.react.js.map
