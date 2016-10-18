define([
    'hui/checkbox'
], function() {

    return {
        checkboxData: function() {
            return [
                {
                    name: 'Enabled-Checkbox',
                    label: 'Enabled Checkbox',
                    checked: false,
                    disabled: false,
                    value: 1
                }, {
                    name: 'Enabled-Checkbox-Default',
                    label: 'Enabled Checkbox (default checked)',
                    checked: true,
                    disabled: false,
                    value: 2
                }, {
                    name: 'Disabled-Checkbox',
                    label: 'Disabled Checkbox',
                    disabled: true,
                    checked: false,
                    value: 3
                }, {
                    name: 'Enabled-Checkbox-Default',
                    label: 'Disabled Checkbox (default checked)',
                    disabled: true,
                    value: 4,
                    checked: true
                }, {
                    name: 'Enabled-Checkbox-Default',
                    label: 'With value OFF',
                    value: 'off'
                }, {
                    label: '',
                    disabled: false,
                    value: 5,
                    checked: false
                }, {
                    label: '',
                    disabled: false,
                    value: 6,
                    checked: true
                }
            ];
        },

        checkboxRequiredData: function() {
            return [
                {
                    label: 'Checkbox 1',
                    value: 1
                }, {
                    label: 'Checkbox 2',
                    value: 2,
                    style: 'padding-bottom: 5.25px'
                }
            ];
        },

        checkboxDataInline: function() {
            return [
                {
                    name: 'Enabled-Checkbox',
                    label: 'Enabled Checkbox',
                    checked: false,
                    disabled: false,
                    value: 1
                }, {
                    name: 'Enabled-Checkbox-Default',
                    label: 'Enabled Checkbox (default checked)',
                    checked: true,
                    disabled: false,
                    value: 2
                }, {
                    name: 'Disabled-Checkbox',
                    label: 'Disabled Checkbox',
                    disabled: true,
                    checked: false,
                    value: 3
                }
            ];
        },

        createCheckboxGroup: function(checkboxData) {
            var newGroup = [],
                checkbox;

            checkboxData.forEach(function(item) {
                checkbox = document.createElement('ha-checkbox');
                if (item.label) {
                    checkbox.label = item.label;
                }

                if (item.value !== undefined) {
                    checkbox.value = item.value;
                }

                if (item.name !== undefined) {
                    checkbox.name = item.name;
                }

                if (item.checked !== undefined) {
                    checkbox.checked = item.checked;
                }

                if ('disabled' in item) {
                    checkbox.disabled = item.disabled;
                }

                if ('readonly' in item) {
                    checkbox.readonly = item.readonly;
                }

                if ('style' in item) {
                    checkbox.style = item.style;
                }

                if ('ariaLabel' in item) {
                    checkbox.arialabel = item.arialabel;
                }

                newGroup.push(checkbox);
            });

            return newGroup;
        },

        createValidationButton: function(checkboxGroup) {
            var button = document.createElement('button');

            button.className = 'ha-button';
            button.textContent = 'Trigger Validation';

            button.addEventListener('click', function() {
                checkboxGroup.reportValidity();
            });

            return button;
        },

        render: function(el) {
            var checkboxGroup = document.createElement('ha-checkbox-group'),
                checkboxGroupWRequiredAmount = document.createElement('ha-checkbox-group'),
                checkboxGroupInline = document.createElement('ha-checkbox-group'),
                checkboxGroupNoIndicator = document.createElement('ha-checkbox-group'),
                checkboxGroupIndicator = document.createElement('ha-checkbox-group'),
                groupInlineTitle = document.createElement('h3'),
                checkboxData = this.checkboxData(),
                checkboxDataInline = this.checkboxDataInline(),
                checkboxRequiredData = this.checkboxRequiredData(),
                buttonToValidateRequired,
                buttonToValidateNoIndicator,
                buttonToValiadteGroupIndicator;

            checkboxGroup.checkboxes = this.createCheckboxGroup(checkboxData);
            checkboxGroupInline.checkboxes = this.createCheckboxGroup(checkboxDataInline);
            checkboxGroupWRequiredAmount.checkboxes = this.createCheckboxGroup(checkboxData);
            checkboxGroupNoIndicator.checkboxes = this.createCheckboxGroup(checkboxRequiredData);
            checkboxGroupIndicator.checkboxes = this.createCheckboxGroup(checkboxRequiredData);

            groupInlineTitle.innerHTML = 'Checkbox Group with ha-inline class';
            checkboxGroupInline.name = 'Programmatic Checkbox Group Inline';
            checkboxGroupInline.label = 'Checkbox Group Inline';
            checkboxGroupInline.className = 'ha-inline';
            checkboxGroupInline.setAttribute("data-automation-id", "group_checkbox_inline");

            checkboxGroup.name = 'Programmatic Checkbox Group';
            checkboxGroup.label = 'Checkbox Group';
            checkboxGroup.setAttribute("data-automation-id", "group-checkbox-default");

            checkboxGroupWRequiredAmount.name = 'Checkbox Group 2';
            checkboxGroupWRequiredAmount.label = 'Checkbox Group with required amount of checked >= 2';
            checkboxGroupWRequiredAmount.minRequired = 2;
            checkboxGroupWRequiredAmount.required = true;
            checkboxGroupWRequiredAmount.setAttribute("data-automation-id", "group_checkbox_with_validation");
            buttonToValidateRequired = this.createValidationButton(checkboxGroupWRequiredAmount);
            buttonToValidateRequired.setAttribute("data-automation-id", "btn_validation_01");

            checkboxGroupNoIndicator.name = 'Checkbox Group';
            checkboxGroupNoIndicator.label = 'Required Checkbox Group No Indicator';
            checkboxGroupNoIndicator.required = true;
            checkboxGroupNoIndicator.noRequiredIndicator = '';
            checkboxGroupNoIndicator.setAttribute("data-automation-id", "group_checkbox_required_no_ind");
            buttonToValidateNoIndicator = this.createValidationButton(checkboxGroupNoIndicator);
            buttonToValidateNoIndicator.setAttribute("data-automation-id", "btn_validation_02");

            checkboxGroupIndicator.name = 'Checkbox Group';
            checkboxGroupIndicator.label = 'Required Checkbox Group';
            checkboxGroupIndicator.required = true;
            checkboxGroupIndicator.setAttribute("data-automation-id", "group_checkbox_required");
            buttonToValiadteGroupIndicator = this.createValidationButton(checkboxGroupIndicator);
            buttonToValiadteGroupIndicator.setAttribute("data-automation-id", "btn_validation_03");

            el.appendChild(checkboxGroup);
            el.appendChild(checkboxGroupWRequiredAmount);
            el.appendChild(buttonToValidateRequired);
            el.appendChild(checkboxGroupNoIndicator);
            el.appendChild(buttonToValidateNoIndicator);
            el.appendChild(checkboxGroupIndicator);
            el.appendChild(buttonToValiadteGroupIndicator);
            el.appendChild(groupInlineTitle);
            el.appendChild(checkboxGroupInline);
        }
    };
});
