var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "dstore/Memory", "./config", "hui/table/LazyRowExpansionRenderer", "hui/table", "hui/table-virtual", "xstyle/css!hui-css/hui-table.min.css"], factory);
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
