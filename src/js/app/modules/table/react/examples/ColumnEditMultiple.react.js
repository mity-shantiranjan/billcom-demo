var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/RequestMemory", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/RequestMemory"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.RequestMemory, global.Table);
        global.ColumnEditMultiple = mod.exports;
    }
})(this, function (exports, _react, _Example2, _RequestMemory, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _Table2 = _interopRequireDefault(_Table);

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

    var ColumnEditMultiple = function (_Example) {
        _inherits(ColumnEditMultiple, _Example);

        _createClass(ColumnEditMultiple, null, [{
            key: "displayName",
            get: function get() {
                return "ColumnEditMultiple";
            }
        }]);

        function ColumnEditMultiple(props) {
            _classCallCheck(this, ColumnEditMultiple);

            var _this = _possibleConstructorReturn(this, (ColumnEditMultiple.__proto__ || Object.getPrototypeOf(ColumnEditMultiple)).call(this, props));

            _this.state = {
                options: {
                    autoheight: true,
                    rowsPerPage: 50,
                    showTableBar: true,

                    // Edit options and callbacks
                    showEditMode: true,
                    editable: false,
                    onCancel: function onCancel(event) {
                        console.log("You canceled your edits", event);
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

        _createClass(ColumnEditMultiple, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport RequestMemory from \"dstore/RequestMemory\";\n\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n        first: {\n            label: \"First Name\",\n            editor: \"ha-text-field\"     // Editor for this column\n        },\n        last: {\n            label: \"Last Name\",\n            editor: \"ha-text-field\"     // Editor for this column\n        },\n        totalHR: \"Home Runs\"\n    },\n\n    // State is being used for these options. See the full example for the constructor.\n    options = {\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true,\n\n        // Edit options and callbacks\n        showEditMode: true,\n        editable: false,\n        onCancel: event => {\n            console.log(\"You canceled your edits\", event);\n        },\n        onSave: event => {\n            console.log(\"You saved your edits\", event);\n\n            // Save edits to the collection\n            this.table.api.save();\n\n            // Flip the editable state on the table\n            let state = Object.assign({}, this.state);\n            state.options.editable = false;\n            this.setState(state);\n        }\n    },\n    handleRef = (table) => {\n        this.table = table;         // Get a reference to the table component instance\n    };\n\nReactDOM.render(<Table collection={collection} columns={columns} options={options} ref={handleRef} />, document.body);";
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
            key: "handleWrapperRef",
            value: function handleWrapperRef(table) {
                this.table = table;
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns(),
                    options = this.state.options,
                    handleRef = this.handleWrapperRef.bind(this);

                return _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options, ref: handleRef });
            }
        }]);

        return ColumnEditMultiple;
    }(_Example3.default);

    exports.default = ColumnEditMultiple;
});
//# sourceMappingURL=ColumnEditMultiple.react.js.map
