import ChainLink from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {
	initialize() {
		this.properties("short").boolean;
	}
}

describe(".properties.boolean", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should return this to enable chaining", () => {
		person.short.should.equal(person);
	});

	it("should set an 'is' getter to false by default", () => {
		person.isShort.should.eql(false);
	});

	it("should set the properties as a property setter that flips the 'is' getters boolean value", () => {
		person.short;
		person.isShort.should.eql(true);
	});
});
