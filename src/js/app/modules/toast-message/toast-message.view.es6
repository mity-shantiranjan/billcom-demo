import Backbone from 'backbone';
import template from 'text!./toast-message.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./toastmessage.dojo.html';
import HAToastMessage from 'hui/react-components/HAToastMessage';
import React from 'react';
import ReactDOM from 'react-dom';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate',
        'click .btn-show-toast': 'showToastEvent'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');

    },

    showToastEvent: function(evt) {
        this.showToast(evt.currentTarget.value);
    },

    showToast: function(id) {
        this.$el.find('#' + id)[0].show();
    },

    render: function() {
        this.$el.html(template);
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$el.find('#reactWay')[0]);
        return this;
    },

    renderDojo: function(placeToAppend) {
        var toastMessage = domConstruct.toDom(demoTemplate),
            cloned = toastMessage.cloneNode(true);
        domConstruct.place(cloned, placeToAppend);
    },

    renderJS: function(placeToAppend) {
        var node = document.createElement('ha-toast-message');

        node.dismissible = true;
        node.duration = 5000;
        // jscs:disable validateQuoteMarks
        node.message = "My message here test <strong>with bold text</strong>, timeout 5s";
        // jscs:enable validateQuoteMarks
        node.id = 'ToastJS1';
        placeToAppend.appendChild(node);

        node = document.createElement('ha-toast-message');
        node.dismissible = false;
        node.duration = 2000;
        // jscs:disable validateQuoteMarks
        node.message = "My message here test <strong>with bold text</strong>, non dismissible, timeout 2s";
        // jscs:enable validateQuoteMarks
        node.id = 'ToastJS2';
        placeToAppend.appendChild(node);

        node = document.createElement('ha-toast-message');
        node.dismissible = true;
        node.duration = -1;
        // jscs:disable validateQuoteMarks
        node.message = "My message here test <strong>with bold text</strong>, this should expand to the limits of the container";
        // jscs:enable validateQuoteMarks
        node.id = 'ToastJS3';
        placeToAppend.appendChild(node);
    },

    renderReact: function(placeToAppend) {


        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.currentTarget} ${e.type} fired`);
        };

        var log = function(msg) {
            console.log(msg);
        };

        class ExampleComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    showToast1: false,
                    showToast2: false,
                    showToast3: false
                };
            }

            render() {
                return (
                    <div>
                        <div style={ { position:"relative", background:"#f0f0f0", height:"200px", width:"636px", margin:"20px auto", border:"1px solid gray" } }>
                            <HAToastMessage closeCallback={() => this._closeToast(1)} onShow={eventLog} onClose={() => this._closeToast(1)} onDismiss={eventLog} id="Toast1" duration={5000} show={this.state.showToast1}>
                                Lorem ipsum dolor <strong>with bold text</strong>, timeout 5s.
                            </HAToastMessage>
                            <HAToastMessage onClose={() => this._closeToast(2)} id="Toast2" duration={2000} dismissible={false} show={this.state.showToast2}>
                                Lorem ipsum dolor sit amet, amet hendrerit a semper reprehenderit <strong>with bold text</strong>, timeout 2s.
                            </HAToastMessage>
                            <HAToastMessage onClose={() => this._closeToast(3)} id="Toast3" duration={-1} dismissible={true} show={this.state.showToast3}>
                                Lorem ipsum dolor sit amet, amet hendrerit a semper reprehenderit, <strong>with bold text</strong>.
                            </HAToastMessage>
                        </div>

                        <button className="ha-button" value="Toast1" onClick={() => this._showToast(1)} >Show Toast 1</button>
                        <button className="ha-button" value="Toast2" onClick={() => this._showToast(2)} >Show Toast 2</button>
                        <button className="ha-button" value="Toast3" onClick={() => this._showToast(3)} >Show Toast 3</button>
                        <button className="ha-button" value="Toast3" onClick={() => this._closeToast(3)} >Close Toast 3</button>
                    </div>
                );
            }

            _showToast(toastIndex) {
                this.setState({
                    [`showToast${toastIndex}`]: true
                });
            }

            _closeToast(toastIndex) {
                this.setState({
                    [`showToast${toastIndex}`]: false
                });
            }

        }
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }

});
