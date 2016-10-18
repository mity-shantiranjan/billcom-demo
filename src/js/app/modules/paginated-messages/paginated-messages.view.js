define([
    'backbone',
    'text!./paginated-messages.hbs',
    'dojo/dom-construct',
    'text!./paginatedmessages.html',
    './paginated-messages',
    'hbs/handlebars'
],
    function(Backbone, template, domConstruct, demoTemplate, demoJS, handlebars) {
        'use strict';

        var PaginatedMessagesView = Backbone.View.extend({

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
                return this;
            },

            renderHTML: function(template, demoTemplate) {
                var compiled = handlebars.compile(template),
                    html = compiled({componentDemoTemplate: demoTemplate});

                this.$el.html(html);
            },

            renderDojo: function(placeToAppend) {
                var paginatedMessages = domConstruct.toDom(demoTemplate),
                    cloned = paginatedMessages.cloneNode(true);
                domConstruct.place(cloned, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }
        });

        return PaginatedMessagesView;
    }
);
