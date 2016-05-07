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
			this.link("thought", Thought);
			this.link("arm", Arm);
		}
	}]);

	return Person;
}(_chainLink2.default);

var Thought = function (_ChainLink2) {
	_inherits(Thought, _ChainLink2);

	function Thought() {
		_classCallCheck(this, Thought);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Thought).apply(this, arguments));
	}

	_createClass(Thought, [{
		key: "initialize",
		value: function initialize(dialog) {
			this.parameters("dialog");
			this.dialog(dialog);
		}
	}]);

	return Thought;
}(_chainLink2.default);

var Arm = function (_ChainLink3) {
	_inherits(Arm, _ChainLink3);

	function Arm() {
		_classCallCheck(this, Arm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Arm).apply(this, arguments));
	}

	_createClass(Arm, [{
		key: "initialize",
		value: function initialize(side) {
			this.parameters("side");
			this.side(side);
		}
	}]);

	return Arm;
}(_chainLink2.default);

describe("chainLink.link", function () {
	var person = void 0;

	beforeEach(function () {
		person = new Person();
	});

	it("should create a thought when called", function () {
		person.thought().should.be.instanceOf(Thought);
	});

	it("should forward the call's parameters to the link constructor", function () {
		var dialog = "I'm Hungry!";
		var thought = person.thought(dialog);

		thought.dialog().should.eql(dialog);
	});

	describe("(Cross-Chain Calls)", function () {
		it("should be able to call methods on other chains", function () {
			var thought = person.arm().thought();
			thought.should.be.instanceOf(Thought);
		});
	});
});