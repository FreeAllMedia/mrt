"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

describe(".properties.then(thenFunction)", function () {
	var numbers = void 0,
	    actualContext = void 0,
	    results = void 0,
	    returnValue = void 0;

	var Numbers = function (_Component) {
		_inherits(Numbers, _Component);

		function Numbers() {
			_classCallCheck(this, Numbers);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Numbers).apply(this, arguments));
		}

		_createClass(Numbers, [{
			key: "initialize",
			value: function initialize() {
				returnValue = this.properties("value").then(function (value) {
					actualContext = this;
					results.push(value);
				});
			}
		}]);

		return Numbers;
	}(_component2.default);

	beforeEach(function () {
		actualContext = null;
		results = [];
		numbers = new Numbers();
	});

	it("should return this when setting to enable chaining", function () {
		var propertyCollection = numbers.propertyCollections()[0];
		returnValue.should.eql(propertyCollection);
	});

	it("should call .then each time the property has a value set", function () {
		numbers.value("1").value("2");

		numbers.value();

		numbers.value("3");

		results.should.eql(["1", "2", "3"]);
	});

	it("should be called with the correct context", function () {
		numbers.value("1");
		actualContext.should.eql(numbers);
	});
});