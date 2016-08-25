"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arm = function (_ChainLink) {
	_inherits(Arm, _ChainLink);

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
}(_chainLink2.default);

describe("chainLink.link.key", function () {
	var person = void 0,
	    leftArm = void 0;

	describe("(without .into set)", function () {
		var Person = function (_ChainLink2) {
			_inherits(Person, _ChainLink2);

			function Person() {
				_classCallCheck(this, Person);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(Person).apply(this, arguments));
			}

			_createClass(Person, [{
				key: "initialize",
				value: function initialize() {
					this.link("arm", Arm).key("side");
				}
			}]);

			return Person;
		}(_chainLink2.default);

		it("should use the provided key for the link collection", function () {
			person = new Person();
			leftArm = person.arm("left");
			person.links.arm.left.should.eql(leftArm);
		});
	});

	describe("(with .into set)", function () {
		var Person = function (_ChainLink3) {
			_inherits(Person, _ChainLink3);

			function Person() {
				_classCallCheck(this, Person);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(Person).apply(this, arguments));
			}

			_createClass(Person, [{
				key: "initialize",
				value: function initialize() {
					this.link("arm", Arm).into("arms").key("side");
				}
			}]);

			return Person;
		}(_chainLink2.default);

		beforeEach(function () {
			person = new Person();
			leftArm = person.arm("left");
		});

		it("should use the provided key for the into collection", function () {
			person.arms.left.should.eql(leftArm);
		});

		it("should not error when more than one link is instantiated", function () {
			(function () {
				person.arm("right");
			}).should.not.throw();
		});
	});
});