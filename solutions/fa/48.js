// 22. Generate Parentheses
// https://leetcode.com/problems/generate-parentheses/
// После Valid Parentheses (47.js)
//
// Дано целое n — число пар скобок.
// Вернуть все строки с n парами правильно расставленных скобок.
//
// Примеры:
//   n = 3 → ["((()))","(()())","(())()","()(())","()()()"]
//   n = 1 → ["()"]
//
// Порядок строк в ответе не важен.
//
// Связь с вашими задачами:
//   • 47.js Valid Parentheses — что такое «правильные» скобки;
//   • стек / баланс — сколько открытых ещё не закрыто;
//   • рекурсия / backtracking — перебор вариантов с откатом.
//
// Идея уровня структуры:
//   Строим строку посимвольно. На каждом шаге можно добавить '(' или ')'.
//   Ограничения (чтобы не генерировать мусор):
//     • '(' можно добавить, если открывающих ещё < n;
//     • ')' можно добавить, если закрывающих меньше, чем открывающих
//       (иначе получится ")(" в какой-то момент — невалидно).
//   Когда длина строки = 2 * n — кладём в результат.
//
// Подсказки:
//   1. Функция-хелпер: текущая строка, сколько '(', сколько ')'.
//   2. База: open + close === 2 * n (или длина === 2 * n) → push в res.
//   3. Если open < n → рекурсия с добавлением '('.
//   4. Если close < open → рекурсия с добавлением ')'.
//   5. Это backtracking: пробуем ветку, потом «откатываемся» (через новую строку
//      или pop, если собираешь массив символов).

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // Готовим результирующий массив
  const res = [];

  // Рекурсивный хелпер
  // Принимает строку, количество('('), количество(')')
  function backtrack(str, open, close) {
    // Если длина строки уже совпадает с количеством пар скобок -> набрали все скобки
    if (str.length === n * 2) {
      // кладём в результат
      res.push(str);
      return;
    }

    // Если открывающих скобок меньше, чем число пар скобок
    if (open < n) {
      // Добавляем одну открывающую скбоку, обновляем счетчик и рекурсивно вызываем хелпер
      backtrack(str + '(', open + 1, close);
    }

    // Если закрывающих скобок меньше, чем открывающих
    if (close < open) {
      // Добавляем одну закрывающую скбоку, обновляем счетчик и рекурсивно вызываем хелпер
      backtrack(str + ')', open, close + 1);
    }
  }

  // Первый вызов хелпера
  backtrack('', 0, 0);

  return res;
};

// --- локальные тесты ---

function sortedEqual(a, b) {
  return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
}

function assertEqual(label, got, expected) {
  const ok = sortedEqual(got, expected);
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  assertEqual('ex1 n=1', generateParenthesis(1), ['()']);

  assertEqual('ex2 n=2', generateParenthesis(2), ['(())', '()()']);

  assertEqual('ex3 n=3', generateParenthesis(3), [
    '((()))',
    '(()())',
    '(())()',
    '()(())',
    '()()()',
  ]);
}

// Раскомментируйте после реализации:
runTests();

// const helper = (str, open, close) => {
//   if (open === n && close === n) {
//     res.push(str);
//     return;
//   }
//   if (open < n) {
//     helper(str + '(', open + 1, close);
//   }
//   if (close < open) {
//     helper(str + ')', open, close + 1);
//   }
// };

// helper('', 0, 0);
