/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./trowser.hbs';
import handlebars from 'hbs/handlebars';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./trowser.html';
import demoJS from './trowser';
import TrowserExample from './TrowserExample.react';
import React from 'react';
import ReactDOM from 'react-dom';

var store = {
    query: function() {
        return {
            then: function(callback) {
                callback([
                    {
                        label: 'Apple',
                        value: 'Apple'
                    },
                    {
                        label: 'Banana',
                        value: 'Banana'
                    },
                    {
                        label: 'Balloon',
                        value: 'Balloon'
                    },
                    {
                        label: 'Mellon',
                        value: 'Mellon'
                    }
                ]);
            }
        };
    }
};

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate',
        'click .show-element': 'showElement',
        'click .show-responsive-trowser': 'showResponsiveTrowser'
    },

    navigate: function(evt) {
        this.$('.panel').addClass('hidden');
        this.activePanel = this.$('#' + evt.currentTarget.value)[0];
        this.activePanel.classList.remove('hidden');
    },

    showElement: function(event) {
        var elementName = event.currentTarget.getAttribute('data-target-name'),
            element = this.activePanel[elementName];

        element.show();
    },

    showResponsiveTrowser: function(evt) {
        var trowserElement = document.getElementById('responsive-trowser');

        trowserElement.show();
    },

    render: function() {
        this.renderHTML(template, demoTemplate);
        this.renderJS(this.$('#programmaticWay')[0]);
        this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);

        return this;
    },

    renderDojo: function(placeToAppend) {
        var trowser = domConstruct.toDom(demoTemplate),
            cloned = trowser.cloneNode(true);

        domConstruct.place(cloned, placeToAppend);
        this.parseAttachPoints(this.panels.dojo);
        this.panels.dojo.trowserSelect.store = store;
        this.panels.dojo.trowserTypeAhead.store = store;
        this.registerEventHandlers(this.panels.dojo);
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
            html = compiled({
                componentDemoTemplate: demoTemplate
            });

        this.$el.html(html);
        this.panels = {};

        ['html', 'js', 'dojo', 'react'].forEach(function(panelId) {
            this.panels['$' + panelId] = this.$('#' + panelId);
            this.panels[panelId] = this.panels['$' + panelId][0];
        }, this);

        this.activePanel = this.panels.html;
        this.parseAttachPoints(this.panels.html);
        this.panels.html.trowserTypeAhead.store = store;
        this.registerEventHandlers(this.panels.html);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    parseAttachPoints: function(panel) {
        Array.prototype.forEach.call(panel.querySelectorAll('[data-attach-point]'), function(node) {
            panel[node.getAttribute('data-attach-point')] = node;
        });
    },

    registerEventHandlers: function(panel) {
        [
            { buttonName: 'showDrawerButton', targetName: 'trowserDeclarativeDrawer' },
            { buttonName: 'showErrorModalButton', targetName: 'errorModal' },
            { buttonName: 'showPopover1Button', targetName: 'popover1' },
            { buttonName: 'showPopoverDrawer1Button', targetName: 'popoverDrawer1' },
            { buttonName: 'trowserShowZdrawerButton', targetName: 'zDrawer' },
            { buttonName: 'trowserShowZmodalButton', targetName: 'zModal' },
            { buttonName: 'trowserShowZtrowserButton', targetName: 'declarativeTrowser' },
            { buttonName: 'drawerShowZmodalButton', targetName: 'zModal' },
            { buttonName: 'zModalSkipButton', targetName: 'zModal', method: 'close' },
            { buttonName: 'zModalSkipButton', targetName: 'zModal', method: 'close' },
            { buttonName: 'zModalPrintButton', targetName: 'zModal', method: 'close' },
            { buttonName: 'zDrawerSaveButton', targetName: 'zDrawer', method: 'close' },
            { buttonName: 'closeDrawerButton', targetName: 'trowserDeclarativeDrawer', method: 'close' },
            { buttonName: 'popover1CancelButton', targetName: 'popover1', method: 'close' },
            { buttonName: 'popover1SaveButton', targetName: 'popover1', method: 'close' },
            { buttonName: 'popoverDrawer1CancelButton', targetName: 'popover1', method: 'close' },
            { buttonName: 'popoverDrawer1SaveButton', targetName: 'popover1', method: 'close' }
        ].forEach(function(config) {
            var method = config.method || 'show',
                button = panel[config.buttonName];

            if (button) {
                button.addEventListener('click', function() {
                    panel[config.targetName][method]();
                });
            }
        });
    },

    renderReact: function(placeToAppend) {
        ReactDOM.render(<TrowserExample/>, placeToAppend);
    }

});
/* jshint ignore:end */
