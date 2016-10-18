(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.js = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /* jshint ignore:start */
    /* jscs:disable requireMultipleVarDecl */

    var usage = '\nvar textField = document.createElement("ha-text-field");\n\ntextField.label = \'Name\';\ntextField.placeholder = \'Your name\';\ntextField.required = true;';

    exports.default = {
        id: 'js',
        label: 'JS',
        usage: usage,
        render: function render(el) {
            var wrapper = document.createElement('div'),
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
            customValidatorTextField.validator = function () {
                return false;
            };
            customValidatorTextField.invalidMessage = 'This is always invalid';

            customValidatorTextarea.label = 'Custom validator (always invalid)';
            customValidatorTextarea.validator = function () {
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
        renderHeader: function renderHeader(label) {
            var h3 = document.createElement('h3');
            h3.textContent = label;
            return h3;
        }
    };
});
//# sourceMappingURL=js.js.map
