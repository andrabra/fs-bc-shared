/*  Дан массив целых неотрицательных чисел, нужно сгруппировать друг с другом числа, 
которые можно получить путём перестановки цифр их составляющих,  */

function digitPermutation(arr) {
  const map = new Map();
  for (const val of arr) {
    const orig = String(val).split("").sort().join("");

    if (!map.has(orig)) {
      map.set(orig, []);
    }

    map.get(orig).push(val);
  }
  return Array.from(map.values());
}

console.clear();
console.log("start test");
console.log(
  digitPermutation([1230, 199, 2301, 1230, 110001, 3021, 101010, 991, 91])
);
// [[199, 991], [110001, 101010], [1230, 2301, 1230, 3021], [9]]
console.log(digitPermutation([11, 221])); // [[11], [22]]
console.log(digitPermutation([11, 11, 111])); // [[11, 11, 111]]
console.log(digitPermutation([111111111112, 122222222222]));
