import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class LockedColumns extends Example {
    static get displayName() {
        return "LockedColumns";
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
        last: "Last Name",
        totalH: "Hits",
        total2B: "Doubles",
        total3B: "Triples",
        totalHR: "Home Runs",
        totalBB: "Walks",
        totalSB: "Stolen Bases"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: false,    // Turn off table bar
        lockedColumns: 1        // Lock the first column
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
            last: "Last Name",
            totalH: "Hits",
            total2B: "Doubles",
            total3B: "Triples",
            totalHR: "Home Runs",
            totalBB: "Walks",
            totalSB: "Stolen Bases"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: false,    // Turn off table bar
            lockedColumns: 1        // Lock the first column
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
