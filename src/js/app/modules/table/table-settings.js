define([
    'hui/core/utils',
    'dstore/Memory',
    'dojo/request'
], function(utils, Memory, request) {
    'use strict';

    var complexColumns = function() {
            return {
                first: {
                    label: 'First Name',
                    sortable: false
                },
                last: 'Last Name',
                totalG: {
                    label: 'Games Played',
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
                        return '<a href=\'#\'>' + value + '</a>';
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
                        var icon = document.createElement('button'),
                            screenReaderNode = document.createElement('span');

                        node.classList.add('control');
                        icon.className = 'hi hi-settings';
                        icon.style.background = 'none';
                        icon.style.border = 'none';
                        screenReaderNode.className = 'sr-only';
                        screenReaderNode.innerHTML = 'Action for this row';
                        icon.appendChild(screenReaderNode);
                        node.appendChild(icon);
                    },
                    unhidable: true,
                    sortable: false
                }
            };
        },
        currencyFormatter = function(value) {
            var currency = '$' + Math.round(value * 100) / 100;

            if (currency.indexOf('.') === -1) {
                currency += '.00';
            } else {
                currency = currency.replace(/(\.\d$)/, '$10');
            }

            return currency;
        },
        hofStore = function(target) {
            var RequestMemory = Memory.createSubclass({
                    constructor: function(opts) {
                        var self = this;
                        request.get(opts.target, {
                            handleAs: 'json',
                            sync: true
                        }).then(function(data) {
                            self.data = data;
                        });
                    }
                }),
                hofStore = new RequestMemory({
                    target: target || 'js/app/modules/table/hof-batting.json'
                });

            return hofStore;
        },
        renderSettings = function(parent, target) {
            var table = utils.createElement('ha-table', {
                    showTableBar: true,
                    showSettings: true,
                    userId: 'userId',
                    persistentId: 'persistentId',
                    showColumnHider: true,
                    showDisplayDensitySettings: true,
                    showRowsPerPageSettings: true,
                    filterType: 'simple-filter',
                    columns: complexColumns(),
                    collection: hofStore(target)
                }),
                node = parent.querySelector('#settings-example'),
                div = document.createElement('div'),
                checkbox = document.createElement('ha-checkbox'),
                title = document.createElement('h4');

            title.textContent = 'Other';
            checkbox.label = 'Do something special';
            div.appendChild(checkbox);
            checkbox.render();
            table.otherSettingsNode.appendChild(title);
            table.otherSettingsNode.appendChild(div);
            node.appendChild(table);

            table = utils.createElement('ha-table', {
                showTableBar: true,
                showSettings: true,
                userId: 'userId-2',
                persistentId: 'persistentId-2',
                showColumnHider: true,
                showDisplayDensitySettings: true,
                showRowsPerPageSettings: true,
                filterType: 'simple-filter',
                columns: complexColumns(),
                collection: hofStore(target),
                responsiveLayout: 'stacked'
            });

            div = document.createElement('div');
            title = document.createElement('h3');
            title.textContent = 'Sort stacked layout';

            div.appendChild(title);
            div.appendChild(table);
            div.classList.add('hide-desktop');

            node.appendChild(div);

            table = utils.createElement('ha-table', {
                showTableBar: true,
                showSettings: true,
                showMobileSortOptions: false,
                userId: 'userId',
                persistentId: 'persistentId',
                showColumnHider: true,
                showDisplayDensitySettings: true,
                showRowsPerPageSettings: true,
                filterType: 'simple-filter',
                columns: complexColumns(),
                collection: hofStore(target)
            });

            div = document.createElement('div');
            checkbox = document.createElement('ha-checkbox');
            title = document.createElement('h3');
            title.textContent = 'No Sort Settings on Mobile';

            div.appendChild(title);
            div.appendChild(table);
            div.classList.add('hide-desktop');

            node.appendChild(div);

            return this;
        };

    return {renderSettings: renderSettings};
});
