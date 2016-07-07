import ChainLink from "../../lib/chainLink/chainLink.js";

class Numbers extends ChainLink {
	initialize() {
		this.returnValue = this.parameters("values")
			.aggregate
			.filter(value => parseInt(value));
	}
}

describe(".parameters.filter(filterFunction)", () => {
	let numbers;

	beforeEach(() => {
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", () => {
		numbers.returnValue.should.eql(numbers.parameterCollections()[0]);
	});

	it("should transform values based upon the filter function return value", () => {
		numbers
		.values("1")
		.values("2")
		.values("3")
		.values()
		.should.have.members([1, 2, 3]);
	});
});
