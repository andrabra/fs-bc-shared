// 2716. Interval Cancellation
// https://leetcode.com/problems/interval-cancellation/
// 30 Days of JavaScript — следующая после Timeout Cancellation (6.js)
//
// Дана функция fn, массив аргументов args и интервал t (мс).
// Верните функцию cancelFn.
//
// Поведение:
//   1. fn(...args) вызывается СРАЗУ (в момент 0).
//   2. Затем fn(...args) вызывается снова каждые t миллисекунд.
//   3. Через cancelTimeMs судья вызывает cancelFn (как в 6.js):
//        setTimeout(cancelFn, cancelTimeMs);
//      После отмены новых вызовов быть не должно.
//
// Отличие от Timeout Cancellation (6.js):
//   там — один отложенный вызов через t;
//   здесь — первый вызов сразу + повтор каждые t (интервал).
//
// Полезные API: setInterval, clearInterval
// (и по аналогии с 6.js: setTimeout / clearTimeout для отмены одного раза)
//
// Подсказка: сколько раз fn успеет вызваться до cancelTimeMs?
//   Пример 1: t=35, cancel в 190 → вызовы в 0, 35, 70, 105, 140, 175 → 6 раз
//   (в 190 уже отмена, следующий тик в 210 не наступает)

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function} cancelFn
 */
var cancellable = function (fn, args, t) {
  // TODO: вызвать fn сразу
  fn(...args);
  // TODO: запустить повтор каждые t мс
  const intervalId = setInterval(() => {
    fn(...args);
  }, t);
  // TODO: вернуть функцию, которая останавливает повтор
  return () => clearInterval(intervalId);
};

// --- локальная проверка ---

/**
 * @returns {Promise<{ callCount: number, returns: unknown[] }>}
 */
function simulate(fn, args, t, cancelTimeMs) {
  return new Promise((resolve) => {
    const returns = [];

    const wrapped = (...callArgs) => {
      const value = fn(...callArgs);
      returns.push(value);
      return value;
    };

    const cancelFn = cancellable(wrapped, args, t);
    setTimeout(cancelFn, cancelTimeMs);

    const waitMs = cancelTimeMs + 100;
    setTimeout(() => resolve({ callCount: returns.length, returns }), waitMs);
  });
}

async function runTests() {
  // Пример 1: t=35, cancel в 190 → 6 вызовов, каждый возвращает 8
  const ex1 = await simulate((x) => x * 2, [4], 35, 190);
  console.log('ex1', ex1);
  // Ожидается: callCount 6, returns [8, 8, 8, 8, 8, 8]

  // Пример 2: t=30, cancel в 165 → 6 вызовов, каждый 10
  const ex2 = await simulate((x1, x2) => x1 * x2, [2, 5], 30, 165);
  console.log('ex2', ex2);
  // Ожидается: callCount 6, returns [10, 10, 10, 10, 10, 10]

  // Пример 3: t=50, cancel в 180 → 4 вызова, каждый 9
  const ex3 = await simulate((x1, x2, x3) => x1 + x2 + x3, [5, 1, 3], 50, 180);
  console.log('ex3', ex3);
  // Ожидается: callCount 4, returns [9, 9, 9, 9]

  // Дополнительно: отмена сразу (до первого тика интервала)
  const ex4 = await simulate((x) => x + 1, [1], 50, 10);
  console.log('ex4', ex4);
  // Ожидается: callCount 1 (только немедленный вызов), returns [2]
}

// Раскомментируйте после реализации:
runTests().catch(console.error);
