define([
    'hui/simple-list'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var list = document.createElement('ha-list'),
                item1 = document.createElement('li'),
                item2 = document.createElement('li'),
                item3 = document.createElement('li');

            //list.complexity = 'basic';
            list.titleText = 'Single select list';

            item1.innerHTML = 'First list item';
            // optionally add a control as a child to item1

            item2.innerHTML = 'Second list item';
            // optionally add a control as a child to item2

            item3.innerHTML = 'Third list item';
            // optionally add a control as a child to item3

            list.items = [item1, item2, item3];

            placeToAppend.appendChild(list);
        }
    };
});
