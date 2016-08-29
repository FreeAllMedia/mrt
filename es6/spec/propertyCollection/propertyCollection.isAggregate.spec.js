/* Dependencies */
import Component, { PropertyCollection } from "../../lib/component/component.js";
import sinon from "sinon";

describe("propertyCollection.isAggregate", () => {
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

	it("should return false by default", () => {
		propertyCollection.isAggregate.should.be.false;
	});

	it("should return true after .aggregate is called", () => {
		propertyCollection.aggregate;
		propertyCollection.isAggregate.should.be.true;
	});
});
