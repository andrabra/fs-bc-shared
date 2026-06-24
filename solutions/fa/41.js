// https://leetcode.com/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150

// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]
// Example 2:
// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k %= nums.length;

  while (k > 0) {
    let temp = nums[nums.length - 1];

    for (let i = nums.length - 1; i > 0; i--) {
      nums[i] = nums[i - 1];
    }

    nums[0] = temp;
    k--;
  }
  return nums;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotateOptimal = function (nums, k) {
  const reverse = (nums, start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  const n = nums.length;
  k %= n;

  if (k === 0) return;

  reverse(nums, 0, n - 1);

  reverse(nums, 0, k - 1);

  reverse(nums, k, n - 1);

  return nums;
};

function shiftArrayRight(arr, steps) {
  // Учитываем случаи, когда steps больше длины массива
  const shift = steps % arr.length;
  if (shift === 0) return arr;

  // Вырезаем хвост и добавляем его в начало
  const tail = arr.splice(-shift);
  arr.unshift(...tail);
  return arr;
}

const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

console.log(shiftArrayRight(nums, k));
