import privateData from "incognito";

import ParameterCollection from "../parameterCollection/parameterCollection.js";

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
		return require("./chainLink.parameters.js").default.call(this, ...parameterNames);
	}

	link(methodName, LinkConstructor) {
		return require("./chainLink.link.js").default.call(this, methodName, LinkConstructor);
	}

	serialize() {
		return require("./chainLink.serialize.js").default.call(this);
	}
}
