// 28. Find the Index of the First Occurrence in a String
// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/
//
// Даны две строки haystack и needle. Вернуть индекс первого вхождения needle
// в haystack, или -1, если needle не является частью haystack.
//
// Примеры:
//   haystack = "sadbutsad", needle = "sad" → 0
//   haystack = "leetcode", needle = "leeto" → -1
//
// Ограничения:
//   1 <= haystack.length, needle.length <= 10^4
//   haystack и needle состоят только из строчных английских букв.
//
// Связь с вашими задачами:
//   • встроенные строковые методы (indexOf, substring, slice);
//   • скользящее окно / сравнение подстрок;
//   • можно решать через встроенный indexOf (одна строчка) или руками
//     (два указателя, KMP, Rolling Hash).
//
// Идея уровня структуры:
//   Перебираем все позиции в haystack, где может начинаться needle.
//   Для каждой позиции проверяем, совпадает ли подстрока haystack
//   длины needle.length с needle.
//   Если совпала — возвращаем индекс.
//   Если ни одна не совпала — возвращаем -1.
//
// Подсказки (алгоритмическая канва):
//   1. Внешний цикл от 0 до haystack.length - needle.length включительно.
//   2. Внутренний цикл по символам needle, сравниваем с haystack[i + j].
//   3. Если все символы совпали → return i.
//   4. Оптимизация: если haystack.length < needle.length → сразу -1.
//   5. Можно использовать встроенный haystack.indexOf(needle) — это
//      самое короткое и надёжное решение, но для тренировки полезно
//      написать свою реализацию.

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      if (haystack.slice(i, i + needle.length) === needle) {
        return i;
      }
    }
  }

  return -1;
};

// --- локальные тесты ---

function assertEqual(label, got, expected) {
  const ok = got === expected;
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  assertEqual('ex1', strStr('sadbutsad', 'sad'), 0);
  assertEqual('ex2', strStr('leetcode', 'leeto'), -1);
  assertEqual('ex3', strStr('hello', 'll'), 2);
  assertEqual('ex4', strStr('aaaaa', 'bba'), -1);
  assertEqual('ex5', strStr('abc', 'c'), 2);
  assertEqual('ex6', strStr('abc', 'abcd'), -1);
}

// Раскомментируйте после реализации:
runTests();
