import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./label.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./label.html';
import demoJS from './label';
import React from 'react';
import ReactDOM from 'react-dom';
import {HATextField, HATextarea, HACheckboxGroup, HACheckbox, HARadioButtonGroup, HARadioButton, HALabel, HASelect, HAItem} from 'hui/react-components/index';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.renderHTML();
        this.renderJS(this.$el.find('#programmaticWay')[0], this.$el.find('#html')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#html')[0]);
        this.renderReact(this.$el.find('#reactWay')[0], this.$el.find('#html')[0]);
        return this;
    },

    renderHTML: function () {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderDojo: function(placeToAppend) {
        var label = domConstruct.toDom(demoTemplate),
            cloned = label.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function (placeToAppend) {
        var ExampleComponent = React.createClass({
            render: function () {
                return (
                    <div>
                        <div>
                        <HATextField>
                            <HALabel>
                                I am <strong> HALabel </strong> <small> that overwrites default </small><span>label</span>
                            </HALabel>
                        </HATextField>
                        </div>
                        <div>
                        <HATextarea>
                            <HALabel>
                                I am <strong> HALabel </strong> <small> that overwrites default </small><span>label</span>
                            </HALabel>
                        </HATextarea>
                        </div>
                        <div>
                        <HASelect placeholder="Choose an item">
                            <HALabel>
                                I am <strong> HALabel </strong> <small> that overwrites default label</small>
                            </HALabel>
                            <HAItem value="AppleValue">Apple</HAItem>
                            <HAItem value="BananaValue">Banana</HAItem>
                            <HAItem value="BalloonValue">Balloon</HAItem>
                            <HAItem value="MelonValue">Melon</HAItem>
                        </HASelect>
                        </div>
                        <div>
                        <HACheckboxGroup name="Declarative Checkbox Group">
                            <HALabel>
                                I am <strong> HALabel </strong> <small> that overwrites default label</small>
                            </HALabel>
                            <HACheckbox value="1" name="Enabled-Checkbox" label="Enabled Checkbox"></HACheckbox>
                            <HACheckbox value="2" name="Enabled-Checkbox-Default" label="Enabled Checkbox (default checked)" checked></HACheckbox>
                            <HACheckbox value="3" name="Disabled-Checkbox" label="Disabled Checkbox" disabled></HACheckbox>
                            <HACheckbox name="Enabled-Checkbox-Default" label="Disabled Checkbox (default checked)"  value="4" checked disabled></HACheckbox>
                            <HACheckbox value="off" label="With value OFF"></HACheckbox>
                            <HACheckbox value="5"></HACheckbox>
                            <HACheckbox value="6" checked></HACheckbox>
                        </HACheckboxGroup>
                        </div>
                        <div>
                        <HARadioButtonGroup>
                            <HALabel>
                                I am <strong> HALabel </strong> <small> that overwrites default label</small>
                            </HALabel>
                            <HARadioButton label="Radio 1" value="1"></HARadioButton>
                            <HARadioButton label="Radio 2" value="2"></HARadioButton>
                            <HARadioButton label="Radio 3" value="3"></HARadioButton>
                        </HARadioButtonGroup>
                        </div>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
