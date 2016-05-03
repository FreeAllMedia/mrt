"use strict";

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Dependencies */


describe("ChainLink.constructor", function () {
	var parameters = void 0,
	    chainLink = void 0;

	/* Test Setup For Scope */
	beforeEach(function () {
		_chainLink2.default.prototype.initialize = _sinon2.default.spy(_chainLink2.default.prototype.initialize);

		parameters = {
			foo: "bar"
		};

		chainLink = new _chainLink2.default(parameters);
	});

	it("should call .initialize with the constructor paramters", function () {
		chainLink.initialize.calledWith(parameters).should.be.true;
	});
});