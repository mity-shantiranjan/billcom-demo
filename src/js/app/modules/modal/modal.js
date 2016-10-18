define([
    'hui/modal'
], function() {
    'use strict';

    return {
        createButton: function(text, target, parent) {
            var modalButton = document.createElement('button');

            modalButton.textContent = text;
            modalButton.className = 'ha-button show-modal';

            modalButton.setAttribute('data-modal-id', target);

            modalButton.style.margin = '2px';
            modalButton.style.margin = 'inline-block';
            parent.appendChild(modalButton);
        },

        createFooterButtons: function(buttons) {
            var footerButtons = [];

            [].forEach.call(buttons, function(button) {
                var footerButton = document.createElement('button');

                footerButton.textContent = button;
                footerButton.className = 'ha-button';

                footerButtons.push(footerButton);
            });

            footerButtons[footerButtons.length - 1].classList.add('ha-button-primary');
            return footerButtons;
        },

        createModal: function(id, title, content, buttons, endflow, type, size, dismissible, target) {
            var modal = document.createElement('ha-modal');

            if (id) {
                modal.id = id;
            }

            if (title) {
                modal.titleText = title;
            }

            if (size) {
                modal.size = size;
            }

            if (type) {
                modal.type = type;
            }

            if (dismissible) {
                modal.dismissible = dismissible;
            }

            if (content) {
                modal.message = content;
            }

            if (buttons) {
                modal.buttons = buttons;
            }

            if (endflow) {
                modal.extraInfo = endflow;
            }

            target.appendChild(modal);
        },

        render: function(placeToAppend) {
            var modalButtonsWrapper = document.createElement('div');

            this.createModal(
                'myLargeModal',
                'Payment confirmation',
                this.setLargeContent(),
                this.createFooterButtons(['Skip for now', 'Print Payment Coupon']),
                null,
                'confirm',
                'large',
                false,
                placeToAppend
            );

            this.createModal(
                'myLargeModalEndflow',
                'Bank account added!',
                this.setEndflowLargeContent(),
                this.createFooterButtons(['No thanks', 'Let’s do it']),
                this.setEndflow(),
                'endflow',
                'large',
                false,
                placeToAppend
            );

            this.createModal(
                'myMediumModal-1',
                'Title',
                this.setMediumContent(),
                this.createFooterButtons(['Primary']),
                null,
                null,
                'medium',
                true,
                placeToAppend
            );

            this.createModal(
                'myMediumModal-2',
                'Title',
                this.setMediumContent(),
                this.createFooterButtons(['Secondary', 'Primary']),
                null,
                null,
                'medium',
                true,
                placeToAppend
            );

            this.createModal(
                'myMediumModal-3',
                'Title',
                this.setMediumContent(),
                this.createFooterButtons(['Tertiary', 'Secondary', 'Primary']),
                null,
                null,
                'medium',
                true,
                placeToAppend
            );

            this.createModal(
                'myMediumErrorModal',
                'Title',
                this.setMediumContent(),
                this.createFooterButtons(['Primary']),
                null,
                'error',
                'medium',
                true,
                placeToAppend
            );

            this.createModal(
                'mySmallErrorModal',
                'Your work will be lost if you navigate away from this page!',
                this.setErrorSmallContent(),
                this.createFooterButtons(['Cancel', 'Continue']),
                null,
                'error',
                'small',
                false,
                placeToAppend
            );

            this.createModal(
                'mySmallConfirmModal',
                'Bank account added!',
                this.setConfirmSmallContent(),
                this.createFooterButtons(['No thanks', 'Let’s do it']),
                null,
                'confirm',
                'small',
                false,
                placeToAppend
            );

            this.createModal(
                'mySmallModal',
                'Small Modal Title',
                this.setSmallContent(),
                this.createFooterButtons(['Continue']),
                null,
                null,
                null,
                false,
                placeToAppend
            );

            this.createButton('Show Large Modal', 'myLargeModal', modalButtonsWrapper);
            this.createButton('Show Large Modal With Endflow', 'myLargeModalEndflow', modalButtonsWrapper);
            this.createButton('Show Medium Modal - One Button', 'myMediumModal-1', modalButtonsWrapper);
            this.createButton('Show Medium Modal - Two Button', 'myMediumModal-2', modalButtonsWrapper);
            this.createButton('Show Medium Modal - Three Button', 'myMediumModal-3', modalButtonsWrapper);
            this.createButton('Show Medium Error Modal', 'myMediumErrorModal', modalButtonsWrapper);
            this.createButton('Show Small Error Modal', 'mySmallErrorModal', modalButtonsWrapper);
            this.createButton('Show Small Confirm Modal', 'mySmallConfirmModal', modalButtonsWrapper);
            this.createButton('Show Small Modal', 'mySmallModal', modalButtonsWrapper);

            placeToAppend.appendChild(modalButtonsWrapper);
        },

        setEndflowLargeContent: function() {
            var content = 'Now that we’ve connected to your bank, let’s get your customers into QuickBooks.',
                p = document.createElement('p');
            p.innerHTML = content;
            return p;
        },

        setLargeContent: function() {
            var largeModalContent = document.createElement('p'),
                comment = document.createElement('p'),
                subtitle = document.createElement('h4'),
                components = [],
                content;

            content = '<label>Payment Method: </label> <span>Manual</span> <br>';
            content += '<label>Payment Type: </label> <span>CA SUI/ETT</span> <br>';
            content += '<label>Liability Period: </label> <span>01/01/2013 to 03/31/2013</span> <br>';
            content += '<label>Due Date: </label> <span>04/31/2013</span> <br>';
            content += '<label>Payment Date: </label> <span>04/31/2013</span> <br>';
            content += '<label>Payment Amount: </label> <span>$177.70</span> <br>';

            largeModalContent.innerHTML = content;
            subtitle.innerHTML = 'What’s Next?';
            comment.innerHTML = 'Print they payment coupon and follow the instructions on the form.';

            components.push(largeModalContent);
            components.push(subtitle);
            components.push(comment);

            return components;
        },

        setEndflow: function() {
            var content = [],
                comment = document.createElement('h3'),
                iconComment = document.createElement('i'),
                turnOnComment = document.createElement('span');

            comment.innerHTML = 'What’s Next?';
            iconComment.className = 'hi hi-circle-check';
            turnOnComment.innerHTML = 'Turn on the Assistant';

            content.push(comment);
            content.push(iconComment);
            content.push(turnOnComment);

            return content;
        },

        setMediumContent: function() {
            var text = 'Important! You have not entered tax payments created prior to using our payroll ' +
                        'service. It’s important to reconcile the taxes you have paid with the taxes your' +
                        ' company accrued so that your year-end forms will be correct. Enter ths informat' +
                        'ion now and resolve any discrepancies.',
                content = document.createElement('p');
            content.innerHTML = text;
            return content;
        },

        setErrorSmallContent: function() {
            var text = 'This is a small Error Modal text!',
                content = document.createElement('p');
            content.innerHTML = text;
            return content;
        },

        setConfirmSmallContent: function() {
            var text = 'Now that we’ve connected to your bank, let’s get your customers into QuickBooks',
                content = document.createElement('p');
            content.innerHTML = text;
            return content;
        },

        setSmallContent: function() {
            var text = 'This is a small Modal text!',
                content = document.createElement('p');
            content.innerHTML = text;
            return content;
        }
    };
});
