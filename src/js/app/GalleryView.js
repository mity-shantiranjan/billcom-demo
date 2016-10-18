var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'backbone', 'hbs/handlebars', 'text!./template.hbs', 'dojo/dom-construct'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('backbone'), require('hbs/handlebars'), require('text!./template.hbs'), require('dojo/dom-construct'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.backbone, global.handlebars, global.template, global.domConstruct);
        global.GalleryView = mod.exports;
    }
})(this, function (exports, _backbone, _handlebars, _template, _domConstruct) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _backbone2 = _interopRequireDefault(_backbone);

    var _handlebars2 = _interopRequireDefault(_handlebars);

    var _template2 = _interopRequireDefault(_template);

    var _domConstruct2 = _interopRequireDefault(_domConstruct);

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

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

    var renderDojo = function renderDojo(template, el) {
        var component = _domConstruct2.default.toDom(template),
            cloned = component.cloneNode(true);
        _domConstruct2.default.place(cloned, el);
    };

    var fromString = function fromString(text) {
        return text.replace(/ /g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    var GalleryView = function (_Backbone$View) {
        _inherits(GalleryView, _Backbone$View);

        function GalleryView() {
            _classCallCheck(this, GalleryView);

            return _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).apply(this, arguments));
        }

        _createClass(GalleryView, [{
            key: 'render',
            value: function render(args) {
                var _this2 = this;

                this.el.addEventListener('click', function (evt) {
                    if (evt.target.localName === 'ha-segmented-button' && evt.target.classList.contains('usage-tab-buttons')) {
                        _this2.navigate(evt.target.value);
                    }
                });

                // process the examples[].usage
                if (args && Array.isArray(args.examples)) {
                    // the first one is selected
                    args.examples[0].selected = true;

                    args.examples.forEach(function (item) {
                        if (item.usage) {
                            item.usage = fromString(item.usage);
                        }
                        if (!item.dojo) {
                            item.demoTemplate = item.template;
                        }
                    });
                }

                var compiled = _handlebars2.default.compile(_template2.default),
                    html = compiled(args);

                this.$el.html(html);

                // process on the html dom for dojoTemplate and render option
                if (args && Array.isArray(args.examples)) {
                    args.examples.forEach(function (item) {
                        var exampleNode = _this2.el.querySelector('#' + item.id + '-example');

                        // if dojo template provided, render by cloning
                        if (item.dojo) {
                            renderDojo(item.template, exampleNode);
                        }
                        // if we have render function provided, allow it to run
                        if (item.render) {
                            item.render(exampleNode);
                        }
                    }, this);
                }

                return this;
            }
        }, {
            key: 'navigate',
            value: function navigate(id) {
                // hide every panel first
                var nodes = this.el.querySelectorAll('.panel');
                Array.prototype.forEach.call(nodes, function (el) {
                    return el.classList.add('hidden');
                });

                // show the example panel
                this.el.querySelector('#' + id).classList.remove('hidden');
            }
        }]);

        return GalleryView;
    }(_backbone2.default.View);

    exports.default = GalleryView;
    ;
});
//# sourceMappingURL=GalleryView.js.map
