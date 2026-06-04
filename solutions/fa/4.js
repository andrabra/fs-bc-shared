/**
 * @param {number[]} nums — отсортированный массив (меняем его же in-place)
 * @return {number} — количество уникальных элементов k
 */
var removeDuplicates = function (nums) {
  // k — длина «готового» префикса уникальных элементов;
  // nums[0 .. k-1] уже без дубликатов. Старт: первый элемент всегда уникален.
  let k = 1;

  // i — «быстрый» указатель: просматриваем весь массив, включая уже записанную зону
  for (let i = 0; i < nums.length; i++) {
    // Сравниваем текущий элемент с ПОСЛЕДНИМ принятым уникальным (nums[k-1]),
    // а не с nums[i-1]: между i и k могут оставаться старые дубликаты.
    if (nums[i] !== nums[k - 1]) {
      // Новое уникальное значение — записываем в первую свободную позицию k
      nums[k] = nums[i];
      // Расширяем префикс уникальных на один элемент
      k++;
    }
    // Если равны — дубликат, ничего не пишем, только идём дальше (i++ в for)
  }

  // Возвращаем число уникальных; судья проверит только nums[0..k-1]
  return [k, nums];
};

// console.log(removeDuplicates([1, 1, 3]));
// console.log(removeDuplicates([1, 1, 2]));
// console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

/**
 * @param {number[]} nums
 * @return {void}
 */
var moveNonZeroToFront = function (nums) {
  let write = 0; // сколько ненулевых уже на своих местах в начале

  for (let i = 0; i < nums.length; i++) {
    // твой if: когда переносим nums[i] в зону ответа?
    if (nums[i] !== 0) {
      let foo = nums[write];
      nums[write] = nums[i];
      nums[i] = foo;
      write++;
    }
  }

  // опционально: что сделать с хвостом от write до конца?
  return [write, nums];
};

// console.log(moveNonZeroToFront([1, 2, 0, 3, 0, 0, 1]));
// console.log(moveNonZeroToFront([0, 1, 0, 3, 12]));

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElementWithSwap = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      let swap = nums[k];
      nums[k] = nums[i];
      nums[i] = swap;
      k++;
    }
  }
  return [k, nums];
};

// console.log(...removeElementWithSwap([3, 2, 2, 3], 3));
// console.log(...removeElementWithSwap([0, 1, 2, 2, 3, 0, 4, 2], 2));

var removeElement = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return [k, nums];
};

console.log(...removeElement([3, 2, 2, 3], 3));
// console.log(...removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); // 5 [ 0, 1, 3, 0, 4, 0, 4, 2]
// Input: nums = [0,1,2,2,3,0,4,2], val = 2
// Output: 5, nums = [0,1,4,0,3,_,_,_]
