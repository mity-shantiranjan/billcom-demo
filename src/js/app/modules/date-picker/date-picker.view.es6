import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import HADatePicker from 'hui/react-components/HADatePicker';
import template from 'text!./date-picker.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./date-picker.dojo.html';
import * as demoJS from './date-picker';
import * as datePickerUtil from './util';

function pad(value) {
    var padded = String(value);

    if (padded.length < 2) {
        padded = '0' + padded;
    }

    return padded;
}

export default Backbone.View.extend({
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
        this.renderReact(this.$('#reactWay')[0]);

        Array.prototype.forEach.call(this.$('ha-date-picker'), function(datePicker) {
            var date = new Date(Date.now()),
                notableDate,
                tooltips = {};

            if (date.getDate() < 20) {
                notableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);
                datePicker.notableDates = [notableDate];
                tooltips[notableDate.toDateString()] = 'Important Date';
                datePicker.tooltips = tooltips;
                datePicker.blackoutDates = [
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5),
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6),
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
                ];
            } else {
                notableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
                datePicker.notableDates = [notableDate];
                tooltips[notableDate.toDateString()] = 'Important Date';
                datePicker.tooltips = tooltips;
                datePicker.blackoutDates = [
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5),
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6),
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
                ];
            }
        });
        Array.prototype.forEach.call(this.$('.input-error'), function(datePicker) {
            var iconEl = document.createElement('span'),
                input = datePicker.querySelector('input');

            iconEl.classList.add('ha-icon-alert');

            if (input) {
                input.setAttribute('aria-invalid', 'true');
            }
            datePicker.insertBefore(iconEl, datePicker.querySelector('label'));
        });

        Array.prototype.forEach.call(this.$('.gallery-min-max'), function(datePicker) {
            datePicker.setAttribute('maxDate', datePickerUtil.getNextMonthDate());
            datePicker.setAttribute('minDate', datePickerUtil.getPreviousMonthDate());
        });

        return this;
    },

    renderDojo: function(placeToAppend) {
        var datePicker = domConstruct.toDom(demoTemplate),
            cloned = datePicker.cloneNode(true);
        demoJS._appendChildWithWrapper(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        demoJS.render(placeToAppend);
    },

    renderReact: function(placeToAppend) {
        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        var ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <h3 className="subtitle">Label</h3>

                        <HADatePicker label="Date"/>

                        <h3 className="subtitle">Placeholder</h3>

                        <HADatePicker placeholder="Placeholder Text"/>

                        <h3 className="subtitle">Preset Value</h3>

                        <HADatePicker value="2000-01-01" label="Date"/>

                        <h3 className="subtitle">Year Navigation</h3>

                        <HADatePicker showYearNavigation/>

                        <h3 className="subtitle">Disabled</h3>

                        <HADatePicker label="Date" disabled={true}/>

                        <h3 className="subtitle">Error</h3>

                        <HADatePicker label="With Error" aria-invalid="true" class="ha-validatable input-error"/>

                        <h3 className="subtitle">Required Field</h3>

                        <HADatePicker label="Required Field" required={true}/>

                        <h3 className="subtitle">Optional Field</h3>

                        <HADatePicker label="Optional Field" optional={true} labelOptional="Optional Field"/>

                        <h3 className="subtitle">Basic</h3>

                        <HADatePicker/>

                        <h3 className="subtitle">Name</h3>

                        <HADatePicker name="Name Test"/>

                        <h3 className="subtitle">Double Calendar</h3>

                        <HADatePicker label="Date Picker with Double Calendar" useDoubleCalendar={true}/>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});
