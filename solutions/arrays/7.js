// The JavaScript standard now includes functional additions to array like map,
// filter and reduce, but sadly is missing the convenience functions range and sum.

// Implement a version of range and sum (which you can then copy and use in your future kata to make them smaller).

// Array.range(start, count) should return an array containing count numbers from start to start + count ( exclusive )

// Example: Array.range(0, 3) returns [0, 1, 2]

// array.sum() should return the sum of all numbers in array

// Example: [0, 1, 2].sum() returns 3
// Example: Array.range(-1,4).sum() should return 2

// While not forbidden try to write both function without using a for loop

Array.range = function (start, count) {
  let res = [];
  for (let i = 0; i < count; i++) {
		res.push(start);
		start++;
	}
  return res;
};


Array.prototype.sum = function () {
	let res = 0;
  for (let i = 0; i < this.length; i++) {
		res += this[i];
  }
  return res;
};

console.log(Array.range(-1,1));
console.log(Array.range(-3,5));
console.log(Array.range(1,3));

// console.log([1, 2, 3].sum());
// console.log([-2, -1, -5].sum());
// console.log([-3, -2, -1, 0, 1, 2, 3].sum());
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
