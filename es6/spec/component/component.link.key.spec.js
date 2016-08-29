import Component from "../../lib/component/component.js";

class Arm extends Component {
	initialize(side) {
		this.properties("side");
		this.side(side);
	}
}

describe("component.link.key", () => {
	let person,
			leftArm;

	describe("(without .into set)", () => {
		class Person extends Component {
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
		class Person extends Component {
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
