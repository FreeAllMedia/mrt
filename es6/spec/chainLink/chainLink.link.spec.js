import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.link("thought", Thought);
		this.link("arm", Arm);
	}
}

class Thought extends ChainLink {
	initialize(dialog) {
		this.parameters("dialog");
		this.dialog(dialog);
	}
}

class Arm extends ChainLink {
	initialize(side) {
		this.parameters("side");
		this.side(side);
	}
}

describe("chainLink.link", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should create a thought when called", () => {
		person.thought().should.be.instanceOf(Thought);
	});

	it("should forward the call's parameters to the link constructor", () => {
		const dialog = "I'm Hungry!";
		const thought = person.thought(dialog);

		thought.dialog().should.eql(dialog);
	});

	describe("(Cross-Chain Calls)", () => {
		it("should be able to call methods on other chains", () => {
			const thought = person.arm().thought();
			thought.should.be.instanceOf(Thought);
		});
	});
});
