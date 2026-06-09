// Напишите функцию, которая может принимать
// в качестве аргумента любое неотрицательное
// целое число и возвращает его с цифрами в порядке убывания.
// По сути, нужно переставить цифры так, чтобы получилось максимально возможное число.

function descendingOrder(n) {
  return Number(
    n
      .toString()
      .split('')
      .sort((a, b) => b - a)
      .join(''),
  );
}

console.log(descendingOrder(0)); // 0
console.log(descendingOrder(1)); // 1
console.log(descendingOrder(111)); // 111
console.log(descendingOrder(15)); // 51
console.log(descendingOrder(1021)); // 2110
console.log(descendingOrder(descendingOrder(123456789))); // 987654321
