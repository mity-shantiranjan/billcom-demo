(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "backbone", "react", "react-dom", "./GalleryPage"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("backbone"), require("react"), require("react-dom"), require("./GalleryPage"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.react, global.reactDom, global.GalleryPage);
        global.playgroundView = mod.exports;
    }
})(this, function (exports, _backbone, _react, _reactDom, _GalleryPage) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _GalleryPage2 = _interopRequireDefault(_GalleryPage);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({

        render: function render() {
            _reactDom2.default.render(_react2.default.createElement(_GalleryPage2.default, null), this.el);
            return this;
        }

    });
});
//# sourceMappingURL=playground.js.map
