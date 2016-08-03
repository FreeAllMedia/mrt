"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ParameterCollection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var _propertyCollection = require("./propertyCollection.js");

var _propertyCollection2 = _interopRequireDefault(_propertyCollection);

var _connection = require("./connection.js");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.ParameterCollection = _propertyCollection2.default;


var externalFunction = Symbol();

var ChainLink = function () {
	function ChainLink() {
		_classCallCheck(this, ChainLink);

		var _ = (0, _incognito2.default)(this);
		_.propertyCollections = [];

		this.links = {
			all: []
		};

		this.initialize.apply(this, arguments);
	}

	_createClass(ChainLink, [{
		key: "initialize",
		value: function initialize() {}
	}, {
		key: "properties",
		value: function properties() {
			for (var _len = arguments.length, propertyNames = Array(_len), _key = 0; _key < _len; _key++) {
				propertyNames[_key] = arguments[_key];
			}

			return this[externalFunction].apply(this, ["./chainLink.properties.js"].concat(propertyNames));
		}
	}, {
		key: "propertyNames",
		value: function propertyNames() {
			return Object.keys(this.properties());
		}
	}, {
		key: "propertyCollections",
		value: function propertyCollections() {
			return (0, _incognito2.default)(this).propertyCollections;
		}
	}, {
		key: "link",
		value: function link(methodName, LinkConstructor) {
			var newLink = new _connection2.default(this, methodName, LinkConstructor);
			this.links.all.push(newLink);
			return newLink;
		}
	}, {
		key: externalFunction,
		value: function value(filePath) {
			var _require$default;

			for (var _len2 = arguments.length, fileArguments = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				fileArguments[_key2 - 1] = arguments[_key2];
			}

			return (_require$default = require(filePath).default).call.apply(_require$default, [this].concat(fileArguments));
		}
	}]);

	return ChainLink;
}();

exports.default = ChainLink;