/* jshint ignore:start */

import Backbone from 'backbone';
import template from 'text!./textarea.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./textarea.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HATextarea from 'hui/react-components/HATextarea';
import * as demoJS from './textarea';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.$el.html(template);
        this.renderJS(this.$('#programmaticWay')[0]);
        this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);

        Array.prototype.forEach.call(this.el.querySelectorAll('.with-error'), function(textArea) {
            if (textArea._upgraded) {
                textArea.reportValidity();
                textArea.value = '\n\n\n';
                textArea.value = '';
            } else {
                textArea.addEventListener('component-upgraded', function() {
                    textArea.reportValidity();
                    textArea.value = '\n\n\n';
                    textArea.value = '';
                });
            }
        });

        return this;
    },

    renderDojo: function(placeToAppend) {
        var textArea = domConstruct.toDom(demoTemplate),
            cloned = textArea.cloneNode(true);
        demoJS._appendChildWithWrapper(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        var ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <HATextarea label="Name" onChange={eventLog} onInput={eventLog}></HATextarea>
                        <HATextarea label="Name" placeholder="Your Name"></HATextarea>
                        <HATextarea label="Name" required></HATextarea>
                        <HATextarea label="Name" disabled required></HATextarea>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});

/* jshint ignore:end */
