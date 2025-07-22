function mergeArrays(arr1, arr2) {
  const res = new Set();
  let arr = arr1.concat(arr2).sort((a, b) => a - b);

  for (let i of arr) {
    res.add(i);
  }
  return Array.from(res);
}

console.log(mergeArrays([1, 3, 5, 7, 9], [10, 8, 6, 4, 2]));
