define({
    _createMessages: function(config) {
        var node = document.createElement('ha-page-message');
        node.titleText = config.title;
        if ('undefined' !== typeof config.dismissible) {
            node.dismissible = config.dismissible;
        }
        if ('undefined' !== typeof config.type) {
            node.type = config.type;
        }

        if ('undefined' !== typeof config.message) {
            node.message = config.message;
        }

        return node;
    },

    _loremIpsum: function() {
        return ['Lorem ipsum dolor sit amet, consectetur ',
            'adipiscing elit, sed do eiusmod tempor ',
            'incididunt ut labore et dolore magna aliqua.',
            'Lorem ipsum dolor sit amet, consectetur ',
            'adipiscing elit, sed do eiusmod tempor ',
            'incididunt ut labore et dolore magna aliqua.',
            'Lorem ipsum dolor sit amet, consectetur ',
            'adipiscing elit, sed do eiusmod tempor ',
            'incididunt ut labore et dolore magna aliqua.'].join('');
    },

    render: function(el) {
        var node = document.createElement('ha-stacked-page-messages'),
            newMessages = [],
            confMsgFirst = {},
            confMsgSecond = {},
            confMsgThird = {},
            message1,
            message2,
            message3;

        confMsgFirst.title = 'Info Title';
        confMsgFirst.type = 'error';
        confMsgFirst.dismissible = false;
        confMsgFirst.message = this._loremIpsum();

        confMsgSecond.title = 'Info Title';
        confMsgSecond.type = 'warn';
        confMsgSecond.dismissible = true;
        confMsgSecond.message = this._loremIpsum();

        confMsgThird.title = 'Info Title';
        confMsgThird.type = 'info';
        confMsgThird.dismissible = true;
        confMsgThird.message = this._loremIpsum();

        message1 = this._createMessages(confMsgFirst);
        message2 = this._createMessages(confMsgSecond);
        message3 = this._createMessages(confMsgThird);
        newMessages.push(message1);
        newMessages.push(message2);
        newMessages.push(message3);
        node.messages = newMessages;
        el.appendChild(node);
    }
});
