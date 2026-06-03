// Реализуйте функцию deepClone, которая создаёт глубокую копию значения.
// нет решения

function deepClone(obj) {
  // TODO: реализовать
  let res;

  return res;
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

const cloned = deepClone(source);

console.log(cloned);
// Ожидаемый результат: объект с такими же данными

console.log(cloned === source);
// Ожидаемый результат: false

console.log(cloned.profile === source.profile);
// Ожидаемый результат: false

console.log(cloned.tags === source.tags);
// Ожидаемый результат: false

console.log(cloned.createdAt === source.createdAt);
// Ожидаемый результат: false

console.log(deepClone(null));
// Ожидаемый результат: null

console.log(deepClone([1, [2, 3], { value: 4 }]));
// Ожидаемый результат: [1, [2, 3], { value: 4 }]

// function deepClone(obj) {
//   // TODO: реализовать
//   if (obj === null) return null;
//   if (!obj) return {};

//   let res;

//   if (typeof obj === 'object') {
//     res = {};
//   } else {
//     res = [];
//   }

//   for (const [key, value] of Object.entries(obj)) {
//     if (typeof value !== 'object') {
//       res[key] = value;
//     } else if (value instanceof Date) {
//       res[key] = new Date(value);
//     } else if (Array.isArray(value)) {
//       res[key] = value.map((item) => deepClone(item));
//     } else if (typeof value === 'object') {
//       res[key] = deepClone(value);
//     }
//   }

//   return res;
// }
