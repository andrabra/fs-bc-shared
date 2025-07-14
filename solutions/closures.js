// ✅ Задача 1. Счётчик (базовый уровень)
// Создай функцию makeCounter,
// которая при вызове возвращает другую функцию — счётчик.
// Каждый вызов этого счётчика должен увеличивать внутреннее значение на 1 и возвращать его.

function makeCounter() {
  let i = 0;
  return function () {
    return i++;
  };
}

const counter1 = makeCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = makeCounter();
console.log(counter2()); // 1 (независим от counter1)
