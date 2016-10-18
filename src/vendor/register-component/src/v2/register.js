define([], function() {

    var doc = typeof document !== "undefined" && document,  // "typeof document" check so module loads in NodeJS

    /**
     * Internal registry of widget class metadata.
     * Key is custom widget tag name, used as Element tag name like <ha-text-field>
     * Value is metadata about the widget, including its prototype, ex: {prototype: object, extends: "button", ... }
     * @type {Object}
     */
    registry = {};

    function register(tag, proto) {
        //var bases, baseElement;

        // Check to see if the custom tag is already registered
        if (tag in registry) {
            throw new TypeError("A widget is already registered with tag '" + tag + "'.");
        }
        var config = registry[tag] = {
            prototype: proto
        };
        return doc.registerElement(tag, config);
    }

    return register;
});