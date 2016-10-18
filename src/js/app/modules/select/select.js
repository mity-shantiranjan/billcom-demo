define([
    '../util/loremIpsum',
    'hui/core/utils'
], function(loremIpsum, utils) {

    return {
        render: function(el) {
            this.renderDefault(el);
            this.renderWithPlaceholder(el);
            this.renderWithLabel(el);
            this.renderDisabled(el);
            this.renderWithDisabledItem(el);
            this.renderWithValueSelected(el);
            this.renderRequired(el);
            this.renderRequiredNoIndicator(el);
            this.renderWithAddNew(el);
            this.renderWithIcon(el);
            this.renderWithWrappingItems(el);
            this.renderCustomRenderLabels(el);
        },

        renderDefault: function(el) {
            el.appendChild(this.renderHeader('Default'));

            var component = this.createComponent({
            }, 'js-ha-select-default');

            el.appendChild(component);

            return el;
        },

        renderWithPlaceholder: function(el) {
            el.appendChild(this.renderHeader('With Placeholder'));

            var component = this.createComponent({
                placeholder: 'Choose an item'
            }, 'js-ha-select-with-placeholder');

            el.appendChild(component);

            return el;
        },

        renderWithLabel: function(el) {
            el.appendChild(this.renderHeader('With Label'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label'
            }, 'js-ha-select-with-label');

            el.appendChild(component);

            return el;
        },

        renderDisabled: function(el) {
            el.appendChild(this.renderHeader('Disabled'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                disabled: true
            }, 'js-ha-select-disabled');

            el.appendChild(component);

            return el;
        },

        renderWithDisabledItem: function(el) {
            el.appendChild(this.renderHeader('With Disabled Item'));

            var disabledItem = true,
                component = this.createComponent({
                    placeholder: 'Choose an item',
                    label: 'Some Label'
                }, 'js-ha-select-item-disabled', disabledItem);

            el.appendChild(component);

            return el;
        },

        renderWithValueSelected: function(el) {
            el.appendChild(this.renderHeader('With Value Selected'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                value: 'BananaValue'
            }, 'js-ha-select-value-selected');

            el.appendChild(component);

            return el;
        },

        renderRequired: function(el) {
            el.appendChild(this.renderHeader('With Required Validation'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                required: true
            }, 'js-ha-select-required');

            el.appendChild(component);

            return el;
        },

        renderRequiredNoIndicator: function(el) {
            el.appendChild(this.renderHeader('With Required Validation No Indicator'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                required: true,
                noRequiredIndicator: true
            }, 'js-ha-select-no-required-indicator');

            el.appendChild(component);

            return el;
        },

        renderWithAddNew: function(el) {
            el.appendChild(this.renderHeader('With Add New'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                addNew: true,
                addNewPopover: this.createNewPopoverForm()
            }, 'js-ha-select-with-add-new');

            el.appendChild(component);

            return el;
        },

        renderWithIcon: function(el) {
            el.appendChild(this.renderHeader('With Icon'));

            var component = this.createComponent({
                placeholder: 'Choose an item',
                label: 'Some Label',
                icon: 'hi-filter'
            }, 'js-ha-select-with-icons');

            el.appendChild(component);

            return el;
        },

        renderWithWrappingItems: function(el) {
            var select = utils.createElement('ha-select', {
                    items: [
                        'Apple',
                        'Banana',
                        'Balloon',
                        'Mellon',
                        loremIpsum(),
                        loremIpsum()
                    ].map(function(text) {
                        return utils.createElement('ha-item', {
                            label: text,
                            value: text
                        });
                    })
                });

            select.setAttribute("data-automation-id", "js-ha-select-items-wrapping");

            el.appendChild(this.renderHeader('With Wrapping Items'));
            el.appendChild(select);
        },

        renderCustomRenderLabels: function(el) {
            var selectNode = document.createElement('ha-select'),
                item1 = document.createElement('ha-item'),
                item2 = document.createElement('ha-item'),
                item3 = document.createElement('ha-item'),
                imageLabelRenderer;

            selectNode.label = 'Some Label with images';
            selectNode.name = 'bank';
            selectNode.id = 'bank';

            item1.value = 'banco_do_brasil';
            item1.imageLabelUrl = 'images/bank-bb.jpg';
            item1.imageLabelName = ' Banco do Brasil';

            item2.value = 'bradesco';
            item2.imageLabelUrl = 'images/bank-bradesco.jpg';
            item2.imageLabelName = ' Bradesco';

            item3.value = 'caixa';
            item3.imageLabelUrl = 'images/bank-caixa.jpg';
            item3.imageLabelName = ' Caixa';

            imageLabelRenderer = function(itemElement) {
                var imgNode = document.createElement('img'),
                    textNode = document.createTextNode(itemElement.imageLabelName),
                    spanNode = document.createElement('span');

                imgNode.setAttribute('src', itemElement.imageLabelUrl);
                imgNode.setAttribute('alt', itemElement.imageLabelName);
                spanNode.appendChild(imgNode);
                spanNode.appendChild(textNode);

                return spanNode;
            };

            selectNode.itemRenderer = imageLabelRenderer;
            selectNode.selectedItemRenderer = imageLabelRenderer;
            selectNode.items = [item1, item2, item3];
            selectNode.value = 'banco_do_brasil';
            el.appendChild(this.renderHeader('With Custom Render Labels'));
            el.appendChild(selectNode);
        },

        renderHeader: function(label) {
            var h3 = document.createElement('h3');
            h3.textContent = label;
            return h3;
        },

        createComponent: function(selectProperties, dataAutomationId, disabledItem) {
            var items = [],
                select = document.createElement('ha-select'),
                prop,
                i;

            for (i = 0; i < 4; i++) {
                items[i] = document.createElement('ha-item');
            }

            items[0].label = 'Apple';
            items[0].value = 'AppleValue';
            items[1].label = 'Banana';
            items[1].value = 'BananaValue';
            items[2].label = 'Balloon';
            items[2].value = 'BalloonValue';
            items[3].label = 'Mellon';
            items[3].value = 'MellonValue';

            if (disabledItem) {
                items[0].disabled = 'disabled';
            }

            select.items = [items[0], items[1], items[2], items[3]];

            for (prop in selectProperties) {
                if (selectProperties.hasOwnProperty(prop)) {
                    select[prop] = selectProperties[prop];
                }
            }

            select.setAttribute("data-automation-id", dataAutomationId);

            return select;
        },

        createNewPopoverForm: function() {
            var addNewPopover,
                addNewPopoverForm,
                addNewPopoverFooter,
                popoverButtonSave,
                popoverButtonCancel,
                popoverInput;

            addNewPopover = document.createElement('ha-popover');
            addNewPopoverForm = document.createElement('ha-popover-form');
            addNewPopoverFooter = document.createElement('footer');
            popoverButtonSave = document.createElement('button');
            popoverButtonCancel = document.createElement('button');
            popoverInput = document.createElement('ha-text-field');

            popoverButtonSave.className = 'ha-button ha-button-primary';
            popoverButtonSave.innerHTML = 'Save';
            addNewPopoverFooter.appendChild(popoverButtonSave);

            popoverButtonCancel.className = 'ha-button ha-button-secondary';
            popoverButtonCancel.innerHTML = 'Cancel';
            addNewPopoverFooter.appendChild(popoverButtonCancel);

            popoverInput.id = 'addNewName';
            popoverInput.label = 'Name';

            addNewPopoverForm.section = popoverInput;
            addNewPopoverForm.footer = addNewPopoverFooter;
            addNewPopoverForm.addNewNameSelector = '#addNewName';

            addNewPopover.section = addNewPopoverForm;
            return addNewPopover;
        },

        setPopoverFormToElems: function() {
            var i,
                DojoTypeAheads = this.$el.find('#dojo ha-select'),
                el;

            for (i = 0; i < DojoTypeAheads.length; i++) {
                el = DojoTypeAheads[i];
                if (!!el.getAttribute('addNew')) {
                    el.addNew = true;
                    el.addNewPopover = this.createNewPopoverForm();
                }
            }
        }
    };
});
