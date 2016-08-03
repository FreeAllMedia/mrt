/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("ParameterCollection.constructor", () => {
	let parentLink,
			propertyNames,
			propertyCollection;

	class ParentLink extends ChainLink {}

	/* Test Setup For Scope */
	beforeEach(() => {
		ParameterCollection.prototype.initialize = sinon.spy(ParameterCollection.prototype.initialize);

		propertyNames = [
			"name",
			"age"
		];

		parentLink = new ParentLink();

		propertyCollection = new ParameterCollection(parentLink, propertyNames);
	});

	it("should return an instance of ParameterCollection", () => {
		propertyCollection.should.be.instanceOf(ParameterCollection);
	});
});
