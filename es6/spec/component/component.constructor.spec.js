/* Dependencies */
import Component from "../../lib/component/component.js";
import sinon from "sinon";

describe("Component.constructor", () => {
	let properties,
			component;

	/* Test Setup For Scope */
	beforeEach(() => {
		Component.prototype.initialize = sinon.spy(Component.prototype.initialize);

		properties = {
			foo: "bar"
		};

		component = new Component(properties);
	});

	it("should call .initialize with the constructor paramters", () => {
		component.initialize.calledWith(properties).should.be.true;
	});
});
