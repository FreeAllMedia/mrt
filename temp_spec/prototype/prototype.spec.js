import ChainLink, { ParameterCollection } from "./prototype.js";
import Async from "async";

xdescribe("Mr.T. Prototype", () => {
	let person;

	class Person extends ChainLink {}
	class Arm extends ChainLink {
		initialize(position) {
			this.parameters("position");
			this.position(position);
		}
	}
	class Thought extends ChainLink {
		initialize(dialog) {
			this.dialog = dialog;
		}
	}

	beforeEach(() => {
		person = new Person();
	});

	describe("Parameters", () => {
		describe("(With Parameter Names)", () => {
			it("should return a ParameterCollection object", () => {
				person.parameters("name").should.be.instanceOf(ParameterCollection);
			});
		});

		describe("(Without Parameter Names)", () => {
			beforeEach(() => {
				person.parameters("name", "age");
			});

			it("should return an object of all parameter values when set", () => {
				person.name("Bob");
				person.age(44);
				person.parameters().should.eql({
					name: "Bob",
					age: 44
				});
			});

			it("should return an object of all parameter values as undefined when not set", () => {
				person.parameters().should.eql({
					name: null,
					age: null
				});
			});
		});

		describe("(Generated Methods)", () => {
			beforeEach(() => {
				person.parameters("name");
			});

			describe("(Without Modifiers)", () => {
				it("should return this to enable chaining after setting a value", () => {
					person.name("Bob").should.equal(person);
				});

				it("should save parameter values", () => {
					person.name("Bob");
					person.name().should.eql("Bob");
				});
			});

			describe("(With Modifiers)", () => {
				describe("(aggregate)", () => {
					beforeEach(() => {
						person.parameters("nicknames").aggregate;
					});

					it("should aggregate values", () => {
						person.nicknames("Zebraman");
						person.nicknames("The Great Big Screwdriver");
						person.nicknames().should.eql(["Zebraman", "The Great Big Screwdriver"]);
					});
				});

				describe("(multiValue)", () => {
					let parameterCollection,
							multiValue;

					beforeEach(() => {
						parameterCollection = person.parameters("originCity");
						multiValue = parameterCollection.multiValue;
					});

					it("should return this to enable chaining", () => {
						multiValue.should.equal(parameterCollection);
					});

					it("should aggregate values", () => {
						person.originCity("Gotham", "New Jersey");
						person.originCity().should.eql(["Gotham", "New Jersey"]);
					});

					it("should overwrite previous values", () => {
						person.originCity("Gotham", "New Jersey");
						person.originCity("Metropolis", "New Jersey");
						person.originCity().should.eql(["Metropolis", "New Jersey"]);
					});
				});

				describe("(multiValue.aggregate)", () => {
					beforeEach(() => {
						person.parameters("visitedCities").multiValue.aggregate;
					});

					it("should aggregate values", () => {
						person.visitedCities("Gotham", "New Jersey");
						person.visitedCities("Metropolis", "New Jersey");
						person.visitedCities().should.eql([
							["Gotham", "New Jersey"],
							["Metropolis", "New Jersey"]
						]);
					});
				});

				describe("(asProperty)", () => {
					beforeEach(() => {
						person.parameters("short").asProperty;
					});

					it("should set the property to a boolean", () => {
						person.short;
						person.isShort.should.be.true;
					});
				});
			});
		});
	});

	describe("Links", () => {
		describe("(Without Modifiers)", () => {
			beforeEach(() => {
				person
					.link("thought", Thought);
			});

			it("should create a thought when called", () => {
				person.thought().should.be.instanceOf(Thought);
			});

			it("should forward the call's parameters to the link constructor", () => {
				const dialog = "I'm Hungry!";
				const thought = person.thought(dialog);

				thought.dialog.should.eql(dialog);
			});
		});

		describe("(With Modifiers)", () => {
			describe(".into", () => {
				beforeEach(() => {
					person.link("arm", Arm).into("arms");
				});

				it("should add each new instance of Arm into .arms", () => {
					const longArm = person.arm("long");
					const shortArm = person.arm("short");
					person.arms.should.eql([longArm, shortArm]);
				});
			});

			describe(".asProperty", () => {
				beforeEach(() => {
					person.link("thought", Thought);
					person.link("arm", Arm).into("arms").asProperty;
				});

				it("should instantiate the link each time the property is called", () => {
					person
						.thought("What the monkey?")
						.arm
						.arm
						.arm
						.arm; // Machamp

					person.arms.length.should.equal(4);
				});
			});

			describe(".usingKey", () => {
				let leftArm;

				it("should use the provided key for the link collection", () => {
					person.link("arm", Arm).usingKey("position");
					leftArm = person.arm("left");

					person.links.arm.left.should.eql(leftArm);
				});

				it("should use the provided key for the into collection", () => {
					person.link("arm", Arm).into("arms").usingKey("position");
					leftArm = person.arm("left");

					person.arms.left.should.eql(leftArm);
				});
			});

			xdescribe(".into.usingKey", () => {
				beforeEach(() => {
					person.link("arm").into("arms").usingKey("position");
				});
			});
		});

		describe("(Cross-Chain Calls)", () => {
			beforeEach(() => {
				person.link("arm", Arm);
				person.link("thought", Thought);
			});

			it("should be able to call methods on other chains", () => {
				const arm = person.arm();
				const thought = arm.thought();
				thought.should.be.instanceOf(Thought);
			});
		});
	});
});

xdescribe("Just For Fun", () => {
	class Car extends ChainLink {
		initialize(year, make, model) {
			this.parameters("year", "make", "model");
			this.year(year);
			this.make(make);
			this.model(model);

			this.link("wheel", Wheel).into("wheels");
			this.link("dent", Dent).asProperty;
		}

		honk() {
			process.stdout.write("HONK!");
			return this;
		}
	}

	class Wheel extends ChainLink {
		initialize(diameter) {
			this.parameters("diameter");
			this.diameter(diameter);

			this.link("lugNut", LugNut).into("lugNuts");
			this.lugNut("chrome");
		}
	}

	class LugNut extends ChainLink {
		initialize(color) {
			this.parameters("color");
			this.color(color);
		}
	}

	class Dent extends ChainLink {}

	let car;

	beforeEach(() => {
		car = new Car("2016", "Tesla", "S");

		const wheelOne = car.wheel(10);
		const wheelTwo = car.wheel(10);

		Async.times(4, () => {
			wheelOne.lugNut("black");
			wheelTwo.lugNut("chrome");
		});

		car
			.wheel(10)
			.wheel(10);
	});

	it("Should blah", () => {
		//console.log(car.parameters());
		//console.log(car.wheels[0].lugNuts[0].parameters());
	});
});
