define([
    "object-utils/classes",
    "morpheus/BaseObject",
    "qbo-ui-libs-plugins/addon/XDMAddonViewController",
    "qbo-ui-libs-plugins/util/PluginsUtil"
], function (classes, BaseObject, XDMAddonViewController, PluginsUtil) {
    "use strict";

    return classes.extend(BaseObject, {
        constructor: function (args) {
            this.extension = args.extension;
            this.sandbox = args.sandbox;
            this.config = {
                "sourcePath": "/js/views/templates/PayBillSettingsPage.html"
            }
        },

        getRootNode: function () {
            return this._getView().domNode;
        },

        _getView: function () {
            if (!this._view) {
                this._view = new XDMAddonViewController(PluginsUtil.getXDMVCParameters(this.sandbox, this.config));
                this._view.startup();
            }

            return this._view;
        },

        destroy: function () {
            if (this._view) {
                this._view.destroy();
                this._view = null;
            }
        },

        getIsAccessible: function () {
            return true;
        },

        getLabel: function () {
            return this.extension.config.params.label;
        },

        placeAt: function (vc) {
            console.log("Adding " + this.getRootNode());
            console.log("To " + vc.domNode);
            vc.domNode.appendChild(this.getRootNode());
        },

        isDirty: function () {

        }
    });

});