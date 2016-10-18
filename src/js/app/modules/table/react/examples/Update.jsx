import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Checkbox from "hui/react-components/HACheckbox";
import Table from "hui/react-components/table/Table";

export default class Update extends Example {
    static get displayName() {
        return "Update";
    }

    constructor(props) {
        super(props);

        this.state = {
            options: {
                autoheight: true,
                rowsPerPage: 50,
                showTableBar: true,
                compact: false
            }
        };
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import Checkbox from "hui-react/HACheckbox";
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
    options = {     // State is being used for these options. See the full example for the constructor.
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true,
        compact: false
    },
    onClick = event => {
        let state = Object.assign({}, this.state);
        state.options.compact = event.currentTarget.checked;

        // Set the state of this component so it updates the table with the new options
        this.setState(state);
    };

ReactDOM.render(<div>
    <Checkbox label="Compact" checked={false} onClick={onClick} />
    <Table collection={collection} columns={columns} options={this.state.options} />
</div>, document.body);`;
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

    onCompactClick(event) {
        const state = Object.assign({}, this.state);
        state.options.compact = event.currentTarget.checked;

        // Set the state of this component so it updates the table with the new options
        this.setState(state);
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.state.options,
            onClick = this.onCompactClick.bind(this);

        return (
            <div>
                <Checkbox label="Compact" checked={false} onClick={onClick} />
                <Table collection={collection} columns={columns} options={options} />
            </div>
        );
    }
}
