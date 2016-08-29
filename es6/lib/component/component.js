import privateData from "incognito";

import PropertyCollection from "./propertyCollection.js";
import Link from "./link.js";

export { PropertyCollection };

const externalFunction = Symbol();

export default class Component {
	constructor(...options) {
		const _ = privateData(this);
		_.propertyCollections = [];

		this.links = {
			all: []
		};

		this.initialize(...options);
	}

	initialize() {}

	properties(...propertyNames) {
		return this[externalFunction]("./component.properties.js", ...propertyNames);
	}

	propertyNames() {
		return Object.keys(this.properties());
	}

	propertyCollections() {
		return privateData(this).propertyCollections;
	}

	link(methodName, LinkConstructor) {
		const newLink = new Link(this, methodName, LinkConstructor);
		this.links.all.push(newLink);
		return newLink;
	}

	[externalFunction](filePath, ...fileArguments) {
		return require(filePath).default.call(this, ...fileArguments);
	}
}
