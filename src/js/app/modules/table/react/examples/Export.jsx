import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class Export extends Example {
    static get displayName() {
        return "Export";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import RequestMemory from "dstore/RequestMemory";

// Load data from remote JSON file
// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
const collection = new RequestMemory({
        target: "js/app/modules/table/hof-batting.json"
    }),
    columns = {
        first: "First Name",
        last: "Last Name"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true,
        showExport: true,               // Show export option
        onExport: table => {            // Callback
            console.dir(table);
            alert("Starting export...");
        }
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);`;
    }

    getCollection() {
        return new RequestMemory({
            target: "js/app/modules/table/hof-batting.json"
        });
    }

    getColumns() {
        return {
            first: "First Name",
            last: "Last Name"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true,
            showExport: true,               // Show export option
            onExport: table => {            // Callback
                console.dir(table);
                alert("Starting export...");
            }
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
