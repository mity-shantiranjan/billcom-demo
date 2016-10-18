var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./radiobutton.hbs', 'dojo/dom-construct', 'text!./radiobutton.html', './radiobutton', 'react', 'react-dom', 'hui/react-components/HARadioButton', 'hui/react-components/HARadioButtonGroup'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./radiobutton.hbs'), require('dojo/dom-construct'), require('text!./radiobutton.html'), require('./radiobutton'), require('react'), require('react-dom'), require('hui/react-components/HARadioButton'), require('hui/react-components/HARadioButtonGroup'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.radiobutton, global.domConstruct, global.radiobutton, global.radiobutton, global.react, global.reactDom, global.HARadioButton, global.HARadioButtonGroup);
        global.radiobuttonView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _radiobutton, _domConstruct, _radiobutton3, _radiobutton5, _react, _reactDom, _HARadioButton, _HARadioButtonGroup) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _radiobutton2 = _interopRequireDefault(_radiobutton);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _radiobutton4 = _interopRequireDefault(_radiobutton3);

    var _radiobutton6 = _interopRequireDefault(_radiobutton5);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HARadioButton2 = _interopRequireDefault(_HARadioButton);

    var _HARadioButtonGroup2 = _interopRequireDefault(_HARadioButtonGroup);

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
            this.renderHTML(_radiobutton2.default, _radiobutton4.default);
            this.renderJS(this.el.querySelector('#js .examples'));
            this.renderDojo(_radiobutton4.default, this.el.querySelector('#dojo .examples'));
            this.renderReact(this.el.querySelector('#react .examples'));

            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
        },

        renderJS: function renderJS(el) {
            _radiobutton6.default.render(el);
        },

        renderDojo: function renderDojo(template, el) {
            var component = _domConstruct2.default.toDom(template),
                cloned = component.cloneNode(true);
            _domConstruct2.default.place(cloned, el);
        },

        renderReact: function renderReact(placeToAppend) {
            var ExampleComponent = function (_React$Component) {
                _inherits(ExampleComponent, _React$Component);

                function ExampleComponent(props) {
                    _classCallCheck(this, ExampleComponent);

                    var _this = _possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).call(this, props));

                    _this.state = {
                        showFruits: true
                    };

                    _this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
                    _this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
                    return _this;
                }

                _createClass(ExampleComponent, [{
                    key: 'render',
                    value: function render() {
                        var onToggleCallback = this._onToggleCallback.bind(this),
                            items = this.state.showFruits ? this._fruits : this._vegetables,
                            keyId = 0,
                            rows = items.map(function (item, i) {
                            var itemValue = item + "Value";
                            return _react2.default.createElement(_HARadioButton2.default, { key: i, label: item, value: itemValue });
                        });

                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Default'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { onChange: this.eventLog, onClick: this.eventLog },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1', onChange: this.eventLog, onClick: this.eventLog }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Label'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With name attribute'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label', name: 'radioWithName' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'First Radio Button Disabled'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1', disabled: true }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Default Value (should check Radio 1)'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label', value: '1' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With checked attribute on First Radio Button'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1', checked: true }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2', checked: false }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3', checked: false })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Inline'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { className: 'ha-inline', label: 'Some Label' },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Expected Validation (expected to select Radio 2)'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label', expected: '2', required: true },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.validateExpected },
                                'Trigger Validation'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Required Validation No Indicator'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label', required: true, noRequiredIndicator: true },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.validateExpected },
                                'Trigger Validation'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'With Required Validation'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { label: 'Some Label', required: true },
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_HARadioButton2.default, { key: keyId++, label: 'Radio 3', value: '3' })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button', onClick: this.validateExpected },
                                'Trigger Validation'
                            ),
                            _react2.default.createElement(
                                'h3',
                                null,
                                'HARadioButtonGroup radio button mutations dont work'
                            ),
                            _react2.default.createElement(
                                _HARadioButtonGroup2.default,
                                { name: 'Radio Button Group', label: 'Radio Button Group' },
                                rows
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'widget' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: onToggleCallback },
                                    'Toggle Fruit & Vegetables'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                'The content of the radio buttons should change from fruits to vegetables.',
                                _react2.default.createElement('br', null)
                            )
                        );
                    }
                }, {
                    key: 'validateExpected',
                    value: function validateExpected() {
                        console.log('Using ref did not work, will ask around');
                    }
                }, {
                    key: 'eventLog',
                    value: function eventLog(e) {
                        console.log(e.target.tagName + ' ' + e.type + ' fired');
                    }
                }, {
                    key: '_onToggleCallback',
                    value: function _onToggleCallback() {
                        this.setState({
                            showFruits: !this.state.showFruits
                        });
                    }
                }]);

                return ExampleComponent;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=radiobutton.view.js.map
