import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.link("thought", Thought).usingParameters(this);
	}
}

class Thought extends ChainLink {
	initialize(...options) {
		this.options = options;
	}
}

describe("chainLink.link.usingParameters", () => {
	let person,
			thought;

	beforeEach(() => {
		person = new Person();
		thought = person.thought(1, 2, 3);
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		thought.options.should.eql([person, 1, 2, 3]);
	});
});
