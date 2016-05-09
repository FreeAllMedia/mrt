/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("ParameterCollection.constructor", () => {
	let parentLink,
			parameterNames,
			parameterCollection;

	class ParentLink extends ChainLink {}

	/* Test Setup For Scope */
	beforeEach(() => {
		ParameterCollection.prototype.initialize = sinon.spy(ParameterCollection.prototype.initialize);

		parameterNames = [
			"name",
			"age"
		];

		parentLink = new ParentLink();

		parameterCollection = new ParameterCollection(parentLink, parameterNames);
	});

	it("should return an instance of ParameterCollection", () => {
		parameterCollection.should.be.instanceOf(ParameterCollection);
	});
});
