const arr = [16, 17, 14, 3, 14, 5, 2];
let a = [];

function solve(arr) {
  let result = [];
  let maxSoFar = -Infinity;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > maxSoFar) {
      maxSoFar = arr[i];
      result.unshift(arr[i]);
    }
  }
  return result;
}

console.log(solve([1, 21, 4, 7, 5]));
console.log(solve([5, 4, 3, 2, 1]));
console.log(solve([16, 17, 14, 3, 14, 5, 2]));

console.log(solve([16, 17, 14, 5, 2]));