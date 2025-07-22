// You are given an array of values.

// Sum every number value in the array, and any nested arrays (to any depth).

// Ignore all other types of values.

// const Test = require('@codewars/test-compat');

// describe("Tests", () => {
//   it("test", () => {
// Test.assertEquals(arraySum([1, 2]), 3);
// Test.assertEquals(arraySum([1, 2, 3]), 6);
// Test.assertEquals(arraySum([1, 2, [1, 2]]), 6);

//   });
// });

function arraySum(arr) {
  return arr.reduce((a, b) => a + (Array.isArray(b) ? arraySum(b) : typeof b === 'number' ? b : 0), 0);
}

function arraySum1(arr) {
  return arr.reduce((a, b) => a + (Array.isArray(b) ? arraySum(b) : isNaN(b) ? 0 : b), 0);
}

console.log(arraySum([1, 2, [1, 2]]));
console.log(arraySum([1, 2, [1, [1, 'foo', [3, 'sas']], 2]]));
console.log(arraySum1([1, 2, [1, 2]]));
console.log(arraySum1([1, 2, [1, [1, 'foo', [3, 4]], 2]]));