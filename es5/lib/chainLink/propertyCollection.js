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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParameterCollection = function () {
	function ParameterCollection(parentLink, propertyNames) {
		var _this = this;

		_classCallCheck(this, ParameterCollection);

		var _ = (0, _incognito2.default)(this);
		_.parentLink = parentLink;
		_.propertyNames = propertyNames;

		_.aggregate = false;
		_.multi = false;
		_.boolean = false;
		_.merged = false;
		_.filters = [];

		this.properties = {};

		_.propertyNames.forEach(function (propertyName) {

			_this.properties[propertyName] = _this.properties[propertyName] || null;

			_.parentLink[propertyName] = function () {
				for (var _len = arguments.length, newValue = Array(_len), _key = 0; _key < _len; _key++) {
					newValue[_key] = arguments[_key];
				}

				if (newValue.length > 0) {
					if (!_.multi) {
						newValue = newValue[0];
					}

					_.filters.forEach(function (filter) {
						newValue = filter(newValue);
					});

					if (_.aggregate || _.multi) {
						if (_.aggregate) {
							_this.properties[propertyName].push(newValue);
						} else {
							_this.properties[propertyName] = newValue;
						}
					} else {
						_this.properties[propertyName] = newValue;
					}
					return parentLink;
				} else {
					return _this.properties[propertyName];
				}
			};
		});
	}

	_createClass(ParameterCollection, [{
		key: "propertyNames",
		value: function propertyNames() {
			var _ = (0, _incognito2.default)(this);

			for (var _len2 = arguments.length, newParameterNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				newParameterNames[_key2] = arguments[_key2];
			}

			if (newParameterNames.length > 0) {
				_.propertyNames = newParameterNames;
				return this;
			} else {
				return _.propertyNames;
			}
		}
	}, {
		key: "filter",
		value: function filter(filterFunction) {
			(0, _incognito2.default)(this).filters.push(filterFunction);
			return this;
		}
	}, {
		key: "isAggregate",
		get: function get() {
			return (0, _incognito2.default)(this).aggregate;
		}
	}, {
		key: "aggregate",
		get: function get() {
			var _this2 = this;

			var _ = (0, _incognito2.default)(this);
			_.aggregate = true;
			_.propertyNames.forEach(function (propertyName) {
				_this2.properties[propertyName] = [];
			});
			return this;
		}
	}, {
		key: "isMulti",
		get: function get() {
			return (0, _incognito2.default)(this).multi;
		}
	}, {
		key: "multi",
		get: function get() {
			(0, _incognito2.default)(this).multi = true;
			return this;
		}
	}, {
		key: "isBoolean",
		get: function get() {
			return (0, _incognito2.default)(this).boolean;
		}
	}, {
		key: "boolean",
		get: function get() {
			var _ = (0, _incognito2.default)(this);

			_.boolean = true;

			_.propertyNames.forEach(function (propertyName) {
				var capitalizedMethodName = (0, _jargon2.default)(propertyName).pascal.toString();
				var getMethodName = "is" + capitalizedMethodName;

				_.parentLink[getMethodName] = false;

				Object.defineProperty(_.parentLink, propertyName, {
					get: function get() {
						_.parentLink[getMethodName] = true;
						return _.parentLink;
					}
				});
			});

			return this;
		}
	}, {
		key: "merged",
		get: function get() {
			var _this3 = this;

			var _ = (0, _incognito2.default)(this);

			_.merged = true;

			_.propertyNames.forEach(function (propertyName) {

				var propertyValues = _this3.properties[propertyName] = {};

				_.parentLink[propertyName] = function (valueCollection) {
					if (valueCollection) {
						var _loop = function _loop(valueKey) {
							var value = valueCollection[valueKey];

							_.filters.forEach(function (filter) {
								value = filter(value);
							});

							propertyValues[valueKey] = value;
						};

						for (var valueKey in valueCollection) {
							_loop(valueKey);
						}
						return _.parentLink;
					} else {
						return propertyValues;
					}
				};
			});

			return this;
		}
	}]);

	return ParameterCollection;
}();

exports.default = ParameterCollection;