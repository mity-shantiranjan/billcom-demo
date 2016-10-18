import React from "react";
import Example from "../Example";
import declare from "dojo/_base/declare";
import RequestMemory from "dstore/RequestMemory";
import Trackable from "dstore/Trackable";
import Table from "hui/react-components/table/Table";

export default class Virtual extends Example {
    static get displayName() {
        return "Virtual";
    }

    getCode() {
        return `import Table from "hui-react/table/Table"; // Be sure to optimize your layers! See the 'Design & API Document' link above.
import declare from "dojo/_base/declare";
import RequestMemory from "dstore/RequestMemory";
import Trackable from "dstore/Trackable";

// Need to mixin a Trackable instance for Virtual scrolling
// @see https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html
// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
// @see https://github.com/SitePen/dstore/blob/master/src/Trackable.js
const TrackableRequestStore = declare([RequestMemory, Trackable]),
    collection = new TrackableRequestStore({
        target: "js/app/modules/table/hof-batting.json"
    }),
    columns = {
        first: "First Name",     // Column shorthand notation
        last: "Last Name"
    },
    options = {
        virtual: true,      // Turn on virtual scrolling
        maxHeight: 500,     // Max height to make sure we trigger scrolling
        showTableBar: true
    };

ReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);`;
    }

    getCollection() {
        // Need to mixin a Trackable instance for Virtual scrolling
        // @see https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html
        // @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
        // @see https://github.com/SitePen/dstore/blob/master/src/Trackable.js
        const TrackableRequestStore = declare([RequestMemory, Trackable]);

        return new TrackableRequestStore({
            target: "js/app/modules/table/hof-batting.json"
        });
    }

    getColumns() {
        return {
            first: "First Name",
            last: "Last Name"
        };
    }

    getOptions() {
        return {
            virtual: true,      // Turn on virtual scrolling
            maxHeight: 500,     // Max height to make sure we trigger scrolling
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
