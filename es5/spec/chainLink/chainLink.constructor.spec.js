"use strict";

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Dependencies */
describe("ChainLink.constructor", function () {
	var properties = void 0,
	    chainLink = void 0;

	/* Test Setup For Scope */
	beforeEach(function () {
		_chainLink2.default.prototype.initialize = _sinon2.default.spy(_chainLink2.default.prototype.initialize);

		properties = {
			foo: "bar"
		};

		chainLink = new _chainLink2.default(properties);
	});

	it("should call .initialize with the constructor paramters", function () {
		chainLink.initialize.calledWith(properties).should.be.true;
	});
});