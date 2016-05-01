"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ParameterCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _parameterCollection = require("../parameterCollection/parameterCollection.js");

var _parameterCollection2 = _interopRequireDefault(_parameterCollection);

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
			var _require$default;

			for (var _len = arguments.length, parameterNames = Array(_len), _key = 0; _key < _len; _key++) {
				parameterNames[_key] = arguments[_key];
			}

			return (_require$default = require("./chainLink.parameters.js").default).call.apply(_require$default, [this].concat(parameterNames));
		}
	}, {
		key: "link",
		value: function link(methodName, LinkConstructor) {
			return require("./chainLink.link.js").default.call(this, methodName, LinkConstructor);
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