define([
    './util',
    'hui/date-picker'
], function(datePickerUtil) {
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

        render: function(placeToAppend) {
            var datePicker = document.createElement('ha-date-picker'),
                datePickerWithPlaceholder = document.createElement('ha-date-picker'),
                valueSpecified = document.createElement('ha-date-picker'),
                navigationByYear = document.createElement('ha-date-picker'),
                disabledDatePicker = document.createElement('ha-date-picker'),
                errorDatePicker = document.createElement('ha-date-picker'),
                requiredDatePicker = document.createElement('ha-date-picker'),
                minMaxDatePicker = document.createElement('ha-date-picker'),
                optionalDatePicker = document.createElement('ha-date-picker'),
                nameDatePicker = document.createElement('ha-date-picker'),
                noLabelDatePicker = document.createElement('ha-date-picker'),
                doubleCalendarDatePicker = document.createElement('ha-date-picker'),
                date = new Date(Date.now()),
                notableDate,
                tooltips = {};

            datePicker.label = 'Name';

            datePickerWithPlaceholder.placeholder = 'DD/MM/YYYY';

            valueSpecified.value = '2000-01-01';

            navigationByYear.showYearNavigation = true;

            disabledDatePicker.label = 'Disabled Name';
            disabledDatePicker.disabled = true;

            errorDatePicker.label = 'With error';
            errorDatePicker.className = 'input-error ha-validatable';

            requiredDatePicker.label = 'Required Field';
            requiredDatePicker.required = true;

            minMaxDatePicker.label = 'Min/max restrictions';
            minMaxDatePicker.minDate = datePickerUtil.getPreviousMonthDate();
            minMaxDatePicker.maxDate = datePickerUtil.getNextMonthDate();

            optionalDatePicker.label = 'Optional Field';
            optionalDatePicker.labelOptional = 'Optional';
            optionalDatePicker.optional = true;

            noLabelDatePicker.placeholder = 'No Label';

            nameDatePicker.name = 'Name test';

            doubleCalendarDatePicker.label = 'Date picker with double calendar';
            doubleCalendarDatePicker.useDoubleCalendar = true;

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

            this._appendTitle('Enabled', placeToAppend);
            this._appendChildWithWrapper(datePicker, placeToAppend);

            this._appendTitle('With Placeholder', placeToAppend);
            this._appendChildWithWrapper(datePickerWithPlaceholder, placeToAppend);

            this._appendTitle('With Value Specified', placeToAppend);
            this._appendChildWithWrapper(valueSpecified, placeToAppend);

            this._appendTitle('Navigation by Year', placeToAppend);
            this._appendChildWithWrapper(navigationByYear, placeToAppend);

            this._appendTitle('Disabled', placeToAppend);
            this._appendChildWithWrapper(disabledDatePicker, placeToAppend);

            this._appendTitle('With Error', placeToAppend);
            this._appendChildWithWrapper(errorDatePicker, placeToAppend);

            this._appendTitle('Required', placeToAppend);
            this._appendChildWithWrapper(requiredDatePicker, placeToAppend);

            this._appendTitle('With <code>maxDate</code> and <code>minDate</code> properties', placeToAppend);
            this._appendChildWithWrapper(minMaxDatePicker, placeToAppend);

            this._appendTitle('Optional Label', placeToAppend);
            this._appendChildWithWrapper(optionalDatePicker, placeToAppend);

            this._appendTitle('No Label', placeToAppend);
            this._appendChildWithWrapper(noLabelDatePicker, placeToAppend);

            this._appendTitle('With name attribute', placeToAppend);
            this._appendChildWithWrapper(nameDatePicker, placeToAppend);

            this._appendTitle('With Double Calendar', placeToAppend);
            this._appendChildWithWrapper(doubleCalendarDatePicker, placeToAppend);
        }
    };
});
