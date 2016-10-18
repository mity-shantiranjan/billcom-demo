/* jshint ignore:start */

import Backbone from 'backbone';
import template from 'text!./tooltips.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./tooltips.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HATextField from 'hui/react-components/HATextField';
import HATooltip from 'hui/react-components/HATooltip';

export default Backbone.View.extend({

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.closeAllPopups();
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function() {
        this.$el.html(template);
        this.renderJS(this.$('#programmaticWay')[0]);
        this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$('#reactWay')[0]);
        this._popups = Array.prototype.slice.call(this.el.querySelectorAll('ha-tooltip'));

        return this;
    },

    renderDojo: function(placeToAppend) {
        var tooltips = domConstruct.toDom(demoTemplate),
            cloned = tooltips.cloneNode(true),
            dojoTextfield,
            dojoTooltip;

        domConstruct.place(cloned, placeToAppend);

        dojoTextfield = this.$el[0].querySelector('#dojo-textfield');
        dojoTooltip = this.$el[0].querySelector('#dojo-tooltip');

        dojoTextfield.addEventListener('focus', function() {
            dojoTooltip.show();
        }, true);

        dojoTextfield.addEventListener('blur', function() {
            dojoTooltip.close();
        }, true);

        dojoTextfield.addEventListener('mouseenter', function() {
            dojoTooltip.show();
        });

        dojoTextfield.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                dojoTooltip.close();
            }
        });
    },

    _appendChildWithWrapper: function(child, parent) {
        var wrapper = document.createElement('div');

        wrapper.classList.add('separator');
        wrapper.appendChild(child);

        parent.appendChild(wrapper);

        return wrapper;
    },

    createTooltip: function(options) {
        var createdTooltip = document.createElement('ha-tooltip'),
            propt = '';

        for (propt in options) {
            createdTooltip[propt] = options[propt];
        }
        return createdTooltip;
    },

    renderJS: function(placeToAppend) {
        var textField1 = document.createElement('ha-text-field'),
            textField2 = document.createElement('ha-text-field'),
            textField3 = document.createElement('ha-text-field'),
            textField4 = document.createElement('ha-text-field'),
            textField5 = document.createElement('ha-text-field'),
            textField5b = document.createElement('ha-text-field'),
            textField6 = document.createElement('ha-text-field'),
            textField7 = document.createElement('ha-text-field'),
            textField8 = document.createElement('ha-text-field'),
            textField9 = document.createElement('ha-text-field'),
            textField10 = document.createElement('ha-text-field'),
            htmlTextField = this.$el[0].querySelector('#html-textfield'),

            tooltipTitle = document.createElement('h2'),
            tooltip1, tooltip2, tooltip3, tooltip4, tooltip5,
            tooltip6, tooltip7, tooltip8, tooltip9, tooltip10,
            htmlTooltip = this.$el[0].querySelector('#html-tooltip'),
            title, content, h2,
            label, wrapper;

        // Listeners for Declarative Instantiation with custom trigger

        htmlTextField.addEventListener('focus', function() {
            htmlTooltip.show();
        }, true);

        htmlTextField.addEventListener('blur', function() {
            htmlTooltip.close();
        }, true);

        htmlTextField.addEventListener('mouseenter', function() {
            htmlTooltip.show();
        });

        htmlTextField.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                htmlTooltip.close();
            }
        });


        // Programmatic Instantiation

        textField5.classList.add('tooltip-selector-js');
        textField5b.classList.add('tooltip-selector-js');
        textField5.tooltipMessage = 'Grouped tooltip - textfield 1';
        textField5b.tooltipMessage = 'Grouped tooltip - textfield 2';

        tooltip1 = this.createTooltip({
            message: 'This is a textview with a default tooltip and trigger focus',
            trigger: 'focus',
        });

        tooltip2 = this.createTooltip({
            message: 'This is a textview with a timed (5 seconds) tooltip, position bottom and trigger focus',
            position: 'bottom',
            trigger: 'focus',
            alignment: 'right',
            duration: 5000
        });

        tooltip3 = this.createTooltip({
            message: 'This is a textview with a close button, position top and trigger focus',
            position: 'top',
            trigger: 'focus',
            alignment: 'right',
            dismissible: true
        });

        tooltip4 = this.createTooltip({
            trigger: 'focus',
            position: 'bottom',
            alignment: 'left'
        });
        title = document.createElement('h4');
        content = document.createElement('p');
        title.innerHTML = 'Rich content';
        content.innerHTML = 'Tooltip with rich content, bottom position';
        tooltip4.message = [title, content];

        tooltip6 = this.createTooltip({
            message: 'This is a textview with a default tooltip and a bottom position.',
        });

        tooltip7 = this.createTooltip({
            message: 'This is a textview with a timed (5 seconds) tooltip',
            position: 'top',
            alignment: 'left',
            duration: 5000
        });

        tooltip8 = this.createTooltip({
            message: 'This is a textview with a close button and a top left position',
            position: 'top',
            alignment: 'left',
            dismissible: true
        });

        tooltip9 = this.createTooltip({
            trigger: 'hover',
            position: 'bottom',
            alignment: 'left'
        });
        title = document.createElement('h4');
        content = document.createElement('p');
        title.innerHTML = 'Rich content';
        content.innerHTML = 'Tooltip with rich content, bottom position';
        tooltip9.message = [title, content];

        tooltip5 = this.createTooltip({
            targetSelector: '.tooltip-selector-js'
        });

        tooltip10 = this.createTooltip({
            message: 'This is a textview with a custom trigger',
            trigger: 'custom'
        });

        placeToAppend.appendChild(tooltipTitle);

        h2 = document.createElement('h2');
        h2.innerHTML = "Focus";
        placeToAppend.appendChild(h2);
        wrapper = this._appendChildWithWrapper(textField1, placeToAppend);
        wrapper.appendChild(tooltip1);
        label = document.createElement('label');
        label.innerHTML = "Default tooltip";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField2, placeToAppend);
        wrapper.appendChild(tooltip2);
        label = document.createElement('label');
        label.innerHTML = "Timed (5 seconds) tooltip, bottom position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField3, placeToAppend);
        wrapper.appendChild(tooltip3);
        label = document.createElement('label');
        label.innerHTML = "Close button, top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField4, placeToAppend);
        wrapper.appendChild(tooltip4);
        label = document.createElement('label');
        label.innerHTML = "Tooltip with rich content, bottom position";
        wrapper.appendChild(label);

        h2 = document.createElement('h2');
        h2.innerHTML = "Hover";
        placeToAppend.appendChild(h2);

        wrapper = this._appendChildWithWrapper(textField6, placeToAppend);
        wrapper.appendChild(tooltip6);
        label = document.createElement('label');
        label.innerHTML = "Default tooltip";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField7, placeToAppend);
        wrapper.appendChild(tooltip7);
        label = document.createElement('label');
        label.innerHTML = "Timed (5 seconds), top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField8, placeToAppend);
        wrapper.appendChild(tooltip8);
        label = document.createElement('label');
        label.innerHTML = "Close button, top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField9, placeToAppend);
        wrapper.appendChild(tooltip9);
        label = document.createElement('label');
        label.innerHTML = "Tooltip with rich content, bottom position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(textField5, placeToAppend);
        wrapper.appendChild(textField5b);
        wrapper.appendChild(tooltip5);
        label = document.createElement('label');
        label.innerHTML = "Grouped tooltip";
        wrapper.appendChild(label);

        h2 = document.createElement('h2');
        h2.innerHTML = "Focus and hover";
        placeToAppend.appendChild(h2);

        wrapper = this._appendChildWithWrapper(textField10, placeToAppend);
        wrapper.appendChild(tooltip10);
        label = document.createElement('label');
        label.innerHTML = "Default tooltip";
        wrapper.appendChild(label);

        textField10.addEventListener('focus', function() {
            tooltip10.show();
        }, true);

        textField10.addEventListener('blur', function() {
            tooltip10.close();
        }, true);

        textField10.addEventListener('mouseenter', function() {
            tooltip10.show();
        });

        textField10.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                tooltip10.close();
            }
        });
    },

    onClose: function() {
        this.removeAllPopups();
    },

    closeAllPopups: function() {
        this._popups.forEach(function(popup) {
            if (popup && popup.close) {
                popup.close();
            }
        });
    },

    removeAllPopups: function() {
        this._popups.forEach(function(popup) {
            if (popup && popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        });
    },

    renderReact: function(placeToAppend) {
        let eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        let ExampleComponent = React.createClass({

            componentDidMount: function() {
                let reactTextfield = this.el.querySelector('#react-textfield');
                let reactTooltip = this.el.querySelector('#react-tooltip');

                reactTextfield.addEventListener('focus', function() {
                    reactTooltip.show();
                }, true);

                reactTextfield.addEventListener('blur', function() {
                    reactTooltip.close();
                }, true);

                reactTextfield.addEventListener('mouseenter', function() {
                    reactTooltip.show();
                });

                reactTextfield.addEventListener('mouseout', function(evt) {
                    var target = evt.target,
                        active = target.ownerDocument.activeElement;

                    if (active !== target && !target.contains(active)) {
                        reactTooltip.close();
                    }
                });
            },

            render: function() {
                return (
                    <div
                        ref={(c) => {
                            if (c) {
                                this.el = c;
                            }
                        }}
                    >
                        <h2>Focus</h2>
                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip trigger="focus">
                                This is a textview with a default tooltip and trigger 'focus'
                            </HATooltip>
                            <label htmlFor="">Default tooltip</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip trigger="focus" position="bottom" alignment="right" duration={5000}>
                                This is a textview with a timed (5 seconds) tooltip, position bottom, alignment right and trigger 'focus'
                            </HATooltip>
                            <label>Timed (5 seconds) tooltip, bottom position, right alignment</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip trigger="focus" position="top" alignment="right" dismissible={true} onShow={eventLog} onClose={eventLog} onDismiss={eventLog}>
                                This is a textview with a close button, position top, alignment right and trigger focus
                            </HATooltip>
                            <label>Close button, top position, right alignment</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip position="bottom" alignment="left" trigger="focus">
                                <h4>Rich content</h4>
                                <p>Tooltip with rich content, bottom position, left alignment</p>
                            </HATooltip>
                            <label>Tooltip with rich content, bottom position, left alignment</label>
                        </div>

                        <h2>Hover</h2>
                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip>
                                This is a textview with a default tooltip and a bottom position.
                            </HATooltip>
                            <label>Default tooltip</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip position="top" alignment="left" duration={5000}>
                                This is a textview with a timed (5 seconds) tooltip
                            </HATooltip>
                            <label>Timed (5 seconds), top position, left alignment</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip position="top" alignment="left" dismissible={true}>
                                This is a textview with a close button and a top left position
                            </HATooltip>
                            <label>Close button, top position and left alignment</label>
                        </div>

                        <div className="separator">
                            <HATextField></HATextField>
                            <HATooltip position="bottom" alignment="left">
                                <h4>Rich content</h4>
                                <p>Tooltip with rich content, bottom position, left alignment</p>
                            </HATooltip>
                            <label>Tooltip with rich content, bottom position, left alignment</label>
                        </div>

                        <h2>Focus and over</h2>
                        <div className="separator">
                            <HATextField id="react-textfield"></HATextField>
                            <HATooltip id="react-tooltip" trigger="custom">
                                This is a textview with a custom trigger
                            </HATooltip>
                            <label>Default tooltip</label>
                        </div>
                    </div>
                );
            }
        });
        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }
});

/* jshint ignore:end */
