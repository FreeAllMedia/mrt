import ChainLink from "../../lib/chainLink/chainLink.js";

const useVoice = Symbol();

class Person extends ChainLink {
	initialize() {
		this.link("arm", Arm);
	}

	yell() {
		this[useVoice]();
	}

	[useVoice]() {}
}

class Arm extends ChainLink {
	initialize(side) {
		this.parameters("side");
		this.side(side);
	}
}

describe("chainLink.link (custom function)", () => {
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