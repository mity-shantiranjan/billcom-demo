import Backbone from 'backbone';
import template from 'text!./single-step.hbs';
import domConstruct from 'dojo/dom-construct';
import demoTemplate from 'text!./single-step.dojo.html';
import React from 'react';
import ReactDOM from 'react-dom';
import HATextField from 'hui/react-components/HATextField';
import HASingleStep from 'hui/react-components/HASingleStep';

export default Backbone.View.extend({

    render: function() {
        this.$el.html(template);
        this.renderJS(this.$el.find('#programmaticWay')[0]);
        this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
        this.renderReact(this.$el.find('#reactWay')[0]);
        return this;
    },

    events: {
        'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function(evt) {
        this.$el.find('.panel').addClass('hidden');
        this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    renderDojo: function(placeToAppend) {
        var singleSteps = domConstruct.toDom(demoTemplate),
            cloned = singleSteps.cloneNode(true),
            dojoButton,
            dojoSingleStep;

        domConstruct.place(cloned, placeToAppend);

        dojoButton = this.$el[0].querySelector('#dojo-ha-text-field');
        dojoSingleStep = this.$el[0].querySelector('#dojo-single-step');

        dojoButton.addEventListener('focus', function() {
            dojoSingleStep.show();
        }, true);

        dojoButton.addEventListener('blur', function() {
            dojoSingleStep.close();
        }, true);

        dojoButton.addEventListener('mouseenter', function() {
            dojoSingleStep.show();
        });

        dojoButton.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                dojoSingleStep.close();
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

    createSingleStep: function(options) {
        var createdSingleStep = document.createElement('ha-single-step'),
            propt = '';

        for (propt in options) {
            createdSingleStep[propt] = options[propt];
        }
        return createdSingleStep;
    },

    createButton: function() {
        var textField = document.createElement('ha-text-field');
        return textField;
    },

    renderJS: function(placeToAppend) {
        var Button1 = this.createButton(),
            Button2 = this.createButton(),
            Button3 = this.createButton(),
            Button4 = this.createButton(),
            Button5 = this.createButton(),
            Button6 = this.createButton(),
            Button7 = this.createButton(),
            Button8 = this.createButton(),
            Button9 = this.createButton(),
            Button10 = this.createButton(),
            Button11 = this.createButton(),
            Button12 = this.createButton(),
            Button13 = this.createButton(),
            Button14 = this.createButton(),
            htmlButton = this.$el[0].querySelector('#html-ha-text-field'),

            singleStepTitle = document.createElement('h2'),
            singleStep1, singleStep2, singleStep3, singleStep4, singleStep5,
            singleStep6, singleStep7, singleStep8, singleStep9, singleStep10,
            singleStep11, singleStep12, singleStep13, singleStep14,
            htmlSingleStep = this.$el[0].querySelector('#html-single-step'),
            title, content, h2, label, wrapper;

        // Listeners for Declarative Instantiation with custom trigger

        htmlButton.addEventListener('focus', function() {
            htmlSingleStep.show();
        }, true);

        htmlButton.addEventListener('blur', function() {
            htmlSingleStep.close();
        }, true);

        htmlButton.addEventListener('mouseenter', function() {
            htmlSingleStep.show();
        });

        htmlButton.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                htmlSingleStep.close();
            }
        });


        // Programmatic Instantiation

        singleStep1 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a textview with a default single step and trigger focus',
            trigger: 'focus',
            open: false
        });

        singleStep2 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a textview with a timed (5 seconds) single step, position bottom and trigger focus',
            position: 'bottom',
            trigger: 'focus',
            alignment: 'right',
            duration: 5000,
            open: false
        });

        singleStep3 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a textview with a close button, position top and trigger focus',
            position: 'top',
            trigger: 'focus',
            dismissible: true,
            open: false
        });

        singleStep4 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'top left',
            dismissible: true,
            open: false
        });

        singleStep5 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'right top',
            dismissible: true,
            open: false
        });

        singleStep6 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'bottom right',
            dismissible: true,
            open: false
        });

        singleStep7 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'bottom left',
            dismissible: true,
            open: false
        });

        singleStep8 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'left top',
            dismissible: true,
            open: false
        });

        singleStep9 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            trigger: 'focus',
            position: 'top',
            open: false
        });
        title = document.createElement('h4');
        content = document.createElement('p');
        title.innerHTML = 'Rich content JS';
        content.innerHTML = 'single step with rich content, top position';
        singleStep9.message = [title, content];

        //--------------------------

        singleStep10 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            open: false
        });

        singleStep11 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            duration: 5000,
            open: false
        });

        singleStep12 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a plain text message',
            position: 'top',
            dismissible: true,
            open: false
        });

        singleStep13 = this.createSingleStep({
            titleText: 'Some Title',
            trigger: 'hover',
            position: 'top',
            open: false
        });
        title = document.createElement('h4');
        content = document.createElement('p');
        title.innerHTML = 'Rich content JS';
        content.innerHTML = 'single step with rich content, bottom position';
        singleStep13.message = [title, content];

        singleStep14 = this.createSingleStep({
            titleText: 'Some Title',
            message: 'This is a textview with a custom trigger',
            trigger: 'custom',
            open: false
        });

        placeToAppend.appendChild(singleStepTitle);

        h2 = document.createElement('h2');
        h2.innerHTML = "Focus";
        placeToAppend.appendChild(h2);

        wrapper = this._appendChildWithWrapper(Button1, placeToAppend);
        wrapper.appendChild(singleStep1);
        label = document.createElement('label');
        label.innerHTML = "Default single step";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button2, placeToAppend);
        wrapper.appendChild(singleStep2);
        label = document.createElement('label');
        label.innerHTML = "Timed (5 seconds) single step, bottom position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button3, placeToAppend);
        wrapper.appendChild(singleStep3);
        label = document.createElement('label');
        label.innerHTML = "Close button, top right position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button4, placeToAppend);
        wrapper.appendChild(singleStep4);
        label = document.createElement('label');
        label.innerHTML = "Close button, top left position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button5, placeToAppend);
        wrapper.appendChild(singleStep5);
        label = document.createElement('label');
        label.innerHTML = "Close button, right top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button6, placeToAppend);
        wrapper.appendChild(singleStep6);
        label = document.createElement('label');
        label.innerHTML = "Close button, bottom right position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button7, placeToAppend);
        wrapper.appendChild(singleStep7);
        label = document.createElement('label');
        label.innerHTML = "Close button, bottom left position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button8, placeToAppend);
        wrapper.appendChild(singleStep8);
        label = document.createElement('label');
        label.innerHTML = "Close button, left top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button9, placeToAppend);
        wrapper.appendChild(singleStep9);
        label = document.createElement('label');
        label.innerHTML = "single step with rich content, top position";
        wrapper.appendChild(label);

        h2 = document.createElement('h2');
        h2.innerHTML = "Hover";
        placeToAppend.appendChild(h2);

        wrapper = this._appendChildWithWrapper(Button10, placeToAppend);
        wrapper.appendChild(singleStep10);
        label = document.createElement('label');
        label.innerHTML = "Default single-step";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button11, placeToAppend);
        wrapper.appendChild(singleStep11);
        label = document.createElement('label');
        label.innerHTML = "Timed (5 seconds), top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button12, placeToAppend);
        wrapper.appendChild(singleStep12);
        label = document.createElement('label');
        label.innerHTML = "Close button, top position";
        wrapper.appendChild(label);

        wrapper = this._appendChildWithWrapper(Button13, placeToAppend);
        wrapper.appendChild(singleStep13);
        label = document.createElement('label');
        label.innerHTML = "single-step with rich content, top position";
        wrapper.appendChild(label);

        h2 = document.createElement('h2');
        h2.innerHTML = "Custom Focus and Hover";
        placeToAppend.appendChild(h2);

        wrapper = this._appendChildWithWrapper(Button14, placeToAppend);
        wrapper.appendChild(singleStep14);
        label = document.createElement('label');
        label.innerHTML = "Custom trigger single step";
        wrapper.appendChild(label);

        Button14.addEventListener('focus', function() {
            singleStep14.show();
        }, true);

        Button14.addEventListener('blur', function() {
            singleStep14.close();
        }, true);

        Button14.addEventListener('mouseenter', function() {
            singleStep14.show();
        });

        Button14.addEventListener('mouseout', function(evt) {
            var target = evt.target,
                active = target.ownerDocument.activeElement;

            if (active !== target && !target.contains(active)) {
                singleStep14.close();
            }
        });
    },

    renderReact: function (placeToAppend) {
        var eventLog = function(e) {
            console.log(`${e.target.tagName} ${e.type} fired`);
        };

        var ExampleComponent = React.createClass({

            //Add event listeners for the last example
            handleFocus : function(e) {
                document.getElementById('react-single-step').show();
            },

            handleBlur : function() {
                document.getElementById('react-single-step').close();
            },

            handleMouseEnter : function() {
                document.getElementById('react-single-step').show();
            },

            handleMouseOut : function(evt) {
                var target = evt.target,
                    active = target.ownerDocument.activeElement;

                if (active !== target && !target.contains(active)) {
                    document.getElementById('react-single-step').close();
                }
            },

            render: function () {
                return (
                    <div>
                    <h2>Focus and over</h2>
                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} trigger="focus" titleText="Some sore of title">
                    <span>This is a textview with a default single-step and trigger 'focus'</span>
                </HASingleStep>
                <label htmlFor="">Default single-step</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} trigger="focus" position="bottom" alignment="right"
                titleText="Some sore of title"
                duration="5000"
                    >
                    <span>This is a textview with a timed (5 seconds) single-step, position bottom and trigger 'focus'</span>
                </HASingleStep>
                <label>Timed (5 seconds) single-step, bottom position</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} trigger="focus" position="top" alignment="right"  titleText="Some sore of title" dismissible={true}>
                    <span>This is a textview with a close button, position top and trigger focus</span>
                </HASingleStep>
                <label>Close button, top position</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} position="bottom" titleText="Some sore of title" alignment="left" trigger="focus">
                    <h4>Rich content</h4>
                <p>single-step with rich content, bottom position</p>
                </HASingleStep>
                <label>single-step with rich content, bottom position</label>
                </div>

                <h2>Hover</h2>
                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} titleText="Some sore of title">
                    <span>This is a textview with a default single-step and trigger 'hover'.</span>
                </HASingleStep>
                <label>Default single-step</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} position="top" alignment="left"
                titleText="Some sore of title"
                duration="5000"
                    >
                    <span>This is a textview with a timed (5 seconds) single-step</span>
                </HASingleStep>
                <label>Timed (5 seconds), top position</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} position="top" alignment="left"
                titleText="Some sore of title"
                dismissible={true}
                    >
                    <span>This is a textview with a close button and a top left position</span>
                </HASingleStep>
                <label>Close button, top position</label>
                </div>

                <div className="separator">
                    <HATextField></HATextField>
                    <HASingleStep open={false} titleText="Some sore of title" position="top" alignment="left">
                    <h4>Rich content</h4>
                <p>single-step with rich content, top position</p>
                </HASingleStep>
                <label>single-step with rich content, top position</label>
                </div>

                <h2>Focus and over</h2>
                <div className="separator">
                    <span
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseEnter={this.handleMouseEnter}
                onMouseOut={this.handleMouseOut}
                >
                <HATextField id="react-textfield"
                    ></HATextField>
                    <HASingleStep open={false} id="react-single-step" titleText="Some sore of title" trigger="custom">
                    <span>This is a textview with a custom trigger</span>
                </HASingleStep>
                </span>
                <label>Default single-step</label>
                </div>
                </div>
                );
            }
        });

        ReactDOM.render(<ExampleComponent/>, placeToAppend);
    }

});