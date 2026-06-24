// 392. Is Subsequence
// https://leetcode.com/problems/is-subsequence/
// Top Interview 150 — после Valid Palindrome II (39.js)
//
// Даны две строки s и t (строчные латинские буквы a-z).
// Вернуть true, если s — подпоследовательность t, иначе false.
//
// Подпоследовательность: из t можно удалить часть символов (или ни одного),
// не меняя порядок оставшихся, и получить s.
//
// Примеры:
//   s = "abc", t = "ahbgdc" → true   (a…b…c в t по порядку)
//   s = "axc", t = "ahbgdc" → false  (x нет в нужном месте)
//
// Граничные случаи:
//   • пустой s → true (пустая строка всегда подпоследовательность)
//   • s длиннее t → false
//
// Связь с вашими задачами:
//   • 39.js — два указателя по строке;
//   • 4.js — два указателя / проход по массиву;
//   • 38.js — посимвольное сравнение строк.
//
// Подсказки уровня структуры:
//   1. Указатель i по s, указатель j по t.
//   2. Если s[i] === t[j] — нашли совпадение: i++, j++.
//   3. Иначе — символ t не подходит: только j++ (пропускаем в t).
//   4. После цикла: i === s.length → все символы s нашлись → true.

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (s.length === 0) return true;
  if (s.length > t.length) return false;

  let i = 0;
  let j = 0;

  while (j < t.length) {
    if (s[i] === t[j]) {
      i++;
      j++;
    } else {
      j++;
    }
  }

  return i === s.length;
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
  assertEqual('ex1', isSubsequence('abc', 'ahbgdc'), true);
  assertEqual('ex2', isSubsequence('axc', 'ahbgdc'), false);

  assertEqual('ex3 empty s', isSubsequence('', 'ahbgdc'), true);
  assertEqual('ex4 empty both', isSubsequence('', ''), true);
  assertEqual('ex5 s longer than t', isSubsequence('abc', 'ab'), false);

  assertEqual('ex6 exact match', isSubsequence('abc', 'abc'), true);
  assertEqual('ex7 single char', isSubsequence('a', 'bba'), true);
  assertEqual('ex8 single char fail', isSubsequence('c', 'bba'), false);

  assertEqual('ex9 repeated in t', isSubsequence('aaa', 'abbbaa'), true);
  assertEqual('ex10 order matters', isSubsequence('acb', 'ahbgdc'), false);
}

// Раскомментируйте после реализации:
runTests();
