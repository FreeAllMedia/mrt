import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.returnValue = this.properties("answers").merged;
	}
}

describe(".properties.merged", () => {
	let person,
			answersOne,
			answersTwo;

	beforeEach(() => {
		person = new Person();

		answersOne = {
			"Bob": "Builder",
			"Thomas": "Engine"
		};

		answersTwo = {
			"Bob": "Belcher"
		};
	});

	it("should be set to an empty object by default", () => {
		person.answers().should.eql({});
	});

	it("should return this to enable chaining after setting a value", () => {
		person.returnValue.should.eql(person.propertyCollections()[0]);
	});

	it("should save aggregate the values of multiple calls", () => {
		person
			.answers(answersOne)
			.answers(answersTwo);

		const expectedMergedAnswers = {
			"Bob": "Belcher",
			"Thomas": "Engine"
		};

		person.answers().should.eql(expectedMergedAnswers);
	});
});
