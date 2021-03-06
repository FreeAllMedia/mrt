import privateData from "incognito";
import inflect from "jargon";

export default class PropertyCollection {
	constructor(parentLink, propertyNames) {
		const _ = privateData(this);
		_.parentLink = parentLink;
		_.propertyNames = propertyNames;

		_.aggregate = false;
		_.multi = false;
		_.isBoolean = false;
		_.merged = false;
		_.flat = false;
		_.filters = [];
		_.thens = [];

		this.properties = {};

		_.propertyNames.forEach(propertyName => {

			this.properties[propertyName] = this.properties[propertyName] || null;

			_.parentLink[propertyName] = (...newValue) => {
				if (newValue.length > 0) {
					if (!_.multi) {
						newValue = newValue[0];
					}

					_.filters.forEach(filter => {
						newValue = filter(newValue);
					});

					if (_.aggregate || _.multi) {
						if (_.aggregate) {
							if (_.flat) {
								this.properties[propertyName] = this.properties[propertyName].concat(newValue);
							} else {
								this.properties[propertyName].push(newValue);
							}
						} else {
							this.properties[propertyName] = newValue;
						}
					} else {
						this.properties[propertyName] = newValue;
					}

					_.thens.forEach(then => {
						if (_.multi) {
							then.apply(_.parentLink, newValue);
						} else {
							then.call(_.parentLink, newValue);
						}
					});

					return parentLink;
				} else {
					return this.properties[propertyName];
				}
			};
		});
	}

	propertyNames(...newPropertyNames) {
		const _ = privateData(this);

		if (newPropertyNames.length > 0) {
			_.propertyNames = newPropertyNames;
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

	get isMulti() {
		return privateData(this).multi;
	}

	get multi() {
		privateData(this).multi = true;
		return this;
	}

	filter(filterFunction) {
		privateData(this).filters.push(filterFunction);
		return this;
	}

	get isBoolean() {
		return privateData(this).isBoolean;
	}

	get boolean() {
		const _ = privateData(this);

		_.isBoolean = true;

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

	then(thenFunction) {
		privateData(this).thens.push(thenFunction);
		return this;
	}

	get merged() {
		const _ = privateData(this);

		_.merged = true;

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

	get flat() {
		privateData(this).flat = true;
		return this;
	}
}
