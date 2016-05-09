/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("parameterCollection.parameterNames()", () => {
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

	it("should return this to enable chaining", () => {
		parameterCollection.parameterNames(
			"something"
		).should.eql(parameterCollection);
	});

	it("should be set to the contructor value by default", () => {
		parameterCollection.parameterNames().should.eql(parameterNames);
	});

	it("should be settable", () => {
		parameterNames = [
			"height",
			"width"
		];

		parameterCollection.parameterNames(...parameterNames);
		parameterCollection.parameterNames().should.eql(parameterNames);
	});
});
