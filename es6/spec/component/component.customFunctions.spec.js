/* Dependencies */
import Component from "../../lib/component/component.js";

describe("Component (custom functions)", () => {
	let properties,
			component;

	class CustomComponent extends Component {
		initialize() {
			this
				.link("sub", SubLink)
				.getter;
		}
		get something() {
			return true;
		}
	}

	class SubLink extends Component {}

	/* Test Setup For Scope */
	beforeEach(() => {
		component = new CustomComponent(properties);
		component.sub;
	});

	it("should allow custom getters to be set when there are linked chains", () => {
		component.something.should.be.true;
	});
});
