define([
    'backbone',
    'dojo/dom-construct',
    'text!./inline-message.hbs',
    'text!./inline-message.dojo.html',
    './inline-message'
],
    function(Backbone, domConstruct, template, demoTemplate, demoJS) {
        'use strict';

        var InlineMessageView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(event) {
                this.closeAllPopups();
                this.$el.find('.panel').addClass('hidden');
                this.$el.find('#' + event.currentTarget.value).removeClass('hidden');
            },

            render: function() {
                this.$el.html(template);
                this.renderJS(this.$el.find('#programmaticWay')[0]);
                this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
                this._popups = Array.prototype.slice.call(this.el.querySelectorAll('ha-inline-message'));

                return this;
            },

            renderDojo: function(placeToAppend) {
                var inlineMessage = domConstruct.toDom(demoTemplate),
                    cloned = inlineMessage.cloneNode(true);
                domConstruct.place(cloned, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            },

            onClose: function() {
                this.removeAllPopups();
            },

            closeAllPopups: function() {
                this._popups.forEach(function(popup) {
                    if (popup && popup.close) {
                        popup.close();
                    }
                });
            },

            removeAllPopups: function() {
                this._popups.forEach(function(popup) {
                    if (popup && popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                });
            }
        });

        return InlineMessageView;
    }
);
