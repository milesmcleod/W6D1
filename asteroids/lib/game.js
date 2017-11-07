const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');

const Game = function () {
  this.asteroids = [];
  this.bullets = [];
  this.addAsteroids();
  this.ship = new Ship({ pos: this.randomPosition(), game: this });

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
  this.allObjects().forEach(movingObject => {
    movingObject.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(movingObject => {
    movingObject.move();
  });
};

Game.prototype.wrap = function(pos) {
  pos[0] = ((pos[0] + Game.DIM_X) % Game.DIM_X);
  pos[1] = ((pos[1] + Game.DIM_Y) % Game.DIM_Y);
};

Game.prototype.checkCollisions = function () {
  for(let i = 0; i < this.allObjects().length - 1; i++) {
    for(let j = i + 1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
        this.allObjects()[i].collideWith(this.allObjects()[j]);
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

Game.prototype.allObjects = function allObjects() {
  let all = this.asteroids.slice();
  all.push(this.ship);
  // all = all.concat(this.bullets.slice());
  return all;
};

module.exports = Game;
