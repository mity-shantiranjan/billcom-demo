/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./menu-button.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./menubutton.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HAItem from 'hui/react-components/HAItem';
import HAMenuButton from 'hui/react-components/HAMenuButton';
import * as demoJS from './menu-button';

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
        var menuButton = domConstruct.toDom(demoTemplate),
            cloned = menuButton.cloneNode(true);
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
                    <div>
                        <HAMenuButton 
                            placeholder="Choose a method" 
                            label="Same title"
                            onSelect={eventLog} 
                            onItemsShow={eventLog} 
                            onItemsClose={eventLog}
                        >
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HAMenuButton>
                    </div>
					<h3>With Disabled Items</h3>
					<div className="container-disabled-items">
						<HAMenuButton
							placeholder="Choose a method"
							label="Create New"
							className="ha-button-primary"
							onClick={eventLog}
							onSelect={eventLog}
							onItemsShow={eventLog}
							onItemsClose={eventLog}
						>
							<HAItem value="AppleValue" disabled="disabled">Apple</HAItem>
							<HAItem value="BananaValue">Banana</HAItem>
							<HAItem value="BalloonValue">Balloon</HAItem>
						</HAMenuButton>
					</div>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
/* jshint ignore:end */
