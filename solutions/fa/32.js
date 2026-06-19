/*
Задача 1: Custom Promise.all

Реализуйте функцию promiseAll(values), которая работает аналогично Promise.all.

Требования:
1. Принимает массив значений и Promise.
2. Запускает все Promise параллельно.
3. Возвращает Promise с массивом результатов.
4. Порядок результатов должен совпадать с порядком входных элементов,
   независимо от порядка завершения Promise.
5. Если хотя бы один Promise завершился с ошибкой,
   итоговый Promise должен завершиться с этой ошибкой.
6. Для пустого массива вернуть Promise со значением [].
7. Использовать Promise.all нельзя.
*/

// Лёша

function promiseAll(values) {}

const delay = (value, timeout, shouldReject = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error(String(value)));
        return;
      }

      resolve(value);
    }, timeout);
  });
};

promiseAll([delay('first', 300), delay('second', 100), 42]).then(console.log);

// ["first", "second", 42]

promiseAll([]).then(console.log);
// []

promiseAll([delay('success', 100), delay('request failed', 50, true)]).catch(
  (error) => {
    console.log(error.message);
  },
);

// "request failed"
