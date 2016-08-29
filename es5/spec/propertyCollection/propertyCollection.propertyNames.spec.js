"use strict";

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Dependencies */


describe("propertyCollection.propertyNames()", function () {
	var parentLink = void 0,
	    propertyNames = void 0,
	    propertyCollection = void 0;

	var ParentLink = function (_Component) {
		_inherits(ParentLink, _Component);

		function ParentLink() {
			_classCallCheck(this, ParentLink);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ParentLink).apply(this, arguments));
		}

		return ParentLink;
	}(_component2.default);

	/* Test Setup For Scope */


	beforeEach(function () {
		_component.PropertyCollection.prototype.initialize = _sinon2.default.spy(_component.PropertyCollection.prototype.initialize);

		propertyNames = ["name", "age"];

		parentLink = new ParentLink();

		propertyCollection = new _component.PropertyCollection(parentLink, propertyNames);
	});

	it("should return this to enable chaining", function () {
		propertyCollection.propertyNames("something").should.eql(propertyCollection);
	});

	it("should be set to the contructor value by default", function () {
		propertyCollection.propertyNames().should.eql(propertyNames);
	});

	it("should be settable", function () {
		var _propertyCollection;

		propertyNames = ["height", "width"];

		(_propertyCollection = propertyCollection).propertyNames.apply(_propertyCollection, _toConsumableArray(propertyNames));
		propertyCollection.propertyNames().should.eql(propertyNames);
	});
});