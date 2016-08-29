import Component from "../../lib/component/component.js";

const useVoice = Symbol();

class Person extends Component {
	initialize() {
		this.link("arm", Arm);
	}

	yell() {
		this[useVoice]();
	}

	[useVoice]() {}
}

class Arm extends Component {
	initialize(side) {
		this.properties("side");
		this.side(side);
	}
}

describe("component.link (custom function)", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should copy custom functions from parent links to child links", () => {
		person.arm("left").should.respondTo("yell");
	});

	it("should bind the parent function to the child link", () => {
		(() => {
			person
				.arm("left")
				.yell("Wubba Lubba Dub Dub!");
		}).should.not.throw();
	});
});
