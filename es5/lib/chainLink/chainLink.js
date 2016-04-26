"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ParameterCollection = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _parameterCollection = require("../parameterCollection/parameterCollection.js");

var _parameterCollection2 = _interopRequireDefault(_parameterCollection);

var _connection = require("../connection/connection.js");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.ParameterCollection = _parameterCollection2.default;

var ChainLink = function () {
	function ChainLink() {
		_classCallCheck(this, ChainLink);

		var _ = (0, _incognito2.default)(this);
		_.parameterCollections = [];

		this.links = {
			all: []
		};

		this.connections = [];

		this.initialize.apply(this, arguments);
	}

	_createClass(ChainLink, [{
		key: "initialize",
		value: function initialize() {}
	}, {
		key: "parameters",
		value: function parameters() {
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
	}, {
		key: "link",
		value: function link(methodName, LinkConstructor) {
			var newLink = new _connection2.default(this, methodName, LinkConstructor);
			this.connections.push(newLink);
			return newLink;
		}
	}, {
		key: "serialize",
		value: function serialize() {
			return require("./chainLink.serialize.js").default.call(this);
		}
	}]);

	return ChainLink;
}();

exports.default = ChainLink;