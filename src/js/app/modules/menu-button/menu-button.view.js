(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./menu-button.hbs', 'dojo/dom-construct', 'text!./menubutton.dojo.html', 'react', 'react-dom', 'hui/react-components/HAItem', 'hui/react-components/HAMenuButton', './menu-button'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./menu-button.hbs'), require('dojo/dom-construct'), require('text!./menubutton.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HAItem'), require('hui/react-components/HAMenuButton'), require('./menu-button'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.menuButton, global.domConstruct, global.menubuttonDojo, global.react, global.reactDom, global.HAItem, global.HAMenuButton, global.menuButton);
        global.menuButtonView = mod.exports;
    }
})(this, function (exports, _backbone, _menuButton, _domConstruct, _menubuttonDojo, _react, _reactDom, _HAItem, _HAMenuButton, _menuButton3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _menuButton2 = _interopRequireDefault(_menuButton);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _menubuttonDojo2 = _interopRequireDefault(_menubuttonDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAMenuButton2 = _interopRequireDefault(_HAMenuButton);

    var demoJS = _interopRequireWildcard(_menuButton3);

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
            this.$el.html(_menuButton2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var menuButton = _domConstruct2.default.toDom(_menubuttonDojo2.default),
                cloned = menuButton.cloneNode(true);
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
                            null,
                            _react2.default.createElement(
                                _HAMenuButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Same title',
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog
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
                                ),
                                _react2.default.createElement(
                                    _HAItem2.default,
                                    { value: 'MelonValue' },
                                    'Melon'
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
                                _HAMenuButton2.default,
                                {
                                    placeholder: 'Choose a method',
                                    label: 'Create New',
                                    className: 'ha-button-primary',
                                    onClick: eventLog,
                                    onSelect: eventLog,
                                    onItemsShow: eventLog,
                                    onItemsClose: eventLog
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
//# sourceMappingURL=menu-button.view.js.map
