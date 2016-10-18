import React from "react";
import highlightjs from "highlightjs";

export default class Code extends React.Component {
    static get displayName() {
        return "Code";
    }

    static get propTypes() {
        return {
            children: React.PropTypes.string.isRequired
        };
    }

    rawHighlighting() {
        const content = this.props.children.toString(),
            highlight = highlightjs.highlight("javascript", content, true);

        return {__html: highlight.value};
    }

    render() {
        const style = {
            background: "none",
            border: "none"
        };

        /*eslint-disable react/no-danger */

        return (
            <div>
                <pre><code><pre className="javascript" style={style} dangerouslySetInnerHTML={this.rawHighlighting()}></pre></code></pre>
            </div>
        );

        /*eslint-enable react/no-danger */
    }
}
