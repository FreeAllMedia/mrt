import ChainLink, { ParameterCollection } from "../../lib/chainLink/chainLink.js";

class Person extends ChainLink {}

describe(".properties", () => {
	let person;

	beforeEach(() => {
		person = new Person();
	});

	describe("(With Values Provided)", () => {
		let returnValue;

		beforeEach(() => {
			returnValue = person.properties("name");
		});

		it("should return a ParameterCollection object", () => {
			returnValue.should.be.instanceOf(ParameterCollection);
		});
	});

	describe("(Without Values Provided)", () => {
		let returnValue;

		describe("(With Parameters Defined)", () => {
			beforeEach(() => {
				person.properties("name", "age");
				returnValue = person.properties();
			});

			it("should return an object of all property values as null when not set", () => {
				returnValue.should.eql({
					name: null,
					age: null
				});
			});

			describe("(With Parameters Set)", () => {
				beforeEach(() => {
					person.name("Bob");
					person.age(44);
					returnValue = person.properties();
				});

				it("should return an object of all property values when set", () => {
					returnValue.should.eql({
						name: "Bob",
						age: 44
					});
				});
			});
		});

		describe("(Without Parameters Defined)", () => {
			beforeEach(() => {
				returnValue = person.properties();
			});

			it("should return an empty object", () => {
				returnValue.should.eql({});
			});
		});
	});
});
