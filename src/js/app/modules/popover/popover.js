define({
    render: function(el) {
        this.renderDefault(el);
        this.renderWithPageMessage(el);
        this.renderUsingLink(el);
        this.renderSelect(el);
    },

    renderDefault: function(el) {
        var textFieldButtonPopover,
            buttonPopOverTarget,
            butPopover,
            butPopoverForm;

        /**
         *  Button to open popover
         */
        buttonPopOverTarget = document.createElement('button');
        buttonPopOverTarget.className = 'ha-button';
        buttonPopOverTarget.textContent = 'Show Popover';
        buttonPopOverTarget.id = 'buttonPopoverTarget';

        /**
         * Button Popover Content
         */
        butPopover = document.createElement('ha-popover');

        butPopoverForm = document.createElement('ha-popover-form');

        textFieldButtonPopover = document.createElement('ha-text-field');
        textFieldButtonPopover.label = 'Name';
        textFieldButtonPopover.required = true;

        butPopoverForm.section = textFieldButtonPopover;
        butPopoverForm.footer = this.renderFooter(butPopover);

        /**
         * Appending Button and Popover to the DOM
         */
        el.appendChild(this.renderHeader('Show With Popover Form'));
        el.appendChild(buttonPopOverTarget);
        el.appendChild(butPopover);
        butPopover.section = butPopoverForm;

        buttonPopOverTarget.onclick = function() {
            butPopover.show();
        };
    },

    renderFooter: function(popover) {
        var buttonPopoverFooter = document.createElement('div');
        buttonPopoverFooter.appendChild(this.renderCancelButton(popover));
        buttonPopoverFooter.appendChild(this.renderSaveButton(popover));

        return buttonPopoverFooter;
    },

    renderCancelButton: function(popover) {
        var cancelBtnPopOverBtn = document.createElement('button');

        cancelBtnPopOverBtn.className = 'ha-button';
        cancelBtnPopOverBtn.textContent = 'Cancel';

        cancelBtnPopOverBtn.addEventListener('click', function() {
            popover.hide();
        });

        return cancelBtnPopOverBtn;
    },

    renderSaveButton: function(popover) {
        var saveBtnPopOverBtn = document.createElement('button');
        saveBtnPopOverBtn.className = 'ha-button';
        saveBtnPopOverBtn.textContent = 'Save';
        saveBtnPopOverBtn.addEventListener('click', function() {
            window.setTimeout(function() {
                alert('Save finished!');
                popover.hide();
            }, 1000);
        });

        return saveBtnPopOverBtn;
    },

    renderWithPageMessage: function(el) {
        var button = document.createElement('button'),
            popover = document.createElement('ha-popover'),
            popoverForm = document.createElement('ha-popover-form'),
            infoMessage = this.renderInfoMessage();

        button.id = 'buttonTarget';
        button.className = 'ha-button';
        button.textContent = 'Show Popover';
        popoverForm.section = infoMessage;
        popoverForm.footer = this.renderFooter(popover);
        popover.targetSelector = '#' + button.id;
        popover.appendChild(popoverForm);

        button.onclick = function() {
            popover.show();
        };

        el.appendChild(this.renderHeader('Show With Popover Form and Page Message'));
        el.appendChild(button);
        el.appendChild(popover);
    },

    renderInfoMessage: function() {
        var infoMessage = document.createElement('ha-page-message');

        infoMessage.dismissible = true;
        infoMessage.titleText = 'Info Title';
        infoMessage.type = 'info';
        infoMessage.message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.';

        return infoMessage;
    },

    renderUsingLink: function(el) {
        var a = document.createElement('a'),
            popover = document.createElement('ha-popover'),
            popoverForm = document.createElement('ha-popover-form'),
            textField = document.createElement('ha-text-field');

        a.id = 'linkTarget';
        a.textContent = 'Show Popover';
        a.tabIndex = '0';
        a.role = 'button';
        a.onclick = function() {
            popover.show();
        };

        textField.label = 'Name';

        popoverForm.section = textField;
        popoverForm.footer = this.renderFooter(popover);

        popover.targetSelector = '#' + a.id;
        popover.appendChild(popoverForm);

        el.appendChild(this.renderHeader('Show Using Link'));
        el.appendChild(a);
        el.appendChild(popover);
    },

    renderSelect: function(el) {
        var items = [],
            i,
            select = document.createElement('ha-select');
        /**
         * Select element
         */

        for (i = 0; i < 2; i++) {
            items[i] = document.createElement('ha-item');
        }
        items[0].label = 'Select a customer';
        items[0].value = 'SelectACustomer';
        items[1].label = 'Create new customer';
        items[1].value = 'CreateNewCustomer';

        select.label = 'Some Label';
        select.placeholder = 'Select one...';
        select.id = 'selectTarget';

        select.items = [items[0], items[1]];

        // Just for styling gallery
        // select.style.marginRight = '250px';

        el.appendChild(this.renderHeader('Popover In Select'));
        el.appendChild(select);
    },

    renderHeader: function(label) {
        var h3 = document.createElement('h3');
        h3.textContent = label;
        return h3;
    }
});
