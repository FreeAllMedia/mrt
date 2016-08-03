"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Person = function (_ChainLink) {
	_inherits(Person, _ChainLink);

	function Person() {
		_classCallCheck(this, Person);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Person).apply(this, arguments));
	}

	_createClass(Person, [{
		key: "initialize",
		value: function initialize() {
			this.properties("placesLived").multiValue.aggregate;
		}
	}]);

	return Person;
}(_chainLink2.default);

describe(".properties.multiValue.aggregate", function () {
	var person = void 0;

	beforeEach(function () {
		person = new Person();
	});

	it("should be set to an empty array by default", function () {
		person.placesLived().should.eql([]);
	});

	it("should return this to enable chaining after setting a value", function () {
		person.placesLived("Denver", "Colorado").should.equal(person);
	});

	it("should save aggregate the values of multiple calls", function () {
		person.placesLived("Denver", "Colorado");
		person.placesLived("Colorado Springs", "Colorado");
		person.placesLived().should.eql([["Denver", "Colorado"], ["Colorado Springs", "Colorado"]]);
	});
});