const Game = require('./game.js');

const GameView = function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function(ctx) {
  setInterval( () => {
    this.game.moveObjects();
    this.game.draw(ctx);
  }, 20);
};

module.exports = GameView;
