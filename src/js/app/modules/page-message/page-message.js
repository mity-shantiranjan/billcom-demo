define([
    'hui/page-message'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var alertMessage = document.createElement('ha-page-message'),
                warnMessage = document.createElement('ha-page-message'),
                infoMessage = document.createElement('ha-page-message'),
                discoveryMessage = document.createElement('ha-page-message'),
                withoutTitle = document.createElement('ha-page-message'),
                messageWithHtmlWithoutTitle = document.createElement('ha-page-message'),
                messageWithHtmlWithTitle = document.createElement('ha-page-message');

            alertMessage.dismissible = false;
            alertMessage.titleText = 'Alert Title';
            alertMessage.type = 'error';
            alertMessage.message = 'Lorem ipsum dolor sit amet...';

            warnMessage.dismissible = true;
            warnMessage.titleText = 'Warn Title';
            warnMessage.type = 'warn';
            warnMessage.message = 'Lorem ipsum dolor sit amet...';

            infoMessage.dismissible = true;
            infoMessage.titleText = 'Info Title';
            infoMessage.type = 'info';
            infoMessage.message = 'Lorem ipsum dolor sit amet...';

            discoveryMessage.dismissible = true;
            discoveryMessage.titleText = 'Discovery Title';
            discoveryMessage.type = 'discovery';
            discoveryMessage.message = 'Lorem ipsum dolor sit amet...';

            withoutTitle.dismissible = true;
            withoutTitle.type = 'info';
            withoutTitle.message = 'No titleText. Lorem ipsum dolor sit amet...';

            messageWithHtmlWithoutTitle.dismissible = true;
            messageWithHtmlWithoutTitle.type = 'info';
            messageWithHtmlWithoutTitle.message = 'Using html inside the message with <a>links</a> no titleText';

            messageWithHtmlWithTitle.dismissible = true;
            messageWithHtmlWithTitle.type = 'info';
            messageWithHtmlWithTitle.titleText = 'With Title';
            messageWithHtmlWithTitle.message = 'Using html inside the message with <a>links</a> with titleText';

            placeToAppend.appendChild(alertMessage);
            placeToAppend.appendChild(warnMessage);
            placeToAppend.appendChild(infoMessage);
            placeToAppend.appendChild(discoveryMessage);
            placeToAppend.appendChild(withoutTitle);
            placeToAppend.appendChild(messageWithHtmlWithoutTitle);
            placeToAppend.appendChild(messageWithHtmlWithTitle);
        }
    };
});
