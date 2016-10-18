import React from "react";
import Example from "../Example";
import DelayEmptyMemory from "./common/DelayEmptyMemory";
import Table from "hui/react-components/table/Table";

export default class Empty extends Example {
    static get displayName() {
        return "Empty";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import DelayEmptyMemory from "./common/DelayEmptyMemory";

// Waits 5 seconds before returning no results
// @see DelayEmptyMemory.jsx for a custom store implementation
const collection = new DelayEmptyMemory(),
    columns = {
        first: "First Name",
        last: "Last Name"
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        noDataMessage: "There are no results :(",
        loadingMessage: "A witty loading message that lasts 5 seconds..."
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);`;
    }

    getCollection() {
        return new DelayEmptyMemory();
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
            noDataMessage: "There are no results :(",
            loadingMessage: "A witty loading message that lasts 5 seconds..."
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
