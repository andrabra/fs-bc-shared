// // Для чтения входных данных в Node.js необходимо использовать
// // модуль readline, который работает с потоком ввода-вывода
// // (stdin/stdout) и позволяет читать строки.
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Здесь будем хранить данные
let lineNumber = 0;
let N = 0; // Количество пар синонимов
const synonyms = new Map(); // Словарь для хранения синонимов
let targetWord = ''; // Слово, для которого нужно найти синоним

rl.on('line', (line) => {
  if (lineNumber === 0) {
    // Первая строка - количество пар N
    N = parseInt(line.trim(), 10);
  } else if (lineNumber <= N) {
    // Следующие N строк - пары синонимов
    const [word1, word2] = line.trim().split(' ');
    // Добавляем в словарь обе связи (word1 → word2 и word2 → word1)
    synonyms.set(word1, word2);
    synonyms.set(word2, word1);
    console.log('synonyms: ', synonyms);
  } else {
    // Последняя строка - слово, для которого ищем синоним
    targetWord = line.trim();

    // Находим и выводим синоним
    const result = synonyms.get(targetWord);
    console.log(result);

    // Закрываем интерфейс
    rl.close();
  }

  lineNumber++;
});


rl.on('line', (line) => {
  console.log(line); // "Hello Hi\n" (с \n в конце)
  console.log(line.trim()); // "Hello Hi" (без \n)
  rl.close();
});