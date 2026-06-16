// 2722. Join Two Arrays by ID
// https://leetcode.com/problems/join-two-arrays-by-id/
// 30 Days of JavaScript — после Sort By
//
// Даны два массива объектов arr1 и arr2. У каждого объекта есть поле id (число).
// Вернуть joinedArray — слияние по id.
//
// Правила:
//   • id встречается только в одном массиве → объект в результат как есть.
//   • id есть в обоих → один объект: поля объединить;
//     при совпадении ключей значение из arr2 перекрывает arr1.
//   • Вложенные объекты/массивы не «глубоко» мержатся — целиком берётся
//     значение из arr2, если ключ есть в обоих (см. ex3).
//   • В результате — по одному объекту на каждый уникальный id.
//   • Массив отсортировать по id по возрастанию.
//
// Связь с вашими задачами:
//   • 19.js mostFrequent — Map как «словарь по ключу»;
//   • sortBy — сортировка по числовому полю;
//   • 20.js CartManager — объекты по id в хранилище.
//
// Подсказка уровня структуры: удобно собрать id → объект, потом массив + sort.

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var join = function (arr1, arr2) {
  const res = new Map();

  arr1.forEach((item) => res.set(item.id, item));

  arr2.forEach((item) => {
    if (res.has(item.id)) {
      const oldData = res.get(item.id);

      res.set(item.id, { ...oldData, ...item });
    } else {
      res.set(item.id, item);
    }
  });

  return Array.from(res.values()).sort((a, b) => a.id - b.id);
};

// --- локальные тесты ---

function assertJoin(label, got, expected) {
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  assertJoin(
    'ex1',
    join(
      [
        { id: 1, x: 1 },
        { id: 2, x: 9 },
      ],
      [{ id: 3, x: 5 }],
    ),
    [
      { id: 1, x: 1 },
      { id: 2, x: 9 },
      { id: 3, x: 5 },
    ],
  );

  assertJoin(
    'ex2',
    join(
      [
        { id: 1, x: 2, y: 3 },
        { id: 2, x: 3, y: 6 },
      ],
      [
        { id: 2, x: 10, y: 20 },
        { id: 3, x: 0, y: 0 },
      ],
    ),
    [
      { id: 1, x: 2, y: 3 },
      { id: 2, x: 10, y: 20 },
      { id: 3, x: 0, y: 0 },
    ],
  );

  assertJoin(
    'ex3',
    join(
      [{ id: 1, b: { b: 94 }, v: [4, 3], y: 48 }],
      [{ id: 1, b: { c: 84 }, v: [1, 3] }],
    ),
    [{ id: 1, b: { c: 84 }, v: [1, 3], y: 48 }],
  );
}

// Раскомментируйте после реализации:
runTests();
