import privateData from "incognito";
import inflect from "jargon";

export default class ParameterCollection {
	constructor(parentLink, parameterNames) {
		const _ = privateData(this);
		_.parentLink = parentLink;
		_.parameterNames = parameterNames;

		_.aggregate = false;
		_.multiValue = false;

		this.parameters = {};

		_.parameterNames.forEach(parameterName => {

			this.parameters[parameterName] = this.parameters[parameterName] || null;

			_.parentLink[parameterName] = (...newValue) => {
				if (newValue.length > 0) {
					if (!_.multiValue) {
						newValue = newValue[0];
					}

					if (_.aggregate || _.multiValue) {
						if (_.aggregate) {
							this.parameters[parameterName].push(newValue);
						} else {
							this.parameters[parameterName] = newValue;
						}
					} else {
						this.parameters[parameterName] = newValue;
					}
					return parentLink;
				} else {
					return this.parameters[parameterName];
				}
			};
		});
	}

	get aggregate() {
		const _ = privateData(this);
		_.aggregate = true;
		_.parameterNames.forEach(parameterName => {
			this.parameters[parameterName] = [];
		});
		return this;
	}

	get multiValue() {
		privateData(this).multiValue = true;
		return this;
	}

	get asProperty() {
		const _ = privateData(this);

		_.parameterNames.forEach(parameterName => {
			const capitalizedMethodName = inflect(parameterName).pascal.toString();
			const getMethodName = `is${capitalizedMethodName}`;

			_.parentLink[getMethodName] = false;

			Object.defineProperty(_.parentLink, parameterName, {
				get: () => {
					_.parentLink[getMethodName] = true;
					return _.parentLink;
				}
			});
		});

		return this;
	}
}
