import React from "react";
import Example from "../Example";
import Table from "hui/react-components/table/Table";

export default class Data extends Example {
    static get displayName() {
        return "Data";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.

// Raw JSON data. No collection needed.
const data: [
        {
            first: "John",
            last: "Doe",
            id: 1
        },
        {
            first: "Bob",
            last: "Ross",
            id: 2
        }
    ],
    columns = {
        first: "First Name",
        last: "Last Name"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50
    };

ReactDOM.render(<Table data={data} columns={columns} options={options} />, document.body);`;
    }

    getData() {
        return [
            {
                first: "John",
                last: "Doe",
                id: 1
            },
            {
                first: "Bob",
                last: "Ross",
                id: 2
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
            rowsPerPage: 200
        };
    }

    getComponent() {
        const data = this.getData(),
            options = this.getOptions(),
            columns = this.getColumns();

        return <Table data={data} columns={columns} options={options} />;
    }
}
