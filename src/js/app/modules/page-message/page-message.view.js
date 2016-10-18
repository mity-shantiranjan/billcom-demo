var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'backbone', 'text!./page-message.hbs', 'dojo/dom-construct', 'text!./pagemessage.dojo.html', './page-message', 'react', 'react-dom', 'hui/react-components/HAPageMessage'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('backbone'), require('text!./page-message.hbs'), require('dojo/dom-construct'), require('text!./pagemessage.dojo.html'), require('./page-message'), require('react'), require('react-dom'), require('hui/react-components/HAPageMessage'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.backbone, global.pageMessage, global.domConstruct, global.pagemessageDojo, global.pageMessage, global.react, global.reactDom, global.HAPageMessage);
    global.pageMessageView = mod.exports;
  }
})(this, function (exports, _backbone, _pageMessage, _domConstruct, _pagemessageDojo, _pageMessage3, _react, _reactDom, _HAPageMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _backbone2 = _interopRequireDefault(_backbone);

  var _pageMessage2 = _interopRequireDefault(_pageMessage);

  var _domConstruct2 = _interopRequireDefault(_domConstruct);

  var _pagemessageDojo2 = _interopRequireDefault(_pagemessageDojo);

  var _pageMessage4 = _interopRequireDefault(_pageMessage3);

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _HAPageMessage2 = _interopRequireDefault(_HAPageMessage);

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

  exports.default = _backbone2.default.View.extend({

    events: {
      'click ha-segmented-button.usage-tab-buttons': 'navigate'
    },

    navigate: function navigate(evt) {
      this.$el.find('.panel').addClass('hidden');
      this.$el.find('#' + evt.currentTarget.value).removeClass('hidden');
    },

    render: function render() {
      this.$el.html(_pageMessage2.default);
      this.renderJS(this.$el.find('#programmaticWay')[0]);
      this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
      this.renderReact(this.$('#reactWay')[0]);
      return this;
    },

    renderDojo: function renderDojo(placeToAppend) {
      var pageMessage = _domConstruct2.default.toDom(_pagemessageDojo2.default);
      var cloned = pageMessage.cloneNode(true);
      _domConstruct2.default.place(cloned, placeToAppend);
    },

    renderJS: function renderJS(placeToAppend) {
      _pageMessage4.default.render(placeToAppend);
    },

    renderReact: function renderReact(placeToAppend) {
      var EmployeeListPageAssetId = function (_React$Component) {
        _inherits(EmployeeListPageAssetId, _React$Component);

        function EmployeeListPageAssetId() {
          _classCallCheck(this, EmployeeListPageAssetId);

          return _possibleConstructorReturn(this, (EmployeeListPageAssetId.__proto__ || Object.getPrototypeOf(EmployeeListPageAssetId)).apply(this, arguments));
        }

        _createClass(EmployeeListPageAssetId, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: 'declarative-wrapper' },
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { titleText: 'Alert Title', type: 'error', dismissible: false },
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { titleText: 'Warn Title', dismissible: true, type: 'warn' },
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { titleText: 'Info Title', dismissible: true, type: 'info' },
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { titleText: 'Discovery Title', dismissible: true, type: 'discovery' },
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { dismissible: true, type: 'info' },
                  'No titleText. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { type: 'info', dismissible: true },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Using html inside the message with ',
                    _react2.default.createElement(
                      'a',
                      null,
                      'links'
                    ),
                    ' no titleText'
                  )
                ),
                _react2.default.createElement(
                  _HAPageMessage2.default,
                  { titleText: 'With Title', type: 'info', dismissible: true },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Using html inside the message with ',
                    _react2.default.createElement(
                      'a',
                      null,
                      'links'
                    ),
                    ' with titleText'
                  )
                )
              )
            );
          }
        }]);

        return EmployeeListPageAssetId;
      }(_react2.default.Component);

      _reactDom2.default.render(_react2.default.createElement(EmployeeListPageAssetId, null), placeToAppend);
    }
  });
});
//# sourceMappingURL=page-message.view.js.map
