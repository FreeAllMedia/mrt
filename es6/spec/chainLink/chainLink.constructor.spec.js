/* Dependencies */
import ChainLink from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("ChainLink.constructor", () => {
	let properties,
			chainLink;

	/* Test Setup For Scope */
	beforeEach(() => {
		ChainLink.prototype.initialize = sinon.spy(ChainLink.prototype.initialize);

		properties = {
			foo: "bar"
		};

		chainLink = new ChainLink(properties);
	});

	it("should call .initialize with the constructor paramters", () => {
		chainLink.initialize.calledWith(properties).should.be.true;
	});
});
