(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'react', 'react-dom', 'hui/react-components/HADatePicker', 'text!./date-picker.hbs', 'dojo/dom-construct', 'text!./date-picker.dojo.html', './date-picker', './util'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('react'), require('react-dom'), require('hui/react-components/HADatePicker'), require('text!./date-picker.hbs'), require('dojo/dom-construct'), require('text!./date-picker.dojo.html'), require('./date-picker'), require('./util'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.react, global.reactDom, global.HADatePicker, global.datePicker, global.domConstruct, global.datePickerDojo, global.datePicker, global.util);
        global.datePickerView = mod.exports;
    }
})(this, function (exports, _backbone, _react, _reactDom, _HADatePicker, _datePicker, _domConstruct, _datePickerDojo, _datePicker3, _util) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HADatePicker2 = _interopRequireDefault(_HADatePicker);

    var _datePicker2 = _interopRequireDefault(_datePicker);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _datePickerDojo2 = _interopRequireDefault(_datePickerDojo);

    var demoJS = _interopRequireWildcard(_datePicker3);

    var datePickerUtil = _interopRequireWildcard(_util);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function pad(value) {
        var padded = String(value);

        if (padded.length < 2) {
            padded = '0' + padded;
        }

        return padded;
    }

    exports.default = _backbone2.default.View.extend({
        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_datePicker2.default);

            this.renderJS(this.$('#programmaticWay')[0]);
            this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);

            Array.prototype.forEach.call(this.$('ha-date-picker'), function (datePicker) {
                var date = new Date(Date.now()),
                    notableDate,
                    tooltips = {};

                if (date.getDate() < 20) {
                    notableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);
                    datePicker.notableDates = [notableDate];
                    tooltips[notableDate.toDateString()] = 'Important Date';
                    datePicker.tooltips = tooltips;
                    datePicker.blackoutDates = [new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5), new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6), new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)];
                } else {
                    notableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
                    datePicker.notableDates = [notableDate];
                    tooltips[notableDate.toDateString()] = 'Important Date';
                    datePicker.tooltips = tooltips;
                    datePicker.blackoutDates = [new Date(date.getFullYear(), date.getMonth(), date.getDate() - 5), new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6), new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)];
                }
            });
            Array.prototype.forEach.call(this.$('.input-error'), function (datePicker) {
                var iconEl = document.createElement('span'),
                    input = datePicker.querySelector('input');

                iconEl.classList.add('ha-icon-alert');

                if (input) {
                    input.setAttribute('aria-invalid', 'true');
                }
                datePicker.insertBefore(iconEl, datePicker.querySelector('label'));
            });

            Array.prototype.forEach.call(this.$('.gallery-min-max'), function (datePicker) {
                datePicker.setAttribute('maxDate', datePickerUtil.getNextMonthDate());
                datePicker.setAttribute('minDate', datePickerUtil.getPreviousMonthDate());
            });

            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var datePicker = _domConstruct2.default.toDom(_datePickerDojo2.default),
                cloned = datePicker.cloneNode(true);
            demoJS._appendChildWithWrapper(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            };

            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Label'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'Date' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Placeholder'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { placeholder: 'Placeholder Text' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Preset Value'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { value: '2000-01-01', label: 'Date' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Year Navigation'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { showYearNavigation: true }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Disabled'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'Date', disabled: true }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Error'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'With Error', 'aria-invalid': 'true', 'class': 'ha-validatable input-error' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Required Field'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'Required Field', required: true }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Optional Field'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'Optional Field', optional: true, labelOptional: 'Optional Field' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Basic'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, null),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Name'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { name: 'Name Test' }),
                        _react2.default.createElement(
                            'h3',
                            { className: 'subtitle' },
                            'Double Calendar'
                        ),
                        _react2.default.createElement(_HADatePicker2.default, { label: 'Date Picker with Double Calendar', useDoubleCalendar: true })
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=date-picker.view.js.map
