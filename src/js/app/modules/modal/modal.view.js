(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./modal.hbs', 'dojo/dom-construct', 'text!./modal.dojo.html', './ModalExample.react', 'react-dom', 'react', './modal'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./modal.hbs'), require('dojo/dom-construct'), require('text!./modal.dojo.html'), require('./ModalExample.react'), require('react-dom'), require('react'), require('./modal'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.modal, global.domConstruct, global.modalDojo, global.ModalExample, global.reactDom, global.react, global.modal);
        global.modalView = mod.exports;
    }
})(this, function (exports, _backbone, _modal, _domConstruct, _modalDojo, _ModalExample, _reactDom, _react, _modal3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _modal2 = _interopRequireDefault(_modal);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _modalDojo2 = _interopRequireDefault(_modalDojo);

    var _ModalExample2 = _interopRequireDefault(_ModalExample);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _react2 = _interopRequireDefault(_react);

    var demoJS = _interopRequireWildcard(_modal3);

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

    /* jshint ignore:start */

    function closeOnClick() {
        document.querySelector('ha-modal.show').close();
    }

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate',
            'click .show-modal': 'showModal'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_modal2.default);
            this.renderHTML();
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            Array.prototype.slice.call(this.$('ha-modal footer .ha-button')).forEach(function (button) {
                button.addEventListener('click', closeOnClick);
            });
            return this;
        },

        renderHTML: function renderHTML() {
            var declarativeModalButtonsWrapper = document.createElement('div');

            demoJS.createButton('Show Declarative Large Modal', 'declarative-large-modal', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Large Modal With Endflow', 'declarative-large-modal-endflow', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Medium Modal - One Button', 'declarative-medium-modal-one', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Medium Modal - Two Button', 'declarative-medium-modal-two', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Medium Modal - Three Button', 'declarative-medium-modal-three', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Medium Error Modal', 'declarative-medium-error-modal', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Small Error Modal', 'declarative-small-error-modal', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Small Confirm Modal', 'declarative-small-confirm-modal', declarativeModalButtonsWrapper);
            demoJS.createButton('Show Declarative Small Modal', 'declarative-small-modal', declarativeModalButtonsWrapper);

            this.$el.find('.declarative-wrapper').append(declarativeModalButtonsWrapper);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var modal = _domConstruct2.default.toDom(_modalDojo2.default),
                cloned = modal.cloneNode(true),
                dojoModalButtonsWrapper = document.createElement('div');
            _domConstruct2.default.place(cloned, placeToAppend);

            demoJS.createButton('Show Dojo Large Modal', 'dojo-large-modal', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Large Modal With Endflow', 'dojo-large-modal-endflow', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Medium Modal - One Button', 'dojo-medium-modal-one', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Medium Modal - Two Button', 'dojo-medium-modal-two', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Medium Modal - Three Button', 'dojo-medium-modal-three', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Medium Error Modal', 'dojo-medium-error-modal', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Small Error Modal', 'dojo-small-error-modal', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Small Confirm Modal', 'dojo-small-confirm-modal', dojoModalButtonsWrapper);
            demoJS.createButton('Show Dojo Small Modal', 'dojo-small-modal', dojoModalButtonsWrapper);

            placeToAppend.appendChild(dojoModalButtonsWrapper);
        },

        showModal: function showModal(event) {
            var modalId = event.currentTarget.getAttribute('data-modal-id'),
                modalElement = this.el.ownerDocument.getElementById(modalId);

            modalElement.show();
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            _reactDom2.default.render(_react2.default.createElement(_ModalExample2.default, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=modal.view.js.map
