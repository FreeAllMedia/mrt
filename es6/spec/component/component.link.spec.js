import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.link("thought", Thought);
		this.link("arm", Arm);
	}
}

class Thought extends Component {
	initialize(dialog) {
		this.properties("dialog");
		this.dialog(dialog);
	}
}

class Arm extends Component {
	initialize(side) {
		this.properties("side");
		this.side(side);
	}
}

describe("component.link", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should create a thought when called", () => {
		person.thought().should.be.instanceOf(Thought);
	});

	it("should forward the call's properties to the link constructor", () => {
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
