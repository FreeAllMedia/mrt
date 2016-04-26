import Person from "../mocks/mockPerson.js";

describe("chainLink.links", () => {
	let person,
			head,
			arm;

	beforeEach(() => {
		person = new Person();
		head = person.head;
		arm = person.arm("left");
	});

	it("should aggregate all links", () => {
		person.links.all.length.should.eql(2);
	});

	it("should sort links-as-properties by type", () => {
		person.links.head.should.eql(head);
	});

	it("should sort regular links using keys by type", () => {
		person.links.arm.should.eql({
			left: arm
		});
	});
});
