/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./combo-link.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./combolink.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HAItem from 'hui/react-components/HAItem';
import HAComboLink from 'hui/react-components/HAComboLink';
import * as demoJS from './combo-link';

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
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);
        return this;
    },

    renderDojo: function(placeToAppend) {
        var comboLink = domConstruct.toDom(demoTemplate),
            cloned = comboLink.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
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
                        <h3>Common Combo Link</h3>
                        <HAComboLink 
                            placeholder="Choose a method" 
                            label="Combo Link One"
                            onClick={eventLog} 
                            onSelect={eventLog} 
                            onItemsShow={eventLog} 
                            onItemsClose={eventLog}
                        >
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                        </HAComboLink>
						<h3>With Disabled Item</h3>
						<HAComboLink
                            placeholder="Choose a method" 
							label="Combo Link One"
                            onClick={eventLog} 
                            onSelect={eventLog} 
                            onItemsShow={eventLog} 
                            onItemsClose={eventLog}
						>
							<HAItem value="AppleValue" disabled="disabled">Apple</HAItem>
							<HAItem value="BananaValue">Banana</HAItem>
							<HAItem value="BalloonValue">Balloon</HAItem>
						</HAComboLink>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
/* jshint ignore:end */
