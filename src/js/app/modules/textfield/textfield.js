define([
    'hui/core/deviceUtils',
    'hui/text-field'
], function(deviceUtils) {
    'use strict';

    return {
        _appendChildWithWrapper: function(child, parent) {
            var wrapper = document.createElement('div');

            if (deviceUtils.isDesktop()) {
                wrapper.style.margin = '0 5px 0 0';
                wrapper.style.display = 'inline-block';
            }

            wrapper.style.margin = '0 5px 0 0';
            wrapper.style.display = 'inline-block';

            wrapper.appendChild(child);

            parent.appendChild(wrapper);
        },

        _appendTitle: function(text, target) {
            var h3 = document.createElement('h3');

            h3.innerHTML = text;

            target.appendChild(h3);
        },

        render: function(placeToAppend) {
            var textField = document.createElement('ha-text-field'),
                withPlaceholderTextField = document.createElement('ha-text-field'),
                withValueTextField = document.createElement('ha-text-field'),
                disabledTextField = document.createElement('ha-text-field'),
                withPlaceholderDisabledTextField = document.createElement('ha-text-field'),
                errorTextField = document.createElement('ha-text-field'),
                requiredTextField = document.createElement('ha-text-field'),
                requiredNoIndicatorTextField = document.createElement('ha-text-field'),
                optionalTextField = document.createElement('ha-text-field'),
                nameTextField = document.createElement('ha-text-field'),
                autoCompleteONTextField = document.createElement('ha-text-field'),
                autoCompleteOFFTextField = document.createElement('ha-text-field'),
                textSize = document.createElement('ha-text-field'),
                noLabelTextField = document.createElement('ha-text-field'),
                textFieldWithIcon = document.createElement('ha-text-field'),
                withPlaceholderTextFieldWithIcon = document.createElement('ha-text-field'),
                withValueTextFieldWithIcon = document.createElement('ha-text-field'),
                attachmentField = document.createElement('ha-text-field');

            textField.label = 'Name';

            withPlaceholderTextField.label = 'Name with Placeholder';
            withPlaceholderTextField.placeholder = 'Your name';

            withValueTextField.label = 'Name with Value';
            withValueTextField.value = 'Default text';

            disabledTextField.label = 'Disabled Name';
            disabledTextField.disabled = true;

            withPlaceholderDisabledTextField.label = 'Disabled Name with Placeholder';
            withPlaceholderDisabledTextField.disabled = true;
            withPlaceholderDisabledTextField.placeholder = 'Your name';

            errorTextField.label = 'With error';
            errorTextField.classList.add('with-error');
            errorTextField.required = true;

            requiredTextField.label = 'Required Field';
            requiredTextField.required = true;

            requiredNoIndicatorTextField.label = 'Required Field No Indicator';
            requiredNoIndicatorTextField.required = true;
            requiredNoIndicatorTextField.noRequiredIndicator = true;

            optionalTextField.label = 'Optional Field';
            optionalTextField.labelOptional = 'optional';
            optionalTextField.optional = true;

            noLabelTextField.placeholder = 'No Label';

            nameTextField.name = 'Name test';
            nameTextField.label = 'Field with name';

            autoCompleteONTextField.setAttribute('autoComplete', 'on');
            autoCompleteONTextField.label = 'With auto complete';

            autoCompleteOFFTextField.setAttribute('autoComplete', 'off');
            autoCompleteONTextField.label = 'Without auto complete';

            textSize.size = 30;
            textSize.label = 'With size';

            textFieldWithIcon.label = 'Name';
            textFieldWithIcon.icon = 'hi-search';
            withPlaceholderTextFieldWithIcon.label = 'Name with Placeholder';
            withPlaceholderTextFieldWithIcon.placeholder = 'Your name';
            withPlaceholderTextFieldWithIcon.icon = 'hi-search';
            withValueTextFieldWithIcon.label = 'Name with Value';
            withValueTextFieldWithIcon.value = 'Default text';
            withValueTextFieldWithIcon.icon = 'hi-search';

            this._appendTitle('Enabled', placeToAppend);
            this._appendChildWithWrapper(textField, placeToAppend);
            this._appendChildWithWrapper(withPlaceholderTextField, placeToAppend);
            this._appendChildWithWrapper(withValueTextField, placeToAppend);

            this._appendTitle('Disabled', placeToAppend);
            this._appendChildWithWrapper(disabledTextField, placeToAppend);
            this._appendChildWithWrapper(withPlaceholderDisabledTextField, placeToAppend);

            this._appendTitle('With Error', placeToAppend);
            this._appendChildWithWrapper(errorTextField, placeToAppend);

            this._appendTitle('Required', placeToAppend);
            this._appendChildWithWrapper(requiredTextField, placeToAppend);

            this._appendTitle('Required No Indicator', placeToAppend);
            this._appendChildWithWrapper(requiredNoIndicatorTextField, placeToAppend);

            this._appendTitle('Optional', placeToAppend);
            this._appendChildWithWrapper(optionalTextField, placeToAppend);

            this._appendTitle('No Label', placeToAppend);
            this._appendChildWithWrapper(noLabelTextField, placeToAppend);

            this._appendTitle('With name', placeToAppend);
            this._appendChildWithWrapper(nameTextField, placeToAppend);

            this._appendTitle('Auto Complete ON', placeToAppend);
            this._appendChildWithWrapper(autoCompleteONTextField, placeToAppend);

            this._appendTitle('Auto Complete OFF', placeToAppend);
            this._appendChildWithWrapper(autoCompleteOFFTextField, placeToAppend);

            this._appendTitle('Size', placeToAppend);
            this._appendChildWithWrapper(textSize, placeToAppend);

            this._appendTitle('With Icon', placeToAppend);
            this._appendChildWithWrapper(textFieldWithIcon, placeToAppend);
            this._appendChildWithWrapper(withPlaceholderTextFieldWithIcon, placeToAppend);
            this._appendChildWithWrapper(withValueTextFieldWithIcon, placeToAppend);

            if (deviceUtils.isHandheld()) {
                this._appendTitle('With Attachment', placeToAppend);
                attachmentField.attachment = true;
                attachmentField.label = 'Choose a file';
                this._appendChildWithWrapper(attachmentField, placeToAppend);
            }
        }
    };
});
