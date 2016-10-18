define([
    'backbone',
    'text!./numeric-badge.hbs',
    'dojo/dom-construct',
    'text!./numeric-badge.dojo.html'
],
    function(Backbone, template, domConstruct, demoTemplate) {
        'use strict';

        var NumericBadgesDemoView = Backbone.View.extend({

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
                var numericBadges = domConstruct.toDom(demoTemplate);
                domConstruct.place(numericBadges, placeToAppend);
            }
        });

        return NumericBadgesDemoView;
    }
);
