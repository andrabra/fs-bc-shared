const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  let [a, b, c, v0, v1, v2] = input.split(' ').map(Number);

  a = Math.min(a, b + c);
  b = Math.min(b, a + c);
  c = Math.min(c, a + b);

  const ans1 = a / v0 + a / v1 + b / v0 + b / v1;
  const ans2 = a / v0 + c / v1 + b / v2;
  const ans3 = b / v0 + c / v1 + a / v2;

  const ans = Math.min(ans1, ans2, ans3);

  console.log(ans.toFixed(10));

  rl.close();
});
