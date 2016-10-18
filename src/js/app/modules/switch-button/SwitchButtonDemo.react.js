var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HASwitchbutton'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HASwitchbutton'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HASwitchbutton);
        global.SwitchButtonDemo = mod.exports;
    }
})(this, function (exports, _react, _HASwitchbutton) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HASwitchbutton2 = _interopRequireDefault(_HASwitchbutton);

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

    var SwitchButtonDemo = function (_React$Component) {
        _inherits(SwitchButtonDemo, _React$Component);

        function SwitchButtonDemo(props) {
            _classCallCheck(this, SwitchButtonDemo);

            return _possibleConstructorReturn(this, (SwitchButtonDemo.__proto__ || Object.getPrototypeOf(SwitchButtonDemo)).call(this, props));
        }

        _createClass(SwitchButtonDemo, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_HASwitchbutton2.default, { checked: false, labelOn: 'on', labelOff: 'off', name: 'sendNotification', label: 'Send me notifications' }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_HASwitchbutton2.default, { checked: true, labelOn: 'on', labelOff: 'off', name: 'payMe', label: 'Pay me' }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_HASwitchbutton2.default, { labelOn: 'on', name: 'autoPayment', labelOff: 'Disable', span: 'false', label: 'Auto-Payment' }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_HASwitchbutton2.default, { labelOn: 'on', name: 'creditCardPayment', labelOff: 'Disable', checked: true, label: 'Credit card payment' }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_HASwitchbutton2.default, { name: 'runPayroll', checked: true, label: 'Run Payroll' }),
                    _react2.default.createElement('br', null)
                );
            }
        }]);

        return SwitchButtonDemo;
    }(_react2.default.Component);

    exports.default = SwitchButtonDemo;
});
//# sourceMappingURL=SwitchButtonDemo.react.js.map
