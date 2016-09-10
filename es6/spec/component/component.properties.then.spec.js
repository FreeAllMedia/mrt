import Component from "../../lib/component/component.js";

describe(".properties.then(thenFunction)", () => {
	let numbers,
			actualContext,
			results,
			returnValue;

	class Numbers extends Component {
		initialize() {
			returnValue = this.properties("value")
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
			.value("1")
			.value("2");

		numbers.value();

		numbers
			.value("3");

		results.should.eql([ "1", "2", "3" ]);
	});

	it("should be called with the correct context", () => {
		numbers.value("1");
		actualContext.should.eql(numbers);
	});
});
