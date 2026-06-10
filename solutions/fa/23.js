// 2625. Flatten Deeply Nested Array
// https://leetcode.com/problems/flatten-deeply-nested-array/
// 30 Days of JavaScript — после Chunk Array (22.js)
//
// Даны многомерный массив arr и число n (глубина).
// Вернуть «сплюснутую» версию — но не полностью, а только до глубины n.
//
// Правила:
//   • Элементы верхнего уровня имеют глубину вложенности 0.
//   • Подмассив [4,5,6] на верхнем уровне — тоже глубина 0 (как «слой»).
//   • Раскрывать подмассив можно, только если текущая глубина < n.
//   • При входе внутрь подмассива «бюджет» глубины уменьшается (n - 1).
//   • n = 0 → ничего не раскрывать (вернуть arr как есть).
//
// Нельзя использовать Array.prototype.flat.
//
// Связь с вашими задачами:
//   • 3.js flatten — раскрыть ВСЁ (как будто n = ∞);
//   • 22.js chunk — резать по индексам; здесь — по вложенности + счётчик n.
//
// Подсказка уровня темы: рекурсия + Array.isArray + накопление res
// (spread при склейке — как в flatten из 3.js).

/**
 * @param {Array} arr
 * @param {number} n
 * @return {Array}
 */
var flat = function (arr, n) {
  if (arr.length === 0 || n === 0) return arr;

  const res = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res.push(...flat(arr[i], n - 1));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
};

var flatCheat = function (arr, n) {
  return arr.flat(n);
}

// --- локальные тесты (примеры из LeetCode) ---

function runTests() {
  const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];

  console.log('ex1 n=0', JSON.stringify(flat(arr, 0)));
  // [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]

  console.log('ex2 n=1', JSON.stringify(flat(arr, 1)));
  // [1,2,3,4,5,6,7,8,[9,10,11],12,13,14,15]

  console.log(
    'ex3 n=2',
    JSON.stringify(
      flat(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, [9, 10, 11], 12],
          [13, 14, 15],
        ],
        2,
      ),
    ),
  );
  // [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

  console.log('ex4 empty', JSON.stringify(flat([], 5)));
  // []
}

// Раскомментируйте после реализации:
runTests();
