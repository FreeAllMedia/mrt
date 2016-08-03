"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addLink = Symbol();

var Connection = function () {
	function Connection(parentLink, methodName, ChainLinkConstructor) {
		var _this = this;

		_classCallCheck(this, Connection);

		var _ = (0, _incognito2.default)(this);

		_.inherit = false;
		_.into = false;
		_.useArguments = [];

		this.parentLink = parentLink;
		this.methodName = methodName;
		this.ChainLinkConstructor = ChainLinkConstructor;

		this.method = function () {
			return _this[addLink].apply(_this, arguments);
		};

		this.parentLink[this.methodName] = this.method;
	}

	_createClass(Connection, [{
		key: "key",
		value: function key(keyName) {
			(0, _incognito2.default)(this).keyName = keyName;
			return this;
		}
	}, {
		key: "arguments",
		value: function _arguments() {
			var _ = (0, _incognito2.default)(this);

			for (var _len = arguments.length, newArguments = Array(_len), _key = 0; _key < _len; _key++) {
				newArguments[_key] = arguments[_key];
			}

			_.useArguments = _.useArguments.concat(newArguments);
			return this;
		}
	}, {
		key: addLink,
		value: function value() {
			var _this2 = this;

			for (var _len2 = arguments.length, options = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				options[_key2] = arguments[_key2];
			}

			var _ = (0, _incognito2.default)(this);

			options = _.useArguments.concat(options);

			var instance = new (Function.prototype.bind.apply(this.ChainLinkConstructor, [null].concat(_toConsumableArray(options))))();

			var methodNames = Object.getOwnPropertyNames(this.parentLink.constructor.prototype).filter(function (propertyName) {
				switch (propertyName) {
					case "constructor":
					case "initialize":
						return false;
					default:
						return true;
				}
			});

			var propertyNames = this.parentLink.propertyNames();

			propertyNames.forEach(function (propertyName) {
				if (!instance[propertyName]) {
					instance[propertyName] = _this2.parentLink[propertyName];
				}
			});

			methodNames.forEach(function (propertyName) {
				var propertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(_this2.parentLink), propertyName);
				//if (propertyDescriptor.value) { propertyDescriptor.value = propertyDescriptor.value.bind(this.parentLink); }
				//if (propertyDescriptor.get) { propertyDescriptor.get = propertyDescriptor.get.bind(this.parentLink); }
				Object.defineProperty(instance, propertyName, propertyDescriptor);
			});

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

				var propertyValues = instance.properties();
				var keyValue = propertyValues[_.keyName];

				methodLinks[keyValue] = instance;
			} else {
				var _methodLinks = this.parentLink.links[this.methodName] = this.parentLink.links[this.methodName] || [];
				_methodLinks.push(instance);
			}

			if (_.into) {
				var intoLink = void 0;

				if (_.into.constructor === String) {
					intoLink = this.parentLink[_.into];
				} else {
					intoLink = _.into;
				}

				if (_.keyName) {
					if (intoLink.constructor === Array) {
						(function () {
							intoLink.push(instance);

							var intoObjects = {};

							intoLink.forEach(function (intoObject) {
								var keyValue = intoObject.properties()[_.keyName];
								intoObjects[keyValue] = intoObject;
							});

							_this2.parentLink[_.into] = intoObjects;
						})();
					} else {
						var _keyValue = instance.properties()[_.keyName];
						intoLink[_keyValue] = instance;
					}
				} else {
					intoLink.push(instance);
				}
			}

			if (_.inherit) {
				var inheritedParameterNames = _.inherit;

				inheritedParameterNames.forEach(function (propertyName) {
					var capitalizedMethodName = (0, _jargon2.default)(propertyName).pascal.toString();
					var getMethodName = "is" + capitalizedMethodName;

					if (_this2.parentLink.hasOwnProperty(getMethodName)) {
						instance[propertyName];
					} else {
						var propertyValue = _this2.parentLink[propertyName]();
						instance[propertyName](propertyValue);
					}
				});
			}

			if (_.then) {
				_.then(instance);
			}

			return instance;
		}
	}, {
		key: "into",
		value: function into(collectionNameOrContainer) {
			var _ = (0, _incognito2.default)(this);

			if (collectionNameOrContainer.constructor === String) {
				var collectionName = collectionNameOrContainer;
				this.parentLink[collectionName] = this.parentLink[collectionName] || [];
				_.into = collectionName;
			} else {
				var container = collectionNameOrContainer;
				_.into = container;
			}

			return this;
		}
	}, {
		key: "then",
		value: function then(thenFunction) {
			(0, _incognito2.default)(this).then = thenFunction;
		}
	}, {
		key: "inherit",
		value: function inherit() {
			for (var _len3 = arguments.length, propertyNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				propertyNames[_key3] = arguments[_key3];
			}

			(0, _incognito2.default)(this).inherit = propertyNames;
		}
	}, {
		key: "getter",
		get: function get() {
			var _this3 = this;

			Object.defineProperty(this.parentLink, this.methodName, {
				get: function get() {
					return _this3[addLink]();
				}
			});

			return this;
		}
	}]);

	return Connection;
}();

exports.default = Connection;