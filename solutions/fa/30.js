/*
Задача 3: Once

Реализуйте функцию once(fn).

Требования:
1. Переданная функция выполняется только при первом вызове.
2. Все последующие вызовы возвращают результат первого вызова.
3. Аргументы последующих вызовов игнорируются.
4. Контекст this должен сохраняться при первом вызове.
*/

function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      // result = fn(...args);
      result = fn.apply(this, args);
    }
    return result;
  };
}

let callsCount = 0;

const initialize = once((value) => {
  callsCount += 1;

  return {
    value,
    initializedAt: Date.now(),
  };
});

const firstResult = initialize('first');
const secondResult = initialize('second');

console.log(firstResult);
console.log(secondResult);
console.log(firstResult === secondResult); // true
console.log(callsCount); // 1

const obj = {
  value: 42,
  getValue: once(function () {
    return this.value;
  }),
};

console.log(obj.getValue()); // 42 (первый вызов)
console.log(obj.getValue()); // 42 (второй вызов, результат закеширован)
