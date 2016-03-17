import ChainLink from "../lib/chainLink.js";
import sinon from "sinon";

describe("Chain.constructor()", () => {
	let person,
			name,
			age,
			initializeSpy;

	class Person extends ChainLink {
		initialize(newName, newAge) {
			initializeSpy(newName, newAge);
		}
	}

	beforeEach(() => {
		initializeSpy = sinon.spy();
		name = "Bob Belcher";
		age = 44;
		person = new Person(name, age);
	});

	it("should stub .initialize", () => {
		class BlankComponent extends ChainLink {}
		person = new BlankComponent();
		(typeof person.initialize).should.eql("function");
	});

	it("should call .initialize with all constructor parameters", () => {
		initializeSpy.calledWith(name, age).should.be.true;
	});
});
