/* jshint ignore:start */

import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./drawer.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./drawer-small.html';
import demoJS from './drawer';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.renderHTML(template);
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#dojo')[0]);
        this.addEventListeners();
        this.relocateDrawers();

        return this;
    },

    addEventListeners: function(panelIds) {
        let self = this;

        ["html", "dojo", "js"].forEach(panelId => {
            let button = self.$el.find("#" + panelId + " .ha-button")[0];
            button.onclick = () => {
                let drawer = self.$el.find("#" + panelId + " ha-drawer-small")[0];
                drawer.show();
            };
        });
    },

    renderHTML: function(template) {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderDojo: function(placeToAppend, placeToAppendDrawerSmall) {
        var drawer = domConstruct.toDom(demoTemplate),
            cloned1 = drawer.cloneNode(true);

        domConstruct.place(cloned1, placeToAppend);
    },

    relocateDrawers: function() {
        let drawer,
            panel;

        ["html", "dojo"].forEach(panelId => {
            panel = this.$el.find("#" + panelId + ".panel")[0];
            drawer = this.$el.find("#" + panelId + " ha-drawer-small")[0];
            panel.appendChild(drawer);
        });
    },

    renderJS: function(placeToAppend) {
        demoJS.renderSmallDrawer(placeToAppend, this.el);
    }
});

/* jshint ignore:end */
