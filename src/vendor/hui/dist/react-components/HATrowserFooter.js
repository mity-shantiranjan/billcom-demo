(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.HATrowserFooter = mod.exports;
  }
})(this, function (exports, _react) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var HATrowserFooter = function HATrowserFooter(props) {
    return _react2.default.createElement(
      "footer",
      { className: "page-modal-footer", tabIndex: "-1" },
      props.children
    );
  };
  exports.default = HATrowserFooter;
});
//# sourceMappingURL=HATrowserFooter.js.map
