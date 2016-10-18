(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './demos/html', './demos/js', './demos/dojo', './demos/react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./demos/html'), require('./demos/js'), require('./demos/dojo'), require('./demos/react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.html, global.js, global.dojo, global.react);
        global.demos = mod.exports;
    }
})(this, function (exports, _html, _js, _dojo, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _html2 = _interopRequireDefault(_html);

    var _js2 = _interopRequireDefault(_js);

    var _dojo2 = _interopRequireDefault(_dojo);

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        title: 'Validation',
        docUrl: 'https://github.intuit.com/SBG/harmony-ui-components/blob/develop/docs/design/Validatable.md',
        examples: [_html2.default, _js2.default, _dojo2.default, _react2.default]
    };
});
//# sourceMappingURL=demos.js.map
