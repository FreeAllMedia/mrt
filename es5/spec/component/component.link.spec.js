"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	_createClass(Person, [{
		key: "initialize",
		value: function initialize() {
			this.link("thought", Thought);
			this.link("arm", Arm);
		}
	}]);

	return Person;
}(_component2.default);

var Thought = function (_Component2) {
	_inherits(Thought, _Component2);

	function Thought() {
		_classCallCheck(this, Thought);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Thought).apply(this, arguments));
	}

	_createClass(Thought, [{
		key: "initialize",
		value: function initialize(dialog) {
			this.properties("dialog");
			this.dialog(dialog);
		}
	}]);

	return Thought;
}(_component2.default);

var Arm = function (_Component3) {
	_inherits(Arm, _Component3);

	function Arm() {
		_classCallCheck(this, Arm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Arm).apply(this, arguments));
	}

	_createClass(Arm, [{
		key: "initialize",
		value: function initialize(side) {
			this.properties("side");
			this.side(side);
		}
	}]);

	return Arm;
}(_component2.default);

describe("component.link", function () {
	var person = void 0;

	beforeEach(function () {
		person = new Person();
	});

	it("should create a thought when called", function () {
		person.thought().should.be.instanceOf(Thought);
	});

	it("should forward the call's properties to the link constructor", function () {
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