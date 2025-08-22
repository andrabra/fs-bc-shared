// https://www.codewars.com/kata/588502f87987a27f690001f7/solutions/javascript

function areEqual(s1, s2) {
  if (s1.size !== s2.size) return false;
  for (i of s1) {
    if (s2.has(i)) {
      continue;
    } else return false;
  }
  return true;
}

function notEqual(s1, s2) {
  return !areEqual(s1, s2);
}

const a = new Set([1, 2]);
const b = new Set([3, 4]);
const c = new Set([1, 2]);

console.log("areEqual(a, c): ", areEqual(a, b));
console.log("notEqual(a, b): ", notEqual(a, b));
console.log("notEqual(a, b): ", notEqual(a, new Set()));
