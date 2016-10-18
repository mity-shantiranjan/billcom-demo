import React from "react";
import Example from "../Example";
import Table from "hui/react-components/table/Table";

export default class CustomTableBarContent extends Example {
    static get displayName() {
        return "CustomTableBarContent";
    }

    constructor(props) {
        super(props);

        this.state = {
            data: this.getData(false)
        };
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.

// This example uses state. Click 'Usage' above to see the full example.
const getData(isFiltered) {
            let data = [
                {
                    first: "John",
                    last: "Doe",
                    id: 1
                }
            ];

            if (!isFiltered) {
                data.push({
                    first: "Bob",
                    last: "Ross",
                    id: 2
                });
            }

            return data;
        },
        getColumns() {
            return {
                first: "First Name",
                last: "Last Name"
            };
        },
        onFilterClick() {
            let state = Object.assign({}, this.state);
            state.data = this.getData(true);

            // Render the table again with our new filtered data
            this.setState(state);
        },
        onStarClick() {
            alert("Custom action clicked!");
        },
        getOptions() {
            let onTableBarCustomRender = () => {
                    // Return a React Element to add to the left side of the table bar.
                    // You can fill in any kind of JSX you want here.
                    return <button className="ha-button" onClick={this.onFilterClick.bind(this)}>Filter</button>;
                },
                onTableBarCustomActionRender = () => {
                    // Return a React Element to add to the right side of the table bar.
                    // You can fill in any kind of JSX you want here.
                    return <i className="hi page large hi-star-o" onClick={this.onStarClick}></i>;
                };

            // To keep the React debugging tools happy in dev mode
            onTableBarCustomRender.displayName = "onTableBarCustomRender";
            onTableBarCustomActionRender.displayName = "onTableBarCustomActionRender";

            return {
                autoheight: true,
                rowsPerPage: 200,

                // Custom table bar content
                onTableBarCustomRender: onTableBarCustomRender,
                onTableBarCustomActionRender: onTableBarCustomActionRender
            };
        };

ReactDOM.render(<Table data={this.state.data} columns={getColumns()} options={getOptions()} />, document.body);`;
    }

    getData(isFiltered) {
        const data = [
            {
                first: "John",
                last: "Doe",
                id: 1
            }
        ];

        if (!isFiltered) {
            data.push({
                first: "Bob",
                last: "Ross",
                id: 2
            });
        }

        return data;
    }

    getColumns() {
        return {
            first: "First Name",
            last: "Last Name"
        };
    }

    onFilterClick() {
        const state = Object.assign({}, this.state);
        state.data = this.getData(true);

        this.setState(state);
    }

    onStarClick() {
        alert("Custom action clicked!");
    }

    getOptions() {
        const onTableBarCustomRender = () => {
                // Return a React Element to add to the left side of the table bar.
                // You can fill in any kind of JSX you want here.
                return <button className="ha-button" onClick={this.onFilterClick.bind(this)}>Filter</button>;   // eslint-disable-line react/jsx-no-bind
            },
            onTableBarCustomActionRender = () => {
                // Return a React Element to add to the right side of the table bar.
                // You can fill in any kind of JSX you want here.
                return <i className="hi page large hi-star-o" onClick={this.onStarClick}></i>;  // eslint-disable-line react/jsx-handler-names
            };

        // To keep the React debugging tools happy in dev mode
        onTableBarCustomRender.displayName = "onTableBarCustomRender";
        onTableBarCustomActionRender.displayName = "onTableBarCustomActionRender";

        return {
            autoheight: true,
            rowsPerPage: 200,

            // Custom table bar content
            onTableBarCustomRender: onTableBarCustomRender,
            onTableBarCustomActionRender: onTableBarCustomActionRender
        };
    }

    getComponent() {
        const data = this.state.data,
            options = this.getOptions(),
            columns = this.getColumns();

        return <Table data={data} columns={columns} options={options} />;
    }
}
