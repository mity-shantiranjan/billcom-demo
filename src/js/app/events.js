define(
    [
        'backbone'
    ],

    function(Backbone) {

        var Events = Backbone.Model.extend({

            initialize: function() {
                this.activeSelected();
                this.openResponsiveMenu();
            },

            activeSelected: function() {
                var nav = document.getElementsByClassName('list-group')[0];

                nav.addEventListener('click', function(event) {
                    var active = document.getElementsByClassName('active')[0];

                    if (active) {
                        active.classList.toggle('active');
                    }
                    event.target.classList.toggle('active');
                });
            },

            openResponsiveMenu: function() {
                var menuButton = document.getElementsByClassName('list-toggle')[0],
                    menu = document.getElementsByClassName('list-group')[0];

                menuButton.addEventListener('click', function() {
                    if (menu.offsetHeight > 0) {
                        menu.style.height = 0;
                    } else {
                        menu.style.height = '617px';
                    }
                });
            }

        });

        return Events;
    }
);
