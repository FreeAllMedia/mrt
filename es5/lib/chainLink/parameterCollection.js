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
	function ParameterCollection(parentLink, parameterNames) {
		var _this = this;

		_classCallCheck(this, ParameterCollection);

		var _ = (0, _incognito2.default)(this);
		_.parentLink = parentLink;
		_.parameterNames = parameterNames;

		_.aggregate = false;
		_.multiValue = false;
		_.asProperty = false;
		_.mergeKeyValues = false;
		_.filters = [];

		this.parameters = {};

		_.parameterNames.forEach(function (parameterName) {

			_this.parameters[parameterName] = _this.parameters[parameterName] || null;

			_.parentLink[parameterName] = function () {
				for (var _len = arguments.length, newValue = Array(_len), _key = 0; _key < _len; _key++) {
					newValue[_key] = arguments[_key];
				}

				if (newValue.length > 0) {
					if (!_.multiValue) {
						newValue = newValue[0];
					}

					_.filters.forEach(function (filter) {
						newValue = filter(newValue);
					});

					if (_.aggregate || _.multiValue) {
						if (_.aggregate) {
							_this.parameters[parameterName].push(newValue);
						} else {
							_this.parameters[parameterName] = newValue;
						}
					} else {
						_this.parameters[parameterName] = newValue;
					}
					return parentLink;
				} else {
					return _this.parameters[parameterName];
				}
			};
		});
	}

	_createClass(ParameterCollection, [{
		key: "parameterNames",
		value: function parameterNames() {
			var _ = (0, _incognito2.default)(this);

			for (var _len2 = arguments.length, newParameterNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				newParameterNames[_key2] = arguments[_key2];
			}

			if (newParameterNames.length > 0) {
				_.parameterNames = newParameterNames;
				return this;
			} else {
				return _.parameterNames;
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
			_.parameterNames.forEach(function (parameterName) {
				_this2.parameters[parameterName] = [];
			});
			return this;
		}
	}, {
		key: "isMultiValue",
		get: function get() {
			return (0, _incognito2.default)(this).multiValue;
		}
	}, {
		key: "multiValue",
		get: function get() {
			(0, _incognito2.default)(this).multiValue = true;
			return this;
		}
	}, {
		key: "isProperty",
		get: function get() {
			return (0, _incognito2.default)(this).asProperty;
		}
	}, {
		key: "asProperty",
		get: function get() {
			var _ = (0, _incognito2.default)(this);

			_.asProperty = true;

			_.parameterNames.forEach(function (parameterName) {
				var capitalizedMethodName = (0, _jargon2.default)(parameterName).pascal.toString();
				var getMethodName = "is" + capitalizedMethodName;

				_.parentLink[getMethodName] = false;

				Object.defineProperty(_.parentLink, parameterName, {
					get: function get() {
						_.parentLink[getMethodName] = true;
						return _.parentLink;
					}
				});
			});

			return this;
		}
	}, {
		key: "mergeKeyValues",
		get: function get() {
			var _this3 = this;

			var _ = (0, _incognito2.default)(this);

			_.mergeKeyValues = true;

			_.parameterNames.forEach(function (parameterName) {

				var parameterValues = _this3.parameters[parameterName] = {};

				_.parentLink[parameterName] = function (valueCollection) {
					if (valueCollection) {
						var _loop = function _loop(valueKey) {
							var value = valueCollection[valueKey];

							_.filters.forEach(function (filter) {
								value = filter(value);
							});

							parameterValues[valueKey] = value;
						};

						for (var valueKey in valueCollection) {
							_loop(valueKey);
						}
						return _.parentLink;
					} else {
						return parameterValues;
					}
				};
			});

			return this;
		}
	}]);

	return ParameterCollection;
}();

exports.default = ParameterCollection;