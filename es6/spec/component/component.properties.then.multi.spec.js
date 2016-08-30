import Component from "../../lib/component/component.js";

describe(".properties.then(thenFunction)", () => {
	let numbers,
			actualContext,
			results,
			returnValue;

	class Numbers extends Component {
		initialize() {
			returnValue = this.properties("values")
				.multi.aggregate.flat
				.then(function (value) {
					actualContext = this;
					results.push(value);
				});
		}
	}

	beforeEach(() => {
		actualContext = null;
		results = [];
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", () => {
		const propertyCollection = numbers.propertyCollections()[0];
		returnValue.should.eql(propertyCollection);
	});

	it("should call .then each time the property has a value set", () => {
		numbers
			.values("1")
			.values("2")
			.values("3");
		results.should.eql([ "1", "2", "3" ]);
	});

	it("should be called with the correct context", () => {
		numbers.values("1");
		actualContext.should.eql(numbers);
	});
});
