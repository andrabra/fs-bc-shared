// https://www.codewars.com/kata/5631ac5139795b281d00007d/train/javascript

class WordDictionary {
  constructor() {
    this.dictionary = new Set();
  }
  addWord(word) {
    this.dictionary.add(word);
  }

  search(word) {
    if (word.includes(".")) {
      const regex = new RegExp(`^${word}$`);
      return Array.from(this.dictionary).some(
        (storedWord) =>
          storedWord.length === word.length && regex.test(storedWord)
      );
    } else {
      return this.dictionary.has(word);
    }
  }
}

const dict = new WordDictionary();

dict.addWord("mom");

console.log(dict.search("mom"));
console.log(dict.search("mommy"));
console.log(dict.search("mo."));
