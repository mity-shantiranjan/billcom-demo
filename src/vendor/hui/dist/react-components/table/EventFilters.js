(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.EventFilters = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var EventFilters = function () {
        function EventFilters() {
            _classCallCheck(this, EventFilters);
        }

        _createClass(EventFilters, null, [{
            key: "noFilter",
            value: function noFilter(event) {
                return event;
            }
        }, {
            key: "filterSelection",
            value: function filterSelection(event) {
                var rows = event.rows.map(function (row) {
                    return row.data;
                });

                // Return cleaned up results
                return {
                    // This is the row data for all rows that were selected/deselected by the
                    // event that triggered this
                    eventSelection: rows,

                    // This is the current selection for the overall table and NOT from the
                    // event that triggered this
                    // It will return an object with with row IDs as keys and true/false if they are
                    // selected or not
                    //
                    // {
                    //   1: true,
                    //   2: false
                    // }
                    tableSelectionById: event.grid.selection
                };
            }
        }]);

        return EventFilters;
    }();

    exports.default = EventFilters;
});
//# sourceMappingURL=EventFilters.js.map
