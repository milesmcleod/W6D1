Function.prototype.inherits = function (parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};

function MovingObject () {
}

function Ship () {}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);

MovingObject.prototype.type = 'Moving Quickly';

Ship.prototype.name = 'Ship';

Asteroid.prototype.name = 'Asteroid';

console.log(Asteroid.prototype);
console.log(Ship.prototype);
const mo = new MovingObject();
const ast = new Asteroid();
const ship = new Ship();
console.log(mo.type);
console.log(ast.type);
console.log(ship.type);
console.log(Asteroid.prototype);
console.log(Ship.prototype);
console.log(MovingObject.prototype);
