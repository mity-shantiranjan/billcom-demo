import Backbone from 'backbone';
import template from 'text!./stacked-page-messages.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./stacked-page-messages.html';
import demoJS from './stacked-page-messages';
import handlebars from 'hbs/handlebars';
import React from 'react';
import ReactDOM from 'react-dom';
import HAPageMessage from 'hui/react-components/HAPageMessage';
import HAStackedPageMessages from 'hui/react-components/HAStackedPageMessages';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate',
        'click .close-alert': 'onCloseAlert'
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
        var stackedPageMessages = domConstruct.toDom(demoTemplate),
            cloned = stackedPageMessages.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    onCloseAlert: function() {
        this.$el
            .find('.panel:not(.hidden) ha-stacked-page-messages > ha-page-message[type=error]')[0]
            .close();
    },

    renderReact: function(placeToAppend) {
        var ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <HAStackedPageMessages>
                        <HAPageMessage titleText="Error Title" type="error" dismissible={false}>
                            The contents of this message should focus on what the user needs to do to fix the
                            error instead of just stating what went wrong. Fields related to this error should be highlighted and accomplanied by the appropiate inline error message.
                        </HAPageMessage>
                        <HAPageMessage titleText="Warn Title" type="warn" dismissible={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </HAPageMessage>
                        <HAPageMessage titleText="Info Title" type="info" dismissible={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </HAPageMessage>
                        </HAStackedPageMessages>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});

