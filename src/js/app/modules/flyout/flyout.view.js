define([
    'backbone',
    'dojo/dom-construct',
    'text!./flyout.hbs',
    'text!./flyout.dojo.html',
    './flyout'
],
    function(Backbone, domConstruct, template, demoTemplate, demoJS) {
        'use strict';

        var FlyoutDemoView = Backbone.View.extend({

            render: function() {
                this.$el.html(template);
                this.renderJS(this.$el.find('#programmaticWay')[0]);
                this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                return this;
            },

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(evt) {
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
            },

            renderDojo: function(placeToAppend) {
                var flyout = domConstruct.toDom(demoTemplate),
                    cloned = flyout.cloneNode(true);
                domConstruct.place(cloned, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }
        });

        return FlyoutDemoView;
    }
);
