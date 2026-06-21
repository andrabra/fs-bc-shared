// 2618. Check if Object Instance of Class
// https://leetcode.com/problems/check-if-object-instance-of-class/
// 30 Days of JavaScript — после Group By (25.js)
//
// Напиши функцию checkIfInstanceOf(obj, classFunction), которая проверяет,
// является ли obj экземпляром classFunction или её суперкласса.
//
// Объект считается экземпляром класса, если у него есть доступ к методам этого класса.
//
// Правила:
//   • obj и classFunction могут быть любого типа (в т.ч. undefined, null, примитивы);
//   • наследование учитывается (подкласс → true и для родителя);
//   • конструктор не считается экземпляром самого себя (Date vs Date → false);
//   • примитивы могут считаться экземплярами обёрточных классов (5 и Number → true),
//     хотя обычный instanceof для примитивов даёт false;
//   • нельзя использовать встроенный оператор instanceof.
//
// Связь с вашими задачами:
//   • классы и прототипы — тема «цепочки наследования» в JS;
//   • 26.js EventEmitter — работа с классами и методами на прототипе.

/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (
    classFunction === null ||
    classFunction === undefined ||
    typeof classFunction !== 'function'
  )
    return false;

  if (obj === null || obj === undefined) return false;

  let curr = obj;

  if (typeof obj !== 'object') {
    curr = Object(obj);
  }

  while (curr !== null) {
    const proto = Object.getPrototypeOf(curr);
    if (proto === classFunction.prototype) return true;

    curr = proto;
  }

  return false;
};

// --- локальные тесты (примеры из LeetCode) ---

function runTests() {
  console.log('ex1 Date', checkIfInstanceOf(new Date(), Date));
  // true

  class Animal {}
  class Dog extends Animal {}
  console.log('ex2 Dog/Animal', checkIfInstanceOf(new Dog(), Animal));
  // true

  console.log('ex3 Date ctor', checkIfInstanceOf(Date, Date));
  // false

  console.log('ex4 primitive Number', checkIfInstanceOf(5, Number));
  // true

  console.log('ex5 undefined', checkIfInstanceOf(undefined, Object));
  // false
}

// Раскомментируйте после реализации:
runTests();
