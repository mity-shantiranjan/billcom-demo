import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class ColumnEditMultiple extends Example {
    static get displayName() {
        return "ColumnEditMultiple";
    }

    constructor(props) {
        super(props);

        this.state = {
            options: {
                autoheight: true,
                rowsPerPage: 50,
                showTableBar: true,

                // Edit options and callbacks
                showEditMode: true,
                editable: false,
                onCancel: event => {
                    console.log("You canceled your edits", event);
                },
                onSave: event => {
                    console.log("You saved your edits", event);

                    // Save edits to the collection
                    this.table.api.save();

                    // Flip the editable state on the table
                    const state = Object.assign({}, this.state);
                    state.options.editable = false;
                    this.setState(state);
                }
            }
        };
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
            editor: "ha-text-field"     // Editor for this column
        },
        last: {
            label: "Last Name",
            editor: "ha-text-field"     // Editor for this column
        },
        totalHR: "Home Runs"
    },

    // State is being used for these options. See the full example for the constructor.
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true,

        // Edit options and callbacks
        showEditMode: true,
        editable: false,
        onCancel: event => {
            console.log("You canceled your edits", event);
        },
        onSave: event => {
            console.log("You saved your edits", event);

            // Save edits to the collection
            this.table.api.save();

            // Flip the editable state on the table
            let state = Object.assign({}, this.state);
            state.options.editable = false;
            this.setState(state);
        }
    },
    handleRef = (table) => {
        this.table = table;         // Get a reference to the table component instance
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={options} ref={handleRef} />, document.body);`;
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
                editor: "ha-text-field"     // Editor for this column
            },
            last: {
                label: "Last Name",
                editor: "ha-text-field"     // Editor for this column
            },
            totalHR: "Home Runs"
        };
    }

    handleWrapperRef(table) {
        this.table = table;
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.state.options,
            handleRef = this.handleWrapperRef.bind(this);

        return <Table collection={collection} columns={columns} options={options} ref={handleRef} />;
    }
}
