function multiplicationTable(size) {
  let res = [];

  for (let i = 1; i <= size; i++) {
    let string = [];
    for (let j = 1; j <= size; j++) {
      string.push(i * j);
    }
    res.push(string);
  }

  return res;
}

function numberPyramid(n) {
  let res = [];
  for (let i = 1; i <= n; i++) {
    let string = "";
    for (let j = 1; j <= i; j++) {
      if (j === 1) {
        string += j;
      } else {
        string += ` ${j}`;
      }
    }
    res.push(string);
  }
  return res;
}

function numberPyramidWithArray(n) {
  let res = [];
  for (let i = 1; i <= n; i++) {
    let string = [];
    for (let j = 1; j <= i; j++) {
      string.push(j);
    }
    res.push(string.join(" "));
  }
  return res;
}

function chessboard(n) {
  let res = [];
  for (let i = 0; i <= n - 1; i++) {
    let row = "";
    for (let j = 0; j <= n - 1; j++) {
      let a = (i + j) % 2 === 0 ? "#" : " ";
      row += a;
      if (j === n - 1) {
        row += "\n";
      }
    }
    res.push(row);
  }
  return res.join("");
}

function numberDiamond(n) {
  let result = [];
  let mid = Math.floor(n / 2);
  
  for (let i = 0; i < n; i++) {
    let line = '';
    let numbersInRow = n - 2 * Math.abs(i - mid);
    let spaces = Math.abs(i - mid);
    
    // Первый вложенный цикл - для пробелов
    for (let j = 0; j < spaces * 2; j++) {
      line += ' ';
    }
    
    // Второй вложенный цикл - для чисел  
    for (let k = 0; k < numbersInRow; k++) {
      line += (k + 1);
      if (k < numbersInRow - 1) {
        line += ' '
      } else {
        line += '\n'
      }
    }
    
    result.push(line);
  }
  
  return result.join('');
}

console.log(numberDiamond(5));
