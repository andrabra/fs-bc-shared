// возвращает { get(), set(next) }
// get/set работают с одной переменной в замыкании, снаружи до неё не достать

function createSecretHolder(secret = 0) {
  const wrapper = {
    get: () => secret,
    set: (i) => (secret = i),
  };
  return wrapper;
}

const secretHandler = createSecretHolder(1);

console.log('secretHandler.get(): ', secretHandler.get());
console.log('secretHandler.get(): ', secretHandler.set(2));
console.log('secretHandler.get(): ', secretHandler.get());
