import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.properties("nickNames").aggregate;
	}
}

describe(".properties.aggregate", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should be set to an empty array by default", () => {
		person.nickNames().should.eql([]);
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
