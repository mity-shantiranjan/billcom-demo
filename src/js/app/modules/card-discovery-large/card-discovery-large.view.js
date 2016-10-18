var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./card-discovery-large.hbs', 'dojo/dom-construct', 'text!./card-discovery-large.html', './card-discovery-large', 'react', 'react-dom', 'hui/react-components/HACardDiscoveryLarge', 'hui/react-components/HAFooter', 'hui/react-components/HASection', 'hui/react-components/HATextField'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./card-discovery-large.hbs'), require('dojo/dom-construct'), require('text!./card-discovery-large.html'), require('./card-discovery-large'), require('react'), require('react-dom'), require('hui/react-components/HACardDiscoveryLarge'), require('hui/react-components/HAFooter'), require('hui/react-components/HASection'), require('hui/react-components/HATextField'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.cardDiscoveryLarge, global.domConstruct, global.cardDiscoveryLarge, global.cardDiscoveryLarge, global.react, global.reactDom, global.HACardDiscoveryLarge, global.HAFooter, global.HASection, global.HATextField);
        global.cardDiscoveryLargeView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _cardDiscoveryLarge, _domConstruct, _cardDiscoveryLarge3, _cardDiscoveryLarge5, _react, _reactDom, _HACardDiscoveryLarge, _HAFooter, _HASection, _HATextField) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _cardDiscoveryLarge2 = _interopRequireDefault(_cardDiscoveryLarge);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _cardDiscoveryLarge4 = _interopRequireDefault(_cardDiscoveryLarge3);

    var _cardDiscoveryLarge6 = _interopRequireDefault(_cardDiscoveryLarge5);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HACardDiscoveryLarge2 = _interopRequireDefault(_HACardDiscoveryLarge);

    var _HAFooter2 = _interopRequireDefault(_HAFooter);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HATextField2 = _interopRequireDefault(_HATextField);

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

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_cardDiscoveryLarge2.default);
            this.renderHTML();
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderHTML: function renderHTML() {
            var compiled = _handlebars2.default.compile(_cardDiscoveryLarge2.default),
                html = compiled({ componentDemoTemplate: _cardDiscoveryLarge4.default });

            this.$el.html(html);
        },

        renderJS: function renderJS(el) {
            _cardDiscoveryLarge6.default.render(el);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var cardDiscoveryLarge = _domConstruct2.default.toDom(_cardDiscoveryLarge4.default),
                cloned = cardDiscoveryLarge.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var CardDiscoveryLargeExamples = function (_React$Component) {
                _inherits(CardDiscoveryLargeExamples, _React$Component);

                function CardDiscoveryLargeExamples(props) {
                    _classCallCheck(this, CardDiscoveryLargeExamples);

                    var _this = _possibleConstructorReturn(this, (CardDiscoveryLargeExamples.__proto__ || Object.getPrototypeOf(CardDiscoveryLargeExamples)).call(this, props));

                    _this.state = {
                        showDefault: false,
                        showOneButton: false,
                        showTwoButtons: false,
                        showThreeButtons: false,
                        showCustomizedFooter: false,
                        showImageInSection: false,
                        showOpenTrue: true
                    };
                    return _this;
                }

                _createClass(CardDiscoveryLargeExamples, [{
                    key: 'render',
                    value: function render() {
                        var _this2 = this;

                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Default Hidden (No Footer)'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large default',
                                    dismissible: true,
                                    open: this.state.showDefault,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeDefault();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeDefault();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    'Some content for testing'
                                ),
                                _react2.default.createElement(_HAFooter2.default, null)
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showDefault();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With One Button'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large with 1 button',
                                    dismissible: true,
                                    open: this.state.showOneButton,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeOneButton();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeOneButton();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    'Some content for testing'
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'ha-footer-buttons',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary' },
                                            'Primary Button'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showOneButton();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Two Buttons'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large with 2 buttons',
                                    dismissible: true,
                                    open: this.state.showTwoButtons,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeTwoButtons();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeTwoButtons();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    'Some content for testing'
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'ha-footer-buttons',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button' },
                                            'Secondary Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary' },
                                            'Primary Button'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showTwoButtons();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Three Buttons'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large with 3 buttons',
                                    dismissible: true,
                                    open: this.state.showThreeButtons,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeThreeButtons();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeThreeButtons();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    'Some content for testing'
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'ha-footer-buttons',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button' },
                                            'Tertiary Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button' },
                                            'Secondary Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary' },
                                            'Primary Button'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showThreeButtons();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Customzied Footer'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Get set up right with help from an expert',
                                    dismissible: true,
                                    open: this.state.showCustomizedFooter,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeCustomizedFooter();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeCustomizedFooter();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'Ready for your free 1-hour session ? ',
                                        _react2.default.createElement(
                                            'a',
                                            { href: '' },
                                            'Learn more'
                                        )
                                    ),
                                    _react2.default.createElement(_HATextField2.default, { placeholder: 'Phone number' }),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'ha-button ha-button-primary' },
                                        'Call me now!'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        { style: { paddingTop: 20, textAlign: 'center' } },
                                        'Already have an accountant ?',
                                        _react2.default.createElement(
                                            'a',
                                            { href: '' },
                                            'invite them here'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showCustomizedFooter();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Image in Section'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large with 1 button',
                                    dismissible: true,
                                    open: this.state.showImageInSection,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        _this2._closeImageInSection();console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._closeImageInSection();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'card-sub-item' },
                                        _react2.default.createElement('div', { className: 'card-image qbo-certification' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'card-image-description' },
                                            'Strengthen your skills to',
                                            _react2.default.createElement('br', null),
                                            ' become a QuickBooks expert.'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'card-sub-item' },
                                        _react2.default.createElement('div', { className: 'card-image fap-directory' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'card-image-description' },
                                            'Showcase your practices to over',
                                            _react2.default.createElement('br', null),
                                            ' 1 million businesses.'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'card-sub-item' },
                                        _react2.default.createElement('div', { className: 'card-image customer-support' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'card-image-description' },
                                            'Connect quickly with our VIP',
                                            _react2.default.createElement('br', null),
                                            ' support specialists.'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'ha-footer-buttons',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary' },
                                            'Primary Button'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showImageInSection();
                                    } },
                                'Show'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Show immediately (open=true)'
                            ),
                            _react2.default.createElement(
                                _HACardDiscoveryLarge2.default,
                                {
                                    titleText: 'Card discovery large with open=true',
                                    dismissible: true,
                                    open: this.state.showOpenTrue,
                                    onShow: function onShow() {
                                        return console.log('show was fired');
                                    },
                                    onClose: function onClose() {
                                        return console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        _this2._showOpenTrue();console.log('dismiss was fired');
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    'Some content for testing'
                                ),
                                _react2.default.createElement(
                                    _HAFooter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'ha-footer-buttons',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button' },
                                            'Tertiary Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button' },
                                            'Secondary Button'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary' },
                                            'Primary Button'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: function onClick() {
                                        return _this2._showOpenTrue();
                                    } },
                                'Toggle'
                            )
                        );
                    }

                    // show the card

                }, {
                    key: '_showDefault',
                    value: function _showDefault() {
                        this.setState({ showDefault: true });
                    }
                }, {
                    key: '_showOneButton',
                    value: function _showOneButton() {
                        this.setState({ showOneButton: true });
                    }
                }, {
                    key: '_showTwoButtons',
                    value: function _showTwoButtons() {
                        this.setState({ showTwoButtons: true });
                    }
                }, {
                    key: '_showThreeButtons',
                    value: function _showThreeButtons() {
                        this.setState({ showThreeButtons: true });
                    }
                }, {
                    key: '_showCustomizedFooter',
                    value: function _showCustomizedFooter() {
                        this.setState({ showCustomizedFooter: true });
                    }
                }, {
                    key: '_showImageInSection',
                    value: function _showImageInSection() {
                        this.setState({ showImageInSection: true });
                    }

                    // close the card or dismiss the card

                }, {
                    key: '_closeDefault',
                    value: function _closeDefault() {
                        this.setState({ showDefault: false });
                    }
                }, {
                    key: '_closeOneButton',
                    value: function _closeOneButton() {
                        this.setState({ showOneButton: false });
                    }
                }, {
                    key: '_closeTwoButtons',
                    value: function _closeTwoButtons() {
                        this.setState({ showTwoButtons: false });
                    }
                }, {
                    key: '_closeThreeButtons',
                    value: function _closeThreeButtons() {
                        this.setState({ showThreeButtons: false });
                    }
                }, {
                    key: '_closeCustomizedFooter',
                    value: function _closeCustomizedFooter() {
                        this.setState({ showCustomizedFooter: false });
                    }
                }, {
                    key: '_closeImageInSection',
                    value: function _closeImageInSection() {
                        this.setState({ showImageInSection: false });
                    }

                    //Toggle

                }, {
                    key: '_showOpenTrue',
                    value: function _showOpenTrue() {
                        this.setState({ showOpenTrue: this.state.showOpenTrue ? false : true });
                    }
                }]);

                return CardDiscoveryLargeExamples;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(CardDiscoveryLargeExamples, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=card-discovery-large.view.js.map
