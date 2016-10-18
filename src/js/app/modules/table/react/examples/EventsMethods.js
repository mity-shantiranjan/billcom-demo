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
        global.EventsMethods = mod.exports;
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

    var EventsMethods = function (_Example) {
        _inherits(EventsMethods, _Example);

        function EventsMethods() {
            _classCallCheck(this, EventsMethods);

            return _possibleConstructorReturn(this, (EventsMethods.__proto__ || Object.getPrototypeOf(EventsMethods)).apply(this, arguments));
        }

        _createClass(EventsMethods, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport RequestMemory from \"dstore/RequestMemory\";\n\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n        first: \"First Name\",\n        last: \"Last Name\",\n        totalHR: \"Home Runs\"\n    },\n    options = {\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true,\n        onSort: event => {              // Callback\n            const sort = event.sort[0],\n                column = sort.property,\n                order = sort.descending ? \"descending\" : \"ascending\";\n\n            alert(`You sorted the table by '${column}' in ${order} order`);\n        }\n    },\n    updateColumn = () => {\n        // FIXME There is a bug in the resizeColumnWidth method of HATable.\n        // It doesn't find columns by ID so you have to use an array index instead.\n        // 1 corresponds to the 'last name' column\n        this.table.api.resizeColumnWidth(1, 50);    // Call an API method\n    },\n    handleRef = (table) => {\n        this.table = table;         // Get a reference to the table component instance\n    };\n\nReactDOM.render(<div>\n    <button className=\"ha-button\" onClick={updateColumn}>Make 'last' column smaller</button>\n    <Table collection={collection} columns={columns} options={options} ref={handleRef} />\n</div>, document.body);";
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
                    first: "First Name",
                    last: "Last Name",
                    totalHR: "Home Runs"
                };
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return {
                    autoheight: true,
                    rowsPerPage: 50,
                    showTableBar: true,
                    onSort: function onSort(event) {
                        // Callback
                        var sort = event.sort[0],
                            column = sort.property,
                            order = sort.descending ? "descending" : "ascending";

                        alert("You sorted the table by '" + column + "' in " + order + " order");
                    }
                };
            }
        }, {
            key: "makeColumnBigger",
            value: function makeColumnBigger() {
                // FIXME There is a bug in the resizeColumnWidth method of HATable.
                // It doesn't find columns by ID so you have to use an array index instead.
                // 1 corresponds to the 'last name' column
                this.table.api.resizeColumnWidth(1, 50); // Call an API method
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
                    options = this.getOptions(),
                    handleRef = this.handleWrapperRef.bind(this),
                    onClick = this.makeColumnBigger.bind(this);

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "button",
                        { className: "ha-button", onClick: onClick },
                        "Make 'last' column smaller"
                    ),
                    _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options, ref: handleRef })
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "EventsMethods";
            }
        }]);

        return EventsMethods;
    }(_Example3.default);

    exports.default = EventsMethods;
});
//# sourceMappingURL=EventsMethods.js.map
