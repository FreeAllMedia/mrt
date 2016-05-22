import privateData from "incognito";
import inflect from "jargon";

export default class ParameterCollection {
	constructor(parentLink, parameterNames) {
		const _ = privateData(this);
		_.parentLink = parentLink;
		_.parameterNames = parameterNames;

		_.aggregate = false;
		_.multiValue = false;
		_.asProperty = false;
		_.mergeKeyValues = false;

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

	parameterNames(...newParameterNames) {
		const _ = privateData(this);

		if (newParameterNames.length > 0) {
			_.parameterNames = newParameterNames;
			return this;
		} else {
			return _.parameterNames;
		}
	}

	get isAggregate() {
		return privateData(this).aggregate;
	}

	get aggregate() {
		const _ = privateData(this);
		_.aggregate = true;
		_.parameterNames.forEach(parameterName => {
			this.parameters[parameterName] = [];
		});
		return this;
	}

	get isMultiValue() {
		return privateData(this).multiValue;
	}

	get multiValue() {
		privateData(this).multiValue = true;
		return this;
	}

	get isProperty() {
		return privateData(this).asProperty;
	}

	get asProperty() {
		const _ = privateData(this);

		_.asProperty = true;

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

	get mergeKeyValues() {
		const _ = privateData(this);

		_.mergeKeyValues = true;

		_.parameterNames.forEach(parameterName => {

			const parameterValues = this.parameters[parameterName] = {};

			_.parentLink[parameterName] = valueCollection => {
				if (valueCollection) {
					for (let valueKey in valueCollection) {
						let value = valueCollection[valueKey];

						parameterValues[valueKey] = value;
					}
					return _.parentLink;
				} else {
					return parameterValues;
				}
			};
		});
	}
}
