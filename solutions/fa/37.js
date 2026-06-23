// https://leetcode.com/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150

// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

var majorityElement = function (nums) {
  let counter = new Map();
  const major = nums.length / 2;

  for (let i = 0; i < nums.length; i++) {
    if (counter.has(nums[i])) {
      counter.set(nums[i], counter.get(nums[i]) + 1);
    } else {
      counter.set(nums[i], 1);
    }
  }

  for (let [num, count] of counter) {
    if (count > major) return num;
  }
};

const nums = [3, 2, 3];
const nums2 = [2, 2, 1, 1, 1, 2, 2];

console.log(majorityElement(nums));
console.log(majorityElement(nums2));
