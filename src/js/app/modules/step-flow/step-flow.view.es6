import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./step-flow.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./step-flow.html';
import demoJS from './step-flow';

import React from 'react';
import ReactDOM from 'react-dom';
import HATrowser from 'hui/react-components/HATrowser';
import HASection from 'hui/react-components/HASection';
import HATrowserFooter from 'hui/react-components/HATrowserFooter';
import HAStepFlow from 'hui/react-components/HAStepFlow';
import HAFlowStep from 'hui/react-components/HAFlowStep';
import HAFlowLanding from 'hui/react-components/HAFlowLanding';
import HAFlowConfirmation from 'hui/react-components/HAFlowConfirmation';

import HATextField from 'hui/react-components/HATextField';
import HASelect from 'hui/react-components/HASelect';
import HAItem from 'hui/react-components/HAItem';
import HAStackedPageMessages from 'hui/react-components/HAStackedPageMessages';
import HAPageMessage from 'hui/react-components/HAPageMessage';


    var StepFlowView = Backbone.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function() {
            this.renderHTML(template, demoTemplate);
            this.renderJS(this.$('#js .examples')[0]);
            this.renderDojo(demoTemplate, this.$('#dojo .examples')[0]);
            this.renderReact(this.$('#react .examples')[0]);

            // calling step-flow close() when X close button of trowser is clicked to reset it
            // FF, Safari, IE uses a shim to support custom elements
            // using renderHTML/renderDojo (which uses innerHTML) makes it async for these browsers
            // using event delegation and targeting ha-trowser
            this.el.addEventListener('close', function(evt) {
                if (evt.target.localName === 'ha-trowser') {
                    evt.target.querySelector('ha-step-flow').close();
                }
            });

            return this;
        },

        renderHTML: function(template, demoTemplate) {
            var compiled = handlebars.compile(template),
                html = compiled({componentDemoTemplate: demoTemplate});

            this.$el.html(html);
            this._attachListeners("html");
        },

        renderJS: function(el) {
            demoJS.render(el);
        },

        renderDojo: function(template, el) {
            var component = domConstruct.toDom(template),
                cloned = component.cloneNode(true);

            domConstruct.place(cloned, el);
            this._attachListeners("dojo");
        },

        renderReact: function(el) {
            class StepFlowExamples extends React.Component {

                constructor(props) {
                    super(props);
                    this.state = {
                        showTrowser: false,
                        showStepFlow: false,
                        hideStepButtons: false
                    };
                }

                render() {
                    return (
                        <div>
                            <h3>Step Flow with Progress Indicator, Landing page and Confirmation page </h3>
                            <button className="show-flow ha-button ha-button-primary" onClick={()=>this._showStepFlow()}>Show Complex Step Flow</button>
                            <HATrowser
                                titleText="Complex Step flow"
                                dismissible={true}
                                reactLayering={true}
                                show={this.state.showTrowser}
                                onClose={() => console.log('close was fired')}
                                onDismiss={() => {
                                  console.log('dismiss was fired');
                                  this._closeStepFlow();
                                }}>
                                <HASection>
                                    <HAStepFlow
                                        onDone={() => {
                                          console.log('done was fired');
                                          this._closeStepFlow();
                                        }}
                                        onClose={() => {
                                          console.log('close was fired');
                                          this._closeStepFlow();
                                        }}
                                        show={this.state.showStepFlow}
                                        progressIndicator={true}
                                        >
                                        <HAFlowLanding>
                                            <HASection>
                                                <h3>Landing Page</h3>
                                            </HASection>
                                        </HAFlowLanding>
                                        <HAFlowConfirmation titleText="Confirmed!" subtitleText="Everything is good to go.">
                                            <HASection>
                                                Custom content
                                            </HASection>
                                        </HAFlowConfirmation>
                                        <HAFlowStep titleText="Some information about you..." subtitleText="Step subtitle" hideStepButtons={this.state.hideStepButtons} showSaveForLaterButton={true}>
                                            <HASection>
                                                <div className="row">
                                                    <div className="col-xl-4 col-lg-6 col-sm-12">
                                                        <HATextField label="First Name"></HATextField>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-sm-12">
                                                        <HATextField label="Last Name"></HATextField>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-sm-12">
                                                        <HATextField label="Address"></HATextField>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-sm-12">
                                                        <HASelect label="Pick a color">
                                                            <HAItem value="blue">Blue</HAItem>
                                                            <HAItem value="red">Red</HAItem>
                                                            <HAItem value="green">Green</HAItem>
                                                            <HAItem value="yellow">Yellow</HAItem>
                                                        </HASelect>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-sm-12">
                                                        <HASelect label="Pick a shape">
                                                            <HAItem value="square">Square</HAItem>
                                                            <HAItem value="circle">Circle</HAItem>
                                                            <HAItem value="triangle">Triangle</HAItem>
                                                            <HAItem value="rectangle">Rectangle</HAItem>
                                                        </HASelect>
                                                    </div>
                                                </div>

                                                <button className="toggleStepEdit ha-button pull-right" onClick={() => this._toggleEdit()}>Toggle Edit Mode</button>
                                            </HASection>
                                        </HAFlowStep>
                                        <HAFlowStep titleText="Step with validation" nextButtonText="Custom Next" previousButtonText="Custom Previous"
                                                    validator={() => this._validateStep2()}>
                                            <HASection>
                                                <div className="row">
                                                    <HATextField ref="reqField" label="Required Field" placeholder="required" required={true}></HATextField>
                                                </div>
                                            </HASection>
                                        </HAFlowStep>
                                        <HAFlowStep titleText="Messages for you">
                                            <HASection>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <HAStackedPageMessages>
                                                            <HAPageMessage titleText="Error Title" type="error" dismissible={false}>
                                                                Error message text, non dismissible
                                                            </HAPageMessage>
                                                            <HAPageMessage titleText="Warn Title" type="warn" dismissible={true}>
                                                                Warn message text
                                                            </HAPageMessage>
                                                            <HAPageMessage titleText="Info Title" type="info" dismissible={true}>
                                                                Warn message text
                                                            </HAPageMessage>
                                                        </HAStackedPageMessages>
                                                    </div>
                                                </div>

                                            </HASection>
                                        </HAFlowStep>
                                    </HAStepFlow>
                                </HASection>
                            </HATrowser>
                        </div>
                    );
                }

                _showStepFlow() {
                    this.setState({showStepFlow: true});
                    this.setState({showTrowser: true});
                }

                _closeStepFlow() {
                    this.setState({showStepFlow: false});
                    this.setState({showTrowser: false});
                }

                _toggleEdit() {
                    this.setState({hideStepButtons: !this.state.hideStepButtons});
                }

                _validateStep2() {
                    var reqField = this.refs.reqField;
                    return reqField._huiComponent.reportValidity();
                }

            }
            ReactDOM.render(<StepFlowExamples/>, el);
        },

        _attachListeners: function(demoId) {

            if (demoId !== "html" && demoId !== "dojo") {
                return;
            }

            this.$('#' + demoId + ' .basic-html button.show-flow')[0].addEventListener('click', function() {
                this.$('#' + demoId + ' .basic-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .basic-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .basic-html #ha-flow-step-2')[0].validator = function() {
                var valid = this.$('#' + demoId + ' .basic-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .complex-html button.show-flow')[0].addEventListener('click', function() {
                this.$('#' + demoId + ' .complex-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .complex-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .complex-html #ha-flow-step-2')[0].validator = function() {
                var valid = this.$('#' + demoId + ' .complex-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .complex-nonlinear-html button.show-flow')[0].addEventListener('click', function() {
                this.$('#' + demoId + ' .complex-nonlinear-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .complex-nonlinear-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .complex-nonlinear-html #ha-flow-step-2')[0].validator = function() {
                var valid = this.$('#' + demoId + ' .complex-nonlinear-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .toggleStepEdit')[0].addEventListener('click', function() {
                var step1 = this.$('#' + demoId + ' #ha-flow-step-1')[0];
                step1.hideStepButtons = !step1.hideStepButtons;
            }.bind(this));

        }
    });

    export default StepFlowView;
