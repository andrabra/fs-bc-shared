// You are given an initial 2-value array (x). You will use this to calculate a score.

// If both values in (x) are numbers, the score is the sum of the two. If only one is a number, the score is that number. If neither is a number, return 'Void!'.

// Once you have your score, you must return an array of arrays. Each sub array will be the same as (x) and the number of sub arrays should be equal to the score.

// For example:

// if (x) == ['a', 3]  you should return [['a', 3], ['a', 3], ['a', 3]].

function explode(x) {
  if (x.every((i) => isNaN(i))) {
    return "Void!";
  }
  if (x.every((i) => !isNaN(i))) {
    let length = x.reduce((a, b) => a + b, 0);
    return Array(length).fill(x);
  }
  for (let i = 0; i < x.length; i++) {
    if (!isNaN(x[i])) {
      return Array(x[i]).fill(x);
    }
  }
}

console.log(explode([9, 3]));
console.log(explode(["a", 3]));
console.log(explode([9, "a"]));
console.log(explode(["a", "b"]));
console.log(explode(["a", 0]));
