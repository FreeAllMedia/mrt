import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize(name, age) {
		this.properties("name", "age");
		this.name(name);
		this.age(age);
	}
}

describe("component.link.properties", () => {
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
