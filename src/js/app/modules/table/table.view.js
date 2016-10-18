define([
    'backbone',
    'dojo/_base/declare',
    'dojo/Deferred',
    'dstore/Memory',
    'dstore/Trackable',
    'hui/table/ContentGroupMemory',
    'hui/table/ContentGroupRequest',
    'hui/table/RowExpansionRenderer',
    'dojo/request/registry',
    'dojo/request',
    'text!./table.hbs',
    './table-settings',
    '../select/select',
    'hui/select-type-ahead',
    'hui/text-field',
    'hui/select',
    'hui/radio-button-group',
    'hui/radio-button',
    'hui/date-picker',
    'hui/menu-button'
], function(Backbone, declare, Deferred, Memory, Trackable, ContentGroupMemory, ContentGroupRequest, RowExpansionRenderer,
            registry, request, template, tableSettingsJS, demoJS) {
        'use strict';

    var data,
        groupDataStore,
        RequestMemory,
        simpleColumns,
        stackedColumns,
        complexColumns,
        hofStore,
        trackableHofStore,
        TableView;

    function currencyFormatter(value) {
        var currency = '$' + Math.round(value * 100) / 100;

        if (currency.indexOf('.') === -1) {
            currency += '.00';
        } else {
            currency = currency.replace(/(\.\d$)/, '$10');
        }

        return currency;
    }

    function _mockData(url) {
        if (!data) {
            data = hofStore.fetchSync();
        }

        var deferred = new Deferred(),
            args = url.split('limit(')[1].split(')')[0].split(','),
            count = Number(args[0]),
            start = Number(args[1]) || 0,
            urlFilteringRegExp = /first=match=%2F([^%]*)%2F/,
            filterRegExp = urlFilteringRegExp.test(url) ?
            new RegExp(url.match(urlFilteringRegExp)[1], ['i']) : /.*/,
            filteredData = data.filter(function(item) {
                return filterRegExp.test(item.first);
            }),
            items = filteredData.slice(start, start + count);

        setTimeout(function() {
            deferred.resolve(JSON.stringify({
                identifier: 'id',
                items: items,
                total: filteredData.length
            }));
        }, 0);

        return deferred.promise;
    }

    registry.register(/^\/mockStore/, _mockData);

    function _getCategoryStore() {
        return new ContentGroupMemory({
            data: _getCategoryData()
        });
    }

    function _getCategoryData() {
        var contracts = [],
            contractTypes = [
                'Weekly Contract',
                'Monthly Contract',
                'Annual Contract',
                'Pay as You Go Contract',
                'Empty Category'
            ],
            i;

        contracts.push({
            contractType: contractTypes[0],
            id: 0,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[1],
            id: 1,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[4],
            id: 200,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[2],
            id: 2,
            parent: null
        });
        contracts.push({
            contractType: contractTypes[3],
            id: 3,
            parent: null
        });

        for (i = 0; i < 100; i++) {
            contracts.push({
                id: i + 4,
                phoneNumber: '555-121-1234',
                email: 'email' + i + '@domain.com',
                balance: Math.random() * 1000,
                parent: (i % 4)
            });
        }

        return contracts;
    }

    function _getCategoryColumns() {
        return {
            contractType: {
                label: '',
                renderExpando: true
            },
            id: 'ID',
            email: {
                label: 'Email',
                formatter: function(email) {
                    return '<a href=\'\' + email + \'\'>' + email + '</a>';
                }
            },
            balance: {
                label: 'Balance',
                className: 'numeric',
                formatter: currencyFormatter
            }
        };
    }

    function _getStackedCategoryColumns() {
        return {
            contractType: {
                label: '',
                renderExpando: true
            },
            id: { label: 'ID', stackedRow: 1, stackedColumn: 'left' },
            email: {
                label: 'Email',
                formatter: function(email) {
                    return '<a href=\'\' + email + \'\'>' + email + '</a>';
                },
                stackedRow: 0,
                stackedColumn: 'left'
            },
            balance: {
                label: 'Balance',
                className: 'numeric',
                formatter: currencyFormatter,
                stackedRow: 0,
                stackedColumn: 'right'
            }
        };
    }

    function _mockGroupData(url) {
        if (!groupDataStore) {
            groupDataStore = _getCategoryStore();
        }
        console.log(url);
        var deferred = new Deferred(),
            args = url.split('limit(')[1].split(')')[0].split(','),
            count = Number(args[0]),
            start = Number(args[1]) || 0,
            expandedRegex = /expanded=([0-9]*)/g,
            expanded = [],
            queryResults;

        url.replace(expandedRegex, function() {
            if (arguments[1]) {
                expanded.push(arguments[1]);
            }
        });
        queryResults = groupDataStore.fetchGroupRangeSync({
            start: start,
            end: start + count,
            expanded: expanded
        });
        setTimeout(function() {
            deferred.resolve(JSON.stringify({
                identifier: 'id',
                items: queryResults,
                total: queryResults.totalLength,
                isLastPage: queryResults.isLastPage,
                start: queryResults.start
            }));
        }, 0);
        return deferred.promise;
    }

    function createSelect() {
        var items = [],
            select = document.createElement('ha-select'),
            i;

        for (i = 0; i < 4; i++) {
            items[i] = document.createElement('ha-item');
        }

        items[0].label = 'Pop Label';
        items[0].value = 'Pop';
        items[1].label = 'Mr. Cub Label';
        items[1].value = 'Mr. Cub';
        items[2].label = 'Home Run Label';
        items[2].value = 'Home Run';

        select.items = [items[0], items[1]];


        return select;
    }

    registry.register(/^\/mockGroupStore/, _mockGroupData);
    RequestMemory = Memory.createSubclass({
        constructor: function(opts) {
            var self = this;
            request.get(opts.target, {
                handleAs: 'json',
                sync: true
            }).then(function(data) {
                self.data = data;
            });
        }
    });
    simpleColumns = function() {
        return {
            first: {
                label: 'First Name',
                sortable: false
            },
            last: 'Last Name',
            height: 'Height'
        };
    };

    stackedColumns = function() {
        return {
            name: {
                label: 'Name',
                sortable: false,
                get: function (object) {
                    return object.first + ' ' + object.last;
                },
                stackedColumn: 'left',
                stackedRow: 0

            },
            nickname: {
                label: 'Nickname',
                formatter: function (value) {
                    return '<a href=\'#\'>' + value + '</a>';
                },
                stackedColumn: 'right',
                stackedRow: 0
            },
            totalG: {
                label: 'Games Played',
                formatter: function (value) {
                    return value + ' games played';
                },
                stackedColumn: 'left',
                stackedRow: 1
            },
            height: {
                label: 'Amount',
                className: 'numeric',
                formatter: currencyFormatter,
                stackedColumn: 'right',
                stackedRow: 1
            },
            weight: {
                label: 'Weight',
                formatter: function (value) {
                    return value + 'lbs';
                },
                stackedColumn: 'right',
                stackedRow: 2
            },
            action: {
                label: 'Action',
                renderCell: function (object, value, node) {
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
                unhidable: true
            }
        };
    };

    complexColumns = function() {
        return {
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
                }
            },
            nickname: {
                label: 'Nickname',
                formatter: function (value) {
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
                renderCell: function (object, value, node) {
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
                unhidable: true
            }
        };
    };



    hofStore = new RequestMemory({
        target: 'js/app/modules/table/hof-batting.json'
    });

    trackableHofStore = new(RequestMemory.createSubclass(Trackable))({
        target: 'js/app/modules/table/hof-batting.json'
    });

    TableView = Backbone.View.extend({

        events: {
            'click #table-navigation': 'navigate',
            'click #table-size-button': 'setTableSize'
        },

        navigate: function(evt) {
            // keep track of the rendered tabs and don't render them again
            // this allows for tabs to be rendered on-demand
            this._renderedTabs = this._renderedTabs || {};
            var selector = '#' + evt.currentTarget.value,
                renderer = evt.currentTarget._selectedItem.getAttribute('renderer');
            this.$el.find('.panel').addClass('hidden');
            this.$el.find(selector).removeClass('hidden');
            if (!this._renderedTabs[renderer] && typeof this[renderer] === 'function') {
                this._renderedTabs[renderer] = true;
                this[renderer](this.$el.find(selector)[0]);
            } else {
                var tableSelector = selector + ' ha-table, ' + selector + ' ha-table-virtual';
                Array.prototype.forEach.call(document.querySelectorAll(tableSelector), function(table) {
                    table.resize();
                });
            }
        },

        render: function() {
            this.$el.html(template);
            this.renderHtml(this.$el.find('#html')[0]);
            this._renderedTabs = {
                renderHtml: true
            };
            return this;
        },

        renderHtml: function(parent) {
            var table = document.createElement('ha-table'),
                placeToAppend = parent.querySelector('#html-example');
            table.autoheight = true;
            table.rowsPerPage = 50;
            table.showTableBar = true;
            table.rowStatus = function(row) {
                if (row.last.indexOf('x') > -1) {
                    return 'success';
                } else if (row.last.indexOf('w') > -1) {
                    return 'error';
                } else if (row.last.indexOf('k') > -1) {
                    return 'warning';
                } else {
                    return '';
                }
            };
            table.collection = hofStore;
            table.columns = simpleColumns();

            placeToAppend.appendChild(table);
        },

        renderJS: function(parent) {
            var table = document.createElement('ha-table'),
                placeToAppend = parent.querySelector('#js-example');
            table.autoheight = true;
            table.rowsPerPage = 50;
            table.showTableBar = true;
            table.collection = hofStore;
            table.columns = simpleColumns();

            placeToAppend.appendChild(table);
        },

        renderSettings: function(parent) {
            tableSettingsJS.renderSettings(parent);

            return this;
        },

        renderPrint: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#print-example');
            table.showTableBar = true;
            table.showPrintList = true;
            table.columns = complexColumns();
            table.collection = hofStore;


            node.appendChild(table);

            table = document.createElement('ha-table');
            node = parent.querySelector('#print-renderer-example');
            table.showTableBar = true;
            table.showPrintList = true;
            table.columns = complexColumns();
            table.collection = hofStore;
            table.printRenderer = {
                header: function() {
                    var header = this.table.querySelector('.ha-table-header');
                    if (header) {
                        header.parentNode.removeChild(header);
                    }
                },
                row: function(object) {
                    var div = document.createElement('div');
                    function renderField(fieldDef) {
                        var fieldName = typeof fieldDef === 'string' ? fieldDef : fieldDef.field;
                        var fieldDiv = document.createElement('div');
                        fieldDiv.textContent = fieldName + ': ' + object[fieldName];
                        div.style.borderBottom = '1px solid black';
                        div.appendChild(fieldDiv);
                    }
                    if (Array.isArray(this.table.columns)) {
                        this.table.columns.forEach(renderField);
                    } else {
                        Object.keys(this.table.columns).map(function(key) {
                            return typeof this.table.columns[key] === 'string' ? key : this.table.columns[key];
                        }, this).forEach(renderField);
                    }

                    return div;
                }
            };

            node.appendChild(table);
            return this;
        },

        renderBatchMode: function(parent) {
            var table = document.createElement('ha-table'),
                stackedTable = document.createElement('ha-table'),
                placeToAppend = parent.querySelector('#batch-example'),
                button = document.createElement('button'),
                evenButton = document.createElement('button'),
                mobileButton = document.createElement('button'),
                stackedMobileButton = document.createElement('button'),
                mobileMenuButton = document.createElement('ha-menu-button'),
                stackedTitle = document.createElement('h3'),
                store = new(RequestMemory.createSubclass(Trackable))({
                    target: 'js/app/modules/table/hof-batting.json'
                }),
                stackedStore = new (RequestMemory.createSubclass(Trackable))({
                    target: 'js/app/modules/table/hof-batting.json'
                }),
                menuItem,
                menuItems = [];

            button.textContent = 'Do batch things';
            button.classList.add('ha-button');
            button.classList.add('hidden-mobile');

            evenButton.textContent = 'Do even batch things';
            evenButton.classList.add('ha-button');
            evenButton.classList.add('hidden-mobile');

            mobileButton.textContent = 'Update Rows';
            mobileButton.classList.add('ha-button');
            mobileButton.classList.add('hidden-desktop');

            while(menuItems.length < 3) {
                menuItem = document.createElement('ha-item');
                menuItem.label = 'Item ' + (menuItems.length + 1);
                menuItem.value = 'Item ' + (menuItems.length + 1) + 'Value';

                menuItems.push(menuItem);
            }

            mobileMenuButton.label = 'More...';
            mobileMenuButton.items = menuItems;
            mobileMenuButton.classList.add('hidden-desktop');

            table.batchNodes = [button, evenButton, mobileButton, mobileMenuButton];

            ['batch-select', 'batch-deselect'].forEach(function(type) {
                table.on(type, function() {
                    var evenDisabled = Object.keys(table.selection).some(function(id) {
                        return table.row(id).element.classList.contains('dgrid-row-even');
                    });

                    evenButton.disabled = evenDisabled;
                });
            });

            var errors = [];
            var stackedErrors = [];

            function updateRowsWithErrors(table, errors) {
                return function() {
                    table.clearErrors();

                    var selection = table.selection;

                    Object.keys(selection).forEach(function(id) {
                        if (selection[id]) {
                            if ((table.row(id).element.rowIndex % 10) === 6) {
                                // add an error to rows 7, 17, 27, etc.
                                table.setError(id, '7th row error');
                                errors.push(id);
                            } else {
                                table.collection.get(id).then(function(item) {
                                    item.first = 'UPDATED';
                                    item.last = 'ITEM';
                                    table.collection.put(item);
                                });
                            }
                        }
                    });

                    if (!errors.length) {
                        table.clearSelection();
                    }
                };
            }

            button.addEventListener('click', updateRowsWithErrors(table, errors));
            mobileButton.addEventListener('click', updateRowsWithErrors(table, errors));

            table.collection = store;
            table.allowBatchMode = true;
            table.showTableBar = true;
            table.filterType = 'simple-filter';
            table.rowsPerPage = 50;
            table.columns = {
                first: complexColumns().first,
                last: 'Last Name',
                totalG: complexColumns().totalG,
                nickname: complexColumns().nickname,
                height: complexColumns().height
            };

            placeToAppend.appendChild(table);

            stackedTitle.textContent = 'Batch w/ Stacked Layout';
            stackedTitle.classList.add('hidden-desktop');

            stackedTable.collection = stackedStore;
            stackedTable.allowBatchMode = true;
            stackedTable.showTableBar = true;
            stackedTable.filterType = 'simple-filter';
            stackedTable.rowsPerPage = 50;
            stackedTable.columns = {
                first: complexColumns().first,
                last: {
                    label: 'Last Namw'
                },
                totalG: complexColumns().totalG,
                nickname: complexColumns().nickname,
                height: complexColumns().height
            };
            stackedTable.columns.first.stackedRow = 0;
            stackedTable.columns.first.stackedColumn = 'left';
            stackedTable.columns.last.stackedRow = 1;
            stackedTable.columns.last.stackedColumn = 'left';
            stackedTable.columns.height.stackedRow = 0;
            stackedTable.columns.height.stackedColumn = 'right';
            stackedTable.columns.nickname.stackedRow = 1;
            stackedTable.columns.nickname.stackedColumn = 'right';

            stackedTable.responsiveLayout = 'stacked';
            stackedTable.classList.add('hidden-desktop');

            stackedMobileButton.textContent = 'Update Rows';
            stackedMobileButton.classList.add('ha-button');
            stackedMobileButton.addEventListener('click', updateRowsWithErrors(stackedTable, stackedErrors));

            stackedTable.batchNodes = [stackedMobileButton];

            placeToAppend.appendChild(document.createElement('br'));
            placeToAppend.appendChild(document.createElement('br'));
            placeToAppend.appendChild(stackedTitle);
            placeToAppend.appendChild(stackedTable);
        },

        renderExport: function(node) {
            function createExportTable() {
                var table = document.createElement('ha-table');
                table.allowBatchMode = false;
                table.showTableBar = true;
                table.filterType = 'simple-filter';
                table.columns = complexColumns();
                table.showExport = true;
                table.collection = hofStore;
                return table;
            }

            var simpleTable = createExportTable();

            simpleTable.on('export', function() {
                alert('Commencing simple export');
                console.log('Commencing simple export');
            });
            node.querySelector('#simple-export').appendChild(simpleTable);

            var complexTable = createExportTable(),
                xlsItem = document.createElement('ha-item'),
                pdfItem = document.createElement('ha-item'),
                exportMenuButton = document.createElement('ha-menu-button');

            xlsItem.value = xlsItem.label = 'Export as XLS';
            pdfItem.value = pdfItem.label = 'Export as PDF';
            exportMenuButton.items = [xlsItem, pdfItem];
            exportMenuButton.addEventListener('select', function(event) {
                alert(event.target.selectedItem.value);
            });
            exportMenuButton.icon = 'hi-export';
            exportMenuButton.label = complexTable.exportIconText;
            complexTable.exportButton = exportMenuButton;
            node.querySelector('#complex-export').appendChild(complexTable);
        },

        renderRowReordering: function(parent) {
            var table = document.createElement('ha-table'),
                placeToAppend = parent.querySelector('#row-reordering-examples');
            table.allowRowReordering = true;
            table.showTableBar = true;
            table.filterType = 'simple-filter';
            table.columns = complexColumns();
            table.collection = trackableHofStore;
            placeToAppend.appendChild(table);
        },

        renderTotalRow: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#total-row-example'),
                totalGamesPlayed = 0,
                totalAmount = 0;
            table.showTableBar = true;
            table.filterType = 'simple-filter';
            table.rowsPerPage = 5;
            table.columns = complexColumns();
            table.rowStatus = function(row) {
                if (row.last.indexOf('x') > -1) {
                    return 'success';
                } else if (row.last.indexOf('w') > -1) {
                    return 'error';
                } else {
                    return '';
                }
            };
            table.collection = hofStore;
            var totals = table.collection.fetch().then(function(results) {
                var i;
                for (i = 0; i < results.length; i++) {
                    totalGamesPlayed += results[i].totalG;
                    totalAmount += results[i].height;
                }

                return {
                    'totalG': totalGamesPlayed,
                    'height': '$' + totalAmount
                };
            });

            table.on('table-resize', function() {
                totals.then(function(totals) {
                    table.totals = totals;
                });
            });

            node.appendChild(table);
            return this;
        },

        renderFilter: function(parent) {
            var table = document.createElement('ha-table'),
                batchFilteredTable = document.createElement('ha-table'),
                node = parent.querySelector('#filter-example'),
                select,
                input,
                batchInput,
                popover,
                customLabels,
                control,
                title = document.createElement('h3'),
                batchButton = document.createElement('button');

            table.showTableBar = true;
            table.filterType = 'simple';
            table.columns = complexColumns();
            table.collection = hofStore;
            select = (function filterSelect() {
                // construct simple filter with select
                var select = document.createElement('ha-select'),
                    item1 = document.createElement('ha-item'),
                    item2 = document.createElement('ha-item'),
                    item3 = document.createElement('ha-item');

                item1.label = 'No Filter';
                item1.value = undefined;
                item1.selected = true;

                item2.label = 'Less than 1000 games';
                item2.value = 1000;

                item3.label = 'Less than 2000 games';
                item3.value = 2000;

                select.items = [item1, item2, item3];

                select.on('change', function(event) {
                    var value = +event.target.value;
                    if (isNaN(value)) {
                        table.filter();
                    } else {
                        table.filter(function(data) {
                            return data.totalG < value;
                        });
                    }
                });

                return select;
            })();

            input = (function filterTextField() {
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

            popover = (function filterPopover() {
                var popover = document.createElement('ha-popover'),
                    first = document.createElement('ha-text-field'),
                    last = document.createElement('ha-text-field'),
                    nickname = document.createElement('ha-text-field'),
                    amount = document.createElement('ha-text-field'),
                    popoverForm = document.createElement('ha-popover-form'),
                    section = popoverForm.querySelector('section'),
                    applyButton = document.createElement('button'),
                    resetButton = document.createElement('button'),
                    datePicker = document.createElement('ha-date-picker');

                applyButton.classList.add('ha-button');
                applyButton.classList.add('ha-button-primary');
                applyButton.type = 'submit';
                applyButton.textContent = 'Apply';
                resetButton.textContent = 'Reset';
                resetButton.classList.add('ha-button');
                resetButton.classList.add('ha-button-secondary');

                first.name = 'first';
                first.label = 'First Name';
                last.name = 'last';
                last.label = 'Last Name';
                nickname.name = 'nickname';
                nickname.label = 'Nickname';
                amount.name = 'height';
                amount.label = 'Amount';
                datePicker.label = 'Date';
                popover.appendChild(popoverForm);
                section.appendChild(first);
                section.appendChild(last);
                section.appendChild(nickname);
                section.appendChild(amount);
                section.appendChild(datePicker);
                section.appendChild(document.createElement('br'));
                section.appendChild(resetButton);
                section.appendChild(applyButton);

                function filter() {
                    var query = {};
                    [first, last, nickname, amount].forEach(function(field) {
                        if (field.value) {
                            query[field.name] = field.value;
                        }
                    });

                    table.filter(query);
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

                table.on('show-all', function() {
                    popover.show();
                });

                return popover;
            })();

            customLabels = (function filterPopoverSelect() {
                    var popover = document.createElement('ha-popover'),
                        first = document.createElement('ha-text-field'),
                        last = document.createElement('ha-text-field'),
                        nickname = createSelect(),
                        amount = document.createElement('ha-text-field'),
                        popoverForm = document.createElement('ha-popover-form'),
                        section = popoverForm.querySelector('section'),
                        applyButton = document.createElement('button'),
                        resetButton = document.createElement('button');

                    applyButton.classList.add('ha-button');
                    applyButton.classList.add('ha-button-primary');
                    applyButton.type = 'submit';
                    applyButton.textContent = 'Apply';
                    resetButton.textContent = 'Reset';
                    resetButton.classList.add('ha-button');
                    resetButton.classList.add('ha-button-secondary');

                    first.name = 'first';
                    first.label = 'First Name';
                    last.name = 'last';
                    last.label = 'Last Name';
                    nickname.name = 'nickname';
                    nickname.label = 'Nickname';
                    nickname.style.width = '211px';
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
                        var query = {},
                            labels = {};
                        [first, last, nickname, amount].forEach(function(field) {
                            if (field.value) {
                                query[field.name] = field.value;
                                // Use custom format for text-fields and selects, except the
                                // last name field
                                if (field.tagName === 'HA-TEXT-FIELD' && field.name !== 'last') {
                                    labels[field.name] = field.label + '=' + field.value;
                                } else if (field.tagName === 'HA-SELECT') {
                                    labels[field.name] = field.selectedItem.label;
                                } else {
                                    labels[field.name] = field.value;
                                }
                            }
                        });

                        table.filter(query, labels);
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

                    table.on('show-all', function() {
                        popover.show();
                    });

                    return popover;
            })();

            control = this.$el.find('#filter-type')[0];
            control.on('click', function(event) {
                var value = event.target.value;
                table.filter();
                if (value === 'simpleSelect') {
                    table.filterType = 'simple';
                    table.filterNodes = [select];
                } else if (value === 'simpleText') {
                    table.filterType = 'simple';
                    table.filterNodes = [input];
                } else if (value === 'complex') {
                    table.filterType = 'complex';
                    table.filterNodes = [popover];
                } else {
                    table.filterType = 'complex';
                    table.filterNodes = [customLabels];
                }
            });

            table.filterType = 'simple';
            table.filterNodes = [select];

            batchInput = (function filterTextField() {
                var batchInput = document.createElement('ha-text-field');

                batchInput.type = 'text';
                batchInput.name = 'first';
                batchInput.placeholder = 'Filter by first name...';

                batchInput.on('change', function(event) {
                    var value = event.target.value;

                    batchFilteredTable.filter({
                        first: new RegExp(value, 'i')
                    });
                });

                return batchInput;
            })();

            batchButton.classList.add('ha-button');
            batchButton.textContent = 'Process';

            batchFilteredTable.classList.add('hidden-desktop');
            batchFilteredTable.showTableBar = true;
            batchFilteredTable.columns = complexColumns();
            batchFilteredTable.collection = hofStore;
            batchFilteredTable.filterType = 'simple';
            batchFilteredTable.filterNodes = [batchInput];
            batchFilteredTable.allowBatchMode = true;
            batchFilteredTable.batchNodes = [batchButton];

            title.textContent = 'Batch Filter Example';
            title.classList.add('hidden-desktop');

            node.appendChild(table);
            node.appendChild(title);
            node.appendChild(batchFilteredTable);
        },

        renderEmptyGrid: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#empty-grid-example');
            table.showTableBar = true;
            table.showExport = true;
            table.showEditMode = true;
            table.showPrintList = true;
            table.showSettings = true;
            table.rowsPerPage = 5;
            table.columns = complexColumns();
            table.collection = new Memory();
            node.appendChild(table);
            return this;
        },

        renderLoadingMessage: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#loading-message-example');
            table.showTableBar = true;
            table.showExport = true;
            table.showEditMode = true;
            table.showPrintList = true;
            table.showSettings = true;
            table.rowsPerPage = 5;
            table.columns = complexColumns();
            table.collection = trackableHofStore;
            node.appendChild(table);
            var orig = table.table.renderQueryResults;
            table.table.renderQueryResults = function() {
                var self = this,
                    args = Array.prototype.slice.call(arguments),
                    dfd = new Deferred();
                setTimeout(function() {
                    dfd.resolve(orig.apply(self, args));
                }, 5000);
                return dfd.promise;
            };
            return this;
        },

        renderContentGrouping: function(placeToAppend) {
            var contentGroupingHeader = document.createElement('h3');
            contentGroupingHeader.textContent = 'Content Grouping';
            placeToAppend.appendChild(contentGroupingHeader);

            var virtualScrolling = document.createElement('h4');
            virtualScrolling.textContent = 'Virtual Scrolling';
            placeToAppend.appendChild(virtualScrolling);
            placeToAppend.appendChild(this._virtualScrollingContentGrouping());

            var paginated = document.createElement('h4');
            paginated.textContent = 'Paginated';
            placeToAppend.appendChild(paginated);
            placeToAppend.appendChild(this._paginationContentGrouping());

            var maintainingGroupOrder = document.createElement('h4');
            maintainingGroupOrder.textContent = 'Maintaining Group Order';
            placeToAppend.appendChild(maintainingGroupOrder);
            placeToAppend.appendChild(this._forceGroupOrderContentGrouping());
        },

        renderEditMode: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#edit-example'),
                store;
            table.rowsPerPage = 100;
            table.showTableBar = true;
            table.showSettings = true;
            table.showEditMode = true;
            table.showDisplayDensitySettings = true;
            table.showRowsPerPageSettings = true;
            table.showColumnHider = true;
            table.filterType = 'simple-filter';
            table.collection = new RequestMemory({
                target: 'js/app/modules/table/hof-batting.json'
            });
            table.editMode = 'specific';
            store = function(name) {
                return {
                    query: function() {
                        return {
                            then: function(callback) {
                                var values = [
                                    {
                                        'label': 'Apple',
                                        'value': 'Apple'
                                    },
                                    {
                                        'label': 'Banana',
                                        'value': 'Banana'
                                    },
                                    {
                                        'label': 'Balloon',
                                        'value': 'Balloon'
                                    },
                                    {
                                        'label': 'Mellon',
                                        'value': 'Mellon'
                                    }
                                ];
                                if (name) {
                                    values.push({
                                        'label': name,
                                        'value': name
                                    });
                                }
                                callback(values);
                            }
                        };
                    }
                };
            };

            // table.allowBatchMode = true;
            table.columns = {
                first: {
                    label: 'First Name',
                    sortable: false,
                    editor: 'ha-select-type-ahead',
                    editorInit: function(editor, value) {
                        editor.store = store(value);
                        editor.value = value;
                    }
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
                        // return node;

                    }
                },
                nickname: {
                    label: 'Nickname',
                    editor: 'ha-select-type-ahead',
                    editorInit: function(editor, value) {
                        var store = {
                            query: function() {
                                return {
                                    then: function(callback) {
                                        var values = [{
                                            id: 0,
                                            label: 'Apple',
                                            value: 'Apple'
                                        }, {
                                            id: 1,
                                            label: 'Banana',
                                            value: 'Banana'
                                        }, {
                                            id: 2,
                                            label: 'Balloon',
                                            value: 'Balloon'
                                        }, {
                                            id: 3,
                                            label: 'Mellon',
                                            value: 'Mellon'
                                        }];
                                        if (value) {
                                            values.push({
                                                id: 4,
                                                label: value,
                                                value: value
                                            });
                                        }
                                        callback(values);
                                    }
                                };
                            }
                        };
                        editor.placeholder = 'Select nickname';
                        editor.store = store;
                    }
                    // formatter: function(value) {
                    //     return '<a href='#'>' + value + '</a>';
                    // }
                },
                height: {
                    label: 'Amount',
                    className: 'numeric',
                    formatter: currencyFormatter
                },
                action: {
                    label: 'Action',
                    renderCell: function(object, value, node) {
                        var link = document.createElement('ha-combo-link'),
                            item1 = document.createElement('ha-item'),
                            item2 = document.createElement('ha-item'),
                            item3 = document.createElement('ha-item');

                        link.label = 'Create New';
                        item1.label = 'Apple';
                        item1.value = 'Apple';
                        item2.label = 'Banana';
                        item2.value = 'Banana';
                        item3.label = 'Cherry';
                        item3.value = 'Cherry';

                        link.disabled = false;
                        link.items = [item1, item2, item3];
                        node.appendChild(link);
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
                var id = Object.keys(event.changed)[0];
                if (id && (table.row(id).element.rowIndex % 10) === 6) {
                    // add an error to that row
                    table.setError(id, 'There was an error that prevented save. Please try again.');
                    table.revert();
                } else {
                    console.log(table.save());
                }
            });

            var popover;
            table.onClickEdit = function(event) {
                if (popover) {
                    popover.parentElement.removeChild(popover);
                    popover = null;
                }
                table.clearErrors();
                popover = document.createElement('ha-popover');
                var content = document.createElement('div');

                event.editableFields.forEach(function(field) {
                    var button = document.createElement('ha-menu-item');
                    button.style.display = 'block';
                    button.style.width = '100%';
                    button.setAttribute('name', field);
                    button.label = table.columns[field].label;
                    content.appendChild(button);
                });
                content.addEventListener('click', function(event) {
                    var el = event.target.hasAttribute('name') ? event.target : event.target.parentElement;
                    console.log('click', event.target.getAttribute('name'), event);
                    popover.hide();
                    popover.parentElement.removeChild(popover);
                    popover = null;
                    table.editableFields = [el.getAttribute('name')];
                    table.editable = true;
                });
                popover.addContent(content);
                popover.connector = false;
                popover.targetSelector = '#edit-example .hi-edit';
                console.log('appending popover');
                popover.className = 'edit-example-popover';
                table.appendChild(popover);
                popover.show();
            };

            node.appendChild(table);

            var table2 = document.createElement('ha-table');
            table2.rowsPerPage = 100;
            table2.showTableBar = true;
            table2.showSettings = true;
            table2.showEditMode = true;
            table2.showDisplayDensitySettings = true;
            table2.showRowsPerPageSettings = true;
            table2.showColumnHider = true;
            table2.filterType = 'simple-filter';
            table2.collection = new RequestMemory({
                target: 'js/app/modules/table/hof-batting.json'
            });
            // table2.allowBatchMode = true;
            table2.columns = {
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
                        // return node;

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
                        node.classList.add('control');
                        var icon = document.createElement('span');
                        icon.classList.add('hi');
                        icon.classList.add('hi-settings');
                        node.appendChild(icon);
                    }
                }
            };

            table2.on('edit-save', function(event) {
                table2.clearErrors();
                table2.editable = false;
                var id = Object.keys(event.changed)[0];
                if (id && (table2.row(id).element.rowIndex % 10) === 6) {
                    // add an error to that row
                    table2.setError(id, 'There was an error that prevented save. Please try again.');
                    table2.revert();
                } else {
                    console.log(table2.save());
                }
            });

            this.$el.find('#edit-simple-example')[0].appendChild(table2);
        },

        renderRowEditMode: function(parent) {
            function buildEditableTable(parentNode, mobileOnly, title, description, extraConfiguration) {
                var usageContainer = parentNode.querySelector('section.usage'),
                    exampleContainer = parentNode.querySelector('section.examples'),
                    container = document.createElement('div'),
                    usageTitle = document.createElement('h3'),
                    usageDescription = document.createElement('p'),
                    exampleTitle = document.createElement('h3'),
                    exampleDescription = document.createElement('p'),
                    table = null,
                    codeExtractor = /function .*?\(.*?\) {([\s\S]*)}$/,
                    codeBlob,
                    codeContainer = document.createElement('div'),
                    addLinesBtn = document.createElement('button'),
                    buttonContainer = document.createElement('div');

                function createTable() {
                    table = document.createElement('ha-table-virtual');
                    var store = new (declare([Memory, Trackable]))({
                        data: [
                            {
                                id: 1,
                                product: 'development',
                                description: 'Developed product',
                                qty: 4.75,
                                rate: 55.00,
                                amount: 261.25,
                                taxable: false
                            },
                            {
                                id: 2,
                                product: 'other',
                                description: 'Development tooling',
                                qty: '',
                                rate: '',
                                amount: 49.95,
                                taxable: true
                            }
                        ]
                    });

                    table.columns = {
                        product: {
                            label: 'Type',
                            editor: 'ha-select',
                            width: 150,
                            formatter: function(value) {
                                if (!value) {
                                    return '';
                                }

                                return value.toUpperCase();
                            },
                            editorInit: function(select) {
                                var development = document.createElement('ha-item');
                                development.label = 'Development';
                                development.value = 'development';

                                var other = document.createElement('ha-item');
                                other.label = 'Other';
                                other.value = 'other';

                                select.items = [
                                    development,
                                    other
                                ];
                            },
                            stackedColumn: 'left',
                            stackedRow: 1
                        },
                        description: {
                            label: 'Description',
                            editor: 'ha-text-field',
                            stackedColumn: 'left',
                            stackedRow: 0
                        },
                        amount: {
                            label: 'Amount',
                            editor: 'ha-text-field',
                            className: 'numeric',
                            editorInit: function(editor) {
                                editor.pattern = '^[0-9\.]*$';
                            },
                            width: 100,
                            stackedRow: 0,
                            stackedColumn: 'right'
                        },
                        taxable: {
                            width: 50,
                            label: 'TAX',
                            editor: 'ha-checkbox',
                            formatter: function(v) {
                                if (v) {
                                    return '<i class="hi hi-checkmark"></i>';
                                }

                                return '';
                            },
                            editorArgs: {
                                value: 'checked'
                            }
                        }
                    };

                    table.collection = store;
                    table.allowRowEditing = true;
                    table.responsiveLayout = 'stacked';
                }

                function findIndent(str) {
                    var indent = 0;

                    while (str.charAt(indent) === ' ') {
                        indent++;
                    }

                    return indent;
                }

                function unIndent(str) {
                    var lines = str.split('\n'),
                        line,
                        indent,
                        i,
                        j;

                    while (lines[0] === '') {
                        lines.shift();
                    }

                    while (lines[lines.length - 1] === '') {
                        lines.pop();
                    }

                    indent = findIndent(lines[0]);

                    for (i = 0; i < lines.length; i++) {
                        line = lines[i];

                        for (j = 0; j < indent; j++) {
                            if (line[j] !== ' ') {
                                break;
                            }
                        }

                        lines[i] = line.substr(j);
                    }

                    return lines.join('\n');
                }

                createTable();

                codeBlob = createTable.toString().match(codeExtractor)[1];
                codeBlob = unIndent(codeBlob);

                if (extraConfiguration) {
                    extraConfiguration(table);
                    codeBlob += unIndent(extraConfiguration.toString().match(codeExtractor)[1]);
                }

                codeContainer.className = 'highlight';
                codeContainer.innerHTML = '<pre><code><pre style="background:none;border:none"></pre></code></pre>';
                codeContainer.querySelector('code pre').appendChild(document.createTextNode(codeBlob));

                addLinesBtn.className = 'ha-button';
                addLinesBtn.innerHTML = 'Add&nbsp;&nbsp;<i class="hi hi-create large"></i>';
                addLinesBtn.addEventListener('click', function() {
                    table.addAndEditRow();
                });

                buttonContainer.style.textAlign = 'left';
                buttonContainer.appendChild(addLinesBtn);

                usageTitle.textContent = title;
                usageDescription.innerHTML = description;
                exampleTitle.textContent = title;
                exampleTitle.style.marginTop = '2em';
                exampleDescription.innerHTML = description;
                exampleDescription.classList.add('hidden-desktop');

                if(mobileOnly) {
                    exampleTitle.classList.add('hidden-desktop');
                    container.classList.add('hidden-desktop');
                    usageTitle.textContent += ' (See on mobile)';
                }

                container.appendChild(table);
                container.appendChild(buttonContainer);

                usageContainer.classList.add('hidden-handheld');

                usageContainer.appendChild(usageTitle);
                usageContainer.appendChild(usageDescription);
                usageContainer.appendChild(codeContainer);

                exampleContainer.appendChild(exampleTitle);
                exampleContainer.appendChild(exampleDescription);
                exampleContainer.appendChild(container);

                return container;
            }

            buildEditableTable(parent, false, 'Default', 'Row editing in desktop, stacked renderer with default row expansion on mobile.', null);
            buildEditableTable(parent, true, 'Custom Row Expansion', 'Row editing in desktop, stacked renderer with custom row expansion on mobile. Row expansion is set using <code>rowExpansionRenderer</code> property.', function(table) {
                table.rowExpansionRenderer = function(rowId, collapse) {
                    var node = document.createElement('div');

                    var textField = document.createElement('ha-text-field');
                    textField.label = 'Description';
                    textField.required = true;

                    node.appendChild(textField);

                    node.appendChild(document.createElement('br'));
                    node.appendChild(document.createElement('br'));

                    var button = document.createElement('button');
                    button.textContent = 'Save';
                    button.className = 'ha-button ha-button-primary';
                    button.style.width = '100%';

                    button.addEventListener('click', function() {
                        if (textField.checkValidity()) {
                            table.collection.get(rowId).then(function(row) {
                                row.description = textField.value;
                                table.collection.put(row);
                            });

                            collapse();
                        }
                    });

                    node.appendChild(button);

                    table.collection.get(rowId).then(function(row) {
                        textField.value = row.description;
                    });

                    return node;
                };
            });
            buildEditableTable(parent, true, 'Custom Drawer', 'Row editing in desktop, custom event listener for <code>row-edit</code> event in mobile.', function(table) {
                table.rowExpansion = false;
                table.on('row-edit', function(event) {
                    var rowId = event.row,
                        drawer = document.createElement('ha-drawer-large'),
                        section = document.createElement('section'),
                        footer = document.createElement('footer'),
                        saveButton = document.createElement('button'),
                        textField = document.createElement('ha-text-field');

                    textField.label = 'Description';
                    textField.required = true;

                    section.innerHTML = '<p>You have selected row ' + rowId + ' for editing.</p>';
                    section.appendChild(textField);

                    saveButton.textContent = 'Save';
                    saveButton.className = 'ha-button ha-button-primary';
                    saveButton.addEventListener('click', function() {
                        if (textField.checkValidity()) {
                            table.collection.get(rowId).then(function(row) {
                                row.description = textField.value;
                                table.collection.put(row);
                            });

                            drawer.close();
                        }
                    });
                    footer.appendChild(saveButton);

                    table.collection.get(rowId).then(function(row) {
                        textField.value = row.description;
                    });

                    drawer.backdrop = true;
                    drawer.section = section;
                    drawer.footer = footer;

                    document.body.appendChild(drawer);
                    drawer.on('close', function() {
                        document.body.removeChild(drawer);
                    });

                    drawer.show();
                });
            });
        },

        renderVirtualScrolling: function(parent) {
            var table = document.createElement('ha-table-virtual'),
                placeToAppend = parent.querySelector('#virtual-scrolling-example');

            table.maxHeight = 600;
            table.showSettings = true;
            table.showTableBar = true;
            table.collection = new(declare([RequestMemory, Trackable]))({
                target: 'js/app/modules/table/hof-batting.json'
            });

            var orig = table.table.renderQueryResults;
            table.table.renderQueryResults = function() {
                var self = this,
                    args = Array.prototype.slice.call(arguments),
                    totalLength = args[0].totalLength;
                args[0] = args[0].then(function(results) {
                    var dfd = new Deferred();
                    setTimeout(function() {
                        dfd.resolve(results);
                    }, 800);
                    return dfd.promise;
                });
                // ensure that the totalLength promise still exists on the new
                // promise being used to delay results
                args[0] = Object.create(args[0], {
                    totalLength: {
                        value: totalLength
                    }
                });
                return orig.apply(self, args);
            };
            table.columns = {
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
                        node.classList.add('control');
                        var icon = document.createElement('span');
                        icon.classList.add('hi');
                        icon.classList.add('hi-settings');
                        node.appendChild(icon);
                    }
                }
            };

            placeToAppend.appendChild(table);
        },

        renderColumnLocking: function(parent) {
            var table = document.createElement('ha-table'),
                node = parent.querySelector('#column-locking-example');
            table.lockedColumns = 1;
            table.columns = {
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
                        // return node;

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
                        node.classList.add('control');
                        var icon = document.createElement('span');
                        icon.classList.add('hi');
                        icon.classList.add('hi-settings');
                        node.appendChild(icon);
                    }
                }
            };
            table.collection = new(declare([RequestMemory, Trackable]))({
                target: 'js/app/modules/table/hof-batting.json'
            });
            node.appendChild(table);

            return this;
        },

        requestStore: function(parent) {
            var table = document.createElement('ha-table'),
                contentGroupTable = document.createElement('ha-table'),
                node = parent.querySelector('#request-store-example'),
                popover = (function ilterPopover() {
                    var popover = document.createElement('ha-popover'),
                        first = document.createElement('ha-text-field'),
                        popoverForm = document.createElement('ha-popover-form'),
                        section = popoverForm.querySelector('section'),
                        applyButton = document.createElement('button'),
                        resetButton = document.createElement('button');

                    applyButton.classList.add('ha-button');
                    applyButton.classList.add('ha-button-primary');
                    applyButton.type = 'submit';
                    applyButton.textContent = 'Apply';
                    resetButton.textContent = 'Reset';
                    resetButton.classList.add('ha-button');
                    resetButton.classList.add('ha-button-secondary');

                    first.name = 'first';
                    first.label = 'First Name';
                    popover.appendChild(popoverForm);
                    section.appendChild(first);
                    section.appendChild(document.createElement('br'));
                    section.appendChild(resetButton);
                    section.appendChild(applyButton);

                    function filter() {
                        var query = {};
                        if (first.value) {
                            query.first = new RegExp(first.value, ['i']);
                        }

                        table.filter(query);
                    }

                    function reset() {
                        first.value = '';
                        filter();
                    }

                    applyButton.addEventListener('click', function() {
                        filter();
                        popover.hide();
                    });
                    resetButton.addEventListener('click', function() {
                        reset();
                    });

                    table.on('dismiss', reset);

                    table.on('dismiss-all', reset);

                    table.on('show-all', function() {
                        popover.show();
                    });

                    return popover;
                })();
            table.columns = simpleColumns();
            table.rowsPerPage = 50;
            table.collection = new ContentGroupRequest({
                target: '/mockStore'
            });
            table.filterType = 'complex';
            table.filterNodes = [popover];

            node.appendChild(table);

            contentGroupTable.categoryProperty = 'contractType';
            contentGroupTable.rowsPerPage = 15;
            contentGroupTable.collection = new ContentGroupRequest({
                target: '/mockGroupStore'
            });
            contentGroupTable.columns = _getCategoryColumns();

            node.appendChild(contentGroupTable);
            return this;
        },

        _expandoRow: function(parent, batch) {
            var table = document.createElement('ha-table'),
                tableWithExtendedRenderer = document.createElement('ha-table'),
                tableWithCustomHeightRenderer = document.createElement('ha-table'),
                node = parent.querySelector('#expando-row-example' + (batch ? '-batch' : '')),
                columns = {
                    first: {
                        label: 'First Name',
                        sortable: false
                    },
                    last: 'Last Name',
                    height: 'Height',
                    action: {
                        label: 'Action',
                        renderCell: function(object, value, node) {
                            node.classList.add('control');
                            var icon = document.createElement('button');
                            icon.classList.add('no-button');
                            icon.classList.add('hi');
                            icon.classList.add('hi-settings');
                            icon.setAttribute('aria-label', 'Show row expansion');
                            icon.setAttribute('tabindex', '0');
                            node.appendChild(icon);
                        }
                    }
                },
                customRowExpansionArgs = {
                    activatorSelector: '.control .hi-settings',
                    renderRowExpansionContent: function(object, hideExpansion) {
                        var expandoContentDiv = document.createElement('div'),
                            firstNameTextField = document.createElement('ha-text-field'),
                            lastNameDiv = document.createElement('div'),
                            heightDiv = document.createElement('div'),
                            select = demoJS.createComponent(),
                            hideButton = document.createElement('button'),
                            radioButtonGroupDiv = document.createElement('div');

                        radioButtonGroupDiv.innerHTML = '<ha-radio-button-group label="Some Label" expected="2" required>' +
                            '<ha-radio-button label="Radio 1" value="1"></ha-radio-button>' +
                            '<ha-radio-button label="Radio 2" value="2"></ha-radio-button>' +
                            '<ha-radio-button label="Radio 3" value="3"></ha-radio-button>' +
                            '</ha-radio-button-group>';
                        firstNameTextField.value = 'First Name: ' + object.first;
                        lastNameDiv.textContent = 'Last Name: ' + object.last;
                        heightDiv.textContent = 'Height: ' + object.height;
                        select.style.display = 'block';
                        hideButton.className = 'ha-button ha-button-primary';
                        hideButton.textContent = 'Collapse';
                        hideButton.onclick = function () {
                            alert("Action taken");
                            hideExpansion();
                        };
                        hideButton.style.width = "100px";

                        expandoContentDiv.appendChild(radioButtonGroupDiv);
                        expandoContentDiv.appendChild(firstNameTextField);
                        expandoContentDiv.appendChild(lastNameDiv);
                        expandoContentDiv.appendChild(heightDiv);
                        expandoContentDiv.appendChild(select);
                        expandoContentDiv.appendChild(hideButton);

                    return expandoContentDiv;
                }
            },
            rowExpansionWithCustomHeight = {
                expansionHeight: 80
            },
            CustomRowExpansionRenderer = RowExpansionRenderer.bind(null, customRowExpansionArgs),
            CustomHeightExpansionRenderer = RowExpansionRenderer.bind(null, rowExpansionWithCustomHeight);


            table.columns = simpleColumns();
            table.rowsPerPage = 50;
            table.collection = hofStore;
            table.addRenderMode('defaultExpandableRow', new RowExpansionRenderer());
            table.renderMode = 'defaultExpandableRow';
            table.allowBatchMode = batch;

            tableWithExtendedRenderer.columns = columns;
            tableWithExtendedRenderer.rowsPerPage = 50;
            tableWithExtendedRenderer.collection = hofStore;
            tableWithExtendedRenderer.addRenderMode('customExpandableRow', new CustomRowExpansionRenderer());
            tableWithExtendedRenderer.renderMode = 'customExpandableRow';
            tableWithExtendedRenderer.allowBatchMode = batch;

            if (!batch) {
                tableWithCustomHeightRenderer.columns = simpleColumns();
                tableWithCustomHeightRenderer.rowsPerPage = 50;
                tableWithCustomHeightRenderer.collection = hofStore;
                if (!batch) {
                    tableWithCustomHeightRenderer.addRenderMode('customHeightExpandableRow', new CustomHeightExpansionRenderer());
                }
                tableWithCustomHeightRenderer.renderMode = 'customHeightExpandableRow';
            }

            node.appendChild(table);
            node = parent.querySelector('#expando-row-custom-example' + (batch ? '-batch' : ''));
            node.appendChild(tableWithExtendedRenderer);
            if (!batch) {
                node = parent.querySelector('#expando-row-custom-height-example' + (batch ? '-batch' : ''));
                node.appendChild(tableWithCustomHeightRenderer);
            }
            return this;
        },

        expandoRow: function(parent) {
            this._expandoRow(parent, false);
            return this._expandoRow(parent, true);
        },

        renderInTabs: function() {
            var table1 = document.getElementById('tab-table1'),
                table2 = document.getElementById('tab-table2'),
                table3 = document.getElementById('tab-table3');

            table1.columns = simpleColumns();
            table2.columns = complexColumns();
            table3.columns = simpleColumns();

            table1.collection = hofStore;
            table2.collection = hofStore;
            table3.collection = hofStore;
        },

        renderResponsiveLayouts: function() {
            var standardLayoutParent = document.querySelector('#table-layouts-standard-example'),
                stackedLayoutParent = document.querySelector('#table-layouts-stacked-data-example'),
                columnLockingLayoutParent = document.querySelector('#table-layouts-column-locking-example'),
                simpleColumnDefStackedLayoutParent =
                    document.querySelector('#table-layouts-simple-column-def-stacked-example'),
                standardTable = document.createElement('ha-table'),
                stackedTable = document.createElement('ha-table'),
                columnLockingTable = document.createElement('ha-table'),
                simpleColumnDefStackedTable = document.createElement('ha-table');
            
            standardTable.columns = complexColumns();
            standardTable.collection = hofStore;
            standardTable.rowsPerPage = 50;

            columnLockingTable.responsiveLayout = 'columnLocking';
            columnLockingTable.columns = complexColumns();
            columnLockingTable.collection = hofStore;
            columnLockingTable.rowsPerPage = 50;

            stackedTable.responsiveLayout = 'stacked';
            stackedTable.columns = stackedColumns();
            stackedTable.collection = hofStore;
            stackedTable.rowsPerPage = 50;

            simpleColumnDefStackedTable.responsiveLayout = 'stacked';
            simpleColumnDefStackedTable.columns = {
                first: 'First Name',
                last: 'Last Name',
                totalG: 'Games Played',
                nickname: 'Nickname'
            };
            simpleColumnDefStackedTable.collection = hofStore;
            simpleColumnDefStackedTable.rowsPerPage = 50;

            standardLayoutParent.appendChild(standardTable);
            stackedLayoutParent.appendChild(stackedTable);
            columnLockingLayoutParent.appendChild(columnLockingTable);
            simpleColumnDefStackedLayoutParent.appendChild(simpleColumnDefStackedTable);
        },

        _virtualScrollingContentGrouping: function() {
            var table = document.createElement('ha-table-virtual');
            table.collection = _getCategoryStore();
            table.categoryProperty = 'contractType';
            table.columns = _getCategoryColumns();

            return table;
        },

        _paginationContentGrouping: function() {
            var table = document.createElement('ha-table');
            table.categoryProperty = 'contractType';
            table.rowsPerPage = 15;
            table.collection = _getCategoryStore();
            table.columns = _getStackedCategoryColumns();
            table.responsiveLayout = 'stacked';

            return table;
        },

        _forceGroupOrderContentGrouping: function(type) {
            var table;
            if (type === 'paginated') {
                table = this._paginationContentGrouping();
                table.collection.forceGroupOrder(true);
            } else {
                table = this._virtualScrollingContentGrouping();
                table.collection.forceGroupOrder(true);
            }

            return table;
        },

        setTableSize: function(event) {
            var table = this.$el.find('ha-table')[0];

            table.classList.remove('compact');
            table.classList.remove('double');

            switch (event.target.value) {
                case 'compact':
                case 'double':
                    table.classList.add(event.target.value);
                    break;
            }

            // changing classes as above does not implicitly allow the table to resize if autoheight is set
            table.resize();
        }
    });

    return TableView;
});
