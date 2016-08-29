"use strict";

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Dependencies */
describe("Component.constructor", function () {
	var properties = void 0,
	    component = void 0;

	/* Test Setup For Scope */
	beforeEach(function () {
		_component2.default.prototype.initialize = _sinon2.default.spy(_component2.default.prototype.initialize);

		properties = {
			foo: "bar"
		};

		component = new _component2.default(properties);
	});

	it("should call .initialize with the constructor paramters", function () {
		component.initialize.calledWith(properties).should.be.true;
	});
});