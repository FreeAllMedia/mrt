import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize(name, age) {
		this.parameters("name", "age");
		this.name(name);
		this.age(age);
	}
}

describe("chainLink.link.parameters", () => {
	let person,
			name,
			age;

	beforeEach(() => {
		name = "Jake";
		age = "21";
		person = new Person(name, age);
	});

	it("should be able to call parameters on other links", () => {
		person.parameterNames().should.eql(["name", "age"]);
	});
});
