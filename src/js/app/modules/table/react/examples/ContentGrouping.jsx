import React from "react";
import Example from "../Example";
import Table from "hui/react-components/table/Table";
import ContentGroupMemory from "hui/table/ContentGroupMemory";

export default class ContentGrouping extends Example {
    static get displayName() {
        return "ContentGrouping";
    }

    getCode() {
        return (
            `import Table from "hui-react/table/Table";  // Be sure to optimize your layers! See the 'Design & API Document' link above.
import ContentGroupMemory from "hui/table/ContentGroupMemory";

getGroupData() {
        let contracts = [],
            contractTypes = [
                "Weekly Contract",
                "Annual Contract",
                "Pay as You Go Contract",
                "Empty Category"
            ];
        let i;

        contracts.push({
            contractType: contractTypes[0],
            id: 0,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[1],
            id: 1,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[2],
            id: 2,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[3],
            id: 3,
            parent: null
        });

        for (i = 0; i < 100; i++) {
            contracts.push({
                id: i + 3,
                email: \`email\${i}@domain.com\`,
                parent: (i % 3)  // the last category will never be populated
            });
        }

        return contracts;
// @see https://github.com/SitePen/dstore/blob/master/src/Memory.js
const collection = new ContentGroupMemory({
        // note: using a special store to enable grouping
        data: this.getGroupData()
    }),
    columns = {
        contractType: {
            label: "",
            renderExpando: true  // required to display the triangle icon to expand the group
        },
        id: "ID",
        email: {
            label: "Email",
            formatter: email => \`<a href="\${email}">\${email}</a>\`
        }
    },
    options = {
        categoryProperty: "contractType",
        rowsPerPage: 15
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);`
        );
    }

    getCollection() {
        // note: using a special store to enable grouping
        return new ContentGroupMemory({
            data: this.getGroupData()
        });
    }

    // the data for each group / category
    getGroupData() {
        const contracts = [],
            contractTypes = [
                "Weekly Contract",
                "Annual Contract",
                "Pay as You Go Contract",
                "Empty Category"
            ];
        let i;

        contracts.push({
            contractType: contractTypes[0],
            id: 0,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[1],
            id: 1,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[2],
            id: 2,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[3],
            id: 3,
            parent: null
        });

        for (i = 0; i < 100; i++) {
            contracts.push({
                id: i + 3,
                email: `email${i}@domain.com`,
                parent: (i % 3)  // the last category will never be populated
            });
        }

        return contracts;
    }

    getColumns() {
        return {
            contractType: {
                label: "",
                renderExpando: true  // required to display the triangle icon to expand the group
            },
            id: "ID",
            email: {
                label: "Email",
                formatter: email => `<a href="${email}">${email}</a>`
            }
        };
    }

    getOptions() {
        return {
            categoryProperty: "contractType",  // enables the header in the group category
            rowsPerPage: 45
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            options = this.getOptions(),
            columns = this.getColumns();

        return (
            <div>
                <Table collection={collection} columns={columns} options={options} />
            </div>
        );
    }
}
