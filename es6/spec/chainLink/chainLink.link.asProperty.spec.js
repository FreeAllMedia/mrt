import Person, { Head, Arm } from "../mocks/mockPerson.js";

describe("chainLink.link.asProperty", () => {
	let person,
			head;

	beforeEach(() => {
		person = new Person();
		head = person.head;
	});

	it("should return a new instance of the ChainLink constructor when called", () => {
		head.should.be.instanceOf(Head);
	});

	it("should add the newly instantiated chain link to the links objects", () => {
		person.links.head.should.eql(head);
	});

	xit("should add the parents links to the new instance", () => {
		person.arm("left").hand(2).arm("right").should.be.instanceOf(Arm);
	});
});
