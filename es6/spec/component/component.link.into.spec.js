import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this
			.link("thought", Thought)
			.into("thoughts");
	}
}

class Thought extends Component {}

describe("component.link.into", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return the link so that chaining is possible", () => {
		const link = person.link("badThought", Thought);
		const returnValue = link.into("badThoughts");

		returnValue.should.eql(link);
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		const thought = person.thought();
		person.thoughts.should.eql([thought]);
	});
});
