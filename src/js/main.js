/* jshint ignore:start */
var dojoConfig = {
    '-requestProvider': 'dojo/request/registry'
};
/* jshint ignore:end */
require.config({
    paths: {
        'highlightjs': '../vendor/highlightjs/highlight.pack',
        'backbone': '../vendor/backbone/backbone',
        'dojo': '../vendor/dojo',
        'dgrid': '../vendor/dgrid',
        'dstore': '../vendor/dstore',
        'put-selector': '../vendor/put-selector',
        'xstyle': '../vendor/xstyle',
        'text': '../vendor/requirejs-text/text',
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore/underscore',
        'modernizr': '../vendor/modernizr/modernizr',
        'mustache': '../vendor/mustache.js/mustache',
        'hui-components': '../vendor/hui/dist/js/hui',
        'hui-table': '../vendor/hui/dist/js/hui-table',
        'object-utils': '../vendor/object-utils/src',
        'templateregistry': 'app/templates',
        'hbs': '../vendor/handlebars',
        'backbone.stickit': '../vendor/backbone.stickit/backbone.stickit',
        'hui/react-components': '../vendor/hui/dist/react-components',
        'hui-css': '../vendor/hui/dist/css',
        'react': '../vendor/react/react-with-addons',
        'react-dom': '../vendor/react/react-dom',
        'ua-parser': '../vendor/ua-parser/dist/ua-parser.min'
    },
    waitSeconds: 30
});
// Load these first to make components register and so that modules in the layer files
// can be loaded by router and events
require(
    [
        'hui-components',
        'hui-table'
    ],
    function() {
        require(
            [
                'app/router',
                'app/events',
                'modernizr',
                'hui/switch-button',
                'hui/checkbox',
                'hui/checkbox-group',
                'hui/date-picker',
                'hui/date-range-picker',
                'hui/popover',
                'hui/popover-form',
                'hui/tooltip',
                'hui/segmented-button',
                'hui/textarea',
                'hui/text-field',
                'hui/radio-button',
                'hui/radio-button-group',
                'hui/drawer-large',
                'hui/drawer-small',
                'hui/toast-message',
                'hui/tabs',
                'hui/modal',
                'hui/money-bar',
                'hui/money-bar-segment',
                'hui/money-bar-cell',
                'hui/inline-message',
                'hui/label',
                'hui/page-message',
                'hui/stacked-page-messages',
                'hui/paginated-message',
                'hui/paginated-messages',
                'hui/trowser',
                'hui/trowser/page-modal-footer',
                'hui/trowser/page-modal-header-item',
                'hui/trowser/page-modal-header',
                'hui/trowser/page-modal',
                'hui/stage',
                'hui/menu',
                'hui/menu-item',
                'hui/combo-button',
                'hui/menu-button',
                'hui/combo-link',
                'hui/simple-list',
                'hui/flyout',
                'hui/select-type-ahead',
                'hui/select',
                'hui/single-step',
                'hui/item',
                'hui/inline-message',
                'hui/textfield-type-ahead',
                'hui/table',
                'hui/table-virtual',
                'hui/step-flow',
                'hui/video',
                'hui/video-launcher',
                'hui/video/video-overlay-button',
                'hui/card-discovery-large',
                'hui/info-link'
            ],
            function(Router, Events) {
                'use strict';
                new Router();
                //new Events();
            }
        );
    }
);
