![](./images/mrt-logo.png)

[![npm version](https://img.shields.io/npm/v/mrt.svg)](https://www.npmjs.com/package/mrt) [![license type](https://img.shields.io/npm/l/mrt.svg)](https://github.com/FreeAllMedia/mrt.git/blob/master/LICENSE)  [![Build Status](https://travis-ci.org/FreeAllMedia/mrt.png?branch=master)](https://travis-ci.org/FreeAllMedia/mrt) [![Coverage Status](https://coveralls.io/repos/github/FreeAllMedia/mrt/badge.svg?branch=master)](https://coveralls.io/github/FreeAllMedia/mrt?branch=master) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/mrt/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/mrt) [![bitHound Score](https://www.bithound.io/github/FreeAllMedia/mrt/badges/score.svg)](https://www.bithound.io/github/FreeAllMedia/mrt) [![Dependency Status](https://david-dm.org/FreeAllMedia/mrt.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/mrt?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/mrt/dev-status.svg)](https://david-dm.org/FreeAllMedia/mrt?theme=shields.io#info=devDependencies) [![npm downloads](https://img.shields.io/npm/dm/mrt.svg)](https://www.npmjs.com/package/mrt) ![Source: ECMAScript 6](https://img.shields.io/badge/Source-ECMAScript_2015-green.svg)

# Overview

MrT is a tool for making simple and complex chained interfaces on javascript libraries.

The resulting syntax is easy-to-read while still being flexible and 100% [vanilla-js](https://vanilla-js.org):

``` javascript
// Example interface for a web server

const server = new Server()

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
      .action(accountController.delete)

.listen(3000);
```

``` javascript
// Example interface for a game backend

const game = new Game("Robots vs Aliens")

.army("Robots")
  .workers(24)
    .tools
      .shovels(10)
      .laserDrills(2)
  .warriors(55)
    .weapons
      .pistols(55)
      .rifles(55)

.army("Sluggoids")
  .workers(84)
    .tools
      .shovels(42)
      .laserDrills(9)
  .warriors(21)
    .weapons
      .pistols(21)
      .rifles(21);
```

# Installation

The easiest and fastest way to install MrT is through the `node package manager`:

``` shell
$ npm install mrt --save
```

# API Guide

**Note:** In each of the following examples we're going to use MrT to build the programmatic interface for a game backend, however it is a generic tool and works just as well for non-game-related projects.

Each function has an associated example that is split into two files:

* `app.js` uses the interface defined in `game.js`.
* `game.js` defines the interface that is used in `app.js`

## `.properties` and `.link`

MrT interfaces are defined with the `.link` and `.properties` methods.

* A link creates a method that returns a new `ChainLink` object with all of it's parent's methods copied to it.
  * There are several enhancements that can be mixed and matched into links including: `key`, `into`, `arguments`, `inherit`, `getter`
* A property sets values on an existing `ChainLink` object. There are several types of properties that can be mixed and matched including: `multi`, `aggregate`, `merged`, and `boolean`.

``` javascript
import ChainLink from "mrt";

class SuperHero extends ChainLink {
  constructor(name) {
    this.properties("name");
    this.properties("awake").boolean;
    this.properties("nemeses").aggregate;
    this.properties("originCity", "currentCity").multi;
    this.properties("savedCities").multi.aggregate;
    this.properties("savedCities").multi.aggregate;

    this.link("secondary", SecondaryLink);

    this.name(name);
  }
}

class SecondaryLink extends ChainLink {
  constructor(...values) {
    this.properties("values").multiValue;
    this.values(...values);
  }
}

const primary = new PrimaryLink("John");
const secondary = primary.secondary(1, 2, 3);
```

## `.properties(...propertyNames)`



## `.link(linkName, linkConstructor)`


``` javascript
// app.js

import Game from "./game.js";

const game = new Game("Robots vs Aliens")

.army("Robots")
.army("Sluggoids");

game.army().should.eql(["Robots", "Sluggoids"]);
```

``` javascript
// game.js

import ChainLink from "mrt";

class Game extends ChainLink {
  initialize(name) {
    this.parameters("name");
    this.parameters("army").aggregate;

    this.name(name);
  }
}

export default Game;
```

**Object-Oriented Chained Interfaces**

``` javascript
// app.js

import Game from "./game.js";

const game = new Game("Robots vs Aliens")

.army("Robots")
  .workers(24)
  .warriors(55)
.army("Sluggoids")
  .workers(84)
  .warriors(21);

const robots = game.armies["Robots"];
const sluggoids = game.armies["Sluggoids"];
const zappdons = game.army("Zappdons");

zappdons.workers(12).warriors(86);

robots.workers(); // 24
sluggoids.workers(); // 84
zappdons.workers(); // 12
```

``` javascript
// game.js

import ChainLink from "mrt";

class Game extends ChainLink {
  initialize(name) {
    this.parameters("name");
    this.link("army", Army).merge.into("armies");
    this.name(name);
  }
}

export default Game;

class Army extends ChainLink {
  initialize(name) {
    this.parameters(
      "name",
      "workers",
      "warriors"
    );
    this.name(name);
  }
}
```

**Multi-Tiered Object-Oriented Chained Interfaces**

``` javascript
// app.js

import Game from "./game.js";

const game = new Game("Robots vs Aliens")

.army("Robots")
  .workers(24)
    .tools
      .shovels(10)
      .laserDrills(2)
  .warriors(55)
    .weapons
      .pistols(55)
      .rifles(55)

.army("Sluggoids")
  .workers(84)
    .tools
      .shovels(42)
      .laserDrills(9)
  .warriors(21)
    .weapons
      .pistols(21)
      .rifles(21);

/**
 * Each link returns a portable object:
 */

const zappdons = game.army("Zappdons");

const zappdonsWorkers = zappdons.workers(1);
const zappdonsWarriors = zappdons.warriors(100);

const zappdonsWorkersTools = zappdonsWorkers.tools;
const zappdonsWarriorsWeapons = zappdonsWarriors.weapons;

zappdonsWorkersTools.shovels(1).laserDrills(0);

zappdonsWorkersWeapons
  .pistols(100)
  .rifles(100);
```

``` javascript
// game.js

import ChainLink from "mrt";

class Game extends ChainLink {
  initialize(name) {
    this.parameters("name");
    this.link("army", Army).merge.into("armies");
    this.name(name);
  }
}

export default Game;

/**
 * Army
 */

class Army extends ChainLink {
  initialize(name) {
    this.parameters("name");
    this.name(name);

    this.link("workers", Workers);
    this.link("warriors", Warriors);
  }
}

/**
 * Units
 */

class Unit extends ChainLink {
  constructor(count) {
    this.parameters("count");
    this.initialize(count);
  }
}

class Workers extends Unit {
  initialize(count) {
    this.parameters();
    this.count(count);
    this.link("tools", Tools).asProperty;
  }
}

class Warriors extends Unit {
  initialize(count) {
    this.parameters();
    this.count(count);
    this.link("weapons", Weapons).asProperty;
  }
}

/**
 * Equipment
 */

class Tools extends ChainLink {
  initialize() {
    this.parameters("shovels", "laserDrills");
  }
}

class Weapons extends ChainLink {
  initialize() {
    this.parameters("pistols", "rifles");
  }
}
```

# Getting Started

MrT is used by
