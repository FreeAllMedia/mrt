/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("parameterCollection.isMultiValue", () => {
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

	it("should return false by default", () => {
		parameterCollection.isMultiValue.should.be.false;
	});

	it("should return true after .multiValue is called", () => {
		parameterCollection.multiValue;
		parameterCollection.isMultiValue.should.be.true;
	});
});
