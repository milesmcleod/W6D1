const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');
const Util = require('./utils.js');

const Bullet = function Bullet(options) {
  options.color = Bullet.COLOR;
  options.radius = Bullet.RADIUS;
  MovingObject.prototype.constructor.call(this, options);
};

Bullet.COLOR = 'purple';
Bullet.RADIUS = 2;

Util.inherits(Bullet, MovingObject);

Bullet.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

Bullet.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Asteroid) {
    this.game.remove(otherObject);
  }
};

module.exports = Bullet;
