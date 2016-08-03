import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.properties("name");
	}
}

describe(".properties.methods", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return this to enable chaining after setting a value", () => {
		person.name("Bob").should.equal(person);
	});

	it("should save property values", () => {
		person.name("Bob");
		person.name().should.eql("Bob");
	});
});
