var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'hui/react-components/HAItem', 'hui/react-components/HAComboButton', './ComboButtonExamples', './OptionsExamples', './InlineMessageExamples', './TabsExamples', './Test'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('hui/react-components/HAItem'), require('hui/react-components/HAComboButton'), require('./ComboButtonExamples'), require('./OptionsExamples'), require('./InlineMessageExamples'), require('./TabsExamples'), require('./Test'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.HAItem, global.HAComboButton, global.ComboButtonExamples, global.OptionsExamples, global.InlineMessageExamples, global.TabsExamples, global.Test);
        global.GalleryPage = mod.exports;
    }
})(this, function (exports, _react, _HAItem, _HAComboButton, _ComboButtonExamples, _OptionsExamples, _InlineMessageExamples, _TabsExamples, _Test) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _HAItem2 = _interopRequireDefault(_HAItem);

    var _HAComboButton2 = _interopRequireDefault(_HAComboButton);

    var _ComboButtonExamples2 = _interopRequireDefault(_ComboButtonExamples);

    var _OptionsExamples2 = _interopRequireDefault(_OptionsExamples);

    var _InlineMessageExamples2 = _interopRequireDefault(_InlineMessageExamples);

    var _TabsExamples2 = _interopRequireDefault(_TabsExamples);

    var _Test2 = _interopRequireDefault(_Test);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var GalleryPage = function (_React$Component) {
        _inherits(GalleryPage, _React$Component);

        _createClass(GalleryPage, null, [{
            key: 'displayName',
            get: function get() {
                return "GalleryPage";
            }
        }]);

        function GalleryPage(props) {
            _classCallCheck(this, GalleryPage);

            return _possibleConstructorReturn(this, (GalleryPage.__proto__ || Object.getPrototypeOf(GalleryPage)).call(this, props));
        }

        _createClass(GalleryPage, [{
            key: 'render',
            value: function render() {

                return _react2.default.createElement(
                    'div',
                    { className: 'playground-examples' },
                    _react2.default.createElement(_Test2.default, null),
                    _react2.default.createElement(_ComboButtonExamples2.default, null),
                    _react2.default.createElement(_OptionsExamples2.default, null),
                    _react2.default.createElement(_InlineMessageExamples2.default, null),
                    _react2.default.createElement(_TabsExamples2.default, null)
                );
            }
        }]);

        return GalleryPage;
    }(_react2.default.Component);

    exports.default = GalleryPage;
});
//# sourceMappingURL=GalleryPage.js.map
