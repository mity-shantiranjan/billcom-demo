define([
    'hui/drawer-small',
    'hui/drawer-large'
], function() {
    'use strict';

    return {
        createButton: function(text, target, parent, component) {
            var drawerButton = document.createElement('button');

            drawerButton.textContent = text;
            drawerButton.className = 'show-drawer-large ha-button';
            drawerButton.setAttribute('data-drawer-id', component.id);

            this._appendChildWithWrapper(drawerButton, parent);
            return drawerButton;
        },

        createDrawerLarge: function(id, title, section, footer, overlay, target) {
            var drawer = document.createElement('ha-drawer-large');

            drawer.backdrop = overlay;
            drawer.id = id;
            drawer.titleText = title;
            drawer.section = section;
            drawer.footer = footer;

            target.appendChild(drawer);

            footer.addEventListener('click', function(){
                drawer.close();
            });

            return drawer;
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

        generateLargeContent: function(count) {
            var text,
                container = document.createElement('div'),
                controlContent;

            for (count; count > 0; count -= 1) {
                text = document.createElement('span');
                text.textContent = 'Lorem ipsum dolor sit amet';

                controlContent = this.generateSmallContentWOButton();

                container.appendChild(text);
                container.appendChild(controlContent);
            }

            return container;
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
        },

        renderLargeDrawer: function(placeToAppend) {
            var drawerButtonsWrapper = document.createElement('div'),
            drawerLarge,
            drawerLargeWithoutOverlay;

            drawerLarge = this.createDrawerLarge(
                'myLargeDrawer',
                'Customer information',
                this.generateLargeContent(30),
                this.createFooterButton('myLargeDrawer'),
                true,
                placeToAppend
            );

            drawerLargeWithoutOverlay = this.createDrawerLarge(
                'mydrawerLargeWithOutOverlay',
                'Customer information',
                this.generateSmallContent(),
                this.createFooterButton('mydrawerLargeWithOutOverlay'),
                false,
                placeToAppend
            );

            this.createButton(
                'Show Drawer Large',
                'myLargeDrawer',
                drawerButtonsWrapper, drawerLarge
            );

            this.createButton(
                'Show Drawer Large Without Overlay',
                'mydrawerLargeWithOutOverlay',
                drawerButtonsWrapper,
                drawerLargeWithoutOverlay
            );

            placeToAppend.appendChild(drawerButtonsWrapper);
        }
    };
});
