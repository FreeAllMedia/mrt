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
		value: function initialize(name) {
			this.parameters("name");
			this.name(name);

			this.link("arm", Arm);
			this.link("pet", Pet);
		}
	}]);

	return Person;
}(_chainLink2.default);

var Arm = function (_ChainLink2) {
	_inherits(Arm, _ChainLink2);

	function Arm() {
		_classCallCheck(this, Arm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Arm).apply(this, arguments));
	}

	_createClass(Arm, [{
		key: "initialize",
		value: function initialize(length) {
			this.parameters("length");
			this.length(length);
		}
	}]);

	return Arm;
}(_chainLink2.default);

var Pet = function (_ChainLink3) {
	_inherits(Pet, _ChainLink3);

	function Pet() {
		_classCallCheck(this, Pet);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Pet).apply(this, arguments));
	}

	_createClass(Pet, [{
		key: "initialize",
		value: function initialize(name) {
			this.parameters("name");
			this.name(name);
		}
	}]);

	return Pet;
}(_chainLink2.default);

describe("chainLink.link.parameters", function () {
	var person = void 0,
	    name = void 0;

	beforeEach(function () {
		name = "Jake";
		person = new Person(name);
	});

	it("should be able to call parameters on other links", function () {
		person.arm().length(5).name().should.eql(name);
	});

	it("should override identical parent parameters", function () {
		var petName = "Fluffy";
		person.pet(petName).name().should.eql(petName);
	});
});