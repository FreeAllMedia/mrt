import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.link("arm", Arm);
	}

	yell() {}
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
		person.arm("left").yell.should.eql(person.constructor.prototype.yell);
	});
});
