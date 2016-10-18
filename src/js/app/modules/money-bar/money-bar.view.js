define([
    'backbone',
    'text!./money-bar.hbs',
    'text!./money-bar.html',
    './money-bar',
    'hbs/handlebars'
], function(Backbone, template, demoTemplate, demoJS, handlebars) {
        'use strict';

        var MoneyBarView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            render: function() {
                // this.$el.html(template);
                this.renderHTML(template, demoTemplate);
                this.renderJS(this.$el.find('#programmaticWay')[0]);
                return this;
            },

            navigate: function(evt) {
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
            },

            renderHTML: function(template, demoTemplate) {
                var compiled = handlebars.compile(template),
                    html = compiled({componentDemoTemplate: demoTemplate});

                this.$el.html(html);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }

        });

        return MoneyBarView;
    }
);
