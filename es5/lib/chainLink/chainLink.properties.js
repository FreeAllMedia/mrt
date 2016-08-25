"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = properties;

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _propertyCollection = require("./propertyCollection.js");

var _propertyCollection2 = _interopRequireDefault(_propertyCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function properties() {
	var _ = (0, _incognito2.default)(this);

	for (var _len = arguments.length, propertyNames = Array(_len), _key = 0; _key < _len; _key++) {
		propertyNames[_key] = arguments[_key];
	}

	if (propertyNames.length > 0) {
		var propertyCollection = new _propertyCollection2.default(this, propertyNames);
		_.propertyCollections.push(propertyCollection);

		return propertyCollection;
	} else {
		var _ret = function () {
			var propertyValues = {};

			_.propertyCollections.forEach(function (propertyCollection) {
				propertyValues = Object.assign(propertyValues, propertyCollection.properties);
			});

			return {
				v: propertyValues
			};
		}();

		if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	}
}