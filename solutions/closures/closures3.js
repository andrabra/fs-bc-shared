// 🧠 Задача 3. Лимит вызовов (продвинутый уровень)
// Напиши функцию limit(fn, n), которая возвращает новую функцию,
// но разрешает вызвать fn не более n раз. После этого возвращаемая функция будет выдавать undefined

function sayHi(name) {
  return "Hi, " + name + "!";
}

function limit(func, lim) {
  let count = lim;

  return function (...args) {
    if (count > 0) {
      count--;
      return func.apply(this, args);
    }
    return undefined;
  };
}

const limitedHi = limit(sayHi, 2);

console.log(limitedHi("Alice")); // "Hi, Alice!"
console.log(limitedHi("Bob")); // "Hi, Bob!"
console.log(limitedHi("Carol")); // undefined
