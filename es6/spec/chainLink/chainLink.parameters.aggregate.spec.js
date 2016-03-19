import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.parameters("nickNames").aggregate;
	}
}

describe(".parameters.aggregate", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return this to enable chaining after setting a value", () => {
		person.nickNames("The Big Bob").should.equal(person);
	});

	it("should save aggregate the values of multiple calls", () => {
		person.nickNames("The Big Bob");
		person.nickNames("Bobarooni");
		person.nickNames().should.eql([
			"The Big Bob",
			"Bobarooni"
		]);
	});
});
