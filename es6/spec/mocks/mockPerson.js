import ChainLink from "../../lib/chainLink/chainLink.js";

export default class Person extends ChainLink {
	constructor(name) {
		super(name);

		this
			.parameters("name");

		this
			.link("thought", Thought)
				.into("thoughts")
			.link("head", Head)
				.asProperty
			.link("arm", Arm)
				.into("arms")
				.usingKey("side");

		this
			.name(name);
	}
}

class Head extends ChainLink {}

class Thought extends ChainLink {
	initialize(description) {
		this.parameters("description");
		this.description(description);
	}
}

class Arm extends ChainLink {
	initialize(side) {
		this.parameters("side");
		this.side(side);
		this
			.link("hand", Hand)
			.into("hands");
	}
}

class Hand extends ChainLink {
	initialize(fingerCount = 5) {
		this
			.parameters("fingerCount");

		this.fingerCount(fingerCount);
	}
}

export { Head, Thought, Arm, Hand };
