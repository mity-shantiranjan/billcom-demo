import React from "react";
import Panel from "./Panel";

export default class Example extends React.Component {
    static get displayName() {
        return "Example";
    }

    static get propTypes() {
        return {
            gitUrl: React.PropTypes.string.isRequired
        };
    }

    getCode() {
        return "";
    }

    getComponent() {
        return null;
    }

    render() {
        return <Panel code={this.getCode()} component={this.getComponent()} gitUrl={this.props.gitUrl} />;
    }
}
