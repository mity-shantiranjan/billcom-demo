(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./drawer.hbs', 'dojo/dom-construct', 'text!./drawer-small.html', './drawer'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./drawer.hbs'), require('dojo/dom-construct'), require('text!./drawer-small.html'), require('./drawer'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.drawer, global.domConstruct, global.drawerSmall, global.drawer);
        global.drawerSmallView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _drawer, _domConstruct, _drawerSmall, _drawer3) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _drawer2 = _interopRequireDefault(_drawer);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

    var _drawerSmall2 = _interopRequireDefault(_drawerSmall);

    var _drawer4 = _interopRequireDefault(_drawer3);

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
            this.renderHTML(_drawer2.default);
            this.renderJS(this.$el.find('#programmaticWay')[0]);
            this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0], this.$el.find('#dojo')[0]);
            this.addEventListeners();
            this.relocateDrawers();

            return this;
        },

        addEventListeners: function addEventListeners(panelIds) {
            var self = this;

            ["html", "dojo", "js"].forEach(function (panelId) {
                var button = self.$el.find("#" + panelId + " .ha-button")[0];
                button.onclick = function () {
                    var drawer = self.$el.find("#" + panelId + " ha-drawer-small")[0];
                    drawer.show();
                };
            });
        },

        renderHTML: function renderHTML(template) {
            var compiled = _handlebars2.default.compile(template),
                html = compiled({ componentDemoTemplate: _drawerSmall2.default });

            this.$el.html(html);
        },

        renderDojo: function renderDojo(placeToAppend, placeToAppendDrawerSmall) {
            var drawer = _domConstruct2.default.toDom(_drawerSmall2.default),
                cloned1 = drawer.cloneNode(true);

            _domConstruct2.default.place(cloned1, placeToAppend);
        },

        relocateDrawers: function relocateDrawers() {
            var _this = this;

            var drawer = undefined,
                panel = undefined;

            ["html", "dojo"].forEach(function (panelId) {
                panel = _this.$el.find("#" + panelId + ".panel")[0];
                drawer = _this.$el.find("#" + panelId + " ha-drawer-small")[0];
                panel.appendChild(drawer);
            });
        },

        renderJS: function renderJS(placeToAppend) {
            _drawer4.default.renderSmallDrawer(placeToAppend, this.el);
        }
    });
});
//# sourceMappingURL=drawer-small.view.js.map
