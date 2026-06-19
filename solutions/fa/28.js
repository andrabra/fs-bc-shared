// https://learn.javascript.ru/task/filter-anagrams

function aclean1(arr) {
  const res = [];
  const wordMap = new Map();

  for (let item of arr) {
    const letterSet = new Set();
    item.split('').forEach((letter) => letterSet.add(letter.toLowerCase()));

    const formattedWord = Array.from(letterSet).sort().join('');

    wordMap.set(formattedWord, item);
  }

  for (let i of Array.from(wordMap)) {
    res.push(i[1]);
  }

  return res;
}

function aclean(arr) {
  const wordMap = new Map();

  for (let item of arr) {
    const letterSet = new Set();

    const signature = item.toLowerCase().split('').sort().join('');

    if (wordMap.has(signature)) continue;

    wordMap.set(signature, item);
  }

  return [...wordMap.values()];
}

let arr = ['nap', 'teachers', 'cheaters', 'PAN', 'ear', 'era', 'hectares'];
console.log('aclean(arr): ', aclean(arr));
// alert(aclean(arr)); // "nap,teachers,ear" или "PAN,cheaters,era"
