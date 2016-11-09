(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./EventFilters"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./EventFilters"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.EventFilters);
        global.config = mod.exports;
    }
})(this, function (exports, _EventFilters) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _EventFilters2 = _interopRequireDefault(_EventFilters);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        // Custom options or options that require special handling. These options are specific to this React wrapper and we need to adapt them before we apply them to
        // HATable instance.
        customOptions: {
            settingsRenderer: true,
            onOtherSettingsRender: true,
            renderModes: true,
            onTableBarCustomRender: true,
            onTableBarCustomActionRender: true,
            virtual: true,
            totals: true
        },

        // Expose some methods on this React wrapper to call the corresponding API methods on
        // the underlying table instance.
        //   @see https://facebook.github.io/react/tips/expose-component-functions.html
        apiToExpose: {
            clearErrors: true,
            onClickEdit: true,
            refresh: true,
            resize: true,
            resizeColumnWidth: true,
            revert: true,
            save: true
        },

        // A list of callback functions and events they correspond to on the underlying
        // HATable instance. We'll listen for these events and call the corresponding
        // callbacks to make this component more React friendly.
        // FIXME How does the user clear one of these?
        eventsToCallbacks: {
            onCancel: {
                name: "edit-cancel",
                filter: _EventFilters2.default.noFilter
            },
            onColumnHiddenChange: {
                name: "column-hidden-change",
                filter: _EventFilters2.default.noFilter
            },
            onColumnResize: {
                name: "column-resize",
                filter: _EventFilters2.default.noFilter
            },
            onDatachange: {
                name: "datachange",
                filter: _EventFilters2.default.noFilter
            },
            onDeselect: {
                name: "batch-deselect",
                filter: _EventFilters2.default.filterSelection
            },
            onError: {
                name: "error",
                filter: _EventFilters2.default.noFilter
            },
            onExport: {
                name: "export",
                filter: _EventFilters2.default.noFilter
            },
            onRefresh: {
                name: "refresh",
                filter: _EventFilters2.default.noFilter
            },
            onSelect: {
                name: "batch-select",
                filter: _EventFilters2.default.filterSelection
            },
            onSave: {
                name: "edit-save",
                filter: _EventFilters2.default.noFilter
            },
            onSort: {
                name: "sort",
                filter: _EventFilters2.default.noFilter
            }
        }

    };
});
//# sourceMappingURL=config.js.map
