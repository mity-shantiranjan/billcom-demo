(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./simple-list.hbs', 'dojo/dom-construct', 'text!./list.dojo.html', './list', 'react', 'react-dom', 'hui/react-components/HAList'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./simple-list.hbs'), require('dojo/dom-construct'), require('text!./list.dojo.html'), require('./list'), require('react'), require('react-dom'), require('hui/react-components/HAList'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.simpleList, global.domConstruct, global.listDojo, global.list, global.react, global.reactDom, global.HAList);
        global.simpleListView = mod.exports;
    }
})(this, function (exports, _backbone, _simpleList, _domConstruct, _listDojo, _list, _react, _reactDom, _HAList) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _simpleList2 = _interopRequireDefault(_simpleList);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _listDojo2 = _interopRequireDefault(_listDojo);

    var _list2 = _interopRequireDefault(_list);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAList2 = _interopRequireDefault(_HAList);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = _backbone2.default.View.extend({
        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate'
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
        },

        render: function render() {
            this.$el.html(_simpleList2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0], this.$el.find('#html')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#html')[0]);
            this.renderReact(this.$('#reactWay')[0]);
            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var list = _domConstruct2.default.toDom(_listDojo2.default),
                cloned = list.cloneNode(true);
            _domConstruct2.default.place(cloned, placeToAppend);
        },

        renderJS: function renderJS(placeToAppend) {
            _list2.default.render(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            var eventLog = function eventLog(e) {
                console.log(e.target.tagName + ' ' + e.type + ' fired');
            };

            var ExampleComponent = _react2.default.createClass({
                displayName: 'ExampleComponent',

                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _HAList2.default,
                            { titleText: 'Single select list' },
                            _react2.default.createElement(
                                'li',
                                null,
                                'First list item'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                'Second list item'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                'Third list item'
                            )
                        )
                    );
                }
            });
            _reactDom2.default.render(_react2.default.createElement(ExampleComponent, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=simple-list.js.map
