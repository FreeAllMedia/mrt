import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.link("thought", Thought).getter;
	}
}

class Thought extends Component {}

describe("component.link.getter", () => {
	let person,
			returnValue;

	beforeEach(() => {
		person = new Person();
		returnValue = person.thought;
	});

	it("should return a new instance of the Component constructor when called", () => {
		returnValue.should.be.instanceOf(Thought);
	});

	it("should add the newly instantiated chain link to the links objects", () => {
		person.links.thought.should.eql([returnValue]);
	});
});
