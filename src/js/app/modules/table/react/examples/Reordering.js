var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dojo/_base/declare", "dstore/RequestMemory", "dstore/Trackable", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dojo/_base/declare"), require("dstore/RequestMemory"), require("dstore/Trackable"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.declare, global.RequestMemory, global.Trackable, global.Table);
        global.Reordering = mod.exports;
    }
})(this, function (exports, _react, _Example2, _declare, _RequestMemory, _Trackable, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _declare2 = _interopRequireDefault(_declare);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _Trackable2 = _interopRequireDefault(_Trackable);

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

    var Reordering = function (_Example) {
        _inherits(Reordering, _Example);

        function Reordering() {
            _classCallCheck(this, Reordering);

            return _possibleConstructorReturn(this, (Reordering.__proto__ || Object.getPrototypeOf(Reordering)).apply(this, arguments));
        }

        _createClass(Reordering, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport declare from \"dojo/_base/declare\";\nimport RequestMemory from \"dstore/RequestMemory\";\nimport Trackable from \"dstore/Trackable\";\n\n// Need to mixin a Trackable instance for reordering\n// @see https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\n// @see https://github.com/SitePen/dstore/blob/master/src/Trackable.js\nconst TrackableRequestStore = declare([RequestMemory, Trackable]),\n    collection = new TrackableRequestStore({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n        first: \"First Name\",\n        last: \"Last Name\"\n    },\n    options = {\n        allowRowReordering: true,   // Turn on reordering of rows\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true\n    };\n\nReactDOM.render(<Table collection={collection} columns={columns} options={options} />, document.body);";
            }
        }, {
            key: "getCollection",
            value: function getCollection() {
                // Need to mixin a Trackable instance for reordering
                // @see https://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html
                // @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js
                // @see https://github.com/SitePen/dstore/blob/master/src/Trackable.js
                var TrackableRequestStore = (0, _declare2.default)([_RequestMemory2.default, _Trackable2.default]);

                return new TrackableRequestStore({
                    target: "js/app/modules/table/hof-batting.json"
                });
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
                    allowRowReordering: true, // Turn on reordering of rows
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
                return "Reordering";
            }
        }]);

        return Reordering;
    }(_Example3.default);

    exports.default = Reordering;
});
//# sourceMappingURL=Reordering.js.map
