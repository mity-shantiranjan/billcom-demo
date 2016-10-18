define([
        'backbone',
        'text!./textfield-type-ahead.hbs',
        'dojo/dom-construct',
        'text!./textfield-type-ahead.html',
        './textfield-type-ahead',
        './textfield-type-ahead-react',
        'hbs/handlebars'
    ],
    function(Backbone, template, domConstruct, demoTemplate, demoJS, demoReact, handlebars) {
        'use strict';

        var SelectDemoView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(evt) {
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
            },

            setStoreToElems: function() {
                ['#html', '#dojo', '#js'].forEach(function(panel) {
                    // After add the template to the backbone.view.$el, we set the stores to the declarative elems.
                    var i,
                        buttonTrigger,
                        el,
                        buttonSavePopoverForm,
                        buttonCancelPopoverForm,
                        typeAheads = this.$el.find(panel + ' ha-textfield-type-ahead'),
                        storeForAddNew = demoJS.dynamicStore();

                    buttonTrigger = this.$el.find(panel + ' .is-store-trigger');
                    buttonSavePopoverForm = this.$el.find(panel + ' ha-textfield-type-ahead[addnew=\'true\'] ha-popover-form button')[0];
                    buttonCancelPopoverForm = this.$el.find(panel + ' ha-textfield-type-ahead[addnew=\'true\'] ha-popover-form button')[1];

                    // Action when click on button that simulate ADD from store.
                    buttonTrigger.on('click', function() {
                        var itemAdded = 'breeze';
                        storeForAddNew.add(itemAdded);
                    }.bind(this));

                    // Action when user try to add new item from popover form.
                    buttonSavePopoverForm.addEventListener('click', function() {
                        var component = arguments[0].target,
                            itemAdded;

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

                    function setStore(typeAhead)
                    {
                        var suggestionStore = {
                            query: function() {
                                return {
                                    then: function(callback) {
                                      if (typeAhead.value==="") {
                                        callback([
                                          {
                                              'label': 'Fruits',
                                              'value': 'Fruits'
                                          },
                                          {
                                              'label': 'Vegetables',
                                              'value': 'Vegetables'
                                          },
                                          {
                                              'label': 'Animals',
                                              'value': 'Animals'
                                          }
                                        ]);
                                      }
                                      else {
                                        callback([
                                          {
                                              'label': 'Fruits',
                                              'value': 'Fruits'
                                          },
                                          {
                                              'label': 'Vegetables',
                                              'value': 'Vegetables'
                                          },
                                          {
                                              'label': 'Animals',
                                              'value': 'Animals'
                                          },
                                          {
                                              'label': 'Apple',
                                              'value': 'Apple'
                                          },
                                          {
                                              'label': 'Orange',
                                              'value': 'Orange'
                                          },
                                          {
                                              'label': 'Strawberry',
                                              'value': 'Strawberry'
                                          },
                                          {
                                              'label': 'Bananas',
                                              'value': 'Bananas'
                                          }
                                        ]);                                      }
                                    }
                                };
                           }
                        };

                        typeAhead.store = suggestionStore;
                    }

                    for (i = 0; i < typeAheads.length; i++) {
                        el = typeAheads[i];
                        if (el.hasAttribute('addNew')) {
                            el.store = storeForAddNew;
                            el.on('items-update', storeForAddNew.onItemsUpdate.bind(this));
                        } else {
                            if (el.openItemsOnFocus) {
                              setStore(el);
                            }
                            else if(panel !== '#js') {
                              el.store = demoJS.staticStore();
                            }
                        }
                    }
                }.bind(this));
            },

            setStoreForWrappingItems: function() {
                var htmlTypeAhead = this.$el.find("#html #wrapping")[0],
                    dojoTypeAhead = this.$el.find("#dojo #wrapping")[0];

                htmlTypeAhead.store = demoJS.storeForWrappingItems;
                dojoTypeAhead.store = demoJS.storeForWrappingItems;
            },

            render: function() {
                this.renderHTML(template, demoTemplate);
                this.renderJS(this.$el.find('#programmaticWay')[0]);
                this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                demoReact.renderReact(this.el.querySelector('#react .examples'));
                setTimeout(function() { // FIX FF issue rendering
                    this.setStoreToElems();
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
