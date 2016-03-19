import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.parameters("originCity").multiValue;
	}
}

describe(".parameters.multiValue", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return this to enable chaining after setting a value", () => {
		person.originCity("Gotham", "New Jersey").should.equal(person);
	});

	it("should save the latest provided multiple values", () => {
		person.originCity("Metropolis", "Delaware");
		person.originCity("Gotham", "New Jersey");
		person.originCity().should.eql([
			"Gotham",
			"New Jersey"
		]);
	});
});
