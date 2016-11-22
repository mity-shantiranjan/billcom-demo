require.config({
    paths: {
        "hui-lib": "../vendor/hui/dist/js/hui.min",
        "object-utils": "../vendor/object-utils/src",
        "register-component": "../vendor/register-component/src",
        "mustache": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.0.0/mustache.min",
        "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        'ua-parser': '../vendor/ua-parser/dist/ua-parser.min'
    }
});

require([
    "hui-lib"
], function() {
    require([
        "hui/segmented-button",
        "hui/trowser",
        "hui/step-flow",
        "hui/modal",
        "hui/checkbox-group",
        "hui/date-picker",
        "hui/date-range-picker",
        "hui/date-picker/calendar",
        "hui/date-picker/double-calendar"], function() {

        function createProgrammatic1() {
            var checkbox1 = document.createElement('ha-checkbox');
            checkbox1.label = 'Checkbox 1';
            checkbox1.value = '1';

            var checkbox2 = document.createElement('ha-checkbox');
            checkbox2.label = 'Checkbox 2';
            checkbox2.value = '2';

            var checkbox3 = document.createElement('ha-checkbox');
            checkbox3.label = 'Checkbox 3';
            checkbox3.value = '3';

            var checkboxGroup = document.createElement('ha-checkbox-group');

            checkboxGroup.checkboxes = [checkbox1, checkbox2, checkbox3];
            document.querySelector('#programmatic-1').appendChild(checkboxGroup);
        }

        function setupDateTimePicker() {
            var testPicker = document.getElementById("testPicker");

            document.getElementById("openButton").addEventListener('click', function () {
                testPicker.showCalendar();
            });

            testPicker.on('change', function () {
                document.getElementById('changedValue').textContent = "Birthday: " + testPicker.value;
            });
        }

        createProgrammatic1();
        setupDateTimePicker();
    
    });
});
