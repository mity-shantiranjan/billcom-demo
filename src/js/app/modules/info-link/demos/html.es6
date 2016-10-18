/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */
import template from 'text!./demo.html';

let usage = `
<ha-info-link linkText="Hello, world!" message="Goodbye, world!"></ha-info-link>

<ha-info-link>
    <ha-text>
        <em>Hello</em>, <strong>world</strong>!
    </ha-text>
    <ha-message>
        <u>Goodbye</u>, world!
    </ha-message>
</ha-info-link>`;

export default {
    id: 'html',
    label: 'HTML',
    usage,
    template
}
