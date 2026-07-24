// 20. Valid Parentheses
// https://leetcode.com/problems/valid-parentheses/
// После Longest Common Prefix (46.js)
//
// Дана строка s, содержащая только символы '()[]{}'.
// Вернуть true, если скобки расставлены корректно, иначе false.
//
// Строка валидна, если:
//   • открывающая скобка закрывается скобкой того же типа;
//   • открывающие закрываются в правильном порядке (LIFO);
//   • каждая закрывающая имеет соответствующую открывающую.
//
// Примеры:
//   "()"      → true
//   "()[]{}"  → true
//   "(]"      → false
//   "([)]"    → false
//   "{[]}"    → true
//
// Связь с вашими задачами:
//   • стек — push/pop (как «отложенные» открывающие);
//   • Map / объект — пара «закрывающая → открывающая»;
//   • 39.js / 40.js — проход по строке одним указателем.
//
// Подсказки:
//   1. Иди по символам слева направо.
//   2. Открывающую — положи в стек.
//   3. Закрывающую — сними со стека и проверь, что типы совпали.
//   4. В конце стек должен быть пустым.
//   5. Если закрывающая пришла, а стек пуст — false.

const reverseMap = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
]);

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // Разбиваем строчку на массив символов
  const arr = s.split('');
  // Создаем пустой стек
  const stack = [];

  // Пробегаемся по каждому символу
  for (let i = 0; i < arr.length; i++) {
    // Проверяем является ли символ закрывающим
    if (reverseMap.has(arr[i])) {
      // Выбираем последний(верхний) элемент стека
      let up = stack[stack.length - 1];
      // Проверяем что верхний элемент стека подходит к закрывающему элементу
      if (reverseMap.get(arr[i]) === up) {
        // Если подходит, удаляем верхний элемент стека
        stack.pop();
      } else {
        // Если нет, значит пара скобок уже неправильная или стек пуст — строка невалидна
        return false;
      }
    } else {
      // Символ(скобка) является открывающей, добавляем его в стек
      stack.push(arr[i]);
    }
  }

  // Если что-то еще осталось в стеке, значит были скобки без пары
  if (stack.length > 0) return false;

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
  assertEqual('ex1', isValid('()'), true);
  assertEqual('ex2', isValid('()[]{}'), true);
  assertEqual('ex3', isValid('(]'), false);
  assertEqual('ex4', isValid('([)]'), false);
  assertEqual('ex5', isValid('{[]}'), true);

  assertEqual('ex6 empty', isValid(''), true);
  assertEqual('ex7 only open', isValid('((('), false);
  assertEqual('ex8 only close', isValid(')))'), false);
  assertEqual('ex9 nested', isValid('({[]})'), true);
  assertEqual('ex10 mismatch nest', isValid('({[}])'), false);
}

// Раскомментируйте после реализации:
runTests();
