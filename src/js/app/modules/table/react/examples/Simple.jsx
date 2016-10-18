import React from "react";
import Example from "../Example";
import Memory from "dstore/Memory";
import Table from "hui/react-components/table/Table";

export default class Simple extends Example {
    static get displayName() {
        return "Simple";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import Memory from "dstore/Memory";

// @see https://github.com/SitePen/dstore/blob/master/src/Memory.js
const collection = new Memory({
        data: [
            {
                first: "John",
                last: "Doe",
                id: 1
            }, {
                first: "Bob",
                last: "Ross",
                id: 2
            }
        ]
    }),
    columns = {
        first: "First Name",     // Column shorthand notation
        last: "Last Name"
    };

ReactDOM.render(<Table collection={collection} columns={columns} />, document.body);`;
    }

    getCollection() {
        return new Memory({
            data: [
                {
                    first: "John",
                    last: "Doe",
                    id: 1
                }, {
                    first: "Bob",
                    last: "Ross",
                    id: 2
                }
            ]
        });
    }

    getColumns() {
        return {
            first: "First Name",    // Column shorthand notation
            last: "Last Name"
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns();

        return <Table collection={collection} columns={columns} />;
    }
}
