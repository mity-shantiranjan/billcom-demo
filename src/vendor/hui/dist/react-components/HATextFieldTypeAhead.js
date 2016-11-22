var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/textfield-type-ahead'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/textfield-type-ahead'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.textfieldTypeAhead);
        global.HATextFieldTypeAhead = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

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

    function toStore(data) {
        return {
            query: function query() {
                return {
                    then: function then(callback) {
                        callback(data);
                    }
                };
            }
        };
    }

    function propsWithout(exludeList, props) {
        return Object.getOwnPropertyNames(props).reduce(function (newProps, propName) {
            if (exludeList.indexOf(propName) < 0) {
                newProps[propName] = props[propName];
            }
            return newProps;
        }, {});
    }

    function pluckSelectedItem(event) {
        var selectedItem = event.target.selectedItem;
        // for backward-compatibility
        event.selectedItem = selectedItem;

        return event;
    }

    var HATextFieldTypeAhead = function (_Component) {
        _inherits(HATextFieldTypeAhead, _Component);

        function HATextFieldTypeAhead(props) {
            _classCallCheck(this, HATextFieldTypeAhead);

            var _this = _possibleConstructorReturn(this, (HATextFieldTypeAhead.__proto__ || Object.getPrototypeOf(HATextFieldTypeAhead)).call(this, props));

            _this._huiComponent = null;

            // Bind event handling methods to current instance
            _this.handleClick = _this.handleClick.bind(_this);
            _this.handleRef = _this.handleRef.bind(_this);
            return _this;
        }

        _createClass(HATextFieldTypeAhead, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                // Event handler for change
                this._huiComponent.addEventListener('change', function (event) {
                    event.stopPropagation();
                    if (_this2.props.onChange) {
                        _this2.props.onChange(pluckSelectedItem(event));
                    }
                    _this2.testValidity();
                });

                this.domElementPostRender();

                window.setTimeout(function () {
                    // We need the timeout so h-ui component checkValidity function is initialized
                    if (_this2.props.validator) {
                        _this2._huiComponent.validator = _this2.props.validator;
                    }
                    if (_this2.props.alwaysRenderValidity) {
                        _this2._huiComponent.reportValidity();
                    }
                    _this2.testValidity(); // We need to do initial notification of validity state.
                }, 0);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                if (this.props.validator) {
                    this._huiComponent.validator = this.props.validator;
                }
                if (this.props.alwaysRenderValidity) {
                    this._huiComponent.reportValidity();
                }

                this.domElementPostRender();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._huiComponent.removeEventListener('change', null, false);
            }
        }, {
            key: 'testValidity',
            value: function testValidity() {
                if (this.props.onValidityChange) {
                    var valid = undefined;
                    if (this._huiComponent.checkValidity) {
                        valid = this._huiComponent.checkValidity();
                    }
                    if (this._lastValidity !== valid) {
                        this._lastValidity = valid;
                        this.props.onValidityChange(valid);
                    }
                }
            }
        }, {
            key: 'handleClick',
            value: function handleClick(event) {
                if (this.props.onClick) {
                    this.props.onClick(event);
                }
            }
        }, {
            key: 'handleRef',
            value: function handleRef(c) {
                this._huiComponent = c;
            }
        }, {
            key: 'getStore',
            value: function getStore() {
                var _props = this.props,
                    store = _props.store,
                    data = _props.data,
                    huiComponent = this._huiComponent;

                if (store) {
                    return store;
                } else if (data) {
                    if (this._currentData === data) {
                        // If data has not changed return the current store
                        return huiComponent.store;
                    } else {
                        this._currentData = data;
                        return toStore(data);
                    }
                } else {
                    return toStore([]);
                }
            }
        }, {
            key: 'domElementPostRender',
            value: function domElementPostRender() {
                var _props2 = this.props,
                    value = _props2.value,
                    selectedIndex = _props2.selectedIndex,
                    huiComponent = this._huiComponent,
                    newStore = this.getStore();

                // Don't set the store if it is the same as the current store
                if (newStore !== huiComponent.store) {
                    huiComponent.store = newStore;
                }

                if (value && value !== huiComponent.value) {
                    // After the store is set, we need to set the value again
                    huiComponent.value = this.props.value;
                    // And then we remove 'menu-expanded' to make sure the popover remains closed.
                    huiComponent.classList.remove('menu-expanded');
                }

                if (selectedIndex && selectedIndex !== huiComponent.selectedIndex) {
                    // After the store is set, we need to set the selectedIndex again
                    huiComponent.selectedIndex = this.props.selectedIndex;
                }
            }
        }, {
            key: 'hasStaticItems',
            value: function hasStaticItems() {
                var _props3 = this.props,
                    staticItems = _props3.staticItems,
                    store = _props3.store,
                    data = _props3.data;

                return !!(staticItems || data && !store);
            }
        }, {
            key: 'render',
            value: function render() {
                var props = propsWithout(['data', 'store', 'ref', 'key'], this.props);
                /* jshint ignore:start */
                return _react2.default.createElement(
                    'ha-textfield-type-ahead',
                    _extends({
                        ref: this.handleRef,
                        'class': this.props.className,
                        onClick: this.handleClick,
                        staticItems: this.hasStaticItems()
                    }, props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HATextFieldTypeAhead;
    }(_react.Component);

    HATextFieldTypeAhead.propTypes = {
        className: _react2.default.PropTypes.string,
        label: _react2.default.PropTypes.string,
        placeholder: _react2.default.PropTypes.string,
        icon: _react2.default.PropTypes.string,
        name: _react2.default.PropTypes.string,
        value: _react2.default.PropTypes.string,
        typedText: _react2.default.PropTypes.string,
        size: _react2.default.PropTypes.number,
        disabled: _react2.default.PropTypes.bool,
        required: _react2.default.PropTypes.bool,
        noRequiredIndicator: _react2.default.PropTypes.bool,
        selectedIndex: _react2.default.PropTypes.number,
        selectedItem: _react2.default.PropTypes.object,
        filterMode: _react2.default.PropTypes.string,
        store: _react2.default.PropTypes.object,
        storeLabelProperty: _react2.default.PropTypes.string,
        storeValueProperty: _react2.default.PropTypes.string,
        staticItems: _react2.default.PropTypes.bool,
        addNew: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.string]),
        addNewText: _react2.default.PropTypes.string,
        min: _react2.default.PropTypes.number,
        max: _react2.default.PropTypes.number,
        requiredMessage: _react2.default.PropTypes.string,
        invalidMessage: _react2.default.PropTypes.string,
        validator: _react2.default.PropTypes.func,
        onValidityChange: _react2.default.PropTypes.func,
        alwaysRenderValidity: _react2.default.PropTypes.bool,
        autoComplete: _react2.default.PropTypes.string,

        onClick: _react2.default.PropTypes.func,
        onChange: _react2.default.PropTypes.func,
        data: _react2.default.PropTypes.array,
        children: _react2.default.PropTypes.element
    };
    exports.default = HATextFieldTypeAhead;
});
//# sourceMappingURL=HATextFieldTypeAhead.js.map
