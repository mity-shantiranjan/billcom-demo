var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./toast-message.hbs', 'dojo/dom-construct', 'text!./toastmessage.dojo.html', 'hui/react-components/HAToastMessage', 'react', 'react-dom'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./toast-message.hbs'), require('dojo/dom-construct'), require('text!./toastmessage.dojo.html'), require('hui/react-components/HAToastMessage'), require('react'), require('react-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.toastMessage, global.domConstruct, global.toastmessageDojo, global.HAToastMessage, global.react, global.reactDom);
        global.toastMessageView = mod.exports;
    }
})(this, function (exports, _backbone, _toastMessage, _domConstruct, _toastmessageDojo, _HAToastMessage, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _toastMessage2 = _interopRequireDefault(_toastMessage);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _toastmessageDojo2 = _interopRequireDefault(_toastmessageDojo);

    var _HAToastMessage2 = _interopRequireDefault(_HAToastMessage);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
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

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate',
            'click .btn-show-toast': 'showToastEvent'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        showToastEvent: function showToastEvent(evt) {
            this.showToast(evt.currentTarget.value);
        },

        showToast: function showToast(id) {
            this.$el.find('#' + id)[0].show();
        },

        render: function render() {
            this.$el.html(_toastMessage2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$el.find('#reactWay')[0]);
            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var toastMessage = _domConstruct2.default.toDom(_toastmessageDojo2.default),
                cloned = toastMessage.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            var node = document.createElement('ha-toast-message');

            node.dismissible = true;
            node.duration = 5000;
            // jscs:disable validateQuoteMarks
            node.message = "My message here test <strong>with bold text</strong>, timeout 5s";
            // jscs:enable validateQuoteMarks
            node.id = 'ToastJS1';
            placeToAppend.appendChild(node);

            node = document.createElement('ha-toast-message');
            node.dismissible = false;
            node.duration = 2000;
            // jscs:disable validateQuoteMarks
            node.message = "My message here test <strong>with bold text</strong>, non dismissible, timeout 2s";
            // jscs:enable validateQuoteMarks
            node.id = 'ToastJS2';
            placeToAppend.appendChild(node);

            node = document.createElement('ha-toast-message');
            node.dismissible = true;
            node.duration = -1;
            // jscs:disable validateQuoteMarks
            node.message = "My message here test <strong>with bold text</strong>, this should expand to the limits of the container";
            // jscs:enable validateQuoteMarks
            node.id = 'ToastJS3';
            placeToAppend.appendChild(node);
        },

        renderReact: function renderReact(placeToAppend) {

            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.currentTarget + ' ' + e.type + ' fired');
            };

            var log = function log(msg) {
                console.log(msg);
            };

            var ExampleComponent = function (_React$Component) {
                _inherits(ExampleComponent, _React$Component);

                function ExampleComponent(props) {
                    _classCallCheck(this, ExampleComponent);

                    var _this = _possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).call(this, props));

                    _this.state = {
                        showToast1: false,
                        showToast2: false,
                        showToast3: false
                    };
                    return _this;
                }

                _createClass(ExampleComponent, [{
                    key: 'render',
                    value: function render() {
                        var _this2 = this;

                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { style: { position: "relative", background: "#f0f0f0", height: "200px", width: "636px", margin: "20px auto", border: "1px solid gray" } },
                                _react2.default.createElement(
                                    _HAToastMessage2.default,
                                    { closeCallback: function closeCallback() {
                                            return _this2._closeToast(1);
                                        }, onShow: eventLog, onClose: function onClose() {
                                            return _this2._closeToast(1);
                                        }, onDismiss: eventLog, id: 'Toast1', duration: 5000, show: this.state.showToast1 },
                                    'Lorem ipsum dolor ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'with bold text'
                                    ),
                                    ', timeout 5s.'
                                ),
                                _react2.default.createElement(
                                    _HAToastMessage2.default,
                                    { onClose: function onClose() {
                                            return _this2._closeToast(2);
                                        }, id: 'Toast2', duration: 2000, dismissible: false, show: this.state.showToast2 },
                                    'Lorem ipsum dolor sit amet, amet hendrerit a semper reprehenderit ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'with bold text'
                                    ),
                                    ', timeout 2s.'
                                ),
                                _react2.default.createElement(
                                    _HAToastMessage2.default,
                                    { onClose: function onClose() {
                                            return _this2._closeToast(3);
                                        }, id: 'Toast3', duration: -1, dismissible: true, show: this.state.showToast3 },
                                    'Lorem ipsum dolor sit amet, amet hendrerit a semper reprehenderit, ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'with bold text'
                                    ),
                                    '.'
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', value: 'Toast1', onClick: function onClick() {
                                        return _this2._showToast(1);
                                    } },
                                'Show Toast 1'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', value: 'Toast2', onClick: function onClick() {
                                        return _this2._showToast(2);
                                    } },
                                'Show Toast 2'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', value: 'Toast3', onClick: function onClick() {
                                        return _this2._showToast(3);
                                    } },
                                'Show Toast 3'
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', value: 'Toast3', onClick: function onClick() {
                                        return _this2._closeToast(3);
                                    } },
                                'Close Toast 3'
                            )
                        );
                    }
                }, {
                    key: '_showToast',
                    value: function _showToast(toastIndex) {
                        this.setState(_defineProperty({}, 'showToast' + toastIndex, true));
                    }
                }, {
                    key: '_closeToast',
                    value: function _closeToast(toastIndex) {
                        this.setState(_defineProperty({}, 'showToast' + toastIndex, false));
                    }
                }]);

                return ExampleComponent;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }

    });
});
//# sourceMappingURL=toast-message.view.js.map
