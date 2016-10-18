(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./textfield.hbs', 'dojo/dom-construct', 'text!./textfield.dojo.html', 'react', 'react-dom', 'hui/react-components/HATextField', './textfield'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./textfield.hbs'), require('dojo/dom-construct'), require('text!./textfield.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HATextField'), require('./textfield'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.textfield, global.domConstruct, global.textfieldDojo, global.react, global.reactDom, global.HATextField, global.textfield);
        global.textfieldView = mod.exports;
    }
})(this, function (exports, _backbone, _textfield, _domConstruct, _textfieldDojo, _react, _reactDom, _HATextField, _textfield3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _textfield2 = _interopRequireDefault(_textfield);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _textfieldDojo2 = _interopRequireDefault(_textfieldDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _textfield4 = _interopRequireDefault(_textfield3);

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
            this.$el.html(_textfield2.default);
            this.renderJS(this.$('#programmaticWay')[0]);
            this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);

            Array.prototype.forEach.call(this.el.querySelectorAll('.with-error'), function (textField) {
                if (textField._upgraded) {
                    textField.reportValidity();
                } else {
                    textField.addEventListener('component-upgraded', function () {
                        textField.reportValidity();
                    });
                }
            });

            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var textField = _domConstruct2.default.toDom(_textfieldDojo2.default),
                cloned = textField.cloneNode(true);
            _textfield4.default._appendChildWithWrapper(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            _textfield4.default.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var aFunc = function aFunc() {
                console.log(this.element.value);
                console.log('VALIDATOR HIT!!!!!!!!');
                return true;
            };

            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            };

            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Enabled'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Name' }),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Name with Placeholder',
                            placeholder: 'Your name' }),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Name with Value',
                            value: 'Default Text' }),
                        _react2.default.createElement(_HATextField2.default, {
                            placeholder: 'No Label' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Disabled'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Disabled Name',
                            disabled: true }),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Disabled Name with Placeholder',
                            disabled: true,
                            placeholder: 'Your name' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Error'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'With error',
                            className: 'with-error',
                            required: true }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Required'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Required Field',
                            required: true,
                            requiredMessage: 'ITS WORKING!!!' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Required No Indicator'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Required Field',
                            required: true,
                            noRequiredIndicator: true,
                            requiredMessage: 'ITS WORKING!!!' }),
                        _react2.default.createElement(_HATextField2.default, {
                            placeholder: 'No Label Required',
                            required: true,
                            requiredMessage: 'ITS WORKING!!!' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Optional'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Optional Field',
                            labelOptional: 'optional',
                            optional: true }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Pattern'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Pattern Field',
                            pattern: '[abc]',
                            invalidMessage: 'thats not right...',
                            validator: aFunc }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Icon'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Name',
                            icon: 'hi-search' }),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Name with Placeholder',
                            icon: 'hi-search',
                            placeholder: 'Your name' }),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'Name with Value',
                            icon: 'hi-search',
                            value: 'Default text' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Events'
                        ),
                        _react2.default.createElement(_HATextField2.default, {
                            label: 'On Change',
                            onChange: eventLog,
                            onInput: eventLog })
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=textfield.view.js.map
