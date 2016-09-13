import Component from "../../lib/component/component.js";

class Person extends Component {
	initialize() {
		this.properties("dna", "color");
		this.properties("numb").boolean;

		this.link("arm", Arm)
			.inherit("dna", "color", "numb");
	}
}

class Arm extends Component {
	initialize() {
		this.properties("dna", "color");
		this.properties("numb").boolean;
	}
}

describe("component.link.inherit", () => {
	let person,
			arm,
			dna,
			color;

	beforeEach(() => {
		dna = "AGDEAGA";
		color = "skin";
		person = new Person();

		person
			.dna(dna)
			.color(color)
			.numb;

		arm = person.arm();
	});

	it("copy the inherited properties to the newly instantiated chain link", () => {
		const values = {
			dna: arm.dna(),
			color: arm.color(),
			isNumb: arm.isNumb
		};

		values.should.eql({
			dna: dna,
			color: color,
			isNumb: true
		});
	});
});
