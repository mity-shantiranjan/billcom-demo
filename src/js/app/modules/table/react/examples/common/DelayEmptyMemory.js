var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "dstore/Store", "dojo/Deferred", "dstore/QueryResults"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("dstore/Store"), require("dojo/Deferred"), require("dstore/QueryResults"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Store, global.Deferred, global.QueryResults);
        global.DelayEmptyMemory = mod.exports;
    }
})(this, function (exports, _Store2, _Deferred, _QueryResults) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Store3 = _interopRequireDefault(_Store2);

    var _Deferred2 = _interopRequireDefault(_Deferred);

    var _QueryResults2 = _interopRequireDefault(_QueryResults);

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

    var DelayEmptyMemory = function (_Store) {
        _inherits(DelayEmptyMemory, _Store);

        function DelayEmptyMemory() {
            _classCallCheck(this, DelayEmptyMemory);

            return _possibleConstructorReturn(this, (DelayEmptyMemory.__proto__ || Object.getPrototypeOf(DelayEmptyMemory)).apply(this, arguments));
        }

        _createClass(DelayEmptyMemory, [{
            key: "fetchRange",
            value: function fetchRange() {
                // ES6 Promises don't work here for some reason. Use Dojo
                var promise = new _Deferred2.default();

                // Wait 5 seconds before sending back the data
                setTimeout(function () {
                    promise.resolve([]);
                }, 5000);

                return new _QueryResults2.default(promise.then(function (data) {
                    return data;
                }), {
                    totalLength: promise.then(function () {
                        return 0;
                    })
                });
            }
        }]);

        return DelayEmptyMemory;
    }(_Store3.default);

    exports.default = DelayEmptyMemory;
});
//# sourceMappingURL=DelayEmptyMemory.js.map
