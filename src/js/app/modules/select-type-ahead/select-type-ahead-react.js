(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "hui/react-components/HASelectTypeAhead", "../util/loremIpsum"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("hui/react-components/HASelectTypeAhead"), require("../util/loremIpsum"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HASelectTypeAhead, global.loremIpsum);
        global.selectTypeAheadReact = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HASelectTypeAhead, _loremIpsum) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.renderReact = renderReact;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HASelectTypeAhead2 = _interopRequireDefault(_HASelectTypeAhead);

    var _loremIpsum2 = _interopRequireDefault(_loremIpsum);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var data = [{
        label: "Apple",
        value: "1"
    }, {
        label: "Banana",
        value: "2"
    }, {
        label: "Balloon",
        value: "3"
    }, {
        label: 'Melon',
        value: '4'
    }, {
        label: 'Orange',
        value: '5'
    }, {
        label: 'Lemon',
        value: '6'
    }, {
        label: 'Pear',
        value: '7'
    }, {
        label: 'Mango',
        value: '8'
    }, {
        label: 'Grape',
        value: '9'
    }, {
        label: 'Peach',
        value: '10'
    }, {
        label: 'Strawberry',
        value: '11'
    }, {
        label: 'Papaya',
        value: '12'
    }],
        dataWrapping = data.concat([{ label: (0, _loremIpsum2.default)(), value: (0, _loremIpsum2.default)() }]);

    function TypeAheadReactGallery() {
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "h3",
                null,
                "Default"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: data }),
            _react2.default.createElement(
                "h3",
                null,
                "Preselected Value"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: data, value: "2" }),
            _react2.default.createElement(
                "h3",
                null,
                "Disabled"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: data, disabled: true }),
            _react2.default.createElement(
                "h3",
                null,
                "Required"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: data, required: true }),
            _react2.default.createElement(
                "h3",
                null,
                "With Required Validation No Indicator"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: data, required: true, noRequiredIndicator: true }),
            _react2.default.createElement(
                "h3",
                null,
                "With Icon"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", icon: "hi-filter", data: data }),
            _react2.default.createElement(
                "h3",
                null,
                "With Wrapping Items"
            ),
            _react2.default.createElement(_HASelectTypeAhead2.default, { label: "Some Label", placeholder: "Choose an item", data: dataWrapping })
        );
    }

    function renderReact(placeToAppend) {
        _reactDom2.default.render(_react2.default.createElement(TypeAheadReactGallery, null), placeToAppend);
    }
});
//# sourceMappingURL=select-type-ahead-react.js.map
