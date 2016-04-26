import Person from "../mocks/mockPerson.js";

describe("chainLink.connections", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	it("should aggregate all connections", () => {
		person.connections.length.should.eql(2);
	});
});
