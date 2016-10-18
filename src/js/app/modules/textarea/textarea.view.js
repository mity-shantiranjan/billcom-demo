(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./textarea.hbs', 'dojo/dom-construct', 'text!./textarea.dojo.html', 'react', 'react-dom', 'hui/react-components/HATextarea', './textarea'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./textarea.hbs'), require('dojo/dom-construct'), require('text!./textarea.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HATextarea'), require('./textarea'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.textarea, global.domConstruct, global.textareaDojo, global.react, global.reactDom, global.HATextarea, global.textarea);
        global.textareaView = mod.exports;
    }
})(this, function (exports, _backbone, _textarea, _domConstruct, _textareaDojo, _react, _reactDom, _HATextarea, _textarea3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _textarea2 = _interopRequireDefault(_textarea);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _textareaDojo2 = _interopRequireDefault(_textareaDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATextarea2 = _interopRequireDefault(_HATextarea);

    var demoJS = _interopRequireWildcard(_textarea3);

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
            this.$el.html(_textarea2.default);
            this.renderJS(this.$('#programmaticWay')[0]);
            this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);

            Array.prototype.forEach.call(this.el.querySelectorAll('.with-error'), function (textArea) {
                if (textArea._upgraded) {
                    textArea.reportValidity();
                    textArea.value = '\n\n\n';
                    textArea.value = '';
                } else {
                    textArea.addEventListener('component-upgraded', function () {
                        textArea.reportValidity();
                        textArea.value = '\n\n\n';
                        textArea.value = '';
                    });
                }
            });

            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var textArea = _domConstruct2.default.toDom(_textareaDojo2.default),
                cloned = textArea.cloneNode(true);
            demoJS._appendChildWithWrapper(cloned, placeToAppend);
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
                        _react2.default.createElement(_HATextarea2.default, { label: 'Name', onChange: eventLog, onInput: eventLog }),
                        _react2.default.createElement(_HATextarea2.default, { label: 'Name', placeholder: 'Your Name' }),
                        _react2.default.createElement(_HATextarea2.default, { label: 'Name', required: true }),
                        _react2.default.createElement(_HATextarea2.default, { label: 'Name', disabled: true, required: true })
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=textarea.view.js.map
