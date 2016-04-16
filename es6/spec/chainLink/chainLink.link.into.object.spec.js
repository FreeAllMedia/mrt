import ChainLink from "../../lib/chainLink/chainLink.js";

describe("chainLink.link.into", () => {
	let person,
			returnValue,
			container;

	class Person extends ChainLink {
		initialize() {
			this.link("thought", Thought).into(container);
		}
	}

	class Thought extends ChainLink {}

	beforeEach(() => {
		container = [];
		person = new Person();
		returnValue = person.thought();
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		container.should.eql([returnValue]);
	});
});
