import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.link("thought", Thought).apply(this);
	}
}

class Thought extends Component {
	initialize(...options) {
		this.options = options;
	}
}

describe("component.link.apply", () => {
	let person,
			thought;

	beforeEach(() => {
		person = new Person();
		thought = person.thought(1, 2, 3);
	});

	it("should return this to enable chaining", () => {
		const link = person.link("thought", Thought);
		link.apply(this).should.eql(link);
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		thought.options.should.eql([person, 1, 2, 3]);
	});
});
