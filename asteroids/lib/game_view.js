const Game = require('./game.js');
// window.key = require('./keymaster.js');

const GameView = function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function(ctx) {
  this.bindKeyHandlers();
  setInterval( () => {
    this.game.step();
    this.game.draw(ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function () {
  console.log(this.game.ship);
  key('a', () => { this.game.ship.power([-1,0]); });
  key('d', () => { this.game.ship.power([1,0]); });
  key('w', () => { this.game.ship.power([0,-1]); });
  key('s', () => { this.game.ship.power([0,1]); });
  key('space', () => { this.game.ship.fireBullet(); });
};

module.exports = GameView;
