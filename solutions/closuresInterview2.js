// Задача: Создать функцию-счётчик с именем
// Напиши функцию createNamedCounter(name), которая возвращает объект с двумя методами:

// increment() — увеличивает счётчик на 1 и возвращает строку: "<name> count is <currentCount>".

// reset() — сбрасывает счётчик в 0 и возвращает строку: "<name> count reset".

// При этом каждый вызов createNamedCounter должен создавать независимый счётчик
// с собственным замкнутым состоянием.

function createNamedCounter(name) {
  let counter = 0;

  return {
    increment() {
      counter++;
      return `${name} count is ${counter}`;
    },

    reset() {
      counter = 0;
      return `${name} count reset`;
    },

    decrement() {
      counter--;
      return `${name} count is ${counter}`;
    },

    showResult() {
      return `Result for ${name} count is ${counter}`;
    },
  };
}

const counterA = createNamedCounter("Alice");
console.log(counterA.increment()); // "Alice count is 1"
console.log(counterA.increment()); // "Alice count is 2"
console.log(counterA.showResult());
console.log(counterA.reset()); // "Alice count reset"
console.log(counterA.increment()); // "Alice count is 1"

const counterB = createNamedCounter("Bob");
console.log(counterB.increment()); // "Bob count is 1"
console.log(counterB.increment()); // "Bob count is 2"
console.log(counterA.increment()); // "Alice count is 2" (независимо от Bob)
