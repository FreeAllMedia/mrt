"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe("component.link.then", function () {
	var person = void 0,
	    thought = void 0,
	    thenFunction = void 0;

	var Person = function (_Component) {
		_inherits(Person, _Component);

		function Person() {
			_classCallCheck(this, Person);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Person).apply(this, arguments));
		}

		_createClass(Person, [{
			key: "initialize",
			value: function initialize() {
				this.link("thought", Thought).then(thenFunction);
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

		return Thought;
	}(_component2.default);

	beforeEach(function () {
		thenFunction = _sinon2.default.spy(function (component) {
			component.thenCalledWith = component;
		});

		person = new Person();
		thought = person.thought();
	});

	it("should call then with the newly instantiated component", function () {
		thought.thenCalledWith.should.eql(thought);
	});
});