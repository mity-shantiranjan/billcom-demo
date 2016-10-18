(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './HAZeroStateUsageExample'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./HAZeroStateUsageExample'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HAZeroStateUsageExample);
        global.react = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HAZeroStateUsageExample) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAZeroStateUsageExample2 = _interopRequireDefault(_HAZeroStateUsageExample);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var usage = '\n <HAZeroState titleText="Add your products and services to save time creating your next invoice or receipt" subTitleText="Some temporary subtitle" buttonText="Add a product or service" onButtonClick={this.props.onAddItem} simulateViewport={true}>\n    <HAHeader>\n        <div className="prod-and-servcs-image"></div>\n    </HAHeader>\n\n    /* Optional HASection can be added here with additional content/form fields within it if required */\n\n    <HAFooter>  \n        <p>Get your products and services in an Excel or CSV file? <a className="import-file-link" href="javascript:void(0)" onClick={this.props.onImportBtn}>Import a file</a></p>\n        <p className="footer-link">Go to <a className="p-and-s-link" onClick={this.props.onProductsAndServicesClick}>Products and Services</a> page</p>\n    </HAFooter>\n</HAZeroState>';

    exports.default = {
        id: 'react',
        label: 'React',
        usage: usage,
        render: function render(el) {
            var ExampleComponent = _HAZeroStateUsageExample2.default;
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), el);
        }
    };
});
//# sourceMappingURL=react.js.map
