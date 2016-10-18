import Simple from "./Simple";
import RemoteData from "./RemoteData";
import Renderers from "./Renderers";
import Rows from "./Rows";
import Empty from "./Empty";
import Print from "./Print";
import Export from "./Export";
import Settings from "./Settings";
import Virtual from "./Virtual";
import Reordering from "./Reordering";
import Update from "./Update";
import EventsMethods from "./EventsMethods";
import Total from "./Total";
import LockedColumns from "./LockedColumns";
import ColumnEditMultiple from "./ColumnEditMultiple";
import ColumnEditChoice from "./ColumnEditChoice";
import Data from "./Data";
import DataBatch from "./DataBatch";
import UpdateColumns from "./UpdateColumns";
import ContentGrouping from "./ContentGrouping";
import RowExpansion from "./RowExpansion";
import CustomTableBarContent from "./CustomTableBarContent";

const repoUrlBase = "https://github.intuit.com/SBG/harmony-ui-components/blob/develop",
    exampleUrlBase = `${repoUrlBase}/gallery/src/js/app/modules/table/react/examples`;

export default {
    id: "react-table",
    title: "React Table Component (Beta)",
    designDocLink: `${repoUrlBase}/docs/design/ReactTable.md`,
    defaultExample: "simple",
    examples: {
        simple: {
            name: "1 - Simple, local data collection",
            module: Simple,
            gitUrl: `${exampleUrlBase}/Simple.jsx`
        },
        data: {
            name: "2 - Raw data, no collection",
            module: Data,
            gitUrl: `${exampleUrlBase}/Data.jsx`
        },
        remote: {
            name: "3 - Fetch remote data, sorting, table options",
            module: RemoteData,
            gitUrl: `${exampleUrlBase}/RemoteData.jsx`
        },
        renderers: {
            name: "4 - Custom renderers, formatters, derived columns",
            module: Renderers,
            gitUrl: `${exampleUrlBase}/Renderers.jsx`
        },
        rows: {
            name: "5 - Row status, compact rows",
            module: Rows,
            gitUrl: `${exampleUrlBase}/Rows.jsx`
        },
        empty: {
            name: "6 - Custom collection, empty message, loading message",
            module: Empty,
            gitUrl: `${exampleUrlBase}/Empty.jsx`
        },
        print: {
            name: "7 - Print",
            module: Print,
            gitUrl: `${exampleUrlBase}/Print.jsx`
        },
        export: {
            name: "8 - Export",
            module: Export,
            gitUrl: `${exampleUrlBase}/Export.jsx`
        },
        settings: {
            name: "9 - Settings, custom settings",
            module: Settings,
            gitUrl: `${exampleUrlBase}/Settings.jsx`
        },
        virtual: {
            name: "10 - Virtual scrolling",
            module: Virtual,
            gitUrl: `${exampleUrlBase}/Virtual.jsx`
        },
        reordering: {
            name: "11 - Reorder rows",
            module: Reordering,
            gitUrl: `${exampleUrlBase}/Reordering.jsx`
        },
        update: {
            name: "12 - Update table properties",
            module: Update,
            gitUrl: `${exampleUrlBase}/Update.jsx`
        },
        eventsMethods: {
            name: "13 - Event callbacks, API methods",
            module: EventsMethods,
            gitUrl: `${exampleUrlBase}/EventsMethods.jsx`
        },
        total: {
            name: "14 - Total row",
            module: Total,
            gitUrl: `${exampleUrlBase}/Total.jsx`
        },
        locked: {
            name: "15 - Locked columns, hidden table bar",
            module: LockedColumns,
            gitUrl: `${exampleUrlBase}/LockedColumns.jsx`
        },
        editColumnMultiple: {
            name: "16 - Batch edit multiple text columns",
            module: ColumnEditMultiple,
            gitUrl: `${exampleUrlBase}/ColumnEditMultiple.jsx`
        },
        editColumnChoice: {
            name: "17 - Pick a column to edit, custom edit function",
            module: ColumnEditChoice,
            gitUrl: `${exampleUrlBase}/ColumnEditChoice.jsx`
        },
        batchRawData: {
            name: "18 - Batch mode, raw data",
            module: DataBatch,
            gitUrl: `${exampleUrlBase}/DataBatch.jsx`
        },
        updateColumns: {
            name: "19 - Add, Remove, Update columns",
            module: UpdateColumns,
            gitUrl: `${exampleUrlBase}/UpdateColumns.jsx`
        },
        contentGrouping: {
            name: "20 - Content grouping",
            module: ContentGrouping,
            gitUrl: `${exampleUrlBase}/ContentGrouping.jsx`
        },
        customTableBarContent: {
            name: "21 - Filtering, custom table bar content",
            module: CustomTableBarContent,
            gitUrl: `${exampleUrlBase}/CustomTableBarContent.jsx`
        },
        rowExpansion: {
            name: "22 - Render custom content on row expansion",
            module: RowExpansion,
            gitUrl: `${exampleUrlBase}/RowExpansion.jsx`
        }
    }
};
