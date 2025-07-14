function buildFun(n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    (function (index) {
      res.push(function () {
        console.log(index);
      });
    })(i);
  }
  return res;
}

const functions = buildFun(3);
functions[0](); // 0
functions[1](); // 1
functions[2](); // 2
