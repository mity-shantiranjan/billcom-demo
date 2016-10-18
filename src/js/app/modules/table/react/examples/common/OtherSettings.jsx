import React from "react";

export default class OtherSettings extends React.Component {
    static get displayName() {
        return "OtherSettings";
    }

    static get propTypes() {
        return {};
    }

    render() {
        return (
            <div>
                <h4>Other</h4>
                <ha-checkbox label="Do something special"></ha-checkbox>
            </div>
        );
    }
}
