
/**
 * @module
 * @class ColumnLocking
 * ColumnLocking allows for columns to be "locked", preventing horizontal scrolling
 * and locking columns to always be visible on the left side of the grid.
 * This module facilitates this functionality by manipulating the column structure of
 * the grid instance to include a columnSet based on the _lockedColumns property
 *
 * This module is automatically mixed into the dgrid instance created in TableBase.factory
 */
define('hui/table/ColumnLocking',[
    'dojo/_base/declare',
    'dojo/aspect',
    'dojo/on',
    'dojo/has',
    '../core/deviceUtils'
], function(declare, aspect, on, has, deviceUtils) {
    has.add('event-mousewheel', function(global, document, element) {
        return 'onmousewheel' in element;
    });
    has.add('event-wheel', function(global, document, element) {
        return 'onwheel' in element;
    });

    var colsetidAttr = 'data-dgrid-column-set-id';

    function findParentColumnSet(node, root) {
        if (node.nodeType !== 1) {
            node = node.parentNode;
        }

        /*istanbul ignore next*/
        while (node && !node[node.matches ? 'matches' : 'msMatchesSelector']('.dgrid-column-set[' + colsetidAttr + ']')) {
            node = node.parentNode;
            if (node === root) {
                return null;
            }
        }

        return node;
    }

    /* istanbul ignore next */
    function getTouchEventName(type) {
        var hasPointer = has('pointer'),
            pointerMap = { start: 'down', end: 'up' };

        if (hasPointer) {
            type = pointerMap[type] || type;
            if (hasPointer.slice(0, 2) === 'MS') {
                return 'MSPointer' + type.slice(0, 1).toUpperCase() + type.slice(1);
            } else {
                return 'pointer' + type;
            }
        }

        return 'touch' + type;
    }

    /* istanbul ignore next */
    function horizTouchMove(grid) {
        return function(target, listener) {
            var listeners = [
                on(target, getTouchEventName('start'), function(event) {
                    if (!grid._currentlyTouchedColumnSet) {
                        var node = findParentColumnSet(event.target, target);
                        if (node && (!event.pointerType || event.pointerType === 'touch' || event.pointerType === 2)) {
                            grid._currentlyTouchedColumnSet = node;
                            grid._lastColumnSetTouchX = event.clientX;
                            grid._lastColumnSetTouchY = event.clientY;
                        }
                    }
                }),
                on(target, getTouchEventName('move'), function(event) {
                    if (grid._currentlyTouchedColumnSet === null) {
                        return;
                    }

                    var node = findParentColumnSet(event.target);
                    if (!node) {
                        return;
                    }
                    listener.call(grid, node, grid._lastColumnSetTouchX - event.clientX);
                    grid._lastColumnSetTouchX = event.clientX;
                    grid._lastColumnSetTouchY = event.clientY;
                }),
                on(target, getTouchEventName('end'), function() {
                    grid._currentlyTouchedColumnSet = null;
                })
            ];

            return {
                remove: function() {
                    listeners.forEach(function(listener) {
                        listener.remove();
                    });
                }
            };
        };
    }

    /* istanbul ignore next */
    function horizMouseWheel(grid) {
        if (has('event-mousewheel') || has('event-wheel')) {
            return function(target, listener) {
                return on(target, has('event-wheel') ? 'wheel' : 'mousewheel', function(event) {
                    var node = findParentColumnSet(event.target, target),
                        deltaX;

                    if (!node) {
                        return;
                    }

                    deltaX = event.deltaX || -event.wheelDeltaX / 3;
                    if (deltaX) {
                        listener.call(grid, node, deltaX);
                    }
                });
            };
        }

        return function(target, listener) {
            return on(target, '.dgrid-column-set[' + colsetidAttr + ']:MozMousePixelScroll', function(event) {
                if (event.axis === 1) {
                    listener.call(grid, this, event.detail);
                }
            });
        };
    }

    return declare(null, {
        _columnSetListeners: null,
        columnSets: null,

        postMixInProperties: function() {
            this.inherited(arguments);
            this._columnSetListeners = [];
        },

        postCreate: function() {
            this.inherited(arguments);
            if (this.lockedColumns) {
                this._setupColumnSetListeners();
            }
        },

        /**
         * Add the column locking event listeners to the instance.
         * This will setup event listeners that will handle scrolling the records that
         * are scrollable
         */
        _setupColumnSetListeners: function() {
            var self = this,
                listeners = this._columnSetListeners;
            if (listeners.length) {
                this._removeColumnSetListeners();
            }
            listeners.push(this.on(horizMouseWheel(this), this._horizMoveHandler));
            if (has('touch')) {
                listeners.push(this.on(horizTouchMove(this), this._horizMoveHandler));
            }

            /* istanbul ignore next */
            listeners.push(this.on('.dgrid-column-set:dgrid-cellfocusin', function(event) {
                self._onColumnSetCellFocus(event, this);
            }));
        },

        /**
         * Remove the event listeners for the column sets when no columns are locked
         */
        _removeColumnSetListeners: function() {
            this._columnSetListeners.forEach(function(event) {
                event.remove();
            });
            this._columnSetListeners = [];
        },

        _horizMoveHandler: function(colsetNode, amount) {
            var id = colsetNode.getAttribute(colsetidAttr),
                scroller = this._columnSetScrollers[id],
                scrollLeft = scroller.scrollLeft + amount;

            scroller.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
        },

        /**
         * Adjust the horizontal scroll of the grid when data is refreshed
         * @override
         */
        renderArray: function() {
            var rows = this.inherited(arguments);

            rows.forEach(function(row) {
                this._adjustScrollLeft(row);
            }, this);

            return rows;
        },

        _adjustScrollLeft: function(row) {
            var scrollLefts = this._columnSetScrollLefts;
            Array.prototype.forEach.call(row.querySelectorAll('.dgrid-column-set'), function(element) {
                element.scrollLeft = scrollLefts[element.getAttribute(colsetidAttr)];
            });
        },

        /**
         * If columns are locked, wrap them in wrappers to control their scrolling independently
         * @override
         */
        createRowCells: function(tag, each, subRows, object) {
            if (!this.lockedColumns) {
                return this.inherited(arguments);
            }

            var row = document.createElement('table'),
                tbody = document.createElement('tbody'),
                tr = document.createElement('tr'),
                args = arguments,
                columnSets;

            row.classList.add('dgrid-row-table');
            row.setAttribute('role', 'presentation');
            row.appendChild(tbody);
            tbody.appendChild(tr);

            subRows = (subRows || this.subRows)[0];
            columnSets = this.columnSets = [
                [subRows.slice(0, this.lockedColumns)],
                [subRows.slice(this.lockedColumns)]
            ];

            columnSets.forEach(function(subset, i) {
                var el = document.createElement(tag),
                    cell = document.createElement('div');
                tr.appendChild(el);
                el.classList.add('dgrid-column-set-cell');
                el.classList.add('dgrid-column-set-' + i);
                el.appendChild(cell);
                cell.classList.add('dgrid-column-set');
                cell.setAttribute(colsetidAttr, i);
                cell.appendChild(this.inherited(args, [tag, each, subset, object]));
            }, this);
            return row;
        },

        /**
         * Setup the headers for the grid, allowing the position to be adjusted
         * if columns are locked
         * @override
         */
        renderHeader: function() {
            this.inherited(arguments);

            if (!this.lockedColumns) {
                return;
            }

            var columnSets = this.columnSets,
                scrollers = this._columnSetScrollers,
                grid = this,
                scrollerNode,
                i;

            function reposition() {
                grid._positionScrollers();
            }

            this._columnSetScrollerContents = {};
            this._columnSetScrollLefts = {};

            if (scrollers) {
                for (i in scrollers) {
                    scrollers[i].parentNode.removeChild(scrollers[i]);
                }
            } else {
                // aspect.after(this, 'resize', reposition, true);
                aspect.after(this, 'styleColumn', reposition, true);
                this._columnSetScrollerNode = scrollerNode = document.createElement('div');
                scrollerNode.classList.add('dgrid-column-set-scroller-container');
                this.footerNode.parentElement.insertBefore(scrollerNode, this.footerNode.nextSibling);
            }

            scrollers = this._columnSetScrollers = {};
            columnSets.forEach(this._putScroller.bind(this));
            this._positionScrollers();
        },

        /**
         * CAlled for each column set
         * @private
         */
        _putScroller: function(columnSet, i) {
            var scroller = this._columnSetScrollers[i] = document.createElement('span'),
                contentNode = document.createElement('div');
            scroller.classList.add('dgrid-column-set-scroller');
            scroller.classList.add('dgrid-column-set-scroller-' + i);
            scroller.setAttribute(colsetidAttr, i);
            this._columnSetScrollerNode.appendChild(scroller);
            contentNode.classList.add('dgrid-column-set-scroller-content');
            scroller.appendChild(contentNode);
            this._columnSetScrollerContents[i] = contentNode;
            on(scroller, 'scroll', this._onColumnSetScroll.bind(this));
        },

        /**
         * Compute a new scrollLeft based on actual resulting value
         * @param {Event} event - the event object
         */
        _onColumnSetScroll: function(event) {
            var scrollLeft = event.target.scrollLeft,
                colSetId = event.target.getAttribute(colsetidAttr),
                newScrollLeft;

            if (this._columnSetScrollLefts[colSetId] !== scrollLeft) {
                Array.prototype.forEach.call(this.domNode.querySelectorAll('.dgrid-column-set[' + colsetidAttr + '="' + colSetId + '"], .dgrid-column-set-scroller[' + colsetidAttr + '="' + colSetId + '"]'), function(element, i) {

                    if (deviceUtils.isHandheld()) {
                        element.style.transform = 'translate3d(-' + scrollLeft + 'px, 0, 0)';
                    } else {
                        element.scrollLeft = scrollLeft;
                    }

                    if (!i) {
                        newScrollLeft = scrollLeft;
                    }
                });
                this._columnSetScrollLefts[colSetId] = newScrollLeft;
            }
        },

        /**
         * position the scrollers, keeping them in sync
         */
        _positionScrollers: function() {
            var domNode = this.domNode,
                scrollers = this._columnSetScrollers,
                scrollerContents = this._columnSetScrollerContents,
                columnSets = this.columnSets,
                scrollerWidth = 0,
                numScrollers = 0, // tracks number of visible scrollers (sets w/ overflow)
                columnSetElement, contentWidth;

            columnSets.forEach(function(subset, i) {
                // iterate through the columnSets

                columnSetElement = domNode.querySelector('.dgrid-column-set[' + colsetidAttr + '="' + i + '"]');
                scrollerWidth = columnSetElement.offsetWidth;
                contentWidth = columnSetElement.firstChild.offsetWidth;
                scrollerContents[i].style.width = contentWidth + 'px';
                scrollers[i].style.width = scrollerWidth + 'px';

                // Keep track of how many scrollbars we're showing
                if (contentWidth > scrollerWidth) {
                    numScrollers++;
                }
            });

            this._columnSetScrollerNode.style.bottom = this.showFooter ? this.footerNode.offsetHeight + 'px' : '0';

            // Align bottom of body node depending on whether there are scrollbars
            this.bodyNode.style.bottom = numScrollers ?
                (has('dom-scrollbar-height') + (has('ie') ? 1 : 0) + 'px') :
                '0';
        },

        /**
         * Callback for setting cell focus on a column. This will scroll the cell into view if it is partially off
         */
        _onColumnSetCellFocus: function(event, columnSetNode) {
            var focusedNode = event.target,
                columnSetId = columnSetNode.getAttribute(colsetidAttr),
                columnScroller = this._columnSetScrollers[columnSetId],
                elementEdge = focusedNode.offsetLeft - columnScroller.scrollLeft + focusedNode.offsetWidth;

            /**
             * This code branch will never get hit unless the test is mocked to the point of being overly brittle
             * and would be better served with a functional test.
             */
            /* istanbul ignore if */
            if (elementEdge > columnSetNode.offsetWidth || columnScroller.scrollLeft > focusedNode.offsetLeft) {
                this._scrollColumnSetTo(columnSetNode, focusedNode.offsetLeft);
            }
        },

        _scrollColumnSetTo: function(columnSetNode, offsetLeft) {
            var id = columnSetNode.getAttribute(colsetidAttr),
                scroller = this._columnSetScrollers[id];

            scroller.scrollLeft = offsetLeft < 0 ? 0 : offsetLeft;
        },

        /**
         * Set and update the table rendering based on how many columns should be locked to the left side.
         */
        _setLockedColumns: function(lockedColumns) {
            if (lockedColumns < 0) {
                lockedColumns = 0;
            }

            this.columnSets = null;
            this._resetColumnSizes();
            this.lockedColumns = lockedColumns;
            this._updateColumns();
            this[lockedColumns ? '_setupColumnSetListeners' : '_removeColumnSetListeners']();
        },

        /**
         * Remove the custom resize rules when restructuring the table
         * @private
         */
        _resetColumnSizes: function() {
            for (var name in this._columnSizes) {
                this._columnSizes[name].remove();
            }

            this._columnSizes = {};
        }
    });
});

/**
 * @external dgrid/extensions/Pagination
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/extensions/Pagination.md
 */

/**
 * @module
 * @class CustomizablePagination
 * @extends dgrid/extensions/Pagination
 * This class extends dgrid's built-in pagination controls and allows for them to
 * be customized
 *
 * This module is automatically mixed into the dgrid instance created in
 * TableBase.factory when a non-virtual table is constructed
 */
define('hui/table/CustomizablePagination',[
    'dojo/string',
    'dgrid/extensions/Pagination',
    'dojo/on',
    'dojo/when',
    'dojo/_base/sniff',
    'xstyle/css!dgrid/css/extensions/Pagination.css'
], function(string, Pagination, on, when) {
    function createButton(props) {
        var node = document.createElement('button');
        node.appendChild(document.createTextNode(props.value));
        node.classList.add(props.className);
        node.classList.add('dgrid-page-link');
        node.setAttribute('aria-label', props.label);
        node.tabIndex = props.tabIndex || 0;
        return node;
    }

    var paginationUpdateNavigation = Pagination.prototype._updateNavigation;

    Pagination.extend({
        /**
         * Indicates how many pages to show
         * @type {Number}
         * @default
         */
        pagingLinks: 0,

        /**
         * Indicates whether or not to show the first and last arrow links.
         * @type {Boolean}
         * @default
         */
        firstLastArrows: true,

        buildRendering: function() {
            this.inherited(arguments);

            var paginationNode = this.paginationNode = document.createElement('div'),
                statusNode = this.paginationStatusNode = document.createElement('div'),
                navigationNode = this.paginationNavigationNode = document.createElement('div'),
                linksNode = this.paginationLinksNode = document.createElement('div'),
                grid = this,
                i18n = this.i18nPagination;

            paginationNode.classList.add('dgrid-pagination');
            this.footerNode.appendChild(paginationNode);

            statusNode.classList.add('dgrid-status');

            navigationNode.classList.add('dgrid-navigation');
            navigationNode.setAttribute('role', 'navigation');
            navigationNode.setAttribute('aria-label', this.paginationAriaLabel);
            paginationNode.appendChild(navigationNode);

            linksNode.classList.add('dgrid-pagination-links');

            statusNode.tabIndex = -1;

            this._updatePaginationSizeSelect();
            this._updateRowsPerPageOption();
            this._updatePaginationStatus(this._total);

            this.paginationFirstNode = createButton({
                className: 'dgrid-first',
                value: this.paginationFirstText,
                label: i18n.gotoFirst
            });
            navigationNode.appendChild(this.paginationFirstNode);

            this.paginationPreviousNode = createButton({
                className: 'dgrid-previous',
                value: this.paginationPreviousText,
                label: i18n.gotoPrev
            });
            navigationNode.appendChild(this.paginationPreviousNode);

            navigationNode.appendChild(statusNode);
            navigationNode.appendChild(linksNode);

            this.paginationNextNode = createButton({
                className: 'dgrid-next',
                value: this.paginationNextText,
                label: i18n.gotoNext
            });
            navigationNode.appendChild(this.paginationNextNode);

            this.paginationLastNode = createButton({
                className: 'dgrid-last',
                value: this.paginationLastText,
                label: i18n.gotoLast
            });
            navigationNode.appendChild(this.paginationLastNode);

            /* istanbul ignore next */
            this._listeners.push(on(navigationNode, '.dgrid-page-link:click,.dgrid-page-link:keydown', function(event) {
                // For keyboard events, only respond to enter
                if (event.type === 'keydown' && event.keyCode !== 13) {
                    return;
                }

                var cls = this.className,
                    curr, max;

                if (grid._isLoading || cls.indexOf('dgrid-page-disabled') > -1) {
                    return;
                }

                curr = grid._currentPage;
                max = Math.ceil(grid._total / grid.rowsPerPage);

                // determine navigation target based on clicked link's class
                if (this === grid.paginationPreviousNode) {
                    grid.gotoPage(curr - 1);
                } else if (this === grid.paginationNextNode) {
                    grid.gotoPage(curr + 1);
                } else if (this === grid.paginationFirstNode) {
                    grid.gotoPage(1);
                } else if (this === grid.paginationLastNode) {
                    grid.gotoPage(max);
                } else if (cls === 'dgrid-page-link') {
                    grid.gotoPage(+this.innerHTML); // the innerHTML has the page number
                }
            }));
            this._paginationButtons = [
                this.paginationFirstNode,
                this.paginationPreviousNode,
                this.paginationNextNode,
                this.paginationLastNode
            ];
        },

        refresh: function(options) {
            options = options || {};
            options.keepCurrentPage = !this._firstRun && this._currentPage && options.keepCurrentPage !== false ? true: options.keepCurrentPage;
            var self = this,
                page = options && options.keepCurrentPage ?
                Math.min(this._currentPage, Math.ceil(this._total / this.rowsPerPage)) || 1 : 1;

            if ((this.keepScrollPosition || options.keepScrollPosition) && (options.keepCurrentPage || this.keepCurrentPage)) {
                this._previousScrollPosition = this.getScrollPosition();
            }
            this.inherited(arguments);

            // Reset to first page and return promise from gotoPage
            return this.gotoPage(page).then(function(results) {
                // Emit on a separate turn to enable event to be used consistently for
                // initial render, regardless of whether the backing store is async
                setTimeout(function() {
                    on.emit(self.domNode, 'dgrid-refresh-complete', {
                        bubbles: true,
                        cancelable: false,
                        grid: self
                    });
                }, 0);

                return results;
            });
        },

        /**
         * Override the original gotoPage method to prevent a warning if the collection doesn't
         * exist on the grid yet
         * @override
         */
        gotoPage: function() {
            if (!this._renderedCollection) {
                // This check is being added here to prevent the console.warn message from appearing
                // when the instance has no store yet. This can occur because of differences in lifecycle
                // between dgrid instances and custom elements.
                return when([]);
            }

            // if we're refreshing the page instead of moving to another, we don't want to clear the selection
            if (this._currentPage !== arguments[0]) {
                this.clearSelection();
            }

            return this.inherited(arguments);
        },

        _updateNavigation: function(total) {
            paginationUpdateNavigation.call(this, total);
            this._paginationButtons.forEach(function(button) {
                button.disabled = button.tabIndex === -1;
                button.removeAttribute('tabindex');
            });
        },

        _updatePaginationStatus: function(total) {
            var count = this.rowsPerPage,
                start = Math.min(total, (this._currentPage - 1) * count + 1);

            this.paginationStatusNode.innerHTML = string.substitute(
                this.paginationText ? this.paginationText : this.i18nPagination.status,
                {
                    start: start,
                    end: Math.min(total, start + count - 1),
                    total: total
                }
            );
        },

        _setPaginationFirstText: function(paginationFirstText) {
            this.paginationFirstText = paginationFirstText;
            this.paginationFirstNode.textContent = paginationFirstText;
        },

        _setPaginationPreviousText: function(paginationPreviousText) {
            this.paginationPreviousText = paginationPreviousText;
            this.paginationPreviousNode.textContent = paginationPreviousText;
        },

        _setPaginationNextText: function(paginationNextText) {
            this.paginationNextText = paginationNextText;
            this.paginationNextNode.textContent = paginationNextText;
        },

        _setPaginationLastText: function(paginationLastText) {
            this.paginationLastText = paginationLastText;
            this.paginationLastNode.textContent = paginationLastText;
        },

        /**
         * Disables and re-enables pagination buttons
         * @param {Boolean} enabled - Flag indicating whether the pagination buttons are to be enabled or disabled
         * @private
         */
        _togglePaginationButtons: function(enabled) {
            [this.paginationFirstNode, this.paginationPreviousNode, this.paginationNextNode, this.paginationLastNode].forEach(function(button) {
                button.disabled = !enabled;
            });
        }
    });

    return Pagination;
});

/**
 * @module
 * @extends dgrid/Tree
 * @class ContentGroups
 * Extends the Tree grid plugin to provide support for content groups by
 * adding logic the display group parent items
 */
define('hui/table/ContentGroups',[
    'dojo/_base/declare',
    'dgrid/Tree',
    'dojo/has',
    'dojo/query',
    'dojo/Deferred',
    'put-selector/put',
    'dojo/has!touch?dgrid/util/touch',
    'dojo/when',
    'dojo/aspect'
], function(declare, Tree, has, querySelector, Deferred, put, touchUtil, when, aspect) {
    return declare(Tree, {
        /**
         * Sets the property to display as the title in content groups rows, and
         * tells the table to keep its scroll position, as this flag getting set means
         * that content groups will most likely be getting expanded.
         * @param {String} categoryProperty - The name of the property that will hold the content
         * group names on store items
         * @private
         */
        _setCategoryProperty: function(categoryProperty) {
            this.categoryProperty = categoryProperty;
            this.keepScrollPosition = true;
        },

        /**
         * Sets the expandAll flag, which causes all content groups to be expanded by default
         * @private
         */
        postCreate: function() {
            this.inherited(arguments);
            var callCategoryTotalSetter = function() {
                this._setCategoryTotals(this.categoryTotals);
            }.bind(this);
            //Wrap hide and show columns in an aspect
            aspect.after(this, '_hideColumn', callCategoryTotalSetter);
            aspect.after(this, '_showColumn', callCategoryTotalSetter);
        },

        _setExpandAll: function(expandAll) {
            if (this.expandAll !== expandAll) {
                this.expandAll = expandAll;
                this.refresh();
            }
        },

        /**
         * Extends the render header method to hide the cell for the category property column in
         * the header as we don't want to display that for most items.
         */
        renderHeader: function() {
            this.inherited(arguments);
            this._hideCategoryCell(this.headerNode);
        },

        /**
         * Exntends the render row method with logic to show only the category column on parent
         * rows, to render parent rows as headers, and to remove the category column from other
         * rows.
         * @param {Object} obj - The store item for which a row is being rendered
         * @returns {HTMLElement} - The rendered row element
         */
        renderRow: function(obj) {
            var row = this.inherited(arguments);

            if (this.categoryProperty) {
                if (obj[this.categoryProperty]) {
                    this._showOnlyCategoryCell(row, obj);
                } else {
                    this._hideCategoryCell(row);
                }
            }
            return row;
        },

        /**
         * Returns whether or not a row should be expanded
         * @param {Boolean} expanded - A boolean indicating whether or not
         * this row has been explicitly expanded by a user.
         * @returns {Boolean} whether or not the row should be treated as being
         * expanded
         */
        shouldExpand: function(expanded) {
            //Don\'t return true for calls from Tree
            if (arguments.length > 1) {
                return false;
            } else {
                return this.expandAll || expanded;
            }
        },
        /**
         * Sets the category totals and renders the appropriate total rows
         * @param {object} categoryTotals An object with keys corresponding to group categories, and values that are objects
         * mapping column fields to total values
         * @private
         */
        _setCategoryTotals: function(categoryTotals) {
            if (!this.categoryProperty) {
                return;
            }
            this.categoryTotals = categoryTotals || {};
            var self = this,
                filter = new this.collection.Filter();
            filter = filter.or.apply(filter, Object.keys(this.categoryTotals).map(function(key) {
                return filter.eq(self.categoryProperty, key);
            }));

            // Map the category total objects by the item's IDs instead of by the category names
            // to make finding the objects crresponding to the totals later easier.
            this.collection.filter(filter).forEach(function(item) {
                var categoryPropertyValue;
                if (self.categoryTotals.hasOwnProperty((categoryPropertyValue = item[self.categoryProperty]))) {
                    self.categoryTotals[item.id] = self.categoryTotals[categoryPropertyValue];
                    delete self.categoryTotals[categoryPropertyValue];
                }
            }).then(function() {
                self.refresh();
            });
        },

        /**
         * Sets the total label and rerenders any category total rows with the new label
         * @private
         */
        _setTotalText: function() {
            this.inherited(arguments);
            this._setCategoryTotals(this.categoryTotals);

        },

        /**
         * Delegates to _renderTotalRow to render a total row with the specified totals for the specified category,
         * and then hides the category cell for the row.
         * @param {object} totals The totals to render, should be a map of column fields to total strings/numbers
         * @param {string} categoryId The ID of the category or group to render a total row for
         * @param {object} beforeNode The row that this is being rendered in
         * @private
         */
        _renderCategoryTotalRow: function(totals, categoryId, beforeNode) {
            var totalRow = this._renderTotalRow(
                totals,
                '_' + categoryId + 'TotalRow',
                beforeNode
            );

            if (totalRow) {
                this._hideCategoryCell(totalRow);
            }
        },

        /**
         * Renders the specified row with the appropriate expando icon
         * and sets a flag indicating whether or not this row is expanded.
         * @param {Boolean} expand - An optional flag indicating whether to expand the row
         * @param {HTMLElement} row - The row that is getting expanded or collapsed
         * @param {HTMLElement} button - The button, if this row was expanded by clicking a button
         * @private
         */
        _showExpanded: function(expand, row, button) {
            var expanded,
                itemId,
                target;

            target = row.element;
            target = target.className.indexOf('dgrid-expando-icon') > -1 ? target :
                querySelector('.dgrid-expando-icon', target)[0];

            // toggle or set expand/collapsed state based on optional 2nd argument
            itemId = this.collection.getIdentity(row.data);
            // This uses == on purpose, to catch null as well as undefined
            expanded = expand == undefined ? !this._expanded[itemId] : expand;//jshint ignore: line

            // update the expando display
            put(target, '.ui-icon-triangle-1-' + (expanded ? 'se' : 'e') +
                '!ui-icon-triangle-1-' + (expanded ? 'e' : 'se'));
            put(row.element, (expanded ? '.' : '!') + 'dgrid-row-expanded');

            if (button) {
                button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            }
            if (expanded) {
                this._expanded[itemId] = true;
            } else {
                this._expanded[itemId] = false;
            }

            return expanded;
        },

        /**
         * Calls _shotExpanded to render the expanded row, and then refreshes
         * the data in the grid so that the appropriate items can be retrieved from
         * the store or server.
         * @param {_Row|Object|String} target - The row item itself, the store item representing the row,
         * or the ID of the row to be expanded
         * @param {Boolean} expand - Optional property overriding the default toggling behavior
         * @param {HTMLElement} button - Optional property passing the row's expando button domnode
         * @param {Boolean} mayHaveChildren - Optional property indicating whether this element is able to have children
         * that can avoid a redundant call to the server
         * @returns {Promise} - A Promise that doesn't have any specific meaning for this implementation, but which
         * is returned to maintain the API contract for expand
         */
        expand: function(target, expand, button, mayHaveChildren) {
            if (!this._treeColumn) {
                return when();
            }
            var tempProperty,
                grid = this,
                row = target.element ? target : this.row(target),
                expanded,
                scrollPosition = this.getScrollPosition(),
                promise,
                dfd,
                refreshListener,
                tempFarOffRemoval;

            mayHaveChildren = mayHaveChildren || (mayHaveChildren !== false &&
                (!this.collection.mayHaveChildren || this.collection.mayHaveChildren(row.data)));
            if (target && mayHaveChildren) {
                expanded = this._showExpanded(expand, row, button);
                tempProperty = this.collapseOnRefresh;
                this.collapseOnRefresh = false;

                // Temporarily store the the far off removal value because
                // it interferes with properly setting the scroll
                tempFarOffRemoval = this.farOffRemoval;
                this.farOffRemoval = Infinity;
                promise = this.refresh();
                if (grid.on && (!promise || !promise.then)) {
                    dfd = new Deferred();
                    promise = dfd.promise;

                    refreshListener = grid.on('dgrid-refresh-complete', function() {
                        dfd.resolve();
                    });
                }

                // Always return a promise
                return when(promise, function() {
                    if (refreshListener) {
                        refreshListener.remove();
                    }
                    if (scrollPosition && grid.gotoPage) {
                        // For paginated grids(that don't have _processScroll)
                        // we need to manually scroll back to our old position
                        grid.scrollTo(scrollPosition);
                    }
                    grid.farOffRemoval = tempFarOffRemoval;
                    grid.collapseOnRefresh = tempProperty;
                    return expanded;
                });
            } else {
                return when();
            }
        },

        _clicked: null,

        /**
         * Takes a column definition and modifies it and adds event listeners for content grouping
         * @param {Column} column - The exising column definition
         * @private
         */
        _configureTreeColumn: function(column) {
            var grid = this,
                colSelector = '.dgrid-content .dgrid-column-' + column.id,
                originalRenderCell = column.renderCell || this._defaultRenderCell;

            this._treeColumn = column;

            if (!grid.collection) {
                throw new Error('dgrid Tree mixin requires a collection to operate.');
            }

            if (typeof column.renderExpando !== 'function') {
                column.renderExpando = this._defaultRenderExpando;
            }

            this._treeColumnListeners.push(
                this.on(column.expandOn || colSelector + ':click,.ha-expando-button:click,.ha-expando-button:keydown',
                    this._onClick.bind(this)
                )
            );

            // Set up the event listener once and use event delegation for better memory use.
            if (has('touch')) {
                // Also listen on double-taps of the cell.
                this._treeColumnListeners.push(this.on(touchUtil.selector(colSelector, touchUtil.dbltap),
                    function() {
                        grid.expand(this);
                    })
                );
            }

            column.renderCell = function(object, value, td, options) {
                grid._renderCell(
                    column,
                    originalRenderCell,
                    object,
                    value,
                    td,
                    options
                );
            };
        },

        /**
         * Wraps the existing cell renderer to add the expando
         * @param {Column} column - The existing column definition
         * @param {Function} originalRenderCell - The original renderCell function for this column
         * @param {Object} object - The data object for this column
         * @param {any} value - The value for this cell
         * @param {HTMLElement} td - The existing td element created for this cell
         * @param {Object} options - Optional parameters
         * @private
         */
        _renderCell: function(column, originalRenderCell, object, value, td, options) {
            var grid = column.grid,
                level = Number(options && options.queryLevel) + 1,
                mayHaveChildren = !grid.collection.mayHaveChildren || grid.collection.mayHaveChildren(object),
                expando, node;

            level = grid._currentLevel = isNaN(level) ? 0 : level;
            expando = column.renderExpando(
                level,
                mayHaveChildren,
                grid._expanded[grid.collection.getIdentity(object)],
                object
            );
            expando.level = level;
            expando.mayHaveChildren = mayHaveChildren;

            node = originalRenderCell.call(column, object, value, td, options);
            if (node && node.nodeType) {
                put(td, expando);
                put(td, node);
            } else {
                td.insertBefore(expando, td.firstChild);
            }
        },

        /**
         * Handles the on click event, expanding the clicked column and focusing the first
         * element in the newly expanded group
         * @param {Event} event - The click event
         * @private
         */
        _onClick: function(event) {
            var row = this.row(event),
                id = row ? row.id : '',
                grid = this,
                mayHaveChildren;
            if ((!this.collection.mayHaveChildren || (mayHaveChildren = this.collection.mayHaveChildren(row ? row.data : null))) &&
                (event.type !== 'keydown' || event.keyCode === 32)) {
                if (event.type === 'keydown' && event.keyCode === 32) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                this.expand(row, null, null, mayHaveChildren).then(function(expanded) {
                        if (expanded && id) {
                            var row = grid.row(id);
                            if (row && row.element && row.element.nextSibling) {
                                row.element.nextSibling.focus();
                            }
                        }
                    }
                );
            }

            // If the expando icon was clicked, update clicked object to prevent
            // potential over-triggering on dblclick (all tested browsers but IE < 9).
            if (event.target.classList.contains('dgrid-expando-icon')) {
                if (this._clicked && this._clicked.id === this.row(event).id) {
                    this._clicked.count++;
                } else {
                    this._clicked = {
                        id: this.row(event).id,
                        count: 1
                    };
                }
            }
        },

        renderQueryResults: function() {
            var self = this,
                results = this.inherited(arguments);
            if (this.categoryTotals) {
                // Render category total rows
                return results.then(function(rows) {
                    var i,
                        lastRow = (rows && rows.length) ? rows[rows.length - 1]: null,
                        previousRowParent,
                        categoryTotal,
                        currentRow,
                        previousRow;
                    for (i = 0; i < rows.length; i++) {
                        previousRow = currentRow;
                        previousRowParent = previousRow && previousRow.data.parent;
                        currentRow = self.row(rows[i]);
                        if (currentRow.data.parent == null && self._expanded[previousRowParent] && //jshint ignore:line
                            (categoryTotal = self.categoryTotals[previousRowParent])) {
                            self._renderCategoryTotalRow(categoryTotal, previousRowParent, currentRow.element);
                        }
                    }

                    if (lastRow && lastRow.rowIndex >= self._total) {
                        currentRow = self.row(lastRow);
                        if (currentRow && (categoryTotal = self.categoryTotals[currentRow.data.parent])) {
                            self._renderCategoryTotalRow(categoryTotal, currentRow.data.parent, self._totalRow || null);
                        }
                    }

                    return rows;
                });
            } else {
                return results;
            }
        },

        /**
         * Extends the inertRow method to render the row as expanded if necessary
         * @returns {HTMLElement} - The rendered row element
         */
        insertRow: function() {
            var rowElement = this.inherited(arguments),
                row = this.row(rowElement),
                expanded = this.shouldExpand(row && this._expanded[row.id]);
            // Auto-expand (shouldExpand) considerations
            if (expanded) {
                this._showExpanded(true, row, rowElement.querySelector('.ha-expando-button'));
            }

            return rowElement; // pass return value through
        },

        /**
         * Extends the expando icon renderer to move the icon to the appropriate
         * side of the row.
         * @returns {HTMLElement} The expando node
         * @private
         */
        _defaultRenderExpando: function() {
            var expandoNode = Tree.prototype._defaultRenderExpando.apply(this, Array.prototype.slice.call(arguments));

            if (expandoNode.style.float === 'left') {
                expandoNode.style.float = 'right';
            } else {
                expandoNode.style.float = 'left';
            }

            return expandoNode;
        },

        /**
         * Hides the category cell in the passed in node
         * @param {HTMLElement} node - The node to hide the category cell in
         * @private
         */
        _hideCategoryCell: function(node) {
            if (this.categoryProperty) {
                Array.prototype.slice.apply(node.getElementsByClassName('field-' + this.categoryProperty)).forEach(function(fieldNode) {
                    fieldNode.classList.add('hidden');
                });
            }
        },

        /**
         * Hides all the cells exepct the category cell in the passed in node
         * @param {HTMLElement} node - The node to hide for which all the cells other than
         * the category cell should be hidden
         * @private
         */
        _showOnlyCategoryCell: function(node) {
            var categoryProperty = this.categoryProperty;
            if (categoryProperty) {
                node.classList.add('category-row');
                Array.prototype.slice.apply(node.querySelectorAll('[class*="field-"]')).forEach(function(fieldNode) {
                    if (fieldNode.classList.contains('field-' + categoryProperty)) {
                        fieldNode.classList.add('category-column');
                        var expandoButton = document.createElement('button'),
                            i,
                            child,
                            ariaLabelSpan = document.createElement('span');
                        expandoButton.classList.add('ha-expando-button');
                        expandoButton.setAttribute('aria-expanded', 'false');
                        expandoButton.setAttribute('tabindex', '0');

                        ariaLabelSpan.classList.add('sr-only');
                        ariaLabelSpan.textContent = 'expand/collapse ' + fieldNode.textContent.trim();

                        for (i = fieldNode.children.length - 1; i >= 0; i--) {
                            child = fieldNode.children[i];
                            fieldNode.removeChild(child);
                            if (child.style.float) {
                                expandoButton.classList.add('ha-expando-' + child.style.float);
                            }
                            expandoButton.insertBefore(child, expandoButton.firstChild);
                        }
                        expandoButton.insertBefore(ariaLabelSpan, expandoButton.firstChild);
                        fieldNode.appendChild(expandoButton);

                    } else {
                        fieldNode.classList.add('hidden');
                    }
                });
            }
        },

        /**
         * Builds an array containing all the IDs of the groups that are currently expanded
         * @returns {Array} - The IDs of the groups that are currently expanded
         * @private
         */
        _getExpanded: function() {
            var expanded = [],
                category;
            for (category in this._expanded) {
                if (this._expanded.hasOwnProperty(category) && (this.expandAll || this._expanded[category])) {
                    expanded.push(category);
                }
            }

            return expanded;
        }
    });
});

/**
 * @external dgrid/extensions/Pagination
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/extensions/Pagination.md
 */

/**
 * @module
 * @class ContentGroupPagination
 * @extends dgrid/extensions/Pagination
 *
 * This module extends dgrid's built-in pagination module to add an
 * additional understanding of content grouping and navigating within
 * the content groups.
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory for non-virtual tables
 */
define('hui/table/ContentGroupPagination',[
    'dojo/_base/declare',
    'dojo/when',
    'put-selector/put',
    './CustomizablePagination',
    './ContentGroups'
], function(declare, when, put, CustomizablePagination, ContentGroups) {

    /**
     * Removes any currently-rendered rows, or noDataMessage
     * @param {Grid} grid - The grid to clean up
     */
    function cleanupContent(grid) {
        if (grid.noDataNode) {
            put(grid.noDataNode, '!');
            delete grid.noDataNode;
        } else {
            grid.cleanup();
        }
        grid.contentNode.innerHTML = '';
    }

    /**
     * Cleans up loading messages on a grid
     * @param {Grid} grid - The grid to clean up
     */
    function cleanupLoading(grid) {
        if (grid.loadingNode) {
            put(grid.loadingNode, '!');
            delete grid.loadingNode;
        } else if (grid._oldPageNodes) {
            // If cleaning up after a load w/ showLoadingMessage: false,
            // be careful to only clean up rows from the old page, not the new one
            for (var id in grid._oldPageNodes) {
                grid.removeRow(grid._oldPageNodes[id]);
            }
            delete grid._oldPageNodes;
        }
        delete grid._isLoading;
    }

    /**
     * Extends pagination to work with content groups
     */
    return declare([CustomizablePagination, ContentGroups], {
        /**
         * Renders divs indicating that no data was available
         * under any expanded groups that have no children.
         * @private
         */
        _renderNoDataDivs: function() {
            var grid = this;
            Array.prototype.map.call(grid.contentNode.getElementsByClassName('category-row'), function(element) {
                return grid.row(element);
            }).forEach(function(row) {
                if (row && grid._expanded[grid.collection.getIdentity(row.data)] &&
                    (row.element.parentNode.lastChild === row.element ||
                    row.element.nextSibling.classList.contains('category-row'))) {
                    var noDataDiv = document.createElement('div');
                    noDataDiv.classList.add('ha-table-no-data');
                    noDataDiv.textContent = 'No Data Available';

                    if (row.element.nextSibling) {
                        row.element.parentNode.insertBefore(noDataDiv, row.element.nextSibling);
                    } else {
                        row.element.parentNode.appendChild(noDataDiv);
                    }
                }
            });
        },

        /**
         * Loads the given page.  Note that page numbers start at 1.
         * @param {Number} page - The number of the page to display
         * @return (Promise} Returns a promise that indicates whether the
         * operation completed successfully or encountered an error
         */
        gotoPage: function(page) {
            var grid = this,
                start = (this._currentPage - 1) * this.rowsPerPage;

            if (!this._renderedCollection) {
                return when([]);
            }

            // if we're refreshing the page instead of moving to another, we don't want to clear the selection
            if (this._currentPage !== arguments[0]) {
                this.clearSelection();
            }

            if (this._renderedCollection.releaseRange) {
                this._renderedCollection.releaseRange(start, start + this.rowsPerPage);
            }

            return this._trackError(function() {
                var count = grid.rowsPerPage,
                    start = (page - 1) * count,
                    options = {
                        start: start,
                        count: count
                    },
                    results,
                    contentNode = grid.contentNode,
                    loadingNode,
                    oldNodes,
                    children,
                    i,
                    len,
                    expanded = grid._getExpanded();

                if (grid.showLoadingMessage) {
                    cleanupContent(grid);
                    loadingNode = grid.loadingNode = put(contentNode, 'div.dgrid-loading[role=alert]');
                    loadingNode.innerHTML = grid.loadingMessage;
                } else {
                    // Reference nodes to be cleared later, rather than now;
                    // iterate manually since IE < 9 doesn't like slicing HTMLCollections
                    grid._oldPageNodes = oldNodes = {};
                    children = contentNode.children;
                    for (i = 0, len = children.length; i < len; i++) {
                        oldNodes[children[i].id] = children[i];
                    }
                }

                // set flag to deactivate pagination event handlers until loaded
                grid._isLoading = true;

                results = grid._renderedCollection.fetchGroupRange ? grid._renderedCollection.fetchGroupRange({
                    start: start,
                    end: start + count,
                    expanded: expanded
                }) : grid._renderedCollection.fetchRange({
                    start: start,
                    end: start + count
                });

                return grid.renderQueryResults(results, null, options).then(function(rows) {
                    cleanupLoading(grid);
                    if (grid._previousScrollPosition) {
                        grid.scrollTo(grid._previousScrollPosition);
                        grid._previousScrollPosition = null;
                    } else {
                        // Reset scroll Y-position now that new page is loaded.
                        grid.scrollTo({y: 0});

                    }

                    if (grid._rows) {
                        grid._rows.min = start;
                        grid._rows.max = start + count - 1;
                    }

                    when(results.totalLength, function(total) {
                        if (!total) {
                            if (grid.noDataNode) {
                                put(grid.noDataNode, '!');
                                delete grid.noDataNode;
                            }
                            // If there are no results, display the no data message.
                            grid.noDataNode = put(grid.contentNode, 'div.dgrid-no-data[role=gridcell]');
                            grid.noDataNode.innerHTML = grid.noDataMessage;
                        }
                        when(results, function(results) {
                            when (results.start, function(start) {
                                // Update status text based on now-current page and total.
                                page = start ? (start - 1) / count + 1 : page;
                                grid._total = total;
                                grid._currentPage = page;
                                grid._rowsOnPage = rows.length;
                                grid._updatePaginationStatus(total);

                                when(results.isLastPage, function(isLastPage) {
                                    if (isLastPage) {
                                        // It's especially important that _updateNavigation is called only
                                        // after renderQueryResults is resolved as well (to prevent jumping).
                                        grid._updateNavigation(total);
                                        grid.paginationNextNode.disabled = grid.paginationLastNode.disabled = true;
                                        grid.paginationNextNode.classList.add('dgrid-page-disabled');
                                        grid.paginationLastNode.classList.add('dgrid-page-disabled');
                                    } else {
                                        grid.paginationNextNode.disabled = grid.paginationLastNode.disabled = false;
                                        grid.paginationNextNode.classList.remove('dgrid-page-disabled');
                                        grid.paginationLastNode.classList.remove('dgrid-page-disabled');
                                        // It's especially important that _updateNavigation is called only
                                        // after renderQueryResults is resolved as well (to prevent jumping).
                                        grid._updateNavigation(total);
                                    }
                                });
                            });
                        });
                    });
                    grid._renderNoDataDivs();
                    return results;
                }, function(error) {
                    cleanupLoading(grid);
                    throw error;
                });
            });
        }
    });
});

/**
 * @external dgrid/OnDemandList
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/core-components/OnDemandList-and-OnDemandGrid.md
 */

/**
 * @module
 * @class OnDemandContentGroups
 * @extends dgrid/OnDemandList
 * This module extends OnDemandList and prpvides additional support for Content Groups
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory for virtual tables
 */
define('hui/table/OnDemandContentGroups',[
    'dojo/_base/declare',
    'dojo/on',
    'dgrid/Grid',
    'dgrid/OnDemandList',
    './ContentGroups'
], function(declare, on, Grid, OnDemandList, ContentGroups) {
    OnDemandList.extend({
        /**
         * Renders divs indicating that no data was available
         * under any expanded groups that have no children.
         * @private
         */
        _renderNoDataDivs: function() {
            var grid = this;
            Array.prototype.map.call(grid.contentNode.getElementsByClassName('category-row'), function(element) {
                return grid.row(element);
            }).forEach(function(row) {
                if (row && grid._expanded[grid.collection.getIdentity(row.data)] &&
                    (row.element.nextSibling.classList.contains('dgrid-preload') ||
                    row.element.nextSibling.classList.contains('category-row'))) {
                    var noDataDiv = document.createElement('div');
                    noDataDiv.classList.add('ha-table-no-data');
                    noDataDiv.textContent = 'No Data Available';

                    row.element.parentNode.insertBefore(noDataDiv, row.element.nextSibling);
                }
            });
        },

        /**
         * Refreshes the grid and renders the appropriate data
         * @param {Object} options - Optional object, supporting the following parameters:
         *  keepScrollPosition: like the keepScrollPosition instance property;
         *  specifying it in the options here will override the instance
         *  property's value for this specific refresh call only.
         * @returns {*}
         */
        refresh: function(options) {
            var self = this,
                keep = (options && options.keepScrollPosition),
                expanded = self._getExpanded();

            // Fall back to instance property if option is not defined
            if (typeof keep === 'undefined') {
                keep = this.keepScrollPosition;
            }

            // Store scroll position to be restored after new total is received
            if (keep && (!this.categoryProperty || expanded.length > 0)) {
                this._previousScrollPosition = this.getScrollPosition();
            }

            this.inherited(arguments);
            if (this._renderedCollection) {
                // render the query

                // renderQuery calls _trackError internally
                return this.renderQuery(function(queryOptions) {
                    if (self._renderedCollection.fetchGroupRange &&
                        Math.abs((queryOptions.start + queryOptions.count) -
                            (self._total ? self._total : 0)) < Object.keys(self._expanded).length) {
                        queryOptions.count += Object.keys(self._expanded).length;
                    }
                    return self._renderedCollection.fetchGroupRange ? self._renderedCollection.fetchGroupRange({
                        start: queryOptions.start,
                        end: queryOptions.start + queryOptions.count,
                        expanded: expanded,
                        virtual: true
                    }) : self._renderedCollection.fetchRange({
                        start: queryOptions.start,
                        end: queryOptions.start + queryOptions.count
                    });
                }).then(function() {
                    // Emit on a separate turn to enable event to be used consistently for
                    // initial render, regardless of whether the backing store is async
                    setTimeout(function() {
                        self._renderNoDataDivs();
                        on.emit(self.domNode, 'dgrid-refresh-complete', {
                            bubbles: true,
                            cancelable: false,
                            grid: self
                        });
                    }, 0);
                });
            }
        }
    });

    /**
     * Extends onDemandList to support content groups
     */
    return declare([Grid, OnDemandList, ContentGroups], {
        /**
         * Handles a scroll event and renders divs indicating that groups
         * have no children.
         * @private
         */
        _processScroll: /* istanbul ignore next */ function() {
            var result;

            if (!this.categoryProperty || this._getExpanded().length > 0) {
                // The scroll event handler may result in rows being added/removed (by OnDemandList), which will
                // result in 'table#_adjustHeight/_calculateInitialHeight' being called and resizing the table.
                // On-the-fly resizing should *not* happen while the user is actively scrolling, so the
                // '_isProcessingScroll' flag is set to prevent that.
                // What happens without this logic: ha-table-virtual will frequently resize during manual scrolling (if
                // the table's collection is an async store).
                this._isProcessingScroll = true;
                result = this.inherited(arguments);

                if (result) {
                    result.then(function() {
                        this._isProcessingScroll = false;
                    });
                } else {
                    setTimeout(function() {
                        this._isProcessingScroll = false;
                    }, /* TODO: tweak value?? */ 100);
                }
            }

            this._renderNoDataDivs();
            this._applyA11yRoles();

            return result;
        }
    });
});

/**
 * @external dgrid/extensions/ColumnHider
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/extensions/ColumnHider.md
 */

/**
 * @module
 * @class ColumnHider
 * @extends dgird/extensions/ColumnHider
 * This module overrides the built in ColumnHider funcitonality in dgrid to
 * allow for the creation of our own custom menu which exists in the tablebar
 * instead of existing in the grid column headers
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/ColumnHider',[
    'dgrid/extensions/ColumnHider'
], function(ColumnHider) {
    ColumnHider.extend({
        postMixInProperties: function() {
            this.inherited(arguments);
            this._columnHiderRules = {};
        },
        /**
         * Prevent the default header method provided by this plugin
         * from running and skip to the next one
         * @override
         */
        renderHeader: function() {
            this._columnHiderCheckboxes = {};
            this._columnHiderRules = {};
            this.inherited(arguments);
        },

        /**
         * Shows or hides the column with the given id
         * This function can be safely removed when upgrading to dgrid 0.4.1+
         * @param {string} id - ID of column to show/hide
         * @param {boolean} hidden - If specified, explicitly sets the hidden state of the specified column. If unspecified, toggles the column from the current state. See issue #1124
         */
        toggleColumnHiddenState: function(id, hidden) {
            if (typeof hidden === 'undefined') {
                hidden = !this._columnHiderRules[id];
            }
            this._updateColumnHiddenState(id, hidden);

            // Since this can be called directly, re-sync the appropriate checkbox.
            if (this._columnHiderCheckboxes[id]) {
                this._columnHiderCheckboxes[id].checked = !hidden;
            }
        }
    });

    return ColumnHider;
});

/**
 * @module
 * @class DnDManager
 * @extends dgrid/dnd/Manager
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/extensions/DnD.md
 * Overrides DnDManager funciontality so that the avatar doesn't jump around when doing drag
 * and drop via keyboard navigation
 * @param {Event} e - The mouse move event
 */
define('hui/table/TableDndSource',[
    'dgrid/extensions/DnD',
    'dojo/dnd/common',
    'dojo/dnd/Manager',
    'dojo/dnd/autoscroll',
    'dojo/dnd/Selector',
    'dojo/_base/declare',
    'dojo/has',
    'dojo/on'
], function(DnD, dnd, DnDManager, autoscroll, Selector, declare, has, on) {
    DnDManager.extend({
        onMouseMove: function(e) {
            if (!this.dragging) {
                var a = this.avatar,
                    s,
                    copy;
                if (a) {
                    autoscroll.autoScrollNodes(e);
                    //autoscroll.autoScroll(e);
                    s = a.node.style;
                    s.left = (e.pageX + this.OFFSET_X) + 'px';
                    s.top = (e.pageY + this.OFFSET_Y) + 'px';
                    copy = Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
                    if (this.copy !== copy) {
                        this._setCopyStatus(copy);
                    }
                }
                if (has('touch')) {
                    // Prevent page from scrolling so that user can drag instead.
                    e.preventDefault();
                }
            }
        }
    });

    return declare(DnD.GridSource.extend({
        /**
         * Applies styling to the DnD source when drag and drop begins, and adds aria
         * attributes for all rows in this grid indicating that they're valid targets
         * for drag and drop.
         * @param {Source} source - The drag and drop source that is being dragged
         */
        onDndStart: function(source) {
            // Listen for start events to apply style change to avatar.
            this.inherited(arguments); // DnDSource.prototype.onDndStart.apply(this, arguments);
            if (source === this) {
                // If TouchScroll is in use, cancel any pending scroll operation.
                if (this.grid.cancelTouchScroll) {
                    this.grid.cancelTouchScroll();
                }

                var avatarNode = DnDManager.manager().avatar.node,
                    header = avatarNode.querySelector('.dojoDndAvatarHeader'),
                    selectedClones = avatarNode.querySelectorAll('.dgrid-selected'),
                    items = avatarNode.querySelectorAll('.dojoDndAvatarItem'),
                    row = this.grid.domNode.querySelector('.dgrid-row');

                // Get rid of inline styles
                if (items) {
                    Array.prototype.forEach.call(items, function(item) {
                        item.style.opacity = '';
                        item.classList.add('ha-table-drag-and-drop');
                    });
                }

                // Set the width to the actual width of rows in the grid
                avatarNode.style.width = row ? row.offsetWidth + 'px': '';

                if (header) {
                    header.parentNode.removeChild(header);
                }

                // Remove selected styling on clone
                if (selectedClones) {
                    Array.prototype.forEach.call(selectedClones, function(selectedClone) {
                        selectedClone.classList.remove('dgrid-selected');
                    });
                }

                if (source.grid.domNode.parentNode.classList.contains('compact')) {
                    avatarNode.classList.add('compact');
                } else if (source.grid.domNode.parentNode.classList.contains('double')) {
                    avatarNode.classList.add('double');
                }

                Array.prototype.forEach.call(
                    source.grid.domNode.querySelectorAll('.dgrid-row'),
                    function(row) {
                        row.setAttribute('aria-dropeffect', 'move');
                    }
                );
            }
        },

        /**
         * Returns the node currently being dragged
         * returns {HTMLElement} The currently selected node
         */
        getSelectedNodes: function() {
            return this.inherited(arguments);
        }
    }), {
        SpaceKeyCode: 32,
        EscapeKeyCode: 27,
        ArrowUpKeyCode: 38,
        ArrowDownKeyCode: 40,
        EnterKeyCode: 13,
        MKeyCode: 77,
        scrollListener: null,
        dragging: false,
        scrollCushion: 50,

        /**
         * An icon to point at the currently targeted row
         * @type {HTMLElement}
         * @private
         */
        _targetIcon: null,

        /**
         * Extends the normal cancel functionality to remove aria attributes
         * from grid rows and to restart the scroll listener
         */
        onDndCancel: function() {
            this.inherited(arguments);
            Array.prototype.forEach.call(
                this.grid.domNode.querySelectorAll('.dgrid-row'),
                function(row) {
                    row.removeAttribute('aria-dropeffect');
                }
            );
            this.dragging = false;
            DnDManager.manager().dragging = false;
            this.scrollListener.resume();
        },

        /**
         * Extends the normal drop functionality to remove aria attributes from
         * grid rows and to restart the scroll listener
         */
        onDndDrop: function() {
            this.inherited(arguments);
            Array.prototype.forEach.call(
                this.grid.domNode.querySelectorAll('.dgrid-row'),
                function(row) {
                    row.removeAttribute('aria-dropeffect');
                }
            );
            this.dragging = false;
            DnDManager.manager().dragging = false;
            this.scrollListener.resume();
        },

        /**
         * Creates the target icon and initializes needed event listeners
         */
        constructor: function() {
            this._targetIcon = document.createElement('div');

            if (this.grid && this.grid.domNode && this.grid.domNode.parentNode) {
                this.grid.domNode.parentNode.appendChild(this._targetIcon);
            }
            this._targetIcon.classList.add('hidden');
            this._targetIcon.classList.add('hi');
            this._targetIcon.classList.add('hi-adjust');
            this._targetIcon.classList.add('drag-and-drop-target-icon');

            this.scrollListener = on.pausable(this.node, 'scroll', this._unmarkTargetAnchor.bind(this));
            this.events.push(
                this.scrollListener,
                on(this.node, '.ha-dnd-button:keydown', this.onKeyDown.bind(this))
            );
        },

        /**
         * Positions the target icon at the appropriate spot next to the currently
         * targeted anchor
         * @param {Boolean} before - Whether or not the item will be dropped before the currently
         * targeted element
         * @param {Boolean} isKeyboardNav - Whether this was triggered by keyboard navigation
         * @private
         */
        _markTargetAnchor: function(before, isKeyboardNav) {
            this.inherited(arguments);

            var avatar,
                boundingRect,
                top;
            if (this.targetAnchor) {
                boundingRect = this.targetAnchor.getBoundingClientRect();
                top = before ? boundingRect.top -12 : boundingRect.bottom - 13;
                this._targetIcon.style.top = (top + (window.scrollY || window.pageYOffset)) + 'px';
                this._targetIcon.style.left = (boundingRect.left - 20) + 'px';

                this._targetIcon.classList.remove('hidden');
                if (isKeyboardNav) {
                    avatar = DnDManager.manager().avatar;
                    avatar.node.style.left = (boundingRect.left + Math.min(this.targetAnchor.offsetWidth / 5, 75)) + 'px';
                    avatar.node.style.top = (boundingRect.bottom + (window.scrollY || window.pageYOffset) + this.targetAnchor.offsetHeight) + 'px';
                }
            }

        },

        /**
         * Hides the target icon
         * @private
         */
        _unmarkTargetAnchor: function() {
            this.inherited(arguments);
            this._targetIcon.classList.add('hidden');
        },

        /**
         * Blocks default mouse over behavior if drag and drop was initiated via keyboard
         */
        onMouseOver: function() {
            if (!this.dragging) {
                this.inherited(arguments);
            }
        },

        /**
         * Blocks default mouse move behavior if drag and drop was initiated via keyboard
         */
        onMouseMove: function() {
            if (!this.dragging) {
                this.inherited(arguments);
            }
        },

        /**
         * Blocks default source over behavior if drag and drop was initiated via keyboard
         */
        onDndSourceOver: function() {
            if (!this.dragging) {
                this.inherited(arguments);
            }
        },

        /**
         * Handles keyDown events, which include arrow keys(used to change the currently selected element during
         * drag and drop), and ctrl + m, which is the recommended key combination for dropping an element
         * during drag and drop.
         * @param {Event} e - The keyDown event
         */
        onKeyDown: function(e) {
            var position = e.target.getBoundingClientRect(),
                clickedUp,
                row,
                newTargetAnchor,
                manager = DnDManager.manager();

            if (this.dragging) {
                row = this.grid.row(this.current || e.target);
                if ((clickedUp = e.keyCode === this.ArrowUpKeyCode) || e.keyCode === this.ArrowDownKeyCode) {
                    e.preventDefault();
                    if (clickedUp) {
                        newTargetAnchor = (row && row.element && row.element.previousSibling) ?
                            row.element.previousSibling : this.current ? this.current.previousSibling : null;
                    } else {
                        newTargetAnchor = (row && row.element && row.element.nextSibling) ?
                            row.element.nextSibling : this.current ? this.current.nextSibling : null;
                    }

                    if (newTargetAnchor && newTargetAnchor.classList.contains('dgrid-row')) {
                        this._unmarkTargetAnchor();
                        if (newTargetAnchor.offsetTop > (this.grid.bodyNode.scrollTop + this.grid.bodyNode.offsetHeight -
                            this.scrollCushion)) {
                            this.grid.scrollTo({
                                y: this.grid.bodyNode.scrollTop + newTargetAnchor.offsetHeight
                            });
                        } else if (newTargetAnchor.offsetTop < this.grid.bodyNode.scrollTop) {
                            this.grid.scrollTo({
                                y: this.grid.bodyNode.scrollTop - newTargetAnchor.offsetHeight
                            });
                        }
                        this.current = newTargetAnchor;
                        this._markTargetAnchor(false, true);
                    }
                } else if ((e.keyCode === this.MKeyCode && e.ctrlKey) ||
                    e.keyCode === this.EnterKeyCode) {
                    manager.canDropFlag = true;
                    manager.onMouseUp(e);
                } else if (e.keyCode === this.EscapeKeyCode) {
                    manager.stopDrag();
                    this.onDndCancel();
                }
            } else {
                row = this.grid.row(e.target);
                if (e.keyCode === this.SpaceKeyCode) {
                    this.current = (row && row.element) ? row.element : e.target;
                    this.dragging = true;
                    DnDManager.manager().dragging = true;
                    this.scrollListener.pause();
                    if (e.target.hasAttribute('aria-grabbed')) {
                        e.target.setAttribute('aria-grabbed', true);
                    }
                    //this.onDndStart(e.target);
                    manager.startDrag(this, [row.element], false);
                    this._lastX = position.left;
                    this._lastY = position.top;
                    Selector.prototype.onMouseDown.call(this, e);

                    this.onDndStart(this, [row.element]);
                    this._markTargetAnchor(false, true);
                }
            }
        }
    });
});

/**
 * @external dgrid/extensions/DnD
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/extensions/DnD.md
 */

/**
 * @module
 * @class RowReordering
 * @extends dgrid/extensions/DnD
 *
 * Adds drag and drop reordering functionality to the table, setting up a
 * custom look and feel for the action
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/RowReordering',[
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dgrid/extensions/DnD',
    './TableDndSource',
    '../core/utils'
], function(declare, lang, DnD, TableDndSource, utils) {
    return declare(DnD, {
        /**
         * Allow drag and drop row reordering
         * @default
         * @type {Boolean}
         */
        allowRowReordering: false,

        /**
         * The name of the row reordering field property
         * @default
         * @type {String}
         */
        rowReorderField: '_rowReorder',

        /**
         * The text rendered for screen rows next to the reorder icon
         * @type {String}
         */
        _reorderIconText: 'Reorder Row',

        /**
         * The Constructor to use for Drag and Drop sources
         * @type {Function}
         */
        dndConstructor: TableDndSource,

        /**
         * Keeps track of whether reordering is temporarily disabled so
         * that if a row is rerendered the drag and drop icon can be
         * properly styled.
         * @type {Boolean}
         */
        dndEnabled: false,

        /**
         * Adds the withHandles flag to Drag and Drop parameters
         * so that only the drag and drop icon will be usable as a handle
         * to drag the row.
         */
        postMixInProperties: function() {
            this.inherited(arguments);
            // ensure dndParams is initialized
            this.dndParams = lang.mixin({ withHandles: true}, this.dndParams);
        },

        _enableDnd: function(dndEnabled) {
            this.dndEnabled = dndEnabled;

            Array.prototype.forEach.call(
                this.domNode.querySelectorAll('.hi-arrange'),
                this._toggleIcon.bind(null, dndEnabled)
            );
        },

        /**
         * Toggles the drag and drop icon styling and functionality
         * between enabled and disabled modes
         * @param {Boolean} enabled - Whether the icon should be enabled
         * @private
         */
        _toggleIcon: function(enabled, iconElement) {
            if (!iconElement) {
                return;
            }
            if (enabled) {
                iconElement.parentNode.setAttribute('aria-grabbed', 'false');
                iconElement.classList.remove('disabled-dnd-handle');
                iconElement.parentNode.parentNode.classList.add('dojoDndHandle');
                iconElement.parentNode.classList.add('ha-dnd-button');
            } else {
                iconElement.parentNode.setAttribute('aria-grabbed', '');
                iconElement.classList.add('disabled-dnd-handle');
                iconElement.parentNode.parentNode.classList.remove('dojoDndHandle');
                iconElement.parentNode.classList.remove('ha-dnd-button');
            }
        },

        /**
         * Sets the accessibility text for the reorder icons and refreshes the table
         * @param {String} reorderIconText - The new value for the reorder icon property
         * @private
         */
        _setReorderIconText: function(reorderIconText) {
            this._reorderIconText = reorderIconText;
            this.refresh();
        },

        /**
         * Disables and re-enables drag and drop icons when batch mode is toggled
         * @param {Boolean} isActive - Flag indicating whether batch mode is active or inactive
         * @private
         */
        _setBatchModeActive: function(isActive) {
            this.inherited(arguments);
            this._enableDnd(!isActive);
        },

        _setEditable: function(isEditable) {
            this.inherited(arguments);
            this._enableDnd(!isEditable);
        },

        /**
         * Extends the basic render row functionality to toggle the drag and drop icon
         * based on whether batch mode is currently enabled
         * @returns {Object} - The created row object
         */
        renderRow: function() {
            var row = this.inherited(arguments);

            this._toggleIcon(this.dndEnabled, row.querySelector('.hi-arrange'));

            return row;
        },

        /**
         * Enable or disable row reordering
         * @param {Boolean} enabled - Whether row reordering should be enabled
         * @private
         */
        _setAllowRowReordering: function(enabled) {
            this.allowRowReordering = enabled;
            this.set('columns', this.table && this.table.originalColumns ?
                utils.clone(this.table.originalColumns, [this]) : this.__columns);
            this._enableDnd(enabled);
        },

        /**
         * Adds the row reordering column if row reordering is enabled
         * @param {Array} columnsArray - The existing array of columns
         * @private
         */
        _addCustomColumn: function(columnsArray) {
            this.inherited(arguments);
            if (this.get('allowRowReordering')) {
                columnsArray.unshift(this._defineRowReorderColumn());
            }
        },

        /**
         * Returns the definition of the row reorder column
         * @returns {Object}
         * @private
         */
        _defineRowReorderColumn: function() {
            var column = {
                field: this.rowReorderField,
                sortable: false,
                unhidable: true
            };

            column.renderCell = this._renderReorderCell.bind(this);

            column.renderHeaderCell = function(th) {
                th.textContent = '';
            };
            return column;
        },

        _renderReorderCell: function() {
            var cell = arguments[2],
                button = document.createElement('button'),
                iconSpan = document.createElement('span'),
                iconTextSpan = document.createElement('span');

            cell.classList.add('dojoDndHandle');

            iconSpan.classList.add('hi-arrange');
            iconSpan.classList.add('hi');
            iconSpan.setAttribute('aria-hidden', true);
            iconTextSpan.textContent = this._reorderIconText;
            iconTextSpan.classList.add('icon-text');
            button.setAttribute('aria-grabbed', false);
            button.classList.add('ha-dnd-button');
            button.appendChild(iconSpan);
            button.appendChild(iconTextSpan);
            cell.appendChild(button);

            cell.addEventListener('pointerdown', this._stopPropagation);
            cell.addEventListener('MSPointerDown', this._stopPropagation);
            cell.addEventListener('click', this._stopPropagation);
            cell.addEventListener('mousedown', this._delegateToDnDMouseDown.bind(this));
        },

        _delegateToDnDMouseDown: function(event) {
            if (this.dndSource && this.dndSource.onMouseDown) {
                this.dndSource.onMouseDown(event);
            }
        },

        _stopPropagation: function(event) {
            event.stopPropagation();
        }
    });
});

/**
 * @module
 * This module adds row deletion capabilities to the dgrid instance
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/RowDeletion',[
    'dojo/_base/declare'
], function(declare) {
    return declare(null, {
        /**
         * Allow row deletion
         * @default
         * @type {Boolean}
         */
        allowRowDeletion: false,

        /**
         * The name of the row delete field property
         * @default
         * @type {String}
         */
        _rowDeletionField: '_rowDelete',

        /**
         * The text rendered for screen rows next to the delete icon
         * @type {String}
         */
        _deletionIconText: 'Delete Row',

        /**
         * The icon to be added to the delete button
         * @type {String}
         */
        _deletionIconClass: 'hi-delete',

        /**
         * Sets the accessibility text for the delete icons and refreshes the table
         * @param {String} deletionIconText - The new value for the delete icon property
         * @private
         */
        _setDeletionIconText: function(deletionIconText) {
            this._deletionIconText = deletionIconText;
            this.refresh();
        },

        /**
         * Sets the deletion icon class for the delete icon and refreshes the table.
         * @param {String} deletionIconClass - The new deletion icon class
         * @private
         */
        _setDeletionIconClass: function(deletionIconClass) {
            this._deletionIconClass = deletionIconClass;
            this.refresh();
        },

        /**
         * Enable or disable row deletion
         * @param {Boolean} enabled - Whether row deletion should be enabled
         * @private
         */
        _setAllowRowDeletion: function(enabled) {
            this.allowRowDeletion = enabled;
            this.set('columns', this.__columns);
        },

        /**
         * Returns columns, using the private property if available,
         * and otherwise delegating to the default getter.
         * @returns {Array | Object} - The column definition for this table
         * @private
         */
        _getColumns: function() {
            return this.__columns || this.inherited(arguments);
        },

        /**
         * Adds the row deletion column if row deletion is enabled
         * @param {Array} columnsArray - The existing array of columns
         * @private
         */
        _addCustomColumn: function(columnsArray) {
            this.inherited(arguments);
            if (this.get('allowRowDeletion')) {
                columnsArray.push(this._defineRowDeletionColumn());
            }
        },

        /**
         * Returns the definition of the row deletion column
         * @returns {Object}
         * @private
         */
        _defineRowDeletionColumn: function() {
            var column = {
                field: this._rowDeletionField,
                sortable: false,
                unhidable: true
            };

            column.renderCell = this._renderDeletionCell.bind(this);

            column.renderHeaderCell = function(th) {
                th.textContent = '';
            };
            return column;
        },

        _clickHandler: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var row = this.row(evt);

            if (row) {
                this._previousScrollPosition = this.getScrollPosition();
                this.collection.remove(row.id);

                if (this.virtual) {
                    // the virtual table doesn't resize on collection updates, so we need
                    // to force it
                    this.refresh();
                }
            }
        },

        _renderDeletionCell: function() {
            var cell = arguments[2],
                button = document.createElement('button'),
                iconSpan = document.createElement('span'),
                iconTextSpan = document.createElement('span');

            iconSpan.classList.add(this._deletionIconClass);
            iconSpan.classList.add('hi');
            iconSpan.setAttribute('aria-hidden', true);
            iconTextSpan.textContent = this._deletionIconText;
            iconTextSpan.classList.add('icon-text');

            button.appendChild(iconSpan);
            button.appendChild(iconTextSpan);
            cell.appendChild(button);

            button.addEventListener('click', this._clickHandler.bind(this));
        }
    });
});

/**
 * @external dgrid/Editor
 * @see https://github.com/SitePen/dgrid/blob/dev-0.4/doc/components/mixins/Editor.md
 */

/**
 * @module
 * @class Editor
 * @extends dgrid/Editor
 * Extends the Editor functionality built into dgrid to support toggling
 * specific columns as editable
 *
* This module is automatically mixed into the dgrid instance created in
* TableBase.factory
 */
define('hui/table/Editor',[
    'dojo/_base/declare',
    'dgrid/Editor',
    'dojo/on'
], function(declare, Editor, on) {
    return declare(Editor.extend({
        /**
         * Creates an editor instance based on column definition properties,
         * and hooks up events.
         * @param {Object} column - the column definition
         * @override
         * @private
         */
        _createEditor: function(column) {
            var editorType = column.editor,
                self = this,
                editor;

            if (!this._hasInputListener) {
                // register one listener at the top level that receives events delegated
                this._hasInputListener = true;
                this.on('change', function(event) {
                    self._handleEditorChange(event, column);
                });
            }

            editor = document.createElement(editorType);
            editor.classList.add('dgrid-input');
            editor.name = column.field;
            editor.tabIndex = isNaN(column.tabIndex) ? -1 : column.tabIndex;
            editor.setAttribute('aria-label', column.label);

            // TODO: will this ever be true for ha-text-field?
            /* istanbul ignore if */
            if (column.autoSelect && editor.select) {
                editor.addEventListener('focus', function() {
                    // setTimeout is needed for always-on editors on WebKit,
                    // otherwise selection is reset immediately afterwards
                    setTimeout(function() {
                        editor.select();
                    }, 0);
                });
            }

            return editor;
        },

        /**
         * Configure the editable columns
         * @return {Array} - the columns array
         * @override
         * @private
         */
        _configColumns: function() {
            var columnArray = this.inherited(arguments);
            this._alwaysOnWidgetColumns = [];
            columnArray.forEach(function(column) {
                if (this.editable && column.editor) {
                    this._configureEditorColumn(column);
                } else {
                    column.renderCell = column._originalRenderCell || column.renderCell;
                }
            }.bind(this));
            return columnArray;
        },

        /**
         * Override the renderCell method for columns that are editable.
         * This method is overwritten from dgrid in order to provide support for setting custom elements
         * such as hui components as the editor types
         * @param {Object} column - the column definition to configure the editor on
         * @override
         * @private
         */
        _configureEditorColumn: function(column) {
            var editor = column.editor,
                self = this,
                editOn = column.editOn,
                originalRenderCell = column.renderCell || this._defaultRenderCell,
                isWidget = typeof editor !== 'string';

            /* istanbul ignore else */
            if (editOn) {
                this._editorInstances[column.id] = this._createSharedEditor(column, originalRenderCell);
            } else if (isWidget) {
                this._alwaysOnWidgetColumns.push(column);
            }

            column._originalRenderCell = column._originalRenderCell || originalRenderCell;

            column.renderCell = editOn ? function(object, value, cell, options) {
                if (!options || !options.alreadyHooked) {
                    self._editorColumnListeners.push(
                        on(cell, editOn, function() {
                            self._activeOptions = options;
                            self.edit(this);
                        })
                    );
                }
            } : function(object, value, cell, options) {
                if (self._isEditable(column.field) && (!column.canEdit || column.canEdit(object, value))) {
                    var cmp = self._createEditor(column);
                    self._showEditor(cmp, column, cell, value);
                    cell[isWidget ? 'widget' : 'input'] = cmp;
                } else {
                    return originalRenderCell.call(column, object, value, cell, options);
                }
            }.bind(this);
        },

        /**
         * This method is overwritten from the dgrid Editor code in order to propoerly support
         * hui components, which currently do not emit their own events, such as ha-text-field
         * @param {Event} event - The event object
         * @param {Object} column - The column definition
         * @override
         * @private
         */
        _handleEditorChange: function(event, column) {
            var target = event.target;

            if ('_dgridLastValue' in target && target.classList.contains('dgrid-input')) {
                this._updatePropertyFromEditor(column || this.cell(target).column, target, event);
            }
        }
    }), {
        /**
         * Setter method for the editable property. When this property is changed,
         * update the table to display the appropriate editable fields based on the configuration.
         * @param {Boolean} editable - the new value for the editable property
         * @private
         */
        _setEditable: function(editable) {
            var oldValue = this.editable;
            this.editable = editable;
            if (typeof this.editableFields === 'undefined') {
                this.editableFields = this.getAvailableEditableFields();
            }
            if (oldValue !== editable) {
                this._configEditMode();
            }
        },

        /**
         * Return the available editable fields, based on the column definition and which
         * definitions provide an 'editor' property.
         * @return {String[]} - the array of field names that are editable
         */
        getAvailableEditableFields: function() {
            var editableFields = [];
            Object.keys(this.columns).forEach(function(id) {
                var column = this.columns[id];
                if (column.editor) {
                    editableFields.push(column.field);
                }
            }.bind(this));

            return editableFields;
        },

        /**
         * The setter method for the editMode property.
         * When this property is changed, this method triggers a table refresh to
         * properly render the editable fields
         * @private
         */
        _setEditMode: function(mode) {
            var oldValue = this.editMode;
            this.editMode = mode;
            if (oldValue !== mode) {
                this._configEditMode();
            }
        },

        /**
         * Determine whether a field is editable by its name.
         * A field is editable if it has defined an editor, and the table's editable property is true,
         * and whether its field name is prevent in the editableFields array when the editMode is 'specific'
         * @param {String} field - the field to check whether it is editable or not
         * @return {Boolean} - whether the field is editable
         * @private
         */
        _isEditable: function(field) {
            return this.editable && this.getAvailableEditableFields().indexOf(field) > -1 && (this.editMode !== 'specific' || (this.editableFields && this.editableFields.indexOf(field) > -1));
        },

        /**
         * Helper method for reconfiguring the table for edit mode, either enabling or disabling it
         * @private
         */
        _configEditMode: function() {
            this.configStructure();
            this.refresh();
        },

        _showEditor: function(cmp, column, cellElement, value) {
            if (column.editorInit) {
                column.editorInit(cmp, value, column);
            }
            return this.inherited(arguments);
        }
    });
});

/**
 * @module
 * @class RowStatusIndicator
 * Add a row status to the rendered row
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/RowStatusIndicator',['dojo/_base/declare'], function(declare) {
    return declare(null, {
        /**
         * Add a row status to the rendered row, if applicable
         * @param {Objet} obj - The object for the corresponding row to be generated
         */
        renderRow: function(obj) {
            var row = this.inherited(arguments),
                status;
            if (this.rowStatus) {
                if (typeof this.rowStatus === 'string') {
                    status = obj[this.rowStatus];
                } else if (typeof this.rowStatus === 'function') {
                    status = this.rowStatus(obj);
                }

                if (status === 'error') {
                    row.classList.remove('success');
                    row.classList.remove('warning');
                    row.classList.add('error');
                } else if (status === 'success') {
                    row.classList.remove('error');
                    row.classList.remove('warning');
                    row.classList.add('success');
                } else if (status === 'warning') {
                    row.classList.remove('error');
                    row.classList.remove('success');
                    row.classList.add('warning');
                } else {
                    row.classList.remove('success');
                    row.classList.remove('error');
                    row.classList.remove('warning');
                }
            }

            return row;
        }
    });
});

/**
 * @module
 * @class RowErrors
 * This mixin provides the ability to set errors on individual rows and
 * provides an API for when to show them
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/RowErrors',[
    'dojo/_base/declare',
    'dojo/_base/lang'
], function(declare, lang) {
    return declare(null, {
        _rowErrors: null,

        postMixInProperties: function() {
            this.inherited(arguments);
            this._rowErrors = {};
        },

        /**
         * Set the default error renderer
         * @param {String|Object|HTMLElement} error - The error to set
         * @param {HTMLElement} rowContent - the row contents to wrap with the error message
         * @return {HTMLElement} - the row element to render
         */
        renderRowError: function(error, rowContent) {
            if (!error) {
                return rowContent;
            }

            var errorDiv = document.createElement('div'),
                alertIconSpan = document.createElement('span'),
                alertContent,
                row = document.createElement('div');

            alertIconSpan.classList.add('hi-circle-alert');
            alertIconSpan.classList.add('hi');

            if (typeof error === 'string') {
                alertContent = document.createElement('span');
                alertContent.textContent = error;
            } else if (error instanceof HTMLElement) {
                alertContent = error;
            }

            errorDiv.appendChild(alertIconSpan);
            if (alertContent) {
                errorDiv.appendChild(alertContent);
            }

            row.classList.add('dgrid-row-alert');
            row.appendChild(errorDiv);
            row.appendChild(rowContent);

            return row;
        },

        /**
         * A wrapper around setErrors
         * @see setErrors
         * @param {_Row} target - the target row to add a message to
         * @param {String} message - the error message to display
         */
        setError: function(target, message) {
            this.setErrors([target], [message]);
        },

        /**
         * Set errors on the given targets
         * @param {_Row[]} targets - the target row to add a message to
         * @param {String[]} errors - the error message to display
         */
        setErrors: function(targets, errors) {
            var i, row, rowId, error, self = this;

            if (targets && errors) {
                for (i = 0; i < targets.length; i++) {
                    row = targets[i] ? this.row(targets[i]) : null;
                    rowId = row ? row.id : null;
                    error = errors[i];
                    if (rowId && error) {
                        this._rowErrors[rowId] = error;
                        this.reRenderRow(row);
                    }
                }
            } else if (targets && typeof targets === 'object') {
                lang.mixin(this._rowErrors, targets);
                Object.keys(targets).forEach(function(rowId) {
                    self.reRenderRow(rowId);
                });
            }
        },

        /**
         * Clear the errors when the selection is cleared
         */
        clearSelection: function() {
            this.clearErrors();
            return this.inherited(arguments);
        },

        /**
         * Remove an error message from a target row
         * @see clearErrors
         * @param {_Row} target - the row to remove the error message from
         */
        clearError: function(target) {
            this.clearErrors([target]);
        },

        /**
         * Clear errros from the targets
         * @param {_Row[]} targets - the rows to remove error messages from
         */
        clearErrors: function(targets) {
            if (!targets) {
                this._rowErrors = {};
                this.refresh({
                    keepCurrentPage: true,
                    keepScrollPosition: true
                });
            } else {
                var rowErrors = this._rowErrors,
                    self = this;
                targets.forEach(function(target) {
                    var row = target ? self.row(target) : null,
                        rowId = row ? row.id : null;
                    if (rowId && rowErrors[rowId]) {
                        rowErrors[rowId] = undefined;
                        self.reRenderRow(row);
                    }
                });
            }
        },

        /**
         * Render the row and any associated error messages if applicable
         * @param {Object} object - the row object to render
         * @return {HTMLElement} - the row element
         */
        renderRow: function(object) {
            var row = this.inherited(arguments),
                error = this._rowErrors[this.collection.getIdentity(object)];

            if (error) {
                return this.renderRowError(error, row);
            }

            return row;
        }
    });
});

/**
 * @external dgrid/Selector
 * @see https://github.com/SitePen/dgrid/blob/v0.4.0/doc/components/mixins/Selector.md
 */

/**
 * @module
 * @class BatchMode
 * @extends dgrid/Selector
 * When batch mode is enabled, this module uses dgrid/selector to add a
 * selector column automatically to the grid, which when selected,
 * will enable batch mode.
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/BatchMode',[
    'dojo/_base/declare',
    'dgrid/Selector',
    '../core/utils',
    '../checkbox'
], function(declare, Selector, utils) {
    return declare(Selector, /** @lends BatchMode# */ {
        /**
         * Prevent the grid from deselecting when the grid is refreshed
         * @type {boolean}
         * @default
         */
        deselectOnRefresh: false,

        /**
         * The name of the batch field property
         * @type {string}
         * @default
        */
        batchField: '_batch',

        /** Returns whether the expansion's visibility should be toggled. If the click event
         * came from an input field, button, or anchor, then it is presumably meant to perform some other action,
         * and the expansion should remain in its current state. Similarly, if the click was inside the batch cell
         * then it should also be ignored. This method assumes that activatorSelector is not being used, as in that case
         * any click within the targeted area should toggle visibility.
         * @param {Event} clickEvent
         * @param {string} batchClass
         * @returns {boolean}
         */
        shouldSelect: function(clickEvent) {
            var select = true;
            if (clickEvent && clickEvent.target) {
                if (clickEvent.target.tagName === 'HA-CHECKBOX' || clickEvent.target.tagName === 'HA-RADIO-BUTTON' ||
                    clickEvent.target.tagName === 'INPUT' || clickEvent.target.tagName === 'BUTTON' ||
                    clickEvent.target.tagName === 'A') {
                    select = false;
                }
                if (!select) {
                    var element = clickEvent.target;

                    while (element) {
                        if (element.tagName === 'HA-TABLE') {
                            break;
                        }

                        if (element.classList.contains('field-' + this.batchField)) {
                            select = true;
                            element = null;
                        } else {
                            element = element.parentElement;
                        }
                    }
                }
            }

            return select;
        },

        /**
         * Whether batch mode is currently enabled, varies independently from
         * allowBatchMode, and only has an effect when allowBatchMode is true.
         *
         * @type {boolean}
         * @default
         */
        batchModeEnabled: true,

        startup: function() {
            if (this._started) {
                return;
            }
            this.set('columns', this.table && this.table.originalColumns ?
                utils.clone(this.table.originalColumns, [this]) : this.get('columns'));
            this.inherited(arguments);
        },

        _setSelectionMode: function(value) {
            this._selectionMode = value;
            return this.inherited(arguments, [(this.allowBatchMode && this.batchModeEnabled) ? this._selectionMode : 'none']);
        },

        /**
         * Disable and re-enables the batch mode selector checkbox
         * @param {Boolean} enabled - Flag indicating whether batchmode is enabled or disabled
         * @private
         */
        _setBatchModeEnabled: function(enabled) {
            this.inherited(arguments);
            Array.prototype.forEach.call(this.domNode.querySelectorAll('.field-_batch ha-checkbox'), function(checkbox) {
                checkbox.disabled = !enabled;
            });
            this.batchModeEnabled = enabled;
            this.set('selectionMode', this._selectionMode);
        },

        _setEditable: function(isEditable) {
            this.inherited(arguments);
            this.set('batchModeEnabled', !isEditable);
        },

        /**
         * Setter for the allowBatchMode property, adds or removes the batch column
         * @param {Boolean} enabled - Whether the batch column should be shown or hidden
         */
        _setAllowBatchMode: function(enabled) {
            this.allowSelectAll = true;
            this.allowBatchMode = enabled;
            this.set('selectionMode', this._selectionMode);
            this.set('columns', this.table && this.table.originalColumns ?
                utils.clone(this.table.originalColumns, [this]) : this.__columns);
        },

        _addCustomColumn: function(columnsArray) {
            this.inherited(arguments);
            if (this.batchModeEnabled && this.allowBatchMode) {
                columnsArray.unshift({ selector: true, field: this.batchField });
            }
            this.inherited(arguments, [columnsArray]);
        },

        /**
         * Prevent header rows from being selectable
         * @param {_Row} row - the row to check
         */
        allowSelect: function(row) {
            return row ? (row.element ? !row.element.classList.contains('category-row') : true) : false;
        },

        /**
         * Convert a columns object literal into an array so the widget can predictably
         * add additional, automated columns, such as batch.
         * @param {Array|Object} columns - the column definition provided by the user
         * @returns {Array}
         * @protected
         */
        _convertColumns: function(columns) {
            if (Array.isArray(columns)) {
                return columns.map(function(column) {
                    // allow the id to be computed
                    column.id = null;
                    return column;
                });
            }

            var columnsArray = Object.keys(columns).map(function(key) {
                var definition = columns[key];
                if (typeof definition === 'string') {
                    return { field: key, label: definition };
                }
                definition.field = key;
                definition.id = null;

                return definition;
            });

            return columnsArray;
        },

        /**
         * Set the value of the select ARIA label for batch actions.
         * Then, call refresh() to make sure the change is applied
         * @param {String} value - the value to set as the label
         */
        _setBatchSelectAriaLabel: function(value) {
            this._batchSelectAriaLabel = value;
            this.refresh();
        },

        /**
         * Set the value of the ARIA label for the batch select all checkbox
         * @param {String} value - the value to set as the label
         */
        _setBatchSelectAllAriaLabel: function(value) {
            this._batchSelectAllAriaLabel = value;
            var ariaLabel = this.domNode && this.domNode.querySelector('.dgrid-header .field-_batch .sr-only');
            if (ariaLabel) {
                ariaLabel.textContent = value;
            }
        },

        _setBatchSelectAllHeaderAriaLabel: function(value) {
            this._batchSelectAllHeaderAriaLabel = value;
            var ariaLabel = this.domNode && this.domNode.querySelector('.dgrid-header th.field-_batch');
            if (ariaLabel) {
                ariaLabel.textContent = value;
            }
        },

        /**
         * The function used to generate the input element for checkboxes
         * @param {Object} column - the column definition
         * @param {Boolean} selected - whetther the selector is currently selected
         * @param {HTMLElement} cell - the cell node
         * @param {Object} object - the current row data
         * @returns {HTMLElement} - the input node that will be used as the selector control
         */
        _defaultRenderSelectorInput: function(column, selected, cell, object) {
            var parent = cell.parentNode,
                grid = column.grid,
                input = cell.input || (cell.input = document.createElement('ha-checkbox'));
            // input.setAttribute('type', 'checkbox');
            cell.appendChild(input);
            (parent && parent.contents ? parent : cell).classList.add('dgrid-selector');
            if (column.tabIndex) {
                input.tabIndex = column.tabIndex;
            }
            input.disabled = grid.collection ? !grid.allowSelect(grid.row(object)) : true;
            input.checked = selected;
            input.setAttribute('aria-checked', selected);
            input.ariaLabel = grid._batchSelectAriaLabel;  // this will add aria-label to child input, see checkbox.js
            return input;
        },

        /**
         * configure the selector column for batch mode
         * @param {Object} column - the column definition
         */
        _configureSelectorColumn: function(column) {
            var selector = column.selector,
                renderSelectorInput;
            this._selectorColumns.push(column);
            this._selectorSingleRow = this._selectorSingleRow || column.selector === 'radio';

            renderSelectorInput = typeof selector === 'function' ?
                selector : this._defaultRenderSelectorInput;

            column.sortable = false;
            column.unhidable = true;
            column.renderCell = function(object, value, cell) {
                var row = object && this.row(object);
                value = row && this.selection[row.id];
                renderSelectorInput(column, !!value, cell, object);

                var input = cell.querySelector('input');
                if (input) {
                    input.setAttribute('aria-label', this._batchSelectAriaLabel);
                }
            }.bind(this);

            column.renderHeaderCell = function(th) {
                column.tabIndex = null;
                var checkbox = column._selectorHeaderCheckbox = renderSelectorInput(column, false, th, {});

                // do not identify this node as a dgrid cell so that the th is not focusable
                // but the checkbox inside is
                th.classList.remove('dgrid-cell');
                th.classList.add('batch-header-cell');
                this._hasSelectorHeaderCheckbox = true;

                th.setAttribute('aria-label', this._batchSelectAllHeaderAriaLabel);
                checkbox.removeAttribute('aria-label');
                checkbox.querySelector('input').setAttribute('aria-label', this._batchSelectAllAriaLabel);
            }.bind(this);
        },

        /**
         * callback that is executed when a row selector is clicked.
         * This override prevents the spacebar from duplicating the event
         * @override
         */
        _handleSelectorClick: function(event) {
            if (event.keyCode !== /*SPACE*/32) {
                return this.inherited(arguments);
            }
        },

        _handleSelect: function(event) {
            if (this.shouldSelect(event)) {
                return this.inherited(arguments);
            }
        }
    });
});

/**
 * @module
 * @class PersistentSort
 * Save information on table sorting to localstorage
 *
 * This module is automatically mixed into the dgrid instance
 * created in TableBase.factory
 */
define('hui/table/PersistentSort',[
    'dojo/_base/declare'
], function(declare) {

    return declare(null, {
        postMixInProperties: function() {
            this.inherited(arguments);
            this._loadLastSort();
        },

        /**
         * Save the last sort to localstorage
         * @protected
         */
        _saveLastSort: function() {
            if (this.userId && this.persistentId && window.localStorage && this.sort && this.sort.length) {
                window.localStorage.setItem(this.userId + this.persistentId, JSON.stringify(this.sort));
            }
        },

        /**
         * load the last sort from localstorage
         * @protected
         */
        _loadLastSort: function() {
            var lastSort;
            if (this.userId && this.persistentId && window.localStorage) {
                try {
                    if ((lastSort = JSON.parse(window.localStorage.getItem(this.userId + this.persistentId)))) {
                        this.set('sort', lastSort);
                    }
                } catch (ignore) {
                    //Do nothing
                }
            }

            return Boolean(lastSort);
        },

        /**
         * set the current sort and save it to localstorage
         * @override
         */
        _setSort: function() {
            this.inherited(arguments);
            this._saveLastSort();
        },

        _setUserId: function(userId) {
            this.userId = userId;
            if (!this._loadLastSort()) {
                this._saveLastSort();
            }
        },

        _setPersistentId: function(persistentId) {
            this.persistentId = persistentId;
            if (!this._loadLastSort()) {
                this._saveLastSort();
            }
        }
    });
});

/**
 * @module
 * @class DefaultRenderer
 * This is the default renderer factory class, created to be an extension point
 * for other renderers to be based on
 */
define('hui/table/DefaultRenderer',[
    'object-utils/classes'
], function(classes) {
    return classes.extend(Object, {

        /**
         * Do any setup for this renderer(not for the table)
         * Any properties on this.tableConfig will be set on the table when this
         * renderer is activated, and defaults will be restored when this render mode is
         * removed. Additionally, this.columns, if it is defined, will be set as the column def for the table while this renderer is
         * active.
         *
         * @param {Object} tableConfig
         */
        constructor: function(tableConfig) {
            this.tableConfig = tableConfig || {};
        },

        /**
         * Render a row, given the data object for the row, any options passed to the table's render row method,
         * and the defaultRender function. Note that Table can chain multiple render modes together. In this case the
         * result of the defaultRender will wrap the previous render modes row method, in which case it may call its
         * own defaultRender method, delegating to the previous renderer or the table's renderRow method, or it might
         * create its own dom. The HATable instance can be accessed as this.table
         * @param {Object} object - The item that this row represents
         * @param {Object} options - The options passed to the table's row render method
         * @param {Function} defaultRender - The table's original render method, or the row method of the previous renderer
         *
         * @returns {Element}
         */
        row: function(object, options, defaultRender) {
            return defaultRender();
        },

        /**
         * Render the grid header. Note that generally, the header will have already been rendered when the table
         * was created. If there is an existing header node, it can be accessed as shown in the default implementation.
         * As with renderRow, defaultRender may point to the table's renderHeader method or the previous renderer's
         * header method.
         * @param {Function} defaultRender
         * @returns {Element|*}
         */
        header: function(defaultRender) {
            defaultRender();
            if (this.table) {
                return this.table.querySelector('.ha-table-header');
            }
        },

        /**
         * Use this method to do any setup specific to this render mode that requires access to the table. As in the
         * other methods, the table can be accessed as this.table. Note that any properties of this.tableConfig, and
         * this.columns will automatically be applied to the table, and cleaned up later. For configuration of table
         * properties or columns it is therefore best to use those properties, initializing them in the constructor or
         * at the time of creation of the object. Any setup that can't be captured by those properties should be done here.
         */
        setup: function() {
            // Just an extension point
        },

        /**
         * Cleanup anything that was setup in setup. Note that properties in this.tableConfig, and columns defs changed
         * via this.columns will automatically be restored to their previous values, so only additional configuration
         * or listeners need to be cleaned up here.
         */
        cleanup: function() {
            // Just an extension point
        }
    });
});

/**
 * @module
 * A factory module for creating renderer factories.
 */
define('hui/table/rendererFactoryFactory',[
    '../core/utils',
    'object-utils/classes',
    './DefaultRenderer'
], function(utils, classes, DefaultRenderer) {
    return function(renderers) {
        renderers = renderers || {};
        renderers.default = [new DefaultRenderer()];
        Object.keys(renderers).forEach(function(key) {
            if (renderers[key] && !Array.isArray(renderers[key])) {
                renderers[key] = [renderers[key]];
            }
        });

        var rendererFactory = function(mode, type, table) {
            var currentRenderers,
                config,
                key;
            currentRenderers = renderers[mode] || renderers.default;
            currentRenderers.forEach(function(renderer) {
                renderer.table = table.table;
            });
            if (type === 'columns') {
                if (!renderers.default.columns) {
                    renderers.default.columns = table.table.originalColumns;
                }

                // Return a single column definition. Column definitions might be arrays or objects,
                // and might not merge cleanly, so the last definition wins.
                return utils.clone(currentRenderers.reduce(function(columns, renderer) {
                    return renderer.columns || columns;
                }, renderers.default.columns), [table]);
            } else if (type === 'tableConfig') {
                renderers.default.tableConfig =
                    renderers.default.tableConfig || {};
                config = currentRenderers.reduce(function(prev, next) {
                    if (next.tableConfig) {
                        return utils.mixin(prev || {}, next.tableConfig);
                    } else {
                        return prev;
                    }
                }, null);
                if (config) {
                    for (key in config) {
                        if (!renderers.default.tableConfig.hasOwnProperty(key)) {
                            renderers.default.tableConfig[key] = table.get(key);
                        }
                    }
                    config = utils.mixin({}, renderers.default.tableConfig, config);
                } else {
                    config = renderers.default.tableConfig;
                }

                return config;
            } else if (type === 'header') {
                return function(defaultRenderHeader) {
                    var renderHeader = (currentRenderers.reduce(function(renderHeader, renderer) {
                        if (renderer.header) {
                            return renderer.header.bind(renderer, renderHeader);
                        } else {
                            return renderHeader;
                        }
                    }, defaultRenderHeader));
                    if (renderHeader === defaultRenderHeader) {
                        return renderers.default[0].header(defaultRenderHeader);
                    } else {
                        return renderHeader();
                    }
                };
            } else if (type === 'row') {
                return function(object, options, defaultRender) {
                    var renderRow = (currentRenderers.reduce(function(renderRow, renderer) {
                        if (renderer.row) {
                            return renderer.row.bind(renderer, object, options, renderRow);
                        } else {
                            return renderRow;
                        }
                    }, defaultRender));

                    if (renderRow === defaultRender) {
                        return renderers.default[0].row(object, options, defaultRender);
                    } else {
                        return renderRow();
                    }
                };
            } else {
                return function(table) {
                    var customFunctionCalled = false;
                    currentRenderers.forEach(function(renderer) {
                        if (renderer[type]) {
                            renderer[type](table);
                            customFunctionCalled = true;
                        }
                    });

                    if (!customFunctionCalled && renderers.default[type]) {
                        renderers.default[type](table);
                    }
                };
            }
        };
        rendererFactory.addRenderMode = function(name) {
            var tempDefaults = {
                columns: renderers.default.columns,
                tableConfig: renderers.default.tableConfig
            };
            renderers[name] = Array.prototype.slice.call(arguments, 1);
            if (name === 'default') {
                utils.mixin(renderers.default, tempDefaults);
            }
        };

        rendererFactory.removeRenderMode = function(name) {
            delete renderers[name];
            if (name === 'default') {
                renderers.default = [new DefaultRenderer()];
            }
        };

        rendererFactory.resetConfig = function(table) {
            renderers.default.columns = table.table.originalColumns;
            var key;
            renderers.default.tableConfig = renderers.default.tableConfig || {};
            for (key in renderers.default.tableConfig) {
                renderers.default.tableConfig[key] = table.get(key);
            }
        };
        return rendererFactory;
    };
});

/**
 * @module
 * @class ScopeListStyles
 * @extends dgrid/list
 * Extends List to add styling for scrollbars
 */
define('hui/table/scopeListStyles',[
    'dojo/has',
    'dgrid/Grid',
    'dgrid/List',
    'dgrid/util/misc'
], function(has, Grid, List, miscUtil) {
    var scrollbarWidth,
        scrollbarHeight;
    List.extend({
        resize: function() {
            var bodyNode = this.bodyNode,
                headerNode = this.headerNode,
                footerNode = this.footerNode,
                headerHeight = headerNode.offsetHeight,
                footerHeight = this.showFooter ? footerNode.offsetHeight : 0;

            this.headerScrollNode.style.height = bodyNode.style.marginTop = headerHeight + 'px';
            bodyNode.style.marginBottom = footerHeight + 'px';

            if (!scrollbarWidth) {
                // Measure the browser's scrollbar width using a DIV we'll delete right away
                scrollbarWidth = has('dom-scrollbar-width');
                scrollbarHeight = has('dom-scrollbar-height');

                // Avoid issues with certain widgets inside in IE7, and
                // ColumnSet scroll issues with all supported IE versions
                if (has('ie')) {
                    scrollbarWidth++;
                    scrollbarHeight++;
                }

                // add rules that can be used where scrollbar width/height is needed
                miscUtil.addCssRule('ha-table .dgrid-scrollbar-width', 'width: ' + scrollbarWidth + 'px');
                miscUtil.addCssRule('ha-table-virtual .dgrid-scrollbar-width', 'width: ' + scrollbarWidth + 'px');
                miscUtil.addCssRule('ha-table .dgrid-scrollbar-height', 'height: ' + scrollbarHeight + 'px');
                miscUtil.addCssRule('ha-table-virtual .dgrid-scrollbar-height', 'height: ' + scrollbarHeight + 'px');

                // for modern browsers, we can perform a one-time operation which adds
                // a rule to account for scrollbar width in all grid headers.
                miscUtil.addCssRule('ha-table .dgrid-header-row', 'right: ' + scrollbarWidth + 'px');
                miscUtil.addCssRule('ha-table-virtual .dgrid-header-row', 'right: ' + scrollbarWidth + 'px');
                // add another for RTL grids
                miscUtil.addCssRule('ha-table .dgrid-rtl-swap .dgrid-header-row', 'left: ' + scrollbarWidth + 'px');
                miscUtil.addCssRule('ha-table-virtual .dgrid-rtl-swap .dgrid-header-row', 'left: ' + scrollbarWidth + 'px');
            }
        }
    });
});

/**
 * @module
 * @class TableBase
 * The main dgrid extension, whcih manages constructing the dgrid instance used
 * by ha-table and mixes in all appropriate mixins to the instance. This file is
 * also a catch-all for any miscellaneous functionality and extensions that don't
 * fit into the other dgrid mixins or are too small to exist on their own
 */
define('hui/table/TableBase',[
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/when',
    'dojo/on',
    'dojo/aspect',
    'dgrid/Grid',
    'dgrid/Keyboard',
    './ColumnLocking',
    './ContentGroupPagination',
    './OnDemandContentGroups',
    'dgrid/extensions/ColumnResizer',
    './ColumnHider',
    './RowReordering',
    './RowDeletion',
    './Editor',
    './RowStatusIndicator',
    './RowErrors',
    './BatchMode',
    './PersistentSort',
    './rendererFactoryFactory',
    '../core/deviceUtils',
    './scopeListStyles'
], function(declare, lang, when, on, aspect, Grid, Keyboard, ColumnLocking, Pagination, OnDemandContentGroups,
            ColumnResizer, ColumnHider, RowReordering, RowDeletion, Editor,  RowStatusIndicator, RowErrors,
            BatchMode, PersistentSort, rendererFactoryFactory, deviceUtils) {

    function appendIfNode(parent, subNode) {
        if (subNode && subNode.nodeType) {
            parent.appendChild(subNode);
        }
    }

    function captureStylesAndReposition(table) {
        var parentElement = table.domNode && table.domNode.parentElement && table.domNode.parentElement.parentElement,
            parentBoundingRect = parentElement && parentElement.getBoundingClientRect();
        if (!parentElement || table._oldParentStyles) {
            return;
        }

        if (!parentBoundingRect.width || !parentBoundingRect.height) {
            table._oldParentStyles = {
                position: parentElement.style.position,
                left: parentElement.style.left,
                top: parentElement.style.top,
                display: parentElement.style.display,
                width: parentElement.style.width,
                height: parentElement.style.height
            };

            table._resizedParentElement = parentElement;
            parentElement.style.position = 'absolute';
            parentElement.style.left = '-5000px';
            parentElement.style.top = '-5000px';
            parentElement.style.display = 'inline-block';
            parentElement.style.width = '2000px';
            parentElement.style.height = '20000px';
        }
    }

    function setupSortListeners(grid) {
        grid.on('dgrid-sort', function(event) {
            var sort = event.sort[0],
                field = sort ? sort.property : '',
                descending = sort ? sort.descending : false,
                columns = grid.columns || [],
                comparator;

            for (var i = 0; i < columns.length; ++i) {
                if (columns[i].field === field) {
                    comparator = columns[i].comparator;
                    break;
                }
            }

            if (typeof comparator === 'function') {
                event.preventDefault();
                grid.set('sort', function(a, b) {
                    return (descending ? -1 : 1) * comparator.call(grid, a, b);
                });
                grid.updateSortArrow(event.sort, true);
            }
        });
    }

    Grid.extend({
        /**
         * Override the renderRow method, allowing for the checking of a
         * renderPrintCell method if it exists on the column definition
         * @override
         */
        renderRow: function(object, options) {
            var div,
            row = this.createRowCells('td', function(td, column) {
                var data = object;
                // Support get function or field property (similar to DataGrid)
                if (column.get) {
                    data = column.get(object);
                } else if ('field' in column && column.field !== '_item') {
                    data = data[column.field];
                }

                if (this.print && column.renderPrintCell) {
                    appendIfNode(td, column.renderPrintCell(object, data, td, options));
                } else if (column.renderCell) {
                    // A column can provide a renderCell method to do its own DOM manipulation,
                    // event handling, etc.
                    appendIfNode(td, column.renderCell(object, data, td, options));
                } else {
                    this._defaultRenderCell.call(column, object, data, td, options);
                }
            }.bind(this), options && options.subRows, object);
            // row gets a wrapper div for a couple reasons:
            // 1. So that one can set a fixed height on rows (heights can't be set on <table>'s AFAICT)
            // 2. So that outline style can be set on a row when it is focused,
            // and Safari's outline style is broken on <table>
            div = document.createElement('div');
            div.setAttribute('role', 'row');
            div.appendChild(row);
            return div;
        },

        configStructure: function() {
            // configure the columns and subRows
            var subRows = this.subRows,
                columns = this._columns = this.columns;

            // Reset this.columns unless it was already passed in as an object
            this.columns = !columns ? {} : columns;

            if (subRows) {
                // Process subrows, which will in turn populate the this.columns object
                for (var i = 0; i < subRows.length; i++) {
                    subRows[i] = this._configColumns(i + '-', subRows[i]);
                }
            } else {
                this.subRows = [this._configColumns('', columns)];
            }
        }
    });

    var TableBase = declare(null, {
        rendererFactory: null,

        _firstRun: true,

        _totalRowClickListener: null,
        _totalRow: null,

        postMixInProperties: function() {
            this.inherited(arguments);

            if (this.totals) {
                this.set('totals', this.totals);
            }
        },

        buildRendering: function() {
            this.inherited(arguments);
            this.headerNode.classList.add('ha-table-header');
            this.contentNode.removeAttribute('role');
        },

        /**
         * Sets the totals for the table and then renders a total row
         * @param {object} totals The totals object, which maps column fields to totals
         * @private
         */
        _setTotals: function(totals) {
            this.totals = totals;

            this._renderTotalRow(totals, '_totalRow');
        },

        postCreate: function() {
            this.inherited(arguments);
            // catch and rethrow select/deselect/refresh-complete without the
            // 'dgrid-" prefix
            this.on([
                'dgrid-select',
                'dgrid-deselect',
                'dgrid-refresh-complete',
                'dgrid-error',
                'dgrid-cellfocusin',
                'dgrid-cellfocusout',
                'dgrid-sort',
                'dgrid-columnresize',
                'dgrid-columnreorder',
                'dgrid-columnstatechange',
                'dgrid-datachange',
                'dgrid-editor-show',
                'dgrid-editor-hide'
            ].join(','), function(event) {
                var type = event.type.substr(6);
                if (type === 'deselect' || type === 'select') {
                    // prefix with batch- for selection so the event is not confused
                    // with a select event on a component in the table bar
                    type = 'batch-' + type;
                }
                event.stopPropagation();
                on.emit(this.domNode, type, event);
            }.bind(this));

            var callRenderTotalRow = function() {
                this._renderTotalRow(this.totals, '_totalRow');
            }.bind(this);
            this._listeners.push(
                aspect.after(this, 'renderArray', function(rows) {
                    this.contentNode.removeAttribute('tabIndex');
                    return rows;
                }),
                aspect.after(this, 'renderQuery', function(result) {
                    this._applyA11yRoles();

                    return result;
                }),
                aspect.after(this, '_hideColumn', callRenderTotalRow),
                aspect.after(this, '_showColumn', callRenderTotalRow),
                aspect.after(this, '_processScroll', this._publishResizeEvent.bind(this)),
                aspect.after(this, '_updateNavigation', this._publishResizeEvent.bind(this)),
                aspect.around(this, 'renderHeader', function(renderHeader) {
                    return function() {
                        var self = this,
                            args = arguments;
                        if (this.rendererFactory) {
                            return this.rendererFactory(this.renderMode, 'header', this)(function() {
                                return renderHeader.apply(self, args);
                            });
                        } else {
                            return renderHeader.call(this);
                        }
                    };
                }),
                aspect.around(this, 'renderRow', function(renderRow) {
                    return function(object, options) {
                        var args = arguments, // Array.prototype.slice.call(arguments),
                            self = this;
                        if (this.rendererFactory) {
                            return this.rendererFactory(this.renderMode, 'row', this)(object, options, function() {
                                return renderRow.apply(self, args);
                            });
                        }

                        return renderRow.apply(this, args);
                    };
                })
            );

            setupSortListeners(this);
            this.rendererFactory = this.rendererFactory || rendererFactoryFactory();
        },

        cleanup: function() {
            this._cleanup = true;
            this.inherited(arguments);
            this._cleanup = false;
        },

        _publishResizeEvent: function() {
            on.emit(this.domNode, 'table-resize', {
                cancelable: false,
                bubbles: true
            });
        },

        addRenderMode: function() {
            var args = Array.prototype.slice.call(arguments, 0);

            if (this.rendererFactory) {
                this.rendererFactory.addRenderMode.apply(this.rendererFactory, args);
            } else {
                this.rendererFactory = rendererFactoryFactory();
                this.rendererFactory.addRenderMode.apply(this.rendererFactory, args);
            }
        },

        removeRenderMode: function(name) {
            if (this.rendererFactory) {
                this.rendererFactory.removeRenderMode(name);
            }
        },

        /**
         * Generage the original row and then add a presentation role
         * to each TR node in the row
         * @return {HTMLElement} - the row element
         */
        createRowCells: function() {
            var row = this.inherited(arguments);
            Array.prototype.forEach.call(row.querySelectorAll('tr'), function(tr) {
                tr.setAttribute('role', 'presentation');
            });
            return row;
        },

        _setSort: function() {
            this._sortCalled = true;
            this.inherited(arguments);
            this._setSortA11yAttributes();
        },

        _setSortA11yAttributes: function() {
            if (!this.columns.length || !this.sort.length) {
                return;
            }

            var sortedFields = {};

            if (this.sort.forEach) {
                this.sort.forEach(function(sortOptions) {
                    sortedFields[sortOptions.property] = sortOptions.descending ? 'descending' : 'ascending';
                });
            }

            this.columns.forEach(function(column) {
                if (column.field in sortedFields) {
                    column.headerNode.setAttribute('aria-sort', sortedFields[column.field]);
                } else if (column.headerNode.classList.contains('dgrid-sortable')) {
                    column.headerNode.setAttribute('aria-sort', 'none');
                } else if (column.headerNode.hasAttribute('aria-sort')) {
                    column.headerNode.removeAttribute('aria-sort');
                }
            });
        },

        /**
         * Refresh the grid, but only if it's already been started
         * @override
         */
        refresh: function() {
            if (!this._started) {
                // if the grid hasn't been started... don't do any refreshing
                return;
            }

            captureStylesAndReposition(this);
            return this.inherited(arguments);
        },

        resetParentStyles: function() {
            var key;
            if (this._resizedParentElement) {
                for (key in this._oldParentStyles) {
                    this._resizedParentElement.style[key] = this._oldParentStyles[key];
                }

                this._oldParentStyles = null;
                this._resizedParentElement = null;
            }
        },

        /**
         * Rerender a row without rerendering the entire grid
         * @param {Object} target - the target row to rerender
         * @param {Object} [options] - The options associated with the row
         */
        reRenderRow: function(target, options) {
            options = options || {};
            var row = this.row(target);
            if (row && row.element) {
                options.rows = this._rows;
                var parent = row.element.parentElement,
                    beforeNode = row.element.nextSibling;
                this.removeRow(row.element);
                this.insertRow(row.data, parent, beforeNode, row.element.rowIndex, options);
            }
        },

        /**
         * toggle a compact class on the top level noode
         * @param {Boolean} compact - whether to enable compact mode
         */
        _setCompact: function(compact) {
            this.compact = compact;
            if (this.compact) {
                this.domNode.classList.add('compact');
            } else {
                this.domNode.classList.remove('compact');
            }
        },

        /**
         * toggle the autoheight class on the table, allowing it to grow or shrink
         * depending on the data
         * @param {Boolean} value - the value to set to autoheight
         */
        _setAutoheight: function(value) {
            this.domNode.classList[value ? 'add' : 'remove']('dgrid-autoheight');
        },

        startup: function() {
            // add a _firstRun property to detect initial loading of the grid
            // This allows us to make assumptions about the state of the grid
            // to increase performance.
            this.inherited(arguments);
            this._firstRun = false;
        },

        /**
         * Override the original scrollTo to prevent functionality
         * on the first run, improving startup performance while assuming
         * that the node is already scrolled to the top and left
         * @override
         */
        scrollTo: function() {
            if (!this._firstRun) {
                return this.inherited(arguments);
            }
        },

        /**
         * Set the render mode and refresh the grid
         * @param {String} name - the name of the render mode to switch to
         */
        _setRenderMode: function(name) {
            if (this.rendererFactory && name !== this.renderMode) {
                this.rendererFactory(this.renderMode, 'cleanup', this)(this);

                this.renderMode = name;
                this._pauseRendering();
                this.set('columns', this.rendererFactory(this.renderMode, 'columns', this));
                this.set(this.rendererFactory(this.renderMode, 'tableConfig', this));
                this.rendererFactory(this.renderMode, 'setup', this)(this);
                this._resumeRendering();
                this.refresh();
            }
        },

        /**
         * Temporarily disables any rendering functions, and prevents refreshing. This is helpful for preventing errors
         * that might happen in situations such as refreshing after setting columsn from a new render mode but before
         * setup is called and performs the necessary configuration. It also helps reduce unnecessary rendering in
         * those types of situations.
         * @private
         */
        _pauseRendering: function() {
            this._pausedRefresh = this.refresh;
            this.refresh = function() {};
            this._pausedRenderArray = this.renderArray;
            this.renderArray = function() {
                return this._rows;
            };
            this._pausedRenderHeader = this.renderHeader;
            this.renderHeader = function() {};
        },

        /**
         * Resume paused renderers
         * @private
         */
        _resumeRendering: function() {
            if (this._pausedRefresh) {
                this.refresh = this._pausedRefresh;
                this._pausedRefresh = null;
            }

            if (this._pausedRenderArray) {
                this.renderArray = this._pausedRenderArray;
                this._pausedRenderArray = null;
            }

            if (this._pausedRenderHeader) {
                this.renderHeader = this._pausedRenderHeader;
                this._pausedRenderHeader = null;
            }
        },

        _setRendererFactory: function(rendererFactory) {
            this.rendererFactory = rendererFactory;
            // TODO - Add default renderers here until registry is removed
        },

        /**
         * Return a row object containing, adding a flagNode and contentNode property
         * @override
         * @return {_Row} - the row object for the specified row
         */
        row: function() {
            var row = this.inherited(arguments);
            if (row && row.element) {
                row.flagNode = row.element.querySelector('.table-row-flag');
                row.contentNode = row.element.querySelector('.table-row-content');
            }

            return row;
        },

        /**
         * Correct the size of the header scroll node on resize
         * @override
         */
        resize: function() {
            captureStylesAndReposition(this);
            this.inherited(arguments);
            if (this.headerScrollNode) {
                this.headerScrollNode.style.height = '';
            }
            this._publishResizeEvent();
        },

        /**
         * Overrides render header to provide a custom sort function that
         * removes sorting every third click, so that sorting can
         * be disabled by the user, and then calls the current render mode's
         * header formatter if one is provided.
         * @override
         */
        renderHeader: function() {
            this.inherited(arguments);

            var headerRow = this.headerNode.firstChild,
                headerRows = this.subRows.headerRows || this.subRows;

            headerRows.forEach(function(headerRow) {
                headerRow.forEach(function(headerCell) {
                    if (headerCell.headerNode.classList.contains('dgrid-sortable')) {
                        headerCell.headerNode.setAttribute('aria-sort', 'none');
                    }
                });
            });

            // Mobile devices have column sorting in the 'settings' pane, so disable sorting by
            // clicking the column headers
            if (this._sortListener) {
                this._sortListener.remove();
            }
            if (!deviceUtils.isMobile()) {
                this._sortListener = on(headerRow, 'click,keydown', this._onHeaderClick.bind(this));
            }
        },

        _onHeaderClick: function(event) {
            // respond to click, space keypress, or enter keypress
            if (event.type === 'click' || event.keyCode === 32 ||
                event.keyCode === 13) {
                var target = event.target,
                    sort = this.sort[0],
                    newSort = [],
                    eventObj,
                    field;
                do {
                    if (target.sortable) {
                        field = target.field || target.columnId;
                        // If the click is on the same column as the active sort,
                        // reverse sort direction
                        newSort = [];
                        sort = this.sort[0];
                        if (sort && sort.property === field) {
                            if (!sort.descending) {
                                newSort.push({
                                    property: field,
                                    descending: true
                                });
                            }
                        } else {
                            newSort.push({
                                property: field,
                                descending: false
                            });
                        }

                        // Emit an event with the new sort
                        eventObj = {
                            bubbles: true,
                            cancelable: true,
                            this: this,
                            parentType: event.type,
                            sort: newSort
                        };

                        if (on.emit(event.target, 'dgrid-sort', eventObj)) {
                            // Stash node subject to DOM manipulations,
                            // to be referenced then removed by sort()
                            this._sortNode = target;
                            this.set('sort', newSort);
                        }

                        break;
                    }
                } while ((target = target.parentNode) && target !== this.headerNode);
            }
        },

        /**
         * When removing a row, check to see if the element has a destroy method and call it
         * @param {HTMLElement} rowElement
         */
        removeRow: function(rowElement) {
            var rowHeight = rowElement.offsetHeight,
                result;
            if (rowElement.destroy) {
                rowElement.destroy();
            }

            result = this.inherited(arguments);
            on.emit(this.domNode, 'row-remove', {
                height: rowHeight,
                bubbles: true,
                cancelable: false
            });
            return result;
        },

        insertRow: function() {
            var element = this.inherited(arguments),
                rowHeight = element.offsetHeight;
            on.emit(this.domNode, 'row-insert', {
                height: rowHeight,
                bubbles: true,
                cancelable: false
            });
            element.classList.add('ha-table-row');

            return element;
        },

        /**
         * This is necessary to restructure the DOM so that the sort arrow can appear immediately after the header cell
         * title (rather than the default of right-aligned)
         */
        updateSortArrow: function() {
            if (this._lastSortedArrow) {
                this._lastSortedArrow.parentNode.parentNode.classList.remove('sorted');
            }

            this.inherited(arguments);

            if (this._lastSortedArrow) {
                var parentNode = this._lastSortedArrow.parentNode;

                parentNode.removeChild(this._lastSortedArrow);
                parentNode.parentNode.classList.add('sorted');

                if (parentNode.firstChild.nextSibling) {
                    parentNode.insertBefore(this._lastSortedArrow, parentNode.firstChild.nextSibling);
                } else {
                    parentNode.appendChild(this._lastSortedArrow);
                }
            }
        },

        /**
         * Convert a columns object literal into an array so the widget can predictably
         * add additional, automated columns, such as batch.
         * @param {Array|Object} columns - the column definition provided by the user
         * @returns {Array}
         * @protected
         */
        _convertColumns: function(columns) {
            if (Array.isArray(columns)) {
                return columns.map(function(column) {
                    // allow the id to be computed
                    column.id = null;
                    return column;
                });
            }

            var columnsArray = Object.keys(columns).map(function(key) {
                var definition = columns[key];
                if (typeof definition === 'string') {
                    return { field: key, label: definition };
                }
                definition.field = key;
                definition.id = null;

                return definition;
            });

            return columnsArray;
        },

        /**
         * Set the column definition and update  the renderers
         * @param {Object|Array} columns - the column definition
         */
        _setColumns: function(columns) {
            if (!columns) {
                return;
            }
            this.__columns = columns;
            // convert them to an array
            var columnsArray = this._convertColumns(columns);

            // Extension point for adding additional
            // columns like the DnD handle and batch mode
            // checkbox
            if (this._addCustomColumn) {
                this._addCustomColumn(columnsArray);
            }
            this.inherited(arguments, [columnsArray]);

            // remove the tabIndex
            // see https://github.com/SitePen/dgrid/issues/1181
            this.headerNode.removeAttribute('tabIndex');
        },

        /**
         * Returns columns, using the private property if available,
         * and otherwise delegating to the default getter.
         * @returns {Array | Object} - The column definition for this table
         * @private
         */
        _getColumns: function() {
            return this.__columns || this.inherited(arguments);
        },

        /**
         * Renders a cell for the total row, and then adds any special classes specified on the column to the
         * cell
         * @param {object} totals The mapping from column fields to totals from which the value to display in the cell will
         * be retrieved
         * @param {HTMLElement} cell The cell that content is being added to
         * @param {object | array} column The column that the cell being rendered belongs to
         * @private
         */
        _renderTotalCell: function(totals, cell, column) {
            var value = totals[column.field] || '';
            cell.textContent = value;
            if (column.className) {
                cell.classList.add(column.className);
            }
        },

        /**
         * Checks to see if the field specified by index if a viable field to render the total label in.
         * It will not render in a batch field, and will not render in a field that has a total value specified for
         * it. Returns the new cell to render in, or the currently specified cell if it's still viable, or null
         * if the checked cell has a total value, as the total label should not be rendered after any rows with
         * a total.
         * @param {object} totals The map from column fields to totals
         * @param {HTMLElement} totalRow The totalRow element
         * @param {HTMLElement} totalTextTarget The current cell selected for rendering the totalText, or null if
         * there isn\' one * selected yet
         * @param {number | string} index The column array index or key to check
         * @returns The appropriate cell to render in, or null if there isn't an appropriate cell
         * @private
         */
        _checkForValidTotalTextCell: function(totals, totalRow, totalTextTarget, index) {
            var fieldName = this.columns[index].field;
            if (fieldName === this.batchField || fieldName === this.categoryProperty) {
                return totalTextTarget;
            }

            if (!totals[fieldName]) {
                return totalTextTarget ? totalTextTarget :
                    totalRow.getElementsByClassName('field-' + this.columns[index].field)[0];

            } else {
                return null;
            }
        },

        /**
         * Renders a total row, and cleans up any old total rows or listeners
         * @param {object} totals The map of column fields to totals
         * @param {string} totalRowProperty The key at which the total row will be stored, can be passed as a parameter
         * so that * this method can be used for table totals and category(content group) totals
         * @param {HTMLElement} beforeNode Optional parameter specifying the node before which the total row will be
         * inserted
         * @returns - the newly rendered total row or nothing if one wasn't rendered
         * @private
         */
        _renderTotalRow: function(totals, totalRowProperty, beforeNode) {
            if (this[totalRowProperty]) {
                if (this[totalRowProperty].parentNode) {
                    this[totalRowProperty].parentNode.removeChild(this[totalRowProperty]);
                }
                this[totalRowProperty] = null;
            }
            if (totals) {
                var totalTextTarget,
                    i,
                    container = beforeNode ? beforeNode.parentNode : this.contentNode,
                    totalRowTable,
                    totalRow,
                    columnKeys,
                    newTotalTextHeader,
                    firstCell,
                    fieldName,
                    isATotalShowing = false,
                    isHidden,
                    columnKey,
                    hiddenSpan;
                totalRowTable = this.createRowCells('td', lang.hitch(this, '_renderTotalCell', totals));
                totalRow = document.createElement('div');
                totalRow.setAttribute('role', 'row');
                // totalRow.classList.add('dgrid-row');
                totalRow.classList.add('total-row');
                totalRow.appendChild(totalRowTable);
                this[totalRowProperty] = totalRow;

                if (Array.isArray(this.columns)) {
                    columnKeys = new Array(this.columns.length);
                } else {
                    columnKeys = Object.keys(this.columns).sort();
                }

                // We want to add the label to the first cell that is not preceded by any
                // more totals. So we start from the last cell, and working backwards, the first
                // empty cell will become the target for the text, but if we find another cell
                // with text preceding the current target we remove it as a candidate and
                // keep searching.
                for (i = columnKeys.length -1; i >= 0; i--) {
                    columnKey = (columnKeys[i] !== undefined && columnKeys[i] !== null) ? columnKeys[i] : i;
                    if (this.columns.hasOwnProperty(columnKey)) {
                        isHidden = this.isColumnHidden && this.isColumnHidden(this.columns[columnKey].id);

                        fieldName = this.columns[columnKey].field;
                        if (totals[fieldName] && !isHidden) {
                            isATotalShowing = true;
                        }
                        totalTextTarget = isHidden ? totalTextTarget : this._checkForValidTotalTextCell(
                            totals,
                            totalRow,
                            totalTextTarget,
                            columnKey
                        );
                        if (!totalTextTarget && fieldName !== this.categoryProperty &&
                            fieldName !== this.batchField && !isHidden) {
                            firstCell = totalRow.getElementsByClassName('field-' + fieldName)[0];
                        }
                    }
                }

                // Only render the total row if one or more cells with totals are visible
                if (isATotalShowing) {
                    if (totalTextTarget) {
                        newTotalTextHeader = document.createElement('th');
                        newTotalTextHeader.innerHTML = totalTextTarget.innerHTML;
                        newTotalTextHeader.setAttribute('scope', 'row');
                        newTotalTextHeader.setAttribute('role', 'rowheader');
                        newTotalTextHeader.textContent = this.totalText || 'TOTAL';
                        newTotalTextHeader.classList.add('total-text');
                        newTotalTextHeader.classList.add('right');
                        newTotalTextHeader.classList.add('dgrid-cell');
                        newTotalTextHeader.classList.add('ha-table-cell');
                        totalTextTarget.parentNode.replaceChild(newTotalTextHeader, totalTextTarget);
                    } else if (firstCell) {
                        hiddenSpan = document.createElement('span');
                        hiddenSpan.classList.add('sr-only');
                        hiddenSpan.textContent = this.totalText;
                        firstCell.insertBefore(hiddenSpan, firstCell.firstChild);
                    }

                    if (container && container.parentNode) {
                        container.insertBefore(totalRow, beforeNode || null);
                    }

                    return totalRow;
                }

                return null;
            }
        },

        /**
         * Sets a new label for total rows and rerenders the total row
         * @param {string} totalText The new label to display in total rows
         * @private
         */
        _setTotalText: function(totalText) {
            this.totalText = totalText;
            if (this._totalRow) {
                this._renderTotalRow(this.totals, '_totalRow');
            }
            this.inherited(arguments);
        },

        /**
         * Sets appropriate 'role' attribute values for accessibility on loading and no-data nodes.
         * @private
         */
        _applyA11yRoles: function() {
            var loadingNodes = this.contentNode.querySelectorAll('.dgrid-loading'),
                noDataNode = this.contentNode.querySelector('.dgrid-no-data');

            Array.prototype.slice.apply(loadingNodes).forEach(function(node) {
                node.setAttribute('role', 'alert');
            });

            if (noDataNode) {
                noDataNode.setAttribute('role', 'gridcell');
            }
        },

        resizeColumnWidth: function(columnId, width) {
            var columns = this.get('columns');

            if (typeof columnId === 'string' && columns[columnId] === undefined) {
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].field === columnId) {
                        columnId = i;
                        break;
                    }
                }
            }

            this.inherited(arguments, [columnId, width]);
        }
    });

    /**
     * A factory function for generating a new dgrid instance with the appropriate mixins
     * @static
     */
    TableBase.factory = function(config, node) {
        config = config || {};
        // TODO: DnD prevents cell editors from working; might be fixed by restricting DnD source to a single cell
        var base = [Keyboard, ColumnResizer, ColumnHider, Editor, TableBase,
            RowStatusIndicator, RowErrors, BatchMode, RowReordering, RowDeletion, PersistentSort, ColumnLocking];
        if (config.virtual) {
            base.unshift(OnDemandContentGroups);
        } else {
            base.unshift(Grid, Pagination);
        }

        return new (declare(base))(config, node);
    };

    return TableBase;
});

/**
 * @module
 * @class RowEditingRenderer
 * The default renderer for editable grids
 */
define('hui/table/RowEditingRenderer',[
    './DefaultRenderer',
    'object-utils/classes',
    'dojo/aspect',
    '../core/a11y'
], function(DefaultRenderer, classes, aspect) {
    function _getFieldValues(fields) {
        // get all the dirty fields
        var saveFields = {};

        if (fields) {
            Object.keys(fields).forEach(function(fieldName) {
                if (fields[fieldName].getValue) {
                    saveFields[fieldName] = fields[fieldName].getValue();
                }
            });
        }

        return saveFields;
    }

    function _setFieldValues(fields, fieldValues) {
        Object.keys(fieldValues).forEach(function(fieldName) {
            var field = fields[fieldName];

            if (field && field.setValue) {
                field.setValue(fieldValues[fieldName]);
            }
        });
    }

    function _checkFocus(event, originalNode, row, table) {
        if (_checkFocus.timeout) {
            clearTimeout(_checkFocus.timeout);
            _checkFocus.timeout = null;
        }
        _checkFocus.timeout = setTimeout(function() {
            var node = document.activeElement, isOnRow = false;

            while (node && node !== document) {
                if (node === row) {
                    isOnRow = true;
                    break;
                }

                node = node.target ? node.target : node.parentElement;
            }

            if (!isOnRow && row.parentElement) {
                table.rowEditSaveHandler();
            }
        }, 250);
    }

    function _buildEditableRow(defaultRenderer, fieldEditors, object, table) {
        var row = defaultRenderer(),
            tableCells = Array.prototype.slice.call(row.querySelectorAll('td'));

        row.setAttribute('role', 'form');

        tableCells.forEach(function(tableCell) {
            var cell = table.cell(tableCell),
                column = cell.column,
                field = fieldEditors[column.field];

            if (field && field.editor) {
                field.editor.classList.add('row-editor');

                if (field.column.label) {
                    field.editor.placeholder = field.column.label;
                }

                tableCell.innerHTML = '';
                tableCell.appendChild(field.editor);
            }

            Array.prototype.slice.call(tableCell.children).forEach(function(node) {
                node.addEventListener('blur', function(evt) {
                    _checkFocus(evt, node, row, table);
                });
            });
        });

        return row;
    }

    return classes.extend(DefaultRenderer, {
        constructor: function() {
            this._editableRowId = null;
            this._blurEventHandle = null;
            this._removeRowAspect = null;
            this._insertRowAspect = null;
        },
        setup: function(table) {
            var self = this;

            this._removeRowAspect = aspect.before(table, 'removeRow', function(row) {
                var tableRow = table.row(row);

                if (tableRow.id === self._editableRowId) {
                    self._savedFieldValues = _getFieldValues(self._editableFields);
                } else {
                    self._savedFieldValues = null;
                }

                return arguments;
            });

            this._insertRowAspect = aspect.after(table, 'insertRow', function(row) {
                var tableRow = table.row(row);

                if (self._savedFieldValues !== null && self._editableRowId === tableRow.id) {

                    _setFieldValues(self._editableFields, self._savedFieldValues);
                }

                return row;
            });
        },
        cleanup: function() {
            this._cleanEventListeners();
            this._editableRowId = null;
            this._editableFields = null;

            this._removeRowAspect.remove();
            this._removeRowAspect = null;

            this._insertRowAspect.remove();
            this._insertRowAspect = null;
        },
        _cleanEventListeners: function() {
            if (this._blurEventHandle !== null) {
                document.body.removeEventListener('mouseup', this._blurEventHandle);
                this._blurEventHandle = null;
            }
        },
        setEditableRow: function(table, rowId, editableFields) {
            var oldId = this._editableRowId;

            this._editableRowId = rowId;
            this._editableFields = editableFields;

            this._savedFieldValues = null;

            if (oldId !== null) {
                this._cleanEventListeners();

                table.reRenderRow(oldId);
            }

            if (rowId !== null) {
                table.reRenderRow(rowId);
            }
        },
        row: function(object, options, defaultRenderer) {
            var table = this.table,
                row = table.row(object),
                newRow;

            if (row.id !== this._editableRowId) {
                return defaultRenderer();
            }

            newRow = _buildEditableRow(defaultRenderer, this._editableFields, object, table);
            newRow.classList.add('editable-row');

            if (this._blurEventHandle === null) {
                this._blurEventHandle = function(event) {
                    var node = event.target, isInRow = false;

                    while (node && node !== document) {
                        // we check for popovers because they are appended to the body, but they are owned by other nodes
                        if (node.classList.contains('editable-row')) {
                            isInRow = true;
                            break;
                        }

                        node = node.target ? node.target : node.parentElement;
                    }

                    if (!isInRow) {
                        this.table.rowEditSaveHandler();
                    }
                }.bind(this);
                document.body.addEventListener('mouseup', this._blurEventHandle);
            }

            return newRow;
        }
    });
});

/**
 * @module
 * @class RowExtensionRenderer
 * A default renderer for displaying expandable content associated with a row
 */
define('hui/table/RowExpansionRenderer',[
    './DefaultRenderer',
    'object-utils/classes',
    '../core/keys',
    '../core/a11y',
    '../core/utils'
], function(DefaultRenderer, classes, keys, a11y, utils) {
    /**
     * Counter for generating unique IDs for row expansions
     * @type {number}
     * @private
     */
    var counter = 0;

    /**
     * Returns whether the expansion's visibility should be toggled. If the click event
     * came from an input field, button, or anchor, then it is presumably meant to perform some other action,
     * and the expansion should remain in its current state. Similarly, if the click was inside the batch cell
     * then it should also be ignored. This method assumes that activatorSelector is not being used, as in that case
     * any click within the targeted area should toggle visibility.
     * @param {Event} clickEvent
     * @param {string} batchClass
     * @returns {boolean}
     */
    function shouldToggle(clickEvent, batchClass) {
        var toggle = true;
        if (clickEvent && clickEvent.target) {
            var element = clickEvent.target;

            while (element) {
                if (element.tagName === 'HA-TABLE') {
                    break;
                }
                if (element.classList.contains(batchClass)) {
                    toggle = false;
                    element = null;
                } else {
                    element = element.parentElement;
                }
            }
            if (clickEvent.target.tagName === 'HA-CHECKBOX' || clickEvent.target.tagName === 'HA-RADIO-BUTTON' ||
                clickEvent.target.tagName === 'INPUT' || clickEvent.target.tagName === 'BUTTON' ||
                clickEvent.target.tagName === 'A') {
                toggle = false;
            }
        }

        return toggle;
    }

    function _addTableAnimation(table, isEnabled) {
        if (isEnabled) {
            table.querySelector('.dgrid-grid').classList.add('animate-height');
        } else {
            table.querySelector('.dgrid-grid').classList.remove('animate-height');
        }
    }

    return classes.extend(DefaultRenderer, {
        constructor: function(options) {
            options = options || {};
            /**
             * Renders the content of the expanded area. This content is placed below the 'header' in the expanded
             * area, which really is just a div to hold the close button.
             * @type {Function}
             */
            this.renderRowExpansionContent = options.renderRowExpansionContent || function(object) {
                var rowExpansionContentDiv = this.table.ownerDocument.createElement('div'),
                    id = this.table.store.getIdentity(object);
                rowExpansionContentDiv.textContent = 'RowExpansion content for row with object id: ' + id;
                return rowExpansionContentDiv;
            };
            /**
             * Options CSS selector that specifies the element within each row that should trigger the expansion to
             * be displayed/hidden. If not specified, clicking any of the cells will display the expansion
             *
             * @type {string}
             */
            this.activatorSelector = options.activatorSelector;

            /**
             * Optional value to set the height of the row expansion.
             * Should be a numeric value indicating the height in pixels.
             *
             * @type {number}
             */
            this.expansionHeight = options.expansionHeight;

            this.manualActivation = options.manualActivation || false;

            this.expansionClassName = options.expansionClassName;

            this.useFocusIndicator = options.useFocusIndicator || false;

            this.focusIndicatorLabel = options.focusIndicatorLabel || '';

            this._expandedRows = {};

            /**
             * Optional value to specify whether the last expanded row should be scrolled to the top
             * of the table. Defaults to false, which means never scroll.
             * @type {number}
             */
            this.scrollingThreshold = options.scrollingThreshold || false;

            /**
             * Optional value specifying whether expanded rows force the table to resize. Defaults to false.
             * @type {boolean}
             */
            this.autoResizeTable = options.autoResizeTable || false;

            // If the whole row should trigger expansion, than only the batch cell should trigger selection
            if (!options.activatorSelector) {
                this.tableConfig = {
                    selectionMode: 'none'
                };
            }
        },

        /**
         * By default we don't want to let clicks leak out of the expansion content. It can handle its own events and
         * other listeners on the table might not anticipate a click coming from this content. This could be explicitly
         * overridden if for some reason the table needs to handle these click events.
         */
        _expansionMouseHandler: function(event) {
            // Avoid complications with batch mode or other table mouse event listeners by preventing events in the
            // expansion from bubbling out.
            event.stopPropagation();
        },

        /**
         * Toggles the visiblity of the passed element, unless hide is passed to force
         * the element to be shown or hidden
         * @param {HTMLElement} row
         * @param {boolean} hide
         * @param {HTMLElement} activatorElement The element that toggles display of the expanded content
         */
        _toggleRowExpansion: function(row, hide, activatorElement) {
            var rowExpansion = row.querySelector('.ha-table-row-expansion'),
                tableRow = this.table.row(row),
                shouldShow,
                midAnimation;
            if (row.querySelector('.' + this.batchClass)) {
                rowExpansion.classList.add('batch-table-expansion');
                rowExpansion.classList.remove('no-batch-table-expansion');
            } else {
                rowExpansion.classList.add('no-batch-table-expansion');
                rowExpansion.classList.remove('batch-table-expansion');
            }
            if (typeof hide !== 'undefined' && hide !== null) {
                shouldShow = !Boolean(hide);
            } else {
                midAnimation = rowExpansion.classList.contains('hidden') !== rowExpansion.classList.contains('hide-expansion');
                shouldShow =  rowExpansion.classList.contains('hidden');
            }

            if (midAnimation) {
                return;
            }

            if (shouldShow) {
                this._expandedRows[tableRow.id] = true;

                rowExpansion.classList.remove('hidden');
                if (this.useFocusIndicator) {
                    row.classList.add('show-focus');
                }
                setTimeout(function() {
                    rowExpansion.classList.remove('hide-expansion');
                    this._handleFocusAndAriaAttributes(rowExpansion, activatorElement, row);
                }.bind(this), 0);

                if (this.scrollingThreshold !== false) {
                    var scroller = row;

                    while (scroller && !scroller.classList.contains('dgrid-scroller')) {
                        scroller = scroller.parentElement;
                    }

                    if (scroller) {
                        setTimeout(function() {
                            var viewport = scroller.getBoundingClientRect(),
                                rowViewport = row.getBoundingClientRect();

                            if ((viewport.bottom - rowViewport.top) / rowViewport.height < this.scrollingThreshold) {
                                utils.animateScrollTo(scroller, row.offsetTop, 150);
                            }
                        }.bind(this), 50);
                    }
                }

                if (this.autoResizeTable) {
                    setTimeout(function() {
                        this.table._calculateInitialHeight({type: 'row-expander-resize'});
                    }.bind(this), 0);
                }
            } else {
                delete this._expandedRows[tableRow.id];

                rowExpansion.classList.add('hide-expansion');

                if (this.useFocusIndicator) {
                    row.classList.remove('show-focus');
                }

                setTimeout(function() {
                    rowExpansion.classList.add('hidden');
                }.bind(this), 350);

                if (this.autoResizeTable) {
                    setTimeout(function() {
                        _addTableAnimation(this.table, true);

                        this.table._calculateInitialHeight({type: 'row-expander-resize'});
                        setTimeout(function() {
                            _addTableAnimation(this.table, false);
                        }.bind(this), 250);
                    }.bind(this), 250);
                }

                this._handleFocusAndAriaAttributes(rowExpansion, activatorElement, row);
            }
        },

        /**
         * Focus the expanded area or activating element, publish close or show event, and set the value
         * of the aria-expanded attribute as appropriate.
         * @param {HTMLElement} rowExpansion The content that has been expanded or collapsed
         * @param {HTMLElement} activatorElement The element that toggles the display of the expansion content
         * @param {*} row The owning row
         * @private
         */
        _handleFocusAndAriaAttributes: function(rowExpansion, activatorElement, row) {
            if (rowExpansion.classList.contains('hide-expansion')) {
                if (!activatorElement.hasAttribute('tabindex')) {
                    activatorElement.setAttribute('tabindex', '-1');
                    activatorElement.addEventListener('blur', function removeTabIndex() {
                        activatorElement.removeAttribute('tabindex');
                        activatorElement.removeEventListener('blur', removeTabIndex);
                    });
                }

                activatorElement.focus();
                activatorElement.setAttribute('aria-expanded', false);
                row.classList.remove('highlighted-dgrid-row');
                this.table.emit('expandable-row-close', {
                    bubbles: false,
                    row: row
                });
            } else {
                activatorElement.setAttribute('aria-expanded', true);
                row.classList.add('highlighted-dgrid-row');
                rowExpansion.focus();
                this.table.emit('expandable-row-show', {
                    bubbles: false,
                    row: row
                });
            }
        },

        /**
         * Renders the row expansion, and adds event listeners to handle showing/hiding it
         * @param {HTMLElement} row The grid row element
         * @param {Object} object The object being rendered for this cell.
         * @returns {*} The row element the expansion was added to
         */
        renderRowExpansion: function(row, object) {
            var table = this.table,
                rowExpansion = table.ownerDocument.createElement('div'),
                activatorElement = row.querySelector('table') || row,
                toggleRowExpansion = function(event, hide) {
                    if (this.activatorSelector || shouldToggle(event, this.batchClass)) {
                        this._toggleRowExpansion(row, hide, activatorElement);
                    }
                }.bind(this),
                forceToggleRowExpansion = function(event, hide) {
                    this._toggleRowExpansion(row, hide, activatorElement);
                }.bind(this),
                rowExpansionContent = this.renderRowExpansionContent(object, forceToggleRowExpansion),
                closeButton = table.ownerDocument.createElement('button'),
                cleanupListeners,
                keyboardEventHandler = function(event) {
                    if (event.keyCode === keys.ENTER || event.keyCode === keys.SPACEBAR) {
                        toggleRowExpansion(event);
                    }
                },
                expansionId,
                batchCell = row.querySelector('.' + this.batchClass);

            if (this.expansionHeight) {
                rowExpansion.style.height = this.expansionHeight + 'px';
            }
            closeButton.className = 'hi hi-close close-expansion-button';
            closeButton.addEventListener('click', forceToggleRowExpansion);
            closeButton.setAttribute('aria-label', 'Close expanded row');

            rowExpansion.appendChild(rowExpansionContent);

            if (!this.manualActivation) {
                rowExpansionContent.appendChild(closeButton);

                rowExpansion.setAttribute('tabindex', '-1');
                rowExpansion.addEventListener('keydown', function(event) {
                    if (event.keyCode === keys.ESCAPE) {
                        toggleRowExpansion();
                    }

                    a11y.keepFocusInsideListener(event, rowExpansion);
                });
                // Prevent mouse/touch events from bubbling
                rowExpansion.addEventListener('click', this._expansionMouseHandler);
                rowExpansion.addEventListener('mousedown', this._expansionMouseHandler);
                rowExpansion.addEventListener('touchstart', this._expansionMouseHandler);

                if (this.activatorSelector) {
                    // In this case a custom selector has been provided and only that element should activate
                    // the rowExpansion
                    activatorElement = row.querySelector(this.activatorSelector);
                }
                expansionId = rowExpansion.id = 'table-row-expansion' + counter++;
                activatorElement.setAttribute('aria-controls', expansionId);
                activatorElement.setAttribute('aria-expanded', false);

                if (activatorElement && activatorElement.addEventListener) {
                    activatorElement.addEventListener('click', toggleRowExpansion);
                    if (activatorElement.tagName !== 'BUTTON') {
                        activatorElement.addEventListener('keydown', keyboardEventHandler);
                    }
                }
                cleanupListeners = function() {
                    activatorElement.removeEventListener('click', toggleRowExpansion);
                    activatorElement.removeEventListener('keydown', keyboardEventHandler);
                };
            }

            rowExpansion.className = 'ha-table-row-expansion';

            if (!(object.id in this._expandedRows)) {
                rowExpansion.classList.add('hide-expansion');
                rowExpansion.classList.add('hidden');
            }

            if (this.expansionClassName) {
                rowExpansion.classList.add(this.expansionClassName);
            }

            if (batchCell) {
                rowExpansion.classList.add('batch-table-expansion');
            } else {
                rowExpansion.classList.add('no-batch-table-expansion');
            }

            if (this.useFocusIndicator) {
                var focusIndicator = document.createElement('button');
                focusIndicator.className = 'focus-indicator hi hi-chevron-down';
                if (this.focusIndicatorLabel) {
                    focusIndicator.setAttribute('aria-label', this.focusIndicatorLabel);
                }
                focusIndicator.addEventListener('click', function() {
                    this._toggleRowExpansion(row, true, activatorElement);
                }.bind(this));
                row.appendChild(focusIndicator);
            }

            row.appendChild(rowExpansion);
            //Provide cleanup for anything created in the row formatter.
            row.destroy = function() {
                if (cleanupListeners) {
                    cleanupListeners();
                }

                if (rowExpansionContent.destroy) {
                    rowExpansionContent.destroy();
                }
            };
            return row;
        },

        row: function(object, options, defaultRender) {
            var defaultRow = defaultRender();

            return this.renderRowExpansion(defaultRow, object, options);
        },

        setup: function() {
            this.batchClass = 'field-' + this.table.batchField;
        }
    });
});

define('hui/table/responsive/StackedRenderer',[
    'object-utils/classes',
    '../DefaultRenderer'
], function(classes, DefaultRenderer) {
    function generateColumnId(table, columnId) {
        return 'ha-table-' + table.componentId + '-header-' + columnId;
    }

    return classes.extend(DefaultRenderer, {

        constructor: function(tableConfig) {
            this.tableConfig = tableConfig;
        },

        row: function(object, options, defaultRender) {
            var row = defaultRender();

            if (!row.classList.contains('category-row')) {
                var stackedCell = document.createElement('td'),
                    stackedCellContent = document.createElement('div'),
                    leftColumn = document.createElement('div'),
                    rightColumn = document.createElement('div'),
                    table = this.table,
                    tableColumn;

                leftColumn.classList.add('ha-stacked-left-column');
                rightColumn.classList.add('ha-stacked-right-column');
                stackedCell.classList.add('dgrid-cell');
                Object.keys(this._matrix).forEach(function(column) {
                    var div,
                        rows = this._matrix[column],
                        fieldName,
                        i,
                        fieldSelector,
                        field;
                    for (i = 0; i < rows.length; i++) {
                        fieldName = rows[i];
                        div = document.createElement('div');

                        if (fieldName) {
                            fieldSelector = '.field-' + fieldName;
                            field = row.querySelector(fieldSelector);
                            tableColumn = table.table.column(field);
                            div.innerHTML = field.innerHTML;
                            div.setAttribute('aria-describedby', generateColumnId(table, tableColumn.id));
                            div.setAttribute('role', 'gridcell');
                            field.parentElement.removeChild(field);
                        }

                        if (column === 'left') {
                            leftColumn.appendChild(div);
                        } else {
                            rightColumn.appendChild(div);
                        }
                    }
                }, this);

                this._ignore.forEach(function(field) {
                    var cell = row.querySelector('.field-' + field);
                    if (cell) {
                        cell.parentElement.removeChild(cell);
                    }
                });

                stackedCellContent.appendChild(leftColumn);
                stackedCellContent.appendChild(rightColumn);
                stackedCell.appendChild(stackedCellContent);
                row.querySelector('tr').appendChild(stackedCell);
            }

            return row;
        },

        header: function(defaultRender) {
            defaultRender();

            var header = this.table.querySelector('.ha-table-header'),
                batchCell = this.table.querySelector('.batch-header-cell');

            if (header) {
                Array.prototype.slice.call(header.querySelectorAll('th.dgrid-cell'), 0).forEach(function(headerCell) {
                    if (headerCell.columnId) {
                        headerCell.id = generateColumnId(this.table, headerCell.columnId);
                    }
                }.bind(this));
            }

            if (batchCell) {
                var batchBox = batchCell.querySelector('ha-checkbox'),
                    tableBar = this.table._toolbarNode,
                    batchContainer = tableBar.querySelector('.mobile-batch-header');

                if (!batchContainer) {
                    batchContainer = this.table.ownerDocument.createElement('div');
                    batchContainer.classList.add('mobile-batch-header');
                    batchContainer.classList.add('dgrid-selector');

                    /**
                     * Since we've taken the batch checkbox out of the header, we need to manually
                     * call the selection mode click handler.  We need to set these custom properties
                     * to trick the selection module into thinking this click belongs to the table header.
                     */
                    batchContainer.addEventListener('click', function(event) {
                        event.column = {
                            row: null
                        };
                        event.element = batchContainer;
                        this.table.table._handleSelectorClick(event);
                    }.bind(this));

                    tableBar.classList.add('mobile-batch-container');
                    tableBar.appendChild(batchContainer);
                }

                batchContainer.innerHTML = '';
                batchContainer.appendChild(batchBox);
            }
        },

        setup: function() {
            var columns = this.table.columns,
                matrix = {
                    'left': [],
                    'right': []
                },
                ignoredColumns = [],
                field,
                addToLeft = true;
            function checkColumnPositions(column) {
                if (column.stackedColumn === 'left' || column.stackedColumn === 'right') {
                    if (typeof column.stackedRow === 'number') {
                        matrix[column.stackedColumn][column.stackedRow] = column.field;
                    }
                } else if (column.field) {
                    ignoredColumns.push(column.field);
                } else if (typeof column === 'string') {
                    ignoredColumns.push(column);
                }
            }
            if (Array.isArray(columns)) {
                columns.forEach(checkColumnPositions);
            } else {
                Object.keys(columns).map(function(key) {
                    return typeof columns[key] === 'string' ? key : columns[key];
                }).forEach(checkColumnPositions);
            }
            if (matrix.left.length === 0 && matrix.right.length === 0) {
                while (matrix.right.length < 3 && (field = ignoredColumns.shift())) {
                    matrix[addToLeft ? 'left' : 'right'].push(field);
                    addToLeft = !addToLeft;
                }
            }
            this._matrix = matrix;
            this._ignore = ignoredColumns;

            this.table.classList.add('ha-stacked-table');
        },

        cleanup: function() {
            this.table.classList.remove('ha-stacked-table');
        }
    });
});


define('hui/table/responsive/ColumnLockingRenderer',[
    'object-utils/classes',
    '../DefaultRenderer'
], function(classes, DefaultRenderer) {
    return classes.extend(DefaultRenderer, {
        constructor: function _() {
            _.super(this);
            this.tableConfig.lockedColumns = 1;
        },

        setup: function() {
            this.table.classList.add('ha-column-locking-table');
            this.table.refresh();
        },

        cleanup: function() {
            this.table.classList.remove('ha-column-locking-table');
        }
    });
});


define('hui/table/responsive/ResponsiveDefaultRenderer',[
    'object-utils/classes',
    '../DefaultRenderer'
], function(classes, DefaultRenderer) {
    return classes.extend(DefaultRenderer, {
        setup: function() {
            this.table.classList.add('ha-table-simple-scroll');
        },

        cleanup: function() {
            this.table.classList.remove('ha-table-simple-scroll');
        }
    });
});



define('text!hui/table/table.html',[],function () { return '<template>\n    <div class="tablebar">\n        <div class="table-bar tablebar-default" role="menubar">\n            <div class="custom-node"></div>\n            <div class="filter-node"></div>\n            <div class="default-actions">\n                <span class="custom-action-node"></span>\n                <button name="edit">\n                    <span class="hi hi-edit" role="presentation" aria-hidden="true"></span>\n                    <span class="sr-only">{{editIconText}}</span>\n                </button>\n                <button name="print">\n                    <span class="hi hi-print" role="presentation" aria-hidden="true"></span>\n                    <span class="sr-only">{{printIconText}}</span>\n                </button>\n                <button aria-haspopup="true" name="export">\n                    <span class="hi hi-export" role="presentation" aria-hidden="true"></span>\n                    <span class="sr-only">{{exportIconText}}</span>\n                </button>\n                <button name="settings">\n                    <span class="hi hi-settings-o" role="presentation" aria-hidden="true"></span>\n                    <span class="sr-only">{{settingsIconText}}</span>\n                </button>\n                <ha-popover class="ha-table-settings-popover">\n                    <ha-popover-form>\n                        <section>\n                            <div class="section column-hider hidden">\n                                <h4>{{editColumnsText}}</h4>\n\n                                <div class="edit-columns"></div>\n                            </div>\n\n\n                            <div class="section">\n                                <div class="display-density hidden">\n                                    <h4>{{displayDensityText}}</h4>\n\n                                    <ha-checkbox name="compactCheckbox" label="{{compactText}}"></ha-checkbox>\n                                </div>\n\n                                <div class="custom"></div>\n\n                                <div class="rows-per-page">\n                                    <h4>{{rowsPerPageText}}</h4>\n\n                                    <ha-radio-button-group name="rowsPerPage">\n                                        <ha-radio-button label="50" value="50"></ha-radio-button>\n                                        <ha-radio-button label="150" value="150"></ha-radio-button>\n                                        <ha-radio-button label="300" value="300"></ha-radio-button>\n                                    </ha-radio-button-group>\n                                </div>\n                            </div>\n                        </section>\n                    </ha-popover-form>\n                </ha-popover>\n            </div>\n        </div>\n        <div class="table-bar tablebar-batch animate-hidden" role="menubar">\n            <div class="batch-node"></div>\n            <div class="batch-count" role="alert"></div>\n        </div>\n        <div class="table-bar tablebar-edit animate-hidden" role="menubar">\n            <div class="edit-actions">\n                <button name="cancel" class="ha-button edit-cancel">{{editModeCancelText}}</button>\n                <button name="save" class="ha-button edit-save">{{editModeSaveText}}</button>\n            </div>\n        </div>\n    </div>\n    <div class="grid-node"></div>\n    <span class="table-escape-node" tabindex="-1" aria-label="table escaped"></span>\n</template>\n';});



define('text!hui/table/print.html',[],function () { return '<!doctype html>\n<html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <title>Print table</title>\n        <style>{{{dgridCss}}}</style>\n        <style>\n            body {\n                font-family: {{{printListFontFamily}}};\n            }\n\n            .dgrid-header-row {\n                position: static;\n            }\n\n            .dgrid-scroller {\n                margin-top: 0;\n            }\n\n            .noprint,\n            .print .tablebar {\n                display: none;\n            }\n\n            .print .numeric,\n            .print .right {\n                text-align: right;\n            }\n        </style>\n        {{{customCss}}}\n    </head>\n\n    <body>\n        <h1>{{printListTitleText}}</h1>\n        <div class="subTitle">{{printListSubTitleText}}</div>\n        <div role="grid" class="dgrid dgrid-grid ui-widget grid-node dgrid-autoheight print">{{{gridContent}}}</div>\n\n        <script>\n            window.print();\n        </script>\n    </body>\n</html>\n';});


define('hui/table-column',[
    'register-component/v2/register',
    'register-component/v2/UIComponent',
    'object-utils/classes'
], function(register, UIComponent, classes) {
    function defineAndUpdate(object, property) {
        Object.defineProperty(object, property, {
            set: function(value) {
                this['_' + property] = value;
                this.emit('column-change');
            },
            get: function() {
                return this['_' + property];
            }
        });
    }

    var HATableColumn = classes.createObject(UIComponent, /** @lends HATableColumn# */ {
        /** @constructs */
        init: function _() {
            _.super(this);

            this.setupProperties({
                field: {
                    type: String,
                    default: ''
                },
                label: {
                    type: String,
                    default: ''
                },
                headerText: {
                    type: String,
                    default: ''
                },
                id: {
                    // TODO: is this needed?
                    type: String,
                    default: ''
                },
                className: {
                    type: String,
                    default: ''
                },
                sortable: {
                    type: Boolean,
                    default: false
                },
                minWidth: {
                    type: Number,
                    default: 40
                },
                width: {
                    type: Number,
                    default: null
                },
                resizable: {
                    type: Boolean,
                    default: true
                },
                hidden: {
                    type: Boolean,
                    default: false
                },
                unhidable: {
                    type: Boolean,
                    default: false
                },
                'edit-on': {
                    type: String,
                    default: ''
                },
                editable: {
                    type: Boolean,
                    default: false
                }
            });

            defineAndUpdate(this, 'renderCell');
            defineAndUpdate(this, 'renderPrintCell');
            defineAndUpdate(this, 'renderHeaderCell');
            defineAndUpdate(this, 'formatter');
        },

        attributeChangedCallback: function _(attribute, oldValue, newValue) {
            _.super(this, attribute, oldValue, newValue);
            this.emit('column-change', {
                attribute: attribute,
                value: newValue
            });
        },

        getColumnDefinition: function() {
            var editable = this.editable,
            // This is true if the attribute doesn't exist, or if it exists and
            // is not set to false
            sortable = !(this.hasAttribute('sortable') && this.getAttribute('sortable') === 'false');
            return {
                label: this.label,
                field: this.field,
                editor: editable && 'text',
                editOn: editable && this['edit-on'],
                renderCell: this.renderCell,
                renderHeaderCell: this.renderHeaderCell,
                renderPrintCell: this.renderPrintCell,
                formatter: this.formatter,
                sortable: sortable
            };
        }
    });

    return register('ha-table-column', HATableColumn);
});

define('hui/drawer/DrawerBase',[
    '../core/a11y',
    '../core/keys',
    '../core/utils',
    'register-component/v2/UIComponent',
    'object-utils/classes',
    '../core/contentNode'
], function(a11y, keys, utils, UIComponent, classes, contentNode) {
    'use strict';

    /**
     * Inserts the title in the rendered component
     * @param {HTMLElement} component The Drawer
     * @param {String} title   The title text
     */
    function setTitle(component, title) {
        var titleEl = component.querySelector('.content h3');
        if (titleEl) {
            titleEl.textContent = title;
        }
    }

    /**
     * Determines whether the element is a child of the drawer
     * @param {HTMLElement} element The possible child element
     * @param {HTMLElement} drawer The drawer
     */
    function elementIsInsideDrawer(element, drawer) {
        var parent = element && element.parentNode;
        while (parent) {
            if (parent === drawer) {
                return true;
            }
            parent = parent.parentNode;
        }

        return false;
    }

    var DrawerBase = classes.createObject(UIComponent, {

        init: function _() {

            _.super(this);
            /**
             * Used for accesibility reasons to set the focus to the last active element
             * before the Drawer appeareanse.
             * @private
             * @type {HTMLElement}
             */
            this._lastFocus = null;

            /**
             * Indicates whether the component is visible after calling show
             * @private
             * @type {Boolean}
             */
            this._open = false;

            this.setupProperties({
                /**
                 * A string that the consumer can set as an atributte/property
                 * which is going to be displayed on the Drawer as a Title.
                 * @type {String}
                 */
                titleText: {
                    default: '',
                    change: function(newValue) {
                        setTitle(this, newValue);
                    }
                }
            });

            this.on('show', function(evt) {
                if ((evt.target.localName === 'ha-drawer-large' || evt.target.localName === 'ha-drawer-small') && this._open && evt.type === 'show') {
                    // here we send the content of the drawer instead of the drawer itself, because
                    // we want to avoid focusing the close button
                    var content = this.querySelector('.content'),
                        element = a11y.getBoundariesTabableElement(content).first;
                    if (element) {
                        element.focus();
                    }
                    content.scrollTop = 0;
                }
            });

            /**
             * @emits dismiss.
             */
            this.on('keydown', function(evt) {
                if (keys.ESCAPE === evt.keyCode) {
                    utils.stopEvent(evt);
                    this.emit('dismiss');
                    this.close();
                } else {
                    a11y.keepFocusInsideListener(evt, this);
                }
            });

            this.listenTo(window, 'resize', function() {
                if (this._open && this.ownerDocument.activeElement.tagName === 'INPUT' &&
                    elementIsInsideDrawer(this.ownerDocument.activeElement, this)) {
                    setTimeout(function() {
                        if (this.ownerDocument.activeElement && this.ownerDocument.activeElement.scrollIntoViewIfNeeded) {
                            this.ownerDocument.activeElement.scrollIntoViewIfNeeded();
                        }
                    }.bind(this), 0);
                }
            }.bind(this));
        },

        /**
         * @deprecated. The 'close' method should be used instead
         */
        hide: function() {
            console.warn('DEPRECATION WARNING: The "hide" method is going to be deprecated. From now on, please use the "close" method instead.');
            this.close();
        },

        /**
         * Callback attached after the Component render
         * Here we check if the element was already rendered, if not we render it for the first time.
         * If it was rendered, we check if some property has change to apply the visual changes.
         */
        postRender: function _() {
            _.super(this);
            a11y.addA11yFocus(this);
            //Setting up things related to accesibility
            this.tabIndex = -1;
            this.role = 'dialog';

        },

        /**
         * This method must be removed, once the hide method is also removed.
         */
        addEventListener: function _() {
            HTMLElement.prototype.addEventListener.apply(this, arguments);
            if (arguments[0] === 'hide') {
                console.warn('DEPRECATION WARNING: The hide event is going to be deprecated. From now on, please use "close" instead.');
            }
        },

        /**
         * Adds content to the component
         * @param {object} config Mapping between HTML and properties
         * @deprecated Properties should be used directly instead
         */
        addContent: function(config) {
            var _contentPropertyMap = {
                'section': 'section',
                'main': 'section',
                'footer': 'footer'
            };
            contentNode.addContent(this, config, _contentPropertyMap);
        }
    });

    return DrawerBase;
});

define('hui/drawer-large',[
    'register-component/v2/register',
    './drawer/DrawerBase',
    './core/position',
    './core/underlay',
    'object-utils/classes',
    './core/utils'
], function(register, DrawerBase, position, Underlay, classes, utils) {
    'use strict';

    var el = utils.createElement,

        renderedFooter = function(component) {
            return component.querySelector('aside > footer > *');
        },

        renderedSection = function(component) {
            return component.querySelector('aside > section > div.inner-content > *');
        },

        userProvidedMain = function(component) {
            var mainTag = component.querySelector('main'),
                message = 'DEPRECATION WARNING: <main> tags should not be used anymore to add ' +
                    'content to <ha-drawer-large>. Please add content through a <section> tag.';

            if (mainTag) {
                console.warn(message);
            }

            return mainTag;
        },

        userProvidedSection = function(component) {
            return component.querySelector('section');
        },

        userProvidedFooter = function(component) {
            return component.querySelector('footer');
        },

        renderCloseButton = function() {
            var closeButton = el('button', {'className': 'drawer-close first-focus'}, [
                    el('span', {'className': 'hi hi-close'})
                ]);

            closeButton.setAttribute('aria-label', 'close');

            return closeButton;
        },

        renderAside = function(sectionContent, componentId, footerContent) {
            var aside = el('aside', {'className': 'drawer-panel'}, [
                    renderHeader(),
                    renderSection(sectionContent, componentId),
                    renderFooter(footerContent)
                ]);

            aside.setAttribute('aria-labelledby', 'drawer-large-title-' + componentId);
            aside.setAttribute('tabindex', '-1');

            return aside;
        },

        renderHeader = function() {
            return el('header', {'className': 'header'}, [renderCloseButton()]);
        },

        renderSection = function(content, id) {
            var section = el('section', {'className': 'content'}, [
                    el('h3', {'id': 'drawer-large-title-' + id}),
                    el('div', {'className': 'inner-content'}, [content])
                ]);

            section.setAttribute('tabindex', '-1');

            return section;
        },

        renderFooter = function(content) {
            var footer = el('footer', {'className': 'footer'}, [content]);

            footer.setAttribute('tabindex', '-1');

            return footer;
        },

        HADrawerLarge;

    HADrawerLarge = classes.createObject(DrawerBase, {

        init: function _() {
            _.super(this);

            var animationEvts = utils.getAnimationEventNames();

            this.setupProperties({
                /**
                 * Indicates whether or not the Drawer needs to have a full
                 * screen overlay with opacity.
                 * @type {Boolean}
                 */
                backdrop: {
                    default: false,
                    type: Boolean
                },
                /**
                 * Indicates whether the component is rendered into the body by react
                 * @type {Boolean}
                 */
                reactLayering: {
                    type: Boolean,
                    default: false
                },
                /**
                 * @deprecated 'backdrop' should be used instead
                 * @type {Boolean}
                 */
                overlay: {
                    default: false,
                    type: Boolean,
                    change: function(newValue, oldValue) {
                        /* istanbul ignore if */
                        if (newValue !== oldValue) {
                            this.backdrop = newValue;
                            console.warn('DEPRECATION WARNING: The "overlay" property is going to be deprecated. From now on, please use the "backdrop" property instead.');
                        }
                    }
                }
            });

            /**
             * @emits dismiss.
             */
            this.on('button.drawer-close:click', function() {
                this.emit('dismiss');
                this.close();
            }.bind(this));

            //Listener for removing show class after ha-drawer-slide-out is completed
            this.on(animationEvts.animationend, function(ev) {
                if (ev.animationName === 'ha-drawer-slide-out') {
                    this.classList.remove('show');
                }
            }.bind(this));
        },

        get footer() {
            return utils.arrayOfChildrenFrom(renderedFooter(this));
        },

        /**
         * Set a node or an array of nodes for footer
         * @param {HTMLElement|[HTMLElement]} newFooter Node or nodes to set
         */
        set footer(newFooter) {
            utils.replaceChildrenOf(
                this.querySelector('aside > footer'),
                utils.wrapIfNotWrapped('footer', newFooter));
        },

        get section() {
            return utils.arrayOfChildrenFrom(renderedSection(this));
        },

        /**
         * Set a node or an array of nodes for section
         * @param {HTMLElement|[HTMLElement]} newSection Node or nodes to set
         */
        set section(newSection) {
            utils.replaceChildrenOf(
                this.querySelector('aside > section > div.inner-content'),
                utils.wrapIfNotWrapped('section', newSection));
        },

        // When drawer show called, the detachedCallback might be called depends on the drawer's previous parent node whether body or not.
        // Therefore, if the Underlay of drawer or itself behavior flicker and disappear, then need look at and modify this part.
        detachedCallback: function _() {
            if (this.backdrop && this.parentElement && this.parentElement !== this.ownerDocument.body) {
                Underlay.hide();
                setTimeout(function() {
                    this.ownerDocument.documentElement.style.overflow = 'auto';
                    this.ownerDocument.body.classList.remove('overflow-hidden');
                }.bind(this), 350);
            }
        },

        /**
         * Opens the Drawer, and makes the elements inside to be accessible from the keyboard.
         * @emits show
         */
        show: function() {
            if (!this._open) {
                this._open = true;

                // making elements inside the Drawer visible for the keyboard
                // the show class makes the drawer visible in order to execute the corresponding animations
                this.classList.add('show');
                this.classList.remove('slide-out');
                this.classList.add('slide-in');

                if (this.backdrop) {
                    if (!this.reactLayering) {
                        Underlay.show(this);
                    }
                    this.ownerDocument.body.classList.add('overflow-hidden');
                    // adding a class to the html tag does not work, we need to add the style inline
                    this.ownerDocument.documentElement.style.overflow = 'hidden';
                }

                if (!this.reactLayering) {
                    position.bringToFront(this);
                }
                this._lastFocus = this.ownerDocument.activeElement;

                this.emit('show');
            }
        },

        /**
         * Closes the Drawer, and remove the elements inside from the keyboard access.
         * @emits close
         * @emits hide - for backward compatibility
         */
        close: function() {
            if (this._open) {
                this._open = false;
                this.classList.remove('slide-in');
                this.classList.add('slide-out');

                // remove backdrop if we have one
                if (this.backdrop) {
                    if (!this.reactLayering) {
                        Underlay.hide();
                    }
                    setTimeout(function() {
                        this.ownerDocument.documentElement.style.overflow = 'auto';
                        this.ownerDocument.body.classList.remove('overflow-hidden');
                    }.bind(this), 350);
                }

                // restore focus to last active element before drawer was opened
                if (this._lastFocus) {
                    this._lastFocus.focus();
                }

                this._lastFocus = null;

                this.emit('close');
                this.emit('hide'); // for backward compatibility
            }
        },

        postRender: function _() {
            _.super(this);

            // Cache input
            var section = renderedSection(this) || userProvidedMain(this) || userProvidedSection(this),
                footer = renderedFooter(this) || userProvidedFooter(this);

            // Destroy children
            utils.removeAllChildrenFrom(this);

            // Create and append "template"
            this.appendChild(renderAside(section, this.componentId, footer));
        }
    });

    return register('ha-drawer-large', HADrawerLarge);
});


define('text!hui/page-message/page-message.html',[],function () { return '<template>\n    <span class="hi-icon-{{type}}"></span>\n    <button class="btn hi hi-close" aria-label="Close"></button>\n    <header>\n        <h4>{{titleText}}</h4>\n    </header>\n    <div class="message-content">{{message}}</div>\n</template>\n';});


define('hui/page-message',[
    'register-component/v2/UIComponent',
    'register-component/v2/register',
    'object-utils/classes',
    './core/a11y',
    'register-component/template!./page-message/page-message.html'
], function(UIComponent, register, classes, a11y) {
    'use strict';

    var HAPageMessage;

    /**
     * When a message is closed, finds a new target to give focus to
     * @param  {HTMLElement} component The page message component
     */
    function _handleFocusOnClose(component) {
        var destinationFocus;

        destinationFocus = component.previousElementSibling || component.parentElement.previousElementSibling;
        if (destinationFocus) {
            destinationFocus.focus();
        }
    }

    HAPageMessage = classes.createObject(UIComponent, {

        /**
         * Executed on show message.
         * @emits PageMessage#show
         */
        show: function() {
            this.classList.remove('hidden');
            this.emit('show');
        },

        init: function _() {
            _.super(this);

            /**
             * Content of the message
             */
            this._message = null;

            /**
             * Show a close button.
             * @type {Boolean}
             */
            this._dismissible = true;

            this.setupProperties({
                /**
                 * Title of the message.
                 * @type {String}
                 */
                titleText: {
                    default: '',
                    type: String,
                    change: function(newValue) {
                        var headerNode = this.querySelector('header'),
                            textContainer = this.querySelector('h4');

                        if (newValue) {
                            if (!headerNode) {
                                headerNode = this.ownerDocument.createElement('header');
                                textContainer = this.ownerDocument.createElement('h4');

                                headerNode.appendChild(textContainer);
                                this.insertBefore(headerNode, this.querySelector('.message-content'));
                            }
                            textContainer.textContent = newValue;
                            this.setAttribute('aria-label', newValue);
                        } else {
                            if (headerNode) {
                                this.removeChild(headerNode);
                            }
                            this.removeAttribute('aria-label');
                        }
                    }
                },

                /**
                 * Type of the message:
                 *  - info
                 *  - warn
                 *  - alert for backward compatibility
                 *  - error
                 * @type {String}
                 * @default: info
                 */
                type: {
                    default: 'info',
                    type: String,
                    change: function(newValue) {
                        var iconEl = this.querySelector('span.message-icon');

                        if (newValue === 'alert' || newValue === 'warn' || newValue === 'error') {
                            iconEl.className = 'message-icon hi hi-circle-alert';
                        } else if (newValue === 'discovery') {
                            iconEl.className = 'message-icon hi hi-lightbulb-o';
                        } else {
                            iconEl.className = 'message-icon hi hi-circle-info';
                        }
                        if (newValue === 'alert') {
                            console.warn('DEPRECATION WARNING: The "alert" type is going to be deprecated. From now on, please use "error" type instead.');
                        }
                    }
                }
            });

            /**
             * Executed when the user click on close button.
             * @emits PageMessage#dismiss
             */
            this.on('button.btn.hi-close:click', function() {
                this.emit('dismiss');
                this.close();
            }.bind(this));
        },

        set message(newValue) {
            var content = this.querySelector('.message-content');
            if (typeof newValue === 'string') {
                content.innerHTML = newValue;
                this._message = newValue;
            } else if (newValue.nodeType) {
                content.innerHTML = '';
                content.appendChild(newValue);
                this._message = newValue;
            }
        },

        get message() {
            return this._message;
        },

        /**
         * Show a close button.
         * @type {Boolean}
         */
        set dismissible(newValue) {
            var closeButton = this.querySelector('button');
            if (newValue) {
                closeButton.classList.add('show');
                closeButton.removeAttribute('aria-hidden');
            } else {
                closeButton.classList.remove('show');
                closeButton.setAttribute('aria-hidden', true);
            }
            this._dismissible = newValue;
        },

        get dismissible() {
            return this._dismissible;
        },

        /**
         * Callback attached after the Component render
         * Set the attributes for the component.
         */
        postRender: function _() {
            var contentEl = this.querySelector('.message-content'),
                typeIconEl = this.querySelector('span.message-icon'),
                titleEl = this.querySelector('h4'),
                closeButtonEl = this.querySelector('button'),
                headerEl,
                messageContent;

            _.super(this);
            a11y.addA11yFocus(this);
            if (contentEl) {
                messageContent = contentEl.innerHTML;
            } else {
                messageContent = this.innerHTML;

                this.innerHTML = '';

                closeButtonEl = this.ownerDocument.createElement('button');
                closeButtonEl.className = 'btn hi hi-close';
                closeButtonEl.setAttribute('aria-hidden', true);
                closeButtonEl.setAttribute('aria-label', 'close');

                contentEl = this.ownerDocument.createElement('div');
                contentEl.className = 'message-content';
                headerEl = this.ownerDocument.createElement('header');

                if (!typeIconEl) {
                    typeIconEl = this.ownerDocument.createElement('span');
                    typeIconEl.classList.add('message-icon');
                }

                typeIconEl.setAttribute('aria-hidden', true);

                titleEl = this.ownerDocument.createElement('h4');

                headerEl.appendChild(titleEl);

                this.appendChild(typeIconEl);
                this.appendChild(closeButtonEl);
                this.appendChild(headerEl);
                this.appendChild(contentEl);
            }

            this.setAttribute('role', 'alert');
            this.dismissible = this.getAttribute('dismissible') !== 'false';
            this.message = messageContent;
            this.tabIndex = -1;
        },

        /**
         * Hides the element.
         * @emits PageMessage#hide
         * @deprecated Should be use PageMessage#close instead of PageMessage#hide.
         */
        hide: function() {
            console.warn('DEPRECATION WARNING: The "hide" event is going to be deprecated. From now on, please use "close" method instead.');
            this.emit('hide');
            this.close();
        },

        /**
         * Closes the element.
         * @emits PageMessage#close
         */
        close: function() {
            _handleFocusOnClose(this);
            this.classList.add('hidden');
            this.emit('close');
        },

        /**
         * This method must be removed, once the hide method is also removed.
         */
        addEventListener: function _() {
            HTMLElement.prototype.addEventListener.apply(this, arguments);
            if (arguments[0] === 'hide') {
                console.warn('DEPRECATION WARNING: The hide event is going to be deprecated. From now on, please use "close" instead.');
            }
        }
    });

    return register('ha-page-message', HAPageMessage);
});

/**
 * @module
 * @class HATable
 * The ha-table component, which wraps dgrid and provides additional, custom
 * functionality such as custom editing, row reordering, content groups, filtering,
 * and batch action mode
 */
define('hui/table',[
    'require',
    'register-component/v2/register',
    'register-component/v2/UIComponent',
    'object-utils/classes',
    './core/utils',
    './core/a11y',
    './core/deviceUtils',
    './core/event',
    './helpers/string.helper',
    './table/TableBase',
    './table/RowEditingRenderer',
    './table/RowExpansionRenderer',
    './table/responsive/StackedRenderer',
    './table/responsive/ColumnLockingRenderer',
    './table/responsive/ResponsiveDefaultRenderer',
    'register-component/template!./table/table.html',
    'register-component/template!./table/print.html',
    'register-component/template!dgrid/css/dgrid.css',
    './table-column',
    './radio-button',
    './radio-button-group',
    './checkbox',
    './drawer-large',
    './popover',
    './popover-form',
    './tags',
    './page-message'
], function(require,
            register,
            UIComponent,
            classes,
            utils,
            a11y,
            deviceUtils,
            eventUtil,
            stringHelper,
            TableBase,
            RowEditingRenderer,
            RowExpansionRenderer,
            StackedRenderer,
            ColumnLockingRenderer,
            ResponsiveDefaultRenderer,
            template,
            printTemplate,
            dgridCss) {
    var YesNoType = utils.YesNoType,
        HATable,
        FORM_ELEMENT_NAMES = [
            'ha-checkbox',
            'ha-radio-button-group',
            'ha-select',
            'ha-select-type-ahead',
            'ha-text-field',
            'ha-text-field-type-ahead'
        ];

    HATable = classes.createObject(UIComponent, /** @lends HATable# */ {
        /** @constructs */
        init: function _() {
            _.super(this);

            /**
             * the filterNodes property which will be accessible through accessor methods
             * @type {HTMLElement[]}
             * @private
             */
            this._filterNodes = null;

            // all of these properties directly map to dgrid properties and simply call ._set()
            /** @lends HATable# */
            var properties = {
                /**
                 * The render modes to retrieve
                 * @type {Object}
                 * @default
                 */
                renderMode: '',
                /**
                 * The selection mode of the table.
                 * multiple, single, none, extended, and toggle
                 * @type {string}
                 * @default
                 */
                selectionMode: 'toggle',
                /**
                 * Allows all rows on the page to be selected if true
                 * @type {boolean}
                 * @default
                 */
                allowSelectAll: true,
                /**
                 * The loading message to display when the table is gathering data to show
                 * @type {string}
                 * @default
                 */
                loadingMessage: '<div class="infinite-loader"></div><span class="sr-only">Loading</span>',
                /**
                 * The message to display when there is no data in the table
                 * @type {string}
                 * @default
                 */
                noDataMessage: '<p class="ha-table-no-data">No data available</p>',
                /**
                 * The status text for pagination, showing the start, end and total
                 * The string must contain ${start}, ${end}, and ${total} tokens
                 * @type {string}
                 * @default
                 */
                paginationText: '${start}-${end} of ${total}',
                /**
                 * The text to use for the first page button in pagination
                 * @type {string}
                 * @default
                 */
                paginationFirstText: '< First',
                /**
                 * The text to use for the previous page button in pagination
                 * @type {string}
                 * @default
                 */
                paginationPreviousText: 'Previous',
                /**
                 * The text to use for the next page button in pagination
                 * @type {string}
                 * @default
                 */
                paginationNextText: 'Next',
                /**
                 * The text to use for the last page button in pagination
                 * @type {string}
                 * @default
                 */
                paginationLastText: 'Last >',
                /**
                 * The text value to set as the ARIA label of the pagination node
                 * @type {string}
                 * @default
                 */
                paginationAriaLabel: 'table pagination',
                /**
                 * The text value to display in the 'Apply' button in the settings drawer on mobile
                 * @type {string}
                 * @default
                 */
                settingsApplyButtonLabel: 'Apply',
                /**
                 * The text value to display in the 'Reset' button in the settings drawer on mobile
                 * @type {string}
                 * @default
                 */
                settingsResetButtonLabel: 'Reset',
                /**
                 * The text value to display in the title of the settings drawer on mobile
                 * @type {string}
                 * @default
                 */
                settingsTitleText: 'Table Settings',

                /**
                 * Whether or not to show sort options on mobile
                 * @type {boolean}
                 * @default
                 */
                showMobileSortOptions: true,
                /**
                 * The text value to display as the title of the sort options in the mobile settings drawer
                 * @type {string}
                 * @default
                 */
                mobileSortingText: 'Sort by',
                /**
                 * The text value to display as the title of the sort order option in the mobile settings drawer
                 * @type {string}
                 * @default
                 */
                mobileSortOrderText: 'Sort order',
                /**
                 * The text to display as the ascending sort option in the mobile settings drawer
                 * @type {string}
                 * @default
                 */
                mobileSortAscendingText: 'Ascending',
                /**
                 * The text to display as the descending sort option in the mobile settings drawer
                 * @type {string}
                 * @default
                 */
                mobileSortDescendingText: 'Descending',

                /**
                 * If set, any item in the table where property is set will be displayed as a header, and will have a dropdown button to expose child data beneath it.
                 * @type {string}
                 * @default
                 */
                categoryProperty: '',
                /**
                 * If true, expand all category rows
                 * @type {boolean}
                 * @default
                 */
                expandAll: false,
                /**
                 * Whether to allow batch mode, injecting an additional batch column into the table
                 * @type {boolean}
                 * @default
                 */
                allowBatchMode: false,
                /**
                 * The ARIA label to apply to the batch mode checkboxes
                 * @type {string}
                 * @default
                 */
                batchCellAriaLabel: 'batch edit',
                /**
                 * The ARIA label to apply to the batch mode checkboxes
                 * @type {string}
                 * @default
                 */
                batchSelectAriaLabel: 'select this row',
                /**
                 * The ARIA label to apply to the batch mode select all checkbox
                 * @type {string}
                 * @default
                 */
                batchSelectAllAriaLabel: 'Select all rows for editing',

                /**
                 * The ARIA label to apply to the batch mode select all header
                 * @type {string}
                 * @default
                 */
                batchSelectAllHeaderAriaLabel: 'Select rows for editing',

                /**
                 * Turns on or off drag and drop row reordering
                 * @type {boolean}
                 * @default
                 */
                allowRowReordering: false,
                /**
                 * Turns on or off row deletion
                 * @type {boolean}
                 * @default
                 */
                allowRowDeletion: false,
                /**
                 * Whether to show the table header row or not
                 * @type {boolean}
                 */
                showHeader: true,

                /**
                 * Whether to show the table footer or not
                 * @type {boolean}
                 */
                showFooter: true,
                /**
                 * indicator for whether the table is in print mode.
                 * @type {Boolean}
                 */
                print: false,
                /**
                 * The i18n label for the Total row
                 * @type {string}
                 * @default
                 */
                totalText: 'TOTAL',
                /**

                 * @name editMode
                 * @type {String}
                 * The type edit that is currently allowed on the table
                 * Allowed values are "specific" and anything else
                 */
                editMode: '',

                /**
                 * The number of rows to keep rendered beyond each end of the currently visible area of the component.
                 * @type {number}
                 * @default
                 */
                bufferRows: 10,
                /**
                 * The minimum distance (in pixels) which must exist between the currently visible area and
                 * previously-rendered rows before they are removed from the DOM.
                 * @type {number}
                 * @default
                 */
                farOffRemoval: 2000,
                /**
                 * The maximum size (in pixels) of unrendered space below or above the rendered portion of the
                 * component; default is Infinity, which indicates that the size of unrendered space should
                 * approximate the total space which would be occupied by all items in the result set.
                 * @type {number}
                 * @default
                 */
                maxEmptySpace: Infinity,
                /**
                 * The maximum number of items that will be requested at one time while scrolling.
                 * @type {number}
                 * @default
                 */
                maxRowsPerPage: 250,
                /**
                 * The minimum number of items that will be requested at one time while scrolling.
                 * @type {number}
                 * @default
                 */
                minRowsPerPage: 25,
                /**
                 * Specifies the number of milliseconds to debounce or throttle scroll handler calls
                 * (and thus also potential store requests).
                 * @type {number}
                 * @default
                 */
                pagingDelay: 15,
                /**
                 * Specifies the method from the dgrid/util/misc module to use for throttling the scroll handler;
                 * defaults to "debounce" to wait until scrolling stops, but can also be set to "throttleDelayed"
                 * to load even as scrolling continues.
                 * @type {string}
                 * @default
                 */
                pagingMethod: 'debounce',
                /**
                 * Specifies the number of items to overlap between queries, which helps ensure consistency
                 * of observed updates to items at page boundaries.
                 * @type {number}
                 * @default
                 */
                queryRowsOverlap: 0,

                /**
                 * Specifies the deletion icon class to use for the row delete option.
                 * @type {String}
                 * @default
                 */
                deletionIconClass: 'hi-delete'
            }, attributes = {};

            Object.keys(properties).forEach(function(property) {
                var value = properties[property];
                attributes[property] = {
                    type: utils.type(value),
                    default: value,
                    change: function(value) {
                        this._set(property, value);
                    }
                };
            });
            this.setupProperties(attributes);

            this.setupProperties(/** @lends HATable# */ {
                /**
                 * toggleable property to set compact mode
                 * @type {boolean}
                 * @default false
                 */
                compact: {
                    default: false,
                    type: YesNoType,
                    change: function(compact) {
                        this.classList[compact ? 'add' : 'remove']('compact');
                        this._compactCheckbox.checked = this.compact;
                        this._saveSettings();
                    }
                },
                /**
                 * The number of rows to show per page
                 * @name rowsPerPage
                 * @type {Number}
                 */
                rowsPerPage: {
                    default: 150,
                    type: Number,
                    change: function(value) {
                        this._set('rowsPerPage', value);
                        this._rowsPerPageGroup.value = value;
                        this._saveSettings();
                    }
                },
                /**
                 * Hides the table bar if false, else shows the table bar if there is content in it
                 * @type {boolean}
                 */
                showTableBar: {
                    type: YesNoType,
                    default: true,
                    change: function() {
                        this._refreshTableBar();
                    }
                },
                /**
                 * The type of filter to be applied to the table.
                 * Possible values are 'simple-find', 'simple-filter', and 'complex-filter'
                 * @type {string}
                 */
                filterType: {
                    default: '',
                    type: String,
                    change: function() {
                        this._renderFilter();
                        this._refreshTableBar();
                    }
                },
                /**
                 * Placehodler text for the 'simple-find' filter type
                 * @type {string}
                 */
                simpleFindPlaceholderText: {
                    default: '',
                    type: String
                },
                /**
                 * Shows the edit button in the tablebar is true
                 * @type {boolean}
                 * @default false
                 */
                showEditMode: {
                    default: false,
                    type: YesNoType,
                    change: function() {
                        this._refreshTableBar();
                    }
                },
                /**
                 * The text value for the edit cancel button
                 * @type {string}
                 * @default Cancel
                 */
                editModeCancelText: {
                    default: 'Cancel',
                    type: String
                },
                /**
                 * The text value for the edit save button
                 * @type {string}
                 * @default Save
                 */
                editModeSaveText: {
                    default: 'Save',
                    type: String
                },
                /**
                 * Shows the print icon in the tablebar if true
                 * @type {boolean}
                 * @default false
                 */
                showPrintList: {
                    default: false,
                    type: YesNoType,
                    change: function() {
                        this._refreshTableBar();
                    }
                },
                /**
                 * Shows the export icon if true
                 * @type {boolean}
                 * @default false
                 */
                showExport: {
                    default: false,
                    type: YesNoType,
                    change: function() {
                        this._refreshTableBar();
                    }
                },
                /**
                 * Shows the settings icon if true
                 * @type {boolean}
                 * @default false
                 */
                showSettings: {
                    default: false,
                    type: YesNoType,
                    change: function() {
                        this._refreshTableBar();
                    }
                },
                /**
                 * Show the column hider section in the settings if true
                 * @type {boolean}
                 * @default true
                 */
                showColumnHider: {
                    default: true,
                    type: YesNoType,
                    change: function(showColumnHider) {
                        if (this._columnHiderNode) {
                            if (showColumnHider) {
                                this._updateColumnHider();
                                this._columnHiderNode.classList.remove('hidden');
                            } else {
                                this._columnHiderNode.classList.add('hidden');
                            }
                        }
                    }
                },
                /**
                 * Show the display density option in settings if true
                 * @type {boolean}
                 * @default false
                 */
                showDisplayDensitySettings: {
                    default: false,
                    type: YesNoType,
                    change: function(showDisplayDensitySettings) {
                        if (this._displayDensityNode) {
                            if (showDisplayDensitySettings) {
                                this._displayDensityNode.classList.remove('hidden');
                            } else {
                                this._displayDensityNode.classList.add('hidden');
                            }
                        }
                    }
                },
                /**
                 * Show the Rows Per Page option in settings if true
                 * @type {boolean}
                 * @default false
                 */
                showRowsPerPageSettings: {
                    default: false,
                    type: YesNoType,
                    change: function(showRowsPerPageSettings) {
                        if (this._rowsPerPageNode) {
                            if (showRowsPerPageSettings) {
                                this._rowsPerPageNode.classList.remove('hidden');
                            } else {
                                this._rowsPerPageNode.classList.add('hidden');
                            }
                        }
                    }
                },
                /**
                 * optional link to a CSS file that will be loaded when printing a table
                 * @type {string}
                 */
                printListAdditionalCSSFile: {
                    default: '',
                    type: String
                },

                printListFontFamily: {
                    default: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    type: String
                },
                /**
                 * Displayed when printing a table
                 * @type {string}
                 */
                printListTitleText: {
                    default: '',
                    type: String
                },
                /**
                 * Displayed when printing a table
                 * @type {string}
                 */
                printListSubTitleText: {
                    default: '',
                    type: String
                },

                /**
                 * The text to display in the batch selection label for singular items
                 * @type {string}
                 * @default {count} item selected
                 */
                batchItemSelectedText: {
                    default: '{count} item selected',
                    type: String
                },

                /**
                 * The text to display in the batch selection label for plural items
                 * @type {string}
                 * @default {count} items selected
                 */
                batchItemsSelectedText: {
                    default: '{count} items selected',
                    type: String
                },

                /**
                 * The text value for the Edit button
                 * @type {string}
                 * @default Edit Table
                 */
                editIconText: {
                    default: 'Edit Table',
                    type: String,
                    change: function(editIconText) {
                        this._setIconA11yText('edit', editIconText);
                    }
                },
                /**
                 * The text value for the Print button
                 * @type {string}
                 * @default Print Table
                 */
                printIconText: {
                    default: 'Print Table',
                    type: String,
                    change: function(printIconText) {
                        this._setIconA11yText('print', printIconText);
                    }
                },
                /**
                 * The text value for the Export button
                 * @type {string}
                 * @default Export Table
                 */
                exportIconText: {
                    default: 'Export Table',
                    type: String,
                    change: function(exportIconText) {
                        this._setIconA11yText('export', exportIconText);
                    }
                },
                /**
                 * The text value for the Settings button
                 * @type {string}
                 * @default View Table Settings
                 */
                settingsIconText: {
                    default: 'View Table Settings',
                    type: String,
                    change: function(settingsIconText) {
                        this._setIconA11yText('settings', settingsIconText);
                    }
                },
                /**
                 * Optional parameter specifying a persistentId(across sessions) for this table;
                 * needs to be specified, along with userId, in order for sort configuration to be
                 * saved across sessions.
                 * @type {string}
                 */
                persistentId: {
                    default: '',
                    type: String,
                    change: function(persistentId) {
                        this._set('persistentId', persistentId);
                        this._loadSettings();
                    }
                },
                /**
                 * Optional parameter specifying the ID of the currently logged in user;
                 * needs to be specified, along with persistentId, in order for sort configuration
                 * to be saved across sessions.
                 * @type {string}
                 */
                userId: {
                    default: '',
                    type: String,
                    change: function(userId) {
                        this._set('userId', userId);
                        this._loadSettings();
                    }
                },
                /**
                 * The text value for the "Display density" section's "Compact" checkbox label
                 * @type {string}
                 * @default Compact
                 */
                compactText: {
                    default: 'Compact',
                    type: String,
                    change: function(compactText) {
                        if (this._compactCheckbox) {
                            this._compactCheckbox.label = compactText;
                        }
                    }
                },
                /**
                 * The text value for the "Edit columns" (column hider) section heading
                 * @type {string}
                 * @default Edit columns
                 */
                editColumnsText: {
                    default: 'Edit columns',
                    type: String
                },
                /**
                 * The text value for the "Display density" section heading
                 * @type {string}
                 * @default Display density
                 */
                displayDensityText: {
                    default: 'Display density',
                    type: String,
                    change: function(displayDensityText) {
                        this._displayDensityNode.firstElementChild.textContent = displayDensityText;
                    }
                },
                /**
                 * The text value for the "Rows per page" section heading
                 * @type {string}
                 * @default Rows per page
                 */
                rowsPerPageText: {
                    default: 'Rows per page',
                    type: String
                },
                /**
                 * whether the table should auto-adjust its height
                 * @type {Boolean}
                 */
                autoheight: {
                    type: YesNoType,
                    default: false,
                    change: function(value) {
                        this._set('autoheight', value);
                        this._setMaxHeight(value ? null : this.maxHeight);
                    }
                },
                /**
                 * Max height for the grid
                 * @type {Number}
                 */
                maxHeight: {
                    default: 480,
                    type: Number,
                    change: function(maxHeight) {
                        this._setMaxHeight(maxHeight);
                    }
                },

                /**
                 * @type {Boolean}
                 * whether the table is in an editable state
                 */
                editable: {
                    default: false,
                    type: YesNoType,
                    change: function(value) {
                        this._set('editable', value);
                        this.setEditModeEnabled(value);
                        this._callIfExists('_togglePaginationButtons', !value);

                        if (value) {
                            this.showAllHiddenColumns();
                        }
                    }
                },

                /**
                 * The number of columns to lock to the side of the screen
                 * @type {number}
                 */
                lockedColumns: {
                    default: 0,
                    type: Number,
                    change: function(newValue) {
                        this._callIfExists('_setLockedColumns', newValue);
                    }
                },

                /**
                 * The filter text
                 * @type {string}
                 */
                activeFiltersText: {
                    default: 'Filters Active ({{count}})',
                    type: String,
                    change: function() {
                        this._refreshFilterStatus();
                    }
                },

                /**
                 * Turn on/off row editing
                 * @type {Boolean}
                 */
                allowRowEditing: {
                    default: false,
                    type: Boolean,
                    change: function(newValue) {
                        if (newValue) {
                            this._enableRowEditing();
                        } else {
                            this._disableRowEditing();
                        }
                    }
                },

                /**
                 * The text that should appear on the row editor, if a save button is visible.
                 */
                rowEditSaveText: {
                    default: 'Save',
                    type: String
                },

                /**
                 * The text that should appear as the title of the row editor, if the title is visible.
                 */
                rowEditTitle: {
                    default: '',
                    type: String
                },

                /**
                 * The text that should appear on the option to cancel row editing
                 */
                rowEditCancelText: {
                    default: 'Cancel',
                    type: String
                }
            });

            /**
             * The template value
             */
            this.template = template;

            this._columns = this._getColumns();
            this.originalColumns = utils.clone(this._columns);
        },

        postRender: function() {
            a11y.addA11yFocus(this);
            /**
             * The toolbar node
             * @protected
             */
            this._toolbarNode = this.querySelector('.tablebar');

            /**
             * The grid node
             * @protected
             */
            this._gridNode = this.querySelector('.grid-node');

            //this._editPopover = this._toolbarNode.querySelector('ha-popover.edit');
            this._settingsIconButton = this._toolbarNode.querySelector('button[name="settings"]');
            this._editIconButton = this._toolbarNode.querySelector('button[name="edit"]');
            this._printIconButton = this._toolbarNode.querySelector('button[name="print"]');
            this._exportIconButton = this._toolbarNode.querySelector('button[name="export"]');
            this._defaultNode = this.querySelector('.tablebar-default');

            if (deviceUtils.isMobile()) {
                this._settingsPopover = this._toolbarNode.querySelector('.ha-table-settings-popover');

                if (this._settingsPopover) {
                    this._settingsPopover.parentNode.removeChild(this._settingsPopover);
                    this._settingsPopover = null;
                }

                this._settingsDrawer = this._renderSettingsDrawer();
            } else {
                this._settingsPopover = this._toolbarNode.querySelector('.ha-table-settings-popover');
                this._columnHiderNode = this._settingsPopover.querySelector('.column-hider');
                this._displayDensityNode = this._settingsPopover.querySelector('.display-density');
                this._compactCheckbox = this._displayDensityNode.querySelector('ha-checkbox[name=compactCheckbox]');
                this._rowsPerPageNode = this._settingsPopover.querySelector('.rows-per-page');
                this._rowsPerPageGroup = this._rowsPerPageNode.querySelector('ha-radio-button-group[name=rowsPerPage]');
                this.otherSettingsNode = this._settingsPopover.querySelector('.custom');

                eventUtil.on(this._settingsPopover, '.edit-columns ha-checkbox:change', this._onChangeEditColumn.bind(this));
                eventUtil.on(this._settingsPopover, '.display-density ha-checkbox:change', this._onChangeDisplayDensity.bind(this));
                eventUtil.on(this._settingsPopover, '.rows-per-page ha-radio-button-group:change', this._onChangeRowsPerPage.bind(this));
            }

            this.listenTo(this._defaultNode, 'button:click', function(event) {
                var name = event.target.name,
                    method = this['_onClick' + name.charAt(0).toUpperCase() + name.slice(1)];

                /* istanbul ignore else */
                if (method) {
                    method.call(this, event);
                }
            }.bind(this));

            this.table = this._createGrid();
            this.on('table-resize', this._calculateInitialHeight.bind(this));
            this._batchNode = this.querySelector('.batch-node');
            this._batchBarNode = this.querySelector('.tablebar-batch');
            this._batchCountNode = this.querySelector('.batch-count');

            this._editNode = this.querySelector('.tablebar-edit');
            this._filterNode = this.querySelector('.filter-node');

            // Custom nodes in the table bar to add content to
            this.tableBarCustomNode = this.querySelector('.custom-node');
            this.tableBarCustomActionNode = this.querySelector('.custom-action-node');

            /**
             * The current state of the batch mode
             * @type {Boolean}
             * @private
             */
            this._batchModeEnabled = false;
            this.on('ha-table-column:column-change', function() {
                this.columns = this._getColumns();
            }.bind(this));

            this.on('batch-select', function() {
                this._checkBatchMode(true);
            }.bind(this));

            this.on('batch-deselect', function(event) {
                this._checkBatchMode();
                this.clearErrors(event.rows.map(function(row) {
                    return row.id;
                }));
            }.bind(this));

            this._calculateInitialHeight();
            this.on('row-remove', this._adjustHeight.bind(this, false));
            this.on('row-insert', this._adjustHeight.bind(this, true));

            this.on('refresh-complete', function() {
                this._refreshTableBar();
                if (!this.table.gotoPage) {
                    this._calculateInitialHeight();
                } else {
                    // Make sure we still reset any adjusted styles
                    this.table.resetParentStyles();
                }
            }.bind(this));

            // listen to the editor buttons and emit events
            this.listenTo(this.querySelector('.edit-cancel'), 'click', this.onEditCancel.bind(this));
            this.listenTo(this.querySelector('.edit-save'), 'click', this.onEditSave.bind(this));

            this._loadSettings();
            this._addRenderModes();

            this._rowExpansion = true;
            this._rowExpansionRenderer = null;
        },

        detachedCallback: function() {
            var settingsContainer = this._settingsPopover || this._settingsDrawer;

            if (settingsContainer.parentElement) {
                settingsContainer.parentElement.removeChild(settingsContainer);
            }
        },

        /**
         * Set the max height of the table
         * @param {number|null} height - the max height to set on the table dom node
         * @private
         */
        _setMaxHeight: function(height) {
            var node = this._get('domNode');
            if (height) {
                height = height + 'px';
            }
            /* istanbul ignore else */
            if (node) {
                node.style.maxHeight = height;
            }
        },

        /**
         * calculate the initial height of the table, adjusting to it
         * can be the exact height needed to a certain maxHeight and then not grow
         * past that
         * @private
         */
        _calculateInitialHeight: function(event) {
            // See OnDemandContentGroups#_processScroll for info on '_isProcessingScroll'
            if (this._get('_isProcessingScroll') && event && event.type === 'table-resize') {
                return;
            }

            var dgrid = this._get('domNode'),
                height = 0;
            if (dgrid) {

                /* istanbul ignore else */
                if (this.table.headerNode) {
                    height += this.table.headerNode.offsetHeight;
                }

                /* istanbul ignore else */
                if (this.table.footerNode) {
                    height += this.table.footerNode.offsetHeight;
                }
                Array.prototype.forEach.call(this.querySelectorAll('.dgrid-row'), function(row) {
                    height += row.offsetHeight;
                });
                /**
                 * The height of the no data node the last time it was
                 * accounted for
                 * @type {Boolean}
                 * @private
                 */
                this._lastNoDataHeight = this.table.noDataNode ? this.table.noDataNode.offsetHeight : null;
                if (this._lastNoDataHeight) {
                    // add 35 for top margin on no-data node
                    height += this._lastNoDataHeight + 35;
                }
                dgrid.style.height = height + 'px';
            }

            this.table.resetParentStyles();
        },

        /**
         * Adjust the height of the grid based on when items are added
         * or removed
         * @param {Boolean} itemAdded - Whether an item was added or removed from the table
         * @param {Event} event - The event object
         * @private
         */
        _adjustHeight: function(itemAdded, event) {
            if (this._get('_cleanup') || this._get('_isProcessingScroll')) {
                return;
            }

            var dgrid = this._get('domNode'),
                heightStyle = dgrid.style.height,
                height = event.height,
                currentHeight = Number(heightStyle.substring(0, heightStyle.length - 2)),
                newHeight = itemAdded ? (currentHeight + height) : (currentHeight - height);

            if (itemAdded) {
                if (this._lastNoDataHeight) {
                    newHeight -= this._lastNoDataHeight;
                    this._lastNoDataHeight = null;
                }
            } else if (this.table.noDataNode) {
                this._lastNoDataHeight = this.table.noDataNode.offsetHeight;
                newHeight += this._lastNoDataHeight;
            }

            /* istanbul ignore else */
            if (!isNaN(newHeight)) {
                dgrid.style.height = newHeight + 'px';
            }
        },

        /**
         * The query that is applied to the collection. When the query is set, update the root collection
         */
        set query(query) {
            this._query = query;
            this._set('collection', query ? this._collection.filter(query) : this._collection);
            this.refresh();
        },

        get query() {
            return this._query;
        },

        /**
         * Check the current state of the selection on the table based
         * on select/deselect events
         * @param {Boolean} selecting
         * @protected
         */
        _checkBatchMode: function(selecting) {
            var numSelected = Object.keys(this.table.selection).reduce(function(total, key) {
                    return total + (this.table.selection[key] ? 1 : 0);
                }.bind(this), 0),
                contentString = (numSelected === 1 ? this.batchItemSelectedText : this.batchItemsSelectedText).replace(/\{count\}/, numSelected);

            this._batchCountNode.textContent = contentString;

            if (selecting && !this._batchModeEnabled) {
                this.setBatchModeActive(true);
            } else if (!numSelected && this._batchModeEnabled) {
                this.setBatchModeActive(false);
            }
            this._batchModeEnabled = !!numSelected;
        },

        attachedCallback: function() {
            if (this.table && !this.table._started) {
                this._callIfExists('startup');
            }
        },

        /**
         * Create the grid by calling the grid factory
         * This can be overwritten by other implementations (such as the virtual grid) to call
         * the factory with the appropriate options
         * @protected
         * @return {Grid}
         */
        _createGrid: function() {
            return TableBase.factory({
                table: this,
                virtual: false,
                columns: this._columns
            }, this._gridNode);
        },

        /**
         * update the a11y text for icon buttons
         * @protected
         */
        _setIconA11yText: function(icon, text) {
            var iconTextSpan = this.querySelector('.hi-' + icon + ' + .icon-text');
            if (iconTextSpan) {
                iconTextSpan.textContent = text;
            }
        },

        /**
         * Set a property on the dgrid isntance, if it exists
         * @param {String} property the property to set on the dgrid instance
         * @param {any} value the value to set on that property
         * @private
         */
        _set: function(property, value) {
            return this._callIfExists('set', property, value);
        },

        /**
         * Get a property on the dgrid instance, if it exists
         * @param {String} property the property to retrieve from the dgrid instance
         * @return {any} the value of the property from the dgrid instance
         * @private
         */
        _get: function(property) {
            return this._callIfExists('get', property);
        },

        /**
         * If the dgrid instance exists, call the method and pass the additional arguments to it.
         * Otherwise, do nothing
         * @param {String} method the method to check and call on the dgrid instance
         * @return {any} the return value  of the method call
         * @private
         */
        _callIfExists: function(method) {
            var args = Array.prototype.slice.call(arguments, 1);
            return this.table && this.table[method] && this.table[method].apply(this.table, args);
        },

        /**
         * Parse ha-table-column nodes and return a column definition
         * @return {Object} the column definition
         * @private
         */
        _getColumns: function() {
            var columnNodes = Array.prototype.map.call(this.querySelectorAll('ha-table-column'), function(column) {
                    return column.getColumnDefinition();
                }),
                columns = columnNodes.length ? columnNodes : this.columns;
            return columns;
        },

        /**
         * Add a new render mode to the table
         */
        addRenderMode: function() {
            this.table.addRenderMode.apply(this.table, arguments);
        },

        /**
         * Remove the render mode
         * @param {String} name The name of the render mode to remove
         */
        removeRenderMode: function(name) {
            this._callIfExists('removeRenderMode', name);
        },

        /**
         * The column definition, used by the dgrid instance
         * @type {Object|Array}
         */
        set columns(columns) {
            // Allow the render mode to cleanup setup
            // it may have related to the current column structure.
            if (this.renderMode && this.rendererFactory) {
                this.rendererFactory(this.renderMode, 'cleanup', this.table)(this.table);
            }

            this._columns = columns;
            this.originalColumns = utils.clone(columns, this.table ? [this.table] : []);
            this._set('columns', columns);
            this._loadSettings();
            this._updateColumnHider();
            this.updateFactorySettings();
            // Allow the render mode to perform setup with the new
            // column structure.
            if (this.renderMode && this.rendererFactory) {
                this.rendererFactory(this.renderMode, 'setup', this.table)(this.table);
            }
        },

        get columns() {
            return this._get('columns') || this._columns;
        },

        /**
         * Sort options for the table
         * @type {Array|Function}
         */
        set sort(sort) {
            this._set('sort', sort);
        },

        get sort() {
            return this._get('sort');
        },

        /**
         * The render modes to retrieve
         * @type {Object}
         */
        get renderModes() {
            return this._get('renderModes');
        },

        /**
         * Which fields can have edit toggled
         * Should only be set once when the table is created
         * @param {string[]} fields - the fields to make editable
         */
        set editableFields(fields) {
            this._set('editableFields', fields);
        },

        get editableFields() {
            return this._get('editableFields');
        },

        /**
         * Sets the element ot use for the export button.
         * @param {HTMLElement} exportButtonNode The element to use for the export button
         */
        set exportButton(exportButtonNode) {
            this._exportIconButton.parentNode.replaceChild(exportButtonNode, this._exportIconButton);
            this._exportIconButton = exportButtonNode;
        },

        get exportButton() {
            return this._editIconButton;
        },

        /**
         * If true, the table bar should be displayed
         * @type {boolean}
         */
        get hasToolbarContent() {
            return Boolean(this.filterType || this.showEditMode || this.allowBatchMode || this.showPrintList ||
                this.showExport || this.showSettings || this.otherSettingsNode);
        },

        /**
         * determine whetheer the TableBar should be shown
         * @return {Boolean}
         * @private
         */
        _shouldShowToolbar: function() {
            return this.showTableBar && !!(this.filterType || this.showEditMode || this.allowBatchMode || this.showPrintList || this.showExport || this.showSettings);
        },

        /**
         * The method to determine the row status, called for each row
         * @type {Function}
         */
        set rowStatus(rowStatus) {
            this._set('rowStatus', rowStatus);
        },

        get rowStatus() {
            return this._get('rowStatus');
        },

        /**
         * The dstore instance to be utilized by the store
         * @type {Object}
         */
        set collection(collection) {
            this._collection = collection;
            this._set('collection', collection);
        },

        get collection() {
            return this._get('collection');
        },

        /**
         * @private
         * Callback for the filter button click
         */
        _onClickFilter: function() {
            var popover = this.filterNodes[0];
            popover.show({detail: this.query});
        },

        /**
         * @private
         */
        _renderFilter: function() {
            var doc = this.ownerDocument,
                filterNode = this._filterNode,
                filterNodes = this.filterNodes,
                button,
                icon,
                srText,
                tags,
                textInput,
                searchContainer,
                cancelButton,
                originalTableBar;

            filterNode.innerHTML = '';
            filterNode.classList.remove('mobile-filter-bar');
            this._tags = null;

            if (this.filterType === 'complex') {
                button = doc.createElement('button');
                icon = doc.createElement('span');
                srText = doc.createElement('span');
                icon.classList.add('hi');
                icon.classList.add('hi-filter');
                icon.setAttribute('aria-hidden', true);
                srText.classList.add('sr-only');
                srText.textContent = 'Filter';
                button.name = 'filter';
                button.appendChild(icon);
                button.appendChild(srText);
                filterNode.appendChild(button);

                if (deviceUtils.isHandheld()) {
                    tags = this._filterStatus = doc.createElement('button');
                    tags.classList.add('filter-status');
                    tags.style.display = 'none';
                    tags.addEventListener('click', this._onClickFilter.bind(this));
                } else {
                    tags = this._tags = doc.createElement('ha-tags');
                    tags.maxDisplay = 3;
                }

                filterNode.appendChild(tags);

                if (filterNodes.length > 0) {
                    if (deviceUtils.isHandheld() && filterNodes[0].tagName === 'HA-POPOVER') {
                        filterNodes[0] = this._buildDrawerFromPopover(filterNodes[0]);
                        filterNodes[0].on('close', function() {
                            button.focus();
                        });
                    } else {
                        filterNodes[0].target = button;
                    }
                }
            } else if (this.filterType === 'simple' && deviceUtils.isHandheld() && filterNodes[0] && filterNodes[0].tagName === 'HA-TEXT-FIELD') {
                textInput = filterNodes[0];

                searchContainer = doc.createElement('div');
                searchContainer.className = 'mobile-table-filter table-bar tablebar-default';

                cancelButton = doc.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.addEventListener('click', function() {
                    searchContainer.parentNode.insertBefore(originalTableBar, searchContainer);
                    searchContainer.classList.remove('visible');
                    this._defaultNode = originalTableBar;

                    setTimeout(function() {
                        searchContainer.parentNode.removeChild(searchContainer);

                        textInput.value = '';
                        textInput.emit('change');
                    }, 300);
                }.bind(this));

                button = doc.createElement('button');
                icon = doc.createElement('span');
                icon.classList.add('hi');
                icon.classList.add('hi-search');
                button.appendChild(icon);
                button.setAttribute('aria-label', 'Filter');

                searchContainer.appendChild(textInput);
                searchContainer.appendChild(cancelButton);

                button.addEventListener('click', function() {
                    // open
                    originalTableBar = filterNode.parentElement;
                    originalTableBar.parentElement.appendChild(searchContainer);
                    this._defaultNode = searchContainer;

                    setTimeout(function() {
                        searchContainer.classList.add('visible');

                        setTimeout(function() {
                            originalTableBar.parentElement.removeChild(originalTableBar);
                            textInput.focus();
                        }, 300);
                    }, 0);
                }.bind(this));

                textInput.on('input', function() {
                    textInput.emit('change');
                });

                filterNode.classList.add('mobile-filter-bar');

                filterNode.appendChild(button);

                filterNodes = [];

                textInput.classList.add('mobile-text-field-force-open');
            } else if (this.filterType === 'simple' && deviceUtils.isHandheld()) {
                filterNode.classList.add('mobile-filter-bar');
            }

            filterNodes.forEach(function(node) {
                filterNode.appendChild(node);
            });
        },

        /**
         * Sets a filter on the table so that only rows mawtching the
         * criteria will be displayed
         * @param {Object|Function} query the data to filter on. For a complex filter, it is expected to be an object.  IF a functon, it will be executed for every row in the store.
         * @param {Object} [labels] customizable labels to display in the complex filter
         */
        filter: function(query, labels) {
            query = query || {};
            var tags = this._tags, filterStatus = this._filterStatus;
            this.query = query;

            if (tags) {
                tags.tags = Object.keys(query).map(function(value) {
                    var tag = document.createElement('ha-tag');
                    tag.label = labels ? labels[value] || query[value] : query[value];
                    tag.value = value;
                    return tag;
                });
            } else if (filterStatus) {
                this._refreshFilterStatus();
            }
        },

        /**
         * @private
         * Refresh the filter status based on the filters used
         */
        _refreshFilterStatus: function() {
            var filterCount = Object.keys(this.query || {}).length,
                filterStatus = this._filterStatus;

            if (filterStatus) {
                if (!filterCount) {
                    filterStatus.style.display = 'none';
                } else {
                    filterStatus.style.display = 'inline-block';
                    filterStatus.textContent = stringHelper.replaceKeys(this.activeFiltersText, {
                        count: filterCount
                    });
                }
            }
        },

        /**
         * The nodes to use as the filter components
         * @param {HTMLElement[]} nodes -  the nodes to use as the filtering components
         */
        set filterNodes(nodes) {
            if (!this.filterType) {
                this.filterType = 'simple';
            }

            if (nodes.length && this.filterType === 'complex') {
                if (nodes.length > 1) {
                    throw new Error('filterNodes: the array can only be of length 1 when the filterType is "complex"');
                }

                if ((nodes[0]).tagName.toLowerCase() !== 'ha-popover') {
                    throw new Error('filterNodes: This property only accepts ha-popover elements when the filterType is "complex"');
                }
            } else {
                nodes.forEach(function(node) {
                    var name = node.nodeName.toLowerCase();
                    if (name !== 'ha-select' && name !== 'ha-text-field') {
                        throw new Error('filterNodes: This property only accepts ha-select and ha-text-field elements when the filterType is "simple"');
                    }
                });

            }

            this._filterNodes = nodes;

            this._renderFilter();
        },

        get filterNodes() {
            var nodes = this._filterNodes;
            if (!nodes) {
                nodes = this._filterNodes = [];
            }
            return nodes;
        },

        get selection() {
            return this._get('selection');
        },

        /**
         * @see collection
         */
        set store(store) {
            this._set('collection', store);
        },

        get store() {
            return this._get('collection');
        },

        /**
         * The element used to contain the footer of the table
         * @type {HTMLElement}
         */
        set footerTotalNode(footerTotalNode) {
            this._set('footerTotalNode', footerTotalNode);
        },

        get footerTotalNode() {
            return this._get('footerTotalNode');
        },

        /**
         * The nodes that will be displayed on the batch portion
         * of the tablebar
         * @type {HTMLElement[]}
         */
        set batchNodes(nodes) {
            var batchNode = this._batchNode;
            batchNode.innerHTML = '';
            nodes.forEach(function(node) {
                batchNode.appendChild(node);
            });
        },

        get batchNodes() {
            return Array.prototype.slice.call(this._batchNode.childNodes);
        },

        /**
         * the name of the batch field property
         * @type {string}
         */
        get batchField() {
            return this._get('batchField');
        },

        /**
         * The name of the row reordering field property
         * @type {String}
         */
        get rowReorderField() {
            return this._get('rowReorderField');
        },

        /**
         * The renderer factory to use
         */
        set rendererFactory(rendererFactory) {
            this._set('rendererFactory', rendererFactory);
            this._addRenderModes();
        },

        get rendererFactory() {
            return this._get('rendererFactory');
        },

        /**
         * Set the totals that will be displayed in the totals row
         * @param {Object} totals - Key-value pairs - the key is the column the pairs should
         * be set in, the value is the total to set
         */
        set totals(totals) {
            this._set('totals', totals);
        },

        get totals() {
            return this._get('totals');
        },

        /**
         * Set the category totals
         * @see _setCategoryTotals
         */
        set categoryTotals(categoryTotals) {
            this._set('categoryTotals', categoryTotals);
        },

        get categoryTotals() {
            return this._get('categoryTotals');
        },

        /**
         * Sets what mode to display in on mobile or tablet
         * @param {string} responsiveLayout A string that can be either 'stacked', 'columnLocking', or ''. These correspond
         * to the stacked, column locking, and default responsive rendering modes
         */
        set responsiveLayout(responsiveLayout) {
            this._responsiveLayout = responsiveLayout;
            if (deviceUtils.isHandheld()) {
                this.cancelRowEdit();
                this.renderMode = this._responsiveLayout ? responsiveLayout + 'Renderer' : 'default';
                this._prepareRowEditor();
            }
        },

        get responsiveLayout() {
            return this._responsiveLayout;
        },

        /**
         * Return the cell object from the given target. This calls dgrid's cell method
         * @param {number|Object} target The target referring to the cell
         * @return {Object}
         */
        cell: function(target) {
            return this._callIfExists('cell', target);
        },

        /**
         * Return the row object from the given target.
         * The target can be a row id, row data object, row HTML element, or an event that has the row as its target.
         * @param {number|Object|HTMLElement|Event} target The target referring to the row
         * @return {Object}
         */
        row: function(target) {
            return this._callIfExists('row', target);
        },

        /**
         * Loads the indicated page.
         * @param {number} page The page number to navigate to
         * @returns a promise yielding an object containing the rows rendered as well as the
         * results they represent. Note: Page numbers start at 1.
         */
        gotoPage: function(page) {
            return this._callIfExists('gotoPage', page);
        },

        /**
         * get the total number of rows in the table
         * @readonly
         * @private
         */
        get _total() {
            return this._get('_total');
        },

        /**
         * set an error on a given row
         * @param {number|Object} target - the target row to add an error to
         * @param {string} error the error message to display on the row
         */
        setError: function(target, error) {
            return this._callIfExists('setError', target, error);
        },

        /**
         * set an error on a given row
         * @param {number|Object} target - the target row to add an error to
         */
        clearError: function(target) {
            return this._callIfExists('clearError', target);
        },

        /**
         * set an error on a given row
         * @param {Object} errors - the targets row to add an error to
         */
        setErrors: function(errors) {
            return this._callIfExists('setErrors', errors);
        },

        /**
         * Clear the errors off the given targets, or all of the rows
         * @param {Object} errors
         */
        clearErrors: function(errors) {
            return this._callIfExists('clearErrors', errors);
        },

        /**
         * Rerender the given row without rendering the entire table again
         * @param {Object} target the target row
         * @param {Object} [options]
         */
        reRenderRow: function(target, options) {
            return this._callIfExists('reRenderRow', target, options);
        },

        /**
         * clear the currently selected nodes, turning off batch mode
         */
        clearSelection: function() {
            this._callIfExists('clearSelection');
        },

        /**
         * Deselect a row or range of rows.
         * Rows can be indicated by the same values accepted by {@link HATable#row}
         * @param {number|Object|HTMLElement|Event} startingRow Row (or first row in sequence) to deselect
         * @param {number|Object|HTMLElement|Event} [endingRow] Final row in sequence to deselect
         */
        deselect: function(startingRow, endingRow) {
            this._callIfExists('deselect', startingRow, endingRow);
        },

        /**
         * Select a row or range of rows.
         * Rows can be indicated by the same values accepted by {@link HATable#row}
         * @param {number|Object|HTMLElement|Event} startingRow Row (or first row in sequence) to select
         * @param {number|Object|HTMLElement|Event} [endingRow] Final row in sequence to select
         */
        select: function(startingRow, endingRow) {
            if (this.allowBatchMode) {
                this._callIfExists('select', startingRow, endingRow);
            }
        },

        /**
         * Selects all rows.
         * Note that only rows that have actually been loaded will be represented in the selection object.
         */
        selectAll: function() {
            if (this.allowBatchMode) {
                this._callIfExists('selectAll');
            }
        },

        /**
         * Update the state of the table
         */
        refresh: function() {
            this._callIfExists('refresh');
            this._refreshTableBar();
        },

        /**
         * Resize the table, adjusting to fit the space allotted to it
         */
        resize: function() {
            return this._callIfExists('resize');
        },

        /**
         * Resizes the width of the column with id columnId to be width pixels wide.
         * @param {number|string} columnId
         * @param {number} width
         */
        resizeColumnWidth: function(columnId, width) {
            return this._callIfExists('resizeColumnWidth', columnId, width);
        },

        /**
         * Update the state of the tablebar
         * @private
         */
        _refreshTableBar: function() {
            var specificEdit = this.editMode && this.editMode === 'specific';

            if (!this.showTableBar || !this.hasToolbarContent) {
                this._toolbarNode.classList.add('hidden');
            } else {
                this._toolbarNode.classList.remove('hidden');

                if (this.showSettings) {
                    this._settingsIconButton.classList.remove('hidden');
                    this._updateColumnHider();
                    this._loadSettings();
                } else {
                    this._settingsIconButton.classList.add('hidden');
                }

                if (this.showExport && this._total) {
                    this._exportIconButton.classList.remove('hidden');
                } else {
                    this._exportIconButton.classList.add('hidden');
                }

                if (this.showEditMode && this._total) {
                    if (specificEdit) {
                        this._changeSpecificEdit();
                    } else {
                        this._editIconButton.classList.remove('hidden');
                    }
                } else {
                    if (specificEdit) {
                        this._changeSpecificEdit(true);
                    } else {
                        this._editIconButton.classList.add('hidden');
                    }
                }

                if (this.showPrintList && this._total) {
                    this._printIconButton.classList.remove('hidden');
                } else {
                    this._printIconButton.classList.add('hidden');
                }
            }
        },

        /**
         * Load table settings from localStorage
         * Requires that the table have the 'userId' and 'persistentId' properties set
         * Persisted settings:
         * * compact mode
         * * rowsPerPage
         * * hidden columns
         * @private
         */
        _loadSettings: function() {
            if (!this.showSettings) {
                return;
            }

            var settingsKey,
                settings,
                rowsPerPageRadio = this._rowsPerPageGroup;

            this._loadingSettings = true;
            /* istanbul ignore else */
            if (rowsPerPageRadio) {
                rowsPerPageRadio.value = this.rowsPerPage;
            }

            if (this.userId && this.persistentId && window.localStorage) {
                settingsKey = 'table-' + this.userId + this.persistentId + '-settings';
                settings = JSON.parse(window.localStorage.getItem(settingsKey));

                if (!settings) {
                    this._loadingSettings = false;
                    return;
                }

                /* istanbul ignore else */
                if (settings.compact) {
                    this.compact = true;
                    this._compactCheckbox.checked = true;
                }

                /* istanbul ignore else */
                if (settings.rowsPerPage) {
                    this.rowsPerPage = settings.rowsPerPage;
                }

                /* istanbul ignore else */
                if (settings.columns) {
                    Object.keys(this.table.columns).forEach(function(columnId) {
                        var column = this.table.columns[columnId];

                        /* istanbul ignore else */
                        if (settings.columns[column.field]) {
                            if (settings.columns[column.field].hidden) {
                                column.hidden = true;
                                this.table._updateColumnHiddenState(column.id, true);
                            }

                            if (settings.columns[column.field].unhidable) {
                                column.unhidable = true;
                            }
                        }
                    }, this);

                    this._updateColumnHider();
                }
            }
            this._loadingSettings = false;
        },

        /**
         * Save table settings to localStorage
         * Requires that the table have the 'userId' and 'persistentId' properties set
         * Persisted settings:
         * * compact mode
         * * rowsPerPage
         * * hidden columns
         * @private
         */
        _saveSettings: function() {
            if (this._loadingSettings || !window.localStorage || !(this.userId && this.persistentId)) {
                // do not save settings if settings are being loaded
                return;
            }
            var settingsKey = 'table-' + this.userId + this.persistentId + '-settings',
                columns = this._get('columns'),
                settings = {
                    compact: this.compact,
                    rowsPerPage: this.rowsPerPage,
                    columns: {}
                };

            Object.keys(columns).forEach(function(columnId) {
                var column = columns[columnId];

                if (column.hidden) {
                    settings.columns[column.field] = {
                        hidden: true
                    };
                }

                if (column.unhidable) {
                    if (!settings.columns[column.field]) {
                        settings.columns[column.field] = {};
                    }

                    settings.columns[column.field].unhidable = true;
                }
            }, this);

            window.localStorage.setItem(settingsKey, JSON.stringify(settings));
        },

        /**
         * Get the available editable fields
         * This returns a list of fields where the column definition has a
         * editor propoerty defined
         * @return {String[]} - the list of available editable fields
         */
        getAvailableEditableFields: function() {
            return this._callIfExists('getAvailableEditableFields');
        },

        /**
         * An object with the row id as the property name and the value
         * is the changed fields with their new values
         * @type {Object}
         */
        get dirty() {
            return this._get('dirty');
        },

        get fields() {
            var columns = this.columns;
            return Array.isArray(columns) ? columns.map(function(column) {
                return column.field;
            }) : Object.keys(columns);
        },

        /**
         * Show all of the hidden columns
         */
        showAllHiddenColumns: function() {
            var columns = this.columns,
                fields = Array.isArray(columns) ? columns.map(function(column) {
                    return column.field;
                }) : Object.keys(columns);
            fields.forEach(function(field, index) {
                this._callIfExists('toggleColumnHiddenState', '' + index, false);
            }.bind(this));
        },

        _changeSpecificEdit: function(disable) {
            var table = this;

            function makeFieldEditable(event) {
                var field = event.target.selectedItem.value;

                table.editableFields = [field];
                table.editable = true;
            }

            if (disable) {
                if (this.editMenu) {
                    this._toolbarNode.removeChild(this.editMenu);
                    this.editMenu.removeEventListener(makeFieldEditable);
                }
                return;
            }

            if (!this.editMenu) {
                this.editMenu = document.createElement('ha-menu-button');
                this.editMenu.label = 'Edit Specific Field';
                this.editMenu.classList.add('specific-edit');
                this.editMenu.icon = 'hi-edit';
                this.editMenu.items = this.getAvailableEditableFields().map(function(field) {
                    var fieldItem = document.createElement('ha-item'),
                        label = table.columns[field].label;

                    fieldItem.label = label;
                    fieldItem.value = field;

                    return fieldItem;
                });

                this.editMenu.addEventListener('select', makeFieldEditable);

                this._editIconButton.parentNode.insertBefore(this.editMenu, this._editIconButton);
            }
        },

        /**
         * The callback for the click handler on the Edit button
         * This can do any of the mandatory operations that the edit button
         * handler needs to do and then call the public onClickEdit
         * @param {Event} event - the click event object
         * @private
         */
        _onClickEdit: function(event) {
            event.editableFields = this.editMode === 'custom' ? this.editableFields : this.getAvailableEditableFields();

            this.onClickEdit(event);
        },

        /**
         * @param {Event} event - the click event object
         * This method is meant to be overridden by the implementor of the table
         * as a way to provide custom edit functionality. By default, it simply
         * changes editable to true.
         */
        onClickEdit: function(event) {
            /*jshint unused:false*/
            this.editable = true;
        },

        /**
         * The method that is called when the cancel button is clicked in edit mode/
         * This method emits a 'edit-cancel` event, reverts the data, and sets editable to false.
         * Implementors of the table can listen for the `edit-cancel` event and add additional functionality.
         * Or, they can override this method directly to prevent the default funcitonality from occurring.
         */
        onEditCancel: function() {
            this.emit('edit-cancel');
            this.revert();
            this.editable = false;
        },

        /**
         * The method that is called when the save button is clicked in edit mode/
         * This method emits a 'edit-save` event.
         * Implementors of the table can listen for the `edit-save` event and add additional functionality.
         * Or, they can override this method directly to prevent the default funcitonality from occurring.
         */
        onEditSave: function() {
            this.emit('edit-save', {changed: this.dirty});
        },

        /**
         * Call save on the table, saving the changed/edited values back to the store instance.
         */
        save: function() {
            this._callIfExists('save');
        },

        /**
         * Revert the changes in the table
         */
        revert: function() {
            this._callIfExists('revert');
        },

        /**
         * Toggle the table into edit mode.
         * @param {Boolean} enabled - whether edit mode is enabled.
         */
        setEditModeEnabled: function(enabled) {
            this._defaultNode.classList[enabled ? 'add' : 'remove']('animate-hidden');
            this._defaultNode[enabled ? 'setAttribute' : 'removeAttribute']('aria-hidden', true);

            this._editNode.classList[enabled ? 'remove' : 'add']('animate-hidden');
            this._editNode[enabled ? 'removeAttribute' : 'setAttribute']('aria-hidden', true);
        },

        /**
         * Reset the configuration of the current renderer factory
         */
        updateFactorySettings: function() {
            if (this.rendererFactory) {
                this.rendererFactory.resetConfig(this.table);
            }
        },

        /**
         * Add built-in render modes
         */

        _addRenderModes: function() {
            this._rowEditingRenderer = new RowEditingRenderer();
            this.addRenderMode('rowEdit', this._rowEditingRenderer);

            this._rowExpansionTableRenderer = new RowExpansionRenderer({
                renderRowExpansionContent: function(row) {
                    var tableRow = this.row(row);

                    if (this._lastEditRow === tableRow.id) {
                        if (this._rowExpansionRenderer) {
                            if (!this._cachedRowExpansion) {
                                this._cachedRowExpansion = this._rowExpansionRenderer(tableRow.id, function() {
                                    this.cancelRowEdit();
                                }.bind(this));
                            }

                            return this._cachedRowExpansion;
                        } else {
                            return this._createMobileRowExpansion();
                        }
                    } else {
                        return this.ownerDocument.createElement('div');
                    }
                }.bind(this),
                manualActivation: true,
                expansionClassName: 'row-edit-expansion',
                useFocusIndicator: true,
                scrollingThreshold: 1,
                autoResizeTable: true,
                focusIndicatorLabel: this.rowEditCancelText
            });
            this.addRenderMode('rowEditExpansion', this._rowExpansionTableRenderer);

            this.addRenderMode('stackedRenderer', new StackedRenderer(), this._rowExpansionTableRenderer);
            this.addRenderMode('columnLockingRenderer', new ColumnLockingRenderer(), this._rowExpansionTableRenderer);

            if (deviceUtils.isHandheld()) {
                this.addRenderMode('default', new ResponsiveDefaultRenderer(), this._rowExpansionTableRenderer);
            }

            if (this.renderMode) {
                var oldMode = this.renderMode;
                this.renderMode = '';
                this.renderMode = oldMode;
            } else {
                this.renderMode = 'default';
            }
        },

        /**
         * Handler for the settings button being activated (clicked or enter/space)
         * Toggles the settings popover between hidden and shown
         * @private
         */
        _onClickSettings: function() {
            var settingsContainer = this._settingsPopover || this._settingsDrawer;

            if (settingsContainer.classList.contains('visible')) {
                settingsContainer.close();
            } else {
                if (deviceUtils.isMobile()) {
                    this._buildMobileSortOptions();
                    this._storeDefaultSettings();
                    this._backupSettings();
                }

                settingsContainer.show();
            }
        },

        /**
         * Get the form elements that are descendants of a node
         * @param {HTMLElement} node The container node
         * @returns {NodeList} A NodeList containing any form elements
         * @private
         */
        _getFormElements: function(node) {
            return node.querySelectorAll(FORM_ELEMENT_NAMES.join(','));
        },

        /**
         * Get the user-configurable table settings (as displayed when the 'Settings' icon is clicked)
         * @returns {object} An object whose keys are element names (or labels if no name exists) and values are the
         *      corresponding element's value (or the 'checked' property if it exists)
         * @private
         */
        _getSettings: function() {
            var settingsContainer = this._settingsDrawer || this._settingsPopover,
                formValues = {};

            Array.prototype.forEach.call(this._getFormElements(settingsContainer), function(formNode) {
                var name = formNode.name || formNode.label;

                /* istanbul ignore else */
                if (name) {
                    formValues[name] = 'checked' in formNode ? formNode.checked : formNode.value;
                }
            });

            return formValues;
        },

        /**
         * Create a one-time cache of the default user-configurable settings
         * @private
         */
        _storeDefaultSettings: function() {
            if (this._defaultSettings) {
                return;
            }

            this._defaultSettings = this._getSettings();
        },

        /**
         * Cache the current user-configurable settings
         * @private
         */
        _backupSettings: function() {
            this._backedupSettings = this._getSettings();
        },

        /**
         * Handler for the change event of the displayDensity radio buttons
         * Sets the 'compact' property and saves the table settings
         * @private
         */
        _onChangeDisplayDensity: function(event) {
            this.compact = event.target.checked;
            this.table.resize();
        },

        /**
         * Handler for change event of column hider checkboxes
         * Shows or hides the column and saves the table settings
         * @private
         */
        _onChangeEditColumn: function(event) {
            this.table._updateColumnHiddenState(event.target.value, !event.target.checked);
            this._saveSettings();
        },

        /**
         * Handler for change event of rowsPerPage checkbox
         * Sets the 'rowsPerPage' property and saves the table settings
         * @private
         */
        _onChangeRowsPerPage: function(event) {
            this.rowsPerPage = parseInt(event.target.value, 10);
            this._saveSettings();
        },

        /**
         * The callback for the click handler on the Print button
         * @protected
         */
        _onClickPrint: function() {
            var printWindow = window.open();

            this._renderPrintPage(printWindow);
        },

        /**
         * Render a table for printing, then copy it to the print window and open the print dialog
         * @protected
         */
        _renderPrintPage: function(printWindow) {
            var targetDoc = printWindow.document,
                printData = {
                    currentPath: window.location.href.substr(0, window.location.href.lastIndexOf('/')),
                    customCss: this.printListAdditionalCSSFile,
                    dgridCss: dgridCss,
                    printListTitleText: this.printListTitleText,
                    printListSubTitleText: this.printListSubTitleText,
                    printListFontFamily: this.printListFontFamily
                },
                table;

            if (printData.customCss) {
                if (printData.customCss.substr(0, 4).toLowerCase() !== 'http') {
                    printData.customCss = printData.currentPath + '/' + require.toUrl(printData.customCss);
                }

                printData.customCss = '<link rel="stylesheet" href="' + printData.customCss + '">';
            }

            require([
                './table-virtual'
            ], function() {
                // The table will resize to fit by setting the main content area's width if by default it is too large.
                // This is good when the table is being displayed in the same area where it's being resized, but in
                // the print case the table might end up being displayed in a significantly larger area than where it
                // was resized(since the table will be the only thing in the print window). In this case the inline
                // style on the content area still applies, as we're copying the table's innerHTML, but the content size
                // no longer matches the header size. In order to avoid this we build the table in a separate div.
                // The div needs to be large enough to not have the same problem and should be in flow for the table
                // to properly startup, but shouldn't be visible on the page. So it is absolutely positioned at
                // (-5000, -5000).
                var tableContainer = document.createElement('div');
                tableContainer.style.position = 'absolute';
                tableContainer.style.left = '-5000px';
                tableContainer.style.top = '-5000px';
                tableContainer.style.display = 'inline-block';
                tableContainer.style.width = '2000px';
                tableContainer.style.height = '20000px';

                table = this.ownerDocument.createElement('ha-table-virtual');
                table.print = true;
                table.allowBatchMode = false;
                table.compact = this.compact;

                table.showTableBar = false;
                table.columns = utils.clone(this.originalColumns, [this]);
                table.collection = this.collection;

                if (this.printRenderer) {
                    table.addRenderMode('print', this.printRenderer);
                    table.renderMode = 'print';
                }

                this.ownerDocument.body.appendChild(tableContainer);
                tableContainer.appendChild(table);
                // table.table.domNode.classList.add('dgrid-autoheight');
                table.table.minRowsPerPage = Infinity; // make sure we grab all of the rows
                table.autoheight = true;
                table.sort = this.sort;

                if (this.table._columnHiderRules) {
                    Object.keys(this.table._columnHiderRules).forEach(function(columnId) {
                        table.table._updateColumnHiddenState(columnId, true);
                    });
                }

                table.on('refresh-complete', function() {
                    if (table) {
                        table.table.bodyNode.style.marginTop = '';
                        printData.gridContent = table.table.domNode.innerHTML;
                        targetDoc.open();
                        targetDoc.write(printTemplate(printData));
                        targetDoc.close();
                        table.ownerDocument.body.removeChild(tableContainer);
                        table = null;
                    }
                });
            }.bind(this));
        },

        /**
         * @private
         * Render the settings table bar drawer
         */
        _renderSettingsDrawer: function() {
            var drawer = this.ownerDocument.createElement('ha-drawer-large'),
                contentNode = this.ownerDocument.createElement('div'),
                applyButton = this.ownerDocument.createElement('button'),
                resetButton = this.ownerDocument.createElement('button');

            drawer.classList.add('table-settings');
            drawer.backdrop = true;
            drawer.titleText = this.settingsTitleText;
            drawer.footer = this.ownerDocument.createElement('div');
            drawer.footer[0].style.position = 'relative';
            applyButton.className = 'ha-button ha-button-primary';
            applyButton.textContent = this.settingsApplyButtonLabel;
            drawer.footer[0].appendChild(applyButton);
            resetButton.className = 'ha-button ha-button-secondary';
            resetButton.textContent = this.settingsResetButtonLabel;
            drawer.footer[0].appendChild(resetButton);

            this._sortNode = this.ownerDocument.createElement('div');
            this._sortNode.classList.add('mobile-sort-options');
            this._sortNode.appendChild(this.ownerDocument.createElement('h4'));
            this._sortNode.lastChild.textContent = this.mobileSortingText;
            this._sortOptionsNode = this.ownerDocument.createElement('div');
            this._sortNode.appendChild(this._sortOptionsNode);
            this._sortNode.appendChild(this.ownerDocument.createElement('div'));
            this._sortNode.lastChild.textContent = '.';
            this._sortNode.lastChild.classList.add('clearfix');
            contentNode.appendChild(this._sortNode);

            this._columnHiderNode = this.ownerDocument.createElement('div');
            this._columnHiderNode.classList.add('column-hider');
            this._columnHiderNode.appendChild(this.ownerDocument.createElement('h4'));
            this._columnHiderNode.lastChild.textContent = this.editColumnsText;
            this._columnHiderNode.appendChild(this.ownerDocument.createElement('div'));
            this._columnHiderNode.lastChild.className = 'edit-columns';
            contentNode.appendChild(this._columnHiderNode);

            this._displayDensityNode = this.ownerDocument.createElement('div');
            this._displayDensityNode.classList.add('display-density');
            this._displayDensityNode.appendChild(this.ownerDocument.createElement('h4'));
            this._displayDensityNode.lastChild.textContent = this.displayDensityText;
            this._compactCheckbox = this.ownerDocument.createElement('ha-checkbox');
            this._compactCheckbox.name = 'compactCheckbox';
            this._compactCheckbox.label = this.compactText;
            this._displayDensityNode.appendChild(this._compactCheckbox);
            contentNode.appendChild(this._displayDensityNode);

            this.otherSettingsNode = this.ownerDocument.createElement('div');
            this.otherSettingsNode.className = 'custom';
            contentNode.appendChild(this.otherSettingsNode);

            this._rowsPerPageNode = this.ownerDocument.createElement('div');
            this._rowsPerPageNode.classList.add('rows-per-page');
            this._rowsPerPageNode.appendChild(this.ownerDocument.createElement('h4'));
            this._rowsPerPageNode.lastChild.textContent = this.rowsPerPageText;
            this._rowsPerPageGroup = this.ownerDocument.createElement('ha-radio-button-group');
            this._rowsPerPageGroup.name = 'rowsPerPage';
            this._rowsPerPageGroup.radios = ['50', '150', '300'].map(function(count) {
                var radioButton = this.ownerDocument.createElement('ha-radio-button');

                radioButton.label = count;
                radioButton.value = count;

                return radioButton;
            }.bind(this));
            this._rowsPerPageNode.appendChild(this._rowsPerPageGroup);

            if (this._shouldShowPaginationSettings()) {
                contentNode.appendChild(this._rowsPerPageNode);
            }

            this.listenTo(applyButton, 'click', function() {
                this._applySettings();
                this._settingsDrawer.close();
            }.bind(this));

            this.listenTo(resetButton, 'click', function() {
                this._resetSettings();
            }.bind(this));

            drawer.section = contentNode;

            return drawer;
        },

        /**
         * @private
         * Apply all of the settings configuration found in the settings popover
         */
        _applySettings: function() {
            Array.prototype.forEach.call(this._columnHiderNode.querySelectorAll('ha-checkbox'), function(formNode) {
                var name = formNode.name || formNode.label;

                /* istanbul ignore else */
                if (formNode.checked !== this._backedupSettings[name]) {
                    this._onChangeEditColumn({
                        target: formNode
                    });
                }
            }.bind(this));

            /* istanbul ignore else */
            if (this._compactCheckbox.checked !== this._backedupSettings[this._compactCheckbox.name]) {
                this._onChangeDisplayDensity({
                    target: this._compactCheckbox
                });
            }

            if (this._shouldShowPaginationSettings()) {
                /* istanbul ignore else */
                if (this._rowsPerPageGroup.value !== this._backedupSettings[this._rowsPerPageGroup.name]) {
                    this._onChangeRowsPerPage({
                        target: this._rowsPerPageGroup
                    });
                }
            }

            var sortField, sortDescending;
            Array.prototype.forEach.call(this._sortNode.querySelectorAll('ha-radio-button'), function(radioButton) {
                if (radioButton.name === 'sort' && radioButton.checked) {
                    sortField = radioButton.value;
                } else if (radioButton.name === 'sortDir' && radioButton.checked) {
                    sortDescending = radioButton.value === 'desc';
                }
            });

            if (sortField !== undefined) {
                this.table.set('sort', [{
                    property: sortField,
                    descending: (sortDescending === undefined ? false : sortDescending)
                }]);
            } else {
                this.table.set('sort', []);
            }
        },

        /**
         * @private
         * Reset settings to the default values
         */
        _resetSettings: function() {
            var fieldName,
                formNode;

            for (fieldName in this._defaultSettings) {
                formNode = this._settingsDrawer.querySelector('[name="' + fieldName + '"]');

                if (!formNode) {
                    formNode = this._settingsDrawer.querySelector('[label="' + fieldName + '"]');
                }

                if (formNode) {
                    if ('checked' in formNode) {
                        formNode.checked = this._defaultSettings[fieldName];
                    } else {
                        if (formNode.tagName === 'HA-RADIO-BUTTON-GROUP' && !this._defaultSettings[fieldName]) {
                            // special case to uncheck all radio buttons
                            Array.prototype.forEach.call(formNode.querySelectorAll('ha-radio-button'), function(radio) {
                                radio.checked = false;
                            });
                        } else {
                            formNode.value = this._defaultSettings[fieldName];
                        }
                    }
                }
            }
        },

        _shouldShowPaginationSettings: function() {
            return true;
        },

        /**
         * callback method that is called when the 'Export' button on the tablebar is pressed
         * @param {Event} event - the the click event object
         * @private
         */
        _onClickExport: function(event) {
            event.table = this;
            this.emit('export', event);
        },

        /**
         * Called when user starts selecting or deselecting rows
         * If one or more rows are selected, batch mode is active and the batch mode bar is displayed
         * If no rows are selected, batch mode is inactive (but may still be enabled), and the batch mode bar is hidden
         * @param {boolean} isActive - whether batch mode is now active
         * @private
         */
        setBatchModeActive: function(isActive) {
            if (isActive) {
                this._defaultNode.classList.add('animate-hidden');
                this._defaultNode.setAttribute('aria-hidden', true);

                this._batchBarNode.classList.remove('animate-hidden');
                this._batchBarNode.removeAttribute('aria-hidden');
            } else {
                this._defaultNode.removeAttribute('aria-hidden');
                this._defaultNode.classList.remove('animate-hidden');

                this._batchBarNode.setAttribute('aria-hidden', true);
                this._batchBarNode.classList.add('animate-hidden');
            }

            this._set('batchModeActive', isActive);
        },

        /**
         * Update the column list in the columnHider section of the settings popover
         * @private
         */
        _updateColumnHider: function() {
            if (!this.showSettings || !this.showColumnHider) {
                return;
            }

            var container = this._columnHiderNode.querySelector('.edit-columns'),
                checkbox,
                columns = Object.keys(this.table.columns),
                columnCount = deviceUtils.isMobile() ? 1 : Math.ceil(columns.length / 10),
                hasColumns = false;

            container.innerHTML = '';

            /* istanbul ignore else */
            if ('WebkitColumnCount' in this.ownerDocument.documentElement.style) {
                container.style.WebkitColumnCount = columnCount;
            } else if ('MozColumnCount' in this.ownerDocument.documentElement.style) {
                container.style.MozColumnCount = columnCount;
            }

            container.style.columnCount = columnCount;

            columns.forEach(function(columnId) {
                var column = this.table.columns[columnId];

                if (!column.unhidable) {
                    if (column.hidden) {
                        this.table._hideColumn(column.id);
                    }

                    hasColumns = true;
                    checkbox = this.ownerDocument.createElement('ha-checkbox');
                    checkbox.label = column.label;
                    checkbox.value = column.id;
                    checkbox.name = 'hide-' + column.id;
                    if ('hidden' in column) {
                        checkbox.checked = !column.hidden;
                    } else {
                        checkbox.checked = true;
                    }
                    container.appendChild(checkbox);
                }
            }, this);

            if (hasColumns) {
                this._columnHiderNode.classList.remove('hidden');
            } else {
                this._columnHiderNode.classList.add('hidden');
            }
        },

        /**
         * @private
         * @param {HAPopover} popover the popover to convert to a drawer
         * Convert the provided popover to a drawer for responsive
         */
        _buildDrawerFromPopover: function(popover) {
            if (popover._convertedDrawer) {
                return popover._convertedDrawer;
            }

            var drawer = this.ownerDocument.createElement('ha-drawer-large'),
                section = this.ownerDocument.createElement('section'),
                footer = this.ownerDocument.createElement('footer'),
                popoverForm = popover.querySelector('ha-popover-form'),
                button;

            function appendAllNodes(dst, src) {
                if (src) {
                    if ('length' in src) {
                        // it's a list of nodes
                        Array.prototype.slice.call(src).forEach(function(node) {
                            dst.appendChild(node);
                        });
                    } else {
                        dst.appendChild(src);
                    }
                }
            }

            if (popoverForm) {
                appendAllNodes(section, popoverForm.section);
                appendAllNodes(footer, popoverForm.footer);
            } else {
                appendAllNodes(section, popover.children);
            }

            // we want buttons
            ['.ha-button-primary', '.ha-button-secondary'].forEach(function(btnClass) {
                if (footer.querySelector(btnClass) === null) {
                    [popover, section].forEach(function(source) {
                        button = source.querySelector(btnClass);
                        if (button) {
                            footer.appendChild(button);

                            button.addEventListener('click', function() {
                                drawer.close();
                            });
                        }
                    });
                }
            });

            drawer.backdrop = true;
            drawer.classList.add('two-button');
            drawer.titleText = 'Filters';

            if (section) {
                drawer.section = section;
            }

            if (footer) {
                drawer.footer = footer;
            }

            popover._convertedDrawer = drawer;

            return drawer;
        },

        /**
         * @private
         * @param {Event} clickEvent
         * Callback which determines whether a row should be made editable
         */
        _shouldEditRow: function(clickEvent) {
            var select = true;
            if (clickEvent && clickEvent.target) {
                if (clickEvent.target.tagName === 'HA-CHECKBOX' || clickEvent.target.tagName === 'HA-RADIO-BUTTON' ||
                    clickEvent.target.tagName === 'INPUT' || clickEvent.target.tagName === 'BUTTON' ||
                    clickEvent.target.tagName === 'A') {
                    select = false;
                }
            }

            return select;
        },

        set rowExpansion(value) {
            if (this.allowRowEditing) {
                this.cancelRowEdit();
            }

            this._rowExpansion = value;

            if (this.allowRowEditing) {
                this._prepareRowEditor();
            }
        },

        /**
         * @type {boolean}
         * Whether or not to provide row expansion functionality for mobile row
         * editing. If false, a row-edit event is emitted instead
         */
        get rowExpansion() {
            return this._rowExpansion;
        },

        set rowExpansionRenderer(value) {
            if (this.allowRowEditing) {
                this.cancelRowEdit();
            }

            this._rowExpansionRenderer = value;
        },

        /**
         * @type {function}
         * A function that provides a DOM node to mobile row editing
         */
        get rowExpansionRenderer() {
            return this._rowExpansionRenderer;
        },

        /**
         * @private
         * Enables editing in the table
         */
        _enableRowEditing: function() {
            this._callIfExists('_togglePaginationButtons', false);

            this._lastEditRow = null;

            this._rowFocusEventHandle = function(event) {
                if (!this._shouldEditRow(event)) {
                    return;
                }

                var cell = this.cell(event), row = cell ? cell.row : null;

                if (!row || !cell) {
                    return;
                }

                if (this._lastEditRow !== null) {
                    return;
                }

                event.stopPropagation();
                event.preventDefault();

                this._lastEditRow = row.id;

                this._showRowEditor(row.id);
            }.bind(this);

            this._rowEditOldSelectionMode = this.selectionMode;
            this.selectionMode = 'none';

            this.on('click', this._rowFocusEventHandle);

            this._prepareRowEditor();

            this._storeUpdateHandle = this.table.collection.on('add, delete', function() {
                this.cancelRowEdit();
            }.bind(this));
        },

        /**
         * @private
         * Enables editing in the table
         */
        _disableRowEditing: function() {
            this._callIfExists('_togglePaginationButtons', true);

            this.cancelRowEdit();

            this.selectionMode = this._rowEditOldSelectionMode;

            if (this._rowFocusEventHandle) {
                this.off('click', this._rowFocusEventHandle);
                this._rowFocusEventHandle = null;
            }

            if (this._storeUpdateHandle) {
                this._storeUpdateHandle.remove();
                this._storeUpdateHandle = null;
            }
        },

        /**
         * Validate information in an editable row
         * @param {function} validate - a function to call to validate the data,,
         */
        rowEditValidator: function(validate) {
            validate();
        },

        rowEditSaveHandler: function() {
            var dirtyFields = {}, isValid = true, rowData = Object.create(this._rowEditData);

            Object.keys(this._rowEditFields).forEach(function(fieldName) {
                var field = this._rowEditFields[fieldName];

                if (field.getValue) {
                    if ('checkValidity' in field.editor) {
                        if (!field.editor.checkValidity()) {
                            isValid = false;
                        }
                    }

                    var currentValue = field.getValue();

                    if (currentValue !== field.originalValue) {
                        dirtyFields[fieldName] = currentValue;
                        rowData[fieldName] = currentValue;
                    }
                }
            }.bind(this));

            if (isValid) {
                if (Object.keys(dirtyFields).length > 0) {
                    var validateData = {};
                    validateData[this._lastEditRow] = dirtyFields;

                    this.rowEditValidator(function() {
                        if (this._lastEditRow !== null) {
                            this.table.collection.get(this._lastEditRow).then(function(storeRow) {
                                var isNewRow = storeRow === undefined;

                                if (isNewRow) {
                                    this.table.collection.add(rowData);
                                    this.refresh();
                                } else {
                                    Object.keys(dirtyFields).forEach(function(field) {
                                        this.table.updateDirty(this._lastEditRow, field, dirtyFields[field]);
                                    }.bind(this));

                                    this.save();
                                }

                                this._rowEditDeleteOnCancel = false;
                                this.cancelRowEdit();
                            }.bind(this));

                        }
                    }.bind(this), validateData, this);
                } else {
                    this.rowEditCancelHandler();
                }
            }
        },

        rowEditCancelHandler: function() {
            this.cancelRowEdit();
        },

        /**
         * Cancel any currently active row editing operation. If no row edit is
         * in progress, this method does nothing
         */
        cancelRowEdit: function() {
            if (this._lastEditRow !== null) {
                this._cachedRowExpansion = null;

                var editRow = this._lastEditRow;
                this._lastEditRow = null;
                this._rowEditFields = null;
                this._hideRowEditor(editRow);

                if (this._rowEditDeleteOnCancel) {
                    this.table.collection.remove(editRow);
                }
            }
        },

        rowEditChangeHandler: function(editors) {
            // get a list of all the editors
            this.emit('row-edit-update', {
                editors: editors
            });
        },

        _showRowEditor: function(rowId, rowData) {
            var row = this.row(rowId);

            if (row && !rowData) {
                rowData = row.data;
            }

            this._rowEditData = rowData;
            this._rowEditFields = this._createFieldEditors(rowData);

            this._rowEditDeleteOnCancel = false;

            if (deviceUtils.isDesktop()) {
                this._rowEditingRenderer.setEditableRow(this, rowId, this._rowEditFields);
            } else if (deviceUtils.isHandheld()) {
                if (this._rowExpansion) {
                    this.reRenderRow(rowId);

                    var rowElement = this.row(rowId).element;

                    this._rowExpansionTableRenderer._toggleRowExpansion(rowElement, false, rowElement);

                    a11y.setFocusOnAnyFirst(rowElement.querySelector('.ha-table-row-expansion'));

                    this._rowExpansionBlurEventHandle = function(event) {
                        var newElement = this.row(rowId).element,
                            tableElement = newElement.querySelector('table'),
                            node = event.target,
                            isOnTableRow = false,
                            isOnAnyRow = false,
                            isInRowMeat = false;

                        while (node && node !== document) {
                            if (node === newElement) {
                                isInRowMeat = true;
                            } else if (node === tableElement) {
                                isOnTableRow = true;
                            } else if (node.classList.contains('dgrid-row')) {
                                isOnAnyRow = true;
                            }

                            node = node.parentNode;
                        }

                        if (isOnTableRow) {
                            // we wrap this one in a timeout so the editor doesn't reappear on the same row
                            setTimeout(function() {
                                this.rowEditCancelHandler();
                            }.bind(this), 0);
                        } else if (isOnAnyRow && !isInRowMeat) {
                            this.rowEditCancelHandler();
                        }
                    }.bind(this);
                    document.body.addEventListener('mouseup', this._rowExpansionBlurEventHandle);
                } else {
                    this.emit('row-edit', {
                        row: rowId
                    });
                    this.cancelRowEdit();
                }
            }
        },

        _prepareRowEditor: function() {
            if (deviceUtils.isDesktop()) {
                this.renderMode = 'rowEdit';
            }
        },

        _hideRowEditor: function(rowId) {
            if (this.allowRowEditing) {
                if (deviceUtils.isDesktop()) {
                    this._rowEditingRenderer.setEditableRow(this, null, null);
                } else if (deviceUtils.isHandheld()) {
                    if (this._rowExpansion) {
                        var element = this.row(rowId).element;
                        this._rowExpansionTableRenderer._toggleRowExpansion(element, true, element);

                        if (this._rowExpansionBlurEventHandle) {
                            document.body.removeEventListener('mouseup', this._rowExpansionBlurEventHandle);
                            this._rowExpansionBlurEventHandle = null;
                        }
                    }
                }
            }
        },

        _putEditorsIntoRows: function(fields) {
            var allFields = [];

            Object.keys(fields).forEach(function(fieldName) {
                var field = fields[fieldName];
                allFields.push(field);
            }.bind(this));

            var rows = [];

            while (allFields.length) {
                var rowFields = [allFields.shift()],
                    weight = rowFields[0].column.drawerWeight || 1;

                while (allFields.length && weight + (allFields[0].column.drawerWeight || 1) <= 1) {
                    var field = allFields.shift();
                    rowFields.push(field);
                    weight += field.column.drawerWeight || 1;
                }

                rows.push(rowFields);
            }

            return rows;
        },

        _createMobileEditor: function(field) {
            var container = this.ownerDocument.createElement('div');
            container.style.width = Math.round((field.column.drawerWeight || 1) * 100) + '%';

            if (field.editor) {
                field.editor.label = field.column.label;
                container.appendChild(field.editor);
            } else {
                var textField = this.ownerDocument.createElement('ha-text-field');
                textField.label = field.column.label;
                textField.disabled = true;
                textField.value = field.displayValue;

                container.appendChild(textField);
            }

            return container;
        },

        _createMobileRowExpansion: function() {
            var container = this.ownerDocument.createElement('div'),
                content = this.ownerDocument.createElement('section'),
                footer = this.ownerDocument.createElement('footer'),
                fields = this._rowEditFields,
                header = this.ownerDocument.createElement('header');

            if (this.rowEditTitle) {
                var title = this.ownerDocument.createElement('h4');
                title.textContent = this.rowEditTitle;

                header.appendChild(title);
            }

            content.appendChild(header);

            this._putEditorsIntoRows(fields).forEach(function(row) {
                var rowContainer = document.createElement('div');
                rowContainer.className = 'row';

                row.forEach(function(field) {
                    rowContainer.appendChild(this._createMobileEditor(field));
                }.bind(this));

                content.appendChild(rowContainer);
            }.bind(this));

            var saveButton = this.ownerDocument.createElement('button');
            saveButton.className = 'ha-button ha-button-primary';
            saveButton.textContent = this.rowEditSaveText;
            saveButton.addEventListener('click', function() {
                this.rowEditSaveHandler();
            }.bind(this));

            footer.appendChild(saveButton);

            container.appendChild(content);
            container.appendChild(footer);

            return container;
        },

        _createFieldEditors: function(data) {
            var fieldEditors = {},
                columns = this.columns;

            function createSetter(column, editor) {
                var editorPropertyName = 'value';

                if (column && column.editorArgs && column.editorArgs.value) {
                    editorPropertyName = column.editorArgs.value;
                }

                return function(value) {
                    editor[editorPropertyName] = value;
                };
            }

            function createGetter(column, editor) {
                var editorPropertyName = 'value';

                if (column && column.editorArgs && column.editorArgs.value) {
                    editorPropertyName = column.editorArgs.value;
                }

                return function() {
                    return editor[editorPropertyName];
                };
            }

            function onChangeHandler() {
                var editors = {};

                Object.keys(fieldEditors).forEach(function(fieldName) {
                    if (fieldEditors[fieldName].editor) {
                        editors[fieldName] = fieldEditors[fieldName].editor;
                    }
                });

                this.rowEditChangeHandler(editors);
            }

            Object.keys(columns).forEach(function(field) {
                var column = columns[field], tableField = {};

                if (column.hidden) {
                    return;
                }

                tableField.column = column;
                tableField.value = data[column.field];

                if (column.formatter) {
                    var formatter = column.formatter,
                        formatterScope = this.table.formatterScope;

                    tableField.displayValue = typeof formatter === 'string' && formatterScope ?
                        formatterScope[formatter](tableField.value, data) : formatter(tableField.value, data);
                } else {
                    tableField.displayValue = tableField.value;
                }

                if (column.editor) {
                    var editor = document.createElement(column.editor);

                    tableField.editor = editor;

                    if (column.editorInit) {
                        column.editorInit(editor, tableField.value, column);
                    }

                    tableField.setValue = createSetter(column, editor);
                    tableField.setValue(tableField.value);
                    tableField.getValue = createGetter(column, editor);
                    tableField.originalValue = tableField.getValue();

                    editor.addEventListener('change', onChangeHandler.bind(this));
                }

                fieldEditors[field] = tableField;
            }.bind(this));

            return fieldEditors;
        },

        /**
         * Add one empty row to the bottom of the table, and if row editing is enabled,
         * edit it
         */
        addAndEditRow: function() {
            if (this.allowRowEditing) {
                var rowId;

                if (this._lastEditRow) {
                    this.cancelRowEdit();
                }

                if (deviceUtils.isDesktop()) {
                    rowId = this.addEmptyRows(1);
                    this._lastEditRow = rowId;
                    this._showRowEditor(rowId);
                } else if (deviceUtils.isHandheld()) {
                    rowId = this.addEmptyRows(1);
                    this._lastEditRow = rowId;
                    this._showRowEditor(rowId);
                    if (!this._rowExpansionRenderer) {
                        this._rowEditDeleteOnCancel = true;
                    }
                }
            } else {
                this.addEmptyRows(1);
            }
        },

        _createEmptyRow: function() {
            var rowTemplate = {};

            Object.keys(this.columns).forEach(function(field) {
                if (field !== 'id') {
                    rowTemplate[field] = '';
                }
            }.bind(this));

            var maxId = 0;

            this.table.collection.data.forEach(function(datum) {
                if (datum.id) {
                    maxId = Math.max(datum.id, maxId);
                }
            }.bind(this));

            rowTemplate.id = maxId + 1;

            return rowTemplate;
        },

        /**
         * Add empty rows to the bottom of the table
         * @param {Number} rowCount the number of rows to add
         */
        addEmptyRows: function(rowCount) {
            rowCount = Math.max(0, rowCount || 1);

            var lastId = null;

            while (rowCount--) {
                var record = this._createEmptyRow();
                lastId = record.id;

                this.table.collection.add(record);
            }

            this.refresh();

            return lastId;
        },

        _getSortOptions: function() {
            var columns = this.table ? this.table.get('_columns') : [],
                sortableColumns = [],
                currentSort = this.table ? this.table.get('sort')[0] : undefined;

            columns.forEach(function(column) {
                if (column.sortable !== false) {
                    var def = {
                        column: column,
                        field: column.field,
                        label: column.label || column.field
                    };

                    if (currentSort !== undefined && currentSort.property === column.field) {
                        def.sorted = true;
                        def.descending = currentSort.descending;
                    }

                    sortableColumns.push(def);
                }
            });

            return sortableColumns;
        },

        _buildMobileSortOptions: function() {
            var doc = this.ownerDocument,
                root = this._sortOptionsNode,
                sortOptions = this._getSortOptions(),
                option, group, sortAscending, radios;

            root.innerHTML = '';

            if (sortOptions.length > 0 && this.showMobileSortOptions) {
                this._sortNode.style.display = 'block';

                group = doc.createElement('ha-radio-button-group');
                group.name = 'sort';

                radios = [];

                sortOptions.forEach(function(sortOption) {
                    option = doc.createElement('ha-radio-button');
                    option.value = sortOption.field;
                    option.label = sortOption.label;
                    option.name = 'sort';

                    if (sortOption.sorted) {
                        option.checked = true;
                        sortAscending = !sortOption.descending;
                    }

                    radios.push(option);
                });

                group.radios = radios;

                root.appendChild(group);

                root.appendChild(doc.createElement('h4'));
                root.lastChild.textContent = this.mobileSortOrderText;

                group = doc.createElement('ha-radio-button-group');
                group.name = 'sortDir';

                radios = [];

                radios.push(doc.createElement('ha-radio-button'));
                radios[0].value = 'asc';
                radios[0].label = this.mobileSortAscendingText;
                radios[0].name = 'sortDir';
                if (sortAscending !== undefined) {
                    radios[0].checked = sortAscending;
                }

                radios.push(doc.createElement('ha-radio-button'));
                radios[1].value = 'desc';
                radios[1].label = this.mobileSortDescendingText;
                radios[1].name = 'sortDir';
                if (sortAscending !== undefined) {
                    radios[1].checked = !sortAscending;
                }

                group.radios = radios;

                root.appendChild(group);
            } else {
                this._sortNode.style.display = 'none';
            }
        }
    });

    return register('ha-table', HATable);
});

/**
 * @external dstore/Memory
 * @see https://github.com/SitePen/dstore/blob/master/docs/Store.md
 */

/**
 * @module
 * @class ContentGroupMemory
 * @extends dstore/Memory
 * The ContentGroupMemory returns appropriate rows and headers to display
 * for content grouping.
 *
 * This store is required whenever content grouping is enabled and a
 * memory store is needed. If a server store is needed, see ContentGroupRest
 */
define('hui/table/ContentGroupMemory',[
    'dojo/_base/declare',
    'dojo/Deferred',
    'dojo/when',
    'dstore/QueryResults',
    'dstore/Memory',
    'dstore/Tree'
], function(declare, Deferred, when, QueryResults, Memory, Tree) {

    /**
     * Creates a method that returns a promise from a synchronous method.
     * @param {String} method The name of the method to create an async version of.
     * @returns A new function that wraps the results of the specified function
     * in a promise.
     */
    function promised(method) {
        return function() {
            var deferred = new Deferred(),
                queryResults;
            try {
                deferred.resolve(this[method].apply(this, arguments));
            } catch (error) {
                deferred.reject(error);
            }

            // need to create a QueryResults and ensure the totalLength is
            // a promise.
            queryResults = new QueryResults(deferred.promise);
            queryResults.totalLength = when(queryResults.totalLength);
            return queryResults;
        };
    }

    /**
     * Extension of the memory and tree stores that allows for
     * virtual scrolling and pagination of data grouped into different
     * categories.
     */
    return declare([Memory, Tree], {
        /**
         * Holds the last passed array of expanded groups to track whether
         * or not the data needs to be resorted.
         * @type {Array}
         */
        _lastExpanded: null,

        /**
         * Flag indicating whether to let sorting determine the order of
         * groups. If true then the order of groups is determined by their
         * original order in the data and sorting only occurs among items
         * within groups. If false then items are still only sorted within
         * their groups, but the order of the groups themselves is also
         * determined by the sorted order of the contained items.
         * @type {Boolean}
         */
        _forceGroupOrder: false,

        /**
         * Sets the _forceGroupOrder flag
         * @param {Boolean} forceGroupOrder - The new value for _forceGroupOrder
         */
        forceGroupOrder: function(forceGroupOrder) {
            if (this._forceGroupOrder !== forceGroupOrder) {
                this._lastExpanded = null;
            }
            this._forceGroupOrder = forceGroupOrder;
        },

        /**
         * Returns the data indicated by the passed in query
         * @param {Object} kwArgs - An object specifying the start and end range to return,
         * as well as an array of the IDs of the categories that are expanded.
         * @returns {QueryResults} - A QueryResults object containing all the items within
         * the specified range of the list of expanded items and any content group headers
         * that fall within that range as well
         */
        fetchGroupRangeSync: function(kwArgs) {
            var data = this.data,
                start = kwArgs.start,
                end = kwArgs.end,
                originalEnd = end,
                virtual = kwArgs.virtual,
                expanded = kwArgs.expanded || [],
                queryLog,
                i,
                l,
                j,
                lastCategoryId = null,
                skippedGroups = this._forceGroupOrder ? [] : null,
                childrenLength,
                isExpandedUpdated = false,
                rootCollection = this._getRoots(),
                originalCount,
                isFiltered,
                self = this,
                sorted = false,
                startOffset = 0,
                queryResults;

            if (!this._lastExpanded) {
                isExpandedUpdated = true;
            } else if (this._lastExpanded.length !== expanded.length) {
                isExpandedUpdated = true;
            } else {
                for (i = 0; i < expanded.length; i++) {
                    if (this._lastExpanded[i] !== expanded[i]) {
                        isExpandedUpdated = true;
                    }
                }
            }

            if (!data || data._version !== this.storage.version || isExpandedUpdated) {
                // our data is absent or out-of-date, so we requery from the root
                // start with the root data
                data = this.storage.fullData;
                // Ids can be strings or numbers, but convert them all to strings
                // for easier comparisons using indexOf
                this._lastExpanded = expanded.map(function(item) {
                    return String(item);
                });

                data = data.filter(function(item) {
                    return rootCollection.indexOf(item) < 0;
                });

                queryLog = this.queryLog;
                // iterate through the query log, applying each querier
                for (i = 0, l = queryLog.length; i < l; i++) {
                    if (!queryLog[i].querier.isSort) {
                        isFiltered = true;
                    } else {
                        sorted = true;
                    }
                    data = queryLog[i].querier(data, rootCollection);
                }

                // If the data hasn't already been sorted
                // we need to sort the children so that they're grouped together based on their
                // parent
                if (!sorted) {
                    data = this._sortAndCombineChildCollections(this._getChildCollections(data, rootCollection));
                }

                // Get the total length before adding the group headers, because they shouldn't
                // count towards the length
                this.totalLength = data.length;

                i = 0;
                while (i < data.length) {
                    if (lastCategoryId === null || data[i].parent !== lastCategoryId) {
                        lastCategoryId = data[i].parent;
                        for (l = 0; l < rootCollection.length; l++) {
                            if (this.getIdentity(rootCollection[l]) === lastCategoryId) {
                                data.splice(i, 0, rootCollection.splice(l, 1)[0]);
                                if (skippedGroups) {
                                    for (j = 0; j < skippedGroups.length; j++) {
                                        data.splice(i, 0, skippedGroups[j]);
                                        i++;
                                    }
                                    skippedGroups = [];
                                }
                                i += 2;
                                break;
                            } else if (skippedGroups) {
                                // Add in reverse order so when we splice them in
                                // they'll end up in the correct order
                                skippedGroups.unshift(rootCollection.splice(l, 1)[0]);
                                l--;
                            }
                        }
                    } else {
                        i++;
                    }
                }

                // We need to filter out the collapsed children after inserting the roots, because
                // we want the order of the roots to be consistent, and the only way to do that is to either
                // sort on the entire dataset, or insert them in the appropriate place after sorting and before
                // removing the collapsed children. This still misses the edge case where all the children of
                // a category have been filtered out, but in that case just displaying it at the end is ok since
                // it won't expand to have any children anyway.
                data = data.filter(function(item) {
                    return self._lastExpanded.indexOf(String(item.parent)) >= 0 ||
                        typeof item.parent === 'undefined' ||
                        item.parent === null;
                });

                // store it, with the storage version stamp
                data._version = this.storage.version;
                this.data = data;
            } else {
                rootCollection = rootCollection.filter(function(root) {
                    return data.indexOf(root) < 0;
                });
            }
            // Start will only be greater than data.length if
            // last was hit when not all groups were expanded or this
            // was an invalid request. Either way it's better to send
            // back the last page of available data then an empty results set
            if (start >= data.length) {
                originalCount = end - start;
                start = Math.floor((data.length - 2) / originalCount) * originalCount;
                end = start + originalCount;
            }

            // Expand the range to include all the rows that it should that have been pushed out
            // by group headers rows
            for (i = 0; i < end && i < data.length; i++) {
                if (this.mayHaveChildren(data[i])) {
                    end++;

                    if (i < start && !virtual) {
                        start++;
                        startOffset++;
                    }
                }
            }
            data = data.slice(start, end);
            childrenLength = data.length;
            // Only show the categories on the same page if there are fewer children than tha maximum allowed
            // since we don't want to expand a category and have no children show up under it.
            // If this is the case, even though there is more data, we also need to disable the Next and Last pagination
            // buttons since there will be no data to display until a category is expanded.
            if (childrenLength < (end - start) || originalEnd >= this.totalLength) {
                if (rootCollection.length > 0 && !isFiltered) {
                    data = data.concat(rootCollection);
                }
                queryResults = new QueryResults(data, {totalLength: this.totalLength});
                queryResults.isLastPage = true;
            } else {
                queryResults = new QueryResults(data, {totalLength: this.totalLength});
            }
            if (originalCount) {
                queryResults.start = start - startOffset + 1;
            }
            return queryResults;
        },

        /**
         * Creates a function that will sort data based on the provided
         * parameters. This method creates a function that handles sorting
         * within content groups.
         * @param {Function | Array} sorted - A comparison function for items or
         * an array of objects that each contain the name of a property on the store items
         * to sort by and a boolean indicating whether to sort in descending or ascending
         * manner.
         * @returns {Function} - The sorting function to call on the data
         * @private
         */
        _createSortQuerier: function(sorted) {
            var self = this,
            sortQuerier = function(data, rootCollection) {
                var comparator = typeof sorted === 'function' ? sorted : function(a, b) {
                        var i,
                            comparison,
                            property,
                            descending,
                            aValue,
                            bValue;
                        for (i = 0; i < sorted.length; i++) {
                            if (typeof sorted[i] === 'function') {
                                comparison = sorted[i](a, b);
                            } else {
                                property = sorted[i].property;
                                descending = sorted[i].descending;
                                aValue = a.get ? a.get(property) : a[property];
                                bValue = b.get ? b.get(property) : b[property];

                                /* jshint ignore:start */
                                aValue != null && (aValue = aValue.valueOf());
                                bValue != null && (bValue = bValue.valueOf());

                                comparison = aValue === bValue
                                    ? 0
                                    : (!!descending === (aValue === null || aValue > bValue && bValue !== null) ? -1 : 1);
                                /* jshint ignore:end */
                            }

                            if (comparison !== 0) {
                                return comparison;
                            }
                        }
                        return 0;
                    },
                    childCollections = self._getChildCollections(data.slice(), rootCollection);
                data = self._sortAndCombineChildCollections(childCollections, comparator);

                return data;
            };
            sortQuerier.isSort = true;
            return sortQuerier;
        },

        /**
         * Sorts each of the passed in child collections using the provided
         * comparator, and then arranges the child collections in the appropriate
         * order based on the contained data. If the _forceGroupOrder flag is set
         * to true the second step is skipped
         * @param {Array} childCollections - The list of items for each content group
         * @param {Function} comparator - The comparator function used to sort the items
         * @returns {Array} A single array containing all of the items in the appropriate order
         * @private
         */
        _sortAndCombineChildCollections: function(childCollections, comparator) {
            var collectionComparator = function(a, b) {
                if (!a || !a[0]) {
                    if (!b || !b[0]) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else if (!b || !b[0]) {
                    return -1;
                } else {
                    return comparator ? comparator(a[0], b[0]) : 0;
                }
            },
                i;

            if (comparator) {
                for (i = 0; i < childCollections.length; i++) {
                    childCollections[i].sort(comparator);
                }
            }
            if (!this._forceGroupOrder) {
                childCollections.sort(collectionComparator);
            }

            for (i = 1; i < childCollections.length; i++) {
                childCollections[0] = childCollections[0].concat(childCollections[i]);
            }

            return childCollections[0];
        },

        /**
         * Returns an array of arrays, where each array contains all of the
         * items belonging to a specific content group.
         * @param {Array} data - The entire collection from which to extract the
         * child collections
         * @param {Array} rootCollection - The roots, or parents, of the content
         * groups within the collection
         * @returns {Array} - An array containing arrays which each contain all
         * the items that are children of a single content group.
         * @private
         */
        _getChildCollections: function(data, rootCollection) {
            var childCollections = [],
                rootIdentity,
                i;

            for (i = 0; i < rootCollection.length; i++) {
                rootIdentity = this.getIdentity(rootCollection[i]);
                childCollections.push(data.filter(function(item) {
                    return item.parent === rootIdentity;
                }));
            }

            return childCollections;
        },

        /**
         * Returns a collection containing all of the parent elements
         * in the data.
         * @returns {Array} - An array containing the parent elements
         * @private
         */
        _getRoots: function() {
            return this.storage.fullData.filter(function(obj) {
                return obj.parent == null; //jshint ignore:line
            });
        },

        /**
         * Returns true if the passed in item might have children and
         * false if not.
         * @param {Object} object - The item to check for whether it may
         * have children
         * @returns {Boolean} - A flag indicating whether or not the item
         * might have children
         */
        mayHaveChildren: function(object) {
            return typeof object.parent === 'undefined' || object.parent === null;
        },

        /**
         * Wraps fetchGroupRangeSync so that it returns a promise
         * @returns {Promise} - A Promise containing the results of the query.
         */
        fetchGroupRange: promised('fetchGroupRangeSync')
    });
});

/**
 * @external dstore/Request
 * @see https://github.com/SitePen/dstore/blob/master/docs/Store.md
 */

/**
 * @module
 * @class ContentGroupRequest
 * @extends dstore/Request
 * The ContentGroupRequest returns appropriate rows and headers to display
 * for content grouping.
 *
 * This store is required whenever content grouping is enabled and a
 * server-backed store is needed. If a in-memory store is needed, see ContentGroupMemory
 */
define('hui/table/ContentGroupRequest',['dojo/_base/declare',
        'dojo/_base/lang',
        'dojo/request',
        'dstore/Request',
        'dstore/QueryResults'
], function(declare, lang, request, Request, QueryResults) {
    return declare(Request, {

        /**
         * Flag indicating whether to let sorting determine the order of
         * groups. If true then the order of groups is determined by their
         * original order in the data and sorting only occurs among items
         * within groups. If false then items are still only sorted within
         * their groups, but the order of the groups themselves is also
         * determined by the sorted order of the contained items.
         * @type {Boolean}
         */
        _forceGroupOrder: false,

        /**
         * Sets the _forceGroupOrder flag
         * @param {Boolean} forceGroupOrder - The value to set the flag with
         */
        forceGroupOrder: function(forceGroupOrder) {
            this._forceGroupOrder = forceGroupOrder;
        },

        /**
         * Renders a query string based on the 'expanded' params, which
         * include the list of the IDs of content groups that are expanded,
         * and the forceGroupOrder flag.
         * @param {Array} expanded - The list of IDs of content groups that
         * have been expanded
         * @returns {string} - The rendered query string
         * @private
         */
        _renderExpandedParams: function(expanded) {
            var forceGroupOrderParam = expanded.length ?
                (this._forceGroupOrder ? '&forceGroupOrder=true' : '') :
                (this._forceGroupOrder ? 'forceGroupOrder=true': '');
            return expanded.map(function(itemId) {
                return 'expanded=' + itemId;
            }).join('&') + forceGroupOrderParam;
        },

        /**
         * Renders query parameters to request a specific range
         * of data, and also renders the 'expanded' params, which
         * indicate which content groups have been expanded and whether
         * to enforce the original order of content groups or allow
         * them to be sorted.
         * @returns {String} - A string containing 'start', 'end' 'forceGroupOrder', and
         * 'expanded' query parameters
         * @private
         */
        _renderRangeParams: function() {
            var expanded = arguments[2],
            queryParams = this.inherited(arguments),
                expandedQueryParams;

            expandedQueryParams = this._renderExpandedParams(expanded);
            if (expandedQueryParams) {
                queryParams = queryParams || [];
                queryParams.push(expandedQueryParams);
            }

            return queryParams;
        },

        /**
         * Renders the appropriate query string based on the provided
         * options and calls the server to request the items.
         * @param {Object} kwArgs - An object containing 'start', 'end',
         * and 'expanded' properties that
         * @returns {QueryResults} - A promise that resolves to the requested data,
         * and which has a totalLength property that is a promise that resolves to the
         * totalLength of the requested data.
         */
        fetchGroupRange: function(kwArgs) {
            var start = kwArgs.start,
                end = kwArgs.end,
                expanded = kwArgs.expanded || [],
                requestArgs = {},
                results,
                expandedQueryParams,
                queryResults;
            if (this.useRangeHeaders) {
                requestArgs.headers = this._renderRangeHeaders(start, end);
                expandedQueryParams = this._renderExpandedParams(expanded);
                if (expandedQueryParams) {
                    requestArgs.queryParams = [expandedQueryParams];
                }
            } else {
                requestArgs.queryParams = this._renderRangeParams(start, end, expanded);
            }

            results = this._request(requestArgs);
            queryResults = new QueryResults(results.data, {
                totalLength: results.total,
                response: results.response
            });

            if (queryResults.then) {
                queryResults.then(function(data) {
                    data.isLastPage = results.isLastPage;
                    data.start = results.start;
                });
            } else {
                queryResults.isLastPage = results.isLastPage;
                queryResults.start = results.start;
            }
            return queryResults;
        },

        /**
         * Returns true if the passed in item might have children and
         * false if not.
         * @param {Object} object - The item to check for whether it may
         * have children
         * @returns {Boolean} - A flag indicating whether or not the item
         * might have children
         */
        mayHaveChildren: function(object) {
            return typeof object.parent === 'undefined' || object.parent === null;
        },

        /**
         * Overrides Request's implementation so that isLastPage can be added to the return
         * object
         * @param {Object} kwArgs
         * @returns {{data: *, total: *, response: *, isLastPage: *}}
         * @private
         */
        _request: function(kwArgs) {
            kwArgs = kwArgs || {};

            // perform the actual query
            var headers = lang.delegate(this.headers, { Accept: this.accepts }),
                requestUrl,
                response,
                collection,
                parsedResponse;

            if ('headers' in kwArgs) {
                lang.mixin(headers, kwArgs.headers);
            }

            requestUrl = this._renderUrl(kwArgs.queryParams);

            response = request(requestUrl, {
                method: 'GET',
                headers: headers
            });
            collection = this;
            parsedResponse = response.then(function(response) {
                return collection.parse(response);
            });
            return {
                data: parsedResponse.then(function(data) {
                    // support items in the results
                    var results = data.items || data,
                        i,
                        l;
                    for (i = 0, l = results.length; i < l; i++) {
                        results[ i ] = collection._restore(results[ i ], true);
                    }
                    return results;
                }),
                total: parsedResponse.then(function(data) {
                    // check for a total property
                    var total = data.total;
                    if (total > -1) {
                        // if we have a valid positive number from the data,
                        // we can use that
                        return total;
                    }
                    // else use headers
                    return response.response.then(function(response) {
                        var range = response.getHeader('Content-Range');
                        return range && (range = range.match(/\/(.*)/)) && +range[ 1 ];
                    });
                }),
                response: response.response,
                isLastPage: parsedResponse.then(function(data) {
                    return data.isLastPage;
                }),
                start: parsedResponse.then(function(data) {
                    return data.start;
                })
            };
        }
    });
});

define('hui/table/LazyRowExpansionRenderer',[
    'hui/table/DefaultRenderer',
    'object-utils/classes',
    'hui/core/keys',
    'hui/core/a11y',
    'hui/core/utils'
], function(DefaultRenderer, classes, keys, a11y, utils) {
    /**
     * Counter for generating unique IDs for row expansions
     * @type {number}
     * @private
     */
    var counter = 0;

    /**
     * Returns whether the expansion's visibility should be toggled. If the click event
     * came from an input field, button, or anchor, then it is presumably meant to perform some other action,
     * and the expansion should remain in its current state. Similarly, if the click was inside the batch cell
     * then it should also be ignored. This method assumes that activatorSelector is not being used, as in that case
     * any click within the targeted area should toggle visibility.
     * @param {Event} clickEvent
     * @param {string} batchClass
     * @returns {boolean}
     */
    function shouldToggle(clickEvent, batchClass) {
        var toggle = true;
        if (clickEvent && clickEvent.target) {
            var element = clickEvent.target;

            while (element) {
                if (element.tagName === 'HA-TABLE') {
                    break;
                }
                if (element.classList.contains(batchClass)) {
                    toggle = false;
                    element = null;
                } else {
                    element = element.parentElement;
                }
            }
            if (clickEvent.target.tagName === 'HA-CHECKBOX' || clickEvent.target.tagName === 'HA-RADIO-BUTTON' ||
                clickEvent.target.tagName === 'INPUT' || clickEvent.target.tagName === 'BUTTON' ||
                clickEvent.target.tagName === 'A') {
                toggle = false;
            }
        }

        return toggle;
    }

    function _addTableAnimation(table, isEnabled) {
        if (isEnabled) {
            table.querySelector('.dgrid-grid').classList.add('animate-height');
        } else {
            table.querySelector('.dgrid-grid').classList.remove('animate-height');
        }
    }

    return classes.extend(DefaultRenderer, {
        constructor: function(options) {
            options = options || {};
            /**
             * Renders the content of the expanded area. This content is placed below the 'header' in the expanded
             * area, which really is just a div to hold the close button.
             * @type {Function}
             */
            this.renderRowExpansionContent = options.renderRowExpansionContent || function(object) {
                var rowExpansionContentDiv = this.table.ownerDocument.createElement('div'),
                    id = this.table.store.getIdentity(object);
                rowExpansionContentDiv.textContent = 'RowExpansion content for row with object id: ' + id;
                return rowExpansionContentDiv;
            };
            /**
             * Options CSS selector that specifies the element within each row that should trigger the expansion to
             * be displayed/hidden. If not specified, clicking any of the cells will display the expansion
             *
             * @type {string}
             */
            this.activatorSelector = options.activatorSelector;

            /**
             * Optional value to set the height of the row expansion.
             * Should be a numeric value indicating the height in pixels.
             *
             * @type {number}
             */
            this.expansionHeight = options.expansionHeight;

            this.manualActivation = options.manualActivation || false;

            this.expansionClassName = options.expansionClassName;

            this.useFocusIndicator = options.useFocusIndicator || false;

            this.focusIndicatorLabel = options.focusIndicatorLabel || '';

            this._expandedRows = {};

            /**
             * Optional value to specify whether the last expanded row should be scrolled to the top
             * of the table. Defaults to false, which means never scroll.
             * @type {number}
             */
            this.scrollingThreshold = options.scrollingThreshold || false;

            /**
             * Optional value specifying whether expanded rows force the table to resize. Defaults to false.
             * @type {boolean}
             */
            this.autoResizeTable = options.autoResizeTable || false;

            // If the whole row should trigger expansion, than only the batch cell should trigger selection
            if (!options.activatorSelector) {
                this.tableConfig = {
                    selectionMode: 'none'
                };
            }
        },

        /**
         * By default we don't want to let clicks leak out of the expansion content. It can handle its own events and
         * other listeners on the table might not anticipate a click coming from this content. This could be explicitly
         * overridden if for some reason the table needs to handle these click events.
         */
        _expansionMouseHandler: function(event) {
            // Avoid complications with batch mode or other table mouse event listeners by preventing events in the
            // expansion from bubbling out.
            event.stopPropagation();
        },

        /**
         * Toggles the visiblity of the passed element, unless hide is passed to force
         * the element to be shown or hidden
         * @param {HTMLElement} row
         * @param {boolean} hide
         * @param {HTMLElement} activatorElement The element that toggles display of the expanded content
         */
        _toggleRowExpansion: function(row, hide, activatorElement) {
            var rowExpansion = row.querySelector('.ha-table-row-expansion'),
                tableRow = this.table.row(row),
                shouldShow,
                midAnimation;
            if (!rowExpansion) {
                this.lazyRenderRowExpansion(row, hide, activatorElement);
                rowExpansion = row.querySelector('.ha-table-row-expansion');
            }
            if (row.querySelector('.' + this.batchClass)) {
                rowExpansion.classList.add('batch-table-expansion');
                rowExpansion.classList.remove('no-batch-table-expansion');
            } else {
                rowExpansion.classList.add('no-batch-table-expansion');
                rowExpansion.classList.remove('batch-table-expansion');
            }
            if (typeof hide !== 'undefined' && hide !== null) {
                shouldShow = !Boolean(hide);
            } else {
                midAnimation = rowExpansion.classList.contains('hidden') !== rowExpansion.classList.contains('hide-expansion');
                shouldShow =  rowExpansion.classList.contains('hidden');
            }

            if (midAnimation) {
                return;
            }

            if (shouldShow) {
                this._expandedRows[tableRow.id] = true;

                rowExpansion.classList.remove('hidden');
                if (this.useFocusIndicator) {
                    row.classList.add('show-focus');
                }
                setTimeout(function() {
                    rowExpansion.classList.remove('hide-expansion');
                    this._handleFocusAndAriaAttributes(rowExpansion, activatorElement, row);
                }.bind(this), 0);

                if (this.scrollingThreshold !== false) {
                    var scroller = row;

                    while (scroller && !scroller.classList.contains('dgrid-scroller')) {
                        scroller = scroller.parentElement;
                    }

                    if (scroller) {
                        setTimeout(function() {
                            var viewport = scroller.getBoundingClientRect(),
                                rowViewport = row.getBoundingClientRect();

                            if ((viewport.bottom - rowViewport.top) / rowViewport.height < this.scrollingThreshold) {
                                utils.animateScrollTo(scroller, row.offsetTop, 150);
                            }
                        }.bind(this), 50);
                    }
                }

                if (this.autoResizeTable) {
                    setTimeout(function() {
                        this.table._calculateInitialHeight({type: 'row-expander-resize'});
                    }.bind(this), 0);
                }
            } else {
                delete this._expandedRows[tableRow.id];

                rowExpansion.classList.add('hide-expansion');

                if (this.useFocusIndicator) {
                    row.classList.remove('show-focus');
                }

                setTimeout(function() {
                    rowExpansion.classList.add('hidden');
                }.bind(this), 350);

                if (this.autoResizeTable) {
                    setTimeout(function() {
                        _addTableAnimation(this.table, true);

                        this.table._calculateInitialHeight({type: 'row-expander-resize'});
                        setTimeout(function() {
                            _addTableAnimation(this.table, false);
                        }.bind(this), 250);
                    }.bind(this), 250);
                }

                this._handleFocusAndAriaAttributes(rowExpansion, activatorElement, row);
            }
        },

        lazyRenderRowExpansion: function(row, hide, activatorElement) {
            var table = this.table,
                rowExpansion = table.ownerDocument.createElement('div'),
                toggleRowExpansion = function(event, hide) {
                    if (this.activatorSelector || shouldToggle(event, this.batchClass)) {
                        this._toggleRowExpansion(row, hide, activatorElement);
                    }
                }.bind(this),
                forceToggleRowExpansion = function(event, hide) {
                    this._toggleRowExpansion(row, hide, activatorElement);
                }.bind(this),
                object = activatorElement._expansionData,
                rowExpansionContent = this.renderRowExpansionContent(object, forceToggleRowExpansion),
                closeButton = table.ownerDocument.createElement('button'),
                batchCell = row.querySelector('.' + this.batchClass),
                cleanupListeners;

            rowExpansion.id = activatorElement._expansionId;

            if (this.expansionHeight) {
                rowExpansion.style.height = this.expansionHeight + 'px';
            }
            closeButton.className = 'hi hi-close close-expansion-button';
            closeButton.addEventListener('click', forceToggleRowExpansion);
            closeButton.setAttribute('aria-label', 'Close expanded row');

            rowExpansion.appendChild(rowExpansionContent);

            if (!this.manualActivation) {
                rowExpansionContent.appendChild(closeButton);

                rowExpansion.setAttribute('tabindex', '-1');
                rowExpansion.addEventListener('keydown', function(event) {
                    if (event.keyCode === keys.ESCAPE) {
                        toggleRowExpansion();
                    }

                    a11y.keepFocusInsideListener(event, rowExpansion);
                });
                // Prevent mouse/touch events from bubbling
                rowExpansion.addEventListener('click', this._expansionMouseHandler);
                rowExpansion.addEventListener('mousedown', this._expansionMouseHandler);
                rowExpansion.addEventListener('touchstart', this._expansionMouseHandler);

                cleanupListeners = function() {
                    activatorElement.removeEventListener('click', toggleRowExpansion);
                    activatorElement.removeEventListener('keydown', activatorElement._keyboardEventHandler);
                };
            }

            rowExpansion.className = 'ha-table-row-expansion';

            if (!(object.id in this._expandedRows)) {
                rowExpansion.classList.add('hide-expansion', 'hidden');
            }

            if (this.expansionClassName) {
                rowExpansion.classList.add(this.expansionClassName);
            }

            if (batchCell) {
                rowExpansion.classList.add('batch-table-expansion');
            } else {
                rowExpansion.classList.add('no-batch-table-expansion');
            }

            if (this.useFocusIndicator) {
                var focusIndicator = document.createElement('button');
                focusIndicator.className = 'focus-indicator hi hi-chevron-down';
                if (this.focusIndicatorLabel) {
                    focusIndicator.setAttribute('aria-label', this.focusIndicatorLabel);
                }
                focusIndicator.addEventListener('click', function() {
                    this._toggleRowExpansion(row, true, activatorElement);
                }.bind(this));
                row.appendChild(focusIndicator);
            }

            row.appendChild(rowExpansion);
            //Provide cleanup for anything created in the row formatter.
            row.destroy = function() {
                if (cleanupListeners) {
                    cleanupListeners();
                }

                if (rowExpansionContent.destroy) {
                    rowExpansionContent.destroy();
                }
            };
        },

        /**
         * Focus the expanded area or activating element, publish close or show event, and set the value
         * of the aria-expanded attribute as appropriate.
         * @param {HTMLElement} rowExpansion The content that has been expanded or collapsed
         * @param {HTMLElement} activatorElement The element that toggles the display of the expansion content
         * @param {*} row The owning row
         * @private
         */
        _handleFocusAndAriaAttributes: function(rowExpansion, activatorElement, row) {
            if (rowExpansion.classList.contains('hide-expansion')) {
                if (!activatorElement.hasAttribute('tabindex')) {
                    activatorElement.setAttribute('tabindex', '-1');
                    activatorElement.addEventListener('blur', function removeTabIndex() {
                        activatorElement.removeAttribute('tabindex');
                        activatorElement.removeEventListener('blur', removeTabIndex);
                    });
                }

                activatorElement.focus();
                activatorElement.setAttribute('aria-expanded', false);
                row.classList.remove('highlighted-dgrid-row');
                this.table.emit('expandable-row-close', {
                    bubbles: false,
                    row: row
                });
            } else {
                activatorElement.setAttribute('aria-expanded', true);
                row.classList.add('highlighted-dgrid-row');
                rowExpansion.focus();
                this.table.emit('expandable-row-show', {
                    bubbles: false,
                    row: row
                });
            }
        },

        /**
         * Adds event listeners to handle showing/hiding it
         * @param {HTMLElement} row The grid row element
         * @param {Object} object The object being rendered for this cell.
         * @returns {*} The row element the expansion was added to
         */
        addExpansionListeners: function(row, object) {
            var activatorElement = row.querySelector('table') || row,
                toggleRowExpansion = function(event, hide) {
                    if (this.activatorSelector || shouldToggle(event, this.batchClass)) {
                        this._toggleRowExpansion(row, hide, activatorElement);
                    }
                }.bind(this),
                keyboardEventHandler = function(event) {
                    if (event.keyCode === keys.ENTER || event.keyCode === keys.SPACEBAR) {
                        toggleRowExpansion(event);
                    }
                },
                expansionId;

            if (!this.manualActivation) {

                if (this.activatorSelector) {
                    // In this case a custom selector has been provided and only that element should activate
                    // the rowExpansion
                    activatorElement = row.querySelector(this.activatorSelector);
                }
                expansionId = 'table-row-expansion' + counter++;
                activatorElement._expansionId = expansionId;
                activatorElement._expansionData = object;
                activatorElement._keyboardEventHandler = keyboardEventHandler;
                activatorElement.setAttribute('aria-controls', expansionId);
                activatorElement.setAttribute('aria-expanded', false);

                if (activatorElement && activatorElement.addEventListener) {
                    activatorElement.addEventListener('click', toggleRowExpansion);
                    if (activatorElement.tagName !== 'BUTTON') {
                        activatorElement.addEventListener('keydown', keyboardEventHandler);
                    }
                }
            }
            return row;
        },

        row: function(object, options, defaultRender) {
            var defaultRow = defaultRender();

            return this.addExpansionListeners(defaultRow, object, options);
        },

        setup: function() {
            this.batchClass = 'field-' + this.table.batchField;
        }
    });
});

define('hui/table/RendererFactoryRegistry',[
    '../core/utils',
    'object-utils/classes',
    './rendererFactoryFactory'
], function(utils, classes, rendererFactoryFactory) {
    /**
     * @deprecated since 0.13.0 Use HA-TABLE#addRenderMode instead for adding render modes
     */
    var RendererFactoryRegistry = classes.extend(Object, {
        constructor: function(rendererClassesMap) {
            this.rendererClassesMap = rendererClassesMap || {};
            console.warn('DEPRECATION WARNING: The RendererFactoryRegistry is deprecated and should should not be used ' +
                'anymore. Use the Table#addRenderMode method instead to directly add a render mode to a table');
        },

        getRendererFactory: function() {
            var renderers = {},
                key;

            for (key in this.rendererClassesMap) {
                if (this.rendererClassesMap.hasOwnProperty(key)) {
                    renderers[key] = new this.rendererClassesMap[key]();
                }
            }

            return rendererFactoryFactory(renderers);
        },

        registerRenderer: function(name, RendererClass) {
            this.rendererClassesMap[name] = RendererClass;
        }
    });

    return RendererFactoryRegistry;
});

define('hui/table-virtual',[
    'register-component/v2/register',
    'object-utils/classes',
    './table',
    './table/TableBase',
    './core/keys'
], function(register, classes, HATable, TableBase, keys) {
    /**
     * @class HATableVirtual
     * @extends HATable
     */
    var HATableVirtual = classes.createObject(HATable.prototype, /** @lends HATableVirtual# */ {
        _createGrid: function() {
            var grid = TableBase.factory({
                table: this,
                virtual: true,
                columns: this._getColumns()
            }, this._gridNode);

            grid.addKeyHandler(keys.ESCAPE, this._escapeHandler.bind(this));

            return grid;
        },

        _escapeHandler: function() {
            var node = this._getNextFocusableSibling() || this.querySelector('.table-escape-node');
            node.focus();
        },

        _getNextFocusableSibling: function() {
            var node = this.nextElementSibling;

            while (node) {
                if (node.focus) {
                    node.focus();

                    if (this.ownerDocument.activeElement === node) {
                        return node;
                    }
                }

                node = node.nextElementSibling;
            }
        },

        _shouldShowPaginationSettings: function() {
            return false;
        }
    });

    return register('ha-table-virtual', HATableVirtual);
});

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('hui-react/table/EventFilters',["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.EventFilters = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var EventFilters = function () {
        function EventFilters() {
            _classCallCheck(this, EventFilters);
        }

        _createClass(EventFilters, null, [{
            key: "noFilter",
            value: function noFilter(event) {
                return event;
            }
        }, {
            key: "filterSelection",
            value: function filterSelection(event) {
                var rows = event.rows.map(function (row) {
                    return row.data;
                });

                // Return cleaned up results
                return {
                    // This is the row data for all rows that were selected/deselected by the
                    // event that triggered this
                    eventSelection: rows,

                    // This is the current selection for the overall table and NOT from the
                    // event that triggered this
                    // It will return an object with with row IDs as keys and true/false if they are
                    // selected or not
                    //
                    // {
                    //   1: true,
                    //   2: false
                    // }
                    tableSelectionById: event.grid.selection
                };
            }
        }]);

        return EventFilters;
    }();

    exports.default = EventFilters;
});
//# sourceMappingURL=EventFilters.js.map
;
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('hui-react/table/config',["exports", "./EventFilters"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./EventFilters"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.EventFilters);
        global.config = mod.exports;
    }
})(this, function (exports, _EventFilters) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _EventFilters2 = _interopRequireDefault(_EventFilters);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {

        // Custom options or options that require special handling. These options are specific to this React wrapper and we need to adapt them before we apply them to
        // HATable instance.
        customOptions: {
            settingsRenderer: true,
            onOtherSettingsRender: true,
            renderModes: true,
            onTableBarCustomRender: true,
            onTableBarCustomActionRender: true,
            virtual: true,
            totals: true
        },

        // Expose some methods on this React wrapper to call the corresponding API methods on
        // the underlying table instance.
        //   @see https://facebook.github.io/react/tips/expose-component-functions.html
        apiToExpose: {
            clearErrors: true,
            onClickEdit: true,
            refresh: true,
            resize: true,
            resizeColumnWidth: true,
            revert: true,
            save: true
        },

        // A list of callback functions and events they correspond to on the underlying
        // HATable instance. We'll listen for these events and call the corresponding
        // callbacks to make this component more React friendly.
        // FIXME How does the user clear one of these?
        eventsToCallbacks: {
            onCancel: {
                name: "edit-cancel",
                filter: _EventFilters2.default.noFilter
            },
            onColumnHiddenChange: {
                name: "column-hidden-change",
                filter: _EventFilters2.default.noFilter
            },
            onColumnResize: {
                name: "column-resize",
                filter: _EventFilters2.default.noFilter
            },
            onDatachange: {
                name: "datachange",
                filter: _EventFilters2.default.noFilter
            },
            onDeselect: {
                name: "batch-deselect",
                filter: _EventFilters2.default.filterSelection
            },
            onError: {
                name: "error",
                filter: _EventFilters2.default.noFilter
            },
            onExport: {
                name: "export",
                filter: _EventFilters2.default.noFilter
            },
            onRefresh: {
                name: "refresh",
                filter: _EventFilters2.default.noFilter
            },
            onSelect: {
                name: "batch-select",
                filter: _EventFilters2.default.filterSelection
            },
            onSave: {
                name: "edit-save",
                filter: _EventFilters2.default.noFilter
            },
            onSort: {
                name: "sort",
                filter: _EventFilters2.default.noFilter
            }
        }

    };
});
//# sourceMappingURL=config.js.map
;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('hui-react/table/Table',["exports", "react", "react-dom", "dstore/Memory", "./config", "hui/table/LazyRowExpansionRenderer", "hui/table", "hui/table-virtual", "xstyle/css!hui-css/hui-table.min.css"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("dstore/Memory"), require("./config"), require("hui/table/LazyRowExpansionRenderer"), require("hui/table"), require("hui/table-virtual"), require("xstyle/css!hui-css/hui-table.min.css"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Memory, global.config, global.LazyRowExpansionRenderer, global.table, global.tableVirtual, global.huiTableMin);
        global.Table = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Memory, _config, _LazyRowExpansionRenderer) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _Memory2 = _interopRequireDefault(_Memory);

    var _config2 = _interopRequireDefault(_config);

    var _LazyRowExpansionRenderer2 = _interopRequireDefault(_LazyRowExpansionRenderer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Table = function (_React$Component) {
        _inherits(Table, _React$Component);

        _createClass(Table, null, [{
            key: "displayName",
            get: function get() {
                return "Table";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    columns: _react2.default.PropTypes.object.isRequired,
                    data: _react2.default.PropTypes.array,
                    collection: _react2.default.PropTypes.object,
                    options: _react2.default.PropTypes.object
                };
            }
        }]);

        function Table(props) {
            _classCallCheck(this, Table);

            var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

            // Namespace for API methods to expose on this instance.
            //   @see https://facebook.github.io/react/tips/expose-component-functions.html
            _this.api = {};

            // List other instance props for documentation
            _this.store = null;
            _this.totals = null;
            _this.table = null;
            _this.rowExpansionNodeCache = {};
            _this.cache = {};
            _this.otherSettingsNode = null;
            _this.tableBarCustomNode = null;
            _this.tableBarCustomActionNode = null;
            return _this;
        }

        // React component lifecycle
        //   @see https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount

        _createClass(Table, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // Create a version of HATable in memory
                this.table = this.renderTable();

                // Add the full table domNode to the component
                // Although this is not the most efficient use of React it does allow us to reuse the full
                // table implementation
                this.wrapper.appendChild(this.table);
            }
        }, {
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                // Only allow option updates to the underlying table. No store or column changes.
                this.mixinOptions(this.table, nextProps.options);
                this.connectCallbacks(this.table, nextProps.options);

                // Update the store data (if needed)
                this.setStoreData(nextProps.data);

                //remove the render modes from the current props a.k.a this.props.options
                //new render modes from nextProps.options will be processed as part of postTableRender
                this.preTableRender(this.table, this.props.options);

                // Apply any post render changes
                this.postTableRender(this.table, nextProps.options, nextProps.data);

                // Update the columns
                // Setting the columns triggers a table refresh so do this last
                this.table.columns = this.adaptColumns(nextProps.columns);

                // Don't render the whole table again. We render it once and apply approved changes.
                return false;
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                // Clean React nodes
                if (this.otherSettingsNode) {
                    _reactDom2.default.unmountComponentAtNode(this.otherSettingsNode);
                }
                if (this.tableBarCustomNode) {
                    _reactDom2.default.unmountComponentAtNode(this.tableBarCustomNode);
                }
                if (this.tableBarCustomActionNode) {
                    _reactDom2.default.unmountComponentAtNode(this.tableBarCustomActionNode);
                }

                //clear out row expansion nodes
                this.clearRowExpansionNodeCache();
                // Clear the cache
                this.clearCache();

                // Clean up all our table references
                this.table = null;
                this.api = null;
                this.totals = null;
                this.store = null;
                this.wrapper = null;
                this.otherSettingsNode = null;
                this.tableBarCustomNode = null;
                this.tableBarCustomActionNode = null;
                this.rowExpansionNodeCache = null;
                this.cache = null;
            }
        }, {
            key: "clearCache",
            value: function clearCache() {
                var _this2 = this;

                Object.keys(this.cache).forEach(function (key) {
                    _reactDom2.default.unmountComponentAtNode(_this2.cache[key]);
                });

                this.cache = {};
            }
        }, {
            key: "clearRowExpansionNodeCache",
            value: function clearRowExpansionNodeCache() {
                var _this3 = this;

                Object.keys(this.rowExpansionNodeCache).forEach(function (key) {
                    _reactDom2.default.unmountComponentAtNode(_this3.rowExpansionNodeCache[key]);
                });

                this.rowExpansionNodeCache = {};
            }
        }, {
            key: "handleWrapperRef",
            value: function handleWrapperRef(wrapper) {
                this.wrapper = wrapper;
            }
        }, {
            key: "shouldUpdateTablePropery",
            value: function shouldUpdateTablePropery(table, key, value) {
                // Don't update the key if it's already set or if it's a key that requires special handling
                return !_config2.default.customOptions[key] && !_config2.default.eventsToCallbacks[key] && table[key] !== value;
            }
        }, {
            key: "connectCallbacks",
            value: function connectCallbacks(table, options) {
                if (table && options) {
                    Object.keys(_config2.default.eventsToCallbacks).forEach(function (key) {
                        var callback = options[key];
                        var callbackDef = undefined,
                            name = undefined,
                            filter = undefined;

                        // If the callback exists in the options passed in
                        if (callback) {
                            callbackDef = _config2.default.eventsToCallbacks[key];
                            name = callbackDef.name;
                            filter = callbackDef.filter;

                            // Remove the old one (if any) and add the new one
                            table.off(name);
                            table.on(name, function (event) {
                                // Filter the event object so the results are React friendly
                                // before we pass it to the callback function.
                                var e = filter(event);
                                callback(e);
                            });
                        }
                    });
                }
            }
        }, {
            key: "mixinOptions",
            value: function mixinOptions(table, options) {
                var _this4 = this;

                if (table && options) {
                    Object.keys(options).forEach(function (key) {
                        var value = options[key];

                        // Only update the key if we need to
                        // FIXME What do we do if the value is a complex object or array?
                        if (_this4.shouldUpdateTablePropery(table, key, value)) {
                            table[key] = value;
                        }
                    });
                }
            }
        }, {
            key: "isReactComponent",
            value: function isReactComponent(obj) {
                // Using instanceof does not work for some reason
                return _react2.default.Component.isPrototypeOf(obj);
            }
        }, {
            key: "adaptColumns",
            value: function adaptColumns(cols) {
                var _this5 = this;

                var columns = {};

                // Loop through all of the columns
                Object.keys(cols).forEach(function (key) {
                    var Renderer = undefined,
                        renderCell = undefined,
                        onRenderCell = undefined;
                    var that = _this5;

                    columns[key] = cols[key];
                    renderCell = columns[key].renderCell; // eslint-disable-line prefer-const
                    onRenderCell = columns[key].onRenderCell; // eslint-disable-line prefer-const

                    // If the column has a custom renderer, adapt it so it is compatible with HATable.
                    if (_this5.isReactComponent(renderCell)) {
                        // If it's a react component...
                        // FIXME Remove support for this...
                        console.warn("DEPRECATION WARNING: Passing React components to renderCell is deprecated. Use the onRender callback instead.");

                        Renderer = renderCell;
                        columns[key].renderCell = function (rowData, value, node, options) {
                            return that.renderReactCell(Renderer, this.field, rowData, value, node, options);
                        };
                    } else if (onRenderCell) {
                        // If it's a custom callback function...
                        columns[key].renderCell = function (rowData, value, node, options) {
                            var Element = onRenderCell({
                                // Don't pass the node to the consumer. It doesn't make sense in a React world.
                                rowData: rowData,
                                value: value,
                                options: options,
                                column: this.field
                            });
                            return that.renderReactCell(Element, this.field, rowData, value, node, options);
                        };
                    } else {
                        // No overrides. Do nothing...
                    }
                });

                return columns;
            }
        }, {
            key: "renderReactCell",
            value: function renderReactCell(ComponentOrElement, columnId, rowData, value, node, options) {
                var id = this.store.getIdentity(rowData),
                    key = this.getCellKey(id, columnId),
                    cachedNode = this.cache[key],

                // If we have the React Node in the cache, use it
                // Otherwise create an empty node to put it in.
                n = cachedNode || document.createElement("div");

                // Render the component or element to the node for the row
                if (_react2.default.isValidElement(ComponentOrElement)) {
                    // It's an element so we don't need to write JSX to pass in the props
                    _reactDom2.default.render(ComponentOrElement, n);
                } else {
                    // It's a component that needs to be rendered to JSX
                    _reactDom2.default.render(_react2.default.createElement(ComponentOrElement, { rowData: rowData, value: value, node: node, options: options, columnId: columnId }), n);
                }

                // Add the React node to the cache so we can use it later (if needed)
                this.cache[key] = n;

                // Add the React node to the cell node
                node.appendChild(n);
            }
        }, {
            key: "getCellKey",
            value: function getCellKey(rowId, columnId) {
                return rowId + "-" + columnId;
            }
        }, {
            key: "getStore",
            value: function getStore() {
                var store = undefined;

                if (this.store) {
                    store = this.store;
                } else if (this.props.collection) {
                    store = this.props.collection;
                } else {
                    store = new _Memory2.default();
                }

                return store;
            }
        }, {
            key: "setStoreData",
            value: function setStoreData(data) {
                if (data) {
                    this.store.setData(data);
                }
            }
        }, {
            key: "exposeApi",
            value: function exposeApi(table) {
                var _this6 = this;

                Object.keys(_config2.default.apiToExpose).forEach(function (key) {
                    _this6.api[key] = function () {
                        // Proxy the call on this component to the API method on the underlying
                        // HATable instance
                        return table[key].apply(table, arguments); //eslint-disable-line prefer-spread
                    };
                });
            }
        }, {
            key: "addRenderModes",
            value: function addRenderModes(table, nextOptions) {
                var that = this;
                //add render modes now
                if (nextOptions && nextOptions.renderModes) {
                    nextOptions.renderModes.forEach(function (renderModeItem) {
                        var expansionHeight = renderModeItem.renderer.expansionHeight,
                            activatorSelector = renderModeItem.renderer.activatorSelector;
                        var renderRowExpansionContent = null,
                            CustomRowExpansionRenderer = null;

                        //if the custom row expansion function is defined, use it
                        if (renderModeItem.renderer.onRenderRowExpansionContent) {
                            //setup the callback for row expansion
                            renderRowExpansionContent = function renderRowExpansionContent(object, hideExpansion) {
                                var ExpansionContent = renderModeItem.renderer.onRenderRowExpansionContent({
                                    object: object,
                                    hideExpansion: hideExpansion
                                });
                                return that.renderReactRowExpansionContent(ExpansionContent, object.id, renderModeItem.renderMode);
                            };
                        }
                        //use the internal LazyRowExpansionRenderer
                        CustomRowExpansionRenderer = _LazyRowExpansionRenderer2.default.bind(null, {
                            activatorSelector: activatorSelector,
                            expansionHeight: expansionHeight,
                            renderRowExpansionContent: renderRowExpansionContent
                        });
                        //Add render mode to the main table
                        table.addRenderMode(renderModeItem.renderMode, new CustomRowExpansionRenderer());
                    });
                }
            }
        }, {
            key: "removeRenderModes",
            value: function removeRenderModes(table, prevOptions) {
                //remove render nodes
                if (prevOptions && prevOptions.renderModes) {
                    prevOptions.renderModes.forEach(function (renderModeItem) {
                        table.removeRenderMode(renderModeItem.renderMode);
                    });
                }
            }
        }, {
            key: "preTableRender",
            value: function preTableRender(table, prevOptions) {
                //process row rendering
                if (prevOptions && prevOptions.renderModes) {
                    //renderModes may have been removed or updated by the user in options settings
                    //we need to clean up and add again as part of postTableRender
                    this.removeRenderModes(table, prevOptions);
                }
            }
        }, {
            key: "renderReactRowExpansionContent",
            value: function renderReactRowExpansionContent(ExpansionContent, objectId, renderMode) {
                //generate a unique key for a React element per row based on the render mode
                var key = objectId + "-" + renderMode,
                    cachedNode = this.rowExpansionNodeCache[key],

                //reuse React node from the cache or create a new one
                n = cachedNode || document.createElement("div");
                //render the expansion content
                _reactDom2.default.render(ExpansionContent, n);

                // Add the React node to the cache so we can use and clean it up later (if needed)
                this.rowExpansionNodeCache[key] = n;

                return n;
            }
        }, {
            key: "selectRows",
            value: function selectRows(table, data) {
                var _this7 = this;

                data.forEach(function (dataRow) {
                    if (dataRow._selected) {
                        var id = _this7.store.getIdentity(dataRow),
                            row = table.row(id);

                        table.select(row);
                    }
                });
            }
        }, {
            key: "applyOtherSettings",
            value: function applyOtherSettings(table, options) {
                var SettingsRenderer = options.settingsRenderer;

                // See if the options have a custom settings Renderer component
                if (SettingsRenderer) {
                    // Render the component to the node for Other Settings
                    // FIXME Remove support for this
                    console.warn("DEPRECATION WARNING: Passing React components to settingsRenderer is deprecated. Use the onOtherSettingsRender callback instead.");
                    _reactDom2.default.render(_react2.default.createElement(SettingsRenderer, null), table.otherSettingsNode);

                    // Keep a reference so we can unmount it later
                    this.otherSettingsNode = table.otherSettingsNode;
                } else if (options.onOtherSettingsRender) {
                    var Element = options.onOtherSettingsRender();

                    // Render the React Element
                    // Keep a reference so we can unmount it later
                    _reactDom2.default.render(Element, table.otherSettingsNode);
                    this.otherSettingsNode = table.otherSettingsNode;
                } else {
                    // No customization
                }
            }
        }, {
            key: "applyTableBarCustomContent",
            value: function applyTableBarCustomContent(table, options) {
                // Left side of table bar
                if (options.onTableBarCustomRender) {
                    var Element = options.onTableBarCustomRender();

                    // Render the React Element
                    // Keep a reference so we can unmount it later
                    _reactDom2.default.render(Element, table.tableBarCustomNode);
                    this.tableBarCustomNode = table.tableBarCustomNode;
                }

                // Right side of table bar
                if (options.onTableBarCustomActionRender) {
                    var _Element = options.onTableBarCustomActionRender();

                    // Render the React Element
                    // Keep a reference so we can unmount it later
                    _reactDom2.default.render(_Element, table.tableBarCustomActionNode);
                    this.tableBarCustomActionNode = table.tableBarCustomActionNode;
                }
            }
        }, {
            key: "applyTotals",
            value: function applyTotals(table, options) {
                var _this8 = this;

                // Handle totals with a resize event.
                // Only attach the listener once
                if (options.totals && !this.totals) {
                    table.on("table-resize", function () {
                        table.totals = _this8.totals;
                    });
                }

                // Always update or clear the totals so they are reflected in the resize event (if attached)
                this.totals = options.totals;
            }
        }, {
            key: "postTableRender",
            value: function postTableRender(table, options, data) {
                if (options) {
                    this.applyOtherSettings(table, options);
                    this.applyTableBarCustomContent(table, options);
                    this.applyTotals(table, options);

                    //process row rendering, if any
                    if (options.renderModes) {
                        this.addRenderModes(table, options);
                    }
                }

                if (data) {
                    // Select any rows during loading
                    this.selectRows(table, data);
                }
            }
        }, {
            key: "renderTable",
            value: function renderTable() {
                var options = this.props.options,
                    type = options && options.virtual ? "ha-table-virtual" : "ha-table",

                // If virtual scrolling is enabled, create a virtual table. Otherwise create a regular table
                table = document.createElement(type);

                // Init the store
                this.store = this.getStore();
                this.setStoreData(this.props.data);

                // Initialize the table instance
                //   Add required and optional properties
                //   Connect events to callbacks
                //   Expose table API
                this.mixinOptions(table, options);
                this.connectCallbacks(table, options);
                table.collection = this.store;
                table.columns = this.adaptColumns(this.props.columns);
                this.exposeApi(table);

                // Apply any post render changes
                this.postTableRender(table, options, this.props.data);

                return table;
            }
        }, {
            key: "render",
            value: function render() {
                var handleRef = this.handleWrapperRef.bind(this);

                // Render a root dom node to append the underlying HATable instance to.
                return _react2.default.createElement("div", { className: "ha-table-react-wrapper", ref: handleRef });
            }
        }]);

        return Table;
    }(_react2.default.Component);

    exports.default = Table;
});
//# sourceMappingURL=Table.js.map
;

define("../../build/dist/js/hui-table", function(){});
