(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./tooltips.hbs', 'dojo/dom-construct', 'text!./tooltips.dojo.html', 'react', 'react-dom', 'hui/react-components/HATextField', 'hui/react-components/HATooltip'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./tooltips.hbs'), require('dojo/dom-construct'), require('text!./tooltips.dojo.html'), require('react'), require('react-dom'), require('hui/react-components/HATextField'), require('hui/react-components/HATooltip'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.tooltips, global.domConstruct, global.tooltipsDojo, global.react, global.reactDom, global.HATextField, global.HATooltip);
        global.tooltipsView = mod.exports;
    }
})(this, function (exports, _backbone, _tooltips, _domConstruct, _tooltipsDojo, _react, _reactDom, _HATextField, _HATooltip) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _tooltips2 = _interopRequireDefault(_tooltips);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _tooltipsDojo2 = _interopRequireDefault(_tooltipsDojo);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _HATooltip2 = _interopRequireDefault(_HATooltip);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.closeAllPopups();
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_tooltips2.default);
            this.renderJS(this.$('#programmaticWay')[0]);
            this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            this._popups = Array.prototype.slice.call(this.el.querySelectorAll('ha-tooltip'));

            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var tooltips = _domConstruct2.default.toDom(_tooltipsDojo2.default),
                cloned = tooltips.cloneNode(true),
                dojoTextfield,
                dojoTooltip;

            _domConstruct2.default.place(cloned, placeToAppend);

            dojoTextfield = this.$el[0].querySelector('#dojo-textfield');
            dojoTooltip = this.$el[0].querySelector('#dojo-tooltip');

            dojoTextfield.addEventListener('focus', function () {
                dojoTooltip.show();
            }, true);

            dojoTextfield.addEventListener('blur', function () {
                dojoTooltip.close();
            }, true);

            dojoTextfield.addEventListener('mouseenter', function () {
                dojoTooltip.show();
            });

            dojoTextfield.addEventListener('mouseout', function (evt) {
                var target = evt.target,
                    active = target.ownerDocument.activeElement;

                if (active !== target && !target.contains(active)) {
                    dojoTooltip.close();
                }
            });
        },

        _appendChildWithWrapper: function _appendChildWithWrapper(child, parent) {
            var wrapper = document.createElement('div');

            wrapper.classList.add('separator');
            wrapper.appendChild(child);

            parent.appendChild(wrapper);

            return wrapper;
        },

        createTooltip: function createTooltip(options) {
            var createdTooltip = document.createElement('ha-tooltip'),
                propt = '';

            for (propt in options) {
                createdTooltip[propt] = options[propt];
            }
            return createdTooltip;
        },

        renderJS: function renderJS(placeToAppend) {
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
                tooltip1,
                tooltip2,
                tooltip3,
                tooltip4,
                tooltip5,
                tooltip6,
                tooltip7,
                tooltip8,
                tooltip9,
                tooltip10,
                htmlTooltip = this.$el[0].querySelector('#html-tooltip'),
                title,
                content,
                h2,
                label,
                wrapper;

            // Listeners for Declarative Instantiation with custom trigger

            htmlTextField.addEventListener('focus', function () {
                htmlTooltip.show();
            }, true);

            htmlTextField.addEventListener('blur', function () {
                htmlTooltip.close();
            }, true);

            htmlTextField.addEventListener('mouseenter', function () {
                htmlTooltip.show();
            });

            htmlTextField.addEventListener('mouseout', function (evt) {
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
                trigger: 'focus'
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
                message: 'This is a textview with a default tooltip and a bottom position.'
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

            textField10.addEventListener('focus', function () {
                tooltip10.show();
            }, true);

            textField10.addEventListener('blur', function () {
                tooltip10.close();
            }, true);

            textField10.addEventListener('mouseenter', function () {
                tooltip10.show();
            });

            textField10.addEventListener('mouseout', function (evt) {
                var target = evt.target,
                    active = target.ownerDocument.activeElement;

                if (active !== target && !target.contains(active)) {
                    tooltip10.close();
                }
            });
        },

        onClose: function onClose() {
            this.removeAllPopups();
        },

        closeAllPopups: function closeAllPopups() {
            this._popups.forEach(function (popup) {
                if (popup && popup.close) {
                    popup.close();
                }
            });
        },

        removeAllPopups: function removeAllPopups() {
            this._popups.forEach(function (popup) {
                if (popup && popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            });
        },

        renderReact: function renderReact(placeToAppend) {
            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            };

            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                componentDidMount: function componentDidMount() {
                    var reactTextfield = this.el.querySelector('#react-textfield');
                    var reactTooltip = this.el.querySelector('#react-tooltip');

                    reactTextfield.addEventListener('focus', function () {
                        reactTooltip.show();
                    }, true);

                    reactTextfield.addEventListener('blur', function () {
                        reactTooltip.close();
                    }, true);

                    reactTextfield.addEventListener('mouseenter', function () {
                        reactTooltip.show();
                    });

                    reactTextfield.addEventListener('mouseout', function (evt) {
                        var target = evt.target,
                            active = target.ownerDocument.activeElement;

                        if (active !== target && !target.contains(active)) {
                            reactTooltip.close();
                        }
                    });
                },

                render: function render() {
                    var _this = this;

                    return _react2.default.createElement(
                        'div',
                        {
                            ref: function ref(c) {
                                if (c) {
                                    _this.el = c;
                                }
                            }
                        },
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Focus'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { trigger: 'focus' },
                                'This is a textview with a default tooltip and trigger \'focus\''
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: '' },
                                'Default tooltip'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { trigger: 'focus', position: 'bottom', alignment: 'right', duration: 5000 },
                                'This is a textview with a timed (5 seconds) tooltip, position bottom, alignment right and trigger \'focus\''
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Timed (5 seconds) tooltip, bottom position, right alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { trigger: 'focus', position: 'top', alignment: 'right', dismissible: true, onShow: eventLog, onClose: eventLog, onDismiss: eventLog },
                                'This is a textview with a close button, position top, alignment right and trigger focus'
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Close button, top position, right alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { position: 'bottom', alignment: 'left', trigger: 'focus' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Rich content'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Tooltip with rich content, bottom position, left alignment'
                                )
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Tooltip with rich content, bottom position, left alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Hover'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                null,
                                'This is a textview with a default tooltip and a bottom position.'
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Default tooltip'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { position: 'top', alignment: 'left', duration: 5000 },
                                'This is a textview with a timed (5 seconds) tooltip'
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Timed (5 seconds), top position, left alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { position: 'top', alignment: 'left', dismissible: true },
                                'This is a textview with a close button and a top left position'
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Close button, top position and left alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, null),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { position: 'bottom', alignment: 'left' },
                                _react2.default.createElement(
                                    'h4',
                                    null,
                                    'Rich content'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    'Tooltip with rich content, bottom position, left alignment'
                                )
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Tooltip with rich content, bottom position, left alignment'
                            )
                        ),
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Focus and over'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'separator' },
                            _react2.default.createElement(_HATextField2.default, { id: 'react-textfield' }),
                            _react2.default.createElement(
                                _HATooltip2.default,
                                { id: 'react-tooltip', trigger: 'custom' },
                                'This is a textview with a custom trigger'
                            ),
                            _react2.default.createElement(
                                'label',
                                null,
                                'Default tooltip'
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=tooltips.view.js.map
