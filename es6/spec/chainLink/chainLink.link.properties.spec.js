import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize(name) {
		this.properties("name");
		this.name(name);

		this.link("arm", Arm);
		this.link("pet", Pet);
	}
}

class Arm extends ChainLink {
	initialize(length) {
		this.properties("length");
		this.length(length);
	}
}

class Pet extends ChainLink {
	initialize(name) {
		this.properties("name");
		this.name(name);
	}
}

describe("chainLink.link.properties", () => {
	let person,
			name;

	beforeEach(() => {
		name = "Jake";
		person = new Person(name);
	});

	it("should be able to call properties on other links", () => {
		person
			.arm()
				.length(5)
			.name().should.eql(name);
	});

	it("should override identical parent properties", () => {
		const petName = "Fluffy";
		person
			.pet(petName)
				.name().should.eql(petName);
	});
});
