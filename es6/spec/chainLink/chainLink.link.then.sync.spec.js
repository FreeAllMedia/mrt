import ChainLink from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("chainLink.link.then", () => {
	let person,
			thought,
			thenFunction;

	class Person extends ChainLink {
		initialize() {
			this
				.link("thought", Thought)
					.then(thenFunction);
		}
	}

	class Thought extends ChainLink {}

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
