// 🔄 Задача 2. Только один раз (средний уровень)
// Напиши функцию once(fn), которая принимает функцию fn и возвращает новую функцию.
// Эта новая функция вызывает fn только один раз — при первом вызове.
// Последующие вызовы должны просто возвращать результат первого вызова, без повторного исполнения fn.

function once(func) {
  let called = false;
  let result;

  return function () {
    if (!called) {
      result = func();
      called = true;
      return result;
    }
    return result;
  };
}

function greet() {
  console.log("Hello!");
  return 42;
}

const greetOnce = once(greet);

greetOnce(); // Hello! => 42
greetOnce(); // (ничего не выводится) => 42
greetOnce(); // (ничего не выводится) => 42
