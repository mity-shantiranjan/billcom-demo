define({
    render: function(el) {
        var buttons = [],
            segmentedContentData = [
                {
                    label: 'Credit / Debit',
                    selected: true,
                    value: 1
                },
                {
                    label: 'Cash',
                    value: 77
                },
                {
                    label: 'Check',
                    value: 8
                }
            ],
            segmentedButton = document.createElement('ha-segmented-button'),
            segmentedWrapper = document.createElement('div'),
            segmentedOption;

        segmentedButton.groupName = 'myGroup';

        segmentedContentData.forEach(function(data) {
            segmentedOption = document.createElement('button');
            segmentedOption.textContent = data.label;
            segmentedOption.title = data.label;
            segmentedOption.selected = data.selected;
            segmentedOption.value = data.value;
            buttons.push(segmentedOption);
        });

        segmentedButton.buttons = buttons;

        segmentedWrapper.appendChild(segmentedButton);

        el.appendChild(segmentedWrapper);
    }
});
