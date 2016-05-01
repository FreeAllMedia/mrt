import Person from "../mocks/mockPerson.js";

import serializedPersonJson from "../fixtures/person.json";

describe("chainLink.serialize()", () => {
	let person,
			serializedJson;

	beforeEach(() => {
		person = new Person();

		person
			.name("Bob")
			.arm("left")
				.hand(5)
			.arm("right")
				.hand(4);

		person.thought("I'm alive!");
		person.thought("I'm hungry!");

		serializedJson = person.serialize();
	});

	it("should serialize the ChainLink into JSON", () => {
		serializedJson.should.eql(serializedPersonJson);
	});
});
