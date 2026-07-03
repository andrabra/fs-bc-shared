// 1. Two Sum
// https://leetcode.com/problems/two-sum/
//
// Дан массив целых чисел nums и число target.
// Вернуть индексы двух элементов, сумма которых равна target.
//
// Правила:
//   • ровно одно решение гарантировано;
//   • один и тот же элемент нельзя использовать дважды;
//   • порядок индексов в ответе не важен.
//
// Примеры:
//   nums = [2, 7, 11, 15], target = 9  → [0, 1]
//   nums = [3, 2, 4],       target = 6  → [1, 2]
//   nums = [3, 3],          target = 6  → [0, 1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumBruteForce = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const attempt = nums[i] + nums[j];

      if (attempt === target) {
        return [i, j];
      }
    }
  }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const sumMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (sumMap.has(need)) {
      return [sumMap.get(need), i];
    }

    sumMap.set(nums[i], i);
  }
};

// --- локальные тесты ---

function assertTwoSum(label, got, expected) {
  const ok =
    Array.isArray(got) &&
    got.length === 2 &&
    got.slice().sort().join() === expected.slice().sort().join();
  console.log(label, ok ? 'OK' : 'FAIL');
  if (!ok) {
    console.log('  got:     ', JSON.stringify(got));
    console.log('  expected:', JSON.stringify(expected));
  }
}

function runTests() {
  assertTwoSum('ex1', twoSum([2, 7, 11, 15], 9), [0, 1]);
  assertTwoSum('ex2', twoSum([3, 2, 4], 6), [1, 2]);
  assertTwoSum('ex3', twoSum([3, 3], 6), [0, 1]);
  assertTwoSum('ex4', twoSum([-1, -2, -3, -4, -5], -8), [2, 4]);
}

// Раскомментируйте после реализации:
runTests();
