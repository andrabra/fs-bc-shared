// https://www.codewars.com/kata/5885424265fc9c38100017ef/train/javascript

function isSubsetOf(s1, s2) {
  if (s2.size < s1.size) return false;
  for (i of s1) {
    if (s2.has(i)) {
      continue;
    } else return false;
  }
  return true;
}

function isSupersetOf(s1, s2) {
  if (s1.size < s2.size) return false;
  for (i of s2) {
    if (s1.has(i)) {
      continue;
    } else return false;
  }
  return true;
}

let A1 = new Set([1, 2, 3]),
  A2 = new Set([3, 2, 1]),
  B = new Set([1, 2, 3, 4, 5]),
  X = new Set([1, 2, 4, 5, 6, 7]);

console.log(isSupersetOf(X, A1));
