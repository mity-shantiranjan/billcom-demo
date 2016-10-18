var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/RequestMemory", "./common/BattingAverage", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/RequestMemory"), require("./common/BattingAverage"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.RequestMemory, global.BattingAverage, global.Table);
        global.Renderers = mod.exports;
    }
})(this, function (exports, _react, _Example2, _RequestMemory, _BattingAverage, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _BattingAverage2 = _interopRequireDefault(_BattingAverage);

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

    var Renderers = function (_Example) {
        _inherits(Renderers, _Example);

        function Renderers() {
            _classCallCheck(this, Renderers);

            return _possibleConstructorReturn(this, (Renderers.__proto__ || Object.getPrototypeOf(Renderers)).apply(this, arguments));
        }

        _createClass(Renderers, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport RequestMemory from \"dstore/RequestMemory\";\nimport BattingAverage from \"./common/BattingAverage\";\n\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    getColumns() {\n        let onRenderCell = (props) => {\n            // Return a React Element to add to the cell\n            // You can fill in any kind of JSX you want here.\n            // @see BattingAverage.jsx\n            return (\n                <div className=\"battingAverage\">\n                    <BattingAverage rowData={props.rowData} value={props.value} options={props.options} column={props.column} />\n                </div>\n            );\n        };\n\n        // To keep the React debugging tools happy in dev mode\n        onRenderCell.displayName = \"BattingAverageCustom\";\n        onRenderCell.propTypes = {\n            rowData: React.PropTypes.any,\n            value: React.PropTypes.any,\n            options: React.PropTypes.any,\n            column: React.PropTypes.any\n        };\n\n        return {\n            first: \"First Name\",\n            last: \"Last Name\",\n            height: {\n                label: \"Height\",\n                formatter: value => {       // Custom formatter\n                    return `${value} in.`;\n                }\n            },\n            average: {                      // Derived column\n                label: \"Batting Avg\",\n                onRenderCell: onRenderCell, // Custom renderer\n                sortable: false             // It's custom so no sorting\n            }\n        };\n    },\n    options = {\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true\n    };\n\nReactDOM.render(<Table collection={collection} columns={getColumns()} options={options} />, document.body);";
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
                var onRenderCell = function onRenderCell(props) {
                    // Return a React Element to add to the cell
                    // You can fill in any kind of JSX you want here.
                    // @see BattingAverage.jsx
                    return _react2.default.createElement(
                        "div",
                        { className: "battingAverage" },
                        _react2.default.createElement(_BattingAverage2.default, { rowData: props.rowData, value: props.value, options: props.options, column: props.column })
                    );
                };

                // To keep the React debugging tools happy in dev mode
                onRenderCell.displayName = "BattingAverageCustom";
                onRenderCell.propTypes = {
                    rowData: _react2.default.PropTypes.any,
                    value: _react2.default.PropTypes.any,
                    options: _react2.default.PropTypes.any,
                    column: _react2.default.PropTypes.any
                };

                return {
                    first: "First Name",
                    last: "Last Name",
                    height: {
                        label: "Height",
                        formatter: function formatter(value) {
                            // Custom formatter
                            return value + " in.";
                        }
                    },
                    average: { // Derived column
                        label: "Batting Avg",
                        onRenderCell: onRenderCell, // Custom renderer
                        sortable: false // It's custom so no sorting
                    }
                };
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return {
                    autoheight: true,
                    rowsPerPage: 50,
                    showTableBar: true
                };
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns(),
                    options = this.getOptions();

                return _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options });
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "Renderers";
            }
        }]);

        return Renderers;
    }(_Example3.default);

    exports.default = Renderers;
});
//# sourceMappingURL=Renderers.js.map
