// Напишите функцию, которая принимает строку из одного или нескольких слов и возвращает
// ту же строку, но с перевернутыми словами, состоящими из пяти или более букв.
// Передаваемые строки будут состоять только из букв и пробелов.
// Пробелы будут включены только в том случае, если в строке присутствует более одного слова.

function spinWords(string) {
  const words = string.split(' ');

  return words
    .map((word) => {
      if (word.length >= 5) {
        return word.split('').reverse().join('');
      }
      return word;
    })
    .join(' ');
}

console.log(spinWords('Welcome')); // emocleW
console.log(spinWords('Hey fellow warriors')); // Hey wollef sroirraw
console.log(spinWords('This is a test')); // This is a test
console.log(spinWords('This is another test')); // This is rehtona test
console.log(spinWords('This is another test')); // This is rehtona test
