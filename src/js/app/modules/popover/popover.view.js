define([
    'backbone',
    'text!./popover.hbs',
    'dojo/dom-construct',
    'text!./popover.html',
    './popover',
    'hbs/handlebars'
],
    function(Backbone, template, domConstruct, demoTemplate, demoJS, handlebars) {
        'use strict';

        var PopoverDemoView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate',
                'click .show-popover': 'showPopover',
                'change .customer-select': 'handleSelect'
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

            renderDojo: function(placeToAppend) {
                var popover = domConstruct.toDom(demoTemplate),
                    cloned = popover.cloneNode(true);
                domConstruct.place(cloned, placeToAppend);
            },

            renderHTML: function(template, demoTemplate) {
                var compiled = handlebars.compile(template),
                    html = compiled({componentDemoTemplate: demoTemplate});

                this.$el.html(html);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            },

            handleSelect: function(event) {
                if (event.target.value) {
                    this.showPopover(event);
                }
            },

            showPopover: function(event) {
                var button = event.target;

                if (!button.__popover) {
                    button.__popover = button.nextElementSibling;
                }

                button.__popover.show();
            }
        });

        return PopoverDemoView;
    }
);
