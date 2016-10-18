(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'text!./trowser.hbs', 'hbs/handlebars', 'dojo/dom-construct', 'text!./trowser.html', './trowser', './TrowserExample.react', 'react', 'react-dom'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('text!./trowser.hbs'), require('hbs/handlebars'), require('dojo/dom-construct'), require('text!./trowser.html'), require('./trowser'), require('./TrowserExample.react'), require('react'), require('react-dom'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.trowser, global.handlebars, global.domConstruct, global.trowser, global.trowser, global.TrowserExample, global.react, global.reactDom);
        global.trowserView = mod.exports;
    }
})(this, function (exports, _backbone, _trowser, _handlebars, _domConstruct, _trowser3, _trowser5, _TrowserExample, _react, _reactDom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _trowser2 = _interopRequireDefault(_trowser);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _trowser4 = _interopRequireDefault(_trowser3);

    var _trowser6 = _interopRequireDefault(_trowser5);

    var _TrowserExample2 = _interopRequireDefault(_TrowserExample);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var store = {
        query: function query() {
            return {
                then: function then(callback) {
                    callback([{
                        label: 'Apple',
                        value: 'Apple'
                    }, {
                        label: 'Banana',
                        value: 'Banana'
                    }, {
                        label: 'Balloon',
                        value: 'Balloon'
                    }, {
                        label: 'Mellon',
                        value: 'Mellon'
                    }]);
                }
            };
        }
    }; /* jshint ignore:start */

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate',
            'click .show-element': 'showElement',
            'click .show-responsive-trowser': 'showResponsiveTrowser'
        },

        navigate: function navigate(evt) {
            this.$('.panel').addClass('hidden');
            this.activePanel = this.$('#' + evt.currentTarget.value)[0];
            this.activePanel.classList.remove('hidden');
        },

        showElement: function showElement(event) {
            var elementName = event.currentTarget.getAttribute('data-target-name'),
                element = this.activePanel[elementName];

            element.show();
        },

        showResponsiveTrowser: function showResponsiveTrowser(evt) {
            var trowserElement = document.getElementById('responsive-trowser');

            trowserElement.show();
        },

        render: function render() {
            this.renderHTML(_trowser2.default, _trowser4.default);
            this.renderJS(this.$('#programmaticWay')[0]);
            this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
            this.renderReact(this.$('#reactWay')[0]);

            return this;
        },

        renderDojo: function renderDojo(placeToAppend) {
            var trowser = _domConstruct2.default.toDom(_trowser4.default),
                cloned = trowser.cloneNode(true);

            _domConstruct2.default.place(cloned, placeToAppend);
            this.parseAttachPoints(this.panels.dojo);
            this.panels.dojo.trowserSelect.store = store;
            this.panels.dojo.trowserTypeAhead.store = store;
            this.registerEventHandlers(this.panels.dojo);
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({
                componentDemoTemplate: demoTemplate
            });

            this.$el.html(html);
            this.panels = {};

            ['html', 'js', 'dojo', 'react'].forEach(function (panelId) {
                this.panels['$' + panelId] = this.$('#' + panelId);
                this.panels[panelId] = this.panels['$' + panelId][0];
            }, this);

            this.activePanel = this.panels.html;
            this.parseAttachPoints(this.panels.html);
            this.panels.html.trowserTypeAhead.store = store;
            this.registerEventHandlers(this.panels.html);
        },

        renderJS: function renderJS(placeToAppend) {
            _trowser6.default.render(placeToAppend);
        },

        parseAttachPoints: function parseAttachPoints(panel) {
            Array.prototype.forEach.call(panel.querySelectorAll('[data-attach-point]'), function (node) {
                panel[node.getAttribute('data-attach-point')] = node;
            });
        },

        registerEventHandlers: function registerEventHandlers(panel) {
            [{ buttonName: 'showDrawerButton', targetName: 'trowserDeclarativeDrawer' }, { buttonName: 'showErrorModalButton', targetName: 'errorModal' }, { buttonName: 'showPopover1Button', targetName: 'popover1' }, { buttonName: 'showPopoverDrawer1Button', targetName: 'popoverDrawer1' }, { buttonName: 'trowserShowZdrawerButton', targetName: 'zDrawer' }, { buttonName: 'trowserShowZmodalButton', targetName: 'zModal' }, { buttonName: 'trowserShowZtrowserButton', targetName: 'declarativeTrowser' }, { buttonName: 'drawerShowZmodalButton', targetName: 'zModal' }, { buttonName: 'zModalSkipButton', targetName: 'zModal', method: 'close' }, { buttonName: 'zModalSkipButton', targetName: 'zModal', method: 'close' }, { buttonName: 'zModalPrintButton', targetName: 'zModal', method: 'close' }, { buttonName: 'zDrawerSaveButton', targetName: 'zDrawer', method: 'close' }, { buttonName: 'closeDrawerButton', targetName: 'trowserDeclarativeDrawer', method: 'close' }, { buttonName: 'popover1CancelButton', targetName: 'popover1', method: 'close' }, { buttonName: 'popover1SaveButton', targetName: 'popover1', method: 'close' }, { buttonName: 'popoverDrawer1CancelButton', targetName: 'popover1', method: 'close' }, { buttonName: 'popoverDrawer1SaveButton', targetName: 'popover1', method: 'close' }].forEach(function (config) {
                var method = config.method || 'show',
                    button = panel[config.buttonName];

                if (button) {
                    button.addEventListener('click', function () {
                        panel[config.targetName][method]();
                    });
                }
            });
        },

        renderReact: function renderReact(placeToAppend) {
            _reactDom2.default.render(_react2.default.createElement(_TrowserExample2.default, null), placeToAppend);
        }

    });
});
//# sourceMappingURL=trowser.view.js.map
