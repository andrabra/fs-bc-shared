// 283. Move Zeroes
// https://leetcode.com/problems/move-zeroes/
//
// Дан массив nums. Переместите все 0 в конец, сохранив порядок
// остальных элементов. Менять массив нужно in-place, без копии.
//
// Отличие от removeDuplicates2:
//   там мы «сжимали» префикс и возвращали k;
//   здесь длина массива та же, нули остаются в хвосте.
//
// Отличие от removeElement:
//   там выкидывали val и хвост не важен;
//   здесь все элементы на месте, нули — только в конце.
//
// Подсказка по семейству: снова «write» — куда писать следующий
// принятый элемент, и «read» (i) — что сейчас смотрим.

/**
 * @param {number[]} nums
 * @return {void} LeetCode ждёт void; для себя можно логировать nums
 */
var moveZeroes = function (nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let swap = nums[k];
      nums[k] = nums[i];
      nums[i] = swap;
      k++;
    }
  }
  console.log(nums);
};

// --- тесты ---

moveZeroes([0, 1, 0, 3, 12]);
// Ожидается: [1, 3, 12, 0, 0]

moveZeroes([0]);
// Ожидается: [0]

moveZeroes([1, 2, 3]);
// Ожидается: [1, 2, 3]

moveZeroes([0, 0, 1]);
// Ожидается: [1, 0, 0]

const a = [0, 1, 0, 3, 12];
moveZeroes(a);
console.log(a);
// Ожидается: [1, 3, 12, 0, 0]
