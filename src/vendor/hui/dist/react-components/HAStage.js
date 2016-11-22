var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "hui/core/utils", "hui/stage"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("hui/core/utils"), require("hui/stage"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.utils, global.stage);
        global.HAStage = mod.exports;
    }
})(this, function (exports, _react, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

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

    var HAStage = function (_React$Component) {
        _inherits(HAStage, _React$Component);

        function HAStage(props) {
            _classCallCheck(this, HAStage);

            var _this = _possibleConstructorReturn(this, (HAStage.__proto__ || Object.getPrototypeOf(HAStage)).call(this, props));

            _initialiseProps.call(_this);

            _this.childCount = 0;
            _this._huiComponent = null;
            _this.state = {
                classAttributes: null
            };
            return _this;
        }

        _createClass(HAStage, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                this.updateHeader();
                this.updateSection();

                if (this.props.collapsible) {
                    if (this.childCount === 2) {
                        this._huiComponent.collapsible = this.props.collapsible;
                    } else {
                        console.error("You can not set collapsible to be true if you do not have both a header and a section.");
                    }
                }

                if (this.props.open) {
                    this._huiComponent.open = this.props.open;
                }

                // merge pre-existing custom element classes with props
                if (this.props.className) {
                    this.updateElementClasses();
                }
            }
        }, {
            key: "updateElementClasses",
            value: function updateElementClasses() {
                var mergedClassString = (0, _utils.updateClassWithProps)(this._huiComponent, this.props.className);
                if (mergedClassString) {
                    this.setState({
                        classAttributes: mergedClassString
                    });
                }
            }
        }, {
            key: "updateHeader",
            value: function updateHeader() {
                var header = this._huiComponent.querySelector("header");

                if (header) {
                    this._huiComponent.header = Array.prototype.slice.call(header.childNodes);
                    this.childCount++;
                }
            }
        }, {
            key: "updateSection",
            value: function updateSection() {
                var section = this._huiComponent.querySelector("section");

                if (section) {
                    this._huiComponent.section = Array.prototype.slice.call(section.childNodes);
                    this.childCount++;
                }
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return _react2.default.createElement(
                    "ha-stage",
                    _extends({
                        ref: this.handleRef,
                        reactLayering: true,
                        "class": this.state.classAttributes
                    }, this.props),
                    this.props.children
                );
                /* jshint ignore:end */
            }
        }]);

        return HAStage;
    }(_react2.default.Component);

    HAStage.propTypes = {
        children: function anonymous(props, propName, componentName) {
            var prop = props[propName] || [],
                types = ["HAHeader", "HASection"],
                typeName;
            prop = Array.isArray(prop) ? prop : [prop];

            for (var child in prop) {
                if (prop[child] != undefined && prop[child].type != undefined) {
                    typeName = (0, _utils.getReactTypeName)(prop[child]);
                    // Only accept a single child, of the appropriate type
                    if (types.indexOf(typeName) === -1) {
                        return new Error(componentName + "\'s children can only have one instance of the following types: " + types.join(", "));
                    } else {
                        types[types.indexOf(typeName)] = "";
                    }
                }
            }
        },
        className: _react2.default.PropTypes.string,
        open: _react2.default.PropTypes.bool,
        collapsible: _react2.default.PropTypes.bool
    };

    var _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this.handleRef = function (c) {
            _this2._huiComponent = c;
        };
    };

    exports.default = HAStage;
});
//# sourceMappingURL=HAStage.js.map
