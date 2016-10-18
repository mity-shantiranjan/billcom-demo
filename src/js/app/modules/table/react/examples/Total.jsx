import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class Total extends Example {
    static get displayName() {
        return "Total";
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
        totalHR: "Home Runs"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true,
        totals: {
            totalHR: 30000  // Add totals
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
            last: "Last Name",
            totalHR: "Home Runs"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true,
            totals: {
                totalHR: 30000  // Add totals
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
