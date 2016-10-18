define([
    'hui/video-launcher'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var miniVerticalLink = document.createElement('ha-video-launcher'),
                verticalMiniTitle = document.createElement('h3'),
                miniHorizontalLink = document.createElement('ha-video-launcher'),
                horizontalMiniTitle = document.createElement('h3'),
                giantLinksTitle = document.createElement('h3'),
                giantLink = document.createElement('ha-video-launcher'),
                giantLinkWithoutDescriptionTitle = document.createElement('h4'),
                giantLinkWithDescription = document.createElement('ha-video-launcher'),
                giantLinkWithDescriptionTitle = document.createElement('h4'),
                gridLinksTitle = document.createElement('h3');

            miniVerticalLink.url = miniHorizontalLink.url = giantLink.url = giantLinkWithDescription.url = 'https://www.youtube.com/embed/48QBRQdyRmU';
            verticalMiniTitle.textContent = 'Vertical Mini Link';
            miniVerticalLink.orientation = 'vertical';
            placeToAppend.appendChild(verticalMiniTitle);
            placeToAppend.appendChild(miniVerticalLink);

            miniHorizontalLink.orientation = 'horizontal';
            horizontalMiniTitle.textContent = 'Horizontal Mini Link';
            placeToAppend.appendChild(horizontalMiniTitle);
            placeToAppend.appendChild(miniHorizontalLink);

            giantLinksTitle.textContent = 'Giant Link';
            giantLinkWithDescriptionTitle.textContent = 'With Description';
            giantLinkWithoutDescriptionTitle.textContent = 'Without Description';
            giantLink.size = giantLinkWithDescription.size = 'giant';
            giantLinkWithDescription.showDescription = true;
            giantLinkWithDescription.description = 'This video is about navigating QuickBooks.' +
                'It describes how to find commonly used features.';
            placeToAppend.appendChild(giantLinksTitle);
            placeToAppend.appendChild(giantLinkWithoutDescriptionTitle);
            placeToAppend.appendChild(giantLink);
            placeToAppend.appendChild(giantLinkWithDescriptionTitle);
            placeToAppend.appendChild(giantLinkWithDescription);

            gridLinksTitle.textContent = 'Grid of Links';
            placeToAppend.appendChild(gridLinksTitle);
            [
                'https://www.youtube.com/embed/48QBRQdyRmU',
                'https://www.youtube.com/embed/lp3snRxFt6Q',
                'https://www.youtube.com/embed/48QBRQdyRmU',
                'https://www.youtube.com/embed/lp3snRxFt6Q',
                'https://www.youtube.com/embed/48QBRQdyRmU',
                'https://www.youtube.com/embed/lp3snRxFt6Q'
            ].forEach(function(url, i) {
                var gridLink = document.createElement('ha-video-launcher');
                gridLink.size = 'large';
                gridLink.url = url;
                if (i === 2) {
                    gridLink.useYoutubeDescription = true;
                } else {
                    gridLink.description = 'A sample description';
                }
                placeToAppend.appendChild(gridLink);
            });
        }
    };
});
