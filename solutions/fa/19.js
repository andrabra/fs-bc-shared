// Найти элемент массива, который встречается чаще всего.
// Если таких элементов несколько — вернуть любой из них.
// Гарантируется, что массив не пустой.

function mostFrequent(arr) {
  const mapCounter = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (mapCounter.has(arr[i])) {
      mapCounter.set(arr[i], mapCounter.get(arr[i]) + 1);
    } else {
      mapCounter.set(arr[i], 1);
    }
  }

  let max = -Infinity;
  let maxKey = null;

  for ([key, value] of mapCounter) {
    if (value > max) {
      max = value;
      maxKey = key;
    }
  }

  return maxKey;
}

console.log(mostFrequent([1, 2, 2, 3]));
// 2
console.log(mostFrequent(['a', 'b', 'a', 'c', 'a']));
// 'a'
console.log(mostFrequent([true, false, true, false, true]));
// true
