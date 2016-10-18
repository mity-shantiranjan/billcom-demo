(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './demos/react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./demos/react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react);
        global.demos = mod.exports;
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

    exports.default = {
        title: 'Zero State',
        docUrl: 'https://github.intuit.com/SBG/harmony-ui-components/blob/develop/docs/design/ZeroState.md',
        examples: [_react2.default]
    };
});
//# sourceMappingURL=demos.js.map
