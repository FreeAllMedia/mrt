import Component, { PropertyCollection } from "../../lib/component/component.js";

class Person extends Component {}

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

		it("should return a PropertyCollection object", () => {
			returnValue.should.be.instanceOf(PropertyCollection);
		});
	});

	describe("(Without Values Provided)", () => {
		let returnValue;

		describe("(With Properties Defined)", () => {
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

			describe("(With Properties Set)", () => {
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

		describe("(Without Properties Defined)", () => {
			beforeEach(() => {
				returnValue = person.properties();
			});

			it("should return an empty object", () => {
				returnValue.should.eql({});
			});
		});
	});
});
