import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import Table from "hui/react-components/table/Table";

export default class EventsMethods extends Example {
    static get displayName() {
        return "EventsMethods";
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
        onSort: event => {              // Callback
            const sort = event.sort[0],
                column = sort.property,
                order = sort.descending ? "descending" : "ascending";

            alert(\`You sorted the table by '\${column}' in \${order} order\`);
        }
    },
    updateColumn = () => {
        // FIXME There is a bug in the resizeColumnWidth method of HATable.
        // It doesn't find columns by ID so you have to use an array index instead.
        // 1 corresponds to the 'last name' column
        this.table.api.resizeColumnWidth(1, 50);    // Call an API method
    },
    handleRef = (table) => {
        this.table = table;         // Get a reference to the table component instance
    };

ReactDOM.render(<div>
    <button className="ha-button" onClick={updateColumn}>Make 'last' column smaller</button>
    <Table collection={collection} columns={columns} options={options} ref={handleRef} />
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
            last: "Last Name",
            totalHR: "Home Runs"
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true,
            onSort: event => {              // Callback
                const sort = event.sort[0],
                    column = sort.property,
                    order = sort.descending ? "descending" : "ascending";

                alert(`You sorted the table by '${column}' in ${order} order`);
            }
        };
    }

    makeColumnBigger() {
        // FIXME There is a bug in the resizeColumnWidth method of HATable.
        // It doesn't find columns by ID so you have to use an array index instead.
        // 1 corresponds to the 'last name' column
        this.table.api.resizeColumnWidth(1, 50);    // Call an API method
    }

    handleWrapperRef(table) {
        this.table = table;
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions(),
            handleRef = this.handleWrapperRef.bind(this),
            onClick = this.makeColumnBigger.bind(this);

        return (
            <div>
                <button className="ha-button" onClick={onClick}>Make 'last' column smaller</button>
                <Table collection={collection} columns={columns} options={options} ref={handleRef} />
            </div>
        );
    }
}
