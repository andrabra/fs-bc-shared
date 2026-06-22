// Codewars 6 kyu — Numerical Palindrome #3.5
// https://www.codewars.com/kata/58e2708f9bd67fee17000080/train/javascript
// Серия Numerical Palindrome — после Stop it, HTML! (35.js)
//
// Дано число num. Вернуть все числовые палиндромы, которые встречаются
// как непрерывные подстроки в десятичной записи num.
//
// Числовой палиндром — читается одинаково слева направо и справа налево
// (2332, 110011, 22, 1221).
//
// Правила валидности палиндрома в этой kata:
//   • не одна цифра (5, 7 — не считаются);
//   • не может начинаться или заканчиваться нулём (010, 00 — не валидны);
//   • длина подстроки ≥ 2.
//
// Результат:
//   • массив уникальных палиндромов, отсортированный по возрастанию;
//   • "No palindromes found" — если валидных нет;
//   • "Not valid" — если num не целое число или num < 0.
//
// Примеры:
//   1221     → [22, 1221]
//   34322122 → [22, 212, 343, 22122]
//   1001331  → [33, 1001, 1331]
//   1294     → "No palindromes found"
//   "1221"   → "Not valid"
//
// Связь с вашими задачами:
//   • aclean / строки — slice, split, reverse;
//   • 22.js chunk — перебор подотрезков;
//   • Set / sort — уникальность и порядок (как в join / groupBy).
//
// Подсказки уровня структуры:
//   1. Сначала проверка входа: Number.isInteger(num) && num >= 0.
//   2. num → строка; два вложенных цикла — все подстроки [i..j].
//   3. Подстроку → Number; проверить палиндром + правила про 0 и длину.
//   4. Хранить в Set, в конце [...set].sort((a,b) => a - b).

/**
 * @param {number} num
 * @return {number[]|string}
 */
function palindrome(num) {
  if (!Number.isInteger(num) || num < 0) return 'Not valid';

  const str = String(num).split('');
  const palSet = new Set();

  if (str.length === 0) return 'Not valid';
  if (str.length < 2) return 'No palindromes found';

  for (let i = 0; i < str.length; i++) {
    for (let j = str.length - 1; j > i; j--) {
      if (str[i] === str[j]) {
        const sub = str.slice(i, j + 1);
        if (palindrome(sub)) {
          palSet.add(Number(sub.join('')));
        }
      }
    }
  }

  if (palSet.size === 0) return 'No palindromes found';

  return [...palSet].sort((a, b) => a - b);
}

// --- локальные тесты ---

function assertEqual(label, got, expected) {
  const ok = JSON.stringify(got) === JSON.stringify(expected);
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  assertEqual('ex1', palindrome(1221), [22, 1221]);
  assertEqual('ex2', palindrome(34322122), [22, 212, 343, 22122]);
  assertEqual('ex3', palindrome(1001331), [33, 1001, 1331]);
  assertEqual('ex4', palindrome(1294), 'No palindromes found');
  assertEqual('ex5 string input', palindrome('1221'), 'Not valid');

  assertEqual('ex6 negative', palindrome(-5), 'Not valid');
  assertEqual('ex7 not integer', palindrome(12.21), 'Not valid');
  assertEqual('ex8 single digit num', palindrome(7), 'No palindromes found');

  // 00 как подстрока — не валиден; 11 — палиндром
  assertEqual(
    'ex9 leading zeros in substring',
    palindrome(11011),
    [11, 101, 11011],
  );
}

// Раскомментируйте после реализации:
runTests();
