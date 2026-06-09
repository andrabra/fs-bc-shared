// 2637. Promise Time Limit
// https://leetcode.com/problems/promise-time-limit/
// 30 Days of JavaScript — после Interval Cancellation (7.js)
//
// Дана асинхронная функция fn и лимит времени t (мс).
// Верните новую функцию — «ограниченную по времени» версию fn.
//
// При вызове limited(...args):
//   • если fn(...args) успевает завершиться за t мс → Promise resolve с результатом fn;
//   • если t мс прошло, а fn ещё не завершилась → Promise reject
//     со строкой "Time Limit Exceeded" (точный текст важен для судьи).
//
// Если fn сама reject / throw — пробрасывается её ошибка (не "Time Limit Exceeded"),
// если это произошло раньше лимита.
//
// Отличие от 6.js / 7.js:
//   там отменяли таймеры вокруг синхронного/простого fn;
//   здесь fn возвращает Promise, и нужно «обогнать» его по времени.
//
// Полезные API: Promise, Promise.race, setTimeout, async/await
//
// Подсказка по форме решения:
//   вернуть функцию, которая при вызове отдаёт Promise;
//   внутри — «гонка» между выполнением fn и таймером на t мс.

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return function (...args) {
    // TODO: вернуть Promise с лимитом t мс на fn(...args)
    return (
      Promise.race([
        new Promise((resolve, reject) =>
          setTimeout(() => {
            reject('Time Limit Exceeded');
          }, t),
        ),
        fn(...args),
      ])
        // .then()
        // .catch((e) => {
        //   throw e;
        // })
    );
  };
};

// var timeLimit1 = function (fn, t) {
//   return async function (...args) {
//     // TODO: вернуть Promise с лимитом t мс на fn(...args)
//     try {
//       return await Promise.race([
//         new Promise((resolve, reject) =>
//           setTimeout(() => {
//             reject('Time Limit Exceeded');
//           }, t),
//         ),
//         fn(...args),
//       ]);
//     } catch (e) {
//       throw e;
//     }
//   };
// };

// --- локальная проверка ---

/**
 * @returns {Promise<{ status: 'resolved' | 'rejected', value: unknown }>}
 */
async function runCase(limited, args) {
  try {
    const value = await limited(...args);
    return { status: 'resolved', value };
  } catch (err) {
    return { status: 'rejected', value: err };
  }
}

async function runTests() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Пример 1: fn ~100ms, t=50 → Time Limit Exceeded
  const fn1 = async (n) => {
    await delay(100);
    return n * n;
  };
  const ex1 = await runCase(timeLimit(fn1, 50), [5]);
  console.log('ex1', ex1);
  // Ожидается: { status: 'rejected', value: 'Time Limit Exceeded' }

  // Пример 2: fn ~100ms, t=150 → resolve 25
  const fn2 = async (n) => {
    await delay(100);
    return n * n;
  };
  const ex2 = await runCase(timeLimit(fn2, 150), [5]);
  console.log('ex2', ex2);
  // Ожидается: { status: 'resolved', value: 25 }

  // Пример 3: два аргумента, delay 120ms, t=150 → resolve 15
  const fn3 = async (a, b) => {
    await delay(120);
    return a + b;
  };
  const ex3 = await runCase(timeLimit(fn3, 150), [5, 10]);
  console.log('ex3', ex3);
  // Ожидается: { status: 'resolved', value: 15 }

  // Пример 4: fn сразу throw → reject "Error", не таймаут
  const fn4 = async () => {
    throw 'Error';
  };
  const ex4 = await runCase(timeLimit(fn4, 1000), []);
  console.log('ex4', ex4);
  // Ожидается: { status: 'rejected', value: 'Error' }
}

// Раскомментируйте после реализации:
runTests().catch(console.error);
