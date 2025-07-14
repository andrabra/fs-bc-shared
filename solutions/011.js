let name = "Abe";

const makeGreeter = (name) => {
  return function () {
    return "Hello, " + name + "!";
  };
};

const greetAbe = makeGreeter(name);

name = "Ben";

const greetBen = makeGreeter(name);

console.log(greetAbe());
console.log(greetBen());
