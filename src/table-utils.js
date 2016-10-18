define([
    'exports',
    'dstore/Memory',
    'text!./hof-batting.json'
], function(exports, Memory, battingData) {
    /*jshint unused:false*/

    // parse JSON data
    battingData = JSON.parse(battingData);

    var formatCurrency = exports.formatCurrency = function (value) {
        var currency = '$' + Math.round(value * 100) / 100;

        if (currency.indexOf('.') === -1) {
            currency += '.00';
        } else {
            currency = currency.replace(/(\.\d$)/, '$10');
        }

        return currency;
    };

    var getBattingInfo = exports.getBattingInfo = function() {
        var store = new Memory({ data: battingData });
        var columns = {
            first: { label: 'First Name', editor: 'ha-text-field' },
            last: { label: 'Last Name' },
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
                formatter: formatCurrency
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

        return {
            store: store,
            columns: columns
        };
    };

    var getRandomDate = exports.getRandomDate = function (start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    var getRandomNumber = exports.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var formatDate = exports.formatDate = function (date) {
        var yyyy = date.getFullYear().toString(),
            mm = ('0' + (date.getMonth() + 1)).slice(-2),
            dd = ('0' + date.getDate()).slice(-2);

        return mm + '/' + dd + '/' + yyyy;
    };

    var createData = exports.createData = function (count) {
        var data = [];
        for (var i = 0; i < count; ++i) {
            data.push({
                id: i,
                first: 'first name ' + i,
                last: 'last name ' + i,
                date: getRandomDate(new Date('2010-09-09'), new Date()),
                amount: Math.random() * (300 - 100) + 100,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                field7: 'field 7 longer longer longer longer line- ' + i,
                field8: 'field 8 - ' + i,
                field9: 'field 9 - ' + i,
                field10: 'field 10 - ' + i,
                field11: 'field 11 - ' + i
            });
        }
        return data;
    };

    var addBatchMode = exports.addBatchMode = function (table, store) {
        table.allowBatchMode = true;
        var button = document.createElement('button');
        button.textContent = 'Do batch things';
        button.classList.add('ha-button');
        table.batchNodes = [button];
        button.addEventListener('click', function() {
            table.clearErrors();
            var errors = [];
            Object.keys(table.selection).forEach(function(id) {
                if (getRandomNumber(0, 100) > 70) {
                    // add an error to that row
                    table.setError(id, 'Random error');
                    errors.push(id);
                } else {
                    store.get(id).then(function (item) {
                        item.first = 'UPDATED';
                        item.last = 'ITEM';
                        store.put(item);
                    });
                }
            });

            if (!errors.length) {
                table.clearSelection();
            }
        });
    };

    var setupTableBar = exports.setupTableBar = function (table) {
        table.showTableBar = true;
        table.showSettings = true;
        table.showDisplayDensitySettings = true;
        table.showRowsPerPageSettings = true;
        table.showColumnHider = true;
        table.allowPrintList = true;
    };
});
