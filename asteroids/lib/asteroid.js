const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

const Asteroid = function Asteroid(options) {
  options.color = Asteroid.COLOR;
  options.radius = Asteroid.RADIUS;
  options.vel = Util.randomVec(2);
  MovingObject.prototype.constructor.call(this, options);
};

Asteroid.COLOR = 'red';
Asteroid.RADIUS = 12;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
