import Component from "../../lib/component/component.js";

describe("component.link.into", () => {
	let person,
			returnValue,
			container;

	class Person extends Component {
		initialize() {
			this.link("thought", Thought).into(container);
		}
	}

	class Thought extends Component {}

	beforeEach(() => {
		container = [];
		person = new Person();
		returnValue = person.thought();
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		container.should.eql([returnValue]);
	});
});
