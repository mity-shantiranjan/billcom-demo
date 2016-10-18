import React from "react";
import Example from "../Example";
import RequestMemory from "dstore/RequestMemory";
import OtherSettings from "./common/OtherSettings";
import Table from "hui/react-components/table/Table";

export default class Settings extends Example {
    static get displayName() {
        return "Settings";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import RequestMemory from "dstore/RequestMemory";
import OtherSettings from "./common/OtherSettings";

// Load data from remote JSON file
// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
const collection = new RequestMemory({
        target: "js/app/modules/table/hof-batting.json"
    }),
    columns = {
        first: "First Name",
        last: "Last Name",
        totalK: "Strikeouts",
        totalHR: "Home Runs"
    },
    getOptions() {
        let onOtherSettingsRender = () => {
            // Return a React Element to add to "Other" section of the settings popover.
            // You can fill in any kind of JSX you want here.
            // @see OtherSettings.jsx
            return <OtherSettings />;
        };

        // To keep the React debugging tools happy in dev mode
        onOtherSettingsRender.displayName = "OtherSettingsCustom";

        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true,

            // Settings
            showSettings: true,
            showDisplayDensitySettings: true,
            showRowsPerPageSettings: true,

            // Custom settings
            onOtherSettingsRender: onOtherSettingsRender
        };
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={getOptions()} />, document.body);`;
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
            totalK: "Strikeouts",
            totalHR: "Home Runs"
        };
    }

    getOptions() {
        const onOtherSettingsRender = () => {
            // Return a React Element to add to "Other" section of the settings popover.
            // You can fill in any kind of JSX you want here.
            // @see OtherSettings.jsx
            return <OtherSettings />;
        };

        // To keep the React debugging tools happy in dev mode
        onOtherSettingsRender.displayName = "OtherSettingsCustom";

        return {
            autoheight: true,
            rowsPerPage: 50,
            showTableBar: true,

            // Settings
            showSettings: true,
            showDisplayDensitySettings: true,
            showRowsPerPageSettings: true,

            // Custom settings
            onOtherSettingsRender: onOtherSettingsRender
        };
    }

    getComponent() {
        const collection = this.getCollection(),
            columns = this.getColumns(),
            options = this.getOptions();

        return <Table collection={collection} columns={columns} options={options} />;
    }
}
