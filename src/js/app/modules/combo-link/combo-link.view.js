(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./combo-link.hbs', 'dojo/dom-construct', 'text!./combolink.dojo.html', 'react', 'react-dom', 'hui/react-components/HAItem', 'hui/react-components/HAComboLink', './combo-link'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./combo-link.hbs'), require('dojo/dom-construct'), require('text!./combolink.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HAItem'), require('hui/react-components/HAComboLink'), require('./combo-link'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.comboLink, global.domConstruct, global.combolinkDojo, global.react, global.reactDom, global.HAItem, global.HAComboLink, global.comboLink);
        global.comboLinkView = mod.exports;
    }
})(this, function (exports, _backbone, _comboLink, _domConstruct, _combolinkDojo, _react, _reactDom, _HAItem, _HAComboLink, _comboLink3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _comboLink2 = _interopRequireDefault(_comboLink);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _combolinkDojo2 = _interopRequireDefault(_combolinkDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAComboLink2 = _interopRequireDefault(_HAComboLink);

    var demoJS = _interopRequireWildcard(_comboLink3);

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
            this.$el.html(_comboLink2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var comboLink = _domConstruct2.default.toDom(_combolinkDojo2.default),
                cloned = comboLink.cloneNode(true);
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
                            'h3',
                            null,
                            'Common Combo Link'
                        ),
                        _react2.default.createElement(
                            _HAComboLink2.default,
                            {
                                placeholder: 'Choose a method',
                                label: 'Combo Link One',
                                onClick: eventLog,
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
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'With Disabled Item'
                        ),
                        _react2.default.createElement(
                            _HAComboLink2.default,
                            {
                                placeholder: 'Choose a method',
                                label: 'Combo Link One',
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
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=combo-link.view.js.map
