/**
 * Преобразует римское число, заданное строкой, в целое число.
 * @param {string} s - Римское число в виде строки.
 * @return {number} - Эквивалентное целое число.
 */

const romanMap = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function romanToInt(s) {
  const arrNumbers = s.split('');

  return arrNumbers
    .map((number, index) => {
      const currentNumber = romanMap[number];
      const nextNumber = romanMap[arrNumbers[index + 1]];

      const multiplier = currentNumber < nextNumber ? -1 : 1;

      return romanMap[number] * multiplier;
    })
    .reduce((acc, item) => acc + item, 0);
}

console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('III')); // 3
console.log(romanToInt('IV')); // 4
console.log(romanToInt('IX')); // 9
console.log(romanToInt('LVIII')); // 58 (50 + 5 + 3)
console.log(romanToInt('MCMXCIV')); // 1994 (1000 + (1000-100) + (100-10) + (5-1))
