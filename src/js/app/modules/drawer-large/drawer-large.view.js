(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./drawer.hbs', 'dojo/dom-construct', 'text!./drawer-large.html', './drawer', 'react', 'react-dom', './DrawerExample.react', '../util/codeSample', 'text!./drawer-large-declarative-usage.html'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./drawer.hbs'), require('dojo/dom-construct'), require('text!./drawer-large.html'), require('./drawer'), require('react'), require('react-dom'), require('./DrawerExample.react'), require('../util/codeSample'), require('text!./drawer-large-declarative-usage.html'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.drawer, global.domConstruct, global.drawerLarge, global.drawer, global.react, global.reactDom, global.DrawerExample, global.codeSample, global.drawerLargeDeclarativeUsage);
        global.drawerLargeView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _drawer, _domConstruct, _drawerLarge, _drawer3, _react, _reactDom, _DrawerExample, _codeSample, _drawerLargeDeclarativeUsage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _drawer2 = _interopRequireDefault(_drawer);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _drawerLarge2 = _interopRequireDefault(_drawerLarge);

    var _drawer4 = _interopRequireDefault(_drawer3);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _DrawerExample2 = _interopRequireDefault(_DrawerExample);

    var _codeSample2 = _interopRequireDefault(_codeSample);

    var _drawerLargeDeclarativeUsage2 = _interopRequireDefault(_drawerLargeDeclarativeUsage);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function addButtons(wrapper, id) {
        var drawer = wrapper.querySelector('.declarative-drawer'),
            drawerNoOverlay = wrapper.querySelector('.declarative-drawer-wo-overlay'),
            drawerButton,
            drawerNoOverlayButton;

        drawer.id = id + '-drawer';
        drawerNoOverlay.id = id + '-drawer-no-overlay';

        drawerButton = _drawer4.default.createButton('Show Drawer Large', drawer.id, wrapper, drawer);

        drawerNoOverlayButton = _drawer4.default.createButton('Show Drawer Large Without Overlay', drawerNoOverlay.id, wrapper, drawerNoOverlay);
    } /* jshint ignore:start */

    exports.default = _backbone2.default.View.extend({

        events: {
            'click ha-segmented-button.usage-tab-buttons': 'navigate',
            'click .show-drawer-large': 'showDrawer',
            'click button.close-button': 'closeDrawer'
        },

        closeAll: function closeAll(target) {
            var drawersLarge = this.el.ownerDocument.querySelectorAll('ha-drawer-large'),
                targetId = target.getAttribute('data-drawer-id');

            Array.prototype.forEach.call(drawersLarge, function (drawer) {
                if (drawer.id !== targetId) {
                    drawer.close();
                }
            });
        },

        closeAllDrawers: function closeAllDrawers() {
            this._drawers.forEach(function (drawer) {
                drawer.close();
            });
        },

        navigate: function navigate(evt) {
            this.$el.find('.panel').addClass('hidden');
            this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');

            this.closeAllDrawers();
        },

        render: function render() {
            this.renderHTML(_drawer2.default, _drawerLarge2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#dojo')[0]);
            this.renderReact(this.$('#reactWay')[0]);

            this._drawers = Array.prototype.slice.call(this.el.querySelectorAll('ha-drawer-large'));

            return this;
        },

        renderHTML: function renderHTML(template, demoTemplate) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({
                componentDemoTemplate: demoTemplate,
                declarativeUsage: _codeSample2.default.fromString(_drawerLargeDeclarativeUsage2.default)
            });

            this.$el.html(html);
            addButtons(this.el.querySelector('#html > div.left-content > section.examples'), 'html');
        },

        renderDojo: function renderDojo(placeToAppend) {
            var drawer = _domConstruct2.default.toDom(_drawerLarge2.default),
                cloned1 = drawer.cloneNode(true);

            _domConstruct2.default.place(cloned1, placeToAppend);
            addButtons(placeToAppend, 'dojo');
        },

        closeDrawer: function closeDrawer(event) {
            var drawerId = event.currentTarget.getAttribute('data-drawer-id'),
                drawerElement = this.el.ownerDocument.getElementById(drawerId);

            drawerElement.close();
        },

        showDrawer: function showDrawer(event) {
            var drawerId = event.currentTarget.getAttribute('data-drawer-id'),
                drawerElement = this.el.ownerDocument.getElementById(drawerId);

            this.closeAll(event.target);
            drawerElement.show();
        },

        onClose: function onClose() {
            this.closeAllDrawers();
        },

        renderJS: function renderJS(placeToAppend) {
            _drawer4.default.renderLargeDrawer(placeToAppend);
        },

        renderReact: function renderReact(placeToAppend) {
            _reactDom2.default.render(_react2.default.createElement(_DrawerExample2.default, null), placeToAppend);
        }
    });
});
//# sourceMappingURL=drawer-large.view.js.map
