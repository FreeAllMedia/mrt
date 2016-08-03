import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.properties("name");
		this.properties("age");
	}
}

describe("chainLink.propertyCollections()", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should create a property collection for each call to .properties", () => {
		person.propertyCollections().length.should.eql(2);
	});

	it("should return an array of ParameterCollection", () => {
		person.propertyCollections()[0].should.be.instanceOf(ParameterCollection);
	});
});
