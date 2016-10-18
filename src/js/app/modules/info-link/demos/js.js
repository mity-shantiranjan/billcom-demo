(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.js = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /* jshint ignore:start */
    /* jscs:disable requireMultipleVarDecl */

    var usage = '\n// Plain Text\nvar infoLink = document.createElement(\'ha-info-link\');\n\ninfoLink.linkText = \'Hello, world!\';\ninfoLink.message = \'Goodbye, world!\';\n\n// With HTML\nvar infoLink2 = document.createElement(\'ha-info-link\'),\n    strongText = document.createElement(\'strong\'),\n    italicText = document.createElement(\'i\'),\n    strongMessage = document.createElement(\'strong\'),\n    italicMessage = document.createElement(\'i\');\n\nstrongText.textContent = \'Hello, \';\nitalicText.textContent = \'world!\';\n\nstrongMessage.textContent = \'Goodbye, \';\nitalicMessage.textContent = \'world!\';\n\ninfoLink2.linkText = [strongText, italicText];\ninfoLink2.message = [strongMessage, italicMessage];';

    var h3 = function h3(label) {
        var h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    },
        appendChildren = function appendChildren(children, parent) {
        children.forEach(function (el) {
            parent.appendChild(el);
        });
    },
        infoLink = function infoLink() {
        return document.createElement('ha-info-link');
    },
        inlineText = function inlineText(el) {
        el.linkText = 'Hello, world!';

        return el;
    },
        inlineMessage = function inlineMessage(el) {
        el.message = 'Goodbye, world!';

        return el;
    },
        nestedText = function nestedText(el) {
        var haText = document.createElement('ha-text'),
            italic = document.createElement('em'),
            comma = document.createTextNode(', '),
            bold = document.createElement('strong'),
            exclamation = document.createTextNode('!');

        italic.textContent = 'Hello';
        bold.textContent = 'world';

        appendChildren([italic, comma, bold, exclamation], haText);

        el.linkText = haText;

        return el;
    },
        nestedMessage = function nestedMessage(el) {
        var haMessage = document.createElement('ha-message'),
            underlined = document.createElement('u'),
            text = document.createTextNode(', world!');

        underlined.textContent = 'Goodbye';

        appendChildren([underlined, text], haMessage);

        el.message = haMessage;

        return el;
    };

    exports.default = {
        id: 'js',
        label: 'JS',
        usage: usage,
        render: function render(el) {
            this.renderInlineTextAndMessage(el);
            this.renderInlineTextAndNestedMessage(el);
            this.renderNestedTextAndInlineMessage(el);
            this.renderNestedTextAndMessage(el);
        },

        renderInlineTextAndMessage: function renderInlineTextAndMessage(el) {
            appendChildren([h3('Inline Text and Message'), inlineText(inlineMessage(infoLink()))], el);
        },

        renderInlineTextAndNestedMessage: function renderInlineTextAndNestedMessage(el) {
            appendChildren([h3('Inline Text and Nested Message'), inlineText(nestedMessage(infoLink()))], el);
        },

        renderNestedTextAndInlineMessage: function renderNestedTextAndInlineMessage(el) {
            appendChildren([h3('Inline Text and Nested Message'), nestedText(inlineMessage(infoLink()))], el);
        },

        renderNestedTextAndMessage: function renderNestedTextAndMessage(el) {
            appendChildren([h3('Nested Text and Message'), nestedText(nestedMessage(infoLink()))], el);
        }
    };
});
//# sourceMappingURL=js.js.map
