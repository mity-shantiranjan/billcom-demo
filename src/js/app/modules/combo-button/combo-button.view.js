(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./combo-button.hbs', 'dojo/dom-construct', 'text!./combobutton.dojo.html', 'react', 'react-dom', 'hui/react-components/HAItem', 'hui/react-components/HAComboButton', './combo-button'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./combo-button.hbs'), require('dojo/dom-construct'), require('text!./combobutton.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HAItem'), require('hui/react-components/HAComboButton'), require('./combo-button'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.comboButton, global.domConstruct, global.combobuttonDojo, global.react, global.reactDom, global.HAItem, global.HAComboButton, global.comboButton);
        global.comboButtonView = mod.exports;
    }
})(this, function (exports, _backbone, _comboButton, _domConstruct, _combobuttonDojo, _react, _reactDom, _HAItem, _HAComboButton, _comboButton3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _comboButton2 = _interopRequireDefault(_comboButton);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _combobuttonDojo2 = _interopRequireDefault(_combobuttonDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAComboButton2 = _interopRequireDefault(_HAComboButton);

    var demoJS = _interopRequireWildcard(_comboButton3);

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

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_comboButton2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var comboButton = _domConstruct2.default.toDom(_combobuttonDojo2.default),
                cloned = comboButton.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
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
                            'div',
                            { className: 'container-combo-buttons' },
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    className: 'ha-button-primary',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    disabled: true,
                                    'data-automation-id': 'react_cmbtn_primary_disabled'
                                },
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
                                )
                            ),
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    className: 'ha-button-primary',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    'data-automation-id': 'react_cmbtn_primary'
                                },
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
                                )
                            ),
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    disabled: true,
                                    'data-automation-id': 'react_cmbtn_secondary_disabled'
                                },
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
                                )
                            ),
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    'data-automation-id': 'raect_cmbtn_secondary'
                                },
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
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'content-dark' },
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    className: 'ha-button-dark',
                                    label: 'Create New',
                                    disabled: true,
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    'data-automation-id': 'react_cmbtn_dark_disabled'
                                },
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
                                )
                            ),
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    className: 'ha-button-dark',
                                    label: 'Create New',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    'data-automation-id': 'raect_cmbtn_dark'
                                },
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
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Disabled Items'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'container-disabled-items' },
                            _react2.default.createElement(
                                _HAComboButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    className: 'ha-button-primary',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog,
                                    'data-automation-id': 'react_cmbtn_primary_item_disabled'
                                },
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
                                )
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=combo-button.view.js.map
