"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("../../lib/component/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parent = function (_Component) {
	_inherits(Parent, _Component);

	function Parent() {
		_classCallCheck(this, Parent);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Parent).apply(this, arguments));
	}

	_createClass(Parent, [{
		key: "initialize",
		value: function initialize() {
			this.link("dependency", Dependency).into("dependencies");

			this.link("child", Child).inherit("dependency", "dependencies");
		}
	}]);

	return Parent;
}(_component2.default);

var Child = function (_Component2) {
	_inherits(Child, _Component2);

	function Child() {
		_classCallCheck(this, Child);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Child).apply(this, arguments));
	}

	return Child;
}(_component2.default);

var Dependency = function (_Component3) {
	_inherits(Dependency, _Component3);

	function Dependency() {
		_classCallCheck(this, Dependency);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Dependency).apply(this, arguments));
	}

	return Dependency;
}(_component2.default);

describe("component.link.inherit.into", function () {
	var parent = void 0,
	    child = void 0;

	beforeEach(function () {
		parent = new Parent();
		child = parent.child();
	});

	it("copy the inherited properties to the newly instantiated chain link", function () {
		var values = {
			dependency: child.dependency,
			dependencies: child.dependencies
		};

		values.should.eql({
			dependency: parent.dependency,
			dependencies: parent.dependencies
		});
	});
});