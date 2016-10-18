define([
    'backbone',
    'text!./grid.hbs'
],
    function(Backbone, template) {
        'use strict';

        var GridSystemView = Backbone.View.extend({

	    events: {
		'click ha-segmented-button.usage-tab-buttons': 'navigate'
	    },

	    navigate: function(event) {
		this.$el.find('.panel').addClass('hidden');
		this.$el.find('#' + event.currentTarget.value).removeClass('hidden');
	    },

            render: function() {
                this.$el.html(template);
                return this;
            }

        });

        return GridSystemView;
    }
);
