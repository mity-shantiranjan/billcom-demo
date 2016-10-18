import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import BattingAverage from "./common/BattingAverage";
import Table from "hui/react-components/table/Table";

export default class Renderers extends Example {
    static get displayName() {
        return "Renderers";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import RequestMemory from "dstore/RequestMemory";
import BattingAverage from "./common/BattingAverage";

// Load data from remote JSON file
// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
const collection = new RequestMemory({
        target: "js/app/modules/table/hof-batting.json"
    }),
    getColumns() {
        let onRenderCell = (props) => {
            // Return a React Element to add to the cell
            // You can fill in any kind of JSX you want here.
            // @see BattingAverage.jsx
            return (
                <div className="battingAverage">
                    <BattingAverage rowData={props.rowData} value={props.value} options={props.options} column={props.column} />
                </div>
            );
        };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "BattingAverageCustom";
        onRenderCell.propTypes = {
            rowData: React.PropTypes.any,
            value: React.PropTypes.any,
            options: React.PropTypes.any,
            column: React.PropTypes.any
        };

        return {
            first: "First Name",
            last: "Last Name",
            height: {
                label: "Height",
                formatter: value => {       // Custom formatter
                    return \`\${value} in.\`;
                }
            },
            average: {                      // Derived column
                label: "Batting Avg",
                onRenderCell: onRenderCell, // Custom renderer
                sortable: false             // It's custom so no sorting
            }
        };
    },
    options = {
        autoheight: true,
        rowsPerPage: 50,
        showTableBar: true
    };

ReactDOM.render(<Table collection={collection} columns={getColumns()} options={options} />, document.body);`;
    }

    getCollection() {
        return new RequestMemory({
            target: "js/app/modules/table/hof-batting.json"
        });
    }

    getColumns() {
        const onRenderCell = (props) => {
            // Return a React Element to add to the cell
            // You can fill in any kind of JSX you want here.
            // @see BattingAverage.jsx
            return (
                <div className="battingAverage">
                    <BattingAverage rowData={props.rowData} value={props.value} options={props.options} column={props.column} />
                </div>
            );
        };

        // To keep the React debugging tools happy in dev mode
        onRenderCell.displayName = "BattingAverageCustom";
        onRenderCell.propTypes = {
            rowData: React.PropTypes.any,
            value: React.PropTypes.any,
            options: React.PropTypes.any,
            column: React.PropTypes.any
        };

        return {
            first: "First Name",
            last: "Last Name",
            height: {
                label: "Height",
                formatter: value => {       // Custom formatter
                    return `${value} in.`;
                }
            },
            average: {                      // Derived column
                label: "Batting Avg",
                onRenderCell: onRenderCell, // Custom renderer
                sortable: false             // It's custom so no sorting
            }
        };
    }

    getOptions() {
        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
