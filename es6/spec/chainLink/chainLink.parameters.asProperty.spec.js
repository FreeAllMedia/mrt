import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.parameters("short").asProperty;
	}
}

describe(".parameters.asProperty", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return this to enable chaining", () => {
		person.short.should.equal(person);
	});
});
