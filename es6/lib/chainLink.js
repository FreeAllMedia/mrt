import privateData from "incognito";

const externalCall = Symbol();

export default class ChainLink {
	constructor(...conanComponentArguments) {
		privateData(this).parameters = {};

		//initialize the parameters object
		this.initialize.apply(this, conanComponentArguments);
	}

	initialize() {} // Stub for overridding

	get aggregate() {
		return this[externalCall]("./chainLink/chainLink.aggregate.js");
	}

	parameters(...newParameters) {
		const _ = privateData(this);

		let returnValue = this;

		if (newParameters.length > 0) {
			newParameters.forEach(parameterName => {
				const getterSetterFunction = (newValue) => {
					if (newValue) {
						_.parameters[parameterName] = newValue;
						return this; // For chaining
					} else {
						return _.parameters[parameterName];
					}
				};

				this[parameterName] = getterSetterFunction;
			});
		} else {
			returnValue = _.parameters;
		}

		return returnValue;
	}

	[externalCall](filePath) {
		return require(filePath).default.call(this);
	}
}
