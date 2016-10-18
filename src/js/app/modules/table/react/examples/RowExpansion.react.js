var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../Example", "dstore/RequestMemory", "hui/react-components/table/Table", "./common/CustomRowExpansionContent", "hui/react-components/HALabel"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../Example"), require("dstore/RequestMemory"), require("hui/react-components/table/Table"), require("./common/CustomRowExpansionContent"), require("hui/react-components/HALabel"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Example, global.RequestMemory, global.Table, global.CustomRowExpansionContent, global.HALabel);
        global.RowExpansion = mod.exports;
    }
})(this, function (exports, _react, _Example2, _RequestMemory, _Table, _CustomRowExpansionContent, _HALabel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Example3 = _interopRequireDefault(_Example2);

    var _RequestMemory2 = _interopRequireDefault(_RequestMemory);

    var _Table2 = _interopRequireDefault(_Table);

    var _CustomRowExpansionContent2 = _interopRequireDefault(_CustomRowExpansionContent);

    var _HALabel2 = _interopRequireDefault(_HALabel);

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

    var RowExpansion = function (_Example) {
        _inherits(RowExpansion, _Example);

        _createClass(RowExpansion, null, [{
            key: "displayName",
            get: function get() {
                return "RowExpansion";
            }
        }]);

        function RowExpansion(props) {
            _classCallCheck(this, RowExpansion);

            var _this = _possibleConstructorReturn(this, (RowExpansion.__proto__ || Object.getPrototypeOf(RowExpansion)).call(this, props));

            _this.state = {
                options: {
                    rowsPerPage: 50,
                    //Settings for custom row expansion
                    //Provide an array of render modes, and allow the table to use a specific one
                    renderModes: [{
                        renderMode: "defaultExpandableRow",
                        renderer: _this.getDefaultRowExpansionArgs()
                    }],
                    //The current render mode to use
                    renderMode: "defaultExpandableRow"
                }
            };
            return _this;
        }

        _createClass(RowExpansion, [{
            key: "getCode",
            value: function getCode() {
                return "import Table from \"hui-react/table/Table\"; // Be sure to optimize your layers! See the 'Design & API Document' link above.\nimport RequestMemory from \"dstore/RequestMemory\";\n// Load data from remote JSON file\n// @see https://github.com/SitePen/dstore/blob/master/src/RequestMemory.js\nconst collection = new RequestMemory({\n        target: \"js/app/modules/table/hof-batting.json\"\n    }),\n    columns = {\n      let onRenderCell = () => {\n          // Return a React Element to add to the cell\n          return (\n              <div className=\"control\">\n                <button className=\"no-button hi hi-settings\" aria-label=\"Show row expansion\"></button>\n              </div>\n          );\n        };\n\n        // To keep the React debugging tools happy in dev mode\n        onRenderCell.displayName = \"ActionButton\";\n\n        return {\n            first: {\n                label: 'First Name',\n                sortable: false\n            },\n            last: 'Last Name',\n            height: 'Height',\n            action: {                      // Derived column\n                  label: \"Action\",\n                  onRenderCell: onRenderCell, // Custom renderer\n                  sortable: false             // It's custom so no sorting\n              }\n          };\n    },\n\n    //row render arguments for default render mode\n    getDefaultRowExpansionArgs() {\n        return {\n            //optional css selector\n            activatorSelector: \".control .hi-settings\",\n            //optional expansion height property\n            expansionHeight: 80\n        };\n    },\n\n    //row render arguments for custom render mode\n    getCustomRowExpansionArgs() {\n      let onRenderRowExpansionContent = (props) => {\n        // Return a React Element to add to the row expansion\n        // You can fill in any kind of JSX you want here.\n        // @see CustomRowExpansionContent.jsx\n        return <CustomRowExpansionContent object={props.object} hideExpansion={props.hideExpansion} />;\n      };\n\n      //To keep the React debugging tools happy in dev mode\n      onRenderRowExpansionContent.displayName = \"CustomRowExpansionContent\";\n\n      //Row expansion content contract\n      onRenderRowExpansionContent.propTypes = {\n          object: React.PropTypes.object, //data object of the row\n          hideExpansion: React.PropTypes.func //callback for hiding the expansion\n      };\n\n      return {\n        //optional css selector\n        activatorSelector: \".control .hi-settings\",\n        //function that renders the content of the expanded section\n        onRenderRowExpansionContent: onRenderRowExpansionContent\n      };\n    },\n\n    //handle addition of a custom render mode\n    onCustomRenderModeAdd() {\n        let newOptions = Object.assign({}, this.state.options),\n            newRenderModes = newOptions.renderModes.concat({\n                renderMode: \"customExpandableRow\",\n                renderer: this.getCustomRowExpansionArgs()\n            });\n        newOptions.renderModes = newRenderModes;\n        //switch the render mode to custom\n        newOptions.currentRenderMode = \"customExpandableRow\";\n        this.setState({options: newOptions});\n    },\n\n    //handle removal of a custom render mode\n    onCustomRenderModeRemove() {\n        let newOptions = Object.assign({}, this.state.options),\n            newRenderModes = null;\n        if (newOptions.renderModes) {\n            newRenderModes = newOptions.renderModes.filter(renderModeItem => {\n                return renderModeItem.renderMode !== \"customExpandableRow\";\n            });\n        }\n        newOptions.renderModes = newRenderModes;\n        //switch the render mode to default\n        newOptions.currentRenderMode = \"defaultExpandableRow\";\n        this.setState({options: newOptions});\n    },\n\n    // State is being used for these options. See the full example for the constructor.\n    options = {\n        rowsPerPage: 50,\n        //Settings for custom row expansion\n        //Provide an array of render modes, and allow the table to use a specific one\n        renderModes: [{\n            renderMode: \"defaultExpandableRow\",\n            renderer: this.getDefaultRowExpansionArgs()\n        }],\n        //The current render mode to use\n        currentRenderMode: \"defaultExpandableRow\"\n    }\n};\n\nReactDOM.render(<div>\n  <div>\n    <HALabel>Current render mode is:{this.state.options.currentRenderMode}</HALabel>\n  </div>\n  <div>\n    <button className=\"ha-button\" onClick={onCustomRenderModeAdd}>Add custom render mode</button>\n    <button className=\"ha-button\" onClick={onCustomRenderModeRemove}>Remove custom render mode</button>\n  </div>\n  <Table collection={collection} columns={columns} options={options} />\n</div>, document.body);";
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
                var onRenderCell = function onRenderCell() {
                    // Return a React Element to add to the cell
                    return _react2.default.createElement(
                        "div",
                        { className: "control" },
                        _react2.default.createElement("button", { className: "no-button hi hi-settings", "aria-label": "Show row expansion" })
                    );
                };

                // To keep the React debugging tools happy in dev mode
                onRenderCell.displayName = "ActionButton";

                return {
                    first: {
                        label: "First Name",
                        sortable: false
                    },
                    last: "Last Name",
                    height: "Height",
                    action: { // Derived column
                        label: "Action",
                        onRenderCell: onRenderCell, // Custom renderer
                        sortable: false // It's custom so no sorting
                    }
                };
            }
        }, {
            key: "getDefaultRowExpansionArgs",
            value: function getDefaultRowExpansionArgs() {
                return {
                    //optional css selector
                    activatorSelector: ".control .hi-settings",
                    //optional expansion height property
                    expansionHeight: 80
                };
            }
        }, {
            key: "getCustomRowExpansionArgs",
            value: function getCustomRowExpansionArgs() {
                var onRenderRowExpansionContent = function onRenderRowExpansionContent(props) {
                    // Return a React Element to add to the row expansion
                    // You can fill in any kind of JSX you want here.
                    // @see CustomRowExpansionContent.jsx
                    return _react2.default.createElement(_CustomRowExpansionContent2.default, { object: props.object, hideExpansion: props.hideExpansion });
                };

                //To keep the React debugging tools happy in dev mode
                onRenderRowExpansionContent.displayName = "CustomRowExpansionContent";

                //Row expansion content contract
                onRenderRowExpansionContent.propTypes = {
                    object: _react2.default.PropTypes.object, //data object of the row
                    hideExpansion: _react2.default.PropTypes.func //callback for hiding the expansion
                };

                return {
                    //optional css selector
                    activatorSelector: ".control .hi-settings",
                    //function that renders the content of the expanded section
                    onRenderRowExpansionContent: onRenderRowExpansionContent
                };
            }
        }, {
            key: "onCustomRenderModeAdd",
            value: function onCustomRenderModeAdd() {
                var newOptions = Object.assign({}, this.state.options),
                    newRenderModes = newOptions.renderModes.concat({
                    renderMode: "customExpandableRow",
                    renderer: this.getCustomRowExpansionArgs()
                });
                newOptions.renderModes = newRenderModes;
                //switch the render mode to custom
                newOptions.renderMode = "customExpandableRow";
                this.setState({ options: newOptions });
            }
        }, {
            key: "onCustomRenderModeRemove",
            value: function onCustomRenderModeRemove() {
                var newOptions = Object.assign({}, this.state.options);
                var newRenderModes = null;
                if (newOptions.renderModes) {
                    newRenderModes = newOptions.renderModes.filter(function (renderModeItem) {
                        return renderModeItem.renderMode !== "customExpandableRow";
                    });
                }
                newOptions.renderModes = newRenderModes;
                //switch the render mode to default
                newOptions.renderMode = "defaultExpandableRow";
                this.setState({ options: newOptions });
            }
        }, {
            key: "getComponent",
            value: function getComponent() {
                var collection = this.getCollection(),
                    columns = this.getColumns(),
                    options = this.state.options,
                    onCustomRenderModeAdd = this.onCustomRenderModeAdd.bind(this),
                    onCustomRenderModeRemove = this.onCustomRenderModeRemove.bind(this);

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            _HALabel2.default,
                            null,
                            "Current render mode is:  ",
                            this.state.options.renderMode
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "button",
                            { className: "ha-button", onClick: onCustomRenderModeAdd },
                            "Add custom render mode"
                        ),
                        _react2.default.createElement(
                            "button",
                            { className: "ha-button", onClick: onCustomRenderModeRemove },
                            "Remove custom render mode"
                        )
                    ),
                    _react2.default.createElement(_Table2.default, { collection: collection, columns: columns, options: options })
                );
            }
        }]);

        return RowExpansion;
    }(_Example3.default);

    exports.default = RowExpansion;
});
//# sourceMappingURL=RowExpansion.react.js.map
