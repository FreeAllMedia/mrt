/* Dependencies */
import ChainLink from "../../lib/chainLink/chainLink.js";

describe("ChainLink (custom functions)", () => {
	let properties,
			chainLink;

	class CustomChainLink extends ChainLink {
		initialize() {
			this
				.link("sub", SubLink)
				.boolean;
		}
		get something() {
			return true;
		}
	}

	class SubLink extends ChainLink {}

	/* Test Setup For Scope */
	beforeEach(() => {
		chainLink = new CustomChainLink(properties);
		chainLink.sub;
	});

	it("should allow custom getters to be set when there are linked chains", () => {
		chainLink.something.should.be.true;
	});
});
