define([
    'hui/menu-button'
], function() {
    'use strict';

    return {
        createMenuButton: function(tagName, properties) {
            var component = document.createElement(tagName),
            prop;

            for (prop in properties) {
                if (properties.hasOwnProperty(prop)) {
                    if (prop === 'classList') {
                        properties.classList.forEach(function(cls) {
                            component.classList.add(cls);
                        });
                    } else {
                        component[prop] = properties[prop];
                    }
                }
            }

            return component;
        },

        createPrimaryDisabled: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-primary'],
                label: 'Create New',
                disabled: true,
                items: this.items()
            });
        },

        createPrimary: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-primary'],
                label: 'Create New',
                items: this.items()
            });
        },

        createPrimaryWithIcon: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-primary'],
                label: 'Create New',
                items: this.items(),
                icon: 'hi-unlock'
            });
        },

        createPrimaryWithDropdown: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-primary'],
                label: 'Create New',
                items: this.items(),
                icon: 'hi-filter',
                showCaret: true
            });
        },

        createSecondaryDisabled: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-secondary'],
                label: 'Create New',
                disabled: true,
                items: this.items()
            });
        },

        createSecondary: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-secondary'],
                label: 'Create New',
                items: this.items()
            });
        },

        createDarkDisabled: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-dark'],
                label: 'Create New',
                disabled: true,
                items: this.items()
            });
        },

        createDark: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-dark'],
                label: 'Create New',
                items: this.items()
            });
        },

        createDarkWithIcon: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-dark'],
                label: 'Create New',
                items: this.items(),
                icon: 'hi-send'
            });
        },

        createDisabledItem: function() {
            return this.createMenuButton('ha-menu-button', {
                classList: ['ha-button-primary'],
                label: 'Create New',
                items: this.items(true)
            });
        },

        createCancelOption: function (cancelText) {
            if (cancelText) {
                return this.createMenuButton('ha-menu-button', {
                    classList: ['ha-button-primary'],
                    label: 'Create New',
                    items: this.items(),
                    mobileCancelText: cancelText
                });
            } else {
                return this.createMenuButton('ha-menu-button', {
                    classList: ['ha-button-primary'],
                    label: 'Create New',
                    items: this.items(),
                    addMobileCancelOption: true
                });
            }
        },

        items: function(disabledItem) {
            var items = [],
                i;

            for (i = 0; i < 3; i++) {
                items[i] = document.createElement('ha-item');
            }

            items[0].label = 'Apple';
            items[0].value = 'AppleValue';
            items[1].label = 'Banana';
            items[1].value = 'BananaValue';
            items[2].label = 'Balloon';
            items[2].value = 'BalloonValue';

            if (disabledItem) {
                items[0].disabled = 'disabled';
            }

            return items;
        },

        render: function(placeToAppend) {
            var menuButtonPrimaryDisabled,
                menuButtonPrimary,
                menuButtonPrimaryWithIcon,
                menuButtonPrimaryWithDropdownIcon,
                menuButtonSecondaryDisabled,
                menuButtonSecondary,
                menuButtonDarkDisabled,
                menuButtonDark,
                menuButtonDarkWithIcon,
                menuButtonDisabledItem,
                menuButtonCancelOption,
                menuButtonCancelText,
                divContainer = document.createElement('div'),
                disabledItemsTitle = document.createElement('h3'),
                disabledItems = document.createElement('div'),
                mobileCancelOptionTitle = document.createElement('h3'),
                mobileCancelItems = document.createElement('div'),
                contentDark = document.createElement('div');

            contentDark.classList.add('container-dark');
            contentDark.classList.add('container-menu-button');
            disabledItemsTitle.textContent = 'With Disabled Items';
            disabledItems.classList.add('container-disabled-items');
            mobileCancelOptionTitle.textContent = 'With cancel option';

            //Divs container
            divContainer.classList.add('container-menu-button');

            // Menu Button Primary Disabled
            menuButtonPrimaryDisabled = this.createPrimaryDisabled();
            divContainer.appendChild(menuButtonPrimaryDisabled);

            // Menu Button Primary
            menuButtonPrimary = this.createPrimary();
            divContainer.appendChild(menuButtonPrimary);

            // Menu Button Primary With Icon
            menuButtonPrimaryWithIcon = this.createPrimaryWithIcon();
            divContainer.appendChild(menuButtonPrimaryWithIcon);

            //Menu Button Primary with dropdown icon
            menuButtonPrimaryWithDropdownIcon = this.createPrimaryWithDropdown();
            divContainer.appendChild(menuButtonPrimaryWithDropdownIcon);

            // Menu Button Secondary Disabled
            menuButtonSecondaryDisabled = this.createSecondaryDisabled();
            divContainer.appendChild(menuButtonSecondaryDisabled);

            // Menu Button Secondary
            menuButtonSecondary = this.createSecondary();
            divContainer.appendChild(menuButtonSecondary);

            // Menu Button Dark Disabled
            menuButtonDarkDisabled = this.createDarkDisabled();
            contentDark.appendChild(menuButtonDarkDisabled);

            // Menu Button Dark
            menuButtonDark = this.createDark();
            contentDark.appendChild(menuButtonDark);

            // Menu Button Dark
            menuButtonDarkWithIcon = this.createDarkWithIcon();
            contentDark.appendChild(menuButtonDarkWithIcon);

            menuButtonDisabledItem = this.createDisabledItem();
            disabledItems.appendChild(disabledItemsTitle);
            disabledItems.appendChild(menuButtonDisabledItem);

            placeToAppend.appendChild(divContainer);
            contentDark.classList.add('content-dark');
            placeToAppend.appendChild(contentDark);
            placeToAppend.appendChild(disabledItems);

            // With cancel option
            menuButtonCancelOption = this.createCancelOption();
            menuButtonCancelText = this.createCancelOption('Cancel Selection');
            mobileCancelItems.appendChild(mobileCancelOptionTitle);
            mobileCancelItems.appendChild(menuButtonCancelOption);
            mobileCancelItems.appendChild(menuButtonCancelText);
            mobileCancelItems.className = 'hidden-tablet hidden-desktop container-menu-button';
            placeToAppend.appendChild(mobileCancelItems);
        }
    };
});
