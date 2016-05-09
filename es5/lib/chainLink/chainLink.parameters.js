"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = parameters;

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _parameterCollection = require("./parameterCollection.js");

var _parameterCollection2 = _interopRequireDefault(_parameterCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parameters() {
	var _ = (0, _incognito2.default)(this);

	for (var _len = arguments.length, parameterNames = Array(_len), _key = 0; _key < _len; _key++) {
		parameterNames[_key] = arguments[_key];
	}

	if (parameterNames.length > 0) {
		var parameterCollection = new _parameterCollection2.default(this, parameterNames);
		_.parameterCollections.push(parameterCollection);

		return parameterCollection;
	} else {
		var _ret = function () {
			var parameterValues = {};

			_.parameterCollections.forEach(function (parameterCollection) {
				parameterValues = Object.assign(parameterValues, parameterCollection.parameters);
			});

			return {
				v: parameterValues
			};
		}();

		if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	}
}