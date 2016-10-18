(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./switch-button.hbs', 'dojo/dom-construct', 'text!./switch-button.html', 'react-dom', 'react', './switch-button', './SwitchButtonDemo.react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./switch-button.hbs'), require('dojo/dom-construct'), require('text!./switch-button.html'), require('react-dom'), require('react'), require('./switch-button'), require('./SwitchButtonDemo.react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.switchButton, global.domConstruct, global.switchButton, global.reactDom, global.react, global.switchButton, global.SwitchButtonDemo);
        global.switchButtonView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _switchButton, _domConstruct, _switchButton3, _reactDom, _react, _switchButton5, _SwitchButtonDemo) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _switchButton2 = _interopRequireDefault(_switchButton);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _switchButton4 = _interopRequireDefault(_switchButton3);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _react2 = _interopRequireDefault(_react);

    var demoJS = _interopRequireWildcard(_switchButton5);

    var _SwitchButtonDemo2 = _interopRequireDefault(_SwitchButtonDemo);

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
            this.renderHTML(_switchButton2.default, _switchButton4.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var switchButton = _domConstruct2.default.toDom(_switchButton4.default),
                cloned = switchButton.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            _reactDom2.default.render(_react2.default.createElement(_SwitchButtonDemo2.default, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=switch-button.view.js.map
