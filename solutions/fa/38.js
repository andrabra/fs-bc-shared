// 125. Valid Palindrome
// https://leetcode.com/problems/valid-palindrome/
// Top Interview 150 — после Numerical Palindrome #3.5 (36.js)
//
// Дана строка s. Вернуть true, если это палиндром, иначе false.
//
// Учитывать только буквы и цифры (a-z, A-Z, 0-9).
// Регистр не важен: 'A' === 'a'.
// Пробелы, знаки препинания и прочие символы — игнорировать.
//
// Примеры:
//   "A man, a plan, a canal: Panama" → true
//   "race a car"                     → false
//   " "                              → true  (после фильтрации пусто → палиндром)
//
// Связь с вашими задачами:
//   • 36.js — проверка палиндрома у подстроки (reverse / два указателя);
//   • aclean — работа со строками, нормализация;
//   • 4.js two pointers — removeDuplicates, removeElement.
//
// Подсказки уровня структуры:
//   1. Нормализация: toLowerCase + оставить только [a-z0-9]
//      (regex /replace, или цикл + isAlphanumeric).
//   2. Два указателя: left = 0, right = len - 1; сравнивать и сдвигать.
//   3. Альтернатива: cleaned === cleaned.split('').reverse().join('').
//   4. Пустая строка после очистки → true.

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const regex = new RegExp(/[^a-zA-Z0-9]/g);

  const cleaned = s.replace(regex, '').toLowerCase();
  const reverseCleaned = cleaned.split('').reverse().join('').toLowerCase();

  if (cleaned !== reverseCleaned) return false;

  return true;
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
  assertEqual('ex1', isPalindrome('A man, a plan, a canal: Panama'), true);

  assertEqual('ex2', isPalindrome('race a car'), false);
  assertEqual('ex3', isPalindrome(' '), true);
  assertEqual('ex4', isPalindrome('0P'), false);
  assertEqual('ex5', isPalindrome('a'), true);
  assertEqual('ex6', isPalindrome('ab'), false);
  assertEqual('ex6b', isPalindrome('aba'), true);
  assertEqual('ex7', isPalindrome('Was it a car or a cat I saw?'), true);
  assertEqual('ex8', isPalindrome('tab a cat'), false);
}

// Раскомментируйте после реализации:
runTests();
