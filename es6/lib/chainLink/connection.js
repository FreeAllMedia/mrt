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

	key(keyName) {
		privateData(this).keyName = keyName;
		return this;
	}

	arguments(...newArguments) {
		const _ = privateData(this);
		_.useArguments = _.useArguments.concat(newArguments);
		return this;
	}

	[addLink](...options) {
		const _ = privateData(this);

		options = _.useArguments.concat(options);

		const instance = new this.ChainLinkConstructor(...options);

		const methodNames = Object.getOwnPropertyNames(this.parentLink.constructor.prototype).filter(propertyName => {
			switch (propertyName) {
				case "constructor":
				case "initialize":
					return false;
				default:
					return true;
			}
		});

		const propertyNames = this.parentLink.propertyNames();

		propertyNames.forEach(propertyName => {
			if (!instance[propertyName]) {
				instance[propertyName] = this.parentLink[propertyName];
			}
		});

		methodNames.forEach(propertyName => {
			const propertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.parentLink), propertyName);
			if (propertyDescriptor.value) { propertyDescriptor.value = propertyDescriptor.value.bind(this.parentLink); }
			if (propertyDescriptor.get) { propertyDescriptor.get = propertyDescriptor.get.bind(this.parentLink); }
			Object.defineProperty(instance, propertyName, propertyDescriptor);
		});

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

			const propertyValues = instance.properties();
			const keyValue = propertyValues[_.keyName];

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
						const keyValue = intoObject.properties()[_.keyName];
						intoObjects[keyValue] = intoObject;
					});

					this.parentLink[_.into] = intoObjects;
				} else {
					const keyValue = instance.properties()[_.keyName];
					intoLink[keyValue] = instance;
				}
			} else {
				intoLink.push(instance);
			}
		}

		if (_.inherit) {
			const inheritedParameterNames = _.inherit;

			inheritedParameterNames.forEach(propertyName => {
				const capitalizedMethodName = inflect(propertyName).pascal.toString();
				const getMethodName = `is${capitalizedMethodName}`;

				if (this.parentLink.hasOwnProperty(getMethodName)) {
					instance[propertyName];
				} else {
					const propertyValue = this.parentLink[propertyName]();
					instance[propertyName](propertyValue);
				}
			});
		}

		if (_.then) {
			_.then(instance);
		}

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

	get getter() {
		Object.defineProperty(this.parentLink, this.methodName, {
			get: () => {
				return this[addLink]();
			}
		});

		return this;
	}

	inherit(...propertyNames) {
		privateData(this).inherit = propertyNames;
	}
}
