require.config({
    paths: {
        'hui-lib': '../vendor/hui/dist/js/hui.min',
        'hui-table': '../vendor/hui/dist/js/hui-table.min',
        "object-utils": "../vendor/object-utils/src",
        "register-component": "../vendor/register-component/src",
        "mustache": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.0.0/mustache.min",
        "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        'ua-parser': '../vendor/ua-parser-js/dist/ua-parser.min'
    },
    packages: [
        { name: 'dojo', location: '../vendor/dojo' },
        { name: 'dgrid', location: '../vendor/dgrid' },
        { name: 'dgrid-legacy', location: '../vendor/dgrid-legacy' },
        { name: 'xstyle', location: '../vendor/xstyle' },
        { name: 'put-selector', location: '../vendor/put-selector' },
        { name: 'dstore', location: '../vendor/dstore' }
    ],
    waitSeconds: 30
});

var store, table;

require([
    "hui-lib",
    "hui-table"
], function() {
    require([
        'dstore/RequestMemory',
        'dstore/Trackable',
        'hui/text-field',
        'hui/table',
        'hui/segmented-button',
        'hui/popover',
        'hui/menu-item'
    ], function(RequestMemory, Trackable) {
        function currencyFormatter(value) {
            var currency = '$' + Math.round(value * 100) / 100;

            if (currency.indexOf('.') === -1) {
                currency += '.00';
            } else {
                currency = currency.replace(/(\.\d$)/, '$10');
            }

            return currency;
        }

        var node = document.getElementById('table'),
            button = document.createElement('button');

        store = new (RequestMemory.createSubclass([Trackable]))({
            target: 'hof-batting.json'
        });
        table = document.createElement('ha-table');
        table.rowsPerPage = 100;
        table.showTableBar = true;
        table.showSettings = true;
        table.showEditMode = true;
        table.showDisplayDensitySettings = true;
        table.showRowsPerPageSettings = true;
        table.showColumnHider = true;
        table.collection = new (RequestMemory.createSubclass([Trackable]))({
            target: 'hof-batting.json'
        });
        table.allowBatchMode = true;
        table.allowRowReordering = true;
        table.batchNodes = [button];
        table.columns = {
            first: {
                label: 'First Name',
                sortable: false,
                editor: 'ha-text-field'
            },
            last: 'Last Name',
            totalG: {
                label: 'Games Played',
                editor: 'ha-text-field',
                renderCell: function(object, value, node) {
                    node.appendChild(document.createTextNode(value));
                    var secondLine = document.createElement('div');
                    secondLine.classList.add('subline');
                    secondLine.appendChild(document.createTextNode('Games Played'));
                    node.appendChild(secondLine);

                }
            },
            nickname: {
                label: 'Nickname',
                formatter: function(value) {
                    return '<a href="#">' + value + '</a>';
                }
            },
            height: {
                label: 'Amount',
                className: 'numeric',
                formatter: currencyFormatter
            },
            action: {
                label: 'Action',
                renderCell: function(object, value, node) {
                    node.classList.add('control');
                    var icon = document.createElement('span');
                    icon.classList.add('hi', 'hi-settings');
                    node.appendChild(icon);
                }
            }
        };

        button.textContent = 'Clear Selection';
        button.classList.add('ha-button');
        button.addEventListener('click', function() {
            table.clearSelection();
        });

        node.appendChild(table);
    })
});
