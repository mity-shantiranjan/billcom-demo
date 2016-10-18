var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "hui/react-components/table/Table", "hui/table/ContentGroupMemory"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("hui/react-components/table/Table"), require("hui/table/ContentGroupMemory"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.Table, global.ContentGroupMemory);
        global.ContentGrouping = mod.exports;
    }
})(this, function (exports, _react, _Example2, _Table, _ContentGroupMemory) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _Table2 = _interopRequireDefault(_Table);

    var _ContentGroupMemory2 = _interopRequireDefault(_ContentGroupMemory);

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

    var ContentGrouping = function (_Example) {
        _inherits(ContentGrouping, _Example);

        function ContentGrouping() {
            _classCallCheck(this, ContentGrouping);

            return _possibleConstructorReturn(this, (ContentGrouping.__proto__ || Object.getPrototypeOf(ContentGrouping)).apply(this, arguments));
        }

        _createClass(ContentGrouping, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\";  // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport ContentGroupMemory from \"hui/table/ContentGroupMemory\";\n\ngetGroupData() {\n        let contracts = [],\n            contractTypes = [\n                \"Weekly Contract\",\n                \"Annual Contract\",\n                \"Pay as You Go Contract\",\n                \"Empty Category\"\n            ];\n        let i;\n\n        contracts.push({\n            contractType: contractTypes[0],\n            id: 0,\n            parent: null\n        });\n        contracts.push({\n            contractType: contractTypes[1],\n            id: 1,\n            parent: null\n        });\n        contracts.push({\n            contractType: contractTypes[2],\n            id: 2,\n            parent: null\n        });\n        contracts.push({\n            contractType: contractTypes[3],\n            id: 3,\n            parent: null\n        });\n\n        for (i = 0; i < 100; i++) {\n            contracts.push({\n                id: i + 3,\n                email: `email${i}@domain.com`,\n                parent: (i % 3)  // the last category will never be populated\n            });\n        }\n\n        return contracts;\n// @see https://github.com/SitePen/dstore/blob/master/src/Memory.js\nconst collection = new ContentGroupMemory({\n        // note: using a special store to enable grouping\n        data: this.getGroupData()\n    }),\n    columns = {\n        contractType: {\n            label: \"\",\n            renderExpando: true  // required to display the triangle icon to expand the group\n        },\n        id: \"ID\",\n        email: {\n            label: \"Email\",\n            formatter: email => `<a href=\"${email}\">${email}</a>`\n        }\n    },\n    options = {\n        categoryProperty: \"contractType\",\n        rowsPerPage: 15\n    };\n\nReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);";
            }
        }, {
            key: "getCollection",
            value: function getCollection() {
                // note: using a special store to enable grouping
                return new _ContentGroupMemory2.default({
                    data: this.getGroupData()
                });
            }
        }, {
            key: "getGroupData",
            value: function getGroupData() {
                var contracts = [],
                    contractTypes = ["Weekly Contract", "Annual Contract", "Pay as You Go Contract", "Empty Category"];
                var i = undefined;

                contracts.push({
                    contractType: contractTypes[0],
                    id: 0,
                    parent: null
                });
                contracts.push({
                    contractType: contractTypes[1],
                    id: 1,
                    parent: null
                });
                contracts.push({
                    contractType: contractTypes[2],
                    id: 2,
                    parent: null
                });
                contracts.push({
                    contractType: contractTypes[3],
                    id: 3,
                    parent: null
                });

                for (i = 0; i < 100; i++) {
                    contracts.push({
                        id: i + 3,
                        email: "email" + i + "@domain.com",
                        parent: i % 3 // the last category will never be populated
                    });
                }

                return contracts;
            }
        }, {
            key: "getColumns",
            value: function getColumns() {
                return {
                    contractType: {
                        label: "",
                        renderExpando: true // required to display the triangle icon to expand the group
                    },
                    id: "ID",
                    email: {
                        label: "Email",
                        formatter: function formatter(email) {
                            return "<a href=\"" + email + "\">" + email + "</a>";
                        }
                    }
                };
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return {
                    categoryProperty: "contractType", // enables the header in the group category
                    rowsPerPage: 45
                };
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    options = this.getOptions(),
                    columns = this.getColumns();

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options })
                );
            }
        }], [{
            key: "displayName",
            get: function get() {
                return "ContentGrouping";
            }
        }]);

        return ContentGrouping;
    }(_Example3.default);

    exports.default = ContentGrouping;
});
//# sourceMappingURL=ContentGrouping.react.js.map
