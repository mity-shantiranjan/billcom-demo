define([
    '../util/loremIpsum',
    'hui/core/utils',
    'hui/select-type-ahead'
], function(loremIpsum, utils) {
    'use strict';

    var selectTypeAhead = function(selectProperties) {
            return utils.createElement('ha-select-type-ahead', selectProperties);
        },
        h3 = function(textContent) {
            return utils.createElement('h3', { textContent: textContent });
        };

    return {

        getNewPopoverForm: function() {
            var addNewPopover,
                addNewPopoverForm,
                addNewPopoverFooter,
                popoverButtonSave,
                popoverButtonCancel,
                popoverInput;

            addNewPopover = document.createElement('ha-popover');
            addNewPopoverForm = document.createElement('ha-popover-form');
            addNewPopoverFooter = document.createElement('footer');
            popoverButtonSave = document.createElement('button');
            popoverButtonCancel = document.createElement('button');
            popoverInput = document.createElement('ha-text-field');

            popoverButtonSave.className = 'ha-button ha-button-primary';
            popoverButtonSave.innerHTML = 'Save';
            addNewPopoverFooter.appendChild(popoverButtonSave);

            popoverButtonCancel.className = 'ha-button ha-button-secondary';
            popoverButtonCancel.innerHTML = 'Cancel';
            addNewPopoverFooter.appendChild(popoverButtonCancel);

            popoverInput.id = 'addNewName';
            popoverInput.label = 'Name';

            addNewPopoverForm.section = popoverInput;
            addNewPopoverForm.footer = addNewPopoverFooter;
            addNewPopoverForm.addNewNameSelector = '#addNewName';

            addNewPopover.section = addNewPopoverForm;
            return addNewPopover;
        },

        render: function(el) {
            this.renderDefault(el);
            this.renderDisabled(el);
            this.renderWithValidation(el);
            this.renderWithNoIndicator(el);
            this.renderWithAddNew(el);
            this.renderWithIcon(el);
            this.renderWithWrapping(el);
        },

        renderDefault: function(el) {
            el.appendChild(h3('Default'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                store: this.store()
            }));
        },

        renderDisabled: function(el) {
            el.appendChild(h3('Disabled'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                disabled: true,
                label: 'Some Label',
                store: this.store()
            }));
        },

        renderWithValidation: function(el) {
            el.appendChild(h3('With Required Validation'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                required: true,
                label: 'Some Label',
                store: this.store()
            }));
        },

        renderWithNoIndicator: function(el) {
            el.appendChild(h3('With Required Validation No Indicator'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                required: true,
                label: 'Some Label',
                noRequiredIndicator: true,
                store: this.store()
            }));
        },

        renderWithAddNew: function(el) {
            el.appendChild(h3('With Add New'));
            el.appendChild(selectTypeAhead({
                label: 'Some Label',
                placeholder: 'Choose an item',
                addNew: true,
                addNewPopover: this.getNewPopoverForm(),
                store: this.store()
            }));
        },

        renderWithIcon: function(el) {
            el.appendChild(h3('With Icon'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                icon: 'hi-filter',
                store: this.store()
            }));
        },

        renderWithWrapping: function(el) {
            el.appendChild(h3('With Wrapping Items'));
            el.appendChild(selectTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                store: this.storeForWrappingItems
            }));
        },

        store: function() {
            return {
                query: function() {
                    return {
                        then: function(callback) {
                            callback([
                                {
                                    'label': 'Apple',
                                    'value': '1'
                                },
                                {
                                    'label': 'Banana',
                                    'value': '2'
                                },
                                {
                                    'label': 'Balloon',
                                    'value': '3'
                                },
                                {
                                    'label': 'Melon',
                                    'value': '4'
                                },
                                {
                                    'label': 'Orange',
                                    'value': '5'
                                },
                                {
                                    'label': 'Lemon',
                                    'value': '6'
                                },
                                {
                                    'label': 'Pear',
                                    'value': '7'
                                },
                                {
                                    'label': 'Mango',
                                    'value': '8'
                                },
                                {
                                    'label': 'Grape',
                                    'value': '9'
                                },
                                {
                                    'label': 'Peach',
                                    'value': '10'
                                },
                                {
                                    'label': 'Strawberry',
                                    'value': '11'
                                },
                                {
                                    'label': 'Papaya',
                                    'value': '12'
                                }
                            ]);
                        }
                    };
                }
            };
        },
        storeForWrappingItems: {
            query: function() {
                return {
                    then: function(callback) {
                        callback([
                            {'label': 'Apple', 'value': '1'},
                            {'label': 'Banana', 'value': '2'},
                            {'label': 'Balloon', 'value': '3'},
                            {'label': 'Melon', 'value': '4'},
                            {label: loremIpsum(), value: loremIpsum()},
                            {label: loremIpsum(), value: loremIpsum()},
                        ]);
                    }
                };
            }
        }
    };
});
