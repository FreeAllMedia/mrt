import privateData from "incognito";
import inflect from "jargon";

export default class ParameterCollection {
	constructor(parentLink, propertyNames) {
		const _ = privateData(this);
		_.parentLink = parentLink;
		_.propertyNames = propertyNames;

		_.aggregate = false;
		_.multiValue = false;
		_.asProperty = false;
		_.merge = false;
		_.filters = [];

		this.properties = {};

		_.propertyNames.forEach(propertyName => {

			this.properties[propertyName] = this.properties[propertyName] || null;

			_.parentLink[propertyName] = (...newValue) => {
				if (newValue.length > 0) {
					if (!_.multiValue) {
						newValue = newValue[0];
					}

					_.filters.forEach(filter => {
						newValue = filter(newValue);
					});

					if (_.aggregate || _.multiValue) {
						if (_.aggregate) {
							this.properties[propertyName].push(newValue);
						} else {
							this.properties[propertyName] = newValue;
						}
					} else {
						this.properties[propertyName] = newValue;
					}
					return parentLink;
				} else {
					return this.properties[propertyName];
				}
			};
		});
	}

	propertyNames(...newParameterNames) {
		const _ = privateData(this);

		if (newParameterNames.length > 0) {
			_.propertyNames = newParameterNames;
			return this;
		} else {
			return _.propertyNames;
		}
	}

	get isAggregate() {
		return privateData(this).aggregate;
	}

	get aggregate() {
		const _ = privateData(this);
		_.aggregate = true;
		_.propertyNames.forEach(propertyName => {
			this.properties[propertyName] = [];
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

	filter(filterFunction) {
		privateData(this).filters.push(filterFunction);
		return this;
	}

	get isProperty() {
		return privateData(this).asProperty;
	}

	get asProperty() {
		const _ = privateData(this);

		_.asProperty = true;

		_.propertyNames.forEach(propertyName => {
			const capitalizedMethodName = inflect(propertyName).pascal.toString();
			const getMethodName = `is${capitalizedMethodName}`;

			_.parentLink[getMethodName] = false;

			Object.defineProperty(_.parentLink, propertyName, {
				get: () => {
					_.parentLink[getMethodName] = true;
					return _.parentLink;
				}
			});
		});

		return this;
	}

	get merge() {
		const _ = privateData(this);

		_.merge = true;

		_.propertyNames.forEach(propertyName => {

			const propertyValues = this.properties[propertyName] = {};

			_.parentLink[propertyName] = valueCollection => {
				if (valueCollection) {
					for (let valueKey in valueCollection) {
						let value = valueCollection[valueKey];

						_.filters.forEach(filter => {
							value = filter(value);
						});

						propertyValues[valueKey] = value;
					}
					return _.parentLink;
				} else {
					return propertyValues;
				}
			};
		});

		return this;
	}
}
