(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'hui/react-components/HATextField'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('hui/react-components/HATextField'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HATextField);
        global.react = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HATextField) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HATextField2 = _interopRequireDefault(_HATextField);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var usage = '\n<HATextField label="Name" required="true"></HATextField>\n<HATextField label="Name" required="true" pattern="^d+$"></HATextField>'; /* jshint ignore:start */
    /* jscs:disable requireMultipleVarDecl */

    exports.default = {
        id: 'react',
        label: 'React',
        usage: usage,
        render: function render(el) {
            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Required'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Some Label', required: true, 'data-automation-id': 'validation-react-required' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Pattern (Email)'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Some Label', pattern: '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$', 'data-automation-id': 'validation-react-pattern-email' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Pattern (Numbers Only)'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Some Label', pattern: '^\\d+$', 'data-automation-id': 'validation-react-pattern-only-numbers' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Required and Pattern (Numbers Only)'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Some Label', pattern: '^\\d+$', required: true, 'data-automation-id': 'validation-react-pattern-only-numbers-required' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Without Validation'
                        ),
                        _react2.default.createElement(_HATextField2.default, { label: 'Some Label', 'data-automation-id': 'validation-react-no-validation' })
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), el);
        }
    };
});
//# sourceMappingURL=react.js.map
