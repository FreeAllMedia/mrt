"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chainLink = require("../../lib/chainLink/chainLink.js");

var _chainLink2 = _interopRequireDefault(_chainLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Dependencies */


describe("ChainLink (custom functions)", function () {
	var parameters = void 0,
	    chainLink = void 0;

	var CustomChainLink = function (_ChainLink) {
		_inherits(CustomChainLink, _ChainLink);

		function CustomChainLink() {
			_classCallCheck(this, CustomChainLink);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomChainLink).apply(this, arguments));
		}

		_createClass(CustomChainLink, [{
			key: "initialize",
			value: function initialize() {
				this.link("sub", SubLink).asProperty;
			}
		}, {
			key: "something",
			get: function get() {
				return true;
			}
		}]);

		return CustomChainLink;
	}(_chainLink2.default);

	var SubLink = function (_ChainLink2) {
		_inherits(SubLink, _ChainLink2);

		function SubLink() {
			_classCallCheck(this, SubLink);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SubLink).apply(this, arguments));
		}

		return SubLink;
	}(_chainLink2.default);

	/* Test Setup For Scope */


	beforeEach(function () {
		chainLink = new CustomChainLink(parameters);
		chainLink.sub;
	});

	it("should allow custom getters to be set when there are linked chains", function () {
		chainLink.something.should.be.true;
	});
});