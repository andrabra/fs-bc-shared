// Реализуйте функцию flatten, которая
// принимает массив с вложенными массивами и возвращает новый плоский массив.

// Нужно раскрыть все уровни вложенности.

// решение!

function flatten(array) {
  // TODO: реализовать функцию
  const res = [];
  for (let item of array) {
    if (Array.isArray(item)) {
      res.push(...flatten(item));
    } else {
      res.push(item);
    }
  }
  return res;
}

console.log(flatten([1, [2, [3, 4]], 5]));
// Ожидаемый результат: [1, 2, 3, 4, 5]

console.log(flatten([]));
// Ожидаемый результат: []

console.log(flatten([1, 2, 3]));
// Ожидаемый результат: [1, 2, 3]

console.log(flatten([[['a']], ['b', ['c']]]));
// Ожидаемый результат: ['a', 'b', 'c']

console.log(flatten([1, [], [2, [], [3]]]));
// Ожидаемый результат: [1, 2, 3]

console.log(flatten([null, [undefined, [false, 0, '']]]));
// Ожидаемый результат: [null, undefined, false, 0, '']

const source = [1, [2, 3]];
const result = flatten(source);

console.log(result);
// Ожидаемый результат: [1, 2, 3]

console.log(source);
// Ожидаемый результат: [1, [2, 3]]
