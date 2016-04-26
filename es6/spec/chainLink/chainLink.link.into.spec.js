import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this
			.link("thought", Thought)
			.into("thoughts");
	}
}

class Thought extends ChainLink {}

describe("chainLink.link.into", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return the connection so that chaining is possible", () => {
		const connection = person.link("badThought", Thought);
		const returnValue = connection.into("badThoughts");

		returnValue.should.eql(connection);
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		const thought = person.thought();
		person.thoughts.should.eql([thought]);
	});
});
