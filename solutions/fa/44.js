// 2465. Number of Distinct Averages
// https://leetcode.com/problems/number-of-distinct-averages/
// После Two Sum (43.js)
//
// Дан массив nums чётной длины.
// Пока массив не пуст:
//   1. найти минимум и удалить;
//   2. найти максимум и удалить;
//   3. записать среднее двух удалённых: (a + b) / 2.
//
// Вернуть количество **различных** средних за весь процесс.
// При равных min/max можно удалять любой — на ответ не влияет.
//
// Примеры:
//   [4, 1, 4, 0, 3, 5] → 2
//     средние: 2.5, 2.5, 3.5 → два различных значения
//   [1, 100] → 1
//
// Ограничения: 2 <= nums.length <= 100, 0 <= nums[left] <= 100, длина чётная.
//
// Связь с вашими задачами:
//   • 43.js — Set / Map для уникальных значений;
//   • sort — упорядочить, чтобы min/max брать с краёв;
//   • два указателя left / right (как в 39.js).
//
// Подсказки:
//   1. После сортировки min всегда слева, max справа.
//   2. n/2 итераций: пара nums[left] и nums[n - 1 - left].
//   3. Средние различны ⇔ различны суммы (a + b) — в Set удобно хранить сумму.
//   4. Вернуть размер Set.

/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function (nums) {
  // ваш код

  const average = new Set();
  const sorted = nums.sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const n = (sorted[left] + sorted[right]) / 2;

    average.add(n);

    left++;
    right--;
  }

  return average.size;
};

// --- локальные тесты ---

function assertEqual(label, got, expected) {
  const ok = got === expected;
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', got);
    console.log('  expected:', expected);
  }
}

function runTests() {
  assertEqual('ex1', distinctAverages([4, 1, 4, 0, 3, 5]), 2);
  assertEqual('ex2', distinctAverages([1, 100]), 1);

  assertEqual('ex3 all same pairs', distinctAverages([5, 5, 5, 5]), 1);
  // [1,2,3,4] → средние 2.5 и 2.5 → один distinct, не два
  assertEqual('ex4 two pairs different', distinctAverages([1, 2, 3, 8]), 2);
  assertEqual('ex5', distinctAverages([0, 100, 0, 100]), 1);
}

// Раскомментируйте после реализации:
runTests();
