const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (input) => {
  lines.push(input);

  if (lines.length === 2) {
    const first = lines[0];
    const second = lines[1].split(' ');

    let vasya = [];
    let masha = [];
    let ans = 0;

    for (let i = 0; i <= first - 1; i++) {
      if (i % 2) {
        masha.push(Number(second[i]));
      } else {
        vasya.push(Number(second[i]));
      }
    }

    let vasyaSum = vasya.reduce((acc, index) => {
      return (acc += index);
    }, 0);

    let mashaSum = masha.reduce((acc, index) => {
      return (acc += index);
    }, 0);

    ans = vasyaSum - mashaSum;

    if (Math.max(...masha) > Math.min(...vasya)) {
      ans += 2 * (Math.max(...masha) - Math.min(...vasya));
    }

    console.log(ans);

    rl.close();
  }
});
