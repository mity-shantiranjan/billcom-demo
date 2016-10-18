/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./combo-button.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./combobutton.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HAItem from 'hui/react-components/HAItem';
import HAComboButton from 'hui/react-components/HAComboButton';
import * as demoJS from './combo-button';

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
        var comboButton = domConstruct.toDom(demoTemplate),
            cloned = comboButton.cloneNode(true);
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
                        <div className="container-combo-buttons">
                            <HAComboButton
                                placeholder="Choose a method"
                                label="Create New"
                                className="ha-button-primary"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                disabled
                                data-automation-id="react_cmbtn_primary_disabled"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                            <HAComboButton
                                placeholder="Choose a method"
                                label="Create New"
                                className="ha-button-primary"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                data-automation-id="react_cmbtn_primary"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                            <HAComboButton
                                placeholder="Choose a method"
                                label="Create New"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                disabled
                                data-automation-id="react_cmbtn_secondary_disabled"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                            <HAComboButton
                                placeholder="Choose a method"
                                label="Create New"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                data-automation-id="raect_cmbtn_secondary"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                        </div>
                        <div className="content-dark">
                            <HAComboButton
                                placeholder="Choose a method"
                                className="ha-button-dark"
                                label="Create New"
                                disabled
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                data-automation-id="react_cmbtn_dark_disabled"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                            <HAComboButton
                                placeholder="Choose a method"
                                className="ha-button-dark"
                                label="Create New"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                data-automation-id="raect_cmbtn_dark"
                            >
                                <HAItem value="AppleValue">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
                        </div>
						<h3>With Disabled Items</h3>
						<div className="container-disabled-items">
							<HAComboButton
                                placeholder="Choose a method"
                                label="Create New"
                                className="ha-button-primary"
                                onClick={eventLog}
                                onSelect={eventLog}
                                onItemsShow={eventLog}
                                onItemsClose={eventLog}
                                data-automation-id="react_cmbtn_primary_item_disabled"
							>
                                <HAItem value="AppleValue" disabled="disabled">Apple</HAItem>
                                <HAItem value="BananaValue">Banana</HAItem>
                                <HAItem value="BalloonValue">Balloon</HAItem>
                            </HAComboButton>
						</div>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
/* jshint ignore:end */
