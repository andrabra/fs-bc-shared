function solution1(string) {
  if (string.length < 1) return "";

  const arr = Array.from(string);

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) continue;
    if ("A" >= arr[i] || arr[i] <= "Z") {
      arr[i] = " " + arr[i];
    }
  }
  return arr.join("");
}

// console.log(solution1("camelCase"));

function solution2(string) {
  if (string.length < 1) return "";

  return string
    .split("")
    .map((item, index) => {
      if ((item >= 'A' && item <= 'Z') && index !== 0) {
        return " " + item;
      } else return item;
    })
    .join("");
}

console.log(solution2("camelCase"));
