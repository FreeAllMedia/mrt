// ES5

var Chain = require("mrt");

var MyChain = Chain.extend(function (serverName, port) {
	this.parameters("server").multiValue.aggregate;

	this.server("hostname.com", 245);
	this.server("example.com", 24);
	this.server("sometghing.com", 2125);
	this.server(); // [["hostname.com", 245], ["example.com", 24], ["sometghing.com", 2125]]

	this.parameters("serverName").multiValue;
	this.serverName(serverName, serverName, serverName);
	this.serverName(); // [serverName, serverName, serverName]

	this.parameters("serverName").aggregate;
	this.serverName(serverName);
	this.serverName(serverName);
	this.serverName(serverName);
	this.serverName(); // [serverName, serverName, serverName]

	this.parameters("serverName").aggregate.multiValue;
	this.serverName(serverName, serverName, serverName);
	this.serverName(serverName, serverName, serverName);
	this.serverName(serverName, serverName, serverName);
	this.serverName(); // [[serverName, serverName, serverName], [serverName, serverName, serverName], [serverName, serverName, serverName]]
});

var chain = new MyChain("myServer.com", 42);


// ES6

import Chain from "mrt";

class MyChain extends Chain {
	initialize(serverName, port) {
		this.parameters("server").multiValue.aggregate;

		this.server("hostname.com", 245);
		this.server("example.com", 24);
		this.server("sometghing.com", 2125);
		this.server(); // [["hostname.com", 245], ["example.com", 24], ["sometghing.com", 2125]]

		this.parameters("serverName").multiValue;
		this.serverName(serverName, serverName, serverName);
		this.serverName(); // [serverName, serverName, serverName]

		this.parameters("serverName").aggregate;
		this.serverName(serverName);
		this.serverName(serverName);
		this.serverName(serverName);
		this.serverName(); // [serverName, serverName, serverName]

		this.parameters("serverName").aggregate.multiValue;
		this.serverName(serverName, serverName, serverName);
		this.serverName(serverName, serverName, serverName);
		this.serverName(serverName, serverName, serverName);
		this.serverName(); // [[serverName, serverName, serverName], [serverName, serverName, serverName], [serverName, serverName, serverName]]
	}
}

const chain = new MyChain("myServer.com", 42);
