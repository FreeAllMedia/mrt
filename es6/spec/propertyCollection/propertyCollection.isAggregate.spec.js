/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("propertyCollection.isAggregate", () => {
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

	it("should return false by default", () => {
		propertyCollection.isAggregate.should.be.false;
	});

	it("should return true after .aggregate is called", () => {
		propertyCollection.aggregate;
		propertyCollection.isAggregate.should.be.true;
	});
});
