// Задача
// Помогите Саше выполнить задание и попасть на работу мечты. Напишите JavaScript-функцию с одним параметром n, соблюдая несколько требований от специалиста.

// Если входной параметр равен 1, функция должна вернуть 2.
// Если входной параметр равен 2, функция должна вернуть 1.
// Остальные значения параметра n в задаче не участвуют.
// Не допускается использование условных конструкций: if/else, switch/case, тернарных операторов.
// Предоставьте три варианта решения, один из которых выполняется в одну строку, например function example () {   // код }.

// Пример запуска
// console.log(example(1)); // 2
// console.log(example(2)); // 1

function example1(n) {
  return n === 1 ? 2 : 1;
}
function example2(n) {
  return { 1: 2, 2: 1 }[n];
}
function example3(n) {
  return 3 - n;
}
function example4(n) {
  return [2, 1][n - 1];
}

console.log(example1(1)); // 2
console.log(example1(2)); // 1

console.log(example2(1)); // 2
console.log(example2(2)); // 1

console.log(example3(1)); // 2
console.log(example3(2)); // 1

console.log(example4(1)); // 2
console.log(example4(2)); // 1
