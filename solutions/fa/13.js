function multiplyBy(n) {
  // вернуть (x) => x * n
  return function(x) {
    return x * n;
  }
}

const double = multiplyBy(2)
const triple = multiplyBy(3)

console.log(double(2));
console.log(triple(2));
