import privateData from "incognito";

import ParameterCollection from "./parameterCollection.js";
import Connection from "./connection.js";

export { ParameterCollection };

const externalFunction = Symbol();

export default class ChainLink {
	constructor(...options) {
		const _ = privateData(this);
		_.parameterCollections = [];

		this.links = {
			all: []
		};

		this.initialize(...options);
	}

	initialize() {}

	parameters(...parameterNames) {
		return this[externalFunction]("./chainLink.parameters.js", ...parameterNames);
	}

	parameterNames() {
		return Object.keys(this.parameters());
	}

	parameterCollections() {
		return privateData(this).parameterCollections;
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
