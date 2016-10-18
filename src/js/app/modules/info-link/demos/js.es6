/* jshint ignore:start */
/* jscs:disable requireMultipleVarDecl */

let usage = `
// Plain Text
var infoLink = document.createElement('ha-info-link');

infoLink.linkText = 'Hello, world!';
infoLink.message = 'Goodbye, world!';

// With HTML
var infoLink2 = document.createElement('ha-info-link'),
    strongText = document.createElement('strong'),
    italicText = document.createElement('i'),
    strongMessage = document.createElement('strong'),
    italicMessage = document.createElement('i');

strongText.textContent = 'Hello, ';
italicText.textContent = 'world!';

strongMessage.textContent = 'Goodbye, ';
italicMessage.textContent = 'world!';

infoLink2.linkText = [strongText, italicText];
infoLink2.message = [strongMessage, italicMessage];`

var h3 = function(label) {
        var h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    },
    appendChildren = function(children, parent) {
        children.forEach(function(el) {
            parent.appendChild(el);
        });
    },
    infoLink = function() {
        return document.createElement('ha-info-link');
    },
    inlineText = function(el) {
        el.linkText = 'Hello, world!';

        return el;
    },
    inlineMessage = function(el) {
        el.message = 'Goodbye, world!';

        return el;
    },
    nestedText = function(el) {
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
    nestedMessage = function(el) {
        var haMessage = document.createElement('ha-message'),
            underlined = document.createElement('u'),
            text = document.createTextNode(', world!');

        underlined.textContent = 'Goodbye';

        appendChildren([underlined, text], haMessage);

        el.message = haMessage;

        return el;
    };

export default {
    id: 'js',
    label: 'JS',
    usage: usage,
    render(el) {
        this.renderInlineTextAndMessage(el);
        this.renderInlineTextAndNestedMessage(el);
        this.renderNestedTextAndInlineMessage(el);
        this.renderNestedTextAndMessage(el);
    },

    renderInlineTextAndMessage: function(el) {
        appendChildren([
            h3('Inline Text and Message'),
            inlineText(inlineMessage(infoLink()))
        ], el);
    },

    renderInlineTextAndNestedMessage: function(el) {
        appendChildren([
            h3('Inline Text and Nested Message'),
            inlineText(nestedMessage(infoLink()))
        ], el);
    },

    renderNestedTextAndInlineMessage: function(el) {
        appendChildren([
            h3('Inline Text and Nested Message'),
            nestedText(inlineMessage(infoLink()))
        ], el);
    },

    renderNestedTextAndMessage: function(el) {
        appendChildren([
            h3('Nested Text and Message'),
            nestedText(nestedMessage(infoLink()))
        ], el);
    }
}
