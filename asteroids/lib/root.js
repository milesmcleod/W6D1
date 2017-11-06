const GameView = require('./game_view.js');

window.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.start(ctx);
});
