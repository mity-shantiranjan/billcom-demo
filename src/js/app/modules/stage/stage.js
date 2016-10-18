define({
    createStage: function(hasHeader, hasBackLink, hasSubtitle, hasSection, collapsible) {

        function createMoneyBar() {
            var moneyBar = document.createElement('ha-money-bar'),
                moneyBarSegment1 = document.createElement('ha-money-bar-segment'),
                moneyBarSegment2 = document.createElement('ha-money-bar-segment'),
                moneyBarSegment3 = document.createElement('ha-money-bar-segment'),
                moneyBarCell1 = document.createElement('ha-money-bar-cell'),
                moneyBarCell2 = document.createElement('ha-money-bar-cell'),
                moneyBarCell3 = document.createElement('ha-money-bar-cell'),
                moneyBarCell4 = document.createElement('ha-money-bar-cell'),
                moneyBarCell5 = document.createElement('ha-money-bar-cell');

            moneyBarCell1.primaryText = '$50.00';
            moneyBarCell1.secondaryText = '2 ESTIMATES';
            moneyBarCell1.classList.add('mbDarkBlue');

            moneyBarCell2.primaryText = '$500.00';
            moneyBarCell2.secondaryText = '20 UNBILLED ACTIVITY';
            moneyBarCell2.classList.add('mbLightBlue');

            moneyBarCell3.primaryText = '$100.00';
            moneyBarCell3.secondaryText = '40 OPEN INVOICES';
            moneyBarCell3.classList.add('mbOrange');
            moneyBarCell3.classList.add('outlay');

            moneyBarCell4.primaryText = '$500.00';
            moneyBarCell4.secondaryText = '2 OVERDUE INVOICES';
            moneyBarCell4.classList.add('mbRed');
            moneyBarCell4.classList.add('inlay');

            moneyBarCell5.primaryText = '$150.00';
            moneyBarCell5.secondaryText = '2 PAID LAST 30 DAYS';
            moneyBarCell5.classList.add('mbGreen');
            moneyBarSegment1.titleTextBold = '22';
            moneyBarSegment1.titleText = 'Unbilled';
            moneyBarSegment1.cells = [moneyBarCell1, moneyBarCell2];
            moneyBarSegment2.titleTextBold = '42';
            moneyBarSegment2.titleText = 'Unpaid';
            moneyBarSegment2.cells = [moneyBarCell3, moneyBarCell4];
            moneyBarSegment3.titleTextBold = '2';
            moneyBarSegment3.titleText = 'Paid';
            moneyBarSegment3.cells = [moneyBarCell5];
            moneyBarSegment3.size = '1';

            moneyBar.segments = [moneyBarSegment1, moneyBarSegment2, moneyBarSegment3];

            return moneyBar;
        }

        var stage = document.createElement('ha-stage'),
            headerLeftSpan,
            headerRightSpan,
            titleH2,
            titleH3,
            menuButton,
            menuItem1,
            menuItem2,
            menuItem3,
            buttonBack,
            buttonBackLink,
            moneyBar;

        if (hasHeader) {

            headerLeftSpan = document.createElement('span');
            headerLeftSpan.classList.add('header-left');

            if (hasBackLink) {
                buttonBack = document.createElement('div');
                buttonBack.classList.add('ha-back-links');

                buttonBackLink = document.createElement('a');
                buttonBackLink.innerHTML = ' Back to employee list';
                buttonBackLink.setAttribute('href', '#');

                buttonBack.appendChild(buttonBackLink);

                headerLeftSpan.appendChild(buttonBack);
            }

            titleH2 = document.createElement('h2');
            titleH2.innerHTML = 'Employees';
            headerLeftSpan.appendChild(titleH2);

            if (hasSubtitle) {
                titleH3 = document.createElement('h3');
                titleH3.innerHTML = 'Profit and less';
                headerLeftSpan.appendChild(titleH3);
            }

            headerRightSpan = document.createElement('span');
            headerRightSpan.classList.add('header-right');

            menuButton = document.createElement('ha-menu-button');
            menuItem1 = document.createElement('ha-item');
            menuItem2 = document.createElement('ha-item');
            menuItem3 = document.createElement('ha-item');

            menuItem1.label = 'Apple';
            menuItem1.value = 'Apple';
            menuItem2.label = 'Banana';
            menuItem2.value = 'Banana';
            menuItem3.label = 'Cherry';
            menuItem3.value = 'Cherry';

            menuButton.classList.add('ha-button-primary');
            menuButton.label = 'Create New';
            menuButton.items = [menuItem1, menuItem2, menuItem3];

            headerRightSpan.appendChild(menuButton);

            stage.header = [headerLeftSpan, headerRightSpan];

        }

        if (hasSection) {
            moneyBar = createMoneyBar();
            stage.section = [moneyBar];
        }

        stage.collapsible = !!collapsible;

        return stage;
    },

    render: function(el) {
        this.renderCollapsibleLinkNav(el);
        this.renderCollapsible(el);
        this.renderDefault(el);
    },

    renderCollapsibleLinkNav: function(el) {
        var stage,
            title;

        title = document.createElement('h3');
        title.classList.add('subtitle');
        title.innerHTML = 'Collapsible Stage Component with Link navigation';
        el.appendChild(title);

        stage = this.createStage(true, true, false, true, true);
        el.appendChild(stage);
    },

    renderCollapsible: function(el) {
        var stage,
            title;

        title = document.createElement('h3');
        title.classList.add('subtitle');
        title.innerHTML = 'Collapsible Stage Component';
        el.appendChild(title);

        stage = this.createStage(true, false, true, true, true);
        el.appendChild(stage);
    },

    renderDefault: function(el) {
        var stage,
            title;

        title = document.createElement('h3');
        title.classList.add('subtitle');
        title.innerHTML = 'Non Collapsable Stage Component (Default)';
        el.appendChild(title);

        stage = this.createStage(true, false, true, true, false);
        el.appendChild(stage);
    }
});
