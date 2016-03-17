

class Akiro extends ChainLink {
	initialize() {
		this.link("packages", PackageCollection);
	}
}

akiro.packages("one", "two", "three"); // PackageCollection
akiro.packages("four", "five", "six"); // PackageCollection
akiro.packages(); // [Package, Package, Package, Package, Package, Package]

class PackageCollection extends ChainLinkCollection {
	initialize(...packageNames) {
		this.linkConstructor(Package);
		this.createLinks(packageNames);
	}
}

class Package extends ChainLink {
	initialize() {
		this.parameters("basePath", "zipPath");
	}
}

class ChainLinkCollection {
	initialize(...names) {
		this.addLinks(names, this.Constructor);
	}

	constructor() {
		this.links = [];
		this.Constructor = function ChainLinkConstructor() {};
	}

	linkConstructor(Constructor) {
		this.Constructor = Constructor;

		const prototype = Constructor.prototype;

		for (let methodName in prototype) {
			this[methodName] = (...options) => {
				this.links.forEach(link => {
					link[methodName](...options);
				});
			};
		}
	}

	createLinks(parameterValues) {
		parameterValues.forEach(parameterValue => {
			this.links.push(new this.Constructor(parameterValue));
		});
	}
}
