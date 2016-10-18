define([
    'backbone',
    'text!./video-launcher.hbs',
    'dojo/dom-construct',
    'text!./video-launcher.dojo.html',
    './video-launcher'
],
    function(Backbone, template, domConstruct, demoTemplate, demoJS) {
        'use strict';

        var VideoDemoView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(evt) {
                if (evt.currentTarget.value === 'video') {
                    window.location.href = './#video';
                    var active = document.getElementsByClassName('active')[0];

                    if (active) {
                        active.classList.toggle('active');
                    }
                    document.querySelector('[href="#video"]').classList.toggle('active');
                } else {
                    this.$el.find('.panel').addClass('hidden');
                    this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
                }
            },

            render: function() {
                this.$el.html(template);
                this.renderJS(this.$('#programmaticWay')[0]);
                this.renderDojo(this.$('#dojoProgrammaticWay')[0]);
                return this;
            },

            renderDojo: function(placeToAppend) {
                var videoLauncher = domConstruct.toDom(demoTemplate);
                domConstruct.place(videoLauncher, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }
        });

        return VideoDemoView;
    }
);
