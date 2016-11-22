var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "react-dom", "./HAPortal", "hui/core/utils", "hui/trowser/page-modal", "hui/trowser/page-modal-header", "hui/trowser/page-modal-footer", "hui/trowser/page-modal-header-item"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("react-dom"), require("./HAPortal"), require("hui/core/utils"), require("hui/trowser/page-modal"), require("hui/trowser/page-modal-header"), require("hui/trowser/page-modal-footer"), require("hui/trowser/page-modal-header-item"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.HAPortal, global.utils, global.pageModal, global.pageModalHeader, global.pageModalFooter, global.pageModalHeaderItem);
        global.HATrowser = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _HAPortal, _utils) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _HAPortal2 = _interopRequireDefault(_HAPortal);

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

    var Trowser = function (_React$Component) {
        _inherits(Trowser, _React$Component);

        function Trowser(props) {
            _classCallCheck(this, Trowser);

            var _this = _possibleConstructorReturn(this, (Trowser.__proto__ || Object.getPrototypeOf(Trowser)).call(this, props));

            _initialiseProps.call(_this);

            _this._trowser = null; // trowser DOM reference, set after render()
            // keep track if we have set any event listeners on trowser
            _this._listeners = {};
            _this.showModal = props.show;

            _this.state = {
                classAttributes: null
            };
            return _this;
        }

        // check that the only children passed to this component are a HASection, or HAFooter

        _createClass(Trowser, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                if (this._trowser) {
                    this.removeWebRenderComp();
                    this.setState(function () {
                        _this2.showModal = _this2.props.show;
                    });
                }
                this.mountTrowser();
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps) {
                this.mountTrowser(prevProps);
            }
        }, {
            key: "mountTrowser",
            value: function mountTrowser() {
                var _this3 = this;

                var prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                if (this._trowser && this.props.show !== prevProps.show) {
                    if (this.props.show) {
                        this.setupListeners();

                        // handle showing trowser
                        if (this.state.classAttributes !== this.props.className) {
                            this._trowser.classList.remove('hidden');
                            this.updateElementClasses();
                        }

                        if (this._trowser.show) {
                            this._trowser.show();
                        } else {
                            // on browsers that doesn't support custom elements natively,
                            // the component is not upgraded yet so show is not available, wait for event
                            var componentUpgraded = function componentUpgraded(event) {
                                event.stopPropagation();
                                _this3._trowser.show();
                            };
                            this._listeners.componentUpgraded = componentUpgraded.bind(this);
                            this._trowser.addEventListener("component-upgraded", this._listeners.componentUpgraded);
                        }
                    } else if (prevProps.show) {
                        this._trowser.close(); // remove trowser from DOM using hui/trowser

                        // handle className props being passed to custom element
                        if (this.props.className !== prevProps.className) {
                            this.updateElementClasses();
                        }
                    }
                }
            }
        }, {
            key: "updateElementClasses",
            value: function updateElementClasses() {
                var mergedClassString = (0, _utils.updateClassWithProps)(this._trowser, this.props.className);
                if (mergedClassString) {
                    this.setState({
                        classAttributes: mergedClassString
                    });
                }
            }
        }, {
            key: "removeWebRenderComp",
            value: function removeWebRenderComp() {
                var headerLeft = undefined,
                    headerCenter = undefined,
                    headerRight = undefined,
                    pageModal = undefined,
                    header = undefined,
                    pageModalChildren = this._trowser.querySelectorAll('.page-modal-panel');

                if (pageModalChildren && pageModalChildren.length > 1) {
                    this._trowser.removeChild(pageModalChildren[0]);
                    pageModal = pageModalChildren[1];
                    header = pageModal.querySelector('ha-page-modal-header');
                    headerLeft = header.querySelectorAll('ha-page-modal-header > span.header-left');
                    headerCenter = header.querySelectorAll('ha-page-modal-header > span.header-center');
                    headerRight = header.querySelectorAll('ha-page-modal-header > span.header-right');
                    this.removeDuplicateChild(header, headerLeft);
                    this.removeDuplicateChild(header, headerCenter);
                    this.removeDuplicateChild(header, headerRight);
                    this.removeDuplicateHeaderItem(headerLeft);
                    this.removeDuplicateHeaderItem(headerCenter);
                    this.removeDuplicateHeaderItem(headerRight);
                }
            }
        }, {
            key: "removeDuplicateChild",
            value: function removeDuplicateChild(component, children) {
                if (component && children && children.length > 1) {
                    component.removeChild(children[0]);
                }
            }
        }, {
            key: "removeDuplicateHeaderItem",
            value: function removeDuplicateHeaderItem(component) {
                var _this4 = this;

                if (component && component.length > 1) {
                    var headerItems = Array.prototype.slice.call(component[1].querySelectorAll('ha-page-modal-header-item'));
                    headerItems.forEach(function (item) {
                        var headerBtn = item.querySelectorAll('button');
                        _this4.removeDuplicateChild(item, headerBtn);
                    });
                }
            }
        }, {
            key: "setupListeners",
            value: function setupListeners() {
                var _this5 = this;

                if (Object.keys(this._listeners).length === 0) {
                    var onShow = function onShow(event) {
                        event.stopPropagation();
                        if (_this5.props.onShow) {
                            _this5.props.onShow(event);
                        }
                    };
                    this._listeners.onShow = onShow.bind(this);
                    this._trowser.addEventListener("show", this._listeners.onShow);

                    var onClose = function onClose(event) {
                        event.stopPropagation();
                        if (_this5.props.onClose) {
                            _this5.props.onClose(event);
                        }
                        _this5.cleanUpListeners();
                    };
                    this._listeners.onClose = onClose.bind(this);
                    this._trowser.addEventListener("close", this._listeners.onClose);

                    var onDismiss = function onDismiss(event) {
                        event.stopPropagation();
                        if (_this5.props.onDismiss) {
                            _this5.props.onDismiss(event);
                        }
                    };
                    this._listeners.onDismiss = onDismiss.bind(this);
                    this._trowser.addEventListener("dismiss", this._listeners.onDismiss);
                }
            }
        }, {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                // we might need a unmountPortal here depending on how applications handle dom rendering & routing
                this.cleanUpListeners();
            }
        }, {
            key: "cleanUpListeners",
            value: function cleanUpListeners() {
                // if we do not have a _modal then HAUnderlay destroys the event listeners
                if (this._trowser) {
                    this._trowser.removeEventListener("show", this._listeners.onShow, false); // clean up show listener
                    this._trowser.removeEventListener("close", this._listeners.onClose, false); // clean up close listener
                    this._trowser.removeEventListener("dismiss", this._listeners.onDismiss, false); // clean up dismiss listener
                    this._trowser.removeEventListener("component-upgraded", this._listeners.componentUpgraded, false); // clean up component-upgraded listener
                }
                this._listeners = {};
            }
        }, {
            key: "render",
            value: function render() {
                /* jshint ignore:start */
                return(
                    // renders .ha-underlay and trowser outside of parent react DOM tree
                    _react2.default.createElement(
                        _HAPortal2.default,
                        { show: this.props.show },
                        _react2.default.createElement(
                            "ha-page-modal",
                            _extends({
                                ref: this.handleRef,
                                "class": this.state.classAttributes,
                                reactLayering: true
                            }, this.props),
                            _react2.default.createElement(
                                "div",
                                { className: "page-modal-panel", "aria-hidden": this.showModal },
                                _react2.default.createElement(
                                    "header",
                                    null,
                                    _react2.default.createElement(
                                        "ha-page-modal-header",
                                        { titleText: this.props.titleText, infoText: this.props.infoText, dismissible: this.props.dismissible },
                                        _react2.default.createElement(
                                            "span",
                                            { className: "header-left" },
                                            this.history
                                        ),
                                        _react2.default.createElement(
                                            "span",
                                            { className: "header-center" },
                                            this.title
                                        ),
                                        _react2.default.createElement(
                                            "span",
                                            { className: "header-right pull-right" },
                                            this.info,
                                            this.help,
                                            this.settings,
                                            this.closeBtn
                                        )
                                    )
                                ),
                                _react2.default.Children.map(this.props.children, function (child) {
                                    if ((0, _utils.getReactTypeName)(child) === "HASection") {
                                        return _react2.default.createElement(
                                            "section",
                                            { key: "1", tabIndex: "-1" },
                                            child
                                        );
                                    } else if ((0, _utils.getReactTypeName)(child) === "HATrowserFooter") {
                                        return _react2.default.createElement(
                                            "footer",
                                            { key: "2", tabIndex: "-1" },
                                            child
                                        );
                                    }
                                })
                            )
                        )
                    )
                );
                /* jshint ignore:end */
            }
        }, {
            key: "title",
            get: function get() {
                if (this.props.titleText) {
                    return _react2.default.createElement(
                        "label",
                        { className: "title-text pull-left" },
                        this.props.titleText
                    );
                }
            }
        }, {
            key: "info",
            get: function get() {
                if (this.props.infoText) {
                    return _react2.default.createElement(
                        "label",
                        { className: "info-text ghost-text pull-left" },
                        this.props.infoText
                    );
                }
            }
        }, {
            key: "history",
            get: function get() {
                if (this.props.history) {
                    return _react2.default.createElement(
                        "ha-page-modal-header-item",
                        { type: "history", icon: "history", position: "left", className: "pull-left" },
                        _react2.default.createElement(
                            "button",
                            { className: "header-button btn btn-link", "aria-label": "history" },
                            _react2.default.createElement("span", { className: "hi hi-history" })
                        )
                    );
                }
            }
        }, {
            key: "settings",
            get: function get() {
                if (this.props.settings) {
                    return _react2.default.createElement(
                        "ha-page-modal-header-item",
                        { type: "settings", icon: "settings-o", position: "right" },
                        _react2.default.createElement(
                            "button",
                            { className: "header-button btn btn-link", "aria-label": "settings" },
                            _react2.default.createElement("span", { className: "hi hi-settings-o" })
                        )
                    );
                }
            }
        }, {
            key: "help",
            get: function get() {
                if (this.props.help) {
                    return _react2.default.createElement(
                        "ha-page-modal-header-item",
                        { type: "help", icon: "help-o", position: "right" },
                        _react2.default.createElement(
                            "button",
                            { className: "header-button btn btn-link", "aria-label": "help" },
                            _react2.default.createElement("span", { className: "hi hi-help-o" })
                        )
                    );
                }
            }
        }, {
            key: "closeBtn",
            get: function get() {
                return _react2.default.createElement(
                    "ha-page-modal-header-item",
                    { icon: "close", position: "right", type: "close", "class": "show" },
                    _react2.default.createElement(
                        "button",
                        { className: "header-button btn btn-link", "aria-label": "close" },
                        _react2.default.createElement("span", { className: "hi hi-close" })
                    )
                );
            }
        }]);

        return Trowser;
    }(_react2.default.Component);

    Trowser.propTypes = {
        children: function children(props, propName, componentName) {
            var prop = props[propName] || [],
                types = ["HASection", "HATrowserFooter"],
                typeName;
            // handle single child prop http://facebook.github.io/react/tips/children-props-type.html
            prop = Array.isArray(prop) ? prop : [prop];

            for (var child in prop) {
                typeName = (0, _utils.getReactTypeName)(prop[child]);
                // Only accept a single child, of the appropriate type
                if (types.indexOf(typeName) === -1) {
                    return new Error(componentName + "'s children can only have one instance of the following types: " + types.join(", "));
                } else {
                    types[types.indexOf(typeName)] = "";
                }
            }
        },
        className: _react2.default.PropTypes.string,
        titleText: _react2.default.PropTypes.string,
        infoText: _react2.default.PropTypes.string,
        type: _react2.default.PropTypes.string,
        settings: _react2.default.PropTypes.bool,
        help: _react2.default.PropTypes.bool,
        history: _react2.default.PropTypes.bool,
        dismissible: _react2.default.PropTypes.bool,
        autofocus: _react2.default.PropTypes.bool,
        noCloseOnDismiss: _react2.default.PropTypes.bool,
        onShow: _react2.default.PropTypes.func,
        onClose: _react2.default.PropTypes.func,
        onDismiss: _react2.default.PropTypes.func
    };

    var _initialiseProps = function _initialiseProps() {
        var _this6 = this;

        this.handleRef = function (c) {
            _this6._trowser = c;
        };
    };

    exports.default = Trowser;
});
//# sourceMappingURL=HATrowser.js.map
