(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./select.hbs', 'dojo/dom-construct', 'text!./select.html', 'text!./select.dojo.html', './select', 'react', 'react-dom', 'hui/react-components/HAItem', 'hui/react-components/HASelect', '../util/loremIpsum'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./select.hbs'), require('dojo/dom-construct'), require('text!./select.html'), require('text!./select.dojo.html'), require('./select'), require('react'), require('react-dom'), require('hui/react-components/HAItem'), require('hui/react-components/HASelect'), require('../util/loremIpsum'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.select, global.domConstruct, global.select, global.selectDojo, global.select, global.react, global.reactDom, global.HAItem, global.HASelect, global.loremIpsum);
        global.selectView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _select, _domConstruct, _select3, _selectDojo, _select5, _react, _reactDom, _HAItem, _HASelect, _loremIpsum) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _select2 = _interopRequireDefault(_select);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _select4 = _interopRequireDefault(_select3);

    var _selectDojo2 = _interopRequireDefault(_selectDojo);

    var _select6 = _interopRequireDefault(_select5);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HASelect2 = _interopRequireDefault(_HASelect);

    var _loremIpsum2 = _interopRequireDefault(_loremIpsum);

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
            this.renderHTML(_select2.default, _select4.default);
            this.renderJS(this.el.querySelector('#js .examples'));
            this.renderDojo(_selectDojo2.default, this.el.querySelector('#dojo .examples'));
            this.renderReact(this.el.querySelector('#react .examples'));

            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
        },

        renderJS: function renderJS(el) {
            _select6.default.render(el);
        },

        renderDojo: function renderDojo(template, el) {
            var component = _domConstruct2.default.toDom(template),
                cloned = component.cloneNode(true);
            _domConstruct2.default.place(cloned, el);
        },

        renderReact: function renderReact(placeToAppend) {
            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            },
                longText = (0, _loremIpsum2.default)();

            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Default'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { onChange: eventLog, onClick: eventLog, onAddNew: eventLog, 'data-automation-id': 'react-ha-select-default' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Placeholder'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { placeholder: 'Choose an item', 'data-automation-id': 'react-ha-select-with-placeholder' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Label'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', 'data-automation-id': 'react-ha-select-with-label' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Disabled'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', disabled: true, 'data-automation-id': 'react-ha-select-disabled' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Disabled Item'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', 'data-automation-id': 'react-ha-select-item-disabled' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue', disabled: 'disabled' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Value Selected'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', value: 'BananaValue', 'data-automation-id': 'react-ha-select-value-selected' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Required Validation'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', required: true, 'data-automation-id': 'react-ha-select-required' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Required Validation No Indicator'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', required: true, noRequiredIndicator: true, 'data-automation-id': 'react-ha-select-no-required-indicator' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Add New'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', onAddNew: eventLog, addNew: 'true', placeholder: 'Choose an item', 'data-automation-id': 'react-ha-select-with-add-new' },
                            _react2.default.createElement(
                                'ha-popover',
                                null,
                                _react2.default.createElement(
                                    'ha-popover-form',
                                    { addNewNameSelector: '#addNewName' },
                                    _react2.default.createElement(
                                        'section',
                                        null,
                                        _react2.default.createElement('ha-text-field', { label: 'Name', id: 'addNewName' })
                                    ),
                                    _react2.default.createElement(
                                        'footer',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-primary no-connector' },
                                            'Save'
                                        ),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'ha-button ha-button-secondary no-connector' },
                                            'Cancel'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Icon'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { label: 'Some Label', placeholder: 'Choose an item', icon: 'hi-filter', 'data-automation-id': 'react-ha-select-with-icon' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Wrapping Items'
                        ),
                        _react2.default.createElement(
                            _HASelect2.default,
                            { 'data-automation-id': 'react-ha-select-items-wrapping' },
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'AppleValue' },
                                'Apple'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BananaValue' },
                                'Banana'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'BalloonValue' },
                                'Balloon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: 'MelonValue' },
                                'Melon'
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: longText },
                                longText
                            ),
                            _react2.default.createElement(
                                _HAItem2.default,
                                { value: longText },
                                longText
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=select.view.js.map
