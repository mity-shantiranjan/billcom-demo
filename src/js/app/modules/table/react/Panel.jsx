import React from "react";
import Code from "./Code";

export default class Panel extends React.Component {
    static get displayName() {
        return "Panel";
    }

    static get propTypes() {
        return {
            code: React.PropTypes.string.isRequired,
            gitUrl: React.PropTypes.string.isRequired,
            component: React.PropTypes.element.isRequired
        };
    }

    render() {
        return (
            <div className="panel">
                <section className="usage">
                    <header className="title">
                        <a>Usage</a>
                        <a href={this.props.gitUrl} target="_blank" className="gitUrl">
                            <i className="hi page large hi-new-window" title="Open on GitHub" />
                        </a>
                    </header>
                    <Code>{this.props.code}</Code>
                </section>

                <section className="examples">
                    <header className="title"><a>Examples</a></header>
                    <div>{this.props.component}</div>
                </section>
            </div>
        );
    }
}
