"use strict";

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Person = function (_Component) {
	_inherits(Person, _Component);

	function Person() {
		_classCallCheck(this, Person);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Person).apply(this, arguments));
	}

	return Person;
}(_component2.default);

describe(".properties", function () {
	var person = void 0;

	beforeEach(function () {
		person = new Person();
	});

	describe("(With Values Provided)", function () {
		var returnValue = void 0;

		beforeEach(function () {
			returnValue = person.properties("name");
		});

		it("should return a PropertyCollection object", function () {
			returnValue.should.be.instanceOf(_component.PropertyCollection);
		});
	});

	describe("(Without Values Provided)", function () {
		var returnValue = void 0;

		describe("(With Properties Defined)", function () {
			beforeEach(function () {
				person.properties("name", "age");
				returnValue = person.properties();
			});

			it("should return an object of all property values as null when not set", function () {
				returnValue.should.eql({
					name: null,
					age: null
				});
			});

			describe("(With Properties Set)", function () {
				beforeEach(function () {
					person.name("Bob");
					person.age(44);
					returnValue = person.properties();
				});

				it("should return an object of all property values when set", function () {
					returnValue.should.eql({
						name: "Bob",
						age: 44
					});
				});
			});
		});

		describe("(Without Properties Defined)", function () {
			beforeEach(function () {
				returnValue = person.properties();
			});

			it("should return an empty object", function () {
				returnValue.should.eql({});
			});
		});
	});
});