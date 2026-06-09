// Поменять местами ключи и значения объекта.

function invert(obj) {
  const resObject = {};

  const entries = Object.entries(obj);

  for (let entry of entries) {
    resObject[entry[1]] = entry[0];
  }

  return resObject;
}

console.log('basic:', invert({ a: 1, b: 2 }));
// { 1: 'a', 2: 'b' }

console.log('single:', invert({ foo: 'bar' }));
// { bar: 'foo' }

console.log('empty:', invert({}));
// {}

console.log('string values:', invert({ a: 'x', b: 'y' }));
// { x: 'a', y: 'b' }

console.log('numeric keys:', invert({ 1: 'a', 2: 'b' }));
// { a: '1', b: '2' }

console.log('boolean:', invert({ a: true, b: false }));
// { true: 'a', false: 'b' }

console.log('null:', invert({ a: null }));
// { null: 'a' }

console.log('undefined:', invert({ a: undefined }));
// { undefined: 'a' }
