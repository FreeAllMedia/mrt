import Component from "../../lib/component/component.js";

class Parent extends Component {
	initialize() {
		this.link("dependency", Dependency).into("dependencies");

		this.link("child", Child)
			.inherit("dependency", "dependencies");
	}
}

class Child extends Component {}
class Dependency extends Component {}

describe("component.link.inherit.into", () => {
	let parent,
			child;

	beforeEach(() => {
		parent = new Parent();
		child = parent.child();
	});

	it("copy the inherited properties to the newly instantiated chain link", () => {
		const values = {
			dependency: child.dependency,
			dependencies: child.dependencies
		};

		values.should.eql({
			dependency: parent.dependency,
			dependencies: parent.dependencies
		});
	});
});
