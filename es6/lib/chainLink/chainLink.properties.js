import privateData from "incognito";
import ParameterCollection from "./propertyCollection.js";

export default function properties(...propertyNames) {
	const _ = privateData(this);
	if (propertyNames.length > 0) {
		const propertyCollection = new ParameterCollection(this, propertyNames);
		_.propertyCollections.push(propertyCollection);

		return propertyCollection;
	} else {
		let propertyValues = {};

		_.propertyCollections.forEach(propertyCollection => {
			propertyValues = Object.assign(propertyValues, propertyCollection.properties);
		});

		return propertyValues;
	}
}
