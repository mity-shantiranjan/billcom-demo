define([
    'hui/date-range-picker'
], function() {
    'use strict';

    return {
        _appendChildWithWrapper: function(child, parent) {
            var wrapper = document.createElement('div');

            wrapper.style.margin = '0 5px 0 0';
            wrapper.style.display = 'inline-block';

            wrapper.appendChild(child);

            parent.appendChild(wrapper);
        },

        _appendTitle: function(text, target) {
            var h3 = document.createElement('h3');

            h3.innerHTML = text;

            target.appendChild(h3);
        },

        blackoutDates: function(el) {
            Array.prototype.forEach.call(el.querySelectorAll('ha-date-range-picker'), function(datePicker) {
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
        },

        render: function(placeToAppend) {
            var datePicker = document.createElement('ha-date-range-picker'),
                disabledDatePicker = document.createElement('ha-date-range-picker'),
                requiredDatePicker = document.createElement('ha-date-range-picker'),
                optionalDatePicker = document.createElement('ha-date-range-picker'),
                nameDatePicker = document.createElement('ha-date-range-picker');

            disabledDatePicker.disabled = true;
            disabledDatePicker.ariaLabel = 'Select date range - Disabled';

            requiredDatePicker.startDateLabel = 'Required Field';
            requiredDatePicker.endDateLabel = 'Also required';
            requiredDatePicker.required = true;

            optionalDatePicker.labelOptional = 'Optional';
            optionalDatePicker.optional = true;

            nameDatePicker.startDateName = 'Start range name test';
            nameDatePicker.endDateName = 'End range name test';

            this._appendTitle('Enabled', placeToAppend);
            this._appendChildWithWrapper(datePicker, placeToAppend);

            this._appendTitle('Disabled', placeToAppend);
            this._appendChildWithWrapper(disabledDatePicker, placeToAppend);

            this._appendTitle('Required', placeToAppend);
            this._appendChildWithWrapper(requiredDatePicker, placeToAppend);

            this._appendTitle('Optional Label', placeToAppend);
            this._appendChildWithWrapper(optionalDatePicker, placeToAppend);

            this._appendTitle('With name attribute', placeToAppend);
            this._appendChildWithWrapper(nameDatePicker, placeToAppend);
        }
    };
});
