import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize(name) {
		this.parameters("name");
		this.name(name);

		this.link("arm", Arm);
		this.link("pet", Pet);
	}
}

class Arm extends ChainLink {
	initialize(length) {
		this.parameters("length");
		this.length(length);
	}
}

class Pet extends ChainLink {
	initialize(name) {
		this.parameters("name");
		this.name(name);
	}
}

describe("chainLink.link.parameters", () => {
	let person,
			name;

	beforeEach(() => {
		name = "Jake";
		person = new Person(name);
	});

	it("should be able to call parameters on other links", () => {
		person
			.arm()
				.length(5)
			.name().should.eql(name);
	});

	it("should override identical parent parameters", () => {
		const petName = "Fluffy";
		person
			.pet(petName)
				.name().should.eql(petName);
	});
});
