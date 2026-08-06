// Задача: строим индекс (словарь) из массива
// Напиши функцию buildIndex, которая принимает:
// Массив объектов items – данные.
// Строку keyPath – путь к полю, которое будет использоваться как ключ результирующего объекта.
// Строку valuePath – путь к полю, которое будет использоваться как значение результирующего объекта (может быть вложенным).
// Функция должна вернуть объект, где:
// Ключи – это значения из keyPath у каждого элемента.
// Значения – это значения из valuePath у соответствующих элементов.
// Особое условие: если у нескольких элементов совпадают ключи,
// то значение должно быть массивом всех соответствующих значений (в порядке появления).
// Если ключ уникален – просто сохранить одно значение (не массив).

function getValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

function buildIndex(items, keyPath, valuePath) {
  if (items.length < 1) return {};

  const res = {};

  items.forEach((item) => {
    const groupKey = getValue(item, keyPath);
    const value = getValue(item, valuePath);

    // if (groupKey in res) {
    //   console.log('groupKey, value: ', groupKey, value);
    // }

    if (Array.isArray(res[groupKey])) {
      res[groupKey].push(value);
    } else if (res[groupKey]) {
      // Сломается если значение будет falsy, например 0
      res[groupKey] = [res[groupKey]];
      res[groupKey].push(value);
    } else {
      res[groupKey] = value;
    }
  });

  return res;
}

const employees = [
  { id: 1, name: 'Alice', department: 'IT', info: { salary: 5000 } },
  { id: 2, name: 'Bob', department: 'HR', info: { salary: 4500 } },
  { id: 3, name: 'Charlie', department: 'IT', info: { salary: 5500 } },
  { id: 4, name: 'Diana', department: 'Finance', info: { salary: 6000 } },
  { id: 5, name: 'Andrew', department: 'IT', info: { salary: 6000 } },
];

const index = buildIndex(employees, 'department', 'info.salary');

console.log(index);
// {
//   keyPath: valuePath[]
//   IT: [5000, 5500],   // два сотрудника в IT
//   HR: 4500,           // один сотрудник – просто число
//   Finance: 6000
// }
