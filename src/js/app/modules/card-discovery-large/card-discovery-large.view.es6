/* jshint ignore:start */
import Backbone from 'backbone';
import handlebars from 'hbs/handlebars';
import template from 'text!./card-discovery-large.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./card-discovery-large.html';
import demoJS from './card-discovery-large';
import React from 'react';
import ReactDOM from 'react-dom';
import HACardDiscoveryLarge from 'hui/react-components/HACardDiscoveryLarge';
import HAFooter from 'hui/react-components/HAFooter';
import HASection from 'hui/react-components/HASection';
import HATextField from 'hui/react-components/HATextField';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.$el.html(template);
        this.renderHTML();
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact( this.$('#reactWay')[0]);
        return this;
    },

    renderHTML: function() {
        var compiled = handlebars.compile(template),
            html = compiled({componentDemoTemplate: demoTemplate});

        this.$el.html(html);
    },

    renderJS: function(el) {
        demoJS.render(el);
    },

    renderDojo: function(placeToAppend) {
        var cardDiscoveryLarge = domConstruct.toDom(demoTemplate),
            cloned = cardDiscoveryLarge.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderReact: function(placeToAppend) {
        class CardDiscoveryLargeExamples extends React.Component {

            constructor(props) {
                super(props);
                this.state = {
                    showDefault: false,
                    showOneButton: false,
                    showTwoButtons: false,
                    showThreeButtons: false,
                    showCustomizedFooter: false,
                    showImageInSection: false,
                    showOpenTrue: true
                };
            }

            render() {
                return (
                  <div>
                    <h3>Default Hidden (No Footer)</h3>
                    <HACardDiscoveryLarge
                        titleText="Card discovery large default"
                        dismissible
                        open={this.state.showDefault}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeDefault(); console.log('close was fired')}}
                        onDismiss={() => {this._closeDefault(); console.log('dismiss was fired')}}>
                        <HASection>
                            Some content for testing
                        </HASection>
                        <HAFooter></HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showDefault()}>Show</button>

                    <h3>With One Button</h3>
                    <HACardDiscoveryLarge
                        titleText="Card discovery large with 1 button"
                        dismissible
                        open={this.state.showOneButton}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeOneButton(); console.log('close was fired')}}
                        onDismiss={() => {this._closeOneButton(); console.log('dismiss was fired')}}>
                        <HASection>
                            Some content for testing
                        </HASection>
                        <HAFooter>
                            <ha-footer-buttons>
                                <button className="ha-button ha-button-primary">Primary Button</button>
                            </ha-footer-buttons>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showOneButton()}>Show</button>

                    <h3>With Two Buttons</h3>
                    <HACardDiscoveryLarge
                        titleText="Card discovery large with 2 buttons"
                        dismissible
                        open={this.state.showTwoButtons}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeTwoButtons(); console.log('close was fired')}}
                        onDismiss={() => {this._closeTwoButtons(); console.log('dismiss was fired')}}>
                        <HASection>
                            Some content for testing
                        </HASection>
                        <HAFooter>
                            <ha-footer-buttons>
                                <button className="ha-button">Secondary Button</button>
                                <button className="ha-button ha-button-primary">Primary Button</button>
                            </ha-footer-buttons>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showTwoButtons()}>Show</button>

                    <h3>With Three Buttons</h3>
                    <HACardDiscoveryLarge
                        titleText="Card discovery large with 3 buttons"
                        dismissible
                        open={this.state.showThreeButtons}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeThreeButtons(); console.log('close was fired')}}
                        onDismiss={() => {this._closeThreeButtons(); console.log('dismiss was fired')}}>
                        <HASection>
                            Some content for testing
                        </HASection>
                        <HAFooter>
                            <ha-footer-buttons>
                                <button className="ha-button">Tertiary Button</button>
                                <button className="ha-button">Secondary Button</button>
                                <button className="ha-button ha-button-primary">Primary Button</button>
                            </ha-footer-buttons>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showThreeButtons()}>Show</button>

                    <h3>With Customzied Footer</h3>
                    <HACardDiscoveryLarge
                        titleText='Get set up right with help from an expert'
                        dismissible
                        open={this.state.showCustomizedFooter}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeCustomizedFooter(); console.log('close was fired')}}
                        onDismiss={() => {this._closeCustomizedFooter(); console.log('dismiss was fired')}}>
                        <HASection>
                            <p>Ready for your free 1-hour session ? <a href="">Learn more</a></p>
                            <HATextField placeholder="Phone number"></HATextField>
                            <button className="ha-button ha-button-primary">Call me now!</button>
                        </HASection>
                        <HAFooter>
                            <div style={{paddingTop:20,textAlign:'center'}}>
                                Already have an accountant ?
                                <a href="">invite them here</a>
                            </div>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showCustomizedFooter()}>Show</button>

                    <h3>With Image in Section</h3>
                    <HACardDiscoveryLarge
                        titleText='Card discovery large with 1 button'
                        dismissible
                        open={this.state.showImageInSection}
                        onShow={() => console.log('show was fired')}
                        onClose={() => {this._closeImageInSection(); console.log('close was fired')}}
                        onDismiss={() => {this._closeImageInSection(); console.log('dismiss was fired')}}>
                        <HASection>
                            <div className="card-sub-item">
                                <div className="card-image qbo-certification"></div>
                                <div className="card-image-description">
                                    Strengthen your skills to
                                    <br/> become a QuickBooks expert.
                                </div>
                            </div>
                            <div className="card-sub-item">
                                <div className="card-image fap-directory"></div>
                                <div className="card-image-description">
                                    Showcase your practices to over
                                    <br/> 1 million businesses.
                                </div>
                            </div>
                            <div className="card-sub-item">
                                <div className="card-image customer-support"></div>
                                <div className="card-image-description">
                                    Connect quickly with our VIP
                                    <br/> support specialists.
                                </div>
                            </div>
                        </HASection>
                        <HAFooter>
                            <ha-footer-buttons>
                                <button className="ha-button ha-button-primary">Primary Button</button>
                            </ha-footer-buttons>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showImageInSection()}>Show</button>

                    <h3>Show immediately (open=true)</h3>
                    <HACardDiscoveryLarge
                        titleText="Card discovery large with open=true"
                        dismissible
                        open={this.state.showOpenTrue}
                        onShow={() => console.log('show was fired')}
                        onClose={() => console.log('close was fired')}
                        onDismiss={() => {this._showOpenTrue(); console.log('dismiss was fired')}}>
                        <HASection>
                            Some content for testing
                        </HASection>
                        <HAFooter>
                            <ha-footer-buttons>
                                <button className="ha-button">Tertiary Button</button>
                                <button className="ha-button">Secondary Button</button>
                                <button className="ha-button ha-button-primary">Primary Button</button>
                            </ha-footer-buttons>
                        </HAFooter>
                    </HACardDiscoveryLarge>
                    <button className="ha-button" onClick={() => this._showOpenTrue()}>Toggle</button>
                  </div>
                );
            }

            // show the card
            _showDefault() {
                this.setState({showDefault: true});
            }

            _showOneButton() {
                this.setState({showOneButton: true});
            }

            _showTwoButtons() {
                this.setState({showTwoButtons: true});
            }

            _showThreeButtons() {
                this.setState({showThreeButtons: true});
            }

            _showCustomizedFooter() {
                this.setState({showCustomizedFooter: true});
            }

            _showImageInSection() {
                this.setState({showImageInSection: true});
            }

            // close the card or dismiss the card
            _closeDefault() {
                this.setState({showDefault: false});
            }

            _closeOneButton() {
                this.setState({showOneButton: false});
            }

            _closeTwoButtons() {
                this.setState({showTwoButtons: false});
            }

            _closeThreeButtons() {
                this.setState({showThreeButtons: false});
            }

            _closeCustomizedFooter() {
                this.setState({showCustomizedFooter: false});
            }

            _closeImageInSection() {
                this.setState({showImageInSection: false});
            }

            //Toggle
            _showOpenTrue() {
                this.setState({showOpenTrue: this.state.showOpenTrue ? false : true});
            }
        }
        ReactDOM.render(<CardDiscoveryLargeExamples/>, placeToAppend);
    }
});
/* jshint ignore:end */
