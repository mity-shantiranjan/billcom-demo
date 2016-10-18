(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'text!./demo.html'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('text!./demo.html'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.demo);
        global.html = mod.exports;
    }
})(this, function (exports, _demo) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _demo2 = _interopRequireDefault(_demo);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var usage = '\n<ha-info-link linkText="Hello, world!" message="Goodbye, world!"></ha-info-link>\n\n<ha-info-link>\n    <ha-text>\n        <em>Hello</em>, <strong>world</strong>!\n    </ha-text>\n    <ha-message>\n        <u>Goodbye</u>, world!\n    </ha-message>\n</ha-info-link>'; /* jshint ignore:start */
    /* jscs:disable requireMultipleVarDecl */

    exports.default = {
        id: 'html',
        label: 'HTML',
        usage: usage,
        template: _demo2.default
    };
});
//# sourceMappingURL=html.js.map
