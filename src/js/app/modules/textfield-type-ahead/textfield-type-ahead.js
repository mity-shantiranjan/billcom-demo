define([
    '../util/loremIpsum',
    'hui/core/utils'
], function(loremIpsum, utils) {
    return {
        createTextfieldTypeAhead: function(typeAheadProperties) {
            var typeAhead = document.createElement('ha-textfield-type-ahead'),
                popover = document.createElement('ha-popover'),
                prop;

            typeAhead.store = this.staticStore();

            for (prop in typeAheadProperties) {
                if (typeAheadProperties.hasOwnProperty(prop)) {
                    typeAhead[prop] = typeAheadProperties[prop];
                }
            }

            typeAhead.popover = popover;

            return typeAhead;
        },

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
            this.renderRequired(el);
            this.renderWithIcon(el);
            this.renderWithAddNew(el);
            this.renderWithOpenItemsSuggestion(el);
            this.renderWithWrappingItems(el);
        },

        renderDefault: function(el) {
            var typeAhead,
                h3;

            h3 = document.createElement('h3');
            h3.innerHTML = 'Default';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label'
            });

            el.appendChild(typeAhead);
        },

        renderDisabled: function(el) {
            var typeAhead,
                h3;

            h3 = document.createElement('h3');
            h3.innerHTML = 'Disabled';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                disabled: true
            });

            el.appendChild(typeAhead);
        },

        renderRequired: function(el) {
            var typeAhead,
                h3;

            h3 = document.createElement('h3');
            h3.innerHTML = 'Required';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                required: true
            });

            el.appendChild(typeAhead);
        },

        renderWithIcon: function(el) {
            var typeAhead,
                h3;

            h3 = document.createElement('h3');
            h3.innerHTML = 'With Icon';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                placeholder: 'Choose an item',
                label: 'Some Label',
                icon: 'hi-search'
            });
            el.appendChild(typeAhead);
        },

        renderWithAddNew: function(el) {
            var typeAhead,
                h3,
                button;

            h3 = document.createElement('h3');
            h3.innerHTML = 'With Add New';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                label: 'Some Label',
                placeholder: 'Choose an item',
                addNew: true,
                addNewPopover: this.getNewPopoverForm()
            });

            // addNew is not properly set via the createTextfieldTypeAhead function
            typeAhead.setAttribute('addNew', true);

            el.appendChild(typeAhead);

            button = document.createElement('button');
            button.classList.add('ha-button',
                                 'ha-button-primary',
                                 'is-store-trigger');
            button.textContent = 'Add "breeze" entry to store';

            el.appendChild(button);
        },

        renderWithOpenItemsSuggestion: function(el) {
            var typeAhead,
                h3;

            h3 = document.createElement('h3');
            h3.innerHTML = 'With Open Items Onfocus for Suggestion';
            el.appendChild(h3);

            typeAhead = this.createTextfieldTypeAhead({
                label: 'Some Label',
                placeholder: 'e.g. Apple, Bananas',
                openItemsOnFocus: true,
                size: 20
            });

            el.appendChild(typeAhead);
        },

        renderWithWrappingItems: function(el) {
            el.appendChild(utils.createElement('h3', {
                textContent: 'With Wrapping Items'
            }));
            el.appendChild(utils.createElement('ha-textfield-type-ahead', {
                placeholder: 'Choose an item',
                label: 'Some Label',
                store: this.storeForWrappingItems
            }));
        },

        dynamicStore: function() {
            var _eventListener = {},
                lastAddedItemToStore = {},
                rowStore = [
                    {
                        'label': 'Apple',
                        'value': 'Apple'
                    },
                    {
                        'label': 'Banana',
                        'value': 'Banana'
                    },
                    {
                        'label': 'Balloon',
                        'value': 'Balloon'
                    },
                    {
                        'label': 'Melon',
                        'value': 'Melon'
                    },
                    {
                        'label': 'Orange',
                        'value': 'Orange'
                    },
                    {
                        'label': 'Lemon',
                        'value': 'Lemon'
                    },
                    {
                        'label': 'Pear',
                        'value': 'Pear'
                    },
                    {
                        'label': 'Mango',
                        'value': 'Mango'
                    },
                    {
                        'label': 'Grape',
                        'value': 'Grape'
                    },
                    {
                        'label': 'Peach',
                        'value': 'Peach'
                    },
                    {
                        'label': 'Strawberry',
                        'value': 'Strawberry'
                    },
                    {
                        'label': 'Papaya',
                        'value': 'Papaya'
                    }
                ];

            return {
                on: function(event, callback) {
                    _eventListener[event] = callback;
                },

                onItemsUpdate: function() {
                    var textfieldTypeAheadAddNew = this.$el.find('#html ha-textfield-type-ahead[addnew=\'true\']')[0];
                    // Update the value of the component
                    textfieldTypeAheadAddNew.value = lastAddedItemToStore ? lastAddedItemToStore.value : '';
                    textfieldTypeAheadAddNew.querySelector('HA-POPOVER-FORM').parentElement.close();
                },

                query: function() {

                    return {
                        then: function(callback) {
                            callback(rowStore);
                        }
                    };
                },

                add: function(value) {
                    lastAddedItemToStore = {
                        'label': value,
                        'value': value
                    };
                    // add to store the new item
                    rowStore.push(lastAddedItemToStore);
                    // Emit add in order to notify the component the changes of the store.
                    _eventListener.add();
                }
            };
        },

        staticStore: function() {
            return {
                query: function() {

                    return {
                        then: function(callback) {
                            callback([
                                {
                                    'label': 'Apple',
                                    'value': 'Apple'
                                },
                                {
                                    'label': 'Banana',
                                    'value': 'Banana'
                                },
                                {
                                    'label': 'Balloon',
                                    'value': 'Balloon'
                                },
                                {
                                    'label': 'Melon',
                                    'value': 'Melon'
                                },
                                {
                                    'label': 'Orange',
                                    'value': 'Orange'
                                },
                                {
                                    'label': 'Lemon',
                                    'value': 'Lemon'
                                },
                                {
                                    'label': 'Pear',
                                    'value': 'Pear'
                                },
                                {
                                    'label': 'Mango',
                                    'value': 'Mango'
                                },
                                {
                                    'label': 'Grape',
                                    'value': 'Grape'
                                },
                                {
                                    'label': 'Peach',
                                    'value': 'Peach'
                                },
                                {
                                    'label': 'Strawberry',
                                    'value': 'Strawberry'
                                },
                                {
                                    'label': 'Papaya',
                                    'value': 'Papaya'
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
                            {'label': 'Apple', 'value': 'Apple'},
                            {'label': 'Banana', 'value': 'Banana'},
                            {'label': 'Balloon', 'value': 'Balloon'},
                            {'label': 'Melon', 'value': 'Melon'},
                            {label: loremIpsum(), value: loremIpsum()},
                            {label: loremIpsum(), value: loremIpsum()},
                        ]);
                    }
                };
            }
        }
    };
});
