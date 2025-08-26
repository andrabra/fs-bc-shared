decodeMorse = function (morseCode) {
  // Your code here
  // You can use MORSE_CODE[morse]

  return morseCode
    .trim()
    .split("   ")
    .map((char) => {
      return char
        .split(" ")
        .map((morse) => {
          return MORSE_CODE[morse];
        })
        .join("");
    })
    .join(" ");
};
