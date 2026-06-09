// 2622. Cache With Time Limit
// https://leetcode.com/problems/cache-with-time-limit/description/?envType=study-plan-v2&envId=30-days-of-javascript
// 30 Days of JavaScript — после Promise Time Limit (8.js)
//
// Реализуйте класс TimeLimitedCache с методами:
//
//   set(key, value, duration)
//     — сохранить key → value на duration мс;
//     — вернуть true, если такой key УЖЕ был и ещё НЕ истёк;
//     — вернуть false, если ключа не было или он уже протух;
//     — при обновлении существующего ключа: перезаписать value и duration.
//
//   get(key)
//     — value, если ключ есть и не истёк;
//     — иначе -1.
//
//   count()
//     — число ключей, которые сейчас не истекли.
//
// На LeetCode время симулируется: действия вызывают с задержками timeDelays[i].
// Подсказка из условия:
//   • setTimeout(fn, delay) — отложить удаление по истечении duration;
//   • clearTimeout(ref) — отменить старый таймер при set того же key.
//
// Отличие от 8.js:
//   там — одна гонка «fn vs лимит»;
//   здесь — хранилище ключей, у каждого свой таймер жизни.
//
// Структура данных: Map (key → { value, timeoutId? }) или аналог.

var TimeLimitedCache = function () {
  // TODO: инициализация хранилища

  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration milliseconds
 * @return {boolean} whether an un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  // const existed = this.cache.has(key);
  // if (existed) {
  //   clearTimeout(this.cache.get(key).timeoutId);
  // }
  // this.cache.set(key, {
  //   value,
  //   timeoutId: setTimeout(() => {
  //     this.cache.delete(key);
  //   }, duration),
  // });
  // return existed;

  if (this.cache.has(key)) {
    clearTimeout(this.cache.get(key).timeoutId);

    this.cache.delete(key);
    this.cache.set(key, {
      value,
      timeoutId: setTimeout(() => {
        this.cache.delete(key);
      }, duration),
    });

    return true;
  } else {
    this.cache.set(key, {
      value,
      timeoutId: setTimeout(() => {
        this.cache.delete(key);
      }, duration),
    });
    return false;
  }
};

/**
 * @param {number} key
 * @return {number} value associated with key or -1
 */
TimeLimitedCache.prototype.get = function (key) {
  // TODO
  if (this.cache.has(key)) {
    return this.cache.get(key).value;
  }
  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  // TODO
  return this.cache.size;
};

// --- локальная проверка (как на LeetCode: actions + values + timeDelays) ---

/**
 * @param {string[]} actions
 * @param {Array[]} values
 * @param {number[]} timeDelays
 * @returns {Promise<unknown[]>}
 */
function runScenario(actions, values, timeDelays) {
  return new Promise((resolve) => {
    const output = [];
    let cache = null;
    let i = 0;

    function scheduleNext() {
      if (i >= actions.length) {
        resolve(output);
        return;
      }

      const action = actions[i];
      const args = values[i];
      const delay = timeDelays[i];
      const index = i;
      i++;

      setTimeout(() => {
        if (action === 'TimeLimitedCache') {
          cache = new TimeLimitedCache();
          output[index] = null;
        } else if (action === 'set') {
          output[index] = cache.set(args[0], args[1], args[2]);
        } else if (action === 'get') {
          output[index] = cache.get(args[0]);
        } else if (action === 'count') {
          output[index] = cache.count();
        }
        scheduleNext();
      }, delay);
    }

    scheduleNext();
  });
}

async function runTests() {
  // Пример 1
  const ex1 = await runScenario(
    ['TimeLimitedCache', 'set', 'get', 'count', 'get'],
    [[], [1, 42, 100], [1], [], [1]],
    [0, 0, 50, 50, 150],
  );
  console.log('ex1', ex1);
  // Ожидается: [null, false, 42, 1, -1]

  // Пример 2
  const ex2 = await runScenario(
    ['TimeLimitedCache', 'set', 'set', 'get', 'get', 'count', 'get', 'count'],
    [[], [1, 42, 50], [1, 50, 100], [1], [1], [], [1], []],
    [0, 0, 40, 50, 120, 140, 200, 250],
  );
  console.log('ex2', ex2);
  // Ожидается: [null, false, true, 50, 50, 1, -1, 0]

  // Дополнительно: два разных ключа
  const ex3 = await runScenario(
    ['TimeLimitedCache', 'set', 'set', 'count', 'get', 'get', 'count'],
    [[], [1, 10, 100], [2, 20, 200], [], [1], [2], []],
    [0, 0, 0, 10, 50, 50, 300],
  );
  console.log('ex3', ex3);
  // Ожидается: [null, false, false, 2, 10, 20, 0]
  // (к t=300 оба ключа истекли)
}

// Раскомментируйте после реализации:
runTests().catch(console.error);
