/* jshint ignore:start */

import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./checkbox.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./checkbox.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HACheckbox from 'hui/react-components/HACheckbox';
import HACheckboxGroup from 'hui/react-components/HACheckboxGroup';
import * as demoJS from './checkbox';

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
        this.renderDojo(this.$el.find("#dojoProgrammaticWay")[0]);
        this.renderReact(this.$('#reactWay')[0]);

        return this;
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderDojo: function(placeToAppend) {
        var checkbox = domConstruct.toDom(demoTemplate),
            cloned = checkbox.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        class ExampleComponent extends React.Component {
            constructor (props) {
                super(props);

                this.state = {
                    showFruits: true
                };

                this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
                this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
            }

            _onToggleCallback () {
                this.setState({
                    showFruits: !this.state.showFruits
                })
            }

            render () {
                var onToggleCallback = this._onToggleCallback.bind(this),
                    keyId = 0,
                    items = this.state.showFruits ? this._fruits : this._vegetables,
                    rows = items.map((item, i)=> {
                        let itemValue = item + "Value";
                        return <HACheckbox key={i} label={item} value={itemValue}></HACheckbox>
                    });

                return (
                    <div>
                        <HACheckboxGroup name="Checkbox Group" label="Checkbox Group" onChange={eventLog} onClick={eventLog}>
                            <HACheckbox key={keyId++} label="Enabled Checkbox"></HACheckbox>
                            <HACheckbox key={keyId++} label="Enabled Checkbox (default checked)" checked onChange={eventLog} onClick={eventLog}></HACheckbox>
                            <HACheckbox key={keyId++} label="Disabled Checkbox" disabled></HACheckbox>
                            <HACheckbox key={keyId++} label="Disabled Checkbox (default checked)" disabled checked></HACheckbox>
                        </HACheckboxGroup>

                        <h3 className="subtitle"></h3>

                        <HACheckboxGroup name="Checkbox Group" label="Checkbox Group with a minimum amount of checked elements >= 2" minrequired={2} required={true}>
                            <HACheckbox key={keyId++} label="Enabled Checkbox"></HACheckbox>
                            <HACheckbox key={keyId++} label="Enabled Checkbox (default checked)" checked></HACheckbox>
                            <HACheckbox key={keyId++} label="Disabled Checkbox" disabled></HACheckbox>
                            <HACheckbox key={keyId++} label="Disabled Checkbox (default checked)" disabled checked></HACheckbox>
                            <HACheckbox key={keyId++} label="With Value OFF" value="off"></HACheckbox>
                            <HACheckbox key={keyId++} label=""></HACheckbox>
                            <HACheckbox key={keyId++} label="" checked></HACheckbox>
                        </HACheckboxGroup>

                        <HACheckboxGroup name="Checkbox Group" label="Required Checkbox Group No Indicator" required={true} noRequiredIndicator>
                            <HACheckbox key={keyId++} label="Checkbox 1"></HACheckbox>
                            <HACheckbox key={keyId++} label="Checkbox 2"></HACheckbox>
                        </HACheckboxGroup>
                        <HACheckboxGroup name="Checkbox Group" label="Required Checkbox Group" required={true}>
                            <HACheckbox key={keyId++} label="Checkbox 1"></HACheckbox>
                            <HACheckbox key={keyId++} label="Checkbox 2"></HACheckbox>
                        </HACheckboxGroup>
                        <button className="ha-button ha-button-primary js-validate">Validate</button>

                        <h3 className="subtitle">Checkbox Group with ha-inline class</h3>

                        <HACheckboxGroup className="ha-inline" name="Checkbox Group" label="Checkbox Group">
                            <HACheckbox key={keyId++} label="Enabled Checkbox"></HACheckbox>
                            <HACheckbox key={keyId++} label="Enabled Checkbox (default checked)" checked></HACheckbox>
                            <HACheckbox key={keyId++} label="Disabled Checkbox" disabled></HACheckbox>
                        </HACheckboxGroup>

                        <h2>HACheckboxGroup checkbox mutations dont work</h2>
                        <HACheckboxGroup name="Checkbox Group" label="Checkbox Group">
                            {rows}
                        </HACheckboxGroup>
                        <div className="widget">
                            <button className="ha-button ha-button-primary" onClick={onToggleCallback}>Toggle Fruit & Vegetables</button>
                        </div>
                        <div>
                            The content of the checkboxes should change from fruits to vegetables.
                            <br/>
                        </div>
                    </div>
                );
            }
        }
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});

/* jshint ignore:end */
