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
        global.CustomTableBarContent = mod.exports;
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

    var CustomTableBarContent = function (_Example) {
        _inherits(CustomTableBarContent, _Example);

        _createClass(CustomTableBarContent, null, [{
            key: "displayName",
            get: function get() {
                return "CustomTableBarContent";
            }
        }]);

        function CustomTableBarContent(props) {
            _classCallCheck(this, CustomTableBarContent);

            var _this = _possibleConstructorReturn(this, (CustomTableBarContent.__proto__ || Object.getPrototypeOf(CustomTableBarContent)).call(this, props));

            _this.state = {
                data: _this.getData(false)
            };
            return _this;
        }

        _createClass(CustomTableBarContent, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\n\n// This example uses state. Click 'Usage' above to see the full example.\nconst getData(isFiltered) {\n            let data = [\n                {\n                    first: \"John\",\n                    last: \"Doe\",\n                    id: 1\n                }\n            ];\n\n            if (!isFiltered) {\n                data.push({\n                    first: \"Bob\",\n                    last: \"Ross\",\n                    id: 2\n                });\n            }\n\n            return data;\n        },\n        getColumns() {\n            return {\n                first: \"First Name\",\n                last: \"Last Name\"\n            };\n        },\n        onFilterClick() {\n            let state = Object.assign({}, this.state);\n            state.data = this.getData(true);\n\n            // Render the table again with our new filtered data\n            this.setState(state);\n        },\n        onStarClick() {\n            alert(\"Custom action clicked!\");\n        },\n        getOptions() {\n            let onTableBarCustomRender = () => {\n                    // Return a React Element to add to the left side of the table bar.\n                    // You can fill in any kind of JSX you want here.\n                    return <button className=\"ha-button\" onClick={this.onFilterClick.bind(this)}>Filter</button>;\n                },\n                onTableBarCustomActionRender = () => {\n                    // Return a React Element to add to the right side of the table bar.\n                    // You can fill in any kind of JSX you want here.\n                    return <i className=\"hi page large hi-star-o\" onClick={this.onStarClick}></i>;\n                };\n\n            // To keep the React debugging tools happy in dev mode\n            onTableBarCustomRender.displayName = \"onTableBarCustomRender\";\n            onTableBarCustomActionRender.displayName = \"onTableBarCustomActionRender\";\n\n            return {\n                autoheight: true,\n                rowsPerPage: 200,\n\n                // Custom table bar content\n                onTableBarCustomRender: onTableBarCustomRender,\n                onTableBarCustomActionRender: onTableBarCustomActionRender\n            };\n        };\n\nReactDOM.render(<Table data={this.state.data} columns={getColumns()} options={getOptions()} />, document.body);";
            }
        }, {
            key: "getData",
            value: function getData(isFiltered) {
                var data = [{
                    first: "John",
                    last: "Doe",
                    id: 1
                }];

                if (!isFiltered) {
                    data.push({
                        first: "Bob",
                        last: "Ross",
                        id: 2
                    });
                }

                return data;
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
            key: "onFilterClick",
            value: function onFilterClick() {
                var state = Object.assign({}, this.state);
                state.data = this.getData(true);

                this.setState(state);
            }
        }, {
            key: "onStarClick",
            value: function onStarClick() {
                alert("Custom action clicked!");
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                var _this2 = this;

                var onTableBarCustomRender = function onTableBarCustomRender() {
                    // Return a React Element to add to the left side of the table bar.
                    // You can fill in any kind of JSX you want here.
                    return _react2.default.createElement(
                        "button",
                        { className: "ha-button", onClick: _this2.onFilterClick.bind(_this2) },
                        "Filter"
                    ); // eslint-disable-line react/jsx-no-bind
                },
                    onTableBarCustomActionRender = function onTableBarCustomActionRender() {
                    // Return a React Element to add to the right side of the table bar.
                    // You can fill in any kind of JSX you want here.
                    return _react2.default.createElement("i", { className: "hi page large hi-star-o", onClick: _this2.onStarClick }); // eslint-disable-line react/jsx-handler-names
                };

                // To keep the React debugging tools happy in dev mode
                onTableBarCustomRender.displayName = "onTableBarCustomRender";
                onTableBarCustomActionRender.displayName = "onTableBarCustomActionRender";

                return {
                    autoheight: true,
                    rowsPerPage: 200,

                    // Custom table bar content
                    onTableBarCustomRender: onTableBarCustomRender,
                    onTableBarCustomActionRender: onTableBarCustomActionRender
                };
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var data = this.state.data,
                    options = this.getOptions(),
                    columns = this.getColumns();

                return _react2.default.createElement(_Table2.default, { data: data, columns: columns, options: options });
            }
        }]);

        return CustomTableBarContent;
    }(_Example3.default);

    exports.default = CustomTableBarContent;
});
//# sourceMappingURL=CustomTableBarContent.react.js.map
