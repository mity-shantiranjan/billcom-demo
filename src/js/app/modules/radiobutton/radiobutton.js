define({
    render: function(el) {
        this.renderDefault(el);
        this.renderWithLabel(el);
        this.renderWithNameAttribute(el);
        this.renderWithDisabled(el);
        this.renderWithDefaultValue(el);
        this.renderWithChecked(el);
        this.renderInline(el);
        this.renderWithExpectedValidation(el);
        this.renderWithRequiredValidation(el);
        this.renderWithRequiredNoIndicatorValidation(el);
    },

    renderDefault: function(el) {
        el.appendChild(this.renderHeader('Default'));

        var component = this.createComponent({});

        el.appendChild(component);

        return el;
    },

    renderWithLabel: function(el) {
        el.appendChild(this.renderHeader('With Label'));

        var component = this.createComponent({
            label: 'Some Label'
        });

        el.appendChild(component);

        return el;
    },

    renderWithNameAttribute: function(el) {
        el.appendChild(this.renderHeader('With name attribute'));

        var component = this.createComponent({
            label: 'Some Label',
            name: 'radioWithName'
        });

        el.appendChild(component);

        return el;
    },

    renderWithDisabled: function(el) {
        el.appendChild(this.renderHeader('With Disabled'));

        var component = this.createComponent({
            label: 'Some Label'
        });

        component.querySelector('ha-radio-button').disabled = true;

        el.appendChild(component);

        return el;
    },

    renderWithDefaultValue: function(el) {
        el.appendChild(this.renderHeader('With Default Value (should check Radio 1)'));

        var component = this.createComponent({
            label: 'Some Label',
            value: '1'
        });

        el.appendChild(component);

        return el;
    },

    renderWithChecked: function(el) {
        el.appendChild(this.renderHeader('With checked attribute on First Radio Button'));

        var component = this.createComponent({
            label: 'Some Label'
        });

        component.querySelector('ha-radio-button').checked = true;

        el.appendChild(component);

        return el;
    },

    renderInline: function(el) {
        el.appendChild(this.renderHeader('Inline'));

        var component = this.createComponent({
            label: 'Some Label',
            className: 'ha-inline'
        });

        el.appendChild(component);

        return el;
    },

    renderWithExpectedValidation: function(el) {
        var component, button;

        el.appendChild(this.renderHeader('With Expected Validation (expected to select Radio 2)'));

        component = this.createComponent({
            label: 'Some Label',
            expected: '2',
            required: true
        });

        el.appendChild(component);

        button = document.createElement('button');
        button.textContent = 'Trigger Validation';
        button.className = 'ha-button';
        button.addEventListener('click', function() {
            component.reportValidity();
        });

        el.appendChild(button);

        return el;
    },

    renderWithRequiredNoIndicatorValidation: function(el) {
        var component, button;

        el.appendChild(this.renderHeader('With Required Validation No Indicator'));

        component = this.createComponent({
            label: 'Some Label',
            required: true,
            noRequiredIndicator: true
        });

        el.appendChild(component);

        button = document.createElement('button');
        button.textContent = 'Trigger Validation';
        button.className = 'ha-button';
        button.addEventListener('click', function() {
            component.reportValidity();
        });

        el.appendChild(button);

        return el;
    },

    renderWithRequiredValidation: function(el) {
        var component, button;

        el.appendChild(this.renderHeader('With Required Validation'));

        component = this.createComponent({
            label: 'Some Label',
            required: true
        });

        el.appendChild(component);

        button = document.createElement('button');
        button.textContent = 'Trigger Validation';
        button.className = 'ha-button';
        button.addEventListener('click', function() {
            component.reportValidity();
        });

        el.appendChild(button);

        return el;
    },

    renderHeader: function(label) {
        var h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    },

    createComponent: function(properties) {
        var radioButtonGroup = document.createElement('ha-radio-button-group'),
            i, prop,
            items = [];

        for (i = 0; i < 3; i++) {
            items[i] = document.createElement('ha-radio-button');
            items[i].label = 'Radio ' + (i + 1);
            items[i].value = '' + (i + 1);
        }

        radioButtonGroup.radios = items;

        for (prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                radioButtonGroup[prop] = properties[prop];
            }
        }

        return radioButtonGroup;
    },

    createRadiosGroup: function(radioButtonData) {
        var newGroup = [],
            radioButton;

        radioButtonData.forEach(function(item) {
            radioButton = document.createElement('ha-radio-button');

            radioButton.label = item.label;
            radioButton.value = item.value;

            if ('disabled' in radioButton) {
                radioButton.disabled = item.disabled;
            }

            if ('checked' in radioButton) {
                radioButton.checked = item.checked;
            }

            newGroup.push(radioButton);
        });
        return newGroup;
    }
});
