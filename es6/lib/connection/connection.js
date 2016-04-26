import privateData from "incognito";
import inflect from "jargon";

const addLink = Symbol();

export default class Connection {
	constructor(parentLink, methodName, ChainLinkConstructor) {
		const _ = privateData(this);

		_.inherit = false;
		_.into = false;
		_.useArguments = [];

		this.parentLink = parentLink;
		this.methodName = methodName;
		this.ChainLinkConstructor = ChainLinkConstructor;

		this.method = (...options) => {
			return this[addLink](...options);
		};

		// TODO: Gotta figure out this line
		// this.link = parentLink.link.bind(parentLink);

		this.parentLink[this.methodName] = this.method;
	}

	usingKey(keyName) {
		privateData(this).keyName = keyName;
		return this;
	}

	usingArguments(...newArguments) {
		const _ = privateData(this);
		_.useArguments = Array.concat(_.useArguments, newArguments);
		return this;
	}

	[addLink](...options) {
		const _ = privateData(this);

		options = Array.concat(_.useArguments, options);

		const instance = new this.ChainLinkConstructor(...options);

		this.parentLink.connections.forEach(connection => {
			const methodPropertyDescriptor = Object.getOwnPropertyDescriptor(this.parentLink, connection.methodName);

			if (methodPropertyDescriptor.get && !methodPropertyDescriptor.set) {
				instance.link(connection.methodName, connection.ChainLinkConstructor).asProperty;
			} else {
				instance.link(connection.methodName, connection.ChainLinkConstructor);
			}
		});

		if (_.keyName || _.into) {
			if (_.keyName) {
				const methodLinks = this.parentLink.links[this.methodName] = this.parentLink.links[this.methodName] || {};

				const parameterValues = instance.parameters();
				const keyValue = parameterValues[_.keyName];

				methodLinks[keyValue] = instance;
			} else {
				const methodLinks = this.parentLink.links[this.methodName] = this.parentLink.links[this.methodName] || [];
				methodLinks.push(instance);
			}

			if (_.into) {
				let intoLink;

				if (_.into.constructor === String) {
					intoLink = this.parentLink[_.into];
				} else {
					intoLink = _.into;
				}

				if (_.keyName) {
					if (intoLink.constructor === Array) {
						intoLink.push(instance);

						let intoObjects = {};

						intoLink.forEach(intoObject => {
							const keyValue = intoObject.parameters()[_.keyName];
							intoObjects[keyValue] = intoObject;
						});

						this.parentLink[_.into] = intoObjects;
					} else {
						const keyValue = instance.parameters()[_.keyName];
						intoLink[keyValue] = instance;
					}
				} else {
					intoLink.push(instance);
				}
			}
		} else {
			this.parentLink.links[this.methodName] = instance;
		}

		if (_.inherit) {
			const inheritedParameterNames = _.inherit;

			inheritedParameterNames.forEach(parameterName => {
				const capitalizedMethodName = inflect(parameterName).pascal.toString();
				const getMethodName = `is${capitalizedMethodName}`;

				if (this.parentLink.hasOwnProperty(getMethodName)) {
					instance[parameterName];
				} else {
					const parameterValue = this.parentLink[parameterName]();
					instance[parameterName](parameterValue);
				}
			});
		}

		if (_.then) {
			_.then(instance);
		}

		this.parentLink.links.all.push(instance);

		return instance;
	}

	into(collectionNameOrContainer) {
		const _ = privateData(this);

		if (collectionNameOrContainer.constructor === String) {
			const collectionName = collectionNameOrContainer;
			this.parentLink[collectionName] = this.parentLink[collectionName] || [];
			_.into = collectionName;
		} else {
			const container = collectionNameOrContainer;
			_.into = container;
		}

		return this;
	}

	then(thenFunction) {
		privateData(this).then = thenFunction;
	}

	get asProperty() {
		Object.defineProperty(this.parentLink, this.methodName, {
			get: () => {
				return this[addLink]();
			}
		});

		return this;
	}

	inherit(...parameterNames) {
		privateData(this).inherit = parameterNames;
	}
}
