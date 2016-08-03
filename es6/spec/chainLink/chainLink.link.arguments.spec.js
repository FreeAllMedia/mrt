import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.link("thought", Thought).arguments(this);
	}
}

class Thought extends ChainLink {
	initialize(...options) {
		this.options = options;
	}
}

describe("chainLink.link.arguments", () => {
	let person,
			thought;

	beforeEach(() => {
		person = new Person();
		thought = person.thought(1, 2, 3);
	});

	it("should return this to enable chaining", () => {
		const connection = person.link("thought", Thought);
		connection.arguments(this).should.eql(connection);
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		thought.options.should.eql([person, 1, 2, 3]);
	});
});
