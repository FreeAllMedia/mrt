import Connection from "../connection/connection.js";

export default function link(methodName, LinkConstructor) {
	const newLink = new Connection(this, methodName, LinkConstructor);
	this.connections.push(newLink);
	return newLink;
}
