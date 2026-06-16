// 2631. Group By
// https://leetcode.com/problems/group-by/
// 30 Days of JavaScript — после Flatten Deeply Nested Array (23.js)
//
// Нужно расширить все массивы: на любом array должен работать метод array.groupBy(fn).
// Метод возвращает «сгруппированную» версию массива.
//
// Сгруппированный результат — объект, где:
//   • ключ — результат fn(arr[i]);
//   • значение — массив всех элементов исходного массива с этим ключом.
//
// Правила:
//   • fn принимает элемент массива и возвращает строковый ключ;
//   • порядок элементов внутри каждого массива-значения — как в исходном array;
//   • порядок ключей в объекте не важен;
//   • пустой array → {}.
//
// Нельзя использовать lodash _.groupBy.
//
// Связь с вашими задачами:
//   • 19.js mostFrequent — подсчёт по ключам; здесь — группировка в объект;
//   • 22.js chunk — деление массива; здесь — деление по результату fn.
//
// Подсказка:
//   1. Создай пустой объект res — в него будешь складывать группы.
//   2. Пройди по this (forEach / for...of) и для каждого item вычисли ключ: const key = fn(item).
//      Ключ — строка от fn, не сам item (объект нельзя использовать как ключ напрямую).
//   3. Значение по ключу — массив элементов. Если res[key] ещё нет — положи туда [].
//   4. Добавь item в res[key] (push). Один ключ может накопить несколько элементов.
//   5. Верни res. Пустой массив → {} (цикл просто не выполнится).

/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  // Через Map()
  const res = new Map();

  // this.forEach((item) => {
  //   const key = fn(item);
  //   if (res.has(key)) {
  //     res.get(key).push(item);
  //   } else {
  //     res.set(key, [item]);
  //   }
  // });

  this.forEach((item) => {
    const key = fn(item);

    if (!res.has(key)) {
      res.set(key, []);
    }
    res.get(key).push(item);
  });

  return Object.fromEntries(res);

  // Через Object
  const resObj = {};
  this.forEach((item) => {
    const key = fn(item);

    if (res[key]) {
      res[key].push(item);
    } else {
      res[key] = [item];
    }
  });

  return resObj;
};

// --- локальные тесты (примеры из LeetCode) ---

function runTests() {
  const ex1 = [{ id: '1' }, { id: '1' }, { id: '2' }].groupBy(function (item) {
    return item.id;
  });
  console.log('ex1', JSON.stringify(ex1));
  // {"1":[{"id":"1"},{"id":"1"}],"2":[{"id":"2"}]}

  const ex2 = [
    [1, 2, 3],
    [1, 3, 5],
    [1, 5, 9],
  ].groupBy(function (list) {
    return String(list[0]);
  });
  console.log('ex2', JSON.stringify(ex2));
  // {"1":[[1,2,3],[1,3,5],[1,5,9]]}

  const ex3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].groupBy(function (n) {
    return String(n > 5);
  });
  console.log('ex3', JSON.stringify(ex3));
  // {"true":[6,7,8,9,10],"false":[1,2,3,4,5]}

  console.log('ex4 empty', JSON.stringify([].groupBy((x) => String(x))));
  // {}
}

// Раскомментируйте после реализации:
runTests();
