import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class Rows extends Example {
    static get displayName() {
        return "Rows";
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
        totalK: "Strikeouts"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        compact: true,    // Adjust the row heights
        rowStatus: rowData => {
            // Check the number of strikeouts to see what the status is
            if (rowData.totalK < 300) {
                return "success";
            } else if (rowData.totalK >= 300 && rowData.totalK < 1000) {
                return "warning";
            } else if (rowData.totalK >= 1000) {
                return "error";
            } else {
                return "";
            }
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
            totalK: "Strikeouts"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            compact: true,    // Adjust the row heights
            rowStatus: rowData => {
                // Check the number of strikeouts to see what the status is
                if (rowData.totalK < 300) {
                    return "success";
                } else if (rowData.totalK >= 300 && rowData.totalK < 1000) {
                    return "warning";
                } else if (rowData.totalK >= 1000) {
                    return "error";
                } else {
                    return "";
                }
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
