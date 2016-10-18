import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class RemoteData extends Example {
    static get displayName() {
        return "RemoteData";
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
        first: {
            label: "First Name",
            sortable: false         // Sorting is on by default
        },
        last: "Last Name"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true
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
            first: {
                label: "First Name",
                sortable: false         // Sorting is on by default
            },
            last: "Last Name"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
