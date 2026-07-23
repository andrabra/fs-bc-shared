/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let res = '';
  let minLength = Infinity;

  let minLengthWord = '';

  for (let i = 0; i < strs.length; i++) {
    if (strs[i].length < minLength) {
      minLength = strs[i].length;
      minLengthWord = strs[i];
    }
  }

  if (minLengthWord === '') return minLengthWord;

  const minLengthArr = minLengthWord.split('');

  for (let j = 0; j < minLengthArr.length; j++) {
    if (
      strs.every((item) => {
        return item[j] === minLengthArr[j];
      })
    ) {
      res += minLengthArr[j];
    } else {
      break;
    }
  }

  return res;
};

const test1 = ['flower', 'flow', 'flight'];
const test2 = ['cir', 'car'];

console.log(longestCommonPrefix(test1));
console.log(longestCommonPrefix(test2));
