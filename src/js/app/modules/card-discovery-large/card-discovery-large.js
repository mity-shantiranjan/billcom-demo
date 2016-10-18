define({

    render: function(placeToAppend) {
        var defaultHiddenNoFooterCardHeader,
            defaultHiddenNoFooterCard,
            defaultHiddenNoFooterCardButton,
            withOneButtonCardHeader,
            withOneButtonCard,
            withOneButtonCardButton,
            withTwoButtonsCardHeader,
            withTwoButtonsCard,
            withTwoButtonsCardButton,
            withThreeButtonsCardHeader,
            withThreeButtonsCard,
            withThreeButtonsCardButton,
            withCustomizedFooterCardHeader,
            footerExampleDiv,
            aTag,
            withCustomizedFooterCard,
            withCustomizedFooterCardButton,
            withImageInSectionCardHeader,
            withImageInSectionCard,
            withImageInSectionCardButton,
            showImmediatelyCardHeader,
            showImmediatelyCard,
            showImmediatelyCardButton;

        //Default Hidden (No Footer)
        defaultHiddenNoFooterCardHeader = document.createElement('h3');
        defaultHiddenNoFooterCardHeader.innerHTML = 'Default Hidden (No Footer)';
        defaultHiddenNoFooterCard = this.createCard({
            titleText: 'Card discovery large default',
            dismissible: true,
            section: 'Some content for testing'
        });
        defaultHiddenNoFooterCardButton = this.createButton('Show');
        defaultHiddenNoFooterCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(defaultHiddenNoFooterCardHeader);
        placeToAppend.appendChild(defaultHiddenNoFooterCard);
        placeToAppend.appendChild(defaultHiddenNoFooterCardButton);

        //With One Button
        withOneButtonCardHeader = document.createElement('h3');
        withOneButtonCardHeader.innerHTML = 'With One Button';
        withOneButtonCard = this.createCard({
            titleText: 'Card discovery large with 1 button',
            dismissible: true,
            section: 'Some content for testing',
            footer: this.createFooterButtons(['Primary button'])
        });
        withOneButtonCardButton = this.createButton('Show');
        withOneButtonCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(withOneButtonCardHeader);
        placeToAppend.appendChild(withOneButtonCard);
        placeToAppend.appendChild(withOneButtonCardButton);

        //With Two Buttons
        withTwoButtonsCardHeader = document.createElement('h3');
        withTwoButtonsCardHeader.innerHTML = 'With Two Buttons';
        withTwoButtonsCard = this.createCard({
            titleText: 'Card discovery large with 2 buttons',
            dismissible: true,
            section: 'Some content for testing',
            footer: this.createFooterButtons(['Secondary button', 'Primary button'])
        });
        withTwoButtonsCardButton = this.createButton('Show');
        withTwoButtonsCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(withTwoButtonsCardHeader);
        placeToAppend.appendChild(withTwoButtonsCard);
        placeToAppend.appendChild(withTwoButtonsCardButton);

        //With Three Buttons
        withThreeButtonsCardHeader = document.createElement('h3');
        withThreeButtonsCardHeader.innerHTML = 'With Three Buttons';
        withThreeButtonsCard = this.createCard({
            titleText: 'Card discovery large with 3 buttons',
            dismissible: true,
            section: 'Some content for testing',
            footer: this.createFooterButtons(['Tertiary button', 'Secondary button', 'Primary button'])
        });
        withThreeButtonsCardButton = this.createButton('Show');
        withThreeButtonsCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(withThreeButtonsCardHeader);
        placeToAppend.appendChild(withThreeButtonsCard);
        placeToAppend.appendChild(withThreeButtonsCardButton);

        //With Customized Footer
        withCustomizedFooterCardHeader = document.createElement('h3');
        withCustomizedFooterCardHeader.innerHTML = 'With Customized Footer';
        footerExampleDiv = document.createElement('div');
        footerExampleDiv.setAttribute('style', 'padding-top:20px; text-align: center');
        footerExampleDiv.innerHTML = 'Already have an accountant ? ';

        aTag = document.createElement('a');
        aTag.setAttribute('href', '');
        aTag.innerHTML = 'Invite them here';

        footerExampleDiv.appendChild(aTag);
        withCustomizedFooterCard = this.createCard({
            titleText: 'Get set up right with help from an expert',
            dismissible: true,
            section: this.setSectionWithTextField(),
            footer: footerExampleDiv
        });
        withCustomizedFooterCardButton = this.createButton('Show');
        withCustomizedFooterCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(withCustomizedFooterCardHeader);
        placeToAppend.appendChild(withCustomizedFooterCard);
        placeToAppend.appendChild(withCustomizedFooterCardButton);

        //With Image in Section
        withImageInSectionCardHeader = document.createElement('h3');
        withImageInSectionCardHeader.innerHTML = 'With Image in Section';
        withImageInSectionCard = this.createCard({
            titleText: 'Card discovery large with image in section',
            dismissible: true,
            section: this.setSectionWithImages(),
            footer: this.createFooterButtons(['Primary button'])
        });
        withImageInSectionCardButton = this.createButton('Show');
        withImageInSectionCardButton.onclick = this.showCardOnClick;
        placeToAppend.appendChild(withImageInSectionCardHeader);
        placeToAppend.appendChild(withImageInSectionCard);
        placeToAppend.appendChild(withImageInSectionCardButton);

        //Show immediately (open=true)
        showImmediatelyCardHeader = document.createElement('h3');
        showImmediatelyCardHeader.innerHTML = 'Show immediately (open=true)';
        showImmediatelyCard = this.createCard({
            titleText: 'Card discovery large with open=true',
            dismissible: true,
            open: true,
            section: 'Some content for testing',
            footer: this.createFooterButtons(['Tertiary button', 'Secondary button', 'Primary button'])
        });
        showImmediatelyCardButton = this.createButton('Toggle');
        showImmediatelyCardButton.onclick = function() {
            if (this.previousElementSibling.open) {
                this.previousElementSibling.close();
            } else {
                this.previousElementSibling.show();
            }
        };
        placeToAppend.appendChild(showImmediatelyCardHeader);
        placeToAppend.appendChild(showImmediatelyCard);
        placeToAppend.appendChild(showImmediatelyCardButton);
    },

    showCardOnClick: function() {
        var card = this.previousElementSibling;

        if (!card.open) {
            card.show();
            card.addEventListener('close', function close() {
                this.focus();
                card.removeEventListener('close', close);
            }.bind(this));
        }
    },

    createFooterButtons: function(buttons) {
        var footerButtons = document.createElement('ha-footer-buttons'),
            footerButtonsSize = buttons.length;

        [].forEach.call(buttons, function(button) {
            var footerButton = document.createElement('button');

            footerButton.textContent = button;
            footerButton.className = 'ha-button';
            if (footerButtonsSize === 1) {
                footerButton.classList.add('ha-button-primary');
            }
            footerButtons.appendChild(footerButton);
            footerButtonsSize--;
        });

        return footerButtons;
    },

    createCard: function(options) {
        var card = document.createElement('ha-card-discovery-large');
        if (options.id) {
            card.id = options.id;
        }
        if (options.titleText) {
            card.titleText = options.titleText;
        }
        if (options.dismissible) {
            card.dismissible = options.dismissible;
        }
        if (options.open) {
            card.open = options.open;
        }
        if (options.section) {
            card.section = options.section;
        }
        if (options.footer) {
            card.footer = options.footer;
        }
        return card;
    },

    createButton: function(text) {
        var cardButton = document.createElement('button');
        cardButton.textContent = text;
        cardButton.className = 'ha-button';
        return cardButton;
    },

    setSectionWithImages: function() {
        var cardSubItemOne = document.createElement('div'),
            cardSubItemTwo = document.createElement('div'),
            cardSubItemThree = document.createElement('div'),
            cardImageOne = document.createElement('div'),
            cardImageTwo = document.createElement('div'),
            cardImageThree = document.createElement('div'),
            cardImageDescriptionOne = document.createElement('div'),
            cardImageDescriptionTwo = document.createElement('div'),
            cardImageDescriptionThree = document.createElement('div'),
            section = [];
        cardSubItemOne.className = 'card-sub-item';
        cardImageOne.className = 'card-image qbo-certification';
        cardImageDescriptionOne.className = 'card-image-description';
        cardImageDescriptionOne.innerHTML = 'Strengthen your skills to <br/> become a QuickBooks expert.';
        cardSubItemOne.appendChild(cardImageOne);
        cardSubItemOne.appendChild(cardImageDescriptionOne);
        section.push(cardSubItemOne);

        cardSubItemTwo.className = 'card-sub-item';
        cardImageTwo.className = 'card-image fap-directory';
        cardImageDescriptionTwo.className = 'card-image-description';
        cardImageDescriptionTwo.innerHTML = 'Showcase your practices to over <br/> 1 million businesses.';
        cardSubItemTwo.appendChild(cardImageTwo);
        cardSubItemTwo.appendChild(cardImageDescriptionTwo);
        section.push(cardSubItemTwo);

        cardSubItemThree.className = 'card-sub-item';
        cardImageThree.className = 'card-image customer-support';
        cardImageDescriptionThree.className = 'card-image-description';
        cardImageDescriptionThree.innerHTML = 'Connect quickly with our VIP <br/> support specialists.';
        cardSubItemThree.appendChild(cardImageThree);
        cardSubItemThree.appendChild(cardImageDescriptionThree);
        section.push(cardSubItemThree);
        return section;
    },

    setSectionWithTextField: function() {
        var p = document.createElement('p'),
            aTag = document.createElement('a'),
            haTextField = document.createElement('ha-text-field'),
            button = document.createElement('button'),
            section = [];
        button.className = 'ha-button ha-button-primary';
        button.innerHTML = 'Call me now!';

        p.innerHTML = 'Ready for your free 1-hour session ? ';
        aTag.setAttribute('href', '');
        aTag.innerHTML = 'Learn more';
        p.appendChild(aTag);

        section.push(p);
        section.push(haTextField);
        section.push(button);
        return section;
    }
});
