// 2628. Memoize
// https://leetcode.com/problems/memoize/
// 30 Days of JavaScript — мемоизация (замыкания + Map)
//
// Дана функция fn. Верните мемоизированную версию:
//   • при тех же аргументах — не вызывать fn снова, вернуть из кэша;
//   • у обёртки есть метод getCallCount() — сколько раз fn вызвали РЕАЛЬНО.
//
// Важно: аргументы (2, 3) и (3, 2) — РАЗНЫЕ ключи (порядок важен).
//
// На LeetCode тестируют sum, fib, factorial — для вас это просто fn(...args).
//
// Подсказки из условия (без готового решения):
//   • внешняя функция возвращает внутреннюю с (...args);
//   • ключ кэша из args — например JSON.stringify(args);
//   • хранилище — Map или объект в замыкании.
//
// Отличие от 9.js (кэш с TTL):
//   там ключи сами протухают по таймеру;
//   здесь кэш живёт, пока жива обёртка (без срока годности).

/**
 * @param {Function} fn
 * @return {Function} memoized fn with .getCallCount()
 */
function memoize(fn) {
  // TODO: замыкание + кэш + счётчик реальных вызовов fn
  const cache = new Map();
  let callCount = 0;

  function wrapped(...args) {
    // this.getCallCount = () => callCount;
    const key = JSON.stringify(args);

    if (!cache.has(key)) {
      cache.set(key, fn(...args));
      callCount++;
    }

    return cache.get(key);
  }

  wrapped.getCallCount = function () {
    return callCount;
  };

  return wrapped;
}

// --- функции для локальных тестов (как на LeetCode) ---

const sum = (a, b) => a + b;

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));

// --- локальная проверка ---

/**
 * @param {Function} fn
 * @param {string[]} actions — "call" | "getCallCount"
 * @param {Array[]} values
 * @returns {unknown[]}
 */
function runScenario(fn, actions, values) {
  const memoized = memoize(fn);
  const output = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const args = values[i];

    if (action === 'call') {
      output.push(memoized(...args));
    } else if (action === 'getCallCount') {
      output.push(memoized.getCallCount());
    }
  }

  return output;
}

function runTests() {
  const ex1 = runScenario(
    sum,
    ['call', 'call', 'getCallCount', 'call', 'getCallCount'],
    [[2, 2], [2, 2], [], [1, 2], []],
  );
  console.log('ex1', ex1);
  // Ожидается: [4, 4, 1, 3, 2]

  const ex2 = runScenario(
    factorial,
    ['call', 'call', 'call', 'getCallCount', 'call', 'getCallCount'],
    [[2], [3], [2], [], [3], []],
  );
  console.log('ex2', ex2);
  // Ожидается: [2, 6, 2, 2, 6, 2]

  const ex3 = runScenario(fib, ['call', 'getCallCount'], [[5], []]);
  console.log('ex3', ex3);
  // Ожидается: [8, 1]

  // Дополнительно: порядок аргументов
  const ex4 = runScenario(
    sum,
    ['call', 'call', 'getCallCount'],
    [[2, 3], [3, 2], []],
  );
  console.log('ex4', ex4);
  // Ожидается: [5, 5, 2] — два разных ключа, fn вызвана дважды
}

// Раскомментируйте после реализации:
runTests();
