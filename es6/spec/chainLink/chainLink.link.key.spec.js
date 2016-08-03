import ChainLink from "../../lib/chainLink/chainLink.js";

class Arm extends ChainLink {
	initialize(side) {
		this.properties("side");
		this.side(side);
	}
}

describe("chainLink.link.key", () => {
	let person,
			leftArm;

	describe("(without .into set)", () => {
		class Person extends ChainLink {
			initialize() {
				this.link("arm", Arm).key("side");
			}
		}

		it("should use the provided key for the link collection", () => {
			person = new Person();
			leftArm = person.arm("left");
			person.links.arm.left.should.eql(leftArm);
		});
	});

	describe("(with .into set)", () => {
		class Person extends ChainLink {
			initialize() {
				this.link("arm", Arm).into("arms").key("side");
			}
		}

		beforeEach(() => {
			person = new Person();
			leftArm = person.arm("left");
		});

		it("should use the provided key for the into collection", () => {
			person.arms.left.should.eql(leftArm);
		});

		it("should not error when more than one link is instantiated", () => {
			(() => {
				person.arm("right");
			}).should.not.throw();
		});
	});
});
