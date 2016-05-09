/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("parameterCollection.isProperty", () => {
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
		parameterCollection.isProperty.should.be.false;
	});

	it("should return true after .asProperty is called", () => {
		parameterCollection.asProperty;
		parameterCollection.isProperty.should.be.true;
	});
});
