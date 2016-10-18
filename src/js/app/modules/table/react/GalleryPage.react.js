var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./ExampleChooser"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./ExampleChooser"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.ExampleChooser);
        global.GalleryPage = mod.exports;
    }
})(this, function (exports, _react, _ExampleChooser) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _ExampleChooser2 = _interopRequireDefault(_ExampleChooser);

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

    var GalleryPage = function (_React$Component) {
        _inherits(GalleryPage, _React$Component);

        _createClass(GalleryPage, null, [{
            key: "displayName",
            get: function get() {
                return "GalleryPage";
            }
        }, {
            key: "propTypes",
            get: function get() {
                return {
                    config: _react2.default.PropTypes.shape({
                        id: _react2.default.PropTypes.string.isRequired,
                        title: _react2.default.PropTypes.string.isRequired,
                        designDocLink: _react2.default.PropTypes.string,
                        defaultExample: _react2.default.PropTypes.string.isRequired,
                        examples: _react2.default.PropTypes.object.isRequired
                    }).isRequired
                };
            }
        }]);

        function GalleryPage(props) {
            _classCallCheck(this, GalleryPage);

            var _this = _possibleConstructorReturn(this, (GalleryPage.__proto__ || Object.getPrototypeOf(GalleryPage)).call(this, props));

            _this.state = {
                selectedExampleKey: _this.props.config.defaultExample,
                selectedExample: _this.props.config.examples[_this.props.config.defaultExample]
            };
            return _this;
        }

        _createClass(GalleryPage, [{
            key: "switchExample",
            value: function switchExample(key) {
                this.setState({
                    selectedExampleKey: key,
                    selectedExample: this.props.config.examples[key]
                });
            }
        }, {
            key: "render",
            value: function render() {
                var example = this.state.selectedExample,
                    Module = example.module,
                    switchExample = this.switchExample.bind(this),
                    config = this.props.config,
                    className = "galleryPage " + config.id;
                var designDoc = undefined;

                if (config.designDocLink) {
                    designDoc = _react2.default.createElement(
                        "div",
                        { className: "design-document" },
                        _react2.default.createElement(
                            "a",
                            { href: config.designDocLink, target: "_blank" },
                            "Design & API Document"
                        )
                    );
                }

                return _react2.default.createElement(
                    "div",
                    { className: className },
                    _react2.default.createElement(
                        "section",
                        { className: "post box clearfix" },
                        _react2.default.createElement(
                            "h1",
                            { className: "entry-title" },
                            config.title
                        ),
                        _react2.default.createElement(_ExampleChooser2.default, { examples: config.examples, value: this.state.selectedExampleKey, switchExample: switchExample }),
                        designDoc
                    ),
                    _react2.default.createElement(Module, { gitUrl: example.gitUrl })
                );
            }
        }]);

        return GalleryPage;
    }(_react2.default.Component);

    exports.default = GalleryPage;
});
//# sourceMappingURL=GalleryPage.react.js.map
