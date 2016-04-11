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

		this.parentLink.links.all.forEach(link => {
			const methodPropertyDescriptor = Object.getOwnPropertyDescriptor(this.parentLink, link.methodName);
			if (methodPropertyDescriptor.get && !methodPropertyDescriptor.set) {
				Object.defineProperty(instance, link.methodName, {
					get: link.method
				});
			} else {
				instance[link.methodName] = link.method;
			}
		});

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
			const intoLink = this.parentLink[_.into];

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

		return instance;
	}

	into(collectionName) {
		const _ = privateData(this);
		_.into = collectionName;
		this.parentLink[_.into] = this.parentLink[_.into] || [];
		return this;
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
