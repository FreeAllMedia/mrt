![](./images/mrt-logo.png)

[![npm version](https://img.shields.io/npm/v/mrt.svg)](https://www.npmjs.com/package/mrt) [![license type](https://img.shields.io/npm/l/mrt.svg)](https://github.com/FreeAllMedia/mrt.git/blob/master/LICENSE)  [![Build Status](https://travis-ci.org/FreeAllMedia/mrt.png?branch=master)](https://travis-ci.org/FreeAllMedia/mrt) [![Coverage Status](https://coveralls.io/repos/github/FreeAllMedia/mrt/badge.svg?branch=master)](https://coveralls.io/github/FreeAllMedia/mrt?branch=master) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/mrt/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/mrt) [![bitHound Score](https://www.bithound.io/github/FreeAllMedia/mrt/badges/score.svg)](https://www.bithound.io/github/FreeAllMedia/mrt) [![bitHound Dependencies](https://www.bithound.io/github/FreeAllMedia/mrt/badges/dependencies.svg)](https://www.bithound.io/github/FreeAllMedia/mrt/develop/dependencies/npm) [![npm downloads](https://img.shields.io/npm/dm/mrt.svg)](https://www.npmjs.com/package/mrt) ![Source: ECMAScript 6](https://img.shields.io/badge/Source-ECMAScript_2015-green.svg)

# Overview

MrT is a tool for making simple and complex chained interfaces on javascript libraries.

The resulting syntax is easy-to-read while still being flexible and 100% [vanilla-js](https://vanilla-js.org).

``` javascript
// Example interface for a web server

const webServer = new WebServer()

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

# Installation

The easiest and fastest way to install MrT is through the `node package manager`:

``` shell
$ npm install mrt --save
```

# API Guide

## `.initialize(...constructorArguments)`

Whenever one constructor extends another, `.super` must be called in the extended object's constructor before `this` can be called.

This can be a gotcha for many developers, so MrT has a built-in pseudo-constructor called `.initialize` that can be used by extended objects without the need to call `.super`.

``` javascript
import ChainLink from "mrt";

// Without using initialize
class Person extends ChainLink {
  constructor(name) {
    super(name);
    this.properties("name");
    this.name(name);
  }
}

// Using initialize
class Person extends ChainLink {
  initialize(name) {
    this.properties("name");
    this.name(name);
  }
}
```

## `.properties(...propertyNames)`

Define a simple chainable property that sets and gets a raw value:

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("name");
  }
}

const person = new Person();

person.name("Jana");
person.name(); // "Jana"
```

### `.multi`

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("nicknames").multi;
  }
}

const person = new Person();

person.nicknames("Jana Banana", "Jananana");
person.nicknames(); // ["Jana Banana", "Jananana"]
```

### `.aggregate`

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("nicknames").aggregate;
  }
}

const person = new Person();

person.nicknames("Jana Banana");
person.nicknames("Jananana");
person.nicknames(); // ["Jana Banana", "Jananana"]
```

### `.multi.aggregate`

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("citiesVisited").multi.aggregate;
  }
}

const person = new Person();

person.citiesVisited("Toledo", "OH");
person.citiesVisited("Colorado Springs", "CO");
person.citiesVisited(); // [["Toledo", "OH"], ["Colorado Springs", "CO"]]
```

### `.merged`

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("favoriteCities").merged;
  }
}

const person = new Person();

person.mergedValues({"CO": "Colorado Springs", "KS": "Wichita"});
person.mergedValues({"CO": "Boulder"});
person.mergedValues(); // {"CO": "Boulder", "KS": "Wichita"}
```

### `.filter`

``` javascript
class Person extends ChainLink {
  initialize() {
    this.properties("favoriteNumber").filter(this.castIntegers);
  }

  castIntegers(value) {
    const newValue = parseInt(value);
    if (newValue) {
      return newValue;
    } else {
      return value;
    }
  }
}

const person = new Person();

person.favoriteNumber("1");
person.favoriteNumber(); // 1
```

## `.link(linkName, linkConstructor)`

A link creates a method which returns a new instance of the provided `linkConstructor`.

The new instance is given a copy of all methods from the parent link. This is what enables MrT to chain multiple tiers.

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.link("wheel", Wheel);
  }
}

class Wheel extends ChainLink {
  initialize(diameter) {
    this.properties("diameter");
    this.diameter(diameter);
  }
}

const car = new Car();

const wheel1 = car.wheel(10);

car
.wheel(10)
.wheel(10)
.wheel(10);
```

### `.getter`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.link("wheel", Wheel).getter;
  }
}

class Wheel extends ChainLink {}

const car = new Car();

const wheel1 = car.wheel;

car
.wheel
.wheel
.wheel;
```

### `.inherit(...propertyNames)`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.properties("color");
    this.link("door", Door).inherit("color");
  }
}

class Door extends ChainLink {}

const car = new Car();

car.color("Red");

const door = car.door;

door.color(); // "Red"
```

### `.into(collectionName)`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.properties("color");
    this.link("door", Door).into("doors");
  }
}

class Door extends ChainLink {}

const car = new Car();

car
.door
.door;

car.doors.length; // 2
```

### `.into(collectionName).key(keyName)`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.properties("color");
    this.link("door", Door).into("doors").key("side");
  }
}

class Door extends ChainLink {
  initialize(side) {
    this.properties("side");
    this.side(side);
  }
}

const car = new Car();

car
.door("left")
.door("right");

car.doors.left; // left door object
car.doors.right; // right door object
```

### `.then(thenFunction)`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.properties("color");
    this.link("door", Door).then(newDoor => {
      // Called each time a link is created
    });
  }
}

class Door extends ChainLink {}

const car = new Car();

car
.door()
.door();
```

### `.apply(...passedArguments)`

``` javascript
import ChainLink from "mrt";

class Car extends ChainLink {
  initialize() {
    this.properties("color");
    this.link("door", Door).apply(this);
  }
}

class Door extends ChainLink {
  initialize(car, color) {
    car; // Automatically passed by .arguments(this) in Car
		color; // "green"
  }
}

const car = new Car();

car.door("green");
```
