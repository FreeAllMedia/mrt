/* Dependencies */
import Component, { PropertyCollection } from "../../lib/component/component.js";
import sinon from "sinon";

describe("PropertyCollection.constructor", () => {
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

	it("should return an instance of PropertyCollection", () => {
		propertyCollection.should.be.instanceOf(PropertyCollection);
	});
});
