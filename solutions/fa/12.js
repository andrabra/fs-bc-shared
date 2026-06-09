// Замыкание — когда функция «помнит» переменные из того места,
// где она была создана, даже после того как внешний код уже отработал.

// вернуть функцию, при каждом вызове возвращает start, start+1, start+2, ...
function createCounter(start = 0) {
  function counter() {
    start++;
    return start;
  }

  return counter;
}

const c = createCounter(0);

console.log(c());
console.log(c());
console.log(c());
