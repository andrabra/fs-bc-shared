function counter() {
  let i = 1;
  return function () {
    console.log(i++);
  };
}

const newCounter = counter();
newCounter();
newCounter();
newCounter();
newCounter();

