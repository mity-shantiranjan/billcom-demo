/* jshint ignore:start */

import Backbone from 'backbone';
import template from 'text!./modal.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./modal.dojo.html';
import ModalExample from './ModalExample.react';
import ReactDOM from 'react-dom';
import React from 'react';
import * as demoJS from './modal';

function closeOnClick() {
    document.querySelector('ha-modal.show').close();
}

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate',
        'click .show-modal': 'showModal'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.$el.html(template);
        this.renderHTML();
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);
        Array.prototype.slice.call(this.$('ha-modal footer .ha-button')).forEach(function(button) {
            button.addEventListener('click', closeOnClick);
        });
        return this;
    },

    renderHTML: function() {
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

    renderDojo: function(placeToAppend) {
        var modal = domConstruct.toDom(demoTemplate),
            cloned = modal.cloneNode(true),
            dojoModalButtonsWrapper = document.createElement('div');
        domConstruct.place(cloned, placeToAppend);

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

    showModal: function(event) {
        var modalId = event.currentTarget.getAttribute('data-modal-id'),
            modalElement = this.el.ownerDocument.getElementById(modalId);

        modalElement.show();
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        ReactDOM.render(<ModalExample/>, placeToAppend);
    }
});

/* jshint ignore:end */
