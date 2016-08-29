import Component, { PropertyCollection } from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.properties("name");
		this.properties("age");
	}
}

describe("component.propertyCollections()", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should create a property collection for each call to .properties", () => {
		person.propertyCollections().length.should.eql(2);
	});

	it("should return an array of PropertyCollection", () => {
		person.propertyCollections()[0].should.be.instanceOf(PropertyCollection);
	});
});
