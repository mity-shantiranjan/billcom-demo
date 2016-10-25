require.config({
    paths: {
        'hui-lib': '../vendor/hui/dist/js/hui.min',
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
        'hui/text-field',
        'hui/trowser',
        'hui/select',
        'hui/step-flow'
    ], function() {
        document.querySelector('#step-flow-button').addEventListener('click', function() {
            var trowser = document.querySelector('#step-flow-trowser'),
                stepFlow = document.querySelector('#step-flow'),
                step1 = stepFlow.steps[0],
                msg;

            if (!stepFlow.querySelector("ha-toast-message")) {
                msg = document.createElement("ha-toast-message");
                msg.style['z-index'] = 1;
                msg.dismissible = false;
                stepFlow.appendChild(msg);

                trowser.on('close', function() {
                    stepFlow.close();
                });
            }

            trowser.show();
            stepFlow.show();
        });
    });
});
