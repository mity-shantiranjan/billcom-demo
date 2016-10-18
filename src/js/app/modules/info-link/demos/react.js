(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'hui/react-components/HAText', 'hui/react-components/HAInfoLink', 'hui/react-components/HAMessage'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('hui/react-components/HAText'), require('hui/react-components/HAInfoLink'), require('hui/react-components/HAMessage'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HAText, global.HAInfoLink, global.HAMessage);
        global.react = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HAText, _HAInfoLink, _HAMessage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAText2 = _interopRequireDefault(_HAText);

    var _HAInfoLink2 = _interopRequireDefault(_HAInfoLink);

    var _HAMessage2 = _interopRequireDefault(_HAMessage);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var usage = '\n<HAInfoLink linkText="Hello, world!" message="Goodbye, world!"></HAInfoLink>\n<HAInfoLink>\n    <HAText>\n        <em>Hello</em>, <strong>world</strong>!\n    </HAText>\n    <HAMessage>\n        <u>Goodbye</u>, world!\n    </HAMessage>\n</HAInfoLink>';

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
                            'Inline Text and Message'
                        ),
                        _react2.default.createElement(_HAInfoLink2.default, {
                            linkText: 'Hello, world!',
                            message: 'Goodbye, world!' }),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Inline Text and Nested Message'
                        ),
                        _react2.default.createElement(
                            _HAInfoLink2.default,
                            { linkText: 'Hello, world!' },
                            _react2.default.createElement(
                                _HAMessage2.default,
                                null,
                                _react2.default.createElement(
                                    'u',
                                    null,
                                    'Goodbye'
                                ),
                                ', world!'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Nested Text and Inline Message'
                        ),
                        _react2.default.createElement(
                            _HAInfoLink2.default,
                            { message: 'Goodbye, world!' },
                            _react2.default.createElement(
                                _HAText2.default,
                                null,
                                _react2.default.createElement(
                                    'em',
                                    null,
                                    'Hello'
                                ),
                                ', ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'world'
                                ),
                                '!'
                            )
                        ),
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Nested Text and Message'
                        ),
                        _react2.default.createElement(
                            _HAInfoLink2.default,
                            null,
                            _react2.default.createElement(
                                _HAText2.default,
                                null,
                                _react2.default.createElement(
                                    'em',
                                    null,
                                    'Hello'
                                ),
                                ', ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'world'
                                ),
                                '!'
                            ),
                            _react2.default.createElement(
                                _HAMessage2.default,
                                null,
                                _react2.default.createElement(
                                    'u',
                                    null,
                                    'Goodbye'
                                ),
                                ', world!'
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), el);
        }
    };
});
//# sourceMappingURL=react.js.map
