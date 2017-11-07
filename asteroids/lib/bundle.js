/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);

window.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("game-canvas");
  let ctx = canvas.getContext("2d");
  const gameView = new GameView(ctx);
  gameView.start(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

const GameView = function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
};

GameView.prototype.start = function(ctx) {
  setInterval( () => {
    this.game.step();
    this.game.draw(ctx);
  }, 20);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Asteroid = __webpack_require__(3);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(5);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Util = {
  inherits (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
// Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  distance (pos, pos2) {
    // Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
    return Math.sqrt(Math.pow((pos[0] - pos2[0]), 2) + Math.pow((pos[1] - pos2[1]), 2));
  }
};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);

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


/***/ })
/******/ ]);