import Chain from "../../lib/mrt.js";
import sinon from "sinon";

let initializeSpy;

class Component extends Chain {
	initialize(newName, newAge) {
		initializeSpy(newName, newAge);
	}
}

describe(".aggregateValueParameters(...parameterNames)", () => {
	let component,
			name,
			age;

	beforeEach(() => {
		initializeSpy = sinon.spy();
		name = "Bob Belcher";
		age = 44;
		component = new Component(name, age);
	});

	it("should create a getter and setter function for each new parameter with aggregate values", () => {
		let valueOne = "SomeValue";
		let valueTwo = "AnotherValue";
		let valueThree = "YetAnotherValue";

		component.aggregateValueParameters("something");
		component.something(valueOne);
		component.something(valueTwo, valueThree);

		component.something().should.eql([
			valueOne,
			valueTwo,
			valueThree
		]);
	});
});
