/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */

let usage = `
var textField = document.createElement("ha-text-field");

textField.label = 'Name';
textField.placeholder = 'Your name';
textField.required = true;`

export default {
    id: 'js',
    label: 'JS',
    usage: usage,
    render(el) {
        let wrapper = document.createElement('div'),
            requiredTextField = document.createElement('ha-text-field'),
            emailTextField = document.createElement('ha-text-field'),
            numbersTextField = document.createElement('ha-text-field'),
            numbersRequiredTextField = document.createElement('ha-text-field'),
            noValidatorTextField = document.createElement('ha-text-field'),
            customValidatorTextField = document.createElement('ha-text-field'),
            customValidatorTextarea = document.createElement('ha-textarea');

        requiredTextField.setAttribute('data-automation-id', 'validation-js-required');
        requiredTextField.label = 'Some Label';
        requiredTextField.required = true;

        emailTextField.setAttribute('data-automation-id', 'validation-js-pattern-email');
        emailTextField.label = 'Some Label';
        emailTextField.pattern = '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$';

        numbersTextField.setAttribute('data-automation-id', 'validation-js-pattern-only-numbers');
        numbersTextField.label = 'Some Label';
        numbersTextField.pattern = '^\\d+$';

        numbersRequiredTextField.setAttribute('data-automation-id', 'validation-js-pattern-only-numbers-required');
        numbersRequiredTextField.label = 'Some Label';
        numbersRequiredTextField.pattern = '^\\d+$';
        numbersRequiredTextField.required = true;

        noValidatorTextField.setAttribute('data-automation-id', 'validation-js-no-validation');
        noValidatorTextField.label = 'Some Label';

        customValidatorTextField.label = 'Custom validator (always invalid)';
        customValidatorTextField.validator = () => {
            return false;
        };
        customValidatorTextField.invalidMessage = 'This is always invalid';

        customValidatorTextarea.label = 'Custom validator (always invalid)';
        customValidatorTextarea.validator = () => {
            return false;
        };
        customValidatorTextarea.invalidMessage = 'This is always invalid';

        wrapper.appendChild(this.renderHeader('Required'));
        wrapper.appendChild(requiredTextField);

        wrapper.appendChild(this.renderHeader('Pattern (Email)'));
        wrapper.appendChild(emailTextField);

        wrapper.appendChild(this.renderHeader('Pattern (Numbers Only)'));
        wrapper.appendChild(numbersTextField);

        wrapper.appendChild(this.renderHeader('Required and Pattern (Numbers Only)'));
        wrapper.appendChild(numbersRequiredTextField);

        wrapper.appendChild(this.renderHeader('Without Validators'));
        wrapper.appendChild(noValidatorTextField);

        wrapper.appendChild(this.renderHeader('Custom validator Textfield'));
        wrapper.appendChild(customValidatorTextField);

        wrapper.appendChild(this.renderHeader('Custom validator Textarea'));
        wrapper.appendChild(customValidatorTextarea);

        el.appendChild(wrapper);
    },

    renderHeader(label) {
        let h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    }
}
