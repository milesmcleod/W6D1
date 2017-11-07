const Asteroid = require('./asteroid.js');

const Game = function () {
  this.asteroids = [];
  this.addAsteroids();
};

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addAsteroids = function () {
  for(let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let ast = new Asteroid ({ pos: this.randomPosition(), game: this });
    this.asteroids.push(ast);
  }
};

Game.prototype.randomPosition = function () {
  let x = Math.random() * Game.DIM_X;
  let y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  pos[0] = ((pos[0] + Game.DIM_X) % Game.DIM_X);
  pos[1] = ((pos[1] + Game.DIM_Y) % Game.DIM_Y);
};

Game.prototype.checkCollisions = function () {
  for(let i = 0; i < this.asteroids.length - 1; i++) {
    for(let j = i + 1; j < this.asteroids.length; j++) {
      if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
        this.asteroids[i].collideWith(this.asteroids[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

module.exports = Game;
