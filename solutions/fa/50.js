// https://learn.javascript.ru/async-await

// https://learn.javascript.ru/task/rewrite-async
// function loadJson(url) {
//   return fetch(url).then((response) => {
//     if (response.status == 200) {
//       return response.json();
//     } else {
//       throw new Error(response.status);
//     }
//   });
// }

// async function loadJsonAsyncAwait(url) {
//   const response = await fetch(url);

//   if (response.status === 200) {
//     return response.json();
//   }

//   throw new Error(response.status);
// }

// loadJson('no-such-user.json') // (3)
//   .catch(alert); // Error: 404

//

// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = 'HttpError';
//     this.response = response;
//   }
// }

// async function loadJson(url) {
//   const response = await fetch(url);

//   if (response.status === 200) {
//     return response.json();
//   }

//   throw new HttpError(response);
// }

// // Запрашивать логин, пока github не вернёт существующего пользователя.
// async function demoGithubUser() {
//   let name = prompt('Введите логин?', 'iliakan');

//   try {
//     const user = await loadJson(`https://api.github.com/users/${name}`);
//     return user;
//   } catch (err) {
//     if (err instanceof HttpError && err.response.status == 404) {
//       alert('Такого пользователя не существует, пожалуйста, повторите ввод.');
//       return demoGithubUser();
//     } else {
//       throw err;
//     }
//   }
// }

// demoGithubUser();

function groupByKey(items, key) {
  if (!items.length) return {};

  const res = {};

  items.forEach((item) => {
    const groupKey = item[key];

    if (!res[groupKey]) {
      res[groupKey] = [];
    }

    res[groupKey].push(item);
  });

  return res;
}

const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
  { id: 3, name: 'Charlie', role: 'admin' },
  { id: 4, name: 'Diana', role: 'moderator' },
  { id: 5, name: 'Eve', role: 'user' },
];

// const groupedByRole = groupByKey(users, 'role');
// console.log(groupedByRole);

function getValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

function groupByPath(items, path) {
  if (!items.length) return {};

  const res = {};

  items.forEach((item) => {
    const groupKey = getValue(item, path);
    console.log('groupKey: ', groupKey);

    if (!res[groupKey]) {
      res[groupKey] = [];
    }

    res[groupKey].push(item);
  });

  return res;
}

const people = [
  { id: 1, name: 'Alice', address: { city: 'Moscow', street: 'Tverskaya' } },
  { id: 2, name: 'Bob', address: { city: 'SPb', street: 'Nevsky' } },
  { id: 3, name: 'Charlie', address: { city: 'Moscow', street: 'Arbat' } },
  { id: 4, name: 'Diana', address: { city: 'Kazan', street: 'Baumana' } },
  { id: 5, name: 'Eve', address: { city: 'SPb', street: 'Liteyny' } },
  { id: 6, name: 'Frank', address: { city: 'Moscow', street: 'Novy Arbat' } },
];

// const groupedByAddress = groupByPath(people, 'address.city');
// console.log(groupedByAddress);


