/* jshint ignore:start */

import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./switch-button.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./switch-button.html';
import ReactDOM from 'react-dom';
import React from 'react';
import * as demoJS from './switch-button';
import SwitchButtonDemo from './SwitchButtonDemo.react';

export default Backbone.View.extend({
    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.renderHTML(template, demoTemplate);
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);
        return this;
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderDojo: function(placeToAppend) {
        var switchButton = domConstruct.toDom(demoTemplate),
            cloned = switchButton.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        ReactDOM.render(<SwitchButtonDemo/>, placeToAppend);
    }
});

/* jshint ignore:end */
