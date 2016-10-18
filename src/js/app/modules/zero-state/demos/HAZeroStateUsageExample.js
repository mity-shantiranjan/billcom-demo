var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HAZeroState', 'hui/react-components/HAHeader', 'hui/react-components/HASection', 'hui/react-components/HAFooter'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HAZeroState'), require('hui/react-components/HAHeader'), require('hui/react-components/HASection'), require('hui/react-components/HAFooter'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HAZeroState, global.HAHeader, global.HASection, global.HAFooter);
        global.HAZeroStateUsageExample = mod.exports;
    }
})(this, function (exports, _react, _HAZeroState, _HAHeader, _HASection, _HAFooter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HAZeroState2 = _interopRequireDefault(_HAZeroState);

    var _HAHeader2 = _interopRequireDefault(_HAHeader);

    var _HASection2 = _interopRequireDefault(_HASection);

    var _HAFooter2 = _interopRequireDefault(_HAFooter);

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

    var ItemZeroStateComponent = function (_React$Component) {
        _inherits(ItemZeroStateComponent, _React$Component);

        function ItemZeroStateComponent() {
            _classCallCheck(this, ItemZeroStateComponent);

            return _possibleConstructorReturn(this, (ItemZeroStateComponent.__proto__ || Object.getPrototypeOf(ItemZeroStateComponent)).apply(this, arguments));
        }

        _createClass(ItemZeroStateComponent, [{
            key: 'render',
            value: function render() {
                return(
                    // Now there is an optional simulateViewport={true} property which can be passed in to hack the viewport for responsive views, This will be removed
                    _react2.default.createElement(
                        _HAZeroState2.default,
                        { titleText: 'Add your products and services to save time creating your next invoice or receipt', subTitleText: 'Some temporary subtitle', buttonText: 'Add a product or service', onButtonClick: this.props.onAddItem, simulateViewport: true },
                        _react2.default.createElement(
                            _HAHeader2.default,
                            null,
                            _react2.default.createElement('div', { className: 'prod-and-servcs-image' })
                        ),
                        '/* Optional HASection can be added here with additional content/form fields within it if required */',
                        _react2.default.createElement(_HASection2.default, null),
                        _react2.default.createElement(
                            _HAFooter2.default,
                            null,
                            _react2.default.createElement(
                                'p',
                                null,
                                'Get your products and services in an Excel or CSV file? ',
                                _react2.default.createElement(
                                    'a',
                                    { className: 'import-file-link', href: 'javascript:void(0)', onClick: this.props.onImportBtn },
                                    'Import a file'
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'footer-link' },
                                'Go to ',
                                _react2.default.createElement(
                                    'a',
                                    { className: 'p-and-s-link', onClick: this.props.onProductsAndServicesClick },
                                    'Products and Services'
                                ),
                                ' page'
                            )
                        )
                    )
                );
            }
        }]);

        return ItemZeroStateComponent;
    }(_react2.default.Component);

    ItemZeroStateComponent.propTypes = {
        sandbox: _react2.default.PropTypes.object,
        onAddItem: _react2.default.PropTypes.func,
        onImportBtn: _react2.default.PropTypes.func,
        onProductsAndServicesClick: _react2.default.PropTypes.func
    };
    exports.default = ItemZeroStateComponent;
});
//# sourceMappingURL=HAZeroStateUsageExample.js.map
