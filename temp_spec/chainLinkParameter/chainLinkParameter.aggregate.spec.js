import ChainLink from "../../lib/chainLink.js";

class Cat extends ChainLink {
	initialize() {
		this.parameters("nickname").aggregate;
	}
}

describe(".parameters([...newParameters]).aggregate", () => {
	let person;

	beforeEach(() => {
		person = new Cat();
		person.nickname("Crusty");
		person.nickname("Smelly");
		person.nickname("Whiney");
	});

	it("should return `this` to enable chaining", () => {
		person.parameters("")
	});

	xit("should add multiple values into an aggregate array", () => {
		person.nickname().should.eql(["Crusty", "Smelly", "Whiney"]);
	});

	xit("should add a method to clear the aggregate array", () => {
		person.nicknameClear();
		person.nickname().should.eql([]);
	});
});
