var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/Memory", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/Memory"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.Memory, global.Table);
        global.Simple = mod.exports;
    }
})(this, function (exports, _react, _Example2, _Memory, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _Memory2 = _interopRequireDefault(_Memory);

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

    var Simple = function (_Example) {
        _inherits(Simple, _Example);

        function Simple() {
            _classCallCheck(this, Simple);

            return _possibleConstructorReturn(this, (Simple.__proto__ || Object.getPrototypeOf(Simple)).apply(this, arguments));
        }

        _createClass(Simple, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport Memory from \"dstore/Memory\";\n\n// @see https://github.com/SitePen/dstore/blob/master/src/Memory.js\nconst collection = new Memory({\n        data: [\n            {\n                first: \"John\",\n                last: \"Doe\",\n                id: 1\n            }, {\n                first: \"Bob\",\n                last: \"Ross\",\n                id: 2\n            }\n        ]\n    }),\n    columns = {\n        first: \"First Name\",     // Column shorthand notation\n        last: \"Last Name\"\n    };\n\nReactDOM.render(<Table collection={collection} columns={columns} />, document.body);";
            }
        }, {
            key: "getCollection",
            value: function getCollection() {
                return new _Memory2.default({
                    data: [{
                        first: "John",
                        last: "Doe",
                        id: 1
                    }, {
                        first: "Bob",
                        last: "Ross",
                        id: 2
                    }]
                });
            }
        }, {
            key: "getColumns",
            value: function getColumns() {
                return {
                    first: "First Name", // Column shorthand notation
                    last: "Last Name"
                };
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns();

                return _react2.default.createElement(_Table2.default, { collection: collection, columns: columns });
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "Simple";
            }
        }]);

        return Simple;
    }(_Example3.default);

    exports.default = Simple;
});
//# sourceMappingURL=Simple.js.map
