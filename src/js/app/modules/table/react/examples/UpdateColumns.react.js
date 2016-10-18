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
        global.UpdateColumns = mod.exports;
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

    var UpdateColumns = function (_Example) {
        _inherits(UpdateColumns, _Example);

        _createClass(UpdateColumns, null, [{
            key: "displayName",
            get: function get() {
                return "UpdateColumns";
            }
        }]);

        function UpdateColumns(props) {
            _classCallCheck(this, UpdateColumns);

            var _this = _possibleConstructorReturn(this, (UpdateColumns.__proto__ || Object.getPrototypeOf(UpdateColumns)).call(this, props));

            _this.state = {
                add: false,
                update: false
            };
            return _this;
        }

        _createClass(UpdateColumns, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\n\n// This example uses state. Click 'Usage' above to see the full example.\nconst getData() {\n        let data = [\n            {\n                first: \"John\",\n                last: \"Doe\",\n                id: 1\n            },\n            {\n                first: \"Bob\",\n                last: \"Ross\",\n                id: 2\n            }\n        ];\n\n        if (this.state.add) {\n            data[0].hr = 10;\n            data[1].hr = 2;\n        }\n\n        return data;\n    },\n    getColumns() {\n        let columns = {\n                first: \"First Name\",\n                last: \"Last Name\"\n            },\n            onRenderCell = (props) => {\n                return <div className=\"hr\">Homers: {props.rowData.hr}</div>;\n            };\n\n        // To keep the React debugging tools happy in dev mode\n        onRenderCell.displayName = \"Homers\";\n        onRenderCell.propTypes = {\n            rowData: React.PropTypes.any\n        };\n\n        if (this.state.update) {\n            columns.first = \"First Name (Updated)\";\n        }\n        if (this.state.add) {\n            columns.hr = \"Home runs\";\n        }\n        if (this.state.add && this.state.update) {\n            columns.hr = {\n                label: \"Home runs\",\n                onRenderCell: onRenderCell\n            };\n        }\n\n        return columns;\n    },\n    options = {\n        autoheight: true,\n        rowsPerPage: 50\n    },\n    addColumn() {\n        let state = Object.assign({}, this.state);\n        state.add = true;\n\n        this.setState(state);\n    },\n    removeColumn() {\n        let state = Object.assign({}, this.state);\n        state.add = false;\n\n        this.setState(state);\n    },\n    updateColumn() {\n        let state = Object.assign({}, this.state);\n        state.update = true;\n\n        this.setState(state);\n    };\n\nReactDOM.render(<div>\n    <button className=\"ha-button\" onClick={addColumn.bind(this)}>Add column</button>\n    <button className=\"ha-button\" onClick={removeColumn.bind(this)}>Remove column</button>\n    <button className=\"ha-button\" onClick={updateColumn.bind(this)}>Update column</button>\n    <Table data={getData()} columns={getColumns()} options={options} />\n</div>, document.body);";
            }
        }, {
            key: "getData",
            value: function getData() {
                var data = [{
                    first: "John",
                    last: "Doe",
                    id: 1
                }, {
                    first: "Bob",
                    last: "Ross",
                    id: 2
                }];

                if (this.state.add) {
                    data[0].hr = 10;
                    data[1].hr = 2;
                }

                return data;
            }
        }, {
            key: "getColumns",
            value: function getColumns() {
                var columns = {
                    first: "First Name",
                    last: "Last Name"
                },
                    onRenderCell = function onRenderCell(props) {
                    return _react2.default.createElement(
                        "div",
                        { className: "hr" },
                        "Homers: ",
                        props.rowData.hr
                    );
                };

                // To keep the React debugging tools happy in dev mode
                onRenderCell.displayName = "Homers";
                onRenderCell.propTypes = {
                    rowData: _react2.default.PropTypes.any
                };

                if (this.state.update) {
                    columns.first = "First Name (Updated)";
                }
                if (this.state.add) {
                    columns.hr = "Home runs";
                }
                if (this.state.add && this.state.update) {
                    columns.hr = {
                        label: "Home runs",
                        onRenderCell: onRenderCell
                    };
                }

                return columns;
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return {
                    autoheight: true,
                    rowsPerPage: 200
                };
            }
        }, {
            key: "addColumn",
            value: function addColumn() {
                var state = Object.assign({}, this.state);
                state.add = true;

                this.setState(state);
            }
        }, {
            key: "removeColumn",
            value: function removeColumn() {
                var state = Object.assign({}, this.state);
                state.add = false;

                this.setState(state);
            }
        }, {
            key: "updateColumn",
            value: function updateColumn() {
                var state = Object.assign({}, this.state);
                state.update = true;

                this.setState(state);
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var data = this.getData(),
                    options = this.getOptions(),
                    columns = this.getColumns(),
                    onAdd = this.addColumn.bind(this),
                    onRemove = this.removeColumn.bind(this),
                    onUpdate = this.updateColumn.bind(this);

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "button",
                        { className: "ha-button", onClick: onAdd },
                        "Add column"
                    ),
                    _react2.default.createElement(
                        "button",
                        { className: "ha-button", onClick: onRemove },
                        "Remove column"
                    ),
                    _react2.default.createElement(
                        "button",
                        { className: "ha-button", onClick: onUpdate },
                        "Update column"
                    ),
                    _react2.default.createElement(_Table2.default, { data: data, columns: columns, options: options })
                );
            }
        }]);

        return UpdateColumns;
    }(_Example3.default);

    exports.default = UpdateColumns;
});
//# sourceMappingURL=UpdateColumns.react.js.map
