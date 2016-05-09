class Dog {
	initialize() {
		this.link("head", Head);
		this.link("leg", Leg).asProperty;
	}
}


const dog = new Dog();

dog.leg.leg.leg.head("fuzzy");







const monster = new Monster();

const head = monster.head;

const blueEye = head.eye("blue");

	head
		.eye("green")
		.eye("red")
	.head
		.eye
			.color("green")
	.tentacle.tentacle.tentacle




















// Example 1: Monster
const monster = new Monster();
const primary = monster.head("primary");

primary
	.eye("color")
	.position("forehead")

monster
	.arm.color("purple").position("left")
	.arm.color("green").position("right");

const arm = eye.color("black").position("forehead").arm;
arm.color("purple").position("left").arm.color("green").position("right");

// Example 2: Car
const car = new Car();
car
	.make("Volkswagen")
	.model("Golf")
	.steeringWheel
	.wheel.wheel.wheel.wheel
	.seat.seat.seat.seat.seat
	.engine;

// Example 3: Server
const server = new Server();
server
	.stage("development", "production")
		.port(3000)
		.runtime("ruby")
		.description("A ruby server to exemplify how slow ruby server are!");
