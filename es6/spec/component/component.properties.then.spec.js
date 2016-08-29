import Component from "../../lib/component/component.js";

class Numbers extends Component {
	initialize() {
		this.results = [];
		this.returnValue = this.properties("values")
			.aggregate
			.then(value => {
				this.results.push(value);
			});
	}
}

describe(".properties.then(thenFunction)", () => {
	let numbers;

	beforeEach(() => {
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", () => {
		const propertyCollection = numbers.propertyCollections()[0];
		numbers.returnValue.should.eql(propertyCollection);
	});

	it("should call .then each time the property has a value set", () => {
		numbers
			.values("1")
			.values("2")
			.values("3");
		numbers.results.should.eql([ "1", "2", "3" ]);
	});
});
