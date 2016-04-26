"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = serialize;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function serialize() {
	var serializer = new SerializeLink(this);
	return serializer.toJson();
}

var SerializeLink = function () {
	function SerializeLink(link) {
		_classCallCheck(this, SerializeLink);

		this.link = link;
	}

	_createClass(SerializeLink, [{
		key: "toJson",
		value: function toJson() {
			var returnJson = {};

			this.generateParameters(this.link, returnJson);
			this.generateLinks(this.link, returnJson);

			return returnJson;
		}
	}, {
		key: "generateParameters",
		value: function generateParameters(link, json) {
			var parameters = link.parameters();

			for (var parameterName in parameters) {
				json[parameterName] = parameters[parameterName];
			}
		}
	}, {
		key: "generateLinks",
		value: function generateLinks(link, json) {
			var links = link.links.all;

			var connectionNameMap = this.generateConnectionNameMap(link);

			console.log("links", links);

			links.forEach(function (childLink) {
				console.log("childLink", childLink);

				var connectionName = connectionNameMap[childLink.constructor];
				console.log("connectionName", connectionName);
				json[connectionName] = {};
			});
		}
	}, {
		key: "generateConnectionNameMap",
		value: function generateConnectionNameMap(link) {
			var connections = link.connections;

			var connectionNameMap = {};
			connections.forEach(function (connection) {
				connectionNameMap[connection.ChainLinkConstructor] = connection.methodName;
			});

			return connectionNameMap;
		}
	}]);

	return SerializeLink;
}();