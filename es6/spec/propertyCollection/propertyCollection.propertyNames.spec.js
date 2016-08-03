/* Dependencies */
import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("propertyCollection.propertyNames()", () => {
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

	it("should return this to enable chaining", () => {
		propertyCollection.propertyNames(
			"something"
		).should.eql(propertyCollection);
	});

	it("should be set to the contructor value by default", () => {
		propertyCollection.propertyNames().should.eql(propertyNames);
	});

	it("should be settable", () => {
		propertyNames = [
			"height",
			"width"
		];

		propertyCollection.propertyNames(...propertyNames);
		propertyCollection.propertyNames().should.eql(propertyNames);
	});
});
