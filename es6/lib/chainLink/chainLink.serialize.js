export default function serialize() {
	const serializer = new SerializeLink(this);
	return serializer.toJson();
}

class SerializeLink {
	constructor(link) {
		this.link = link;
	}

	toJson() {
		const returnJson = {};

		this.generateParameters(this.link, returnJson);
		this.generateLinks(this.link, returnJson);

		return returnJson;
	}

	generateParameters(link, json) {
		const parameters = link.parameters();

		for (let parameterName in parameters) {
			json[parameterName] = parameters[parameterName];
		}
	}

	generateLinks(link, json) {
		const links = link.links.all;

		const connectionNameMap = this.generateConnectionNameMap(link);

		console.log("links", links);

		links.forEach(childLink => {
			console.log("childLink", childLink);

			const connectionName = connectionNameMap[childLink.constructor];
			console.log("connectionName", connectionName);
			json[connectionName] = {};
		});
	}

	generateConnectionNameMap(link) {
		const connections = link.connections;

		const connectionNameMap = {};
		connections.forEach(connection => {
			connectionNameMap[connection.ChainLinkConstructor] = connection.methodName;
		});

		return connectionNameMap;
	}
}
