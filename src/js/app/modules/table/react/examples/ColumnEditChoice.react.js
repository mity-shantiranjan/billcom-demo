var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/RequestMemory", "hui/react-components/table/Table", "./common/EditColumnPopover"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/RequestMemory"), require("hui/react-components/table/Table"), require("./common/EditColumnPopover"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.RequestMemory, global.Table, global.EditColumnPopover);
        global.ColumnEditChoice = mod.exports;
    }
})(this, function (exports, _react, _Example2, _RequestMemory, _Table, _EditColumnPopover) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _Table2 = _interopRequireDefault(_Table);

    var _EditColumnPopover2 = _interopRequireDefault(_EditColumnPopover);

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

    var ColumnEditChoice = function (_Example) {
        _inherits(ColumnEditChoice, _Example);

        _createClass(ColumnEditChoice, null, [{
            key: "displayName",
            get: function get() {
                return "ColumnEditChoice";
            }
        }]);

        function ColumnEditChoice(props) {
            _classCallCheck(this, ColumnEditChoice);

            var _this = _possibleConstructorReturn(this, (ColumnEditChoice.__proto__ || Object.getPrototypeOf(ColumnEditChoice)).call(this, props));

            _this.state = {
                options: {
                    autoheight: true,
                    rowsPerPage: 50,
                    showTableBar: true,

                    // Edit options and callbacks
                    showEditMode: true,
                    editable: false,
                    editableFields: [], // No columns are editable by default
                    editMode: "specific", // We want to update specific columns instead of all of them
                    onClickEdit: function onClickEdit(event) {
                        // Listen for the click on the edit button so we can show our custom popover with column choices
                        console.log("You clicked edit", event);
                        _this.popover.api.show();
                    },
                    onSave: function onSave(event) {
                        console.log("You saved your edits", event);

                        // Save edits to the collection
                        _this.table.api.save();

                        // Flip the editable state on the table
                        var state = Object.assign({}, _this.state);
                        state.options.editable = false;
                        _this.setState(state);
                    }
                }
            };
            return _this;
        }

        _createClass(ColumnEditChoice, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport RequestMemory from \"dstore/RequestMemory\";\nimport EditColumnPopover from \"./common/EditColumnPopover\";\n\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n        first: {\n            label: \"First Name\",\n            editor: \"ha-text-field\"     // Editor for this column\n        },\n        last: {\n            label: \"Last Name\",\n            editor: \"ha-text-field\"     // Editor for this column\n        },\n        totalHR: \"Home Runs\"\n    },\n\n    // State is being used for these options. See the full example for the constructor.\n    options = {\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true,\n\n        // Edit options and callbacks\n        showEditMode: true,\n        editable: false,\n        editableFields: [],         // No columns are editable by default\n        editMode: \"specific\",       // We want to update specific columns instead of all of them\n        onClickEdit: event => {     // Listen for the click on the edit button so we can show our custom popover with column choices\n            console.log(\"You clicked edit\", event);\n            this.popover.api.show();\n        },\n        onSave: event => {\n            console.log(\"You saved your edits\", event);\n\n            // Save edits to the collection\n            this.table.api.save();\n\n            // Flip the editable state on the table\n            const state = Object.assign({}, this.state);\n            state.options.editable = false;\n            this.setState(state);\n        }\n    },\n    handlePopoverRef(popover) {\n        this.popover = popover;     // Get a reference to the popover component instance\n    }\n    handleTableRef = (table) => {\n        this.table = table;         // Get a reference to the table component instance\n    },\n    handleSelect(name) {\n        // When a column choice is made: close the popover, turn on editing for the selected column\n        // @see EditColumnPopover.jsx\n        this.popover.api.close();\n\n        // Mark the selected column as editable and turn on editing for the table\n        const state = Object.assign({}, this.state);\n        state.options.editableFields = [name];\n        state.options.editable = true;\n        this.setState(state);\n    },\n\n    // TODO Is this the best way to get a reference to the edit node?\n    editButtonSelector = \"#exampleWrapper .tablebar button[name='edit']\";\n\n// @see EditColumnPopover.jsx\nReactDOM.render(<div id=\"exampleWrapper\">\n    <EditColumnPopover onSelect={handleSelect} targetSelector={editButtonSelector} ref={handlePopoverRef} />\n    <Table collection={collection} columns={columns} options={options} ref={handleTableRef} />\n</div>, document.body);";
            }
        }, {
            key: "getCollection",
            value: function getCollection() {
                return new _RequestMemory2.default({
                    target: "js/app/modules/table/hof-batting.json"
                });
            }
        }, {
            key: "getColumns",
            value: function getColumns() {
                return {
                    first: {
                        label: "First Name",
                        editor: "ha-text-field" // Editor for this column
                    },
                    last: {
                        label: "Last Name",
                        editor: "ha-text-field" // Editor for this column
                    },
                    totalHR: "Home Runs"
                };
            }
        }, {
            key: "handleSelect",
            value: function handleSelect(name) {
                // When a column choice is made: close the popover, turn on editing for the selected column
                // @see EditColumnPopover.jsx
                this.popover.api.close();

                var state = Object.assign({}, this.state);
                state.options.editableFields = [name];
                state.options.editable = true;
                this.setState(state);
            }
        }, {
            key: "handleTableWrapperRef",
            value: function handleTableWrapperRef(table) {
                this.table = table;
            }
        }, {
            key: "handlePopoverWrapperRef",
            value: function handlePopoverWrapperRef(popover) {
                this.popover = popover;
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns(),
                    options = this.state.options,
                    handleTableRef = this.handleTableWrapperRef.bind(this),
                    handlePopoverRef = this.handlePopoverWrapperRef.bind(this),
                    handleSelect = this.handleSelect.bind(this),

                // TODO Is this the best way to get a reference to the edit node?
                editButtonSelector = "#exampleWrapper .tablebar button[name='edit']";

                return _react2.default.createElement(
                    "div",
                    { id: "exampleWrapper" },
                    _react2.default.createElement(_EditColumnPopover2.default, { onSelect: handleSelect, targetSelector: editButtonSelector, ref: handlePopoverRef }),
                    _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options, ref: handleTableRef })
                );
            }
        }]);

        return ColumnEditChoice;
    }(_Example3.default);

    exports.default = ColumnEditChoice;
});
//# sourceMappingURL=ColumnEditChoice.react.js.map
