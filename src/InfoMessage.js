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
        'hui-lib'
    ], function() {
        require([
            'hui/toast-message', 
            'hui/page-message', 
            'hui/modal'], function() {
    });
});
