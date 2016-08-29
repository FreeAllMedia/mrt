import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.properties("originCity").multi;
	}
}

describe(".properties.multi", () => {
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
