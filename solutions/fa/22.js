// 2677. Chunk Array
// https://leetcode.com/problems/chunk-array/
// 30 Days of JavaScript — разбиение массива на куски
//
// Даны массив arr и число size.
// Вернуть новый массив подмассивов длины size (кроме, возможно, последнего).
//
// Правила:
//   • элементы идут в том же порядке, что в arr;
//   • каждый кусок (кроме последнего) содержит ровно size элементов;
//   • если arr.length не делится на size — последний кусок короче;
//   • если size >= arr.length — один кусок со всем массивом;
//   • пустой arr → [].
//
// Нельзя использовать lodash _.chunk.
//
// Связь с вашими задачами:
//   • цикл + накопление результата (как mostFrequent в 19.js);
//   • slice / индексы — не мутировать исходный arr.

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function (arr, size = 1) {
  if (arr.length === 0) return arr;

  const res = [];

  for (let item = 0; item < arr.length; item += size) {
    res.push(arr.slice(item, item + size));
  }

  return res;
};

// --- локальные тесты ---

function runTests() {
  console.log('ex1', JSON.stringify(chunk([1, 2, 3, 4, 5], 1)));
  // [[1],[2],[3],[4],[5]]

  console.log('ex2', JSON.stringify(chunk([1, 9, 6, 3, 2], 3)));
  // [[1,9,6],[3,2]]

  console.log('ex3', JSON.stringify(chunk([8, 5, 3, 2, 6], 6)));
  // [[8,5,3,2,6]]

  console.log('ex4', JSON.stringify(chunk([], 1)));
  // []
}

// Раскомментируйте после реализации:
runTests();
