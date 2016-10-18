import React from "react";
import Example from "../Example";
import Table from "hui/react-components/table/Table";

export default class UpdateColumns extends Example {
    static get displayName() {
        return "UpdateColumns";
    }

    constructor(props) {
        super(props);

        this.state = {
            add: false,
            update: false
        };
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.

// This example uses state. Click 'Usage' above to see the full example.
const getData() {
        let data = [
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

        if (this.state.add) {
            data[0].hr = 10;
            data[1].hr = 2;
        }

        return data;
    },
    getColumns() {
        let columns = {
                first: "First Name",
                last: "Last Name"
            },
            onRenderCell = (props) => {
                return <div className="hr">Homers: {props.rowData.hr}</div>;
            };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "Homers";
        onRenderCell.propTypes = {
            rowData: React.PropTypes.any
        };

        if (this.state.update) {
            columns.first = "First Name (Updated)";
        }
        if (this.state.add) {
            columns.hr = "Home runs";
        }
        if (this.state.add && this.state.update) {
            columns.hr = {
                label: "Home runs",
                onRenderCell: onRenderCell
            };
        }

        return columns;
    },
    options = {
        autoheight: true,
        rowsPerPage: 50
    },
    addColumn() {
        let state = Object.assign({}, this.state);
        state.add = true;

        this.setState(state);
    },
    removeColumn() {
        let state = Object.assign({}, this.state);
        state.add = false;

        this.setState(state);
    },
    updateColumn() {
        let state = Object.assign({}, this.state);
        state.update = true;

        this.setState(state);
    };

ReactDOM.render(<div>
    <button className="ha-button" onClick={addColumn.bind(this)}>Add column</button>
    <button className="ha-button" onClick={removeColumn.bind(this)}>Remove column</button>
    <button className="ha-button" onClick={updateColumn.bind(this)}>Update column</button>
    <Table data={getData()} columns={getColumns()} options={options} />
</div>, document.body);`;
    }

    getData() {
        const data = [
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

        if (this.state.add) {
            data[0].hr = 10;
            data[1].hr = 2;
        }

        return data;
    }

    getColumns() {
        const columns = {
                first: "First Name",
                last: "Last Name"
            },
            onRenderCell = (props) => {
                return <div className="hr">Homers: {props.rowData.hr}</div>;
            };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "Homers";
        onRenderCell.propTypes = {
            rowData: React.PropTypes.any
        };

        if (this.state.update) {
            columns.first = "First Name (Updated)";
        }
        if (this.state.add) {
            columns.hr = "Home runs";
        }
        if (this.state.add && this.state.update) {
            columns.hr = {
                label: "Home runs",
                onRenderCell: onRenderCell
            };
        }

        return columns;
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 200
        };
    }

    addColumn() {
        const state = Object.assign({}, this.state);
        state.add = true;

        this.setState(state);
    }

    removeColumn() {
        const state = Object.assign({}, this.state);
        state.add = false;

        this.setState(state);
    }

    updateColumn() {
        const state = Object.assign({}, this.state);
        state.update = true;

        this.setState(state);
    }

    getComponent() {
        const data = this.getData(),
            options = this.getOptions(),
            columns = this.getColumns(),
            onAdd = this.addColumn.bind(this),
            onRemove = this.removeColumn.bind(this),
            onUpdate = this.updateColumn.bind(this);

        return (
            <div>
                <button className="ha-button" onClick={onAdd}>Add column</button>
                <button className="ha-button" onClick={onRemove}>Remove column</button>
                <button className="ha-button" onClick={onUpdate}>Update column</button>
                <Table data={data} columns={columns} options={options} />
            </div>
        );
    }
}
