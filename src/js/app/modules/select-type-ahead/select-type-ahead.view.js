define([
        'backbone',
        'hbs/handlebars',
        'text!./select-type-ahead.hbs',
        'dojo/dom-construct',
        'text!./select-type-ahead.html',
        './select-type-ahead',
        './select-type-ahead-react'
    ],
    function(Backbone, handlebars, template, domConstruct, demoTemplate, demoJS, demoReact) {
        'use strict';

        var _eventListener = {},
            lastAddedItemToStore,
            store = demoJS.store(),
            rowStore = [
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
            ],
            itemAdded = {},
            storeForAddNew = {

                on: function(event, callback) {
                    _eventListener[event] = callback;
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
            },
            onItemsUpdate = function() {
                var selectTypeAheadAddNew = this.$el.find('#html ha-select-type-ahead[addnew=\'true\']')[0];
                // Update the value of the component
                selectTypeAheadAddNew.value = itemAdded ? itemAdded : '';
                selectTypeAheadAddNew.addNewPopover.close();
            },

            SelectDemoView = Backbone.View.extend({
                events: {
                    'click ha-segmented-button.usage-tab-buttons': 'navigate'
                },

                navigate: function(evt) {
                    this.$el.find('.panel').addClass('hidden');
                    this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
                },

                setStoreToElems: function() {
                    // After add the template to the backbone.view.$el, we set the stores to the declarative elems.
                    var i,
                        buttonTrigger,
                        el,
                        buttonSavePopoverForm,
                        buttonCancelPopoverForm,
                        HTMLTypeAheads = this.$el.find('#html ha-select-type-ahead');

                    buttonTrigger = this.$el.find('#html .is-store-trigger');
                    buttonSavePopoverForm = this.$el.find('#html ha-select-type-ahead[addnew=\'true\'] ha-popover-form button')[0];
                    buttonCancelPopoverForm = this.$el.find('#html ha-select-type-ahead[addnew=\'true\'] ha-popover-form button')[1];

                    // Action when click on button that simulate ADD from store.
                    buttonTrigger.on('click', function() {
                        itemAdded = 'breeze';
                        storeForAddNew.add(itemAdded);
                    }.bind(this));

                    // Action when user try to add new item from popover form.
                    buttonSavePopoverForm.addEventListener('click', function() {
                        var component = arguments[0].target;
                        while (component && component.tagName !== 'HA-POPOVER-FORM') {
                            component = component.parentNode;
                        }
                        itemAdded = component.querySelector('#addNewName').value;
                        storeForAddNew.add(itemAdded);
                        component.parentElement.close();
                    });
                    // Hide popover form
                    buttonCancelPopoverForm.addEventListener('click', function() {
                        var component = arguments[0].target;
                        while (component && component.tagName !== 'HA-POPOVER-FORM') {
                            component = component.parentNode;
                        }
                        component.parentElement.close();
                    });

                    for (i = 0; i < HTMLTypeAheads.length; i++) {
                        el = HTMLTypeAheads[i];
                        if (el.hasAttribute('addNew')) {
                            el.store = storeForAddNew;
                            el.on('items-update', onItemsUpdate.bind(this));
                        } else {
                            el.store = store;
                        }
                    }

                    // And we do the same with the elements rendered declarative by Dojo.
                    var DojoTypeAheads = this.$el.find('#dojo ha-select-type-ahead');
                    for (i = 0; i < DojoTypeAheads.length; i++) {
                        DojoTypeAheads[i].store = store;
                    }
                },

                setStoreForWrappingItems: function() {
                    var htmlTypeAhead = this.$el.find("#html #wrapping")[0],
                        dojoTypeAhead = this.$el.find("#dojo #wrapping")[0];

                    htmlTypeAhead.store = demoJS.storeForWrappingItems;
                    dojoTypeAhead.store = demoJS.storeForWrappingItems;
                },

                setPopoverFormToElems: function() {
                    var i,
                        DojoTypeAheads = this.$el.find('#dojo ha-select-type-ahead'),
                        el;

                    for (i = 0; i < DojoTypeAheads.length; i++) {
                        el = DojoTypeAheads[i];
                        if (el.hasAttribute('addNew')) {
                            el.addNew = true;
                            el.addNewPopover = demoJS.getNewPopoverForm();
                        }
                    }
                },

                render: function() {
                    this.renderHTML(template, demoTemplate);
                    this.renderJS(this.$el.find('#programmaticWay')[0]);
                    this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                    demoReact.renderReact(this.el.querySelector('#react .examples'));
                    setTimeout(function() { // FIX FF issue rendering
                        this.setStoreToElems();
                        this.setPopoverFormToElems();
                        this.setStoreForWrappingItems();
                    }.bind(this), 500);
                    return this;
                },

                renderHTML: function(template, demoTemplate) {
                    var compiled = handlebars.compile(template),
                        html = compiled({componentDemoTemplate: demoTemplate});

                    this.$el.html(html);
                },

                renderJS: function(placeToAppend) {
                    demoJS.render(placeToAppend);
                },

                renderDojo: function(placeToAppend) {
                    var typeAhead = domConstruct.toDom(demoTemplate),
                        cloned = typeAhead.cloneNode(true);
                    domConstruct.place(cloned, placeToAppend);
                }
            });

        return SelectDemoView;
    }
);
