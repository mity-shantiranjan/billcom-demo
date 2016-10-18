import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";
import EditColumnPopover from "./common/EditColumnPopover";

export default class ColumnEditChoice extends Example {
    static get displayName() {
        return "ColumnEditChoice";
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
                editableFields: [],         // No columns are editable by default
                editMode: "specific",       // We want to update specific columns instead of all of them
                onClickEdit: event => {     // Listen for the click on the edit button so we can show our custom popover with column choices
                    console.log("You clicked edit", event);
                    this.popover.api.show();
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
import EditColumnPopover from "./common/EditColumnPopover";

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
        editableFields: [],         // No columns are editable by default
        editMode: "specific",       // We want to update specific columns instead of all of them
        onClickEdit: event => {     // Listen for the click on the edit button so we can show our custom popover with column choices
            console.log("You clicked edit", event);
            this.popover.api.show();
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
    },
    handlePopoverRef(popover) {
        this.popover = popover;     // Get a reference to the popover component instance
    }
    handleTableRef = (table) => {
        this.table = table;         // Get a reference to the table component instance
    },
    handleSelect(name) {
        // When a column choice is made: close the popover, turn on editing for the selected column
        // @see EditColumnPopover.jsx
        this.popover.api.close();

        // Mark the selected column as editable and turn on editing for the table
        const state = Object.assign({}, this.state);
        state.options.editableFields = [name];
        state.options.editable = true;
        this.setState(state);
    },

    // TODO Is this the best way to get a reference to the edit node?
    editButtonSelector = "#exampleWrapper .tablebar button[name='edit']";

// @see EditColumnPopover.jsx
ReactDOM.render(<div id="exampleWrapper">
    <EditColumnPopover onSelect={handleSelect} targetSelector={editButtonSelector} ref={handlePopoverRef} />
    <Table collection={collection} columns={columns} options={options} ref={handleTableRef} />
</div>, document.body);`;
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

    handleSelect(name) {
        // When a column choice is made: close the popover, turn on editing for the selected column
        // @see EditColumnPopover.jsx
        this.popover.api.close();

        const state = Object.assign({}, this.state);
        state.options.editableFields = [name];
        state.options.editable = true;
        this.setState(state);
    }

    handleTableWrapperRef(table) {
        this.table = table;
    }

    handlePopoverWrapperRef(popover) {
        this.popover = popover;
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.state.options,
            handleTableRef = this.handleTableWrapperRef.bind(this),
            handlePopoverRef = this.handlePopoverWrapperRef.bind(this),
            handleSelect = this.handleSelect.bind(this),

            // TODO Is this the best way to get a reference to the edit node?
            editButtonSelector = "#exampleWrapper .tablebar button[name='edit']";

        return (
            <div id="exampleWrapper">
                <EditColumnPopover onSelect={handleSelect} targetSelector={editButtonSelector} ref={handlePopoverRef} />
                <Table collection={collection} columns={columns} options={options} ref={handleTableRef} />
            </div>
        );
    }
}
