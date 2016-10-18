define([
    'hui/core/deviceUtils',
    'hui/textarea'
], function(deviceUtils) {
    'use strict';

    return {
        _appendChildWithWrapper: function(child, parent) {
            if (deviceUtils.isHandheld()) {
                parent.appendChild(child);
                return;
            }
            var wrapper = document.createElement('div');

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
            var textarea = document.createElement('ha-textarea'),
                withPlaceholderTextarea = document.createElement('ha-textarea'),
                withValueTextarea = document.createElement('ha-textarea'),
                disabledTextarea = document.createElement('ha-textarea'),
                withPlaceholderDisabledTextarea = document.createElement('ha-textarea'),
                errorTextarea = document.createElement('ha-textarea'),
                requiredTextarea = document.createElement('ha-textarea'),
                requiredNoIndicatorTextarea = document.createElement('ha-textarea'),
                optionalTextarea = document.createElement('ha-textarea'),
                nameTextarea = document.createElement('ha-textarea'),
                noLabelTextarea = document.createElement('ha-textarea');

            textarea.label = 'Name';

            withPlaceholderTextarea.label = 'Name with Placeholder';
            withPlaceholderTextarea.placeholder = 'Your name';

            withValueTextarea.label = 'Name with Value';
            withValueTextarea.value = 'Default text';

            disabledTextarea.label = 'Disabled Name';
            disabledTextarea.disabled = true;

            withPlaceholderDisabledTextarea.label = 'Disabled Name with Placeholder';
            withPlaceholderDisabledTextarea.disabled = true;
            withPlaceholderDisabledTextarea.placeholder = 'Your name';

            errorTextarea.label = 'With Error';
            errorTextarea.classList.add('with-error');
            errorTextarea.required = true;

            requiredTextarea.label = 'Required Field';
            requiredTextarea.required = true;

            requiredNoIndicatorTextarea.label = 'Required Field';
            requiredNoIndicatorTextarea.required = true;
            requiredNoIndicatorTextarea.noRequiredIndicator = true;

            optionalTextarea.label = 'Optional Field';
            optionalTextarea.labelOptional = 'Same Optional field';
            optionalTextarea.optional = true;

            noLabelTextarea.placeholder = 'No Label';

            nameTextarea.name = 'Name test';
            nameTextarea.placeholder = 'With name attribute';

            this._appendTitle('Enabled', placeToAppend);
            this._appendChildWithWrapper(textarea, placeToAppend);
            this._appendChildWithWrapper(withPlaceholderTextarea, placeToAppend);
            this._appendChildWithWrapper(withValueTextarea, placeToAppend);

            this._appendTitle('Disabled', placeToAppend);
            this._appendChildWithWrapper(disabledTextarea, placeToAppend);
            this._appendChildWithWrapper(withPlaceholderDisabledTextarea, placeToAppend);

            this._appendTitle('With Error', placeToAppend);
            this._appendChildWithWrapper(errorTextarea, placeToAppend);

            this._appendTitle('Required', placeToAppend);
            this._appendChildWithWrapper(requiredTextarea, placeToAppend);

            this._appendTitle('Required No Indicator', placeToAppend);
            this._appendChildWithWrapper(requiredNoIndicatorTextarea, placeToAppend);

            this._appendTitle('Optional', placeToAppend);
            this._appendChildWithWrapper(optionalTextarea, placeToAppend);

            this._appendTitle('No Label', placeToAppend);
            this._appendChildWithWrapper(noLabelTextarea, placeToAppend);

            this._appendTitle('With name attribute', placeToAppend);
            this._appendChildWithWrapper(nameTextarea, placeToAppend);
        }
    };
});
