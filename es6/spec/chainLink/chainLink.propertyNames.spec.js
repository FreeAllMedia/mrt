import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize(name, age) {
		this.properties("name", "age");
		this.name(name);
		this.age(age);
	}
}

describe("chainLink.link.properties", () => {
	let person,
			name,
			age;

	beforeEach(() => {
		name = "Jake";
		age = "21";
		person = new Person(name, age);
	});

	it("should be able to call properties on other links", () => {
		person.propertyNames().should.eql(["name", "age"]);
	});
});
