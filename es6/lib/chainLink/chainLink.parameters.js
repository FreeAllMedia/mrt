import privateData from "incognito";
import ParameterCollection from "./parameterCollection.js";

export default function parameters(...parameterNames) {
	const _ = privateData(this);
	if (parameterNames.length > 0) {
		const parameterCollection = new ParameterCollection(this, parameterNames);
		_.parameterCollections.push(parameterCollection);

		return parameterCollection;
	} else {
		let parameterValues = {};

		_.parameterCollections.forEach(parameterCollection => {
			parameterValues = Object.assign(parameterValues, parameterCollection.parameters);
		});

		return parameterValues;
	}
}
