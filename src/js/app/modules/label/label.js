define([
    'hui/label',
    'hui/text-field'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var content,
                complexLabel = document.createElement('span'),
                div = document.createElement('div');
            complexLabel.innerHTML = "I am <strong> ha-label </strong> <small> that overwrites default </small><span>label</span>";

            // text-field
            var textField = document.createElement('ha-text-field');
            textField.label = complexLabel.cloneNode(true);
            content = div.cloneNode(true);
            content.appendChild(textField);
            placeToAppend.appendChild(content);

            // textarea
            var textarea = document.createElement('ha-textarea');
            textarea.label = complexLabel.cloneNode(true);
            content = div.cloneNode(true);
            content.appendChild(textarea);
            placeToAppend.appendChild(content);

            // select
            var items = [],
            select = document.createElement('ha-select'),
            i;

            for (i = 0; i < 4; i++) {
                items[i] = document.createElement('ha-item');
            }

            items[0].label = 'Apple';
            items[0].value = 'Apple';
            items[1].label = 'Banana';
            items[1].value = 'Banana';
            items[2].label = 'Balloon';
            items[2].value = 'Balloon';
            items[3].label = 'Mellon';
            items[3].value = 'Mellon';

            select.items = [items[0], items[1], items[2], items[3]];
            select.label = complexLabel.cloneNode(true);
            content = div.cloneNode(true);
            content.appendChild(select);
            placeToAppend.appendChild(content);

            // checkbox-group
            var checkboxGroup = document.createElement('ha-checkbox-group'),
                checkbox1 = document.createElement('ha-checkbox'),
                checkbox2 = document.createElement('ha-checkbox'),
                checkbox3 = document.createElement('ha-checkbox');
            checkbox1.label = 'Radio 1';
            checkbox1.value = 1;
            checkbox1.disabled = true;
            checkbox2.label = 'Radio 2';
            checkbox2.value = 2;
            checkbox2.checked = true;
            checkbox3.label = 'Radio 3';
            checkbox3.value = 3;
            checkboxGroup.checkboxes = [checkbox1, checkbox2, checkbox3];
            checkboxGroup.selectedItem = "2";
            checkboxGroup.label = complexLabel.cloneNode(true);
            content = div.cloneNode(true);
            content.appendChild(checkboxGroup);
            placeToAppend.appendChild(content);

            // radio-button-group
            var radioButtonGroup = document.createElement('ha-radio-button-group'),
                radioButton1 = document.createElement('ha-radio-button'),
                radioButton2 = document.createElement('ha-radio-button'),
                radioButton3 = document.createElement('ha-radio-button');
            radioButton1.label = 'Radio 1';
            radioButton1.value = 1;
            radioButton1.disabled = true;
            radioButton2.label = 'Radio 2';
            radioButton2.value = 2;
            radioButton2.checked = true;
            radioButton3.label = 'Radio 3';
            radioButton3.value = 3;
            radioButtonGroup.radios = [radioButton1, radioButton2, radioButton3];
            radioButtonGroup.selectedItem = "2";
            radioButtonGroup.label = complexLabel.cloneNode(true);
            content = div.cloneNode(true);
            content.appendChild(radioButtonGroup);
            placeToAppend.appendChild(content);
        }
    };
});