/* jshint ignore:start */

import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./drawer.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./drawer-large.html';
import demoJS from './drawer';
import React from 'react';
import ReactDOM from 'react-dom';
import DrawerExample from './DrawerExample.react';
import codeSample from '../util/codeSample';
import declarativeUsage from 'text!./drawer-large-declarative-usage.html';

function addButtons(wrapper, id) {
    var drawer = wrapper.querySelector('.declarative-drawer'),
        drawerNoOverlay = wrapper.querySelector('.declarative-drawer-wo-overlay'),
        drawerButton,
        drawerNoOverlayButton;

    drawer.id = id + '-drawer';
    drawerNoOverlay.id = id + '-drawer-no-overlay';

    drawerButton = demoJS.createButton(
        'Show Drawer Large',
        drawer.id,
        wrapper,
        drawer
    );

    drawerNoOverlayButton = demoJS.createButton(
        'Show Drawer Large Without Overlay',
        drawerNoOverlay.id,
        wrapper,
        drawerNoOverlay
    );
}

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate',
        'click .show-drawer-large': 'showDrawer',
        'click button.close-button': 'closeDrawer'
    },

    closeAll: function(target) {
        var drawersLarge = this.el.ownerDocument.querySelectorAll('ha-drawer-large'),
            targetId = target.getAttribute('data-drawer-id');

        Array.prototype.forEach.call(drawersLarge, function(drawer) {
            if (drawer.id !== targetId) {
                drawer.close();
            }
        });
    },

    closeAllDrawers: function() {
        this._drawers.forEach(function(drawer) {
            drawer.close();
        });
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');

        this.closeAllDrawers();
    },

    render: function() {
        this.renderHTML(template, demoTemplate);
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#dojo')[0]);
        this.renderReact(this.$('#reactWay')[0]);

        this._drawers = Array.prototype.slice.call(this.el.querySelectorAll('ha-drawer-large'));

        return this;
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
            html = compiled({
                componentDemoTemplate: demoTemplate,
                declarativeUsage: codeSample.fromString(declarativeUsage)
            });

        this.$el.html(html);
        addButtons(this.el.querySelector('#html > div.left-content > section.examples'), 'html');
    },

    renderDojo: function(placeToAppend) {
        var drawer = domConstruct.toDom(demoTemplate),
            cloned1 = drawer.cloneNode(true);

        domConstruct.place(cloned1, placeToAppend);
        addButtons(placeToAppend, 'dojo');
    },

    closeDrawer: function(event) {
        var drawerId = event.currentTarget.getAttribute('data-drawer-id'),
            drawerElement = this.el.ownerDocument.getElementById(drawerId);

        drawerElement.close();
    },

    showDrawer: function(event) {
        var drawerId = event.currentTarget.getAttribute('data-drawer-id'),
            drawerElement = this.el.ownerDocument.getElementById(drawerId);

        this.closeAll(event.target);
        drawerElement.show();
    },

    onClose: function() {
        this.closeAllDrawers();
    },

    renderJS: function(placeToAppend) {
        demoJS.renderLargeDrawer(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        ReactDOM.render(<DrawerExample/>, placeToAppend);
    }
});

/* jshint ignore:end */
