(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'hui/react-components/HATextFieldTypeAhead', '../util/loremIpsum'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('hui/react-components/HATextFieldTypeAhead'), require('../util/loremIpsum'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HATextFieldTypeAhead, global.loremIpsum);
        global.textfieldTypeAheadReact = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HATextFieldTypeAhead, _loremIpsum) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.renderReact = renderReact;

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATextFieldTypeAhead2 = _interopRequireDefault(_HATextFieldTypeAhead);

    var _loremIpsum2 = _interopRequireDefault(_loremIpsum);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var data = [{
        label: "Apple",
        value: "Apple"
    }, {
        label: "Banana",
        value: "Banana"
    }, {
        label: "Balloon",
        value: "Balloon"
    }, {
        label: 'Melon',
        value: 'Melon'
    }, {
        label: 'Orange',
        value: 'Orange'
    }, {
        label: 'Lemon',
        value: 'Lemon'
    }, {
        label: 'Pear',
        value: 'Pear'
    }, {
        label: 'Mango',
        value: 'Mango'
    }, {
        label: 'Grape',
        value: 'Grape'
    }, {
        label: 'Peach',
        value: 'Peach'
    }, {
        label: 'Strawberry',
        value: 'Strawberry'
    }, {
        label: 'Papaya',
        value: 'Papaya'
    }],
        dataWrapping = data.concat([{ label: (0, _loremIpsum2.default)(), value: (0, _loremIpsum2.default)() }]);

    function TypeAheadReactGallery() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'h3',
                null,
                'Default'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data }),
            _react2.default.createElement(
                'h3',
                null,
                'Preselected Value'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data, value: 'Balloon' }),
            _react2.default.createElement(
                'h3',
                null,
                'Disabled'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data, disabled: true }),
            _react2.default.createElement(
                'h3',
                null,
                'Required'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data, required: true }),
            _react2.default.createElement(
                'h3',
                null,
                'With Required Validation No Indicator'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data, required: true, noRequiredIndicator: true }),
            _react2.default.createElement(
                'h3',
                null,
                'With Icon'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', icon: 'hi-filter', data: data }),
            _react2.default.createElement(
                'h3',
                null,
                'With Wrapping Items'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: dataWrapping }),
            _react2.default.createElement(
                'h3',
                null,
                'autoComplete Off'
            ),
            _react2.default.createElement(_HATextFieldTypeAhead2.default, { label: 'Some Label', placeholder: 'Choose an item', data: data, autoComplete: 'off' })
        );
    }

    function renderReact(placeToAppend) {
        _reactDom2.default.render(_react2.default.createElement(TypeAheadReactGallery, null), placeToAppend);
    }
});
//# sourceMappingURL=textfield-type-ahead-react.js.map
