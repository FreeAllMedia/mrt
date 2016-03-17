import ChainLink from "../../lib/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.link("thought", Thought).reverseLink("person");
	}
}

class Thought extends ChainLink {
	initialize(description) {
		this.parameters("description");
		this.description(description);
	}
}

xdescribe(".link(name, constructor)", () => {
	let person;

	beforeEach(() => {
		person = new Person();

		person.thought("I wonder how many paperclips it would take to reach from here to the moon?");
	});
});
