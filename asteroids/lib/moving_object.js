const Util = require('./utils.js');

const MovingObject = function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  let totalRadius = this.radius + otherObject.radius;
  if (Util.distance(this.pos, otherObject.pos) <= totalRadius) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
  this.game.remove(otherObject);
  this.game.remove(this);
};


module.exports = MovingObject;
