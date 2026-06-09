// 2627. Debounce
// https://leetcode.com/problems/debounce/
// 30 Days of JavaScript — после Memoize (10.js)
//
// Даны функция fn и задержка t (мс). Верните debounced-версию.
//
// Debounce:
//   • каждый вызов обёртки ОТКЛАДЫВАЕТ выполнение fn на t мс;
//   • если обёртку вызвали СНОВА раньше, чем прошло t мс с прошлого
//     вызова — предыдущий отложенный запуск ОТМЕНЯЕТСЯ;
//   • выполняется только «последний» вызов в серии, через t мс после него.
//
// Пример (t = 50):
//   dlog(1) в момент 50ms  → fn запланирована на ~100ms
//   dlog(2) в момент 75ms  → отмена предыдущего, fn запланирована на ~125ms
//   Итог: fn вызвана один раз с аргументом 2 в ~125ms
//
// Обёртка должна принимать те же аргументы, что и fn (...args).
//
// Полезные API: setTimeout, clearTimeout (как в 6.js, 9.js)
//
// Отличие от:
//   • Timeout Cancellation (6.js) — один отложенный вызов + cancel;
//   • debounce — при каждом новом вызове сбрасываем таймер и планируем заново.
//
// Подсказка: в замыкании храните id текущего таймера.

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function} debounced function
 */
function debounce(fn, t) {
  let timeoutId = null;

  function wrapped(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, t);
  }

  return wrapped;
}

// --- локальная проверка ---

/**
 * Запускает debounced-функцию по расписанию calls[i].t,
 * собирает моменты реального вызова fn.
 *
 * @param {number} t — debounce delay
 * @param {{ t: number, inputs: unknown[] }[]} calls
 * @returns {Promise<{ t: number, inputs: unknown[] }[]>}
 */
function runScenario(t, calls) {
  return new Promise((resolve) => {
    const output = [];
    const t0 = Date.now();

    const log = (...inputs) => {
      output.push({
        t: Date.now() - t0,
        inputs,
      });
    };

    const dfn = debounce(log, t);

    for (const { t: callAt, inputs } of calls) {
      setTimeout(() => dfn(...inputs), callAt);
    }

    const lastCall = calls.length ? Math.max(...calls.map((c) => c.t)) : 0;
    const wait = lastCall + t + 150;

    setTimeout(() => resolve(output), wait);
  });
}

/** Сравниваем inputs; время — с допуском ±30ms (реальные таймеры) */
function assertScenario(label, got, expected) {
  const okLen = got.length === expected.length;
  const okInputs =
    okLen &&
    got.every(
      (g, i) => JSON.stringify(g.inputs) === JSON.stringify(expected[i].inputs),
    );

  const okTime =
    okLen && got.every((g, i) => Math.abs(g.t - expected[i].t) <= 30);

  console.log(label, got);
  console.log(
    okLen && okInputs && okTime ? 'OK' : 'CHECK',
    okInputs ? 'inputs ok' : 'inputs FAIL',
    okTime ? 'time ok' : 'time approx (LeetCode точнее)',
  );
}

async function runTests() {
  // Пример 1: t=50, вызовы в 50 и 75 → один fn(2) около 125
  const ex1 = await runScenario(50, [
    { t: 50, inputs: [1] },
    { t: 75, inputs: [2] },
  ]);
  assertScenario('ex1', ex1, [{ t: 125, inputs: [2] }]);

  // Пример 2: t=20, вызовы в 50 и 100 → fn(1) ~70, fn(2) ~120
  const ex2 = await runScenario(20, [
    { t: 50, inputs: [1] },
    { t: 100, inputs: [2] },
  ]);
  assertScenario('ex2', ex2, [
    { t: 70, inputs: [1] },
    { t: 120, inputs: [2] },
  ]);

  // Пример 3: t=150, два вызова в 300 → остаётся только fn(5,6) ~450
  const ex3 = await runScenario(150, [
    { t: 50, inputs: [1, 2] },
    { t: 300, inputs: [3, 4] },
    { t: 300, inputs: [5, 6] },
  ]);
  assertScenario('ex3', ex3, [
    { t: 200, inputs: [1, 2] },
    { t: 450, inputs: [5, 6] },
  ]);
}

// Раскомментируйте после реализации debounce:
runTests().catch(console.error);
