import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize(name) {
		this.properties("name");
		this.name(name);

		this.link("arm", Arm);
		this.link("pet", Pet);
	}
}

class Arm extends Component {
	initialize(length) {
		this.properties("length");
		this.length(length);
	}
}

class Pet extends Component {
	initialize(name) {
		this.properties("name");
		this.name(name);
	}
}

describe("component.link.properties", () => {
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
