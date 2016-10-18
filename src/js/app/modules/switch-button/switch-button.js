define({
    render: function(el) {
        var switchbutton = document.createElement('ha-switch-button'),
            switchbuttonChecked = document.createElement('ha-switch-button'),
            switchbuttonWrapper = document.createElement('div');

        switchbutton.name = 'Switch button initialized as default';
        switchbutton.value = '123';
        switchbutton.checked = false;
        switchbutton.labelOn = 'ON';
        switchbutton.labelOff = 'OFF';

        switchbuttonChecked.name = 'Switch button initialized as checked';
        switchbuttonChecked.value = '456';
        switchbuttonChecked.checked = true;
        switchbuttonChecked.labelOn = 'ON';
        switchbuttonChecked.labelOff = 'OFF';

        switchbuttonWrapper.appendChild(switchbutton);
        switchbuttonWrapper.appendChild(switchbuttonChecked);

        el.appendChild(switchbuttonWrapper);
    }
});
