var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'backbone', 'text!./stage.hbs', 'dojo/dom-construct', 'text!./stage.html', 'react', 'react-dom', 'hui/react-components/HAStage', 'hui/react-components/HAHeader', 'hui/react-components/HASection', 'hui/react-components/HAMenuButton', 'hui/react-components/HAItem', './stage', 'hbs/handlebars'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('backbone'), require('text!./stage.hbs'), require('dojo/dom-construct'), require('text!./stage.html'), require('react'), require('react-dom'), require('hui/react-components/HAStage'), require('hui/react-components/HAHeader'), require('hui/react-components/HASection'), require('hui/react-components/HAMenuButton'), require('hui/react-components/HAItem'), require('./stage'), require('hbs/handlebars'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.backbone, global.stage, global.domConstruct, global.stage, global.react, global.reactDom, global.HAStage, global.HAHeader, global.HASection, global.HAMenuButton, global.HAItem, global.stage, global.handlebars);
		global.stageView = mod.exports;
	}
})(this, function (exports, _backbone, _stage, _domConstruct, _stage3, _react, _reactDom, _HAStage, _HAHeader, _HASection, _HAMenuButton, _HAItem, _stage5, _handlebars) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _stage2 = _interopRequireDefault(_stage);

	var _domConstruct2 = _interopRequireDefault(_domConstruct);

	var _stage4 = _interopRequireDefault(_stage3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _HAStage2 = _interopRequireDefault(_HAStage);

	var _HAHeader2 = _interopRequireDefault(_HAHeader);

	var _HASection2 = _interopRequireDefault(_HASection);

	var _HAMenuButton2 = _interopRequireDefault(_HAMenuButton);

	var _HAItem2 = _interopRequireDefault(_HAItem);

	var demoJS = _interopRequireWildcard(_stage5);

	var _handlebars2 = _interopRequireDefault(_handlebars);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

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
			this.renderHTML(_stage2.default, _stage4.default);
			this.renderJS(this.$el.find('#programmaticWay')[0]);
			this.renderDojo(this.$el.find('#dojoProgrammaticWay')[0]);
			this.renderReact(this.$el.find('#reactWay')[0]);
			return this;
		},

		renderHTML: function renderHTML(template, demoTemplate) {
			var compiled = _handlebars2.default.compile(template),
			    html = compiled({ componentDemoTemplate: demoTemplate });
			this.$el.html(html);
		},

		renderDojo: function renderDojo(placeToAppend) {
			var stage = _domConstruct2.default.toDom(_stage4.default),
			    cloned = stage.cloneNode(true);
			_domConstruct2.default.place(cloned, placeToAppend);
		},

		renderJS: function renderJS(placeToAppend) {
			demoJS.render(placeToAppend);
		},

		renderReact: function renderReact(placeToAppend) {
			var ExampleStageComponent = function (_React$Component) {
				_inherits(ExampleStageComponent, _React$Component);

				function ExampleStageComponent(props) {
					_classCallCheck(this, ExampleStageComponent);

					return _possibleConstructorReturn(this, (ExampleStageComponent.__proto__ || Object.getPrototypeOf(ExampleStageComponent)).call(this, props));
				}

				_createClass(ExampleStageComponent, [{
					key: 'render',
					value: function render() {
						return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'h3',
								{ className: 'subtitle' },
								'Collapsible Stage Component with Link navigation'
							),
							_react2.default.createElement(
								_HAStage2.default,
								{ collapsible: true },
								_react2.default.createElement(
									_HAHeader2.default,
									null,
									_react2.default.createElement(
										'span',
										{ className: 'header-left' },
										_react2.default.createElement(
											'div',
											{ className: 'ha-back-links' },
											_react2.default.createElement(
												'a',
												{ href: '#' },
												'Back to employee list'
											)
										),
										_react2.default.createElement(
											'h2',
											null,
											'Employees'
										)
									),
									_react2.default.createElement(
										'span',
										{ className: 'header-right' },
										_react2.default.createElement(
											_HAMenuButton2.default,
											{ label: 'Create New' },
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Apple' },
												'Apple'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Banana' },
												'Banana'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Cherry' },
												'Cherry'
											)
										)
									)
								),
								_react2.default.createElement(
									_HASection2.default,
									null,
									_react2.default.createElement(
										'ha-money-bar',
										null,
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unbilled' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unpaid' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Paid', size: '1' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
										)
									)
								)
							),
							_react2.default.createElement(
								'h3',
								{ className: 'subtitle' },
								'Collapsible Stage Component with open Stage'
							),
							_react2.default.createElement(
								_HAStage2.default,
								{ collapsible: true, open: true },
								_react2.default.createElement(
									_HAHeader2.default,
									null,
									_react2.default.createElement(
										'span',
										{ className: 'header-left' },
										_react2.default.createElement(
											'h2',
											null,
											'Employees'
										),
										_react2.default.createElement(
											'h3',
											null,
											'Profit and loss'
										)
									),
									_react2.default.createElement(
										'span',
										{ className: 'header-right' },
										_react2.default.createElement(
											_HAMenuButton2.default,
											{ label: 'Create New' },
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Apple' },
												'Apple'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Banana' },
												'Banana'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Cherry' },
												'Cherry'
											)
										)
									)
								),
								_react2.default.createElement(
									_HASection2.default,
									null,
									_react2.default.createElement(
										'ha-money-bar',
										null,
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unbilled' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unpaid' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Paid', size: '1' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
										)
									)
								)
							),
							_react2.default.createElement(
								'h3',
								{ className: 'subtitle' },
								'Collapsible Stage Component'
							),
							_react2.default.createElement(
								_HAStage2.default,
								{ collapsible: true },
								_react2.default.createElement(
									_HAHeader2.default,
									null,
									_react2.default.createElement(
										'span',
										{ className: 'header-left' },
										_react2.default.createElement(
											'h2',
											null,
											'Employees'
										),
										_react2.default.createElement(
											'h3',
											null,
											'Profit and loss'
										)
									),
									_react2.default.createElement(
										'span',
										{ className: 'header-right' },
										_react2.default.createElement(
											_HAMenuButton2.default,
											{ label: 'Create New' },
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Apple' },
												'Apple'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Banana' },
												'Banana'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Cherry' },
												'Cherry'
											)
										)
									)
								),
								_react2.default.createElement(
									_HASection2.default,
									null,
									_react2.default.createElement(
										'ha-money-bar',
										null,
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unbilled' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unpaid' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Paid', size: '1' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
										)
									)
								)
							),
							_react2.default.createElement(
								'h3',
								{ className: 'subtitle' },
								'Non Collapsable Stage Component (Default)'
							),
							_react2.default.createElement(
								_HAStage2.default,
								null,
								_react2.default.createElement(
									_HAHeader2.default,
									null,
									_react2.default.createElement(
										'span',
										{ className: 'header-left' },
										_react2.default.createElement(
											'h2',
											null,
											'Employees'
										),
										_react2.default.createElement(
											'h3',
											null,
											'Profit and loss'
										)
									),
									_react2.default.createElement(
										'span',
										{ className: 'header-right' },
										_react2.default.createElement(
											_HAMenuButton2.default,
											{ label: 'Create New' },
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Apple' },
												'Apple'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Banana' },
												'Banana'
											),
											_react2.default.createElement(
												_HAItem2.default,
												{ value: 'Cherry' },
												'Cherry'
											)
										)
									)
								),
								_react2.default.createElement(
									_HASection2.default,
									null,
									_react2.default.createElement(
										'ha-money-bar',
										null,
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unbilled' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unpaid' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Paid', size: '1' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
										)
									)
								)
							),
							_react2.default.createElement(
								'h3',
								{ className: 'subtitle' },
								'Non Collapsible Stage Component without header'
							),
							_react2.default.createElement(
								_HAStage2.default,
								null,
								_react2.default.createElement(
									_HASection2.default,
									null,
									_react2.default.createElement(
										'ha-money-bar',
										null,
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unbilled' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbDarkBlue', primaryText: '$50.00', secondaryText: '2 ESTIMATE' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbLightBlue', primaryText: '$50.00', secondaryText: '2 UNBILLED ACTIVITY' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Unpaid' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbOrange outlay', primaryText: '$50.00', secondaryText: '2 OPEN INVOICES' }),
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbRed inlay', primaryText: '$50.00', secondaryText: '2 OVERDUE' })
										),
										_react2.default.createElement(
											'ha-money-bar-segment',
											{ titleTextBold: '50', titleText: 'Paid', size: '1' },
											_react2.default.createElement('ha-money-bar-cell', { className: 'mbGreen', primaryText: '$50.00', secondaryText: '2 PAID LAST 30 DAYS' })
										)
									)
								)
							)
						);
					}
				}]);

				return ExampleStageComponent;
			}(_react2.default.Component);

			_reactDom2.default.render(_react2.default.createElement(ExampleStageComponent, null), placeToAppend);
		}

	});
});
//# sourceMappingURL=stage.view.js.map
