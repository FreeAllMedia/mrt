import ChainLink from "mrt";

const blorghe = new Monster("Blorghe");
const bob = {name: () => { return "Bob"; }};
blorghe.eat(bob);

class Monster extends ChainLink {
	initialize(name) {
		this.parameters("name");
		this.name(name);

		this.parameters("alias").aggregate;
		this.parameters("originCity").multiValue;
		this.parameters("cityDestroyed").aggregate.multiValue;

		this
			.link("head", MonsterHead)
				.into("heads")
				.asProperty
			.link("arm", MonsterHead)
				.into("arms")
				.usingKey("name")
				.asProperty;

				this.head;

				this.heads; // [head,head,head]


		this.links.head.find("primary");

		this.arms.left;
		this.arms.right;

		this.heads;  // {0: head, 1: head, 2: head}
		this.arms; // undefined

		this.head.name("primary");
	}

	eat(person) {
		process.stdout(`${this.name()} has eaten ${person.name()}`);
	}
}

class MonsterHead extends ChainLink {
	initialize() {
		this.parameters("name");
		this.link("eye", MonsterEye);
	}
}

class MonsterEye extends ChainLink {
	initialize() {
		this.parameters("name");
		this.parameters("color");
	}
}
