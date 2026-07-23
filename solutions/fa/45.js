const symbol = Symbol('a');

const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 1,
  d: {
    e: {
      f: {
        h: 1,
      },
    },
  },

  func: function () {
    console.log(this.a);
  },

  func1: () => {
    console.log(this.a);
  },

  func2: () => {
    console.log(obj.a);
  },
};

// obj.func();
// obj.func1();
// obj.func2();

const res = Object.assign({}, obj);
const res2 = JSON.parse(JSON.stringify(obj));
// const res3 = structuredClone(obj);

// res.d.e.f.h = 2;
// res.d.e = { new: 'object' };
res2.d = { new: 'object' };
// res3.d = { new: 'object' };

Object.values(obj).forEach((item) => console.log('obj value: ', item));
Object.values(res).forEach((item) => console.log('res value: ', item));
Object.values(res2).forEach((item) => console.log('res2 value: ', item));
// Object.values(res3).forEach((item) => console.log('res3 value: ', item));

// Object.keys(obj).forEach((item) => console.log('key: ', item));
// Object.values(obj).forEach((item) => console.log('value: ', item));
// Object.entries(obj).forEach((item) => console.log('entry: ', item));
// Object.entries(res).forEach((item) => console.log('entry: ', item));

// console.log(Object.getOwnPropertyNames(res));
// console.log(Reflect.ownKeys(res));
