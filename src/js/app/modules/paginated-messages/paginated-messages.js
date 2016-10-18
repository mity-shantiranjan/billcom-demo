define({
    render: function(el) {
        this.renderErrorMessages(el);
        this.renderWarningMessages(el);
        this.renderInfoMessages(el);
    },

    renderErrorMessages: function(el) {
        this.renderMessages(el, {
            dismissible: false,
            type: 'error'
        });
    },

    renderWarningMessages: function(el) {
        this.renderMessages(el, {
            dismissible: true,
            type: 'warn'
        });
    },

    renderInfoMessages: function(el) {
        this.renderMessages(el, {
            type: 'info'
        });
    },

    renderMessages: function(el, opts) {
        var messagesComponent = document.createElement('ha-paginated-messages'),
            messages = [],
            contents = [
                {
                    title: 'Your trial expires in 7 days!',
                    message: 'Feel free to keep testing QuickBooks. <a href=\'#\'>Subscribe now and save 20%</a>'
                },
                {
                    title: 'Your sesion is about to expire!',
                    message: 'Please refresh the page'
                },
                {
                    title: 'This is an alert',
                    message: 'This is an alert message'
                }
            ],
            options = opts || {};

        contents.forEach(function(content) {
            var message = document.createElement('ha-paginated-message');
            message.titleText = content.title;
            message.message = content.message;
            message.type = options.type;

            messages.push(message);
        });

        messagesComponent.messages = messages;

        if (options.dismissible !== null && options.dismissible !== undefined) {
            messagesComponent.dismissible = options.dismissible;
        }

        el.appendChild(messagesComponent);
    }
});
