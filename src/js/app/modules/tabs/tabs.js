define({
    createTabContent: function(index) {
        var content = '<h4>Tab Content ' + index + '</h4>' +
                    '<div class="form-control">' +
                        '<ha-text-field label="name"></ha-text-field>' +
                    '</div>' +
                    '<div class="form-control">' +
                        '<ha-text-field label="lastname"></ha-text-field>' +
                    '</div>' +
                    '<div class="form-control">' +
                        '<ha-text-field label="email"></ha-text-field>' +
                    '</div>' +
                    '<div>' +
                        '<button>Save</button>' +
                    '</div>';
        return content;
    },

    render: function(el) {
        this.renderDefault(el);
        this.renderWithIcons(el);
        this.renderWithBadges(el);
        this.renderWithoutButtonOnMobile(el);
    },

    renderDefault: function(el) {
        var haTabs = document.createElement('ha-tabs'),
            tab1 = document.createElement('ha-tab'),
            tab2 = document.createElement('ha-tab'),
            tab3 = document.createElement('ha-tab'),
            title = document.createElement('h3'),
            title2 = document.createElement('h3'),
            dynamicTabContent = document.createElement('div'),
            dynamicTabContent2 = document.createElement('div'),
            dynamicTabContent3 = document.createElement('div');

        title.classList.add('subtitle');
        title2.classList.add('subtitle');

        tab1.titleText = 'Adjustments';
        tab2.titleText = 'Mappings';
        tab3.titleText = 'Send To Taxes';

        dynamicTabContent.innerHTML = this.createTabContent(tab1.titleText);
        tab1.section = dynamicTabContent;
        dynamicTabContent2.innerHTML = this.createTabContent(tab2.titleText);
        tab2.section = dynamicTabContent2;
        dynamicTabContent3.innerHTML = this.createTabContent(tab3.titleText);
        tab3.section = dynamicTabContent3;

        title.innerHTML = 'Horizontal Tab';

        haTabs.tabs = [tab1, tab2, tab3];
        haTabs.selectedIndex = 0;

        el.appendChild(title);
        el.appendChild(haTabs);
    },

    renderWithIcons: function(el) {
        var haTabsIcons = document.createElement('ha-tabs'),
            tab4 = document.createElement('ha-tab'),
            tab5 = document.createElement('ha-tab'),
            tab6 = document.createElement('ha-tab'),
            title2 = document.createElement('h3'),
            dynamicTabContent4 = document.createElement('div'),
            dynamicTabContent5 = document.createElement('div'),
            dynamicTabContent6 = document.createElement('div');

        tab4.titleText = 'Adjustments';
        tab5.titleText = 'Mappings';
        tab6.titleText = 'Send To Taxes';

        dynamicTabContent4.innerHTML = this.createTabContent(tab4.titleText);
        tab4.section = dynamicTabContent4;
        dynamicTabContent5.innerHTML = this.createTabContent(tab5.titleText);
        tab5.section = dynamicTabContent5;
        dynamicTabContent6.innerHTML = this.createTabContent(tab6.titleText);
        tab6.section = dynamicTabContent6;

        title2.innerHTML = 'Horizontal Tab With Icons';

        tab4.icon = 'hi-settings-o';
        tab5.icon = 'hi-duplicate';
        tab6.icon = 'hi-reconcile';

        haTabsIcons.tabs = [tab4, tab5, tab6];
        haTabsIcons.selectedIndex = 0;

        el.appendChild(title2);
        el.appendChild(haTabsIcons);
    },

    renderWithBadges: function(el) {
        var haTabs = document.createElement('ha-tabs'),
            tab1 = document.createElement('ha-tab'),
            tab2 = document.createElement('ha-tab'),
            tab3 = document.createElement('ha-tab'),
            title = document.createElement('h3'),
            title2 = document.createElement('h3'),
            dynamicTabContent = document.createElement('div'),
            dynamicTabContent2 = document.createElement('div'),
            dynamicTabContent3 = document.createElement('div');

        title.classList.add('subtitle');
        title2.classList.add('subtitle');

        tab1.titleText = 'Messages';
        tab2.titleText = 'Invoices';
        tab3.titleText = 'Status';

        dynamicTabContent.innerHTML = this.createTabContent(tab1.titleText);
        tab1.section = dynamicTabContent;
        tab1.badgeClass = 'ha-numeric-badge';
        tab1.badgeText = '1337';

        dynamicTabContent2.innerHTML = this.createTabContent(tab2.titleText);
        tab2.section = dynamicTabContent2;
        tab2.badgeClass = 'ha-numeric-badge ha-inverse';
        tab2.badgeText = '42';

        dynamicTabContent3.innerHTML = this.createTabContent(tab3.titleText);
        tab3.section = dynamicTabContent3;
        tab3.badgeClass = 'ha-text-badge ha-warn';
        tab3.badgeText = 'Overdue';

        title.innerHTML = 'Horizontal Tab';

        haTabs.tabs = [tab1, tab2, tab3];
        haTabs.selectedIndex = 0;

        el.appendChild(title);
        el.appendChild(haTabs);
    },

    renderWithoutButtonOnMobile: function(el) {
        var haTabs = document.createElement('ha-tabs'),
            tab1 = document.createElement('ha-tab'),
            tab2 = document.createElement('ha-tab'),
            tab3 = document.createElement('ha-tab'),
            title = document.createElement('h3'),
            title2 = document.createElement('h3'),
            dynamicTabContent = document.createElement('div'),
            dynamicTabContent2 = document.createElement('div'),
            dynamicTabContent3 = document.createElement('div');

        // set button on mobile
        haTabs.useTabButton = false;

        title.classList.add('subtitle');
        title2.classList.add('subtitle');

        tab1.titleText = 'Adjustments';
        tab2.titleText = 'Mappings';
        tab3.titleText = 'Send To Taxes';

        dynamicTabContent.innerHTML = this.createTabContent(tab1.titleText);
        tab1.section = dynamicTabContent;
        dynamicTabContent2.innerHTML = this.createTabContent(tab2.titleText);
        tab2.section = dynamicTabContent2;
        dynamicTabContent3.innerHTML = this.createTabContent(tab3.titleText);
        tab3.section = dynamicTabContent3;

        title.innerHTML = 'Horizontal Tab';

        haTabs.tabs = [tab1, tab2, tab3];
        haTabs.selectedIndex = 0;

        el.appendChild(title);
        el.appendChild(haTabs);
    }
});
