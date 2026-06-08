// 2715. Timeout Cancellation
// https://leetcode.com/problems/timeout-cancellation/
// 30 Days of JavaScript — Day 6 (async / timers)
//
// Дана функция fn, массив аргументов args и задержка t (мс).
// Верните функцию cancelFn.
//
// Поведение:
//   1. Вызов fn(...args) должен произойти через t миллисекунд
//      (как setTimeout).
//   2. Если до истечения t вызвать cancelFn — отложенный вызов fn
//      отменяется, fn не выполняется.
//   3. Если cancelFn вызвали после t — fn уже успел выполниться,
//      отменять нечего (повторный cancel безопасен).
//
// На LeetCode тесты устроены так:
//   const cancelFn = cancellable(fn, args, t);
//   setTimeout(cancelFn, cancelTimeMs);
//
// cancelTimeMs — когда судья вызывает отмену (отдельный параметр теста).
// Сравните t и cancelTimeMs:
//   cancelTimeMs < t  → fn не должен выполниться
//   cancelTimeMs >= t → fn выполнится в момент t
//
// Полезные API: setTimeout, clearTimeout
//
// Отличие от массивов (4.js, 5.js): здесь время и отмена асинхронных
// действий, а не перестановка элементов in-place.

/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function} cancelFn
 */
var cancellable = function (fn, args, t) {
  // TODO: запланировать вызов fn с args через t мс
  const timeoutId = setTimeout(() => {
    fn(...args);
  }, t);
  // TODO: вернуть функцию, которая отменяет этот план
  const clearMyTimeOut = () => {
    clearTimeout(timeoutId);
  };

  return clearMyTimeOut;
};

// --- локальная проверка (упрощённо, без точных таймстампов LeetCode) ---

/**
 * Имитирует судью: cancellable + setTimeout(cancelFn, cancelTimeMs).
 * @returns {Promise<{ ran: boolean, returned?: unknown }>}
 */
function simulate(fn, args, t, cancelTimeMs) {
  return new Promise((resolve) => {
    let ran = false;
    let returned;

    const wrapped = (...callArgs) => {
      ran = true;
      returned = fn(...callArgs);
      return returned;
    };

    const cancelFn = cancellable(wrapped, args, t);
    setTimeout(cancelFn, cancelTimeMs);

    const waitMs = Math.max(t, cancelTimeMs) + 100;
    setTimeout(() => resolve({ ran, returned }), waitMs);
  });
}

async function runTests() {
  // Пример 1: t=20, cancel в 50 → fn успевает (20 < 50)
  const ex1 = await simulate((x) => x * 5, [2], 20, 50);
  console.log('ex1', ex1);
  // Ожидается: { ran: true, returned: 10 }

  // Пример 2: t=100, cancel в 50 → fn не вызывается (50 < 100)
  const ex2 = await simulate((x) => x ** 2, [2], 100, 50);
  console.log('ex2', ex2);
  // Ожидается: { ran: false }

  // Пример 3: t=30, cancel в 100 → fn успевает (30 < 100)
  const ex3 = await simulate((x1, x2) => x1 * x2, [2, 4], 30, 100);
  console.log('ex3', ex3);
  // Ожидается: { ran: true, returned: 8 }

  // Дополнительно: без отмены (cancel очень поздно)
  const ex4 = await simulate((x) => x + 1, [9], 30, 500);
  console.log('ex4', ex4);
  // Ожидается: { ran: true, returned: 10 }
}

// Раскомментируйте после реализации cancellable:
runTests().catch(console.error);
