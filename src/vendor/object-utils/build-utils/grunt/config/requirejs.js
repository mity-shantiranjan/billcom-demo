/* jshint node: true */

module.exports = {
    compile: {
        options: {
            baseUrl: "./",
            preserveLicenseComments: false,
            optimize: "none",
            paths: {
                "components": "empty:",
                "underscore": "empty:",
                "dojo": "empty:",
                "dcl": "empty:",
                "morpheus": "<%= srcDir %>",
                "rsvp": "bower_components/rsvp"
            },
            normalizeDirDefines: "all",
            out: "<%= buildDistDir %>/morpheusjs.js",
            include: [
                "morpheus/BaseObject",
                "morpheus/messaging/EventListenerMixin",
                "morpheus/messaging/EventMixin",
                "morpheus/_RegistryHub",
                "morpheus/messaging/_TopicHub",
                "morpheus/application/Application",
                "morpheus/application/CoreModule",
                "morpheus/application/LayoutManager",
                "morpheus/application/Loader",
                "morpheus/application/NavigationManager",
                "morpheus/application/ViewExtensionManager",
                "morpheus/logging/consoleLogHandler",
                "morpheus/logging/logger",
                "morpheus/BaseModule",
                "morpheus/NavigableModule",
                "morpheus/registryHub",
                "morpheus/routing/Router",
                "morpheus/StateTransitionMixin",
                "morpheus/messaging/topicHub",
                "morpheus/messaging/TopicListenerMixin",
                "morpheus/views/Layout",
                "morpheus/views/RegionView",
                "morpheus/views/RegionViewMixin",
                "morpheus/views/View",
                "morpheus/views/ViewExtensionMixin"
            ]
        }
    }
};