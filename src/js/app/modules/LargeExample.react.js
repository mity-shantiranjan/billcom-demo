var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HAAside', 'hui/react-components/HACardDiscoveryLarge', 'hui/react-components/HACheckbox', 'hui/react-components/HACheckboxGroup', 'hui/react-components/HAComboButton', 'hui/react-components/HAComboLink', 'hui/react-components/HAFlowConfirmation', 'hui/react-components/HAFlowLanding', 'hui/react-components/HAFlowStep', 'hui/react-components/HAInfoLink', 'hui/react-components/HAItem', 'hui/react-components/HALabel', 'hui/react-components/HAMenuButton', 'hui/react-components/HAMessage', 'hui/react-components/HAPageMessage', 'hui/react-components/HAPortal', 'hui/react-components/HARadioButton', 'hui/react-components/HARadioButtonGroup', 'hui/react-components/HASelect', 'hui/react-components/HAStackedPageMessages', 'hui/react-components/HAStage', 'hui/react-components/HAStepFlow', 'hui/react-components/HATab', 'hui/react-components/HATabs', 'hui/react-components/HAText', 'hui/react-components/HATextField', 'hui/react-components/HATextarea', 'hui/react-components/HAToastMessage', 'hui/react-components/HATooltip', 'hui/react-components/HADrawerLarge', 'hui/react-components/HAFooter', 'hui/react-components/HASection', 'hui/react-components/HATrowser', 'hui/react-components/HATrowserFooter', 'hui/react-components/HAFooterRight', 'hui/react-components/HAFooterCenter', 'hui/react-components/HAModal'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HAAside'), require('hui/react-components/HACardDiscoveryLarge'), require('hui/react-components/HACheckbox'), require('hui/react-components/HACheckboxGroup'), require('hui/react-components/HAComboButton'), require('hui/react-components/HAComboLink'), require('hui/react-components/HAFlowConfirmation'), require('hui/react-components/HAFlowLanding'), require('hui/react-components/HAFlowStep'), require('hui/react-components/HAInfoLink'), require('hui/react-components/HAItem'), require('hui/react-components/HALabel'), require('hui/react-components/HAMenuButton'), require('hui/react-components/HAMessage'), require('hui/react-components/HAPageMessage'), require('hui/react-components/HAPortal'), require('hui/react-components/HARadioButton'), require('hui/react-components/HARadioButtonGroup'), require('hui/react-components/HASelect'), require('hui/react-components/HAStackedPageMessages'), require('hui/react-components/HAStage'), require('hui/react-components/HAStepFlow'), require('hui/react-components/HATab'), require('hui/react-components/HATabs'), require('hui/react-components/HAText'), require('hui/react-components/HATextField'), require('hui/react-components/HATextarea'), require('hui/react-components/HAToastMessage'), require('hui/react-components/HATooltip'), require('hui/react-components/HADrawerLarge'), require('hui/react-components/HAFooter'), require('hui/react-components/HASection'), require('hui/react-components/HATrowser'), require('hui/react-components/HATrowserFooter'), require('hui/react-components/HAFooterRight'), require('hui/react-components/HAFooterCenter'), require('hui/react-components/HAModal'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HAAside, global.HACardDiscoveryLarge, global.HACheckbox, global.HACheckboxGroup, global.HAComboButton, global.HAComboLink, global.HAFlowConfirmation, global.HAFlowLanding, global.HAFlowStep, global.HAInfoLink, global.HAItem, global.HALabel, global.HAMenuButton, global.HAMessage, global.HAPageMessage, global.HAPortal, global.HARadioButton, global.HARadioButtonGroup, global.HASelect, global.HAStackedPageMessages, global.HAStage, global.HAStepFlow, global.HATab, global.HATabs, global.HAText, global.HATextField, global.HATextarea, global.HAToastMessage, global.HATooltip, global.HADrawerLarge, global.HAFooter, global.HASection, global.HATrowser, global.HATrowserFooter, global.HAFooterRight, global.HAFooterCenter, global.HAModal);
        global.LargeExample = mod.exports;
    }
})(this, function (exports, _react, _HAAside, _HACardDiscoveryLarge, _HACheckbox, _HACheckboxGroup, _HAComboButton, _HAComboLink, _HAFlowConfirmation, _HAFlowLanding, _HAFlowStep, _HAInfoLink, _HAItem, _HALabel, _HAMenuButton, _HAMessage, _HAPageMessage, _HAPortal, _HARadioButton, _HARadioButtonGroup, _HASelect, _HAStackedPageMessages, _HAStage, _HAStepFlow, _HATab, _HATabs, _HAText, _HATextField, _HATextarea, _HAToastMessage, _HATooltip, _HADrawerLarge, _HAFooter, _HASection, _HATrowser, _HATrowserFooter, _HAFooterRight, _HAFooterCenter, _HAModal) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HAAside2 = _interopRequireDefault(_HAAside);

    var _HACardDiscoveryLarge2 = _interopRequireDefault(_HACardDiscoveryLarge);

    var _HACheckbox2 = _interopRequireDefault(_HACheckbox);

    var _HACheckboxGroup2 = _interopRequireDefault(_HACheckboxGroup);

    var _HAComboButton2 = _interopRequireDefault(_HAComboButton);

    var _HAComboLink2 = _interopRequireDefault(_HAComboLink);

    var _HAFlowConfirmation2 = _interopRequireDefault(_HAFlowConfirmation);

    var _HAFlowLanding2 = _interopRequireDefault(_HAFlowLanding);

    var _HAFlowStep2 = _interopRequireDefault(_HAFlowStep);

    var _HAInfoLink2 = _interopRequireDefault(_HAInfoLink);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HALabel2 = _interopRequireDefault(_HALabel);

    var _HAMenuButton2 = _interopRequireDefault(_HAMenuButton);

    var _HAMessage2 = _interopRequireDefault(_HAMessage);

    var _HAPageMessage2 = _interopRequireDefault(_HAPageMessage);

    var _HAPortal2 = _interopRequireDefault(_HAPortal);

    var _HARadioButton2 = _interopRequireDefault(_HARadioButton);

    var _HARadioButtonGroup2 = _interopRequireDefault(_HARadioButtonGroup);

    var _HASelect2 = _interopRequireDefault(_HASelect);

    var _HAStackedPageMessages2 = _interopRequireDefault(_HAStackedPageMessages);

    var _HAStage2 = _interopRequireDefault(_HAStage);

    var _HAStepFlow2 = _interopRequireDefault(_HAStepFlow);

    var _HATab2 = _interopRequireDefault(_HATab);

    var _HATabs2 = _interopRequireDefault(_HATabs);

    var _HAText2 = _interopRequireDefault(_HAText);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    var _HATextarea2 = _interopRequireDefault(_HATextarea);

    var _HAToastMessage2 = _interopRequireDefault(_HAToastMessage);

    var _HATooltip2 = _interopRequireDefault(_HATooltip);

    var _HADrawerLarge2 = _interopRequireDefault(_HADrawerLarge);

    var _HAFooter2 = _interopRequireDefault(_HAFooter);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HATrowser2 = _interopRequireDefault(_HATrowser);

    var _HATrowserFooter2 = _interopRequireDefault(_HATrowserFooter);

    var _HAFooterRight2 = _interopRequireDefault(_HAFooterRight);

    var _HAFooterCenter2 = _interopRequireDefault(_HAFooterCenter);

    var _HAModal2 = _interopRequireDefault(_HAModal);

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

    var LargeExample = function (_React$Component) {
        _inherits(LargeExample, _React$Component);

        function LargeExample(props) {
            _classCallCheck(this, LargeExample);

            var _this = _possibleConstructorReturn(this, (LargeExample.__proto__ || Object.getPrototypeOf(LargeExample)).call(this, props));

            _this.toggleDrawerLarge = function () {
                _this.setState({ drawerShow: !_this.state.drawerShow });
            };

            _this.toggleTrowser = function () {
                _this.setState({ trowserShow: !_this.state.trowserShow });
            };

            _this.toggleModal = function () {
                _this.setState({ modalShow: !_this.state.modalShow });
            };

            _this.generateSectionContent = function () {
                _this.setState({ sectionContent: Math.random() });
            };

            _this.generateAsideContent = function () {
                _this.setState({ asideContent: Math.random() });
            };

            _this.state = {
                drawerShow: false,
                trowserShow: false,
                modalShow: false,
                sectionContent: Math.random(),
                asideContent: Math.random()
            };
            return _this;
        }

        _createClass(LargeExample, [{
            key: 'renderDrawerAndTrowser',
            value: function renderDrawerAndTrowser() {
                var _this2 = this;

                if (!this.props.drawerExample) {
                    return _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Drawer Large'
                        ),
                        _react2.default.createElement(
                            _HADrawerLarge2.default,
                            {
                                show: this.state.drawerShow,
                                backdrop: true,
                                titleText: 'I AM A DRAWER TITLE!!!!!',
                                onShow: function onShow() {
                                    return console.log("showing drawer");
                                },
                                onClose: function onClose() {
                                    return console.log("closing drawer");
                                },
                                onDismiss: function onDismiss() {
                                    console.log("dismissing drawer");
                                    _this2.toggleDrawerLarge();
                                } },
                            _react2.default.createElement(
                                _HASection2.default,
                                null,
                                this.state.sectionContent,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button', onClick: this.generateSectionContent },
                                    'ToggleRender2'
                                )
                            ),
                            _react2.default.createElement(
                                _HAFooter2.default,
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: this.toggleDrawerLarge },
                                    'Close'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                    return _this2.toggleDrawerLarge();
                                } },
                            'Show Drawer Large Example'
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Trowser'
                        ),
                        _react2.default.createElement(
                            _HATrowser2.default,
                            {
                                show: this.state.trowserShow,
                                infoText: 'endflow',
                                titleText: 'I AM A TROWSER TITLE!!!!!',
                                settings: true,
                                help: true,
                                history: true,
                                dismissible: true,
                                autofocus: true,
                                onShow: function onShow() {
                                    return console.log('show was fired');
                                },
                                onClose: function onClose() {
                                    return console.log('close was fired');
                                },
                                onDismiss: function onDismiss() {
                                    console.log('dismiss was fired');
                                    _this2.toggleTrowser();
                                } },
                            _react2.default.createElement(
                                _HASection2.default,
                                null,
                                this.state.sectionContent
                            ),
                            _react2.default.createElement(
                                _HATrowserFooter2.default,
                                null,
                                _react2.default.createElement(
                                    _HAFooterCenter2.default,
                                    null,
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'ha-button', onClick: this.generateSectionContent },
                                        'ToggleRender2'
                                    )
                                ),
                                _react2.default.createElement(
                                    _HAFooterRight2.default,
                                    null,
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                                return _this2.toggleTrowser();
                                            } },
                                        'Close'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'ha-button ha-button-primary', onClick: function onClick() {
                                    return _this2.toggleTrowser();
                                } },
                            'Show Trowser Large Example'
                        )
                    );
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                return _react2.default.createElement(
                    'div',
                    null,
                    this.renderDrawerAndTrowser(),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Modal'
                    ),
                    _react2.default.createElement(
                        _HAModal2.default,
                        {
                            show: this.state.modalShow,
                            type: 'endflow',
                            titleText: 'I AM A MODAL TITLE!!!!!',
                            dismissible: true,
                            size: 'large',
                            onShow: function onShow() {
                                return console.log('show was fired');
                            },
                            onClose: function onClose() {
                                return console.log('close was fired');
                            },
                            onDismiss: function onDismiss() {
                                console.log('dismiss was fired');
                                _this3.toggleModal();
                            } },
                        _react2.default.createElement(
                            _HASection2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                this.state.sectionContent
                            )
                        ),
                        _react2.default.createElement(
                            _HAAside2.default,
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                this.state.asideContent
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this3.toggleModal();
                                    } },
                                'Close Modal'
                            )
                        ),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this3.generateAsideContent();
                                    } },
                                'set side content'
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'ha-button ha-button-primary',
                                    onClick: function onClick() {
                                        return _this3.generateSectionContent();
                                    } },
                                'set all content'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button ha-button-primary', onClick: this.toggleModal },
                        'Show Modal Large Example'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Button'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'ha-button ha-button-primary', action: 'primary' },
                        'Primary Button'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Checkbox'
                    ),
                    _react2.default.createElement(
                        _HACheckboxGroup2.default,
                        { name: 'Checkbox Group', label: 'Checkbox Group' },
                        _react2.default.createElement(_HACheckbox2.default, { label: 'Enabled Checkbox', checked: true }),
                        _react2.default.createElement(_HACheckbox2.default, { disabled: true, checked: true }),
                        _react2.default.createElement(_HACheckbox2.default, { disabled: true }),
                        _react2.default.createElement(_HACheckbox2.default, { readonly: true })
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Combo Button'
                    ),
                    _react2.default.createElement(
                        _HAComboButton2.default,
                        { className: 'ha-button-primary', label: 'Create New', action: 'primary' },
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'AppleValue' },
                            'Apple'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BananaValue' },
                            'Banana'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BalloonValue' },
                            'Balloon'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'MelonValue' },
                            'Melon'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Combo Link'
                    ),
                    _react2.default.createElement(
                        _HAComboLink2.default,
                        { label: 'Create New', action: 'primary' },
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'AppleValue' },
                            'Apple'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BananaValue' },
                            'Banana'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BalloonValue' },
                            'Balloon'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Date Picker'
                    ),
                    _react2.default.createElement('ha-date-picker', { label: 'Date' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Flyout'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'global-header-button', type: 'button' },
                        _react2.default.createElement('i', { className: 'hi hi-create-lg' })
                    ),
                    _react2.default.createElement(
                        'ha-flyout',
                        { className: 'declarative', titleText: 'Flyout title' },
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Lorem ipsum dolor sit amet'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Inline Message'
                    ),
                    _react2.default.createElement(_HATextField2.default, { label: 'First Name' }),
                    _react2.default.createElement(
                        'ha-inline-message',
                        { targetSelector: '_previousSibling', trigger: 'focus', autoClose: true },
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Simple List'
                    ),
                    _react2.default.createElement(
                        'ha-list',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            'One'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Two'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            'Three'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Menu Button'
                    ),
                    _react2.default.createElement(
                        _HAMenuButton2.default,
                        { className: 'ha-button-primary', label: 'Create New', action: 'primary' },
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'AppleValue' },
                            'Apple'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BananaValue' },
                            'Banana'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BalloonValue', disabled: true },
                            'Balloon'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'MelonValue' },
                            'Melon'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Money Bar'
                    ),
                    _react2.default.createElement(
                        'ha-money-bar',
                        null,
                        _react2.default.createElement(
                            'ha-money-bar-segment',
                            { titleTextBold: '50', titleText: 'Unbilled' },
                            _react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
                            _react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
                        ),
                        _react2.default.createElement(
                            'ha-money-bar-segment',
                            { titleTextBold: '50', titleText: 'Unpaid' },
                            _react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
                            _react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
                        ),
                        _react2.default.createElement(
                            'ha-money-bar-segment',
                            { titleTextBold: '50', titleText: 'Paid', size: '1' },
                            _react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Page Message'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { titleText: 'Alert Title', type: 'error', dismissible: false },
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { titleText: 'Warn Title', type: 'warn', dismissible: true },
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { titleText: 'Info Title', type: 'info', dismissible: true },
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { titleText: 'Discovery Title', type: 'discovery', dismissible: true },
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { type: 'info', dismissible: true },
                        'No titleText. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { type: 'info', dismissible: true },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Using html inside the message with ',
                            _react2.default.createElement(
                                'a',
                                null,
                                'links'
                            ),
                            ' no titleText'
                        )
                    ),
                    _react2.default.createElement(
                        _HAPageMessage2.default,
                        { titleText: 'With Title', type: 'info', dismissible: true },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Using html inside the message with ',
                            _react2.default.createElement(
                                'a',
                                null,
                                'links'
                            ),
                            ' with titleText'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Paginated Message'
                    ),
                    _react2.default.createElement(
                        'ha-paginated-messages',
                        { dismissible: false },
                        _react2.default.createElement(
                            'ha-paginated-message',
                            { titleText: 'Your trial expires in 7 days!', dismissible: true },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Feel free to keep testing QuickBooks. ',
                                _react2.default.createElement(
                                    'a',
                                    { href: '#' },
                                    'Subscribe now and save 20%'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ha-paginated-message',
                            { titleText: 'Your session is about to expire!', dismissible: true },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Please refresh the page'
                            )
                        ),
                        _react2.default.createElement(
                            'ha-paginated-message',
                            { titleText: 'This is an alert', dismissible: true },
                            _react2.default.createElement(
                                'span',
                                null,
                                'This is an alert message'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Radio Button'
                    ),
                    _react2.default.createElement(
                        _HARadioButtonGroup2.default,
                        null,
                        _react2.default.createElement(_HARadioButton2.default, { label: 'Radio 1', value: '1' }),
                        _react2.default.createElement(_HARadioButton2.default, { label: 'Radio 2', value: '2' }),
                        _react2.default.createElement(_HARadioButton2.default, { label: 'Radio 3', value: '3' })
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Segmented Button'
                    ),
                    _react2.default.createElement(
                        'ha-segmented-button',
                        null,
                        _react2.default.createElement(
                            'button',
                            { value: 'credit', title: 'Credit' },
                            'Credit / Debit'
                        ),
                        _react2.default.createElement(
                            'button',
                            { value: 'cash', title: 'Cash' },
                            'Cash'
                        ),
                        _react2.default.createElement(
                            'button',
                            { value: 'check', title: 'Check' },
                            'Check'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Select'
                    ),
                    _react2.default.createElement(
                        _HASelect2.default,
                        { label: 'Some Label', addNew: 'true', placeholder: 'Choose an item' },
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'AppleValue' },
                            'Apple'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BananaValue' },
                            'Banana'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'BalloonValue' },
                            'Balloon'
                        ),
                        _react2.default.createElement(
                            _HAItem2.default,
                            { value: 'MelonValue' },
                            'Melon'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Select Type Ahead'
                    ),
                    _react2.default.createElement('HASelect-type-ahead', { 'data-attach-point': 'trowserSelect', label: 'Some Label', placeholder: 'Choose an item' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Stacked Page Message'
                    ),
                    _react2.default.createElement(
                        _HAStackedPageMessages2.default,
                        null,
                        _react2.default.createElement(
                            _HAPageMessage2.default,
                            { titleText: 'Info Title', type: 'error', dismissible: false },
                            'The contents of this message should focus on what the user needs to do to fix the error instead of just stating what went wrong. Fields related to this error should be highlighted and accomplanied by the appropiate inline error message.'
                        ),
                        _react2.default.createElement(
                            _HAPageMessage2.default,
                            { titleText: 'Info Title', type: 'warn' },
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        ),
                        _react2.default.createElement(
                            _HAPageMessage2.default,
                            { titleText: 'Info Title', type: 'info', dismissible: true },
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Status Badge'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'separator' },
                        _react2.default.createElement('i', { className: 'ha-badge ha-error', 'aria-label': 'error' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'separator' },
                        _react2.default.createElement('i', { className: 'ha-badge ha-confirm', 'aria-label': 'confirm' })
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Switch Button'
                    ),
                    _react2.default.createElement('ha-switch-button', { checked: 'true', name: 'payMe', label: 'Pay me' }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Textarea'
                    ),
                    _react2.default.createElement('ha-textarea', { label: 'Name' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Textfield'
                    ),
                    _react2.default.createElement(_HATextField2.default, { label: 'Name', 'data-attach-point': 'textfield' }),
                    _react2.default.createElement('ha-tooltip', { targetselector: '[data-attach-point=textfield]', message: 'Tooltip Info' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Textfield Type Ahead'
                    ),
                    _react2.default.createElement('ha-textfield-type-ahead', { 'data-attach-point': 'trowserTypeAhead', placeholder: 'Choose an item', label: 'Some Label' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Video'
                    ),
                    _react2.default.createElement('ha-video', { userId: 'harmony-gallery-test-user', url: 'https://www.youtube.com/embed/48QBRQdyRmU' }),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Video Launcher'
                    ),
                    _react2.default.createElement('ha-video-launcher', { url: 'https://www.youtube.com/embed/48QBRQdyRmU' })
                );
            }
        }]);

        return LargeExample;
    }(_react2.default.Component);

    exports.default = LargeExample;
});
//# sourceMappingURL=LargeExample.react.js.map
