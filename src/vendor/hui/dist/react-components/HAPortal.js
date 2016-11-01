var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom', 'hui/core/position'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'), require('hui/core/position'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.position);
    global.HAPortal = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _position) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _position2 = _interopRequireDefault(_position);

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

  var shallowCompare = _react2.default.addons.shallowCompare;
  var underlayZIndex = [];

  var Portal = function (_React$Component) {
    _inherits(Portal, _React$Component);

    function Portal() {
      _classCallCheck(this, Portal);

      var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

      _this.potral = null;
      _this.container = null;
      return _this;
    }

    _createClass(Portal, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.potral = document.createElement('div');
        document.body.appendChild(this.potral);
        // use unstable_renderSubtreeIntoContainer to pass relay context
        this.container = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.props.children, this.potral);
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        if (nextProps.show) {
          // use unstable_renderSubtreeIntoContainer to pass relay context
          this.container = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, nextProps.children, this.potral);

          // if the container does not have a z-index we need to calculate one for it
          // this can happen if it's a new container, or a container we hid that has not been unmounted yet
          // if a drawer does not have a background, noUnderlay is true and we do not have to modify the underlay
          if (!this.container.style.zIndex && !this.props.noUnderlay) {
            // underlay must get moved first to it's z-index is less than the container's
            this.moveUnderlay(_position2.default.getTopZindex());
          }
          if (!this.container.style.zIndex) {
            this.container.style.zIndex = _position2.default.getTopZindex();
          }
        } else if (nextProps.show === false && this.container && this.container.style.zIndex) {
          /* If show is false, and we have a container, and the container has a z-index.
           * Then we need to move the underlay lower (or remove it), and remove the z-index from
           * the container.  We remove the z-index so we can determine what it's new z-index is
           * if we show it again before unmounting it.
          */

          // if a drawer does not have a background, noUnderlay is true and we do not have to modify the underlay
          if (!this.props.noUnderlay) {
            var underlay = document.body.querySelector(".ha-underlay");

            // if there are multiple layers, pop the top one and move the underlay down a layer
            // else there are no more layers left so we need to remove the underlay from the dom
            if (underlayZIndex.pop() && underlayZIndex.length) {
              underlay.style.zIndex = underlayZIndex[underlayZIndex.length - 1];
            } else if (underlay) {
              document.body.removeChild(underlay);
            }
            this.container.style.zIndex = null;
          }
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.potral) {
          _reactDom2.default.unmountComponentAtNode(this.potral);
          document.body.removeChild(this.potral);
        }
        this.potral = null;
        this.container = null;
      }
    }, {
      key: 'moveUnderlay',
      value: function moveUnderlay(zIndex) {
        var underlay = document.body.querySelector(".ha-underlay");

        // if there is no underlay div, create one and append to the body
        if (!underlay) {
          underlay = document.createElement('div');
          underlay.classList.add('ha-underlay');
          underlay.tabIndex = -1;
          document.body.appendChild(underlay);
        }
        underlay.style.zIndex = zIndex;
        underlayZIndex.push(zIndex);
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Portal;
  }(_react2.default.Component);

  Portal.propTypes = {
    children: _react2.default.PropTypes.element.isRequired
  };
  exports.default = Portal;
});
//# sourceMappingURL=HAPortal.js.map
