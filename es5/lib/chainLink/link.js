"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addLink = Symbol();

var Link = function () {
	function Link(parentLink, methodName, ChainLinkConstructor) {
		var _this = this;

		_classCallCheck(this, Link);

		var _ = (0, _incognito2.default)(this);

		_.into = false;

		this.parentLink = parentLink;
		this.methodName = methodName;
		this.ChainLinkConstructor = ChainLinkConstructor;

		this.method = function () {
			return _this[addLink].apply(_this, arguments);
		};

		this.parentLink[this.methodName] = this.method;
	}

	_createClass(Link, [{
		key: "usingKey",
		value: function usingKey(keyName) {
			(0, _incognito2.default)(this).keyName = keyName;
			return this;
		}
	}, {
		key: addLink,
		value: function value() {
			var _this2 = this;

			var _ = (0, _incognito2.default)(this);

			for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
				options[_key] = arguments[_key];
			}

			var instance = new (Function.prototype.bind.apply(this.ChainLinkConstructor, [null].concat(options)))();

			this.parentLink.links.all.forEach(function (link) {
				var methodPropertyDescriptor = Object.getOwnPropertyDescriptor(_this2.parentLink, link.methodName);
				if (methodPropertyDescriptor.get && !methodPropertyDescriptor.set) {
					Object.defineProperty(instance, link.methodName, {
						get: link.method
					});
				} else {
					instance[link.methodName] = link.method;
				}
			});

			if (_.keyName) {
				var methodLinks = this.parentLink.links[this.methodName] = this.parentLink.links[this.methodName] || {};

				var parameterValues = instance.parameters();
				var keyValue = parameterValues[_.keyName];

				methodLinks[keyValue] = instance;
			}

			if (_.into) {
				var intoLink = this.parentLink[_.into];
				var constructorIsArray = intoLink.constructor === Array;

				if (constructorIsArray) {
					intoLink.push(instance);
				} else {
					var _parameterValues = instance.parameters();
					var _keyValue = _parameterValues[_.keyName];

					intoLink[_keyValue] = instance;
				}

				if (_.keyName) {
					if (constructorIsArray) {
						(function () {
							var intoObjects = {};
							intoLink.forEach(function (intoObject) {
								var keyValue = intoObject.parameters()[_.keyName];
								intoObjects[keyValue] = intoObject;
							});
							_this2.parentLink[_.into] = intoObjects;
						})();
					}
				}
			}

			return instance;
		}
	}, {
		key: "into",
		value: function into(collectionName) {
			var _ = (0, _incognito2.default)(this);
			_.into = collectionName;
			this.parentLink[_.into] = this.parentLink[_.into] || [];
			return this;
		}
	}, {
		key: "asProperty",
		get: function get() {
			var _this3 = this;

			Object.defineProperty(this.parentLink, this.methodName, {
				get: function get() {
					_this3[addLink]();
					return _this3.parentLink;
				}
			});
			return this;
		}
	}]);

	return Link;
}();

exports.default = Link;