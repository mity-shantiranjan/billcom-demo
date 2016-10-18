var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./step-flow.hbs', 'dojo/dom-construct', 'text!./step-flow.html', './step-flow', 'react', 'react-dom', 'hui/react-components/HATrowser', 'hui/react-components/HASection', 'hui/react-components/HATrowserFooter', 'hui/react-components/HAStepFlow', 'hui/react-components/HAFlowStep', 'hui/react-components/HAFlowLanding', 'hui/react-components/HAFlowConfirmation', 'hui/react-components/HATextField', 'hui/react-components/HASelect', 'hui/react-components/HAItem', 'hui/react-components/HAStackedPageMessages', 'hui/react-components/HAPageMessage'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./step-flow.hbs'), require('dojo/dom-construct'), require('text!./step-flow.html'), require('./step-flow'), require('react'), require('react-dom'), require('hui/react-components/HATrowser'), require('hui/react-components/HASection'), require('hui/react-components/HATrowserFooter'), require('hui/react-components/HAStepFlow'), require('hui/react-components/HAFlowStep'), require('hui/react-components/HAFlowLanding'), require('hui/react-components/HAFlowConfirmation'), require('hui/react-components/HATextField'), require('hui/react-components/HASelect'), require('hui/react-components/HAItem'), require('hui/react-components/HAStackedPageMessages'), require('hui/react-components/HAPageMessage'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.stepFlow, global.domConstruct, global.stepFlow, global.stepFlow, global.react, global.reactDom, global.HATrowser, global.HASection, global.HATrowserFooter, global.HAStepFlow, global.HAFlowStep, global.HAFlowLanding, global.HAFlowConfirmation, global.HATextField, global.HASelect, global.HAItem, global.HAStackedPageMessages, global.HAPageMessage);
        global.stepFlowView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _stepFlow, _domConstruct, _stepFlow3, _stepFlow5, _react, _reactDom, _HATrowser, _HASection, _HATrowserFooter, _HAStepFlow, _HAFlowStep, _HAFlowLanding, _HAFlowConfirmation, _HATextField, _HASelect, _HAItem, _HAStackedPageMessages, _HAPageMessage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _stepFlow2 = _interopRequireDefault(_stepFlow);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _stepFlow4 = _interopRequireDefault(_stepFlow3);

    var _stepFlow6 = _interopRequireDefault(_stepFlow5);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATrowser2 = _interopRequireDefault(_HATrowser);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HATrowserFooter2 = _interopRequireDefault(_HATrowserFooter);

    var _HAStepFlow2 = _interopRequireDefault(_HAStepFlow);

    var _HAFlowStep2 = _interopRequireDefault(_HAFlowStep);

    var _HAFlowLanding2 = _interopRequireDefault(_HAFlowLanding);

    var _HAFlowConfirmation2 = _interopRequireDefault(_HAFlowConfirmation);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _HASelect2 = _interopRequireDefault(_HASelect);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAStackedPageMessages2 = _interopRequireDefault(_HAStackedPageMessages);

    var _HAPageMessage2 = _interopRequireDefault(_HAPageMessage);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var StepFlowView = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.renderHTML(_stepFlow2.default, _stepFlow4.default);
            this.renderJS(this.$('#js .examples')[0]);
            this.renderDojo(_stepFlow4.default, this.$('#dojo .examples')[0]);
            this.renderReact(this.$('#react .examples')[0]);

            // calling step-flow close() when X close button of trowser is clicked to reset it
            // FF, Safari, IE uses a shim to support custom elements
            // using renderHTML/renderDojo (which uses innerHTML) makes it async for these browsers
            // using event delegation and targeting ha-trowser
            this.el.addEventListener('close', function (evt) {
                if (evt.target.localName === 'ha-trowser') {
                    evt.target.querySelector('ha-step-flow').close();
                }
            });

            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
            this._attachListeners("html");
        },

        renderJS: function renderJS(el) {
            _stepFlow6.default.render(el);
        },

        renderDojo: function renderDojo(template, el) {
            var component = _domConstruct2.default.toDom(template),
                cloned = component.cloneNode(true);

            _domConstruct2.default.place(cloned, el);
            this._attachListeners("dojo");
        },

        renderReact: function renderReact(el) {
            var StepFlowExamples = function (_React$Component) {
                _inherits(StepFlowExamples, _React$Component);

                function StepFlowExamples(props) {
                    _classCallCheck(this, StepFlowExamples);

                    var _this = _possibleConstructorReturn(this, (StepFlowExamples.__proto__ || Object.getPrototypeOf(StepFlowExamples)).call(this, props));

                    _this.state = {
                        showTrowser: false,
                        showStepFlow: false,
                        hideStepButtons: false
                    };
                    return _this;
                }

                _createClass(StepFlowExamples, [{
                    key: 'render',
                    value: function render() {
                        var _this2 = this;

                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'h3',
                                null,
                                'Step Flow with Progress Indicator, Landing page and Confirmation page '
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'show-flow ha-button ha-button-primary', onClick: function onClick() {
                                        return _this2._showStepFlow();
                                    } },
                                'Show Complex Step Flow'
                            ),
                            _react2.default.createElement(
                                _HATrowser2.default,
                                {
                                    titleText: 'Complex Step flow',
                                    dismissible: true,
                                    reactLayering: true,
                                    show: this.state.showTrowser,
                                    onClose: function onClose() {
                                        return console.log('close was fired');
                                    },
                                    onDismiss: function onDismiss() {
                                        console.log('dismiss was fired');
                                        _this2._closeStepFlow();
                                    } },
                                _react2.default.createElement(
                                    _HASection2.default,
                                    null,
                                    _react2.default.createElement(
                                        _HAStepFlow2.default,
                                        {
                                            onDone: function onDone() {
                                                console.log('done was fired');
                                                _this2._closeStepFlow();
                                            },
                                            onClose: function onClose() {
                                                console.log('close was fired');
                                                _this2._closeStepFlow();
                                            },
                                            show: this.state.showStepFlow,
                                            progressIndicator: true
                                        },
                                        _react2.default.createElement(
                                            _HAFlowLanding2.default,
                                            null,
                                            _react2.default.createElement(
                                                _HASection2.default,
                                                null,
                                                _react2.default.createElement(
                                                    'h3',
                                                    null,
                                                    'Landing Page'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _HAFlowConfirmation2.default,
                                            { titleText: 'Confirmed!', subtitleText: 'Everything is good to go.' },
                                            _react2.default.createElement(
                                                _HASection2.default,
                                                null,
                                                'Custom content'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _HAFlowStep2.default,
                                            { titleText: 'Some information about you...', subtitleText: 'Step subtitle', hideStepButtons: this.state.hideStepButtons, showSaveForLaterButton: true },
                                            _react2.default.createElement(
                                                _HASection2.default,
                                                null,
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-xl-4 col-lg-6 col-sm-12' },
                                                        _react2.default.createElement(_HATextField2.default, { label: 'First Name' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-xl-4 col-lg-6 col-sm-12' },
                                                        _react2.default.createElement(_HATextField2.default, { label: 'Last Name' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-xl-4 col-lg-6 col-sm-12' },
                                                        _react2.default.createElement(_HATextField2.default, { label: 'Address' })
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-xl-4 col-lg-6 col-sm-12' },
                                                        _react2.default.createElement(
                                                            _HASelect2.default,
                                                            { label: 'Pick a color' },
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'blue' },
                                                                'Blue'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'red' },
                                                                'Red'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'green' },
                                                                'Green'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'yellow' },
                                                                'Yellow'
                                                            )
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-xl-4 col-lg-6 col-sm-12' },
                                                        _react2.default.createElement(
                                                            _HASelect2.default,
                                                            { label: 'Pick a shape' },
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'square' },
                                                                'Square'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'circle' },
                                                                'Circle'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'triangle' },
                                                                'Triangle'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAItem2.default,
                                                                { value: 'rectangle' },
                                                                'Rectangle'
                                                            )
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'button',
                                                    { className: 'toggleStepEdit ha-button pull-right', onClick: function onClick() {
                                                            return _this2._toggleEdit();
                                                        } },
                                                    'Toggle Edit Mode'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _HAFlowStep2.default,
                                            { titleText: 'Step with validation', nextButtonText: 'Custom Next', previousButtonText: 'Custom Previous',
                                                validator: function validator() {
                                                    return _this2._validateStep2();
                                                } },
                                            _react2.default.createElement(
                                                _HASection2.default,
                                                null,
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    _react2.default.createElement(_HATextField2.default, { ref: 'reqField', label: 'Required Field', placeholder: 'required', required: true })
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _HAFlowStep2.default,
                                            { titleText: 'Messages for you' },
                                            _react2.default.createElement(
                                                _HASection2.default,
                                                null,
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'row' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'col-sm-12' },
                                                        _react2.default.createElement(
                                                            _HAStackedPageMessages2.default,
                                                            null,
                                                            _react2.default.createElement(
                                                                _HAPageMessage2.default,
                                                                { titleText: 'Error Title', type: 'error', dismissible: false },
                                                                'Error message text, non dismissible'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAPageMessage2.default,
                                                                { titleText: 'Warn Title', type: 'warn', dismissible: true },
                                                                'Warn message text'
                                                            ),
                                                            _react2.default.createElement(
                                                                _HAPageMessage2.default,
                                                                { titleText: 'Info Title', type: 'info', dismissible: true },
                                                                'Warn message text'
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: '_showStepFlow',
                    value: function _showStepFlow() {
                        this.setState({ showStepFlow: true });
                        this.setState({ showTrowser: true });
                    }
                }, {
                    key: '_closeStepFlow',
                    value: function _closeStepFlow() {
                        this.setState({ showStepFlow: false });
                        this.setState({ showTrowser: false });
                    }
                }, {
                    key: '_toggleEdit',
                    value: function _toggleEdit() {
                        this.setState({ hideStepButtons: !this.state.hideStepButtons });
                    }
                }, {
                    key: '_validateStep2',
                    value: function _validateStep2() {
                        var reqField = this.refs.reqField;
                        return reqField._huiComponent.reportValidity();
                    }
                }]);

                return StepFlowExamples;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(StepFlowExamples, null), el);
        },

        _attachListeners: function _attachListeners(demoId) {

            if (demoId !== "html" && demoId !== "dojo") {
                return;
            }

            this.$('#' + demoId + ' .basic-html button.show-flow')[0].addEventListener('click', function () {
                this.$('#' + demoId + ' .basic-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .basic-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .basic-html #ha-flow-step-2')[0].validator = function () {
                var valid = this.$('#' + demoId + ' .basic-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .complex-html button.show-flow')[0].addEventListener('click', function () {
                this.$('#' + demoId + ' .complex-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .complex-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .complex-html #ha-flow-step-2')[0].validator = function () {
                var valid = this.$('#' + demoId + ' .complex-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .complex-nonlinear-html button.show-flow')[0].addEventListener('click', function () {
                this.$('#' + demoId + ' .complex-nonlinear-html ha-step-flow')[0].show();
                this.$('#' + demoId + ' .complex-nonlinear-html ha-trowser')[0].show();
            }.bind(this));

            this.$('#' + demoId + ' .complex-nonlinear-html #ha-flow-step-2')[0].validator = function () {
                var valid = this.$('#' + demoId + ' .complex-nonlinear-html #ha-flow-step-2 #reqField')[0].reportValidity();
                return valid;
            }.bind(this);

            this.$('#' + demoId + ' .toggleStepEdit')[0].addEventListener('click', function () {
                var step1 = this.$('#' + demoId + ' #ha-flow-step-1')[0];
                step1.hideStepButtons = !step1.hideStepButtons;
            }.bind(this));
        }
    });

    exports.default = StepFlowView;
});
//# sourceMappingURL=step-flow.view.js.map
