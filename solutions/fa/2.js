// Реализуйте функцию deepClone, которая создаёт глубокую копию значения.
// нет решения

function deepClone(obj) {
  let res;

  if (typeof obj !== 'object') {
    res = obj;
  } else if (obj === null) {
    res = obj;
  } else if (Array.isArray(obj)) {
    res = obj.map((item) => deepClone(item));
  } else if (obj instanceof Date) {
    res = new Date(obj);
  } else if (typeof obj === 'object') {
    // Необязательная проверка, оставил для наглядности
    res = {};
    for (const [key, value] of Object.entries(obj)) {
      res[key] = deepClone(value);
    }
  }

  return res;
}

function deepClone1(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else if (obj === null) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deepClone1(item));
  } else if (obj instanceof Date) {
    return new Date(obj);
  } else {
    const res = {};
    for (const [key, value] of Object.entries(obj)) {
      res[key] = deepClone1(value);
    }
    return res;
  }
}

function cheatDeepClone(obj) {
  return structuredClone(obj);
}

function cheatDeepClone2(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function cheatDeepClone3(obj) {
  return Object.assign({}, obj);
}

const source = {
  id: 1,
  name: 'Alex',
  createdAt: new Date('2024-01-01'),
  tags: ['frontend', 'typescript'],
  profile: {
    city: 'Berlin',
    skills: ['Vue', 'React'],
  },
};

const cloned = cheatDeepClone2(source);

console.log('here!', cloned);
// Ожидаемый результат: объект с такими же данными

console.log(cloned === source);
// Ожидаемый результат: false

console.log(cloned.profile === source.profile);
// Ожидаемый результат: false

console.log(cloned.tags === source.tags);
// Ожидаемый результат: false

console.log(cloned.createdAt === source.createdAt);
// Ожидаемый результат: false

console.log(cheatDeepClone2(null));
// Ожидаемый результат: null

console.log(cheatDeepClone2([1, [2, 3], { value: 4 }]));
// Ожидаемый результат: [1, [2, 3], { value: 4 }]
