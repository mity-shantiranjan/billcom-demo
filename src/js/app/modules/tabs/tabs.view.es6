
/* jshint ignore:start */

import Backbone from 'backbone';
import template from 'text!./tabs.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./tabs.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HATabs  from 'hui/react-components/HATabs';
import HATab from 'hui/react-components/HATab';
import * as demoJS from './tabs';
import handlebars from 'hbs/handlebars';

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
        this.renderReact(this.$el.find('#reactWay')[0]);
        return this;
    },

    renderHTML: function(template, demoTemplate) {
        var compiled = handlebars.compile(template),
        html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderDojo: function(placeToAppend) {
        var tabs = domConstruct.toDom(demoTemplate),
            cloned = tabs.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {

        class ExampleStageComponent extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                return (
                    <div>
                        <h3 className="subtitle">Horizontal Tabs</h3>
                        <HATabs>
                            <HATab titleText="Adjustments">
                                <h4>Tab Content 1</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                            <HATab titleText="Mappings">
                                <h4>Tab Content 2</h4>
                                <p>No focusable elements here</p>
                            </HATab>
                            <HATab titleText="Send To Taxes">
                                <h4>Tab Content 3</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                        </HATabs>

                        <h3 className="subtitle">Horizontal Tabs With Icons</h3>
                        <HATabs>
                            <HATab titleText="Adjustments" icon="hi-settings-o">
                                <h4>Tab Content 1</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                            <HATab titleText="Mappings" icon="hi-duplicate">
                                <h4>Tab Content 2</h4>
                                <p>No focusable content here</p>
                            </HATab>
                            <HATab titleText="Send To Taxes" icon="hi-reconcile">
                                <h4>Tab Content 3</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                        </HATabs>

                        <h3 className="subtitle">Horizontal Tabs With Badges</h3>
                        <HATabs>
                            <HATab titleText="Messages"
                                   badgeClass="ha-numeric-badge"
                                   badgeText="1337">
                                <h4>Tab Content 1</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                            <HATab titleText="Invoices"
                                   badgeClass="ha-numeric-badge ha-inverse"
                                   badgeText="42">
                                <h4>Tab Content 2</h4>
                                <p>No focusable elements here</p>
                            </HATab>
                            <HATab titleText="Status"
                                   badgeClass="ha-text-badge ha-warn"
                                   badgeText="Overdue">
                                <h4>Tab Content 3</h4>
                                <div className="form-control">
                                    <ha-text-field label="name"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="lastname"></ha-text-field>
                                </div>
                                <div className="form-control">
                                    <ha-text-field label="email"></ha-text-field>
                                </div>
                                <div>
                                    <button>Save</button>
                                </div>
                            </HATab>
                        </HATabs>

                        <h3 className="subtitle">Horizontal Tabs Without Button on Mobile</h3>
                        <HATabs>
                            <HATab useTabButton="false" titleText="Adjustments">
                            <h4>Tab Content 1</h4>
                            <div className="form-control">
                                <ha-text-field label="name"></ha-text-field>
                            </div>
                            <div className="form-control">
                                <ha-text-field label="lastname"></ha-text-field>
                            </div>
                            <div className="form-control">
                                <ha-text-field label="email"></ha-text-field>
                            </div>
                            <div>
                                <button>Save</button>
                            </div>
                            </HATab>
                            <HATab titleText="Mappings">
                            <h4>Tab Content 2</h4>
                            <p>No focusable elements here</p>
                            </HATab>
                            <HATab titleText="Send To Taxes">
                            <h4>Tab Content 3</h4>
                            <div className="form-control">
                                <ha-text-field label="name"></ha-text-field>
                            </div>
                            <div className="form-control">
                                <ha-text-field label="lastname"></ha-text-field>
                            </div>
                            <div className="form-control">
                                <ha-text-field label="email"></ha-text-field>
                            </div>
                            <div>
                                <button>Save</button>
                            </div>
                            </HATab>
                        </HATabs>
                    </div>
                );
            }
        }

        ReactDOM.render(<ExampleStageComponent/>, placeToAppend);
    }
});

/* jshint ignore:end */
