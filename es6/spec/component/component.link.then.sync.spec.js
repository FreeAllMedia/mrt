import Component from "../../lib/component/component.js";
import sinon from "sinon";

describe("component.link.then", () => {
	let person,
			thought,
			thenFunction;

	class Person extends Component {
		initialize() {
			this
				.link("thought", Thought)
					.then(thenFunction);
		}
	}

	class Thought extends Component {}

	beforeEach(() => {
		thenFunction = sinon.spy(component => {
			component.thenCalledWith = component;
		});

		person = new Person();
		thought = person.thought();
	});

	it("should call then with the newly instantiated component", () => {
		thought.thenCalledWith.should.eql(thought);
	});
});
