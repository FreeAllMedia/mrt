import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.returnValue = this.parameters("answers").mergeKeyValues;
	}
}

describe(".parameters.mergeKeyValues", () => {
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
		person.returnValue.should.eql(person.parameterCollections()[0]);
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
