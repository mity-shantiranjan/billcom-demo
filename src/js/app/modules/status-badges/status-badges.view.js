define([
    'backbone',
    'text!./status-badges.hbs',
    'dojo/dom-construct',
    'text!./status-badges.dojo.html'
],
    function(Backbone, template, domConstruct, demoTemplate) {
        'use strict';

        var BadgesDemoView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(evt) {
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
            },

            render: function() {
                this.$el.html(template);
                this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
                return this;
            },

            renderDojo: function(placeToAppend) {
                var badges = domConstruct.toDom(demoTemplate);
                domConstruct.place(badges, placeToAppend);
            }
        });

        return BadgesDemoView;
    }
);
