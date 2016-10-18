var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'hui/react-components/HACheckboxGroup', 'hui/react-components/HACheckbox', 'hui/react-components/HAComboButton', 'hui/react-components/HATabs', 'hui/react-components/HATab'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('hui/react-components/HACheckboxGroup'), require('hui/react-components/HACheckbox'), require('hui/react-components/HAComboButton'), require('hui/react-components/HATabs'), require('hui/react-components/HATab'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.HACheckboxGroup, global.HACheckbox, global.HAComboButton, global.HATabs, global.HATab);
    global.TabsExamples = mod.exports;
  }
})(this, function (exports, _react, _HACheckboxGroup, _HACheckbox, _HAComboButton, _HATabs, _HATab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _HACheckboxGroup2 = _interopRequireDefault(_HACheckboxGroup);

  var _HACheckbox2 = _interopRequireDefault(_HACheckbox);

  var _HAComboButton2 = _interopRequireDefault(_HAComboButton);

  var _HATabs2 = _interopRequireDefault(_HATabs);

  var _HATab2 = _interopRequireDefault(_HATab);

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

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
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

  var ComboButtonExamples = function (_React$Component) {
    _inherits(ComboButtonExamples, _React$Component);

    _createClass(ComboButtonExamples, null, [{
      key: 'displayName',
      get: function get() {
        return "ComboButtonExamples";
      }
    }]);

    function ComboButtonExamples(props) {
      _classCallCheck(this, ComboButtonExamples);

      var _this = _possibleConstructorReturn(this, (ComboButtonExamples.__proto__ || Object.getPrototypeOf(ComboButtonExamples)).call(this, props));

      _this.state = {
        showFruits: true
      };

      _this._fruits = ["Apple", "Banana", "Mango", "Kiwi"];
      _this._vegetables = ["Cabbage", "Broccoli", "Carrots"];
      return _this;
    }

    _createClass(ComboButtonExamples, [{
      key: '_onToggleCallback',
      value: function _onToggleCallback() {
        this.setState({
          showFruits: !this.state.showFruits
        });
      }
    }, {
      key: 'render',
      value: function render() {

        var eventLog = function eventLog(e) {
          console.log(e.target.tagName + ' ' + e.type + ' fired');
        };
        var onToggleCallback = this._onToggleCallback.bind(this);
        var items = this.state.showFruits ? this._fruits : this._vegetables;

        var rows = [],
            rowValues = "";

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            var itemValue = item + "Value";
            rows.push(_react2.default.createElement(_HACheckbox2.default, { label: item, value: itemValue }));
            rowValues = rowValues + " " + item;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return _react2.default.createElement(
          'div',
          { className: 'row bottom-separator' },
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12' },
            _react2.default.createElement(
              'h2',
              null,
              'HATabs content changes dont work'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-8' },
            _react2.default.createElement(
              _HATabs2.default,
              null,
              _react2.default.createElement(
                _HATab2.default,
                { titleText: 'This Works' },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('input', { type: 'text', value: rowValues })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-4' },
            _react2.default.createElement(
              'div',
              { className: 'widget' },
              _react2.default.createElement(
                'button',
                { className: 'ha-button ha-button-primary', onClick: onToggleCallback },
                'Toggle Fruit & Vegetables'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12 expectation' },
            'The content of the checkboxes should change from fruits to vegetables.',
            _react2.default.createElement('br', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12 issues' },
            _react2.default.createElement(
              'h4',
              null,
              'Issues'
            ),
            'On change the content of the text field inside the tab should change. but it doesnt. The ha-tabs children that were specified by the developer are moved into a sibling of ha-tabs and this causes failures',
            _react2.default.createElement('br', null),
            'See the browser console for errors as well. It throws an invariant violation'
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-lg-12 issues' },
            _react2.default.createElement(
              'h4',
              null,
              'Applies to'
            ),
            'Tabs',
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null)
          )
        );
      }
    }]);

    return ComboButtonExamples;
  }(_react2.default.Component);

  exports.default = ComboButtonExamples;
});
//# sourceMappingURL=TabsExamples.js.map
