# Mrt

[![npm version](https://img.shields.io/npm/v/mrt.svg)](https://www.npmjs.com/package/mrt) [![license type](https://img.shields.io/npm/l/mrt.svg)](https://github.com/FreeAllMedia/mrt.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/mrt.svg)](https://www.npmjs.com/package/mrt) ![Source: ECMAScript 6](https://img.shields.io/badge/Source-ECMAScript_2015-green.svg)
[![Build Status](https://travis-ci.org/FreeAllMedia/mrt.png?branch=master)](https://travis-ci.org/FreeAllMedia/mrt) [![Coverage Status](https://coveralls.io/repos/github/FreeAllMedia/mrt/badge.svg?branch=master)](https://coveralls.io/github/FreeAllMedia/mrt?branch=master) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/mrt/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/mrt) [![bitHound Score](https://www.bithound.io/github/FreeAllMedia/mrt/badges/score.svg)](https://www.bithound.io/github/FreeAllMedia/mrt) [![Dependency Status](https://david-dm.org/FreeAllMedia/mrt.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/mrt?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/mrt/dev-status.svg)](https://david-dm.org/FreeAllMedia/mrt?theme=shields.io#info=devDependencies)
![node 5.x.x](https://img.shields.io/badge/node-5.x.x-brightgreen.svg) ![node 4.x.x](https://img.shields.io/badge/node-4.x.x-brightgreen.svg) ![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg) ![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)

MrT makes chaining easy! Use it to create simple or complex chained interfaces for your own libraries!

**Simple chain:**

You can create simple interfaces for your libraries using MrT:

``` javascript
import Server from "server";

const server = new Server();

server
	.listen(3030)
	.logTo("./server.log")
	.onRequest((request, response) => {
		console.log(`Received request with body: ${request.body}`);
	});
```

**Complex multi-tiered chain:**

You can also create complex chained interfaces involving many chains each with their own parameters:

``` javascript
import Server from "server";
import AccountController from "./controllers/account.controller.js";

const accountController = new AccountController();

const server = new Server();

server
	.public
		.get("/account")
			.action(accountController.list)
		.get("/account/:id")
			.action(accountController.show)
	.authenticated
		.authorized("owner", "admin")
			.put("/account/:id")
				.action(accountController.update)
		.authorized("admin")
			.post("/account")
				.action(accountController.create)
			.delete("/account/:id")
				.action(accountController.delete);
```

# Getting Started

## Installation

The easiest and fastest way to install Mrt is through the `node package manager`:

``` shell
$ npm install mrt --save
```

# Creating a Simple Chain

## Inherit Mrt's ChainLink

To use Mrt, create a constructor function that inherits from Mrt's `ChainLink`. This is done in two different ways depending on whether you're using ES5 or ES6+:

**ES5 Example:**

``` javascript
var ChainLink = require("mrt");

function Server() {}

Server.prototype = Object.create(ChainLink.prototype);
```

**ES6 Example:**

``` javascript
import ChainLink from "mrt";

class Server extends ChainLink {}
```

## Add Simple Parameters

`Mrt` can either use the default constructor, or a built-in alternate "constructor" called `.initialize()` which automatically calls `super()` for you. This conveniently avoids the "must call super() before this" error:

``` javascript
import ChainLink from "mrt";

class Server extends ChainLink {
	initialize(name) {
		this.parameters(
			"name",
			"port",
			"logTo"
		);

		this.name(name);
	}
}

const server = new Server("My Server");

server
	.port(3030)
	.logTo("./server.log");

server.name(); // "My Server"
server.port(); // 3030
server.logTo(); // "./server.log"
```

### Add Complex Parameters

In addition to adding simple parameters with a single value, you can also add parameters with multiple and aggregate values:

``` javascript
import ChainLink from "mrt";

class Person extends ChainLink {
	initialize(name) {
		this.parameters("name");

		this.name(name);

		this.parameters("dead").asProperty;

		this.parameters("thought")
			.aggregate
			.into("thoughts");

		this.parameters("placeOfOrigin")
			.multiValue;

		this.parameters("placeVisited")
			.multiValue
			.aggregate
			.into("placesVisited");
	}
}

const person = new Person("Lex Luthor");

person.isDead; // false
person.dead;
person.isDead; // true

person.placeOfOrigin("Metropolis", "Delaware");

person
	.placeVisited("Gotham", "New Jersey")
	.placeVisited("Metropolis", "Delaware");

person.placesVisited; // [["Gotham", "New Jersey"], ["Metropolis", "Delaware"]]

person
	.thought("Superman is a real jerk!");
	.thought("Darn you Batman!");
	.thought("Does this robotic death suit make me look fat?");

person.thoughts; // ["Superman is a real jerk!", "Darn you Batman!", "Does this robotic death suit make me look fat?"]
```

# Creating Complex Chains

## Add Chain Links

A `ChainLink` can `.link()` to another `ChainLink` to form complex multi-tiered chained interfaces:

``` javascript
import ChainLink from "mrt";

class Monster extends ChainLink {
	initialize(name) {
		this.parameters("name");
		this.name(name);

		this.link("tentacle", Tentacle).into("tentacles");

		this.link("eye", Eye).into("eyes").asProperty;
	}
}

class Tentacle extends ChainLink {
	initialize(hitpoints) {
		this.parameters("hitpoints");
		this.hitpoints(hitpoints);

		this.link("spike", Spike).into("spikes").asProperty;
	}
}

class Spike extends ChainLink {}

class Eye extends ChainLink {}

const monster = new Monster("Zig Zug");

monster
	.eye
	.eye
	.eye
	.tentacle(10)
		.spike.spike.spike.spike.spike.spike
	.tentacle(10)
		.spike.spike.spike
	.tentacle(20)
		.spike.spike.spike.spike
	.tentacle(20)
		.spike.spike;

monster.eyes.length; // 3
monster.tentacles.length; // 4

const firstTentacle = monster.tentacles[0];

firstTentacle.hitpoints(); // 10
firstTentacle.spikes.length; // 6
```

## Add Behavior

Mrt isn't just about creating data structures (though you can certainly use it for only that purpose!). You can also add custom behavior to `ChainLinks` by adding methods the way you normally would:

``` javascript
import ChainLink from "mrt";

class Vehicle extends ChainLink {
	initialize() {
		this.parameters("type", "make", "model", "color");

		this.type("vehicle");
		this.link("wheel", Wheel).into("wheels");
	}

	start() {
		console.log(`Vroom! Vroom! The ${this.type} has started!`)
	}

	get honk() {
		console.log("This vehicle is unfortunately not equipped with a horn.");
	}
}

class Wheel extends ChainLink {
	initialize(diameter) {
		this.parameters("diameter");
		this.diameter(diameter);
	}
}

class Car extends Vehicle {
	initialize() {
		super();
		this.type("car");

		this
			.wheel(20)
			.wheel(20)
			.wheel(20)
			.wheel(20);
	}

	get honk() {
		console.log("Honk! Honk!");
	}
}

class Motorcycle extends Vehicle {
	initialize() {
		super();

		this.type("motorcycle");
		this
			.wheel(17)
			.wheel(17);
	}

	get honk() {
		console.log("Meep! Meep!");
	}
}

const car = new Car();
car
	.make("Volkswagen")
	.model("Golf")
	.color("green");

car.start(); // "Vroom! Vroom! The car has started!"
car.honk; // "Honk! Honk!"

const motorcycle = new Motorcycle();
motorcycle
	.make("Kawasaki")
	.model("Ninja")
	.color("black");

motorcycle.start(); // "Vroom! Vroom! The motorcycle has started!"
motorcycle.honk; // "Meep! Meep!"
```
