import Component from "../../lib/component/component.js";

class Numbers extends Component {
	initialize() {
		this.returnValue = this.properties("values")
			.aggregate
			.filter(value => parseInt(value));

		this.properties("memoryStore")
			.merged
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

describe(".properties.filter(filterFunction)", () => {
	let numbers;

	beforeEach(() => {
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", () => {
		numbers.returnValue.should.eql(numbers.propertyCollections()[0]);
	});

	it("should transform raw values", () => {
		numbers
		.values("1")
		.values("2")
		.values("3")
		.values()
		.should.have.members([1, 2, 3]);
	});

	it("should transform properties with mergedd key values", () => {
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
