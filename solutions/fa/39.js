// 680. Valid Palindrome II
// https://leetcode.com/problems/valid-palindrome-ii/
// Top Interview 150 — после Valid Palindrome (38.js)
//
// Дана строка s (только строчные латинские буквы a-z).
// Вернуть true, если s можно сделать палиндромом,
// удалив **не более одного** символа. Иначе false.
//
// Примеры:
//   "aba"  → true   (уже палиндром, удалять не нужно)
//   "abca" → true   (удалить 'c' → "aba" или 'b' → "aca")
//   "abc"  → false  (одной удалённой буквы недостаточно)
//
// Отличие от 38.js (125):
//   • там — игнорировать не-буквы/цифры и регистр;
//   • здесь — только a-z, зато разрешено **одно** удаление.
//
// Связь с вашими задачами:
//   • 38.js — два указателя / сравнение с концов;
//   • 4.js removeElement — «пропустить» один элемент;
//   • 36.js — палиндром как свойство строки.
//
// Подсказки уровня структуры:
//   1. Два указателя: left с начала, right с конца.
//   2. Пока s[left] === s[right] — сдвигать оба к центру.
//   3. При первом несовпадении — «потратить» одно удаление:
//      проверить, палиндром ли остаток при skip left ИЛИ skip right.
//   4. Helper isPalindromeRange(s, left, right) — палиндром ли отрезок.
//   5. Если несовпадений больше одного (после попытки skip) → false.

// Главное в этой задаче — осознать,
// что при первом несовпадении мы обязаны проверить два возможных удаления,
// и больше никаких вариантов не существует.
// Код должен быть простым и использовать два указателя без лишних накладных расходов.

// Пусть нашли первое несовпадение: s[left] !== s[right].
// Чтобы после удаления одного символа получить палиндром, удалённый символ обязательно должен быть либо на позиции left, либо на позиции right.
// Почему? Потому что все символы внутри (между left и right) пока не рассматривались — они ещё не участвовали в сравнении. А те, что левее left и правее right, уже попарно совпали. Значит, нарушение может быть исправлено только удалением одного из двух текущих крайних символов.

// Проверка двух вариантов полностью покрывает все возможности, поэтому алгоритм корректен.

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  const regex = new RegExp(/[^a-zA-Z]/g);

  const cleaned = s.replace(regex, '').toLowerCase();

  const cleanArr = cleaned.split('');

  function isPalindromeRange(left, right) {
    while (left < right) {
      if (cleanArr[left] !== cleanArr[right]) return false;
      left++;
      right--;
    }

    return true;
  }

  let left = 0;
  let right = cleanArr.length - 1;

  while (left < right) {
    if (cleanArr[left] === cleanArr[right]) {
      left++;
      right--;
    } else {
      return (
        isPalindromeRange(left + 1, right) || isPalindromeRange(left, right - 1)
      );
    }
  }

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
  assertEqual('ex1', validPalindrome('aba'), true);
  assertEqual('ex2', validPalindrome('abca'), true);
  assertEqual('ex3', validPalindrome('abc'), false);

  assertEqual('ex4', validPalindrome('a'), true);
  assertEqual('ex5', validPalindrome('aa'), true);
  assertEqual('ex6', validPalindrome('ab'), true); // удалить a или b → одна буква
  assertEqual('ex7', validPalindrome('abb'), true); // удалить b → "ab" нет... удалить a → "bb" ✓
  assertEqual(
    'ex8',
    validPalindrome(
      'aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga',
    ),
    true,
  );
  assertEqual('ex9', validPalindrome('deeee'), true);
  assertEqual(
    'ex10',
    validPalindrome('eeebce3baaaaca1a1aabaacaaaa3ecbbbeee'),
    false,
  );
}

// Раскомментируйте после реализации:
runTests();
