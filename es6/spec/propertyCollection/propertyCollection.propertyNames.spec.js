/* Dependencies */
import Component, { PropertyCollection } from "../../lib/component/component.js";
import sinon from "sinon";

describe("propertyCollection.propertyNames()", () => {
	let parentLink,
			propertyNames,
			propertyCollection;

	class ParentLink extends Component {}

	/* Test Setup For Scope */
	beforeEach(() => {
		PropertyCollection.prototype.initialize = sinon.spy(PropertyCollection.prototype.initialize);

		propertyNames = [
			"name",
			"age"
		];

		parentLink = new ParentLink();

		propertyCollection = new PropertyCollection(parentLink, propertyNames);
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
