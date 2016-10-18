(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./stacked-page-messages.hbs', 'dojo/dom-construct', 'text!./stacked-page-messages.html', './stacked-page-messages', 'hbs/handlebars', 'react', 'react-dom', 'hui/react-components/HAPageMessage', 'hui/react-components/HAStackedPageMessages'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./stacked-page-messages.hbs'), require('dojo/dom-construct'), require('text!./stacked-page-messages.html'), require('./stacked-page-messages'), require('hbs/handlebars'), require('react'), require('react-dom'), require('hui/react-components/HAPageMessage'), require('hui/react-components/HAStackedPageMessages'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.stackedPageMessages, global.domConstruct, global.stackedPageMessages, global.stackedPageMessages, global.handlebars, global.react, global.reactDom, global.HAPageMessage, global.HAStackedPageMessages);
        global.stackedPageMessagesView = mod.exports;
    }
})(this, function (exports, _backbone, _stackedPageMessages, _domConstruct, _stackedPageMessages3, _stackedPageMessages5, _handlebars, _react, _reactDom, _HAPageMessage, _HAStackedPageMessages) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _stackedPageMessages2 = _interopRequireDefault(_stackedPageMessages);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _stackedPageMessages4 = _interopRequireDefault(_stackedPageMessages3);

    var _stackedPageMessages6 = _interopRequireDefault(_stackedPageMessages5);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAPageMessage2 = _interopRequireDefault(_HAPageMessage);

    var _HAStackedPageMessages2 = _interopRequireDefault(_HAStackedPageMessages);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate',
            'click .close-alert': 'onCloseAlert'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.renderHTML(_stackedPageMessages2.default, _stackedPageMessages4.default);
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
            var stackedPageMessages = _domConstruct2.default.toDom(_stackedPageMessages4.default),
                cloned = stackedPageMessages.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            _stackedPageMessages6.default.render(placeToAppend);
        },

        onCloseAlert: function onCloseAlert() {
            this.$el.find('.panel:not(.hidden) ha-stacked-page-messages > ha-page-message[type=error]')[0].close();
        },

        renderReact: function renderReact(placeToAppend) {
            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _HAStackedPageMessages2.default,
                            null,
                            _react2.default.createElement(
                                _HAPageMessage2.default,
                                { titleText: 'Error Title', type: 'error', dismissible: false },
                                'The contents of this message should focus on what the user needs to do to fix the error instead of just stating what went wrong. Fields related to this error should be highlighted and accomplanied by the appropiate inline error message.'
                            ),
                            _react2.default.createElement(
                                _HAPageMessage2.default,
                                { titleText: 'Warn Title', type: 'warn', dismissible: true },
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                            ),
                            _react2.default.createElement(
                                _HAPageMessage2.default,
                                { titleText: 'Info Title', type: 'info', dismissible: true },
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=stacked-page-messages.view.js.map
