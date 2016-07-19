import ChainLink from "../../lib/chainLink/chainLink.js";

class Numbers extends ChainLink {
	initialize() {
		this.returnValue = this.parameters("values")
			.aggregate
			.filter(value => parseInt(value));

		this.parameters("memoryStore")
			.merge
			.filter(value => {
				const newValue = parseInt(value);
				if (newValue) {
					return newValue;
				} else {
					return value;
				}
			});
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

	it("should transform raw values", () => {
		numbers
		.values("1")
		.values("2")
		.values("3")
		.values()
		.should.have.members([1, 2, 3]);
	});

	it("should transform parameters with merged key values", () => {
		numbers
		.memoryStore({
			"1": "2",
			"3": "4",
			"bob": "belcher"
		})
		.memoryStore()
		.should.eql({
			"1": 2,
			"3": 4,
			"bob": "belcher"
		});
	});
});
