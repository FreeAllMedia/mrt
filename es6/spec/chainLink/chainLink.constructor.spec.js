/* Dependencies */
import ChainLink from "../../lib/chainLink/chainLink.js";
import sinon from "sinon";

describe("ChainLink.constructor", () => {
	let parameters,
			chainLink;

	/* Test Setup For Scope */
	beforeEach(() => {
		ChainLink.prototype.initialize = sinon.spy(ChainLink.prototype.initialize);

		parameters = {
			foo: "bar"
		};

		chainLink = new ChainLink(parameters);
	});

	it("should call .initialize with the constructor paramters", () => {
		chainLink.initialize.calledWith(parameters).should.be.true;
	});
});
