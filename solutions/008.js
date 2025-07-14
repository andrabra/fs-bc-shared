const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
  if (input.length > 2) rl.close();
});

function findClosest(arr, x) {
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < x) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  if (low === 0) return arr[0];
  if (low === arr.length) return arr[arr.length - 1];

  const prev = arr[low - 1];
  const curr = arr[low];

  return Math.abs(prev - x) <= Math.abs(curr - x) ? prev : curr;
}

rl.on("close", () => {
  const arr = input[1]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const x = parseInt(input[2], 10);
  console.log(findClosest(arr, x));
});
