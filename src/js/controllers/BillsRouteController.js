define([
    "object-utils/classes",
    "neo/BaseRouteController",
    "qbo-ui-libs-plugins/addon/XDMAddonViewController",
    "qbo-ui-libs-plugins/util/PluginsUtil"
], function(classes, BaseRouteController, XDMAddonViewController, PluginsUtil) {
    "use strict";

    var RouteController = classes.extend(BaseRouteController, {

        /**
         * Constructor
         */
        constructor: function RouteController(args) {
            // Declare the URL route this controller will own
            this.root = "paybillsonlineincoming";
            this.routes = {
                "": "index"
            };

            RouteController.applySuper(this, arguments);
            this.extension = args.extension;
            this.sandbox = args.sandbox;
            this.config = {
                "sourcePath": "/js/views/templates/PayBillSettingsPage.html"
            }
        },

        /**
         * Handle the default route.
         *
         * @see  web-shell-core/routing/RouteController
         * @param  {Object} routeInfo Details of the route
         * @return {Object}           View and layout options for the layout manager
         */
        index: function(routeInfo) {
            return {
                view: this._getView(routeInfo),
                layoutOptions: this._getLayoutOptions()
            };
        },

        /**
         * Perform any clean up when the user leaves our route.
         */
        onBeforeStop: function onBeforeStop() {
            if (this._view) {
                this._view.destroy();
                this._view = null;
            }
            onBeforeStop.applySuper(this, arguments);
        },

        /**
         * Get the view for this route.
         * @param  {Object} routeInfo Details of the route
         * @return {Object} The view instance
         */
        _getView: function(routeInfo) {

          //alert("test");
          if (!this._view) {
                this._view = new XDMAddonViewController(PluginsUtil.getXDMVCParameters(this.sandbox, this.config));
                this._view.startup();
            }
            return this._view;
        },

        /**
         * Get the layout options for adding our view to the app.
         *
         * @see https://github.intuit.com/pages/SBG/sbg-plugin-developers-guide/native/views/0-overview/
         * @return {Object} The options
         */
        _getLayoutOptions: function() {
            return {
                layout: "shell"
            };
        }

    });

    return RouteController;

});
