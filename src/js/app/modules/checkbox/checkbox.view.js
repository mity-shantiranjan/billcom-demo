var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./checkbox.hbs', 'dojo/dom-construct', 'text!./checkbox.html', 'react', 'react-dom', 'hui/react-components/HACheckbox', 'hui/react-components/HACheckboxGroup', './checkbox'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./checkbox.hbs'), require('dojo/dom-construct'), require('text!./checkbox.html'), require('react'), require('react-dom'), require('hui/react-components/HACheckbox'), require('hui/react-components/HACheckboxGroup'), require('./checkbox'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.checkbox, global.domConstruct, global.checkbox, global.react, global.reactDom, global.HACheckbox, global.HACheckboxGroup, global.checkbox);
        global.checkboxView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _checkbox, _domConstruct, _checkbox3, _react, _reactDom, _HACheckbox, _HACheckboxGroup, _checkbox5) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _checkbox2 = _interopRequireDefault(_checkbox);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _checkbox4 = _interopRequireDefault(_checkbox3);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HACheckbox2 = _interopRequireDefault(_HACheckbox);

    var _HACheckboxGroup2 = _interopRequireDefault(_HACheckboxGroup);

    var demoJS = _interopRequireWildcard(_checkbox5);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

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

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.renderHTML(_checkbox2.default, _checkbox4.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find("#dojoProgrammaticWay")[0]);
            this.renderReact(this.$('#reactWay')[0]);

            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: demoTemplate });

            this.$el.html(html);
        },

        renderDojo: function renderDojo(placeToAppend) {
            var checkbox = _domConstruct2.default.toDom(_checkbox4.default),
                cloned = checkbox.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            demoJS.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            };

            var ExampleComponent = function (_React$Component) {
                _inherits(ExampleComponent, _React$Component);

                function ExampleComponent(props) {
                    _classCallCheck(this, ExampleComponent);

                    var _this = _possibleConstructorReturn(this, (ExampleComponent.__proto__ || Object.getPrototypeOf(ExampleComponent)).call(this, props));

                    _this.state = {
                        showFruits: true
                    };

                    _this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
                    _this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
                    return _this;
                }

                _createClass(ExampleComponent, [{
                    key: '_onToggleCallback',
                    value: function _onToggleCallback() {
                        this.setState({
                            showFruits: !this.state.showFruits
                        });
                    }
                }, {
                    key: 'render',
                    value: function render() {
                        var onToggleCallback = this._onToggleCallback.bind(this),
                            keyId = 0,
                            items = this.state.showFruits ? this._fruits : this._vegetables,
                            rows = items.map(function (item, i) {
                            var itemValue = item + "Value";
                            return _react2.default.createElement(_HACheckbox2.default, { key: i, label: item, value: itemValue });
                        });

                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { name: 'Checkbox Group', label: 'Checkbox Group', onChange: eventLog, onClick: eventLog },
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox (default checked)', checked: true, onChange: eventLog, onClick: eventLog }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Disabled Checkbox', disabled: true }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Disabled Checkbox (default checked)', disabled: true, checked: true })
                            ),
                            _react2.default.createElement('h3', { className: 'subtitle' }),
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { name: 'Checkbox Group', label: 'Checkbox Group with a minimum amount of checked elements >= 2', minrequired: 2, required: true },
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox (default checked)', checked: true }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Disabled Checkbox', disabled: true }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Disabled Checkbox (default checked)', disabled: true, checked: true }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'With Value OFF', value: 'off' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: '' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: '', checked: true })
                            ),
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { name: 'Checkbox Group', label: 'Required Checkbox Group No Indicator', required: true, noRequiredIndicator: true },
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Checkbox 1' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Checkbox 2' })
                            ),
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { name: 'Checkbox Group', label: 'Required Checkbox Group', required: true },
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Checkbox 1' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Checkbox 2' })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: 'ha-button ha-button-primary js-validate' },
                                'Validate'
                            ),
                            _react2.default.createElement(
                                'h3',
                                { className: 'subtitle' },
                                'Checkbox Group with ha-inline class'
                            ),
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { className: 'ha-inline', name: 'Checkbox Group', label: 'Checkbox Group' },
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox' }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Enabled Checkbox (default checked)', checked: true }),
                                _react2.default.createElement(_HACheckbox2.default, { key: keyId++, label: 'Disabled Checkbox', disabled: true })
                            ),
                            _react2.default.createElement(
                                'h2',
                                null,
                                'HACheckboxGroup checkbox mutations dont work'
                            ),
                            _react2.default.createElement(
                                _HACheckboxGroup2.default,
                                { name: 'Checkbox Group', label: 'Checkbox Group' },
                                rows
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'widget' },
                                _react2.default.createElement(
                                    'button',
                                    { className: 'ha-button ha-button-primary', onClick: onToggleCallback },
                                    'Toggle Fruit & Vegetables'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                'The content of the checkboxes should change from fruits to vegetables.',
                                _react2.default.createElement('br', null)
                            )
                        );
                    }
                }]);

                return ExampleComponent;
            }(_react2.default.Component);

            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=checkbox.view.js.map
