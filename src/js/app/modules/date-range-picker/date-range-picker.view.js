define([
        'backbone',
        'text!./date-range-picker.hbs',
        'dojo/dom-construct',
        'text!./date-range-picker.dojo.html',
        './date-range-picker'
],
    function(Backbone, template, domConstruct, demoTemplate, demoJS) {
        'use strict';

        var DatePickerDemoView = Backbone.View.extend({

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
                demoJS.blackoutDates(this.el);

                return this;
            },

            renderDojo: function(placeToAppend) {
                var dateRangePicker = domConstruct.toDom(demoTemplate),
                    cloned = dateRangePicker.cloneNode(true);
                demoJS._appendChildWithWrapper(cloned, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }

        });

        return DatePickerDemoView;
    }
);
