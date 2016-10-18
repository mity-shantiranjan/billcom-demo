define({
    createContent: function() {
        var content;

        content =
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';
        content +=
            '<div><ha-text-field label="Insert content"></ha-text-field></div>';

        return content;
    },

    render: function(el) {
        this.renderDefault(el);
        this.renderComprehensive(el);
    },

    renderDefault: function(el) {
        var trowser = document.createElement('ha-trowser'),
            mainNode = document.createElement('div'),
            buttonOpenTrowser = document.createElement('button'),
            secondaryButton = document.createElement('button'),
            primaryButton = document.createElement('button');

        buttonOpenTrowser.className = 'ha-button';
        buttonOpenTrowser.textContent = 'Open Trowser';
        buttonOpenTrowser.id = 'buttonPopoverTarget';
        buttonOpenTrowser.addEventListener('click', function() {
            trowser.show();
        });

        el.appendChild(buttonOpenTrowser);

        primaryButton.className = 'ha-button ha-button-primary';
        primaryButton.textContent = 'Primary Button';
        primaryButton.setAttribute('action', 'primary');

        secondaryButton.className = 'ha-button ha-button-dark';
        secondaryButton.textContent = 'Secondary Button';
        secondaryButton.setAttribute('action', 'secondary');

        trowser.titleText = 'Welcome to QuickBooks!';
        trowser.infoText = 'optional header info';

        // default false
        trowser.history = true;
        // default false
        trowser.settings = true;

        // assume the following components are pre-created, make sure the `action`
        // property is set
        trowser.footerItems = [secondaryButton, primaryButton];

        // your main node, append your content here;
        mainNode.innerHTML = this.createContent();

        trowser.section = mainNode;

        el.appendChild(trowser);

        return el;
    },

    renderComprehensive: function(el) {
        return el;
    }
});
