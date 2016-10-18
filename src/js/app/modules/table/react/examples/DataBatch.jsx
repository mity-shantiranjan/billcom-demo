import React from "react";
import Example from "../Example";
import Table from "hui/react-components/table/Table";

export default class DataBatch extends Example {
    static get displayName() {
        return "DataBatch";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.

const data: [
        {
            id: 1,              // An id property is required for batch mode
            _selected: true,    // Select this row
            first: "John",
            last: "Doe"
        },
        {
            id: 2,
            first: "Bob",
            last: "Ross"
        }
    ],
    columns = {
        first: "First Name",
        last: "Last Name"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,

        // Batch mode options
        allowBatchMode: true,
        onSelect: (event) => {
            console.log("Item(s) selected!", event);
        },
        onDeselect: (event) => {
            console.log("Item(s) deselected!", event);
        }
    };

ReactDOM.render(<Table data={data} columns={columns} options={options} />, document.body);`;
    }

    getData() {
        return [
            {
                id: 1,              // An id property is required for batch mode
                _selected: true,    // Select this row
                first: "John",
                last: "Doe"
            },
            {
                id: 2,
                first: "Bob",
                last: "Ross"
            }
        ];
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
            rowsPerPage: 200,

            // Batch mode options
            allowBatchMode: true,
            onSelect: (event) => {
                console.log("Item(s) selected!", event);
            },
            onDeselect: (event) => {
                console.log("Item(s) deselected!", event);
            }
        };
    }

    getComponent() {
        const data = this.getData(),
            options = this.getOptions(),
            columns = this.getColumns();

        return <Table data={data} columns={columns} options={options} />;
    }
}
