require.config({
    paths: {
        'hui-lib': '../vendor/hui/dist/js/hui.min',
        'hui-table': '../vendor/hui/dist/js/hui-table.min',
        "object-utils": "../vendor/object-utils/src",
        "register-component": "../vendor/register-component/src",
        "mustache": "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.0.0/mustache.min",
        "text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        'ua-parser': '../vendor/ua-parser/dist/ua-parser.min'
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

var store, contentGroupMemoryStore, table1, table2, table3, table4, paginatedContentGroupsTable, table5, tableEdit1, tableEdit2, tableEdit3;

require([
    "hui-lib",
    "hui-table"
], function() {
    require([
        'dstore/RequestMemory',
        'dstore/Trackable',
        'hui/text-field',
        'hui/table'
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

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        store = new (RequestMemory.createSubclass([Trackable]))({
            target: 'hof-batting.json'
        });

        // console.profile('ha-table');
        console.time('ha-table creation');
        table = document.createElement('ha-table');
        table.rowsPerPage = 100;
        table.showTableBar = true;
        table.showEditMode = true;
        table.showSettings = true;
        table.showDisplayDensitySettings = true;
        table.showRowsPerPageSettings = true;
        table.showColumnHider = true;
        table.filterType = 'simple-filter';
        table.collection = store;
        // table.allowBatchMode = true;
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
                renderCell: function (object, value, node) {
                    node.appendChild(document.createTextNode(value));
                    var secondLine = document.createElement('div');
                    secondLine.classList.add('subline');
                    secondLine.appendChild(document.createTextNode('Games Played'));
                    node.appendChild(secondLine);
                    // return node;

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

        table.on('edit-cancel', function() {
            console.log('%cEDIT CANCEL', 'font-weight:bold;color:orange;');
        });
        table.on('edit-save', function(event) {
            console.log('%cEDIT SAVE', 'font-weight:bold;color:green;', event);
            table.clearErrors();
            table.editable = false;
            if (getRandomNumber(0, 100) > 70) {
                // add an error to that row
                var id = Object.keys(event.changed)[0];
                table.setError(id, 'There was an error that prevented save. Please try again.');
                table.revert();
            } else {
                console.log(table.save());
            }
        });

        table.editMode = 'specific';

        document.getElementById('table').appendChild(table);
        console.timeEnd('ha-table creation');
        // console.profileEnd('ha-table');
    });
});

