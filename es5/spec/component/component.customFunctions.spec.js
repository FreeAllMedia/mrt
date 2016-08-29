"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Dependencies */


describe("Component (custom functions)", function () {
	var properties = void 0,
	    component = void 0;

	var CustomComponent = function (_Component) {
		_inherits(CustomComponent, _Component);

		function CustomComponent() {
			_classCallCheck(this, CustomComponent);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomComponent).apply(this, arguments));
		}

		_createClass(CustomComponent, [{
			key: "initialize",
			value: function initialize() {
				this.link("sub", SubLink).getter;
			}
		}, {
			key: "something",
			get: function get() {
				return true;
			}
		}]);

		return CustomComponent;
	}(_component2.default);

	var SubLink = function (_Component2) {
		_inherits(SubLink, _Component2);

		function SubLink() {
			_classCallCheck(this, SubLink);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SubLink).apply(this, arguments));
		}

		return SubLink;
	}(_component2.default);

	/* Test Setup For Scope */


	beforeEach(function () {
		component = new CustomComponent(properties);
		component.sub;
	});

	it("should allow custom getters to be set when there are linked chains", function () {
		component.something.should.be.true;
	});
});