// Напишите функцию, которая возвращает самое короткое слово в строке

function getShortestWord(str) {
  const res = str.trim().split(' ');
  let init = res[0];
  res.forEach((element) => {
    if (element.length < init.length) {
      init = element;
    }
  });

  return init;
}

console.log(getShortestWord('The quick brown fox')); // The
console.log(getShortestWord('Javascript is awesome')); // is
console.log(getShortestWord('  Hello world  ')); // hello
