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
        global.Data = mod.exports;
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

    var Data = function (_Example) {
        _inherits(Data, _Example);

        function Data() {
            _classCallCheck(this, Data);

            return _possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).apply(this, arguments));
        }

        _createClass(Data, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\n\n// Raw JSON data. No collection needed.\nconst data: [\n        {\n            first: \"John\",\n            last: \"Doe\",\n            id: 1\n        },\n        {\n            first: \"Bob\",\n            last: \"Ross\",\n            id: 2\n        }\n    ],\n    columns = {\n        first: \"First Name\",\n        last: \"Last Name\"\n    },\n    options = {\n        autoheight: true,\n        rowsPerPage: 50\n    };\n\nReactDOM.render(<Table data={data} columns={columns} options={options} />, document.body);";
            }
        }, {
            key: "getData",
            value: function getData() {
                return [{
                    first: "John",
                    last: "Doe",
                    id: 1
                }, {
                    first: "Bob",
                    last: "Ross",
                    id: 2
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
                    rowsPerPage: 200
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
                return "Data";
            }
        }]);

        return Data;
    }(_Example3.default);

    exports.default = Data;
});
//# sourceMappingURL=Data.react.js.map
