/* jshint ignore:start */
import Backbone from 'backbone';
import template from 'text!./textfield.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./textfield.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HATextField from 'hui/react-components/HATextField';
import demoJS from './textfield'

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

        Array.prototype.forEach.call(this.el.querySelectorAll('.with-error'), function(textField) {
            if (textField._upgraded) {
                textField.reportValidity();
            } else {
                textField.addEventListener('component-upgraded', function() {
                    textField.reportValidity();
                });
            }
        });

        return this;
    },

    renderDojo: function(placeToAppend) {
        var textField = domConstruct.toDom(demoTemplate),
            cloned = textField.cloneNode(true);
        demoJS._appendChildWithWrapper(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        var aFunc = function() {
            console.log(this.element.value);
            console.log('VALIDATOR HIT!!!!!!!!');
            return true;
        };

        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        var ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <h3>Enabled</h3>
                        <HATextField label="Name"></HATextField>
                        <HATextField
                            label="Name with Placeholder"
                            placeholder="Your name">
                        </HATextField>
                        <HATextField
                            label="Name with Value"
                            value="Default Text">
                        </HATextField>
                        <HATextField
                            placeholder="No Label">
                        </HATextField>
                        <h3>Disabled</h3>
                        <HATextField
                            label="Disabled Name"
                            disabled={true}>
                        </HATextField>
                        <HATextField
                            label="Disabled Name with Placeholder"
                            disabled={true}
                            placeholder="Your name">
                        </HATextField>
                        <h3>With Error</h3>
                        <HATextField
                            label="With error"
                            className="with-error"
                            required={true}>
                        </HATextField>
                        <h3>Required</h3>
                        <HATextField
                            label="Required Field"
                            required={true}
                            requiredMessage="ITS WORKING!!!">
                        </HATextField>
                        <h3>Required No Indicator</h3>
                        <HATextField
                            label="Required Field"
                            required={true}
                            noRequiredIndicator={true}
                            requiredMessage="ITS WORKING!!!">
                        </HATextField>
                        <HATextField
                            placeholder="No Label Required"
                            required={true}
                            requiredMessage="ITS WORKING!!!">
                        </HATextField>
                        <h3>Optional</h3>
                        <HATextField
                            label="Optional Field"
                            labelOptional="optional"
                            optional={true}>
                        </HATextField>
                        <h3>Pattern</h3>
                        <HATextField
                            label="Pattern Field"
                            pattern="[abc]"
                            invalidMessage='thats not right...'
                            validator={aFunc}>
                        </HATextField>
                        <h3>With Icon</h3>
                        <HATextField
                            label="Name"
                            icon="hi-search">
                        </HATextField>
                        <HATextField
                            label="Name with Placeholder"
                            icon="hi-search"
                            placeholder="Your name">
                        </HATextField>
                        <HATextField
                            label="Name with Value"
                            icon="hi-search"
                            value="Default text">
                        </HATextField>
                        <h3>Events</h3>
                        <HATextField
                            label="On Change"
                            onChange={eventLog}
                            onInput={eventLog}>
                        </HATextField>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});

/* jshint ignore:end */
