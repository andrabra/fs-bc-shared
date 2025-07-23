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
