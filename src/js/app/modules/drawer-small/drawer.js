define([
    'hui/drawer-small'
], function() {
    'use strict';

    return {
        createButton: function(text, target, parent) {
            var drawerButton = document.createElement('button');

            drawerButton.textContent = text;
            drawerButton.className = 'ha-button';

            this._appendChildWithWrapper(drawerButton, parent);
        },

        createDrawerSmall: function(id, title, content, target) {
            var drawer = document.createElement('ha-drawer-small'),
                targetSibling = '#js .' + target.querySelector('div').classList[0];

            drawer.id = id;
            drawer.titleText = title;
            drawer.section = content;
            drawer.targetSiblingSelector = targetSibling;

            target.appendChild(drawer);

            return drawer;
        },

        generateSmallContent: function() {
            var textField = document.createElement('ha-text-field');

            textField.label = 'Insert content';
            textField.render();

            return textField;
        },

        generateSmallContentWOButton: function() {
            var textField = document.createElement('ha-text-field'),
                container = document.createElement('div');

            textField.render();
            container.appendChild(textField);

            return container;
        },

        _appendChildWithWrapper: function(child, parent) {
            var wrapper = document.createElement('div');

            wrapper.style.margin = '2px';
            wrapper.style.display = 'inline-block';
            wrapper.appendChild(child);

            parent.appendChild(wrapper);
        },

        createFooterButton: function(drawerId) {
            var footerButton = document.createElement('button');
            footerButton.setAttribute('data-drawer-id', drawerId);
            footerButton.textContent = 'Save';
            footerButton.className = 'ha-button ha-button-primary close-button';
            return footerButton;
        },

        renderSmallDrawer: function(placeToAppend, el) {
            var drawerButtonsWrapper = document.createElement('div'),
                drawerSmall;

            drawerSmall = this.createDrawerSmall(
                'myDrawerSmall',
                'Some Title',
                this.generateSmallContent(),
                el.querySelector('#js')
            );

            this.createButton('Show Drawer Small', 'myDrawerSmall', drawerButtonsWrapper, drawerSmall);

            placeToAppend.appendChild(drawerButtonsWrapper);
        }
    };
});
