var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/RequestMemory", "hui/react-components/HACheckbox", "hui/react-components/table/Table"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/RequestMemory"), require("hui/react-components/HACheckbox"), require("hui/react-components/table/Table"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.RequestMemory, global.HACheckbox, global.Table);
        global.Update = mod.exports;
    }
})(this, function (exports, _react, _Example2, _RequestMemory, _HACheckbox, _Table) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _HACheckbox2 = _interopRequireDefault(_HACheckbox);

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

    var Update = function (_Example) {
        _inherits(Update, _Example);

        _createClass(Update, null, [{
            key: "displayName",
            get: function get() {
                return "Update";
            }
        }]);

        function Update(props) {
            _classCallCheck(this, Update);

            var _this = _possibleConstructorReturn(this, (Update.__proto__ || Object.getPrototypeOf(Update)).call(this, props));

            _this.state = {
                options: {
                    autoheight: true,
                    rowsPerPage: 50,
                    showTableBar: true,
                    compact: false
                }
            };
            return _this;
        }

        _createClass(Update, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport Checkbox from \"hui-react/HACheckbox\";\nimport RequestMemory from \"dstore/RequestMemory\";\n\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n        first: \"First Name\",\n        last: \"Last Name\"\n    },\n    options = {     // State is being used for these options. See the full example for the constructor.\n        autoheight: true,\n        rowsPerPage: 50,\n        showTableBar: true,\n        compact: false\n    },\n    onClick = event => {\n        let state = Object.assign({}, this.state);\n        state.options.compact = event.currentTarget.checked;\n\n        // Set the state of this component so it updates the table with the new options\n        this.setState(state);\n    };\n\nReactDOM.render(<div>\n    <Checkbox label=\"Compact\" checked={false} onClick={onClick} />\n    <Table collection={collection} columns={columns} options={this.state.options} />\n</div>, document.body);";
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
                    last: "Last Name"
                };
            }
        }, {
            key: "onCompactClick",
            value: function onCompactClick(event) {
                var state = Object.assign({}, this.state);
                state.options.compact = event.currentTarget.checked;

                // Set the state of this component so it updates the table with the new options
                this.setState(state);
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns(),
                    options = this.state.options,
                    onClick = this.onCompactClick.bind(this);

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_HACheckbox2.default, { label: "Compact", checked: false, onClick: onClick }),
                    _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options })
                );
            }
        }]);

        return Update;
    }(_Example3.default);

    exports.default = Update;
});
//# sourceMappingURL=Update.js.map
