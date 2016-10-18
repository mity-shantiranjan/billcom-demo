/* jshint ignore:start */
import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./select.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./select.html';
import dojoDemoTemplate from 'text!./select.dojo.html';
import demoJS from './select';
import React from 'react';
import ReactDOM from 'react-dom';
import HAItem from 'hui/react-components/HAItem';
import HASelect from 'hui/react-components/HASelect';
import loremIpsum from '../util/loremIpsum';

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
        this.renderJS(this.el.querySelector('#js .examples'));
        this.renderDojo(dojoDemoTemplate, this.el.querySelector('#dojo .examples'));
        this.renderReact(this.el.querySelector('#react .examples'));

        return this;
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderJS: function(el) {
        demoJS.render(el);
    },

    renderDojo: function(template, el) {
        var component = domConstruct.toDom(template),
            cloned = component.cloneNode(true);
        domConstruct.place(cloned, el);
    },

    renderReact: function(placeToAppend) {
        var eventLog = function(e) {
                console.log(`${e.target.tagName} ${e.type} fired`);
            },
            longText = loremIpsum();

        var ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <h3>Default</h3>
                        <HASelect onChange={eventLog} onClick={eventLog} onAddNew={eventLog} data-automation-id="react-ha-select-default">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Placeholder</h3>
                        <HASelect placeholder="Choose an item" data-automation-id="react-ha-select-with-placeholder">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Label</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" data-automation-id="react-ha-select-with-label">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>Disabled</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" disabled data-automation-id="react-ha-select-disabled">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Disabled Item</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" data-automation-id="react-ha-select-item-disabled">
                            <HAItem value="AppleValue" disabled="disabled">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Value Selected</h3>
                        <HASelect label="Some Label" value="BananaValue" data-automation-id="react-ha-select-value-selected">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Required Validation</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" required data-automation-id="react-ha-select-required">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Required Validation No Indicator</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" required noRequiredIndicator={true} data-automation-id="react-ha-select-no-required-indicator">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Add New</h3>
                        <HASelect label="Some Label" onAddNew={eventLog} addNew="true" placeholder="Choose an item" data-automation-id="react-ha-select-with-add-new">
                            <ha-popover>
                                <ha-popover-form addNewNameSelector="#addNewName">
                                    <section>
                                        <ha-text-field label="Name" id="addNewName"></ha-text-field>
                                    </section>
                                    <footer>
                                        <button className="ha-button ha-button-primary no-connector">Save</button>
                                        <button className="ha-button ha-button-secondary no-connector">Cancel</button>
                                    </footer>
                                </ha-popover-form>
                            </ha-popover>
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Icon</h3>
                        <HASelect label="Some Label" placeholder="Choose an item" icon="hi-filter" data-automation-id="react-ha-select-with-icon">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>

                        <h3>With Wrapping Items</h3>
                        <HASelect data-automation-id="react-ha-select-items-wrapping">
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                            <HAItem value={longText}>{longText}</HAItem>
                            <HAItem value={longText}>{longText}</HAItem>
                        </HASelect>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
/* jshint ignore:end */
