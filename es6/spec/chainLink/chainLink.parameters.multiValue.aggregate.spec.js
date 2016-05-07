import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.parameters("placesLived").multiValue.aggregate;
	}
}

describe(".parameters.multiValue.aggregate", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should be set to an empty array by default", () => {
		person.placesLived().should.eql([]);
	});

	it("should return this to enable chaining after setting a value", () => {
		person.placesLived("Denver", "Colorado").should.equal(person);
	});

	it("should save aggregate the values of multiple calls", () => {
		person.placesLived("Denver", "Colorado");
		person.placesLived("Colorado Springs", "Colorado");
		person.placesLived().should.eql([
			["Denver", "Colorado"],
			["Colorado Springs", "Colorado"]
		]);
	});
});
