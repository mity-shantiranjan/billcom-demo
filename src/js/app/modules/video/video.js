define([
    'hui/video'
], function() {
    'use strict';

    return {
        render: function(placeToAppend) {
            var video = document.createElement('ha-video'),
                videoWithHistory = document.createElement('ha-video'),
                videoWithOverlay = document.createElement('ha-video'),
                overlayButton = document.createElement('ha-video-overlay-button'),
                videoButton = document.createElement('button'),
                historyVideoButton = document.createElement('button'),
                overlayVideoButton = document.createElement('button'),
                title = document.createElement('h3'),
                title2 = document.createElement('h3'),
                title3 = document.createElement('h3');

            title.textContent = 'Basic video, opened with a button';
            title2.textContent = 'Video with history';
            title3.textContent = 'Video with overlay';

            videoButton.classList.add('ha-button');
            videoButton.classList.add('ha-button-primary');
            videoButton.textContent = 'Click to view';
            videoButton.onclick = function() {
                video.show();
            };

            historyVideoButton.classList.add('ha-button');
            historyVideoButton.classList.add('ha-button-primary');
            historyVideoButton.textContent = 'Click to view';
            historyVideoButton.onclick = function() {
                videoWithHistory.show();
            };

            overlayVideoButton.classList.add('ha-button');
            overlayVideoButton.classList.add('ha-button-primary');
            overlayVideoButton.textContent = 'Click to view';
            overlayVideoButton.onclick = function() {
                videoWithOverlay.show();
            };

            overlayButton.type = 'primary';
            overlayButton.textContent = 'Button';
            overlayButton.label = 'Call to action';

            videoWithOverlay.url = 'https://www.youtube.com/embed/48QBRQdyRmU';
            videoWithOverlay.section = overlayButton;

            video.url = 'https://www.youtube.com/embed/48QBRQdyRmU';

            videoWithHistory.url = 'https://www.youtube.com/embed/4by7kleQbmE';
            videoWithHistory.userId = videoWithOverlay.userId = 'harmony-gallery-test-user';
            videoWithHistory.enableHistoryView = true;

            placeToAppend.appendChild(title);
            placeToAppend.appendChild(videoButton);
            placeToAppend.appendChild(video);

            placeToAppend.appendChild(title2);
            placeToAppend.appendChild(historyVideoButton);
            placeToAppend.appendChild(videoWithHistory);

            placeToAppend.appendChild(title3);
            placeToAppend.appendChild(overlayVideoButton);
            placeToAppend.appendChild(videoWithOverlay);
        }
    };
});
