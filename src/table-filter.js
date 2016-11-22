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

var table;
require([
    "hui-lib",
    "hui-table"
], function() {
    require([
        'dstore/RequestMemory',
        'hui/text-field',
        'hui/table',
        'hui/segmented-button',
        'hui/text-field',
        'hui/popover',
        'hui/popover-form',
        'hui/select'
    ], function(RequestMemory) {
        function currencyFormatter(value) {
            var currency = '$' + Math.round(value * 100) / 100;

            if (currency.indexOf('.') === -1) {
                currency += '.00';
            } else {
                currency = currency.replace(/(\.\d$)/, '$10');
            }

            return currency;
        }

        table = document.createElement('ha-table');
        table.rowsPerPage = 100;
        table.showSettings = true;
        table.allowBatchMode = false;
        table.showTableBar = true;
        table.columns = {
            first: {
                label: 'First Name',
                sortable: false
            },
            last: 'Last Name',
            totalG: {
                label: 'Games Played',
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
        table.collection = new RequestMemory({target: 'hof-batting.json'});

        var select = (function filterSelect() {
            // construct simple filter with select
            var select = document.createElement('ha-select'),
                item1 = document.createElement('ha-item'),
                item2 = document.createElement('ha-item'),
                item3 = document.createElement('ha-item');

            //select.label = 'No Filter';

            item1.label = 'No Filter';
            item1.value = undefined;
            item1.selected = true;

            item2.label = 'Less than 1000 games';
            item2.value = 1000;

            item3.label = 'Less than 2000 games';
            item3.value = 2000;

            select.items = [ item1, item2, item3 ];

            select.on('change', function(event) {
                var value = event.target.value;
                if (value) {
                    table.filter(function(data) {
                        return data.totalG < value;
                    });
                } else {
                    table.filter();
                }
            });

            return select;
        })();

        var input = (function filterTextField() {
            var input = document.createElement('ha-text-field');

            input.type = 'text';
            input.name = 'first';
            input.placeholder = 'Filter by first name...';

            input.on('change', function(event) {
                var value = event.target.value;

                table.filter({
                    first: new RegExp(value, 'i')
                });
            });

            return input;
        })();

        var popover = (function filterPopover() {
            var popover = document.createElement('ha-popover'),
                first = document.createElement('ha-text-field'),
                last = document.createElement('ha-text-field'),
                nickname = document.createElement('ha-text-field'),
                amount = document.createElement('ha-text-field'),
                popoverForm = document.createElement('ha-popover-form'),
                section = popoverForm.querySelector('section'),
                applyButton = document.createElement('button'),
                resetButton = document.createElement('button');

            applyButton.classList.add('ha-button', 'ha-button-primary');
            applyButton.type = 'submit';
            applyButton.textContent = 'Apply';
            resetButton.textContent = 'Reset';
            resetButton.classList.add('ha-button', 'ha-button-secondary');

            first.name = 'first';
            first.label = 'First Name';
            last.name = 'last';
            last.label = 'Last Name';
            nickname.name = 'nickname';
            nickname.label = 'Nickname';
            amount.name = 'height';
            amount.label = 'Amount';
            popover.appendChild(popoverForm);
            section.appendChild(first);
            section.appendChild(last);
            section.appendChild(nickname);
            section.appendChild(amount);
            section.appendChild(document.createElement('br'));
            section.appendChild(resetButton);
            section.appendChild(applyButton);

            function filter() {
                var query = {}, tags = {};
                [first, last, nickname, amount].forEach(function(field) {
                    if (field.value) {
                        query[field.name] = new RegExp(field.value, 'i');
                        tags[field.name] = field.label;
                    }
                });

                table.filter(query, tags);
            }

            function reset() {
                var query = {};
                [first, last, nickname, amount].forEach(function(field) {
                    field.value = null;
                });

                table.filter(query);
            }

            function dismiss(name) {
                var field;
                switch (name) {
                case 'first':
                    field = first;
                    break;
                case 'last':
                    field = last;
                    break;
                case 'nickname':
                    field = nickname;
                    break;
                case 'height':
                    field = amount;
                    break;
                }
                field.value = null;
                filter();
            }

            applyButton.addEventListener('click', function() {
                filter();
                popover.hide();
            });
            resetButton.addEventListener('click', function() {
                reset();
            });

            table.on('dismiss', function(event) {
                dismiss(event.target.value);
            });

            table.on('dismiss-all', function() {
                reset();
            });

            return popover;
        })();

        var control = document.querySelector('#filter-type');
        control.on('click', function(event) {
            var value = event.target.value;
            table.filter();
            if (value === 'simpleSelect') {
                table.filterType = 'simple';
                table.filterNodes = [select];
            } else if (value === 'simpleText') {
                table.filterType = 'simple';
                table.filterNodes = [input];
            } else {
                table.filterType = 'complex';
                table.filterNodes = [popover];
            }
        });

        table.filterType = 'complex';
        table.filterNodes = [popover];


        document.getElementById('table').appendChild(table);
    });
});

