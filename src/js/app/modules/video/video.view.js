define([
    'backbone',
    'text!./video.hbs',
    'dojo/dom-construct',
    'text!./video.dojo.html',
    './video'
],
    function(Backbone, template, domConstruct, demoTemplate, demoJS) {
        'use strict';

        var VideoDemoView = Backbone.View.extend({

            events: {
                'click ha-segmented-button.usage-tab-buttons': 'navigate'
            },

            navigate: function(evt) {
                if (evt.currentTarget.value === 'video-launcher') {
                    window.location.href = './#video-launcher';
                    var active = document.getElementsByClassName('active')[0];

                    if (active) {
                        active.classList.toggle('active');
                    }
                    document.querySelector('[href="#video-launcher"]').classList.toggle('active');
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
                var video = domConstruct.toDom(demoTemplate);
                domConstruct.place(video, placeToAppend);
            },

            renderJS: function(placeToAppend) {
                demoJS.render(placeToAppend);
            }
        });

        return VideoDemoView;
    }
);
