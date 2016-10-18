define([
    'backbone',
    'text!./typography.hbs',
    'dojo/dom-construct',
    'text!./typography.dojo.html'
],
    function(Backbone, template, domConstruct, demoTemplate) {
        'use strict';

        var TypographyDemoView = Backbone.View.extend({

            render: function() {
                this.$el.html(template);
                this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                return this;
            },

            renderDojo: function(placeToAppend) {
                var typography = domConstruct.toDom(demoTemplate);
                domConstruct.place(typography, placeToAppend);
            }
        });

        return TypographyDemoView;
    }
);
