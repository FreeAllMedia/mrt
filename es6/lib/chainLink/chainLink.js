import privateData from "incognito";

import ParameterCollection from "../parameterCollection/parameterCollection.js";
import Connection from "../connection/connection.js";

export { ParameterCollection };

export default class ChainLink {
	constructor(...options) {
		const _ = privateData(this);
		_.parameterCollections = [];

		this.links = {
			all: []
		};

		this.connections = [];

		this.initialize(...options);
	}

	initialize() {}

	parameters(...parameterNames) {
		const _ = privateData(this);

		if (parameterNames.length > 0) {
			const parameterCollection = new ParameterCollection(this, parameterNames);
			_.parameterCollections.push(parameterCollection);

			return parameterCollection;
		} else {
			let parameterValues = {};

			_.parameterCollections.forEach(parameterCollection => {
				parameterValues = Object.assign(parameterValues, parameterCollection.parameters);
			});

			return parameterValues;
		}
	}

	link(methodName, LinkConstructor) {
		const newLink = new Connection(this, methodName, LinkConstructor);
		this.connections.push(newLink);
		return newLink;
	}

	serialize() {
		return require("./chainLink.serialize.js").default.call(this);
	}
}
