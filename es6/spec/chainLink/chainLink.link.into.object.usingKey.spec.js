import ChainLink from "../../lib/chainLink/chainLink.js";

describe("chainLink.link.into.object.usingKey", () => {
	let person,
			returnValue,
			container,
			voice;

	class Person extends ChainLink {
		initialize() {
			this.link("thought", Thought).into(container).usingKey("voice");
		}
	}

	class Thought extends ChainLink {
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
