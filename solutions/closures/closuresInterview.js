// Задача: Создай функцию memo, которая кеширует результат вызова другой функции.
function memo(fn) {
  let cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    console.log("Cached value: ", cache.get(key));
    return cache.get(key);
  };
}

const square = memo((x, y) => {
  console.log("Computing...");
  if (y) {
    return x * y;
  }
  return x * x;
});

square(4); // "Computing..." → 16
square(4); // (без "Computing...") → 16
square(5); // "Computing..." → 25
square(4); // (без "Computing...") → 16

square(2, 5); // "Computing" → 10
square(2, 5); // (без "Computing...") → 10
square(2, 5); // (без "Computing...") → 10
square(2, 5); // (без "Computing...") → 10
