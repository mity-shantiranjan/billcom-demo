define(function() {
    "use strict";

    var types = {};

    types.Boolean = Boolean;
    types.Number = Number;
    types.String = String;

    types.JSON = {
        stringify: JSON.stringify.bind(JSON),
        parse: function(value, propertyName) {
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(propertyName + ": " + e);
                return null;
            }
        }
    };

    function _castDateValue(date, propertyName) {
        /* jshint eqnull:true */
        if (date == null /* or undefined */) {
            return date;
        }
        if (typeof date === "string") {
            date = new Date(date);
        }
        if (date instanceof Date && !isNaN(date.getSeconds())) {
            return date;
        } else {
            console.error(propertyName + ": invalid date: " + arguments[0]);
            return null;
        }
    }

    types.ISODate = {
        stringify: function(value, propertyName) {
            value = _castDateValue(value, propertyName);
            return value && value.toISOString().substr(0,10);
        },
        parse: function(attrValue, propertyName) {
            if (attrValue && attrValue.length === 10) {
                attrValue += "T12:00:00.0000Z";
            }
            return _castDateValue(attrValue, propertyName);
        }
    };

    types.ISODateTime = {
        stringify: function(value, propertyName) {
            value = _castDateValue(value, propertyName);
            return value && value.toISOString();
        },
        parse: _castDateValue
    };

    return types;
});