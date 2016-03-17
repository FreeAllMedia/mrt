class ChainLinkCollection {
	constructor(...options) {
		this.links = [];
		this.Constructor = function ChainLinkConstructor() {};

		this.initialize(...options);
	}

	initialize() {}

	linkConstructor(Constructor) {
		this.Constructor = Constructor;

		const prototype = Constructor.prototype;

		for (let methodName in prototype) {
			this[methodName] = (...options) => {
				this.links.forEach(link => {
					link[methodName](...options);
				});
			};
		}
	}

	createLinks(parameterValues) {
		parameterValues.forEach(parameterValue => {
			this.links.push(new this.Constructor(parameterValue));
		});
	}
}

class ChainLink {
	constructor(...options) {
		this.initialize(...options);
	}

	initialize() {}

	parameters(...parameterNames) {
		if (parameterNames.length > 0) {
			return new ChainLinkCollection(parameterNames, Parameter);
		} else {
			return this; // enables chaining
		}
	}

	link(methodName, LinkConstructor) {
		return new CrossLink(this, methodName, LinkConstructor);
	}
}

class CrossLink {
	constructor(parentLink, methodName, LinkConstructor) {
		this.parentLink = parentLink;
		this.methodName = methodName;
		this.LinkConstructor = LinkConstructor;
		this.collectionName;
		this.parentLink[this.methodName] = this.linkSingle;
	}

	linkSingle(...options) {
		return new this.LinkConstructor(...options);
	}

	linkCollection(...parameters) {
		return new ChainLinkCollection(parameters, this.LinkConstructor);
	}

	intoCollection(collectionName) {
		this.collectionName = collectionName;
		this.parentLink[this.methodName] = this.linkCollection;
	}
}

class Parameter extends ChainLink {
	initialize(parameterName) {
		this.parameters("name");
		this.name(parameterName);
	}

	get asProperty() {

	}
}

// --------

//
// class Hair extends ChainLink {}
//
// class NightElfMohawk extends Hair {}
//
// class Arm extends ChainLink {
//
// }
//
// const person = new Person();
//
// person
// 	.name("Bob")
// 	.age(44)
// 	.short
// 	.hairStyle(NightElfMohawk);


class Person extends ChainLink {
	initialize() {
		this.parameters("name", "age");
	}
}

const person = new Person();

person
	.name("Bob")
	.age(44);

person.name
