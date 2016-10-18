define([
        'backbone',
        'text!./page-modal.hbs',
        'dojo/dom-construct',
        'text!./trowserflow.dojo.html'
    ],
    function(Backbone, template, domConstruct, demoTemplate) {
        'use strict';

        var PageModalView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate',
                'click .show-trowser': 'showTrowser'
            },

            navigate: function(evt) {
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
            },

            showTrowser: function(event) {
                var trowserId = event.currentTarget.getAttribute('data-trowser-id'),
                    trowserElement = this.$el.find(trowserId);

                trowserElement[0].show();
            },

            render: function() {
                this.$el.html(template);
                this.renderJS(this.$el.find('#programmaticWay')[0]);
                this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                return this;
            },

            renderDojo: function(placeToAppend) {
                var trowserFlow = domConstruct.toDom(demoTemplate),
                    cloned = trowserFlow.cloneNode(true);
                domConstruct.place(cloned, placeToAppend);
            },

            createBasicTrowser: function(flow) {
                var trowser = document.createElement('ha-trowser-flow'),
                    textField = document.createElement('ha-text-field'),
                    mainSection = document.createElement('section'),
                    mainNode1 = document.createElement('div'),
                    mainNode2 = document.createElement('div'),
                    mainNode3 = document.createElement('div'),
                    secondaryButton = document.createElement('button'),
                    primaryButton = document.createElement('button'),
                    stepNode1, stepNode2, stepNode3;

                primaryButton.className = 'ha-button ha-button-dark ha-button-primary';
                primaryButton.textContent = 'Next';
                primaryButton.setAttribute('action', 'primary');

                secondaryButton.className = 'ha-button ha-button-dark';
                secondaryButton.textContent = 'Back';
                secondaryButton.setAttribute('action', 'secondary');

                trowser.targetselector = '#buttonTrowserTarget';
                trowser.titleText = 'Invoice';
                trowser.info = 'optional header info';

                // default false
                trowser.history = true;
                // default false
                trowser.settings = true;
                // default true
                trowser.help = true;
                // defaul true
                trowser.dismissible = true;

                trowser.flow = flow;

                // assume the following components are pre-created, make sure the `action` property is set
                trowser.footerItems = [secondaryButton, primaryButton];

                mainNode1.innerHTML = 'Step1 content';
                mainNode2.innerHTML = 'Complete this obligatory field';
                mainNode2.appendChild(textField);
                mainNode3.innerHTML = 'Step3 content';

                // step 1
                stepNode1 = document.createElement('ha-trowser-flow-step');
                stepNode1.titleText = 'step1 title';
                stepNode1.addContent(mainNode1);

                // step 2
                stepNode2 = document.createElement('ha-trowser-flow-step');
                stepNode2.titleText = 'step2 title';

                stepNode2.addContent(mainNode2);

                // step 3
                stepNode3 = document.createElement('ha-trowser-flow-step');
                stepNode3.titleText = 'step3 title';
                stepNode3.addContent(mainNode3);

                if (flow === 'linear') {
                    stepNode2.validator = function() {
                        return textField.value !== '';
                    };
                } else {
                    stepNode1.icon = 'user';
                    stepNode2.icon = 'map';
                    stepNode3.icon = 'attach';
                    stepNode1.description = 'step1 desc';
                    stepNode2.description = 'step2 desc';
                    stepNode3.description = 'step3 desc';
                }

                mainSection.appendChild(stepNode1);
                mainSection.appendChild(stepNode2);
                mainSection.appendChild(stepNode3);

                trowser.addContent({main: mainSection});
                trowser.render();
                return trowser;
            },

            renderJS: function(placeToAppend) {
                var linearTrowser = this.createBasicTrowser('linear'),
                    nonLinearTrowser = this.createBasicTrowser('nonlinear'),
                    buttonOpenLinearTrowser = document.createElement('button'),
                    buttonOpenNonLinearTrowser = document.createElement('button');

                placeToAppend.appendChild(buttonOpenLinearTrowser);
                placeToAppend.appendChild(buttonOpenNonLinearTrowser);

                buttonOpenLinearTrowser.className = 'ha-button ';
                buttonOpenLinearTrowser.textContent = 'Open Linear Trowser';
                buttonOpenLinearTrowser.id = 'buttonPopoverTarget';
                buttonOpenLinearTrowser.addEventListener('click', function() {
                    linearTrowser.show();
                });

                buttonOpenNonLinearTrowser.className = 'ha-button ';
                buttonOpenNonLinearTrowser.textContent = 'Open Non Linear Trowser';
                buttonOpenNonLinearTrowser.id = 'buttonPopoverTarget';
                buttonOpenNonLinearTrowser.addEventListener('click', function() {
                    nonLinearTrowser.show();
                });

                placeToAppend.appendChild(linearTrowser);
                placeToAppend.appendChild(nonLinearTrowser);
            }
        });

        return PageModalView;
    }
);
