import React from 'react';
import ReactDOM from 'react-dom';
import HAText from 'hui/react-components/HAText';
import HAInfoLink from 'hui/react-components/HAInfoLink';
import HAMessage from 'hui/react-components/HAMessage';

let usage =`
<HAInfoLink linkText="Hello, world!" message="Goodbye, world!"></HAInfoLink>
<HAInfoLink>
    <HAText>
        <em>Hello</em>, <strong>world</strong>!
    </HAText>
    <HAMessage>
        <u>Goodbye</u>, world!
    </HAMessage>
</HAInfoLink>`

export default {
    id: 'react',
    label: 'React',
    usage: usage,
    render(el) {
        let ExampleComponent = React.createClass({
            render: function() {
                return (
                    <div>
                        <h3>Inline Text and Message</h3>
                        <HAInfoLink
                            linkText="Hello, world!"
                            message="Goodbye, world!">
                        </HAInfoLink>

                        <h3>Inline Text and Nested Message</h3>
                        <HAInfoLink linkText="Hello, world!">
                            <HAMessage>
                                <u>Goodbye</u>, world!
                            </HAMessage>
                        </HAInfoLink>

                        <h3>Nested Text and Inline Message</h3>
                        <HAInfoLink message="Goodbye, world!">
                            <HAText>
                                <em>Hello</em>, <strong>world</strong>!
                            </HAText>
                        </HAInfoLink>

                        <h3>Nested Text and Message</h3>
                        <HAInfoLink>
                            <HAText>
                                <em>Hello</em>, <strong>world</strong>!
                            </HAText>
                            <HAMessage>
                                <u>Goodbye</u>, world!
                            </HAMessage>
                        </HAInfoLink>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, el);
    }
}