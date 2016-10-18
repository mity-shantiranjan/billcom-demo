define([
    'hui/combo-link'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var comboLink1 = document.createElement('ha-combo-link'),
                item1 = document.createElement('ha-item'),
                item2 = document.createElement('ha-item'),
                item3 = document.createElement('ha-item'),
                title1 = document.createElement('h3'),
                comboLink2 = document.createElement('ha-combo-link'),
                item4 = document.createElement('ha-item'),
                item5 = document.createElement('ha-item'),
                item6 = document.createElement('ha-item'),
                title2 = document.createElement('h3'),
                item7 = document.createElement('ha-item'),
                item8 = document.createElement('ha-item'),
                item9 = document.createElement('ha-item'),
                title3 = document.createElement('h3'),
                comboLink3 = document.createElement('ha-combo-link');

            title1.innerHTML = 'Common Combo Link';

            item1.label = 'Apple';
            item1.value = 'AppleValue';
            item2.label = 'Banana';
            item2.value = 'BananaValue';
            item3.label = 'Balloon';
            item3.value = 'BalloonValue';

            comboLink1.label = 'Combo Link 1';
            comboLink1.disabled = false;
            comboLink1.items = [item1, item2, item3];

            placeToAppend.appendChild(title1);
            placeToAppend.appendChild(comboLink1);

            title2.innerHTML = 'With Disabled Item';

            item4.label = 'Apple';
            item4.value = 'AppleValue';
            item4.disabled = 'disabled';
            item5.label = 'Banana';
            item5.value = 'BananaValue';
            item6.label = 'Balloon';
            item6.value = 'BalloonValue';

            comboLink2.label = 'Combo Link 2';
            comboLink2.disabled = false;
            comboLink2.items = [item4, item5, item6];

            placeToAppend.appendChild(title2);
            placeToAppend.appendChild(comboLink2);

            title3.innerHTML = 'ComboLink with custom HTML rendering';

            item7.titleText = 'Apple';
            item7.value = 'Apple';
            item7.subtitleText = 'Fruit';
            item8.titleText = 'Cabbage';
            item8.value = 'Cabbage';
            item8.subtitleText = 'Vegetable';
            item9.titleText = 'Pizza';
            item9.value = 'Pizza';
            item9.subtitleText = 'Food';

            comboLink3.label = 'Combo Link 3';
            comboLink3.disabled = false;
            comboLink3.itemRenderer = this.customRenderer;
            comboLink3.items = [item7, item8, item9];

            placeToAppend.appendChild(title3);
            placeToAppend.appendChild(comboLink3);
        },

        customRenderer: function(itemElement) {
            var rootNode = document.createElement('div'),
                titleNode = document.createElement('span'),
                subTitleNode = document.createElement('span');

            titleNode.textContent = itemElement.titleText;
            titleNode.style.fontWeight = 'bold';
            subTitleNode.textContent = itemElement.subtitleText;
            subTitleNode.style.fontWeight = 'light';
            subTitleNode.style.fontSize = '12px';
            subTitleNode.style.display = 'block';
            subTitleNode.style.marginTop = '-5px';
            rootNode.appendChild(titleNode);
            rootNode.appendChild(subTitleNode);

            return rootNode;
        }
    };
});
