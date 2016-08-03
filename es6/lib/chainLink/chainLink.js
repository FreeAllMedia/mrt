import privateData from "incognito";

import ParameterCollection from "./propertyCollection.js";
import Connection from "./connection.js";

export { ParameterCollection };

const externalFunction = Symbol();

export default class ChainLink {
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
		return this[externalFunction]("./chainLink.properties.js", ...propertyNames);
	}

	propertyNames() {
		return Object.keys(this.properties());
	}

	propertyCollections() {
		return privateData(this).propertyCollections;
	}

	link(methodName, LinkConstructor) {
		const newLink = new Connection(this, methodName, LinkConstructor);
		this.links.all.push(newLink);
		return newLink;
	}

	[externalFunction](filePath, ...fileArguments) {
		return require(filePath).default.call(this, ...fileArguments);
	}
}
