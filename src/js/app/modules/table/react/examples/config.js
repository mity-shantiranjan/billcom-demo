(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./Simple", "./RemoteData", "./Renderers", "./Rows", "./Empty", "./Print", "./Export", "./Settings", "./Virtual", "./Reordering", "./Update", "./EventsMethods", "./Total", "./LockedColumns", "./ColumnEditMultiple", "./ColumnEditChoice", "./Data", "./DataBatch", "./UpdateColumns", "./ContentGrouping", "./RowExpansion", "./CustomTableBarContent"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./Simple"), require("./RemoteData"), require("./Renderers"), require("./Rows"), require("./Empty"), require("./Print"), require("./Export"), require("./Settings"), require("./Virtual"), require("./Reordering"), require("./Update"), require("./EventsMethods"), require("./Total"), require("./LockedColumns"), require("./ColumnEditMultiple"), require("./ColumnEditChoice"), require("./Data"), require("./DataBatch"), require("./UpdateColumns"), require("./ContentGrouping"), require("./RowExpansion"), require("./CustomTableBarContent"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Simple, global.RemoteData, global.Renderers, global.Rows, global.Empty, global.Print, global.Export, global.Settings, global.Virtual, global.Reordering, global.Update, global.EventsMethods, global.Total, global.LockedColumns, global.ColumnEditMultiple, global.ColumnEditChoice, global.Data, global.DataBatch, global.UpdateColumns, global.ContentGrouping, global.RowExpansion, global.CustomTableBarContent);
        global.config = mod.exports;
    }
})(this, function (exports, _Simple, _RemoteData, _Renderers, _Rows, _Empty, _Print, _Export, _Settings, _Virtual, _Reordering, _Update, _EventsMethods, _Total, _LockedColumns, _ColumnEditMultiple, _ColumnEditChoice, _Data, _DataBatch, _UpdateColumns, _ContentGrouping, _RowExpansion, _CustomTableBarContent) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Simple2 = _interopRequireDefault(_Simple);

    var _RemoteData2 = _interopRequireDefault(_RemoteData);

    var _Renderers2 = _interopRequireDefault(_Renderers);

    var _Rows2 = _interopRequireDefault(_Rows);

    var _Empty2 = _interopRequireDefault(_Empty);

    var _Print2 = _interopRequireDefault(_Print);

    var _Export2 = _interopRequireDefault(_Export);

    var _Settings2 = _interopRequireDefault(_Settings);

    var _Virtual2 = _interopRequireDefault(_Virtual);

    var _Reordering2 = _interopRequireDefault(_Reordering);

    var _Update2 = _interopRequireDefault(_Update);

    var _EventsMethods2 = _interopRequireDefault(_EventsMethods);

    var _Total2 = _interopRequireDefault(_Total);

    var _LockedColumns2 = _interopRequireDefault(_LockedColumns);

    var _ColumnEditMultiple2 = _interopRequireDefault(_ColumnEditMultiple);

    var _ColumnEditChoice2 = _interopRequireDefault(_ColumnEditChoice);

    var _Data2 = _interopRequireDefault(_Data);

    var _DataBatch2 = _interopRequireDefault(_DataBatch);

    var _UpdateColumns2 = _interopRequireDefault(_UpdateColumns);

    var _ContentGrouping2 = _interopRequireDefault(_ContentGrouping);

    var _RowExpansion2 = _interopRequireDefault(_RowExpansion);

    var _CustomTableBarContent2 = _interopRequireDefault(_CustomTableBarContent);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var repoUrlBase = "https://github.intuit.com/SBG/harmony-ui-components/blob/develop",
        exampleUrlBase = repoUrlBase + "/gallery/src/js/app/modules/table/react/examples";

    exports.default = {
        id: "react-table",
        title: "React Table Component (Beta)",
        designDocLink: repoUrlBase + "/docs/design/ReactTable.md",
        defaultExample: "simple",
        examples: {
            simple: {
                name: "1 - Simple, local data collection",
                module: _Simple2.default,
                gitUrl: exampleUrlBase + "/Simple.jsx"
            },
            data: {
                name: "2 - Raw data, no collection",
                module: _Data2.default,
                gitUrl: exampleUrlBase + "/Data.jsx"
            },
            remote: {
                name: "3 - Fetch remote data, sorting, table options",
                module: _RemoteData2.default,
                gitUrl: exampleUrlBase + "/RemoteData.jsx"
            },
            renderers: {
                name: "4 - Custom renderers, formatters, derived columns",
                module: _Renderers2.default,
                gitUrl: exampleUrlBase + "/Renderers.jsx"
            },
            rows: {
                name: "5 - Row status, compact rows",
                module: _Rows2.default,
                gitUrl: exampleUrlBase + "/Rows.jsx"
            },
            empty: {
                name: "6 - Custom collection, empty message, loading message",
                module: _Empty2.default,
                gitUrl: exampleUrlBase + "/Empty.jsx"
            },
            print: {
                name: "7 - Print",
                module: _Print2.default,
                gitUrl: exampleUrlBase + "/Print.jsx"
            },
            export: {
                name: "8 - Export",
                module: _Export2.default,
                gitUrl: exampleUrlBase + "/Export.jsx"
            },
            settings: {
                name: "9 - Settings, custom settings",
                module: _Settings2.default,
                gitUrl: exampleUrlBase + "/Settings.jsx"
            },
            virtual: {
                name: "10 - Virtual scrolling",
                module: _Virtual2.default,
                gitUrl: exampleUrlBase + "/Virtual.jsx"
            },
            reordering: {
                name: "11 - Reorder rows",
                module: _Reordering2.default,
                gitUrl: exampleUrlBase + "/Reordering.jsx"
            },
            update: {
                name: "12 - Update table properties",
                module: _Update2.default,
                gitUrl: exampleUrlBase + "/Update.jsx"
            },
            eventsMethods: {
                name: "13 - Event callbacks, API methods",
                module: _EventsMethods2.default,
                gitUrl: exampleUrlBase + "/EventsMethods.jsx"
            },
            total: {
                name: "14 - Total row",
                module: _Total2.default,
                gitUrl: exampleUrlBase + "/Total.jsx"
            },
            locked: {
                name: "15 - Locked columns, hidden table bar",
                module: _LockedColumns2.default,
                gitUrl: exampleUrlBase + "/LockedColumns.jsx"
            },
            editColumnMultiple: {
                name: "16 - Batch edit multiple text columns",
                module: _ColumnEditMultiple2.default,
                gitUrl: exampleUrlBase + "/ColumnEditMultiple.jsx"
            },
            editColumnChoice: {
                name: "17 - Pick a column to edit, custom edit function",
                module: _ColumnEditChoice2.default,
                gitUrl: exampleUrlBase + "/ColumnEditChoice.jsx"
            },
            batchRawData: {
                name: "18 - Batch mode, raw data",
                module: _DataBatch2.default,
                gitUrl: exampleUrlBase + "/DataBatch.jsx"
            },
            updateColumns: {
                name: "19 - Add, Remove, Update columns",
                module: _UpdateColumns2.default,
                gitUrl: exampleUrlBase + "/UpdateColumns.jsx"
            },
            contentGrouping: {
                name: "20 - Content grouping",
                module: _ContentGrouping2.default,
                gitUrl: exampleUrlBase + "/ContentGrouping.jsx"
            },
            customTableBarContent: {
                name: "21 - Filtering, custom table bar content",
                module: _CustomTableBarContent2.default,
                gitUrl: exampleUrlBase + "/CustomTableBarContent.jsx"
            },
            rowExpansion: {
                name: "22 - Render custom content on row expansion",
                module: _RowExpansion2.default,
                gitUrl: exampleUrlBase + "/RowExpansion.jsx"
            }
        }
    };
});
//# sourceMappingURL=config.js.map
