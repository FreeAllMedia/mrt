import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.properties(
			"placesLived"
		).multi.aggregate.flat;
	}
}

describe("propertyCollection.flat", () => {
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
			"Denver", "Colorado",	"Colorado Springs", "Colorado"
		]);
	});
});
