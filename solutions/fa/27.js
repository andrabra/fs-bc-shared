// https://www.codewars.com/kata/59dd3ccdded72fc78b000b25/train/javascript

const map = {
  1: 'Sunday',
  2: 'Monday',
  3: 'Tuesday',
  4: 'Wednesday',
  5: 'Thursday',
  6: 'Friday',
  7: 'Saturday',
};

function whatday(num) {
  return map[num] ?? 'Wrong, please enter a number between 1 and 7';
}

console.log(whatday(1));
console.log(whatday(5));
console.log(whatday(50));
