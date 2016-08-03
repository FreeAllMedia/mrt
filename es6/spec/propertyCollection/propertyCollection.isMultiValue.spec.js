/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("propertyCollection.isMultiValue", () => {
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
		propertyCollection.isMultiValue.should.be.false;
	});

	it("should return true after .multiValue is called", () => {
		propertyCollection.multiValue;
		propertyCollection.isMultiValue.should.be.true;
	});
});
