/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */
import React from 'react';
import ReactDOM from 'react-dom';
import HATextField from 'hui/react-components/HATextField';

let usage = `
<HATextField label="Name" required="true"></HATextField>
<HATextField label="Name" required="true" pattern="^\d+$"></HATextField>`;

export default {
    id: 'react',
    label: 'React',
    usage: usage,
    render(el) {
        let ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <h3>Required</h3>
                        <HATextField label="Some Label" required data-automation-id="validation-react-required"></HATextField>
                        <h3>Pattern (Email)</h3>
                        <HATextField label="Some Label" pattern="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$" data-automation-id="validation-react-pattern-email"></HATextField>
                        <h3>Pattern (Numbers Only)</h3>
                        <HATextField label="Some Label" pattern="^\d+$" data-automation-id="validation-react-pattern-only-numbers"></HATextField>
                        <h3>Required and Pattern (Numbers Only)</h3>
                        <HATextField label="Some Label" pattern="^\d+$" required data-automation-id="validation-react-pattern-only-numbers-required"></HATextField>
                        <h3>Without Validation</h3>
                        <HATextField label="Some Label" data-automation-id="validation-react-no-validation"></HATextField>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, el);
    }
}
