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
			this.properties("dna", "color");
			this.properties("numb").boolean;

			this.link("arm", Arm).inherit("dna", "color", "numb");
		}
	}]);

	return Person;
}(_component2.default);

var Arm = function (_Component2) {
	_inherits(Arm, _Component2);

	function Arm() {
		_classCallCheck(this, Arm);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Arm).apply(this, arguments));
	}

	_createClass(Arm, [{
		key: "initialize",
		value: function initialize() {
			this.properties("dna", "color");
			this.properties("numb").boolean;
		}
	}]);

	return Arm;
}(_component2.default);

describe("component.link.inherit", function () {
	var person = void 0,
	    arm = void 0,
	    dna = void 0,
	    color = void 0;

	beforeEach(function () {
		dna = "AGDEAGA";
		color = "skin";
		person = new Person();

		person.dna(dna).color(color).numb;

		arm = person.arm();
	});

	it("copy the inherited properties to the newly instantiated chain link", function () {
		var values = {
			dna: arm.dna(),
			color: arm.color(),
			isNumb: arm.isNumb
		};

		values.should.eql({
			dna: dna,
			color: color,
			isNumb: true
		});
	});
});