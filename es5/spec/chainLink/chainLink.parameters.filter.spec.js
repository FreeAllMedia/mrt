"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Numbers = function (_ChainLink) {
	_inherits(Numbers, _ChainLink);

	function Numbers() {
		_classCallCheck(this, Numbers);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Numbers).apply(this, arguments));
	}

	_createClass(Numbers, [{
		key: "initialize",
		value: function initialize() {
			this.returnValue = this.parameters("values").aggregate.filter(function (value) {
				return parseInt(value);
			});

			this.parameters("memoryStore").mergeKeyValues.filter(function (value) {
				var newValue = parseInt(value);
				if (newValue) {
					return newValue;
				} else {
					return value;
				}
			});
		}
	}]);

	return Numbers;
}(_chainLink2.default);

describe(".parameters.filter(filterFunction)", function () {
	var numbers = void 0;

	beforeEach(function () {
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", function () {
		numbers.returnValue.should.eql(numbers.parameterCollections()[0]);
	});

	it("should transform raw values", function () {
		numbers.values("1").values("2").values("3").values().should.have.members([1, 2, 3]);
	});

	it("should transform parameters with merged key values", function () {
		numbers.memoryStore({
			"1": "2",
			"3": "4",
			"bob": "belcher"
		}).memoryStore().should.eql({
			"1": 2,
			"3": 4,
			"bob": "belcher"
		});
	});
});