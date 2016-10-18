define([
    'hui/core/utils',
    'hui/inline-message'
], function(utils) {
    'use strict';

    return {
        loremIpsum: function() {
            return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        },

        styledIpsum: function() {
            return '<i>Lorem ipsum <b>dolor</b> sit amet, consectetur adipiscing elit, sed do <b>eiusmod tempor</b> incididunt ut labore et dolore magna aliqua.</i>';
        },

        render: function(placeToAppend) {
            this.renderStaticMessage(placeToAppend);
            this.renderTooltipStyleMessage(placeToAppend);
            this.renderInteractiveMessage(placeToAppend);
            this.renderTooltipWithAutoClose(placeToAppend);
            this.renderPositionAndAlignment(placeToAppend);
            this.renderStaticMessageFromNode(placeToAppend);
        },

        renderHeader: function(label) {
            var h3 = document.createElement('h3');
            h3.textContent = label;
            return h3;
        },

        renderStaticMessage: function(parent) {
            var header = this.renderHeader('Static Message'),
                inlineMessage = utils.createElement('ha-inline-message', {
                    message: this.loremIpsum()
                }),
                button = utils.createElement('button', {
                    onclick: function() {
                        inlineMessage.close();
                    },
                    textContent: 'Dismiss'
                });

            [header, inlineMessage, button].forEach(function(el) {
                parent.appendChild(el);
            });
        },

        renderTooltipStyleMessage: function(parent) {
            var header = this.renderHeader('Tooltip-style message'),
                textField = utils.createElement('ha-text-field', {
                    label: 'First Name'
                }),
                inlineMessage = utils.createElement('ha-inline-message', {
                    message: this.loremIpsum(),
                    position: 'bottom',
                    targetSelector: '_previousSibling',
                    trigger: 'focus'
                }),
                button = utils.createElement('button', {
                    onclick: function() {
                        inlineMessage.close();
                    },
                    textContent: 'Dismiss'
                });

            [header, textField, inlineMessage, button].forEach(function(el) {
                parent.appendChild(el);
            });
        },

        renderInteractiveMessage: function(parent) {
            var header = this.renderHeader('Tooltip-style message with interactive content'),
                textField = utils.createElement('ha-text-field', {
                    label: 'First Name'
                }),
                inlineMessage = utils.createElement('ha-inline-message', {
                    message: this.loremIpsum() + '<br><a href="#" onclick="this.parentNode.parentNode.close(); return false;">Close</a>',
                    targetSelector: '_previousSibling',
                    trigger: 'focus'
                });

            [header, textField, inlineMessage].forEach(function(el) {
                parent.appendChild(el);
            });
        },

        renderTooltipWithAutoClose: function(parent) {
            var header = this.renderHeader("Tooltip-style message with 'autoClose' attribute"),
                textField = utils.createElement('ha-text-field', {
                    label: 'First Name'
                }),
                inlineMessage = utils.createElement('ha-inline-message', {
                    message: this.loremIpsum(),
                    autoClose: true,
                    targetSelector: '_previousSibling',
                    trigger: 'focus'
                });

            [header, textField, inlineMessage].forEach(function(el) {
                parent.appendChild(el);
            });
        },

        renderPositionAndAlignment: function(parent) {
            var header = this.renderHeader('Positioning and alignment');
            parent.appendChild(header);

            ['top', 'bottom', 'right'].forEach(function(position) {
                var textField = utils.createElement('ha-text-field', {
                        label: 'First Name'
                    }),
                    inlineMessage = utils.createElement('ha-inline-message', {
                        message: 'Position ' + position,
                        autoClose: true,
                        position: position,
                        targetSelector: '_previousSibling',
                        trigger: 'focus'
                    });

                [textField, inlineMessage].forEach(function(el) {
                    parent.appendChild(el);
                });
            }.bind(this));
        },

        renderStaticMessageFromNode: function(parent) {
            var header = this.renderHeader('Static message with content from node'),
                contentNode = utils.createElement('p', {
                    innerHTML: this.styledIpsum()
                }),
                inlineMessage = utils.createElement('ha-inline-message', {
                    message: contentNode
                });

            [header, inlineMessage].forEach(function(el) {
                parent.appendChild(el);
            });
        }
    };
});
