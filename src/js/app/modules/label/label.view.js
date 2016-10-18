(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./label.hbs', 'dojo/dom-construct', 'text!./label.html', './label', 'react', 'react-dom', 'hui/react-components/index'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./label.hbs'), require('dojo/dom-construct'), require('text!./label.html'), require('./label'), require('react'), require('react-dom'), require('hui/react-components/index'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.label, global.domConstruct, global.label, global.label, global.react, global.reactDom, global.index);
        global.labelView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _label, _domConstruct, _label3, _label5, _react, _reactDom, _index) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _label2 = _interopRequireDefault(_label);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _label4 = _interopRequireDefault(_label3);

    var _label6 = _interopRequireDefault(_label5);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
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
            this.renderHTML();
            this.renderJS(this.$el.find('#programmaticWay')[0], this.$el.find('#html')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#html')[0]);
            this.renderReact(this.$el.find('#reactWay')[0], this.$el.find('#html')[0]);
            return this;
        },

        renderHTML: function renderHTML() {
            var compiled = _handlebars2.default.compile(_label2.default),
                html = compiled({ componentDemoTemplate: _label4.default });

            this.$el.html(html);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var label = _domConstruct2.default.toDom(_label4.default),
                cloned = label.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            _label6.default.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _index.HATextField,
                                null,
                                _react2.default.createElement(
                                    _index.HALabel,
                                    null,
                                    'I am ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        ' HALabel '
                                    ),
                                    ' ',
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        ' that overwrites default '
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'label'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _index.HATextarea,
                                null,
                                _react2.default.createElement(
                                    _index.HALabel,
                                    null,
                                    'I am ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        ' HALabel '
                                    ),
                                    ' ',
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        ' that overwrites default '
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'label'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _index.HASelect,
                                { placeholder: 'Choose an item' },
                                _react2.default.createElement(
                                    _index.HALabel,
                                    null,
                                    'I am ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        ' HALabel '
                                    ),
                                    ' ',
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        ' that overwrites default label'
                                    )
                                ),
                                _react2.default.createElement(
                                    _index.HAItem,
                                    { value: 'AppleValue' },
                                    'Apple'
                                ),
                                _react2.default.createElement(
                                    _index.HAItem,
                                    { value: 'BananaValue' },
                                    'Banana'
                                ),
                                _react2.default.createElement(
                                    _index.HAItem,
                                    { value: 'BalloonValue' },
                                    'Balloon'
                                ),
                                _react2.default.createElement(
                                    _index.HAItem,
                                    { value: 'MelonValue' },
                                    'Melon'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _index.HACheckboxGroup,
                                { name: 'Declarative Checkbox Group' },
                                _react2.default.createElement(
                                    _index.HALabel,
                                    null,
                                    'I am ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        ' HALabel '
                                    ),
                                    ' ',
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        ' that overwrites default label'
                                    )
                                ),
                                _react2.default.createElement(_index.HACheckbox, { value: '1', name: 'Enabled-Checkbox', label: 'Enabled Checkbox' }),
                                _react2.default.createElement(_index.HACheckbox, { value: '2', name: 'Enabled-Checkbox-Default', label: 'Enabled Checkbox (default checked)', checked: true }),
                                _react2.default.createElement(_index.HACheckbox, { value: '3', name: 'Disabled-Checkbox', label: 'Disabled Checkbox', disabled: true }),
                                _react2.default.createElement(_index.HACheckbox, { name: 'Enabled-Checkbox-Default', label: 'Disabled Checkbox (default checked)', value: '4', checked: true, disabled: true }),
                                _react2.default.createElement(_index.HACheckbox, { value: 'off', label: 'With value OFF' }),
                                _react2.default.createElement(_index.HACheckbox, { value: '5' }),
                                _react2.default.createElement(_index.HACheckbox, { value: '6', checked: true })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _index.HARadioButtonGroup,
                                null,
                                _react2.default.createElement(
                                    _index.HALabel,
                                    null,
                                    'I am ',
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        ' HALabel '
                                    ),
                                    ' ',
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        ' that overwrites default label'
                                    )
                                ),
                                _react2.default.createElement(_index.HARadioButton, { label: 'Radio 1', value: '1' }),
                                _react2.default.createElement(_index.HARadioButton, { label: 'Radio 2', value: '2' }),
                                _react2.default.createElement(_index.HARadioButton, { label: 'Radio 3', value: '3' })
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=label.view.js.map
