define([
    'hui/combo-button',
    'hui/menu-button'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var comboButtonPrimaryDisabled,
                comboButtonPrimary,
                comboButtonSecondaryDisabled,
                comboButtonSecondary,
                comboButtonDarkDisabled,
                comboButtonDark,
                comboButtonDisabledItem,
                comboButtonDesktopOnly,
                menuButtonHandheldOnly,
                contentDark = document.createElement('div'),
                disabledItemsTitle = document.createElement('h3'),
                disabledItems = document.createElement('div'),
                switchForPlatformTitle = document.createElement('h3'),
                switchForPlatformItems = document.createElement('div'),
                items = [],
                i;

            for (i = 0; i < 18; i++) {
                items[i] = document.createElement('ha-item');
            }

            contentDark.classList.add('container-dark');
            disabledItemsTitle.textContent = 'With Disabled Items';
            disabledItems.classList.add('container-disabled-items');

            // Combo Button Primary Disabled
            comboButtonPrimaryDisabled = document.createElement('ha-combo-button');
            comboButtonPrimaryDisabled.classList.add('ha-button-primary');

            items[0].label = 'Apple';
            items[0].value = 'AppleValue';
            items[1].label = 'Banana';
            items[1].value = 'BananaValue';
            items[2].label = 'Balloon';
            items[2].value = 'BalloonValue';

            comboButtonPrimaryDisabled.label = 'Create New';
            comboButtonPrimaryDisabled.disabled = true;
            comboButtonPrimaryDisabled.items = [items[0], items[1], items[2]];

            comboButtonPrimaryDisabled.setAttribute("data-automation-id", "js_cmbtn_primary_disabled");
            placeToAppend.appendChild(comboButtonPrimaryDisabled);

            // Combo Button Primary
            comboButtonPrimary = document.createElement('ha-combo-button');
            comboButtonPrimary.classList.add('ha-button-primary');

            items[3].label = 'Apple';
            items[3].value = 'AppleValue';
            items[4].label = 'Banana';
            items[4].value = 'BananaValue';
            items[5].label = 'Balloon';
            items[5].value = 'BalloonValue';

            comboButtonPrimary.label = 'Create New';
            comboButtonPrimary.items = [items[3], items[4], items[5]];

            comboButtonPrimary.setAttribute("data-automation-id", "js_cmbtn_primary");
            placeToAppend.appendChild(comboButtonPrimary);

            // Combo Button Secondary Disabled
            comboButtonSecondaryDisabled = document.createElement('ha-combo-button');

            items[6].label = 'Apple';
            items[6].value = 'AppleValue';
            items[7].label = 'Banana';
            items[7].value = 'BananaValue';
            items[8].label = 'Balloon';
            items[8].value = 'BalloonValue';

            comboButtonSecondaryDisabled.label = 'Create New';
            comboButtonSecondaryDisabled.disabled = true;
            comboButtonSecondaryDisabled.items = [items[6], items[7], items[8]];

            comboButtonSecondaryDisabled.setAttribute("data-automation-id", "js_cmbtn_secondary_disabled");
            placeToAppend.appendChild(comboButtonSecondaryDisabled);

            // Combo Button Secondary
            comboButtonSecondary = document.createElement('ha-combo-button');

            items[9].label = 'Apple';
            items[9].value = 'AppleValue';
            items[10].label = 'Banana';
            items[10].value = 'BananaValue';
            items[11].label = 'Balloon';
            items[11].value = 'BalloonValue';

            comboButtonSecondary.label = 'Create New';
            comboButtonSecondary.items = [items[9], items[10], items[11]];

            comboButtonSecondary.setAttribute("data-automation-id", "js_cmbtn_secondary");
            placeToAppend.appendChild(comboButtonSecondary);

            // Combo Button Dark Disabled
            comboButtonDarkDisabled = document.createElement('ha-combo-button');
            comboButtonDarkDisabled.classList.add('ha-button-dark');

            items[12].label = 'Apple';
            items[12].value = 'AppleValue';
            items[13].label = 'Banana';
            items[13].value = 'BananaValue';
            items[14].label = 'Balloon';
            items[14].value = 'BalloonValue';

            comboButtonDarkDisabled.label = 'Create New';
            comboButtonDarkDisabled.disabled = true;
            comboButtonDarkDisabled.items = [items[12], items[13], items[14]];

            comboButtonDarkDisabled.setAttribute("data-automation-id", "js_cmbtn_dark_disabled");
            contentDark.appendChild(comboButtonDarkDisabled);

            // Combo Button Dark
            comboButtonDark = document.createElement('ha-combo-button');
            comboButtonDark.classList.add('ha-button-dark');

            items[15].label = 'Send';
            items[15].value = 'SendValue';
            items[16].label = 'Create new';
            items[16].value = 'CreateNewValue';
            items[17].label = 'Done';
            items[17].value = 'DoneValue';

            comboButtonDark.label = 'Save';
            comboButtonDark.items = [items[15], items[16], items[17]];

            comboButtonDark.setAttribute("data-automation-id", "js_cmbtn_dark");
            contentDark.appendChild(comboButtonDark);

            contentDark.classList.add('content-dark');
            placeToAppend.appendChild(contentDark);

            // Disabled Item
            comboButtonDisabledItem = document.createElement('ha-combo-button');
            comboButtonDisabledItem.classList.add('ha-button-primary');

            items[0].label = 'Apple';
            items[0].value = 'AppleValue';
            items[0].disabled = 'disabled';
            items[1].label = 'Banana';
            items[1].value = 'BananaValue';
            items[2].label = 'Balloon';
            items[2].value = 'BalloonValue';

            comboButtonDisabledItem.label = 'Create New';
            comboButtonDisabledItem.items = [items[0], items[1], items[2]];

            comboButtonDisabledItem.setAttribute("data-automation-id", "js_cmbtn_primary_item_disabled");
            disabledItems.appendChild(comboButtonDisabledItem);
            placeToAppend.appendChild(disabledItemsTitle);
            placeToAppend.appendChild(disabledItems);

            // Switch for platform
            switchForPlatformTitle.textContent = 'Switch to Menu Buttons for Handheld Devices';
            comboButtonDesktopOnly = document.createElement('ha-combo-button');
            comboButtonDesktopOnly.className = 'ha-button-primary hidden-handheld';
            menuButtonHandheldOnly = document.createElement('ha-menu-button');
            menuButtonHandheldOnly.className = 'ha-button-primary hidden-desktop';

            items[0].label = 'Apple';
            items[0].value = 'AppleValue';
            items[0].disabled = null;
            items[1].label = 'Banana';
            items[1].value = 'BananaValue';
            items[2].label = 'Balloon';
            items[2].value = 'BalloonValue';

            comboButtonDesktopOnly.label = 'Create New';
            menuButtonHandheldOnly.label = 'Create New';

            comboButtonDesktopOnly.items = [items[0], items[1], items[2]];
            menuButtonHandheldOnly.items = [items[0], items[1], items[2]];

            comboButtonDesktopOnly.setAttribute('data-automation-id', 'js_cmbtn_primary_desktop');
            menuButtonHandheldOnly.setAttribute('data-automation-id', 'js_mbtn_primary_mobile');

            switchForPlatformItems.appendChild(switchForPlatformTitle);
            switchForPlatformItems.appendChild(comboButtonDesktopOnly);
            switchForPlatformItems.appendChild(menuButtonHandheldOnly);
            placeToAppend.appendChild(switchForPlatformItems);
        }
    };
});
