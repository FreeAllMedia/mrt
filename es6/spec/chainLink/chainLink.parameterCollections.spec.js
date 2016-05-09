import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.parameters("name");
		this.parameters("age");
	}
}

describe("chainLink.parameterCollections()", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should create a parameter collection for each call to .parameters", () => {
		person.parameterCollections().length.should.eql(2);
	});

	it("should return an array of ParameterCollection", () => {
		person.parameterCollections()[0].should.be.instanceOf(ParameterCollection);
	});
});
