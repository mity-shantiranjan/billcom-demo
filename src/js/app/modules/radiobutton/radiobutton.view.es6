/* jshint ignore:start */

import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./radiobutton.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./radiobutton.html';
import demoJS from './radiobutton';
import React from 'react';
import ReactDOM from 'react-dom';
import HARadioButton from 'hui/react-components/HARadioButton';
import HARadioButtonGroup from 'hui/react-components/HARadioButtonGroup';

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
        this.renderDojo(demoTemplate, this.el.querySelector('#dojo .examples'));
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
        class ExampleComponent extends React.Component {
            constructor (props) {
                super(props);

                this.state = {
                    showFruits: true
                };

                this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
                this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
            }

            render() {
                var onToggleCallback = this._onToggleCallback.bind(this),
                    items = this.state.showFruits ? this._fruits : this._vegetables,
                    keyId = 0,
                    rows = items.map((item, i)=> {
                        let itemValue = item + "Value";
                        return <HARadioButton key={i} label={item} value={itemValue}></HARadioButton>
                    });

                return (
                    <div>
                        <h3>Default</h3>
                        <HARadioButtonGroup onChange={this.eventLog} onClick={this.eventLog}>
                            <HARadioButton key={keyId++} label="Radio 1" value="1" onChange={this.eventLog} onClick={this.eventLog}></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>With Label</h3>
                        <HARadioButtonGroup label="Some Label">
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>With name attribute</h3>
                        <HARadioButtonGroup label="Some Label" name="radioWithName">
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>First Radio Button Disabled</h3>
                        <HARadioButtonGroup label="Some Label">
                            <HARadioButton key={keyId++} label="Radio 1" value="1" disabled></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>With Default Value (should check Radio 1)</h3>
                        <HARadioButtonGroup label="Some Label" value="1">
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>With checked attribute on First Radio Button</h3>
                        <HARadioButtonGroup label="Some Label">
                            <HARadioButton key={keyId++} label="Radio 1" value="1" checked={true}></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2" checked={false}></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3" checked={false}></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>Inline</h3>
                        <HARadioButtonGroup className="ha-inline" label="Some Label">
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>

                        <h3>With Expected Validation (expected to select Radio 2)</h3>
                        <HARadioButtonGroup label="Some Label" expected="2" required>
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>
                        <button className="ha-button" onClick={this.validateExpected}>Trigger Validation</button>

                        <h3>With Required Validation No Indicator</h3>
                        <HARadioButtonGroup label="Some Label" required noRequiredIndicator={true}>
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>
                        <button className="ha-button" onClick={this.validateExpected}>Trigger Validation</button>

                        <h3>With Required Validation</h3>
                        <HARadioButtonGroup label="Some Label" required>
                            <HARadioButton key={keyId++} label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton key={keyId++} label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>
                        <button className="ha-button" onClick={this.validateExpected}>Trigger Validation</button>

                        <h3>HARadioButtonGroup radio button mutations dont work</h3>
                        <HARadioButtonGroup name="Radio Button Group" label="Radio Button Group">
                            {rows}
                        </HARadioButtonGroup>
                        <div className="widget">
                            <button className="ha-button ha-button-primary" onClick={onToggleCallback}>Toggle Fruit & Vegetables</button>
                        </div>
                        <div>
                            The content of the radio buttons should change from fruits to vegetables.
                            <br/>
                        </div>
                    </div>
                );
            }

            validateExpected() {
                console.log('Using ref did not work, will ask around');
            }

            eventLog(e) {
                console.log(`${e.target.tagName} ${e.type} fired`);
            }

            _onToggleCallback () {
                this.setState({
                    showFruits: !this.state.showFruits
                })
            }
        }

        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
