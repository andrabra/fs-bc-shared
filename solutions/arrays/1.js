// Your Job
// Find the sum of all multiples of n below m

// Keep in Mind
// n and m are natural numbers (positive integers)
// m is excluded from the multiples
// Examples
// sumMul(2, 9)   ==> 2 + 4 + 6 + 8 = 20
// sumMul(3, 13)  ==> 3 + 6 + 9 + 12 = 30
// sumMul(4, 123) ==> 4 + 8 + 12 + ... = 1860
// sumMul(4, -7)  ==> "INVALID"

function sumMul1(n, m) {
  if (n <= 0 || m <= 0) {
    return "INVALID";
  }

  let sum = 0;
  let item = n;

  while (item < m) {
    if (item % n === 0) {
      sum += item;
    }
    item++;
  }
  return sum;
}

function sumMul2(n, m) {
  if (n <= 0 || m <= 0) {
    return "INVALID";
  }
  let res = 0;
  for (let i = n; i < m; i++) {
    if (i % n === 0) {
        res += i;
    }
  }
  return res;
}

function sumMul(n, m) {
  if (n <= 0 || m <= 0) return "INVALID";
  
  let sum = 0;
  for (let i = n; i < m; i += n) {
    sum += i;
  }
  return sum;
}

console.log("sumMul(2,9): ", sumMul(2, 9)); // 20
console.log("sumMul(3,13): ", sumMul(3, 13)); // 30
