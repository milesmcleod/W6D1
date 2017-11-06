// function sum () {
//   const array = Array.from(arguments);
//   let total = 0;
//   array.forEach(el => {
//   total += el;
//   });
//   return total;
// }
//
// console.log(sum(1, 2, 3, 4));
//
// function sum2(...args) {
//   let total = 0;
//   args.forEach(el => {
//     total += el;
//   });
//   return total;
// }
//
// let args = [1, 2, 3, 4];
//
// console.log(sum2(...args));

// Function.prototype.myBind = function myBind(ctx) {
//   let argArray = Array.from(arguments).slice(1);
//   const that = this;
//   return function() {
//     let argArray2 = Array.from(arguments);
//     that.apply(ctx, argArray.concat(...argArray2));
//   };
// };

// Function.prototype.myBind = function myBind(...ctx) {
//   let argArray = ctx.slice(1);
//   const that = this;
//   return function(...argz) {
//     that.apply(ctx[0], argArray.concat(argz));
//   };
// };

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!

// const curriedSum = function (numArgs) {
//   let numbers = [];
//   const _curriedSum = function (num) {
//     numbers.push(num);
//     if (numbers.length === numArgs) {
//       let sum = 0;
//       numbers.forEach(el => {
//         sum += el;
//       });
//       return sum;
//     } else {
//       return _curriedSum;
//     }
//   };
//   return _curriedSum;
// };

// let f1 = curriedSum(3);
// f1(4);
// f1(3);
// console.log(f1(6));

// Function.prototype.curry = function (numArgs) {
//   let args = [];
//   const curriedFunction = this;
//   const currying = function (arg) {
//     args.push(arg);
//     if (args.length === numArgs) {
//       return curriedFunction.apply(null, args);
//     } else {
//       return currying;
//     }
//   };
//   return currying;
// };

Function.prototype.curry = function (numArgs) {
  let args = [];
  const curriedFunction = this;
  const currying = function (arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return curriedFunction(...args);
    } else {
      return currying;
    }
  };
  return currying;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
console.log(f1(6)); // = 30
