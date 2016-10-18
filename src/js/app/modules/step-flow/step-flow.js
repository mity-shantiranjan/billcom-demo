define({
    render: function(el) {
        this.renderBasicStepFlow(el);
        this.renderComplexLinearStepFlow(el);
        this.renderComplexNonLinearStepFlow(el);
    },

    renderBasicStepFlow: function(el) {
        var button = this.renderButton({stepFlowId: 'step-flow-basic-js', trowserId: 'trowser-basic-js'}),
            trowser = this.renderTrowser('trowser-basic-js');

        trowser.section = this.renderStepFlow({stepFlowId: 'step-flow-basic-js', progressIndicator: false});

        el.appendChild(this.renderHeader('Basic Step Flow'));
        el.appendChild(button);
        el.appendChild(trowser);
    },

    renderComplexLinearStepFlow: function(el) {
        var button = this.renderButton({stepFlowId: 'step-flow-complex-linear-js', trowserId: 'trowser-complex-linear-js'}),
            trowser = this.renderTrowser('trowser-complex-linear-js');

        trowser.section = this.renderStepFlow({stepFlowId: 'step-flow-complex-linear-js', progressIndicator: true});

        el.appendChild(this.renderHeader('Complex Step Flow (Linear)'));
        el.appendChild(button);
        el.appendChild(trowser);
    },

    renderComplexNonLinearStepFlow: function(el) {
        var button = this.renderButton({stepFlowId: 'step-flow-complex-nonlinear-js', trowserId: 'trowser-complex-nonlinear-js'}),
            trowser = this.renderTrowser('trowser-complex-nonlinear-js');

        trowser.section = this.renderStepFlow({stepFlowId: 'step-flow-complex-nonlinear-js', progressIndicator: true, flow: 'nonlinear'});

        el.appendChild(this.renderHeader('Complex Step Flow (Non-Linear)'));
        el.appendChild(button);
        el.appendChild(trowser);
    },

    renderButton: function(properties) {
        var button = document.createElement('button');

        button.className = 'ha-button';
        button.textContent = 'Show Step Flow';
        button.addEventListener('click', function() {
            var trowser = document.getElementById(properties.trowserId),
                stepFlow = document.getElementById(properties.stepFlowId);

            stepFlow.show();
            trowser.show();
        });

        return button;
    },

    renderTrowser: function(id) {
        var trowser = this.createElement('ha-trowser', {
            titleText: 'Step Flow Demonstration',
            id: id,
            help: false,
            type: 'step-flow'
        });

        return trowser;
    },

    renderStepFlow: function(properties) {
        var stepFlow = this.createElement('ha-step-flow', {
                progressIndicator: properties.progressIndicator,
                closeParentTrowser: true,
                id: properties.stepFlowId
            }),
            step,
            steps = [];

        if (properties.flow) {
            stepFlow.flow = properties.flow;
        }

        stepFlow.landing = this.renderLanding();

        step = this.renderPersonalInfoStep();
        steps.push(step);

        step = this.renderValidationStep();
        steps.push(step);

        step = this.renderAnotherStep();
        steps.push(step);

        stepFlow.steps = steps;

        stepFlow.confirmation = this.renderConfirmation();

        stepFlow.show();

        return stepFlow;
    },

    renderLanding: function() {
        var landing = this.createElement('ha-flow-landing'),
            h3 = this.renderHeader('Landing Page');

        landing.content = h3;

        return landing;
    },

    renderPersonalInfoStep: function() {
        var flowStep = this.createElement('ha-flow-step', {
            titleText: 'Some information about you...',
            subtitleText: 'Step subtitle',
            showSaveForLaterButton: true
        });

        return flowStep;
    },

    renderValidationStep: function() {
        var flowStep = this.createElement('ha-flow-step', {
                titleText: 'Step with validation'
            }),
            requiredField = this.createElement('ha-text-field', {
                label: 'Required Field',
                placeholder: 'Required',
                required: true
            });

        flowStep.section = requiredField;

        flowStep.validator = function() {
            return requiredField.reportValidity();
        };

        return flowStep;
    },

    renderAnotherStep: function() {
        var flowStep = this.createElement('ha-flow-step', {
                titleText: 'Another step'
            }),
            field = this.createElement('ha-text-field', {
                label: 'Some Label'
            });

        flowStep.section = field;

        return flowStep;
    },

    renderConfirmation: function() {
        var confirmation = this.createElement('ha-flow-confirmation', {
                titleText: 'Confirmed!',
                subtitleText: 'Everything is good to go.'
            }),
            section = this.createElement('section', {
                innerHTML: 'Custom content'
            });

        confirmation.appendChild(section);

        return confirmation;
    },

    renderHeader: function(label) {
        var h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    },

    createElement: function(tagName, properties) {
        var component = document.createElement(tagName),
            prop;

        for (prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                component[prop] = properties[prop];
            }
        }

        return component;
    }
});
