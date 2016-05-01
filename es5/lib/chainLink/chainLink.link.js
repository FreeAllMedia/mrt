"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = link;

var _connection = require("../connection/connection.js");

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function link(methodName, LinkConstructor) {
	var newLink = new _connection2.default(this, methodName, LinkConstructor);
	this.connections.push(newLink);
	return newLink;
}