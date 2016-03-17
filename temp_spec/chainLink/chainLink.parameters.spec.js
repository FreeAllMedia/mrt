import ChainLink from "../../lib/chainLink.js";

class Person extends ChainLink {
	initialize(newName, newAge) {
		this.parameters("name", "age");
		this.name(newName);
		this.age(newAge);
	}
}

describe(".parameters([...newParameters])", () => {
	let person,
			name,
			age;

	beforeEach(() => {
		name = "Bob Belcher";
		age = 44;
		person = new Person(name, age);
	});

	it("should return `this` to enable chaining", () => {
		person.parameters("hairColor").should.eql(person);
	});

	it("should create a getter and setter function for each new parameter", () => {
		(person.name() === name && person.age() === age).should.be.true;
	});

	it("should create a getter and setter function for each new parameter", () => {
		person.parameters().should.eql({
			name: name,
			age: age
		});
	});
});
