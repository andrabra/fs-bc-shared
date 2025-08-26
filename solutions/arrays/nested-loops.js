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

function diagonalMatrix(n) {
  let res = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let a;
      if (i === j) {
        a = 1
      } else if (i < j) {
        a = 2
      } else {
        a = 0
      }
      row.push(a)
    }
    res.push(row)
  }
  return res;
}

console.log(diagonalMatrix(4));

// Задача: "Спиральная матрица"
// Напишите функцию spiralMatrix(n), которая принимает число n и возвращает двумерный массив размером n × n, заполненный числами от 1 до n² по спирали.

// Пример для n = 3:

// text
// [
//   [1, 2, 3],
//   [8, 9, 4],
//   [7, 6, 5]
// ]
// Пример для n = 4:

// text
// [
//   [ 1,  2,  3, 4],
//   [12, 13, 14, 5],
//   [11, 16, 15, 6],
//   [10,  9,  8, 7]
// ]
// Подсказки:
// Используйте 4 направления: right, down, left, up

// Создайте матрицу, заполненную нулями или null

// Двигайтесь по спирали, меняя направление при достижении границы или заполненной ячейки

// Используйте переменные для текущих координат (row, col) и направления

// Вам понадобятся вложенные циклы внутри основного цикла от 1 до n²
