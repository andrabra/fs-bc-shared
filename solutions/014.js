function makeLogger(i) {
  return () => {
    return i;
  };
}

function buildFun(n) {
  let res = [];

  for (let i = 0; i < n; i++) {
    res.push(makeLogger(i));
  }
  return res;
}
