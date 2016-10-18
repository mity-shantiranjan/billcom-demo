var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.Table);
        global.DataBatch = mod.exports;
    }
})(this, function (exports, _react, _Example2, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

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

    var DataBatch = function (_Example) {
        _inherits(DataBatch, _Example);

        function DataBatch() {
            _classCallCheck(this, DataBatch);

            return _possibleConstructorReturn(this, (DataBatch.__proto__ || Object.getPrototypeOf(DataBatch)).apply(this, arguments));
        }

        _createClass(DataBatch, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\n\nconst data: [\n        {\n            id: 1,              // An id property is required for batch mode\n            _selected: true,    // Select this row\n            first: \"John\",\n            last: \"Doe\"\n        },\n        {\n            id: 2,\n            first: \"Bob\",\n            last: \"Ross\"\n        }\n    ],\n    columns = {\n        first: \"First Name\",\n        last: \"Last Name\"\n    },\n    options = {\n        autoheight: true,\n        rowsPerPage: 50,\n\n        // Batch mode options\n        allowBatchMode: true,\n        onSelect: (event) => {\n            console.log(\"Item(s) selected!\", event);\n        },\n        onDeselect: (event) => {\n            console.log(\"Item(s) deselected!\", event);\n        }\n    };\n\nReactDOM.render(<Table data={data} columns={columns} options={options} />, document.body);";
            }
        }, {
            key: "getData",
            value: function getData() {
                return [{
                    id: 1, // An id property is required for batch mode
                    _selected: true, // Select this row
                    first: "John",
                    last: "Doe"
                }, {
                    id: 2,
                    first: "Bob",
                    last: "Ross"
                }];
            }
        }, {
            key: "getColumns",
            value: function getColumns() {
                return {
                    first: "First Name",
                    last: "Last Name"
                };
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return {
                    autoheight: true,
                    rowsPerPage: 200,

                    // Batch mode options
                    allowBatchMode: true,
                    onSelect: function onSelect(event) {
                        console.log("Item(s) selected!", event);
                    },
                    onDeselect: function onDeselect(event) {
                        console.log("Item(s) deselected!", event);
                    }
                };
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var data = this.getData(),
                    options = this.getOptions(),
                    columns = this.getColumns();

                return _react2.default.createElement(_Table2.default, { data: data, columns: columns, options: options });
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "DataBatch";
            }
        }]);

        return DataBatch;
    }(_Example3.default);

    exports.default = DataBatch;
});
//# sourceMappingURL=DataBatch.react.js.map
