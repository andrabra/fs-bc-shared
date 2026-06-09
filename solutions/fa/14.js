// Функция вызывается только один раз; дальше всегда тот же результат, fn больше не вызывается.

function once(fn) {
  let counter = false;
  let result = null;

  return function (...args) {
    if (!counter) {
      result = fn(...args);
      counter = !counter;
    }
    return result;
  };
}

const init = once(() => {
  console.log('init');
  return 42;
});

console.log(init()); // 'init', 42
console.log(init()); // 42, без 'init'


