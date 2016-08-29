import Component from "../../lib/component/component.js";

describe("component.link.into.object.key", () => {
	let person,
			returnValue,
			container,
			voice;

	class Person extends Component {
		initialize() {
			this.link("thought", Thought).into(container).key("voice");
		}
	}

	class Thought extends Component {
		initialize() {
			this.properties("voice");
			this.voice(voice);
		}
	}

	beforeEach(() => {
		voice = "deep";
		container = {};
		person = new Person();
		returnValue = person.thought();
	});

	it("should add the newly instantiated chain link to the designated collection", () => {
		container[voice].should.eql(returnValue);
	});
});
