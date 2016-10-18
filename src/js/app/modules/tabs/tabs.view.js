var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./tabs.hbs', 'dojo/dom-construct', 'text!./tabs.html', 'react', 'react-dom', 'hui/react-components/HATabs', 'hui/react-components/HATab', './tabs', 'hbs/handlebars'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./tabs.hbs'), require('dojo/dom-construct'), require('text!./tabs.html'), require('react'), require('react-dom'), require('hui/react-components/HATabs'), require('hui/react-components/HATab'), require('./tabs'), require('hbs/handlebars'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.tabs, global.domConstruct, global.tabs, global.react, global.reactDom, global.HATabs, global.HATab, global.tabs, global.handlebars);
        global.tabsView = mod.exports;
    }
})(this, function (exports, _backbone, _tabs, _domConstruct, _tabs3, _react, _reactDom, _HATabs, _HATab, _tabs5, _handlebars) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _tabs2 = _interopRequireDefault(_tabs);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _tabs4 = _interopRequireDefault(_tabs3);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATabs2 = _interopRequireDefault(_HATabs);

    var _HATab2 = _interopRequireDefault(_HATab);

    var demoJS = _interopRequireWildcard(_tabs5);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

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
            this.renderHTML(_tabs2.default, _tabs4.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$el.find('#reactWay')[0]);
            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var tabs = _domConstruct2.default.toDom(_tabs4.default),
                cloned = tabs.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var ExampleStageComponent = function (_React$Component) {
                _inherits(ExampleStageComponent, _React$Component);

                function ExampleStageComponent(props) {
                    _classCallCheck(this, ExampleStageComponent);

                    return _possibleConstructorReturn(this, (ExampleStageComponent.__proto__ || Object.getPrototypeOf(ExampleStageComponent)).call(this, props));
                }

                _createClass(ExampleStageComponent, [{
                    key: 'render',
                    value: function render() {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h3',
                                { className: 'subtitle' },
                                'Horizontal Tabs'
                            ),
                            _react2.default.createElement(
                                _HATabs2.default,
                                null,
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Adjustments' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 1'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Mappings' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 2'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'No focusable elements here'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Send To Taxes' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 3'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'subtitle' },
                                'Horizontal Tabs With Icons'
                            ),
                            _react2.default.createElement(
                                _HATabs2.default,
                                null,
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Adjustments', icon: 'hi-settings-o' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 1'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Mappings', icon: 'hi-duplicate' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 2'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'No focusable content here'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Send To Taxes', icon: 'hi-reconcile' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 3'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'subtitle' },
                                'Horizontal Tabs With Badges'
                            ),
                            _react2.default.createElement(
                                _HATabs2.default,
                                null,
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Messages',
                                        badgeClass: 'ha-numeric-badge',
                                        badgeText: '1337' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 1'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Invoices',
                                        badgeClass: 'ha-numeric-badge ha-inverse',
                                        badgeText: '42' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 2'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'No focusable elements here'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Status',
                                        badgeClass: 'ha-text-badge ha-warn',
                                        badgeText: 'Overdue' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 3'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'subtitle' },
                                'Horizontal Tabs Without Button on Mobile'
                            ),
                            _react2.default.createElement(
                                _HATabs2.default,
                                null,
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { useTabButton: 'false', titleText: 'Adjustments' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 1'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Mappings' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 2'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'No focusable elements here'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HATab2.default,
                                    { titleText: 'Send To Taxes' },
                                    _react2.default.createElement(
                                        'h4',
                                        null,
                                        'Tab Content 3'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'name' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'lastname' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form-control' },
                                        _react2.default.createElement('ha-text-field', { label: 'email' })
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            null,
                                            'Save'
                                        )
                                    )
                                )
                            )
                        );
                    }
                }]);

                return ExampleStageComponent;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(ExampleStageComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=tabs.view.js.map
